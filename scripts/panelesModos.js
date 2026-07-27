/* =========================================================================
   INTERFAZ DE LOS MODOS NUEVOS
   =========================================================================
   Los billetes se pintan con la misma estructura que los del juego
   (.explore-ticket, .hitbox, .ticket-unlock) para que hereden el estilo y el
   gateo visual sin tocar el CSS existente.
   ========================================================================= */

var PanelesModos = (function () {

const API = {};

function nom(x) { try { return format(x); } catch (e) { return String(x); } }

/**
 * Construye un billete con la misma forma que los del juego.
 * `bloqueo` no vacío pinta el candado y NO registra el listener, que es
 * exactamente como gatea el juego sus zonas (explore.js:4485-4504).
 */
function billete(opts) {
    const div = document.createElement('div');
    div.className = 'explore-ticket ' + (opts.clase || '');

    const candado = opts.bloqueo
        ? `<span class="ticket-unlock"><span>${opts.bloqueo}</span></span>` : '';

    div.innerHTML = `
        ${candado}
        <span class="hitbox"></span>
        <div style="width: 100%;">
            <span class="explore-ticket-left">
                <span class="ticket-flair">${opts.etiqueta || ''}</span>
                <span style="font-size:1.2rem">${opts.titulo}</span>
                <span><strong style="background:${opts.color || '#7a5fa8'}">${opts.subtitulo || ''}</strong></span>
            </span>
        </div>
        <div style="width: 8rem;" class="explore-ticket-right">
            <span class="explore-ticket-bg" style="background-image: url(img/bg/${opts.fondo || 'forest'}.png);"></span>
            ${opts.sprite ? `<img alt="" class="explore-ticket-sprite sprite-trim" style="z-index:10;" src="img/pkmn/sprite/${opts.sprite}.png">` : ''}
        </div>`;

    if (!opts.bloqueo && opts.alPulsar) div.addEventListener('click', opts.alPulsar);
    return div;
}
API.billete = billete;


/* ----------------------------------------------------- billetes de Viajar */

/** Se añaden arriba del listado de zonas salvajes. */
API.pintarEnViajar = function () {
    const lista = document.getElementById('explore-listing');
    if (!lista || typeof Modos === 'undefined') return;

    /* --- CACERÍA --- */
    const c = Modos.Caza.estado();
    const t = Modos.Caza.tramo(c.cadena);
    const sig = Modos.Caza.siguienteTramo(c.cadena);
    const bCaza = billete({
        clase: 'ticket-caza',
        etiqueta: 'CAZA',
        color: '#8e44ad',
        titulo: c.objetivo ? 'Cacería: ' + nom(c.objetivo) : 'Cacería — elige objetivo',
        subtitulo: c.objetivo
            ? 'Cadena ' + c.cadena + (sig ? ' · faltan ' + (sig.min - c.cadena) + ' para el siguiente premio' : ' · máximo')
            : 'Apunta a un Pokémon que te falte',
        fondo: c.objetivo && areas.cazaZona ? areas.cazaZona.background : 'forest',
        sprite: c.objetivo || null,
        alPulsar: () => c.objetivo ? Modos.entrarEnZona('cazaZona') : API.selectorCaza(),
    });
    lista.insertBefore(bCaza, lista.firstChild);

    /* --- EL DORADO --- */
    const d = Modos.Dorado.estado();
    const bDorado = billete({
        clase: 'ticket-dorado',
        etiqueta: 'ORO',
        color: '#b8860b',
        titulo: 'El Dorado — nivel ' + ((d.nivel || 0) + 1),
        subtitulo: d.rastros > 0
            ? 'Grietas: ' + (d.grietas || []).map(nom).join(' / ')
            : 'Sin rastros — derrota salvajes para encontrar uno',
        fondo: 'cave',
        sprite: d.especie || null,
        bloqueo: d.rastros > 0 ? '' : 'Necesitas un Rastro Dorado (llevas ' + (d.sinRastro || 0) + '/400 sin encontrar)',
        alPulsar: () => API.panelDorado(),
    });
    lista.insertBefore(bDorado, lista.firstChild);

    /* --- EXPEDICIÓN --- */
    const e = Modos.Expedicion.estado();
    const bExp = billete({
        clase: 'ticket-expedicion',
        etiqueta: 'EXP',
        color: '#2e7d5b',
        titulo: 'Expedición',
        subtitulo: e.activa
            ? 'Etapa ' + (e.etapa + 1) + '/' + 7 + ' · botín sin cobrar: ' + (e.botin || []).length
            : 'Ruta de 7 etapas · mejor: ' + (e.mejorEtapa || 0),
        fondo: 'forest',
        alPulsar: () => API.panelExpedicion(),
    });
    lista.insertBefore(bExp, lista.firstChild);
};


/* --------------------------------------------------------- selector de caza */

API.selectorCaza = function () {
    const cand = Modos.Caza.candidatos(true).slice(0, 60);
    const c = Modos.Caza.estado();

    let html = `<p>Elige a quién cazar. Cada derrota seguida en su zona sube los IV
                mínimos, la probabilidad de variocolor y acaba haciendo salir su
                <strong>forma regional o su evolución</strong>.</p>`;

    if (!cand.length) {
        html += `<p><strong>Ya tienes todas las especies que viven en zonas salvajes.</strong>
                 Puedes seguir cazando para mejorar IV y buscar variocolor.</p>`;
        const todos = Modos.Caza.candidatos(false).slice(0, 40);
        html += tabla(todos);
    } else {
        html += tabla(cand);
    }

    if (c.objetivo) {
        html += `<div class="fila-botones" style="margin-top:0.6rem">
                 <button onclick="Modos.Caza.cancelar(); closeTooltip(); setWildAreas();">Cancelar la cacería actual</button></div>`;
    }
    const sellos = Modos.Caza.sellos();
    html += `<p style="opacity:0.8">Sellos de cazador: <strong>${sellos}</strong>
             (cada especie con récord de 50) · bono de objetos +${Math.round(Modos.Caza.bonoDrop()*100)} %</p>`;

    abrir('Cacería', html);

    function tabla(lista) {
        if (!lista.length) return '<p>No hay candidatos.</p>';
        return '<div class="lista-caza">' + lista.map(x => `
            <div class="fila-caza" onclick="PanelesModos.elegirCaza('${x.id}')">
                <img src="img/pkmn/sprite/${x.id}.png" alt="">
                <span><strong>${nom(x.id)}</strong><br>
                <small>${nom(x.habitat)} · nivel ${x.nivel}${pkmn[x.id] && pkmn[x.id].caught ? '' : ' · <em>te falta</em>'}</small></span>
            </div>`).join('') + '</div>';
    }
};

API.elegirCaza = function (id) {
    if (Modos.Caza.fijarObjetivo(id)) {
        try { closeTooltip(); } catch (e) {}
        try { setWildAreas(); } catch (e) {}
    }
};


/* -------------------------------------------------------------- El Dorado */

API.panelDorado = function () {
    const d = Modos.Dorado.estado();
    if (d.rastros <= 0) {
        abrir('El Dorado', `<p>No tienes ningún Rastro Dorado. Aparecen al derrotar salvajes
               en cualquier zona: un 0,5 % por derrota, y garantizado a las 400.
               Llevas <strong>${d.sinRastro || 0}/400</strong>.</p>`);
        return;
    }
    const vida = Math.round(60000 * Math.pow(1.35, d.nivel || 0));
    abrir('El Dorado — nivel ' + ((d.nivel || 0) + 1), `
        <p>Un blindado con una defensa que <strong>anula el daño normal</strong>.
        En este juego la defensa se RESTA al ataque, así que con la suya casi todo
        hace cero: solo lo atraviesan los dos tipos de abajo.</p>
        <p><strong>Grietas:</strong> ${(d.grietas || []).map(nom).join(' y ') || '—'}<br>
        <strong>Vida:</strong> ${vida.toLocaleString('es')}<br>
        <strong>Ventana:</strong> ${Modos.Dorado.VENTANA} acciones antes de que huya<br>
        <strong>Premio:</strong> ${d.premio ? nom(d.premio) + (pkmn[d.premio] && !pkmn[d.premio].caught ? ' <em>(te falta)</em>' : '') : '—'}</p>
        <p style="opacity:0.85">Consejo: monta la rotación alternando las dos grietas.
        Además de atravesar la armadura, alternar tipos activa la Potencia Cruzada
        en los cuatro movimientos.</p>
        <p>Rastros: <strong>${d.rastros}</strong> · Cazados: ${d.cazados || 0} · Huidas: ${d.huidas || 0}</p>
        <div class="fila-botones"><button onclick="PanelesModos.entrarDorado()">Ir a por él</button></div>`);
};

API.entrarDorado = function () {
    try { closeTooltip(); } catch (e) {}
    Modos.Dorado.entrar();
};


/* ------------------------------------------------------------ Expedición */

API.panelExpedicion = function () {
    const e = Modos.Expedicion.estado();

    if (!e.activa) {
        abrir('Expedición', `
            <p>Siete etapas encadenadas. En cada una eliges entre tres rutas, y cada
            ruta superada añade al botín <strong>una especie que no sale en ninguna
            zona del juego</strong>.</p>
            <p>Puedes <strong>retirarte cuando quieras y cobrar todo el botín</strong>.
            Si tu equipo cae, lo pierdes entero.</p>
            <p>Mejor etapa alcanzada: <strong>${e.mejorEtapa || 0}/7</strong> ·
            Expediciones completadas: ${e.completadas || 0}</p>
            <div class="fila-botones"><button onclick="PanelesModos.iniciarExpedicion()">Empezar expedición</button></div>`);
        return;
    }

    const ops = e.opciones || [];
    let html = `<p>Etapa <strong>${e.etapa + 1}/7</strong> · botín sin cobrar:
                <strong>${(e.botin || []).length}</strong> especies</p>`;
    if ((e.botin || []).length) {
        html += '<p>' + e.botin.map(x => `<img src="img/pkmn/sprite/${x}.png" style="width:2rem" title="${nom(x)}">`).join('') + '</p>';
    }
    html += '<div class="lista-nodos">' + ops.map((o, i) => `
        <div class="nodo-exp" onclick="PanelesModos.elegirNodo(${i})">
            <strong>${o.titulo}</strong><br>
            <small>${o.nota}</small><br>
            <small>${nom(o.zona)} · nivel ${o.nivel}</small>
            ${o.especie ? `<div class="nodo-premio">
                <img src="img/pkmn/sprite/${o.especie}.png" alt="">
                <span>${nom(o.especie)}${pkmn[o.especie] && !pkmn[o.especie].caught ? ' <em>★ nuevo</em>' : ''}</span>
            </div>` : '<div class="nodo-premio"><em>sin especie nueva</em></div>'}
        </div>`).join('') + '</div>';

    html += `<div class="fila-botones" style="margin-top:0.6rem">
             <button onclick="PanelesModos.retirarse()">Retirarse y cobrar (${(e.botin||[]).length})</button></div>`;
    abrir('Expedición', html);
};

API.iniciarExpedicion = function () { Modos.Expedicion.iniciar(); API.panelExpedicion(); };
API.elegirNodo = function (i) { try { closeTooltip(); } catch (e) {} Modos.Expedicion.elegir(i); };
API.retirarse = function () { Modos.Expedicion.retirarse(); try { closeTooltip(); } catch (e) {} try { setWildAreas(); } catch (e) {} };


/* ------------------------------------------------- billetes del menú VS */

API.pintarEnVs = function () {
    const lista = document.getElementById('vs-listing');
    if (!lista || typeof Modos === 'undefined') return;
    Modos.Senores.generar();

    // La Torre va aquí y no en Frontera porque updateFrontier() hace un return
    // temprano mientras no hayas derrotado a Giovanni (explore.js:7482), y el
    // modo debe estar disponible desde el principio.
    const t = Modos.Torre.estado();
    lista.insertBefore(billete({
        clase: 'ticket-torre',
        etiqueta: 'TORRE',
        color: '#3d5a80',
        titulo: 'Torre Infinita',
        subtitulo: t.piso > 0
            ? 'En curso: piso ' + t.piso + ' · récord ' + (t.record || 0)
            : 'Récord: piso ' + (t.record || 0) + ' · sin curación entre pisos',
        fondo: 'cave',
        alPulsar: () => API.panelTorre(),
    }), lista.firstChild);

    const st = Modos.Senores.estado();
    for (const s of (st.lote || [])) {
        const disp = Modos.Senores.disponible(s);
        const ar = areas[s.slot] || {};
        lista.insertBefore(billete({
            clase: 'ticket-senor',
            etiqueta: 'SEÑOR',
            color: '#8b2f3f',
            titulo: ar.name || nom(s.especie),
            subtitulo: s.titulo + ' · ' + nom(s.zona) + ' · nivel ' + s.nivel,
            fondo: ar.background || 'forest',
            sprite: s.especie,
            bloqueo: disp.ok ? '' : disp.motivo,
            alPulsar: () => Modos.entrarEnZona(s.slot),
        }), lista.firstChild);
    }
};

// Sin uso: la Torre se pinta en el listado de VS porque updateFrontier() sale
// antes de llegar aquí mientras la Frontera siga bloqueada.
API.pintarEnFrontera = function () {};

API.panelTorre = function () {
    const t = Modos.Torre.estado();
    abrir('Torre Infinita', `
        <p>Pisos sin fin. El rival sube <strong>+4 niveles por piso</strong> y no hay
        curación entre ellos: la única cura es empezar de nuevo.</p>
        <p>Cada <strong>5 pisos</strong> eliges una de tres mejoras que duran toda la subida.</p>
        <p style="opacity:0.85">Aquí la experiencia se dispara: este juego multiplica la
        experiencia por <strong>x12 si el rival te saca 20 niveles y por x128 si te saca 50</strong>.
        A partir del piso 15 cualquier Pokémon por debajo de 100 sube más rápido que
        en ninguna zona normal.</p>
        <p>Récord: <strong>piso ${t.record || 0}</strong> · subidas: ${t.subidas || 0}</p>
        <div class="fila-botones"><button onclick="PanelesModos.entrarTorre()">Empezar la subida</button></div>`);
};

API.entrarTorre = function () { try { closeTooltip(); } catch (e) {} Modos.Torre.iniciar(); };


/* ------------------------------------------------------------- auxiliar */

function abrir(titulo, html) {
    if (typeof Paneles !== 'undefined' && Paneles.abrir) { Paneles.abrir(titulo, html); return; }
    document.getElementById('tooltipTitle').innerHTML = titulo;
    document.getElementById('tooltipMid').innerHTML = html;
    document.getElementById('tooltipTop').style.display = 'none';
    document.getElementById('tooltipBottom').style.display = 'none';
    document.getElementById('tooltipBackground').style.display = 'flex';
}
API.abrir = abrir;

return API;

})();
