"use strict";

// Reveal on scroll for the rooms page: each [data-reveal] block animates in once.
const revealElements = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.remove('reveal-hidden');
            entry.target.classList.add('reveal-left');
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    revealElements.forEach((el) => {
        el.classList.add('reveal-hidden');
        revealObserver.observe(el);
    });
}
