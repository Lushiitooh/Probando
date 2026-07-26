/* =========================================================================
   Pokechill — Asesor de combate
   =========================================================================
   Recomienda equipo, movimientos (y su ORDEN) y objetos para una pelea
   concreta, usando la fórmula de daño real del juego.

   Qué lo diferencia del auto-build que ya traía el juego:
     - Aquel puntuaba con estadísticas genéricas; este simula el daño real
       contra los enemigos concretos de esa zona.
     - Aquel no tocaba los movimientos; este los elige Y los ordena para
       maximizar la Potencia Cruzada, que es la mecánica central.
     - Aquel borraba los objetos; este los asigna.
   ========================================================================= */

var Asesor = (function () {

'use strict';

const API = {};

function nom(x) { try { return format(x); } catch (e) { return String(x); } }

/** typeEffectiveness depende del área activa; aquí se necesita pura. */
const EFICAZ = 1.5, RESISTE = 0.5;
const TABLA = {
    normal:  { rock: RESISTE, ghost: 0, steel: RESISTE },
    fire:    { fire: RESISTE, water: RESISTE, grass: EFICAZ, ice: EFICAZ, bug: EFICAZ, rock: RESISTE, dragon: RESISTE, steel: EFICAZ },
    water:   { fire: EFICAZ, water: RESISTE, grass: RESISTE, ground: EFICAZ, rock: EFICAZ, dragon: RESISTE },
    electric:{ water: EFICAZ, electric: RESISTE, grass: RESISTE, ground: 0, flying: EFICAZ, dragon: RESISTE },
    grass:   { fire: RESISTE, water: EFICAZ, grass: RESISTE, poison: RESISTE, ground: EFICAZ, flying: RESISTE, bug: RESISTE, rock: EFICAZ, dragon: RESISTE, steel: RESISTE },
    ice:     { fire: RESISTE, water: RESISTE, grass: EFICAZ, ice: RESISTE, ground: EFICAZ, flying: EFICAZ, dragon: EFICAZ, steel: RESISTE },
    fighting:{ normal: EFICAZ, ice: EFICAZ, rock: EFICAZ, dark: EFICAZ, steel: EFICAZ, poison: RESISTE, flying: RESISTE, psychic: RESISTE, bug: RESISTE, fairy: RESISTE, ghost: 0 },
    poison:  { grass: EFICAZ, fairy: EFICAZ, poison: RESISTE, ground: RESISTE, rock: RESISTE, ghost: RESISTE, steel: 0 },
    ground:  { fire: EFICAZ, electric: EFICAZ, grass: RESISTE, poison: EFICAZ, flying: 0, bug: RESISTE, rock: EFICAZ, steel: EFICAZ },
    flying:  { electric: RESISTE, grass: EFICAZ, fighting: EFICAZ, bug: EFICAZ, rock: RESISTE, steel: RESISTE },
    psychic: { fighting: EFICAZ, poison: EFICAZ, psychic: RESISTE, dark: 0, steel: RESISTE },
    bug:     { fire: RESISTE, grass: EFICAZ, fighting: RESISTE, poison: RESISTE, flying: RESISTE, psychic: EFICAZ, ghost: RESISTE, dark: EFICAZ, steel: RESISTE, fairy: RESISTE },
    rock:    { fire: EFICAZ, ice: EFICAZ, fighting: RESISTE, ground: RESISTE, flying: EFICAZ, bug: EFICAZ, steel: RESISTE },
    ghost:   { normal: 0, psychic: EFICAZ, ghost: EFICAZ, dark: RESISTE },
    dragon:  { dragon: EFICAZ, steel: RESISTE, fairy: 0 },
    dark:    { fighting: RESISTE, psychic: EFICAZ, ghost: EFICAZ, dark: RESISTE, fairy: RESISTE },
    steel:   { fire: RESISTE, water: RESISTE, electric: RESISTE, ice: EFICAZ, rock: EFICAZ, steel: RESISTE, fairy: EFICAZ },
    fairy:   { fire: RESISTE, fighting: EFICAZ, poison: RESISTE, dragon: EFICAZ, dark: EFICAZ, steel: RESISTE },
};

function eficacia(atacante, defensores) {
    return defensores.reduce((m, t) => m * (TABLA[atacante] && TABLA[atacante][t] !== undefined ? TABLA[atacante][t] : 1), 1);
}
API.eficacia = eficacia;


/* ======================================================================
   1. ANALIZAR LA PELEA
   ====================================================================== */

/** Extrae los enemigos reales de un área: equipo de entrenador o spawns. */
API.analizarPelea = function (idArea) {
    const a = areas[idArea];
    if (!a) return null;

    const enemigos = [];
    // Movimientos REALES del rival. Las 138 zonas con entrenador los declaran
    // en team.slotNMoves, y el jefe además trae uno de firma en slotN.signature.
    // Antes se descartaban, y sin ellos no se puede recomendar contra nadie
    // en concreto: una baya de agua es oro contra Blastoise y basura contra Onix.
    const ataques = [];
    let movsConocidos = false;

    // equipo de entrenador
    if (a.team) {
        for (const k in a.team) {
            if (!k.startsWith('slot') || k.endsWith('Moves')) continue;
            const e = a.team[k];
            const id = e && (e.id || e);
            if (id && pkmn[id]) enemigos.push(pkmn[id]);

            // los cuatro movimientos declarados de ese hueco
            const lista = a.team[k + 'Moves'];
            if (Array.isArray(lista)) {
                for (const m of lista) {
                    const mv = move[m];
                    if (mv && mv.power > 0) {
                        ataques.push({ id: m, type: mv.type, power: mv.power, split: mv.split, timer: mv.timer || 2000 });
                        movsConocidos = true;
                    }
                }
            }
            // movimiento de firma (117 rivales tienen uno y suele ser el que mata)
            const firma = e && e.signature;
            if (firma && firma.power > 0) {
                ataques.push({ id: firma.id || 'firma', type: firma.type, power: firma.power,
                               split: firma.split, timer: firma.timer || 2000, firma: true });
                movsConocidos = true;
            }
        }
    }
    // salvajes
    if (!enemigos.length && a.spawns) {
        for (const tier in a.spawns) {
            if (!Array.isArray(a.spawns[tier])) continue;
            for (const e of a.spawns[tier]) {
                const id = e && (e.id || e);
                if (id && pkmn[id]) enemigos.push(pkmn[id]);
            }
        }
    }

    // tipos presentes y su peso
    const tipos = {};
    for (const e of enemigos) for (const t of (e.type || [])) tipos[t] = (tipos[t] || 0) + 1;

    // defensa media del bando enemigo, en estrellas
    let def = 0, sdef = 0;
    for (const e of enemigos) { def += e.bst.def; sdef += e.bst.sdef; }
    const n = Math.max(1, enemigos.length);

    // Reparto del ataque rival por tipo, ponderado por daño por segundo real.
    // Si no se conocen los movimientos (zonas salvajes), se cae de vuelta a los
    // tipos del rival, que es la mejor conjetura disponible: un Pokémon suele
    // atacar de su propio tipo.
    const ataquePorTipo = {};
    let totalDps = 0;
    if (movsConocidos) {
        for (const mv of ataques) {
            const dps = mv.power * (2000 / (mv.timer || 2000)) * (mv.firma ? 1.5 : 1);
            ataquePorTipo[mv.type] = (ataquePorTipo[mv.type] || 0) + dps;
            totalDps += dps;
        }
    } else {
        for (const t in tipos) { ataquePorTipo[t] = tipos[t]; totalDps += tipos[t]; }
    }
    for (const t in ataquePorTipo) ataquePorTipo[t] /= (totalDps || 1);

    return {
        idArea,
        nombre: a.name || nom(idArea),
        enemigos,
        tipos,
        tiposOrdenados: Object.keys(tipos).sort((x, y) => tipos[y] - tipos[x]),
        nivel: a.level || 50,
        esEntrenador: !!a.trainer,
        defMedia: def / n,
        sdefMedia: sdef / n,
        campo: a.fieldEffect || null,
        // --- perfil ofensivo del rival ---
        ataques,                  // movimientos con daño que usará
        movsConocidos,            // false => ataquePorTipo es una estimación por tipos
        ataquePorTipo,            // {tipo: fracción del daño rival, suma 1}
        fisicoRival: ataques.length
            ? ataques.filter(m => m.split === 'physical').length / ataques.length : 0.5,
    };
};


/* ======================================================================
   1b. AMENAZA REAL CONTRA UN POKÉMON CONCRETO
   ======================================================================
   Antes se estimaba el peligro con los TIPOS del rival, no con sus ataques.
   Blastoise es de agua, así que una planta parecía segura... hasta que le
   cae el Rayo Hielo. Con los movimientos declarados esto ya no pasa.
   ====================================================================== */

/** Multiplicador de daño recibido esperado, ponderado por lo que de verdad usa el rival. */
function amenazaContra(p, pelea) {
    let m = 0;
    for (const t in pelea.ataquePorTipo) m += pelea.ataquePorTipo[t] * eficacia(t, p.type);
    return m || 1;
}
API.amenazaContra = amenazaContra;


/* ======================================================================
   2. VALOR DE UN MOVIMIENTO CONTRA ESA PELEA
   ====================================================================== */

function danoMovimiento(p, idMov, pelea) {
    const mv = move[idMov];
    if (!mv || !mv.power) return 0;

    const fisico = mv.split === 'physical';
    const atkEstrellas = fisico ? p.bst.atk : p.bst.satk;
    const atkIv = (p.ivs && (fisico ? p.ivs.atk : p.ivs.satk)) || 0;
    const defRival = fisico ? pelea.defMedia : pelea.sdefMedia;

    let d = (mv.power + Math.max(0, (atkEstrellas * 30) * Math.pow(1.1, atkIv) - defRival * 30))
            * (1 + (p.level || 1) * 0.1);

    // STAB (los de tipo único llevan +0.2 en este juego)
    if (p.type.includes(mv.type)) d *= (p.type.length === 1 ? 1.7 : 1.5);

    // eficacia media contra el conjunto de enemigos, ponderada
    let ef = 0, peso = 0;
    for (const e of pelea.enemigos) { ef += eficacia(mv.type, e.type); peso++; }
    d *= peso ? ef / peso : 1;

    // los movimientos lentos rinden menos por segundo
    const timer = mv.timer || 2000;
    return d * (2000 / timer);
}
API.danoMovimiento = danoMovimiento;


/* ======================================================================
   3. ELEGIR Y ORDENAR LOS 4 MEJORES MOVIMIENTOS
   ======================================================================
   Lo importante: NO se cogen los 4 que más pegan. Se busca el conjunto
   de 4 que, ordenado, da el mejor daño medio POR CICLO incluyendo el
   bonus de Potencia Cruzada. Cuatro movimientos del mismo tipo pegan
   fuerte por separado y fatal en conjunto.
   ====================================================================== */

const BONUS_CADENA = { 2: 0, 3: 0.1, 4: 0.2 };

/** Daño medio por ciclo de una secuencia concreta, con cruce incluido. */
function valorSecuencia(p, secuencia, pelea) {
    let ultimoTipo, cadena = [], total = 0;
    // dos vueltas: la rotación es cíclica
    for (let vuelta = 0; vuelta < 2; vuelta++) {
        for (const id of secuencia) {
            const mv = move[id];
            if (!mv) continue;
            const cruza = mv.power > 0 && ultimoTipo !== undefined && ultimoTipo !== mv.type;
            if (cruza) {
                if (cadena.includes(mv.type)) cadena = [mv.type]; else cadena.push(mv.type);
                if (cadena.length > 4) cadena = cadena.slice(-4);
            } else if (mv.power > 0) cadena = [];

            if (vuelta === 1) {
                const bonus = cruza ? 1.3 + (BONUS_CADENA[cadena.length] || 0) : 1;
                total += danoMovimiento(p, id, pelea) * bonus;
            }
            if (mv.power > 0) ultimoTipo = mv.type;
        }
    }
    return total / Math.max(1, secuencia.length);
}

function permutaciones(arr) {
    if (arr.length <= 1) return [arr];
    const out = [];
    for (let i = 0; i < arr.length; i++) {
        const resto = arr.slice(0, i).concat(arr.slice(i + 1));
        for (const p of permutaciones(resto)) out.push([arr[i], ...p]);
    }
    return out;
}

function combinaciones(arr, k) {
    if (k === 0) return [[]];
    if (arr.length < k) return [];
    const [primero, ...resto] = arr;
    return combinaciones(resto, k - 1).map(c => [primero, ...c]).concat(combinaciones(resto, k));
}

API.mejoresMovimientos = function (idPkmn, pelea) {
    const p = pkmn[idPkmn];
    if (!p) return null;

    const disponibles = (p.movepool || []).filter(m => move[m]);
    if (!disponibles.length) return { movs: Object.values(p.moves).filter(Boolean), valor: 0, nota: 'sin repertorio' };

    // preselección: los 8 que más pegan individualmente
    const rankeados = disponibles
        .map(m => ({ id: m, d: danoMovimiento(p, m, pelea) }))
        .sort((a, b) => b.d - a.d);

    const conDano = rankeados.filter(r => r.d > 0).slice(0, 8).map(r => r.id);
    if (conDano.length <= 1) {
        const movs = conDano.concat(rankeados.filter(r => r.d === 0).slice(0, 3).map(r => r.id)).slice(0, 4);
        return { movs, valor: valorSecuencia(p, movs, pelea), nota: 'repertorio muy corto' };
    }

    // probar cada combinación de 4 (o menos) en su mejor orden
    const k = Math.min(4, conDano.length);
    let mejor = null, mejorValor = -1;
    for (const combo of combinaciones(conDano, k)) {
        for (const orden of permutaciones(combo)) {
            const v = valorSecuencia(p, orden, pelea);
            if (v > mejorValor) { mejorValor = v; mejor = orden; }
        }
    }

    // ¿cuánto se gana frente a coger simplemente los 4 que más pegan?
    const ingenuo = conDano.slice(0, k);
    const valorIngenuo = valorSecuencia(p, ingenuo, pelea);

    return {
        movs: mejor,
        valor: mejorValor,
        valorIngenuo,
        mejoraPct: valorIngenuo > 0 ? Math.round((mejorValor / valorIngenuo - 1) * 100) : 0,
        tipos: [...new Set(mejor.map(m => move[m].type))].length,
    };
};


/* ======================================================================
   4. PUNTUAR UN POKÉMON PARA ESA PELEA
   ====================================================================== */

API.puntuar = function (idPkmn, pelea) {
    const p = pkmn[idPkmn];
    if (!p || !p.caught) return null;

    const mejores = API.mejoresMovimientos(idPkmn, pelea);
    if (!mejores) return null;

    // Cuánto le pegan a él, según los ataques que el rival usa DE VERDAD
    // (no según los tipos del rival, que engañan: Blastoise es de agua pero
    // lleva Rayo Hielo y Trueno).
    const vulnerabilidad = amenazaContra(p, pelea);

    const aguante = (p.bst.hp * 30 * Math.pow(1.1, (p.ivs && p.ivs.hp) || 0)
                   + p.bst.def * 15 + p.bst.sdef * 15) * (1 + (p.level || 1) * 0.2);

    return {
        id: idPkmn,
        ataque: mejores.valor,
        aguante: aguante / Math.max(0.25, vulnerabilidad),
        vulnerabilidad,
        movs: mejores.movs,
        tiposDistintos: mejores.tipos || 0,
        // el ataque manda, pero morir rápido tampoco sirve
        total: mejores.valor * 0.75 + (aguante / Math.max(0.25, vulnerabilidad)) * 0.0004,
    };
};


/* ======================================================================
   5. ASIGNAR OBJETOS
   ======================================================================
   Se puntúa cada objeto equipable para ese Pokémon concreto y se reparten
   respetando cuántas copias tienes. Los objetos suben de nivel con las
   copias acumuladas, así que se consulta su potencia real.
   ====================================================================== */

const OBJETO_POR_TIPO = {
    fighting: 'blackBelt', dark: 'blackGlasses', fire: 'charcoal', dragon: 'dragonFang',
    fairy: 'fairyFeather', rock: 'hardStone', electric: 'magnet', steel: 'metalCoat',
    grass: 'miracleSeed', water: 'mysticWater', ice: 'neverMeltIce', poison: 'poisonBarb',
    flying: 'sharpBeak', normal: 'silkScarf', bug: 'silverPowder', ground: 'softSand',
    ghost: 'spellTag', psychic: 'twistedSpoon',
};

function potenciaObjeto(id) {
    try { return item[id] && typeof item[id].power === 'function' ? item[id].power() : 1; }
    catch (e) { return 1; }
}

/* ----------------------------------------------------------------------
   power() NO SIGNIFICA LO MISMO EN CADA FAMILIA.
   Este fue el fallo de raíz: había un cajón de sastre `(power-1)*25` que
   trataba todo como si fuese un multiplicador de daño. No lo es:

     charcoal      power() = 1.4  -> multiplicador de daño     -> valía 40
     passhoBerry   power() = 40   -> PORCENTAJE de reducción   -> valía 975
     firiumZ       power() = 18   -> TURNOS DE CARGA (¡coste!) -> valía 425
     fireGem       power() = 1.1  -> multiplicador + STAB      -> valía 2,5
     luckyEgg      power() = 50   -> porcentaje de experiencia -> valía 1225

   Por eso el asesor colgaba una baya a los seis: 975 gana a 40 siempre.
   Y con los cristales Z era aún peor, porque premiaba al que MÁS tarda
   en cargar. Ahora cada familia se convierte a la misma unidad honesta:
   "% de mejora esperada en el resultado de ESTA pelea".
   ---------------------------------------------------------------------- */

// Baya -> tipo del que reduce el daño. Sacado de explore.js:3933-3949,
// no del subtitle, que está traducido y cambiaría con el idioma.
const BAYA_POR_TIPO = {
    occaBerry: 'fire', passhoBerry: 'water', wacanBerry: 'electric', rindoBerry: 'grass',
    yacheBerry: 'ice', chopleBerry: 'fighting', kebiaBerry: 'poison', shucaBerry: 'ground',
    cobaBerry: 'flying', payapaBerry: 'psychic', tangaBerry: 'bug', chartiBerry: 'rock',
    kasibBerry: 'ghost', habanBerry: 'dragon', colburBerry: 'dark', babiriBerry: 'steel',
    roseliBerry: 'fairy',
};

/** Cuánto pega cada movimiento, para repartir el mérito por daño y no por conteo. */
function pesosDeDano(p, movs, pelea) {
    const pesos = movs.map(m => (move[m] && move[m].power > 0) ? danoMovimiento(p, m, pelea) : 0);
    const total = pesos.reduce((a, b) => a + b, 0);
    return { pesos, total };
}

/** Fracción del daño total que aportan los movimientos que cumplen `filtro`. */
function fraccionDano(p, movs, pelea, filtro) {
    const { pesos, total } = pesosDeDano(p, movs, pelea);
    if (!total) return 0;
    let parte = 0;
    movs.forEach((m, i) => { if (move[m] && filtro(move[m])) parte += pesos[i]; });
    return parte / total;
}

/**
 * Cuánto conviene defenderse en esta pelea, de 0 a 1.
 * En un juego idle lo que manda es matar rápido, pero si el rival te tumba
 * pierdes mucho más. Se mide el riesgo real: cuánto pega el rival comparado
 * con lo que aguanta este Pokémon.
 */
function pesoDefensivo(p, pelea) {
    const aguante = (p.bst.hp * 30 * Math.pow(1.1, (p.ivs && p.ivs.hp) || 0)
                   + p.bst.def * 15 + p.bst.sdef * 15) * (1 + (p.level || 1) * 0.2);
    const golpe = (pelea.nivel || 50) * 30 * amenazaContra(p, pelea);
    const riesgo = golpe / Math.max(1, aguante);          // >1 = te hacen polvo
    return Math.max(0.15, Math.min(1, riesgo));
}

/** Puntúa un objeto para un Pokémon con unos movimientos dados. */
API.puntuarObjeto = function (idItem, idPkmn, movs, pelea) {
    const it = item[idItem];
    if (!it || !(it.got > 0)) return 0;
    const p = pkmn[idPkmn];
    if (!p || !movs || !movs.length) return 0;

    // Las megapiedras son equipables pero su type NO es 'held', así que un
    // filtro ingenuo las dejaba fuera del asesor por completo (53 objetos).
    const esMega = typeof it.heldBonusPkmn === 'function';
    if (it.type !== 'held' && !esMega) return 0;

    const pot     = potenciaObjeto(idItem);
    const conDano = movs.filter(m => move[m] && move[m].power > 0);
    const def     = pesoDefensivo(p, pelea);

    /* --- 0. MEGAPIEDRA (explore.js:2852) ---------------------------------
       Multiplicador incondicional, pero solo si el portador es exactamente
       esa megaevolución. Para cualquier otro no hace absolutamente nada. */
    if (esMega) {
        let destinatario = null;
        try { destinatario = it.heldBonusPkmn(); } catch (e) {}
        const idDest = destinatario && (destinatario.id || destinatario);
        if (!idDest || idDest !== idPkmn) return 0;
        let mult = 1;
        try { mult = it.heldBonusPower ? it.heldBonusPower() : 1; } catch (e) {}
        return (mult - 1) * 100;
    }

    /* --- 1. IMPULSOR DE TIPO (explore.js:2809) ---------------------------
       totalPower *= power() solo si el movimiento es de ese tipo.        */
    for (const tipo in OBJETO_POR_TIPO) {
        if (OBJETO_POR_TIPO[tipo] !== idItem) continue;
        const frac = fraccionDano(p, movs, pelea, mv => mv.type === tipo);
        return frac > 0 ? (pot - 1) * frac * 100 : 0;
    }

    /* --- 2. GEMA DE TIPO (explore.js:2745 y 2846) ------------------------
       Doble efecto: power() a TODO el daño sin condición, y además STAB
       prestado (x1.5, o x1.7 si es de un solo tipo) a los movimientos de
       su tipo cuando el Pokémon no lo tiene ya. Lo segundo es lo gordo y
       antes valía 2,5 puntos.                                            */
    if (/Gem$/.test(idItem) && !it.zType) {
        const tipoGema = idItem.replace(/Gem$/, '');
        let v = (pot - 1) * 100;
        if (!p.type.includes(tipoGema)) {
            const stab = p.type.length === 1 ? 1.7 : 1.5;
            v += (stab - 1) * fraccionDano(p, movs, pelea, mv => mv.type === tipoGema) * 100;
        }
        return v;
    }

    /* --- 3. CRISTAL Z (explore.js:2956-3051) -----------------------------
       power() son TURNOS DE CARGA y va A LA BAJA: 18 con una copia, 10 con
       muchas. Menor es mejor, justo al revés que todo lo demás. Al dispararse
       lanza un golpe de potencia base 30 multiplicada por 8 (explore.js:3022).
       Funciona desde cualquier ranura, pero solo se admite uno por equipo. */
    if (it.zType) {
        const turnos = Math.max(1, pot);
        const datos  = pesosDeDano(p, movs, pelea);
        const medio  = datos.total / Math.max(1, conDano.length);
        if (!medio) return 0;
        const fisico = p.bst.atk >= p.bst.satk;
        const atk    = fisico ? p.bst.atk : p.bst.satk;
        const iv     = (p.ivs && (fisico ? p.ivs.atk : p.ivs.satk)) || 0;
        const defR   = fisico ? pelea.defMedia : pelea.sdefMedia;
        let dz = (30 + Math.max(0, atk * 30 * Math.pow(1.1, iv) - defR * 30))
                 * (1 + (p.level || 1) * 0.1) * 8;
        if (p.type.includes(it.zType)) dz *= 1.5;
        let ef = 0;
        for (const e of pelea.enemigos) ef += eficacia(it.zType, e.type);
        dz *= pelea.enemigos.length ? ef / pelea.enemigos.length : 1;
        // el golpe extra se reparte entre los turnos que cuesta cargarlo
        return Math.max(0, dz / turnos / medio * 100);
    }

    /* --- 4. BAYA DE RESISTENCIA (explore.js:3933) ------------------------
       totalPower /= (power()/100 + 1). Con power 40 son -28,6%, y SOLO si
       el ataque entrante es de ese tipo Y supereficaz. Aquí es donde el
       asesor mira al rival de verdad: una Baya Pasio es oro contra
       Blastoise y no vale nada contra un Onix.                           */
    if (BAYA_POR_TIPO[idItem]) {
        const tipo  = BAYA_POR_TIPO[idItem];
        const cuota = pelea.ataquePorTipo[tipo] || 0;
        if (!cuota) return 0;
        if (eficacia(tipo, p.type) <= 1) return 0;
        const reduccion = 1 - 1 / (pot / 100 + 1);
        return cuota * reduccion * 100 * def * (pelea.movsConocidos ? 1 : 0.5);
    }

    /* --- 5. MULTIPLICADORES DE DAÑO ------------------------------------- */

    // Vidasfera: +power() a todo, pero cuesta vida máxima/12 por golpe
    // (explore.js:3204). Sin descontar el retroceso ganaba a cualquier cosa
    // y se la llevaban los seis. Duele en proporción al peligro que corres.
    if (idItem === 'lifeOrb') {
        const RETROCESO = 100 / 12;
        return (pot - 1) * 100 - RETROCESO * 4.5 * def;
    }

    // Arcilla Luz y Malicia: pese a sonar defensivos, el código los usa como
    // multiplicador INCONDICIONAL del daño (explore.js:2828-2829).
    if (idItem === 'lightClay' || idItem === 'weaknessPolicy') return (pot - 1) * 100;

    // Botones de expulsión: multiplican siempre, pero fuerzan relevo tras
    // cada movimiento (explore.js:3285), y eso rompe la cadena de Potencia
    // Cruzada, que es el motor de daño de este juego.
    if (idItem === 'ejectButton' || idItem === 'ejectPack')
        return Math.max(0, (pot - 1) * 100 - 30);

    // Orbes de estado: multiplican, pero se autoinfligen quemadura o veneno,
    // y la quemadura divide el daño físico por 1.5 (explore.js:2699). A nivel
    // bajo el balance es NEGATIVO: 1.15/1.5 = x0.77.
    if (idItem === 'flameOrb' || idItem === 'toxicOrb') {
        const fracFisica = fraccionDano(p, movs, pelea, mv => mv.split === 'physical');
        return (pot / (1 + 0.5 * fracFisica) - 1) * 100;
    }

    // Cintas de elección: solo su categoría, y bloquean el relevo.
    if (idItem === 'choiceBand' || idItem === 'choiceSpecs') {
        const categoria = idItem === 'choiceBand' ? 'physical' : 'special';
        const frac = fraccionDano(p, movs, pelea, mv => mv.split === categoria);
        if (!frac) return 0;
        return Math.max(0, (pot - 1) * frac * 100 - 8);
    }

    /* --- 6. VELOCIDAD DE ATAQUE (divisores del temporizador) -------------
       moveTimer /= power() equivale a multiplicar el DPS por power().    */
    if (idItem === 'quickClaw') {
        const frac = fraccionDano(p, movs, pelea,
                                  m => m.affectedBy && m.affectedBy.includes('libero'));
        return frac > 0 ? (pot - 1) * frac * 100 : 0;
    }
    if (idItem === 'powerHerb') {
        // solo acelera movimientos de estado (potencia 0), que no hacen daño
        const deEstado = movs.filter(m => move[m] && move[m].power === 0).length;
        return deEstado ? (pot - 1) * (deEstado / movs.length) * 40 : 0;
    }

    /* --- 7. MULTIPLICADORES POR ETIQUETA DEL MOVIMIENTO ------------------
       Dependen de move.affectedBy, no de la habilidad del Pokémon.       */
    const POR_ETIQUETA = {
        loadedDice:  m => m.affectedBy && m.affectedBy.includes('skillLink'),
        luckyPunch:  m => m.affectedBy && m.affectedBy.includes('ironFist'),
        laggingTail: m => m.affectedBy && m.affectedBy.includes('reckless'),
        metronome:   m => m.buildup !== undefined,
    };
    if (POR_ETIQUETA[idItem]) {
        const frac = fraccionDano(p, movs, pelea, POR_ETIQUETA[idItem]);
        return frac > 0 ? (pot - 1) * frac * 100 : 0;
    }

    /* --- 8. DIVISORES DEL DAÑO RECIBIDO (explore.js:3951-3957) -----------
       totalPower /= power(): un power de 1.4 son -28,6% de daño recibido,
       no -40%. Se escalan por el riesgo real de esta pelea.              */
    if (idItem === 'eviolite') {
        let vale = false;
        try {
            const evo = p.evolve && p.evolve()[1] && p.evolve()[1].pkmn;
            const idEvo = evo && (evo.id || evo);
            vale = !!idEvo && (String(idEvo).slice(0, 4) !== 'mega' || idPkmn === 'bayleef');
        } catch (e) {}
        return vale ? (1 - 1 / Math.max(1, pot)) * 100 * def : 0;
    }
    if (idItem === 'assaultVest') {
        // convierte los movimientos de estado en Splash: solo si todo pega
        if (conDano.length !== movs.length) return 0;
        return (1 - 1 / Math.max(1, pot)) * 100 * def;
    }
    if (idItem === 'mentalHerb' || idItem === 'heavyDutyBoots')
        return (1 - 1 / Math.max(1, pot)) * 100 * def;

    /* --- 9. UTILIDAD FUERA DE COMBATE ------------------------------------
       No ayudan a GANAR esta pelea, que es lo que se pide. Además la
       experiencia vale 0 en zonas de entrenador (explore.js:1603).       */
    if (idItem === 'luckyEgg') return pelea.esEntrenador ? 0 : 3;
    if (idItem === 'shinyCharm' || idItem === 'luckIncense' || idItem === 'pureIncense') return 0;

    /* --- 10. LO QUE NO ENTENDEMOS NO SE RECOMIENDA -----------------------
       Sin cajón de sastre. Antes había un `(power-1)*25` que trataba
       cualquier unidad como si fuese un multiplicador de daño, y por eso
       una baya (power 40) puntuaba 975 y se la llevaban los seis. Si un
       objeto no está clasificado arriba no sabemos qué mide su power(),
       así que vale un valor simbólico: lo lleva quien no tenga nada mejor
       y jamás puede ganarle a un efecto que sí conocemos.                */
    return 0.5;
};

/**
 * Reparte objetos entre los Pokémon indicados.
 * Respeta las copias que tienes: si solo posees uno, solo lo lleva quien
 * más lo aproveche.
 */
API.repartirObjetos = function (seleccion, pelea) {
    const usados = {};
    // Se incluyen las megapiedras, que son equipables aunque su type no sea
    // 'held' (explore.js:2852). El filtro antiguo dejaba fuera 53 objetos.
    const candidatos = Object.keys(item).filter(k =>
        item[k].got > 0 && (item[k].type === 'held' || typeof item[k].heldBonusPkmn === 'function'));

    // El juego solo admite UN cristal Z por equipo (teams.js:365-381): si se
    // reparten dos, la pantalla de equipo da error al guardar.
    let zUsado = false;

    // tabla de puntuaciones: cada Pokémon contra cada objeto disponible
    const pendientes = seleccion.map(s => ({
        slot: s,
        opciones: candidatos
            .map(k => ({ id: k, v: API.puntuarObjeto(k, s.id, s.movs, pelea) }))
            .filter(x => x.v > 0)
            .sort((a, b) => b.v - a.v),
    }));

    // Reparto por ARREPENTIMIENTO: en cada vuelta se atiende a quien más
    // perdería si no se lleva su mejor objeto, no a quien más gana. Con
    // copias limitadas eso importa: si dos quieren la única Vidasfera, se
    // la queda aquel cuya segunda opción es peor.
    const libre = op => (usados[op.id] || 0) < item[op.id].got
                     && !(zUsado && item[op.id].zType);

    while (pendientes.length) {
        let elegido = null, mejorArrepentimiento = -Infinity;

        for (const p of pendientes) {
            const disponibles = p.opciones.filter(libre);
            if (!disponibles.length) { p.vacio = true; continue; }
            const mejor = disponibles[0].v;
            const segundo = disponibles[1] ? disponibles[1].v : 0;
            const arrepentimiento = mejor - segundo;
            if (arrepentimiento > mejorArrepentimiento) {
                mejorArrepentimiento = arrepentimiento;
                elegido = { p, op: disponibles[0] };
            }
        }

        // los que ya no tienen ninguna opción libre salen de la lista
        for (let i = pendientes.length - 1; i >= 0; i--) if (pendientes[i].vacio) pendientes.splice(i, 1);
        if (!elegido) break;

        usados[elegido.op.id] = (usados[elegido.op.id] || 0) + 1;
        if (item[elegido.op.id].zType) zUsado = true;
        elegido.p.slot.item = elegido.op.id;
        elegido.p.slot.itemValor = elegido.op.v;
        pendientes.splice(pendientes.indexOf(elegido.p), 1);
    }
    return seleccion;
};


/* ======================================================================
   6. RECOMENDACIÓN COMPLETA
   ====================================================================== */

API.recomendar = function (idArea) {
    const pelea = API.analizarPelea(idArea || saved.currentAreaBuffer || saved.currentArea);
    if (!pelea) return null;
    if (!pelea.enemigos.length) return { pelea, equipo: [], aviso: 'No se pudo leer el bando rival de esta zona.' };

    // puntuar todo lo capturado
    const puntuados = [];
    for (const k in pkmn) {
        if (!pkmn[k].caught) continue;
        if (saved.gamemodNuzlocke === true && pkmn[k].nuzlocked === true) continue;
        const s = API.puntuar(k, pelea);
        if (s) puntuados.push(s);
    }
    puntuados.sort((a, b) => b.total - a.total);

    // elegir 6 favoreciendo variedad de tipos: un equipo monotipo se hunde
    // en cuanto aparece algo que lo resiste
    const equipo = [];
    const tiposUsados = {};
    for (const c of puntuados) {
        if (equipo.length >= 6) break;
        const tipos = pkmn[c.id].type;
        const repetido = tipos.every(t => (tiposUsados[t] || 0) >= 2);
        if (repetido && equipo.length < 5) continue;    // el sexto entra igual
        equipo.push(c);
        for (const t of tipos) tiposUsados[t] = (tiposUsados[t] || 0) + 1;
    }
    // si la variedad dejó huecos, rellenar con los mejores que queden
    for (const c of puntuados) {
        if (equipo.length >= 6) break;
        if (!equipo.some(e => e.id === c.id)) equipo.push(c);
    }

    API.repartirObjetos(equipo, pelea);

    return {
        pelea,
        equipo,
        resumenTipos: pelea.tiposOrdenados.slice(0, 4),
    };
};


/* ======================================================================
   7. APLICAR
   ====================================================================== */

API.aplicar = function (rec) {
    if (!rec || !rec.equipo || !rec.equipo.length) return false;

    const destino = saved.previewTeams[saved.currentPreviewTeam];
    const slots = ['slot1', 'slot2', 'slot3', 'slot4', 'slot5', 'slot6'];

    for (let i = 0; i < slots.length; i++) {
        const s = slots[i], c = rec.equipo[i];
        if (!c) { destino[s].pkmn = undefined; destino[s].item = undefined; continue; }

        destino[s].pkmn = c.id;
        destino[s].item = c.item || undefined;

        // equipar los movimientos EN EL ORDEN calculado: el orden es
        // justamente lo que activa la Potencia Cruzada
        const p = pkmn[c.id];
        p.moves.slot1 = c.movs[0] || null;
        p.moves.slot2 = c.movs[1] || null;
        p.moves.slot3 = c.movs[2] || null;
        p.moves.slot4 = c.movs[3] || null;
    }

    if (typeof updatePreviewTeam === 'function') updatePreviewTeam();
    if (typeof Extras !== 'undefined') Extras.sonar('logro');
    return true;
};


/* ======================================================================
   8. SOLO OBJETOS, SOBRE EL EQUIPO ACTUAL
   ====================================================================== */

API.equiparObjetosDelEquipo = function () {
    const pelea = API.analizarPelea(saved.currentAreaBuffer || saved.currentArea)
               || { enemigos: [], defMedia: 3, sdefMedia: 3, campo: null };

    const destino = saved.previewTeams[saved.currentPreviewTeam];
    const seleccion = [];
    for (const s of ['slot1','slot2','slot3','slot4','slot5','slot6']) {
        const id = destino[s].pkmn;
        if (!id || !pkmn[id]) continue;
        seleccion.push({ id, movs: Object.values(pkmn[id].moves).filter(Boolean), slotKey: s });
    }
    if (!seleccion.length) return { cambiados: 0, aviso: 'No hay equipo montado.' };

    API.repartirObjetos(seleccion, pelea);

    let cambiados = 0;
    for (const s of seleccion) {
        if (s.item && destino[s.slotKey].item !== s.item) cambiados++;
        destino[s.slotKey].item = s.item || undefined;
    }
    if (typeof updatePreviewTeam === 'function') updatePreviewTeam();
    if (typeof Extras !== 'undefined') Extras.sonar('objeto');
    return { cambiados, total: seleccion.length, seleccion };
};


return API;

})();
