/* =========================================================
   Herramientas de revisión (solo para presentar la propuesta).
   ELIMINAR revision.js, revision.css y sus dos líneas al final de cada página antes de publicar.
   ========================================================= */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var PAGINAS = [
    ['index.html', 'Inicio'],
    ['escuela.html', 'Escuela y cursos'],
    ['servicios.html', 'Servicios de salón'],
    ['productos.html', 'Productos'],
    ['nosotros.html', 'Nosotros'],
    ['sedes.html', 'Sedes'],
    ['franquicias.html', 'Franquicias y contacto']
  ];

  var PENDIENTES = [
    ['WhatsApp central', '¿Qué número recibe los mensajes de todo el sitio? Hoy se usa el 849-342-6689 (sede de Higüey, visible en la fachada). ¿Cada sede tiene WhatsApp propio?'],
    ['Las 23 sedes', 'Lista completa con ciudad, provincia, teléfono y dirección. Con ella, el buscador de sedes muestra los datos de cada provincia.'],
    ['Direcciones', 'Dirección de Santo Domingo y de Higüey, y el pin de Google Maps de cada sede.'],
    ['Curso profesional', 'Nombre del curso, temario, duración, horario, inversión, requisitos y qué incluye el certificado.'],
    ['Aval del MINERD', 'Texto exacto para mencionarlo y, si existe, el número de registro o resolución.'],
    ['Taller del mes', 'Tema, fechas y cupos del taller actual. El sitio escribe el mes solo (hora de RD).'],
    ['Capacitaciones', 'Cuáles hay, para quién son y cada cuánto se abren.'],
    ['Servicios', 'Precios de los 5 sistemas, duración de cada cita y si todas las sedes los ofrecen.'],
    ['Horario', '¿El horario general (L–V 9:00–6:00; S y D 10:00–6:30) aplica a todas las sedes?'],
    ['Productos', 'Catálogo por categoría, fotos en alta resolución, si venden por WhatsApp o en línea, y en qué sedes hay joyería de uñas.'],
    ['Franquicias', 'Requisitos, inversión y proceso. Hoy solo se menciona el acompañamiento.'],
    ['Fotos', 'Confirmar que el retrato de traje blanco y la foto de conferencia son de Vanessa Zambrano (hoy solo el retrato de la fundadora la nombra). Permiso para usar las fotos de prensa y de las personas que aparecen. Originales en alta resolución.'],
    ['Lema', '¿La versión oficial es «Más que uñas, somos arte y educación» (brief) o «Más que uñas, arte y educación» (letrero y gala)? El sitio usa las dos.'],
    ['Marca de productos', 'Confirmar el nombre comercial «Lovely Nailz Products» (sale de la cuenta @lovelynailz_products).'],
    ['Certificación', 'Confirmar si los talleres y las capacitaciones también entregan certificado. Hoy el sitio solo se lo atribuye al curso profesional.'],
    ['Testimonios', '3 testimonios reales de egresadas, con permiso, nombre, sede y año.'],
    ['Prensa', 'Enlaces a las notas de De Último Minuto, Wachao News, El Periódico RD y Herrera Farándula.'],
    ['Biografía', 'Países donde se certificó Vanessa, año de fundación de Lovely Nailz y trayectoria.'],
    ['Calificación 4,7', 'No se usó porque no sabemos de dónde sale (¿Google?). Si se confirma, puede ir en el inicio.'],
    ['Logo', 'Archivo oficial en vector (SVG o PDF). El del sitio se reconstruyó desde una foto de la gala.'],
    ['Dominio', 'Dominio y correo para publicar el sitio (y la URL absoluta de la imagen para compartir).']
  ];

  var MOVIMIENTO = [
    ['Encabezado de cada página', 'Al abrir', 'La ruta, el párrafo y los botones aparecen con fundido y 16 px. El título sube línea por línea desde una máscara (0,18 s y 0,32 s). El sello gira una vuelta cada 60 s.'],
    ['Inicio: muestrario', 'Al abrir', 'Las 5 uñas salen apiladas y se abren en abanico (1,25 s, cada una 70 ms después). Las fotos pasan de desenfocadas a nítidas.'],
    ['Uñas del abanico y del muestrario', 'Pasar el cursor', 'La uña se levanta siguiendo su propio ángulo, como al sacarla del muestrario.'],
    ['Ojo de gato', 'Mover el cursor', 'La franja de luz sigue al cursor, como con un imán. En la ficha hace un barrido de 1,6 s al entrar en pantalla (también en táctil).'],
    ['Fotos y fichas', 'Al entrar en pantalla', 'Se revelan de la cutícula a la punta, como una capa de esmalte (1,25 s). Las fotos bajan de 1,08 a 1 de zoom.'],
    ['Cifras', 'Al entrar en pantalla', '23, +120,000 y 10+ cuentan desde 0 en 1,4 s.'],
    ['Botones', 'Hover, clic, carga y éxito', 'El rosa entra como una pincelada (0,55 s), el botón sube 2 px y el ícono gira −8° (la flecha avanza 4 px). Al hacer clic se reduce al 97 %. En carga, una uña se pinta en bucle. En éxito queda pintado de rosa.'],
    ['Escuela: barra de la página', 'Scroll', 'Queda fija bajo la cabecera y subraya en rosa la sección que estás leyendo.'],
    ['Escuela: qué preguntar', 'Marcar opciones', 'Cada opción marcada pinta su uña y arma el mensaje de WhatsApp. Sin opciones, el botón se desactiva y aparece un aviso.'],
    ['Servicios: ¿cuál me conviene?', 'Clic', 'La opción elegida queda marcada y la recomendación entra con fundido y 14 px (0,6 s).'],
    ['Sedes: buscador', 'Buscar', 'El resultado entra con fundido. «Ver en la lista» resalta la sede en rosa (1,8 s).'],
    ['Carrusel y galería', 'Flechas, arrastre, dedo o teclado', 'El carrusel se alinea a la foto más cercana al soltar. Al tocar una foto se abre el lightbox (fundido y escala de 0,97 a 1).'],
    ['Preguntas', 'Clic', 'Se abren con altura animada (0,38 s) y el «+» gira 45°. En móvil queda una abierta a la vez.'],
    ['Inscripción y reserva', 'Avanzar pasos', 'Cada paso pinta una uña del progreso (0,9 s); la del paso actual queda a medio pintar.'],
    ['WhatsApp flotante', 'Scroll', 'Aparece al dejar atrás el encabezado y se aparta en los formularios y el pie.'],
    ['Cabecera', 'Scroll', 'Se compacta al bajar (84 → 68 px) y gana una línea inferior.'],
    ['Movimiento reducido', 'Ajuste del sistema', 'Todo queda quieto y visible: abanico abierto, fotos y fichas pintadas y sello sin girar.']
  ];

  var COLORES = [
    ['Tinta', '#171715', 'Texto, botones y secciones oscuras (negro del logo).'],
    ['Blanco', '#FFFFFF', 'Fondo principal.'],
    ['Rosa Lovely', '#FD8EB8', 'Uña del logo: acabados, pincelada de botones, detalles. Sobre tinta: 8,3:1.'],
    ['Rosa tinta', '#B5326B', 'Rosa para texto pequeño sobre blanco: 5,8:1.'],
    ['Rosa claro', '#FDF0F5', 'Fondo de secciones alternas.'],
    ['Violeta sello', '#7065EF', 'Anillo del sello LN: foco de teclado y detalles.']
  ];

  var archivo = (location.pathname.split('/').pop() || 'index.html');
  if (archivo.indexOf('.html') === -1) archivo = 'index.html';

  // Botón y panel
  var boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'rev-boton';
  boton.textContent = 'Revisión';
  boton.setAttribute('aria-expanded', 'false');
  boton.setAttribute('aria-controls', 'rev-panel');

  var panel = document.createElement('aside');
  panel.className = 'rev-panel';
  panel.id = 'rev-panel';
  panel.setAttribute('aria-label', 'Herramientas de revisión');
  panel.hidden = true;
  panel.innerHTML =
    '<div class="rev-cab"><h2>Revisión de la propuesta</h2><button type="button" class="rev-cerrar" aria-label="Cerrar revisión">×</button></div>' +
    '<div class="rev-tabs" role="tablist" aria-label="Secciones de revisión">' +
      '<button type="button" class="rev-tab" role="tab" aria-selected="true" aria-controls="rev-p1" id="rev-t1">Por confirmar</button>' +
      '<button type="button" class="rev-tab" role="tab" aria-selected="false" aria-controls="rev-p2" id="rev-t2" tabindex="-1">Movimiento</button>' +
      '<button type="button" class="rev-tab" role="tab" aria-selected="false" aria-controls="rev-p3" id="rev-t3" tabindex="-1">Sistema</button>' +
    '</div>' +
    '<div class="rev-cuerpo">' +
      '<div role="tabpanel" id="rev-p1" aria-labelledby="rev-t1"></div>' +
      '<div role="tabpanel" id="rev-p2" aria-labelledby="rev-t2" hidden></div>' +
      '<div role="tabpanel" id="rev-p3" aria-labelledby="rev-t3" hidden></div>' +
    '</div>';
  document.body.appendChild(boton);
  document.body.appendChild(panel);

  function esc(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

  // 1. Por confirmar
  var p1 = $('#rev-p1', panel);
  var marcas = $$('[data-pendiente]');
  var html = '<h3>Páginas del sitio</h3><ul class="rev-paginas">';
  PAGINAS.forEach(function (p) {
    var actual = p[0] === archivo;
    html += '<li><a href="' + p[0] + '"' + (actual ? ' aria-current="page"' : '') + '>' + esc(p[1]) + '</a></li>';
  });
  html += '</ul><h3>Marcas en esta página (' + marcas.length + ')</h3>' +
    '<label class="rev-check"><input type="checkbox" id="rev-resaltar"> Resaltar en la página</label><ul class="rev-lista">';
  marcas.forEach(function (m, i) {
    html += '<li class="rev-marca"><span>' + esc(m.getAttribute('data-pendiente')) + '</span><button type="button" class="rev-ir" data-ir="' + i + '">Ir</button></li>';
  });
  if (!marcas.length) html += '<li>Esta página no tiene datos por confirmar.</li>';
  html += '</ul><h3>Preguntas para Lovely Nailz (' + PENDIENTES.length + ')</h3><ul class="rev-lista">';
  PENDIENTES.forEach(function (p) { html += '<li><strong>' + esc(p[0]) + '</strong><span>' + esc(p[1]) + '</span></li>'; });
  p1.innerHTML = html + '</ul>';
  $('#rev-resaltar', p1).addEventListener('change', function (e) { document.documentElement.classList.toggle('rev-resaltar', e.target.checked); });
  $$('[data-ir]', p1).forEach(function (b) {
    b.addEventListener('click', function () {
      var m = marcas[Number(b.getAttribute('data-ir'))];
      if (!m) return;
      if (window.innerWidth < 900) cerrar();
      m.scrollIntoView({ behavior: 'smooth', block: 'center' });
      m.classList.remove('rev-destello');
      void m.offsetWidth;
      m.classList.add('rev-destello');
    });
  });

  // 2. Movimiento
  var p2 = $('#rev-p2', panel);
  html = '<h3>Qué se mueve, cuándo y cuánto dura</h3><ul class="rev-lista">';
  MOVIMIENTO.forEach(function (m) { html += '<li class="rev-mov"><em>' + esc(m[1]) + '</em><strong>' + esc(m[0]) + '</strong><span>' + esc(m[2]) + '</span></li>'; });
  p2.innerHTML = html + '</ul>';

  // 3. Sistema
  var p3 = $('#rev-p3', panel);
  html = '<h3>Colores</h3><div class="rev-colores">';
  COLORES.forEach(function (c) {
    html += '<div class="rev-color"><i style="background:' + c[1] + (c[1] === '#FFFFFF' ? ';box-shadow:inset 0 -1px 0 #ece5e8' : '') + '"></i><div><b>' + esc(c[0]) + ' ' + c[1] + '</b>' + esc(c[2]) + '</div></div>';
  });
  html += '</div><h3>Tipografía</h3><div class="rev-tipos">' +
    '<p style="font:500 26px/1.1 Jost, sans-serif;text-transform:uppercase">Jost · títulos y texto</p>' +
    '<p style="font:400 34px/1.1 \'Great Vibes\', cursive">Great Vibes, solo en frases de marca</p>' +
    '<ul class="rev-escala"><li>Título del inicio: 80 px (móvil 37 px), mayúsculas, 500</li><li>Título de cada página: 72 px + frase en Great Vibes de 84 px</li><li>Títulos de sección: 32–60 px, 500, interletrado −0,02 em</li><li>Texto: 17 px, 400, interlineado 1,6</li><li>Entradilla: 18–21 px, 300</li><li>Botones y menús: 12,5–13 px, mayúsculas, interletrado 0,14–0,16 em</li></ul></div>' +
    '<h3>Botones en 7 estados</h3><div class="rev-botones">' +
      '<div class="rev-estado"><span>Normal</span><span class="btn"><span class="btn-txt">Inscríbete</span></span></div>' +
      '<div class="rev-estado"><span>Hover</span><span class="btn is-hover"><span class="btn-txt">Inscríbete</span></span></div>' +
      '<div class="rev-estado"><span>Active</span><span class="btn is-active"><span class="btn-txt">Inscríbete</span></span></div>' +
      '<div class="rev-estado"><span>Focus</span><span class="btn is-focus"><span class="btn-txt">Inscríbete</span></span></div>' +
      '<div class="rev-estado"><span>Carga</span><span class="btn is-loading"><span class="btn-txt">Inscríbete</span></span></div>' +
      '<div class="rev-estado"><span>Éxito</span><span class="btn is-success"><span class="btn-txt">Mensaje listo</span></span></div>' +
      '<div class="rev-estado"><span>Deshabilitado</span><span class="btn is-disabled"><span class="btn-txt">Inscríbete</span></span></div>' +
    '</div>' +
    '<h3>Espaciado y forma</h3><ul class="rev-escala"><li>Ancho máximo 1280 px; márgenes laterales 20–56 px</li><li>Separación entre secciones 80–144 px</li><li>Botones rectos (2 px), fotos con forma de uña o de arco, fichas como tarjetas de muestrario</li><li>Cortes: 1180 px (menú), 1024 px (tablet), 768 px y 390 px (móvil)</li></ul>';
  p3.innerHTML = html;

  // Pestañas del panel
  var tabs = $$('.rev-tab', panel);
  function elegir(i, enfocar) {
    tabs.forEach(function (t, j) {
      var on = i === j;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (enfocar) tabs[i].focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { elegir(i); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); elegir((i + 1) % tabs.length, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); elegir((i - 1 + tabs.length) % tabs.length, true); }
    });
  });

  // Abrir y cerrar
  function abrir() {
    panel.hidden = false;
    requestAnimationFrame(function () { panel.classList.add('is-abierto'); });
    boton.setAttribute('aria-expanded', 'true');
    $('.rev-cerrar', panel).focus();
  }
  function cerrar() {
    panel.classList.remove('is-abierto');
    boton.setAttribute('aria-expanded', 'false');
    setTimeout(function () { if (!panel.classList.contains('is-abierto')) panel.hidden = true; }, 450);
    boton.focus();
  }
  boton.addEventListener('click', function () { if (boton.getAttribute('aria-expanded') === 'true') cerrar(); else abrir(); });
  $('.rev-cerrar', panel).addEventListener('click', cerrar);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && boton.getAttribute('aria-expanded') === 'true') cerrar(); });
})();
