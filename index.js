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

const carouselTrack = document.querySelector('.carousel-track');
const carouselSlides = Array.from(carouselTrack.children);
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');
const carouselDots = document.querySelector('.carousel-dots');
let carouselIndex = 0;

carouselSlides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Ir a la excursión ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    carouselDots.appendChild(dot);
});

const dotButtons = Array.from(carouselDots.children);

function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${carouselIndex * 100}%)`;
    dotButtons.forEach((dot, i) => dot.classList.toggle('active', i === carouselIndex));
}

function goToSlide(i) {
    carouselIndex = (i + carouselSlides.length) % carouselSlides.length;
    updateCarousel();
}

const carouselEl = document.querySelector('.carousel');
let carouselTimer = null;

function startAutoplay() {
    stopAutoplay();
    carouselTimer = setInterval(() => goToSlide(carouselIndex + 1), 4000);
}

function stopAutoplay() {
    clearInterval(carouselTimer);
}

carouselPrev.addEventListener('click', () => {
    goToSlide(carouselIndex - 1);
    startAutoplay();
});

carouselNext.addEventListener('click', () => {
    goToSlide(carouselIndex + 1);
    startAutoplay();
});

dotButtons.forEach((dot, i) => {
    dot.addEventListener('click', () => startAutoplay());
});

carouselEl.addEventListener('mouseenter', stopAutoplay);
carouselEl.addEventListener('mouseleave', startAutoplay);
carouselEl.addEventListener('focusin', stopAutoplay);
carouselEl.addEventListener('focusout', startAutoplay);

updateCarousel();
startAutoplay();
