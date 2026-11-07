# Petit labo · Le pendule simple

Application statique en français, adaptée aux smartphones, sans dépendance et sans compilation.

## Tester

Ouvrir `index.html` dans un navigateur. Tous les fichiers sont locaux ; aucune connexion Internet n’est nécessaire.

## Publier sur GitHub Pages

1. Créer un dépôt GitHub et y ajouter `index.html`, `style.css` et `app.js` à la racine.
2. Dans **Settings → Pages**, choisir **Deploy from a branch**, puis la branche contenant ces fichiers et le dossier **/ (root)**.
3. Le site sera accessible à l’adresse GitHub Pages indiquée par GitHub, généralement `https://UTILISATEUR.github.io/DEPOT/`.

Les chemins relatifs permettent l’utilisation dans un sous-dossier GitHub Pages. Aucun serveur applicatif ni clé API n’est nécessaire.

## Expérience

- Choisir la masse, la longueur et l’angle initial, puis démarrer le pendule.
- Utiliser le chronomètre indépendant pour mesurer plusieurs oscillations.
- Renseigner le nombre d’oscillations comptées : la période est le temps mesuré divisé par ce nombre.
- La pause du pendule laisse le chronomètre indépendant continuer. Réinitialiser le pendule ou modifier un paramètre remet aussi le chronomètre à zéro.
- Passer à un autre onglet ou masquer la page suspend le pendule et le chronomètre. Les reprendre avec leurs boutons.

## Modèle

Pendule idéal, fil sans masse, masse ponctuelle, gravité terrestre constante (9,81 m/s²), aucun frottement. Équation : θ″ = −(g/L) sin(θ), intégrée avec Runge–Kutta d’ordre 4 à pas fixe de 1/240 s. La masse ne change pas la période. La longueur du fil est représentée avec une échelle adaptée à l’écran.

Le menu contient la première expérience et un emplacement désactivé pour les expériences futures.
