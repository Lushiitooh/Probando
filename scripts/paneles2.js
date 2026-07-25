/* =========================================================================
   Pokechill — Paneles de los sistemas de combate, colección y utilidades
   =========================================================================
   Continuación de paneles.js. Se separa por tamaño, no por función.
   ========================================================================= */

var Paneles2 = (function () {

'use strict';

const API = {};
const abrir = (t, c) => Paneles.abrir(t, c);

const esc = s => String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function nom(x) { try { return format(x); } catch (e) { return String(x); } }
const nombreTipo = t => (typeof ES !== 'undefined' && ES.tipo && ES.tipo[t]) || t;


/* ------------------------------------------------- ROTACIÓN Y ESTRATEGIA */

API.rotacion = function (idPkmn) {
    const C = Combate2;
    if (!idPkmn) { for (const s in team) if (team[s].pkmn) { idPkmn = team[s].pkmn.id; break; } }
    if (!idPkmn) { abrir('Rotación', '<p>Necesitas un Pokémon en el equipo.</p>'); return; }

    const p = pkmn[idPkmn];
    const movs = Object.values(p.moves).filter(Boolean);
    if (!movs.length) { abrir('Rotación', '<p>Ese Pokémon no tiene movimientos equipados.</p>'); return; }

    const a = C.analizarRotacion(movs);
    const mejor = C.mejorOrden(movs);
    const aMejor = C.analizarRotacion(mejor);
    const yaOptima = aMejor.multMedio <= a.multMedio + 1e-9;

    let html = '<div class="resumen-extra"><strong>' + esc(nom(idPkmn)) + '</strong> · ' +
        a.cruces + ' de ' + a.total + ' movimientos cruzan · multiplicador medio <strong>x' +
        a.multMedio.toFixed(2) + '</strong></div>';

    html += '<div class="lista-rotacion">';
    for (const paso of a.pasos) {
        const clase = paso.potencia === 0 ? 'rot-nodano' : (paso.cruza ? 'rot-cruza' : 'rot-nocruza');
        const marca = paso.potencia === 0 ? 'sin daño' : (paso.cruza ? 'x' + paso.bonus.toFixed(2) : 'sin cruce');
        html += '<div class="' + clase + '">' +
            '<span class="rot-nombre">' + esc(nom(paso.id)) + '</span>' +
            '<span class="rot-tipo">' + esc(nombreTipo(paso.tipo)) + '</span>' +
            '<span class="rot-marca">' + marca + '</span></div>';
    }
    html += '</div>';

    html += yaOptima
        ? '<div class="resumen-extra">Este orden ya es el mejor posible con estos movimientos.</div>'
        : '<div class="resumen-extra">Mejor orden posible (x' + aMejor.multMedio.toFixed(2) + '):<br><strong>' +
          mejor.map(m => esc(nom(m))).join(' → ') + '</strong></div>';

    const sin = C.sinergiasActivas();
    if (sin.length) {
        html += '<div class="rama-talentos"><h4>Sinergias activas</h4>' +
            sin.map(x => '<div class="talento"><span class="talento-info"><strong>' + esc(x.nombre) +
                         '</strong><br><small>' + esc(x.descripcion) + '</small></span></div>').join('') + '</div>';
    }
    abrir('Rotación y Potencia Cruzada', html);
};

API.simulador = function () {
    let html = '<div class="resumen-extra">Daño por minuto estimado contra un rival neutro de defensa media. ' +
               'Sirve para comparar equipos sin tener que combatir.</div><div class="tabla-extra">';
    let alguno = false;
    for (const s in team) {
        if (!team[s].pkmn) continue;
        const r = Combate2.simular(team[s].pkmn.id);
        if (!r) continue;
        alguno = true;
        html += '<div><span>' + esc(nom(team[s].pkmn.id)) +
                ' <small>(' + (r.cruces || '0/0') + ' cruces)</small></span>' +
                '<strong>' + Extras.formatearNumero(r.dpm) + ' /min</strong></div>';
    }
    html += '</div>';
    abrir('Simulador de daño', alguno ? html : '<p>Necesitas un equipo montado.</p>');
};

API.bendiciones = function () {
    const ops = Combate2.ofrecerBendiciones();
    if (!ops.length) { abrir('Bendiciones', '<p>Ya tienes todas las bendiciones.</p>'); return; }
    abrir('Elige una bendición',
        '<div class="resumen-extra">Se conserva mientras dure la subida a la torre.</div>' +
        '<div class="lista-logros">' + ops.map(b =>
            '<div class="logro hecho" style="cursor:pointer" onclick="Combate2.elegirBendicion(\'' + b.id + '\')">' +
            '<span class="logro-icono">✦</span><span class="logro-texto"><strong>' + esc(b.nombre) +
            '</strong><br><small>' + esc(b.texto) + '</small></span></div>').join('') + '</div>');
};


/* ------------------------------------------------ COLECCIÓN Y ECONOMÍA */

function tira(titulo, lista, shinyPorPieza) {
    if (!lista.length) return '';
    return '<div class="rama-talentos"><h4>' + titulo + '</h4><div class="galeria">' +
        lista.map(p => '<div class="galeria-pieza" title="' + esc(nom(p.id || p)) + '">' +
            '<img alt="" src="img/pkmn/' + ((shinyPorPieza ? p.shiny : false) ? 'shiny' : 'sprite') +
            '/' + (p.id || p) + '.png">' +
            '<small>' + esc(p.mote || nom(p.id || p)) + '</small></div>').join('') + '</div></div>';
}

API.galeria = function () {
    const g = Coleccion.galeria();
    abrir('Galería',
        '<div class="resumen-extra">' + g.total + ' Pokémon en tu colección</div>' +
        tira('Variocolor', g.variocolores, true) +
        tira('Mejores IV', g.mejoresIvs, true) +
        tira('Más cintas', g.masCintas, true) +
        tira('Con mote', g.conMote, true));
};

API.pokedexViviente = function () {
    const v = Coleccion.pokedexViviente();
    abrir('Pokédex viviente',
        '<div class="resumen-extra"><strong>' + v.registradas + ' / ' + v.total + '</strong> (' +
        v.porcentaje + '%) · ' + v.variocolor + ' variocolor</div>' +
        '<div class="barra-mision"><div style="width:' + v.porcentaje + '%"></div></div>' +
        (v.faltan.length
          ? '<div class="rama-talentos"><h4>Te faltan (muestra)</h4><div class="galeria">' +
            v.faltan.map(k => '<div class="galeria-pieza" title="' + esc(nom(k)) + '">' +
              '<img alt="" style="filter:brightness(0);opacity:.45" src="img/pkmn/sprite/' + k + '.png">' +
              '<small>' + esc(nom(k)) + '</small></div>').join('') + '</div></div>'
          : '<p>¡Pokédex completa!</p>'));
};

API.reciclaje = function () {
    const lista = Coleccion.reciclables();
    abrir('Reciclaje',
        '<div class="resumen-extra">Los objetos dejan de mejorar a las 20 copias. El excedente se cambia por ' +
        'Chapas Plateadas (' + Coleccion.RECICLA_POR + ' copias = 1 chapa).</div>' +
        (lista.length
          ? '<div class="lista-copias">' + lista.map(r =>
              '<div class="copia"><span>' + esc(nom(r.id)) + ' <small>· sobran ' + r.sobra + '</small></span>' +
              '<button type="button" onclick="Coleccion.reciclar(\'' + r.id + '\'); Paneles2.reciclaje()">+' +
              r.chapas + '</button></div>').join('') + '</div>' +
            '<div style="text-align:center;margin-top:.6rem"><button type="button" class="boton-renacer" ' +
            'onclick="Coleccion.reciclarTodo(); Paneles2.reciclaje()">Reciclar todo</button></div>'
          : '<p>No tienes excedente todavía.</p>'));
};

API.pase = function () {
    const nivel = Coleccion.nivelPase(), max = Coleccion.NIVELES_PASE;
    const reclamado = saved.paseReclamado || 0;
    const pts = Coleccion.puntosPase();
    const sig = (nivel + 1) * Coleccion.PUNTOS_POR_NIVEL;

    let html = '<div class="resumen-extra">Nivel <strong>' + nivel + ' / ' + max + '</strong> · ' +
        Extras.formatearNumero(pts) + ' puntos' +
        (nivel < max ? ' · siguiente en ' + Extras.formatearNumero(Math.max(0, sig - pts)) : '') + '</div>' +
        '<div class="barra-mision"><div style="width:' + Math.round(nivel / max * 100) + '%"></div></div>' +
        '<div class="lista-logros">';
    for (let i = 1; i <= max; i++) {
        const p = Coleccion.premioPase(i);
        const ok = i <= reclamado, disp = i <= nivel && !ok;
        html += '<div class="' + (ok ? 'logro hecho' : 'logro') + '">' +
            '<span class="logro-icono">' + (ok ? '✔' : (disp ? '🎁' : '🔒')) + '</span>' +
            '<span class="logro-texto"><strong>Nivel ' + i + '</strong><br><small>' +
            p.cantidad + ' ' + p.nombre + '</small></span></div>';
    }
    html += '</div>';
    if (nivel > reclamado) html += '<div style="text-align:center;margin-top:.6rem">' +
        '<button type="button" class="boton-renacer" onclick="Coleccion.reclamarPase(); Paneles2.pase()">' +
        'Reclamar recompensas</button></div>';
    abrir('Pase de temporada', html);
};

API.graficas = function () {
    abrir('Progreso',
        Coleccion.grafica('especies', 'Especies registradas') +
        Coleccion.grafica('nivelMedio', 'Nivel medio') +
        Coleccion.grafica('combates', 'Combates ganados'));
};

API.ranuras = function () {
    const r = Coleccion.infoRanuras();
    abrir('Ranuras de partida',
        '<div class="resumen-extra">Partidas independientes. Puedes probar un Nuzlocke sin tocar la principal.</div>' +
        '<div class="lista-copias">' + r.map(x =>
          '<div class="copia"><span>Partida ' + (x.indice + 1) + (x.activa ? ' <strong>(activa)</strong>' : '') +
          '<br><small>' + (x.existe ? x.especies + ' especies · ' + x.tamaño : 'vacía') + '</small></span>' +
          (x.activa ? '<span class="talento-max">EN USO</span>'
                    : '<button type="button" onclick="Coleccion.cambiarRanura(' + x.indice + ')">Usar</button>') +
          '</div>').join('') + '</div>');
};

API.busqueda = function (texto) {
    const q = texto === undefined ? '' : texto;
    const res = Coleccion.buscar(q);
    const bloque = (t, lista) => !lista.length ? '' :
        '<div class="rama-talentos"><h4>' + t + ' (' + lista.length + ')</h4><div class="galeria">' +
        lista.map(k => '<div class="galeria-pieza"><small>' + esc(nom(k)) + '</small></div>').join('') +
        '</div></div>';

    abrir('Búsqueda global',
        '<input type="text" id="busqueda-global" class="campo-busqueda" autocomplete="off" ' +
        'placeholder="Escribe al menos 2 letras..." value="' + esc(q) + '" ' +
        'oninput="Paneles2.busquedaDiferida(this.value)">' +
        (q.length < 2
          ? '<p><small>Busca a la vez en Pokémon, movimientos, objetos y áreas.</small></p>'
          : bloque('Pokémon', res.pkmn) + bloque('Movimientos', res.move) +
            bloque('Objetos', res.item) + bloque('Áreas', res.areas)));

    const campo = document.getElementById('busqueda-global');
    if (campo) { campo.focus(); campo.setSelectionRange(q.length, q.length); }
};

let temporizadorBusqueda = null;
API.busquedaDiferida = function (texto) {
    clearTimeout(temporizadorBusqueda);
    temporizadorBusqueda = setTimeout(() => API.busqueda(texto), 220);
};

API.mazmorra = function () {
    const m = Coleccion.mazmorraDelDia();
    abrir('Mazmorra del día',
        '<div class="resumen-extra">Generada con la semilla del día: todas las partidas ven la misma. ' +
        m.pisos.length + ' pisos.</div>' +
        '<div class="lista-logros">' + m.pisos.map(p =>
          '<div class="logro hecho"><span class="logro-icono">' + p.piso + '</span>' +
          '<span class="logro-texto"><strong>Nivel ' + p.nivel + '</strong><br><small>' +
          p.habitantes.map(h => esc(nom(h))).join(', ') +
          (p.jefe ? '<br><strong>Jefe: ' + esc(nom(p.jefe)) + '</strong>' : '') +
          '</small></span></div>').join('') + '</div>');
};

API.aliado = function () {
    const codigo = Coleccion.codigoAliado();
    const actual = saved.aliado;
    abrir('Aliado cooperativo',
        '<div class="resumen-extra">Comparte tu código y usa el de otra persona. El aliado da un bonus pasivo de daño.</div>' +
        (actual ? '<div class="resumen-extra">Aliado actual: <strong>' + esc(nom(actual.p)) +
                  '</strong> nivel ' + actual.l + (actual.s ? ' ✦' : '') + '</div>' : '') +
        '<p><strong>Tu código</strong> (pulsa para seleccionar):</p>' +
        '<textarea class="campo-busqueda" rows="3" readonly onclick="this.select()">' + esc(codigo || '') + '</textarea>' +
        '<p><strong>Código de un aliado:</strong></p>' +
        '<textarea class="campo-busqueda" rows="3" id="codigo-aliado"></textarea>' +
        '<div style="text-align:center"><button type="button" class="boton-renacer" ' +
        'onclick="Coleccion.usarAliado(document.getElementById(\'codigo-aliado\').value); Paneles2.aliado()">' +
        'Usar aliado</button></div>');
};

API.comparador = function (a, b) {
    const equipo = [];
    for (const s in team) if (team[s].pkmn) equipo.push(team[s].pkmn.id);
    if (equipo.length < 2) { abrir('Comparador', '<p>Necesitas al menos dos Pokémon en el equipo.</p>'); return; }
    a = a || equipo[0]; b = b || equipo[1];
    const c = Coleccion.comparar(a, b);
    if (!c) { abrir('Comparador', '<p>No se pudo comparar.</p>'); return; }

    const NOMBRES = { hp: 'PS', atk: 'Ataque', def: 'Defensa', satk: 'At. Esp.', sdef: 'Def. Esp.', spe: 'Velocidad' };
    const opciones = v => equipo.map(k =>
        '<option value="' + k + '"' + (k === v ? ' selected' : '') + '>' + esc(nom(k)) + '</option>').join('');

    abrir('Comparador',
        '<div class="comparador-cabecera">' +
        '<select onchange="Paneles2.comparador(this.value, \'' + b + '\')">' + opciones(a) + '</select>' +
        '<span>vs</span>' +
        '<select onchange="Paneles2.comparador(\'' + a + '\', this.value)">' + opciones(b) + '</select></div>' +
        '<div class="tabla-extra">' + c.filas.map(f =>
          '<div><span>' + NOMBRES[f.stat] + '</span>' +
          '<strong class="' + (f.gana === 'a' ? 'gana' : '') + '">' + f.a + '★ +' + f.aIv + '</strong>' +
          '<strong class="' + (f.gana === 'b' ? 'gana' : '') + '">' + f.b + '★ +' + f.bIv + '</strong></div>'
        ).join('') + '</div>');
};

API.tema = function () {
    const t = Coleccion.temaPropio();
    const NOMBRES = {
        '--main-color': 'Color principal', '--secondary-color': 'Color secundario',
        '--text-color': 'Texto', '--background-color': 'Fondo',
    };
    abrir('Tema personalizado',
        '<div class="resumen-extra">Define tus propios colores. Se aplican sobre el tema elegido.</div>' +
        '<div class="tabla-extra">' + Coleccion.VARIABLES_TEMA.map(v =>
          '<div><span>' + NOMBRES[v] + '</span>' +
          '<input type="color" value="' + (t[v] || '#888888') + '" ' +
          'onchange="Coleccion.fijarColor(\'' + v + '\', this.value)"></div>').join('') + '</div>' +
        '<div style="text-align:center;margin-top:.6rem"><button type="button" class="boton-cancelar" ' +
        'onclick="Coleccion.limpiarTemaPropio(); Paneles2.tema()">Restablecer</button></div>');
};


return API;

})();
