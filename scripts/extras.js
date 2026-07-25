/* =========================================================================
   Pokechill — Sistemas añadidos
   =========================================================================

   Todo lo nuevo vive aquí para no dispersar cambios por los archivos
   originales. Los archivos del juego solo reciben llamadas puntuales
   (`Extras.algo(...)`), de modo que si este archivo no se carga, el juego
   sigue funcionando exactamente igual que antes.

   Debe cargarse DESPUÉS de los diccionarios y de explore.js.
   ========================================================================= */

var Extras = (function () {

'use strict';

const API = {};


/* ======================================================================
   1. ESTADÍSTICAS DE PARTIDA
   ====================================================================== */

const ESTADISTICAS_BASE = {
    combatesGanados: 0,
    danoTotal: 0,
    capturas: 0,
    especiesNuevas: 0,
    variocolores: 0,
    objetosRecibidos: 0,
    movimientosEjecutados: 0,
    nivelesSubidos: 0,
    operacionesGeneticas: 0,
    segundosJugados: 0,
    plantaMasAlta: 0,
    rachaSinVariocolor: 0,
};

function stats() {
    if (!saved.stats) saved.stats = {};
    for (const k in ESTADISTICAS_BASE) if (saved.stats[k] === undefined) saved.stats[k] = ESTADISTICAS_BASE[k];
    return saved.stats;
}
API.stats = stats;

API.contar = function (clave, cantidad = 1) {
    const s = stats();
    if (s[clave] === undefined) s[clave] = 0;
    s[clave] += cantidad;
};

// El reloj de tiempo jugado avanza solo mientras la pestaña está visible.
setInterval(() => { if (!document.hidden) API.contar('segundosJugados', 1); }, 1000);


/* ======================================================================
   2. COPIAS DE SEGURIDAD ROTATIVAS
   ======================================================================
   El juego guarda en una única clave `gameData`. Si una escritura sale
   corrupta se pierde la partida entera sin vuelta atrás. Aquí se conservan
   las 3 últimas copias buenas, rotando.
   ====================================================================== */

const COPIAS = 3;
const CLAVE_COPIA = 'gameDataBackup';

API.guardarCopia = function () {
    try {
        const actual = localStorage.getItem('gameData');
        if (!actual || actual.length < 50) return;          // no respaldar basura

        const ultima = localStorage.getItem(CLAVE_COPIA + '0');
        if (ultima === actual) return;                       // sin cambios

        for (let i = COPIAS - 1; i > 0; i--) {
            const previa = localStorage.getItem(CLAVE_COPIA + (i - 1));
            if (previa) localStorage.setItem(CLAVE_COPIA + i, previa);
        }
        localStorage.setItem(CLAVE_COPIA + '0', actual);
        localStorage.setItem(CLAVE_COPIA + '0-fecha', new Date().toISOString());
    } catch (e) {
        console.warn('No se pudo guardar la copia de seguridad:', e.message);
    }
};

API.listarCopias = function () {
    const lista = [];
    for (let i = 0; i < COPIAS; i++) {
        const datos = localStorage.getItem(CLAVE_COPIA + i);
        if (!datos) continue;
        lista.push({
            indice: i,
            fecha: localStorage.getItem(CLAVE_COPIA + i + '-fecha') || 'desconocida',
            tamaño: (datos.length / 1024).toFixed(0) + ' KB',
        });
    }
    return lista;
};

API.restaurarCopia = function (indice) {
    const datos = localStorage.getItem(CLAVE_COPIA + indice);
    if (!datos) { alert('Esa copia de seguridad no existe'); return; }
    localStorage.setItem('gameData', datos);
    location.reload();
};


/* ======================================================================
   3. AUDIO
   ======================================================================
   El juego no traía ni un archivo de sonido. En vez de añadir megas de
   assets, se sintetizan los efectos con Web Audio: cero descargas, cero
   problemas de licencia. Arranca en silencio hasta que el jugador lo
   active, como debe ser.
   ====================================================================== */

let ctxAudio = null;

function ctx() {
    if (!ctxAudio) {
        try { ctxAudio = new (window.AudioContext || window.webkitAudioContext)(); }
        catch (e) { return null; }
    }
    if (ctxAudio.state === 'suspended') ctxAudio.resume();
    return ctxAudio;
}

function volumen() {
    const v = Number(saved.volumen);
    return isNaN(v) ? 0 : Math.max(0, Math.min(1, v));
}
API.volumen = volumen;

/** Un tono simple. Todos los efectos se componen de estos. */
function tono({ frec = 440, dur = 0.08, tipo = 'sine', gan = 0.2, barrido = 0 }) {
    const c = ctx();
    if (!c || volumen() === 0) return;

    const osc = c.createOscillator();
    const vol = c.createGain();
    osc.type = tipo;
    osc.frequency.setValueAtTime(frec, c.currentTime);
    if (barrido) osc.frequency.exponentialRampToValueAtTime(Math.max(1, frec + barrido), c.currentTime + dur);

    vol.gain.setValueAtTime(gan * volumen(), c.currentTime);
    vol.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);

    osc.connect(vol); vol.connect(c.destination);
    osc.start(); osc.stop(c.currentTime + dur);
}

const EFECTOS = {
    golpe:      () => tono({ frec: 180, dur: 0.07, tipo: 'square',   gan: 0.12, barrido: -80 }),
    golpeFuerte:() => tono({ frec: 110, dur: 0.14, tipo: 'sawtooth', gan: 0.16, barrido: -60 }),
    critico:    () => { tono({ frec: 900, dur: 0.05, tipo: 'square', gan: 0.12 });
                        setTimeout(() => tono({ frec: 1300, dur: 0.08, tipo: 'square', gan: 0.10 }), 45); },
    captura:    () => { [523, 659, 784].forEach((f, i) =>
                        setTimeout(() => tono({ frec: f, dur: 0.12, tipo: 'triangle', gan: 0.14 }), i * 90)); },
    nivel:      () => { [440, 554, 659, 880].forEach((f, i) =>
                        setTimeout(() => tono({ frec: f, dur: 0.1, tipo: 'triangle', gan: 0.12 }), i * 70)); },
    variocolor: () => { [1046, 1318, 1568, 2093].forEach((f, i) =>
                        setTimeout(() => tono({ frec: f, dur: 0.18, tipo: 'sine', gan: 0.16 }), i * 110)); },
    objeto:     () => tono({ frec: 700, dur: 0.09, tipo: 'triangle', gan: 0.12, barrido: 300 }),
    logro:      () => { [659, 784, 988, 1318].forEach((f, i) =>
                        setTimeout(() => tono({ frec: f, dur: 0.14, tipo: 'triangle', gan: 0.15 }), i * 100)); },
    derrota:    () => tono({ frec: 300, dur: 0.4, tipo: 'sawtooth', gan: 0.14, barrido: -220 }),
    boton:      () => tono({ frec: 600, dur: 0.03, tipo: 'sine', gan: 0.06 }),
};

API.sonar = function (nombre) {
    if (volumen() === 0) return;
    const fx = EFECTOS[nombre];
    if (fx) { try { fx(); } catch (e) {} }
};


/* ======================================================================
   4. NÚMEROS DE DAÑO FLOTANTES
   ====================================================================== */

let ultimoFlotante = 0;

API.numeroFlotante = function (texto, opciones = {}) {
    if (saved.sinAnimaciones === true) return;
    // Durante la recuperación AFK de verdad (varios segundos acumulados) no
    // tiene sentido pintar; en juego normal `afkSeconds` ronda 0 sin llegar a
    // serlo, así que el umbral no puede ser > 0.
    if (typeof afkSeconds !== 'undefined' && afkSeconds > 2) return;

    // A x10 se ejecutan cientos de golpes por segundo: limitar para no
    // ahogar el DOM. 60 ms entre números es suficiente para que se lea.
    const ahora = performance.now();
    if (ahora - ultimoFlotante < 60) return;
    ultimoFlotante = ahora;

    // El sprite del salvaje es el ancla natural, pero durante las
    // transiciones se queda sin caja. Se busca la primera alternativa con
    // tamaño real y, si no hay ninguna, se usa el centro de la pantalla.
    let caja = null;
    for (const id of [opciones.ancla, 'explore-wild-sprite', 'exploe-wild-hp', 'content-explore']) {
        if (!id) continue;
        const el = document.getElementById(id);
        if (!el) continue;
        const c = el.getBoundingClientRect();
        if (c.width > 0 && c.height > 0) { caja = c; break; }
    }
    if (!caja) caja = { left: window.innerWidth / 2, top: window.innerHeight / 3, width: 0, height: 0 };

    const div = document.createElement('div');
    div.className = 'numero-flotante';
    div.textContent = texto;
    div.style.color = opciones.color || '#ffffff';
    div.style.left = (caja.left + caja.width / 2 + (Math.random() * 40 - 20)) + 'px';
    div.style.top  = (caja.top + caja.height / 3) + 'px';
    if (opciones.grande) div.style.fontSize = '2.2rem';

    document.body.appendChild(div);
    setTimeout(() => div.remove(), 900);
};

/** Formatea números grandes: 1234567 -> 1.2M */
API.formatearNumero = function (n) {
    n = Math.round(n);
    if (n < 1000) return String(n);
    if (n < 1e6) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
    if (n < 1e9) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
    return (n / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
};


/* ======================================================================
   5. CONTADOR DE ENCUENTROS SIN VARIOCOLOR
   ====================================================================== */

API.registrarEncuentro = function (esVariocolor) {
    const s = stats();
    if (esVariocolor) {
        API.contar('variocolores');
        s.rachaSinVariocolor = 0;
        API.sonar('variocolor');
        API.aviso('✦ ¡Variocolor!', 'Ha aparecido un Pokémon variocolor');
    } else {
        s.rachaSinVariocolor++;
    }
};


/* ======================================================================
   6. NOTIFICACIONES Y AVISOS EN PANTALLA
   ====================================================================== */

API.pedirPermisoNotificaciones = function () {
    if (!('Notification' in window)) { alert('Tu navegador no admite notificaciones'); return; }
    Notification.requestPermission().then(p => {
        saved.notificaciones = (p === 'granted');
        alert(p === 'granted' ? 'Notificaciones activadas' : 'Notificaciones denegadas');
    });
};

/** Aviso discreto en pantalla; si la pestaña está oculta, notificación del sistema. */
API.aviso = function (titulo, cuerpo = '') {
    if (document.hidden && saved.notificaciones && 'Notification' in window
        && Notification.permission === 'granted') {
        try { new Notification(titulo, { body: cuerpo, icon: 'img/icons/icon.png' }); } catch (e) {}
        return;
    }

    let pila = document.getElementById('pila-avisos');
    if (!pila) {
        pila = document.createElement('div');
        pila.id = 'pila-avisos';
        document.body.appendChild(pila);
    }
    const div = document.createElement('div');
    div.className = 'aviso-extra';
    div.innerHTML = `<strong>${titulo}</strong>${cuerpo ? '<br><span>' + cuerpo + '</span>' : ''}`;
    pila.appendChild(div);
    setTimeout(() => { div.style.opacity = '0'; setTimeout(() => div.remove(), 400); }, 4000);
};


/* ======================================================================
   7. DESHACER EN ACCIONES DESTRUCTIVAS
   ====================================================================== */

let pendienteDeshacer = null;

API.conDeshacer = function (descripcion, aplicar, revertir) {
    aplicar();
    if (pendienteDeshacer) pendienteDeshacer.cerrar();

    const div = document.createElement('div');
    div.className = 'barra-deshacer';
    div.innerHTML = `<span>${descripcion}</span><button type="button">Deshacer</button>`;
    document.body.appendChild(div);

    const cerrar = () => { div.remove(); if (pendienteDeshacer && pendienteDeshacer.div === div) pendienteDeshacer = null; };
    div.querySelector('button').onclick = () => { revertir(); cerrar(); API.sonar('boton'); };

    pendienteDeshacer = { div, cerrar };
    setTimeout(cerrar, 6000);
};


return API;

})();
