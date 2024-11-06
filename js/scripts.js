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
});

document.querySelector('.education-box').addEventListener('click', function() {
    alert('You clicked on the education box!');
});
