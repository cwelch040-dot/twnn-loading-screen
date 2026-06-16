const tips = [
    "Earn XP from kills, wins, body IDs and server events.",
    "Prestige after reaching max level to show off your grind.",
    "XP events can boost every reward source on the server.",
    "Detectives earn bonus XP for identifying bodies.",
    "Use !level in chat to check your current progress.",
    "Join the Discord for updates, events and announcements."
];

const statuses = [
    "CONNECTING TO SERVER",
    "DOWNLOADING CONTENT",
    "SYNCING PLAYER DATA",
    "LOADING TTT2 SYSTEMS",
    "PREPARING ROUND"
];

const tipText = document.getElementById("tipText");
const statusText = document.getElementById("statusText");
const progressBar = document.getElementById("progressBar");
const percentText = document.getElementById("percentText");
const particles = document.getElementById("particles");

let tipIndex = 0;
let statusIndex = 0;
let fakeProgress = 0;
let dots = 0;

function rotateTips() {
    tipIndex = (tipIndex + 1) % tips.length;
    tipText.style.opacity = "0";
    setTimeout(() => {
        tipText.textContent = tips[tipIndex];
        tipText.style.opacity = "1";
    }, 250);
}

function animateStatus() {
    dots = (dots + 1) % 4;
    statusText.textContent = statuses[statusIndex] + ".".repeat(dots);

    if (dots === 0) {
        statusIndex = (statusIndex + 1) % statuses.length;
    }
}

function animateProgress() {
    if (fakeProgress < 92) {
        fakeProgress += Math.random() * 4.5;
    } else {
        fakeProgress += Math.random() * 0.35;
    }

    fakeProgress = Math.min(fakeProgress, 99);
    progressBar.style.width = fakeProgress.toFixed(0) + "%";
    percentText.textContent = fakeProgress.toFixed(0) + "%";
}

function createParticles() {
    for (let i = 0; i < 42; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.style.left = Math.random() * 100 + "vw";
        p.style.animationDuration = (7 + Math.random() * 10) + "s";
        p.style.animationDelay = (-Math.random() * 12) + "s";
        p.style.opacity = (0.25 + Math.random() * 0.75).toString();
        p.style.width = p.style.height = (3 + Math.random() * 5) + "px";
        particles.appendChild(p);
    }
}

// Garry's Mod loading screen callbacks. These are called automatically by GMod when available.
window.GameDetails = function(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
    if (mapname) {
        statuses[3] = "LOADING " + mapname.toUpperCase();
    }
};

window.SetStatusChanged = function(status) {
    if (status) {
        statusText.textContent = status.toUpperCase();
    }
};

window.SetFilesTotal = function(total) {
    window.__filesTotal = Number(total) || 0;
};

window.SetFilesNeeded = function(needed) {
    const total = window.__filesTotal || 0;
    needed = Number(needed) || 0;

    if (total > 0) {
        const realProgress = Math.max(0, Math.min(100, ((total - needed) / total) * 100));
        fakeProgress = Math.max(fakeProgress, realProgress);
        progressBar.style.width = fakeProgress.toFixed(0) + "%";
        percentText.textContent = fakeProgress.toFixed(0) + "%";
    }
};

createParticles();
setInterval(rotateTips, 5200);
setInterval(animateStatus, 650);
setInterval(animateProgress, 850);
