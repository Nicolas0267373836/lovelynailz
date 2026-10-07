/* =========================================================
   Lovely Nailz RD — interacciones del sitio de muestra (WebDom)
   Un solo archivo para las 7 páginas: cada bloque revisa si su
   componente existe en la página antes de activarse.
   Nada se envía a ningún servidor: los formularios arman el
   mensaje y abren WhatsApp en el dispositivo de la persona.
   ========================================================= */
(function () {
  'use strict';

  /* ===== Datos editables ===== */
  var CONFIG = {
    // PENDIENTE: confirmar el número central de WhatsApp.
    // Hoy se usa el de la sede de Higüey, el único visible como WhatsApp (fachada).
    whatsapp: '18493426689',
    saludo: 'Hola, Lovely Nailz 💗',
    zonaHoraria: 'America/Santo_Domingo'
  };

  // Sedes con datos confirmados (las usa el buscador de sedes)
  var SEDES = {
    'santo-domingo': { ciudad: 'Santo Domingo', dir: '', tel: '809-919-3211', telHref: '+18099193211' },
    santiago: { ciudad: 'Santiago', dir: 'C/ Dr. Arturo Grullón 20', tel: '829-910-1560', telHref: '+18299101560',
      mapa: 'https://www.google.com/maps/search/?api=1&query=Lovely%20Nailz%2C%20C%2F%20Dr.%20Arturo%20Grull%C3%B3n%2020%2C%20Santiago%2C%20Rep%C3%BAblica%20Dominicana' },
    'san-pedro': { ciudad: 'San Pedro de Macorís', dir: 'C/ Rafael Deligne 32', tel: '809-339-9330', telHref: '+18093399330',
      mapa: 'https://www.google.com/maps/search/?api=1&query=Lovely%20Nailz%2C%20C%2F%20Rafael%20Deligne%2032%2C%20San%20Pedro%20de%20Macor%C3%ADs%2C%20Rep%C3%BAblica%20Dominicana' },
    higuey: { ciudad: 'Higüey', dir: '', tel: '849-342-6689', telHref: '+18493426689', whatsapp: true }
  };
  // Provincia → sede confirmada en esa provincia
  var SEDE_POR_PROVINCIA = {
    'Distrito Nacional': 'santo-domingo',
    'Santo Domingo': 'santo-domingo',
    'Santiago': 'santiago',
    'San Pedro de Macorís': 'san-pedro',
    'La Altagracia': 'higuey'
  };

  /* ===== Utilidades ===== */
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var raiz = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var punteroFino = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var hayIO = 'IntersectionObserver' in window;

  function urlWA(texto) {
    return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(texto);
  }
  function waConSaludo(texto) { return urlWA(CONFIG.saludo + ' ' + texto); }
  function listaNatural(items) {
    if (items.length < 2) return items.join('');
    return items.slice(0, -1).join(', ') + ' y ' + items[items.length - 1];
  }
  function mayuscula(t) { return t ? t.charAt(0).toUpperCase() + t.slice(1) : t; }
  function crear(tag, clase, texto) {
    var el = document.createElement(tag);
    if (clase) el.className = clase;
    if (texto != null) el.textContent = texto;
    return el;
  }
  function abrirWA(url) {
    // En algunos navegadores window.open devuelve null: el enlace de respaldo cubre ese caso
    try { window.open(url, '_blank', 'noopener'); } catch (e) { /* sin acción */ }
  }

  var MES = (function () {
    var meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    try {
      return new Intl.DateTimeFormat('es-DO', { month: 'long', timeZone: CONFIG.zonaHoraria }).format(new Date()).toLowerCase();
    } catch (e) {
      return meses[new Date().getMonth()];
    }
  })();

  // Mensaje de cada enlace con atributo data-wa
  var MENSAJES = {
    general: 'Quiero información de los cursos y talleres.',
    curso: 'Quiero información del curso profesional de uñas: fechas, horario e inversión.',
    taller: 'Quiero información del taller de ' + MES + ': tema, fecha y cupos.',
    capacitacion: 'Quiero información de las capacitaciones para egresadas.',
    servicios: 'Quiero reservar un servicio de uñas. ¿Qué disponibilidad tienen?',
    'servicio-acrygel': 'Quiero reservar acrygel. ¿Qué disponibilidad tienen?',
    'servicio-acrilicas': 'Quiero reservar uñas acrílicas. ¿Qué disponibilidad tienen?',
    'servicio-rubber': 'Quiero reservar rubber gel. ¿Qué disponibilidad tienen?',
    'servicio-naturales': 'Quiero reservar uñas naturales. ¿Qué disponibilidad tienen?',
    'servicio-ojo': 'Quiero reservar ojo de gato. ¿Qué disponibilidad tienen?',
    productos: 'Quiero información de los productos Lovely Nailz.',
    franquicia: 'Quiero información para abrir una sede Lovely Nailz. ¿Me envían los requisitos y la inversión?',
    sede: 'Quiero saber cuál es la sede más cercana a mí.',
    higuey: 'Escribo a la sede de Higüey. Quiero información.',
    contacto: 'Quiero información.'
  };

  /* ===== Enlaces de WhatsApp, mes del taller y año ===== */
  $$('[data-wa]').forEach(function (a) {
    var texto = MENSAJES[a.getAttribute('data-wa')] || MENSAJES.general;
    a.setAttribute('href', waConSaludo(texto));
  });
  $$('[data-mes]').forEach(function (el) { el.textContent = MES; });
  $$('[data-mes-titulo]').forEach(function (el) { el.textContent = 'de ' + MES; });
  $$('[data-anio]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* ===== Cabecera y menú ===== */
  var cabecera = $('#cabecera');
  function alHacerScroll() { cabecera.classList.toggle('is-compacta', window.scrollY > 40); }
  window.addEventListener('scroll', alHacerScroll, { passive: true });
  alHacerScroll();

  var menuBtn = $('.menu-btn');
  var menu = $('#menu-movil');
  var menuAbierto = false;
  function abrirMenu() {
    menuAbierto = true;
    menu.style.setProperty('--menu-top', Math.max(0, cabecera.getBoundingClientRect().bottom) + 'px');
    menu.hidden = false;
    requestAnimationFrame(function () { menu.classList.add('is-abierto'); });
    menuBtn.setAttribute('aria-expanded', 'true');
    $('.sr', menuBtn).textContent = 'Cerrar menú';
    document.body.classList.add('menu-abierto');
  }
  function cerrarMenu(devolverFoco) {
    if (!menuAbierto) return;
    menuAbierto = false;
    menu.classList.remove('is-abierto');
    menuBtn.setAttribute('aria-expanded', 'false');
    $('.sr', menuBtn).textContent = 'Abrir menú';
    document.body.classList.remove('menu-abierto');
    setTimeout(function () { if (!menuAbierto) menu.hidden = true; }, reduce ? 0 : 320);
    if (devolverFoco) menuBtn.focus();
  }
  menuBtn.addEventListener('click', function () { if (menuAbierto) cerrarMenu(); else abrirMenu(); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) cerrarMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menuAbierto) cerrarMenu(true); });
  var mqEscritorio = window.matchMedia('(min-width: 1180px)');
  if (mqEscritorio.addEventListener) mqEscritorio.addEventListener('change', function (e) { if (e.matches) cerrarMenu(); });

  /* ===== Navegación de la página (escuela): sección activa ===== */
  var subnav = $('.subnav');
  if (subnav && hayIO) {
    var subIn = $('.subnav-in', subnav);
    var enlacesSub = $$('a[href^="#"]', subnav);
    var visibles = {};
    var actualSub = null;
    var marcarSub = function () {
      var activo = null;
      enlacesSub.forEach(function (a) { if (!activo && visibles[a.getAttribute('href').slice(1)]) activo = a; });
      if (activo === actualSub) return;
      actualSub = activo;
      enlacesSub.forEach(function (a) {
        var on = a === activo;
        a.classList.toggle('is-activo', on);
        if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
      });
      // En móvil, deja visible el enlace activo dentro de la barra deslizable
      if (!activo && subIn.scrollLeft > 0) subIn.scrollTo({ left: 0, behavior: reduce ? 'auto' : 'smooth' });
      if (activo && subIn.scrollWidth > subIn.clientWidth) {
        var izq = activo.offsetLeft - (subIn.clientWidth - activo.offsetWidth) / 2;
        subIn.scrollTo({ left: Math.max(0, izq), behavior: reduce ? 'auto' : 'smooth' });
      }
    };
    var ioSub = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) { visibles[en.target.id] = en.isIntersecting; });
      marcarSub();
    }, { rootMargin: '-35% 0px -60% 0px' });
    enlacesSub.forEach(function (a) {
      var s = document.getElementById(a.getAttribute('href').slice(1));
      if (s) ioSub.observe(s);
    });
  }

  /* ===== Carga orquestada (inicio y encabezados de página) ===== */
  var muestrario = $('#muestrario');
  $$('.tip-in img').forEach(function (img) {
    var nitida = function () { img.classList.add('is-nitida'); };
    if (img.complete && img.naturalWidth) nitida();
    else { img.addEventListener('load', nitida, { once: true }); img.addEventListener('error', nitida, { once: true }); }
  });
  function arrancar() {
    raiz.classList.add('is-cargado');
    setTimeout(function () { if (muestrario) muestrario.classList.add('is-listo'); }, reduce ? 0 : 2300);
  }
  var esperaFuentes = (document.fonts && document.fonts.ready)
    ? Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 700); })])
    : Promise.resolve();
  esperaFuentes.then(function () { requestAnimationFrame(function () { requestAnimationFrame(arrancar); }); });

  /* ===== Ojo de gato: la franja de luz sigue al cursor, como con un imán ===== */
  var ojos = $$('[data-ojo]');
  if (ojos.length && !reduce && punteroFino) {
    var px = 0, pendiente = 0;
    window.addEventListener('pointermove', function (e) {
      px = e.clientX;
      if (pendiente) return;
      pendiente = requestAnimationFrame(function () {
        pendiente = 0;
        ojos.forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.bottom < 0 || r.top > window.innerHeight) return;
          var rel = Math.max(-1, Math.min(1, (px - (r.left + r.width / 2)) / 420));
          el.style.setProperty('--band', (50 + rel * 34).toFixed(1) + '%');
        });
      });
    }, { passive: true });
  }
  // Barrido de la franja al entrar en pantalla (también en táctil)
  var barridos = $$('[data-barrido]');
  if (barridos.length && hayIO && !reduce) {
    var ioBarrido = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        ioBarrido.unobserve(en.target);
        setTimeout(function () { en.target.classList.add('is-barrido'); }, 700);
      });
    }, { threshold: 0.5 });
    barridos.forEach(function (el) {
      ioBarrido.observe(el);
      el.addEventListener('animationend', function () { el.classList.remove('is-barrido'); });
    });
  }

  /* ===== Fotos y uñas que se "pintan" al entrar en pantalla ===== */
  var pintables = $$('[data-pintar]');
  if (hayIO && !reduce) {
    var ioPintar = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-pintado'); ioPintar.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    pintables.forEach(function (el) { ioPintar.observe(el); });
  } else {
    pintables.forEach(function (el) { el.classList.add('is-pintado'); });
  }

  /* ===== Cifras que cuentan desde cero ===== */
  function formatear(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  $$('[data-contar]').forEach(function (el) {
    var meta = Number(el.getAttribute('data-contar'));
    var pre = el.getAttribute('data-prefijo') || '';
    var suf = el.getAttribute('data-sufijo') || '';
    var final = pre + formatear(meta) + suf;
    var lector = crear('span', 'sr', final);
    el.parentNode.insertBefore(lector, el.nextSibling);
    el.setAttribute('aria-hidden', 'true');
    if (reduce || !hayIO || el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    el.textContent = pre + '0' + suf;
    var io = new IntersectionObserver(function (entradas) {
      if (!entradas[0].isIntersecting) return;
      io.disconnect();
      var inicio = performance.now();
      var dur = 1400;
      (function paso(t) {
        var p = Math.min(1, (t - inicio) / dur);
        var e = 1 - Math.pow(1 - p, 3);
        el.textContent = pre + formatear(Math.round(meta * e)) + suf;
        if (p < 1) requestAnimationFrame(paso); else el.textContent = final;
      })(inicio);
    }, { threshold: 0.5 });
    io.observe(el);
  });

  /* ===== Carrusel de momentos (inicio) ===== */
  var carrusel = $('#momentos');
  if (carrusel) {
    var bPrev = $('[data-carrusel="prev"]');
    var bNext = $('[data-carrusel="next"]');
    var desplazar = function (dir) {
      carrusel.scrollBy({ left: dir * Math.max(260, carrusel.clientWidth * 0.7), behavior: reduce ? 'auto' : 'smooth' });
    };
    bPrev.addEventListener('click', function () { desplazar(-1); });
    bNext.addEventListener('click', function () { desplazar(1); });
    var actualizarFlechas = function () {
      var max = carrusel.scrollWidth - carrusel.clientWidth - 2;
      bPrev.disabled = carrusel.scrollLeft <= 2;
      bNext.disabled = carrusel.scrollLeft >= max;
    };
    carrusel.addEventListener('scroll', function () { requestAnimationFrame(actualizarFlechas); }, { passive: true });
    window.addEventListener('resize', actualizarFlechas);
    actualizarFlechas();
    carrusel.addEventListener('keydown', function (e) {
      if (e.target !== carrusel) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); desplazar(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); desplazar(-1); }
    });

    // Arrastre con el mouse (en pantallas táctiles el desplazamiento es nativo)
    var x0 = 0, s0 = 0, arrastrando = false, movio = false;
    carrusel.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      arrastrando = true; movio = false; x0 = e.clientX; s0 = carrusel.scrollLeft;
    });
    window.addEventListener('pointermove', function (e) {
      if (!arrastrando) return;
      var dx = e.clientX - x0;
      if (!movio && Math.abs(dx) > 6) { movio = true; carrusel.classList.add('is-arrastrando'); }
      if (movio) carrusel.scrollLeft = s0 - dx;
    });
    window.addEventListener('pointerup', function () {
      if (!arrastrando) return;
      arrastrando = false;
      if (!movio) return;
      carrusel.classList.remove('is-arrastrando');
      var borde = parseFloat(getComputedStyle(carrusel).paddingLeft) || 0;
      var cr = carrusel.getBoundingClientRect();
      var mejor = null;
      $$('.momento', carrusel).forEach(function (it) {
        var d = it.getBoundingClientRect().left - cr.left - borde;
        if (mejor === null || Math.abs(d) < Math.abs(mejor)) mejor = d;
      });
      if (mejor) carrusel.scrollBy({ left: mejor, behavior: reduce ? 'auto' : 'smooth' });
      setTimeout(function () { movio = false; }, 0);
    });
    carrusel.addEventListener('click', function (e) {
      if (movio) { e.preventDefault(); e.stopPropagation(); }
    }, true);
  }

  /* ===== Lightbox (carrusel del inicio y galería de nosotros) ===== */
  var lb = $('#lightbox');
  var botonesFoto = $$('[data-galeria] [data-foto]');
  if (lb && botonesFoto.length) {
    var lbImg = $('#lightbox-img');
    var lbTxt = $('#lightbox-txt');
    var lbCont = $('.lightbox-cont', lb);
    var fotos = botonesFoto.map(function (b) {
      var img = $('img', b);
      var txt = $('.momento-txt', b);
      return { src: img.getAttribute('src'), alt: img.getAttribute('alt'), txt: txt ? txt.textContent : img.getAttribute('alt') };
    });
    var indice = 0;
    var disparador = null;
    var mostrarFoto = function (i) {
      indice = (i + fotos.length) % fotos.length;
      var f = fotos[indice];
      lbImg.style.maxWidth = '';
      lbImg.src = f.src;
      lbImg.alt = f.alt;
      lbTxt.textContent = f.txt;
      lbCont.textContent = 'Foto ' + (indice + 1) + ' de ' + fotos.length;
    };
    lbImg.addEventListener('load', function () {
      var w = lbImg.naturalWidth;
      if (w && w < 760) lbImg.style.maxWidth = Math.round(w * 1.5) + 'px';
    });
    botonesFoto.forEach(function (b, i) {
      b.addEventListener('click', function () {
        disparador = b;
        mostrarFoto(i);
        if (typeof lb.showModal === 'function') lb.showModal(); else lb.setAttribute('open', '');
        document.body.classList.add('menu-abierto');
      });
    });
    $('[data-lb="cerrar"]', lb).addEventListener('click', function () { lb.close(); });
    $('[data-lb="prev"]', lb).addEventListener('click', function () { mostrarFoto(indice - 1); });
    $('[data-lb="next"]', lb).addEventListener('click', function () { mostrarFoto(indice + 1); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); mostrarFoto(indice + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); mostrarFoto(indice - 1); }
    });
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('lightbox-in')) lb.close();
    });
    lb.addEventListener('close', function () {
      document.body.classList.remove('menu-abierto');
      if (disparador) disparador.focus();
    });
  }

  /* ===== Preguntas frecuentes (en móvil, una abierta a la vez) ===== */
  var mqMovil = window.matchMedia('(max-width: 767px)');
  var faqs = $$('.faq-item');
  function abrirFaq(d) {
    var c = $('.faq-resp', d);
    d.open = true;
    if (reduce || !c.animate) return;
    d.setAttribute('data-animando', '');
    var a = c.animate([{ height: '0px', opacity: 0 }, { height: c.scrollHeight + 'px', opacity: 1 }], { duration: 380, easing: 'cubic-bezier(.16,1,.3,1)' });
    a.onfinish = function () { d.removeAttribute('data-animando'); };
  }
  function cerrarFaq(d) {
    var c = $('.faq-resp', d);
    if (reduce || !c.animate) { d.open = false; return; }
    d.setAttribute('data-animando', '');
    var a = c.animate([{ height: c.offsetHeight + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 280, easing: 'ease', fill: 'forwards' });
    a.onfinish = function () { d.open = false; a.cancel(); d.removeAttribute('data-animando'); };
  }
  faqs.forEach(function (d) {
    $('summary', d).addEventListener('click', function (e) {
      e.preventDefault();
      if (d.hasAttribute('data-animando')) return;
      if (d.open) { cerrarFaq(d); return; }
      if (mqMovil.matches) faqs.forEach(function (o) { if (o !== d && o.open) cerrarFaq(o); });
      abrirFaq(d);
    });
  });

  /* ===== Qué preguntar: las opciones marcadas arman el mensaje ===== */
  var BASE_PREGUNTA = {
    curso: 'Quiero información del curso profesional de uñas.',
    taller: 'Quiero información del taller de ' + MES + '.',
    capacitacion: 'Quiero información de las capacitaciones para egresadas.'
  };
  $$('[data-preguntar]').forEach(function (caja) {
    var tipo = caja.getAttribute('data-preguntar');
    var boton = $('[data-preguntar-wa]', caja);
    var aviso = $('.preguntar-aviso', caja);
    var actualizar = function () {
      var marcados = $$('input:checked', caja).map(function (i) { return i.value; });
      var vacio = !marcados.length;
      aviso.hidden = !vacio;
      boton.classList.toggle('is-disabled', vacio);
      if (vacio) {
        boton.setAttribute('aria-disabled', 'true');
        boton.removeAttribute('href');
        boton.setAttribute('role', 'link');
        boton.setAttribute('tabindex', '0');
        return;
      }
      boton.removeAttribute('aria-disabled');
      boton.removeAttribute('role');
      boton.removeAttribute('tabindex');
      boton.setAttribute('href', waConSaludo(BASE_PREGUNTA[tipo] + ' Me gustaría saber ' + listaNatural(marcados) + '.'));
    };
    caja.addEventListener('change', actualizar);
    boton.addEventListener('click', function (e) {
      if (boton.getAttribute('aria-disabled') === 'true') { e.preventDefault(); aviso.classList.remove('is-entrando'); void aviso.offsetWidth; aviso.classList.add('is-entrando'); }
    });
    actualizar();
  });

  /* ===== ¿Cuál me conviene? (servicios) ===== */
  $$('[data-elegir]').forEach(function (caja) {
    var ops = $$('[data-resultado]', caja);
    var res = $$('[data-res]', caja);
    ops.forEach(function (b) {
      b.addEventListener('click', function () {
        var clave = b.getAttribute('data-resultado');
        ops.forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
        res.forEach(function (r) { r.hidden = r.getAttribute('data-res') !== clave; });
        var visible = $('[data-res="' + clave + '"]', caja);
        if (visible && !reduce) { visible.classList.remove('is-entrando'); void visible.offsetWidth; visible.classList.add('is-entrando'); }
      });
    });
  });

  /* ===== Validación compartida por todos los formularios ===== */
  function valorCampo(form, nombre) {
    var el = form.elements[nombre];
    if (!el) return '';
    return String(el.value || '').trim();
  }
  // Oculto por una condición (data-si), sin contar los pasos del formulario
  function estaOculto(el, tope) {
    for (var n = el; n && n !== tope; n = n.parentElement) { if (n.hidden && !n.classList.contains('paso')) return true; }
    return false;
  }
  function errorDe(el) {
    var id = (el.getAttribute('aria-describedby') || '').split(' ')[0];
    return id ? document.getElementById(id) : null;
  }
  function mostrarError(el, msg) {
    var p = errorDe(el);
    if (p) { p.textContent = msg || ''; p.hidden = !msg; }
    if (el.classList.contains('opciones')) el.classList.toggle('is-error', !!msg);
    var campo = el.closest('.campo');
    if (campo) campo.classList.toggle('is-error', !!msg);
    if (msg) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
  }
  function limpiarErrores(cont) {
    $$('[data-req]', cont).forEach(function (el) { mostrarError(el, ''); });
  }
  function validar(cont, form) {
    var primero = null;
    $$('[data-req]', cont).forEach(function (el) {
      if (estaOculto(el, form)) { mostrarError(el, ''); return; }
      var regla = el.getAttribute('data-req');
      var ok = true;
      if (regla.indexOf('radio:') === 0) ok = !!valorCampo(form, regla.slice(6));
      else if (regla === 'texto') ok = el.value.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g, '').length >= 2;
      else if (regla === 'valor') ok = !!el.value;
      mostrarError(el, ok ? '' : el.getAttribute('data-error'));
      if (!ok && !primero) primero = el.classList.contains('opciones') ? $('input', el) : el;
    });
    if (primero) { primero.focus(); return false; }
    return true;
  }
  // El error desaparece en cuanto se corrige
  function corregirEnVivo(form) {
    var alCambiar = function (e) {
      var el = e.target.closest('[data-req]');
      if (!el && e.target.type === 'radio') el = e.target.closest('.opciones[data-req]');
      if (el && el.getAttribute('aria-invalid') === 'true') mostrarError(el, '');
    };
    form.addEventListener('input', alCambiar);
    form.addEventListener('change', alCambiar);
  }
  // Campos que solo se muestran según otra respuesta: data-si="campo=valor"
  function aplicarCondiciones(form) {
    $$('[data-si]', form).forEach(function (el) {
      var partes = el.getAttribute('data-si').split('=');
      el.hidden = valorCampo(form, partes[0]) !== partes[1];
    });
  }
  function textoDe(el) {
    if (el.classList.contains('opciones')) {
      var r = $('input:checked', el);
      if (!r) return '';
      return r.getAttribute('data-txt') || r.nextElementSibling.textContent.trim();
    }
    if (el.tagName === 'SELECT') return el.options[el.selectedIndex] ? el.options[el.selectedIndex].text : '';
    return String(el.value || '').trim();
  }

  /* ===== Botones de carga y éxito ===== */
  function cargarYConfirmar(btn, textoExito, alTerminar) {
    btn.classList.add('is-loading');
    btn.setAttribute('aria-busy', 'true');
    setTimeout(function () {
      btn.classList.remove('is-loading');
      btn.removeAttribute('aria-busy');
      btn.classList.add('is-success');
      var t = $('.btn-txt', btn);
      if (t) { btn.setAttribute('data-txt-original', btn.getAttribute('data-txt-original') || t.textContent); t.textContent = textoExito; }
      setTimeout(alTerminar, reduce ? 0 : 650);
    }, reduce ? 0 : 900);
  }
  function restaurarBoton(btn) {
    btn.classList.remove('is-loading', 'is-success');
    btn.removeAttribute('aria-busy');
    var t = $('.btn-txt', btn);
    if (t && btn.getAttribute('data-txt-original')) t.textContent = btn.getAttribute('data-txt-original');
  }

  /* ===== Mensajes de cada formulario ===== */
  var CONSTRUCTORES = {
    escuela: function (v) {
      var en = v('sede') === 'otra' ? 'la sede más cercana a ' + v('ciudad') : 'la sede de ' + v('sede');
      var t = 'Me llamo ' + v('nombre');
      if (v('interes') === 'curso') t += ' y quiero información del curso profesional de uñas en ' + en + '. Prefiero estudiar ' + v('horario') + '. ¿Me envían fechas, horario e inversión?';
      else if (v('interes') === 'taller') t += ' y quiero información del taller de ' + MES + ' en ' + en + '. Puedo ir ' + v('horario') + '. ¿Cuál es el tema, la fecha y cuántos cupos quedan?';
      else t += ' y me interesan las capacitaciones para egresadas en ' + en + '. Prefiero ' + v('horario') + '. ¿Cuáles tienen disponibles?';
      return t;
    },
    servicios: function (v) {
      var en = v('sede') === 'otra' ? 'la sede más cercana a ' + v('ciudad') : 'la sede de ' + v('sede');
      var cuando = v('dia') + ', ' + v('franja');
      if (v('servicio') === 'orientacion') return 'Me llamo ' + v('nombre') + ' y quiero una cita de uñas en ' + en + ', pero necesito que me orienten para elegir el sistema. Me gustaría ' + cuando + '. ¿Qué disponibilidad tienen?';
      return 'Me llamo ' + v('nombre') + ' y quiero reservar ' + v('servicio').toLowerCase() + ' en ' + en + '. Me gustaría ' + cuando + '. ¿Qué disponibilidad tienen?';
    },
    producto: function (v) {
      return 'Me llamo ' + v('nombre') + ' y busco este producto en ' + v('sede') + ': ' + v('producto') + '. ¿Lo tienen disponible?';
    },
    franquicia: function (v) {
      var lugar = (v('ciudad') ? v('ciudad') + ', ' : '') + v('provincia');
      return 'Me llamo ' + v('nombre') + ' y quiero información para abrir una sede Lovely Nailz en ' + lugar + '. ' + v('local') + '. ¿Me envían los requisitos y la inversión?';
    },
    contacto: function (v) {
      return 'Me llamo ' + v('nombre') + ' y ' + v('motivo') + (v('sede') ? ' en ' + v('sede') : '') + '.';
    }
  };
  function conComentario(form, texto) {
    var extra = valorCampo(form, 'comentario');
    return CONFIG.saludo + ' ' + texto + (extra ? '\n\n' + extra : '');
  }

  /* ===== Formularios de varios pasos: inscripción (escuela) y reserva (servicios) ===== */
  $$('form[data-wizard]').forEach(function (form) {
    var tipo = form.getAttribute('data-wizard');
    var seccion = form.closest('section');
    var pasos = $$('.paso', form);
    var total = pasos.length;
    var progreso = $$('.progreso li', seccion);
    var estado = $('.insc-estado', form);
    var btnAtras = $('[data-atras]', form);
    var btnSig = $('[data-siguiente]', form);
    var exito = $('.insc-exito', form);
    var navForm = $('.insc-nav', form);
    var paso = 1;
    var v = function (n) { return valorCampo(form, n); };
    var mensaje = function () { return conComentario(form, CONSTRUCTORES[tipo](v)); };

    var prepararResumen = function () {
      var dl = $('.resumen', form);
      dl.textContent = '';
      $$('[data-resumen]', form).forEach(function (el) {
        if (estaOculto(el, form)) return;
        var valor = textoDe(el);
        if (!valor) return;
        dl.appendChild(crear('dt', '', el.getAttribute('data-resumen')));
        dl.appendChild(crear('dd', '', mayuscula(valor)));
      });
      $('#mensaje-wa', form).value = mensaje();
    };
    var asegurarVisible = function () {
      var r = form.getBoundingClientRect();
      var alto = cabecera.getBoundingClientRect().height + (subnav ? subnav.getBoundingClientRect().height : 0);
      if (r.top < alto + 8) window.scrollTo({ top: window.scrollY + r.top - alto - 24, behavior: reduce ? 'auto' : 'smooth' });
    };
    var mostrarPaso = function (n, enfocar) {
      paso = n;
      pasos.forEach(function (p) { p.hidden = Number(p.getAttribute('data-paso')) !== n; });
      progreso.forEach(function (li) {
        var k = Number(li.getAttribute('data-paso'));
        li.classList.toggle('is-hecho', k < n);
        li.classList.toggle('is-actual', k === n);
      });
      estado.textContent = 'Paso ' + n + ' de ' + total + ': ' + pasos[n - 1].getAttribute('data-nombre');
      btnAtras.hidden = n === 1;
      $('.btn-txt', btnSig).textContent = n === total ? 'Abrir WhatsApp' : 'Continuar';
      aplicarCondiciones(form);
      if (n === total) prepararResumen();
      if (enfocar !== false) {
        asegurarVisible();
        var leyenda = $('.paso-titulo', pasos[n - 1]);
        if (leyenda) leyenda.focus({ preventScroll: true });
      }
    };
    var salirDeExito = function () {
      exito.hidden = true;
      navForm.hidden = false;
      restaurarBoton(btnSig);
      btnSig.disabled = false;
    };
    var mostrarExito = function (url) {
      pasos.forEach(function (p) { p.hidden = true; });
      navForm.hidden = true;
      exito.hidden = false;
      $('[data-exito-wa]', exito).setAttribute('href', url);
      progreso.forEach(function (li) { li.classList.remove('is-actual'); li.classList.add('is-hecho'); });
      estado.textContent = 'Listo: mensaje preparado';
      $('.h3', exito).focus();
    };

    corregirEnVivo(form);
    form.addEventListener('change', function () { aplicarCondiciones(form); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (paso < total) {
        if (validar(pasos[paso - 1], form)) mostrarPaso(paso + 1);
        return;
      }
      var url = urlWA(mensaje());
      abrirWA(url);
      cargarYConfirmar(btnSig, 'Mensaje listo', function () { mostrarExito(url); });
    });
    btnAtras.addEventListener('click', function () {
      limpiarErrores(form);
      if (paso > 1) mostrarPaso(paso - 1);
    });
    $('[data-reiniciar]', form).addEventListener('click', function () {
      form.reset();
      limpiarErrores(form);
      salirDeExito();
      mostrarPaso(1);
    });
    $('[data-copiar]', form).addEventListener('click', function (ev) {
      var b = ev.currentTarget;
      var area = $('#mensaje-wa', form);
      var listo = function () {
        var s = $('span', b);
        s.textContent = 'Mensaje copiado';
        setTimeout(function () { s.textContent = 'Copiar mensaje'; }, 2200);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(area.value).then(listo, function () { area.select(); });
      } else {
        area.select();
      }
    });

    // Enlaces de la página que preseleccionan una respuesta: data-preseleccion="campo:valor"
    form._preseleccionar = function (campo, valor) {
      salirDeExito();
      limpiarErrores(form);
      var r = form.querySelector('input[name="' + campo + '"][value="' + valor + '"]');
      if (r) r.checked = true;
      mostrarPaso(r ? 2 : 1, false);
      seccion.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      setTimeout(function () {
        var leyenda = $('.paso-titulo', pasos[paso - 1]);
        if (leyenda) leyenda.focus({ preventScroll: true });
      }, reduce ? 0 : 700);
    };

    mostrarPaso(1, false);
  });

  $$('[data-preseleccion]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var destino = document.getElementById((a.getAttribute('href') || '').replace('#', ''));
      var form = destino && $('form[data-wizard]', destino);
      if (!form || !form._preseleccionar) return;
      e.preventDefault();
      var partes = a.getAttribute('data-preseleccion').split(':');
      form._preseleccionar(partes[0], partes.slice(1).join(':'));
    });
  });

  /* ===== Formularios de un paso: producto, franquicia y contacto ===== */
  $$('form[data-rapido]').forEach(function (form) {
    var tipo = form.getAttribute('data-rapido');
    var btn = $('button[type="submit"]', form);
    var listo = $('.rapido-listo', form);
    var v = function (n) { return valorCampo(form, n); };
    corregirEnVivo(form);
    form.addEventListener('input', function () {
      if (!listo.hidden) { listo.hidden = true; restaurarBoton(btn); }
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (btn.classList.contains('is-loading')) return;
      if (!validar(form, form)) return;
      var url = urlWA(conComentario(form, CONSTRUCTORES[tipo](v)));
      abrirWA(url);
      restaurarBoton(btn);
      cargarYConfirmar(btn, 'Mensaje listo', function () {
        $('[data-rapido-wa]', listo).setAttribute('href', url);
        listo.hidden = false;
      });
    });
  });

  /* ===== Encuentra tu sede ===== */
  $$('form[data-buscador]').forEach(function (form) {
    var caja = $('.buscador-resultado', form);
    var enlace = function (clase, href, texto, externo) {
      var a = crear('a', clase, texto);
      a.href = href;
      if (externo) { a.target = '_blank'; a.rel = 'noopener'; }
      return a;
    };
    corregirEnVivo(form);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validar(form, form)) return;
      var provincia = valorCampo(form, 'provincia');
      var busco = valorCampo(form, 'busco');
      var clave = SEDE_POR_PROVINCIA[provincia];
      var sede = clave && SEDES[clave];
      var pedir = 'Estoy en ' + provincia + ' y busco la sede Lovely Nailz más cercana.' + (busco ? ' Me interesa ' + busco + '.' : '');
      caja.textContent = '';
      var acciones = crear('div', 'acciones');
      if (sede) {
        caja.appendChild(crear('p', 'res-kicker', 'Sede en tu provincia'));
        caja.appendChild(crear('h3', 'res-titulo', 'Lovely Nailz ' + sede.ciudad));
        caja.appendChild(crear('p', 'res-dato', sede.dir || 'Dirección por confirmar'));
        var pTel = crear('p', 'res-dato');
        pTel.appendChild(enlace('', 'tel:' + sede.telHref, sede.tel));
        if (sede.whatsapp) pTel.appendChild(document.createTextNode(' (WhatsApp)'));
        caja.appendChild(pTel);
        if (sede.whatsapp) acciones.appendChild(enlace('btn btn--sm', waConSaludo('Escribo a la sede de ' + sede.ciudad + '.' + (busco ? ' Me interesa ' + busco + '.' : ' Quiero información.')), 'Escribir por WhatsApp', true));
        else acciones.appendChild(enlace('btn btn--sm', 'tel:' + sede.telHref, 'Llamar a la sede'));
        if (sede.mapa) acciones.appendChild(enlace('enlace', sede.mapa, 'Cómo llegar', true));
        var ver = enlace('enlace', '#sede-' + clave, 'Ver en la lista');
        ver.addEventListener('click', function () {
          var li = document.getElementById('sede-' + clave);
          if (!li) return;
          li.classList.remove('is-resaltada'); void li.offsetWidth; li.classList.add('is-resaltada');
        });
        acciones.appendChild(ver);
      } else {
        caja.appendChild(crear('p', 'res-kicker', 'Te ayudamos por WhatsApp'));
        caja.appendChild(crear('h3', 'res-titulo', 'Aún no mostramos una sede en ' + provincia));
        caja.appendChild(crear('p', 'res-dato', 'Tenemos 23 sedes en el país. Escríbenos y te decimos cuál te queda más cerca.'));
        acciones.appendChild(enlace('btn btn--sm', waConSaludo(pedir), 'Preguntar por WhatsApp', true));
      }
      caja.appendChild(acciones);
      if (!reduce) { caja.classList.remove('is-entrando'); void caja.offsetWidth; caja.classList.add('is-entrando'); }
      var tituloRes = $('.res-titulo', caja);
      tituloRes.setAttribute('tabindex', '-1');
      tituloRes.focus({ preventScroll: true });
    });
  });

  /* ===== WhatsApp flotante: aparece después del encabezado y se aparta en los formularios ===== */
  var waFlotante = $('.wa-flotante');
  if (waFlotante) {
    if (hayIO) {
      var estados = { hero: true, form: false, pie: false };
      var visiblesForm = new Map();
      var aplicar = function () { waFlotante.classList.toggle('is-visible', !estados.hero && !estados.form && !estados.pie); };
      var observar = function (el, clave, opciones) {
        if (!el) return;
        new IntersectionObserver(function (entradas) {
          estados[clave] = entradas[0].isIntersecting;
          aplicar();
        }, opciones).observe(el);
      };
      observar($('.hero, .pag-hero, .franq-hero'), 'hero', { rootMargin: '0px 0px -55% 0px' });
      observar($('.pie'), 'pie', { threshold: 0 });
      var cajas = $$('.insc-caja, .form-caja');
      if (cajas.length) {
        var ioForm = new IntersectionObserver(function (entradas) {
          entradas.forEach(function (en) { visiblesForm.set(en.target, en.isIntersecting); });
          estados.form = false;
          visiblesForm.forEach(function (on) { if (on) estados.form = true; });
          aplicar();
        }, { threshold: 0.05 });
        cajas.forEach(function (c) { ioForm.observe(c); });
      }
    } else {
      waFlotante.classList.add('is-visible');
    }
  }
})();
