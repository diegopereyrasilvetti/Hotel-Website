import { useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Reveal from '../components/Reveal.jsx';
import ReservationForm from '../components/ReservationForm.jsx';
import RoomModal from '../components/RoomModal.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import { excursionSlides, heroSlides, services } from '../data/content.js';
import { rooms } from '../data/rooms.js';

const MAP_URL =
    'https://maps.google.com/maps?q=San%20Carlos%20de%20Bariloche%2C%20R%C3%ADo%20Negro%2C%20Argentina&t=&z=13&ie=UTF8&iwloc=&output=embed';

export default function Home() {
    const [selectedRoom, setSelectedRoom] = useState(null);

    return (
        <>
        <div className="flex justify-center pt-[clamp(32px,6vw,56px)]">
            <img className="w-full max-w-[420px] px-6 object-contain" src="/images/logo sin fondo.png" alt="Hotel Bariloche" />
        </div>
        <main className="mx-auto flex w-[min(1120px,calc(100%-40px))] flex-col gap-[clamp(56px,8vw,96px)] py-[clamp(50px,8vw,100px)] pb-[100px]">

            <section className="scroll-mt-[110px]">
                <Carousel
                    variant="hero"
                    slides={heroSlides}
                    label="la imagen"
                    intervalMs={3500}
                    prevLabel="Imagen anterior"
                    nextLabel="Siguiente imagen"
                >
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] bg-gradient-to-t from-bg/90 via-bg/50 to-transparent px-[clamp(20px,5vw,56px)] pb-14 pt-24 max-[480px]:pb-12">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Desde 1955</p>
                        <p className="mt-1 max-w-[560px] text-[clamp(1.4rem,4vw,2.6rem)] font-bold leading-tight tracking-[-0.02em] text-white">Tu hogar en el corazón de la Patagonia</p>
                        <Link
                            className="pointer-events-auto mt-4 inline-flex min-h-11 items-center rounded-full bg-accent px-6 font-extrabold text-bg no-underline transition duration-200 hover:bg-[#ddbd7e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            to="/#reservar"
                        >
                            Reservar ahora
                        </Link>
                    </div>
                </Carousel>
            </section>

            <section
                className="flex scroll-mt-[110px] flex-wrap-reverse items-center gap-[clamp(24px,5vw,48px)] rounded-[28px] border border-white/[0.14] bg-white/5 p-[clamp(32px,6vw,72px)] max-[768px]:p-7"
                id="nosotros"
            >
                <Reveal
                    as="img"
                    className="w-full max-w-[420px] flex-1 basis-[320px] rounded-2xl object-cover shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
                    src="/images/descarga.jfif"
                    alt="Vista exterior del hotel al atardecer, con las montañas de Bariloche de fondo"
                />
                <Reveal className="max-w-[790px] flex-1 basis-[420px]">
                    <SectionTitle>Nosotros</SectionTitle>
                    <p className="text-white/70"><strong>Nuestra historia:</strong> Desde 1955, nuestra familia tiene el sueño de crear un lugar donde cada visitante pueda sentirse como en casa. Lo que comenzó como un pequeño proyecto familiar en el corazón de Bariloche, con el paso de los años se convirtió en una tradición que continúa hasta hoy.</p>
                    <p className="mt-3.5 text-white/70">Actualmente, somos los nietos de aquellos primeros fundadores quienes llevamos adelante el hotel, manteniendo vivos los mismos valores que nos acompañaron desde el comienzo: familia, unidad y hospitalidad.</p>
                    <p className="mt-3.5 text-white/70">Hoy, combinamos esa esencia familiar con instalaciones modernas, comodidades de primer nivel y una amplia variedad de servicios, pensados para brindar una experiencia segura, confortable y placentera.</p>
                </Reveal>
            </section>

            <section className="scroll-mt-[110px]">
                <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5 p-0">
                    {services.map((service, i) => (
                        <Reveal
                            as="li"
                            key={service}
                            delay={(i % 4) * 0.06}
                            className="flex items-start gap-2.5 rounded-[14px] border border-white/[0.14] bg-white/5 px-[18px] py-3.5 text-[0.96rem] text-white/70 transition duration-200 hover:-translate-y-0.5 hover:border-accent"
                        >
                            <i className="fa-solid fa-check mt-1 shrink-0 text-xs font-extrabold text-accent" aria-hidden="true"></i>
                            {service}
                        </Reveal>
                    ))}
                </ul>
            </section>

            <section className="scroll-mt-[110px]" id="habitaciones">
                <SectionTitle>Habitaciones</SectionTitle>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
                    {rooms.map((room, i) => (
                        <Reveal
                            as="button"
                            key={room.id}
                            delay={(i % 4) * 0.06}
                            type="button"
                            className="relative block overflow-hidden rounded-2xl border border-white/[0.14] bg-white/5 p-0 transition duration-200 hover:-translate-y-1 hover:border-accent focus-visible:-translate-y-1 focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                            aria-label={`Ver habitación ${room.id} en grande`}
                            onClick={() => setSelectedRoom(room)}
                        >
                            <img className="block aspect-[4/3] w-full object-cover" src={room.img} alt={room.shortAlt} />
                            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 to-transparent px-4 pb-3 pt-8 text-left text-sm font-bold text-white" aria-hidden="true">Habitación {room.id}</span>
                        </Reveal>
                    ))}
                </div>
                <div className="mt-8 flex justify-center">
                    <Link
                        className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 px-7 font-bold text-white no-underline transition duration-200 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        to="/habitaciones"
                    >
                        Ver habitaciones y comodidades<i className="fa-solid fa-arrow-right text-sm" aria-hidden="true"></i>
                    </Link>
                </div>
                <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
            </section>

            <section className="scroll-mt-[110px]" id="reservar">
                <SectionTitle>Reservá tu habitación</SectionTitle>
                <Reveal>
                    <ReservationForm />
                </Reveal>
            </section>

            <section className="scroll-mt-[110px]" id="excurciones">
                <SectionTitle>Excursiones</SectionTitle>
                <Reveal>
                    <Carousel
                        variant="excursions"
                        slides={excursionSlides}
                        label="la excursión"
                        intervalMs={4000}
                        prevLabel="Excursión anterior"
                        nextLabel="Siguiente excursión"
                    />
                </Reveal>
            </section>

            <section className="scroll-mt-[110px]" id="contactanos">
                <SectionTitle>Contactanos</SectionTitle>
                <div className="flex flex-wrap gap-[clamp(24px,5vw,48px)]">
                    <ContactForm />
                    <Reveal className="mt-[30px] min-h-[320px] flex-1 basis-[360px] overflow-hidden rounded-[24px] border border-white/[0.14] shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
                        <iframe
                            className="h-full min-h-[320px] w-full contrast-[1.1] grayscale-[35%]"
                            src={MAP_URL}
                            title="Ubicación de Hotel Bariloche en el mapa"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </Reveal>
                </div>
            </section>
        </main>
        </>
    );
}
