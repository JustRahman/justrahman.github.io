document.addEventListener("DOMContentLoaded", function () {
    // Fade in effect on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const options = {
        root: null,
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = 'none';
        });
    });

    // Smooth scroll for internal links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Load animation on page load
    document.body.style.opacity = 0;
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = 1;
    }, 100);

    // Additional animations for skills section
    const skills = document.querySelectorAll('.skill');

    skills.forEach(skill => {
        skill.style.opacity = 0;
        skill.style.transform = 'translateY(20px)';
        setTimeout(() => {
            skill.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            skill.style.opacity = 1;
            skill.style.transform = 'translateY(0)';
        }, 500); // Delay to stagger the animations
    });

    // Scroll-triggered fade-out for hero content
    document.addEventListener("scroll", function() {
        const scrollPosition = window.scrollY;
        const heroContent = document.querySelector(".hero-content");
        const topLeft = document.querySelector(".top-left");

        // Define the scroll range over which the fade-out occurs
        const fadeStart = 100; // Point at which fade-out starts
        const fadeEnd = 400; // Point at which fade-out is complete
        const fadeRange = fadeEnd - fadeStart;

        // Calculate the opacity based on scroll position within the fade range
        if (scrollPosition > fadeStart && scrollPosition < fadeEnd) {
            const opacity = 1 - (scrollPosition - fadeStart) / fadeRange;
            heroContent.style.opacity = opacity;
            topLeft.style.opacity = opacity;
            heroContent.style.transform = `translateY(${-20 * (1 - opacity)}px)`;
            topLeft.style.transform = `translateY(${-20 * (1 - opacity)}px)`;
        } else if (scrollPosition >= fadeEnd) {
            // If scroll is past the fadeEnd point, set opacity to 0 (completely hidden)
            heroContent.style.opacity = 0;
            topLeft.style.opacity = 0;
            heroContent.style.transform = `translateY(-20px)`;
            topLeft.style.transform = `translateY(-20px)`;
        } else {
            // If scroll is before the fadeStart point, reset to full opacity
            heroContent.style.opacity = 1;
            topLeft.style.opacity = 1;
            heroContent.style.transform = `translateY(0)`;
            topLeft.style.transform = `translateY(0)`;
        }
    });
});
