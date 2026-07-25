/* =========================================================================
   Pokechill — Paneles de interfaz de los sistemas nuevos
   =========================================================================
   Todo se pinta dentro del tooltip que el juego ya usa, así hereda estilo,
   posición y el cierre con Escape sin reinventar nada.
   ========================================================================= */

var Paneles = (function () {

'use strict';

const API = {};
const E = Extras;
const P = Progreso;

function abrir(titulo, cuerpo) {
    document.getElementById('tooltipTop').style.display = 'none';
    document.getElementById('tooltipMid').style.display = 'none';
    document.getElementById('tooltipTitle').style.display = 'block';
    document.getElementById('tooltipTitle').innerHTML = titulo;
    document.getElementById('tooltipBottom').style.display = 'block';
    document.getElementById('tooltipBottom').innerHTML = cuerpo;
    openTooltip();
}
API.abrir = abrir;

const esc = s => String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));


/* ---------------------------------------------------------- ESTADÍSTICAS */

function tiempoLegible(seg) {
    const h = Math.floor(seg / 3600), m = Math.floor((seg % 3600) / 60);
    if (h > 0) return h + ' h ' + m + ' min';
    return m + ' min';
}

API.pintarEstadisticas = function () {
    const s = E.stats();
    const r = P.rango();
    const filas = [
        ['Rango', r.titulo + ' · nivel ' + r.nivel],
        ['Especies registradas', P.capturados() + ' / ' + Object.keys(pkmn).length],
        ['Pokémon variocolor', P.variocolores()],
        ['Pokémon a nivel 100', P.nivel100()],
        ['Combates ganados', E.formatearNumero(s.combatesGanados)],
        ['Daño total infligido', E.formatearNumero(s.danoTotal)],
        ['Movimientos ejecutados', E.formatearNumero(s.movimientosEjecutados)],
        ['Niveles subidos', E.formatearNumero(s.nivelesSubidos)],
        ['Objetos conseguidos', E.formatearNumero(s.objetosRecibidos)],
        ['Operaciones genéticas', s.operacionesGeneticas],
        ['Encuentros sin variocolor', s.rachaSinVariocolor],
        ['Planta más alta de la torre', saved.maxSpiralFloor || 1],
        ['Renaceres', saved.prestigios || 0],
        ['Tiempo jugado', tiempoLegible(s.segundosJugados)],
    ];
    abrir('Estadísticas',
        '<div class="tabla-extra">' +
        filas.map(f => '<div><span>' + f[0] + '</span><strong>' + f[1] + '</strong></div>').join('') +
        '</div>');
};


/* ---------------------------------------------------------------- LOGROS */

API.pintarLogros = function () {
    const c = P.conseguidos();
    const total = P.LOGROS.length;
    const hechos = P.LOGROS.filter(l => c[l.id]).length;
    const b = P.bonusLogros();

    const resumenBonus = Object.keys(b).length
        ? Object.entries(b).map(([k, v]) => '+' + v + '% ' + nombreBonus(k)).join(' · ')
        : 'todavía ninguno';

    abrir('Logros · ' + hechos + '/' + total,
        '<div class="resumen-extra">Bonus acumulado: ' + resumenBonus + '</div>' +
        '<div class="lista-logros">' +
        P.LOGROS.map(l => {
            const ok = !!c[l.id];
            const bonus = Object.entries(l.bonus).map(([k, v]) => '+' + v + '% ' + nombreBonus(k)).join(', ');
            return '<div class="' + (ok ? 'logro hecho' : 'logro') + '">' +
                   '<span class="logro-icono">' + (ok ? '🏆' : '🔒') + '</span>' +
                   '<span class="logro-texto"><strong>' + esc(l.nombre) + '</strong><br>' +
                   '<small>' + esc(l.descripcion) + '</small></span>' +
                   '<span class="logro-bonus">' + bonus + '</span></div>';
        }).join('') + '</div>');
};

function nombreBonus(k) {
    return ({ danoPct: 'daño', expPct: 'exp', dropPct: 'objetos', shinyPct: 'variocolor',
              psPct: 'PS', velocidadPct: 'velocidad', geneticaPct: 'genética',
              crucePlano: 'cruce', nivelInicial: 'nivel inicial' })[k] || k;
}


/* ------------------------------------------------------------- PRESTIGIO */

API.pintarPrestigio = function () {
    const esencia = saved.esencia || 0;
    const ganancia = P.esenciaAlRenacer();
    const puede = P.puedeRenacer();
    const especies = P.capturados();

    const ramas = {};
    for (const t of P.TALENTOS) (ramas[t.rama] = ramas[t.rama] || []).push(t);

    let html =
        '<div class="resumen-extra">' +
        '<strong>' + esencia + '</strong> de Esencia disponible · ' +
        '<strong>' + (saved.prestigios || 0) + '</strong> renaceres' +
        '</div>';

    html += '<div class="bloque-renacer">' +
        (puede
          ? '<p>Renacer ahora te daría <strong>' + ganancia + ' de Esencia</strong>.</p>' +
            '<p><small>Se reinician Pokémon, objetos y áreas. Se conservan talentos, logros, estadísticas y Esencia.</small></p>' +
            '<button type="button" class="boton-renacer" onclick="Paneles.confirmarRenacer()">Renacer</button>'
          : '<p>Necesitas <strong>' + P.ESPECIES_PARA_RENACER + '</strong> especies registradas para renacer.<br>' +
            'Llevas <strong>' + especies + '</strong>.</p>') +
        '</div>';

    for (const rama in ramas) {
        html += '<div class="rama-talentos"><h4>' + rama + '</h4>';
        for (const t of ramas[rama]) {
            const n = P.nivelTalento(t.id);
            const coste = P.costeTalento(t.id);
            const max = n >= t.max;
            const puedePagar = isFinite(coste) && esencia >= coste;
            html += '<div class="talento">' +
                '<span class="talento-info"><strong>' + esc(t.nombre) + '</strong> ' +
                '<small>(' + n + '/' + t.max + ')</small><br>' +
                '<small>' + esc(n ? t.efecto(n) : t.efecto(1) + ' por nivel') + '</small></span>' +
                (max
                  ? '<span class="talento-max">MÁX</span>'
                  : '<button type="button" class="talento-boton' + (puedePagar ? '' : ' sin-esencia') + '" ' +
                    'onclick="Progreso.subirTalento(\'' + t.id + '\'); Paneles.pintarPrestigio()">' +
                    coste + ' ✦</button>') +
                '</div>';
        }
        html += '</div>';
    }

    abrir('Prestigio', html);
};

API.confirmarRenacer = function () {
    abrir('¿Renacer?',
        '<div class="bloque-renacer">' +
        '<p>Vas a reiniciar tus Pokémon, objetos y áreas.</p>' +
        '<p>Recibirás <strong>' + P.esenciaAlRenacer() + ' de Esencia</strong>.</p>' +
        '<p><small>Esto no se puede deshacer. Exporta tu partida antes si tienes dudas.</small></p>' +
        '<button type="button" class="boton-renacer" onclick="Progreso.renacer()">Sí, renacer</button> ' +
        '<button type="button" class="boton-cancelar" onclick="Paneles.pintarPrestigio()">Cancelar</button>' +
        '</div>');
};


/* -------------------------------------------------------------- MISIONES */

API.pintarMisiones = function () {
    const ms = P.misiones();
    abrir('Misiones diarias',
        '<div class="resumen-extra">Se renuevan cada día. Cada una da 3 Chapas Plateadas.</div>' +
        '<div class="lista-misiones">' +
        ms.lista.map(m => {
            const hecho = Math.min(P.progresoMision(m), m.meta);
            const pct = Math.round(hecho / m.meta * 100);
            return '<div class="' + (m.hecha ? 'mision hecha' : 'mision') + '">' +
                   '<span>' + (m.hecha ? '✔ ' : '') + esc(P.textoMision(m)) + '</span>' +
                   '<div class="barra-mision"><div style="width:' + pct + '%"></div></div>' +
                   '<small>' + E.formatearNumero(hecho) + ' / ' + E.formatearNumero(m.meta) + '</small></div>';
        }).join('') + '</div>');
};


/* ------------------------------------------------------ COPIAS DE SEGURIDAD */

API.pintarCopias = function () {
    const lista = E.listarCopias();
    abrir('Copias de seguridad',
        '<div class="resumen-extra">El juego guarda automáticamente las 3 últimas copias. ' +
        'Si tu partida se corrompe, puedes volver a una de ellas.</div>' +
        (lista.length
          ? '<div class="lista-copias">' + lista.map(c =>
              '<div class="copia"><span>Copia ' + (c.indice + 1) + ' · ' + c.tamaño + '<br>' +
              '<small>' + new Date(c.fecha).toLocaleString('es-ES') + '</small></span>' +
              '<button type="button" onclick="Paneles.confirmarRestaurar(' + c.indice + ')">Restaurar</button></div>'
            ).join('') + '</div>'
          : '<p>Todavía no hay copias. Se crean solas al guardar.</p>'));
};

API.confirmarRestaurar = function (i) {
    abrir('¿Restaurar copia ' + (i + 1) + '?',
        '<div class="bloque-renacer">' +
        '<p>Tu partida actual se sustituirá por esa copia.</p>' +
        '<button type="button" class="boton-renacer" onclick="Extras.restaurarCopia(' + i + ')">Sí, restaurar</button> ' +
        '<button type="button" class="boton-cancelar" onclick="Paneles.pintarCopias()">Cancelar</button>' +
        '</div>');
};


/* ------------------------------------------------------------- POKÉDEX+ */

API.pintarHitos = function () {
    const c = P.capturados();
    const hitos = [100, 250, 500, 1000];
    abrir('Hitos de Pokédex',
        '<div class="resumen-extra">Llevas <strong>' + c + '</strong> especies registradas.</div>' +
        '<div class="lista-logros">' + hitos.map(h =>
            '<div class="' + (c >= h ? 'logro hecho' : 'logro') + '">' +
            '<span class="logro-icono">' + (c >= h ? '🏆' : '🔒') + '</span>' +
            '<span class="logro-texto"><strong>' + h + ' especies</strong><br>' +
            '<small>' + (c >= h ? 'Conseguido' : 'Te faltan ' + (h - c)) + '</small></span></div>'
        ).join('') + '</div>');
};


return API;

})();
