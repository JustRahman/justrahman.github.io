// NASA Mission Control Portfolio
let missionStartTime = Date.now();
let logCounter = 4;

// Communications messages
const commsMessages = [
    "HOUSTON: Tracking all missions nominal",
    "CAPCOM: Skills assessment complete - all GO",
    "FLIGHT: Contact channels operational",
    "EECOM: System vitals in green zone",
    "GC: Standing by for visitor queries",
    "FAO: All projects on optimal trajectory",
    "SURGEON: Developer vitals excellent",
    "BOOSTER: Motivation levels at maximum",
    "RETRO: Ready for opportunity insertion burn",
    "TELMU: Portfolio telemetry streaming",
    "CONTROL: Mission objectives on track",
    "GUIDO: Navigation to career success confirmed"
];

// Initialize
function init() {
    // Start timers
    updateMissionTime();
    updateUTCTime();
    setInterval(updateMissionTime, 1000);
    setInterval(updateUTCTime, 1000);

    // Start vital sign monitors
    initVitalGraphs();

    // Start communications log
    setInterval(addCommsLog, 5000);

    // Animate system bars
    animateSystemBars();

    // Play welcome sound (visual effect)
    setTimeout(playBootSequence, 500);
}

// Update Mission Elapsed Time
function updateMissionTime() {
    const elapsed = Math.floor((Date.now() - missionStartTime) / 1000);
    const hours = Math.floor(elapsed / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((elapsed % 3600) / 60).toString().padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');

    const display = document.getElementById('mission-time');
    if (display) {
        display.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// Update UTC Time
function updateUTCTime() {
    const now = new Date();
    const hours = now.getUTCHours().toString().padStart(2, '0');
    const minutes = now.getUTCMinutes().toString().padStart(2, '0');
    const seconds = now.getUTCSeconds().toString().padStart(2, '0');

    const display = document.getElementById('utc-time');
    if (display) {
        display.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// Add communications log entry
function addCommsLog() {
    const log = document.getElementById('comms-log');
    if (!log) return;

    const elapsed = Math.floor((Date.now() - missionStartTime) / 1000);
    const hours = Math.floor(elapsed / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((elapsed % 3600) / 60).toString().padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;

    const randomMessage = commsMessages[Math.floor(Math.random() * commsMessages.length)];

    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `
        <span class="log-time">${timeString}</span>
        <span class="log-text">${randomMessage}</span>
    `;

    log.appendChild(entry);

    // Keep only last 10 entries
    while (log.children.length > 10) {
        log.removeChild(log.firstChild);
    }

    // Scroll to bottom
    log.scrollTop = log.scrollHeight;
}

// Animate system bars
function animateSystemBars() {
    const bars = document.querySelectorAll('.bar-fill');
    bars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Initialize vital sign graphs
function initVitalGraphs() {
    drawVitalGraph('motivation-graph', 98);
    drawVitalGraph('creativity-graph', 95);
    drawVitalGraph('skills-graph', 92);

    // Update graphs periodically
    setInterval(() => {
        drawVitalGraph('motivation-graph', 95 + Math.random() * 5);
        drawVitalGraph('creativity-graph', 92 + Math.random() * 6);
        drawVitalGraph('skills-graph', 90 + Math.random() * 5);
    }, 2000);
}

// Draw vital sign graph
function drawVitalGraph(canvasId, value) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = '#2d2d2d';
    ctx.lineWidth = 1;

    // Horizontal lines
    for (let i = 0; i <= height; i += 15) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
    }

    // Vertical lines
    for (let i = 0; i <= width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
    }

    // Generate waveform data
    const points = 40;
    const data = [];
    for (let i = 0; i < points; i++) {
        const baseValue = value / 100;
        const noise = (Math.random() - 0.5) * 0.1;
        const wave = Math.sin((i / points) * Math.PI * 4) * 0.05;
        data.push((baseValue + noise + wave) * height);
    }

    // Draw waveform
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, height - data[0]);

    for (let i = 1; i < data.length; i++) {
        const x = (i / points) * width;
        const y = height - data[i];
        ctx.lineTo(x, y);
    }

    ctx.stroke();

    // Add glow effect
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00ff00';
    ctx.stroke();
    ctx.shadowBlur = 0;
}

// Boot sequence
function playBootSequence() {
    // Flash indicator
    const indicators = document.querySelectorAll('.panel-indicator');
    let delay = 0;

    indicators.forEach(indicator => {
        setTimeout(() => {
            indicator.classList.add('active');
        }, delay);
        delay += 200;
    });

    // Flash mission status
    setTimeout(() => {
        const status = document.querySelector('.mission-status');
        if (status) {
            status.style.animation = 'blink 0.5s 3';
        }
    }, 1000);
}

// Easter egg: GO/NO-GO poll
let pollSequence = '';
const pollCode = 'goflight';

document.addEventListener('keypress', (e) => {
    pollSequence += e.key.toLowerCase();
    pollSequence = pollSequence.slice(-8);

    if (pollSequence === pollCode) {
        initiateGoNoGoPoll();
        pollSequence = '';
    }
});

function initiateGoNoGoPoll() {
    const stations = [
        'BOOSTER',
        'RETRO',
        'FIDO',
        'GUIDO',
        'SURGEON',
        'CAPCOM',
        'EECOM',
        'GNC',
        'TELMU',
        'CONTROL',
        'PROCEDURES',
        'FAO',
        'FLIGHT'
    ];

    const log = document.getElementById('comms-log');
    if (!log) return;

    log.innerHTML = '<div class="log-entry"><span class="log-time">POLL</span><span class="log-text">FLIGHT: GO/NO-GO for visitor contact</span></div>';

    let delay = 0;
    stations.forEach((station, index) => {
        setTimeout(() => {
            const entry = document.createElement('div');
            entry.className = 'log-entry';
            entry.innerHTML = `
                <span class="log-time">POLL</span>
                <span class="log-text">${station}: GO FLIGHT</span>
            `;
            log.appendChild(entry);
            log.scrollTop = log.scrollHeight;

            if (index === stations.length - 1) {
                setTimeout(() => {
                    const finalEntry = document.createElement('div');
                    finalEntry.className = 'log-entry';
                    finalEntry.innerHTML = `
                        <span class="log-time">POLL</span>
                        <span class="log-text" style="color: #ffbf00;">FLIGHT: We are GO for contact! 🚀</span>
                    `;
                    log.appendChild(finalEntry);
                    log.scrollTop = log.scrollHeight;
                }, 500);
            }
        }, delay);
        delay += 400;
    });
}

// Console Easter Egg
console.log('%c HOUSTON MISSION CONTROL ', 'background: #0d1117; color: #00ff00; font-size: 20px; padding: 10px; font-weight: bold; border: 2px solid #00ff00;');
console.log('%c Rahman Bazarov - Portfolio Operations ', 'color: #ffbf00; font-size: 14px; font-weight: bold;');
console.log('%c STATUS: ALL SYSTEMS GO ', 'color: #00ff00; font-size: 12px;');
console.log('%c Type "goflight" for GO/NO-GO poll ', 'color: #888888; font-size: 11px;');

// Add random blips to radar
function addRadarBlip() {
    const radar = document.querySelector('.radar-display');
    if (!radar) return;

    const blip = document.createElement('div');
    blip.className = 'radar-blip';
    blip.style.top = Math.random() * 80 + 10 + '%';
    blip.style.left = Math.random() * 80 + 10 + '%';
    radar.appendChild(blip);

    setTimeout(() => {
        blip.remove();
    }, 5000);
}

setInterval(addRadarBlip, 3000);

// Simulate system diagnostics
function runDiagnostics() {
    console.log('%c RUNNING SYSTEM DIAGNOSTICS... ', 'background: #ffbf00; color: #000; font-weight: bold;');
    console.log('%c ✓ Languages: OPERATIONAL ', 'color: #00ff00;');
    console.log('%c ✓ Frameworks: OPERATIONAL ', 'color: #00ff00;');
    console.log('%c ✓ Tools: OPERATIONAL ', 'color: #00ff00;');
    console.log('%c ✓ Projects: ALL MISSIONS GO ', 'color: #00ff00;');
    console.log('%c ✓ Communications: CHANNELS OPEN ', 'color: #00ff00;');
    console.log('%c ALL SYSTEMS NOMINAL - READY FOR CONTACT ', 'background: #00ff00; color: #000; font-weight: bold;');
}

// Run diagnostics after 3 seconds
setTimeout(runDiagnostics, 3000);

// Initialize on load
window.addEventListener('load', init);

// Prevent page unload confirmation (mission abort)
window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = 'Mission Control: Confirm mission abort?';
});
