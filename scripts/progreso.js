/* =========================================================================
   Pokechill — Progresión: logros, prestigio, misiones, rangos
   =========================================================================
   Depende de scripts/extras.js (se carga después).
   ========================================================================= */

var Progreso = (function () {

'use strict';

const API = {};
const E = Extras;


/* ======================================================================
   LECTURAS DEL ESTADO
   ====================================================================== */

function capturados() {
    let n = 0;
    for (const i in pkmn) if (pkmn[i].caught > 0) n++;
    return n;
}
API.capturados = capturados;

function variocoloresPoseidos() {
    let n = 0;
    for (const i in pkmn) if (pkmn[i].shiny) n++;
    return n;
}
API.variocolores = variocoloresPoseidos;

function nivel100() {
    let n = 0;
    for (const i in pkmn) if (pkmn[i].level >= 100) n++;
    return n;
}
API.nivel100 = nivel100;


/* ======================================================================
   LOGROS
   ======================================================================
   Cada logro comprueba una condición y otorga un bonus permanente
   pequeño. Los bonus se acumulan y el resto del juego los consulta con
   Progreso.mult('dañoPct').
   ====================================================================== */

const LOGROS = [];

function logro(id, nombre, descripcion, condicion, bonus) {
    LOGROS.push({ id, nombre, descripcion, condicion, bonus: bonus || {} });
}

// --- Colección ---
[1, 10, 25, 50, 100, 200, 350, 500, 750, 1000, 1376].forEach((n, i) => {
    logro('dex' + n, 'Coleccionista ' + (i + 1), 'Registra ' + n + ' especies',
          () => capturados() >= n, { danoPct: 1 + i, expPct: 1 + i });
});
[1, 5, 10, 25, 50, 100].forEach((n, i) => {
    logro('shiny' + n, 'Cazador de variocolor ' + (i + 1), 'Consigue ' + n + ' Pokémon variocolor',
          () => variocoloresPoseidos() >= n, { shinyPct: 2 + i * 2 });
});
[1, 10, 50, 150, 400].forEach((n, i) => {
    logro('lv100_' + n, 'Maestro de crianza ' + (i + 1), 'Ten ' + n + ' Pokémon a nivel 100',
          () => nivel100() >= n, { danoPct: 2 + i * 2 });
});

// --- Combate ---
[10, 100, 1000, 10000, 100000].forEach((n, i) => {
    logro('ko' + n, 'Veterano ' + (i + 1), 'Gana ' + E.formatearNumero(n) + ' combates',
          () => E.stats().combatesGanados >= n, { danoPct: 2 + i * 3 });
});
[1e4, 1e6, 1e8, 1e10].forEach((n, i) => {
    logro('dmg' + i, 'Demoledor ' + (i + 1), 'Inflige ' + E.formatearNumero(n) + ' de daño total',
          () => E.stats().danoTotal >= n, { danoPct: 3 + i * 3 });
});

// --- Objetos ---
[10, 100, 1000, 5000].forEach((n, i) => {
    logro('item' + n, 'Recolector ' + (i + 1), 'Consigue ' + n + ' objetos',
          () => E.stats().objetosRecibidos >= n, { dropPct: 3 + i * 3 });
});

// --- Constancia ---
[3600, 36000, 360000].forEach((n, i) => {
    logro('tiempo' + i, 'Constancia ' + (i + 1), 'Juega ' + Math.round(n / 3600) + ' horas',
          () => E.stats().segundosJugados >= n, { expPct: 5 + i * 5 });
});

// --- Gestas ---
logro('torre30',   'Escalador',  'Alcanza la planta 30 de la Torre Espiral',
      () => (saved.maxSpiralFloor || 0) >= 30, { danoPct: 5 });
logro('torre100',  'Cima',       'Alcanza la planta 100 de la Torre Espiral',
      () => (saved.maxSpiralFloor || 0) >= 100, { danoPct: 10 });
logro('genetica',  'Genetista',  'Completa 50 operaciones genéticas',
      () => E.stats().operacionesGeneticas >= 50, { shinyPct: 5 });
logro('paciencia', 'Paciencia',  'Acumula 1000 encuentros seguidos sin variocolor',
      () => E.stats().rachaSinVariocolor >= 1000, { shinyPct: 10 });
logro('prestigio1','Renacido',   'Renace por primera vez',
      () => (saved.prestigios || 0) >= 1, { danoPct: 10, expPct: 10 });
logro('prestigio5','Ciclo eterno','Renace 5 veces',
      () => (saved.prestigios || 0) >= 5, { danoPct: 25, expPct: 25 });

API.LOGROS = LOGROS;

function conseguidos() {
    if (!saved.logros) saved.logros = {};
    return saved.logros;
}
API.conseguidos = conseguidos;

let cacheBonus = null;
function bonusLogros() {
    if (cacheBonus) return cacheBonus;
    const total = {};
    const c = conseguidos();
    for (const l of LOGROS) {
        if (!c[l.id]) continue;
        for (const k in l.bonus) total[k] = (total[k] || 0) + l.bonus[k];
    }
    cacheBonus = total;
    return total;
}
API.bonusLogros = bonusLogros;

API.revisarLogros = function () {
    const c = conseguidos();
    let nuevos = 0;
    for (const l of LOGROS) {
        if (c[l.id]) continue;
        let cumple = false;
        try { cumple = l.condicion(); } catch (e) { continue; }
        if (!cumple) continue;
        c[l.id] = true;
        nuevos++;
        cacheBonus = null;
        E.sonar('logro');
        E.aviso('🏆 ' + l.nombre, l.descripcion);
    }
    return nuevos;
};


/* ======================================================================
   PRESTIGIO Y ÁRBOL DE TALENTOS
   ======================================================================
   Renacer reinicia Pokémon, objetos y áreas a cambio de Esencia, que se
   gasta en talentos permanentes. Es la capa que le faltaba al juego para
   tener recorrido más allá de completar la Pokédex.
   ====================================================================== */

API.esenciaAlRenacer = function () {
    const especies = capturados();
    const cien = nivel100();
    const torre = saved.maxSpiralFloor || 0;
    const bruto = Math.pow(especies, 1.15) / 8 + cien * 2 + torre * 1.5;
    const mult = 1 + (saved.prestigios || 0) * 0.1;   // cada renacer facilita el siguiente
    return Math.max(0, Math.floor(bruto * mult));
};

API.ESPECIES_PARA_RENACER = 60;
API.puedeRenacer = function () { return capturados() >= API.ESPECIES_PARA_RENACER; };

const TALENTOS = [
    { id: 'dano',      nombre: 'Fuerza bruta',      rama: 'Estratega',     max: 50, coste: n => 5 + n * 3,
      efecto: n => '+' + (n * 4) + '% de daño',                       aplica: { danoPct: 4 } },
    { id: 'cruce',     nombre: 'Instinto cruzado',  rama: 'Estratega',     max: 20, coste: n => 15 + n * 10,
      efecto: n => '+' + (n * 0.02).toFixed(2) + ' a la Potencia Cruzada', aplica: { crucePlano: 0.02 } },
    { id: 'velocidad', nombre: 'Reflejos',          rama: 'Estratega',     max: 25, coste: n => 8 + n * 5,
      efecto: n => 'Movimientos un ' + (n * 2) + '% más rápidos',      aplica: { velocidadPct: 2 } },

    { id: 'exp',       nombre: 'Aprendizaje',       rama: 'Criador',       max: 50, coste: n => 5 + n * 3,
      efecto: n => '+' + (n * 5) + '% de experiencia',                aplica: { expPct: 5 } },
    { id: 'genetica',  nombre: 'Herencia',          rama: 'Criador',       max: 20, coste: n => 12 + n * 8,
      efecto: n => 'Operaciones un ' + (n * 3) + '% más rápidas',      aplica: { geneticaPct: 3 } },
    { id: 'ps',        nombre: 'Vigor',             rama: 'Criador',       max: 30, coste: n => 6 + n * 4,
      efecto: n => '+' + (n * 5) + '% de PS',                         aplica: { psPct: 5 } },

    { id: 'drop',      nombre: 'Buen ojo',          rama: 'Coleccionista', max: 40, coste: n => 6 + n * 4,
      efecto: n => '+' + (n * 3) + '% de objetos',                    aplica: { dropPct: 3 } },
    { id: 'shiny',     nombre: 'Fortuna',           rama: 'Coleccionista', max: 30, coste: n => 20 + n * 15,
      efecto: n => '+' + (n * 10) + '% de variocolor',                aplica: { shinyPct: 10 } },
    { id: 'inicial',   nombre: 'Ventaja inicial',   rama: 'Coleccionista', max: 10, coste: n => 25 + n * 20,
      efecto: n => 'Tras renacer empiezas al nivel ' + (1 + n * 5),   aplica: { nivelInicial: 5 } },
];
API.TALENTOS = TALENTOS;

function talentos() {
    if (!saved.talentos) saved.talentos = {};
    return saved.talentos;
}
API.talentos = talentos;
API.nivelTalento = function (id) { return talentos()[id] || 0; };

API.costeTalento = function (id) {
    const t = TALENTOS.find(x => x.id === id);
    if (!t) return Infinity;
    const n = API.nivelTalento(id);
    if (n >= t.max) return Infinity;
    return t.coste(n);
};

let cacheTalentos = null;

API.subirTalento = function (id) {
    const coste = API.costeTalento(id);
    if (!isFinite(coste)) { E.aviso('Talento al máximo'); return false; }
    if ((saved.esencia || 0) < coste) { E.aviso('Esencia insuficiente', 'Necesitas ' + coste); return false; }
    saved.esencia -= coste;
    talentos()[id] = API.nivelTalento(id) + 1;
    cacheTalentos = null;
    E.sonar('nivel');
    if (typeof Paneles !== 'undefined' && Paneles.pintarPrestigio) Paneles.pintarPrestigio();
    return true;
};

function bonusTalentos() {
    if (cacheTalentos) return cacheTalentos;
    const total = {};
    for (const t of TALENTOS) {
        const n = API.nivelTalento(t.id);
        if (!n) continue;
        for (const k in t.aplica) total[k] = (total[k] || 0) + t.aplica[k] * n;
    }
    cacheTalentos = total;
    return total;
}
API.bonusTalentos = bonusTalentos;

API.invalidarCache = function () { cacheTalentos = null; cacheBonus = null; };

/** Bonus combinado de logros + talentos. Es lo que consulta el juego. */
API.bonus = function (clave) {
    return (bonusLogros()[clave] || 0) + (bonusTalentos()[clave] || 0);
};

/** Multiplicador listo para usar: bonus 25 -> 1.25 */
API.mult = function (clave) { return 1 + API.bonus(clave) / 100; };

API.renacer = function () {
    if (!API.puedeRenacer()) {
        E.aviso('Aún no puedes renacer', 'Necesitas ' + API.ESPECIES_PARA_RENACER + ' especies registradas');
        return;
    }
    const ganancia = API.esenciaAlRenacer();
    saved.esencia = (saved.esencia || 0) + ganancia;
    saved.prestigios = (saved.prestigios || 0) + 1;

    const nivelBase = Math.max(1, bonusTalentos().nivelInicial || 0);

    // Se reinician Pokémon, objetos y áreas. Se conservan talentos,
    // logros, estadísticas y esencia.
    for (const i in pkmn) {
        pkmn[i].caught = 0; pkmn[i].level = nivelBase; pkmn[i].exp = 0;
        pkmn[i].movepool = []; pkmn[i].newMoves = [];
        pkmn[i].moves = { slot1: null, slot2: null, slot3: null, slot4: null };
        pkmn[i].shiny = false; pkmn[i].hiddenAbilityUnlocked = false;
        pkmn[i].ivs = { hp: 0, atk: 0, def: 0, satk: 0, sdef: 0, spe: 0 };
    }
    for (const i in item)  item[i].got = 0;
    for (const i in areas) areas[i].defeated = false;

    saved.currentArea = undefined;
    saved.firstTimePlaying = true;
    saved.maxSpiralFloor = 1;

    API.invalidarCache();
    E.sonar('logro');
    E.aviso('✨ Has renacido', '+' + ganancia + ' de Esencia');
    if (typeof saveGame === 'function') saveGame();
    setTimeout(() => location.reload(), 1400);
};


/* ======================================================================
   MISIONES DIARIAS
   ====================================================================== */

const PLANTILLAS = [
    { id: 'derrotar', texto: n => 'Derrota ' + n + ' Pokémon salvajes',
      meta: () => 30 + Math.floor(Math.random() * 40), leer: () => E.stats().combatesGanados },
    { id: 'capturar', texto: n => 'Registra ' + n + ' especies nuevas',
      meta: () => 2 + Math.floor(Math.random() * 3),   leer: () => capturados() },
    { id: 'objetos',  texto: n => 'Consigue ' + n + ' objetos',
      meta: () => 8 + Math.floor(Math.random() * 12),  leer: () => E.stats().objetosRecibidos },
    { id: 'dano',     texto: n => 'Inflige ' + E.formatearNumero(n) + ' de daño',
      meta: () => 50000 + Math.floor(Math.random() * 150000), leer: () => E.stats().danoTotal },
    { id: 'niveles',  texto: n => 'Sube ' + n + ' niveles',
      meta: () => 10 + Math.floor(Math.random() * 20), leer: () => E.stats().nivelesSubidos },
];

function hoy() { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }

API.misiones = function () {
    if (!saved.misiones || saved.misiones.dia !== hoy()) {
        const elegidas = PLANTILLAS.slice().sort(() => Math.random() - 0.5).slice(0, 3);
        saved.misiones = {
            dia: hoy(),
            lista: elegidas.map(p => ({ id: p.id, meta: p.meta(), base: p.leer(), hecha: false })),
        };
    }
    return saved.misiones;
};

API.progresoMision = function (m) {
    const p = PLANTILLAS.find(x => x.id === m.id);
    if (!p) return 0;
    return Math.max(0, p.leer() - m.base);
};

API.textoMision = function (m) {
    const p = PLANTILLAS.find(x => x.id === m.id);
    return p ? p.texto(m.meta) : m.id;
};

API.revisarMisiones = function () {
    const ms = API.misiones();
    for (const m of ms.lista) {
        if (m.hecha) continue;
        if (API.progresoMision(m) >= m.meta) {
            m.hecha = true;
            if (typeof item !== 'undefined' && item.bottleCap) item.bottleCap.got += 3;
            E.sonar('logro');
            E.aviso('✔ Misión completada', API.textoMision(m) + ' · +3 Chapas Plateadas');
        }
    }
};


/* ======================================================================
   RANGO DE ENTRENADOR E HITOS DE POKÉDEX
   ====================================================================== */

const TITULOS = ['Novato', 'Aprendiz', 'Entrenador', 'Veterano', 'Experto',
                 'Élite', 'Maestro', 'Campeón', 'Leyenda', 'Mítico'];

API.rango = function () {
    const s = E.stats();
    const puntos = capturados() * 10 + s.combatesGanados + (saved.prestigios || 0) * 500;
    const nivel = Math.floor(Math.pow(puntos / 50, 0.55)) + 1;
    return { nivel, puntos, titulo: TITULOS[Math.min(TITULOS.length - 1, Math.floor(nivel / 6))] };
};

const HITOS_DEX = [
    { n: 100,  premio: 'bottleCap',       cantidad: 10 },
    { n: 250,  premio: 'goldenBottleCap', cantidad: 5 },
    { n: 500,  premio: 'goldenBottleCap', cantidad: 15 },
    { n: 1000, premio: 'goldenBottleCap', cantidad: 40 },
];

API.revisarHitos = function () {
    if (!saved.hitosDex) saved.hitosDex = {};
    const c = capturados();
    for (const h of HITOS_DEX) {
        if (saved.hitosDex[h.n] || c < h.n) continue;
        saved.hitosDex[h.n] = true;
        if (item[h.premio]) item[h.premio].got += h.cantidad;
        E.sonar('logro');
        E.aviso('📘 Hito de Pokédex: ' + h.n + ' especies',
                '+' + h.cantidad + ' ' + (typeof format === 'function' ? format(h.premio) : h.premio));
    }
};


return API;

})();
