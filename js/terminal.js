// Terminal Portfolio - Interactive CLI
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');
let commandHistory = [];
let historyIndex = -1;

// Portfolio data
const portfolio = {
    name: "Rahman Bazarov",
    title: "Computer Science Student & Developer",
    university: "Arizona State University",
    email: "rahmanbazarov4567@gmail.com",
    phone: "+1 (480) 465-7171",
    github: "https://github.com/JustRahman",
    instagram: "https://www.instagram.com/bazarov_rahman",

    about: [
        "Computer Science student at Arizona State University with experience in",
        "full-stack development and a growing interest in machine learning.",
        "",
        "I specialize in Python, JavaScript, and C#, with hands-on experience",
        "building web applications and APIs."
    ],

    skills: {
        "Languages": ["Python", "JavaScript", "C#", "SQL"],
        "Frameworks": ["Next.js", "FastAPI", "Flask", "React"],
        "Tools": ["Git", "Docker", "PostgreSQL", "AWS"],
        "Interests": ["Machine Learning", "Web Development", "SaaS"]
    },

    projects: [
        {
            name: "LexFlow",
            description: "Micro-SaaS platform streamlining client intake and e-signing for solo attorneys and small law firms",
            tech: ["Next.js", "FastAPI", "PostgreSQL", "Stripe", "Docker"],
            link: "https://github.com/JustRahman/LexFlow"
        },
        {
            name: "OrderEasy",
            description: "Platform supporting elderly and disabled individuals with online shopping for essentials",
            tech: ["Full-Stack Development"],
            link: "https://github.com/JustRahman/OrderEase"
        },
        {
            name: "BeletFilm",
            description: "C# (WPF) streaming platform for national movies and TV shows",
            tech: ["C#", "WPF"],
            link: "https://github.com/JustRahman/BeletFilm"
        },
        {
            name: "FMS Improvement Game",
            description: "Interactive game helping toddlers develop fine motor skills",
            tech: ["Game Development"],
            link: null
        }
    ]
};

// ASCII Art Banner
const banner = `
    ____        __                          ____
   / __ \\____ _/ /_  ____ ___  ____ _____  / __ )____ _____  ____ __________  __
  / /_/ / __ \`/ __ \\/ __ \`__ \\/ __ \`/ __ \\/ __  / __ \`/_  / / __ \`/ ___/ __ \\| | / /
 / _, _/ /_/ / / / / / / / / / /_/ / / / / /_/ / /_/ / / /_/ /_/ / /  / /_/ /| |/ /
/_/ |_|\\__,_/_/ /_/_/ /_/ /_/\\__,_/_/ /_/_____/\\__,_/ /___/\\__,_/_/   \\____/ |___/

`;

// Available commands
const commands = {
    help: {
        description: "Show all available commands",
        execute: () => {
            let output = '<div class="section-title">Available Commands:</div>';
            for (const [cmd, info] of Object.entries(commands)) {
                output += `<div class="help-command">`;
                output += `  <span class="help-command-name">${cmd}</span>`;
                output += `  <span class="help-command-desc">${info.description}</span>`;
                output += `</div>`;
            }
            return output;
        }
    },

    about: {
        description: "Learn more about me",
        execute: () => {
            let output = `<div class="section-title">${portfolio.name}</div>`;
            output += `<div>${portfolio.title}</div>`;
            output += `<div>${portfolio.university}</div><br>`;
            portfolio.about.forEach(line => {
                output += `<div>${line}</div>`;
            });
            return output;
        }
    },

    skills: {
        description: "View my technical skills",
        execute: () => {
            let output = '<div class="section-title">Technical Skills:</div>';
            for (const [category, items] of Object.entries(portfolio.skills)) {
                output += `<div class="skill-item">`;
                output += `  <span class="skill-name">${category}:</span> ${items.join(', ')}`;
                output += `</div>`;
            }
            return output;
        }
    },

    projects: {
        description: "View my featured projects",
        execute: () => {
            let output = '<div class="section-title">Featured Projects:</div>';
            portfolio.projects.forEach((project, index) => {
                output += `<div class="project-item">`;
                output += `  <span class="project-title">${index + 1}. ${project.name}</span>`;
                if (project.link) {
                    output += ` - <a href="${project.link}" target="_blank">${project.link}</a>`;
                }
                output += `</div>`;
                output += `<div class="project-description">${project.description}</div>`;
                output += `<div class="tech-tags">Tech: ${project.tech.join(', ')}</div>`;
            });
            return output;
        }
    },

    contact: {
        description: "Get my contact information",
        execute: () => {
            let output = '<div class="section-title">Contact Information:</div>';
            output += `<div>Email: <a href="mailto:${portfolio.email}">${portfolio.email}</a></div>`;
            output += `<div>Phone: <a href="tel:${portfolio.phone}">${portfolio.phone}</a></div>`;
            output += `<div>GitHub: <a href="${portfolio.github}" target="_blank">${portfolio.github}</a></div>`;
            output += `<div>Instagram: <a href="${portfolio.instagram}" target="_blank">${portfolio.instagram}</a></div>`;
            return output;
        }
    },

    banner: {
        description: "Display the banner",
        execute: () => {
            return `<div class="ascii-art">${banner}</div>`;
        }
    },

    clear: {
        description: "Clear the terminal",
        execute: () => {
            terminalOutput.innerHTML = '';
            return null;
        }
    },

    ls: {
        description: "List available sections",
        execute: () => {
            return '<div>about/  skills/  projects/  contact/</div>';
        }
    },

    whoami: {
        description: "Display current user",
        execute: () => {
            return `<div>visitor@rahman</div>`;
        }
    },

    date: {
        description: "Display current date and time",
        execute: () => {
            return `<div>${new Date().toString()}</div>`;
        }
    },

    echo: {
        description: "Echo a message",
        execute: (args) => {
            return `<div>${args.join(' ')}</div>`;
        }
    }
};

// Initialize terminal
function init() {
    // Display welcome message
    addOutput(`<div class="ascii-art">${banner}</div>`);
    addOutput(`<div>Welcome to Rahman Bazarov's Portfolio Terminal</div>`);
    addOutput(`<div>Type 'help' to see available commands</div>`);
    addOutput(`<div>---</div><br>`);

    // Focus input
    terminalInput.focus();
}

// Add output to terminal
function addOutput(content, isCommand = false) {
    if (content === null) return;

    const line = document.createElement('div');
    line.className = isCommand ? 'output-line command' : 'output-line';
    line.innerHTML = content;
    terminalOutput.appendChild(line);

    // Scroll to bottom
    terminalOutput.parentElement.scrollTop = terminalOutput.parentElement.scrollHeight;
}

// Process command
function processCommand(input) {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Add to history
    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    // Display command
    addOutput(trimmed, true);

    // Parse command and arguments
    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Execute command
    if (commands[cmd]) {
        const result = commands[cmd].execute(args);
        if (result) {
            addOutput(result);
        }
    } else {
        addOutput(`<div class="error">Command not found: ${cmd}</div>`);
        addOutput(`<div class="error">Type 'help' for available commands</div>`);
    }

    addOutput('<br>');
}

// Handle input
terminalInput.addEventListener('keydown', (e) => {
    // Enter key
    if (e.key === 'Enter') {
        const command = terminalInput.value;
        processCommand(command);
        terminalInput.value = '';
    }

    // Up arrow - previous command
    else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        }
    }

    // Down arrow - next command
    else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            terminalInput.value = '';
        }
    }

    // Tab - autocomplete
    else if (e.key === 'Tab') {
        e.preventDefault();
        const partial = terminalInput.value.toLowerCase();
        if (partial) {
            const matches = Object.keys(commands).filter(cmd => cmd.startsWith(partial));
            if (matches.length === 1) {
                terminalInput.value = matches[0];
            } else if (matches.length > 1) {
                addOutput(`<div>${matches.join('  ')}</div>`);
                addOutput('<br>');
            }
        }
    }
});

// Keep focus on input
document.addEventListener('click', () => {
    terminalInput.focus();
});

// Prevent losing focus
terminalInput.addEventListener('blur', () => {
    setTimeout(() => terminalInput.focus(), 0);
});

// Initialize on load
window.addEventListener('load', init);
