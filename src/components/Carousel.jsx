import { useEffect, useState } from 'react';

const arrowClass =
    'absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-bg/55 text-[1.1rem] text-white backdrop-blur-md transition duration-200 hover:scale-105 hover:border-accent hover:bg-black/75';

const dotBaseClass = 'h-2 w-2 shrink-0 cursor-pointer rounded-full border-0 p-0 m-0 transition-all duration-200';

function Dots({ count, index, label, onSelect, className }) {
    return (
        <div className={className}>
            {Array.from({ length: count }, (_, i) => (
                <button
                    key={i}
                    type="button"
                    className={`${dotBaseClass} ${i === index ? 'scale-125 bg-white' : 'bg-white/35'}`}
                    aria-label={`Ir a ${label} ${i + 1}`}
                    onClick={() => onSelect(i)}
                />
            ))}
        </div>
    );
}

// variant "hero": full-width slider with overlay children and dots inside.
// variant "excursions": narrower slider with the dots below it.
export default function Carousel({ slides, variant, label, intervalMs, prevLabel, nextLabel, children }) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const isHero = variant === 'hero';

    const goTo = (i) => setIndex((i + slides.length) % slides.length);

    // Restarts on every slide change, so manual navigation resets the timer.
    useEffect(() => {
        if (paused) return undefined;
        const timer = setTimeout(() => setIndex((i) => (i + 1) % slides.length), intervalMs);
        return () => clearTimeout(timer);
    }, [index, paused, intervalMs, slides.length]);

    const pauseProps = {
        onMouseEnter: () => setPaused(true),
        onMouseLeave: () => setPaused(false),
        onFocus: () => setPaused(true),
        onBlur: () => setPaused(false),
    };

    const track = (
        <div
            className={`flex transition-transform ${isHero ? 'duration-700' : 'duration-500'} ease-[cubic-bezier(0.65,0,0.35,1)]`}
            style={{ transform: `translateX(-${index * 100}%)` }}
        >
            {slides.map((slide) => (
                <img
                    key={slide.src}
                    className={
                        isHero
                            ? 'block aspect-[16/9] w-full shrink-0 grow-0 basis-full object-cover max-[768px]:aspect-[4/3] max-[480px]:aspect-[4/5]'
                            : 'block aspect-[3/2] w-full shrink-0 grow-0 basis-full object-cover'
                    }
                    src={slide.src}
                    alt={slide.alt}
                />
            ))}
        </div>
    );

    if (isHero) {
        return (
            <div
                className="relative mx-auto w-full overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
                {...pauseProps}
            >
                {track}
                <button
                    type="button"
                    className={`${arrowClass} left-4 max-[768px]:top-4 max-[768px]:h-10 max-[768px]:w-10 max-[768px]:translate-y-0`}
                    aria-label={prevLabel}
                    onClick={() => goTo(index - 1)}
                >
                    &#10094;
                </button>
                <button
                    type="button"
                    className={`${arrowClass} right-4 max-[768px]:top-4 max-[768px]:h-10 max-[768px]:w-10 max-[768px]:translate-y-0`}
                    aria-label={nextLabel}
                    onClick={() => goTo(index + 1)}
                >
                    &#10095;
                </button>
                {children}
                <Dots
                    className="absolute inset-x-0 bottom-4 flex justify-center gap-2"
                    count={slides.length}
                    index={index}
                    label={label}
                    onSelect={goTo}
                />
            </div>
        );
    }

    return (
        <>
            <div className="relative mx-auto w-[min(100%,720px)]" {...pauseProps}>
                <button type="button" className={`${arrowClass} left-4`} aria-label={prevLabel} onClick={() => goTo(index - 1)}>
                    &#10094;
                </button>
                <div className="overflow-hidden rounded-[24px] shadow-[0_24px_60px_rgba(0,0,0,0.5)]">{track}</div>
                <button type="button" className={`${arrowClass} right-4`} aria-label={nextLabel} onClick={() => goTo(index + 1)}>
                    &#10095;
                </button>
            </div>
            <Dots
                className="mt-5 flex justify-center gap-2"
                count={slides.length}
                index={index}
                label={label}
                onSelect={goTo}
            />
        </>
    );
}
