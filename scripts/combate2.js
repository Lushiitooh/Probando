/* =========================================================================
   Pokechill — Combate y estrategia
   =========================================================================
   Ideas 1, 3, 4, 5, 6, 7, 8, 31, 36 de IDEAS.md.
   Depende de extras.js y progreso.js.
   ========================================================================= */

var Combate2 = (function () {

'use strict';

const API = {};
const E = Extras;

const TIPOS_ES = () => (typeof ES !== 'undefined' && ES.tipo) ? ES.tipo : {};
const nombreTipo = t => (TIPOS_ES()[t] || t);


/* ======================================================================
   4. SINERGIAS DE EQUIPO
   ======================================================================
   Bonificaciones por cómo está compuesto el equipo. Dan razones para
   construir equipos temáticos en vez de "los seis con más estrellas".
   ====================================================================== */

// Índice hijo -> padre, construido una sola vez. La versión ingenua recorría
// las 1376 especies por consulta y recursaba sin control: con una cadena
// evolutiva cíclica desbordaba la pila y mataba el bucle del juego.
let indicePadres = null;

function construirIndicePadres() {
    indicePadres = {};
    for (const k in pkmn) {
        if (!pkmn[k].evolve) continue;
        let evos;
        try { evos = pkmn[k].evolve(); } catch (e) { continue; }
        for (const e in evos) {
            const hijo = evos[e] && evos[e].pkmn && evos[e].pkmn.id;
            if (hijo && !indicePadres[hijo]) indicePadres[hijo] = k;
        }
    }
}

function raizEvolutiva(id) {
    if (!indicePadres) construirIndicePadres();
    const vistos = new Set();
    let actual = id;
    while (indicePadres[actual] && !vistos.has(actual)) {
        vistos.add(actual);
        actual = indicePadres[actual];
    }
    return actual;
}
API.raizEvolutiva = raizEvolutiva;

const SINERGIAS = [
    {
        id: 'monotipo',
        nombre: 'Especialistas',
        descripcion: 'Todos comparten un tipo: +20% de defensa',
        detecta: miembros => {
            if (miembros.length < 3) return false;
            const comunes = miembros.map(p => pkmn[p].type);
            return comunes[0].some(t => comunes.every(tipos => tipos.includes(t)));
        },
        aplica: { psPct: 20 },
    },
    {
        id: 'arcoiris',
        nombre: 'Arcoíris',
        descripcion: '5 o más tipos distintos: +15% de Potencia Cruzada',
        detecta: miembros => {
            const set = new Set();
            miembros.forEach(p => pkmn[p].type.forEach(t => set.add(t)));
            return set.size >= 5;
        },
        aplica: { crucePct: 15 },
    },
    {
        id: 'familia',
        nombre: 'Lazo familiar',
        descripcion: 'Tres de la misma línea evolutiva: +30% de experiencia',
        detecta: miembros => {
            if (miembros.length < 3) return false;
            const raices = {};
            for (const m of miembros) { const r = raizEvolutiva(m); raices[r] = (raices[r] || 0) + 1; }
            return Object.values(raices).some(n => n >= 3);
        },
        aplica: { expPct: 30 },
    },
    {
        id: 'variocolor',
        nombre: 'Brillo colectivo',
        descripcion: 'Todo el equipo es variocolor: +25% de daño',
        detecta: miembros => miembros.length >= 3 && miembros.every(p => pkmn[p].shiny),
        aplica: { danoPct: 25 },
    },
    {
        id: 'veteranos',
        nombre: 'Veteranía',
        descripcion: 'Todos a nivel 100: +20% de objetos',
        detecta: miembros => miembros.length >= 3 && miembros.every(p => pkmn[p].level >= 100),
        aplica: { dropPct: 20 },
    },
];
API.SINERGIAS = SINERGIAS;

function miembrosActivos() {
    const out = [];
    for (const s in team) if (team[s].pkmn) out.push(team[s].pkmn.id);
    return out;
}
API.miembrosActivos = miembrosActivos;

let cacheSinergias = null;
let firmaEquipo = '';

/** Sinergias activas ahora mismo. Se recalcula solo si cambia el equipo. */
API.sinergiasActivas = function () {
    const m = miembrosActivos();
    const firma = m.join(',') + '|' + m.map(p => pkmn[p].level + (pkmn[p].shiny ? 's' : '')).join(',');
    if (firma === firmaEquipo && cacheSinergias) return cacheSinergias;
    firmaEquipo = firma;
    cacheSinergias = m.length ? SINERGIAS.filter(s => { try { return s.detecta(m); } catch (e) { return false; } }) : [];
    return cacheSinergias;
};

API.bonusSinergia = function (clave) {
    let total = 0;
    for (const s of API.sinergiasActivas()) total += (s.aplica[clave] || 0);
    return total;
};

API.multSinergia = function (clave) { return 1 + API.bonusSinergia(clave) / 100; };


/* ======================================================================
   7. VISTA PREVIA DE EFECTIVIDAD
   ======================================================================
   El juego ya calcula la efectividad; simplemente no la enseña. Aquí se
   marca cada caja de movimiento del equipo con su multiplicador contra el
   salvaje actual.
   ====================================================================== */

function etiquetaEficacia(mult) {
    if (mult === 0)   return { texto: '∅',    clase: 'ef-nulo',  titulo: 'Sin efecto' };
    if (mult > 1.4)   return { texto: '×' + mult, clase: 'ef-super', titulo: 'Supereficaz' };
    if (mult > 1)     return { texto: '×' + mult, clase: 'ef-bien',  titulo: 'Eficaz' };
    if (mult < 1)     return { texto: '×' + mult, clase: 'ef-poco',  titulo: 'Poco eficaz' };
    return null;   // neutro: no se marca, para no ensuciar
}

API.actualizarEficacia = function () {
    if (saved.sinPreviewEficacia === true) return;
    if (typeof saved.currentPkmn === 'undefined' || !pkmn[saved.currentPkmn]) return;

    const tiposRival = pkmn[saved.currentPkmn].type;

    for (const slot in team) {
        if (!team[slot].pkmn) continue;
        for (let n = 1; n <= 4; n++) {
            const caja = document.getElementById('pkmn-movebox-slot' + n + '-team-' + slot);
            if (!caja) continue;
            const movId = caja.dataset.move;
            let marca = caja.querySelector('.marca-eficacia');

            if (!movId || !move[movId] || move[movId].power === 0) { if (marca) marca.remove(); continue; }

            let mult;
            try { mult = typeEffectiveness(move[movId].type, tiposRival); } catch (e) { continue; }
            const et = etiquetaEficacia(mult);

            if (!et) { if (marca) marca.remove(); continue; }
            if (!marca) {
                marca = document.createElement('span');
                marca.className = 'marca-eficacia';
                caja.appendChild(marca);
            }
            marca.className = 'marca-eficacia ' + et.clase;
            marca.textContent = et.texto;
            marca.title = et.titulo;
        }
    }
};


/* ======================================================================
   1. EDITOR DE ROTACIÓN CON VISTA PREVIA DEL CRUCE
   ======================================================================
   La mecánica central del juego —alternar tipos para el bonus ×1.3— era
   invisible. Aquí se calcula la rotación completa de un Pokémon y se dice,
   movimiento a movimiento, cuál cruza y cuál no.
   ====================================================================== */

/** Simula la rotación de 4 movimientos y devuelve qué pasa en cada paso. */
API.analizarRotacion = function (movimientos) {
    const activos = movimientos.filter(m => m && move[m]);
    const pasos = [];
    let ultimoTipo, cadena = [];

    // Dos vueltas: la rotación es cíclica, así que el primer movimiento
    // también cruza con el último.
    for (let vuelta = 0; vuelta < 2; vuelta++) {
        for (const m of activos) {
            const mv = move[m];
            const cruza = mv.power > 0 && ultimoTipo !== undefined && ultimoTipo !== mv.type;

            if (cruza) {
                if (cadena.includes(mv.type)) cadena = [mv.type]; else cadena.push(mv.type);
                if (cadena.length > 4) cadena = cadena.slice(-4);
            } else if (mv.power > 0) {
                cadena = [];
            }

            if (vuelta === 1) {
                pasos.push({
                    id: m,
                    tipo: mv.type,
                    potencia: mv.power,
                    cruza,
                    cadena: cadena.length,
                    bonus: cruza ? (1.3 + ({ 2: 0, 3: 0.1, 4: 0.2 }[cadena.length] || 0)) : 1,
                });
            }
            if (mv.power > 0) ultimoTipo = mv.type;
        }
    }

    const conPotencia = pasos.filter(p => p.potencia > 0);
    const cruces = conPotencia.filter(p => p.cruza).length;
    return {
        pasos,
        cruces,
        total: conPotencia.length,
        // Multiplicador medio que se obtiene por ciclo completo
        multMedio: conPotencia.length
            ? conPotencia.reduce((a, p) => a + p.bonus, 0) / conPotencia.length : 1,
    };
};

/** Sugiere el mejor orden posible de esos mismos movimientos. */
API.mejorOrden = function (movimientos) {
    const activos = movimientos.filter(m => m && move[m]);
    if (activos.length < 2) return activos;

    let mejor = activos, mejorMult = API.analizarRotacion(activos).multMedio;

    // Con 4 movimientos son 24 permutaciones: se pueden probar todas.
    const permutar = arr => arr.length <= 1 ? [arr] :
        arr.flatMap((x, i) => permutar([...arr.slice(0, i), ...arr.slice(i + 1)]).map(r => [x, ...r]));

    for (const p of permutar(activos)) {
        const m = API.analizarRotacion(p).multMedio;
        if (m > mejorMult + 1e-9) { mejorMult = m; mejor = p; }
    }
    return mejor;
};


/* ======================================================================
   3. SIMULADOR DE DAÑO
   ======================================================================
   Reproduce la fórmula real del juego para estimar daño por minuto sin
   tener que combatir 5 minutos para comparar dos equipos.
   ====================================================================== */

API.simular = function (idPkmn, tiposRival = ['normal'], defensaRival = 3) {
    const p = pkmn[idPkmn];
    if (!p) return null;

    const movs = Object.values(p.moves).filter(Boolean);
    if (!movs.length) return { dpm: 0, detalle: [], aviso: 'Sin movimientos equipados' };

    const rot = API.analizarRotacion(movs);
    const detalle = [];
    let dañoCiclo = 0, tiempoCiclo = 0;

    for (const paso of rot.pasos) {
        const mv = move[paso.id];
        const fisico = mv.split === 'physical';
        const atkEstrellas = fisico ? p.bst.atk : p.bst.satk;
        const atkIv = fisico ? p.ivs.atk : p.ivs.satk;

        let dano = (mv.power + Math.max(0, (atkEstrellas * 30) * Math.pow(1.1, atkIv) - defensaRival * 30))
                   * (1 + p.level * 0.1);

        // STAB
        let stab = 1;
        if (p.type.includes(mv.type)) stab = p.type.length === 1 ? 1.7 : 1.5;
        dano *= stab;

        // efectividad
        let ef = 1;
        try { ef = typeEffectiveness(mv.type, tiposRival); } catch (e) {}
        dano *= ef;

        // cruce
        dano *= paso.bonus;

        // bonus permanentes
        if (typeof Progreso !== 'undefined') dano *= Progreso.mult('danoPct');
        dano *= API.multSinergia('danoPct');

        const timer = (mv.timer || 2000) * Math.pow(0.9, p.bst.spe) * Math.pow(0.95, p.ivs.spe);

        dañoCiclo += dano;
        tiempoCiclo += timer;
        detalle.push({ id: paso.id, dano: Math.round(dano), ms: Math.round(timer),
                       cruza: paso.cruza, stab, ef });
    }

    return {
        dpm: tiempoCiclo ? Math.round(dañoCiclo / (tiempoCiclo / 60000)) : 0,
        dañoCiclo: Math.round(dañoCiclo),
        segundosCiclo: +(tiempoCiclo / 1000).toFixed(1),
        detalle,
        cruces: rot.cruces + '/' + rot.total,
    };
};


/* ======================================================================
   6. MODO MANUAL
   ======================================================================
   Un botón que adelanta el siguiente movimiento, con enfriamiento. Quien
   no lo toque juega exactamente igual que antes.
   ====================================================================== */

let ultimoManual = 0;
API.ENFRIAMIENTO_MANUAL = 3000;

API.puedeManual = function () {
    return saved.modoManual === true &&
           performance.now() - ultimoManual >= API.ENFRIAMIENTO_MANUAL;
};

API.golpeManual = function () {
    if (!API.puedeManual()) return false;
    if (typeof shouldCombatStop === 'function' && shouldCombatStop()) return false;
    ultimoManual = performance.now();
    if (typeof barProgressPlayer !== 'undefined') barProgressPlayer = 100;   // dispara ya
    E.sonar('critico');
    return true;
};

API.enfriamientoRestante = function () {
    return Math.max(0, API.ENFRIAMIENTO_MANUAL - (performance.now() - ultimoManual));
};


/* ======================================================================
   8. VARIANTES DE IA EN LOS SALVAJES
   ======================================================================
   Un salvaje puede salir agresivo, defensivo o veloz. Cambia el ritmo del
   combate sin tocar las fórmulas: solo modula timer y defensa.
   ====================================================================== */

const VARIANTES = [
    { id: 'normal',    nombre: '',            peso: 60, timer: 1,    defensa: 1,   color: null },
    { id: 'agresivo',  nombre: 'Agresivo',    peso: 15, timer: 0.75, defensa: 0.8, color: '#e07a5f' },
    { id: 'defensivo', nombre: 'Defensivo',   peso: 15, timer: 1.3,  defensa: 1.4, color: '#6b95c9' },
    { id: 'veloz',     nombre: 'Veloz',       peso: 7,  timer: 0.6,  defensa: 0.7, color: '#f2cc8f' },
    { id: 'coloso',    nombre: 'Coloso',      peso: 3,  timer: 1.6,  defensa: 2.2, color: '#9b5de5' },
];
API.VARIANTES = VARIANTES;

API.sortearVariante = function () {
    if (saved.sinVariantes === true) return VARIANTES[0];
    const total = VARIANTES.reduce((a, v) => a + v.peso, 0);
    let r = Math.random() * total;
    for (const v of VARIANTES) { r -= v.peso; if (r <= 0) return v; }
    return VARIANTES[0];
};

API.varianteActual = VARIANTES[0];


/* ======================================================================
   36. CLIMA DINÁMICO POR ZONA
   ======================================================================
   Cada área tiene un clima propio que rota con el tiempo real. El sistema
   de climas del juego ya estaba completo; solo le faltaba un motor.
   ====================================================================== */

const CLIMAS_POR_FONDO = {
    volcano: ['sunny'], desert: ['sunny', 'sandstorm'], beach: ['sunny', 'rainy'],
    snow: ['hail'], iceCave: ['hail'], sea: ['rainy'], lake: ['rainy'],
    forest: ['grassyTerrain', 'rainy'], plant: ['grassyTerrain'],
    cave: ['foggy'], night: ['foggy'], space: ['electricTerrain'],
    tower: ['electricTerrain'], mountain: ['sandstorm', 'hail'],
};

API.climaDeZona = function (idArea) {
    const a = areas[idArea];
    if (!a) return null;
    const opciones = CLIMAS_POR_FONDO[a.background];
    if (!opciones) return null;
    // La franja de 2 horas hace que el clima sea estable y compartido:
    // dos jugadores en la misma zona a la misma hora ven lo mismo.
    const franja = Math.floor(Date.now() / (2 * 3600 * 1000));
    let h = 0;
    const clave = idArea + franja;
    for (let i = 0; i < clave.length; i++) h = (h * 31 + clave.charCodeAt(i)) >>> 0;
    return opciones[h % opciones.length];
};

API.aplicarClimaDeZona = function () {
    if (saved.climaDinamico !== true) return;
    if (!saved.currentArea) return;
    if (saved.weatherTimer > 0) return;            // no pisar un clima puesto por el jugador
    const c = API.climaDeZona(saved.currentArea);
    if (!c) return;
    saved.weather = c;
    saved.weatherTimer = 9999;                     // permanente mientras estés en la zona
};


/* ======================================================================
   31. TORRE ROGUELITE: BENDICIONES CADA 5 PLANTAS
   ====================================================================== */

const BENDICIONES = [
    { id: 'furia',    nombre: 'Furia',      texto: '+25% de daño',                  aplica: { danoPct: 25 } },
    { id: 'muro',     nombre: 'Muro',       texto: '+30% de PS',                    aplica: { psPct: 30 } },
    { id: 'prisa',    nombre: 'Prisa',      texto: 'Movimientos un 20% más rápidos', aplica: { velocidadPct: 20 } },
    { id: 'codicia',  nombre: 'Codicia',    texto: '+40% de objetos',               aplica: { dropPct: 40 } },
    { id: 'sabiduria',nombre: 'Sabiduría',  texto: '+50% de experiencia',           aplica: { expPct: 50 } },
    { id: 'filo',     nombre: 'Filo',       texto: '+0.2 de Potencia Cruzada',      aplica: { crucePlano: 0.2 } },
    { id: 'fortuna',  nombre: 'Fortuna',    texto: '+100% de variocolor',           aplica: { shinyPct: 100 } },
];
API.BENDICIONES = BENDICIONES;

API.bendicionesActivas = function () {
    if (!saved.bendiciones) saved.bendiciones = [];
    return saved.bendiciones;
};

API.bonusBendicion = function (clave) {
    let t = 0;
    for (const id of API.bendicionesActivas()) {
        const b = BENDICIONES.find(x => x.id === id);
        if (b) t += (b.aplica[clave] || 0);
    }
    return t;
};

API.multBendicion = function (clave) { return 1 + API.bonusBendicion(clave) / 100; };

API.ofrecerBendiciones = function () {
    const activas = API.bendicionesActivas();
    const libres = BENDICIONES.filter(b => !activas.includes(b.id));
    if (libres.length < 3) return libres;
    const barajado = libres.slice().sort(() => Math.random() - 0.5);
    return barajado.slice(0, 3);
};

API.elegirBendicion = function (id) {
    API.bendicionesActivas().push(id);
    E.sonar('logro');
    const b = BENDICIONES.find(x => x.id === id);
    E.aviso('✦ Bendición: ' + (b ? b.nombre : id), b ? b.texto : '');
    try { closeTooltip(); } catch (e) {}
};

API.limpiarBendiciones = function () { saved.bendiciones = []; };


/* ======================================================================
   5. COMBOS ENTRE MIEMBROS DEL EQUIPO
   ======================================================================
   Si dos miembros consecutivos atacan con tipos que se complementan, se
   dispara un combo. Añade una capa de orden ENTRE Pokémon.
   ====================================================================== */

const COMBOS = [
    { a: 'fire',  b: 'grass',    nombre: 'Incendio forestal', mult: 1.4 },
    { a: 'water', b: 'electric', nombre: 'Cortocircuito',     mult: 1.4 },
    { a: 'ice',   b: 'water',    nombre: 'Congelación',       mult: 1.35 },
    { a: 'rock',  b: 'ground',   nombre: 'Avalancha',         mult: 1.35 },
    { a: 'ghost', b: 'dark',     nombre: 'Pesadilla',         mult: 1.45 },
    { a: 'fairy', b: 'psychic',  nombre: 'Encantamiento',     mult: 1.4 },
    { a: 'bug',   b: 'poison',   nombre: 'Infestación',       mult: 1.35 },
    { a: 'steel', b: 'fighting', nombre: 'Demolición',        mult: 1.4 },
];
API.COMBOS = COMBOS;

let ultimoAtaque = { slot: null, tipo: null };

/** Devuelve el multiplicador de combo y lo anuncia si salta. */
API.comprobarCombo = function (slot, tipo) {
    if (saved.sinCombos === true) return 1;
    let mult = 1;
    if (ultimoAtaque.slot && ultimoAtaque.slot !== slot) {
        const c = COMBOS.find(x => (x.a === ultimoAtaque.tipo && x.b === tipo) ||
                                   (x.b === ultimoAtaque.tipo && x.a === tipo));
        if (c) {
            mult = c.mult;
            E.numeroFlotante('¡' + c.nombre + '!', { color: '#ffd166', grande: true });
            E.sonar('critico');
        }
    }
    ultimoAtaque = { slot, tipo };
    return mult;
};


return API;

})();
