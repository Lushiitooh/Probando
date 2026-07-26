/* =========================================================================
   Pokechill — Panel del asesor de combate
   ========================================================================= */

var Paneles4 = (function () {

'use strict';

const API = {};
const abrir = (t, c) => Paneles.abrir(t, c);
const esc = s => String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function nom(x) { try { return format(x); } catch (e) { return String(x); } }
const nombreTipo = t => (typeof ES !== 'undefined' && ES.tipo && ES.tipo[t]) || t;

let ultimaRecomendacion = null;


/* ---------------------------------------------------- RECOMENDAR EQUIPO */

API.recomendar = function (idArea) {
    const rec = Asesor.recomendar(idArea);
    if (!rec) { abrir('Asesor', '<p>No se pudo analizar esta zona.</p>'); return; }
    if (rec.aviso) { abrir('Asesor', '<p>' + esc(rec.aviso) + '</p>'); return; }

    ultimaRecomendacion = rec;
    const p = rec.pelea;

    let html = '<div class="resumen-extra">Contra <strong>' + esc(p.nombre) + '</strong>' +
        (p.esEntrenador ? ' (entrenador)' : '') + ' · nivel ~' + p.nivel + '<br>' +
        '<small>Tipos del rival: ' + (p.tiposOrdenados.length
            ? p.tiposOrdenados.slice(0, 5).map(t => esc(nombreTipo(t))).join(', ')
            : 'desconocidos') + '</small></div>';

    html += '<div class="lista-asesor">';
    for (const c of rec.equipo) {
        const pk = pkmn[c.id];
        const tiposMov = [...new Set(c.movs.map(m => move[m] && move[m].type).filter(Boolean))];

        html += '<div class="asesor-fila">' +
            '<img alt="" class="asesor-sprite" src="img/pkmn/' + (pk.shiny ? 'shiny' : 'sprite') + '/' + c.id + '.png">' +
            '<div class="asesor-datos">' +
              '<strong>' + esc(nom(c.id)) + '</strong> <small>nv ' + (pk.level || 1) + '</small>' +
              '<div class="asesor-movs">' + c.movs.map((m, i) =>
                  '<span class="asesor-mov" title="' + esc(nombreTipo(move[m] ? move[m].type : '')) + '">' +
                  (i + 1) + '. ' + esc(nom(m)) + '</span>').join('') + '</div>' +
              '<small class="asesor-nota">' +
                 tiposMov.length + ' tipos distintos en la rotación' +
                 (c.item ? ' · objeto: <strong>' + esc(nom(c.item)) + '</strong>' : ' · sin objeto') +
              '</small>' +
            '</div></div>';
    }
    html += '</div>';

    html += '<div class="resumen-extra"><small>Los movimientos van en el orden calculado: ' +
            'ese orden es lo que activa la Potencia Cruzada.</small></div>';

    html += '<div style="text-align:center">' +
        '<button type="button" class="boton-renacer" onclick="Paneles4.aplicar()">Aplicar este equipo</button> ' +
        '<button type="button" class="boton-cancelar" onclick="closeTooltip()">Cancelar</button></div>';

    abrir('Equipo recomendado', html);
};

API.aplicar = function () {
    if (!ultimaRecomendacion) return;
    const ok = Asesor.aplicar(ultimaRecomendacion);
    if (ok) {
        Extras.aviso('✔ Equipo aplicado', 'Movimientos y objetos ajustados para esta pelea');
        try { closeTooltip(); } catch (e) {}
    }
};


/* ----------------------------------------------------- SOLO LOS OBJETOS */

API.equiparObjetos = function () {
    const r = Asesor.equiparObjetosDelEquipo();
    if (r.aviso) { Extras.aviso('Sin equipo', r.aviso); return; }

    abrir('Objetos equipados',
        '<div class="resumen-extra">' + r.cambiados + ' de ' + r.total +
        ' miembros han cambiado de objeto.</div>' +
        '<div class="tabla-extra">' + r.seleccion.map(s =>
            '<div><span>' + esc(nom(s.id)) + '</span><strong>' +
            (s.item ? esc(nom(s.item)) : '—') + '</strong></div>').join('') + '</div>' +
        '<div class="resumen-extra"><small>Se reparten según cuántas copias tienes: ' +
        'si solo posees una, la lleva quien más la aprovecha.</small></div>');
};


/* ----------------------------------------------- COMPARAR CON LO ACTUAL */

API.comparar = function () {
    const pelea = Asesor.analizarPelea(saved.currentAreaBuffer || saved.currentArea);
    if (!pelea) { abrir('Asesor', '<p>Entra en una zona primero.</p>'); return; }

    const destino = saved.previewTeams[saved.currentPreviewTeam];
    const filas = [];
    for (const s of ['slot1','slot2','slot3','slot4','slot5','slot6']) {
        const id = destino[s].pkmn;
        if (!id || !pkmn[id]) continue;
        const actual = Object.values(pkmn[id].moves).filter(Boolean);
        const mejor = Asesor.mejoresMovimientos(id, pelea);
        if (!mejor) continue;

        // valor de la rotación actual con la misma vara de medir
        const vActual = actual.length
            ? actual.reduce((a, m) => a + Asesor.danoMovimiento(pkmn[id], m, pelea), 0) / actual.length
            : 0;
        filas.push({ id, mejora: vActual > 0 ? Math.round((mejor.valor / vActual - 1) * 100) : null,
                     movs: mejor.movs });
    }

    abrir('¿Puedo mejorar mi equipo?',
        filas.length
          ? '<div class="resumen-extra">Comparado con lo que llevas ahora contra <strong>' +
            esc(pelea.nombre) + '</strong>.</div>' +
            '<div class="tabla-extra">' + filas.map(f =>
              '<div><span>' + esc(nom(f.id)) + '</span><strong class="' +
              (f.mejora > 10 ? 'gana' : '') + '">' +
              (f.mejora === null ? 'sin datos' : (f.mejora > 0 ? '+' + f.mejora + '%' : 'ya óptimo')) +
              '</strong></div>').join('') + '</div>' +
            '<div style="text-align:center;margin-top:.6rem">' +
            '<button type="button" class="boton-renacer" onclick="Paneles4.recomendar()">Ver equipo recomendado</button></div>'
          : '<p>No tienes equipo montado.</p>');
};


return API;

})();
