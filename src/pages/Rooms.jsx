import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { includedInAllRooms, rooms } from '../data/rooms.js';

const primaryButton =
    'inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-7 font-extrabold text-bg no-underline transition duration-200 hover:-translate-y-0.5 hover:bg-[#ddbd7e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

export default function Rooms() {
    useEffect(() => {
        const previous = document.title;
        document.title = 'Habitaciones | Hotel Bariloche';
        return () => {
            document.title = previous;
        };
    }, []);

    return (
        <main className="mx-auto flex w-[min(1120px,calc(100%-40px))] flex-col gap-[clamp(72px,10vw,128px)] py-[clamp(50px,8vw,100px)] pb-[100px]">
            <Reveal as="section" className="mx-auto max-w-[760px] text-center">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-accent">Habitaciones</p>
                <h1 className="mt-3 text-[clamp(2rem,6vw,3.8rem)] font-bold leading-[1.08] tracking-[-0.035em] text-white">Descanso con vista a la Patagonia</h1>
                <p className="mx-auto mt-5 max-w-[620px] text-white/70">Cuatro habitaciones pensadas para que te sientas como en casa: madera, luz natural y el silencio del bosque, con todo el confort que necesitás para disfrutar de Bariloche.</p>
                <span className="mx-auto mt-8 block h-1 w-14 rounded-full bg-accent" aria-hidden="true"></span>
            </Reveal>

            <Reveal
                as="section"
                className="rounded-[28px] border border-white/[0.14] bg-white/5 p-[clamp(24px,5vw,48px)]"
                aria-labelledby="incluido-titulo"
            >
                <h2 className="text-center text-sm font-bold uppercase tracking-[0.2em] text-white/[0.82]" id="incluido-titulo">Incluido en todas las habitaciones</h2>
                <ul className="m-0 mt-7 grid list-none grid-cols-2 gap-x-4 gap-y-6 p-0 text-center sm:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] sm:gap-6">
                    {includedInAllRooms.map(([icon, text]) => (
                        <li key={text} className="flex flex-col items-center gap-3 text-[0.95rem] text-white/70">
                            <span className="grid h-12 w-12 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                                <i className={`fa-solid ${icon}`} aria-hidden="true"></i>
                            </span>
                            {text}
                        </li>
                    ))}
                </ul>
            </Reveal>

            {rooms.map((room, i) => {
                const reverse = i % 2 === 1;
                const number = String(room.id).padStart(2, '0');
                return (
                    <Reveal
                        as="article"
                        key={room.id}
                        className="grid scroll-mt-[110px] items-center gap-[clamp(28px,5vw,64px)] lg:grid-cols-2"
                        id={`habitacion-${room.id}`}
                        aria-labelledby={`habitacion-${room.id}-titulo`}
                    >
                        <div className={`relative${reverse ? ' lg:order-2' : ''}`}>
                            <img className="block aspect-[4/3] w-full rounded-[24px] object-cover shadow-[0_20px_45px_rgba(0,0,0,0.45)]" src={room.img} alt={room.alt} loading="lazy" />
                            <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-bg/55 px-4 py-1 text-xs font-bold tracking-[0.2em] text-accent backdrop-blur-md" aria-hidden="true">{number}</span>
                        </div>
                        <div className={reverse ? 'lg:order-1' : undefined}>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Habitación {number}</p>
                            <h2 className="mt-2 text-[clamp(1.6rem,4vw,2.6rem)] font-bold leading-[1.12] tracking-[-0.03em] text-white" id={`habitacion-${room.id}-titulo`}>{room.name}</h2>
                            <p className="mt-4 text-white/70">{room.description}</p>
                            <dl className="mt-6 grid grid-cols-3 divide-x divide-white/[0.14] rounded-[14px] border border-white/[0.14] bg-white/5 text-center">
                                <div className="px-2 py-3"><dt className="text-xs uppercase tracking-[0.12em] text-white/60">Superficie</dt><dd className="mt-1 font-bold text-white">{room.size}</dd></div>
                                <div className="px-2 py-3"><dt className="text-xs uppercase tracking-[0.12em] text-white/60">Capacidad</dt><dd className="mt-1 font-bold text-white">{room.guests}</dd></div>
                                <div className="px-2 py-3"><dt className="text-xs uppercase tracking-[0.12em] text-white/60">Cama</dt><dd className="mt-1 font-bold text-white">{room.bed}</dd></div>
                            </dl>
                            <h3 className="mt-7 text-sm font-bold uppercase tracking-[0.16em] text-white/[0.82]">Comodidades</h3>
                            <ul className="m-0 mt-3 grid list-none gap-x-6 gap-y-2.5 p-0 sm:grid-cols-2">
                                {room.amenities.map(([icon, text]) => (
                                    <li key={text} className="flex items-center gap-3 text-[0.95rem] text-white/70">
                                        <i className={`fa-solid ${icon} w-5 shrink-0 text-center text-accent`} aria-hidden="true"></i>
                                        {text}
                                    </li>
                                ))}
                            </ul>
                            <Link className={`mt-8 ${primaryButton}`} to={`/?habitacion=${room.id}#reservar`}>
                                Reservar esta habitación<i className="fa-solid fa-arrow-right text-sm" aria-hidden="true"></i>
                            </Link>
                        </div>
                    </Reveal>
                );
            })}

            <Reveal
                as="section"
                className="rounded-[28px] border border-white/[0.14] bg-white/5 p-[clamp(32px,6vw,64px)] text-center"
            >
                <h2 className="text-[clamp(1.6rem,4vw,2.6rem)] font-bold leading-[1.12] tracking-[-0.03em] text-white">¿Ya elegiste tu habitación?</h2>
                <p className="mx-auto mt-4 max-w-[560px] text-white/70">Reservá online en pocos pasos o escribinos y te ayudamos a encontrar la mejor opción para tu viaje.</p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Link className={primaryButton} to="/#reservar">Reservar ahora</Link>
                    <Link
                        className="inline-flex min-h-12 items-center rounded-full border border-white/25 px-7 font-bold text-white no-underline transition duration-200 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        to="/#contactanos"
                    >
                        Contactanos
                    </Link>
                </div>
            </Reveal>
        </main>
    );
}
