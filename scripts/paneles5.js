/* =========================================================================
   Pokechill — Paneles de automatización, ascensión, análisis y social
   ========================================================================= */

var Paneles5 = (function () {

'use strict';

const API = {};
const abrir = (t, c) => Paneles.abrir(t, c);
const esc = s => String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function nom(x) { try { return format(x); } catch (e) { return String(x); } }


/* ------------------------------------------------------ AUTOMATIZACIÓN */

API.automatizacion = function () {
    const c = Auto.cfg();
    const p = Auto.progresoObjetivo();

    const interruptor = (clave, etiqueta, nota) =>
        '<div class="talento"><span class="talento-info"><strong>' + etiqueta + '</strong>' +
        (nota ? '<br><small>' + nota + '</small>' : '') + '</span>' +
        '<button type="button" class="talento-boton' + (c[clave] ? '' : ' sin-esencia') + '" ' +
        'onclick="Auto.cfg().' + clave + ' = !Auto.cfg().' + clave + '; Paneles5.automatizacion()">' +
        (c[clave] ? 'ON' : 'OFF') + '</button></div>';

    let html = '<div class="resumen-extra">Todo esto está apagado por defecto. ' +
        'Quien no lo active juega exactamente igual que antes.</div>';

    html += '<div class="rama-talentos"><h4>Perfiles</h4><div class="fila-botones">' +
        Object.keys(Auto.PERFILES).map(k =>
            '<button type="button" class="cap-boton' + (Auto.perfilActual() === k ? ' activo' : '') +
            '" onclick="Auto.aplicarPerfil(\'' + k + '\'); Paneles5.automatizacion()">' +
            esc(Auto.PERFILES[k].nombre) + '</button>').join('') + '</div></div>';

    html += '<div class="rama-talentos"><h4>Interruptores</h4>' +
        interruptor('equipar',   'Auto-equipar al entrar en zona', 'El asesor reparte los objetos solo') +
        interruptor('reciclar',  'Auto-reciclar excedente',        'Cuando sobren más de 3 chapas') +
        interruptor('prestigio', 'Auto-renacer',                   'Al superar ' + c.umbralEsencia + ' de Esencia') +
        '</div>';

    html += '<div class="rama-talentos"><h4>Objetivo actual</h4>' +
        (p ? '<div class="mision' + (p.completo ? ' hecha' : '') + '"><span>' + esc(p.texto) + '</span>' +
             '<div class="barra-mision"><div style="width:' + p.pct + '%"></div></div>' +
             '<small>' + p.hecho + ' / ' + p.meta + '</small></div>' +
             '<div style="text-align:center;margin-top:.4rem"><button type="button" class="boton-cancelar" ' +
             'onclick="Auto.quitarObjetivo(); Paneles5.automatizacion()">Quitar objetivo</button></div>'
           : '<div class="fila-botones">' + Auto.OBJETIVOS.map(o =>
               '<button type="button" class="cap-boton" onclick="Paneles5.fijarObjetivo(\'' + o.id + '\')">' +
               esc(o.texto(10)) + '</button>').join('') + '</div>') +
        '</div>';

    const cola = Auto.cola();
    if (cola.length) {
        html += '<div class="rama-talentos"><h4>Cola (' + cola.length + ')</h4>' +
            cola.map(t => '<div class="talento"><span class="talento-info">' +
                esc(t.id) + ' × ' + t.meta + (t.area ? ' en ' + esc(nom(t.area)) : '') +
                '</span></div>').join('') +
            '<div style="text-align:center"><button type="button" class="boton-cancelar" ' +
            'onclick="Auto.limpiarCola(); Paneles5.automatizacion()">Vaciar cola</button></div></div>';
    }

    abrir('Automatización', html);
};

API.fijarObjetivo = function (id) {
    const n = prompt('¿Cuántos?', '10');
    if (n === null) return;
    Auto.fijarObjetivo(id, n);
    API.automatizacion();
};


/* ----------------------------------------------------------- ASCENSIÓN */

API.ascension = function () {
    const A = Prestigio2;
    const frag = saved.fragmentos || 0;
    const puede = A.puedeAscender();
    const ganancia = A.fragmentosAlAscender();

    let html = '<div class="resumen-extra"><strong>' + frag + '</strong> Fragmentos · ' +
        '<strong>' + (saved.ascensiones || 0) + '</strong> ascensiones · ' +
        (saved.prestigios || 0) + '/' + A.RENACERES_PARA_ASCENDER + ' renaceres</div>';

    html += '<div class="bloque-renacer">' +
        (puede
          ? '<p>Ascender te daría <strong>' + ganancia + ' Fragmentos</strong>.</p>' +
            '<p><small>Se reinician la Esencia y los renaceres. Los talentos se pierden salvo lo que conserve Memoria. Las mejoras de ascensión y las reliquias no se tocan.</small></p>' +
            '<button type="button" class="boton-renacer" onclick="Paneles5.confirmarAscender()">Ascender</button>'
          : '<p>Necesitas <strong>' + A.RENACERES_PARA_ASCENDER + '</strong> renaceres para ascender.</p>') +
        '</div>';

    html += '<div class="rama-talentos"><h4>Mejoras de ascensión</h4>';
    for (const m of A.MEJORAS_ASCENSION) {
        const n = A.nivelMejora(m.id);
        const coste = A.costeMejora(m.id);
        const max = n >= m.max;
        html += '<div class="talento"><span class="talento-info"><strong>' + esc(m.nombre) + '</strong> ' +
            '<small>(' + n + '/' + m.max + ')</small><br><small>' + esc(m.efecto(n || 1)) + '</small></span>' +
            (max ? '<span class="talento-max">MÁX</span>'
                 : '<button type="button" class="talento-boton' + (frag >= coste ? '' : ' sin-esencia') + '" ' +
                   'onclick="Prestigio2.subirMejora(\'' + m.id + '\'); Paneles5.ascension()">' + coste + ' ◈</button>') +
            '</div>';
    }
    html += '</div>';
    abrir('Ascensión', html);
};

API.confirmarAscender = function () {
    abrir('¿Ascender?',
        '<div class="bloque-renacer"><p>Perderás la Esencia, los renaceres y casi todos los talentos.</p>' +
        '<p>Recibirás <strong>' + Prestigio2.fragmentosAlAscender() + ' Fragmentos</strong>.</p>' +
        '<p><small>Exporta tu partida antes si tienes dudas.</small></p>' +
        '<button type="button" class="boton-renacer" onclick="Prestigio2.ascender()">Sí, ascender</button> ' +
        '<button type="button" class="boton-cancelar" onclick="Paneles5.ascension()">Cancelar</button></div>');
};


/* ----------------------------------------------------------- RELIQUIAS */

API.reliquias = function () {
    const A = Prestigio2;
    const tengo = A.reliquiasObtenidas();
    abrir('Reliquias',
        '<div class="resumen-extra">Sobreviven al renacer y a la ascensión. Se ganan por gestas, no se compran.</div>' +
        '<div class="lista-logros">' + A.RELIQUIAS.map(r =>
          '<div class="' + (tengo[r.id] ? 'logro hecho' : 'logro') + '">' +
          '<span class="logro-icono">' + (tengo[r.id] ? r.icono : '🔒') + '</span>' +
          '<span class="logro-texto"><strong>' + esc(r.nombre) + '</strong><br>' +
          '<small>' + esc(r.texto) + '</small></span></div>').join('') + '</div>');
};


/* ------------------------------------------------------------ DESAFÍOS */

API.desafios = function () {
    const A = Prestigio2;
    const estado = A.estadoDesafios();
    const mult = A.multDesafios();
    abrir('Desafíos de renacer',
        '<div class="resumen-extra">Multiplicador actual de Esencia: <strong>×' + mult.toFixed(2) + '</strong><br>' +
        '<small>Se comprueban en el momento de renacer, con el equipo que lleves puesto.</small></div>' +
        '<div class="lista-logros">' + estado.map(d =>
          '<div class="' + (d.activo ? 'logro hecho' : 'logro') + '" style="cursor:pointer" ' +
          'onclick="Prestigio2.alternarDesafio(\'' + d.id + '\'); Paneles5.desafios()">' +
          '<span class="logro-icono">' + (d.activo ? (d.cumpliendo ? '✔' : '✖') : '○') + '</span>' +
          '<span class="logro-texto"><strong>' + esc(d.nombre) + '</strong><br>' +
          '<small>' + esc(d.texto) + '</small></span>' +
          '<span class="logro-bonus">×' + d.mult + '</span></div>').join('') + '</div>');
};


/* -------------------------------------------------------------- CONSEJO */

API.consejo = function () {
    const lista = Economia.consejo();
    abrir('¿Qué me conviene hacer?',
        lista.length
          ? '<div class="lista-logros">' + lista.map(s =>
              '<div class="logro hecho"' + (s.accion ? ' style="cursor:pointer" onclick="closeTooltip(); ' + s.accion + '"' : '') + '>' +
              '<span class="logro-icono">→</span><span class="logro-texto"><strong>' + esc(s.titulo) +
              '</strong><br><small>' + esc(s.texto) + '</small></span></div>').join('') + '</div>'
          : '<p>Nada urgente. Sigue jugando.</p>');
};


/* ---------------------------------------------------------- DIAGNÓSTICO */

API.diagnostico = function () {
    const d = Economia.diagnostico();
    abrir('Diagnóstico del equipo',
        '<div class="lista-logros">' + d.map(x =>
          '<div class="' + (x.tipo === 'ok' ? 'logro hecho' : 'logro') + '">' +
          '<span class="logro-icono">' + (x.tipo === 'ok' ? '✔' : '⚠') + '</span>' +
          '<span class="logro-texto">' + esc(x.texto) + '</span></div>').join('') + '</div>');
};


/* ------------------------------------------------------------- REGISTRO */

API.registroCombate = function () {
    const l = Economia.log();
    abrir('Registro de combate',
        '<div class="resumen-extra">Últimos ' + l.length + ' golpes, con el porqué de cada número.</div>' +
        (l.length
          ? '<div class="lista-copias">' + l.map(e =>
              '<div class="copia"><span>' + esc(nom(e.mov || '?')) +
              (e.cruce ? ' <small>·cruce</small>' : '') +
              (e.stab > 1 ? ' <small>·STAB</small>' : '') +
              (e.ef > 1 ? ' <small>·supereficaz</small>' : (e.ef < 1 && e.ef > 0 ? ' <small>·resistido</small>' : '')) +
              '</span><strong>' + Extras.formatearNumero(e.dano || 0) + '</strong></div>').join('') + '</div>'
          : '<p>Todavía no hay golpes registrados. Entra en combate.</p>') +
        '<div style="text-align:center;margin-top:.5rem"><button type="button" class="boton-cancelar" ' +
        'onclick="Economia.limpiarLog(); Paneles5.registroCombate()">Limpiar</button></div>');
};


/* -------------------------------------------------------- MAPA DE CALOR */

API.mapaCalor = function () {
    const m = Economia.mapaDeCalor();
    abrir('Dónde pasas el tiempo',
        m.length
          ? '<div class="lista-misiones">' + m.slice(0, 15).map(z =>
              '<div class="mision"><span>' + esc(nom(z.zona)) + '</span>' +
              '<div class="barra-mision"><div style="width:' + z.pct + '%"></div></div>' +
              '<small>' + Math.round(z.segundos / 60) + ' min · ' + z.pct + '%</small></div>').join('') + '</div>'
          : '<p>Aún no hay datos. Juega un rato y vuelve.</p>');
};


/* --------------------------------------------------------------- BUILDS */

API.builds = function () {
    const b = Economia.builds();
    abrir('Builds guardadas',
        '<div style="text-align:center;margin-bottom:.6rem">' +
        '<button type="button" class="boton-renacer" onclick="Paneles5.guardarBuild()">Guardar la actual</button></div>' +
        (b.length
          ? '<div class="lista-copias">' + b.map((x, i) =>
              '<div class="copia"><span>' + esc(x.nombre) + '<br><small>' +
              x.equipo.map(e => esc(nom(e.p))).join(', ').slice(0, 60) + '</small></span>' +
              '<span><button type="button" onclick="Economia.cargarBuild(' + i + '); closeTooltip()">Cargar</button> ' +
              '<button type="button" class="boton-cancelar" style="padding:.35rem .6rem" ' +
              'onclick="Economia.borrarBuild(' + i + '); Paneles5.builds()">✕</button></span></div>').join('') + '</div>'
          : '<p>No has guardado ninguna todavía.</p>'));
};

API.guardarBuild = function () {
    const n = prompt('Nombre de la build:', 'Mi equipo');
    if (n === null) return;
    Economia.guardarBuild(n);
    API.builds();
};


/* ------------------------------------------------------ ECONOMÍA DIARIA */

API.encargos = function () {
    const e = Economia.encargos();
    abrir('Encargos del día',
        '<div class="resumen-extra">Caducan a medianoche. Pagan en Chapas Doradas.</div>' +
        '<div class="lista-misiones">' + e.lista.map(x => {
            const hecho = Math.min(Economia.progresoEncargo(x), x.meta);
            const pct = Math.round(hecho / x.meta * 100);
            return '<div class="mision' + (x.hecho ? ' hecha' : '') + '">' +
                   '<span>' + (x.hecho ? '✔ ' : '') + esc(Economia.textoEncargo(x)) +
                   ' <small>· ' + x.premio + ' ✦</small></span>' +
                   '<div class="barra-mision"><div style="width:' + pct + '%"></div></div>' +
                   '<small>' + hecho + ' / ' + x.meta + '</small></div>';
        }).join('') + '</div>');
};

API.subasta = function () {
    const s = Economia.subasta();
    abrir('Subasta del día',
        '<div class="resumen-extra">Un lote al día, el mismo para todo el mundo. Puja alto o te lo quitan.</div>' +
        '<div class="jefe-ficha"><img alt="" class="jefe-sprite" src="img/items/' + s.lote + '.png">' +
        '<div><strong>3 × ' + esc(nom(s.lote)) + '</strong><br><small>Puja mínima: ' + s.base + ' Chapas</small></div></div>' +
        (s.ganado
          ? '<div class="resumen-extra">✔ Ya has ganado el lote de hoy.</div>'
          : '<input type="number" id="puja" class="campo-busqueda" value="' + s.base + '" min="' + s.base + '">' +
            '<div style="text-align:center"><button type="button" class="boton-renacer" ' +
            'onclick="Economia.pujar(document.getElementById(\'puja\').value); Paneles5.subasta()">Pujar</button></div>') +
        '<div class="resumen-extra"><small>Tienes ' + ((item.bottleCap && item.bottleCap.got) || 0) + ' Chapas.</small></div>');
};

API.inversiones = function () {
    const zonas = Object.keys(areas).filter(k => areas[k].type === 'wild').slice(0, 20);
    abrir('Inversión en zonas',
        '<div class="resumen-extra">Mejora permanentemente los objetos que sueltan. Hasta nivel ' +
        Economia.MAX_INVERSION + '.</div>' +
        '<div class="lista-copias">' + zonas.map(z => {
            const n = Economia.nivelInversion(z);
            const c = Economia.COSTE_INVERSION(n);
            return '<div class="copia"><span>' + esc(nom(z)) + '<br><small>nivel ' + n +
                   ' · +' + (n * 10) + '% de objetos</small></span>' +
                   (n >= Economia.MAX_INVERSION ? '<span class="talento-max">MÁX</span>'
                     : '<button type="button" onclick="Economia.invertir(\'' + z + '\'); Paneles5.inversiones()">' +
                       c + ' ✦</button>') + '</div>';
        }).join('') + '</div>');
};


/* -------------------------------------------------------- COLECCIÓN 2.0 */

API.memorial = function () {
    const m = Economia.memorial();
    abrir('Memorial',
        '<div class="resumen-extra">Los que cayeron en modo Nuzlocke. Descansen.</div>' +
        (m.length
          ? '<div class="lista-copias">' + m.slice().reverse().map(x =>
              '<div class="copia"><span>' + esc(x.mote || nom(x.id)) +
              '<br><small>nivel ' + x.nivel + ' · ' + esc(nom(x.zona)) + ' · ' +
              new Date(x.cuando).toLocaleDateString('es-ES') + '</small></span>' +
              '<img alt="" style="width:2.5rem;filter:grayscale(1) brightness(.7)" src="img/pkmn/sprite/' + x.id + '.png">' +
              '</div>').join('') + '</div>'
          : '<p>Nadie ha caído todavía. Que siga así.</p>'));
};

API.generaciones = function () {
    const g = Economia.porGeneracion();
    abrir('Colección por generaciones',
        '<div class="lista-misiones">' + g.map(x =>
          '<div class="mision' + (x.pct === 100 ? ' hecha' : '') + '">' +
          '<span>Generación ' + x.gen + '</span>' +
          '<div class="barra-mision"><div style="width:' + x.pct + '%"></div></div>' +
          '<small>' + x.tengo + ' / ' + x.total + ' (' + x.pct + '%)</small></div>').join('') + '</div>');
};

API.intercambio = function () {
    const equipo = [];
    for (const s in team) if (team[s].pkmn) equipo.push(team[s].pkmn.id);
    const sel = equipo[0];
    abrir('Intercambio por código',
        '<div class="resumen-extra">Exporta un Pokémon a un código y compártelo. Al importar se fusionan los datos: nunca se pierde nada.</div>' +
        (sel
          ? '<p><strong>Exportar ' + esc(nom(sel)) + ':</strong></p>' +
            '<textarea class="campo-busqueda" rows="3" readonly onclick="this.select()">' +
            esc(Economia.exportarPkmn(sel) || '') + '</textarea>'
          : '<p><small>Monta un equipo para poder exportar.</small></p>') +
        '<p><strong>Importar un código:</strong></p>' +
        '<textarea class="campo-busqueda" rows="3" id="cod-intercambio"></textarea>' +
        '<div style="text-align:center"><button type="button" class="boton-renacer" ' +
        'onclick="Economia.importarPkmn(document.getElementById(\'cod-intercambio\').value); Paneles5.intercambio()">' +
        'Importar</button></div>');
};


/* ---------------------------------------------------------------- SOCIAL */

API.compartir = function () {
    const codigo = Social.exportarBuild();
    abrir('Compartir equipo',
        '<div class="resumen-extra">Comparte tu equipo completo: miembros, movimientos y objetos.</div>' +
        '<p><strong>Tu código:</strong></p>' +
        '<textarea class="campo-busqueda" rows="3" readonly onclick="this.select()">' + esc(codigo || '') + '</textarea>' +
        '<p><strong>Probar el equipo de otra persona:</strong></p>' +
        '<textarea class="campo-busqueda" rows="3" id="cod-build"></textarea>' +
        '<div style="text-align:center">' +
        '<button type="button" class="boton-cancelar" onclick="Paneles5.probarBuild()">Solo probar</button> ' +
        '<button type="button" class="boton-renacer" ' +
        'onclick="Social.aplicarBuild(document.getElementById(\'cod-build\').value); closeTooltip()">Aplicar</button></div>' +
        '<div class="resumen-extra"><small>Aplicar no te regala Pokémon: solo coloca los que ya tengas.</small></div>');
};

API.probarBuild = function () {
    const cod = document.getElementById('cod-build');
    if (!cod || !cod.value.trim()) { Extras.aviso('Pega un código primero'); return; }
    const r = Social.probarBuild(cod.value);
    if (!r) { Extras.aviso('Código no válido'); return; }
    abrir('Equipo ajeno · simulación',
        '<div class="resumen-extra">Daño estimado contra la zona actual, sin tocar tu partida.</div>' +
        '<div class="tabla-extra">' + r.map(x =>
          '<div><span>' + esc(nom(x.id)) + ' <small>nv ' + x.nivel + '</small></span>' +
          '<strong>' + Extras.formatearNumero(x.dpm) + ' /min</strong></div>').join('') + '</div>' +
        '<div style="text-align:center;margin-top:.6rem"><button type="button" class="boton-cancelar" ' +
        'onclick="Paneles5.compartir()">Volver</button></div>');
};

API.showdown = function () {
    const t = Social.aShowdown();
    abrir('Exportar a Showdown',
        '<div class="resumen-extra">Formato estándar de Pokémon Showdown. Los IV se escalan de 0–6 a 0–31.</div>' +
        '<textarea class="campo-busqueda" rows="14" readonly onclick="this.select()">' + esc(t || '') + '</textarea>');
};

API.tablaReto = function () {
    const t = Social.tablaLocal();
    const r = Social.retoSemanal();
    abrir('Reto semanal',
        '<div class="resumen-extra">Semana #' + r.semana + ' · ' + esc(r.objetivo) + '<br>' +
        '<small>Sin servidor: comparte tu código y comparad a mano.</small></div>' +
        (t.length
          ? '<div class="lista-copias">' + t.map((m, i) =>
              '<div class="copia"><span>' + (i + 1) + '. ' + Extras.formatearNumero(m.valor) +
              '<br><small>' + new Date(m.cuando).toLocaleDateString('es-ES') + '</small></span></div>').join('') + '</div>'
          : '<p>Aún no tienes marcas esta semana.</p>') +
        '<p><strong>Tu código:</strong></p>' +
        '<textarea class="campo-busqueda" rows="2" readonly onclick="this.select()">' +
        esc(Social.codigoReto() || '') + '</textarea>');
};


/* -------------------------------------------------- COMBATE AVANZADO UI */

API.activas = function () {
    abrir('Habilidades activas',
        '<div class="resumen-extra">Se disparan a mano y tienen enfriamiento. Opcionales: sin usarlas el juego va igual.</div>' +
        '<div class="lista-logros">' + Combate3.ACTIVAS.map(a => {
            const listo = Combate3.puedeUsar(a.id);
            const seg = Math.ceil(Combate3.restante(a.id) / 1000);
            return '<div class="' + (listo ? 'logro hecho' : 'logro') + '"' +
                   (listo ? ' style="cursor:pointer" onclick="Combate3.usarActiva(\'' + a.id + '\'); Paneles5.activas()"' : '') + '>' +
                   '<span class="logro-icono">' + a.icono + '</span>' +
                   '<span class="logro-texto"><strong>' + esc(a.nombre) + '</strong><br>' +
                   '<small>' + esc(a.texto) + '</small></span>' +
                   '<span class="logro-bonus">' + (listo ? 'LISTA' : seg + ' s') + '</span></div>';
        }).join('') + '</div>');
};

API.puzzles = function () {
    const e = Combate3.estadoPuzzles();
    abrir('Combates puzzle',
        '<div class="resumen-extra">Peleas con una solución concreta. El reto es deducir el equipo, no el nivel.</div>' +
        '<div class="lista-logros">' + Combate3.PUZZLES.map(p => {
            const r = Combate3.comprobarPuzzle(p.id);
            return '<div class="' + (e[p.id] ? 'logro hecho' : 'logro') + '">' +
                   '<span class="logro-icono">' + (e[p.id] ? '✔' : '🧩') + '</span>' +
                   '<span class="logro-texto"><strong>' + esc(p.nombre) + '</strong><br>' +
                   '<small>' + esc(p.texto) + '</small><br>' +
                   '<small style="opacity:.75">' + esc(r ? r.motivo : '') + '</small></span></div>';
        }).join('') + '</div>');
};


return API;

})();
