/* =========================================================================
   Pokechill — Segunda capa de prestigio
   =========================================================================
   Ideas 9-15 de IDEAS-2.md. Depende de progreso.js.
   ========================================================================= */

var Prestigio2 = (function () {

'use strict';

const API = {};
const E = Extras;
const P = () => Progreso;

function nom(x) { try { return format(x); } catch (e) { return String(x); } }


/* ======================================================================
   9. ASCENSIÓN — la capa por encima del renacer
   ======================================================================
   Reinicia también los talentos a cambio de Fragmentos, que compran
   mejoras que la Esencia no puede tocar.
   ====================================================================== */

API.RENACERES_PARA_ASCENDER = 10;

API.puedeAscender = function () {
    return (saved.prestigios || 0) >= API.RENACERES_PARA_ASCENDER;
};

API.fragmentosAlAscender = function () {
    const r = saved.prestigios || 0;
    const esencia = saved.esencia || 0;
    // escala con renaceres y con la Esencia que tengas sin gastar
    return Math.max(0, Math.floor(Math.pow(r, 1.3) + esencia / 200));
};

const MEJORAS_ASCENSION = [
    { id: 'esenciaBase', nombre: 'Poso de Esencia', max: 20, coste: n => 2 + n * 2,
      efecto: n => 'Cada renacer da un ' + (n * 10) + '% más de Esencia' },
    { id: 'inicioTalentos', nombre: 'Memoria', max: 10, coste: n => 5 + n * 4,
      efecto: n => 'Conservas ' + (n * 5) + '% de tus talentos al ascender' },
    { id: 'dexInicial', nombre: 'Herencia', max: 15, coste: n => 4 + n * 3,
      efecto: n => 'Empiezas cada renacer con ' + (n * 2) + ' especies ya registradas' },
    { id: 'velocidadGlobal', nombre: 'Tempo', max: 25, coste: n => 3 + n * 3,
      efecto: n => 'Todo el juego va un ' + (n * 2) + '% más rápido' },
    { id: 'suerte', nombre: 'Astro favorable', max: 20, coste: n => 6 + n * 5,
      efecto: n => '+' + (n * 15) + '% de variocolor, permanente y acumulable' },
];
API.MEJORAS_ASCENSION = MEJORAS_ASCENSION;

function mejoras() {
    if (!saved.ascension) saved.ascension = {};
    return saved.ascension;
}
API.mejoras = mejoras;

API.nivelMejora = function (id) { return mejoras()[id] || 0; };

API.costeMejora = function (id) {
    const m = MEJORAS_ASCENSION.find(x => x.id === id);
    if (!m) return Infinity;
    const n = API.nivelMejora(id);
    return n >= m.max ? Infinity : m.coste(n);
};

API.subirMejora = function (id) {
    const c = API.costeMejora(id);
    if (!isFinite(c)) { E.aviso('Al máximo'); return false; }
    if ((saved.fragmentos || 0) < c) { E.aviso('Fragmentos insuficientes', 'Necesitas ' + c); return false; }
    saved.fragmentos -= c;
    mejoras()[id] = API.nivelMejora(id) + 1;
    E.sonar('nivel');
    return true;
};

/** Bonus de ascensión, que se suma a los de logros y talentos. */
API.bonusAscension = function (clave) {
    const m = mejoras();
    if (clave === 'shinyPct')     return (m.suerte || 0) * 15;
    if (clave === 'velocidadPct') return (m.velocidadGlobal || 0) * 2;
    if (clave === 'esenciaPct')   return (m.esenciaBase || 0) * 10;
    return 0;
};
API.multAscension = function (clave) { return 1 + API.bonusAscension(clave) / 100; };

API.ascender = function () {
    if (!API.puedeAscender()) {
        E.aviso('Aún no puedes ascender', 'Necesitas ' + API.RENACERES_PARA_ASCENDER + ' renaceres');
        return;
    }
    const ganancia = API.fragmentosAlAscender();
    saved.fragmentos = (saved.fragmentos || 0) + ganancia;
    saved.ascensiones = (saved.ascensiones || 0) + 1;

    // Memoria: conservar parte de los talentos
    const conservar = API.nivelMejora('inicioTalentos') * 5 / 100;
    const talentosViejos = Object.assign({}, saved.talentos || {});
    saved.talentos = {};
    if (conservar > 0) {
        for (const k in talentosViejos) {
            const n = Math.floor(talentosViejos[k] * conservar);
            if (n > 0) saved.talentos[k] = n;
        }
    }

    saved.esencia = 0;
    saved.prestigios = 0;

    if (typeof Progreso !== 'undefined') Progreso.invalidarCache();
    E.sonar('logro');
    E.aviso('🌟 Has ascendido', '+' + ganancia + ' Fragmentos');
    if (typeof Progreso !== 'undefined') Progreso.renacer();
};


/* ======================================================================
   10. RELIQUIAS — sobreviven a todo
   ====================================================================== */

const RELIQUIAS = [
    { id: 'brujula',  nombre: 'Brújula gastada',  icono: '🧭',
      texto: '+15% de objetos, para siempre',
      gana: () => (E.stats().objetosRecibidos || 0) >= 2000, aplica: { dropPct: 15 } },
    { id: 'reloj',    nombre: 'Reloj detenido',   icono: '⏳',
      texto: 'Los movimientos van un 10% más rápidos',
      gana: () => (E.stats().segundosJugados || 0) >= 180000, aplica: { velocidadPct: 10 } },
    { id: 'escama',   nombre: 'Escama iridiscente', icono: '✦',
      texto: '+50% de probabilidad de variocolor',
      gana: () => (E.stats().variocolores || 0) >= 50, aplica: { shinyPct: 50 } },
    { id: 'colmillo', nombre: 'Colmillo del abismo', icono: '🦷',
      texto: '+20% de daño',
      gana: () => (saved.maxSpiralFloor || 0) >= 150, aplica: { danoPct: 20 } },
    { id: 'semilla',  nombre: 'Semilla del origen', icono: '🌱',
      texto: '+25% de experiencia',
      gana: () => (saved.prestigios || 0) >= 5, aplica: { expPct: 25 } },
    { id: 'corona',   nombre: 'Corona sin dueño',  icono: '👑',
      texto: '+10% a todo',
      gana: () => (saved.ascensiones || 0) >= 1,
      aplica: { danoPct: 10, expPct: 10, dropPct: 10, shinyPct: 10 } },
];
API.RELIQUIAS = RELIQUIAS;

API.reliquiasObtenidas = function () {
    if (!saved.reliquias) saved.reliquias = {};
    return saved.reliquias;
};

API.revisarReliquias = function () {
    const r = API.reliquiasObtenidas();
    for (const rel of RELIQUIAS) {
        if (r[rel.id]) continue;
        let ok = false;
        try { ok = rel.gana(); } catch (e) { continue; }
        if (!ok) continue;
        r[rel.id] = true;
        E.sonar('logro');
        E.aviso(rel.icono + ' Reliquia: ' + rel.nombre, rel.texto);
    }
};

API.bonusReliquias = function (clave) {
    const r = API.reliquiasObtenidas();
    let t = 0;
    for (const rel of RELIQUIAS) if (r[rel.id]) t += (rel.aplica[clave] || 0);
    return t;
};
API.multReliquias = function (clave) { return 1 + API.bonusReliquias(clave) / 100; };


/* ======================================================================
   11. DESAFÍOS DE RENACER
   ====================================================================== */

const DESAFIOS = [
    { id: 'sinObjetos', nombre: 'Manos vacías',   texto: 'Sin objetos equipados', mult: 1.5,
      valida: () => { for (const s in team) if (team[s].item) return false; return true; } },
    { id: 'monotipo',   nombre: 'Puridad',        texto: 'Todo el equipo del mismo tipo', mult: 1.6,
      valida: () => {
          const t = [];
          for (const s in team) if (team[s].pkmn) t.push(pkmn[team[s].pkmn.id].type);
          if (t.length < 3) return false;
          return t[0].some(x => t.every(tt => tt.includes(x)));
      } },
    { id: 'trio',       nombre: 'Solo tres',      texto: 'Máximo 3 miembros en el equipo', mult: 1.4,
      valida: () => { let n = 0; for (const s in team) if (team[s].pkmn) n++; return n <= 3; } },
    { id: 'sinVario',   nombre: 'Sin brillo',     texto: 'Ningún variocolor en el equipo', mult: 1.25,
      valida: () => { for (const s in team) if (team[s].pkmn && pkmn[team[s].pkmn.id].shiny) return false; return true; } },
];
API.DESAFIOS = DESAFIOS;

API.desafiosActivos = function () {
    if (!saved.desafios) saved.desafios = [];
    return saved.desafios;
};

API.alternarDesafio = function (id) {
    const a = API.desafiosActivos();
    const i = a.indexOf(id);
    if (i >= 0) a.splice(i, 1); else a.push(id);
    return a.includes(id);
};

/** Multiplicador de Esencia por los desafíos que estés cumpliendo. */
API.multDesafios = function () {
    let m = 1;
    for (const id of API.desafiosActivos()) {
        const d = DESAFIOS.find(x => x.id === id);
        if (!d) continue;
        let ok = false;
        try { ok = d.valida(); } catch (e) {}
        if (ok) m *= d.mult;
    }
    return m;
};

API.estadoDesafios = function () {
    return DESAFIOS.map(d => {
        let ok = false;
        try { ok = d.valida(); } catch (e) {}
        return { ...d, activo: API.desafiosActivos().includes(d.id), cumpliendo: ok };
    });
};


/* ======================================================================
   12-13. TALENTOS CON PRERREQUISITOS Y ESPECIALIZACIÓN
   ====================================================================== */

const REQUISITOS = {
    cruce:     { requiere: 'dano',      nivel: 10 },
    velocidad: { requiere: 'dano',      nivel: 5 },
    genetica:  { requiere: 'exp',       nivel: 10 },
    ps:        { requiere: 'exp',       nivel: 5 },
    shiny:     { requiere: 'drop',      nivel: 10 },
    inicial:   { requiere: 'drop',      nivel: 15 },
};
API.REQUISITOS = REQUISITOS;

API.talentoDesbloqueado = function (id) {
    const r = REQUISITOS[id];
    if (!r) return true;
    if (typeof Progreso === 'undefined') return true;
    return Progreso.nivelTalento(r.requiere) >= r.nivel;
};

API.textoRequisito = function (id) {
    const r = REQUISITOS[id];
    if (!r) return null;
    const t = (typeof Progreso !== 'undefined')
        ? Progreso.TALENTOS.find(x => x.id === r.requiere) : null;
    return 'Requiere ' + (t ? t.nombre : r.requiere) + ' nivel ' + r.nivel;
};

/** Especialización: la rama en la que más has invertido abarata; las otras encarecen. */
API.factorRama = function (rama) {
    if (typeof Progreso === 'undefined') return 1;
    const porRama = {};
    for (const t of Progreso.TALENTOS) {
        porRama[t.rama] = (porRama[t.rama] || 0) + Progreso.nivelTalento(t.id);
    }
    const total = Object.values(porRama).reduce((a, b) => a + b, 0);
    if (total < 20) return 1;                       // al principio no penaliza
    const propia = porRama[rama] || 0;
    const cuota = propia / total;
    // rama dominante hasta -20%; ramas descuidadas hasta +30%
    return +(1 + (0.35 - cuota) * 0.6).toFixed(2);
};


/* ======================================================================
   14-15. RENACER RÁPIDO Y REGISTRO
   ====================================================================== */

API.registro = function () {
    if (!saved.registroRenaceres) saved.registroRenaceres = [];
    return saved.registroRenaceres;
};

API.anotarRenacer = function (esencia) {
    const r = API.registro();
    const ahora = Date.now();
    const anterior = r.length ? r[r.length - 1].cuando : (saved.inicioPartida || ahora);
    r.push({ n: r.length + 1, esencia, cuando: ahora, duracionMin: Math.round((ahora - anterior) / 60000) });
    if (r.length > 50) saved.registroRenaceres = r.slice(-50);
};

API.PENALIZACION_RAPIDO = 0.6;   // el renacer rápido da el 60%

API.puedeRenacerRapido = function () {
    const r = API.registro();
    return r.length >= 3;
};

API.renacerRapido = function () {
    if (!API.puedeRenacerRapido()) {
        E.aviso('Aún no', 'Necesitas al menos 3 renaceres para repetir uno');
        return;
    }
    const r = API.registro();
    const media = r.slice(-3).reduce((a, x) => a + x.esencia, 0) / 3;
    const ganancia = Math.floor(media * API.PENALIZACION_RAPIDO);
    saved.esencia = (saved.esencia || 0) + ganancia;
    saved.prestigios = (saved.prestigios || 0) + 1;
    API.anotarRenacer(ganancia);
    E.sonar('logro');
    E.aviso('⚡ Renacer rápido', '+' + ganancia + ' de Esencia (60% de tu media)');
    if (typeof Progreso !== 'undefined') Progreso.invalidarCache();
};


return API;

})();
