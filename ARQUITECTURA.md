# Pokechill — Arquitectura y funcionamiento interno

> Documento de ingeniería inversa. Todo lo que sigue está verificado leyendo el código;
> las referencias `archivo:línea` apuntan al sitio exacto.
>
> Estado del repo al documentar: sin git, sin build, sin tests, sin dependencias externas
> más allá de dos librerías vendorizadas.

---

## 1. Qué es, en una frase

Un idle/incremental de Pokémon: eliges un equipo de 6, lo mandas a un área, y el combate
se resuelve solo en bucle mientras tú decides **qué movimientos equipar y en qué orden**.
No hay input durante el combate. Toda la habilidad del jugador está en la preparación.

---

## 2. Arranque

No hay bundler ni módulos ES. `index.html` carga 15 `<script>` clásicos, en orden
significativo ([index.html:1705-1735](index.html:1705)):

```
HackTimer.js      → timers en Web Workers (el juego sigue corriendo en pestañas de fondo)
fuse.js           → Fuse.js 7.1.0, búsqueda difusa del pokédex

moveDictionary.js → define `ability` y `move`
itemDictionary.js → define `item`
pkmnDictionary.js → define `pkmn`  (depende de ability + item + move)
areasDictionary.js→ define `field`, `areas`, `shop`

PR/*.js           → contribuciones de la comunidad
script.js         → temas, migraciones de versión, tutorial
teams.js          → equipo y drag&drop
explore.js        → ★ el núcleo: combate, áreas, pokédex, UI
shop.js           → tienda
dictionarySearch.js, tooltip.js, decor.js
save.js           → persistencia (¡cargado el último!)
```

**El orden importa** y es frágil: `pkmnDictionary.js` referencia `ability.thickFat` y
`item.venusaurite` en tiempo de parseo, así que debe ir después de los otros dos.

Todo el arranque real cuelga de un único listener en
[explore.js:10513](scripts/explore.js:10513):

```js
window.addEventListener('load', function() {
    loadGame();            // ← definida en save.js, que se parsea después: funciona
    getSeed();             //   porque 'load' dispara tras parsear todos los scripts
    seasonCheck();
    ...
    requestAnimationFrame(gameLoop);
    updateGameVersion();
    openTutorial();
});
```

Usa `load` y no `DOMContentLoaded`, lo que significa que el juego **no arranca hasta que
descargan todos los recursos de la página**.

---

## 3. Modelo de datos: seis diccionarios globales

Todo el contenido son objetos literales JS en el scope global. No hay JSON, no hay fetch.

| Global | Archivo | Entradas | Qué es |
|---|---|---|---|
| `ability` | moveDictionary.js | 186 | Habilidades |
| `move` | moveDictionary.js:1254 | 417 | Movimientos |
| `item` | itemDictionary.js | 507 | Objetos |
| `pkmn` | pkmnDictionary.js | 1.408 | Especies |
| `field` | areasDictionary.js | 42 | Efectos de campo |
| `areas` | areasDictionary.js | 315 | Áreas / combates |
| `shop` | areasDictionary.js + shop.js | ~208 | Stock de tienda |

### Forma de una especie

```js
pkmn.bulbasaur = {
    type: ["grass","poison"],
    bst: { hp:45, atk:49, def:49, satk:65, sdef:65, spe:45 },
    evolve: function() { return { 1: { pkmn: pkmn.ivysaur, level: evolutionLevel1 } } },
    hiddenAbility: ability.thickFat,
    signature: move.frenzyPlant
}
```

`evolve` es una **función** y no un objeto porque se evalúa perezosamente: cuando se parsea
`bulbasaur`, `pkmn.ivysaur` todavía no existe. Envolverlo en una función difiere la
resolución hasta que alguien la llame. Es el truco que permite que todo el diccionario sea
un único archivo plano sin orden topológico.

### Forma de un movimiento

```js
move.doubleSlap = {
    moveset: [`normal`, `fighting`],   // qué "pools" pueden aprenderlo
    split: "physical",                 // physical | special
    rarity: 1,                         // tier, controla dónde aparece
    type: "normal",
    power: 20,
    info: function() {return `Hits 2-5 times`},
    multihit: [2,5],
    affectedBy: [ability.sharpness.id],   // qué habilidades lo potencian
    hitEffect: function(target) { moveBuff(target,'defdown1') },
    castEffect: function() { ... },       // al lanzar, antes de calcular daño
    timer: defaultPlayerMoveTimer/1.2,    // opcional: velocidad propia
}
```

`defaultPlayerMoveTimer = 2000` ms ([moveDictionary.js:1256](scripts/moveDictionary.js:1256)).

### Forma de un objeto

```js
item.blackBelt = {
    subtitle: `(Fighting)`,
    type: "held",        // held | evo | tm | memory | berry | gem | decor | key
    evo: true,
    info : function() {return `...x${this.power().toFixed(2)}...`},
    power: function() { return 1+(0.1*returnItemLevel(this.id)) }
}
```

`power()` es dinámica porque **los objetos suben de nivel acumulando duplicados**
([explore.js:2076](scripts/explore.js:2076)):

| Copias poseídas | Nivel |
|---|---|
| 1–4 | 1 |
| 5–9 | 2 |
| 10–14 | 3 |
| 15–19 | 4 |
| 20+ | 5 (máx) |

Un Black Belt nivel 5 da ×1.5 en vez de ×1.1. Es el sistema de progresión a largo plazo:
farmear el mismo objeto sigue siendo útil.

### Forma de un área

```js
areas.verdantForest = {
    rotation: 1,                 // en qué rotación diaria aparece
    level: wildAreaLevel1,       // nivel de los salvajes
    type: `wild`,                // wild | vs | event | dimension | frontier | ...
    background: `forest`,        // → img/bg/forest.png
    icon: pkmn.caterpie,
    spawns: {
        common:   [pkmn.caterpie, pkmn.exeggcute, pkmn.scatterbug],
        uncommon: [pkmn.bonsly],
        rare:     [pkmn.scyther]
    },
    drops: {
        common: [item.mysteryEgg],
        rare: wildRareItemsBug
    },
    unlock: function() { return false }   // opcional: condición de desbloqueo
}
```

### El `id` autoasignado

Al final de `pkmnDictionary.js` ([línea 20187](scripts/pkmnDictionary.js:20187)) hay un
bucle que recorre el diccionario e inyecta campos:

```js
for (const i in pkmn){
     pkmn[i].id = i          // ← la clave se copia dentro del objeto
     pkmn[i].exp = 0
     pkmn[i].caught = 0
     pkmn[i].level = 1
     pkmn[i].movepool = []
     pkmn[i].ivs = { hp:0, atk:0, def:0, satk:0, sdef:0, spe:0 }
     pkmn[i].moves = { slot1:null, slot2:null, slot3:null, slot4:null }
}
```

Por eso todo el código puede pasarse objetos y usar `.id` para volver a indexar. El patrón
`pkmn[team[slot].pkmn.id]` que verás mil veces es exactamente eso: **`team.slotN.pkmn` es
una referencia al objeto, pero se re-indexa por `id` para garantizar que se muta la
instancia canónica del diccionario y no una copia**.

---

## 4. La transformación clave: `statToRating`

Esto es lo más importante que hay que entender del juego.

Los `bst` del diccionario son las estadísticas base reales de Pokémon (45, 49, 160…), pero
justo después de cargarse **se sobrescriben in situ** con una escala de 1 a 6
([pkmnDictionary.js:20214](scripts/pkmnDictionary.js:20214)):

```js
for (const name in pkmn) {
  const bst = pkmn[name].bst;
  for (const stat in bst) bst[stat] = statToRating(bst[stat]);
}

function statToRating(baseStat) {
  const r = 1 + (baseStat - 20) * (5 / 180);
  return Math.min(6, Math.max(1, Math.round(r)));
}
```

Es un mapeo lineal de `[20, 200] → [1, 6]`, redondeado y saturado. Bulbasaur con atk 49
se convierte en **2 estrellas**. A partir de ese momento `bst.atk` ya no vale 49: vale 2.

Consecuencias:

- Toda la UI muestra estrellas (`returnStatDots`, [explore.js:2018](scripts/explore.js:2018)).
- Todas las fórmulas de combate operan sobre 1–6, no sobre 1–255.
- **Aplana enormemente el juego.** La diferencia entre un Pokémon mediocre y uno legendario
  es de unas pocas estrellas, no de un orden de magnitud. De ahí el "chill".
- Los IVs también son 0–6, no 0–31.

Si algún día quieres reequilibrar el juego entero, esta única función es la palanca.

---

## 5. Estado en runtime

Tres capas, todas globales:

**`saved`** ([script.js:1](scripts/script.js:1)) — lo que persiste. ~72 claves distintas:
`saved.currentArea`, `saved.version`, `saved.theme`, `saved.previewTeams`,
`saved.currentPreviewTeam`, `saved.weather`, `saved.weatherTimer`, `saved.tutorialStep`,
`saved.gamemodIvs`, `saved.maxSpiralFloor`…

**`team`** ([explore.js:8](scripts/explore.js:8)) — el equipo activo, 6 slots:

```js
team.slot1 = {
    turn: 1,          // ← puntero de rotación (ver §7)
    pkmn: undefined,  // referencia al objeto de pkmn
    buffs: {},        // { burn: 3, atkup1: 5, ... }  valores = turnos restantes
    item: undefined   // id del objeto equipado
}
```

**Globals sueltos de combate** — `wildPkmnHp`, `wildPkmnHpMax`, `wildLevel`, `wildBuffs`,
`exploreActiveMember`, `barProgressPlayer`, `afkSeconds`, `lastCrossStab`, `zCrystalTurn`…
Solo en `explore.js` hay 108 declaraciones de nivel superior.

Los datos mutables del jugador **no viven en `saved`**: viven inyectados dentro del propio
diccionario `pkmn` (`pkmn.bulbasaur.caught`, `.level`, `.ivs`, `.shiny`…). Esto es central
para entender cómo funciona el guardado (§10).

---

## 6. El game loop

[explore.js:2176](scripts/explore.js:2176). Acumulador de paso fijo sobre `requestAnimationFrame`:

```js
const STEP = 1000 / 60;
const MAX_STEPS_PER_FRAME = 5000;

function gameLoop(now) {
    let delta = now - lastDeltaTime;
    lastDeltaTime = now;
    if (delta > 250) delta = 250;      // clamp anti-salto
    accumulator += delta;

    let stepsExecuted = 0;
    while ((accumulator >= STEP || afkSeconds > 0) && stepsExecuted < MAX_STEPS_PER_FRAME) {
        exploreCombatPlayer();
        exploreCombatWild();

        if (afkSeconds > 0 && stepsExecuted % 60 === 0 && areas[saved.currentArea]?.timed)
            updateRaidTimer();

        if (afkSeconds > 0) {                      // modo AFK: drena tiempo virtual
            if (shouldCombatStop()==false) afkSeconds -= STEP / 1000;
            if (afkSeconds < 0) afkSeconds = 0;
        } else {                                   // modo normal: drena el acumulador
            accumulator -= STEP;
        }
        stepsExecuted++;
    }
    requestAnimationFrame(gameLoop);
}
```

El truco del fast-forward AFK es elegante: en vez de tener un simulador separado, **reutiliza
el mismo bucle de combate** y cambia qué contador drena. Cuando vuelves tras 2 horas, se
calcula `afkSeconds` y el `while` ejecuta hasta 5.000 pasos por frame hasta consumirlo.
`MAX_STEPS_PER_FRAME` evita que el navegador se congele.

`shouldCombatStop()` ([explore.js:2114](scripts/explore.js:2114)) pausa el combate si hay un
tooltip abierto, el editor de Pokémon abierto, el menú de equipo abierto, o no hay área activa.

---

## 7. La rotación: el corazón del diseño

Cada Pokémon tiene 4 slots de movimiento. `team.slotN.turn` es un puntero que avanza
1 → 2 → 3 → 4 → (5 = reset a 1):

```js
if (currentTurn >= 5){ team[exploreActiveMember].turn = 1; return; }
if (!nextMovePlayer) { team[exploreActiveMember].turn++; lastCrossStab = undefined; return; }
```

Es decir: **el Pokémon lanza sus 4 movimientos en orden fijo, en bucle, para siempre**. No
elige. El jugador no elige. La estrategia entera consiste en decidir *qué 4 movimientos* y
*en qué orden*.

Cada movimiento llena una barra a velocidad determinada por su timer y la velocidad del
Pokémon ([explore.js:2402](scripts/explore.js:2402)):

```js
barProgressPlayer += 100 / (
    (moveTimerPlayer * Math.pow(0.9, speedStars) * Math.pow(0.95, speedIvs)) / (1000/60)
);
```

Velocidad 6 estrellas → `0.9^6 = 0.53`, o sea el doble de rápido que 0 estrellas. IVs de
velocidad 6 → `0.95^6 = 0.74` adicional. La barra llega a 99 → se ejecuta el movimiento.

### La mecánica "Cross"

Esta es la firma del juego ([explore.js:2668-2679](scripts/explore.js:2668)):

```js
let crossPowerBonus = 1.3
if (testAbility(`active`, ability.ambidextrous.id))  crossPowerBonus += 0.3
if (testAbility(`active`, ability.treasureOfRuin.id)) crossPowerBonus += 0.5

if (lastCrossStab != undefined && lastCrossStab != move[nextMovePlayer].type
    && move[nextMovePlayer].power > 0
    && (!testAbility(`active`, "ate") || move[nextMovePlayer].type !== "normal")) {
    totalPower *= crossPowerBonus
    if (saved.weatherTimer>0 && saved.weather=="crossRoom") totalPower *= 1.3
}
if (nextMove.power > 0) lastCrossStab = nextMove.type
```

**Si el movimiento actual es de tipo distinto al anterior, gana ×1.3.** Por eso el juego te
empuja a alternar tipos en la rotación en vez de meter cuatro movimientos del mismo tipo.
Y por eso las habilidades `-ate` (que convierten Normal en otro tipo) llevan una excepción
explícita: si todo se convierte al mismo tipo, romperían el cross.

Visualmente, la barra se rellena con `crossPattern` (un SVG inline en base64,
[explore.js:2270](scripts/explore.js:2270)) cuando el próximo movimiento va a hacer cross.

---

## 8. La tubería de daño

`exploreCombatPlayer()` ([explore.js:2273](scripts/explore.js:2273)) son ~850 líneas que
aplican, en este orden estricto:

**1. Modificadores de velocidad** (antes de la barra) — habilidades tipo prankster/galeWings
(`/= 1.5`), objetos, estados (`paralysis *= 1.75`, `spedown1 *= 1.5`), efectos de campo.

**2. Resolución del movimiento** — casos especiales: `sketch` copia el slot1, `metronome`
elige uno al azar de los 417, `meFirst`/`mimic` leen el movebox del enemigo desde el DOM
(sí, se lee `dataset.move` del DOM como fuente de verdad).

**3. Potencia base** — `movePower = nextMove.power`, luego `powerMod()`, luego habilidades
que escalan potencia (technician ×1.5 si ≤60, strongJaw ×2…), luego multihit.

**4. Fórmula principal** ([explore.js:2514](scripts/explore.js:2514)):

```js
totalPower =
    ( movePower + Math.max(0, ((attackerStars * 30) * Math.pow(1.1, attacker.ivs.atk))
                              - (defenderStars * 30)) )
    * ( 1 + (attacker.level * 0.1) );
```

Léela así: la defensa **resta** en vez de dividir, con suelo en 0. Un defensor con muchas
más estrellas que tú anula por completo tu bonus de ataque y te deja solo con `movePower`.
El nivel escala linealmente ×0.1 por nivel (nivel 100 → ×11).

**5. Buffs de stats** — `atkup1 ×1.5`, `atkup2 ×2`, `atkdown1 /1.5`… y los del enemigo en
espejo, salvo que tengas `unaware`.

**6. Conversión de tipo** — las 14 habilidades `-ate` (`pixilate`, `aerilate`, …) convierten
Normal en otro tipo y dan ×1.3.

**7. STAB** — base 1.5, +0.2 con `adaptability`, **+0.2 si el Pokémon es de tipo único**.
Esa última compensación a los mono-tipo es un detalle de diseño propio.

**8. Efectividad de tipos** ([explore.js:3130](scripts/explore.js:3130)) — ⚠️ **la tabla usa
1.5 / 0.5, no 2 / 0.5**:

```js
const effective = 1.5, resist = 0.5;
```

Un súper efectivo doble da 2.25, no 4. Otra suavización deliberada. Las inmunidades (0) se
convierten en 0.5 en la Spiraling Tower, en Training y bajo el campo `noMercy`.

**9. Cross bonus** (§7) — ×1.3.

**10. Objetos** — ~40 comprobaciones lineales `if (item == X && tipo == Y)`.

**11. Habilidades condicionales** — las 16 variantes de `overgrow`/`blaze`/`torrent` bajo el
50% de HP, `hugePower` ×2, `supremeOverlord` (+15% por compañero caído), etc.

**12. Estados que anulan** — `confused` 50%, `paralysis` 25%, `freeze` y `sleep` 100% →
`totalPower = 1`.

**13. Z-moves** — contador independiente `zCrystalTurn`; al alcanzar `item.power()` se
dispara un golpe con `zPower = 30` multiplicado ×8, con split elegido automáticamente
comparando estrellas de atk vs satk (empate → aleatorio, con ×1.25 de premio).

---

## 9. Áreas, spawns y progresión

**Rotación diaria.** Las áreas tienen `rotation: 1..N` y una semilla diaria
(`getSeed()`, [explore.js:4743](scripts/explore.js:4743)) alimenta `mulberry32` para que
todos los jugadores vean las mismas áreas el mismo día. `rngSeeded()` usa esa semilla;
`rng()` normal usa `Math.random()`.

**Spawns.** `setWildPkmn()` ([explore.js:186](scripts/explore.js:186)) elige de
`spawns.common/uncommon/rare`. Los drops caen con `rng(0.20)`
([explore.js:1544](scripts/explore.js:1544)) — 20% por victoria, y nunca contra entrenadores,
en la Spiraling Tower ni en Training.

**Shiny.** `rng(1/400)` en el momento de obtener el Pokémon
([explore.js:165](scripts/explore.js:165)).

**HP.** ([teams.js:544](scripts/teams.js:544))

```js
playerHp = (100 + ((hpStars * 30) * Math.pow(1.1, healthIvs)) * (1 + level*0.2)) * hpMultiplier
```

`hpMultiplier` vale 10 normalmente, **4 contra entrenadores y en la Spiraling Tower** (peleas
más cortas y letales), y **80 en Training**.

**EXP.** Sin curva: cada nivel cuesta exactamente 100 puntos
([explore.js:1810](scripts/explore.js:1810)). La base es `34/2 = 17` por victoria, y escala
brutalmente si el salvaje es de nivel superior ([explore.js:1553](scripts/explore.js:1553)):

| Nivel del salvaje | Multiplicador |
|---|---|
| ≥ tu nivel − 10 | ×1 |
| ≥ tu nivel + 5 | ×3 |
| ≥ tu nivel + 10 | ×6 |
| ≥ tu nivel + 20 | ×12 |
| ≥ tu nivel + 40 | ×64 |
| ≥ tu nivel + 50 | ×128 |

Los compañeros que no combaten reciben la mitad. Nivel máximo 100. Contra entrenadores,
en Training y en la Spiraling Tower **no se gana EXP** (`baseExpGain = 0`).

**Movimientos por nivel.** Cada 7 niveles se aprende uno nuevo
([explore.js:1814](scripts/explore.js:1814)), elegido de los pools compatibles con
`move.moveset` según el tipo del Pokémon.

**⚠️ Evolución — no es lo que esperas.** ([explore.js:1847](scripts/explore.js:1847))

```js
if (pkmn[team[i].pkmn.id].level >= evolveLevel && pkmn[evolucion.id].caught === 0) {
    givePkmn(pkmn[evolucion.id], 1)
}
```

**Evolucionar no transforma tu Pokémon: te regala uno nuevo a nivel 1.** El original se
queda en tu equipo con su nivel intacto. Y solo dispara si aún no tenías la evolución
(`caught === 0`). Pokechill es un juego de *colección*, no de crianza: evolucionar es
desbloquear una entrada del pokédex, no mejorar una criatura.

---

## 10. Guardado

[save.js](scripts/save.js). Clave de `localStorage`: `gameData`. Autosave cada 60 s, más la
tecla `s` ([save.js:325](scripts/save.js:325)).

La estrategia es **guardar solo los campos mutables y reconstruir el resto desde los
diccionarios al cargar**:

```js
for (const i in pkmn) {
    if (!data[i]) data[i] = {};
    data[i].caught  = pkmn[i].caught;
    data[i].level   = pkmn[i].level;
    data[i].ivs     = pkmn[i].ivs;
    data[i].shiny   = pkmn[i].shiny;
    ...   // 23 campos
}
```

Por eso 1.408 Pokémon no revientan el save: los no capturados serializan como `{}`, ya que
`JSON.stringify` descarta `undefined`. El save crece con tu progreso, no con el contenido
del juego.

`saveGame()` está protegida por `saved.firstTimePlaying`
([save.js:5](scripts/save.js:5)) — no guarda hasta que elijas inicial, para no pisar una partida
existente con un estado vacío. El comentario original: `//scary!`.

Import/export en tres formas: descarga de `.json`, carga por `<input type=file>`, y
copiar/pegar el JSON crudo como texto (`textData()`, [save.js:267](scripts/save.js:267)).

### ⚠️ El namespace plano

`saveGame()` vuelca `item`, `shop`, `areas` y `pkmn` en el **mismo objeto `data`**, indexado
por el nombre de la entrada. Los tres primeros hacen `data[i] = {}` (sobrescriben); `pkmn`
hace `if (!data[i]) data[i] = {}` (fusiona).

Comprobé las 2.433 claves cruzando los cuatro conjuntos: **hoy no hay ninguna colisión**.
Pero el día que alguien añada un objeto que se llame igual que un área, los saves se
corrompen en silencio. Es la fragilidad estructural más seria del proyecto.

### Migraciones de versión

[script.js:48](scripts/script.js:48) — `updateGameVersion()` es una escalera de `if
(saved.version < X)` que aplica cambios retroactivos y, cuando toca, abre un tooltip
explicándole al jugador qué pasó con sus cosas:

```js
if (saved.version < 3.0){
  item.bottleCap.got += (item.goldenBottleCap.got * 10)
  item.goldenBottleCap.got = 0
  // + tooltip: "Your golden bottlecaps have been exchanged..."
}
```

Es la parte más madura del código. Hay saltos documentados desde la 0.2 hasta la 3.3+.

---

## 11. UI

**Sin framework y sin virtual DOM.** El patrón universal es: construir un string HTML y
asignarlo a `innerHTML`. Hay 228 sitios en `explore.js` y 212 en `tooltip.js`; en total
1.713 llamadas a `getElementById`.

**Menús.** `switchMenu(id)` ([explore.js:6332](scripts/explore.js:6332)) es un único
despachador. Su forma es siempre la misma: comprueba desbloqueos, pone todos los menús a
`zIndex 30`, y luego una lista de `if (id !== "X") ocultar X`.

Los desbloqueos están codificados a mano ahí dentro:

| Menú | Requisito |
|---|---|
| Shop | derrotar a Brock |
| Training | derrotar a Misty |
| Genetics | derrotar a Lance |
| Dimension | derrotar a Brendan |

**Tooltips.** `tooltip.js` es el sistema de diálogo genérico: `tooltipTitle` / `tooltipTop`
/ `tooltipMid` / `tooltipBottom` se rellenan por `innerHTML` y se abre con `openTooltip()`.
Se usa para todo: info de objetos, avisos de versión, el editor de save, confirmaciones.
Mientras hay un tooltip abierto, `shouldCombatStop()` pausa el combate.

**Temas.** 8 (`dark`, `light`, `verdant`, `lilac`, `cherry`, `coral`, `onyx`, `oled`), vía
`changeTheme()` ([script.js:250](scripts/script.js:250)) y 19 variables CSS.

**iOS.** `script.js:4-42` simula `contextmenu` a partir de un `touchstart` de 500 ms, porque
el juego usa pulsación larga / clic derecho como interacción principal y Safari no la
entrega igual.

---

## 12. Acelerador de combate y modificadores añadidos

### Acelerador (x1 / x2 / x5 / x10)

Vive en Ajustes → «Velocidad de combate». El truco es meter en el acumulador
más tiempo del que ha pasado de verdad ([explore.js:2181](scripts/explore.js:2181)):

```js
accumulator += delta * velocidadCombate();
```

El `while` de abajo ejecuta esa misma proporción de pasos de más, así que **todo
lo que depende del bucle se acelera a la vez** — barras, turnos de mejoras y
estados, fatiga, IA del salvaje. No se toca ninguna fórmula: solo el ritmo al
que ocurren, de modo que el equilibrio del juego no cambia.

Dos cosas hubo que ajustar aparte:

- **El respawn va por `setTimeout`**, no por el bucle, así que sería el cuello
  de botella. Se divide por el multiplicador ([explore.js:1406](scripts/explore.js:1406)).
- **Pintar la interfaz en cada paso satura el frame.** A x10 el bucle hace 10
  pasos por frame y cada uno escribía el ancho de las barras. Con la bandera
  `pasoVisible` solo se pinta el último paso de cada frame; el jugador ve lo
  mismo y el rendimiento real pasó de ~3,7× a ~10×.

Medido en el juego (pasos de lógica por segundo / fps):

| | x1 | x2 | x5 | x10 |
|---|---|---|---|---|
| pasos/s | 60 | 120 | 301 | 601 |
| fps | 100 | 100 | 100 | 97 |

El modo AFK ignora el ajuste: ya recupera el tiempo a máxima velocidad.

### Modificadores añadidos

Se declaran en una tabla (`MODIFICADORES`, [script.js](scripts/script.js)) que
enlaza cada clave de `saved` con el id de su casilla, y `updateSettings()` los
recorre en bloque en vez de repetir dos líneas por cada uno.

| Modificador | Clave | Efecto | Dónde |
|---|---|---|---|
| Experiencia x3 | `gamemodExp` | `baseExpGain *= 3` | [explore.js:1562](scripts/explore.js:1562) |
| Botín generoso | `gamemodDrops` | drop 20% → 60% | [explore.js:1553](scripts/explore.js:1553) |
| Cazavariocolor | `gamemodShiny` | shiny 1/400 → 1/40 | [explore.js:170](scripts/explore.js:170) |
| Sin fatiga | `gamemodFatiga` | `fatigueDamage = 0` | [explore.js:3113](scripts/explore.js:3113) |
| Equipo resistente | `gamemodDureza` | `hpMultiplier *= 2` | [teams.js:517](scripts/teams.js:517) |
| Cruce constante | `gamemodCruce` | el bonus de Potencia Cruzada se aplica siempre | [explore.js:2684](scripts/explore.js:2684) |

Todos se aplican multiplicando *después* del cálculo base, así que respetan las
excepciones existentes (entrenadores y Torre Espiral no dan experiencia, ciertas
zonas no sueltan objetos, etc.).

Las partidas antiguas no traen estas claves porque `loadGame()` reemplaza `saved`
entero; se rellenan con `??=` en el arranque ([explore.js:10592](scripts/explore.js:10592)).

---

## 13. La traducción al español

El juego está íntegramente en español. La traducción se hizo en dos capas, según
cómo se consuma cada texto.

### Capa 1 — nombres propios: [scripts/es.js](scripts/es.js)

Los nombres (habilidades, movimientos, objetos, campos, áreas) **no se tocaron en
los diccionarios**. Viven en un único archivo aparte que se carga entre
`areasDictionary.js` y `explore.js`, y que `format()` consulta antes de aplicar su
formateo automático ([explore.js:72](scripts/explore.js:72)):

```js
function format(input) {
    if (typeof ES_NOMBRES !== 'undefined' && ES_NOMBRES[input] !== undefined)
        return ES_NOMBRES[input];
    ... // camino original en inglés para lo que no esté traducido
}
```

| Categoría | Cobertura |
|---|---|
| Habilidades | 195 / 195 |
| Movimientos | 416 / 416 |
| Objetos | 503 / 503 |
| Efectos de campo | 42 / 42 |
| Áreas | 311 / 311 |

Las especies **no necesitan traducción**: en español los nombres de Pokémon son
idénticos a los ingleses.

Dos automatismos dentro de `es.js` evitan trabajo repetido y desincronizaciones:

- **Objetos derivados.** 226 de los 507 objetos son MTs, Discos y Gemas. Se generan
  desde los nombres ya traducidos: `airShlashTm` → «MT Tajo Aéreo»,
  `hydratationMemory` → «Disco Hidratación», `fireGem` → «Gema Fuego». Si traduces
  un movimiento nuevo, su MT queda traducida sola.
- **Nombres de área por reglas.** Las zonas `vs` y `event` no pasan por `format()`:
  el juego lee `areas[id].name` directamente. Como siguen patrones regulares, una
  tabla de 19 títulos de entrenador y 20 sustantivos de lugar cubre 131 nombres
  («Gym Leader Brock» → «Líder de Gimnasio Brock», «Great Tusk Revival» →
  «Resurrección de Great Tusk»). Lo que las reglas no cubren está en `ES.nombreArea`.

**Degradación limpia:** cualquier id sin traducir sigue mostrándose en inglés, así
que una traducción que falte nunca rompe el juego.

### Capa 2 — prosa: traducida en el sitio

Descripciones (`info:`), textos de interfaz, tutorial, guía, tooltips y lore de la
Pokédex se tradujeron directamente en el código fuente, porque están troceados por
interpolaciones y HTML incrustado y una tabla de claves sería más frágil.

### Qué se dejó en inglés a propósito

No todo lo que parece texto lo es. Estos identificadores **no deben traducirse**:

| Qué | Dónde | Por qué |
|---|---|---|
| `"Escape"`, `"Enter"`, `"Space"` | tooltip.js, explore.js, movesetGenerator.js | códigos de tecla |
| `data-help="Wild Areas"`, `"Dungeons"`, `"Events"`, `"VS"`, `"Frontier"` | explore.js | claves de despacho contra `ttdata ===` en tooltip.js |
| `"Total"`, `"Bst"`, `"Tm"`, `"Memory"`, `"Gem"` | explore.js | sufijos de id y claves de ordenación |
| `"Spiral"`, `"Crystal"` | explore.js | `dataset.help` y comprobación de mote (easter egg) |
| `value="fire"`, `value="dark"`… | index.html | valores de `<select>`; solo se tradujo la etiqueta visible |
| Códigos de reto de ejemplo | PR/challenges*.js | se parsean por nombre en inglés |

Si algún día traduces más cosas, comprueba primero si la cadena se compara en
algún sitio. El caso más sutil que apareció: `textContent == "Abort"` en
[explore.js:8869](scripts/explore.js:8869) compara contra el propio texto del
botón, así que hubo que traducir las dos caras a la vez.

---

## 14. Recetas para añadir contenido

**Un Pokémon nuevo** — añadir a `pkmnDictionary.js` con `bst` en escala *real* (el bucle del
final lo convierte a estrellas), y poner sprites en `img/pkmn/sprite/`, `img/pkmn/mini/` y
`img/pkmn/shiny/`. No hace falta tocar nada más: el `id`, `caught`, `ivs`, `moves` se
inyectan solos.

**Un movimiento nuevo** — añadir a `moveDictionary.js` con `moveset` (los pools que pueden
aprenderlo), `split`, `rarity`, `type`, `power`. Para efectos, usar `hitEffect(target)` con
`moveBuff(...)`, o `castEffect()` si actúa antes del daño.

**Un área nueva** — añadir a `areasDictionary.js` con `type`, `rotation`, `level`,
`background` (debe existir `img/bg/<nombre>.png`), `spawns` y `drops`.

**Un objeto nuevo** — añadir a `itemDictionary.js` con `type` y `power()` en función de
`returnItemLevel(this.id)`; luego meter el `if` correspondiente en la tubería de daño de
`exploreCombatPlayer`. Este último paso es el que no escala: son ~40 comprobaciones lineales.

---

## 15. Trampas conocidas

1. **Funciones duplicadas.** La segunda definición gana y la primera es código muerto:
   - `learnPkmnMove` — [script.js:452](scripts/script.js:452) vs [script.js:516](scripts/script.js:516)
   - `createFrontierTrainers` — [explore.js:6972](scripts/explore.js:6972) vs [explore.js:7088](scripts/explore.js:7088)
   - `updatePreviewTeam` — [teams.js:68](scripts/teams.js:68) vs [teams.js:864](scripts/teams.js:864)

2. **El namespace plano del save** (§10).

3. **`window.load`** retrasa el arranque hasta descargar todos los recursos.

4. **El DOM como estado.** `meFirst` y `mimic` leen el movimiento del enemigo desde
   `document.getElementById('pkmn-movebox-wild-1').dataset.move`. La lógica de combate
   depende de que la UI esté renderizada.

5. **`Challenges` está apagado pero completo.** 1.131 líneas en `scripts/PR/` con su
   `<div id="custom-challenges-menu">` todavía en [index.html:1085](index.html:1085); los
   `<script>`, el item de menú y el bloque de `switchMenu` están comentados en los tres
   sitios. Es una feature entera esperando a que alguien la encienda.

6. **`updateCheck.js`** hace polling a la API de GitHub cada 5 minutos para avisar de
   versiones nuevas. Es la única petición de red del juego.

7. **Sin licencia propia** y los sprites son propiedad de Nintendo/Game Freak.

---

## 16. Mapa de archivos

| Archivo | Líneas | Responsabilidad |
|---|---:|---|
| [explore.js](scripts/explore.js) | 10.590 | Combate, áreas, pokédex, menús, frontier. El núcleo. |
| [pkmnDictionary.js](scripts/pkmnDictionary.js) | 20.245 | 1.408 especies + `statToRating` |
| [moveDictionary.js](scripts/moveDictionary.js) | 5.465 | 186 habilidades + 417 movimientos |
| [areasDictionary.js](scripts/areasDictionary.js) | 6.424 | 42 campos + 315 áreas + shop |
| [itemDictionary.js](scripts/itemDictionary.js) | 2.202 | 507 objetos |
| [shop.js](scripts/shop.js) | 2.190 | Tienda, curry, apricorns |
| [tooltip.js](scripts/tooltip.js) | 1.991 | Sistema de diálogos |
| [teams.js](scripts/teams.js) | 1.323 | Equipo, HP, drag & drop |
| [script.js](scripts/script.js) | 940 | Temas, migraciones, tutorial |
| [dictionarySearch.js](scripts/dictionarySearch.js) | 438 | Búsqueda (Fuse.js) |
| [save.js](scripts/save.js) | 335 | Persistencia |
| [es.js](scripts/es.js) | 1.365 | Traducción de nombres al español |
| [decor.js](scripts/decor.js) | 192 | Decoraciones arrastrables |
| [teamPreviews.js](scripts/teamPreviews.js) | 139 | *(no se carga en index.html)* |
| `PR/challenges.js` | 1.056 | Retos personalizados *(desactivado)* |
| `PR/movesetGenerator.js` | 662 | Generador de sets |
| `PR/autoTeamBuilding.js` | 339 | Auto-construcción de equipo |
| `PR/teamDuplicate.js` | 205 | Duplicar equipos |
| `PR/updateCheck.js` | 76 | Aviso de versión nueva |

Assets: 3.346 archivos / 20 MB — 2.772 sprites de Pokémon (normal, mini, shiny, stellar),
315 de objetos, 101 entrenadores, más fondos, iconos, cintas y decoraciones.
