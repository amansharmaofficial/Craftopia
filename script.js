
// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('#nav-menu li a');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active'); // Close menu on link click
    });
});

// Header Scroll Effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Testimonial Slider
const testimonialSlides = document.getElementById('testimonial-slides');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const slideWidth = 100; // 100%
let autoSlideInterval;
let isManualSlide = false;

function goToSlide(index) {
    testimonialSlides.style.transform = `translateX(-${index * slideWidth}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentSlide = index;
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        if (!isManualSlide) {
            currentSlide = (currentSlide + 1) % dots.length;
            goToSlide(currentSlide);
        }
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        isManualSlide = true;
        stopAutoSlide();
        const slideIndex = parseInt(dot.getAttribute('data-index'));
        goToSlide(slideIndex);
        setTimeout(() => {
            isManualSlide = false;
            startAutoSlide();
        }, 8000)
    });
});

startAutoSlide();

// Intersection Observer for fade-in animations
const fadeElems = document.querySelectorAll('.fade-in');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);
fadeElems.forEach(elem => {
    observer.observe(elem);
});
