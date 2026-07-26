/* =========================================================================
   Pokechill — Combate avanzado
   =========================================================================
   Ideas 16-23 de IDEAS-2.md.
   ========================================================================= */

var Combate3 = (function () {

'use strict';

const API = {};
const E = Extras;

function nom(x) { try { return format(x); } catch (e) { return String(x); } }


/* ======================================================================
   16. HABILIDADES ACTIVAS CON ENFRIAMIENTO
   ======================================================================
   Una por Pokémon, disparable a mano. Da algo que hacer en sesiones
   activas sin romper el idle: quien no las use juega igual.
   ====================================================================== */

const ACTIVAS = [
    { id: 'furia',    nombre: 'Furia',      icono: '💢', enfriamiento: 20000,
      texto: 'El siguiente golpe hace x3',
      usar: () => { API.buffTemporal('golpeTriple', 1); } },
    { id: 'escudo',   nombre: 'Escudo',     icono: '🛡', enfriamiento: 25000,
      texto: 'Anula el daño recibido durante 5 s',
      usar: () => { API.buffTemporal('invulnerable', 5000); } },
    { id: 'ráfaga',   nombre: 'Ráfaga',     icono: '⚡', enfriamiento: 30000,
      texto: 'Ataca al doble de velocidad durante 8 s',
      usar: () => { API.buffTemporal('dobleVelocidad', 8000); } },
    { id: 'robo',     nombre: 'Rapiña',     icono: '🎁', enfriamiento: 45000,
      texto: 'El siguiente rival derrotado suelta objeto seguro',
      usar: () => { API.buffTemporal('dropSeguro', 1); } },
];
API.ACTIVAS = ACTIVAS;

const enfriamientos = {};
const buffs = {};

API.buffTemporal = function (clave, duracionOUsos) {
    // valores pequeños se interpretan como usos; grandes, como milisegundos
    if (duracionOUsos <= 10) buffs[clave] = { usos: duracionOUsos };
    else buffs[clave] = { hasta: performance.now() + duracionOUsos };
};

API.buffActivo = function (clave) {
    const b = buffs[clave];
    if (!b) return false;
    if (b.usos !== undefined) return b.usos > 0;
    return performance.now() < b.hasta;
};

API.consumirBuff = function (clave) {
    const b = buffs[clave];
    if (!b || b.usos === undefined) return;
    b.usos--;
    if (b.usos <= 0) delete buffs[clave];
};

API.puedeUsar = function (id) {
    const a = ACTIVAS.find(x => x.id === id);
    if (!a) return false;
    const ultimo = enfriamientos[id] || 0;
    return performance.now() - ultimo >= a.enfriamiento;
};

API.restante = function (id) {
    const a = ACTIVAS.find(x => x.id === id);
    if (!a) return 0;
    return Math.max(0, a.enfriamiento - (performance.now() - (enfriamientos[id] || 0)));
};

API.usarActiva = function (id) {
    if (!API.puedeUsar(id)) return false;
    const a = ACTIVAS.find(x => x.id === id);
    enfriamientos[id] = performance.now();
    try { a.usar(); } catch (e) {}
    E.sonar('critico');
    E.aviso(a.icono + ' ' + a.nombre, a.texto);
    return true;
};

/** Multiplicador que aplica el combate por las activas en curso. */
API.multActivas = function () {
    let m = 1;
    if (API.buffActivo('golpeTriple')) { m *= 3; API.consumirBuff('golpeTriple'); }
    return m;
};


/* ======================================================================
   17. JEFES CON FASES
   ======================================================================
   Al bajar de umbral cambian de comportamiento. Obliga a llevar cobertura
   en vez de un solo movimiento fuerte.
   ====================================================================== */

const FASES = [
    { umbral: 0.66, nombre: 'Enfurecido',  icono: '💢', texto: 'Ataca un 25% más rápido', timer: 0.75, defensa: 1 },
    { umbral: 0.33, nombre: 'Acorazado',   icono: '🛡', texto: 'Duplica su defensa',      timer: 1,    defensa: 2 },
    { umbral: 0.10, nombre: 'Desesperado', icono: '🔥', texto: 'Todo al límite',          timer: 0.5,  defensa: 0.7 },
];
API.FASES = FASES;

let faseAvisada = -1;

API.faseActual = function () {
    if (saved.sinFases === true) return null;
    if (typeof wildPkmnHp === 'undefined' || !wildPkmnHpMax) return null;
    const a = areas[saved.currentArea];
    if (!a || !(a.trainer || a.type === 'event' || a.type === 'dimension')) return null;   // solo jefes
    const frac = wildPkmnHp / wildPkmnHpMax;
    for (let i = FASES.length - 1; i >= 0; i--) if (frac <= FASES[i].umbral) return { ...FASES[i], indice: i };
    return null;
};

API.revisarFase = function () {
    const f = API.faseActual();
    const i = f ? f.indice : -1;
    if (i === faseAvisada) return;
    faseAvisada = i;
    if (!f) return;
    E.sonar('golpeFuerte');
    E.aviso(f.icono + ' ' + f.nombre, f.texto);
    if (typeof Extras2 !== 'undefined') Extras2.impacto('dark', true);
};

API.reiniciarFase = function () { faseAvisada = -1; };

API.multDefensaFase = function () { const f = API.faseActual(); return f ? f.defensa : 1; };
API.multTimerFase   = function () { const f = API.faseActual(); return f ? f.timer : 1; };


/* ======================================================================
   19. ESTADOS ENCADENADOS
   ======================================================================
   Combinar dos estados da un tercero con efecto propio. Recompensa la
   variedad frente a repetir siempre el mismo.
   ====================================================================== */

const COMBINACIONES = [
    { a: 'burn',      b: 'poisoned',  nombre: 'Infección',  texto: 'Daño periódico duplicado',  mult: 2 },
    { a: 'freeze',    b: 'paralysis', nombre: 'Entumecido', texto: 'No puede actuar 3 turnos',  mult: 1 },
    { a: 'confused',  b: 'sleep',     nombre: 'Delirio',    texto: 'Se golpea a sí mismo',      mult: 1.5 },
    { a: 'poisoned',  b: 'confused',  nombre: 'Fiebre',     texto: 'Pierde precisión y vida',   mult: 1.4 },
];
API.COMBINACIONES = COMBINACIONES;

API.comprobarCombinacion = function (estados) {
    if (saved.sinCombinaciones === true) return null;
    const activos = Object.keys(estados || {}).filter(k => estados[k] > 0);
    for (const c of COMBINACIONES) {
        if (activos.includes(c.a) && activos.includes(c.b)) return c;
    }
    return null;
};

let ultimaCombinacion = 0;

API.aplicarCombinacion = function (estados) {
    const c = API.comprobarCombinacion(estados);
    if (!c) return 1;
    const ahora = performance.now();
    if (ahora - ultimaCombinacion > 4000) {
        ultimaCombinacion = ahora;
        E.numeroFlotante('¡' + c.nombre + '!', { color: '#c77dff', grande: true });
        E.sonar('critico');
    }
    return c.mult;
};


/* ======================================================================
   20. CONTRAATAQUES
   ======================================================================
   Al recibir un supereficaz, devolver parte. Da razón de ser a los
   Pokémon defensivos, que hoy no la tienen.
   ====================================================================== */

API.PORCENTAJE_CONTRA = 0.25;

API.contraatacar = function (danoRecibido, fueSuperEficaz) {
    if (saved.sinContraataque === true) return 0;
    if (!fueSuperEficaz) return 0;
    const s = exploreActiveMember;
    if (!team[s] || !team[s].pkmn) return 0;
    const p = pkmn[team[s].pkmn.id];
    // los defensivos devuelven más
    const factor = (p.bst.def + p.bst.sdef) / 12;
    const dano = danoRecibido * API.PORCENTAJE_CONTRA * factor;
    if (dano > 0 && typeof wildPkmnHp !== 'undefined') {
        wildPkmnHp -= dano;
        E.numeroFlotante('⚔ ' + E.formatearNumero(dano), { color: '#ffd166' });
    }
    return dano;
};


/* ======================================================================
   21. RELEVO CON HERENCIA
   ====================================================================== */

API.PORCENTAJE_HERENCIA = 0.5;

API.heredarAlRelevar = function (slotAnterior, slotNuevo) {
    if (saved.sinHerencia === true) return;
    if (!team[slotAnterior] || !team[slotNuevo]) return;
    const origen = team[slotAnterior].buffs || {};
    if (!team[slotNuevo].buffs) team[slotNuevo].buffs = {};
    let heredados = 0;
    for (const k in origen) {
        if (!/up[12]$/.test(k)) continue;          // solo las mejoras positivas
        if (origen[k] <= 0) continue;
        const n = Math.floor(origen[k] * API.PORCENTAJE_HERENCIA);
        if (n <= 0) continue;
        team[slotNuevo].buffs[k] = Math.max(team[slotNuevo].buffs[k] || 0, n);
        heredados++;
    }
    if (heredados) E.aviso('🔄 Relevo', heredados + ' mejora(s) heredada(s)');
};


/* ======================================================================
   22. INICIATIVA DE EQUIPO
   ====================================================================== */

API.iniciativa = function () {
    let suma = 0, n = 0;
    for (const s in team) {
        if (!team[s].pkmn) continue;
        const p = pkmn[team[s].pkmn.id];
        suma += p.bst.spe + ((p.ivs && p.ivs.spe) || 0) * 0.5;
        n++;
    }
    return n ? suma / n : 0;
};

/** Ventaja de salida: barra inicial adelantada si tu equipo es rápido. */
API.ventajaInicial = function () {
    if (saved.sinIniciativa === true) return 0;
    const mia = API.iniciativa();
    const rival = (typeof saved.currentPkmn !== 'undefined' && pkmn[saved.currentPkmn])
        ? pkmn[saved.currentPkmn].bst.spe : 3;
    const dif = mia - rival;
    if (dif <= 0) return 0;
    return Math.min(35, dif * 8);      // hasta un 35% de barra de regalo
};


/* ======================================================================
   18. TERRENO CAMBIANTE
   ====================================================================== */

const CLIMAS_ROTABLES = ['sunny', 'rainy', 'sandstorm', 'hail', 'foggy',
                         'electricTerrain', 'grassyTerrain', 'mistyTerrain'];

let ultimoCambioClima = 0;
API.INTERVALO_CLIMA = 45000;

API.rotarClima = function () {
    if (saved.climaCambiante !== true) return;
    if (!saved.currentArea) return;
    const ahora = performance.now();
    if (ahora - ultimoCambioClima < API.INTERVALO_CLIMA) return;
    ultimoCambioClima = ahora;

    const nuevo = CLIMAS_ROTABLES[Math.floor(Math.random() * CLIMAS_ROTABLES.length)];
    if (nuevo === saved.weather) return;
    saved.weather = nuevo;
    saved.weatherTimer = 9999;
    E.aviso('🌦 El clima cambia', typeof format === 'function' ? format(nuevo) : nuevo);
};


/* ======================================================================
   23. COMBATES PUZZLE
   ======================================================================
   Peleas con una solución concreta. Se integran con el sistema de Retos.
   ====================================================================== */

const PUZZLES = [
    { id: 'p1', nombre: 'Muro de acero',
      texto: 'El rival es de tipo Acero y resiste casi todo. Solo Fuego, Lucha y Tierra le hacen daño real.',
      rival: 'registeel', nivel: 60,
      pista: 'Necesitas al menos dos tipos distintos entre Fuego, Lucha y Tierra para mantener el cruce.',
      valida: equipo => {
          const tipos = new Set();
          for (const id of equipo) for (const m of Object.values(pkmn[id].moves).filter(Boolean))
              if (['fire','fighting','ground'].includes(move[m].type)) tipos.add(move[m].type);
          return tipos.size >= 2;
      } },
    { id: 'p2', nombre: 'Espejo',
      texto: 'El rival copia tu tipo principal. Llevar monotipo es perder.',
      rival: 'ditto', nivel: 50,
      pista: 'Un equipo con cinco tipos distintos o más.',
      valida: equipo => {
          const t = new Set();
          for (const id of equipo) pkmn[id].type.forEach(x => t.add(x));
          return t.size >= 5;
      } },
    { id: 'p3', nombre: 'Carrera',
      texto: 'El rival huye en 30 segundos. Necesitas daño inmediato, no aguante.',
      rival: 'ninjask', nivel: 55,
      pista: 'Prioriza velocidad y movimientos rápidos; el cruce importa más que nunca.',
      valida: equipo => equipo.some(id => pkmn[id].bst.spe >= 5) },
];
API.PUZZLES = PUZZLES;

API.estadoPuzzles = function () {
    if (!saved.puzzles) saved.puzzles = {};
    return saved.puzzles;
};

API.comprobarPuzzle = function (idPuzzle) {
    const p = PUZZLES.find(x => x.id === idPuzzle);
    if (!p) return null;
    const equipo = [];
    for (const s in team) if (team[s].pkmn) equipo.push(team[s].pkmn.id);
    if (!equipo.length) return { ok: false, motivo: 'Sin equipo' };
    let ok = false;
    try { ok = p.valida(equipo); } catch (e) {}
    return { ok, motivo: ok ? 'Tu equipo cumple las condiciones' : p.pista };
};

API.resolverPuzzle = function (idPuzzle) {
    const e = API.estadoPuzzles();
    if (e[idPuzzle]) return false;
    e[idPuzzle] = true;
    if (typeof item !== 'undefined' && item.goldenBottleCap) item.goldenBottleCap.got += 5;
    E.sonar('logro');
    E.aviso('🧩 Puzzle resuelto', '+5 Chapas Doradas');
    return true;
};


return API;

})();
