export default function Footer() {
    return (
        <footer className="flex min-h-[90px] flex-wrap items-center justify-center gap-x-7 gap-y-3.5 border-t border-accent/30 bg-surface px-5 py-8">
            <div className="mx-auto flex w-[min(1120px,calc(100%-40px))] flex-wrap items-start justify-between gap-x-12 gap-y-6 max-[768px]:flex-col max-[768px]:items-center max-[768px]:text-center">
                <div className="min-w-[260px] flex-1">
                    <h2 className="mb-1.5 text-2xl font-bold text-white">Hotel Bariloche</h2>
                    <p className="text-white/70">Desde 1955</p>
                    <p className="text-white/70">
                        Tradición familiar, hospitalidad y el confort
                        que necesitás para disfrutar de Bariloche.
                    </p>
                </div>

                <div className="min-w-[260px] flex-1">
                    <h3 className="mb-2.5 text-[1.05rem] font-bold text-white">Contacto</h3>
                    <p className="text-white/70"><i className="fa-solid fa-location-dot mr-2 w-4 text-accent" aria-hidden="true"></i>Bariloche, Río Negro, Argentina</p>
                    <p className="text-white/70"><i className="fa-solid fa-phone mr-2 w-4 text-accent" aria-hidden="true"></i>+54 294 XXX-XXXX</p>
                    <p className="text-white/70"><i className="fa-solid fa-envelope mr-2 w-4 text-accent" aria-hidden="true"></i>reservas@hotelbariloche.com</p>
                </div>
            </div>
        </footer>
    );
}
