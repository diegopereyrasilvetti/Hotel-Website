# Hotel Bariloche

Landing page de un hotel ficticio en Bariloche, Argentina. Proyecto hecho con **HTML, CSS y JavaScript puro** (sin frameworks ni librerías de UI), como práctica de maquetado responsive, accesibilidad e interactividad con JS vanilla.

## Demo

> https://hotelwebsite-vert.vercel.app/

## Stack

- **HTML5** semántico.
- **[Tailwind CSS v4](https://tailwindcss.com/)** vía el script `@tailwindcss/browser` (compilación JIT directo en el navegador, sin paso de build). Los colores de marca (`bg`, `surface`, `accent`, etc.) se definen con un bloque `@theme` dentro de `index.html`.
- **JavaScript vanilla** (`index.js`), sin dependencias.

> `styles/style.css` quedó del enfoque inicial del proyecto (CSS escrito a mano) y ya no se usa: todo el estilo se migró a clases utilitarias de Tailwind directamente en el HTML.

## Funcionalidades

- **Menú responsive**: en mobile/tablet se colapsa a un botón hamburguesa (con el patrón `peer`/`peer-checked` de Tailwind, sin JS); en desktop se muestra horizontal.
- **Dos carruseles con autoplay**, hechos a mano (sin librerías tipo Swiper): uno de bienvenida y otro en la sección de Excursiones. Ambos se pausan al pasar el mouse o al enfocar con teclado, y usan una función reutilizable (`initCarousel`) en vez de código duplicado.
- **Modal de habitaciones** con el elemento nativo `<dialog>` (sin librería de modales), que muestra la foto en grande al hacer click en cada habitación.
- **Formulario de reserva** con validación de fechas en JS: no deja elegir un check-in anterior a hoy, ni un check-out anterior o igual al check-in.
- **Mapa embebido** (Google Maps) en la sección de contacto.
- Diseño completamente **responsive** (probado en mobile, tablet y desktop).

## Estructura del proyecto

```
hotel/
├── index.html        # Toda la maquetación y clases de Tailwind
├── index.js           # Lógica: menú, carruseles, modal, formulario de reserva
├── images/            # Fotos del hotel, habitaciones y excursiones
└── styles/style.css   # Sin uso actualmente (ver nota arriba)
```

## Cómo correrlo localmente

No requiere instalación ni build. Alcanza con abrir `index.html` en el navegador, o levantar cualquier servidor estático desde la carpeta del proyecto, por ejemplo:

```bash
npx serve .
```

## Decisiones / cosas a mejorar a futuro

- El formulario de contacto y de reserva no están conectados a un backend real (no hay persistencia ni envío de mail todavía).
- Tailwind se usa vía CDN (JIT en el navegador) en vez de un build con PostCSS/Vite, para mantener el proyecto 100% HTML/CSS/JS sin herramientas de build mientras se aprende React.
