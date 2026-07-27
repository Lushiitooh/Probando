/* =========================================================================
   MODOS DE JUEGO NUEVOS
   =========================================================================
   Cinco modos que se apoyan en el motor que ya existe: registran zonas en
   `areas`, se pintan como billetes normales y el combate automático de
   siempre hace el resto.

     1. CACERÍA        (Viajar)  apunta a una especie concreta y encadénala
     2. SEÑORES        (VS)      cinco jefes únicos por rotación de 12 h
     3. EL DORADO      (Viajar)  blindado con armadura y ventana de 16 golpes
     4. TORRE INFINITA (VS)      pisos sin fin, sin curación
     5. EXPEDICIÓN     (Viajar)  ruta ramificada de 7 etapas, te retiras o sigues

   Por qué existen: de las 1.376 especies del juego solo 683 son alcanzables
   entre salvajes y evoluciones. Otras 146 solo aparecen como rival, sin
   poder capturarlas, y 547 no tienen NINGUNA puerta de entrada — entre
   ellas Bulbasaur, Pidgey o Weedle. Estos modos abren esa puerta.

   REGLAS DURAS QUE RESPETA ESTE ARCHIVO
   - El estado va en `saved.*` y solo con strings, números y booleanos.
     save.js serializa `saved` entero, pero `pkmn[i]` lo guarda campo a campo
     (no vería uno nuevo) y de `areas[i]` solo conserva unos pocos campos.
     Guardar aquí una referencia a pkmn.* o item.* dejaría un clon muerto.
   - Las zonas se registran con `id` a mano: el bucle de areasDictionary.js
     que lo asigna ya pasó cuando carga este archivo.
   - `type` usa nombres inventados para que ningún bucle tipado existente
     (wild/dungeon/event/vs/frontier/dimension/season) los recoja por error.
   ========================================================================= */

var Modos = (function () {

const API = {};

/* ------------------------------------------------------------- utilidades */

function nom(x) { try { return format(x); } catch (e) { return String(x); } }

/** Registra o actualiza una zona. El id se pone a mano a propósito. */
function zona(id, def) {
    areas[id] = Object.assign(areas[id] || {}, def, { id: id });
    return areas[id];
}

/** Número de medio día actual: la misma base que usa la rotación del juego. */
function medioDia() {
    return Math.floor(Date.now() / (1000 * 60 * 60 * 12));
}

/** Generador con semilla, reutilizando el mulberry32 del juego. */
function rnd(semilla) {
    const f = mulberry32(semilla >>> 0);
    return {
        num: () => f(),
        ent: (a, b) => a + Math.floor(f() * (b - a + 1)),
        de: arr => arr[Math.floor(f() * arr.length)],
    };
}

/** Todas las especies que el jugador aún no tiene. */
function faltantes() {
    const out = [];
    for (const k in pkmn) if (pkmn[k] && !pkmn[k].caught) out.push(k);
    return out;
}

/** Zonas salvajes donde vive una especie, para saber su nivel natural. */
function habitatsDe(idPkmn) {
    const out = [];
    for (const a in areas) {
        const ar = areas[a];
        if (!ar || ar.type !== 'wild' || !ar.spawns) continue;
        for (const t in ar.spawns) {
            if (!Array.isArray(ar.spawns[t])) continue;
            if (ar.spawns[t].some(e => e && e.id === idPkmn)) { out.push(a); break; }
        }
    }
    return out;
}

function avisar(txt) {
    try { if (typeof Extras !== 'undefined' && Extras.aviso) Extras.aviso(txt); } catch (e) {}
}

/** Entra a una zona por la misma puerta que un billete normal. */
function entrarEnZona(id) {
    saved.currentAreaBuffer = id;
    document.getElementById('preview-team-exit').style.display = 'flex';
    document.getElementById('team-menu').style.zIndex = '50';
    document.getElementById('team-menu').style.display = 'flex';
    document.getElementById('menu-button-parent').style.display = 'none';
    if (typeof updatePreviewTeam === 'function') updatePreviewTeam();
    afkSeconds = 0;
    const em = document.getElementById('explore-menu'); if (em) em.style.display = 'none';
    const vm = document.getElementById('vs-menu');      if (vm) vm.style.display = 'none';
}
API.entrarEnZona = entrarEnZona;


/* =========================================================================
   1. CACERÍA
   =========================================================================
   Hoy encontrar un Pokémon es esperar: 91 % común, 1 % raro, probabilidades
   planas y ninguna decisión. Aquí eliges a QUIÉN cazas y cada derrota
   consecutiva sin salir de la zona sube la calidad de lo que sale.
   ========================================================================= */

const Caza = {};

// cadena mínima -> qué desbloquea. El nivel se topa en 100 y la dificultad
// nunca llega a 25 (tier1difficulty), porque a partir de ahí el juego
// sobrescribe los PS con un valor fijo y el escalado dejaría de tener sentido.
Caza.TRAMOS = [
    { min: 0,   pisoIv: 0, shiny: 1,  variante: 0,    dif: 2,  nivel: 0  },
    { min: 10,  pisoIv: 1, shiny: 1.5,variante: 0,    dif: 3,  nivel: 5  },
    { min: 25,  pisoIv: 2, shiny: 2,  variante: 0,    dif: 3,  nivel: 5  },
    { min: 50,  pisoIv: 3, shiny: 4,  variante: 0.10, dif: 4,  nivel: 10 },
    { min: 100, pisoIv: 4, shiny: 8,  variante: 0.25, dif: 6,  nivel: 20 },
    { min: 200, pisoIv: 5, shiny: 13, variante: 0.40, dif: 8,  nivel: 40 },
    { min: 350, pisoIv: 6, shiny: 20, variante: 0.50, dif: 10, nivel: 70 },
];

Caza.estado = function () {
    if (!saved.caza) saved.caza = {
        objetivo: undefined, habitat: undefined, nivelBase: 10,
        cadena: 0, mejor: 0, ultimoKo: 0,
        capturas: 0, variantes: 0, record: {},
    };
    return saved.caza;
};

Caza.tramo = function (cadena) {
    let t = Caza.TRAMOS[0];
    for (const x of Caza.TRAMOS) if (cadena >= x.min) t = x;
    return t;
};

/** Siguiente umbral, para poder enseñar "faltan N para el siguiente premio". */
Caza.siguienteTramo = function (cadena) {
    return Caza.TRAMOS.find(t => t.min > cadena) || null;
};

/**
 * La variante de una especie: primero su forma regional, si no su evolución.
 * Es lo que hace valioso el modo, porque las evoluciones y las formas
 * regionales son justo lo que no se consigue de ninguna otra manera.
 */
Caza.variante = function (id) {
    const cap = id.charAt(0).toUpperCase() + id.slice(1);
    for (const pre of ['alolan', 'galarian', 'hisuian', 'paldean']) {
        if (pkmn[pre + cap]) return pre + cap;
    }
    try {
        const ev = pkmn[id].evolve && pkmn[id].evolve();
        for (const k in ev) if (ev[k] && ev[k].pkmn && pkmn[ev[k].pkmn.id]) return ev[k].pkmn.id;
    } catch (e) {}
    return null;
};

/** Candidatos a cazar: los que faltan y de verdad viven en alguna zona. */
Caza.candidatos = function (soloFaltantes) {
    const out = [];
    for (const k in pkmn) {
        const p = pkmn[k];
        if (!p) continue;
        if (soloFaltantes !== false && p.caught) continue;
        const hs = habitatsDe(k);
        if (!hs.length) continue;
        let mejor = hs[0];
        for (const h of hs) if ((areas[h].level || 99) < (areas[mejor].level || 99)) mejor = h;
        out.push({ id: k, habitat: mejor, nivel: areas[mejor].level || 10, habitats: hs.length });
    }
    out.sort((a, b) => a.nivel - b.nivel || a.habitats - b.habitats);
    return out;
};

Caza.fijarObjetivo = function (id) {
    const c = Caza.estado();
    const hs = habitatsDe(id);
    if (!hs.length) return false;
    let mejor = hs[0];
    for (const h of hs) if ((areas[h].level || 99) < (areas[mejor].level || 99)) mejor = h;

    if (c.objetivo && c.objetivo !== id) {
        c.record[c.objetivo] = Math.max(c.record[c.objetivo] || 0, c.mejor || 0);
    }
    c.objetivo = id;
    c.habitat = mejor;
    c.nivelBase = areas[mejor].level || 10;
    c.cadena = 0;
    c.mejor = 0;
    c.ultimoKo = Date.now();
    Caza.reconstruirZona();
    return true;
};

Caza.cancelar = function () {
    const c = Caza.estado();
    if (c.objetivo) c.record[c.objetivo] = Math.max(c.record[c.objetivo] || 0, c.mejor || 0);
    c.objetivo = undefined;
    c.cadena = 0;
    Caza.reconstruirZona();
};

/**
 * Reescribe la zona de caza según el objetivo y la cadena actual.
 * La variante se mete con PESOS repitiendo entradas, porque arrayPick elige
 * uniforme y las entradas duplicadas cuentan.
 */
Caza.reconstruirZona = function () {
    const c = Caza.estado();
    const t = Caza.tramo(c.cadena);

    if (!c.objetivo || !pkmn[c.objetivo]) {
        zona('cazaZona', {
            type: 'caza', level: 10, background: 'forest', icon: pkmn.caterpie,
            difficulty: 2, spawns: { common: [pkmn.caterpie] },
            drops: { common: [item.mysteryEgg] },
            unlockDescription: 'Elige a quién cazar',
            unlockRequirement: function () { return !!(saved.caza && saved.caza.objetivo); },
        });
        return;
    }

    const base = pkmn[c.objetivo];
    const lista = [base];
    const varId = Caza.variante(c.objetivo);
    if (varId && t.variante > 0) {
        // 10 % -> 9 base + 1 variante ; 25 % -> 3 + 1 ; 40 % -> 3 + 2 ; 50 % -> 1 + 1
        const pesos = { 0.10: [9, 1], 0.25: [3, 1], 0.40: [3, 2], 0.50: [1, 1] }[t.variante] || [9, 1];
        lista.length = 0;
        for (let i = 0; i < pesos[0]; i++) lista.push(base);
        for (let i = 0; i < pesos[1]; i++) lista.push(pkmn[varId]);
    }

    const fondo = (areas[c.habitat] && areas[c.habitat].background) || 'forest';
    zona('cazaZona', {
        type: 'caza',
        level: Math.min(100, c.nivelBase + t.nivel),
        background: fondo,
        icon: base,
        difficulty: t.dif,
        spawns: { common: lista },
        drops: { common: [item.mysteryEgg] },
        name: 'Cacería: ' + nom(c.objetivo),
        unlockDescription: 'Elige a quién cazar',
        unlockRequirement: function () { return !!(saved.caza && saved.caza.objetivo); },
    });
};

/** Un salvaje derrotado dentro de la zona de caza. */
Caza.alDerrotar = function () {
    const c = Caza.estado();
    if (saved.currentArea !== 'cazaZona' || !c.objetivo) return;
    c.cadena++;
    c.ultimoKo = Date.now();
    if (c.cadena > c.mejor) c.mejor = c.cadena;
    c.record[c.objetivo] = Math.max(c.record[c.objetivo] || 0, c.mejor);

    const t = Caza.tramo(c.cadena);
    const ant = Caza.tramo(c.cadena - 1);
    if (t.min !== ant.min) {           // cambio de tramo: se rehace la zona
        Caza.reconstruirZona();
        avisar('Cacería x' + c.cadena + ': ' + (t.variante > 0
            ? 'ahora puede salir su variante'
            : 'IV mínimo ' + t.pisoIv + ' y variocolor x' + t.shiny));
    }
};

/** Se rompe la cadena al entrar en cualquier otra zona, o por ausencia larga. */
Caza.revisarRotura = function (zonaNueva) {
    const c = Caza.estado();
    if (!c.objetivo || !c.cadena) return;
    if (zonaNueva && zonaNueva !== 'cazaZona') { c.cadena = 0; Caza.reconstruirZona(); return; }
    const min = (Date.now() - (c.ultimoKo || 0)) / 60000;
    if (min > 360)     { c.cadena = 0; Caza.reconstruirZona(); }
    else if (min > 30) { c.cadena = Math.floor(c.cadena / 2); Caza.reconstruirZona(); }
};

Caza.alPerder = function () {
    const c = Caza.estado();
    if (saved.currentArea !== 'cazaZona') return;
    c.cadena = Math.floor(c.cadena / 2);
    Caza.reconstruirZona();
};

/** Aplica el piso de IV del tramo a un ejemplar recién obtenido. */
Caza.mejorarEjemplar = function (id) {
    const c = Caza.estado();
    if (saved.currentArea !== 'cazaZona' || !c.objetivo) return;
    const varId = Caza.variante(c.objetivo);
    if (id !== c.objetivo && id !== varId) return;
    const t = Caza.tramo(c.cadena);
    if (!t.pisoIv) return;
    const p = pkmn[id];
    if (!p || !p.ivs) return;
    for (const k in p.ivs) if (p.ivs[k] < t.pisoIv) p.ivs[k] = t.pisoIv;
    c.capturas++;
    if (id === varId) c.variantes++;
};

/** Multiplicador de variocolor que aporta la cadena. */
Caza.multShiny = function () {
    const c = Caza.estado();
    if (saved.currentArea !== 'cazaZona' || !c.objetivo) return 1;
    return Caza.tramo(c.cadena).shiny;
};

/** Sellos de cazador: cada especie con récord >= 50 da uno. */
Caza.sellos = function () {
    const c = Caza.estado();
    let n = 0;
    for (const k in c.record) if (c.record[k] >= 50) n++;
    return n;
};

Caza.bonoDrop = function () {
    const s = Caza.sellos();
    if (s >= 50) return 0.50;
    if (s >= 25) return 0.25;
    if (s >= 10) return 0.10;
    if (s >= 5)  return 0.05;
    return 0;
};

API.Caza = Caza;


/* =========================================================================
   2. SEÑORES
   =========================================================================
   Cinco jefes únicos por rotación de 12 h, anclados a zonas salvajes que ya
   completaste, con condición de aparición y una captura garantizada al caer.
   Resucitan zonas que ya no visitas.
   ========================================================================= */

const Senores = {};

Senores.EPITETOS = [
    'el Inquebrantable', 'de las Cenizas', 'Primer Nacido', 'el Que No Duerme',
    'de la Niebla', 'el Coronado', 'Guardián del Umbral', 'el Sin Nombre',
    'de los Mil Inviernos', 'el Devorador', 'Señor del Eco', 'la Última Llama',
    'el Insaciable', 'de la Grieta', 'el Vigilante', 'Corazón de Piedra',
    'el Errante', 'de la Marea', 'el Silencioso', 'Rey de la Espesura',
    'el Marcado', 'de la Tormenta', 'el Longevo', 'Portador del Alba',
];

Senores.ARQUETIPOS = [
    { k: 'alfa',      dif: 25,  nivel: 20,  titulo: 'Alfa' },
    { k: 'nocturno',  dif: 70,  nivel: 30,  titulo: 'Guardián Nocturno' },
    { k: 'climatico', dif: 200, nivel: 45,  titulo: 'Coloso Climático' },
    { k: 'tirano',    dif: 600, nivel: 60,  titulo: 'Tirano de Racha' },
    { k: 'soberano',  dif: 600, nivel: 80,  titulo: 'Soberano' },
];

Senores.estado = function () {
    if (!saved.senores) saved.senores = { rotacion: -1, lote: [], derrotados: {}, trofeos: {}, rachaMax: 0 };
    return saved.senores;
};

/** Zonas salvajes que el jugador ya ha completado (todos sus spawns capturados). */
Senores.zonasCompletadas = function () {
    const out = [];
    for (const a in areas) {
        const ar = areas[a];
        if (!ar || ar.type !== 'wild' || !ar.spawns) continue;
        let todos = true, alguno = false;
        for (const t in ar.spawns) {
            if (!Array.isArray(ar.spawns[t])) continue;
            for (const e of ar.spawns[t]) {
                if (!e || !pkmn[e.id]) continue;
                alguno = true;
                if (!pkmn[e.id].caught) { todos = false; break; }
            }
            if (!todos) break;
        }
        if (alguno && todos) out.push(a);
    }
    return out;
};

Senores.generar = function () {
    const st = Senores.estado();
    const rot = medioDia();
    if (st.rotacion === rot && st.lote && st.lote.length) return;

    const r = rnd(rot * 7919 + 13);
    let zonas = Senores.zonasCompletadas();
    if (!zonas.length) {
        // sin ninguna zona completada se usan las de nivel más bajo, para que
        // el modo exista desde el principio en vez de aparecer vacío
        zonas = Object.keys(areas).filter(a => areas[a].type === 'wild')
                      .sort((a, b) => (areas[a].level || 99) - (areas[b].level || 99)).slice(0, 8);
    }

    st.lote = [];
    st.derrotados = {};
    st.rotacion = rot;

    Senores.ARQUETIPOS.forEach((arq, i) => {
        const z = r.de(zonas);
        const ar = areas[z] || {};
        const nivelZona = ar.level || 10;

        // tipo tomado de un spawn de esa zona, para que el Señor pertenezca al sitio
        let tipo = 'normal';
        try {
            const pool = [].concat(ar.spawns.common || [], ar.spawns.uncommon || [], ar.spawns.rare || []);
            const e = r.de(pool);
            if (e && e.type && e.type.length) tipo = r.de(e.type);
        } catch (e) {}

        // especie del techo del juego, con cascada de rescate
        let especie = null;
        for (const div of (i >= 3 ? ['SSS', 'SS', 'S', 'A'] : ['SS', 'S', 'A'])) {
            try { especie = randomDivisionPkmn(div, tipo, undefined, rot * 31 + i); } catch (e) {}
            if (especie && pkmn[especie]) break;
        }
        if (!especie || !pkmn[especie]) especie = 'rattata';

        st.lote.push({
            slot: 'senor' + (i + 1),
            arquetipo: arq.k,
            titulo: arq.titulo,
            zona: z,
            especie: especie,
            nivel: Math.min(140, nivelZona + arq.nivel),
            dif: arq.dif,
            epiteto: r.de(Senores.EPITETOS),
            tipo: tipo,
        });
    });

    Senores.montarZonas();
};

Senores.montarZonas = function () {
    const st = Senores.estado();
    for (const s of (st.lote || [])) {
        const esp = pkmn[s.especie];
        if (!esp) continue;

        // movimientos de rareza alta: es lo que un salvaje normal nunca lleva
        const movs = [];
        for (let k = 0; k < 4; k++) {
            let m = null;
            try { m = learnPkmnMoveSeeded(s.especie, 100, 'wild', (s.nivel * 97 + k * 13), movs); } catch (e) {}
            if (m && move[m] && movs.indexOf(m) < 0) movs.push(m);
        }
        while (movs.length < 4) {
            const mp = (esp.movepool || []).filter(m => move[m] && movs.indexOf(m) < 0);
            if (!mp.length) break;
            movs.push(mp[0]);
        }

        const ar = areas[s.zona] || {};
        zona(s.slot, {
            type: 'senor',
            trainer: true,
            name: nom(s.especie) + ' ' + s.epiteto,
            level: s.nivel,
            difficulty: s.dif,
            background: ar.background || 'forest',
            icon: esp,
            team: { slot1: esp, slot1Moves: movs },
            defeated: !!st.derrotados[s.slot],
            reward: [esp],
            itemReward: Senores.premio(s.arquetipo),
            senorSlot: s.slot,
        });
    }
};

Senores.premio = function (arq) {
    const p = {
        alfa:      { 1: { item: 'pureIncense',     amount: 1 } },
        nocturno:  { 1: { item: 'abilityPatch',    amount: 2 } },
        climatico: { 1: { item: 'goldenBottleCap', amount: 3 } },
        tirano:    { 1: { item: 'shinyCharm',      amount: 1 }, 2: { item: 'goldenBottleCap', amount: 5 } },
        soberano:  { 1: { item: 'goldenBottleCap', amount: 8 }, 2: { item: 'bottleCap', amount: 20 } },
    }[arq] || { 1: { item: 'bottleCap', amount: 5 } };
    // se filtra lo que no exista en este diccionario, para no romper la entrega
    const out = {}; let n = 0;
    for (const k in p) if (item[p[k].item]) out[++n] = p[k];
    return n ? out : { 1: { item: 'bottleCap', amount: 5 } };
};

/** ¿Se puede pelear con este Señor ahora mismo? */
Senores.disponible = function (s) {
    const st = Senores.estado();
    if (st.derrotados[s.slot]) return { ok: false, motivo: 'Ya lo has derrotado en esta rotación' };
    const h = new Date().getHours();
    switch (s.arquetipo) {
        case 'nocturno':
            return (h >= 20 || h < 6)
                ? { ok: true } : { ok: false, motivo: 'Solo aparece de noche (20:00 a 06:00)' };
        case 'climatico': {
            let clima = null;
            try { clima = Combate2 && Combate2.climaDeZona && Combate2.climaDeZona(s.zona); } catch (e) {}
            return clima ? { ok: true } : { ok: false, motivo: 'Necesita que haya clima en su zona' };
        }
        case 'tirano':
            return (st.rachaMax >= 50)
                ? { ok: true } : { ok: false, motivo: 'Necesitas una racha de 50 derrotas seguidas (llevas ' + (st.rachaMax || 0) + ')' };
        case 'soberano': {
            const n = Object.keys(st.derrotados).length;
            return (n >= 3)
                ? { ok: true } : { ok: false, motivo: 'Derrota antes a 3 Señores de esta rotación (' + n + '/3)' };
        }
        default:
            return { ok: true };
    }
};

/** Al derrotar a un Señor: además del premio, regala una especie que te falte de su zona. */
Senores.alDerrotar = function (slot) {
    const st = Senores.estado();
    const s = (st.lote || []).find(x => x.slot === slot);
    if (!s) return;
    st.derrotados[slot] = true;
    st.trofeos[s.especie] = (st.trofeos[s.especie] || 0) + 1;

    const ar = areas[s.zona];
    if (ar && ar.spawns) {
        const pool = [].concat(ar.spawns.common || [], ar.spawns.uncommon || [], ar.spawns.rare || [])
                       .filter(e => e && pkmn[e.id]);
        const faltan = pool.filter(e => !pkmn[e.id].caught);
        const elegido = faltan.length ? faltan[0] : (pool.length ? pool[0] : null);
        if (elegido) {
            pkmn[elegido.id].newPokemon = true;
            avisar('El Señor deja marchar a ' + nom(elegido.id));
        }
    }
};

/** Racha global de derrotas seguidas, que es la llave del Tirano. */
Senores.sumarRacha = function () {
    const st = Senores.estado();
    st.rachaActual = (st.rachaActual || 0) + 1;
    if (st.rachaActual > (st.rachaMax || 0)) st.rachaMax = st.rachaActual;
};
Senores.romperRacha = function () { Senores.estado().rachaActual = 0; };

API.Senores = Senores;


/* =========================================================================
   3. EL DORADO
   =========================================================================
   Un blindado con defensa absurda que huye en 16 acciones. Funciona porque
   en este juego la defensa RESTA: (potencia + max(0, atk - def)). Con una
   defensa altísima el término de estadísticas se anula y solo cuentan la
   potencia base, el STAB y la eficacia. Traer los dos tipos correctos deja
   de ser un consejo y pasa a ser la única forma de tumbarlo.
   ========================================================================= */

const Dorado = {};

Dorado.estado = function () {
    if (!saved.dorado) saved.dorado = { rastros: 0, nivel: 0, sinRastro: 0, cazados: 0, huidas: 0, grietas: [] };
    return saved.dorado;
};

Dorado.TIPOS = ['normal','fire','water','electric','grass','ice','fighting','poison','ground',
                'flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy'];

/** Cada salvaje derrotado puede dejar un rastro. Con piedad garantizada. */
Dorado.alDerrotar = function () {
    const d = Dorado.estado();
    if (d.rastros >= 3) return;
    d.sinRastro = (d.sinRastro || 0) + 1;
    if (rng(0.005) || d.sinRastro >= 400) {
        d.rastros++;
        d.sinRastro = 0;
        Dorado.preparar();
        avisar('Has encontrado un Rastro Dorado (' + d.rastros + ')');
    }
};

/** Genera el blindado de este rastro: especie, grietas y premio. */
Dorado.preparar = function () {
    const d = Dorado.estado();
    const r = rnd(Date.now() >>> 8);
    const nivel = d.nivel || 0;

    // los tipos grieta: 3 en los primeros niveles a modo de tutorial, luego 2
    const cuantas = nivel <= 2 ? 3 : 2;
    const grietas = [];
    while (grietas.length < cuantas) {
        const t = r.de(Dorado.TIPOS);
        if (grietas.indexOf(t) < 0) grietas.push(t);
    }
    d.grietas = grietas;

    // premio: una especie que te falte, si queda alguna
    const faltan = faltantes();
    d.premio = faltan.length ? r.de(faltan) : null;

    // especie del blindado: la de mayor defensa que se pueda, para el look
    let esp = 'onix';
    try {
        const cand = Object.keys(pkmn).filter(k => pkmn[k].bst && pkmn[k].bst.def >= 5);
        if (cand.length) esp = r.de(cand);
    } catch (e) {}
    d.especie = esp;

    const vida = Math.round(60000 * Math.pow(1.35, nivel));
    zona('doradoZona', {
        type: 'dorado',
        trainer: true,
        name: 'El Dorado — nivel ' + (nivel + 1),
        level: Math.min(100, 20 + nivel * 4),
        difficulty: Math.max(2, Math.round(vida / 3000)),
        background: (areas[saved.currentArea] && areas[saved.currentArea].background) || 'cave',
        icon: pkmn[esp],
        team: { slot1: pkmn[esp], slot1Moves: ['splash','splash','splash','splash'].filter(m => move[m]) },
        defeated: false,
        reward: d.premio && pkmn[d.premio] ? [pkmn[d.premio]] : [],
        itemReward: { 1: { item: 'goldenBottleCap', amount: 1 + Math.floor(nivel / 3) } },
        unlockDescription: 'Necesitas un Rastro Dorado',
        unlockRequirement: function () { return !!(saved.dorado && saved.dorado.rastros > 0); },
    });
};

/** Ventana de acciones: al agotarse, huye. */
Dorado.VENTANA = 16;

/**
 * La armadura, que es lo que hace al modo.
 *
 * Cuidado: la premisa original ("la defensa resta, así que un rival con
 * defensa altísima anula el daño normal") es FALSA en este motor. La fórmula
 * (explore.js:2688) deja movePower FUERA del max(), así que la defensa solo
 * cancela el término de estadísticas y el golpe siempre pasa. Sin esto, las
 * grietas eran decorativas: el panel las anunciaba y no hacían nada.
 *
 * Así que la armadura se aplica explícitamente: un movimiento que no sea de
 * un tipo grieta hace el 15 % del daño. Con dos grietas la rotación
 * grieta1/grieta2/grieta1/grieta2 encadena además la Potencia Cruzada en los
 * cuatro movimientos, así que el modo enseña el cruce sin explicarlo.
 */
Dorado.PENALIZACION = 0.15;

Dorado.multArmadura = function (tipoMovimiento) {
    if (saved.currentArea !== 'doradoZona') return 1;
    const d = Dorado.estado();
    if (!d.grietas || !d.grietas.length) return 1;
    return d.grietas.indexOf(tipoMovimiento) >= 0 ? 1 : Dorado.PENALIZACION;
};

Dorado.entrar = function () {
    const d = Dorado.estado();
    if (d.rastros <= 0) return false;
    d.rastros--;
    d.acciones = 0;
    entrarEnZona('doradoZona');
    return true;
};

/** Cuenta cada acción del jugador dentro de la zona del Dorado. */
Dorado.alAtacar = function () {
    const d = Dorado.estado();
    if (saved.currentArea !== 'doradoZona') return;
    d.acciones = (d.acciones || 0) + 1;
    if (d.acciones >= Dorado.VENTANA) {
        d.huidas = (d.huidas || 0) + 1;
        d.acciones = 0;
        avisar('El Dorado ha huido. El nivel no baja: te quedan ' + d.rastros + ' rastros.');
        try { leaveCombat(); } catch (e) {}
    }
};

Dorado.alDerrotarlo = function () {
    const d = Dorado.estado();
    d.nivel = (d.nivel || 0) + 1;
    d.cazados = (d.cazados || 0) + 1;
    d.acciones = 0;
    avisar('¡Blindado abatido! Siguiente nivel: ' + (d.nivel + 1));
};

API.Dorado = Dorado;


/* =========================================================================
   4. TORRE INFINITA
   =========================================================================
   Pisos sin techo, sin curación entre ellos. Aprovecha que la experiencia de
   este juego premia muchísimo pelear por encima de tu nivel: x3 a +5 niveles,
   x12 a +20 y x128 a +50. A partir del piso 15 cualquier Pokémon por debajo
   de 100 sube a una velocidad que no se consigue en ninguna zona normal.
   ========================================================================= */

const Torre = {};

Torre.estado = function () {
    if (!saved.torre) saved.torre = { piso: 0, record: 0, tipo: 'normal', mejoras: [], subidas: 0 };
    return saved.torre;
};

Torre.nivelPiso  = p => 10 + 4 * (p - 1);
Torre.dificultad = p => Math.max(2, Math.round(3 * Math.pow(1.045, p - 1)));
Torre.division   = p => p < 15 ? 'C' : p < 30 ? 'B' : p < 50 ? 'A' : p < 75 ? 'S' : p < 100 ? 'SS' : 'SSS';

Torre.MEJORAS = [
    { k: 'dano',    txt: '+25 % de daño durante toda la subida' },
    { k: 'vida',    txt: 'Cura al equipo un 40 % de su vida máxima' },
    { k: 'veloz',   txt: '−15 % al tiempo de carga de tus movimientos' },
    { k: 'cruce',   txt: 'La Potencia Cruzada pasa de x1,3 a x1,5' },
    { k: 'botin',   txt: 'Doble probabilidad de objeto por derrota' },
    { k: 'escudo',  txt: '−20 % al daño que recibes' },
];

Torre.iniciar = function () {
    const t = Torre.estado();
    t.piso = 1;
    t.mejoras = [];
    t.tipo = Dorado.TIPOS[Math.floor(Math.random() * Dorado.TIPOS.length)];
    Torre.montarPiso();
    entrarEnZona('torreInfinita');
};

Torre.montarPiso = function () {
    const t = Torre.estado();
    const p = Math.max(1, t.piso);
    if (p % 5 === 1) t.tipo = Dorado.TIPOS[Math.floor(Math.random() * Dorado.TIPOS.length)];

    let esp = null;
    for (const div of [Torre.division(p), 'A', 'B', 'C']) {
        try { esp = randomDivisionPkmn(div, t.tipo, undefined, p * 131 + 7); } catch (e) {}
        if (esp && pkmn[esp]) break;
    }
    if (!esp || !pkmn[esp]) esp = 'rattata';

    zona('torreInfinita', {
        type: 'torre',
        level: Torre.nivelPiso(p),
        difficulty: Torre.dificultad(p),
        background: 'cave',
        icon: pkmn[esp],
        name: 'Torre Infinita — piso ' + p,
        spawns: { common: [pkmn[esp]] },
        drops: { common: [item.mysteryEgg] },
    });
};

/** Un rival de la torre cae: sube el piso y, cada 5, ofrece una mejora. */
Torre.alDerrotar = function () {
    const t = Torre.estado();
    if (saved.currentArea !== 'torreInfinita') return;
    t.piso++;
    if (t.piso > (t.record || 0)) t.record = t.piso;
    Torre.montarPiso();
    if ((t.piso - 1) % 5 === 0 && t.piso > 1) Torre.ofrecerMejora();
};

Torre.ofrecerMejora = function () {
    const t = Torre.estado();
    const libres = Torre.MEJORAS.filter(m => m.k !== 'vida' || true);
    const tres = [];
    while (tres.length < 3 && tres.length < libres.length) {
        const m = libres[Math.floor(Math.random() * libres.length)];
        if (!tres.some(x => x.k === m.k)) tres.push(m);
    }
    if (typeof Paneles !== 'undefined' && Paneles.abrir) {
        Paneles.abrir('Piso ' + t.piso + ' — elige una mejora',
            tres.map(m => `<div class="fila-botones"><button onclick="Modos.Torre.elegirMejora('${m.k}')">${m.txt}</button></div>`).join(''));
    } else {
        Torre.elegirMejora(tres[0].k);
    }
};

Torre.elegirMejora = function (k) {
    const t = Torre.estado();
    t.mejoras.push(k);
    if (k === 'vida') {
        try {
            for (const s in team) {
                if (!team[s].pkmn) continue;
                team[s].playerHp = Math.min(team[s].playerHpMax, team[s].playerHp + team[s].playerHpMax * 0.4);
            }
        } catch (e) {}
    }
    try { closeTooltip(); } catch (e) {}
};

Torre.tiene = k => (Torre.estado().mejoras || []).indexOf(k) >= 0;

Torre.multDano = function () {
    if (saved.currentArea !== 'torreInfinita') return 1;
    let m = 1;
    for (const k of (Torre.estado().mejoras || [])) if (k === 'dano') m *= 1.25;
    return m;
};

Torre.caer = function () {
    const t = Torre.estado();
    t.subidas = (t.subidas || 0) + 1;
    avisar('Torre: has llegado al piso ' + t.piso + '. Récord: ' + t.record);
    t.piso = 0;
    t.mejoras = [];
};

API.Torre = Torre;


/* =========================================================================
   5. EXPEDICIÓN
   =========================================================================
   Siete etapas encadenadas. En cada una eliges entre tres nodos con arquetipo
   visible, y cada nodo superado añade al botín una especie que hoy no sale en
   ninguna zona. Puedes retirarte y cobrar, o seguir y arriesgarlo todo.
   ========================================================================= */

const Expedicion = {};

Expedicion.ARQUETIPOS = [
    { k: 'horda',     txt: 'Horda',     nota: 'Muchos rivales débiles, más objetos' },
    { k: 'coloso',    txt: 'Coloso',    nota: 'Pocos rivales pero durísimos' },
    { k: 'santuario', txt: 'Santuario', nota: 'Añade DOS especies al botín' },
    { k: 'tormenta',  txt: 'Tormenta',  nota: 'Menos tiempo, muchos más objetos' },
    { k: 'refugio',   txt: 'Refugio',   nota: 'Fácil y seguro, pero sin especie nueva' },
];

Expedicion.ETAPAS = 7;

Expedicion.estado = function () {
    if (!saved.expedicion) saved.expedicion = {
        etapa: 0, activa: false, botin: [], opciones: [], mejorEtapa: 0, completadas: 0,
    };
    return saved.expedicion;
};

/** Las especies que hoy no tienen puerta de entrada: el botín de este modo. */
Expedicion.exclusivas = function () {
    if (Expedicion._cache) return Expedicion._cache;
    const enZonas = new Set();
    for (const a in areas) {
        const ar = areas[a];
        if (!ar || !ar.spawns) continue;
        for (const t in ar.spawns) {
            if (!Array.isArray(ar.spawns[t])) continue;
            for (const e of ar.spawns[t]) if (e && e.id) enZonas.add(e.id);
        }
    }
    const out = [];
    for (const k in pkmn) if (pkmn[k] && !enZonas.has(k)) out.push(k);
    Expedicion._cache = out;
    return out;
};

Expedicion.generarOpciones = function () {
    const e = Expedicion.estado();
    const r = rnd((Date.now() >>> 6) + e.etapa * 977);
    const excl = Expedicion.exclusivas();
    const usados = [];
    e.opciones = [];

    for (let i = 0; i < 3; i++) {
        let arq;
        do { arq = r.de(Expedicion.ARQUETIPOS); } while (usados.indexOf(arq.k) >= 0 && usados.length < 5);
        usados.push(arq.k);

        // la especie exclusiva que este nodo añadirá al botín
        let esp = null;
        if (arq.k !== 'refugio' && excl.length) {
            const faltan = excl.filter(x => pkmn[x] && !pkmn[x].caught);
            esp = (faltan.length ? r.de(faltan) : r.de(excl));
        }

        const zonasWild = Object.keys(areas).filter(a => areas[a].type === 'wild');
        const z = zonasWild.length ? r.de(zonasWild) : 'verdantForest';

        e.opciones.push({
            arq: arq.k, titulo: arq.txt, nota: arq.nota,
            zona: z,
            nivel: Math.min(100, 15 + e.etapa * 12 + (arq.k === 'coloso' ? 15 : 0)),
            dif: arq.k === 'coloso' ? 8 : arq.k === 'refugio' ? 2 : 4,
            especie: esp,
            doble: arq.k === 'santuario',
        });
    }
    return e.opciones;
};

Expedicion.iniciar = function () {
    const e = Expedicion.estado();
    e.etapa = 0;
    e.activa = true;
    e.botin = [];
    Expedicion.generarOpciones();
};

Expedicion.elegir = function (i) {
    const e = Expedicion.estado();
    const op = (e.opciones || [])[i];
    if (!op) return false;

    const ar = areas[op.zona] || {};
    const pool = [].concat(ar.spawns && ar.spawns.common || []).filter(x => x && pkmn[x.id]);
    zona('expedicionZona', {
        type: 'expedicion',
        level: op.nivel,
        difficulty: op.dif,
        background: ar.background || 'forest',
        icon: (op.especie && pkmn[op.especie]) || pool[0] || pkmn.caterpie,
        name: 'Expedición ' + (e.etapa + 1) + '/' + Expedicion.ETAPAS + ' — ' + op.titulo,
        spawns: { common: pool.length ? pool : [pkmn.caterpie] },
        drops: { common: [item.mysteryEgg] },
    });

    e.nodoActual = op;
    entrarEnZona('expedicionZona');
    return true;
};

/** Superar una etapa: se apunta el botín y se ofrecen tres nodos nuevos. */
Expedicion.superarEtapa = function () {
    const e = Expedicion.estado();
    if (!e.activa || !e.nodoActual) return;
    const op = e.nodoActual;

    if (op.especie) {
        e.botin.push(op.especie);
        if (op.doble) {
            const excl = Expedicion.exclusivas().filter(x => e.botin.indexOf(x) < 0);
            if (excl.length) e.botin.push(excl[Math.floor(Math.random() * excl.length)]);
        }
    }
    e.etapa++;
    if (e.etapa > (e.mejorEtapa || 0)) e.mejorEtapa = e.etapa;

    if (e.etapa >= Expedicion.ETAPAS) { Expedicion.retirarse(); return; }
    Expedicion.generarOpciones();
};

/** Retirarse: se cobra TODO el botín acumulado. */
Expedicion.retirarse = function () {
    const e = Expedicion.estado();
    if (!e.activa) return;
    let n = 0;
    for (const id of (e.botin || [])) {
        if (pkmn[id]) { pkmn[id].newPokemon = true; n++; }
    }
    e.completadas = (e.completadas || 0) + 1;
    avisar('Expedición cerrada: te llevas ' + n + ' especies del botín');
    e.activa = false;
    e.botin = [];
    e.etapa = 0;
    e.nodoActual = null;
};

/** Caer en una etapa: se pierde TODO el botín no cobrado. */
Expedicion.fracasar = function () {
    const e = Expedicion.estado();
    if (!e.activa) return;
    const perdidas = (e.botin || []).length;
    e.activa = false;
    e.botin = [];
    e.etapa = 0;
    e.nodoActual = null;
    if (perdidas) avisar('Expedición perdida: se van ' + perdidas + ' especies sin cobrar');
};

API.Expedicion = Expedicion;


/* ========================================================================= */

/** Arranque: reconstruye las zonas desde el estado guardado. */
API.init = function () {
    try { Caza.estado();       Caza.reconstruirZona(); } catch (e) { console.error('Modos/Caza', e); }
    try { Senores.estado();    Senores.generar();      } catch (e) { console.error('Modos/Senores', e); }
    try { Dorado.estado();     if (saved.dorado.rastros > 0) Dorado.preparar(); } catch (e) { console.error('Modos/Dorado', e); }
    try { Torre.estado();      Torre.montarPiso();     } catch (e) { console.error('Modos/Torre', e); }
    try { Expedicion.estado(); } catch (e) { console.error('Modos/Expedicion', e); }
};

/** Un salvaje ha caído: lo reparten todos los modos que lo necesiten. */
API.alDerrotarSalvaje = function () {
    try { Caza.alDerrotar(); }   catch (e) {}
    try { Torre.alDerrotar(); }  catch (e) {}
    try { Senores.sumarRacha(); }catch (e) {}
    try { if (saved.currentArea !== 'doradoZona') Dorado.alDerrotar(); } catch (e) {}
};

/** Se entra en una zona: rompe cadenas y rachas donde toque. */
API.alEntrarEnZona = function (id) {
    try { Caza.revisarRotura(id); } catch (e) {}
    if (id !== 'torreInfinita') { try { Torre.estado().piso = Torre.estado().piso; } catch (e) {} }
};

/** El equipo ha caído. */
API.alPerder = function () {
    try { Caza.alPerder(); }        catch (e) {}
    try { Senores.romperRacha(); }  catch (e) {}
    try { if (saved.currentArea === 'torreInfinita') Torre.caer(); } catch (e) {}
    try { if (saved.currentArea === 'expedicionZona') Expedicion.fracasar(); } catch (e) {}
};

return API;

})();
