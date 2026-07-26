/* =========================================================================
   Pokechill — Paneles de historia, jefe semanal y eventos
   ========================================================================= */

var Paneles3 = (function () {

'use strict';

const API = {};
const abrir = (t, c) => Paneles.abrir(t, c);
const esc = s => String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function nom(x) { try { return format(x); } catch (e) { return String(x); } }


/* ------------------------------------------------------------- HISTORIA */

API.historia = function (idCapitulo) {
    const disponibles = Extras2.capitulosDisponibles();
    if (!disponibles.length) { abrir('Historia', '<p>Aún no has desbloqueado ningún capítulo.</p>'); return; }

    const cap = idCapitulo
        ? Extras2.CAPITULOS.find(c => c.id === Number(idCapitulo))
        : disponibles[disponibles.length - 1];

    let html = '<div class="capitulo-texto">' + cap.texto + '</div>';
    html += '<div class="indice-capitulos">';
    for (const c of Extras2.CAPITULOS) {
        const abierto = disponibles.some(d => d.id === c.id);
        html += abierto
            ? '<button type="button" class="cap-boton' + (c.id === cap.id ? ' activo' : '') +
              '" onclick="Paneles3.historia(' + c.id + ')">' + c.id + '. ' + esc(c.titulo) + '</button>'
            : '<button type="button" class="cap-boton bloqueado" disabled>🔒 Capítulo ' + c.id + '</button>';
    }
    html += '</div>';
    abrir('📖 ' + esc(cap.titulo), html);
};


/* -------------------------------------------------------- JEFE SEMANAL */

API.jefe = function () {
    const j = Extras2.jefeSemanal();
    const pct = j.recordPropio ? Math.min(100, j.recordPropio / j.vida * 100) : 0;

    abrir('Jefe de la semana',
        '<div class="resumen-extra">Cada semana el juego elige el mismo jefe para todo el mundo, ' +
        'usando la semana como semilla. No hay servidor: la marca es tuya y se comparte contándola.</div>' +
        '<div class="jefe-ficha">' +
        '<img alt="" class="jefe-sprite" src="img/pkmn/sprite/' + j.id + '.png">' +
        '<div><strong>' + esc(nom(j.id)) + '</strong><br>' +
        '<small>Nivel ' + j.nivel + ' · ' + Extras.formatearNumero(j.vida) + ' PS</small></div></div>' +
        '<div class="barra-mision"><div style="width:' + pct.toFixed(1) + '%"></div></div>' +
        '<div class="tabla-extra">' +
        '<div><span>Tu mejor daño esta semana</span><strong>' + Extras.formatearNumero(j.recordPropio) + '</strong></div>' +
        '<div><span>Porcentaje de su vida</span><strong>' + pct.toFixed(2) + '%</strong></div>' +
        '<div><span>Semana</span><strong>#' + j.semana + '</strong></div>' +
        '</div>' +
        '<p><small>Tu daño en combate cuenta automáticamente para la marca.</small></p>');
};


/* ------------------------------------------------------------- EVENTOS */

API.eventos = function () {
    const act = Extras2.eventosActivos();
    abrir('Eventos activos',
        act.length
          ? '<div class="lista-logros">' + act.map(e =>
              '<div class="logro hecho"><span class="logro-icono">' + e.icono + '</span>' +
              '<span class="logro-texto"><strong>' + esc(e.nombre) + '</strong><br>' +
              '<small>' + esc(e.texto) + '</small></span></div>').join('') + '</div>'
          : '<p>No hay ningún evento activo ahora mismo.</p>' +
            '<div class="resumen-extra">Los eventos se activan solos según el día, ' +
            'el mes o la fase del calendario. Vuelve otro día.</div>');
};


/* ----------------------------------------------------------- FOTOGRAFÍA */

API.foto = function () {
    abrir('Modo fotografía',
        '<div class="resumen-extra">Compone una imagen con tu equipo y el fondo de la zona actual, ' +
        'y la descarga como PNG.</div>' +
        '<div style="text-align:center"><button type="button" class="boton-renacer" ' +
        'onclick="Extras2.hacerFoto()">Hacer foto</button></div>');
};


return API;

})();
