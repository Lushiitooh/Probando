# 42 ideas para jugabilidad, niveles y encontrar Pokemon

Tercera tanda. Las dos anteriores (`IDEAS.md` y `IDEAS-2.md`, 120 ideas) ya estan
implementadas, asi que aqui no se repite ninguna.

**Como salio esto:** 10 agentes buscaron en internet y reunieron 149 hallazgos de
318 fuentes distintas (PokeRogue, Loop Hero, Slay the Spire, Monster Sanctuary,
Cassette Beasts, Leyendas Arceus, DexNav de ORAS, Dragon Quest, Xenoblade, Temtem,
Coromon, Siralim, charlas de GDC sobre idles...). Seis disenadores los convirtieron
en 68 propuestas y una criba de cinco jueces descarto 26. Quedan 42.

Son 42 y no 50 a proposito: preferi que sobrevivieran solo las que aguantan el
filtro a rellenar con paja.

## Diagnostico del que parten

Leido del codigo, no supuesto:

- **Encontrar no es una decision.** Comun 91,1%, poco comun 7,92%, raro 1%. Y no es
  una tabla ponderada: son tres asignaciones en cascada que se pisan. Sin rachas, sin
  cadenas, sin nada que el jugador pueda empujar.
- **Solo hay 5 niveles de zona en todo el juego**: 10, 30, 50, 70 y 90.
- **El salvaje nunca escala** al jugador.
- Un salvaje de nivel <=10 pelea con **un solo movimiento**.
- **El tiempo nunca es una decision.** La rotacion tiene el eje *que tipo* pero no el
  eje *cuando*, que es justo la mitad ausente de la Potencia Cruzada.
- **Nada se agota** en combate, asi que ninguna rotacion tiene coste.
- **Perder no cuesta nada.**

Leyenda de esfuerzo: 🟢 bajo  🟡 medio  🔴 alto

---

# A. Encontrar Pokemon

*exploracion, rareza, captura y coleccion* — 19 ideas

### 1. Registro de linaje: el mejor IV visto por familia evolutiva es el suelo de los nuevos 🟢

**Cada familia evolutiva guarda el mejor IV visto en cada estadística, y todo ejemplar nuevo de esa familia nace ya con esos valores como mínimo.**

Por familia evolutiva se guardan 6 récords (hp, atk, def, satk, sdef, spe), cada uno de 0 a 5. Cualquier ejemplar nuevo de la familia —capturado, eclosionado o regalado por evolución— nace con esos récords como SUELO: no se suman, se igualan. Arregla el agujero más doloroso que tiene hoy el juego: evolucionar no transforma a tu Pokémon, te regala uno nuevo a nivel 1 con IVs a cero, así que tu Charmander mimado durante 80 niveles produce un Charizard basura. Y hace que el Rattata número 40 siga moviendo un número: si sale con atk 4 y tu récord era 3, el récord sube para siempre. Objetivo largo y muy visible: 36/36 puntos de récord por familia, con una barra en la ficha del Pokédex.

- **Por que engancha:** Elimina el 'ya lo tengo, esta captura no sirve para nada', que es el veneno de todo juego de colección con captura automática. Cada duplicado sigue empujando un número, así que farmear una zona nunca es tiempo perdido, y hay una meta larga por familia que el jugador puede perseguir eligiendo dónde farmea.
- **De donde sale:** PokéRogue: cada captura o eclosión traspasa sus IVs buenos al 'starter' de la línea evolutiva, subiendo permanentemente la ficha con la que empiezas futuras partidas.
- **Como se haria:** getEvolutionFamily(base) ya existe y devuelve la familia entera (explore.js:9619). Estado en saved.linaje[idFamiliaBase] = {hp,atk,def,satk,sdef,spe}. Dos puntos de sutura: el bucle de eclosión de leaveCombat, que ya sortea siete veces al 10% por estadística y compara con el IV actual (explore.js:1076-1096), y givePkmn (explore.js:129), que es por donde entra el Pokémon regalado al evolucionar (explore.js:1909). En ambos se aplica el suelo justo después de asignar los IV y se actualiza el récord. La barra 'récord de linaje 22/36' se pinta en la ficha del Pokédex (updatePokedex, explore.js:5265). Estado en saved.*, nunca en pkmn[i].*, por lo de save.js:53-77.
- **Esfuerzo:** bajo · **Impacto:** alto · **Nota de la criba:** 9.5/10

### 2. El Dorado que huye: recompensa enorme, defensa imposible, 12 segundos 🟢

**1 de cada 500 salvajes aparece dorado: casi no le entra daño, se va en 12 s y regala 3 niveles.**

Aparición 1/500 solo en zonas de tipo `wild`. Sus PV son ridículos (6.000 + 40 × nivel de zona) pero se le fuerza `defenderStars = 14` en vez del máximo normal de 6, o sea 420 restados: como el mejor atacante posible del juego aporta 6 estrellas × 30 × 1,1^5 ≈ 290, el término de estadísticas se anula SIEMPRE y solo entra la potencia base del movimiento multiplicada por (1 + nivel×0,1). Se escapa a los 12 segundos. Si lo tumbas: +3 niveles al miembro activo y +1 a los otros cinco (`exp += 300` y `updateTeamExp()`, que ya se llama a sí misma en cascada y encadena las subidas). Si se escapa, se anota en un contador de escapados. Sprite con `filter: hue-rotate()` y borde dorado, que styles.css ya hace para las temporadas.

- **Por que engancha:** Es la única recompensa variable con tensión real en un juego sin input: el 90% de las veces se te va y por eso el 10% se siente enorme. Y sobre todo obliga a construir para ESE encuentro concreto: como las estadísticas no valen nada contra él, la cacería premia movimientos de potencia base alta, la rama de Perforación y la maestría plana. Es un objetivo que reescribe tu rotación sin tocar ni un multiplicador global.
- **De donde sale:** Los metal slime de Dragon Quest (PV mínimos, defensa absurda, huida en 1-2 turnos, XP desproporcionada).
- **Como se haria:** Todo cabe en `setWildPkmn()` (explore.js:203): tras elegir `spawnedPkmn`, si el área es `wild` y `rng(1/500)`, marcar `saved.dorado = true`, sobreescribir `wildPkmnHp`/`wildPkmnHpMax` (explore.js:590-602) y guardar la marca. El override de defensa es un condicional en las dos asignaciones de `defenderStars` de `exploreCombatPlayer` (explore.js:2619 y 2648). El temporizador de huida se descuenta en `gameLoop(now)` (explore.js:2243), que ya recibe el delta, y al llegar a 0 llama a la misma ruta de respawn que usa la victoria (`setWildPkmn()` tras `respawnTimer`). El premio se aplica en el bloque de victoria antes del reparto normal de exp.
- **Esfuerzo:** bajo · **Impacto:** alto · **Nota de la criba:** 9/10

### 3. Cadena de Zona: encadenar la misma especie sube calidad, rareza y variocolor 🟢

**Un contador visible por (zona, especie) que sube con cada captura de la especie elegida y mejora IVs, variocolor y tabla de rareza por tramos.**

El jugador fija un objetivo tocando el sprite de una especie en la ficha de la zona. Mientras hay objetivo, cada eclosión tiene un 35% + 1% por eslabón (tope 85%) de forzar esa especie; cada eclosión del objetivo sube el contador. Tramos: n>=5 fuerza 1 IV a 5; n>=15 dos IVs; n>=30 tres; n>=50 cuatro IVs y además el pool 'rare' de la zona sustituye al 'uncommon' (su aparición pasa del 7,92% al ~30%). Variocolor: shinyPkmnChance se multiplica por (1 + n/12), tope x6,6, o sea de 1/400 a 1/60 en cadena 50. Cambiar de zona resetea el contador a 0; se guarda el récord por zona para presumir. El coste no es destreza (imposible en un idle) sino de OPORTUNIDAD: mientras encadenas Caterpie no rellenas el resto de la Pokédex de esa zona.

- **Por que engancha:** Hoy quedarse en una zona no da nada creciente: 91% común y 1% raro para siempre. Con la cadena, la hora 3 en la misma zona vale objetivamente más que la hora 1, y el AFK deja de ser 'apilar duplicados' para ser 'subir un número'. La amenaza de romperla al cambiar de zona crea la primera decisión real del sistema de exploración.
- **De donde sale:** Pokémon Let's Go (Catch Combo) y el DexNav de ORAS, con los tramos escalonados de Radical Red
- **Como se haria:** Módulo nuevo scripts/encontrar.js (patrón var Encontrar = (function(){...})() igual que coleccion.js/extras2.js) cargado en index.html. Estado en saved.cadena = {zona, especie, n, mejorPorZona:{}} (persiste solo, save.js línea 9 serializa saved entero). Enganches: (1) bloque de eclosión de item.mysteryEgg en explore.js 1063-1136 — tras elegir hatchedPkmn se aplica el sesgo y se sube n; (2) el bucle de IVs de la línea 1079-1099 ya solo sube IVs si newIv>ivId, así que basta forzar pkmn[id].ivs[iv]=5 en los N primeros; (3) shinyPkmnChance de la línea 1045 se multiplica igual que ya hacen Progreso.mult('shinyPct') y compañía en givePkmn (170-174); (4) reset en initialiseArea cuando saved.currentArea cambia. HUD: contador junto a #explore-wild-name y badge en el divAreas del bucle de setWildAreas (4525).
- **Esfuerzo:** bajo · **Impacto:** alto · **Nota de la criba:** 9/10

### 4. Nivel de Búsqueda por especie: el denominador del variocolor baja y se ve 🟢

**Cada salvaje derrotado sube un contador permanente por especie (0-999) que mejora la calidad de lo que encuentras y baja visiblemente su probabilidad de variocolor.**

saved.busqueda[especie] sube +1 por cada salvaje derrotado de esa especie, nunca baja, tope 999 (sube también durante el AFK porque el bucle se reejecuta). Efecto continuo: el variocolor de ESA especie pasa de 1/400 a 1/(400 - 0,5*busqueda), con suelo 1/150 al llegar a 500. Hitos duros: 25 = la ficha de zona muestra el nivel exacto y el tipo del próximo salvaje antes de entrar; 100 = una tirada extra de IV (el bucle de 7 tiradas al 10% pasa a 8); 250 = suelo de 1 IV a 3 en toda eclosión de esa especie; 500 = se le añade al movepool un movimiento fuera de su learnset, elegido de un tipo que la especie NO tiene; 999 = 'Especie dominada', marca permanente en la Pokédex. En la ficha se lee literal: 'Búsqueda 213/999 · Variocolor 1/294'.

- **Por que engancha:** Convierte la lotería en progresión: 500 encuentros fallidos hoy no valen nada, aquí dejan huella permanente y el jugador ve el número bajar. Es la mecánica que mejor casa con el AFK de este juego, porque un número bajando mientras duermes es por sí solo un motivo para dejarlo corriendo. Y el hito de 500 (movimiento de tipo ajeno) alimenta directo la potencia cruzada.
- **De donde sale:** Search Level del DexNav (ORAS) combinado con el denominador variable de Nexomon: Extinction
- **Como se haria:** Contador en el bloque de muerte del salvaje de explore.js línea 1531 (if (percent <= 0)), justo donde ya se cuenta Extras.contar('combatesGanados'): saved.busqueda[saved.currentPkmn] = Math.min(999, (saved.busqueda[saved.currentPkmn]||0)+1). El denominador se aplica en shinyPkmnChance (explore.js 1045) y en probShiny de givePkmn (170). La tirada extra de IV se añade al bucle de 1084-1090. El movimiento del hito 500 se saca con learnPkmnMove(id, 100, 'wild') filtrando move[x].type contra pkmn[id].type y se empuja a pkmn[id].movepool. UI: línea extra en la ficha del Pokédex (updatePokedex, explore.js ~5359) y en el tooltip de especie de tooltip.js.
- **Esfuerzo:** bajo · **Impacto:** alto · **Nota de la criba:** 9/10

### 5. Tiradas de variocolor: la probabilidad como número entero visible 🟢

**Sustituir el 1/400 y sus multiplicadores invisibles por un contador entero de tiradas que se muestra sobre el salvaje.**

Base = 1 tirada de 1/400 al capturar (1/120 en los regalos de entrenador). P(variocolor) = 1-(1-1/400)^T. Fuentes de tiradas, todas sumables y visibles: Amuleto Iris (item.shinyCharm) +1 por nivel de objeto, así que +1 a +5; +1 por cada 250 KO acumulados de esa especie, tope +4; +6 con brote activo en la zona; +2 con Cebo Prismático; +1 por cada 2 niveles de investigación de la especie y +3 con entrada perfecta; +3/+6 por cadena de captura 30/50. Tope duro de 40 tiradas (≈9,5%) para que nada se descontrole. La UI de zona muestra '✦ Tiradas: 12 · 1 entre 34' y al pulsar despliega el desglose línea por línea de dónde sale cada tirada.

- **Por que engancha:** Hoy el jugador no tiene ni idea de si sus objetos hacen algo: los multiplicadores de Progreso, Combate2, Extras2 y Prestigio2 se apilan en silencio dentro de una variable que nunca se enseña. Un entero es comparable, coleccionable y da un objetivo claro ('subir de 5 a 12 tiradas'). Además es exactamente lo que quiere ver el que vuelve de 8 h de AFK: un número, no un porcentaje con cuatro decimales.
- **De donde sale:** Pokémon Espada/Escudo, Leyendas Arceus y Escarlata/Púrpura: desde Gen VIII todo el sistema shiny se modela como 'cuántas veces se tira 1/4096' (Amuleto +2, brote masivo +25, investigación perfecta +3).
- **Como se haria:** Nuevo scripts/encontrar.js con el patrón que ya usan los demás módulos (var Encontrar = (function(){const API={}; ... return API;})(), cargado después de explore.js). API.tiradas(idEspecie) devuelve el entero y API.tirarShiny(idEspecie) hace el bucle. Se sustituyen los dos sitios donde hoy se decide el variocolor: el bloque probShiny de givePkmn (explore.js:170-176) y las variables shinyPkmnChance / shinyPkmnChanceEncounter del bucle de eclosión de leaveCombat (explore.js:1045-1046). Los multiplicadores actuales se convierten a tiradas (x1,5 → +1 tirada) para no perder nada de lo ya implementado. Estado en saved.tiradas, nunca en pkmn[i].*, porque save.js solo serializa 25 campos concretos por especie (save.js:53-77).
- **Esfuerzo:** bajo · **Impacto:** alto · **Nota de la criba:** 9/10

### 6. Cadena de captura por especie + Nivel de Búsqueda permanente 🟡

**Derrotar seguido a la misma especie en la misma zona construye una cadena que mejora IVs, spawn y variocolor; en paralelo, cada especie tiene un nivel permanente por total capturado.**

saved.cadena = {especie, zona, n}. +1 por cada victoria contra la misma especie en la misma zona; se rompe al cambiar de zona o de especie. Umbrales: n=10 → el siguiente ejemplar nace con 1 IV a 5; n=20 → 2 IVs; n=30 → esa especie pasa a un 60% de peso fijo en el slot común (se sortea ANTES de la cascada) y +3 tiradas de variocolor; n=50 → +6 tiradas y 3 IVs; tope 100. No hace falta inventar un castigo por encadenar: el coste de oportunidad ya existe y es enorme, porque quedarte en una zona a tu nivel te da exp x1 mientras que subir de zona te da x12 o x128. Segunda escala, permanente y acumulativa con la anterior: Nivel de Búsqueda = min(10, floor(pkmn[i].caught / 15)); cada nivel da +1 tirada de variocolor de esa especie y +0,1 al IV medio de sus futuras eclosiones.

- **Por que engancha:** Convierte quedarse en una zona en una decisión con estado y con riesgo en vez de en una espera. La doble escala es la clave de DexNav: la cadena es tensión a corto plazo (romperla duele) y el Nivel de Búsqueda es progreso que no se pierde nunca, así que farmear una especie común deja de ser tiempo tirado.
- **De donde sale:** Pokémon Let's Go (Catch Combo: a cadena 31 una especie del 1% pasa al ~50% de spawn) y el DexNav de ORAS, que escala a la vez con el Search Level permanente y con la longitud de la cadena.
- **Como se haria:** En scripts/encontrar.js. El contador sube en el bloque de muerte del salvaje de updateWildPkmn, exactamente donde ya se llama a Extras.contar('combatesGanados') (explore.js:~1595). La ruptura por cambio de zona va en initialiseArea (explore.js:4104), que ya reinicia lastCrossStab y los turnos. El sesgo de spawn se aplica en setWildPkmn justo antes de la cascada de explore.js:527. Los IV garantizados se inyectan en el bucle de eclosión de leaveCombat (explore.js:1076-1096), que ya hace siete tiradas del 10% por estadística: basta con forzar el valor mínimo antes de comparar con el IV actual.
- **Esfuerzo:** medio · **Impacto:** alto · **Nota de la criba:** 9/10

### 7. Encuentro relámpago: el destello clicable que intercepta el siguiente combate 🟢

**Cada 8-14 minutos aparece un sprite durante 25 segundos sobre la pantalla de combate; pulsarlo hace que el siguiente salvaje sea un encuentro de lujo.**

Solo dispara con la pestaña visible y con combate activo. Aparece en posición aleatoria y dura 25 s. Al pulsarlo, el SIGUIENTE salvaje que genere setWildPkmn es: especie del slot rare garantizada, nivel de zona +20 (que con la curva de exp actual paga x12 de experiencia), +5 tiradas de variocolor, IV mínimo 3 en todo y huevo misterioso garantizado al derrotarlo. No dispara nunca en AFK y no se acumula: el que se va no pierde absolutamente nada, solo deja de ganar. Tres mejoras compradas con Chapas, cada una tocando una variable distinta del propio sistema: Reflejos (25 s → 45 s en pantalla), Frecuencia (8-14 → 5-9 min), Instinto (+5 → +9 tiradas).

- **Por que engancha:** Resuelve el conflicto central de este juego: 'es un idle' contra 'quiero que jugar minuto a minuto sea entretenido'. Da una razón concreta para mirar la pantalla sin obligar a nadie a mirarla ni castigar al que se va. Y como las mejoras modifican por separado frecuencia, duración y potencia, el propio sistema de eventos se convierte en un pequeño árbol de progresión.
- **De donde sale:** Cookie Clicker, Golden Cookies: aparecen en posición aleatoria, duran 13 s base, y hay mejoras separadas para el tiempo entre apariciones, la duración del efecto y el tiempo en pantalla.
- **Como se haria:** En scripts/encontrar.js: un setInterval que comprueba !document.hidden y saved.currentArea != undefined. HackTimer.js ya está cargado, así que los timers corren en Web Worker y no se estrangulan en segundo plano. El sprite es un div absoluto sobre el contenedor de combate, con la animación de CSS que ya existe para los destellos de extras2.js. La bandera saved.interceptar se lee en las primeras líneas de setWildPkmn (explore.js:203), antes de todo el reparto por tipo de área, para forzar spawnedPkmn y wildLevel. Sonido con Extras.sonar y aviso con Extras.aviso.
- **Esfuerzo:** bajo · **Impacto:** alto · **Nota de la criba:** 9/10

### 8. Cebos: consumibles que sesgan la tabla de aparición durante 50 encuentros 🟢

**Una familia nueva de objetos que el jugador activa al entrar en una zona y que reescribe las probabilidades de esa zona durante 50 encuentros.**

Objetos type:'lure', se consumen al entrar en la zona y duran 50 encuentros con contador visible. Cebo Denso: poco común del 8% al 30%. Cebo Antiguo: raro del 1% al 6% (y durante su efecto se desactiva el PRD del slot raro, para que no se pisen). Cebo Prismático: +4 tiradas de variocolor a cambio de -50% de drop de objetos, que es la decisión interesante. Cebo de Tipo, 18 variantes: solo aparecen los spawns de ese tipo dentro de la tabla de la zona; si la zona no tiene ninguno, ni se consume. Cebo de Nivel: los salvajes salen al tope de la horquilla (level en vez de level-9..level), lo que con la curva de exp actual es también un cebo de experiencia. Regla dura: ningún cebo elimina el slot raro, solo lo amplía.

- **Por que engancha:** Convierte la rareza de algo que le pasa al jugador en algo que el jugador provoca, que es justo lo que hoy falta: mirar y esperar. Y como los objetos de este juego suben de nivel acumulando duplicados, los cebos se benefician solos del sistema de farmeo que ya existe, así que hay una razón para seguir consiguiendo el mismo cebo.
- **De donde sale:** Leyendas Arceus y Escarlata/Púrpura (cebos y sándwiches que sesgan la tabla y se apilan con los brotes), y el incienso de Pokémon GO.
- **Como se haria:** Entradas nuevas en scripts/itemDictionary.js con type:'lure' y power() en función de returnItemLevel(this.id) (explore.js:2134), igual que item.pureIncense, que ya hace exactamente esto para rarePkmnChance (explore.js:1049). Estado saved.ceboActivo = {id, restantes}, leído en setWildPkmn justo antes de la cascada de explore.js:527 y decrementado en el bloque de muerte del salvaje. Venta en shop.js y salida por reciclaje de duplicados, que ya existe en coleccion.js. Icono y contador en la bolsa (updateItemBag, explore.js:6729).
- **Esfuerzo:** bajo · **Impacto:** alto · **Nota de la criba:** 9/10

### 9. Brotes rotativos: 3 zonas al día con una especie inundando la tabla 🟡

**Cada 6 horas, tres zonas salvajes ya desbloqueadas se marcan con brote: una especie concreta sustituye a la tabla y el variocolor sube x8, con un cupo que se agota.**

Semilla derivada del reloj (bloques de 6 h, dos tandas por cada rotación salvaje de 12 h), sin servidor. Se eligen 3 zonas de la rotación activa y para cada una una especie de su pool uncommon o rare. Dentro del brote: el 70% de los encuentros y de las eclosiones son la especie del brote; shinyPkmnChance se multiplica por 8 (1/400 -> 1/50); el nivel del salvaje sube +10 sobre el de la zona, lo que engrana con la curva de experiencia que ya premia pelear por encima (x3 a +5, x12 a +20). El brote se agota tras 40 capturas de esa especie y muere con aviso; si no lo agotas, caduca a las 6 h. En el selector de zonas, badge con la especie, el cupo restante y la cuenta atrás.

- **Por que engancha:** Con 312 zonas el problema real es que el jugador se queda en tres. Un brote da un motivo de abrir el juego que no es una misión ('a ver qué salió hoy') y obliga a mirar el mapa entero otra vez. Como anuncia ESPECIE concreta, el que lleva 40 horas buscando algo por fin tiene diana. Y al volver del AFK puedes tener dos brotes vivos y elegir cuál agotar: decisión pura, cero interfaz nueva en combate.
- **De donde sale:** Apariciones masivas de Pokémon Leyendas: Arceus (25 tiradas extra de variocolor por ejemplar)
- **Como se haria:** En scripts/encontrar.js: Encontrar.brotesDeHoy() usando el mulberry32 que ya existe en explore.js línea 115 con semilla Math.floor(Date.now()/(6*3600*1000)); filtra areas por type=='wild' && rotation===rotationWildCurrent (variable ya calculada en explore.js 4903-4922). Cache en saved.brotes = {zona:{especie, restantes, hasta}}. Enganches: la cascada de spawns de setWildPkmn (explore.js 527-531) y la del bloque de eclosión (1070-1074) reciben un if previo; shinyPkmnChance en 1045. UI: badge dentro del divAreas del bucle de setWildAreas (explore.js 4525-4544), reutilizando la clase .rotation-timer y el .time-counter-daily que ya existen.
- **Esfuerzo:** medio · **Impacto:** alto · **Nota de la criba:** 8/10

### 10. Señores de zona: 30 salvajes con nombre propio y condiciones de aparición 🟡

**Un alfa único por región, muy sobrenivelado, con nombre propio y condición de aparición combinada, que puede derrotar a tu equipo automático.**

Tabla fija de ~30 señores, uno por rotación/región: especie, zona, +15 niveles sobre el nivel de la zona, x8 HP, IVs 5/5 y sobre todo 4 movimientos aunque la zona sea de nivel 10 (hoy un salvaje de nivel <=10 pelea con uno solo). Aparecen con un 2% al entrar en la zona SI se cumple su condición, y las condiciones usan sistemas que ya existen: 'solo con rotación 7 activa', 'solo con clima de tormenta', 'solo con Cadena de Zona >= 15', 'solo tras derrotar al entrenador de la región'. Clave de diseño para este motor: se les da un bonus plano de defensa, y como la defensa RESTA en vez de dividir, un señor puede dejar tus golpes en el mínimo de potencia — es el único enemigo del juego que exige revisar la construcción. Si te tumba, huye y no reaparece en 30 minutos y te rompe cadena y brote. Si lo ganas: huevo garantizado de su especie con 3 IVs a 5, 1/20 de variocolor y un mote por defecto con su nombre propio.

- **Por que engancha:** 'Maté a Gyarados del Dique' es una anécdota; 'maté a un Rattata' no. En un juego sin input durante el combate, el riesgo es el único recurso escaso que queda, y la condición combinada (rotación + clima + cadena) convierte la exploración en caza planificada. Además revive gratis las 200 zonas que mueren en cuanto pasas de ellas.
- **De donde sale:** Monstruos únicos de Xenoblade Chronicles y los Pokémon alfa de Leyendas: Arceus
- **Como se haria:** Tabla SENORES en scripts/encontrar.js con {id, especie, zona, nivelExtra, defBonus, condicion:()=>bool}. Sustitución dentro de setWildPkmn (explore.js 203-608): tras elegir spawnedPkmn se comprueba la zona y se sobreescriben wildLevel (515/525), hpMultiplier (555) y el bucle de thresholds de movimientos (535-545) para forzar 4. El defBonus se suma en las dos fórmulas de daño del salvaje (explore.js 3575 y 3582, donde ya se resta bst.def*30). Derrota del jugador: rama de playerHp<=0 (1951-1958). Estado en saved.senores = {id:{derrotado, reapareceEn}}. Nombre y aura en #explore-wild-name y voidAnimation sobre #explore-wild-sprite (el patrón de floating-pkmn ya está en 570).
- **Esfuerzo:** medio · **Impacto:** alto · **Nota de la criba:** 8/10

### 11. Medidor de captura: la rotación de movimientos decide cuánto capturas 🟡

**Sustituir el dado invisible del huevo por una barra que sube con la potencia cruzada y baja con los golpes recibidos.**

Hoy capturar es un rng(0,20) oculto que suelta un huevo. En su lugar, una barra 'Captura' 0-100 durante el combate: +6 por cada golpe que se beneficie del bonus cruzado, +3 extra por cada eslabón de la cadena de cruce por encima de 2 (o sea +6 con cadena de 4 tipos), +10 si el golpe es supereficaz, -8 por cada golpe recibido, y +15 si el salvaje cae con la barra por encima de 50. Resultado al derrotarlo: 100 = huevo garantizado con +1 IV; 60-99 = huevo normal; menos de 30 = nada. Un equipo monotipo mata rápido y captura poco; uno con cuatro tipos bien ordenados captura casi siempre. Se puede subir el suelo con objetos equipados (los inciensos que ya existen) para que el jugador manipule el número ANTES del combate, que es donde este juego se juega.

- **Por que engancha:** La mecánica central del juego (ordenar los 4 movimientos) hoy solo afecta al daño. Ligándola a la captura, la decisión que el jugador ya toma pasa a decidir también su colección, y el sistema deja de tener dos estados ('ganas' / 'pierdes'). Además el número visible enseña la fórmula sin un tutorial.
- **De donde sale:** La 'grabación' de Cassette Beasts (porcentaje de captura en vivo manipulable) y el Battle Rating de Monster Sanctuary
- **Como se haria:** Todo el cálculo cuelga de sitios que ya existen: crossPowerBonus se aplica en explore.js 2795 y la cadena está en cadenaCruce/longitudCadena() (2355-2372); la supereficacia ya se calcula con typeEffectiveness (3606); los golpes recibidos pasan por el bloque de daño del salvaje (3571-3602). El resultado sustituye al rng(probDrop) de la línea 1580 para el caso concreto de item.mysteryEgg (los demás drops se quedan como están). Barra nueva en index.html debajo de #exploe-wild-hp reutilizando las clases de la barra de vida; reset en setWildPkmn (203).
- **Esfuerzo:** medio · **Impacto:** alto · **Nota de la criba:** 8/10

### 12. Merienda: poderes de encuentro que duran COMBATES, no minutos 🟡

**Un ritual antes de dejar el juego solo: gastas tres objetos y eliges qué te va a pasar durante los próximos 2.000 combates.**

Eliges 3 objetos del inventario (hay 507 en el diccionario, muchos sin uso real) y obtienes hasta 2 poderes de nivel 1-3 según los puntos que aporten. Poderes: Encuentro (x3 el peso de un tipo concreto en la cascada de aparición), Destello (variocolor x6, de 1/400 a 1/67), Calidad (+2 tiradas de IV en cada eclosión), Cebo (probabilidad de huevo del 20% al 35%) y Rastro (x4 la probabilidad de que aparezca un señor de zona). Duración medida en COMBATES GANADOS, nunca en tiempo real: es la decisión de diseño crítica en este proyecto, porque el acelerador x1/x2/x5/x10 y el adelanto AFK reejecutan el mismo bucle y un buff por minutos se rompería o se desperdiciaría; midiéndolo en combates, acelerador y AFK se integran solos sin fórmula especial.

- **Por que engancha:** Es el ritual de preparación antes de la sesión: el jugador elige activamente qué quiere que le pase esta noche, y por eso esa noche es suya y no genérica. Convierte 'cierro el juego' en una decisión con seis horas de consecuencias.
- **De donde sale:** Sándwiches y poderes de comida de Pokémon Escarlata/Púrpura, con la métrica por oleadas de PokéRogue
- **Como se haria:** Panel en scripts/paneles5.js; tabla de puntos por objeto leyendo itemDictionary.js (cada item ya tiene .got, .newItem y .power()). Estado en saved.merienda = {poderes:[{id,nivel}], restantes}. Decremento en el bloque de muerte del salvaje de explore.js 1531, que también se ejecuta durante el AFK. Aplicación: Encuentro y Cebo en la cascada de spawns (527-531) y en probDrop (1572-1580); Destello en shinyPkmnChance (1045) y probShiny (170), enchufándose en la misma cadena de multiplicadores que ya usan Progreso.mult / Combate2.multBendicion / Extras2.multEvento; Calidad en el bucle de IVs (1084-1090).
- **Esfuerzo:** medio · **Impacto:** alto · **Nota de la criba:** 8/10

### 13. Sequías acotadas: piedad para el variocolor y distribución pseudoaleatoria para lo raro 🟢

**Techo garantizado para el variocolor y curva PRD en el slot raro y en los drops, para que la mala suerte tenga un final conocido.**

(1) Variocolor: saved.stats.rachaSinVariocolor ya se cuenta. De 0 a 399 encuentros, probabilidad normal; de 400 a 1199 se multiplica por 1+(racha-400)/400, es decir x1 a x3 (piedad blanda); a 1200 es garantizado y el contador se reinicia. La media efectiva baja de 400 a ~330 y el peor caso deja de ser infinito. (2) Slot raro: sustituir el rng(0.01) plano por PRD con C = 0,000156, es decir P(N) = C·N desde el último raro. La media sigue siendo 100 encuentros, pero el 98% de los raros salen antes del encuentro 220; con el 1% plano, el 11% de las rachas pasa de 220 y el 1% pasa de 460, que es justo la sensación de 'esto está roto'. (3) Mismo PRD para el drop de objetos (hoy rng(0.20)) con C = 0,0557: sigue cayendo 1 de cada 5, pero desaparecen las tandas de 15 combates sin nada.

- **Por que engancha:** Un idle reejecuta el bucle miles de veces al volver del AFK, así que la varianza plana es visible y brutal: dos sesiones idénticas dan resultados absurdamente distintos y el jugador culpa al juego. La investigación de gacha es clara: un techo conocido hace la apuesta psicológicamente tolerable. Y el PRD no hay ni que explicarlo, simplemente se percibe como que el juego es justo.
- **De donde sale:** Genshin Impact y Fire Emblem Heroes (piedad blanda + dura + garantía por contador), Old School RuneScape (drops garantizados por contador) y Dota 2 (distribución pseudoaleatoria P(N)=C·N).
- **Como se haria:** En scripts/encontrar.js: API.prd(clave, C) con los contadores en saved.prd = {rareSlot:0, drop:0, ...}. Tres puntos de sutura, todos de una línea: la cascada de spawn de setWildPkmn (explore.js:527-531, donde está el rng(0.01) del slot rare), el rng(probDrop) del bloque de muerte del salvaje (explore.js:1571) y el sorteo de variocolor de givePkmn (explore.js:174). Conviene aplicarlo también al rarePkmnChance del bucle de eclosión (explore.js:1044). Ninguna estructura nueva en el DOM.
- **Esfuerzo:** bajo · **Impacto:** alto · **Nota de la criba:** 8/10

### 14. Panel '¿Quién vive aquí?': siluetas, condición de bloqueo y porcentaje real de zona 🟡

**Cada zona enseña todas las especies que puede soltar: sprite si la tienes, silueta si la has visto, interrogación si no, y el motivo exacto de lo que falta.**

Cuadrícula con las tres listas de spawns de la zona. Sprite completo si caught>0; silueta (filter: brightness(0)) si ya la viste alguna vez pero no la tienes; '?' si nunca apareció. Cada casilla lleva su rareza con el porcentaje EFECTIVO real de la cascada actual (común 91,1% / poco común 7,92% / raro 1%), no el nominal, que es lo que hoy engaña. Cabecera de zona: '17/23 especies · 74% · variocolor 3/23'. Las bloqueadas explican por qué con el dato exacto: 'aparece en la rotación B, cambia en 7 h 20 min', 'solo con Cebo Antiguo', 'solo durante un brote'. Botón 'perseguir esta especie' que fija el objetivo de los rastros y de la cadena.

- **Por que engancha:** Es la conversión más barata que existe de RNG invisible en lista de tareas visible. El hueco vacío en una cuadrícula es un motivador enorme, pero solo si el jugador sabe cómo llenarlo; hoy con 312 zonas la única forma de saber qué falta dónde es mirar el diccionario. La silueta es un anzuelo puro y la condición de bloqueo es tutorial y objetivo a la vez.
- **De donde sale:** Petición #5719 de PokéClicker ('mostrar siempre todas las especies posibles por ruta con candado en las bloqueadas, en vez de obligar a mirar webs externas') y el DexNav de Rubí Omega/Zafiro Alfa.
- **Como se haria:** Registrar los avistamientos con una línea en setWildPkmn, junto a saved.currentPkmn = spawnedPkmn (explore.js:547): saved.vistos[spawnedPkmn] = true. El bucle que construye los tickets de zona en setWildAreas ya recorre areas[i].spawns entero para calcular completionMark y shinyMark (explore.js:4508-4514): ahí mismo se saca el porcentaje y se pinta junto al completedFlair (explore.js:4517). El panel se abre con Paneles.abrir('¿Quién vive aquí?', html) desde el click en la marca del ticket. La cuenta atrás de rotación sale de updateDailyCounters (explore.js:4936), que ya calcula el tiempo restante del reloj UTC.
- **Esfuerzo:** medio · **Impacto:** alto · **Nota de la criba:** 8/10

### 15. Brotes con umbrales internos de 30 y 60 KO 🟡

**Cada 12 h, 3 zonas entran en brote de una especie y matar 30 y 60 dentro del brote mejora el propio brote.**

Al cambiar la rotación de 12 h se eligen 3 zonas salvajes de la rotación activa y en cada una se promociona una especie de su lista `uncommon` o `rare` a `common` mientras dura el brote (override temporal, sin escribir en areasDictionary.js). Umbrales dentro del propio brote: a los 30 KO de esa especie, sus ejemplares salen 20 niveles por encima del nivel base de la zona (lo que sube el tramo de exp de x1 a x12 contra un equipo al día) y el variocolor al capturar pasa de 1/400 a 1/200; a los 60 KO, las capturas salen con 2 IV forzados a 5, los drops raros triplican probabilidad y los ejemplares salen 40 niveles por encima (tramo x64). El contador vive en el propio brote y muere con él, así que la decisión de gestión es cuándo gastas el consumible caro de rareza: antes o después de los 60.

- **Por que engancha:** Da un motivo concreto para volver HOY y para ir a un sitio concreto, no a cualquiera de las 312. Y como el AFK acumula los KO solo, el jugador vuelve a un juego que ya avanzó su barra: «brote de Gastly, 47/60», que es un reenganche muchísimo más fuerte que un número de monedas. Encima, los umbrales le devuelven escalones intermedios a un juego que solo tiene 5 niveles de zona.
- **De donde sale:** Brotes masivos de Escarlata/Púrpura (umbrales de 30 y 60 KO dentro del brote) y de Leyendas: Arceus.
- **Como se haria:** El reloj ya está montado: `updateDailyCounters()` (explore.js:4936) detecta el cambio de `halfDayNumber` y ya llama a `getSeed()`, `setWildAreas()` y `resetDailyTimers()`; basta con añadir `Niveles.sortearBrotes()` ahí. El sorteo usa `mulberry32(halfDayNumber)` (explore.js:115) y `arrayPick(array, n, seed)` (explore.js:94), que ya acepta semilla, así que los brotes son deterministas y compartidos entre jugadores sin servidor. El override de spawn y el `wildLevel` extra se aplican en `setWildPkmn()` (explore.js:203) leyendo `saved.brotes[saved.currentArea]`. La barra 30/60 se pinta como un `<span>` más dentro del bloque `explore-ticket-left` que `setWildAreas()` ya genera para cada zona (explore.js:4226).
- **Esfuerzo:** medio · **Impacto:** alto · **Nota de la criba:** 7.5/10

### 16. Brotes rotatorios que resucitan zonas ya superadas 🟡

**Cada 30 minutos, tres zonas ya conquistadas se marcan con un brote de una especie concreta: spawn dominante, tiradas extra y cadena al doble.**

Semilla determinista mulberry32(Math.floor(Date.now()/1800000)) para que el brote sea el mismo aunque recargues (y para que el acelerador no lo rompa). Elige 3 zonas entre las que tengan areas[i].defeated == true, con peso doble a las que llevas más de 7 días sin pisar. Dentro de un brote: la especie elegida gana un 50% de peso en el slot común —y solo en el común: nunca se tocan los slots uncommon ni rare—, +6 tiradas de variocolor y la cadena de captura sube de 2 en 2. Máximo 3 zonas con brote a la vez y una sola especie por zona. Reglas duras heredadas de la crítica a Pokémon GO: un brote nunca sustituye más de la mitad de la tabla, y siempre hay semanas sin nada, porque el juego sin evento tiene que ser el estado agradable por defecto, no un castigo.

- **Por que engancha:** Es la solución más barata que existe al problema de '312 zonas y solo juego en la última'. Crea una decisión de oportunidad real ('¿dejo mi cadena de aquí por el brote de allí?') y, al acumularse con el Nivel de Búsqueda y con la investigación, premia al que ya había trabajado esa especie: el coleccionismo pasado se revaloriza solo.
- **De donde sale:** Pokémon Legends: Arceus y Escarlata/Púrpura (brotes masivos como tiradas extra: +25 tiradas, de 1/4096 a ~1/158), con el freno de mano de la crítica de la comunidad de Pokémon GO 2024-2026 sobre saturación y homogeneización de spawns.
- **Como se haria:** En scripts/encontrar.js. Estado en saved.brotes = {idZona: {especie, hasta}}, recalculado desde loop() (explore.js:7669), que ya corre cada frame con el tiempo real. El sesgo se aplica en setWildPkmn antes de la cascada de explore.js:527. El distintivo visual va en el mismo sitio donde el ticket ya pinta completedFlair (setWildAreas, explore.js:4517) y una línea en el informe de vuelta del AFK. Ojo: usar el reloj real y no rngSeeded(), porque getSeed() es diario y aquí hacen falta 48 ventanas al día.
- **Esfuerzo:** medio · **Impacto:** alto · **Nota de la criba:** 7.5/10

### 17. Rastros: elegir el próximo encuentro entre tres pistas con riesgo creciente 🟡

**Tres cartas de rastro —cercano, medio y lejano— que cambian cuántos combates tardas y qué probabilidad hay de que salga la especie que persigues.**

El jugador fija una especie objetivo desde el panel de zona (o por defecto es la de su cadena activa). Cada 10 encuentros aparece una franja con tres rastros y se toca uno cuando se quiera; si no se toca ninguno, el juego sigue sorteando normal, así que sigue siendo un idle. Rastro cercano: se resuelve en 2 encuentros, 35% de que sea el objetivo, sin tiradas extra. Rastro medio: 5 encuentros, 65%, +2 tiradas de variocolor. Rastro lejano: 10 encuentros, 90%, +4 tiradas y +1 IV garantizado. Un rastro fallido rompe la cadena de captura; uno acertado la sube +3. Cuanto más larga la cadena, más pesa la elección, que es exactamente el efecto buscado.

- **Por que engancha:** Es el punto de decisión que hoy no existe. En un juego sin input durante el combate, la decisión hay que moverla ANTES del combate, y este formato convierte la aleatoriedad pura en una secuencia de apuestas con riesgo creciente sin pedir reflejos ni atención continua.
- **De donde sale:** Poké Radar de Diamante/Perla/Platino: parches temblorosos en cuatro anillos concéntricos, del 23-33% de acierto en el anillo cercano al 83-93% en el lejano, y el jugador elige a cuál ir.
- **Como se haria:** Reutiliza literalmente la interfaz de tres cartas elegibles que ya está construida y con estilos: createArenaCards() y pickArenaCard(number) en explore.js:7720-7793. Estado saved.rastro = {tipo, restantes, objetivo}. La resolución se hace al principio de setWildPkmn (explore.js:203): si restantes llega a 0, se fuerza spawnedPkmn al objetivo con la probabilidad del tipo de rastro, y si no, se cae en la cascada normal de explore.js:527. La rotura y subida de cadena tiran de la misma estructura saved.cadena.
- **Esfuerzo:** medio · **Impacto:** alto · **Nota de la criba:** 7.5/10

### 18. Alterados: ejemplares con el TIPO cambiado y los movimientos reasignados 🔴

**Una rareza nueva, por encima del variocolor, que sobrescribe el tipo de la especie y reconstruye sus 4 movimientos con el tipo nuevo.**

1/250 al eclosionar en zona normal, 1/60 dentro de un brote. Al salir alterado, la especie gana pkmn[id].alterado = {tipo, movimientos[4]}: un tipo distinto al suyo, elegido entre los que NO tiene, y cuatro movimientos de ese tipo sacados del diccionario con potencia acotada a la media de su movepool actual (para no romper la curva). Como pkmn[] es un singleton por especie, el alterado no destruye al normal: es un modo conmutable desde el editor de Pokémon, igual que ya se conmuta el variocolor. Paleta: filter hue-rotate derivado del color del tipo nuevo, coste de arte cero. El impacto no es cosmético: con potencia cruzada (x1,3 por tipo distinto al anterior más bonus por cadenas de 3 y 4 tipos), un alterado te da un tipo que tu equipo no tenía y reordena qué rotaciones son buenas.

- **Por que engancha:** Un variocolor es una paleta: bonito e irrelevante. Un alterado cambia CÓMO juega el bicho, así que la caza de rareza pasa a ser también caza de poder, y el jugador empieza a desear un alterado concreto en vez de 'cualquier cosa rara'. Es contenido casi gratis: reutiliza estadísticas base, sprites y diccionario de movimientos.
- **De donde sale:** Bootlegs de Cassette Beasts y especies Delta de Pokémon Insurgence
- **Como se haria:** Tirada junto a la de variocolor en el bloque de eclosión (explore.js 1110) y en givePkmn (176). Selección de movimientos leyendo moveDictionary.js filtrando move[x].type y move[x].power. Conmutador en el editor de Pokémon, exactamente donde ya vive el de variocolor (explore.js 8294-8305): al activarlo se escribe pkmn[id].type y pkmn[id].moves.slot1..4 (el juego ya guarda typeTemp/temporalType para tipos temporales, líneas 604 y 795, así que la infraestructura de restaurar tipo existe). Sprite: mismo patrón de filter:hue-rotate que ya se usa para starsign en 5528. Persistencia: añadir data[i].alterado a los dos bucles de pkmn de save.js (51-79 y 135-163).
- **Esfuerzo:** alto · **Impacto:** alto · **Nota de la criba:** 7/10

### 19. Nidos al volver del AFK: elige 1 de 3 con pistas imperfectas 🟡

**Tras una sesión AFK larga, parte del botín se convierte en tres nidos con pistas legibles y solo te llevas uno.**

Si storedAfkSeconds supera 1800 (30 min), el 40% de los huevos acumulados se retira del reparto automático y se presentan tres nidos en la pantalla de fin de zona. Cada nido enseña tres pistas de su contenido real: color del borde = rareza del pool (gris común, azul poco común, dorado raro), número de destellos 0-3 = IVs garantizados, y un icono opcional (estrella = variocolor, espiral = alterado) que tiene un 50% de ser falso positivo. Eliges uno y eclosiona con esas garantías; los otros dos se descartan mostrando lo que tenían, que es lo que crea la anécdota ('dejé el dorado por el de tres destellos y era basura'). Un nido de cada seis es 'nido dorado' con el doble de huevos.

- **Por que engancha:** El regreso del AFK es el único momento en que el jugador está mirando la pantalla, y hoy es un muro de texto con lo ganado. Una decisión con información incompleta convierte ese muro en el mejor momento de la sesión, sin tocar el combate ni el balance.
- **De donde sale:** Nidos y guaridas de Monster Hunter Stories 2 (brillo del huevo como pista antes de abrirlo)
- **Como se haria:** Se intercepta el bloque de eclosión de item.mysteryEgg en explore.js 1063-1136 antes del bucle: si storedAfkSeconds>1800 (variable ya existente, explore.js 1331 y 1361), se reserva parte de item.mysteryEgg.got y se pinta la elección en #area-end-pkmn-list (que ya se limpia condicionalmente según storedAfkSeconds en 900-901). Toda la generación de pistas usa los mismos arrayPick/rng de siempre; el nido elegido reejecuta el bucle existente con los valores forzados. Cero cambios en combate.
- **Esfuerzo:** medio · **Impacto:** medio · **Nota de la criba:** 7/10

---

# B. Jugabilidad

*decisiones en el minuto a minuto* — 13 ideas

### 20. Estilos Ágil / Fuerte por hueco de rotación 🟢

**Cada uno de los 4 huecos de la rotación lleva un estilo que cambia velocidad y potencia en direcciones opuestas.**

Tres estilos por hueco: Normal (x1 / x1), Ágil (temporizador x0,65 y daño x0,75) y Fuerte (temporizador x1,60 y daño x1,80). Los tres dan DPS parecido en el vacío (Ágil +15%, Fuerte +12,5%), así que la elección NO es aritmética: es que en Pokechill la defensa RESTA. Contra un salvaje de 5 estrellas de defensa se restan 150 puntos planos a cada golpe, así que cuatro golpes Ágiles pueden hacer literalmente 0 mientras uno Fuerte sí supera el umbral; contra salvajes de 1-2 estrellas de defensa pasa lo contrario y Ágil gana claro. Los estilos se desbloquean por movimiento con 'dominio': 200 usos de ese movimiento (barra que se llena sola con el AFK). Eso son 3^4 = 81 configuraciones por Pokémon sin que el jugador pulse nada durante el combate, y crea el eje TIEMPO que hoy no existe: la rotación tiene 'qué tipo' pero no 'a qué ritmo'.

- **Por que engancha:** Convierte 'qué movimiento uso' en 'con qué ritmo lo uso', que es la única decisión que un combate automático puede ofrecer sin pedir inputs. Y como interactúa con la defensa que resta, cada zona nueva obliga a mirar las estrellas del rival y volver a la pantalla de equipo, que es donde vive el juego.
- **De donde sale:** Pokémon Leyendas: Arceus (estilos ágil/fuerte y dominio de movimientos)
- **Como se haria:** Estado: `pkmn[i].estilos = {slot1:'normal',...}`, añadido al bucle de 23 campos de `saveGame()` en scripts/save.js. Potencia: una línea junto al bloque de multiplicadores de `exploreCombatPlayer()` (scripts/explore.js:2514, donde ya se calcula `totalPower`). Tiempo: `moveTimerPlayer *= EST[estilo].timer` justo antes de scripts/explore.js:2463, después de todos los modificadores de habilidades e items que ya se apilan en 2409-2458. Contador de dominio: incrementar donde el movimiento dispara y se hace `barProgressPlayer = 0` (explore.js:2518). UI: las moveboxes `pkmn-movebox-slotN-team-slotM` ya existen en el DOM; basta un badge que cicle al clic.
- **Esfuerzo:** bajo · **Impacto:** alto · **Nota de la criba:** 9.5/10

### 21. Pacto de zona: afijos que cambian REGLAS, con botín proporcional 🟡

**Antes de entrar eliges penalizaciones que rompen tu rotación; cada punto de dureza multiplica la recompensa.**

Ocho afijos, todos atacando la mecánica estrella en vez de restar daño genérico: «Niebla espesa» (2 pts, el primer movimiento de cada ciclo hace 0 pero no rompe la cadena → te obliga a poner un movimiento barato de apertura); «Eco» (2, repetir tipo ya no rompe la cadena pero todo pega -20% → invita a una rotación monotipo); «Arritmia» (3, cada temporizador se aleatoriza ±40%); «Coraza» (3, la defensa del salvaje resta 60 por estrella en vez de 30 → los movimientos de potencia baja hacen literalmente 0); «Prisa» (2, tus temporizadores -25% pero la fatiga te golpea cada 5 s en vez de cada 10); «Tipo prohibido» (3, un tipo al azar del día hace 0); «Muerte súbita» (4, un solo caído termina la salida); «Cadena frágil» (2, la cadena cruzada se reinicia cada 3 movimientos). Con dureza total D: botín x(1+0,20·D) y experiencia x(1+0,15·D). La PRIMERA victoria de cada zona a D≥5, D≥10 y D≥15 suelta algo que no se consigue de ninguna otra forma. Lo importante: un afijo de regla invalida tu solución anterior, no puedes resolverlo pegando más, tienes que reconfigurar.

- **Por que engancha:** La dificultad deja de ser un ajuste de menú y pasa a ser una barra de progreso que tú te fijas. Y es el antídoto directo contra 'ya ordené bien mis 4 movimientos y no vuelvo a tocarlos'.
- **De donde sale:** Hades (Pacto de Castigo) y Diablo IV / Path of Exile (afijos de mapa, más mods = más botín)
- **Como se haria:** `saved.pacto = {zonaId: maxDureza}` más un array de afijos activos. Cada afijo es UN `if` en un sitio que ya existe: temporizadores (scripts/explore.js:2409-2458), término de defensa de la fórmula (explore.js:2514), bloque de Potencia Cruzada (explore.js:2668-2684), fatiga (explore.js:3263-3280) y bloque de caída (explore.js:1958). El precedente exacto ya está en el código: `saved.gamemodCruce` se consulta con un solo `if` en explore.js:2684, y la tabla `MODIFICADORES` de scripts/script.js ya enlaza claves de `saved` con casillas de UI.
- **Esfuerzo:** medio · **Impacto:** alto · **Nota de la criba:** 9/10

### 22. Teratipo latente por individuo con disparador configurable 🟡

**Cada Pokémon capturado esconde un tipo propio que se activa solo a mitad de combate y recalcula toda la rotación.**

Al capturar se sortea `teratipo`: 70% uno de sus tipos propios, 30% uno cualquiera de los 18. Se revela en el resumen de captura. En combate se activa AUTOMÁTICAMENTE en un momento que el jugador configura: (a) al completar la primera vuelta de rotación, (b) al bajar del 50% de PS, o (c) a los 30 s. Al activarse, el Pokémon pasa a ser de su teratipo durante 25 s: el STAB (1,5 base, +0,2 si es monotipo) se mueve al teratipo, defensivamente solo tienes las debilidades del teratipo, y — la clave — la cadena de Potencia Cruzada NO se reinicia. Resultado: el MISMO orden de 4 movimientos puntúa distinto en la fase 1 y en la fase 2, así que ordenarlos pasa a ser un puzle de dos capas. Efecto colateral valioso: dos Pikachu dejan de ser el mismo Pikachu, lo que da valor a los cientos de duplicados que hoy se acumulan sin uso, sin montar un sistema de crafteo.

- **Por que engancha:** Es el cambio más grande posible en la construcción de equipo con el menor coste de interfaz: una propiedad oculta y aleatoria por individuo que convierte cada captura en una tirada con significado.
- **De donde sale:** Pokémon Escarlata/Púrpura (teracristalización y teratipos)
- **Como se haria:** El campo ya casi existe: `initialiseArea()` hace `pkmn[team[slot].pkmn.id].typeTemp = pkmn[...].type` (scripts/explore.js:4110), y el motor ya respeta `typeTemp` para STAB y efectividad. Basta sortear `pkmn[i].teratipo` en `givePkmn()` (scripts/explore.js:129), persistirlo en el bucle de campos de scripts/save.js, y escribir `typeTemp` cuando se cumpla el disparador dentro de `exploreCombatPlayer()`, justo después de que avance el puntero `team[slot].turn`. Es exactamente la misma técnica que ya usa `abilityTemp`.
- **Esfuerzo:** medio · **Impacto:** alto · **Nota de la criba:** 9/10

### 23. Innatas: pasivas que cambian las reglas de la rotación, sin tocar los diccionarios 🟡

**Cada especie gana 2 pasivas fijas derivadas de su id, y todas hablan el idioma de la rotación y la cadena cruzada.**

Pozo de 20 innatas, todas dirigidas al núcleo del juego: «Inercia» (repetir tipo una vez no rompe la cadena); «Cierre» (el 4º movimiento del ciclo pega +60%); «Apertura» (el 1º del ciclo tiene -40% de temporizador); «Metrónomo» (si los 4 movimientos son de 4 tipos distintos, +25% permanente); «Aguante» (por debajo del 30% de PS, todos los temporizadores -30%); «Tara» (el movimiento de más potencia de la rotación cuesta +30% de temporizador); «Vampiro» (el 2º movimiento del ciclo cura un 3% de PS máximos); «Zurdo» (la cadena se cuenta al revés, del hueco 4 al 1). Cada especie recibe 2, elegidas de forma determinista mediante un hash de su `id`: estable entre partidas, idéntico para todos los jugadores y con CERO entradas nuevas que escribir para 1.408 especies. Un tercer hueco raro se rellena con la `hiddenAbility` que las especies ya declaran en el diccionario. Efecto de diseño: 'Tara' y 'Zurdo' son penalizaciones, así que el jugador tiene que construir alrededor de sus innatas y no solo elegir a los seis más fuertes.

- **Por que engancha:** En un juego donde no pulsas nada durante el combate, las pasivas son la fuente de variedad más honesta que existe: son literalmente el sistema. Y multiplican las construcciones sin añadir ni una especie ni una estadística.
- **De donde sale:** Pokémon Elite Redux (hasta 3 habilidades innatas simultáneas) y las habilidades ocultas de la saga principal
- **Como se haria:** Todo en scripts/jugabilidad.js: `Jugabilidad.innatas(id)` con un hash de cadena sobre `pkmn[i].id`, sin tocar pkmnDictionary.js (20.245 líneas). La consulta va donde ya vive `testAbility(target, id)` (scripts/explore.js:9706) y en los sitios donde ya se apilan modificadores de temporizador (explore.js:2409-2458) y de potencia (explore.js:2514). La cadena se toca en el bloque de `lastCrossStab` (explore.js:2668-2684). Nada que persistir: se recalcula del id.
- **Esfuerzo:** medio · **Impacto:** alto · **Nota de la criba:** 9/10

### 24. Banco de tiempo AFK: el tiempo ausente se gasta, no se consume solo 🟡

**El tiempo acumulado sin jugar entra en un banco con tope de 24 h y el jugador decide dónde y cómo gastarlo.**

Hoy `afkSeconds` se calcula al cargar y se drena automáticamente en la zona en la que estabas. Cambio: ese tiempo va a `saved.tiempoBanco`, con tope de 24 h (los idle con tiempo offline ilimitado entrenan al jugador a NO abrir la app, un tope diario invita a volver sin castigar el día que se salta). Tres formas de gastarlo: Normal (1 s de banco = 1 s de simulación, donde tú digas); Concentrado (gastar mínimo 30 min de golpe en una sola zona da x1,25 de experiencia a ese bloque, lo que premia planificar en vez de picotear); y Reserva (por cada 6 h guardadas ganas 1 Carga de Sobremarcha, máximo 5; cada carga son 10 min de combate a triple velocidad con botín x2, gastables cuando quieras). Con esto el tiempo pasa de ser algo que te ocurre a ser un recurso con presupuesto: ¿lo quemo ahora en la zona de nivel 70 donde la experiencia paga x12, o lo guardo para tener 5 cargas cuando entre a la Travesía? Al volver, en lugar de una cifra, una línea de tiempo del ausente: zonas superadas, entrenadores derrotados, capturas agrupadas por especie y los variocolor destacados — que es EL momento del idle y hoy se desaprovecha.

- **Por que engancha:** Es el hueco más limpio del diseño actual: en un idle el tiempo es la moneda principal y aquí nunca ha sido una decisión. Convertirlo en presupuesto crea planificación sin añadir ni un botón durante el combate.
- **De donde sale:** Melvor Idle (tope de 24 h e informe de regreso detallado) y Cookie Clicker
- **Como se haria:** El bucle de juego no se toca en absoluto: ya drena `afkSeconds` (scripts/explore.js:2255-2295). Solo hay que interceptar la asignación inicial en el listener de `load` (scripts/explore.js:10513) y volcarla a `saved.tiempoBanco`, exponiendo `Jugabilidad.gastarTiempo(segundos)` que hace `afkSeconds = segundos`. El patrón de reservar tiempo para devolverlo después ya existe tal cual: `storedAfkSeconds` en explore.js:1306 y :1364. La Sobremarcha reutiliza el acelerador (`accumulator += delta * velocidadCombate()`, explore.js:2181). UI en paneles5.js dentro del tooltip genérico que ya usa todo el juego.
- **Esfuerzo:** medio · **Impacto:** alto · **Nota de la criba:** 9/10

### 25. Ciclos escalantes de zona con retirada voluntaria 🟡

**Quedarte en una zona la va endureciendo por tramos y multiplicando el botín; irte a tiempo lo cobras, caer lo pierde todo.**

Cada 10 victorias seguidas sin salir de la zona sube 1 Ciclo. Por Ciclo: nivel del salvaje +4 (se suma al `random(level-9, level)` actual), PS del salvaje x1,15, probabilidad de botín x(1+0,25·c) con tope x4. La experiencia escala sola y de forma brutal porque el juego ya premia pelear por encima de tu nivel: con 5 Ciclos el salvaje está +20 sobre ti y la tabla da x12; con 12 Ciclos, x128. Y como los PS del equipo NO se restauran entre combates y la fatiga sigue corriendo, el ciclo 8-10 es letal. Botón «Retirarse» siempre visible: cobras un cofre de c·2 objetos y el récord `saved.ciclos[zona]` queda registrado. Si en cambio se te cae el equipo entero, pierdes el 100% del cofre acumulado y el récord de esa zona baja 1. Esto arregla de paso un problema estructural: solo hay 5 niveles de zona en todo el juego (10, 30, 50, 70, 90) y los Ciclos rellenan los huecos de forma continua sin crear ni una zona nueva.

- **Por que engancha:** Es la pregunta '¿me quedo una vuelta más?' — la decisión más adictiva que existe en un juego sin input, porque la tensión la fabrica el propio jugador. Y por primera vez perder cuesta algo concreto y visible.
- **De donde sale:** Loop Hero (bucles que escalan y la decisión de retirarse en la hoguera)
- **Como se haria:** Contador en el bloque de victoria de `updateWildPkmn()` (scripts/explore.js:1520, donde `percent <= 0`). Nivel: `wildLevel` se fija en `setWildPkmn()` en scripts/explore.js:525 — sumar `4 * ciclo` ahí. Derrota: el bloque que comprueba los 6 slots a 0 PS y llama a `leaveCombat()` (explore.js:2001-2010). Reinicio en `initialiseArea()`. Persistencia `saved.ciclos = {}`. El botón se cuelga junto al indicador `auto-refight-info` que ya se muestra/oculta en `initialiseArea()`.
- **Esfuerzo:** medio · **Impacto:** alto · **Nota de la criba:** 8.5/10

### 26. Hierba Espejo: copiar un movimiento de un compañero para tapar un hueco de tipo 🟢

**Un Pokémon copia un movimiento de otro miembro del equipo, sin criar ni huevos, para acceder a tipos que su lista de nivel no cubre.**

Objeto nuevo `mirrorHerb` (tipo `held`). Equipado, deja copiar UN movimiento de otro miembro del equipo si hay hueco libre, tras 60 s de 'picnic' que se consumen con la maquinaria de tiempo que ya existe. El movimiento copiado conserva su tipo pero pega x0,85 en manos del copiador. Solo 1 copiado a la vez por Pokémon; sustituirlo es gratis. Por qué importa AQUÍ concretamente y no en cualquier juego: con 4 huecos y una mecánica estrella que paga x1,3 por cambiar de tipo, cientos de especies son inviables porque su pool por nivel solo cubre 2 tipos, así que su cadena cruzada nunca pasa de 2 eslabones. La Hierba Espejo convierte a esas especies en candidatas reales de equipo sin tocar ni una estadística, que es exactamente el parche que necesitan las 1.408 entradas del dex condenadas por `statToRating`. Y da un uso al aprendizaje por nivel (un movimiento nuevo cada 7 niveles) más allá de acumular pool.

- **Por que engancha:** Elimina toda la fricción de la cría pero mantiene la recompensa: acceso a movimientos 'que no te tocaban'. Es el mecanismo por el que el Pokémon corriente que capturaste en la zona 3 puede acompañarte hasta el final.
- **De donde sale:** Pokémon Escarlata/Púrpura (Hierba Espejo y movimientos huevo sin criar)
- **Como se haria:** Añadir la entrada a scripts/itemDictionary.js con `type:'held'` y `power()` en función de `returnItemLevel(this.id)` (menos segundos de picnic a más nivel del objeto, que es como ya escalan los 507 objetos con duplicados). Campo `pkmn[i].movePrestado` persistido en el bucle de scripts/save.js. La asignación escribe en `pkmn[id].moves.slotN`, que ya es la estructura canónica. El x0,85 es una línea en el bloque de potencia de explore.js:2514. Traducción del nombre a es.js (el archivo ya cubre 503/507 objetos y las MTs se generan solas).
- **Esfuerzo:** bajo · **Impacto:** medio · **Nota de la criba:** 8/10

### 27. Compás: acciones sin daño dentro de la rotación 🟡

**Cuatro pseudo-movimientos de potencia 0 (Carga, Guardia, Relevo, Compás) que se meten en las 4 ranuras y convierten el 'cuándo' en una decisión.**

Carga: timer 2500 ms, el siguiente movimiento hace x2,4 y cuenta como +1 eslabón de cadena. Guardia: timer 1600 ms, -60% al daño recibido durante 4 s y anula la fatiga de los dos siguientes lanzamientos. Relevo: timer 2000 ms, cambia al siguiente miembro vivo conservando la cadena de cruce. Compás: timer 600 ms, no hace absolutamente nada salvo desplazar el ciclo 0,6 s para alinearlo con otra cosa (la apertura del rival, el pulso de zona). El coste no es teórico: cada lanzamiento paga daño de fatiga (explore.js:3263), así que un hueco de relleno cuesta HP real y ocupa 1 de tus 4 ranuras.

- **Por que engancha:** Hoy la rotación tiene un solo eje ('alterna tipos') y se resuelve en la primera hora. Con acciones que no pegan, el jugador deja de ordenar 4 ataques y empieza a componer un compás: dónde pongo el pico, cuánto me cuesta el hueco, merece la pena perder una ranura de daño para que la Carga caiga siempre sobre el cuarto eslabón de la cadena. Es un artefacto que construir, no un número que sube.
- **De donde sale:** Propuesta de diseño de idle RPG (Medium): antes de la mazmorra ordenas seis cartas de acción en secuencia fija y el combate la ejecuta; el interés está en que caben acciones que no son daño.
- **Como se haria:** Entradas nuevas en scripts/moveDictionary.js con power: 0. La tubería ya las trata bien sin tocarla: el bloque de cruce (explore.js:2668) exige move[...].power > 0 tanto para dar el x1,3 como para escribir lastCrossStab, así que un movimiento de potencia 0 atraviesa la rotación sin romper la cadena — ese es el hueco exacto donde encajan. Carga usa castEffect() para poner una bandera global cargaPendiente que se lee en el paso 3 de la tubería (movePower, explore.js:2557). Guardia escribe en team[slot].buffs, que ya es un mapa clave→turnos restantes. Relevo llama a switchMemberNext() (teams.js:587). Para entregarlos, MTs nuevas en shop.js o moveset propio.
- **Esfuerzo:** medio · **Impacto:** alto · **Nota de la criba:** 8/10

### 28. Cadena SOS: no rematar es la jugada 🟡

**El salvaje pide refuerzos si sobrevive 6 s por debajo del 20% de vida; mantener la cadena exige una rotación que NO mate rápido.**

Si el salvaje pasa 6 s continuos por debajo del 20% sin morir, llama a un aliado de su especie y la cadena sube 1 (10% de fallo por llamada). Umbrales: cadena 11 → variocolor de 1/400 a 1/150 e IV mínimo 2; cadena 21 → 1/90 e IV mínimo 3; cadena 31 → 1/60, IV mínimo 4 y objeto garantizado. Se rompe si lo matas estando por encima del 20%, si cambias de zona o si falla la llamada. Como no puedes pulsar nada, la única palanca es la rotación: te hace falta un movimiento flojo, una Guardia o un Compás para poder sostener sin rematar — y eso significa construir a propósito una rotación mala en daño.

- **Por que engancha:** Invierte toda la lógica del juego: durante una cadena SOS pegar fuerte es un error. Es la única forma de que un combate automático plantee un problema de precisión y no de potencia, y usa la mecánica de rotación como respuesta en vez de como decoración.
- **De donde sale:** Cadena SOS de Pokémon Sol/Luna y Ultrasol/Ultraluna, con sus umbrales duros en 11, 21 y 31 llamadas.
- **Como se haria:** Contador de pasos en updateWildPkmn() comparando wildPkmnHp/wildPkmnHpMax; la variable ya está a mano (explore.js:196). La llamada reutiliza setWildPkmn() (explore.js:203) forzando la especie actual y saltándose el respawn por setTimeout de explore.js:1406. Los umbrales de variocolor entran donde ya hay una cadena de multiplicadores por módulo — probShiny en givePkmn (explore.js:170), junto a Progreso.mult, Combate2.multBendicion, etc. — y los IVs mínimos, en el bloque de IVs de la misma función.
- **Esfuerzo:** medio · **Impacto:** alto · **Nota de la criba:** 8/10

### 29. Campo transformable: x1,3 por cambiarlo, apilable con la Potencia Cruzada 🔴

**Cada zona arranca con un campo; ciertos tipos lo transforman en otro, y transformarlo da x1,3 al movimiento que lo hizo.**

El diccionario `field` ya tiene 42 entradas y varias áreas ya declaran `fieldEffect`. Se les añade una tabla de transformación: Campo de Hierba + movimiento de Fuego → Campo Quemado (Fuego x1,5, Planta x0,5); Campo Quemado + Agua → Campo Fangoso (Tierra y Agua x1,3, todos los temporizadores +20%); Campo Eléctrico + Tierra → Campo Descargado (neutro, pero devuelve 5% de PS por golpe). Transformar da x1,3 al movimiento que transforma, y ese x1,3 se APILA con el x1,3 de Potencia Cruzada: 1,69 en un solo golpe, o 2,2 con una cadena larga. Enfriamiento de 8 s entre transformaciones para que no puedas encadenarlas cada movimiento. Con eso el orden de los 4 movimientos deja de ser un problema de 'alternar tipos' y pasa a ser una secuencia: el hueco 2 transforma, y los huecos 3-4-1 cobran el multiplicador del campo nuevo. Un detalle que valida el diseño: los autores de Reborn llegaron por otro camino a exactamente el mismo x1,3 que ya usa Pokechill.

- **Por que engancha:** Es la mecánica más elogiada de toda la escena de fangames, y es planificación pura resuelta sola en el tiempo: pones el campo y los siguientes segundos cobran el interés.
- **De donde sale:** Pokémon Reborn / Rejuvenation (37 y 48 campos con bonus x1,3 por transformarlos)
- **Como se haria:** Extender las entradas de `field` en scripts/areasDictionary.js con `transforma: {fire:'burntField', water:'muddyField'}` y `mult: {fire:1.5, grass:0.5}`. Estado `campoActual` reiniciado en `initialiseArea()` justo donde ya se reinician `saved.weatherTimer` y `saved.weatherCooldown` (scripts/explore.js:4130). Lectura en la tubería de daño con el mismo patrón que ya se usa: `areas[saved.currentArea].fieldEffect?.includes(field.averageTime.id)` en explore.js:2444. El x1,3 se aplica en el mismo bloque que el cruce (explore.js:2668-2684) para que apilen de forma explícita y auditable.
- **Esfuerzo:** alto · **Impacto:** alto · **Nota de la criba:** 7/10

### 30. Apertura del rival y panel de sincronía de ciclos 🔴

**El salvaje abre una ventana de 1,8 s en la que recibe x1,8; como no puedes pulsar nada, la palanca es elegir movimientos por su TIMER para que el pico caiga dentro.**

Antes de ejecutar su movimiento de mayor timer, la barra del salvaje parpadea 1,8 s: durante esa ventana recibe x1,8 de daño. El ciclo del salvaje es determinista (suma de los timers de sus 1-4 movimientos, modulada por su velocidad), así que el desfase con tu rotación es calculable. Panel 'Sincronía' en el editor de rotación: periodo del salvaje (p. ej. 7,4 s), periodo de tu rotación (p. ej. 6,1 s), deriva por ciclo (-1,3 s) y marca en verde cuál de tus 4 movimientos cae dentro de la apertura en los próximos 5 ciclos. Aquí es donde el Compás de 600 ms (idea 1) pasa de curiosidad a herramienta.

- **Por que engancha:** Es el eje que le falta al puzle: hoy los movimientos se eligen por tipo y potencia, y el timer es un dato invisible. Con la apertura, dos movimientos del mismo tipo y potencia dejan de ser intercambiables. Y como todo es determinista, el jugador puede resolverlo con la cabeza en vez de con reflejos, que es exactamente lo que pide un juego sin input en combate.
- **De donde sale:** Xenoblade (break/topple: la ventana la abre el enemigo y tú te preparas para ella) y Monster Sanctuary; más la crítica de Loop Hero sobre techos de habilidad que se agotan si solo hay un eje.
- **Como se haria:** La ventana sale gratis de lo que ya existe: barProgressWild avanza en exploreCombatWild() (explore.js:3700) con el mismo esquema de barra que el jugador; basta con marcar un global aperturaWild = true cuando barProgressWild supera el umbral equivalente a 1,8 s con el timer actual. El multiplicador entra en la tubería de exploreCombatPlayer justo tras el bloque de cruce (explore.js:2679). El panel es una función pura que suma move[x].timer * Math.pow(0.9, spe) * Math.pow(0.95, ivSpe) sobre las 4 ranuras — la misma fórmula de explore.js:2511 — y encaja en scripts/asesor.js, que ya analiza y ordena movimientos.
- **Esfuerzo:** alto · **Impacto:** alto · **Nota de la criba:** 7/10

### 31. Reloj de huida: el encuentro caduca según su rareza 🟢

**Cada salvaje trae un temporizador de huida (45/25/12 s según común, poco común o raro); el ciclo TOTAL de tu rotación pasa a ser una estadística que importa.**

Común 45 s, poco común 25 s, raro 12 s. Si expira, huye: sin experiencia, sin objeto, rompe la cadena y no cuenta para la mochila. Los entrenadores, la frontera y el entrenamiento no llevan reloj. Objetos y habilidades ya existentes que bajan timers pasan a tener un segundo uso evidente, y aparece un aviso visual/sonoro al arrancar el reloj de un raro.

- **Por que engancha:** El 1% de encuentros raros hoy es idéntico al 91% común: aparece, muere, siguiente. Con reloj, un raro es un examen de DPS de 12 segundos que puedes fallar, y por primera vez el jugador tiene motivo para medir cuánto tarda su rotación completa en vez de solo cuánto pega cada golpe. También crea el dilema opuesto al SOS: una rotación construida para sostener cadenas SOS falla los raros.
- **De donde sale:** Huida de los encuentros de Leyendas Arceus y DexNav (el Pokémon se va si tardas), más los exámenes de DPS por segmentos de PokéRogue.
- **Como se haria:** El bloque de rareza ya está resuelto en setWildPkmn() (explore.js:203) con las tres asignaciones en cascada; guardar la rareza elegida en un global wildRareza y arrancar wildRelojPasos en el mismo sitio. Descontar en exploreCombatWild() (explore.js:3700), que ya ejecuta un paso por tick y por tanto respeta AFK y el acelerador sin código extra. Al llegar a 0, saltar a la ruta de respawn existente sin pasar por el bloque de recompensas de explore.js:1520.
- **Esfuerzo:** bajo · **Impacto:** medio · **Nota de la criba:** 7/10

### 32. Cargas de movimiento que se agotan y hacen SALTAR el hueco 🟡

**Cada movimiento tiene usos limitados por estancia en zona; al agotarse, la rotación se salta ese hueco y la cadena cruzada cambia de forma.**

Cargas iniciales según `move.rarity`: rareza 1 → 40 usos, 2 → 30, 3 → 20, 4 → 12, 5 → 8. Se consumen por uso y NO se recuperan al terminar cada combate, solo al abandonar la zona. Cuando un hueco llega a 0 la rotación lo SALTA (avanza el puntero sin ejecutar) pero sin borrar `lastCrossStab`, así que la cadena de Potencia Cruzada sobrevive... con otro orden de tipos. Ese es el corazón de la idea: una rotación Fuego-Agua-Planta-Roca que se queda sin Fuego pasa a ser Agua-Planta-Roca, y si Roca y Agua eran los eslabones que sostenían la cadena, tu daño se cae solo. Recuperación en zona: cada victoria devuelve +1 carga al hueco que dio el golpe final (premia repartir), y un objeto nuevo tipo `held` devuelve 1 carga cada 10 s. Consecuencia enorme para el AFK: hoy dejas 4 nukes y vuelves; con cargas, dejar el juego 6 h exige una rotación SOSTENIBLE (rareza baja, muchas cargas) en vez de una rotación de pico. Son dos construcciones distintas para dos formas de jugar.

- **Por que engancha:** Es el único recurso agotable del juego, y no se gestiona pulsando botones: se gestiona eligiendo qué movimientos pones. Además parte el metajuego en dos (sesión activa vs sesión AFK), que es contenido nuevo sin contenido nuevo.
- **De donde sale:** Los PP de la saga principal, leídos con la lente de Deep Rock Galactic (recursos que no se reponen entre etapas)
- **Como se haria:** Estado en runtime `cargas[slotEquipo][numHueco]`, reiniciado en `initialiseArea()` (scripts/explore.js:4104, exactamente donde ya se hace `team.slotN.turn = 1` y se limpia `lastCrossStab`). El salto va en el mismo bloque que hoy hace `if (!nextMovePlayer) { team[...].turn++; lastCrossStab = undefined; return; }` dentro de `exploreCombatPlayer()`, pero SIN el `lastCrossStab = undefined`. El decremento, donde el movimiento dispara (explore.js:2518). Pintado: número pequeño en la movebox, con el mismo `innerHTML` que ya usa el resto de la UI.
- **Esfuerzo:** medio · **Impacto:** alto · **Nota de la criba:** 6.5/10

---

# C. Niveles y progresion

*subir, avanzar y sentir que avanzas* — 10 ideas

### 33. Nivel heredado y Puntos de Legado al evolucionar 🟢

**Evolucionar deja de regalar un nivel 1 inútil: el nuevo nace al 80% del nivel del original y el 20% perdido se convierte en puntos que el jugador reparte.**

Hoy explore.js:1847 hace literalmente `givePkmn(pkmn[evolucion.id], 1)`. Pasa a `givePkmn(pkmn[evo.id], Math.max(1, Math.floor(nivelOriginal*0.8)))`. givePkmn ya acepta nivel y recorre 1..finalLevel aprendiendo un movimiento en el nivel 1 y cada 7, así que el evolucionado llega con movepool completo y 4 movimientos equipados sin código nuevo. El 20% que se pierde no se tira: `saved.legado[lineaId] += Math.ceil(nivelOriginal*0.2)`, y cada 25 puntos acumulados = 1 Punto de Legado gastable en esa LÍNEA evolutiva (Charmander, Charmeleon y Charizard comparten bote): (a) +1 IV en la estadística que elijas, tope 5; (b) −8% al temporizador base de un slot concreto de la rotación, apilable hasta −24%; (c) +1 estrella efectiva en una estadística, máximo +1 por Pokémon. Un Charizard evolucionado desde un Charmeleon de nivel 60 nace a nivel 48 y deja 12 puntos de legado.

- **Por que engancha:** Hoy evolucionar es un castigo encubierto: la recompensa por invertir 60 niveles es empezar de cero otros 60. Es el punto exacto donde la gente deja de experimentar con criaturas nuevas y congela su equipo. Con esto la evolución es por fin lo que aparenta ser, y los puntos repartibles hacen que dos Charizard del mismo jugador puedan salir distintos.
- **De donde sale:** Siralim Ultimate (el NPC 'Level Up' que las reseñas de Steam llaman 'the make it or break it') + Disgaea (Reencarnación con Puntos de Bonus repartibles)
- **Como se haria:** Bloque de evolución dentro de updateTeamExp, explore.js:1847. givePkmn está en explore.js:128 y ya hace el bucle de aprendizaje por nivel. Estado nuevo en `saved.legado = {}`: persiste gratis porque save.js:8 hace `data.saved = saved`. Nuevo archivo scripts/niveles.js con el patrón `var Niveles = (function(){...})()` de prestigio2.js, cargado en index.html entre combate3.js y save.js. Panel en un tooltip nuevo siguiendo paneles5.js.
- **Esfuerzo:** bajo · **Impacto:** alto · **Nota de la criba:** 9/10

### 34. Salvajes con aura por contador de derrotas 🟢

**Cuantos más ejemplares de una especie derrotas, más probable es que salga uno con aura: sobrenivelado por encima del techo de la zona, con IVs garantizados.**

`saved.ko[especie]++` en el bloque de muerte del salvaje. Probabilidad de aura: 0% hasta 20 KOs, 1,5% con 20, 3% con 50, 5% con 100, 8% con 200 (tope). El ejemplar con aura sale a nivel = techo de la zona + 20, así que una zona de nivel 10 escupe uno de nivel 30 y un equipo de nivel 10 se lleva el x12 de experiencia sin moverse de sitio; además 3 IVs garantizados a 5, PS x2 y, al capturarlo, un movimiento marcado 'de aura' fuera de su pool. Probabilidad de variocolor x2 durante ese encuentro. El aura se pinta con un `filter: drop-shadow(0 0 6px gold)` inline sobre #explore-wild-sprite: cero assets nuevos.

- **Por que engancha:** Premia exactamente lo que un idle produce solo — matar cientos de lo mismo en el mismo sitio — y devuelve relevancia a la zona de nivel 10 cuando el jugador ya va por nivel 40, que es el problema estructural de tener solo 5 niveles de zona. Es la mecánica con más rendimiento por línea de código de toda la lista: el bucle ya cuenta KOs.
- **De donde sale:** Pokémon Brillantes (con aura) de Espada/Escudo, cuya probabilidad escala con el contador de derrotados de la Pokédex
- **Como se haria:** Contador en el bloque de muerte del salvaje de explore.js:1530, junto a los `Extras.contar('combatesGanados')` que ya están ahí. Sorteo y sobrenivel en el else de setWildPkmn (explore.js:513-530). Los PS ya escalan solos por la fórmula de explore.js:588. Los IVs se fijan en givePkmn (explore.js:128), donde ya se resuelve el variocolor.
- **Esfuerzo:** bajo · **Impacto:** alto · **Nota de la criba:** 9/10

### 35. Caramelos de especie: la experiencia que hoy se tira a nivel 100 🟢

**En vez de poner la ganancia a cero al llegar a 100, la experiencia sobrante se convierte en caramelos de esa especie que compran desbloqueos permanentes de su línea.**

explore.js:1616 hace literalmente `if (pkmn[...].level==100) expGained = 0`. Sustituirlo por: la experiencia calculada se convierte en caramelos a razón de 1 por cada 400 puntos. Con la base de 17 y un salvaje 50 niveles por encima (x128 = 2.176 por victoria) un nivel 100 produce ~5 caramelos por combate; peleando en una zona de su propio nivel, 1 cada 24 combates. Tienda por línea evolutiva: 10 caramelos = −15% al temporizador de todos sus movimientos (3 compras, −45% acumulado); 25 = +1 al IV base con el que nacen los futuros ejemplares de la línea; 40 = desbloquea su pasiva; 60 = los nuevos ejemplares de la línea nacen a nivel 50 en vez de 1; 100 = +1 estrella efectiva permanente en su mejor estadística.

- **Por que engancha:** Hoy el nivel 100 es un muro seco: el equipo se congela y el jugador ya no obtiene nada de seguir donde está. Con esto seguir peleando con el mismo bicho ES la forma de avanzarlo, y el jugador que se encariñó con un Pokémon mediocre por fin tiene un proyecto largo para él. Ningún segundo de juego se tira, que en un idle es sagrado.
- **De donde sale:** PokéRogue (caramelos por especie ganados combatiendo) + la regla de Guild Wars 2 de que la XP posterior al nivel máximo se redirige en vez de perderse
- **Como se haria:** Un solo `if` en explore.js:1616, dentro del bloque de experiencia que ya encadena `Progreso.mult('expPct')`, `Combate2.multSinergia` y compañía. `saved.caramelos = {}`. Panel de compra en tooltip siguiendo el patrón de paneles5.js.
- **Esfuerzo:** bajo · **Impacto:** alto · **Nota de la criba:** 9/10

### 36. Profundidad de zona: el salvaje escala si te quedas 🟢

**Cuanto más tiempo seguido peleas en una zona sin salir, más sube el nivel del salvaje, hasta +40.**

Cada 10 victorias consecutivas SIN salir de la zona sube 1 grado de profundidad (máx. 8). Cada grado: wildLevel +5 y hpMultiplier x1.25 acumulativo. En una zona de nivel 10, el grado 5 pone al salvaje a nivel 35; en una de 90, el grado 8 lo pone a 130. Regalo gratis del motor: el bucle que reparte movimientos al salvaje usa `if (wildLevel > i*10)`, así que la profundidad le da 2, 3 y 4 movimientos sola, sin tocar nada. Salir de la zona o que te barran resetea a 0. Contrapeso permanente: `saved.profundidadRecord[zonaId]` guarda el máximo alcanzado y al reentrar arrancas en floor(record/2), así que cada zona tiene su propia curva de dominio. Con la curva de exp actual, el grado 4 en una zona de nivel 30 contra un equipo de nivel 40 ya no da nada; contra uno de nivel 20 da x12.

- **Por que engancha:** Arregla el defecto estructural número uno: solo hay 5 niveles de zona y el salvaje nunca escala, así que toda zona caduca. Con profundidad, ninguna zona caduca: se queda contigo un rato más y encima el AFK largo (que por definición no sale de la zona) se convierte en la forma óptima de exprimirla. Y añade una decisión real: quedarte a por el grado 8 o irte antes de que el salvaje con 4 movimientos te barra el equipo.
- **De donde sale:** Loop Hero (cada vuelta el mapa sube de dificultad y tú eliges cuándo retirarte) cruzado con los brotes de Escarlata/Púrpura.
- **Como se haria:** Módulo nuevo `scripts/niveles.js` con el patrón `var Niveles = (function(){...})()` igual que progreso.js. Estado en `saved.profundidad = {zona, kos, grado}` y `saved.profundidadRecord = {}` (save.js serializa `saved` entero, no hay que tocarlo). Tres enganches: (1) en `setWildPkmn()` (explore.js:203), tras fijar `wildLevel` y antes del cálculo de `wildPkmnHp` (explore.js:590), sumar `wildLevel += 5*grado` y `hpMultiplier *= Math.pow(1.25, grado)`; (2) en el bloque de victoria de `exploreCombatPlayer` donde ya está `Extras.contar('combatesGanados')` (explore.js:1589), llamar `Niveles.sumarKO()`; (3) en `leaveCombat()` (explore.js:830) y en `shouldCombatStop()` (explore.js:2172), `Niveles.resetProfundidad()`. La UI cabe en el indicador que ya existe: un div al lado de `#team-indicator`.
- **Esfuerzo:** bajo · **Impacto:** alto · **Nota de la criba:** 9/10

### 37. Baches de nivel: el 5º y el 6º hueco de rotación 🔴

**Seis hitos de nivel por Pokémon que cambian su ciclo de movimientos, entre ellos ampliar la rotación de 4 a 5 y luego a 6 huecos.**

La curva de nivel es hoy perfectamente lisa: 100 de experiencia por nivel, x0.1 de daño por nivel, un movimiento cada 7. Planta baches con fecha conocida. Nivel 15: 5º hueco de rotación — el ciclo pasa a 5 movimientos, una oportunidad más de Potencia Cruzada y, sobre todo, un ciclo IMPAR, que cambia por completo qué órdenes funcionan. Nivel 30: al entrar en combate el primer movimiento arranca con la barra al 50%. Nivel 45: los movimientos de potencia 0 (estado) dejan de romper la cadena de cruce. Nivel 60: 6º hueco. Nivel 75: −10% al temporizador base de todos sus movimientos. Nivel 90: eliges un tipo y sus movimientos de ese tipo cuentan siempre como cambio de tipo.

- **Por que engancha:** Cada bache es un pico emocional pequeño con fecha anticipable, y el jugador siempre puede responder a '¿qué estoy consiguiendo ahora mismo?' con algo concreto y cercano en vez de con una rampa que no se nota. Los huecos 5 y 6 son el desbloqueo más gordo posible en este juego, porque la rotación ES el juego: pasar de 4 a 5 movimientos rehace la baraja entera.
- **De donde sale:** La charla de GDC de AdVenture Capitalist / Tap Titans sobre 'make it bumpy': umbrales exactos con cascada de bonus en vez de curva exponencial suave
- **Como se haria:** El reinicio de rotación es literalmente `if (currentTurn >= 5)` en explore.js:2390 → `if (currentTurn > Niveles.huecos(id))`. Los moveboxes NO están en index.html: se generan en bucle sobre `pkmn[i].moves` en teams.js:791-830, así que basta añadir `slot5` y `slot6` al objeto que inyecta el bucle final de pkmnDictionary.js:20187 y a la lista de campos de save.js:50. Hay que replicarlo en la vista previa de equipo (teams.js:183 y teams.js:1050) y en el editor de movimientos, que es lo que sube el esfuerzo. El resto de hitos toca la barra de explore.js:2402 y el bloque de cruce de explore.js:2668.
- **Esfuerzo:** alto · **Impacto:** alto · **Nota de la criba:** 8/10

### 38. Tope blando de nivel por entrenadores derrotados 🟡

**El nivel máximo útil lo marca cuántos entrenadores has vencido; pasarte degrada la exp y la convierte en otra moneda.**

Tope = min(100, 15 + 0.62 × (zonas con `trainer` y `defeated`)). Con 0 entrenadores el tope es 15; con 40, 40; con los 138, 100. Por encima del tope la exp no se corta de golpe, se degrada: `expGained *= Math.pow(0.5, 1 + exceso/3)` (justo en el tope 50%, tres niveles por encima 25%, nueve por encima 6%). Y lo importante: la exp perdida NO se evapora, se convierte en Caramelos de Esfuerzo a razón de 1 caramelo por cada 50 de exp degradada. Los caramelos se gastan en subir de golpe a un Pokémon nuevo hasta tope-10, en comprar EVs (idea 3) o en respec de nodos (idea 4). Se activa como modificador `saved.gamemodTope` (mismo patrón que `gamemodExp`, `gamemodHard`, `gamemodDrops`, `gamemodCruce`), encendido por defecto en partidas nuevas y apagado en las existentes vía la migración de versión que ya hay en script.js.

- **Por que engancha:** Hoy la respuesta a cualquier muro es dejar el juego toda la noche y volver a nivel 100, y a partir de ahí las 312 zonas son decorado. El tope convierte el AFK en un motor de anchura en vez de altura: cuando el equipo titular topa, el tiempo pasa a fabricar suplentes, y el jugador tiene que resolver los muros reordenando movimientos y cambiando piezas, que es donde está toda la habilidad de este juego.
- **De donde sale:** Pokémon Radical Red (tope atado dinámicamente al siguiente jefe) y la variante blanda de Pokémon Clover (exp degradada progresivamente en vez de cortada).
- **Como se haria:** En `scripts/niveles.js`: `Niveles.tope()` recorre `areas` contando `areas[i].trainer && areas[i].defeated`. El enganche es una sola inserción en el bloque de exp de `exploreCombatPlayer` (explore.js:1607-1645), después de calcular `expGained` para el activo y dentro del `for (const i in team)` para el resto: guardar la exp bruta, aplicar el factor, y acumular `saved.caramelos += Math.round(perdida/50)`. La barra de exp de `updateTeamExp()` (explore.js:1852) se pinta en gris cuando el Pokémon está por encima del tope. El gasto de caramelos entra como una entrada más en el menú de objetos (`updateItemBag()`, explore.js:6729) o como objeto nuevo en itemDictionary.js con `itemToUse: true`, igual que `item.rareCandy`.
- **Esfuerzo:** medio · **Impacto:** alto · **Nota de la criba:** 8/10

### 39. Puntos de esfuerzo por zona: cada una de las 312 entrena una estadística 🟡

**Cada zona declara qué estadística entrena y farmear allí sube estrellas de verdad, con tope visible.**

Cada KO da 1 punto de esfuerzo al miembro activo en la estadística de la zona y 1 cada dos combates al resto (mismo reparto que la exp). 4 puntos = 1 punto de estadística bruta; el mapeo a estrellas (`statToRating`, pkmnDictionary.js:20222) tiene 36 puntos brutos por estrella, así que 144 EV = +1 estrella exacta. Tope 288 por estadística (+2 estrellas) y 576 en total, o sea que puedes maximizar exactamente dos. A ritmo de combate real son ~288 KO por estadística, entre 1 y 1,5 h de AFK dirigido. La estadística de cada zona no hay que escribirla a mano en las 312: se deriva con `returnHighestStat(pkmn[areas[id].icon.id])` (explore.js:9670), que ya existe y ya ignora los PS, así que la zona de Machop entrena Ataque sin tocar areasDictionary.js. Un objeto nuevo equipable duplica la ganancia.

- **Por que engancha:** Es una segunda barra de progreso paralela al nivel, con techo alcanzable, y sobre todo es la respuesta a «¿por qué iría yo a esta zona y no a aquella?». De golpe las zonas antiguas dejan de ser basura: son gimnasios de estadística. Y como las estrellas son escalones, la recompensa llega en saltos visibles («te faltan 48 para la quinta estrella»), no en un decimal invisible.
- **De donde sale:** Puntos de esfuerzo de la saga principal desde Gen III (4 EV = 1 punto, topes 252/510).
- **Como se haria:** Dos líneas en pkmnDictionary.js:20214, en el bucle que convierte `bst` a estrellas: guardar antes `pkmn[name].bstBase = {...bst}`, porque hoy el valor bruto se pierde. Campo nuevo `pkmn[i].evs = {hp,atk,def,satk,sdef,spe}` y una línea más en el bucle de Pokémon de save.js:50-78 (`data[i].evs = pkmn[i].evs`), que es el sitio donde ya se guardan `ivs` y `nature`. Helper `Niveles.estrella(id, stat) = statToRating(pkmn[id].bstBase[stat] + Math.floor(evs/4))`, consumido en `returnStatDots` (explore.js:2076) para la ficha y en las cuatro asignaciones de `attackerStars`/`defenderStars` de `exploreCombatPlayer` (explore.js:2612, 2619, 2641, 2648). El reparto de puntos va en el mismo bloque de victoria que la exp (explore.js:1607). Objeto nuevo `item.pesasEsfuerzo` en itemDictionary.js copiando la forma de `item.luckyEgg` (que ya se lee como equipable en el cálculo de exp).
- **Esfuerzo:** medio · **Impacto:** alto · **Nota de la criba:** 8/10

### 40. Maestría por movimiento: los usos suben el movimiento, no al Pokémon 🟢

**Cada movimiento lleva su propio contador de usos; a los 100 usos sube de nivel, hasta 10.**

100 usos = +1 nivel de maestría, máximo 10 (5.500 usos por movimiento, unas 3 h de rotación continua, o sea una sesión AFK larga). Cada nivel da +5 de potencia PLANA, no multiplicador: eso es deliberado, porque en la fórmula la defensa resta y un +50 plano es exactamente lo que permite que un movimiento débil deje de hacer 0 contra un rival acorazado. Dos niveles cambian la regla en vez del número: al 5, ese movimiento deja de romper la cadena de potencia cruzada si se repite (pasa a contar como comodín); al 10, su temporizador baja un 15%, lo que reordena de facto toda la rotación. Se muestra como un numeral pequeño en la esquina de cada `pkmn-movebox`.

- **Por que engancha:** El progreso lo genera el acto que el juego ya está haciendo solo, sin pedir nada nuevo, y siempre hay una barra al 60% a la vista aunque el nivel esté topado. Además crea un coste de oportunidad sano frente al editor de rotación: cambiar un movimiento ya no es gratis, porque tiras 4 horas de maestría a la basura.
- **De donde sale:** Final Fantasy II (competencia de arma, 100 usos por nivel) y Melvor Idle (maestría por ítem en vez de una sola barra global).
- **Como se haria:** `saved.maestria` como objeto plano con claves `pokemonId|moveId` (plano para que el JSON de localStorage no crezca en profundidad). El incremento va donde el motor ya cuenta ejecuciones, en `exploreCombatPlayer` junto a `Extras.contar('movimientosEjecutados')`. El +5 plano se suma a `movePower` antes de las cuatro fórmulas de daño (explore.js:2624, 2630, 2653, 2659). El nivel 5 se lee en el bloque de cadena (explore.js:2797-2802), donde `romperCadena()` decide si repetir tipo corta la racha. El nivel 10 se aplica donde se fija el temporizador del movimiento del jugador, en el mismo bucle que pinta `#pkmn-movebox-...-bar`. El numeral se dibuja en `setPkmnTeam()`.
- **Esfuerzo:** bajo · **Impacto:** medio · **Nota de la criba:** 8/10

### 41. Rango de linaje: evolucionar deja de ser volver a empezar 🟡

**Cada vez que evolucionas dentro de una familia, esa familia sube de rango y las siguientes evoluciones nacen mejor.**

`saved.linaje[familiaBase]` sube 1 con cada evolución completada de esa familia, y cada rango desbloquea una REGLA, no un número: R1, la evolución nace a nivel 10 en vez de 1. R2, hereda el orden exacto de los 4 movimientos del progenitor (copiando los slots legales). R3, hereda los IV del progenitor estadística por estadística cuando son mejores. R4, nace a nivel 30 y con la mitad de la maestría (idea 5) de los movimientos heredados. R5, nace a nivel 50 y hereda la mitad de los nodos del árbol (idea 4), redondeando a su favor. Cada rango cuesta otra evolución de la misma familia, así que las familias que te gustan se convierten en tu carril rápido: la sexta vez que evolucionas un Dratini, el Dragonite sale a nivel 50 con tu rotación puesta.

- **Por que engancha:** Pokechill ya hace lo raro por accidente: evolucionar te da un Pokémon NUEVO a nivel 1 en vez de transformar el tuyo, o sea que la recompensa por subir 30 niveles es un bicho inútil. Formalizarlo como prestigio con memoria le da la vuelta: volver a nivel 1 deja de doler porque ves subir el número que de verdad importa, y cada generación es medible contra la anterior.
- **De donde sale:** Dragon Quest Monsters: The Dark Prince (la síntesis devuelve al nivel 1 pero hereda inversión y sube el RANGO de los talentos heredados).
- **Como se haria:** La familia se obtiene con `getEvolutionFamily(base)`, que ya existe en explore.js:9619. Hay tres puntos donde nace una evolución y todos llaman a `givePkmn(especie, 1)`: la subida de nivel en `updateTeamExp()` (explore.js:1912) y las dos rutas de piedra/objeto (explore.js:5665 y 5748). Basta con envolverlas en `Niveles.evolucionar(padreId, hijoEspecie)`, que llama a `givePkmn(hijo, nivelSegunRango)` y luego copia movimientos, IV, maestría y nodos según el rango. `givePkmn` (explore.js:129) ya acepta nivel como segundo argumento, así que nacer a nivel 50 no necesita código nuevo. Estado en `saved.linaje`, y el rango se muestra en la ficha de la familia dentro del panel de Pokédex (`updatePokedex()`, explore.js:5265).
- **Esfuerzo:** medio · **Impacto:** alto · **Nota de la criba:** 8/10

### 42. Zonas de Vanguardia: el nivel del salvaje sale de tu equipo 🟢

**Modo opcional en las zonas frontier donde el rival aparece siempre 25 niveles por encima de tu equipo, y para entrar hace falta un permiso que solo se gana con retos, no grindeando.**

Cualquiera de las 71 zonas frontier puede activarse en Vanguardia. Dentro, `wildLevel = min(149, nivel medio del equipo + 25)`: siempre estás en la franja x64/x128 de experiencia, y la zona se autoequilibra sin tabla nueva porque los PS del salvaje ya se calculan desde wildLevel. Como el rival supera el nivel 30, pelea siempre con sus 4 movimientos: la Vanguardia es el combate completo, no la versión mocha de un salvaje de nivel 10. La puerta es lo importante: entrar cuesta un Permiso de Vanguardia y los permisos no se compran ni caen del grindeo, se ganan cerrando retos concretos (derrotar 50 rivales de un tipo en una misma zona, cerrar una cadena SOS de 25 eslabones, capturar las 3 especies raras de una rotación). Tope de 3 permisos guardados; se recupera 1 cada 6 h, calculado desde el reloj UTC igual que la rotación de zonas, así que el AFK lo respeta gratis y sin fórmula especial.

- **Por que engancha:** Es la respuesta más directa a los dos datos duros del juego: solo hay 5 niveles de zona y el salvaje nunca escala, así que a nivel 90 toda la experiencia del mundo es x1. Y la doble puerta impide que se convierta en el único sitio donde jugar: para volver hay que salir a hacer cosas en el resto del mapa.
- **De donde sale:** La doble puerta de maestrías de Guild Wars 2 (llenar la barra no basta, hace falta un punto ganado fuera del grindeo) + las oleadas escalantes de PokéRogue
- **Como se haria:** Bandera `saved.vanguardia` leída en el else de setWildPkmn (explore.js:513-530), sustituyendo el `random(areas[...].level-9, areas[...].level)` de explore.js:525. Los PS escalan solos por la fórmula de explore.js:588 y el número de movimientos del rival por los `thresholds = [0,10,20,30]` de explore.js:533. Los retos se resuelven con los contadores de las ideas de Nivel de Búsqueda, aura y cadena SOS, así que no hace falta telemetría nueva. La recarga por reloj UTC copia el patrón de getSeed()/mulberry32 de explore.js:4743. Botón en el ticket de zona frontier, dentro del bucle de tickets de explore.js.
- **Esfuerzo:** bajo · **Impacto:** alto · **Nota de la criba:** 7/10

---

# Por donde empezaria

Las ocho mejor puntuadas por la criba, que ademas son casi todas de esfuerzo bajo o medio:

| # | Idea | Area | Esfuerzo | Nota |
|---|---|---|---|---|
| 1 | Estilos Ágil / Fuerte por hueco de rotación | jugabilidad | bajo | 9.5 |
| 2 | Registro de linaje: el mejor IV visto por familia evolutiva es el suelo de los nuevos | encontrar | bajo | 9.5 |
| 3 | Pacto de zona: afijos que cambian REGLAS, con botín proporcional | jugabilidad | medio | 9 |
| 4 | Teratipo latente por individuo con disparador configurable | jugabilidad | medio | 9 |
| 5 | Innatas: pasivas que cambian las reglas de la rotación, sin tocar los diccionarios | jugabilidad | medio | 9 |
| 6 | Banco de tiempo AFK: el tiempo ausente se gasta, no se consume solo | jugabilidad | medio | 9 |
| 7 | Nivel heredado y Puntos de Legado al evolucionar | niveles | bajo | 9 |
| 8 | Salvajes con aura por contador de derrotas | niveles | bajo | 9 |

