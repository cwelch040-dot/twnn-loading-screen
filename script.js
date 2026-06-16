const features = [
    "Unlockable Models",
    "Custom Shop Rewards",
    "Prestige Ranks",
    "XP Events",
    "Level Progression"
];
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

const events = [
    "Custom XP Active",
    "Prestige System Online",
    "Unlockable Models",
    "Shop Rewards Enabled",
    "TTT2 Events Ready"
];

const tipText = document.getElementById("tipText");
const statusText = document.getElementById("statusText");
const progressBar = document.getElementById("progressBar");
const percentText = document.getElementById("percentText");
const particles = document.getElementById("particles");

const mapName = document.getElementById("mapName");
const gameMode = document.getElementById("gameMode");
const serverFeature = document.getElementById("serverFeature");
const playerCount = document.getElementById("playerCount");

let tipIndex = 0;
let statusIndex = 0;
let eventIndex = 0;
let fakeProgress = 0;
let dots = 0;
let featureIndex = 0;

function rotateFeatures() {
    featureIndex = (featureIndex + 1) % features.length;
    serverFeature.textContent = features[featureIndex];
}

function rotateTips() {
    tipIndex = (tipIndex + 1) % tips.length;
    tipText.style.opacity = "0";

    setTimeout(() => {
        tipText.textContent = tips[tipIndex];
        tipText.style.opacity = "1";
    }, 250);
}

function rotateEvents() {
    eventIndex = (eventIndex + 1) % events.length;
    serverEvent.textContent = events[eventIndex];
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

function readUrlData() {
    const params = new URLSearchParams(window.location.search);
    const map = params.get("map");

    if (map && mapName) {
        mapName.textContent = map;
    }
}

window.GameDetails = function(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
    if (mapname && mapName) {
        mapName.textContent = mapname;
        statuses[3] = "LOADING " + mapname.toUpperCase();
    }

    if (gamemode && gameMode) {
        gameMode.textContent = gamemode.toUpperCase();
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

window.DownloadingFile = function(fileName) {
    if (fileName) {
        statusText.textContent = "DOWNLOADING " + fileName.toUpperCase();
    }
};

readUrlData();
createParticles();

setInterval(rotateTips, 5200);
setInterval(rotateEvents, 4200);
setInterval(animateStatus, 650);
setInterval(animateProgress, 850);
setInterval(rotateFeatures, 5000);
