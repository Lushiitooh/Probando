/* =========================================================================
   SISTEMAS DE PROGRESIÓN Y DESCUBRIMIENTO
   =========================================================================
   Nueve sistemas que atacan carencias concretas del juego:

     1. LINAJE          evolucionar deja de devolverte un Pokémon inútil
     2. NIVEL DE BÚSQUEDA  cada encuentro deja huella permanente por especie
     3. TIRADAS VISIBLES   la probabilidad de variocolor deja de ser opaca
     4. PIEDAD          las malas rachas tienen techo
     5. AURAS           los salvajes muy derrotados vuelven mejorados
     6. CARAMELOS       la experiencia que hoy se tira a nivel 100
     7. PROFUNDIDAD     quedarse en una zona la hace escalar
     8. HERENCIA        el nivel y el esfuerzo sobreviven a la evolución
     9. MAESTRÍA        los usos suben el movimiento, no al Pokémon

   Todo el estado vive en saved.* con tipos planos: save.js serializa `saved`
   entero, pero las especies las guarda campo a campo y no vería uno nuevo.
   ========================================================================= */

var Progreso2 = (function () {

const API = {};

function nom(x) { try { return format(x); } catch (e) { return String(x); } }

function est(clave, inicial) {
    if (!saved[clave]) saved[clave] = inicial;
    return saved[clave];
}


/* =========================================================================
   1. REGISTRO DE LINAJE
   =========================================================================
   El agujero más doloroso del juego: evolucionar NO transforma a tu Pokémon,
   te regala uno nuevo a nivel 1 con los IV a cero. Tu Charmander mimado
   durante 80 niveles produce un Charizard basura.

   Aquí cada familia evolutiva guarda el mejor IV que has visto en cada
   estadística, y todo ejemplar nuevo de esa familia nace con esos valores
   como SUELO. No se suman: se igualan. De paso, el Rattata número 40 deja de
   ser inútil, porque si sale con un IV mejor sube el récord para siempre.
   ========================================================================= */

const Linaje = {};

Linaje.estado = () => est('linaje', {});

/** Raíz de la familia evolutiva: se sube por los padres hasta el primero. */
Linaje.raiz = function (id) {
    if (!Linaje._padres) {
        // índice de padres construido UNA vez: recorrer 1.376 especies por
        // consulta era inviable y ya causó un cuelgue en otro sistema
        Linaje._padres = {};
        for (const k in pkmn) {
            const p = pkmn[k];
            if (!p || typeof p.evolve !== 'function') continue;
            let ev; try { ev = p.evolve(); } catch (e) { continue; }
            if (!ev || typeof ev !== 'object') continue;
            for (const s in ev) {
                const h = ev[s] && ev[s].pkmn && ev[s].pkmn.id;
                if (h && !Linaje._padres[h]) Linaje._padres[h] = k;
            }
        }
    }
    let act = id, visto = {};
    while (Linaje._padres[act] && !visto[act]) { visto[act] = 1; act = Linaje._padres[act]; }
    return act;
};

/** Apunta los IV de un ejemplar como récord de su familia. */
Linaje.registrar = function (id) {
    const p = pkmn[id];
    if (!p || !p.ivs) return;
    const r = Linaje.raiz(id);
    const L = Linaje.estado();
    if (!L[r]) L[r] = { hp: 0, atk: 0, def: 0, satk: 0, sdef: 0, spe: 0 };
    for (const k in p.ivs) if (p.ivs[k] > (L[r][k] || 0)) L[r][k] = p.ivs[k];
};

/** Aplica el suelo de la familia a un ejemplar recién obtenido. */
Linaje.aplicarSuelo = function (id) {
    const p = pkmn[id];
    if (!p || !p.ivs) return;
    const L = Linaje.estado()[Linaje.raiz(id)];
    if (!L) return;
    for (const k in p.ivs) if ((L[k] || 0) > p.ivs[k]) p.ivs[k] = L[k];
};

/** Puntos de récord de una familia, sobre 36. */
Linaje.puntos = function (id) {
    const L = Linaje.estado()[Linaje.raiz(id)];
    if (!L) return 0;
    let n = 0; for (const k in L) n += L[k] || 0;
    return n;
};

API.Linaje = Linaje;


/* =========================================================================
   2. NIVEL DE BÚSQUEDA
   =========================================================================
   Hoy 500 encuentros fallidos no valen nada. Aquí cada salvaje derrotado
   sube un contador permanente por especie que mejora lo que sale de ella.
   Sube también durante el AFK, porque el bucle se reejecuta igual.
   ========================================================================= */

const Busqueda = {};

Busqueda.estado = () => est('busqueda', {});
Busqueda.TOPE = 999;

Busqueda.sumar = function (id, n) {
    if (!pkmn[id]) return;
    const B = Busqueda.estado();
    B[id] = Math.min(Busqueda.TOPE, (B[id] || 0) + (n || 1));
};

Busqueda.nivel = id => Busqueda.estado()[id] || 0;

/** Denominador de variocolor de esa especie: baja de 400 hasta 150. */
Busqueda.denominadorShiny = function (id) {
    return Math.max(150, 400 - 0.5 * Busqueda.nivel(id));
};

/** Tiradas extra de IV que concede el nivel de búsqueda. */
Busqueda.tiradasExtra = function (id) {
    const n = Busqueda.nivel(id);
    return n >= 100 ? 1 : 0;
};

/** Suelo de IV que concede el nivel de búsqueda. */
Busqueda.sueloIv = function (id) {
    return Busqueda.nivel(id) >= 250 ? 3 : 0;
};

Busqueda.hitos = function (id) {
    const n = Busqueda.nivel(id);
    return [
        { en: 25,  txt: 'Ves el nivel del próximo salvaje',         hecho: n >= 25 },
        { en: 100, txt: 'Una tirada extra de IV',                    hecho: n >= 100 },
        { en: 250, txt: 'IV mínimo 3 en todo lo que salga',          hecho: n >= 250 },
        { en: 500, txt: 'Variocolor tope: 1/150',                    hecho: n >= 500 },
        { en: 999, txt: 'Especie dominada',                          hecho: n >= 999 },
    ];
};

API.Busqueda = Busqueda;


/* =========================================================================
   3 y 4. TIRADAS VISIBLES Y PIEDAD
   =========================================================================
   La probabilidad de variocolor es hoy invisible y sin memoria: puedes tirar
   3.000 veces sin nada y el juego no lo sabe. Aquí se cuenta cada tirada,
   se enseña el número, y a partir de cierto punto la probabilidad sube hasta
   garantizarlo. Las malas rachas dejan de ser infinitas.
   ========================================================================= */

const Suerte = {};

Suerte.estado = () => est('suerte', { tiradas: 0, sinShiny: 0, shinies: 0, mejorRacha: 0 });

// a partir de aquí la probabilidad empieza a subir, y en el tope se garantiza
Suerte.PIEDAD_DESDE = 1500;
Suerte.PIEDAD_TOPE  = 4000;

Suerte.tirar = function () {
    const s = Suerte.estado();
    s.tiradas++;
    s.sinShiny++;
    if (s.sinShiny > (s.mejorRacha || 0)) s.mejorRacha = s.sinShiny;
};

Suerte.acierto = function () {
    const s = Suerte.estado();
    s.shinies++;
    s.sinShiny = 0;
};

/**
 * Multiplicador de piedad. De 1 hasta que se pasa de PIEDAD_DESDE, y de ahí
 * sube linealmente hasta garantizar el variocolor en PIEDAD_TOPE.
 */
Suerte.multPiedad = function () {
    const s = Suerte.estado();
    if (s.sinShiny <= Suerte.PIEDAD_DESDE) return 1;
    const t = (s.sinShiny - Suerte.PIEDAD_DESDE) / (Suerte.PIEDAD_TOPE - Suerte.PIEDAD_DESDE);
    return 1 + Math.min(1, t) * 19;      // hasta x20
};

Suerte.resumen = function () {
    const s = Suerte.estado();
    return {
        tiradas: s.tiradas, shinies: s.shinies, sinShiny: s.sinShiny,
        mejorRacha: s.mejorRacha,
        piedad: Suerte.multPiedad(),
        faltanParaPiedad: Math.max(0, Suerte.PIEDAD_DESDE - s.sinShiny),
        garantizadoEn: Math.max(0, Suerte.PIEDAD_TOPE - s.sinShiny),
    };
};

API.Suerte = Suerte;


/* =========================================================================
   5. AURAS
   =========================================================================
   Una especie que has derrotado muchas veces empieza a aparecer "con aura":
   más nivel, mejores IV y más botín. Revive zonas ya exprimidas sin tocar
   ninguna tabla de aparición.
   ========================================================================= */

const Aura = {};

Aura.UMBRALES = [
    { ko: 50,   nombre: 'Curtido',   nivel: 5,  iv: 1, botin: 1.5, color: '#8ab4f8' },
    { ko: 200,  nombre: 'Veterano',  nivel: 12, iv: 2, botin: 2.0, color: '#82df60' },
    { ko: 500,  nombre: 'Ancestral', nivel: 25, iv: 3, botin: 3.0, color: '#f0c040' },
    { ko: 1000, nombre: 'Primigenio',nivel: 40, iv: 4, botin: 5.0, color: '#e06fd0' },
];

Aura.de = function (id) {
    const n = Busqueda.nivel(id);
    let a = null;
    for (const u of Aura.UMBRALES) if (n >= u.ko) a = u;
    return a;
};

/** Probabilidad de que el salvaje salga con aura, si la especie la tiene. */
Aura.PROB = 0.15;

Aura.sortear = function (id) {
    const a = Aura.de(id);
    if (!a) return null;
    return rng(Aura.PROB) ? a : null;
};

API.Aura = Aura;


/* =========================================================================
   6. CARAMELOS DE ESPECIE
   =========================================================================
   A nivel 100 la experiencia se pone a cero y se tira (explore.js:1620). Con
   cientos de horas de AFK eso es una fortuna a la basura. Aquí se convierte
   en caramelos de esa familia, que suben el nivel de cualquier pariente.
   ========================================================================= */

const Caramelos = {};

Caramelos.estado = () => est('caramelos', {});
Caramelos.POR_CARAMELO = 20000;      // experiencia necesaria por caramelo

Caramelos.ingresar = function (id, exp) {
    if (!exp || exp <= 0) return 0;
    const r = Linaje.raiz(id);
    const C = Caramelos.estado();
    if (!C[r]) C[r] = { exp: 0, n: 0 };
    C[r].exp += exp;
    let ganados = 0;
    while (C[r].exp >= Caramelos.POR_CARAMELO) {
        C[r].exp -= Caramelos.POR_CARAMELO;
        C[r].n++; ganados++;
    }
    return ganados;
};

Caramelos.disponibles = id => (Caramelos.estado()[Linaje.raiz(id)] || {}).n || 0;

/** Gasta caramelos de la familia para subir de nivel a un pariente. */
Caramelos.gastar = function (id, cuantos) {
    const r = Linaje.raiz(id);
    const C = Caramelos.estado();
    const p = pkmn[id];
    if (!C[r] || !p) return 0;
    const n = Math.min(cuantos || 1, C[r].n, 100 - (p.level || 1));
    if (n <= 0) return 0;
    C[r].n -= n;
    p.level = Math.min(100, (p.level || 1) + n);
    return n;
};

API.Caramelos = Caramelos;


/* =========================================================================
   7. PROFUNDIDAD DE ZONA
   =========================================================================
   Hoy el salvaje NUNCA escala: la zona 1 es igual en el minuto 1 que en la
   hora 40. Aquí quedarse la va endureciendo por tramos, y con ella suben el
   botín y la experiencia. Sales de la zona y se reinicia.
   ========================================================================= */

const Profundidad = {};

Profundidad.estado = () => est('profundidad', { zona: null, ko: 0, mejor: {} });
Profundidad.POR_TRAMO = 25;
Profundidad.TOPE = 20;

Profundidad.nivel = function () {
    const p = Profundidad.estado();
    if (p.zona !== saved.currentArea) return 0;
    return Math.min(Profundidad.TOPE, Math.floor(p.ko / Profundidad.POR_TRAMO));
};

Profundidad.sumar = function () {
    const p = Profundidad.estado();
    if (p.zona !== saved.currentArea) { p.zona = saved.currentArea; p.ko = 0; }
    p.ko++;
    const n = Profundidad.nivel();
    if (n > (p.mejor[p.zona] || 0)) p.mejor[p.zona] = n;
};

Profundidad.reiniciar = function () {
    const p = Profundidad.estado();
    p.zona = saved.currentArea; p.ko = 0;
};

Profundidad.multNivel = () => 1 + Profundidad.nivel() * 0.08;   // hasta +160 %
Profundidad.multBotin = () => 1 + Profundidad.nivel() * 0.10;   // hasta +200 %
Profundidad.multExp   = () => 1 + Profundidad.nivel() * 0.15;   // hasta +300 %

API.Profundidad = Profundidad;


/* =========================================================================
   8. HERENCIA AL EVOLUCIONAR
   =========================================================================
   Evolucionar te da un Pokémon a nivel 1. Aquí hereda parte del nivel del
   padre, así que evolucionar deja de ser un castigo y pasa a ser una decisión.
   ========================================================================= */

const Herencia = {};

Herencia.FRACCION = 0.6;    // se hereda el 60 % del nivel del padre

Herencia.aplicar = function (idPadre, idHijo) {
    const padre = pkmn[idPadre], hijo = pkmn[idHijo];
    if (!padre || !hijo) return 0;
    const heredado = Math.max(1, Math.floor((padre.level || 1) * Herencia.FRACCION));
    if (heredado > (hijo.level || 1)) hijo.level = Math.min(100, heredado);
    Linaje.aplicarSuelo(idHijo);
    return heredado;
};

API.Herencia = Herencia;


/* =========================================================================
   9. MAESTRÍA POR MOVIMIENTO
   =========================================================================
   Los usos suben el MOVIMIENTO, no al Pokémon. Así un movimiento que llevas
   usando cien horas pega más lo lleve quien lo lleve, y premia especializarse
   en una rotación en vez de cambiarla cada rato.
   ========================================================================= */

const Maestria = {};

Maestria.estado = () => est('maestria', {});
Maestria.NIVELES = [0, 100, 400, 1200, 3000, 8000];   // usos por nivel

Maestria.usar = function (idMov) {
    if (!idMov || !move[idMov]) return;
    const M = Maestria.estado();
    M[idMov] = (M[idMov] || 0) + 1;
};

Maestria.nivel = function (idMov) {
    const u = Maestria.estado()[idMov] || 0;
    let n = 0;
    for (let i = 0; i < Maestria.NIVELES.length; i++) if (u >= Maestria.NIVELES[i]) n = i;
    return n;
};

/** +4 % de daño por nivel de maestría, hasta +20 %. */
Maestria.mult = idMov => 1 + Maestria.nivel(idMov) * 0.04;

Maestria.progreso = function (idMov) {
    const u = Maestria.estado()[idMov] || 0;
    const n = Maestria.nivel(idMov);
    const sig = Maestria.NIVELES[n + 1];
    return { usos: u, nivel: n, siguiente: sig || null, faltan: sig ? sig - u : 0 };
};

API.Maestria = Maestria;


/* ========================================================================= */

API.init = function () {
    Linaje.estado(); Busqueda.estado(); Suerte.estado();
    Caramelos.estado(); Profundidad.estado(); Maestria.estado();
    // se apuntan como récord los IV de lo que ya tienes, para no empezar a cero
    try {
        for (const k in pkmn) if (pkmn[k] && pkmn[k].caught) Linaje.registrar(k);
    } catch (e) { console.error('Progreso2/init', e); }
};

/** Un salvaje ha caído: lo reparten los sistemas que cuentan derrotas. */
API.alDerrotarSalvaje = function (idEspecie) {
    try { if (idEspecie) Busqueda.sumar(idEspecie, 1); } catch (e) {}
    try { Profundidad.sumar(); } catch (e) {}
};

/** Un ejemplar entra en el equipo: suelo de familia y récord. */
API.alObtener = function (id) {
    try { Linaje.aplicarSuelo(id); } catch (e) {}
    try { Linaje.registrar(id); } catch (e) {}
};

return API;

})();
