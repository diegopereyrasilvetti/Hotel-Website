import { useEffect, useRef, useState } from 'react';

const canAnimate = () =>
    typeof window !== 'undefined' &&
    'IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Animates its element in once, the first time it enters the viewport.
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
    const ref = useRef(null);
    const [state, setState] = useState(() => (canAnimate() ? 'hidden' : 'done'));

    useEffect(() => {
        if (state !== 'hidden') return undefined;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setState('in');
                observer.disconnect();
            },
            { threshold: 0.12 },
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [state]);

    const stateClass = state === 'hidden' ? 'reveal-hidden' : state === 'in' ? 'reveal-in' : '';

    return (
        <Tag
            ref={ref}
            className={`${className} ${stateClass}`.trim()}
            style={{ ...style, '--reveal-delay': `${delay}s` }}
            {...rest}
        >
            {children}
        </Tag>
    );
}
