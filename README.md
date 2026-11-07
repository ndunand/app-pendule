# Petit labo · Le pendule simple

Application statique en français, adaptée aux smartphones, sans compilation. La simulation fonctionne hors ligne ; seul le générateur du QR-code est chargé à la demande depuis un CDN.

## Tester

Ouvrir `index.html` dans un navigateur. Tous les fichiers sont locaux ; aucune connexion Internet n’est nécessaire.

## Publier sur GitHub Pages

1. Créer un dépôt GitHub et y ajouter `index.html`, `style.css`, `bodies.js`, `app.js`, `share-qr.js` et `astres.svg` à la racine.
2. Dans **Settings → Pages**, choisir **Deploy from a branch**, puis la branche contenant ces fichiers et le dossier **/ (root)**.
3. Le site sera accessible à l’adresse GitHub Pages indiquée par GitHub, généralement `https://UTILISATEUR.github.io/DEPOT/`.

Les chemins relatifs permettent l’utilisation dans un sous-dossier GitHub Pages. Aucun serveur applicatif ni clé API n’est nécessaire.

## QR-code de partage

Près de « Petit labo », le QR-code est généré dans le navigateur à partir de l’adresse HTTP(S) de la page ouverte, sans nom de domaine ni chemin de site codés en dur. Les paramètres et le fragment sont retirés pour partager la page. Le code est aussi un lien cliquable.

La bibliothèque [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator/tree/master/js), version 1.4.4, est chargée depuis jsDelivr. L’adresse à encoder n’est pas envoyée à un service de génération de QR-code. Si le CDN est inaccessible, un simple lien reste disponible et la simulation continue de fonctionner. En ouvrant directement le fichier HTML (`file:`), aucun QR-code n’est proposé ; il faut héberger la page. Un téléphone doit pouvoir accéder à l’adresse encodée : une adresse `localhost` reste locale à chaque appareil.

## Expérience

- Choisir l’astre : Terre, Lune, Mercure, Vénus, Mars, Jupiter, Saturne, Uranus, Neptune, Soleil ou étoile à neutrons. La gravité, la palette et le dessin près du titre s’adaptent. Le changement remet l’expérience au départ en conservant les paramètres et les options.
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

Pendule idéal, fil sans masse, masse ponctuelle, gravité constante pour l’astre choisi, aucun frottement. Équation : θ″ = −(g/L) sin(θ), intégrée avec Runge–Kutta d’ordre 4. Le pas, fixé au début de chaque expérience, est le minimum entre 1/240 s et 0,02/√(g/L) pour conserver la précision aux fortes gravités. La masse ne change pas la période. La longueur du fil est représentée avec une échelle adaptée à l’écran.

L’étoile à neutrons utilise une gravité illustrative de 10¹² m/s². Son animation est ralentie d’un facteur 1 000 000 : une seconde réelle correspond à une microseconde simulée. Le chrono et la période affichent des microsecondes de l’expérience ; le comptage automatique utilise la même échelle. Les autres astres sont simulés en temps réel.

Les cas des géantes gazeuses, du Soleil et de l’étoile à neutrons servent de comparaisons imaginaires : le modèle ne représente pas une installation réalisable et ne tient pas compte des effets relativistes. Les dessins SVG sont schématiques et sans échelle commune.

### Sources

- [NASA/JPL : paramètres physiques des planètes](https://ssd.jpl.nasa.gov/planets/phys_par.html) ; valeur terrestre usuelle conservée à 9,81 m/s².
- [NASA : Lune](https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html).
- [NASA : Soleil](https://nssdc.gsfc.nasa.gov/planetary/factsheet/sunfact.html).
- [NASA : introduction aux étoiles à neutrons](https://asd.gsfc.nasa.gov/Tod.Strohmayer/ns_intro.html), pour l’ordre de grandeur de la gravité.

Le menu contient la première expérience et un emplacement désactivé pour les expériences futures.
