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

    // equipo de entrenador
    if (a.team) {
        for (const k in a.team) {
            if (!k.startsWith('slot') || k.endsWith('Moves')) continue;
            const e = a.team[k];
            const id = e && (e.id || e);
            if (id && pkmn[id]) enemigos.push(pkmn[id]);
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
    };
};


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

    // cuánto le pegan a él: se penaliza ser débil a los tipos del rival
    let recibido = 0, n = 0;
    for (const e of pelea.enemigos) {
        for (const t of (e.type || [])) { recibido += eficacia(t, p.type); n++; }
    }
    const vulnerabilidad = n ? recibido / n : 1;

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

/** Puntúa un objeto para un Pokémon con unos movimientos dados. */
API.puntuarObjeto = function (idItem, idPkmn, movs, pelea) {
    const it = item[idItem];
    if (!it || it.type !== 'held' || !(it.got > 0)) return 0;
    const p = pkmn[idPkmn];
    if (!p) return 0;

    const pot = potenciaObjeto(idItem);

    // impulsores de tipo: valen según qué parte del daño es de ese tipo
    for (const tipo in OBJETO_POR_TIPO) {
        if (OBJETO_POR_TIPO[tipo] !== idItem) continue;
        const conDano = movs.filter(m => move[m] && move[m].power > 0);
        const deEseTipo = conDano.filter(m => move[m].type === tipo).length;
        if (!deEseTipo) return 0;
        // fracción del daño que se beneficia × cuánto sube = % efectivo
        return (pot - 1) * (deEseTipo / Math.max(1, conDano.length)) * 100;
    }

    // Todo se puntúa en la MISMA unidad: porcentaje de daño efectivo extra.
    // Sin esa normalización, un objeto de utilidad con valor plano alto
    // ganaba siempre y el asesor repartía el mismo objeto a los seis.

    // Vidasfera: sube todo el daño
    if (idItem === 'lifeOrb') return (pot - 1) * 100;

    // Cintas de elección: solo benefician a su categoría, así que se puntúan
    // en proporción, igual que los objetos de tipo. Además impiden relevar,
    // y eso se descuenta.
    const conDanoTotal = movs.filter(m => move[m] && move[m].power > 0);
    const PENALIZACION_SIN_RELEVO = 8;
    if (idItem === 'choiceBand' || idItem === 'choiceSpecs') {
        const categoria = idItem === 'choiceBand' ? 'physical' : 'special';
        const encajan = conDanoTotal.filter(m => move[m].split === categoria).length;
        if (!encajan) return 0;
        const bruto = (pot - 1) * (encajan / Math.max(1, conDanoTotal.length)) * 100;
        return Math.max(0, bruto - PENALIZACION_SIN_RELEVO);
    }

    // Mineral Evolutivo: defensa, y solo si de verdad puede evolucionar
    if (idItem === 'eviolite') {
        let evoluciona = false;
        try { evoluciona = !!(p.evolve && p.evolve()[1] && p.evolve()[1].pkmn); } catch (e) {}
        return evoluciona ? (pot - 1) * 55 : 0;
    }

    // Utilidad y supervivencia: valen, pero menos que el daño directo.
    // Un objeto de tipo bien elegido debe poder ganarles.
    if (idItem === 'leftovers')      return 14;
    if (idItem === 'assaultVest')    return movs.every(m => move[m] && move[m].power > 0) ? (pot - 1) * 40 : 0;
    if (idItem === 'heavyDutyBoots') return (pelea.campo && pelea.campo.includes('stealthRocks')) ? 45 : 6;
    if (idItem === 'quickClaw')      return 12;
    if (idItem === 'luckyEgg')       return 5;

    // resto de equipables
    return (pot - 1) * 25;
};

/**
 * Reparte objetos entre los Pokémon indicados.
 * Respeta las copias que tienes: si solo posees uno, solo lo lleva quien
 * más lo aproveche.
 */
API.repartirObjetos = function (seleccion, pelea) {
    const usados = {};
    const candidatos = Object.keys(item).filter(k => item[k].type === 'held' && item[k].got > 0);

    // se atiende primero a quien más gana con su mejor objeto
    const propuestas = seleccion.map(s => {
        const puntuados = candidatos
            .map(k => ({ id: k, v: API.puntuarObjeto(k, s.id, s.movs, pelea) }))
            .filter(x => x.v > 0)
            .sort((a, b) => b.v - a.v);
        return { slot: s, opciones: puntuados };
    }).sort((a, b) => (b.opciones[0] ? b.opciones[0].v : 0) - (a.opciones[0] ? a.opciones[0].v : 0));

    for (const p of propuestas) {
        for (const op of p.opciones) {
            const usadas = usados[op.id] || 0;
            if (usadas >= item[op.id].got) continue;   // no hay más copias
            usados[op.id] = usadas + 1;
            p.slot.item = op.id;
            p.slot.itemValor = op.v;
            break;
        }
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
