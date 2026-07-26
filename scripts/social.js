/* =========================================================================
   Pokechill — Social, presentación y accesibilidad
   =========================================================================
   Ideas 44-60 de IDEAS-2.md.
   ========================================================================= */

var Social = (function () {

'use strict';

const API = {};
const E = Extras;
function nom(x) { try { return format(x); } catch (e) { return String(x); } }


/* ======================================================================
   44. CÓDIGO DE BUILD COMPARTIBLE  ·  49. IMPORTAR EQUIPOS AJENOS
   ====================================================================== */

API.exportarBuild = function () {
    const equipo = [];
    for (const s of ['slot1','slot2','slot3','slot4','slot5','slot6']) {
        const t = saved.previewTeams[saved.currentPreviewTeam][s];
        if (!t.pkmn || !pkmn[t.pkmn]) continue;
        const p = pkmn[t.pkmn];
        equipo.push({ p: t.pkmn, l: p.level, i: t.item || null,
                      m: Object.values(p.moves).filter(Boolean), s: !!p.shiny });
    }
    if (!equipo.length) return null;
    try { return btoa(unescape(encodeURIComponent(JSON.stringify({ v: 1, e: equipo })))); }
    catch (e) { return null; }
};

API.leerBuild = function (codigo) {
    try {
        const d = JSON.parse(decodeURIComponent(escape(atob(String(codigo).trim()))));
        if (!d || !Array.isArray(d.e)) return null;
        return d.e.filter(x => x.p && pkmn[x.p]);
    } catch (e) { return null; }
};

/** Prueba una build ajena en el simulador sin aplicarla a tu partida. */
API.probarBuild = function (codigo, idArea) {
    const equipo = API.leerBuild(codigo);
    if (!equipo) return null;
    if (typeof Asesor === 'undefined') return null;

    const pelea = Asesor.analizarPelea(idArea || saved.currentArea || 'wildlifePark');
    if (!pelea) return null;

    return equipo.map(e => {
        // se simula con los datos del código, no con los tuyos
        const original = pkmn[e.p];
        const guardado = { level: original.level, moves: { ...original.moves } };
        original.level = e.l || original.level;
        original.moves = { slot1: e.m[0] || null, slot2: e.m[1] || null,
                           slot3: e.m[2] || null, slot4: e.m[3] || null };
        let dpm = 0;
        try { const r = Combate2.simular(e.p); dpm = r ? r.dpm : 0; } catch (err) {}
        original.level = guardado.level;
        original.moves = guardado.moves;
        return { id: e.p, nivel: e.l, objeto: e.i, dpm };
    });
};

API.aplicarBuild = function (codigo) {
    const equipo = API.leerBuild(codigo);
    if (!equipo) { E.aviso('Código no válido'); return false; }
    const destino = saved.previewTeams[saved.currentPreviewTeam];
    const slots = ['slot1','slot2','slot3','slot4','slot5','slot6'];
    let aplicados = 0, faltan = [];

    for (let i = 0; i < slots.length; i++) {
        const e = equipo[i];
        if (!e) { destino[slots[i]].pkmn = undefined; destino[slots[i]].item = undefined; continue; }
        if (!pkmn[e.p].caught) { faltan.push(nom(e.p)); continue; }   // no regala Pokémon
        destino[slots[i]].pkmn = e.p;
        destino[slots[i]].item = (e.i && item[e.i] && item[e.i].got > 0) ? e.i : undefined;
        if (Array.isArray(e.m)) {
            pkmn[e.p].moves.slot1 = e.m[0] || null;
            pkmn[e.p].moves.slot2 = e.m[1] || null;
            pkmn[e.p].moves.slot3 = e.m[2] || null;
            pkmn[e.p].moves.slot4 = e.m[3] || null;
        }
        aplicados++;
    }
    if (typeof updatePreviewTeam === 'function') updatePreviewTeam();
    E.sonar('boton');
    E.aviso('📥 Build aplicada', aplicados + ' miembros' +
            (faltan.length ? ' · te faltan: ' + faltan.join(', ') : ''));
    return true;
};


/* ======================================================================
   45. RETOS ENTRE AMIGOS  ·  46. TABLA LOCAL POR SEMILLA
   ====================================================================== */

API.retoSemanal = function () {
    const semana = (typeof Extras2 !== 'undefined') ? Extras2.semanaActual()
                 : Math.floor(Date.now() / (7 * 86400000));
    return { semana, objetivo: 'Máximo daño en 10 combates' };
};

API.marcas = function () {
    if (!saved.marcas) saved.marcas = [];
    return saved.marcas;
};

API.anotarMarca = function (valor, etiqueta) {
    const r = API.retoSemanal();
    API.marcas().push({ semana: r.semana, valor, etiqueta: etiqueta || '', cuando: Date.now() });
    if (saved.marcas.length > 60) saved.marcas = saved.marcas.slice(-60);
};

API.tablaLocal = function () {
    const m = API.marcas().slice().sort((a, b) => b.valor - a.valor);
    return m.slice(0, 15);
};

API.codigoReto = function () {
    const r = API.retoSemanal();
    const mejor = API.tablaLocal()[0];
    const d = { v: 1, s: r.semana, m: mejor ? mejor.valor : 0,
                e: (typeof Progreso !== 'undefined') ? Progreso.capturados() : 0 };
    try { return btoa(unescape(encodeURIComponent(JSON.stringify(d)))); } catch (e) { return null; }
};

API.compararReto = function (codigo) {
    let d;
    try { d = JSON.parse(decodeURIComponent(escape(atob(String(codigo).trim())))); }
    catch (e) { return null; }
    const mio = API.tablaLocal()[0];
    const miValor = mio ? mio.valor : 0;
    return {
        mismaSemana: d.s === API.retoSemanal().semana,
        suyo: d.m, mio: miValor,
        gano: miValor > d.m,
        diferencia: Math.abs(miValor - d.m),
    };
};


/* ======================================================================
   47. EXPORTAR EN FORMATO SHOWDOWN
   ====================================================================== */

const NAT_SHOWDOWN = { adamant: 'Adamant', modest: 'Modest', jolly: 'Jolly',
                       relaxed: 'Relaxed', quiet: 'Quiet', bold: 'Bold' };

function nombreIngles(id) {
    // Showdown usa los nombres ingleses; se reconstruyen desde el id
    return String(id).replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, c => c.toUpperCase());
}

API.aShowdown = function () {
    const lineas = [];
    for (const s of ['slot1','slot2','slot3','slot4','slot5','slot6']) {
        const t = saved.previewTeams[saved.currentPreviewTeam][s];
        if (!t.pkmn || !pkmn[t.pkmn]) continue;
        const p = pkmn[t.pkmn];

        let cabecera = nombreIngles(t.pkmn);
        if (p.nickname) cabecera = p.nickname + ' (' + nombreIngles(t.pkmn) + ')';
        if (t.item) cabecera += ' @ ' + nombreIngles(t.item);
        lineas.push(cabecera);

        if (p.ability) lineas.push('Ability: ' + nombreIngles(p.ability));
        lineas.push('Level: ' + (p.level || 1));
        if (p.shiny) lineas.push('Shiny: Yes');
        if (p.nature && NAT_SHOWDOWN[p.nature]) lineas.push(NAT_SHOWDOWN[p.nature] + ' Nature');

        if (p.ivs) {
            // este juego usa IV 0..6; se escalan a 0..31 para que Showdown lo entienda
            const iv = k => Math.round(((p.ivs[k] || 0) / 6) * 31);
            lineas.push('IVs: ' + iv('hp') + ' HP / ' + iv('atk') + ' Atk / ' + iv('def') +
                        ' Def / ' + iv('satk') + ' SpA / ' + iv('sdef') + ' SpD / ' + iv('spe') + ' Spe');
        }
        for (const m of Object.values(p.moves).filter(Boolean)) lineas.push('- ' + nombreIngles(m));
        lineas.push('');
    }
    return lineas.join('\n').trim();
};


/* ======================================================================
   48. TARJETA DE ENTRENADOR
   ====================================================================== */

function cargarImagen(src) {
    return new Promise(res => {
        const i = new Image();
        i.onload = () => res(i); i.onerror = () => res(null); i.src = src;
    });
}

API.tarjeta = async function () {
    const W = 1000, H = 500;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const g = c.getContext('2d');

    const grad = g.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#3d3450'); grad.addColorStop(1, '#1e1a26');
    g.fillStyle = grad; g.fillRect(0, 0, W, H);

    const r = (typeof Progreso !== 'undefined') ? Progreso.rango() : { titulo: '—', nivel: 0 };
    const especies = (typeof Progreso !== 'undefined') ? Progreso.capturados() : 0;
    const vario = (typeof Progreso !== 'undefined') ? Progreso.variocolores() : 0;
    const s = E.stats();

    g.fillStyle = '#fff';
    g.font = 'bold 44px sans-serif';
    g.fillText('Tarjeta de entrenador', 40, 70);

    g.font = 'bold 30px sans-serif';
    g.fillStyle = '#c9a3e6';
    g.fillText(r.titulo + ' · nivel ' + r.nivel, 40, 120);

    g.fillStyle = '#fff';
    g.font = '24px sans-serif';
    const datos = [
        'Especies registradas: ' + especies,
        'Variocolor: ' + vario,
        'Combates ganados: ' + E.formatearNumero(s.combatesGanados),
        'Daño total: ' + E.formatearNumero(s.danoTotal),
        'Renaceres: ' + (saved.prestigios || 0),
        'Tiempo jugado: ' + Math.round((s.segundosJugados || 0) / 3600) + ' h',
    ];
    datos.forEach((d, i) => g.fillText(d, 40, 180 + i * 38));

    // sprites del equipo a la derecha
    g.imageSmoothingEnabled = false;
    let x = 560;
    for (const sl of ['slot1','slot2','slot3','slot4','slot5','slot6']) {
        const t = saved.previewTeams[saved.currentPreviewTeam][sl];
        if (!t.pkmn) continue;
        const img = await cargarImagen('img/pkmn/' + (pkmn[t.pkmn].shiny ? 'shiny' : 'sprite') + '/' + t.pkmn + '.png');
        if (!img) continue;
        const esc = Math.min(130 / img.width, 130 / img.height);
        g.drawImage(img, x, 200, img.width * esc, img.height * esc);
        x += 140;
        if (x > W - 140) { x = 560; }
    }

    g.fillStyle = 'rgba(255,255,255,0.5)';
    g.font = '18px sans-serif';
    g.fillText('Pokechill', W - 130, H - 24);

    try {
        const a = document.createElement('a');
        a.href = c.toDataURL('image/png');
        a.download = 'pokechill-tarjeta.png';
        a.click();
        E.sonar('foto');
        E.aviso('🪪 Tarjeta guardada', 'Revisa tus descargas');
    } catch (e) { E.aviso('No se pudo generar', e.message); }
};


/* ======================================================================
   51. RETRATOS DEL ENTRENADOR RIVAL
   ====================================================================== */

API.retratoRival = function () {
    const a = areas[saved.currentArea];
    if (!a || !a.sprite) return null;
    return 'img/trainers/' + a.sprite + '.png';
};

API.mostrarRetrato = function () {
    if (saved.sinRetratos === true) return;
    const src = API.retratoRival();
    const cont = document.getElementById('content-explore');
    if (!cont) return;

    let el = document.getElementById('retrato-rival');
    if (!src) { if (el) el.remove(); return; }
    if (!el) {
        el = document.createElement('img');
        el.id = 'retrato-rival';
        el.alt = '';
        el.className = 'retrato-rival';
        cont.appendChild(el);
    }
    if (el.getAttribute('src') !== src) el.setAttribute('src', src);
};


/* ======================================================================
   53. MODO CINE  ·  54. TRANSICIONES
   ====================================================================== */

API.modoCine = function (activar) {
    const on = activar === undefined ? !document.body.classList.contains('modo-cine') : activar;
    document.body.classList.toggle('modo-cine', on);
    saved.modoCine = on;
    E.aviso(on ? '🎬 Modo cine' : 'Modo cine desactivado',
            on ? 'Pulsa la tecla C para salir' : '');
};

API.transicion = function () {
    if (saved.sinAnimaciones === true) return;
    let v = document.getElementById('velo-transicion');
    if (!v) {
        v = document.createElement('div');
        v.id = 'velo-transicion';
        document.body.appendChild(v);
    }
    v.classList.remove('activo');
    void v.offsetWidth;
    v.classList.add('activo');
};


/* ======================================================================
   55. MÚSICA PROCEDURAL POR BIOMA
   ======================================================================
   Coherente con el audio sintetizado: melodías generadas, cero archivos.
   ====================================================================== */

const ESCALAS = {
    forest:   [261.63, 293.66, 329.63, 392.00, 440.00],          // pentatónica mayor
    cave:     [220.00, 246.94, 261.63, 329.63, 349.23],          // menor, más grave
    volcano:  [293.66, 311.13, 349.23, 415.30, 466.16],          // tensa
    sea:      [261.63, 293.66, 349.23, 392.00, 466.16],
    snow:     [329.63, 369.99, 415.30, 493.88, 554.37],          // aguda y cristalina
    space:    [196.00, 233.08, 261.63, 311.13, 349.23],
    town:     [261.63, 329.63, 392.00, 440.00, 523.25],
};

let temporizadorMusica = null;

API.pararMusica = function () {
    if (temporizadorMusica) { clearInterval(temporizadorMusica); temporizadorMusica = null; }
};

API.tocarMusica = function () {
    API.pararMusica();
    if (saved.musica !== true) return;
    if (typeof Extras === 'undefined' || Extras.volumen() === 0) return;

    const a = areas[saved.currentArea];
    const bioma = (a && a.background) || 'town';
    const escala = ESCALAS[bioma] || ESCALAS.town;
    let paso = 0;

    temporizadorMusica = setInterval(() => {
        if (Extras.volumen() === 0 || saved.musica !== true) { API.pararMusica(); return; }
        if (document.hidden) return;
        // melodía sencilla: camina por la escala con algo de azar
        paso += (Math.random() < 0.5 ? 1 : -1) + (Math.random() < 0.2 ? 2 : 0);
        paso = ((paso % escala.length) + escala.length) % escala.length;
        const f = escala[paso] * (Math.random() < 0.15 ? 2 : 1);
        Extras.sonar('__nota__');
        API.nota(f);
    }, 900);
};

/** Nota suave, con envolvente larga para que no moleste. */
API.nota = function (frec) {
    try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!API._ctx) API._ctx = new AC();
        const c = API._ctx;
        if (c.state === 'suspended') c.resume();
        const o = c.createOscillator(), v = c.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(frec, c.currentTime);
        const vol = 0.06 * Extras.volumen();
        v.gain.setValueAtTime(0.0001, c.currentTime);
        v.gain.exponentialRampToValueAtTime(vol, c.currentTime + 0.12);
        v.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.85);
        o.connect(v); v.connect(c.destination);
        o.start(); o.stop(c.currentTime + 0.9);
    } catch (e) {}
};


/* ======================================================================
   56-58. TECLADO, ATAJOS Y MODO UNA MANO
   ====================================================================== */

const ATAJOS_POR_DEFECTO = {
    t: { nombre: 'Equipo',           accion: () => switchMenu('team') },
    v: { nombre: 'Viajar',           accion: () => switchMenu('travel') },
    d: { nombre: 'Pokédex',          accion: () => switchMenu('dex') },
    o: { nombre: 'Objetos',          accion: () => switchMenu('items') },
    a: { nombre: 'Ajustes',          accion: () => switchMenu('settings') },
    r: { nombre: 'Equipo recomendado', accion: () => { if (typeof Paneles4 !== 'undefined') Paneles4.recomendar(); } },
    q: { nombre: '¿Qué hago ahora?', accion: () => { if (typeof Paneles5 !== 'undefined') Paneles5.consejo(); } },
    c: { nombre: 'Modo cine',        accion: () => API.modoCine() },
};
API.ATAJOS = ATAJOS_POR_DEFECTO;

let atajosInstalados = false;

API.instalarAtajos = function () {
    if (atajosInstalados) return;
    atajosInstalados = true;
    document.addEventListener('keydown', e => {
        if (saved.sinAtajos === true) return;
        // no interferir mientras se escribe
        const t = e.target;
        if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
        if (e.ctrlKey || e.altKey || e.metaKey) return;

        const k = e.key.toLowerCase();
        const a = ATAJOS_POR_DEFECTO[k];
        if (!a) return;
        e.preventDefault();
        try { a.accion(); } catch (err) {}
    });
};

API.modoUnaMano = function (activar) {
    const on = activar === undefined ? !document.body.classList.contains('una-mano') : activar;
    document.body.classList.toggle('una-mano', on);
    saved.unaMano = on;
};


/* ======================================================================
   59. NARRACIÓN PARA LECTOR DE PANTALLA
   ====================================================================== */

let regionAria = null;
let ultimoAnuncio = 0;

function region() {
    if (regionAria && regionAria.isConnected) return regionAria;
    regionAria = document.createElement('div');
    regionAria.id = 'narracion-combate';
    regionAria.setAttribute('aria-live', 'polite');
    regionAria.setAttribute('aria-atomic', 'true');
    regionAria.className = 'solo-lector';
    document.body.appendChild(regionAria);
    return regionAria;
}

API.narrar = function (texto) {
    if (saved.narracion !== true) return;
    const ahora = Date.now();
    if (ahora - ultimoAnuncio < 2500) return;   // no saturar al lector
    ultimoAnuncio = ahora;
    region().textContent = texto;
};

API.narrarCombate = function (atacante, movimiento, dano, eficacia) {
    let t = nom(atacante) + ' usa ' + nom(movimiento);
    if (eficacia > 1) t += ', es supereficaz';
    else if (eficacia === 0) t += ', no tiene efecto';
    else if (eficacia < 1) t += ', es poco eficaz';
    t += '. ' + E.formatearNumero(dano) + ' de daño.';
    API.narrar(t);
};


/* ======================================================================
   60. MODO LECTURA FÁCIL
   ====================================================================== */

const SIMPLIFICACIONES = [
    [/multiplica(?:n)? su potencia base por x?([\d.]+)/gi, 'pega $1 veces más'],
    [/se ejecutan? (?:el doble de rápido|x2 más rápido)/gi, 'ataca el doble de rápido'],
    [/reduce a la mitad el daño recibido de/gi, 'recibe la mitad de daño de'],
    [/aumenta la bonificación por tipo \(STAB\)/gi, 'pega más con su propio tipo'],
    [/anula los movimientos de tipo (\w+) recibidos/gi, 'no recibe daño de tipo $1'],
    [/por debajo del 50% de PS/gi, 'cuando le queda poca vida'],
    [/probabilidad de infligir/gi, 'posibilidad de causar'],
    [/característica/gi, 'estadística'],
];

API.simplificar = function (texto) {
    if (saved.lecturaFacil !== true) return texto;
    let t = String(texto);
    for (const [de, a] of SIMPLIFICACIONES) t = t.replace(de, a);
    return t;
};


return API;

})();
