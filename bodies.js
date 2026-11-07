'use strict';

// Valeurs arrondies : NASA/JPL ; Terre conservée à 9,81 m/s².
// L’étoile à neutrons représente un ordre de grandeur, pas un astre précis.
const celestialBodies = {
    earth: {name: 'Terre', gravity: 9.81, color: '#214f43', light: '#edf3ed', background: '#f6f7f2', accent: '#3d8269', note: 'Notre point de comparaison : la gravité terrestre.'},
    moon: {name: 'Lune', gravity: 1.62, color: '#4d5363', light: '#eceef3', background: '#f5f5f8', accent: '#69748d', note: 'Une gravité plus faible que sur Terre : le pendule oscille plus lentement.'},
    mercury: {name: 'Mercure', gravity: 3.70, color: '#605044', light: '#f1ece6', background: '#f8f5f1', accent: '#917458', note: 'Une petite planète rocheuse, avec une gravité proche de celle de Mars.'},
    venus: {name: 'Vénus', gravity: 8.87, color: '#71521e', light: '#f6edd9', background: '#faf7ee', accent: '#aa772a', note: 'Une gravité légèrement plus faible que sur Terre.'},
    mars: {name: 'Mars', gravity: 3.71, color: '#853e30', light: '#f8e9e1', background: '#fcf5ef', accent: '#b85c3d', note: 'Sur la planète rouge, le même pendule oscille plus lentement que sur Terre.'},
    jupiter: {name: 'Jupiter', gravity: 24.79, color: '#78503c', light: '#f3e8de', background: '#faf5ef', accent: '#a86943', note: 'Géante gazeuse : gravité de référence dans les couches supérieures, sans sol solide pour installer un pendule.'},
    saturn: {name: 'Saturne', gravity: 10.44, color: '#6b582d', light: '#f2eddc', background: '#faf8ef', accent: '#998044', note: 'Géante gazeuse : expérience imaginaire, avec une gravité de référence proche de celle de la Terre.'},
    uranus: {name: 'Uranus', gravity: 8.87, color: '#246474', light: '#e3f2f3', background: '#f0f8f8', accent: '#338794', note: 'Géante de glaces : expérience imaginaire avec une gravité de référence légèrement inférieure à celle de la Terre.'},
    neptune: {name: 'Neptune', gravity: 11.15, color: '#304b92', light: '#e8edfb', background: '#f3f5fc', accent: '#4d6cbc', note: 'Géante de glaces : expérience imaginaire avec une gravité de référence supérieure à celle de la Terre.'},
    sun: {name: 'Soleil', gravity: 274, color: '#874514', light: '#fff0d6', background: '#fff9ed', accent: '#bf6e16', note: 'Le Soleil est une étoile. Cette expérience imaginaire utilise la gravité à sa surface ; le pendule y serait beaucoup plus rapide.'},
    neutron: {name: 'Étoile à neutrons', gravity: 1e12, timeScale: 1e-6, color: '#57458b', light: '#eee9fb', background: '#f6f3fc', accent: '#8060bd', note: 'Gravité illustrative : 10¹² m/s². Modèle classique simplifié, sans effets relativistes. Ralenti × 1 000 000 : 1 seconde à l’écran représente 1 microseconde dans l’expérience.'},
};
