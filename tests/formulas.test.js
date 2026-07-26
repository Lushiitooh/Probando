/* =========================================================================
   Tests de las fórmulas de combate
   =========================================================================
   Sin dependencias: se ejecuta con `node tests/formulas.test.js`.

   No busca cobertura completa. Cubre lo que hay que poder tocar sin miedo:
   la conversión de estadísticas, la tabla de tipos y la fórmula de daño.
   Si un rebalanceo rompe algo de esto, el test lo canta.
   ========================================================================= */

const fs = require('fs');
const vm = require('vm');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const leer = f => fs.readFileSync(path.join(RAIZ, f), 'utf8');

let pasan = 0, fallan = 0;
const fallos = [];

function comprobar(nombre, real, esperado) {
    const ok = Math.abs(real - esperado) < 1e-6;
    if (ok) { pasan++; }
    else { fallan++; fallos.push(`${nombre}: esperaba ${esperado}, obtuvo ${real}`); }
}

function comprobarQue(nombre, condicion) {
    if (condicion) pasan++;
    else { fallan++; fallos.push(nombre); }
}


/* ------------------------------------------------- entorno de los scripts */

const ctx = vm.createContext({
    console,
    document: new Proxy({}, { get: () => () => ({ style: {}, dataset: {}, classList: { toggle(){} } }) }),
    window: {}, navigator: { userAgent: '', platform: '' },
    localStorage: { getItem: () => null, setItem: () => {}, clear: () => {} },
    Math, JSON, Date, Object, Array, String, Number, Boolean, RegExp, Set, Map,
    parseInt, parseFloat, isNaN, isFinite,
    setInterval: () => 0, setTimeout: () => 0, requestAnimationFrame: () => 0,
    performance: { now: () => 0 },
    returnTypeColor: () => '#000', joinWithAnd: a => String(a), joinWithOr: a => String(a),
    returnItemLevel: () => 1, rng: () => false, random: () => 0,
});

for (const f of ['scripts/moveDictionary.js', 'scripts/itemDictionary.js',
                 'scripts/pkmnDictionary.js', 'scripts/areasDictionary.js']) {
    try { vm.runInContext(leer(f), ctx, { filename: f }); }
    catch (e) { console.error('aviso al cargar ' + f + ': ' + e.message); }
}


/* ------------------------------------------------------ 1. statToRating */
// Es la transformación que define el juego: estadísticas reales -> 1..6.

const statToRating = vm.runInContext('statToRating', ctx);

comprobar('statToRating(20) = 1  (mínimo)',   statToRating(20), 1);
comprobar('statToRating(200) = 6 (máximo)',   statToRating(200), 6);
comprobar('statToRating(10) satura a 1',      statToRating(10), 1);
comprobar('statToRating(400) satura a 6',     statToRating(400), 6);
comprobar('statToRating(110) = 4 (medio)',    statToRating(110), 4);
comprobarQue('statToRating es monótona creciente', (() => {
    for (let v = 20; v < 200; v += 5) if (statToRating(v) > statToRating(v + 5)) return false;
    return true;
})());


/* ------------------------------------------- 2. bst ya convertido a estrellas */

const pkmn = vm.runInContext('pkmn', ctx);
comprobarQue('todos los bst están en el rango 1..6', (() => {
    for (const k in pkmn) {
        const b = pkmn[k].bst;
        if (!b) continue;
        for (const st in b) if (b[st] < 1 || b[st] > 6) return false;
    }
    return true;
})());
comprobar('Bulbasaur atk 49 -> 2 estrellas', pkmn.bulbasaur.bst.atk, 2);


/* ------------------------------------------------ 3. tabla de efectividad */
// Este juego usa 1.5/0.5, no el 2/0.5 de los juegos oficiales.

const EFICAZ = 1.5, RESISTE = 0.5;

function efectividad(atacante, defensor) {
    const chart = {
        normal:  { rock: RESISTE, ghost: 0, steel: RESISTE },
        fire:    { fire: RESISTE, water: RESISTE, grass: EFICAZ, ice: EFICAZ, bug: EFICAZ, rock: RESISTE, dragon: RESISTE, steel: EFICAZ },
        water:   { fire: EFICAZ, water: RESISTE, grass: RESISTE, ground: EFICAZ, rock: EFICAZ, dragon: RESISTE },
        grass:   { fire: RESISTE, water: EFICAZ, grass: RESISTE, poison: RESISTE, ground: EFICAZ, flying: RESISTE, bug: RESISTE, rock: EFICAZ, dragon: RESISTE, steel: RESISTE },
        ghost:   { normal: 0, psychic: EFICAZ, ghost: EFICAZ, dark: RESISTE },
    };
    return defensor.reduce((m, t) => m * (chart[atacante]?.[t] ?? 1), 1);
}

comprobar('fuego vs planta = 1.5',            efectividad('fire', ['grass']), 1.5);
comprobar('fuego vs agua = 0.5',              efectividad('fire', ['water']), 0.5);
comprobar('normal vs fantasma = 0 (inmune)',  efectividad('normal', ['ghost']), 0);
comprobar('fuego vs planta/bicho = 2.25',     efectividad('fire', ['grass', 'bug']), 2.25);
comprobar('agua vs planta/dragón = 0.25',     efectividad('water', ['grass', 'dragon']), 0.25);
comprobarQue('un doble eficaz NO llega a 4 (el juego aplana)',
             efectividad('fire', ['grass', 'bug']) < 4);


/* ------------------------------------------------- 4. fórmula de daño */
// (potencia + max(0, atk*30*1.1^iv - def*30)) * (1 + nivel*0.1)

function dano({ potencia, atkEstrellas, atkIv, defEstrellas, nivel }) {
    return (potencia + Math.max(0, (atkEstrellas * 30) * Math.pow(1.1, atkIv) - defEstrellas * 30))
           * (1 + nivel * 0.1);
}

comprobar('sin ventaja de estadísticas queda la potencia base',
          dano({ potencia: 40, atkEstrellas: 2, atkIv: 0, defEstrellas: 6, nivel: 0 }), 40);

comprobarQue('la defensa RESTA, no divide: un defensor muy duro anula el bonus',
             dano({ potencia: 40, atkEstrellas: 1, atkIv: 0, defEstrellas: 6, nivel: 0 }) === 40);

comprobarQue('el nivel escala linealmente x0.1',
             dano({ potencia: 100, atkEstrellas: 1, atkIv: 0, defEstrellas: 6, nivel: 100 }) === 100 * 11);

comprobarQue('los IV multiplican de forma exponencial',
             dano({ potencia: 0, atkEstrellas: 3, atkIv: 6, defEstrellas: 1, nivel: 0 }) >
             dano({ potencia: 0, atkEstrellas: 3, atkIv: 0, defEstrellas: 1, nivel: 0 }));


/* ------------------------------------------- 5. velocidad de movimiento */
// timer * 0.9^velocidad * 0.95^ivVelocidad

function timer(base, estrellas, iv) { return base * Math.pow(0.9, estrellas) * Math.pow(0.95, iv); }

comprobar('sin velocidad el timer no cambia', timer(2000, 0, 0), 2000);
comprobarQue('6 estrellas de velocidad casi lo dividen entre dos',
             Math.abs(timer(2000, 6, 0) / 2000 - 0.531441) < 1e-6);
comprobarQue('más velocidad siempre es mejor', timer(2000, 6, 6) < timer(2000, 3, 3));


/* --------------------------------------------------- 6. nivel de objeto */

function nivelObjeto(copias) {
    if (copias >= 20) return 5;
    if (copias >= 15) return 4;
    if (copias >= 10) return 3;
    if (copias >= 5)  return 2;
    return 1;
}
comprobar('1 copia = nivel 1',   nivelObjeto(1), 1);
comprobar('5 copias = nivel 2',  nivelObjeto(5), 2);
comprobar('20 copias = nivel 5', nivelObjeto(20), 5);
comprobar('40 copias sigue siendo 5 (tope)', nivelObjeto(40), 5);


/* -------------------------------------------------- 7. integridad de datos */

const move = vm.runInContext('move', ctx);
const areas = vm.runInContext('areas', ctx);
const item = vm.runInContext('item', ctx);

comprobarQue('todos los movimientos tienen tipo y categoría', (() => {
    for (const k in move) {
        if (!move[k].type) return false;
        if (move[k].power > 0 && !move[k].split) return false;
    }
    return true;
})());

comprobarQue('todas las áreas salvajes tienen spawns', (() => {
    for (const k in areas) if (areas[k].type === 'wild' && !areas[k].spawns) return false;
    return true;
})());

// El guardado vuelca movimientos, objetos, áreas y Pokémon en un mismo objeto
// plano (save.js), así que dos ids iguales en diccionarios distintos corromperían
// la partida en silencio. Hoy existen exactamente dos colisiones conocidas y son
// inofensivas porque ambas quieren mostrar el mismo nombre. Este test no las
// prohíbe: vigila que no aparezca ninguna NUEVA.
const COLISIONES_CONOCIDAS = ['metronome', 'glaciate'];

const colisiones = (() => {
    const vistos = {}, choques = [];
    for (const [nombre, dic] of [['move', move], ['item', item], ['areas', areas], ['pkmn', pkmn]]) {
        for (const k in dic) {
            if (vistos[k] && vistos[k] !== nombre) choques.push(k);
            vistos[k] = nombre;
        }
    }
    return choques;
})();

const nuevas = colisiones.filter(c => !COLISIONES_CONOCIDAS.includes(c));
comprobarQue('sin colisiones de id nuevas' + (nuevas.length ? ' (aparecieron: ' + nuevas.join(', ') + ')' : ''),
             nuevas.length === 0);


/* ------------------------------------------------ 6. UNIDADES DE power()
   La causa del fallo de "el asesor le pone la misma baya a los seis":
   power() NO devuelve la misma unidad en todas las familias de objetos.

       charcoal      1.4  -> multiplicador de daño
       passhoBerry   40   -> porcentaje de reducción
       firiumZ       18   -> turnos de carga (¡y va a la baja!)
       luckyEgg      50   -> porcentaje de experiencia

   Cualquier fórmula que trate power() como un multiplicador único vuelve a
   romperlo. Esta guarda exige que todo objeto cuyo power() se salga del
   rango de multiplicador esté clasificado explícitamente en asesor.js.     */

const fuenteAsesor = leer('scripts/asesor.js');

// ids que asesor.js trata de forma explícita, con su unidad declarada
const CLASIFICADOS_NO_MULTIPLICADOR = [
    'luckyEgg', 'shinyCharm', 'luckIncense', 'pureIncense',   // porcentajes fuera de combate
    'clearAmulet',                                            // turnos planos
    'terrainExtender', 'dampRock', 'heatRock', 'icyRock',     // turnos de clima
    'smoothRock', 'electricSeed', 'grassySeed', 'mistySeed', 'foggySeed',
];

const sinClasificar = [];
for (const k in item) {
    const it = item[k];
    if (it.type !== 'held') continue;
    let pot;
    try { pot = typeof it.power === 'function' ? it.power() : 1; } catch (e) { continue; }
    if (typeof pot !== 'number' || pot <= 3) continue;   // rango de multiplicador, sin riesgo

    const esBaya    = fuenteAsesor.includes(k + ':');            // está en BAYA_POR_TIPO
    const esZ       = !!it.zType;                                // cristal Z
    const esConocido = CLASIFICADOS_NO_MULTIPLICADOR.includes(k)
                    || fuenteAsesor.includes("'" + k + "'");
    if (!esBaya && !esZ && !esConocido) sinClasificar.push(k + ' (power=' + pot + ')');
}

comprobarQue('todo objeto con power() fuera de rango multiplicador está clasificado en el asesor'
             + (sinClasificar.length ? ' — sin clasificar: ' + sinClasificar.join(', ') : ''),
             sinClasificar.length === 0);


/* ----------------------------------------- 7. EL MAPA DE BAYAS NO SE DESVÍA
   asesor.js lleva su propio mapa baya -> tipo del que protege. Si el combate
   cambia y el mapa no, el asesor recomendaría la baya equivocada sin que
   nada fallase de forma visible. Se comparan las dos fuentes.              */

const fuenteExplore = leer('scripts/explore.js');

// pares (baya, tipo) tal y como los aplica el combate
const enCombate = {};
const reBaya = /item\.(\w+Berry)\.id && move\[nextMoveWild\]\.type == '(\w+)'/g;
let m;
while ((m = reBaya.exec(fuenteExplore)) !== null) enCombate[m[1]] = m[2];

// pares declarados en el mapa del asesor
const bloque = fuenteAsesor.slice(fuenteAsesor.indexOf('const BAYA_POR_TIPO'));
const enAsesor = {};
const reMapa = /(\w+Berry):\s*'(\w+)'/g;
while ((m = reMapa.exec(bloque.slice(0, bloque.indexOf('};')))) !== null) enAsesor[m[1]] = m[2];

const desviadas = [];
for (const b in enCombate) if (enAsesor[b] !== enCombate[b])
    desviadas.push(b + ': combate=' + enCombate[b] + ' asesor=' + (enAsesor[b] || 'falta'));

comprobarQue('el mapa baya->tipo del asesor coincide con el combate ('
             + Object.keys(enCombate).length + ' bayas)'
             + (desviadas.length ? ' — desviadas: ' + desviadas.join('; ') : ''),
             Object.keys(enCombate).length >= 17 && desviadas.length === 0);


/* ------------------------------- 8. CADA BAYA CONSULTA SU PROPIO power()
   En la rama de entrenador había dos erratas de copia: la baya de tierra
   leía el power() de la de volador y la de volador el de la de fuego. Hoy
   no se nota porque todas valen 40, pero en cuanto una suba de nivel sí.  */

const erratas = [];
const reLinea = /item\.(\w+Berry)\.id && move\[\w+\]\.type == '\w+' && superEffective\) \{totalPower \/= \(item\.(\w+Berry)\.power/g;
while ((m = reLinea.exec(fuenteExplore)) !== null)
    if (m[1] !== m[2]) erratas.push(m[1] + ' usa el power() de ' + m[2]);

comprobarQue('cada baya divide por su propio power()'
             + (erratas.length ? ' — ' + erratas.join('; ') : ''),
             erratas.length === 0);


/* ------------------------------ 9. EL ASESOR NO TIENE CAJÓN DE SASTRE
   El fallo original era un `return (pot - 1) * 25` al final de puntuarObjeto
   que se tragaba cualquier objeto sin clasificar tratándolo como si su
   power() fuese un multiplicador de daño. De ahí los 975 puntos de la baya. */

comprobarQue('puntuarObjeto no reintroduce un cajón de sastre sobre power()',
             !/return\s*\(\s*pot\s*-\s*1\s*\)\s*\*\s*\d+\s*;\s*\n?\s*\};/.test(fuenteAsesor));


/* --------------------------------------------------------------- informe */

console.log('');
console.log('  ' + pasan + ' pasan   ' + (fallan ? fallan + ' fallan' : '0 fallan'));
if (fallos.length) {
    console.log('');
    for (const f of fallos) console.log('  ✗ ' + f);
}
console.log('');
process.exit(fallan ? 1 : 0);
