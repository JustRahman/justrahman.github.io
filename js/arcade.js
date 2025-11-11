// Retro Arcade Portfolio
let credits = 0;
let currentScreen = 'insert-coin';
let currentMenuItem = 0;
let playerScore = 0;

const menuItems = ['about', 'skills', 'projects', 'contact', 'scores'];
const sounds = {
    coin: 'COIN INSERT',
    select: 'BLIP',
    move: 'BEEP',
    back: 'BOOP'
};

// Initialize
function init() {
    setupKeyboardControls();
    updateCreditsDisplay();

    // Welcome message
    console.log('%c RETRO ARCADE LOADED ', 'background: #ffff00; color: #000; font-size: 20px; padding: 10px; font-family: monospace;');
    console.log('%c INSERT COIN TO START ', 'background: #00ffff; color: #000; font-size: 14px; padding: 5px; font-family: monospace;');
}

// Setup keyboard controls
function setupKeyboardControls() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case ' ':
                e.preventDefault();
                if (currentScreen === 'insert-coin') {
                    insertCoin();
                } else if (currentScreen === 'main-menu') {
                    selectMenuItem();
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (currentScreen === 'main-menu') {
                    navigateMenu(-1);
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (currentScreen === 'main-menu') {
                    navigateMenu(1);
                }
                break;
            case 'Escape':
                e.preventDefault();
                if (currentScreen !== 'insert-coin' && currentScreen !== 'main-menu') {
                    returnToMenu();
                }
                break;
        }
    });
}

// Insert coin
function insertCoin() {
    credits++;
    updateCreditsDisplay();
    playSound('coin');

    // Flash screen
    flashScreen();

    // Show main menu after delay
    setTimeout(() => {
        showScreen('main-menu');
    }, 500);
}

// Update credits display
function updateCreditsDisplay() {
    const creditElements = document.querySelectorAll('#credits, #credits-display');
    creditElements.forEach(el => {
        el.textContent = credits;
    });
}

// Navigate menu
function navigateMenu(direction) {
    playSound('move');

    const items = document.querySelectorAll('.menu-item');
    items[currentMenuItem].classList.remove('active');

    currentMenuItem = (currentMenuItem + direction + items.length) % items.length;
    items[currentMenuItem].classList.add('active');
}

// Select menu item
function selectMenuItem() {
    playSound('select');

    const selectedGame = menuItems[currentMenuItem];
    showScreen(selectedGame);

    // Update score
    playerScore += 1000;
    updateScore();
}

// Show screen
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.game-screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show selected screen
    const screen = document.getElementById(`${screenId}-screen`);
    if (screen) {
        screen.classList.add('active');
        currentScreen = screenId;
        flashScreen();
    }
}

// Return to menu
function returnToMenu() {
    playSound('back');
    showScreen('main-menu');
}

// Flash screen effect
function flashScreen() {
    const screens = document.querySelectorAll('.game-screen.active');
    screens.forEach(screen => {
        screen.style.animation = 'none';
        setTimeout(() => {
            screen.style.animation = 'screen-flicker 0.3s';
        }, 10);
    });
}

// Play sound effect (visual representation)
function playSound(soundName) {
    const soundFx = document.getElementById('sound-fx');
    const soundNameEl = soundFx.querySelector('.sound-name');

    soundNameEl.textContent = `♪ ${sounds[soundName]} ♪`;
    soundFx.style.display = 'block';
    soundFx.style.position = 'fixed';
    soundFx.style.top = '20px';
    soundFx.style.right = '20px';
    soundFx.style.background = '#ffff00';
    soundFx.style.color = '#000';
    soundFx.style.padding = '10px 20px';
    soundFx.style.fontFamily = 'Press Start 2P';
    soundFx.style.fontSize = '10px';
    soundFx.style.zIndex = '10000';
    soundFx.style.animation = 'blink 0.5s 2';

    setTimeout(() => {
        soundFx.style.display = 'none';
    }, 500);

    // Console log
    console.log(`%c ${sounds[soundName]} `, 'background: #00ffff; color: #000; font-family: monospace;');
}

// Update score
function updateScore() {
    const scoreEl = document.getElementById('player-score');
    if (scoreEl) {
        scoreEl.textContent = playerScore.toString().padStart(6, '0');
    }
}

// Konami code easter egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        activateKonamiCode();
        konamiCode = [];
    }
});

function activateKonamiCode() {
    // Add 30 lives (credits)
    credits += 30;
    updateCreditsDisplay();

    // Max out score
    playerScore = 999999;
    updateScore();

    // Visual effect
    console.log('%c ★★★ KONAMI CODE ACTIVATED ★★★ ', 'background: #ff00ff; color: #fff; font-size: 16px; padding: 10px; font-family: monospace;');
    console.log('%c +30 CREDITS! MAX SCORE! ', 'background: #00ff00; color: #000; font-size: 12px; padding: 5px; font-family: monospace;');

    playSound('coin');

    // Flash screen multiple times
    for (let i = 0; i < 5; i++) {
        setTimeout(() => flashScreen(), i * 200);
    }
}

// Attract mode (demo mode when idle)
let idleTimer = null;
let idleTime = 60000; // 60 seconds

function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        if (currentScreen !== 'insert-coin') {
            showAttractMode();
        }
    }, idleTime);
}

function showAttractMode() {
    console.log('%c ATTRACT MODE ACTIVATED ', 'background: #ff00ff; color: #fff; font-family: monospace;');
    showScreen('insert-coin');
}

// Reset idle timer on any interaction
document.addEventListener('keydown', resetIdleTimer);
document.addEventListener('click', resetIdleTimer);

// Auto-demo high scores on insert coin screen
function rotateHighScores() {
    if (currentScreen === 'insert-coin') {
        const scores = document.querySelectorAll('.score-line');
        scores.forEach((score, index) => {
            setTimeout(() => {
                score.style.animation = 'blink 0.5s 1';
            }, index * 1000);
        });
    }
}

setInterval(rotateHighScores, 5000);

// Cheat codes
const cheatCodes = {
    'iddqd': () => {
        console.log('%c GOD MODE ACTIVATED ', 'background: #ff0000; color: #fff;');
        credits = 99;
        updateCreditsDisplay();
    },
    'idkfa': () => {
        console.log('%c ALL SKILLS UNLOCKED ', 'background: #00ff00; color: #000;');
        playerScore = 620000;
        updateScore();
    }
};

let cheatBuffer = '';
document.addEventListener('keypress', (e) => {
    cheatBuffer += e.key;
    cheatBuffer = cheatBuffer.slice(-6);

    if (cheatCodes[cheatBuffer]) {
        cheatCodes[cheatBuffer]();
        playSound('coin');
        cheatBuffer = '';
    }
});

// Random screen glitch effect
function randomGlitch() {
    if (Math.random() > 0.98) {
        const screen = document.querySelector('.game-screen.active');
        if (screen) {
            screen.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            setTimeout(() => {
                screen.style.transform = 'translate(0, 0)';
            }, 50);
        }
    }
}

setInterval(randomGlitch, 100);

// Simulate CRT flicker
function crtFlicker() {
    const crt = document.querySelector('.crt-overlay');
    if (crt && Math.random() > 0.95) {
        crt.style.opacity = 0.3;
        setTimeout(() => {
            crt.style.opacity = 1;
        }, 50);
    }
}

setInterval(crtFlicker, 200);

// Button click effects
document.querySelectorAll('.arcade-button, .action-button').forEach(button => {
    button.addEventListener('click', function() {
        playSound('select');
        this.style.transform = 'translateY(4px)';
        setTimeout(() => {
            this.style.transform = 'translateY(0)';
        }, 100);
    });
});

// Joystick animation
const joystick = document.querySelector('.joystick-stick');
let joystickInterval;

document.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        clearInterval(joystickInterval);

        let x = 0, y = 0;
        switch(e.key) {
            case 'ArrowUp': y = -10; break;
            case 'ArrowDown': y = 10; break;
            case 'ArrowLeft': x = -10; break;
            case 'ArrowRight': x = 10; break;
        }

        if (joystick) {
            joystick.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        }

        joystickInterval = setTimeout(() => {
            if (joystick) {
                joystick.style.transform = 'translate(-50%, -50%)';
            }
        }, 200);
    }
});

// Welcome sequence
function playWelcomeSequence() {
    console.log('%c', 'font-size: 1px; padding: 50px 100px; background: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'%3E%3Ctext x=\'10\' y=\'50\' font-size=\'40\' fill=\'%23ffff00\'%3E★%3C/text%3E%3C/svg%3E") no-repeat;');
    console.log('%c RAHMAN\'S ARCADE ', 'background: linear-gradient(90deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff); color: #000; font-size: 24px; padding: 10px; font-family: monospace; font-weight: bold;');
    console.log('%c PORTFOLIO v1.0 ', 'background: #000; color: #00ff00; font-size: 14px; padding: 5px; font-family: monospace;');
    console.log('%c CREDITS: 0 ', 'background: #ffff00; color: #000; font-size: 12px; padding: 5px; font-family: monospace;');
    console.log('%c TIP: Type "iddqd" or "idkfa" for cheat codes ', 'color: #ff00ff; font-size: 10px; font-family: monospace;');
}

// Initialize on load
window.addEventListener('load', () => {
    init();
    playWelcomeSequence();
    resetIdleTimer();
});

// Prevent space bar scrolling
window.addEventListener('keydown', (e) => {
    if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
    }
});
