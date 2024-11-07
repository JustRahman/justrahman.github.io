document.addEventListener("DOMContentLoaded", function () {
    // Select all sections with the fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');

    // Set up the options for the observer
    const options = {
        root: null,
        threshold: 0.2, // Adjust as needed to trigger earlier or later
    };

    // Callback function for the observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Add the class to fade in
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, options);

    // Observe each fade-in element
    fadeElements.forEach(element => {
        observer.observe(element);
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

    // Fade-out for hero content on scroll
    document.addEventListener("scroll", function() {
        const scrollPosition = window.scrollY;
        const heroContent = document.querySelector(".hero-content");
        const topLeft = document.querySelector(".top-left");

        const fadeStart = 100;
        const fadeEnd = 400;
        const fadeRange = fadeEnd - fadeStart;

        if (scrollPosition > fadeStart && scrollPosition < fadeEnd) {
            const opacity = 1 - (scrollPosition - fadeStart) / fadeRange;
            heroContent.style.opacity = opacity;
            topLeft.style.opacity = opacity;
            heroContent.style.transform = `translateY(${-20 * (1 - opacity)}px)`;
            topLeft.style.transform = `translateY(${-20 * (1 - opacity)}px)`;
        } else if (scrollPosition >= fadeEnd) {
            heroContent.style.opacity = 0;
            topLeft.style.opacity = 0;
            heroContent.style.transform = `translateY(-20px)`;
            topLeft.style.transform = `translateY(-20px)`;
        } else {
            heroContent.style.opacity = 1;
            topLeft.style.opacity = 1;
            heroContent.style.transform = `translateY(0)`;
            topLeft.style.transform = `translateY(0)`;
        }
    });

    const comingSoonElement = document.querySelector('#blog-posts h2');
    const text = 'Coming Soon...';
    let index = 0;

    function typeLetter() {
        if (index < text.length) {
            comingSoonElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeLetter, 150); // Adjust typing speed here
        } else {
            // Add a glowing effect after typing is complete
            comingSoonElement.classList.add('glow');
        }
    }

    // Initial delay before starting to type
    setTimeout(() => {
        typeLetter();
    }, 1200);

    const contactForm = document.getElementById('contact-form');
    const warningMessage = document.createElement('div');
    warningMessage.className = 'contact-out-of-order';
    warningMessage.textContent = 'Currently out of order. Please try again later.';

    contactForm.parentElement.appendChild(warningMessage);

    contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent actual form submission
        warningMessage.style.opacity = 1; // Show the warning
        setTimeout(() => {
            warningMessage.style.opacity = 0; // Fade out the warning after 3 seconds
        }, 3000);
    });
    

    // emailjs.init("TMp5kfS69_ovIoywX"); // Replace with your actual EmailJS user ID



    // document.getElementById('contact-form').addEventListener('submit', function(event) {
    //     event.preventDefault(); // Prevent the default form submission

    //     // Collect form data and send email
    //     emailjs.sendForm('service_ol5e0om', 'template_99to2ml', this) // Replace with your Service ID and Template ID
    //         .then(function(response) {
    //             alert('Message sent successfully!');
    //         }, function(error) {
    //             console.error('EmailJS error:', error); // Log the error for debugging
    //             alert('Failed to send message, please try again.');
    //         });
    // });

    

    
   
});

// function sendEmail(){
//     let parms = {
//         name: document.getElementById("name").value,
//         email: document.getElementById("email").value,
//         subject: document.getElementById("subject"),
//         message: document.getElementById("message").value,
//     }
//     emailjs.send('service_ol5e0om', 'template_99to2ml', parms).then(alert("Email Sent!"));
// }
