# Hotel Bariloche

Landing page de un hotel ficticio en Bariloche, Argentina. Proyecto hecho con **React**, **Vite** y **Tailwind CSS**, como práctica de maquetado responsive, accesibilidad e interactividad.

## Demo

> https://hotelwebsite-vert.vercel.app/

## Stack

- **[React 19](https://react.dev/)** con JavaScript (sin TypeScript).
- **[Vite](https://vite.dev/)** como herramienta de desarrollo y de build.
- **[React Router](https://reactrouter.com/)** para las dos páginas: inicio (`/`) y habitaciones (`/habitaciones`).
- **[Tailwind CSS v4](https://tailwindcss.com/)** compilado en el build con el plugin `@tailwindcss/vite`. Los colores de marca (`bg`, `surface`, `accent`, etc.) se definen con un bloque `@theme` en `src/index.css`.
- **[Font Awesome](https://fontawesome.com/)** (kit por CDN) para los íconos y **Noto Sans** de Google Fonts.

## Funcionalidades

- **Menú responsive**: en mobile/tablet se colapsa a un botón hamburguesa y se cierra al navegar; en desktop se muestra horizontal.
- **Dos carruseles con autoplay**, hechos a mano (sin librerías tipo Swiper) con un único componente reutilizable (`Carousel`): uno de bienvenida y otro en la sección de Excursiones. Ambos se pausan al pasar el mouse o al enfocar con teclado.
- **Modal de habitaciones** con el elemento nativo `<dialog>` (sin librería de modales), que muestra la foto en grande al hacer click en cada habitación.
- **Formulario de reserva** con validación de fechas: no deja elegir un check-in anterior a hoy, ni un check-out anterior o igual al check-in.
- **Mapa embebido** (Google Maps) en la sección de contacto.
- **Portada con mensaje y llamada a la acción**: el carrusel principal muestra un degradé con el lema del hotel y un botón "Reservar ahora" que lleva al formulario.
- **Fondo animado**: una luz suave (azul petróleo y dorada) que se desplaza muy lento detrás del contenido, hecha solo con CSS (`@keyframes`).
- **Animación al hacer scroll**: los bloques aparecen una sola vez, subiendo, agrandándose y pasando de desenfocado a nítido. Usa `IntersectionObserver` (componente `Reveal`) y se desactiva si el usuario tiene activado "reducir movimiento" (`prefers-reduced-motion`).
- **Habitaciones con nombre** sobre cada foto, títulos de sección con detalle dorado y pie de página con íconos.
- **Página de habitaciones** (`/habitaciones`): detalle de cada habitación con foto, superficie, capacidad, tipo de cama y comodidades, más lo incluido en todas. El botón "Reservar esta habitación" lleva al formulario del inicio con la habitación ya elegida (`/?habitacion=N#reservar`).
- Diseño completamente **responsive** (probado en mobile, tablet y desktop).

## Estructura del proyecto

```
hotel/
├── index.html              # Entrada de Vite (head, fuentes, íconos y #root)
├── vite.config.js          # Plugins de React y Tailwind
├── vercel.json             # Reescritura a index.html para que /habitaciones funcione al recargar
├── public/images/          # Fotos del hotel, habitaciones y excursiones
└── src/
    ├── main.jsx            # Arranque de React y el router
    ├── App.jsx             # Definición de rutas
    ├── index.css           # Tailwind, tema (colores) y animaciones
    ├── data/               # Datos: habitaciones, comodidades, servicios y fotos
    ├── pages/              # Home.jsx y Rooms.jsx
    └── components/         # Header, Footer, Layout, Carousel, Reveal, RoomModal,
                            # ReservationForm, ContactForm, SectionTitle
```

## Cómo correrlo localmente

Requiere Node y [Yarn](https://classic.yarnpkg.com/) (v1):

```bash
yarn install
yarn dev
```

El sitio queda en http://localhost:3000.

Otros comandos:

- `yarn build`: genera la versión de producción en `dist/`.
- `yarn preview`: sirve la versión compilada en http://localhost:3000.

## Decisiones / cosas a mejorar a futuro

- El formulario de contacto y de reserva no están conectados a un backend real (no hay persistencia ni envío de mail todavía): solo muestran una confirmación en pantalla y no guardan ningún dato.
- Los datos de las habitaciones (nombres, metros cuadrados, capacidad, comodidades) son de ejemplo y están en `src/data/rooms.js`.
- Al ser una aplicación de una sola página, el hosting debe reescribir todas las rutas a `index.html` (ya configurado en `vercel.json`).
