/* =========================================================================
   Pokechill — Economía, colección y análisis
   =========================================================================
   Ideas 24-43 de IDEAS-2.md.
   ========================================================================= */

var Economia = (function () {

'use strict';

const API = {};
const E = Extras;

function nom(x) { try { return format(x); } catch (e) { return String(x); } }
function hoy() { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate(); }
function diaNum() { return Math.floor(Date.now() / 86400000); }

function semilla(txt) {
    let h = 0;
    for (let i = 0; i < txt.length; i++) h = (h * 31 + txt.charCodeAt(i)) >>> 0;
    return h;
}


/* ======================================================================
   24. INTERÉS POR AHORRO
   ====================================================================== */

API.TASA_DIARIA = 0.02;      // 2% al día
API.TOPE_INTERES = 50;       // no más de 50 chapas por día, para no romper nada

API.aplicarInteres = function () {
    if (saved.sinInteres === true) return 0;
    const ultimo = saved.ultimoInteres || diaNum();
    const dias = diaNum() - ultimo;
    if (dias <= 0) { saved.ultimoInteres = diaNum(); return 0; }

    const capital = (item.bottleCap && item.bottleCap.got) || 0;
    let ganado = 0;
    for (let d = 0; d < Math.min(dias, 7); d++) {
        ganado += Math.min(API.TOPE_INTERES, Math.floor((capital + ganado) * API.TASA_DIARIA));
    }
    saved.ultimoInteres = diaNum();
    if (ganado > 0) {
        item.bottleCap.got += ganado;
        E.aviso('💰 Interés', '+' + ganado + ' Chapas por tus ahorros');
    }
    return ganado;
};


/* ======================================================================
   25. ENCARGOS
   ====================================================================== */

const TIPOS_ENCARGO = [
    { id: 'derrotar', texto: (n, t) => 'Derrota ' + n + ' Pokémon de tipo ' + nombreTipo(t),
      leer: () => E.stats().combatesGanados },
    { id: 'objetos',  texto: n => 'Consigue ' + n + ' objetos',
      leer: () => E.stats().objetosRecibidos },
    { id: 'niveles',  texto: n => 'Sube ' + n + ' niveles',
      leer: () => E.stats().nivelesSubidos },
];
const nombreTipo = t => (typeof ES !== 'undefined' && ES.tipo && ES.tipo[t]) || t;

API.encargos = function () {
    if (!saved.encargos || saved.encargos.dia !== hoy()) {
        const s = semilla('encargo' + hoy());
        const lista = [];
        for (let i = 0; i < 2; i++) {
            const t = TIPOS_ENCARGO[(s + i * 7) % TIPOS_ENCARGO.length];
            const meta = 20 + ((s + i * 13) % 60);
            lista.push({ id: t.id, meta, base: t.leer(), hecho: false,
                         premio: 4 + ((s + i * 3) % 8) });
        }
        saved.encargos = { dia: hoy(), lista };
    }
    return saved.encargos;
};

API.progresoEncargo = function (e) {
    const t = TIPOS_ENCARGO.find(x => x.id === e.id);
    return t ? Math.max(0, t.leer() - e.base) : 0;
};

API.textoEncargo = function (e) {
    const t = TIPOS_ENCARGO.find(x => x.id === e.id);
    return t ? t.texto(e.meta) : e.id;
};

API.revisarEncargos = function () {
    for (const e of API.encargos().lista) {
        if (e.hecho) continue;
        if (API.progresoEncargo(e) < e.meta) continue;
        e.hecho = true;
        if (item.goldenBottleCap) item.goldenBottleCap.got += e.premio;
        E.sonar('logro');
        E.aviso('📜 Encargo cumplido', API.textoEncargo(e) + ' · +' + e.premio + ' Chapas Doradas');
    }
};


/* ======================================================================
   26. SUBASTA DIARIA
   ====================================================================== */

API.subasta = function () {
    const s = semilla('subasta' + hoy());
    const raros = Object.keys(item).filter(k => item[k].type === 'held' || item[k].type === 'evo');
    const lote = raros[s % raros.length];
    const base = 20 + (s % 60);
    if (!saved.subasta || saved.subasta.dia !== hoy()) {
        saved.subasta = { dia: hoy(), lote, base, pujado: 0, ganado: false };
    }
    return saved.subasta;
};

API.pujar = function (cantidad) {
    const sub = API.subasta();
    if (sub.ganado) { E.aviso('Ya ganaste el lote de hoy'); return false; }
    const c = Math.max(0, Math.floor(Number(cantidad) || 0));
    if (c < sub.base) { E.aviso('Puja insuficiente', 'El mínimo es ' + sub.base); return false; }
    if ((item.bottleCap.got || 0) < c) { E.aviso('No tienes tantas Chapas'); return false; }

    item.bottleCap.got -= c;
    sub.pujado = c;
    // rival simulado: cuanto más pujes, más probable ganar
    const suerte = Math.random() * (sub.base * 2.2);
    if (c >= suerte) {
        sub.ganado = true;
        item[sub.lote].got += 3;
        E.sonar('logro');
        E.aviso('🔨 ¡Lote ganado!', '3 × ' + nom(sub.lote));
        return true;
    }
    E.aviso('🔨 Te han superado', 'Pierdes la puja. Inténtalo mañana.');
    return false;
};


/* ======================================================================
   27. INVERSIÓN EN ZONAS
   ====================================================================== */

API.COSTE_INVERSION = n => 25 + n * 40;
API.MAX_INVERSION = 5;

API.inversiones = function () {
    if (!saved.inversiones) saved.inversiones = {};
    return saved.inversiones;
};

API.nivelInversion = function (idArea) { return API.inversiones()[idArea] || 0; };

API.invertir = function (idArea) {
    const n = API.nivelInversion(idArea);
    if (n >= API.MAX_INVERSION) { E.aviso('Zona al máximo'); return false; }
    const coste = API.COSTE_INVERSION(n);
    if ((item.bottleCap.got || 0) < coste) { E.aviso('Faltan Chapas', 'Cuesta ' + coste); return false; }
    item.bottleCap.got -= coste;
    API.inversiones()[idArea] = n + 1;
    E.sonar('objeto');
    E.aviso('🏗 Zona mejorada', nom(idArea) + ' nivel ' + (n + 1) + ' · +' + ((n + 1) * 10) + '% de objetos');
    return true;
};

API.multInversion = function (idArea) { return 1 + API.nivelInversion(idArea) * 0.1; };


/* ======================================================================
   28. PRECIOS QUE REACCIONAN A TUS COMPRAS
   ====================================================================== */

API.registrarCompra = function (idItem, cantidad) {
    if (!saved.historialCompras) saved.historialCompras = {};
    const h = saved.historialCompras;
    if (!h[idItem] || h[idItem].dia !== hoy()) h[idItem] = { dia: hoy(), n: 0 };
    h[idItem].n += (cantidad || 1);
};

API.factorDemanda = function (idItem) {
    const h = saved.historialCompras && saved.historialCompras[idItem];
    if (!h || h.dia !== hoy()) return 1;
    // +4% por unidad comprada hoy, hasta +80%
    return Math.min(1.8, 1 + h.n * 0.04);
};


/* ======================================================================
   31. MARCAS DE NACIMIENTO
   ====================================================================== */

const MOMENTOS = ['al amanecer', 'a media mañana', 'al mediodía', 'por la tarde',
                  'al atardecer', 'de noche', 'de madrugada'];

API.marcarNacimiento = function (idPkmn) {
    const p = pkmn[idPkmn];
    if (!p || p.marca) return;
    const h = new Date().getHours();
    p.marca = {
        zona: saved.currentArea || 'desconocida',
        cuando: Date.now(),
        momento: MOMENTOS[Math.floor(h / 24 * MOMENTOS.length)],
        clima: saved.weather || null,
    };
};

API.textoMarca = function (idPkmn) {
    const m = pkmn[idPkmn] && pkmn[idPkmn].marca;
    if (!m) return null;
    const f = new Date(m.cuando).toLocaleDateString('es-ES');
    return 'Encontrado en ' + nom(m.zona) + ' ' + m.momento + ', el ' + f +
           (m.clima ? ' con ' + nom(m.clima) : '');
};


/* ======================================================================
   33. MEMORIAL NUZLOCKE
   ====================================================================== */

API.memorial = function () {
    if (!saved.memorial) saved.memorial = [];
    return saved.memorial;
};

API.registrarCaida = function (idPkmn) {
    const p = pkmn[idPkmn];
    if (!p) return;
    API.memorial().push({
        id: idPkmn, nivel: p.level || 1, mote: p.nickname || null,
        zona: saved.currentArea || 'desconocida', cuando: Date.now(),
    });
    if (saved.memorial.length > 200) saved.memorial = saved.memorial.slice(-200);
    E.aviso('🪦 ' + nom(idPkmn) + ' ha caído', 'Nivel ' + (p.level || 1) + ' en ' + nom(saved.currentArea || '?'));
};


/* ======================================================================
   34. INTERCAMBIO POR CÓDIGO
   ====================================================================== */

API.exportarPkmn = function (idPkmn) {
    const p = pkmn[idPkmn];
    if (!p || !p.caught) return null;
    const d = { v: 1, p: idPkmn, l: p.level, s: !!p.shiny, n: p.nickname || null,
                i: p.ivs, m: Object.values(p.moves).filter(Boolean),
                a: p.ability || null, r: p.ribbons || [] };
    try { return btoa(unescape(encodeURIComponent(JSON.stringify(d)))); } catch (e) { return null; }
};

API.importarPkmn = function (codigo) {
    let d;
    try { d = JSON.parse(decodeURIComponent(escape(atob(String(codigo).trim())))); }
    catch (e) { E.aviso('Código no válido'); return null; }
    if (!d || !d.p || !pkmn[d.p]) { E.aviso('Ese Pokémon no existe'); return null; }

    const p = pkmn[d.p];
    const eraNuevo = !p.caught;
    p.caught = (p.caught || 0) + 1;
    if (d.l > (p.level || 0)) p.level = d.l;
    if (d.s) p.shiny = true;
    if (d.n) p.nickname = d.n;
    if (d.i) for (const k in d.i) if ((d.i[k] || 0) > (p.ivs[k] || 0)) p.ivs[k] = d.i[k];
    if (Array.isArray(d.m)) { p.movepool = [...new Set([...(p.movepool || []), ...d.m])]; }
    if (Array.isArray(d.r)) p.ribbons = [...new Set([...(p.ribbons || []), ...d.r])];

    E.sonar('captura');
    E.aviso('🤝 Recibido: ' + nom(d.p), eraNuevo ? '¡Especie nueva!' : 'Se han fusionado sus datos');
    return d;
};


/* ======================================================================
   36. COLECCIÓN POR GENERACIONES
   ====================================================================== */

const CORTES_GEN = [151, 251, 386, 493, 649, 721, 809, 905, 1025];

API.porGeneracion = function () {
    const ids = Object.keys(pkmn).filter(k => !pkmn[k].hidden);
    const out = [];
    let desde = 0;
    for (let g = 0; g < CORTES_GEN.length; g++) {
        const hasta = Math.min(CORTES_GEN[g], ids.length);
        const trozo = ids.slice(desde, hasta);
        const tengo = trozo.filter(k => pkmn[k].caught > 0).length;
        out.push({ gen: g + 1, total: trozo.length, tengo,
                   pct: trozo.length ? Math.round(tengo / trozo.length * 100) : 0 });
        desde = hasta;
        if (desde >= ids.length) break;
    }
    return out;
};


/* ======================================================================
   37. ¿QUÉ ME CONVIENE HACER AHORA?
   ======================================================================
   La pieza que le faltaba a todo lo que ya se mide: convertir datos en
   una recomendación concreta.
   ====================================================================== */

API.consejo = function () {
    const s = E.stats();
    const sugerencias = [];

    const especies = (typeof Progreso !== 'undefined') ? Progreso.capturados() : 0;
    const cien = (typeof Progreso !== 'undefined') ? Progreso.nivel100() : 0;

    // prestigio disponible
    if (typeof Progreso !== 'undefined' && Progreso.puedeRenacer()) {
        const e = Progreso.esenciaAlRenacer();
        if (e >= 30) sugerencias.push({
            prioridad: 90 + Math.min(9, e / 50),
            titulo: 'Renacer',
            texto: 'Te daría ' + e + ' de Esencia. Cuanto antes renazcas, antes empiezan a rendir los talentos.',
            accion: 'Paneles.pintarPrestigio()',
        });
    }

    // talentos sin gastar
    if ((saved.esencia || 0) >= 20) sugerencias.push({
        prioridad: 85,
        titulo: 'Gastar Esencia',
        texto: 'Tienes ' + saved.esencia + ' de Esencia parada. No rinde nada guardada.',
        accion: 'Paneles.pintarPrestigio()',
    });

    // objetos que reciclar
    if (typeof Coleccion !== 'undefined') {
        const rec = Coleccion.reciclables();
        if (rec.length >= 3) sugerencias.push({
            prioridad: 60,
            titulo: 'Reciclar excedente',
            texto: rec.length + ' objetos con copias de sobra que no te dan nada.',
            accion: 'Paneles2.reciclaje()',
        });
    }

    // equipo sin optimizar
    if (typeof Asesor !== 'undefined' && saved.currentArea) {
        sugerencias.push({
            prioridad: 70,
            titulo: 'Revisar el equipo',
            texto: 'El asesor puede recalcular equipo, movimientos y objetos para esta zona.',
            accion: 'Paneles4.recomendar()',
        });
    }

    // misiones a medias
    if (typeof Progreso !== 'undefined') {
        const ms = Progreso.misiones().lista.filter(m => !m.hecha);
        if (ms.length) sugerencias.push({
            prioridad: 55,
            titulo: 'Misiones de hoy',
            texto: ms.length + ' sin completar. Dan Chapas y caducan a medianoche.',
            accion: 'Paneles.pintarMisiones()',
        });
    }

    // pase por reclamar
    if (typeof Coleccion !== 'undefined') {
        const n = Coleccion.nivelPase() - (saved.paseReclamado || 0);
        if (n > 0) sugerencias.push({
            prioridad: 80,
            titulo: 'Recompensas del pase',
            texto: n + ' nivel(es) sin reclamar.',
            accion: 'Paneles2.pase()',
        });
    }

    // pocos a nivel 100
    if (especies >= 20 && cien < 3) sugerencias.push({
        prioridad: 50,
        titulo: 'Subir a nivel 100',
        texto: 'Solo tienes ' + cien + ' al máximo. El nivel multiplica el daño de forma lineal: es lo que más rinde.',
        accion: null,
    });

    // sin variocolor
    if (s.rachaSinVariocolor > 600) sugerencias.push({
        prioridad: 40,
        titulo: 'Cazar variocolor',
        texto: 'Llevas ' + s.rachaSinVariocolor + ' encuentros sin uno. Los talentos de Fortuna suben mucho esa probabilidad.',
        accion: 'Paneles.pintarPrestigio()',
    });

    sugerencias.sort((a, b) => b.prioridad - a.prioridad);
    return sugerencias.slice(0, 5);
};


/* ======================================================================
   38. CALCULADORA DE TIEMPO HASTA OBJETIVO
   ====================================================================== */

API.ritmo = function () {
    const h = saved.historial || [];
    if (h.length < 2) return null;
    const a = h[0], b = h[h.length - 1];
    const dias = Math.max(1, (new Date(b.dia) - new Date(a.dia)) / 86400000);
    return {
        especiesPorDia: (b.especies - a.especies) / dias,
        combatesPorDia: (b.combates - a.combates) / dias,
        dias,
    };
};

API.tiempoHasta = function (especiesObjetivo) {
    const r = API.ritmo();
    if (!r || r.especiesPorDia <= 0) return null;
    const faltan = especiesObjetivo - ((typeof Progreso !== 'undefined') ? Progreso.capturados() : 0);
    if (faltan <= 0) return { dias: 0, texto: 'Ya lo has conseguido' };
    const dias = faltan / r.especiesPorDia;
    return { dias, texto: dias < 1 ? 'menos de un día'
                        : dias < 30 ? Math.round(dias) + ' días'
                        : Math.round(dias / 30) + ' meses' };
};


/* ======================================================================
   39. REGISTRO DE COMBATE
   ====================================================================== */

const LIMITE_LOG = 60;
const log = [];

API.registrar = function (entrada) {
    if (saved.sinRegistro === true) return;
    log.push({ ...entrada, t: Date.now() });
    if (log.length > LIMITE_LOG) log.shift();
};

API.log = function () { return log.slice().reverse(); };
API.limpiarLog = function () { log.length = 0; };


/* ======================================================================
   40. MAPA DE CALOR DE ZONAS
   ====================================================================== */

API.registrarTiempoZona = function (segundos) {
    if (!saved.calorZonas) saved.calorZonas = {};
    const z = saved.currentArea;
    if (!z) return;
    saved.calorZonas[z] = (saved.calorZonas[z] || 0) + segundos;
};

API.mapaDeCalor = function () {
    const c = saved.calorZonas || {};
    const lista = Object.keys(c).map(k => ({ zona: k, segundos: c[k] }));
    lista.sort((a, b) => b.segundos - a.segundos);
    const total = lista.reduce((a, x) => a + x.segundos, 0) || 1;
    return lista.map(x => ({ ...x, pct: Math.round(x.segundos / total * 100) }));
};


/* ======================================================================
   41. DETECTOR DE CUELLOS DE BOTELLA
   ====================================================================== */

API.diagnostico = function () {
    const problemas = [];
    const equipo = [];
    for (const s in team) if (team[s].pkmn) equipo.push(team[s].pkmn.id);
    if (!equipo.length) return [{ tipo: 'aviso', texto: 'No hay equipo montado.' }];

    // niveles bajos
    const nivelMedio = equipo.reduce((a, id) => a + (pkmn[id].level || 1), 0) / equipo.length;
    if (nivelMedio < 60) problemas.push({ tipo: 'nivel',
        texto: 'Tu nivel medio es ' + Math.round(nivelMedio) + '. El nivel multiplica el daño linealmente: subirlo rinde más que casi nada.' });

    // rotaciones sin cruce
    let sinCruce = 0;
    for (const id of equipo) {
        const movs = Object.values(pkmn[id].moves).filter(Boolean);
        const tipos = new Set(movs.map(m => move[m] && move[m].type));
        if (tipos.size <= 1) sinCruce++;
    }
    if (sinCruce) problemas.push({ tipo: 'cruce',
        texto: sinCruce + ' miembro(s) llevan un solo tipo de movimiento y no activan la Potencia Cruzada. Es un ×1.3 perdido.' });

    // sin objetos
    let sinObjeto = 0;
    for (const s in team) if (team[s].pkmn && !team[s].item) sinObjeto++;
    if (sinObjeto) problemas.push({ tipo: 'objetos',
        texto: sinObjeto + ' miembro(s) sin objeto equipado.' });

    // IVs bajos
    const ivMedio = equipo.reduce((a, id) => {
        const iv = pkmn[id].ivs ? Object.values(pkmn[id].ivs).reduce((x, y) => x + y, 0) : 0;
        return a + iv;
    }, 0) / equipo.length;
    if (ivMedio < 12) problemas.push({ tipo: 'ivs',
        texto: 'IV medios bajos (' + Math.round(ivMedio) + '/36). Capturar duplicados y la genética los suben.' });

    // poca variedad de tipos
    const tipos = new Set();
    equipo.forEach(id => pkmn[id].type.forEach(t => tipos.add(t)));
    if (tipos.size <= 2) problemas.push({ tipo: 'variedad',
        texto: 'Solo cubres ' + tipos.size + ' tipo(s). Un rival que los resista te frena en seco.' });

    if (!problemas.length) problemas.push({ tipo: 'ok', texto: 'No veo nada evidente que arreglar. Buen equipo.' });
    return problemas;
};


/* ======================================================================
   42. BUILDS GUARDADAS  ·  43. EXPORTAR ESTADÍSTICAS
   ====================================================================== */

API.builds = function () {
    if (!saved.builds) saved.builds = [];
    return saved.builds;
};

API.guardarBuild = function (nombre) {
    const equipo = [];
    for (const s of ['slot1','slot2','slot3','slot4','slot5','slot6']) {
        const t = saved.previewTeams[saved.currentPreviewTeam][s];
        if (!t.pkmn) continue;
        equipo.push({ p: t.pkmn, i: t.item || null,
                      m: Object.values(pkmn[t.pkmn].moves).filter(Boolean) });
    }
    if (!equipo.length) { E.aviso('Nada que guardar'); return false; }
    API.builds().push({ nombre: nombre || ('Build ' + (API.builds().length + 1)),
                        equipo, cuando: Date.now() });
    E.aviso('💾 Build guardada', nombre || '');
    return true;
};

API.cargarBuild = function (i) {
    const b = API.builds()[i];
    if (!b) return false;
    const destino = saved.previewTeams[saved.currentPreviewTeam];
    const slots = ['slot1','slot2','slot3','slot4','slot5','slot6'];
    for (let n = 0; n < slots.length; n++) {
        const e = b.equipo[n];
        if (!e) { destino[slots[n]].pkmn = undefined; destino[slots[n]].item = undefined; continue; }
        destino[slots[n]].pkmn = e.p;
        destino[slots[n]].item = e.i || undefined;
        if (pkmn[e.p] && Array.isArray(e.m)) {
            pkmn[e.p].moves.slot1 = e.m[0] || null;
            pkmn[e.p].moves.slot2 = e.m[1] || null;
            pkmn[e.p].moves.slot3 = e.m[2] || null;
            pkmn[e.p].moves.slot4 = e.m[3] || null;
        }
    }
    if (typeof updatePreviewTeam === 'function') updatePreviewTeam();
    E.sonar('boton');
    return true;
};

API.borrarBuild = function (i) { API.builds().splice(i, 1); };

API.exportarEstadisticas = function () {
    const s = E.stats();
    const filas = [['clave', 'valor']];
    for (const k in s) filas.push([k, s[k]]);
    filas.push(['especies', (typeof Progreso !== 'undefined') ? Progreso.capturados() : 0]);
    filas.push(['prestigios', saved.prestigios || 0]);
    filas.push(['esencia', saved.esencia || 0]);
    const csv = filas.map(f => f.join(',')).join('\n');

    try {
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'pokechill-estadisticas.csv';
        a.click();
        URL.revokeObjectURL(a.href);
        E.aviso('📊 Estadísticas exportadas', 'Revisa tus descargas');
    } catch (e) { E.aviso('No se pudo exportar', e.message); }
};


return API;

})();
