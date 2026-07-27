/* =========================================================================
   SISTEMAS DE MUNDO
   =========================================================================
     1. TERATIPO    cada ejemplar esconde un tipo que se activa a media pelea
     2. INNATAS     dos pasivas por especie que cambian las reglas de la rotación
     3. BANCO AFK   el tiempo ausente se acumula y se gasta cuando tú quieras
     4. PACTOS      penalizaciones voluntarias que multiplican el botín
     5. CEBOS       consumibles que sesgan qué aparece
     6. BROTES      tres zonas al día inundadas por una especie

   Todo el estado vive en saved.* con tipos planos: save.js serializa `saved`
   entero, pero las especies las guarda campo a campo y no vería uno nuevo.
   ========================================================================= */

var Mundo = (function () {

const API = {};

function nom(x) { try { return format(x); } catch (e) { return String(x); } }
function est(k, ini) { if (!saved[k]) saved[k] = ini; return saved[k]; }

const TIPOS = ['normal','fire','water','electric','grass','ice','fighting','poison','ground',
               'flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy'];
API.TIPOS = TIPOS;

/** Número estable a partir de un texto: evita guardar 1.376 entradas. */
function hash(txt) {
    let h = 2166136261;
    for (let i = 0; i < txt.length; i++) { h ^= txt.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
}
API.hash = hash;


/* =========================================================================
   1. TERATIPO
   =========================================================================
   Cada especie esconde un tipo distinto del suyo. Al bajar del 50 % de vida
   del rival se activa y TODOS tus movimientos pasan a contar como de ese
   tipo. Recalcula la pelea a media pelea: un equipo puede ser flojo al
   principio y demoledor después, o al revés.
   ========================================================================= */

const Tera = {};

Tera.estado = () => est('tera', { activo: false, usados: {} });

/** Derivado del id: estable para siempre y sin guardar nada. */
Tera.tipoDe = function (idEspecie) {
    if (!idEspecie) return null;
    const p = pkmn[idEspecie];
    if (!p || !p.type) return null;
    const h = hash(idEspecie);
    // se descartan los tipos que ya tiene: el teratipo tiene que aportar algo
    const libres = TIPOS.filter(t => p.type.indexOf(t) < 0);
    if (!libres.length) return null;
    return libres[h % libres.length];
};

Tera.UMBRAL = 0.5;      // se activa cuando al rival le queda menos del 50 %

Tera.revisar = function () {
    const t = Tera.estado();
    if (t.activo) return false;
    if (typeof wildPkmnHp === 'undefined' || typeof wildPkmnHpMax === 'undefined') return false;
    if (!wildPkmnHpMax || wildPkmnHp / wildPkmnHpMax > Tera.UMBRAL) return false;
    t.activo = true;
    try {
        const id = team[exploreActiveMember] && team[exploreActiveMember].pkmn && team[exploreActiveMember].pkmn.id;
        const tipo = Tera.tipoDe(id);
        if (tipo && typeof Extras !== 'undefined' && Extras.aviso) {
            Extras.aviso('¡Teracristalización! ' + nom(id) + ' pasa a tipo ' + nom(tipo));
        }
        if (id) t.usados[id] = (t.usados[id] || 0) + 1;
    } catch (e) {}
    return true;
};

Tera.reiniciar = function () { Tera.estado().activo = false; };

/** Tipo que debe usar un movimiento ahora mismo, si el tera está activo. */
Tera.tipoEfectivo = function (idEspecie, tipoOriginal) {
    if (!Tera.estado().activo) return tipoOriginal;
    return Tera.tipoDe(idEspecie) || tipoOriginal;
};

API.Tera = Tera;


/* =========================================================================
   2. INNATAS
   =========================================================================
   Dos pasivas fijas por especie, derivadas de su id. No tocan ningún
   diccionario y no hay que guardarlas: se recalculan siempre igual.
   Todas hablan el idioma de la rotación, que es donde vive el juego.
   ========================================================================= */

const Innatas = {};

Innatas.LISTA = [
    { k: 'impetu',    nombre: 'Ímpetu',     desc: 'El primer movimiento de cada ciclo pega un 30 % más' },
    { k: 'remate',    nombre: 'Remate',     desc: 'El cuarto movimiento del ciclo pega un 35 % más' },
    { k: 'tejedor',   nombre: 'Tejedor',    desc: 'La Potencia Cruzada le da +0,15 extra' },
    { k: 'terco',     nombre: 'Terco',      desc: 'Repetir tipo ya no penaliza: +20 % si no cruza' },
    { k: 'madrugador',nombre: 'Madrugador', desc: 'Un 15 % más rápido mientras el rival esté por encima del 70 %' },
    { k: 'agonia',    nombre: 'Agonía',     desc: 'Un 40 % más de daño cuando al rival le queda menos del 25 %' },
    { k: 'coraza',    nombre: 'Coraza',     desc: 'Recibe un 18 % menos de daño' },
    { k: 'vampiro',   nombre: 'Vampiro',    desc: 'Recupera un 4 % de su vida máxima por golpe' },
    { k: 'erudito',   nombre: 'Erudito',    desc: 'Gana un 25 % más de experiencia' },
    { k: 'buscador',  nombre: 'Buscador',   desc: 'Un 30 % más de probabilidad de objeto' },
    { k: 'afortunado',nombre: 'Afortunado', desc: 'Dobla su aportación a la probabilidad de variocolor' },
    { k: 'veterano',  nombre: 'Veterano',   desc: '+2 % de daño por cada 10 niveles que tenga' },
    { k: 'duelista',  nombre: 'Duelista',   desc: '+25 % de daño contra entrenadores' },
    { k: 'montaraz',  nombre: 'Montaraz',   desc: '+25 % de daño contra salvajes' },
    { k: 'cazatipos', nombre: 'Cazatipos',  desc: 'Los golpes supereficaces suben de x1,5 a x1,8' },
    { k: 'tenaz',     nombre: 'Tenaz',      desc: 'Los golpes poco eficaces suben de x0,5 a x0,7' },
];

Innatas.de = function (idEspecie) {
    if (!idEspecie) return [];
    const h = hash(idEspecie);
    const a = Innatas.LISTA[h % Innatas.LISTA.length];
    let b = Innatas.LISTA[(Math.floor(h / 16) + 7) % Innatas.LISTA.length];
    if (b.k === a.k) b = Innatas.LISTA[(Innatas.LISTA.indexOf(a) + 5) % Innatas.LISTA.length];
    return [a, b];
};

Innatas.tiene = function (idEspecie, clave) {
    return Innatas.de(idEspecie).some(x => x.k === clave);
};

/** Multiplicador de daño que aportan las innatas del atacante. */
Innatas.multDano = function (idEspecie, ctx) {
    if (!idEspecie) return 1;
    let m = 1;
    const p = pkmn[idEspecie];
    if (Innatas.tiene(idEspecie, 'impetu')    && ctx.turno === 1) m *= 1.30;
    if (Innatas.tiene(idEspecie, 'remate')    && ctx.turno === 4) m *= 1.35;
    if (Innatas.tiene(idEspecie, 'terco')     && !ctx.cruza)      m *= 1.20;
    if (Innatas.tiene(idEspecie, 'agonia')    && ctx.vidaRival < 0.25) m *= 1.40;
    if (Innatas.tiene(idEspecie, 'veterano')  && p) m *= 1 + Math.floor((p.level || 1) / 10) * 0.02;
    if (Innatas.tiene(idEspecie, 'duelista')  && ctx.entrenador)  m *= 1.25;
    if (Innatas.tiene(idEspecie, 'montaraz')  && !ctx.entrenador) m *= 1.25;
    return m;
};

Innatas.multTiempo = function (idEspecie, vidaRival) {
    if (Innatas.tiene(idEspecie, 'madrugador') && vidaRival > 0.70) return 0.85;
    return 1;
};

Innatas.multEficacia = function (idEspecie, ef) {
    if (ef > 1 && Innatas.tiene(idEspecie, 'cazatipos')) return 1.8 / 1.5;
    if (ef < 1 && Innatas.tiene(idEspecie, 'tenaz'))     return 0.7 / 0.5;
    return 1;
};

API.Innatas = Innatas;


/* =========================================================================
   3. BANCO DE TIEMPO AFK
   =========================================================================
   Hoy el tiempo ausente se gasta solo al volver, en la zona en la que te
   dejaste. Aquí se acumula como recurso y lo sueltas donde quieras: entras
   a la zona buena, y entonces lo gastas.
   ========================================================================= */

const Banco = {};

Banco.estado = () => est('banco', { guardado: 0, activo: false, total: 0, gastado: 0 });
Banco.TOPE = 60 * 60 * 24 * 3;      // tres días

Banco.ingresar = function (segundos) {
    if (!segundos || segundos <= 0) return 0;
    const b = Banco.estado();
    const antes = b.guardado;
    b.guardado = Math.min(Banco.TOPE, b.guardado + segundos);
    b.total += (b.guardado - antes);
    return b.guardado - antes;
};

/** Suelta el tiempo guardado en la zona actual. */
Banco.gastar = function (segundos) {
    const b = Banco.estado();
    const n = Math.min(segundos || b.guardado, b.guardado);
    if (n <= 0) return 0;
    b.guardado -= n;
    b.gastado += n;
    if (typeof afkSeconds !== 'undefined') afkSeconds += n;
    return n;
};

Banco.horas = () => (Banco.estado().guardado / 3600);

API.Banco = Banco;


/* =========================================================================
   4. PACTOS DE ZONA
   =========================================================================
   Antes de entrar eliges penalizaciones. Cada punto de dureza multiplica el
   botín y la experiencia. Es dificultad que TÚ decides, no que te imponen.
   ========================================================================= */

const Pactos = {};

Pactos.LISTA = [
    { k: 'sinCruce',   nombre: 'Sin cruce',      dureza: 3, desc: 'La Potencia Cruzada no funciona' },
    { k: 'lento',      nombre: 'Plomo',          dureza: 2, desc: 'Tus movimientos tardan un 40 % más' },
    { k: 'fragil',     nombre: 'Frágil',         dureza: 3, desc: 'Recibes el doble de daño' },
    { k: 'sinObjetos', nombre: 'Manos vacías',   dureza: 2, desc: 'Tus objetos no hacen nada' },
    { k: 'medioEquipo',nombre: 'Media docena no',dureza: 3, desc: 'Solo pelean los tres primeros' },
    { k: 'sinStab',    nombre: 'Desarraigo',     dureza: 2, desc: 'Pierdes el bonus por tipo propio' },
    { k: 'rivalDuro',  nombre: 'Coloso',         dureza: 2, desc: 'Los rivales tienen el triple de vida' },
    { k: 'rivalRapido',nombre: 'Frenesí',        dureza: 2, desc: 'Los rivales atacan un 50 % más rápido' },
    { k: 'sinRelevo',  nombre: 'Hasta el final', dureza: 2, desc: 'No puedes relevar' },
    { k: 'unSoloTipo', nombre: 'Voto de tipo',   dureza: 3, desc: 'Solo cuentan los movimientos del tipo del portador' },
    { k: 'sinCurar',   nombre: 'Sin descanso',   dureza: 1, desc: 'No recuperas vida entre combates' },
    { k: 'niebla',     nombre: 'Niebla',         dureza: 1, desc: 'No ves la vida del rival' },
];

Pactos.estado = () => est('pactos', { activos: [], mejorDureza: 0, completados: 0 });

Pactos.dureza = function () {
    const p = Pactos.estado();
    let d = 0;
    for (const k of (p.activos || [])) {
        const x = Pactos.LISTA.find(y => y.k === k);
        if (x) d += x.dureza;
    }
    return d;
};

/** Cada punto de dureza da +25 % de botín y experiencia. */
Pactos.multRecompensa = () => 1 + Pactos.dureza() * 0.25;

Pactos.activo = k => (Pactos.estado().activos || []).indexOf(k) >= 0;

Pactos.alternar = function (k) {
    const p = Pactos.estado();
    if (!p.activos) p.activos = [];
    const i = p.activos.indexOf(k);
    if (i >= 0) p.activos.splice(i, 1); else p.activos.push(k);
    if (Pactos.dureza() > (p.mejorDureza || 0)) p.mejorDureza = Pactos.dureza();
    return Pactos.activo(k);
};

Pactos.limpiar = function () { Pactos.estado().activos = []; };

API.Pactos = Pactos;


/* =========================================================================
   5. CEBOS
   =========================================================================
   Consumibles que sesgan qué aparece durante N encuentros. Convierten el
   farmeo pasivo en algo que puedes dirigir.
   ========================================================================= */

const Cebos = {};

Cebos.TIPOS = [
    { k: 'dulce',   nombre: 'Cebo dulce',    desc: 'Sube al triple la probabilidad de lo poco común', usos: 50 },
    { k: 'amargo',  nombre: 'Cebo amargo',   desc: 'Sube a diez veces la probabilidad de lo raro',    usos: 30 },
    { k: 'floral',  nombre: 'Cebo floral',   desc: 'Dobla la probabilidad de variocolor',             usos: 40 },
    { k: 'denso',   nombre: 'Cebo denso',    desc: 'Los salvajes salen 10 niveles por encima',        usos: 40 },
];

Cebos.estado = () => est('cebos', { inventario: {}, activo: null, restantes: 0 });

Cebos.dar = function (k, n) {
    const c = Cebos.estado();
    c.inventario[k] = (c.inventario[k] || 0) + (n || 1);
};

Cebos.usar = function (k) {
    const c = Cebos.estado();
    if (!(c.inventario[k] > 0)) return false;
    const t = Cebos.TIPOS.find(x => x.k === k);
    if (!t) return false;
    c.inventario[k]--;
    c.activo = k;
    c.restantes = t.usos;
    return true;
};

Cebos.consumir = function () {
    const c = Cebos.estado();
    if (!c.activo) return;
    c.restantes--;
    if (c.restantes <= 0) { c.activo = null; c.restantes = 0; }
};

Cebos.hay = k => Cebos.estado().activo === k && Cebos.estado().restantes > 0;

API.Cebos = Cebos;


/* =========================================================================
   6. BROTES
   =========================================================================
   Tres zonas al día donde una especie inunda la tabla de aparición. Sacan al
   jugador de su zona cómoda y resucitan zonas que ya no visita.
   ========================================================================= */

const Brotes = {};

Brotes.estado = () => est('brotes', { dia: -1, lista: [], derrotados: {} });

Brotes.dia = () => Math.floor(Date.now() / (1000 * 60 * 60 * 24));

Brotes.generar = function () {
    const b = Brotes.estado();
    const hoy = Brotes.dia();
    if (b.dia === hoy && b.lista && b.lista.length) return;

    const zonas = Object.keys(areas).filter(a => areas[a].type === 'wild' && areas[a].spawns);
    if (!zonas.length) return;

    const f = mulberry32(hoy * 6151 + 3);
    const lista = [];
    const vistas = {};
    for (let i = 0; i < 3 && zonas.length; i++) {
        let z, intentos = 0;
        do { z = zonas[Math.floor(f() * zonas.length)]; intentos++; } while (vistas[z] && intentos < 20);
        vistas[z] = 1;
        const sp = areas[z].spawns;
        const pool = [].concat(sp.common || [], sp.uncommon || [], sp.rare || []).filter(e => e && pkmn[e.id]);
        if (!pool.length) continue;
        const e = pool[Math.floor(f() * pool.length)];
        lista.push({ zona: z, especie: e.id });
    }
    b.lista = lista;
    b.dia = hoy;
    b.derrotados = {};
};

Brotes.enZona = function (z) {
    const b = Brotes.estado();
    return (b.lista || []).find(x => x.zona === z) || null;
};

/** Probabilidad de que el brote imponga su especie. Sube con las derrotas. */
Brotes.probabilidad = function (z) {
    const b = Brotes.estado();
    const n = b.derrotados[z] || 0;
    if (n >= 60) return 0.90;
    if (n >= 30) return 0.75;
    return 0.60;
};

Brotes.sumar = function (z) {
    const b = Brotes.estado();
    if (!Brotes.enZona(z)) return;
    b.derrotados[z] = (b.derrotados[z] || 0) + 1;
};

API.Brotes = Brotes;


/* ========================================================================= */

API.init = function () {
    Tera.estado(); Banco.estado(); Pactos.estado(); Cebos.estado();
    try { Brotes.generar(); } catch (e) { console.error('Mundo/Brotes', e); }
};

return API;

})();
