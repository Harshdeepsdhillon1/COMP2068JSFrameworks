document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
    });

    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down and past a certain point
            navbar.classList.add('hidden');
        } else {
            // Scrolling up or near the top
            navbar.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
    });
});
