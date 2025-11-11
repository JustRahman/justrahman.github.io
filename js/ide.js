// VS Code IDE Portfolio
let currentFile = 'readme';
let openTabs = ['readme'];

// File metadata
const files = {
    readme: {
        name: 'README.md',
        icon: '📄',
        language: 'Markdown',
        encoding: 'UTF-8'
    },
    about: {
        name: 'about.js',
        icon: '📄',
        language: 'JavaScript',
        encoding: 'UTF-8'
    },
    skills: {
        name: 'skills.json',
        icon: '📄',
        language: 'JSON',
        encoding: 'UTF-8'
    },
    projects: {
        name: 'projects.md',
        icon: '📄',
        language: 'Markdown',
        encoding: 'UTF-8'
    },
    contact: {
        name: 'contact.ts',
        icon: '📄',
        language: 'TypeScript',
        encoding: 'UTF-8'
    },
    experience: {
        name: 'experience.yaml',
        icon: '📄',
        language: 'YAML',
        encoding: 'UTF-8'
    }
};

// Initialize
function init() {
    setupFileNavigation();
    setupActivityBar();
    generateLineNumbers();
    updateStatusBar();

    // Make external links work
    makeLinksClickable();
}

// Setup file navigation
function setupFileNavigation() {
    // File items in sidebar
    document.querySelectorAll('.file-item').forEach(item => {
        item.addEventListener('click', () => {
            const fileName = item.dataset.file;
            openFile(fileName);
        });
    });

    // Tab close buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-close')) {
            e.stopPropagation();
            const tab = e.target.closest('.tab');
            const fileName = tab.dataset.file;
            closeTab(fileName);
        }
    });

    // Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const fileName = tab.dataset.file;
            switchToFile(fileName);
        });
    });
}

// Open file
function openFile(fileName) {
    // Add to open tabs if not already open
    if (!openTabs.includes(fileName)) {
        openTabs.push(fileName);
        addTab(fileName);
    }

    // Switch to this file
    switchToFile(fileName);
}

// Switch to file
function switchToFile(fileName) {
    currentFile = fileName;

    // Update sidebar active state
    document.querySelectorAll('.file-item').forEach(item => {
        item.classList.toggle('active', item.dataset.file === fileName);
    });

    // Update tabs active state
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.file === fileName);
    });

    // Show correct code file
    document.querySelectorAll('.code-file').forEach(file => {
        file.classList.toggle('active', file.id === `${fileName}-file`);
    });

    // Update status bar
    updateStatusBar();
}

// Add tab
function addTab(fileName) {
    const tabsContainer = document.querySelector('.tabs-container');
    const fileInfo = files[fileName];

    const tab = document.createElement('div');
    tab.className = 'tab';
    tab.dataset.file = fileName;

    tab.innerHTML = `
        <span class="tab-icon">${fileInfo.icon}</span>
        <span class="tab-name">${fileInfo.name}</span>
        <span class="tab-close">×</span>
    `;

    // Add click handler
    tab.addEventListener('click', () => {
        switchToFile(fileName);
    });

    // Add close button handler
    tab.querySelector('.tab-close').addEventListener('click', (e) => {
        e.stopPropagation();
        closeTab(fileName);
    });

    tabsContainer.appendChild(tab);
}

// Close tab
function closeTab(fileName) {
    // Remove from open tabs
    openTabs = openTabs.filter(f => f !== fileName);

    // Remove tab element
    const tab = document.querySelector(`.tab[data-file="${fileName}"]`);
    if (tab) {
        tab.remove();
    }

    // If this was the current file, switch to another
    if (currentFile === fileName && openTabs.length > 0) {
        switchToFile(openTabs[openTabs.length - 1]);
    }
}

// Generate line numbers
function generateLineNumbers() {
    document.querySelectorAll('.code-file').forEach(file => {
        const codeElement = file.querySelector('.code-pre code');
        const lineNumbersElement = file.querySelector('.line-numbers');

        if (codeElement && lineNumbersElement) {
            const lines = codeElement.querySelectorAll('.line');
            const lineCount = lines.length;

            let lineNumbers = '';
            for (let i = 1; i <= lineCount; i++) {
                lineNumbers += `${i}\n`;
            }

            lineNumbersElement.textContent = lineNumbers;
        }
    });
}

// Update status bar
function updateStatusBar() {
    const fileInfo = files[currentFile];

    // Update language
    const languageItem = document.querySelector('.status-right .status-item:nth-child(2)');
    if (languageItem) {
        languageItem.textContent = fileInfo.language;
    }

    // Update encoding
    const encodingItem = document.querySelector('.status-right .status-item:nth-child(1)');
    if (encodingItem) {
        encodingItem.textContent = fileInfo.encoding;
    }
}

// Setup activity bar
function setupActivityBar() {
    document.querySelectorAll('.activity-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            // For now, just toggle active state
            document.querySelectorAll('.activity-icon').forEach(i => {
                i.classList.remove('active');
            });
            icon.classList.add('active');
        });
    });
}

// Make links clickable
function makeLinksClickable() {
    document.querySelectorAll('.code-pre code').forEach(codeBlock => {
        codeBlock.addEventListener('click', (e) => {
            const target = e.target;

            // Check if clicked on a link token
            if (target.classList.contains('token-link')) {
                const linkText = target.textContent;

                // Extract URL from markdown link [text](url)
                const urlMatch = linkText.match(/\((.*?)\)/);
                if (urlMatch && urlMatch[1]) {
                    const url = urlMatch[1];

                    // Check if it's an external link (starts with http)
                    if (url.startsWith('http')) {
                        window.open(url, '_blank');
                    }
                }
            }
        });
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + P: Quick file open
    if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault();
        quickOpen();
    }

    // Cmd/Ctrl + W: Close tab
    if ((e.metaKey || e.ctrlKey) && e.key === 'w') {
        e.preventDefault();
        if (openTabs.length > 1) {
            closeTab(currentFile);
        }
    }

    // Cmd/Ctrl + B: Toggle sidebar
    if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
    }
});

// Quick open dialog
function quickOpen() {
    // Simple implementation: cycle through files
    const fileNames = Object.keys(files);
    const currentIndex = fileNames.indexOf(currentFile);
    const nextIndex = (currentIndex + 1) % fileNames.length;
    openFile(fileNames[nextIndex]);
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Track cursor position
let cursorLine = 1;
let cursorCol = 1;

document.addEventListener('click', (e) => {
    const codeElement = e.target.closest('.code-pre');
    if (codeElement) {
        // Update cursor position in status bar
        const positionItem = document.querySelector('.status-right .status-item:nth-child(3)');
        if (positionItem) {
            // Simple implementation - just show line 1
            positionItem.textContent = `Ln 1, Col 1`;
        }
    }
});

// Folder expand/collapse
document.querySelectorAll('.folder-header').forEach(header => {
    header.addEventListener('click', () => {
        const folder = header.closest('.folder');
        folder.classList.toggle('expanded');

        const icon = header.querySelector('.folder-icon');
        if (folder.classList.contains('expanded')) {
            icon.textContent = '▼';
        } else {
            icon.textContent = '▶';
        }
    });
});

// Welcome message in console
console.log('%c Welcome to Rahman Bazarov\'s Portfolio! ', 'background: #094771; color: #fff; font-size: 16px; padding: 10px;');
console.log('%c Built with ❤️ using HTML, CSS, and JavaScript ', 'color: #569cd6; font-size: 12px;');
console.log('%c Check out the files to learn more about me! ', 'color: #6a9955; font-size: 12px;');

// Easter egg: Type a secret command
let secretCode = '';
const secret = 'dev';

document.addEventListener('keypress', (e) => {
    secretCode += e.key;
    secretCode = secretCode.slice(-secret.length);

    if (secretCode === secret) {
        showDevMessage();
        secretCode = '';
    }
});

function showDevMessage() {
    console.clear();
    console.log('%c🚀 Developer Mode Activated! ', 'background: #4ec9b0; color: #000; font-size: 20px; padding: 10px; font-weight: bold;');
    console.log('%cYou found the secret! Thanks for checking out the console.', 'color: #dcdcaa; font-size: 14px;');
    console.log('%cFeel free to reach out:', 'color: #569cd6; font-size: 12px;');
    console.log('%c📧 rahmanbazarov4567@gmail.com', 'color: #ce9178; font-size: 12px;');
    console.log('%c💻 github.com/JustRahman', 'color: #ce9178; font-size: 12px;');
}

// Initialize on load
window.addEventListener('load', init);
