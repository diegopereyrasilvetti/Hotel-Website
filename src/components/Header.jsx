import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
    { to: '/#nosotros', label: 'Nosotros' },
    { to: '/habitaciones', label: 'Habitaciones' },
    { to: '/#reservar', label: 'Reservar' },
    { to: '/#excurciones', label: 'Excursiones' },
    { to: '/#contactanos', label: 'Contactanos' },
];

export default function Header() {
    const { pathname } = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const isHome = pathname !== '/habitaciones';

    useEffect(() => setMenuOpen(false), [pathname]);

    const brandName = 'text-2xl font-extrabold tracking-[-0.01em] text-white max-[1024px]:hidden';

    return (
        <header className="sticky top-0 z-50 h-[76px] border-b border-white/[0.14] bg-gradient-to-br from-[rgba(13,45,64,0.95)] to-[rgba(7,15,22,0.94)] shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md max-[480px]:h-16">
            <nav className="relative mx-auto flex h-full w-[min(1120px,calc(100%-40px))] items-center justify-between max-[480px]:w-[calc(100%-24px)]">
                <Link className="flex items-center gap-2.5 text-white no-underline" to="/" aria-label="Hotel Bariloche - Inicio">
                    <img className="h-11 w-auto shrink-0 object-contain max-[480px]:h-[34px]" src="/images/logo sin fondo.png" alt="" />
                    {isHome ? <h1 className={brandName}>Hotel Bariloche</h1> : <span className={brandName}>Hotel Bariloche</span>}
                </Link>
                <div className="flex items-center gap-5">
                    <label
                        className="grid h-[42px] w-[42px] cursor-pointer place-items-center rounded-full border border-white/[0.14] bg-white/5 text-white transition duration-200 hover:-translate-y-px hover:bg-white/[0.13] md:hidden max-[480px]:h-[38px] max-[480px]:w-[38px]"
                        htmlFor="menu"
                        aria-label="Abrir menú de navegación"
                    >
                        <i className="fa-solid fa-bars" aria-hidden="true"></i>
                    </label>
                    <input
                        className="peer absolute h-px w-px overflow-hidden opacity-0"
                        type="checkbox"
                        name="menu"
                        id="menu"
                        checked={menuOpen}
                        onChange={(event) => setMenuOpen(event.target.checked)}
                    />
                    <ul className="absolute left-0 top-full flex max-h-0 w-full flex-col items-center gap-1 overflow-hidden bg-[rgba(7,14,20,0.97)] transition-all duration-300 ease-in-out peer-checked:max-h-[300px] peer-checked:border-b peer-checked:border-white/[0.14] peer-checked:px-5 peer-checked:py-[18px] md:static md:flex md:w-auto md:max-h-none md:flex-row md:items-center md:gap-6 md:overflow-visible md:bg-transparent md:p-0">
                        {links.map(({ to, label }) => {
                            const current = to === '/habitaciones' && pathname === '/habitaciones';
                            return (
                                <li key={to} className="w-[min(100%,420px)] text-center md:w-auto">
                                    <Link
                                        className={`group relative block px-1 py-2 text-[0.98rem] font-semibold tracking-[0.02em] ${current ? 'text-white' : 'text-white/[0.82]'} transition-colors duration-200 hover:text-white`}
                                        to={to}
                                        aria-current={current ? 'page' : undefined}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {label}
                                        <span
                                            className={`pointer-events-none absolute inset-x-1 bottom-0.5 h-0.5 origin-left ${current ? 'scale-x-100' : 'scale-x-0'} bg-accent transition-transform duration-200 ease-out group-hover:scale-x-100`}
                                        ></span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        </header>
    );
}
