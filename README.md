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
- Pour une mesure automatique, cocher **Mesurer automatiquement les oscillations**, puis choisir un nombre entier de 1 à 100. L’option est désactivée par défaut : on peut laisser tourner le pendule sans lancer de mesure.
- Le comptage automatique commence au démarrage du chrono et mesure des allers-retours complets, même si le pendule est déjà en mouvement. Le chrono s’arrête au nombre choisi ; la période s’affiche alors. Avec la synchronisation activée, le pendule s’arrête aussi. Sans synchronisation, il continue à osciller.
- Modifier le mode de mesure ou le nombre en mode automatique remet l’expérience au départ. Après une mesure terminée, **Nouvelle mesure** lance un nouveau comptage avec un chrono à zéro.
- L’option **Synchroniser le pendule et le chronomètre** est désactivée par défaut. Lorsqu’elle est cochée, les commandes de démarrage et de pause de chaque appareil pilotent les deux ; la remise à zéro du chrono remet aussi le pendule au départ.
- Cocher cette option aligne immédiatement le chrono sur l’état du pendule, en conservant le temps déjà mesuré. La décocher permet de reprendre les commandes indépendantes.
- Sans synchronisation, la pause du pendule laisse le chronomètre indépendant continuer. Réinitialiser le pendule ou modifier un paramètre remet aussi le chronomètre à zéro.
- Passer à un autre onglet ou masquer la page suspend le pendule et le chronomètre. Les reprendre avec leurs boutons.

## Modèle

Pendule idéal, fil sans masse, masse ponctuelle, gravité terrestre constante (9,81 m/s²), aucun frottement. Équation : θ″ = −(g/L) sin(θ), intégrée avec Runge–Kutta d’ordre 4 à pas fixe de 1/240 s. La masse ne change pas la période. La longueur du fil est représentée avec une échelle adaptée à l’écran.

Le menu contient la première expérience et un emplacement désactivé pour les expériences futures.
