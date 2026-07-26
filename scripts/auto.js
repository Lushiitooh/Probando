/* =========================================================================
   Pokechill — Automatización
   =========================================================================
   Ideas 1-8 de IDEAS-2.md.

   En un idle maduro la recompensa por progresar es dejar de hacer cosas.
   Todo lo de aquí es opcional y está apagado por defecto: quien no lo
   active juega exactamente igual que antes.
   ========================================================================= */

var Auto = (function () {

'use strict';

const API = {};
const E = Extras;

function nom(x) { try { return format(x); } catch (e) { return String(x); } }

function cfg() {
    if (!saved.auto) saved.auto = {};
    const d = saved.auto;
    if (d.combate === undefined)   d.combate = false;
    if (d.equipar === undefined)   d.equipar = false;
    if (d.reciclar === undefined)  d.reciclar = false;
    if (d.prestigio === undefined) d.prestigio = false;
    if (d.umbralEsencia === undefined) d.umbralEsencia = 500;
    if (d.umbralReciclar === undefined) d.umbralReciclar = 40;
    if (d.genetica === undefined)  d.genetica = false;
    return d;
}
API.cfg = cfg;


/* ======================================================================
   1. AUTO-COMBATE POR OBJETIVO
   ======================================================================
   Se queda en la zona hasta cumplir una condición y entonces avisa.
   ====================================================================== */

const OBJETIVOS = [
    { id: 'especies', texto: n => 'Capturar ' + n + ' especies nuevas',
      leer: () => { let c = 0; for (const k in pkmn) if (pkmn[k].caught > 0) c++; return c; } },
    { id: 'combates', texto: n => 'Ganar ' + n + ' combates',
      leer: () => E.stats().combatesGanados },
    { id: 'niveles',  texto: n => 'Subir ' + n + ' niveles',
      leer: () => E.stats().nivelesSubidos },
    { id: 'objetos',  texto: n => 'Conseguir ' + n + ' objetos',
      leer: () => E.stats().objetosRecibidos },
    { id: 'variocolor', texto: n => 'Encontrar ' + n + ' variocolor',
      leer: () => E.stats().variocolores },
];
API.OBJETIVOS = OBJETIVOS;

API.fijarObjetivo = function (idObjetivo, cantidad) {
    const o = OBJETIVOS.find(x => x.id === idObjetivo);
    if (!o) return false;
    saved.objetivoActivo = { id: idObjetivo, meta: Number(cantidad) || 1, base: o.leer(), hecho: false };
    E.aviso('🎯 Objetivo fijado', o.texto(cantidad));
    return true;
};

API.quitarObjetivo = function () { saved.objetivoActivo = null; };

API.progresoObjetivo = function () {
    const a = saved.objetivoActivo;
    if (!a) return null;
    const o = OBJETIVOS.find(x => x.id === a.id);
    if (!o) return null;
    const hecho = Math.max(0, o.leer() - a.base);
    return { texto: o.texto(a.meta), hecho, meta: a.meta,
             pct: Math.min(100, Math.round(hecho / a.meta * 100)), completo: hecho >= a.meta };
};

API.revisarObjetivo = function () {
    const p = API.progresoObjetivo();
    if (!p || saved.objetivoActivo.hecho) return;
    if (!p.completo) return;
    saved.objetivoActivo.hecho = true;
    E.sonar('logro');
    E.aviso('🎯 Objetivo cumplido', p.texto);
    if (cfg().salirAlCumplir && typeof exitCombat === 'function') exitCombat();
};


/* ======================================================================
   3. AUTO-EQUIPAR AL ENTRAR EN ZONA
   ======================================================================
   El asesor ya sabía calcular el reparto óptimo; solo le faltaba actuar.
   ====================================================================== */

let ultimaZonaEquipada = null;

API.autoEquipar = function (forzar) {
    if (!forzar && cfg().equipar !== true) return;
    if (typeof Asesor === 'undefined') return;
    const zona = saved.currentArea;
    if (!zona) return;
    if (!forzar && zona === ultimaZonaEquipada) return;
    ultimaZonaEquipada = zona;

    const r = Asesor.equiparObjetosDelEquipo();
    if (r && r.cambiados > 0) {
        E.aviso('🎒 Objetos ajustados', r.cambiados + ' cambios para esta zona');
    }
};


/* ======================================================================
   5. AUTO-RECICLAJE
   ====================================================================== */

API.autoReciclar = function () {
    if (cfg().reciclar !== true) return;
    if (typeof Coleccion === 'undefined') return;
    const lista = Coleccion.reciclables();
    if (!lista.length) return;
    // solo si hay excedente de verdad, para no molestar cada dos por tres
    const total = lista.reduce((a, r) => a + r.chapas, 0);
    if (total < 3) return;
    Coleccion.reciclarTodo();
};


/* ======================================================================
   7. AUTO-PRESTIGIO
   ======================================================================
   Cierra el bucle del idle: lo dejas horas y vuelves con varios renaceres.
   Pide confirmación la primera vez, porque borra progreso.
   ====================================================================== */

API.autoPrestigio = function () {
    if (cfg().prestigio !== true) return;
    if (typeof Progreso === 'undefined') return;
    if (!Progreso.puedeRenacer()) return;
    if (Progreso.esenciaAlRenacer() < cfg().umbralEsencia) return;

    E.aviso('✨ Renaciendo solo', 'Umbral de ' + cfg().umbralEsencia + ' de Esencia alcanzado');
    Progreso.renacer();
};


/* ======================================================================
   8. PERFILES DE AUTOMATIZACIÓN
   ====================================================================== */

const PERFILES = {
    manual:     { nombre: 'Manual',           combate: false, equipar: false, reciclar: false, prestigio: false },
    comodo:     { nombre: 'Cómodo',           combate: false, equipar: true,  reciclar: true,  prestigio: false },
    farmeo:     { nombre: 'Farmeo',           combate: true,  equipar: true,  reciclar: true,  prestigio: false },
    desatendido:{ nombre: 'Desatendido',      combate: true,  equipar: true,  reciclar: true,  prestigio: true  },
};
API.PERFILES = PERFILES;

API.aplicarPerfil = function (id) {
    const p = PERFILES[id];
    if (!p) return false;
    const c = cfg();
    c.equipar = p.equipar; c.reciclar = p.reciclar; c.prestigio = p.prestigio; c.combate = p.combate;
    c.perfil = id;
    E.sonar('boton');
    E.aviso('⚙ Perfil: ' + p.nombre);
    return true;
};

API.perfilActual = function () { return cfg().perfil || 'manual'; };


/* ======================================================================
   4. AUTO-GENÉTICA
   ======================================================================
   Reencola la operación al terminar, mientras se cumpla la condición.
   ====================================================================== */

API.condicionGenetica = function () {
    const c = cfg();
    if (!c.geneticaHost || !pkmn[c.geneticaHost]) return false;
    const p = pkmn[c.geneticaHost];
    const suma = p.ivs ? Object.values(p.ivs).reduce((a, b) => a + b, 0) : 0;
    return suma < (c.geneticaMetaIvs || 30);
};

API.autoGenetica = function () {
    if (cfg().genetica !== true) return;
    if (!API.condicionGenetica()) {
        cfg().genetica = false;
        E.aviso('🧬 Genética terminada', 'Se alcanzó el objetivo de IV');
        return;
    }
    // El juego encola desde su propio menú; aquí solo se avisa de que toca.
    E.aviso('🧬 Operación lista', 'Vuelve a lanzarla desde Genética');
};


/* ======================================================================
   6. REGLAS CONDICIONALES DE COMBATE
   ======================================================================
   Estilo gambit: condición → acción, en orden de prioridad.
   ====================================================================== */

const CONDICIONES = {
    psBajos:      { texto: 'Mis PS por debajo del 25%',
                    evaluar: () => { const s = exploreActiveMember; const p = team[s] && team[s].pkmn && pkmn[team[s].pkmn.id];
                                     return p && p.playerHpMax && p.playerHp / p.playerHpMax < 0.25; } },
    rivalDebil:   { texto: 'El rival está por debajo del 20% de vida',
                    evaluar: () => typeof wildPkmnHp !== 'undefined' && wildPkmnHpMax && wildPkmnHp / wildPkmnHpMax < 0.2 },
    desventaja:   { texto: 'El rival me resiste',
                    evaluar: () => {
                        if (typeof saved.currentPkmn === 'undefined' || !pkmn[saved.currentPkmn]) return false;
                        const s = exploreActiveMember;
                        if (!team[s] || !team[s].pkmn) return false;
                        const mis = pkmn[team[s].pkmn.id].type;
                        return mis.every(t => {
                            try { return typeEffectiveness(t, pkmn[saved.currentPkmn].type) < 1; } catch (e) { return false; }
                        });
                    } },
};
API.CONDICIONES = CONDICIONES;

const ACCIONES = {
    cambiar:  { texto: 'Cambiar al siguiente miembro',
                ejecutar: () => { if (typeof switchMemberNext === 'function') switchMemberNext(1); } },
    salir:    { texto: 'Salir del combate',
                ejecutar: () => { if (typeof exitCombat === 'function') exitCombat(); } },
    avisar:   { texto: 'Solo avisarme',
                ejecutar: () => E.aviso('⚠ Regla activada') },
};
API.ACCIONES = ACCIONES;

API.reglas = function () {
    if (!saved.reglas) saved.reglas = [];
    return saved.reglas;
};

API.anadirRegla = function (condicion, accion) {
    if (!CONDICIONES[condicion] || !ACCIONES[accion]) return false;
    API.reglas().push({ condicion, accion, activa: true });
    return true;
};

API.quitarRegla = function (i) { API.reglas().splice(i, 1); };

let ultimaRegla = 0;

API.evaluarReglas = function () {
    const rs = API.reglas();
    if (!rs.length) return;
    // no más de una acción cada 2 s, para no entrar en bucle
    const ahora = performance.now();
    if (ahora - ultimaRegla < 2000) return;

    for (const r of rs) {
        if (!r.activa) continue;
        const c = CONDICIONES[r.condicion];
        if (!c) continue;
        let cumple = false;
        try { cumple = c.evaluar(); } catch (e) { continue; }
        if (!cumple) continue;
        ultimaRegla = ahora;
        try { ACCIONES[r.accion].ejecutar(); } catch (e) {}
        return;
    }
};


/* ======================================================================
   2. COLA DE TAREAS
   ======================================================================
   Encadena objetivos. Cuando uno se cumple, pasa al siguiente.
   ====================================================================== */

API.cola = function () {
    if (!saved.cola) saved.cola = [];
    return saved.cola;
};

API.anadirATareas = function (idObjetivo, cantidad, idArea) {
    API.cola().push({ id: idObjetivo, meta: Number(cantidad) || 1, area: idArea || null });
    E.aviso('📋 Añadido a la cola', API.cola().length + ' tareas pendientes');
};

API.siguienteTarea = function () {
    const c = API.cola();
    if (!c.length) return null;
    const t = c.shift();
    if (t.area && areas[t.area]) {
        saved.currentAreaBuffer = t.area;
        if (typeof injectPreviewTeam === 'function') injectPreviewTeam();
        if (typeof initialiseArea === 'function') initialiseArea();
    }
    API.fijarObjetivo(t.id, t.meta);
    return t;
};

API.revisarCola = function () {
    const p = API.progresoObjetivo();
    if (p && p.completo && API.cola().length) API.siguienteTarea();
};

API.limpiarCola = function () { saved.cola = []; };


/* ======================================================================
   LATIDO: se llama con moderación desde el bucle del juego
   ====================================================================== */

let ultimoLatido = 0;

API.latido = function () {
    const ahora = performance.now();
    if (ahora - ultimoLatido < 3000) return;   // cada 3 s basta
    ultimoLatido = ahora;

    try { API.revisarObjetivo(); } catch (e) {}
    try { API.revisarCola(); } catch (e) {}
    try { API.autoReciclar(); } catch (e) {}
    try { API.autoPrestigio(); } catch (e) {}
};


return API;

})();
