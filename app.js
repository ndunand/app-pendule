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
    $('period').textContent = milliseconds > 0 && Number.isInteger(cycles) && cycles >= 1 && cycles <= 100
        ? `${number(milliseconds / 1000 / cycles, 2)} s` : '—';
}

function resetTimer() {
    timerRunning = false;
    timerElapsed = 0;
    $('timer-toggle').textContent = 'Démarrer le chrono';
    updateTimer();
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

function frame(now) {
    if (running && previousFrame !== null) {
        accumulator += (now - previousFrame) / 1000;
        while (accumulator >= step) {
            integrate(step);
            accumulator -= step;
        }
        draw();
    }
    previousFrame = now;
    if (timerRunning) updateTimer(now);
    requestAnimationFrame(frame);
}

$('start').addEventListener('click', () => {
    running = true;
    previousFrame = performance.now();
    updateButtons();
    $('pendulum').setAttribute('aria-label', 'Pendule simple en mouvement');
});
$('stop').addEventListener('click', () => {
    running = false;
    updateButtons();
    $('pendulum').setAttribute('aria-label', 'Pendule simple en pause');
});
$('reset').addEventListener('click', reset);
controls.forEach(id => $(id).addEventListener('input', reset));
$('timer-toggle').addEventListener('click', () => {
    const now = performance.now();
    if (timerRunning) {
        timerElapsed = elapsed(now);
        timerRunning = false;
    } else {
        timerStarted = now;
        timerRunning = true;
    }
    $('timer-toggle').textContent = timerRunning ? 'Arrêter le chrono' : 'Reprendre le chrono';
    updateTimer(now);
});
$('timer-reset').addEventListener('click', resetTimer);
$('cycles').addEventListener('input', () => updateTimer());
// Suspendre les deux horloges ensemble si l’onglet devient invisible.
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) { previousFrame = null; return; }
    if (running) $('stop').click();
    if (timerRunning) $('timer-toggle').click();
    previousFrame = null;
});
reset();
requestAnimationFrame(frame);
