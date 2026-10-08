"use strict";

const roomModal = document.querySelector('.room-modal');
const roomModalImg = roomModal.querySelector('img');

document.querySelectorAll('.room-card').forEach((card) => {
    card.addEventListener('click', () => {
        roomModalImg.src = card.dataset.img;
        roomModalImg.alt = card.dataset.alt;
        roomModal.showModal();
    });
});

roomModal.querySelector('.room-modal-close').addEventListener('click', () => {
    roomModal.close();
});

roomModal.addEventListener('click', (event) => {
    if (event.target === roomModal) {
        roomModal.close();
    }
});

const dotBaseClass = 'h-2 w-2 shrink-0 cursor-pointer rounded-full border-0 p-0 m-0 transition-all duration-200';

function initCarousel({ root, trackSelector, prevSelector, nextSelector, dotsSelector, label, intervalMs }) {
    const track = root.querySelector(trackSelector);
    const slides = Array.from(track.children);
    const prevBtn = root.querySelector(prevSelector);
    const nextBtn = root.querySelector(nextSelector);
    const dotsWrap = document.querySelector(dotsSelector);
    let index = 0;
    let timer = null;

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `${dotBaseClass} bg-white/35`;
        dot.setAttribute('aria-label', `Ir a ${label} ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsWrap.appendChild(dot);
    });

    const dotButtons = Array.from(dotsWrap.children);

    function update() {
        track.style.transform = `translateX(-${index * 100}%)`;
        dotButtons.forEach((dot, i) => {
            const isActive = i === index;
            dot.className = `${dotBaseClass} ${isActive ? 'scale-125 bg-white' : 'bg-white/35'}`;
        });
    }

    function goToSlide(i) {
        index = (i + slides.length) % slides.length;
        update();
    }

    function startAutoplay() {
        stopAutoplay();
        timer = setInterval(() => goToSlide(index + 1), intervalMs);
    }

    function stopAutoplay() {
        clearInterval(timer);
    }

    prevBtn.addEventListener('click', () => {
        goToSlide(index - 1);
        startAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        goToSlide(index + 1);
        startAutoplay();
    });

    dotButtons.forEach((dot) => {
        dot.addEventListener('click', () => startAutoplay());
    });

    root.addEventListener('mouseenter', stopAutoplay);
    root.addEventListener('mouseleave', startAutoplay);
    root.addEventListener('focusin', stopAutoplay);
    root.addEventListener('focusout', startAutoplay);

    update();
    startAutoplay();
}

initCarousel({
    root: document.querySelector('.carousel'),
    trackSelector: '.carousel-track',
    prevSelector: '.carousel-prev',
    nextSelector: '.carousel-next',
    dotsSelector: '.carousel-dots',
    label: 'la excursión',
    intervalMs: 4000,
});

initCarousel({
    root: document.querySelector('.hero-carousel'),
    trackSelector: '.hero-carousel-track',
    prevSelector: '.hero-carousel-prev',
    nextSelector: '.hero-carousel-next',
    dotsSelector: '.hero-carousel-dots',
    label: 'la imagen',
    intervalMs: 3500,
});

const reservaForm = document.getElementById('reserva-form');
const reservaCheckin = document.getElementById('reserva-checkin');
const reservaCheckout = document.getElementById('reserva-checkout');
const reservaFeedback = document.getElementById('reserva-feedback');

const today = new Date().toISOString().split('T')[0];
reservaCheckin.min = today;
reservaCheckout.min = today;

reservaCheckin.addEventListener('change', () => {
    reservaCheckout.min = reservaCheckin.value || today;
    if (reservaCheckout.value && reservaCheckout.value <= reservaCheckin.value) {
        reservaCheckout.value = '';
    }
});

reservaForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const habitacion = document.getElementById('reserva-habitacion').value;
    const checkin = reservaCheckin.value;
    const checkout = reservaCheckout.value;

    reservaFeedback.textContent =
        `¡Listo! Pediste reservar ${habitacion} del ${checkin} al ${checkout}. Te vamos a contactar para confirmar.`;

    reservaForm.reset();
    reservaCheckin.min = today;
    reservaCheckout.min = today;
});
