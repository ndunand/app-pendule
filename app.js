'use strict';

const $ = id => document.getElementById(id);
const controls = ['mass', 'length', 'angle'];
const g = 9.81;
const step = 1 / 240;
let theta = 0;
let velocity = 0;
let running = false;
let accumulator = 0;
let previousFrame = null;
let timerRunning = false;
let timerStarted = 0;
let timerElapsed = 0;
let measuredPhase = 0;
let measurementComplete = false;
const number = (value, digits = 0) => value.toLocaleString('fr-CH', {
    minimumFractionDigits: digits, maximumFractionDigits: digits,
});

function updateButtons() {
    $('start').disabled = running;
    $('start').textContent = velocity === 0 && accumulator === 0 ? '▶ Démarrer' : '▶ Reprendre';
    $('stop').disabled = !running;
    $('status').textContent = running ? 'En mouvement' : 'À l’arrêt';
}

function draw() {
    const length = 140 + (Number($('length').value) - 0.2) / 1.8 * 170;
    const x = 300 + length * Math.sin(theta);
    const y = 64 + length * Math.cos(theta);
    const amplitude = Number($('angle').value) * Math.PI / 180;
    const dx = length * Math.sin(amplitude);
    const dy = 64 + length * Math.cos(amplitude);
    $('string').setAttribute('x2', x);
    $('string').setAttribute('y2', y);
    $('bob').setAttribute('cx', x);
    $('bob').setAttribute('cy', y);
    $('bob').setAttribute('r', 13 + Math.cbrt(Number($('mass').value) / 1000) * 13);
    $('sweep').setAttribute('d', `M ${300 - dx} ${dy} A ${length} ${length} 0 0 0 ${300 + dx} ${dy}`);
}

function elapsed(now) {
    return timerElapsed + (timerRunning ? now - timerStarted : 0);
}

function updateTimer(now = performance.now()) {
    const milliseconds = elapsed(now);
    const hundredths = Math.floor(milliseconds / 10);
    const minutes = String(Math.floor(hundredths / 6000)).padStart(2, '0');
    const seconds = String(Math.floor(hundredths / 100) % 60).padStart(2, '0');
    $('timer').textContent = `${minutes}:${seconds},${String(hundredths % 100).padStart(2, '0')}`;
    const cycles = Number($('cycles').value);
    $('period').textContent = milliseconds > 0 && (!$('auto-measure').checked || measurementComplete)
        && Number.isInteger(cycles) && cycles >= 1 && cycles <= 100
        ? `${number(milliseconds / 1000 / cycles, 2)} s` : '—';
}

function resetTimer() {
    timerRunning = false;
    timerElapsed = 0;
    measuredPhase = 0;
    measurementComplete = false;
    updateMeasurement();
    $('timer-toggle').textContent = 'Démarrer le chrono';
    updateTimer();
}

function updateMeasurement() {
    const automatic = $('auto-measure').checked;
    $('measurement-progress').hidden = !automatic;
    $('cycles-label').textContent = automatic ? 'Oscillations à mesurer' : 'Oscillations comptées';
    const count = Math.min(Number($('cycles').value) || 0, Math.floor(measuredPhase / (2 * Math.PI)));
    $('measurement-progress').textContent = measurementComplete
        ? `Mesure terminée : ${$('cycles').value} oscillations.`
        : `${count} / ${$('cycles').value || '—'} oscillations mesurées`;
    $('measurement-help').textContent = automatic
        ? 'Un aller-retour complet compte pour une oscillation. Modifier le nombre ou le mode remet l’expérience au départ.'
        : 'Lance le chrono à un point de repère. Arrête-le après le nombre d’oscillations choisi.';
}

function canStartTimer() {
    return !$('auto-measure').checked || $('cycles').reportValidity();
}

function reset() {
    running = false;
    accumulator = 0;
    theta = Number($('angle').value) * Math.PI / 180;
    velocity = 0;
    for (const id of controls) {
        $(id + '-value').textContent = id === 'mass' ? `${number(Number($(id).value))} g`
            : id === 'length' ? `${number(Number($(id).value), 2)} m` : `${$(id).value}°`;
    }
    resetTimer();
    updateButtons();
    $('status').textContent = 'Prêt';
    $('pendulum').setAttribute('aria-label', `Pendule simple à l’arrêt, angle initial ${$('angle').value} degrés`);
    draw();
}

// Runge–Kutta d’ordre 4 : le sinus conserve l’effet des grands angles.
function integrate(dt) {
    const k = g / Number($('length').value);
    const a1 = velocity, b1 = -k * Math.sin(theta);
    const a2 = velocity + b1 * dt / 2, b2 = -k * Math.sin(theta + a1 * dt / 2);
    const a3 = velocity + b2 * dt / 2, b3 = -k * Math.sin(theta + a2 * dt / 2);
    const a4 = velocity + b3 * dt, b4 = -k * Math.sin(theta + a3 * dt);
    theta += dt * (a1 + 2 * a2 + 2 * a3 + a4) / 6;
    velocity += dt * (b1 + 2 * b2 + 2 * b3 + b4) / 6;
}

// Compter des tours de phase permet de mesurer un aller-retour complet,
// même si le chrono est lancé au milieu d’une oscillation.
function advance(now) {
    if (!running || previousFrame === null) return;
    accumulator += (now - previousFrame) / 1000;
    while (running && accumulator >= step) {
        const beforeTheta = theta, beforeVelocity = velocity;
        const omega = Math.sqrt(g / Number($('length').value));
        const phaseBefore = Math.atan2(-velocity / omega, theta);
        integrate(step);
        accumulator -= step;
        if ($('auto-measure').checked && timerRunning && !measurementComplete) {
            const phaseAfter = Math.atan2(-velocity / omega, theta);
            const delta = (phaseAfter - phaseBefore + 2 * Math.PI) % (2 * Math.PI);
            const target = Number($('cycles').value) * 2 * Math.PI;
            if (measuredPhase + delta >= target) {
                const fraction = (target - measuredPhase) / delta;
                const finishedAt = now - (accumulator + step * (1 - fraction)) * 1000;
                measuredPhase = target;
                measurementComplete = true;
                setTimer(false, finishedAt);
                $('timer-toggle').textContent = 'Nouvelle mesure';
                if ($('sync-timer').checked) {
                    theta = beforeTheta;
                    velocity = beforeVelocity;
                    integrate(step * fraction);
                    accumulator = 0;
                    running = false;
                    updateButtons();
                    $('pendulum').setAttribute('aria-label', 'Pendule simple en pause');
                }
            } else {
                measuredPhase += delta;
            }
            updateMeasurement();
        }
    }
    draw();
    previousFrame = now;
}

function frame(now) {
    advance(now);
    previousFrame = now;
    if (timerRunning) updateTimer(now);
    requestAnimationFrame(frame);
}

function setMotion(active, now) {
    if (running && !active) advance(now);
    running = active;
    previousFrame = now;
    updateButtons();
    $('pendulum').setAttribute('aria-label', active ? 'Pendule simple en mouvement' : 'Pendule simple en pause');
}

function setTimer(active, now) {
    if (timerRunning === active) return;
    // Ne pas compter le mouvement antérieur au démarrage du chrono.
    if (active) {
        advance(now);
        if (measurementComplete) resetTimer();
        if ($('auto-measure').checked && timerElapsed === 0) accumulator = 0;
    }
    if (active) timerStarted = now;
    else timerElapsed = elapsed(now);
    timerRunning = active;
    $('timer-toggle').textContent = active ? 'Arrêter le chrono' : 'Reprendre le chrono';
    updateTimer(now);
}

$('start').addEventListener('click', () => {
    if ($('sync-timer').checked && !canStartTimer()) return;
    const now = performance.now();
    setMotion(true, now);
    if ($('sync-timer').checked) setTimer(true, now);
});
$('stop').addEventListener('click', () => {
    const now = performance.now();
    setMotion(false, now);
    if ($('sync-timer').checked) setTimer(false, now);
});
$('reset').addEventListener('click', reset);
controls.forEach(id => $(id).addEventListener('input', reset));
$('timer-toggle').addEventListener('click', () => {
    if (!timerRunning && !canStartTimer()) return;
    const now = performance.now();
    const active = !timerRunning;
    advance(now);
    setTimer(active, now);
    if ($('sync-timer').checked) setMotion(active, now);
});
$('timer-reset').addEventListener('click', () => {
    if ($('sync-timer').checked) reset();
    else resetTimer();
});
$('sync-timer').addEventListener('change', () => {
    // Activer la synchronisation aligne le chrono sur l’état du pendule,
    // sans effacer le temps déjà mesuré.
    if ($('sync-timer').checked) {
        if (running && !canStartTimer()) { $('sync-timer').checked = false; return; }
        setTimer(running, performance.now());
    }
});
$('auto-measure').addEventListener('change', reset);
$('cycles').addEventListener('input', () => {
    if ($('auto-measure').checked) reset();
    else updateTimer();
});
// Suspendre les deux horloges ensemble si l’onglet devient invisible.
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) { previousFrame = null; return; }
    if (running) $('stop').click();
    if (timerRunning) $('timer-toggle').click();
    previousFrame = null;
});
reset();
requestAnimationFrame(frame);
