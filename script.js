document.addEventListener('DOMContentLoaded', () => {
    // --- typing effect ---
    const textToType = "Master Student in Statistics & Data Science at National Taiwan University";
    const typingElement = document.getElementById('typing-text');
    let typeIndex = 0;

    function typeWriter() {
        if (typeIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeWriter, 50); // Adjust typing speed here
        }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 500);


    // --- Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'light') {
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        let theme = document.documentElement.getAttribute('data-theme');

        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Navbar Glassmorphism on Scroll ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Staggered Scroll Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Stagger delays for specific containers
    const staggerItems = document.querySelectorAll('.timeline-item, .project-card, .skill-category');
    staggerItems.forEach((el, index) => {
        // Reset delay if needed or calculate based on index within viewport
        // Simple stagger by adding delay via style
        // Note: For true staggering within a view, complex logic is needed. 
        // Here we just let natural scroll handle it, but we can add small delays if multiple are in view.
        observer.observe(el);
    });

    // --- 3D Tilt Effect for Cards ---
    const cards = document.querySelectorAll('.project-card, .experience-card, .timeline-item');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max rotation deg
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
});
