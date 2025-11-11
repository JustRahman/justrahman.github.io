// RahmanOS - Window Manager Portfolio
let activeWindow = null;
let draggedWindow = null;
let offsetX = 0;
let offsetY = 0;
let windowZ = 10;
let openWindows = new Set();

// Window positions for initial placement
const windowPositions = [
    { top: 100, left: 200 },
    { top: 150, left: 250 },
    { top: 200, left: 300 },
    { top: 100, left: 400 },
    { top: 150, left: 450 }
];

let positionIndex = 0;

// Initialize
function init() {
    updateClock();
    setInterval(updateClock, 1000);

    // Desktop icon clicks
    document.querySelectorAll('.icon').forEach(icon => {
        icon.addEventListener('dblclick', () => {
            const windowId = icon.dataset.window;
            openWindow(windowId);
        });
    });

    // Start menu
    document.querySelector('.start-button').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleStartMenu();
    });

    document.querySelectorAll('.start-menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const windowId = item.dataset.window;
            openWindow(windowId);
            closeStartMenu();
        });
    });

    // Close start menu when clicking elsewhere
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.start-menu') && !e.target.closest('.start-button')) {
            closeStartMenu();
        }
    });

    // Setup all windows
    document.querySelectorAll('.window').forEach(window => {
        setupWindow(window);
    });

    // Terminal input
    const terminalInput = document.getElementById('terminal-mini-input');
    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleTerminalCommand(terminalInput.value);
                terminalInput.value = '';
            }
        });
    }
}

// Update clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    const dateString = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
    document.getElementById('taskbar-time').textContent = `${dateString} ${timeString}`;
}

// Toggle start menu
function toggleStartMenu() {
    const menu = document.getElementById('start-menu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

function closeStartMenu() {
    document.getElementById('start-menu').style.display = 'none';
}

// Setup window
function setupWindow(window) {
    const header = window.querySelector('.window-header');
    const closeBtn = window.querySelector('.window-btn.close');
    const minimizeBtn = window.querySelector('.window-btn.minimize');
    const maximizeBtn = window.querySelector('.window-btn.maximize');

    // Make draggable
    header.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('window-btn')) return;
        startDrag(window, e);
    });

    // Window controls
    closeBtn.addEventListener('click', () => closeWindow(window));
    minimizeBtn.addEventListener('click', () => minimizeWindow(window));
    maximizeBtn.addEventListener('click', () => maximizeWindow(window));

    // Click to focus
    window.addEventListener('mousedown', () => {
        focusWindow(window);
    });
}

// Open window
function openWindow(windowId) {
    const window = document.getElementById(`${windowId}-window`);
    if (!window) return;

    if (window.style.display === 'none') {
        // Position window
        const pos = windowPositions[positionIndex % windowPositions.length];
        window.style.top = pos.top + 'px';
        window.style.left = pos.left + 'px';
        positionIndex++;

        window.style.display = 'flex';
        openWindows.add(windowId);
        addToTaskbar(windowId, window);

        // Focus terminal input if it's the terminal window
        if (windowId === 'terminal') {
            setTimeout(() => {
                document.getElementById('terminal-mini-input')?.focus();
            }, 100);
        }
    }

    focusWindow(window);
}

// Close window
function closeWindow(window) {
    window.style.display = 'none';
    const windowId = window.id.replace('-window', '');
    openWindows.delete(windowId);
    removeFromTaskbar(windowId);
}

// Minimize window
function minimizeWindow(window) {
    window.style.display = 'none';
}

// Maximize window
function maximizeWindow(window) {
    if (window.style.width === '90vw') {
        // Restore
        window.style.width = '';
        window.style.height = '';
        window.style.top = '';
        window.style.left = '';
        window.style.transform = '';
    } else {
        // Maximize
        window.style.width = '90vw';
        window.style.height = '85vh';
        window.style.top = '20px';
        window.style.left = '50%';
        window.style.transform = 'translateX(-50%)';
    }
}

// Focus window
function focusWindow(window) {
    // Remove active from all windows
    document.querySelectorAll('.window').forEach(w => {
        w.classList.remove('active');
    });

    // Add active to this window
    window.classList.add('active');
    window.style.zIndex = ++windowZ;
    activeWindow = window;

    // Update taskbar
    const windowId = window.id.replace('-window', '');
    updateTaskbarActive(windowId);
}

// Drag functionality
function startDrag(window, e) {
    draggedWindow = window;
    const rect = window.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);

    focusWindow(window);
}

function drag(e) {
    if (!draggedWindow) return;

    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;

    // Boundaries
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 100;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    draggedWindow.style.left = x + 'px';
    draggedWindow.style.top = y + 'px';
    draggedWindow.style.transform = 'none';
}

function stopDrag() {
    draggedWindow = null;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}

// Taskbar management
function addToTaskbar(windowId, window) {
    const taskbarWindows = document.getElementById('taskbar-windows');

    // Don't add if already exists
    if (document.getElementById(`taskbar-${windowId}`)) return;

    const taskbarWindow = document.createElement('div');
    taskbarWindow.className = 'taskbar-window';
    taskbarWindow.id = `taskbar-${windowId}`;

    const title = window.querySelector('.window-title').textContent;
    taskbarWindow.textContent = title;

    taskbarWindow.addEventListener('click', () => {
        if (window.style.display === 'none') {
            window.style.display = 'flex';
            focusWindow(window);
        } else if (window === activeWindow) {
            minimizeWindow(window);
        } else {
            focusWindow(window);
        }
    });

    taskbarWindows.appendChild(taskbarWindow);
}

function removeFromTaskbar(windowId) {
    const taskbarItem = document.getElementById(`taskbar-${windowId}`);
    if (taskbarItem) {
        taskbarItem.remove();
    }
}

function updateTaskbarActive(windowId) {
    document.querySelectorAll('.taskbar-window').forEach(item => {
        item.classList.remove('active');
    });

    const activeItem = document.getElementById(`taskbar-${windowId}`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

// Mini terminal commands
function handleTerminalCommand(cmd) {
    const output = document.getElementById('terminal-mini-output');
    const trimmed = cmd.trim();

    if (!trimmed) return;

    // Display command
    const cmdDiv = document.createElement('div');
    cmdDiv.textContent = `$ ${trimmed}`;
    output.appendChild(cmdDiv);

    // Execute command
    let result = '';
    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();

    switch(command) {
        case 'help':
            result = 'Available: help, about, projects, skills, contact, clear, open [window]';
            break;
        case 'about':
            result = 'Rahman Bazarov - CS Student at Arizona State University';
            break;
        case 'projects':
            result = 'LexFlow, OrderEasy, BeletFilm, FMS Game';
            break;
        case 'skills':
            result = 'Python, JavaScript, C#, Next.js, FastAPI, Machine Learning';
            break;
        case 'contact':
            result = 'rahmanbazarov4567@gmail.com | github.com/JustRahman';
            break;
        case 'clear':
            output.innerHTML = '';
            return;
        case 'open':
            const windowName = parts[1];
            if (windowName && ['about', 'skills', 'projects', 'contact'].includes(windowName)) {
                openWindow(windowName);
                result = `Opening ${windowName}...`;
            } else {
                result = 'Usage: open [about|skills|projects|contact]';
            }
            break;
        default:
            result = `Command not found: ${command}`;
    }

    if (result) {
        const resultDiv = document.createElement('div');
        resultDiv.textContent = result;
        output.appendChild(resultDiv);
    }

    // Scroll to bottom
    output.scrollTop = output.scrollHeight;
}

// Initialize on load
window.addEventListener('load', init);
