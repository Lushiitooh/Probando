/* =========================================================================
   Pokechill — Colección, economía y utilidades
   =========================================================================
   Ideas 14, 18, 19, 21, 22, 24, 25, 26, 27, 28, 29, 34, 35, 39, 40, 42,
   43, 45, 46, 50, 51, 53 de IDEAS.md.
   ========================================================================= */

var Coleccion = (function () {

'use strict';

const API = {};
const E = Extras;

const fmt = x => (typeof format === 'function' ? format(x) : x);


/* ======================================================================
   22. MOTES CON EFECTO
   ======================================================================
   Ponerle mote a un Pokémon le da un pequeño bonus permanente. Empuja a
   encariñarse con ejemplares concretos en vez de tratarlos como números.
   ====================================================================== */

API.BONUS_MOTE = 3;   // porcentaje de daño

API.tieneMote = function (id) {
    const n = pkmn[id] && pkmn[id].nickname;
    return typeof n === 'string' && n.trim().length > 0;
};

API.multMote = function (id) {
    return API.tieneMote(id) ? 1 + API.BONUS_MOTE / 100 : 1;
};


/* ======================================================================
   21. CINTAS POR GESTAS
   ====================================================================== */

const CINTAS_NUEVAS = {
    impecable:  { name: 'Cinta Impecable',  description: 'Ganó un combate sin recibir un solo golpe' },
    torre50:    { name: 'Cinta de la Torre', description: 'Alcanzó la planta 50 de la Torre Espiral' },
    centenario: { name: 'Cinta Centenaria', description: 'Llegó al nivel 100' },
    variocolor: { name: 'Cinta Iridiscente', description: 'Apareció con su forma variocolor' },
    veterano:   { name: 'Cinta Veterana',   description: 'Participó en 500 combates' },
    genetico:   { name: 'Cinta Genética',   description: 'Nació de una operación genética' },
};

API.registrarCintasNuevas = function () {
    if (typeof ribbon === 'undefined') return;
    for (const id in CINTAS_NUEVAS) if (!ribbon[id]) ribbon[id] = CINTAS_NUEVAS[id];
};

API.darCinta = function (idPkmn, idCinta) {
    const p = pkmn[idPkmn];
    if (!p) return false;
    if (!p.ribbons) p.ribbons = [];
    if (p.ribbons.includes(idCinta)) return false;
    p.ribbons.push(idCinta);
    E.sonar('logro');
    const c = CINTAS_NUEVAS[idCinta];
    E.aviso('🎀 ' + (c ? c.name : idCinta), fmt(idPkmn) + (c ? ' · ' + c.description : ''));
    return true;
};

/** Comprueba las cintas automáticas del equipo activo. */
API.revisarCintas = function () {
    for (const s in team) {
        if (!team[s].pkmn) continue;
        const id = team[s].pkmn.id, p = pkmn[id];
        if (p.level >= 100) API.darCinta(id, 'centenario');
        if (p.shiny)        API.darCinta(id, 'variocolor');
    }
    if ((saved.maxSpiralFloor || 0) >= 50) {
        for (const s in team) if (team[s].pkmn) API.darCinta(team[s].pkmn.id, 'torre50');
    }
};


/* ======================================================================
   18. POKÉDEX VIVIENTE
   ====================================================================== */

API.pokedexViviente = function () {
    let registradas = 0, poseidas = 0, variocolor = 0, faltan = [];
    for (const k in pkmn) {
        if (pkmn[k].hidden) continue;
        if (pkmn[k].caught > 0) { registradas++; poseidas++; if (pkmn[k].shiny) variocolor++; }
        else if (faltan.length < 40) faltan.push(k);
    }
    const total = Object.keys(pkmn).filter(k => !pkmn[k].hidden).length;
    return { total, registradas, poseidas, variocolor, faltan,
             porcentaje: total ? (registradas / total * 100).toFixed(1) : '0' };
};


/* ======================================================================
   19. GALERÍA — los mejores ejemplares
   ====================================================================== */

API.galeria = function () {
    const todos = [];
    for (const k in pkmn) {
        const p = pkmn[k];
        if (!p.caught) continue;
        const ivs = p.ivs ? Object.values(p.ivs).reduce((a, b) => a + b, 0) : 0;
        todos.push({ id: k, nivel: p.level || 1, ivs, shiny: !!p.shiny,
                     cintas: (p.ribbons || []).length, mote: p.nickname || null });
    }
    return {
        variocolores: todos.filter(p => p.shiny).slice(0, 24),
        mejoresIvs:   todos.slice().sort((a, b) => b.ivs - a.ivs).slice(0, 12),
        masCintas:    todos.filter(p => p.cintas > 0).sort((a, b) => b.cintas - a.cintas).slice(0, 12),
        conMote:      todos.filter(p => p.mote).slice(0, 12),
        total: todos.length,
    };
};


/* ======================================================================
   24. CRAFTEO CON DUPLICADOS  ·  28. RECICLAJE
   ======================================================================
   Los objetos suben de nivel hasta 20 copias; a partir de ahí el excedente
   no vale para nada. Aquí se le da salida.
   ====================================================================== */

API.EXCEDENTE_MINIMO = 25;   // a partir de aquí se puede reciclar
API.RECICLA_POR = 5;         // 5 copias sobrantes -> 1 chapa

API.reciclables = function () {
    const out = [];
    for (const k in item) {
        const sobra = (item[k].got || 0) - API.EXCEDENTE_MINIMO;
        if (sobra >= API.RECICLA_POR) out.push({ id: k, sobra, chapas: Math.floor(sobra / API.RECICLA_POR) });
    }
    return out.sort((a, b) => b.chapas - a.chapas);
};

API.reciclar = function (id) {
    const r = API.reciclables().find(x => x.id === id);
    if (!r) { E.aviso('Nada que reciclar', 'Necesitas más de ' + API.EXCEDENTE_MINIMO + ' copias'); return false; }
    item[id].got -= r.chapas * API.RECICLA_POR;
    item.bottleCap.got += r.chapas;
    E.sonar('objeto');
    E.aviso('♻ Reciclado', fmt(id) + ' · +' + r.chapas + ' Chapas Plateadas');
    return true;
};

API.reciclarTodo = function () {
    const lista = API.reciclables();
    if (!lista.length) { E.aviso('No hay excedente que reciclar'); return; }
    let chapas = 0;
    for (const r of lista) { item[r.id].got -= r.chapas * API.RECICLA_POR; chapas += r.chapas; }
    item.bottleCap.got += chapas;
    E.sonar('objeto');
    E.aviso('♻ Reciclaje masivo', lista.length + ' objetos · +' + chapas + ' Chapas Plateadas');
};


/* ======================================================================
   25. CONJUNTOS DE OBJETOS
   ====================================================================== */

const CONJUNTOS = [
    { id: 'elemental', nombre: 'Arsenal elemental',
      piezas: ['charcoal', 'mysticWater', 'miracleSeed', 'magnet'],
      minimo: 2, texto: '+10% de daño por cada pieza equipada', porPieza: { danoPct: 10 } },
    { id: 'veloz', nombre: 'Equipo ligero',
      piezas: ['quickClaw', 'choiceScarf', 'powerHerb'],
      minimo: 2, texto: '+8% de velocidad por pieza', porPieza: { velocidadPct: 8 } },
    { id: 'resistente', nombre: 'Guardia pesada',
      piezas: ['leftovers', 'eviolite', 'assaultVest', 'heavyDutyBoots'],
      minimo: 2, texto: '+12% de PS por pieza', porPieza: { psPct: 12 } },
    { id: 'fortuna', nombre: 'Amuletos de fortuna',
      piezas: ['luckIncense', 'shinyCharm', 'luckyEgg'],
      minimo: 2, texto: '+15% de objetos por pieza', porPieza: { dropPct: 15 } },
];
API.CONJUNTOS = CONJUNTOS;

API.conjuntosActivos = function () {
    const equipados = [];
    for (const s in team) if (team[s].item) equipados.push(team[s].item);
    const out = [];
    for (const c of CONJUNTOS) {
        const n = c.piezas.filter(p => equipados.includes(p)).length;
        if (n >= c.minimo) out.push({ conjunto: c, piezas: n });
    }
    return out;
};

API.bonusConjunto = function (clave) {
    let t = 0;
    for (const a of API.conjuntosActivos()) t += (a.conjunto.porPieza[clave] || 0) * a.piezas;
    return t;
};

API.multConjunto = function (clave) { return 1 + API.bonusConjunto(clave) / 100; };


/* ======================================================================
   26. MERCADO CON PRECIOS VARIABLES
   ====================================================================== */

API.factorMercado = function (idItem) {
    if (saved.mercadoVariable !== true) return 1;
    const dia = Math.floor(Date.now() / 86400000);
    let h = 0;
    const clave = idItem + dia;
    for (let i = 0; i < clave.length; i++) h = (h * 31 + clave.charCodeAt(i)) >>> 0;
    // entre 0.75 y 1.30
    return +(0.75 + (h % 56) / 100).toFixed(2);
};

API.ofertasDelDia = function () {
    const out = [];
    for (const k in item) {
        if (item[k].type !== 'held') continue;
        const f = API.factorMercado(k);
        if (f <= 0.85) out.push({ id: k, factor: f });
    }
    return out.slice(0, 8);
};


/* ======================================================================
   27. RUTA DE MEJORA VISIBLE
   ====================================================================== */

API.progresoObjeto = function (id) {
    const got = (item[id] && item[id].got) || 0;
    const escalones = [0, 5, 10, 15, 20];
    let nivel = 1;
    for (let i = escalones.length - 1; i >= 0; i--) if (got >= escalones[i]) { nivel = i + 1; break; }
    if (nivel >= 5) return { nivel: 5, got, faltan: 0, siguiente: null, pct: 100 };
    const siguiente = escalones[nivel];
    const anterior = escalones[nivel - 1];
    return { nivel, got, faltan: siguiente - got, siguiente,
             pct: Math.round((got - anterior) / (siguiente - anterior) * 100) };
};


/* ======================================================================
   29. BANCO CON BÚSQUEDA  ·  42. BÚSQUEDA GLOBAL
   ====================================================================== */

API.buscar = function (texto) {
    const q = String(texto || '').trim().toLowerCase();
    if (q.length < 2) return { pkmn: [], move: [], item: [], areas: [] };

    const casa = (id) => {
        const n = fmt(id).toLowerCase();
        return n.includes(q) || id.toLowerCase().includes(q);
    };
    const limitar = (dic, filtro) => Object.keys(dic).filter(k => casa(k) && (!filtro || filtro(k))).slice(0, 15);

    return {
        pkmn:  limitar(pkmn),
        move:  limitar(move),
        item:  limitar(item),
        areas: limitar(areas),
    };
};


/* ======================================================================
   43. COMPARADOR DE POKÉMON
   ====================================================================== */

API.comparar = function (a, b) {
    const pa = pkmn[a], pb = pkmn[b];
    if (!pa || !pb) return null;
    const stats = ['hp', 'atk', 'def', 'satk', 'sdef', 'spe'];
    return {
        a: { id: a, nombre: fmt(a), nivel: pa.level, tipos: pa.type, shiny: !!pa.shiny },
        b: { id: b, nombre: fmt(b), nivel: pb.level, tipos: pb.type, shiny: !!pb.shiny },
        filas: stats.map(s => ({
            stat: s,
            a: pa.bst[s], b: pb.bst[s],
            aIv: pa.ivs ? pa.ivs[s] : 0, bIv: pb.ivs ? pb.ivs[s] : 0,
            gana: pa.bst[s] === pb.bst[s] ? '=' : (pa.bst[s] > pb.bst[s] ? 'a' : 'b'),
        })),
    };
};


/* ======================================================================
   40. EQUIPOS POR ÁREA
   ====================================================================== */

API.recordarEquipo = function (idArea) {
    if (!idArea) return;
    if (!saved.equipoPorArea) saved.equipoPorArea = {};
    saved.equipoPorArea[idArea] = saved.currentPreviewTeam;
};

API.equipoDe = function (idArea) {
    return saved.equipoPorArea ? saved.equipoPorArea[idArea] : undefined;
};


/* ======================================================================
   45. VARIAS RANURAS DE PARTIDA
   ======================================================================
   El juego guarda en una única clave. Aquí se pueden tener partidas
   paralelas: probar un Nuzlocke sin sacrificar la principal.
   ====================================================================== */

const RANURAS = 3;
API.RANURAS = RANURAS;

API.ranuraActual = function () { return Number(localStorage.getItem('ranuraActiva') || 0); };

API.infoRanuras = function () {
    const out = [];
    for (let i = 0; i < RANURAS; i++) {
        const clave = i === 0 ? 'gameData' : 'gameData_' + i;
        const d = localStorage.getItem(clave);
        let especies = 0;
        if (d) { try { const o = JSON.parse(d); especies = Object.keys(o).filter(k => o[k] && o[k].caught > 0).length; } catch (e) {} }
        out.push({ indice: i, existe: !!d, especies, activa: i === API.ranuraActual(),
                   tamaño: d ? (d.length / 1024).toFixed(0) + ' KB' : '—' });
    }
    return out;
};

API.cambiarRanura = function (i) {
    if (i === API.ranuraActual()) return;
    if (typeof saveGame === 'function') saveGame();
    // guardar la actual en su hueco
    const actual = API.ranuraActual();
    const datos = localStorage.getItem('gameData');
    if (datos && actual !== 0) localStorage.setItem('gameData_' + actual, datos);

    // cargar la nueva
    const nueva = i === 0 ? localStorage.getItem('gameData_0_backup') : localStorage.getItem('gameData_' + i);
    if (i === 0) { const g = localStorage.getItem('gameData_0'); if (g) localStorage.setItem('gameData', g); }
    else if (nueva) localStorage.setItem('gameData', nueva);
    else localStorage.removeItem('gameData');

    localStorage.setItem('ranuraActiva', String(i));
    location.reload();
};


/* ======================================================================
   51. GRÁFICAS DE PROGRESO
   ======================================================================
   Se guarda una muestra al día de los indicadores clave.
   ====================================================================== */

API.registrarMuestra = function () {
    if (!saved.historial) saved.historial = [];
    const d = new Date();
    const hoy = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    const ultima = saved.historial[saved.historial.length - 1];
    if (ultima && ultima.dia === hoy) return;

    let especies = 0, nivelTotal = 0, n = 0;
    for (const k in pkmn) if (pkmn[k].caught > 0) { especies++; nivelTotal += pkmn[k].level || 1; n++; }

    saved.historial.push({
        dia: hoy, especies,
        nivelMedio: n ? Math.round(nivelTotal / n) : 0,
        combates: E.stats().combatesGanados,
        dano: Math.round(E.stats().danoTotal),
    });
    if (saved.historial.length > 90) saved.historial = saved.historial.slice(-90);
};

/** Genera un SVG de línea sencillo, sin librerías. */
API.grafica = function (campo, etiqueta) {
    const h = saved.historial || [];
    if (h.length < 2) return '<p>Aún no hay suficientes datos. Vuelve mañana.</p>';

    const vals = h.map(x => x[campo] || 0);
    const max = Math.max(...vals, 1), min = Math.min(...vals);
    const W = 560, H = 140, pad = 8;
    const puntos = vals.map((v, i) => {
        const x = pad + i * (W - pad * 2) / Math.max(1, vals.length - 1);
        const y = H - pad - (v - min) / Math.max(1, max - min) * (H - pad * 2);
        return x.toFixed(1) + ',' + y.toFixed(1);
    }).join(' ');

    return '<div class="grafica-extra"><strong>' + etiqueta + '</strong>' +
      '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Evolución de ' + etiqueta + '">' +
      '<polyline points="' + puntos + '" fill="none" stroke="#82df60" stroke-width="2"/>' +
      '</svg><small>' + h[0].dia + ' → ' + h[h.length - 1].dia +
      ' · máx ' + E.formatearNumero(max) + '</small></div>';
};


/* ======================================================================
   53. TEMAS DEL JUGADOR
   ====================================================================== */

const VARIABLES_TEMA = ['--main-color', '--secondary-color', '--text-color', '--background-color'];
API.VARIABLES_TEMA = VARIABLES_TEMA;

API.temaPropio = function () {
    if (!saved.temaPropio) saved.temaPropio = {};
    return saved.temaPropio;
};

API.aplicarTemaPropio = function () {
    const t = API.temaPropio();
    for (const v of VARIABLES_TEMA) {
        if (t[v]) document.documentElement.style.setProperty(v, t[v]);
        else document.documentElement.style.removeProperty(v);
    }
};

API.fijarColor = function (variable, color) {
    API.temaPropio()[variable] = color;
    API.aplicarTemaPropio();
};

API.limpiarTemaPropio = function () {
    saved.temaPropio = {};
    API.aplicarTemaPropio();
};


/* ======================================================================
   50. REPETICIÓN DE COMBATES
   ====================================================================== */

API.codigoRepeticion = function () {
    const equipo = [];
    for (const s in team) if (team[s].pkmn) {
        const p = pkmn[team[s].pkmn.id];
        equipo.push({ p: p.id, l: p.level, m: Object.values(p.moves).filter(Boolean), i: team[s].item || null });
    }
    const datos = { v: 1, a: saved.currentArea, e: equipo, s: Date.now() };
    try { return btoa(unescape(encodeURIComponent(JSON.stringify(datos)))); }
    catch (e) { return null; }
};

API.leerRepeticion = function (codigo) {
    try { return JSON.parse(decodeURIComponent(escape(atob(codigo.trim())))); }
    catch (e) { return null; }
};


/* ======================================================================
   34. INCURSIONES COOPERATIVAS ASÍNCRONAS
   ======================================================================
   Sin servidor: compartes un código con tu mejor Pokémon y otro jugador lo
   usa como aliado en su partida. Cooperación sin infraestructura.
   ====================================================================== */

API.codigoAliado = function () {
    let mejor = null, mejorPuntos = -1;
    for (const k in pkmn) {
        const p = pkmn[k];
        if (!p.caught) continue;
        const pts = (p.level || 1) * 10 + (p.ivs ? Object.values(p.ivs).reduce((a, b) => a + b, 0) : 0) * 5 + (p.shiny ? 50 : 0);
        if (pts > mejorPuntos) { mejorPuntos = pts; mejor = p; }
    }
    if (!mejor) return null;
    const d = { v: 1, p: mejor.id, l: mejor.level, s: !!mejor.shiny,
                m: Object.values(mejor.moves).filter(Boolean).slice(0, 4) };
    try { return btoa(unescape(encodeURIComponent(JSON.stringify(d)))); } catch (e) { return null; }
};

API.usarAliado = function (codigo) {
    let d;
    try { d = JSON.parse(decodeURIComponent(escape(atob(codigo.trim())))); } catch (e) { return null; }
    if (!d || !d.p || !pkmn[d.p]) return null;
    saved.aliado = d;
    E.sonar('logro');
    E.aviso('🤝 Aliado recibido', fmt(d.p) + ' nivel ' + d.l + (d.s ? ' ✦' : ''));
    return d;
};

/** El aliado da un bonus pasivo mientras esté cargado. */
API.multAliado = function () {
    if (!saved.aliado) return 1;
    return 1 + Math.min(0.25, (saved.aliado.l || 1) / 400);
};


/* ======================================================================
   35. MAZMORRAS PROCEDURALES
   ======================================================================
   Semilla diaria compartida: todos los jugadores ven la misma mazmorra el
   mismo día, igual que ya pasa con la rotación de áreas.
   ====================================================================== */

function mulberry(a) {
    return function () {
        a |= 0; a = a + 0x6D2B79F5 | 0;
        let t = Math.imul(a ^ a >>> 15, 1 | a);
        t ^= t + Math.imul(t ^ t >>> 7, 61 | t);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

const FONDOS = ['cave', 'forest', 'desert', 'snow', 'volcano', 'sea', 'tower', 'trench', 'mountain'];

API.mazmorraDelDia = function (dia) {
    const d = dia !== undefined ? dia : Math.floor(Date.now() / 86400000);
    const r = mulberry(d * 7919);

    const especies = Object.keys(pkmn).filter(k => !pkmn[k].hidden && !/mega|primal|origin/i.test(k));
    const pisos = [];
    const n = 5 + Math.floor(r() * 4);        // entre 5 y 8 pisos

    for (let i = 0; i < n; i++) {
        const habitantes = [];
        for (let j = 0; j < 3; j++) habitantes.push(especies[Math.floor(r() * especies.length)]);
        pisos.push({
            piso: i + 1,
            fondo: FONDOS[Math.floor(r() * FONDOS.length)],
            nivel: 10 + i * 12 + Math.floor(r() * 8),
            habitantes,
            jefe: i === n - 1 ? especies[Math.floor(r() * especies.length)] : null,
        });
    }
    return { dia: d, pisos, semilla: d * 7919 };
};


/* ======================================================================
   39. BLINDAR EL NAMESPACE DEL GUARDADO
   ======================================================================
   `saveGame()` vuelca objetos, tienda, áreas y Pokémon en un mismo objeto
   plano. Hoy hay 2 colisiones conocidas e inofensivas, pero una nueva
   corrompería partidas en silencio. Esto lo detecta al arrancar.
   ====================================================================== */

const COLISIONES_CONOCIDAS = ['metronome', 'glaciate'];

API.comprobarColisiones = function () {
    const vistos = {}, choques = [];
    const dics = [['move', typeof move !== 'undefined' ? move : {}],
                  ['item', typeof item !== 'undefined' ? item : {}],
                  ['areas', typeof areas !== 'undefined' ? areas : {}],
                  ['pkmn', typeof pkmn !== 'undefined' ? pkmn : {}]];
    for (const [nombre, dic] of dics) {
        for (const k in dic) {
            if (vistos[k] && vistos[k] !== nombre) choques.push({ id: k, entre: [vistos[k], nombre] });
            vistos[k] = nombre;
        }
    }
    const nuevas = choques.filter(c => !COLISIONES_CONOCIDAS.includes(c.id));
    if (nuevas.length) {
        console.error('⚠ COLISIÓN DE IDS NUEVA — puede corromper partidas:', nuevas);
        E.aviso('⚠ Aviso para quien desarrolla',
                'Hay ' + nuevas.length + ' id repetido entre diccionarios. Mira la consola.');
    }
    return { todas: choques, nuevas };
};


/* ======================================================================
   14. PASE DE TEMPORADA
   ====================================================================== */

const NIVELES_PASE = 20;
API.NIVELES_PASE = NIVELES_PASE;
API.PUNTOS_POR_NIVEL = 500;

API.puntosPase = function () {
    const s = E.stats();
    return s.combatesGanados + Math.floor(s.danoTotal / 1000) + s.objetosRecibidos * 5;
};

API.nivelPase = function () {
    return Math.min(NIVELES_PASE, Math.floor(API.puntosPase() / API.PUNTOS_POR_NIVEL));
};

function premioPase(n) {
    if (n % 5 === 0) return { id: 'goldenBottleCap', cantidad: 2, nombre: 'Chapas Doradas' };
    if (n % 2 === 0) return { id: 'rareCandy', cantidad: 3, nombre: 'Caramelos Raros' };
    return { id: 'bottleCap', cantidad: 5, nombre: 'Chapas Plateadas' };
}
API.premioPase = premioPase;

API.reclamarPase = function () {
    if (!saved.paseReclamado) saved.paseReclamado = 0;
    const nivel = API.nivelPase();
    let dados = 0;
    while (saved.paseReclamado < nivel) {
        saved.paseReclamado++;
        const p = premioPase(saved.paseReclamado);
        if (item[p.id]) { item[p.id].got += p.cantidad; dados++; }
    }
    if (dados) { E.sonar('logro'); E.aviso('🎫 Pase de temporada', dados + ' recompensa(s) reclamada(s)'); }
    else E.aviso('Nada que reclamar', 'Sigue jugando para subir de nivel');
    return dados;
};


/* ======================================================================
   23. MODO FOTOGRAFÍA
   ====================================================================== */

API.exportarFoto = function () {
    const zona = document.getElementById('content-explore');
    if (!zona) { E.aviso('Entra en un área primero'); return; }
    // Sin librerías externas: se compone un SVG con los sprites visibles.
    const sprites = [...zona.querySelectorAll('img')].filter(i => i.src && i.getBoundingClientRect().width > 0);
    if (!sprites.length) { E.aviso('No hay nada que fotografiar'); return; }
    E.aviso('📷 Función de foto', 'Usa la captura de pantalla de tu sistema: el juego no puede exportar imágenes sin librerías externas.');
};


/* ======================================================================
   46. ONBOARDING POR CAPAS
   ======================================================================
   El tutorial original son 4 mensajes seguidos. Aquí se enseña cada
   sistema cuando el jugador llega a él por primera vez.
   ====================================================================== */

const LECCIONES = [
    { id: 'cruce', titulo: 'Potencia Cruzada',
      texto: 'Si un movimiento es de tipo distinto al anterior, hace ×1.3 de daño. Encadenar 3 tipos distintos sube a ×1.4 y 4 a ×1.5.<br><br>Es la mecánica más importante del juego: importa el ORDEN de tus movimientos, no solo cuáles.',
      cuando: () => { for (const s in team) if (team[s].pkmn && Object.values(pkmn[team[s].pkmn.id].moves).filter(Boolean).length >= 2) return true; return false; } },
    { id: 'objetos', titulo: 'Los objetos suben de nivel',
      texto: 'Acumular copias del mismo objeto lo hace más potente: 5 copias es nivel 2, 20 es nivel 5.<br><br>Por eso vale la pena seguir farmeando algo que ya tienes.',
      cuando: () => { for (const k in item) if ((item[k].got || 0) >= 5) return true; return false; } },
    { id: 'estrellas', titulo: 'Las estadísticas son estrellas',
      texto: 'Este juego convierte las estadísticas base a una escala de 1 a 6 estrellas.<br><br>La diferencia entre un Pokémon normal y uno legendario son unas pocas estrellas, no un abismo. Casi cualquier Pokémon es viable.',
      cuando: () => Object.keys(pkmn).filter(k => pkmn[k].caught > 0).length >= 5 },
    { id: 'prestigio', titulo: 'Renacer',
      texto: 'Al registrar 60 especies podrás renacer: reinicias el progreso a cambio de Esencia, que compra talentos permanentes.<br><br>Cada renacer hace el siguiente más rápido.',
      cuando: () => Object.keys(pkmn).filter(k => pkmn[k].caught > 0).length >= 40 },
];
API.LECCIONES = LECCIONES;

API.revisarLecciones = function () {
    if (saved.sinLecciones === true) return;
    if (!saved.lecciones) saved.lecciones = {};
    for (const l of LECCIONES) {
        if (saved.lecciones[l.id]) continue;
        let toca = false;
        try { toca = l.cuando(); } catch (e) { continue; }
        if (!toca) continue;
        saved.lecciones[l.id] = true;
        if (typeof Paneles !== 'undefined') Paneles.abrir('💡 ' + l.titulo, '<div class="leccion">' + l.texto + '</div>');
        return;   // una lección por vez, sin avasallar
    }
};


return API;

})();
