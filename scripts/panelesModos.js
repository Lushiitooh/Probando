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


/* ------------------------------------- paneles de los sistemas de progreso */

API.panelProgreso = function () {
    if (typeof Progreso2 === 'undefined') return;
    const s = Progreso2.Suerte.resumen();

    // las 12 especies mas buscadas
    const B = Progreso2.Busqueda.estado();
    const top = Object.keys(B).sort((a,b) => B[b]-B[a]).slice(0, 12);

    let html = `<h3>Suerte</h3>
        <p>Tiradas de variocolor: <strong>${s.tiradas.toLocaleString('es')}</strong> ·
        conseguidos: <strong>${s.shinies}</strong></p>
        <p>Llevas <strong>${s.sinShiny.toLocaleString('es')}</strong> tiradas sin uno.
        ${s.piedad > 1
            ? `La piedad ya multiplica tu probabilidad por <strong>x${s.piedad.toFixed(1)}</strong>.`
            : `La piedad empieza a los ${Progreso2.Suerte.PIEDAD_DESDE.toLocaleString('es')} (faltan ${s.faltanParaPiedad.toLocaleString('es')}).`}
        Garantizado en <strong>${s.garantizadoEn.toLocaleString('es')}</strong> tiradas más.</p>
        <p style="opacity:0.8">Peor racha: ${s.mejorRacha.toLocaleString('es')} tiradas seguidas sin nada.</p>`;

    html += `<h3>Nivel de búsqueda</h3>`;
    if (!top.length) {
        html += `<p>Aún no has derrotado salvajes. Cada derrota deja huella permanente
                 en esa especie: baja su denominador de variocolor y mejora sus IV.</p>`;
    } else {
        html += '<div class="lista-caza">' + top.map(id => {
            const n = Progreso2.Busqueda.nivel(id);
            const den = Math.round(Progreso2.Busqueda.denominadorShiny(id));
            const a = Progreso2.Aura.de(id);
            return `<div class="fila-caza">
                <img src="img/pkmn/sprite/${id}.png" alt="">
                <span><strong>${nom(id)}</strong>${a ? ` <em style="color:${a.color}">${a.nombre}</em>` : ''}<br>
                <small>Búsqueda ${n}/999 · variocolor 1/${den}</small></span>
            </div>`;
        }).join('') + '</div>';
    }

    const p = Progreso2.Profundidad;
    html += `<h3>Profundidad de zona</h3>
        <p>Nivel actual: <strong>${p.nivel()}/${p.TOPE}</strong> ·
        rivales +${Math.round((p.multNivel()-1)*100)} % de nivel ·
        botín +${Math.round((p.multBotin()-1)*100)} % ·
        experiencia +${Math.round((p.multExp()-1)*100)} %</p>
        <p style="opacity:0.8">Sube un tramo cada ${p.POR_TRAMO} derrotas sin salir de la zona.
        Salir lo reinicia.</p>`;

    // maestrias
    const M = Progreso2.Maestria.estado();
    const tm = Object.keys(M).sort((a,b)=>M[b]-M[a]).slice(0, 8);
    html += `<h3>Maestría de movimientos</h3>`;
    html += tm.length
        ? '<p>' + tm.map(m => {
            const pr = Progreso2.Maestria.progreso(m);
            return `${nom(m)} <strong>nv.${pr.nivel}</strong> (+${pr.nivel*4} %)` +
                   (pr.siguiente ? ` <small>${pr.usos}/${pr.siguiente}</small>` : ' <small>máximo</small>');
          }).join(' · ') + '</p>'
        : '<p>Los usos suben el movimiento, no al Pokémon. Aún no has usado ninguno.</p>';

    abrir('Progreso', html);
};

API.panelLinaje = function () {
    if (typeof Progreso2 === 'undefined') return;
    const L = Progreso2.Linaje.estado();
    const fams = Object.keys(L).sort((a,b) => Progreso2.Linaje.puntos(b) - Progreso2.Linaje.puntos(a)).slice(0, 25);

    let html = `<p>Cada familia evolutiva guarda el <strong>mejor IV que has visto</strong> en
        cada estadística, y todo ejemplar nuevo de esa familia nace ya con esos valores
        como mínimo. Así evolucionar deja de devolverte un Pokémon inútil, y el duplicado
        número 40 sigue sirviendo para algo.</p>`;

    if (!fams.length) { html += '<p>Aún no hay récords. Captura algo para empezar.</p>'; }
    else {
        html += '<div class="lista-caza">' + fams.map(r => {
            const v = L[r], pts = Progreso2.Linaje.puntos(r);
            return `<div class="fila-caza">
                <img src="img/pkmn/sprite/${r}.png" alt="">
                <span><strong>${nom(r)}</strong> <small>${pts}/36</small><br>
                <small>PS ${v.hp} · At ${v.atk} · Def ${v.def} · AtEsp ${v.satk} · DefEsp ${v.sdef} · Vel ${v.spe}</small></span>
            </div>`;
        }).join('') + '</div>';
    }

    // caramelos disponibles
    const C = Progreso2.Caramelos.estado();
    const conC = Object.keys(C).filter(k => C[k].n > 0);
    html += `<h3>Caramelos de especie</h3>`;
    html += conC.length
        ? '<p>' + conC.map(r => `${nom(r)}: <strong>${C[r].n}</strong>`).join(' · ') + '</p>'
        : `<p>La experiencia de un Pokémon a nivel 100 se tiraba entera. Ahora se convierte
           en caramelos de su familia, que suben de nivel a cualquier pariente.
           Hacen falta ${Progreso2.Caramelos.POR_CARAMELO.toLocaleString('es')} de experiencia por caramelo.</p>`;

    abrir('Linaje', html);
};


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
