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
- **Portada con mensaje y llamada a la acción**: el carrusel principal muestra un degradé con el lema del hotel y un botón "Reservar ahora" que lleva al formulario.
- **Fondo animado**: una luz suave (azul petróleo y dorada) que se desplaza muy lento detrás del contenido, hecha solo con CSS (`@keyframes`).
- **Animación al hacer scroll**: las secciones aparecen una sola vez, subiendo, agrandándose y pasando de desenfocado a nítido. Usa `IntersectionObserver` (sin librerías) y se desactiva si el usuario tiene activado "reducir movimiento" (`prefers-reduced-motion`).
- **Habitaciones con nombre** sobre cada foto, títulos de sección con detalle dorado y pie de página con íconos de Font Awesome.
- **Página de habitaciones** (`habitaciones.html`): detalle de cada habitación con foto, superficie, capacidad, tipo de cama y comodidades, más lo incluido en todas. El botón "Reservar esta habitación" lleva al formulario del inicio con la habitación ya elegida (`index.html?habitacion=N#reservar`).
- Diseño completamente **responsive** (probado en mobile, tablet y desktop).

## Estructura del proyecto

```
hotel/
├── index.html        # Toda la maquetación y clases de Tailwind
├── index.js           # Lógica: menú, carruseles, modal, formulario de reserva
├── habitaciones.html  # Página de detalle de habitaciones y comodidades
├── rooms.js           # Animación al hacer scroll de la página de habitaciones
├── images/            # Fotos del hotel, habitaciones y excursiones
├── styles/style.css   # Sin uso actualmente (ver nota arriba)
├── package.json       # Script `yarn dev` y dependencia de desarrollo (serve)
├── yarn.lock          # Versiones exactas de las dependencias
└── serve.json         # Configuración del servidor local
```

## Cómo correrlo localmente

No requiere build. Se puede abrir `index.html` directo en el navegador, pero se recomienda levantar el servidor local con [Yarn](https://classic.yarnpkg.com/) (v1):

```bash
yarn install
yarn dev
```

El sitio queda en http://localhost:3000.

- `yarn dev` usa [`serve`](https://github.com/vercel/serve) como servidor estático (dependencia de desarrollo).
- `serve.json` desactiva `cleanUrls`: así `index.html?habitacion=N` no se redirige a `/index` perdiendo el parámetro, y la preselección de la habitación en el formulario funciona.

## Decisiones / cosas a mejorar a futuro

- El formulario de contacto y de reserva no están conectados a un backend real (no hay persistencia ni envío de mail todavía).
- Tailwind se usa vía CDN (JIT en el navegador) en vez de un build con PostCSS/Vite, para mantener el proyecto 100% HTML/CSS/JS sin herramientas de build mientras se aprende React.
