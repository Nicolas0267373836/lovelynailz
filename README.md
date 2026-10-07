# Lovely Nailz RD — sitio web de muestra (multipágina)

Sitio de 7 páginas para **Lovely Nailz RD SRL**, la primera escuela profesional de uñas de República Dominicana: escuela (curso, talleres y capacitaciones), servicios de salón, productos de marca propia, sedes y franquicias.

- Proyecto WebDom nuevo e independiente: no pertenece a `webdom-site`, `webdom-citas`, Martis, Integraxis, Yeron, Mulán ni Deco.
- Estado: **muestra de alta fidelidad para presentar a Lovely Nailz**. Sin repositorio remoto, sin dominio y sin deploy. Ningún formulario envía datos: todos arman el mensaje y abren WhatsApp.
- Versión anterior: el sitio de una sola página (7 de octubre de 2026) quedó guardado aparte, en `lovely-nailz-web-una-pagina-v1.zip`, junto a esta carpeta.
- Referencias pedidas (sin copiar textos, fotos, marca ni diseño exacto):
  - **La Belle Beauty School, servicios de salón**: estructura de escuela con salón (pestañas de marcas en la barra superior, servicios por sistema, horario, aviso de que servicios y precios varían por sede, sedes en el pie).
  - **JINsoon**: estética moderna y limpia (menú a ambos lados del logo centrado, mayúsculas espaciadas, botones rectos negros, mucho blanco, muestras de color, pie de varias columnas).
- Identidad propia (método Yeron): la **uña rosa con brillo del logo** es el elemento de marca: abanico del inicio, marcos de foto, fichas de servicios como tarjetas de muestrario, viñetas, opciones de los formularios, progreso de la inscripción y carga de los botones. Tipografía **Jost** + **Great Vibes**, como la pareja «Lovely | NAILZ» del logo.

## Páginas

| Archivo | Página | Qué contiene |
|---|---|---|
| `index.html` | Inicio | Lema, abanico de uñas, cifras (23 sedes, +120,000 egresadas, 10+ años, MINERD), los 3 pilares (escuela, salón, productos), la escuela en resumen, historias de éxito con carrusel y testimonios, cierre con WhatsApp |
| `escuela.html` | Escuela y cursos (la más completa) | Barra fija de la página, por qué estudiar aquí, **curso profesional** (a quién va dirigido, certificación con validez profesional, qué preguntar: fechas, horario, inversión y más), **talleres del mes** (temas rotativos, cupos limitados, el mes se escribe solo), **capacitaciones continuas** para egresadas, **inscripción en 4 pasos** y preguntas frecuentes de cursos. Cada bloque tiene su botón de WhatsApp |
| `servicios.html` | Servicios de salón | Muestrario de los 5 sistemas, horario (L–V 9:00–6:00; S–D 10:00–6:30), «¿cuál me conviene?», **ficha de cada sistema** (acrygel, acrílicas, rubber gel, naturales y ojo de gato: qué es, para quién es ideal, bueno saber, precio y reserva), **reserva en 4 pasos** y preguntas frecuentes |
| `productos.html` | Productos | Lovely Nailz Products, pioneros en RD, dónde conseguirlos (sedes, WhatsApp, Instagram), espacio para el catálogo, joyería de uñas y «¿buscas un producto?» |
| `nosotros.html` | Nosotros | «Más de 10 años haciendo escuela», Vanessa Zambrano, el lema (arte y educación), cifras, prensa (De Último Minuto, Wachao News, El Periódico RD, Herrera Farándula) y galería con lightbox |
| `sedes.html` | Sedes | 23 sedes, **buscador por provincia** (muestra la sede si está confirmada; si no, pregunta por WhatsApp), sedes destacadas, qué hay en cada sede y horario |
| `franquicias.html` | Franquicias y contacto | Abre tu sede, una sede con tres negocios, cómo empezar, solicitud de información y **contacto** (WhatsApp, teléfonos, redes, horario y mensaje rápido) |

## Archivos

| Archivo | Qué contiene |
|---|---|
| `*.html` | Las 7 páginas. La cabecera, el menú y el pie se repiten en cada una: si cambias un enlace o un teléfono ahí, cámbialo en las 7 |
| `styles.css` | Colores, tipografía, componentes, movimiento y responsive (1440 / 768 / 390) de todas las páginas |
| `script.js` | **Datos editables** (WhatsApp, sedes del buscador, mensajes) e interacciones. Cada bloque solo se activa si su componente está en la página |
| `revision.js` · `revision.css` | Herramientas de revisión: páginas, datos por confirmar, notas de movimiento y sistema de diseño. **Eliminar en producción** |
| `vista-responsive.html` | Escritorio, tablet y móvil uno junto a otro, con selector de página |
| `images/fotos/` | 8 fotos del cliente optimizadas (WebP) |
| `images/logo/` | Logo «Lovely \| NAILZ» reconstruido en PNG transparente (tinta y claro), monograma LN y sello circular |
| `images/og-lovely-nailz.jpg` · `favicon-32.png` · `apple-touch-icon.png` | Imagen para compartir e íconos |

No necesita build. Para verlo en local: `npx serve .` o `python -m http.server` y abrir `http://localhost:8000`.

## Cómo revisar

Botón «Revisión» abajo a la izquierda, en cualquier página:

1. **Por confirmar**: enlaces a las 7 páginas, las marcas de la página actual (botón «Ir» y opción de resaltarlas) y las preguntas para Lovely Nailz.
2. **Movimiento**: qué se anima, cuándo y cuánto dura.
3. **Sistema**: colores con su uso y contraste, tipografía, botones en 7 estados y espaciado.

## Cambiar el número de WhatsApp

1. En `script.js`, cambiar `CONFIG.whatsapp` (formato `1` + número, sin espacios).
2. En las 7 páginas, reemplazar `18493426689` por el número nuevo (solo se usa si el navegador no carga JavaScript) y el texto `849-342-6689` donde se refiera al WhatsApp central.

## Agregar sedes al buscador

En `script.js`, agregar la sede en `SEDES` (ciudad, dirección, teléfono y enlace de mapa) y su provincia en `SEDE_POR_PROVINCIA`. Agregar también su fila en la lista de `sedes.html`.

## Datos usados y su fuente

| Dato | Fuente |
|---|---|
| Lovely Nailz RD SRL, 1.ª escuela profesional de uñas de RD, lema, 23 sedes, +120,000 egresadas (historias de éxito), más de 10 años, aval del MINERD | Brief verificado (7-oct-2026) y pedido del usuario |
| Vanessa Zambrano, fundadora y CEO, Master en uñas certificada en varios países; lives educativos con productos | Brief |
| Curso profesional con certificación de validez profesional, talleres mensuales (temas rotativos, cupos limitados), capacitaciones continuas para egresadas | Brief y pedido del usuario. El sitio solo le atribuye certificado al curso profesional |
| Servicios: acrygel, uñas acrílicas, uñas naturales, rubber gel, ojo de gato | Brief. Las descripciones, «ideal si» y «bueno saber» son generales del oficio, sin cifras de duración ni precios |
| Productos de marca propia (@lovelynailz_products), pioneros en RD, venta en sedes | Brief y pedido del usuario |
| Joyería de uñas · @lovelynailzhiguey | Letrero de la fachada de Higüey |
| Teléfonos y direcciones de Santo Domingo, Santiago y San Pedro de Macorís; WhatsApp de Higüey | Brief y fachada |
| Horario general | Brief y pedido del usuario |
| Prensa: De Último Minuto, Wachao News, El Periódico RD, Herrera Farándula | Pedido del usuario y fuentes de las fotos de prensa del brief |
| Franquicias: modelo de expansión con acompañamiento a emprendedoras | Brief |
| Provincias del buscador (31 + Distrito Nacional) | División territorial pública de RD |
| Logo, monograma y 8 fotos | Enviados por el usuario |

No se usó la calificación 4,7/5 porque no se sabe de dónde sale. No se inventaron temarios, precios, duraciones, testimonios ni sedes. Una revisión independiente del texto contra el brief ajustó las frases que afirmaban más de lo confirmado (certificación de talleres, identidad de personas en fotos, promesas de duración).

## Pendiente del cliente

Número central de WhatsApp (hoy el de Higüey) y si cada sede tiene el suyo · versión oficial del lema (con o sin «somos») · nombre comercial de la marca de productos · si talleres y capacitaciones entregan certificado · lista de las 23 sedes con provincia, teléfono y dirección (alimenta el buscador) · direcciones de Santo Domingo e Higüey y pin de cada sede · curso: nombre, temario, duración, horario, inversión, requisitos y qué incluye el certificado · texto exacto del aval del MINERD · tema, fechas y cupos del taller del mes · capacitaciones disponibles · precios y duración de cada servicio y si todas las sedes ofrecen los 5 sistemas · si el horario aplica a todas las sedes · catálogo y fotos de productos, venta en línea o por WhatsApp, sedes con joyería de uñas · requisitos, inversión y proceso de franquicia · confirmar que el retrato de traje blanco y la foto de conferencia son de Vanessa · biografía (países de certificación, año de fundación) · permiso de las fotos de prensa y de las personas · fotos originales en alta resolución · 3 testimonios reales con permiso · enlaces de prensa · logo oficial en vector · dominio y correo.

## Antes de publicar

1. Confirmar los datos de arriba y quitar las marcas «Por confirmar».
2. Borrar `revision.js`, `revision.css` y sus dos líneas al final de cada una de las 7 páginas.
3. Con dominio: agregar `<link rel="canonical">` en cada página y poner la URL absoluta en `og:image`.
4. Cambiar «Sitio de muestra diseñado por WebDom» en el pie por el crédito definitivo.
