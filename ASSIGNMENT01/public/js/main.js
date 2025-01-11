
// Initialize AOS
AOS.init({
    duration: 1000,        // Animation duration in milliseconds
    easing: 'ease-in-out', // Easing for animations
    once: false,            // Animation runs only once
});

let lastScrollY = window.scrollY;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        // Scrolling down
        header.classList.add('hidden');
    } else {
        // Scrolling up
        header.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
});
