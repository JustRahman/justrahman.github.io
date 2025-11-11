// Cyberpunk Hacker Interface
let currentPanel = 'profile';

// Initialize
function init() {
    // Start boot sequence
    setTimeout(completeBootSequence, 4000);

    // Setup navigation
    setupNavigation();

    // Update time
    updateSystemTime();
    setInterval(updateSystemTime, 1000);

    // Random glitch effects
    setInterval(randomGlitch, 5000);
}

// Boot sequence
function completeBootSequence() {
    document.getElementById('boot-screen').classList.remove('active');
    document.getElementById('main-screen').classList.add('active');

    // Play entrance sound effect (visual only)
    createAccessGrantedEffect();
}

function createAccessGrantedEffect() {
    // Flash effect
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = '#00ff00';
    flash.style.opacity = '0.3';
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '99999';
    document.body.appendChild(flash);

    setTimeout(() => {
        flash.style.transition = 'opacity 0.5s';
        flash.style.opacity = '0';
        setTimeout(() => flash.remove(), 500);
    }, 100);
}

// Navigation
function setupNavigation() {
    const hexItems = document.querySelectorAll('.hex-item');

    hexItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.dataset.target;
            switchPanel(target);

            // Update active hex
            hexItems.forEach(h => h.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Set initial active
    hexItems[0].classList.add('active');
}

function switchPanel(panelName) {
    // Hide all panels
    document.querySelectorAll('.data-panel').forEach(panel => {
        panel.classList.remove('active');
    });

    // Show target panel
    const targetPanel = document.getElementById(`${panelName}-panel`);
    if (targetPanel) {
        targetPanel.classList.add('active');
        currentPanel = panelName;

        // Create switch effect
        createSwitchEffect();
    }
}

function createSwitchEffect() {
    // Brief flash when switching panels
    const panels = document.querySelectorAll('.data-panel');
    panels.forEach(panel => {
        if (panel.classList.contains('active')) {
            panel.style.animation = 'none';
            setTimeout(() => {
                panel.style.animation = 'slideIn 0.5s forwards';
            }, 10);
        }
    });
}

// Update system time
function updateSystemTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const timeElement = document.getElementById('system-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Random glitch effects
function randomGlitch() {
    const glitchElements = document.querySelectorAll('.glitch');
    const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];

    if (randomElement) {
        randomElement.style.animation = 'none';
        setTimeout(() => {
            randomElement.style.animation = 'glitch 0.3s infinite';
            setTimeout(() => {
                randomElement.style.animation = 'glitch 3s infinite';
            }, 300);
        }, 10);
    }
}

// Create random matrix-style code rain (optional enhancement)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.1';
    canvas.style.zIndex = '1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * canvas.height;
    }

    const chars = '01アイウエオカキクケコサシスセソタチツテト';

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);
}

// Typing effect for text (optional)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Create special effect
    const message = document.createElement('div');
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.fontSize = '3rem';
    message.style.color = '#00ffff';
    message.style.textShadow = '0 0 20px #00ffff';
    message.style.zIndex = '99999';
    message.style.animation = 'glitch 0.5s infinite';
    message.textContent = 'ACCESS LEVEL: MAXIMUM';
    document.body.appendChild(message);

    // Create matrix rain
    createMatrixRain();

    setTimeout(() => {
        message.style.transition = 'opacity 1s';
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 1000);
    }, 3000);
}

// Handle window resize
window.addEventListener('resize', () => {
    // Adjust any dynamic elements if needed
});

// Initialize on load
window.addEventListener('load', init);

// Prevent context menu for immersion
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Add cyber typing sounds (visual feedback)
document.addEventListener('keydown', () => {
    // Visual feedback for typing
    createTypingFlash();
});

function createTypingFlash() {
    const scanLines = document.querySelector('.scan-lines');
    if (scanLines) {
        scanLines.style.opacity = '0.5';
        setTimeout(() => {
            scanLines.style.opacity = '1';
        }, 50);
    }
}

// Cursor trail effect (optional)
let cursorTrail = [];
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.width = '4px';
    trail.style.height = '4px';
    trail.style.backgroundColor = '#00ff00';
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.style.zIndex = '9998';
    trail.style.opacity = '0.5';
    trail.style.transition = 'opacity 0.5s';
    document.body.appendChild(trail);

    setTimeout(() => {
        trail.style.opacity = '0';
        setTimeout(() => trail.remove(), 500);
    }, 50);

    // Limit trails
    cursorTrail.push(trail);
    if (cursorTrail.length > 20) {
        const old = cursorTrail.shift();
        if (old && old.parentNode) old.remove();
    }
});
