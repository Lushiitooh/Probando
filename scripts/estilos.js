/* =========================================================================
   ESTILOS DE ROTACIÓN — el eje TIEMPO
   =========================================================================
   La rotación tenía el eje "qué tipo" (Potencia Cruzada) pero no el eje
   "a qué ritmo". Cada uno de los 4 huecos lleva ahora un estilo que cambia
   a la vez el temporizador y la fuerza, en direcciones opuestas.

   POR QUÉ ESTOS NÚMEROS Y NO OTROS
   La fórmula real del juego (explore.js:2688) es:

     totalPower = ( movePower + max(0, atk*30*1.1^iv - def*30) ) * (1 + nivel*0.1)

   movePower está FUERA del max(), así que la defensa NUNCA anula el golpe:
   solo cancela el término de estadísticas. Por eso un multiplicador aplicado
   sobre totalPower se cancelaría en el cociente daño/tiempo y Ágil ganaría
   siempre por un 2,5 %: no habría decisión, solo aritmética.

   La solución es aplicar el estilo al LADO ATACANTE dentro del max()
   —movePower y attackerStars a la vez— y darle a Fuerte penetración de
   defensa explícita. Así el muro de la defensa no escala con el estilo y
   aparece un punto de cruce real:

     rival con 1-2 estrellas de defensa  -> Ágil
     rival con 3 estrellas o más         -> Fuerte

   Que es justo la mitad de la escala 1-6, así que hay que mirar al rival
   antes de entrar.
   ========================================================================= */

var Estilos = (function () {

const API = {};

const TABLA = {
    // Los tres básicos: el eje velocidad/fuerza.
    N: { tiempo: 1.00, dano: 1.00, defensa: 1.00, nombre: 'Normal',  icono: '=', desc: 'Sin cambios' },
    A: { tiempo: 0.65, dano: 0.72, defensa: 1.00, nombre: 'Ágil',    icono: '»', desc: 'Rápido y flojo. Gana contra defensa 1-2★' },
    F: { tiempo: 1.60, dano: 1.40, defensa: 0.50, nombre: 'Fuerte',  icono: '¶', desc: 'Lento y duro, atraviesa defensa. Gana de 3★ en adelante' },

    // Los tres avanzados: cada uno se paga con algo distinto. Piden 600 usos.
    // Preciso cambia daño fijo por daño variable: mismo promedio, mucha varianza.
    P: { tiempo: 1.00, dano: 1.00, defensa: 1.00, nombre: 'Preciso', icono: '×', avanzado: true,
         critProb: 0.30, critMult: 2.2, critFallo: 0.55,
         desc: '30 % de golpe crítico x2,2, pero el resto pega flojo. Casi el mismo promedio con mucha más varianza' },

    // Cadena renuncia a fuerza bruta para reforzar la Potencia Cruzada, que
    // es el motor real del juego: premia rotaciones de cuatro tipos distintos.
    C: { tiempo: 1.00, dano: 0.85, defensa: 1.00, nombre: 'Cadena',  icono: '∞', avanzado: true,
         cruceExtra: 0.45, desc: '-15 % de fuerza, pero la Potencia Cruzada sube de x1,3 a x1,75' },

    // Torrente sube solo si repites tipo: es el estilo ANTI-cruce, para
    // equipos monotipo que hoy no tienen nada que los premie.
    T: { tiempo: 0.90, dano: 0.80, defensa: 1.00, nombre: 'Torrente', icono: '↑', avanzado: true,
         acumula: 0.22, tope: 5, desc: 'Empieza flojo pero +22 % acumulable si repites el mismo tipo' },
};
API.TABLA = TABLA;

// usos del movimiento necesarios para poder cambiarle el estilo
const UMBRAL = 200;            // básicos
const UMBRAL_AVANZADO = 600;   // Preciso, Cadena y Torrente
API.UMBRAL = UMBRAL;
API.UMBRAL_AVANZADO = UMBRAL_AVANZADO;

API.init = function () {
    if (!saved.estilos) saved.estilos = {};
    if (!saved.estilosUsos) saved.estilosUsos = {};
};

/** Usos acumulados de un movimiento. La fuente buena es la maestría. */
API.usos = function (idMov) {
    let a = 0;
    try { if (typeof Progreso2 !== 'undefined') a = Progreso2.Maestria.estado()[idMov] || 0; } catch (e) {}
    const b = (saved.estilosUsos && saved.estilosUsos[idMov]) || 0;
    return Math.max(a, b);
};

API.desbloqueado = function (idMov, letra) {
    if (!idMov || !move[idMov] || !(move[idMov].power > 0)) return false;
    const u = API.usos(idMov);
    if (letra && TABLA[letra] && TABLA[letra].avanzado) return u >= UMBRAL_AVANZADO;
    return u >= UMBRAL;
};

/** Respaldo por si Progreso2 no estuviera cargado. Se capa para no crecer. */
API.contar = function (idMov) {
    if (!idMov || !saved.estilosUsos) return;
    const u = saved.estilosUsos[idMov] || 0;
    if (u < UMBRAL) saved.estilosUsos[idMov] = u + 1;
};

/** Letra guardada para un hueco (1..4) de una especie. */
API.leer = function (idEspecie, hueco) {
    const s = saved.estilos && saved.estilos[idEspecie];
    if (!s || hueco < 1 || hueco > 4) return 'N';
    const c = s.charAt(hueco - 1);
    return TABLA[c] ? c : 'N';
};

/**
 * Letra que se aplica de verdad. Degrada a Normal si el movimiento que hay
 * AHORA en ese hueco no está desbloqueado: el hueco guarda el estilo, pero
 * el movimiento puede haber cambiado desde entonces.
 */
API.efectivo = function (idEspecie, hueco, idMov) {
    const c = API.leer(idEspecie, hueco);
    if (c === 'N') return 'N';
    return API.desbloqueado(idMov, c) ? c : 'N';
};

API.escribir = function (idEspecie, hueco, letra) {
    if (!TABLA[letra] || hueco < 1 || hueco > 4) return;
    if (!saved.estilos) saved.estilos = {};
    const act = (saved.estilos[idEspecie] || 'NNNN').padEnd(4, 'N');
    saved.estilos[idEspecie] = act.substring(0, hueco - 1) + letra + act.substring(hueco);
};

/** Normal -> Ágil -> Fuerte -> Normal */
API.ORDEN = ['N', 'A', 'F', 'P', 'C', 'T'];

API.ciclar = function (idEspecie, hueco, idMov) {
    if (!API.desbloqueado(idMov)) return 'N';
    const act = API.leer(idEspecie, hueco);
    let i = API.ORDEN.indexOf(act);
    // se salta lo que aún no esté desbloqueado, hasta dar la vuelta entera
    for (let n = 0; n < API.ORDEN.length; n++) {
        i = (i + 1) % API.ORDEN.length;
        const c = API.ORDEN[i];
        if (c === 'N' || API.desbloqueado(idMov, c)) { API.escribir(idEspecie, hueco, c); return c; }
    }
    API.escribir(idEspecie, hueco, 'N');
    return 'N';
};

/**
 * Multiplicador del temporizador. CAMINO CALIENTE: se consulta muchas veces
 * por segundo y hasta diez veces más con el acelerador, así que aquí no hay
 * DOM, ni try/catch, ni nada que no sea leer un objeto.
 */
API.multTiempo = function (idEspecie, hueco, idMov) {
    const c = API.efectivo(idEspecie, hueco, idMov);
    return TABLA[c].tiempo;
};

/* --- estado vivo de los estilos avanzados, solo dentro de un combate --- */
let racha = { tipo: null, n: 0 };   // Torrente
API.ultimoCrit = false;             // Preciso, para que la interfaz lo pueda avisar

API.reiniciarCombate = function () { racha = { tipo: null, n: 0 }; API.ultimoCrit = false; };

/**
 * Multiplicadores de daño y penetración, una vez por golpe.
 * Aquí viven los tres estilos avanzados, que no son simples multiplicadores:
 *   Preciso  tira un crítico
 *   Torrente acumula si repites tipo
 *   Cadena   refuerza la Potencia Cruzada (se aplica fuera, ver multCruce)
 */
API.mods = function (idEspecie, hueco, idMov, tipoMov) {
    const c = API.efectivo(idEspecie, hueco, idMov);
    const t = TABLA[c];
    let dano = t.dano;
    API.ultimoCrit = false;

    if (c === 'P') {
        // mismo promedio que Normal (0.7 + 0.3*2.2 = 1.36... se compensa)
        if (rng(t.critProb)) { dano *= t.critMult; API.ultimoCrit = true; }
        else dano *= t.critFallo;
    }

    if (c === 'T') {
        if (tipoMov && racha.tipo === tipoMov) racha.n = Math.min(t.tope, racha.n + 1);
        else { racha.tipo = tipoMov; racha.n = 0; }
        dano *= (1 + racha.n * t.acumula);
    } else if (tipoMov) {
        // cualquier otro estilo corta la racha de Torrente
        racha.tipo = tipoMov; racha.n = 0;
    }

    return { dano: dano, defensa: t.defensa, letra: c };
};

/** Bonus extra a la Potencia Cruzada que aporta el estilo Cadena. */
API.multCruce = function (idEspecie, hueco, idMov) {
    const c = API.efectivo(idEspecie, hueco, idMov);
    return TABLA[c].cruceExtra || 0;
};

/** Estado de la racha de Torrente, para enseñarlo. */
API.rachaActual = () => ({ tipo: racha.tipo, n: racha.n });

/** Texto de ayuda para la interfaz. */
API.consejo = function (estrellasDefensaRival) {
    if (estrellasDefensaRival >= 3) return 'Este rival tiene la defensa alta: Fuerte rinde más.';
    return 'Este rival tiene la defensa baja: Ágil rinde más.';
};


/* ------------------------------------------------------------- interfaz */

/**
 * Pinta la insignia de estilo en una caja de movimiento del menú de equipo.
 * Se llama justo después de crear la caja, en teams.js.
 */
API.pintarInsignia = function (caja, idEspecie, hueco, idMov) {
    if (!caja || !idMov) return;
    const desbloq = API.desbloqueado(idMov);
    const letra = API.efectivo(idEspecie, hueco, idMov);
    const t = TABLA[letra];

    const b = document.createElement('span');
    b.className = 'insignia-estilo' + (desbloq ? '' : ' bloqueada') + ' estilo-' + letra;
    b.textContent = t.icono;
    b.title = desbloq
        ? t.nombre + ' — pulsa para cambiar (tiempo x' + t.tiempo + ', fuerza x' + t.dano +
          (t.defensa < 1 ? ', atraviesa defensa' : '') + ')'
        : 'Estilo bloqueado: usa este movimiento ' + API.UMBRAL + ' veces (llevas ' + API.usos(idMov) + ')';

    if (desbloq) {
        b.addEventListener('click', ev => {
            ev.stopPropagation();
            API.ciclar(idEspecie, hueco, idMov);
            if (typeof updatePreviewTeam === 'function') updatePreviewTeam();
        });
    }
    caja.appendChild(b);
};

/** Consejo contextual: qué estilo conviene contra la zona a la que vas a entrar. */
API.consejoZona = function () {
    const z = areas[saved.currentAreaBuffer || saved.currentArea];
    if (!z) return '';
    let def = 0, n = 0;
    const mirar = e => { if (e && e.bst) { def += e.bst.def; n++; } };
    if (z.spawns) for (const t in z.spawns) if (Array.isArray(z.spawns[t])) z.spawns[t].forEach(mirar);
    if (z.team) for (const k in z.team) if (/^slot\d+$/.test(k)) mirar(z.team[k]);
    if (!n) return '';
    const media = def / n;
    return media >= 3
        ? 'Defensa media del rival: ' + media.toFixed(1) + '★ — Fuerte rinde más aquí.'
        : 'Defensa media del rival: ' + media.toFixed(1) + '★ — Ágil rinde más aquí.';
};

return API;

})();
