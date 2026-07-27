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
    N: { tiempo: 1.00, dano: 1.00, defensa: 1.00, nombre: 'Normal', icono: '=' },
    A: { tiempo: 0.65, dano: 0.72, defensa: 1.00, nombre: 'Ágil',   icono: '»' },
    F: { tiempo: 1.60, dano: 1.40, defensa: 0.50, nombre: 'Fuerte', icono: '¶' },
};
API.TABLA = TABLA;

// usos del movimiento necesarios para poder cambiarle el estilo
const UMBRAL = 200;
API.UMBRAL = UMBRAL;

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

API.desbloqueado = function (idMov) {
    return !!(idMov && move[idMov] && move[idMov].power > 0 && API.usos(idMov) >= UMBRAL);
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
    return API.desbloqueado(idMov) ? c : 'N';
};

API.escribir = function (idEspecie, hueco, letra) {
    if (!TABLA[letra] || hueco < 1 || hueco > 4) return;
    if (!saved.estilos) saved.estilos = {};
    const act = (saved.estilos[idEspecie] || 'NNNN').padEnd(4, 'N');
    saved.estilos[idEspecie] = act.substring(0, hueco - 1) + letra + act.substring(hueco);
};

/** Normal -> Ágil -> Fuerte -> Normal */
API.ciclar = function (idEspecie, hueco, idMov) {
    if (!API.desbloqueado(idMov)) return 'N';
    const orden = ['N', 'A', 'F'];
    const act = API.leer(idEspecie, hueco);
    const sig = orden[(orden.indexOf(act) + 1) % orden.length];
    API.escribir(idEspecie, hueco, sig);
    return sig;
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

/** Multiplicadores de daño y de penetración, una vez por golpe. */
API.mods = function (idEspecie, hueco, idMov) {
    const c = API.efectivo(idEspecie, hueco, idMov);
    return { dano: TABLA[c].dano, defensa: TABLA[c].defensa, letra: c };
};

/** Texto de ayuda para la interfaz. */
API.consejo = function (estrellasDefensaRival) {
    if (estrellasDefensaRival >= 3) return 'Este rival tiene la defensa alta: Fuerte rinde más.';
    return 'Este rival tiene la defensa baja: Ágil rinde más.';
};

return API;

})();
