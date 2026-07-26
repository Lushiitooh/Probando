/* =========================================================================
   Pokechill — Presentación, historia y contenido
   =========================================================================
   Ideas 20, 23, 32, 33, 37, 49 de IDEAS.md.
   ========================================================================= */

var Extras2 = (function () {

'use strict';

const API = {};
const E = Extras;

function nom(x) { try { return format(x); } catch (e) { return String(x); } }


/* ======================================================================
   49. ANIMACIONES DE IMPACTO POR TIPO
   ======================================================================
   El juego ya tenía voidAnimation() y varias animaciones CSS. Aquí se
   añade un efecto distinto por tipo de movimiento sobre el sprite del
   rival, sin imágenes: todo con CSS generado.
   ====================================================================== */

const IMPACTOS = {
    fire:     { clase: 'imp-fuego',    particula: '🔥', color: '#ff7043' },
    water:    { clase: 'imp-agua',     particula: '💧', color: '#4fa3e3' },
    grass:    { clase: 'imp-planta',   particula: '🍃', color: '#66bb6a' },
    electric: { clase: 'imp-electrico',particula: '⚡', color: '#ffd54f' },
    ice:      { clase: 'imp-hielo',    particula: '❄',  color: '#81d4fa' },
    fighting: { clase: 'imp-lucha',    particula: '💥', color: '#e57373' },
    poison:   { clase: 'imp-veneno',   particula: '☠',  color: '#ba68c8' },
    ground:   { clase: 'imp-tierra',   particula: '⛰',  color: '#a1887f' },
    flying:   { clase: 'imp-volador',  particula: '🪶', color: '#b3e5fc' },
    psychic:  { clase: 'imp-psiquico', particula: '✦',  color: '#f06292' },
    bug:      { clase: 'imp-bicho',    particula: '🕸', color: '#9ccc65' },
    rock:     { clase: 'imp-roca',     particula: '🪨', color: '#bcaaa4' },
    ghost:    { clase: 'imp-fantasma', particula: '👁', color: '#9575cd' },
    dragon:   { clase: 'imp-dragon',   particula: '🐉', color: '#7986cb' },
    dark:     { clase: 'imp-siniestro',particula: '🌑', color: '#78909c' },
    steel:    { clase: 'imp-acero',    particula: '⚙',  color: '#b0bec5' },
    fairy:    { clase: 'imp-hada',     particula: '✧',  color: '#f8bbd0' },
    normal:   { clase: 'imp-normal',   particula: '✷',  color: '#e0e0e0' },
};
API.IMPACTOS = IMPACTOS;

let ultimoImpacto = 0;

API.impacto = function (tipo, superEficaz) {
    if (saved.sinAnimaciones === true) return;
    if (typeof afkSeconds !== 'undefined' && afkSeconds > 2) return;

    // A velocidades altas hay cientos de golpes por segundo: limitar.
    const ahora = performance.now();
    if (ahora - ultimoImpacto < 120) return;
    ultimoImpacto = ahora;

    const cfg = IMPACTOS[tipo] || IMPACTOS.normal;
    const sprite = document.getElementById('explore-wild-sprite');
    if (!sprite) return;
    const caja = sprite.getBoundingClientRect();
    if (caja.width === 0) return;

    // destello sobre el sprite
    const destello = document.createElement('div');
    destello.className = 'impacto-destello ' + cfg.clase;
    destello.style.left = caja.left + 'px';
    destello.style.top = caja.top + 'px';
    destello.style.width = caja.width + 'px';
    destello.style.height = caja.height + 'px';
    destello.style.setProperty('--color-impacto', cfg.color);
    document.body.appendChild(destello);
    setTimeout(() => destello.remove(), 450);

    // partículas: más cuando es supereficaz
    const n = superEficaz ? 5 : 3;
    for (let i = 0; i < n; i++) {
        const p = document.createElement('div');
        p.className = 'impacto-particula';
        p.textContent = cfg.particula;
        p.style.left = (caja.left + caja.width / 2) + 'px';
        p.style.top = (caja.top + caja.height / 2) + 'px';
        p.style.setProperty('--dx', (Math.random() * 90 - 45).toFixed(0) + 'px');
        p.style.setProperty('--dy', (-30 - Math.random() * 50).toFixed(0) + 'px');
        p.style.animationDelay = (i * 40) + 'ms';
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800 + i * 40);
    }
};


/* ======================================================================
   23. MODO FOTOGRAFÍA
   ======================================================================
   Compone una imagen con canvas y la descarga. Los sprites son del mismo
   origen, así que el canvas no queda contaminado y toDataURL funciona.
   Sin librerías externas.
   ====================================================================== */

function cargarImagen(src) {
    return new Promise(res => {
        const i = new Image();
        i.onload = () => res(i);
        i.onerror = () => res(null);
        i.src = src;
    });
}

API.hacerFoto = async function () {
    const miembros = [];
    for (const s in team) if (team[s].pkmn) miembros.push(team[s].pkmn.id);
    if (!miembros.length) { E.aviso('Necesitas un equipo', 'Monta un equipo antes de hacer la foto'); return; }

    const W = 1200, H = 630;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const g = c.getContext('2d');

    // fondo: el de la zona actual si hay
    const areaActual = areas[saved.currentArea];
    const fondo = areaActual && areaActual.background
        ? await cargarImagen('img/bg/' + areaActual.background + '.png') : null;

    if (fondo) {
        g.drawImage(fondo, 0, 0, W, H);
        g.fillStyle = 'rgba(0,0,0,0.35)';
        g.fillRect(0, 0, W, H);
    } else {
        const grad = g.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, '#3a3330'); grad.addColorStop(1, '#1d1a18');
        g.fillStyle = grad; g.fillRect(0, 0, W, H);
    }

    // sprites del equipo
    g.imageSmoothingEnabled = false;
    const ancho = W / Math.max(1, miembros.length);
    for (let i = 0; i < miembros.length; i++) {
        const id = miembros[i];
        const carpeta = pkmn[id].shiny ? 'shiny' : 'sprite';
        const img = await cargarImagen('img/pkmn/' + carpeta + '/' + id + '.png');
        if (!img) continue;
        const escala = Math.min(220 / img.width, 220 / img.height);
        const w = img.width * escala, h = img.height * escala;
        g.drawImage(img, ancho * i + (ancho - w) / 2, H / 2 - h / 2, w, h);
    }

    // pie con datos
    g.fillStyle = 'rgba(0,0,0,0.65)';
    g.fillRect(0, H - 86, W, 86);
    g.fillStyle = '#fff';
    g.font = 'bold 30px sans-serif';
    g.fillText('Pokechill', 26, H - 48);
    g.font = '20px sans-serif';
    const r = typeof Progreso !== 'undefined' ? Progreso.rango() : null;
    const especies = typeof Progreso !== 'undefined' ? Progreso.capturados() : 0;
    g.fillText((r ? r.titulo + ' nivel ' + r.nivel + '  ·  ' : '') + especies + ' especies registradas', 26, H - 20);

    g.font = '18px sans-serif';
    g.textAlign = 'right';
    g.fillText(miembros.map(m => nom(m)).join('  ·  ').slice(0, 90), W - 26, H - 20);

    // descarga
    try {
        const url = c.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pokechill-' + new Date().toISOString().slice(0, 10) + '.png';
        a.click();
        E.sonar('captura');
        E.aviso('📷 Foto guardada', 'Revisa tus descargas');
    } catch (err) {
        E.aviso('No se pudo generar la foto', err.message);
    }
};


/* ======================================================================
   20. LORE AMPLIADO
   ======================================================================
   El juego traía 48 textos, muy bien escritos, casi todos de legendarios.
   Aquí se añaden los iniciales y varias especies emblemáticas, siguiendo
   el mismo tono: contemplativo, sin datos de ficha.
   ====================================================================== */

const LORE_NUEVO = {
    bulbasaur: 'Duerme al sol con el bulbo abierto, tomando de la luz lo que otros toman del alimento. Crece despacio, como todo lo que ha de durar.',
    charmander: 'La llama de su cola cuenta su historia sin que él lo sepa: se aviva con la alegría, tiembla con el miedo y se apaga solo cuando ya no queda nada que contar.',
    squirtle: 'Su caparazón no es una carga, sino una casa. Se retira a ella no por miedo, sino porque hay días en los que uno necesita silencio.',
    pikachu: 'Guarda la electricidad en las mejillas como quien guarda palabras: no por avaricia, sino esperando el momento justo para soltarlas.',
    eevee: 'Su forma nunca terminó de decidirse, y esa indecisión es su don. Puede ser muchas cosas porque aún no ha elegido ser una sola.',
    snorlax: 'Come y duerme, y en ese ciclo simple encuentra una paz que criaturas más nobles persiguen sin alcanzar. No hay pereza en él, sino conformidad.',
    gengar: 'Se esconde en las sombras que proyectan otros. Dicen que en realidad busca compañía, y que sus sustos son un modo torpe de pedirla.',
    lapras: 'Cruza mares que ya nadie navega, cantando en una lengua que casi nadie recuerda. Fueron muchos; ahora quedan pocos, y el canto se ha vuelto más triste.',
    dragonite: 'Su tamaño asusta hasta que se le ve actuar. Rescata barcos perdidos y devuelve a la orilla a quien se ha alejado demasiado, sin esperar que nadie lo sepa.',
    gyarados: 'Pasó su juventud siendo motivo de burla. Cuando por fin cambió, el mundo descubrió que la paciencia también tiene un límite.',
    magikarp: 'Salta sin llegar a ninguna parte, una y otra vez. Quien se ríe de él no sabe en qué se convierte quien insiste lo suficiente.',
    alakazam: 'Su mente calcula más rápido de lo que el mundo cambia, y por eso vive un instante por delante de todos. Es una forma de soledad.',
    machamp: 'Cuatro brazos para levantar lo que otros no pueden, y una delicadeza que sorprende a quien lo ve por primera vez cargar algo frágil.',
    lucario: 'Percibe el aura de quien tiene delante y sabe, antes de que hable, si miente. Vive rodeado de verdades que nadie le pidió conocer.',
    garchomp: 'Vuela a la velocidad del sonido sin apenas moverse en apariencia. Cuando alguien nota su presencia, ya ha pasado de largo.',
    metagross: 'Cuatro cerebros en uno, discutiendo en silencio hasta llegar a un acuerdo. La decisión que toma es siempre la que todos ellos aceptaron.',
    tyranitar: 'Cambia el paisaje a su paso sin proponérselo. No destruye por maldad: simplemente es demasiado grande para pasar sin dejar huella.',
    ditto: 'Copia todo lo que ve salvo una cosa: nunca acierta con los ojos. Quizá porque la mirada es lo único que no se puede imitar.',
    sudowoodo: 'Finge ser un árbol con una insistencia conmovedora, incluso cuando ya nadie se lo cree. Hay dignidad en seguir el papel hasta el final.',
    slowpoke: 'Tarda cinco segundos en sentir el dolor. Alguna gente diría que es un defecto; él ha vivido más tranquilo que casi todos.',
    absol: 'Aparece antes de los desastres para avisar, y por eso lo culpan de causarlos. Ha aprendido a avisar de todos modos.',
    espeon: 'Lee el aire y adivina lo que viene. Se dice que su lealtad nace de haber visto, una vez, un futuro en el que su entrenador la necesitaba.',
    umbreon: 'Los anillos de su cuerpo brillan en la oscuridad. No para verse, sino para que quien lo acompaña no se pierda.',
    togepi: 'Dicen que reparte felicidad. Lo que reparte en realidad es la costumbre de fijarse en las cosas pequeñas, que viene a ser lo mismo.',
    scyther: 'Sus guadañas se afilan solas con cada combate. Cuanto más pelea, más letal se vuelve, y menos capaz es de hacer otra cosa.',
    aggron: 'Reclama una montaña entera como suya y la defiende con una terquedad admirable. Si el terreno se daña, pasa años reparándolo.',
    milotic: 'Su belleza calma las peleas de quien la contempla. Fue, antes de eso, la criatura más fea de su lago.',
    banette: 'Nació del rencor de un juguete abandonado. Busca al niño que lo dejó atrás, sin saber ya muy bien si para vengarse o para volver.',
    spiritomb: 'Ciento ocho espíritus atados a una piedra por un castigo del que nadie recuerda la causa. Discuten entre ellos, eternamente.',
    zoroark: 'Crea ilusiones para proteger a los suyos. La más elaborada es la de que no le importa nada.',
};

API.aplicarLoreNuevo = function () {
    let n = 0;
    for (const id in LORE_NUEVO) {
        if (!pkmn[id]) continue;
        if (pkmn[id].lore) continue;      // no pisar lo que ya escribió el autor
        pkmn[id].lore = LORE_NUEVO[id];
        n++;
    }
    return n;
};
API.LORE_NUEVO = LORE_NUEVO;


/* ======================================================================
   32. MODO HISTORIA
   ======================================================================
   Un hilo narrativo por capítulos que se desbloquean con el progreso.
   Da contexto a lo que el juego ya te hace hacer.
   ====================================================================== */

const CAPITULOS = [
    { id: 1, titulo: 'El primer paso',
      requisito: () => true,
      texto: 'Nadie recuerda quién puso el primer comedero junto al sendero del bosque.<br><br>' +
             'Lo que sí se sabe es que desde entonces las criaturas bajan a mirarnos, y que algunas —solo algunas— deciden quedarse.<br><br>' +
             'Tu compañero te eligió a ti tanto como tú a él. Conviene no olvidarlo.' },
    { id: 2, titulo: 'La costumbre del combate',
      requisito: () => Extras.stats().combatesGanados >= 50,
      texto: 'Los combates de estas tierras no dejan heridas que no cierren solas.<br><br>' +
             'Son medidas de fuerza, no guerras. Por eso los que pierden vuelven al día siguiente, y por eso los que ganan no presumen demasiado.<br><br>' +
             'Aun así, algo se cansa en ellos. Lo llaman fatiga, y es la forma que tiene el cuerpo de recordar que nada es gratis.' },
    { id: 3, titulo: 'Lo que se hereda',
      requisito: () => (typeof Progreso !== 'undefined' ? Progreso.capturados() : 0) >= 30,
      texto: 'Hay quien colecciona criaturas como quien colecciona monedas: por el número.<br><br>' +
             'Los viejos entrenadores dicen que se equivocan. Que cada una trae consigo el gesto de su especie, una manera concreta de moverse por el mundo.<br><br>' +
             'Aprender a leerlas es más difícil que atraparlas. Y más útil.' },
    { id: 4, titulo: 'El orden importa',
      requisito: () => Extras.stats().movimientosEjecutados >= 500,
      texto: 'Un maestro del valle solía decir que la fuerza de un golpe no está en el golpe.<br><br>' +
             'Está en el que vino antes.<br><br>' +
             'Alternar, sorprender, no repetirse: eso desarma a un rival mucho antes que la potencia bruta. Lo llaman cruce, y es lo único que de verdad separa a un aficionado de alguien que sabe.' },
    { id: 5, titulo: 'La torre',
      requisito: () => (saved.maxSpiralFloor || 0) >= 10,
      texto: 'La torre no tiene cima. Eso lo sabe todo el mundo y aun así siguen subiendo.<br><br>' +
             'Los que llegan alto cuentan que en algún piso dejas de contar los pisos, y entonces empieza lo interesante.<br><br>' +
             'Nadie ha vuelto diciendo qué hay arriba. Sospechamos que porque no hay arriba.' },
    { id: 6, titulo: 'Renacer',
      requisito: () => (typeof Progreso !== 'undefined' ? Progreso.capturados() : 0) >= 60,
      texto: 'Se dice que quien lo ha dado todo puede ofrecerlo a cambio de algo que no se ve.<br><br>' +
             'Los que renacen empiezan de cero con las manos vacías, pero no vuelven a ser los de antes: algo permanece, aunque no sepan nombrarlo.<br><br>' +
             'Los que lo han hecho varias veces hablan poco del asunto. Solo sonríen y siguen.' },
    { id: 7, titulo: 'El Original',
      requisito: () => (saved.prestigios || 0) >= 3,
      texto: 'Antes del tiempo y del espacio hubo algo que decidió que los hubiera.<br><br>' +
             'No creó el mundo: creó las reglas por las que un mundo puede existir. La diferencia importa.<br><br>' +
             'Lo que ves cuando lo miras no es Él. Es solo la forma que tu mente tolera sin romperse.' },
];
API.CAPITULOS = CAPITULOS;

API.capitulosDisponibles = function () {
    return CAPITULOS.filter(c => { try { return c.requisito(); } catch (e) { return false; } });
};

API.revisarCapitulos = function () {
    if (!saved.capitulosLeidos) saved.capitulosLeidos = {};
    for (const c of API.capitulosDisponibles()) {
        if (saved.capitulosLeidos[c.id]) continue;
        saved.capitulosLeidos[c.id] = true;
        E.sonar('logro');
        E.aviso('📖 Nuevo capítulo', c.titulo);
        return c;
    }
    return null;
};


/* ======================================================================
   33. JEFE SEMANAL
   ======================================================================
   Los jefes globales de verdad necesitan un servidor con vida compartida,
   y esto es un sitio estático. Lo que sí se puede: un jefe **igual para
   todo el mundo** cada semana, elegido con la semana como semilla, y una
   tabla de daño local. Comparar resultados queda en manos de la gente.
   ====================================================================== */

function semanaActual() { return Math.floor(Date.now() / (7 * 86400000)); }
API.semanaActual = semanaActual;

function aleatorioSemilla(s) {
    return function () {
        s |= 0; s = s + 0x6D2B79F5 | 0;
        let t = Math.imul(s ^ s >>> 15, 1 | s);
        t ^= t + Math.imul(t ^ t >>> 7, 61 | t);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

API.jefeSemanal = function () {
    const semana = semanaActual();
    const r = aleatorioSemilla(semana * 104729);
    const candidatos = Object.keys(pkmn).filter(k =>
        !pkmn[k].hidden && (pkmn[k].signature || /mega|primal|origin/i.test(k)));
    const elegido = candidatos.length ? candidatos[Math.floor(r() * candidatos.length)] : 'mewtwo';
    return {
        semana,
        id: elegido,
        nivel: 100 + Math.floor(r() * 50),
        vida: Math.floor(5e6 + r() * 2e7),
        recordPropio: (saved.recordJefe && saved.recordJefe.semana === semana) ? saved.recordJefe.dano : 0,
    };
};

API.registrarDanoJefe = function (dano) {
    const j = API.jefeSemanal();
    if (!saved.recordJefe || saved.recordJefe.semana !== j.semana) saved.recordJefe = { semana: j.semana, dano: 0 };
    if (dano > saved.recordJefe.dano) {
        saved.recordJefe.dano = dano;
        return true;
    }
    return false;
};


/* ======================================================================
   37. EVENTOS DE TEMPORADA AMPLIADOS
   ====================================================================== */

const EVENTOS_EXTRA = [
    { id: 'lunaLlena',   nombre: 'Luna llena',       icono: '🌕',
      activo: () => { const d = new Date().getDate(); return d >= 14 && d <= 16; },
      texto: 'Los Pokémon de tipo Fantasma y Psíquico aparecen más a menudo, y la probabilidad de variocolor se duplica.',
      efecto: { shinyPct: 100 } },
    { id: 'tormenta',    nombre: 'Semana de tormentas', icono: '⛈',
      activo: () => new Date().getDay() === 3,
      texto: 'Los movimientos de tipo Eléctrico y Agua ganan un 25% de daño.',
      efecto: { danoPct: 25 } },
    { id: 'cosecha',     nombre: 'Cosecha',          icono: '🌾',
      activo: () => { const m = new Date().getMonth(); return m === 8 || m === 9; },
      texto: 'Los objetos caen con un 50% más de frecuencia.',
      efecto: { dropPct: 50 } },
    { id: 'finDeSemana', nombre: 'Fin de semana',    icono: '🎉',
      activo: () => { const d = new Date().getDay(); return d === 0 || d === 6; },
      texto: 'Toda la experiencia aumenta un 50%.',
      efecto: { expPct: 50 } },
    { id: 'anioNuevo',   nombre: 'Año nuevo',        icono: '🎆',
      activo: () => { const d = new Date(); return d.getMonth() === 0 && d.getDate() <= 7; },
      texto: 'Todo mejora: daño, experiencia y objetos suben un 30%.',
      efecto: { danoPct: 30, expPct: 30, dropPct: 30 } },
];
API.EVENTOS_EXTRA = EVENTOS_EXTRA;

API.eventosActivos = function () {
    if (saved.sinEventosExtra === true) return [];
    return EVENTOS_EXTRA.filter(e => { try { return e.activo(); } catch (err) { return false; } });
};

API.bonusEvento = function (clave) {
    let t = 0;
    for (const e of API.eventosActivos()) t += (e.efecto[clave] || 0);
    return t;
};

API.multEvento = function (clave) { return 1 + API.bonusEvento(clave) / 100; };

let eventosAvisados = false;
API.avisarEventos = function () {
    if (eventosAvisados) return;
    eventosAvisados = true;
    const act = API.eventosActivos();
    if (!act.length) return;
    for (const e of act) E.aviso(e.icono + ' ' + e.nombre, e.texto);
};


return API;

})();
