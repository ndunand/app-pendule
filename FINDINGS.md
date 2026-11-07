# État du projet

## Demande et cadre

- Web app en français pour étudier le pendule simple, destinée à un élève de 9e HARMOS, filière prégymnasiale du PER.
- Affichage du pendule, curseurs de masse, longueur et angle initial ; commandes de démarrage, pause et remise à zéro ; chronomètre ; menu extensible.
- Compatible smartphone et déploiement facile sur github.io.
- Travail par étapes : l’utilisateur teste et oriente la suite avant de poursuivre ou de committer.
- Opérations coûteuses (lecture d’images, navigateur automatisé, conteneurs) soumises à accord préalable.

## Investigation

- Dossier initial vide, aucun dépôt Git existant.
- Choix : HTML/CSS/JavaScript statiques sans dépendances ni compilation, chemins relatifs pour GitHub Pages.
- Aucun service d’hébergement créé ; aucun déploiement ni commit effectué.

## Étape 1 : implémentation

- Interface responsive, scène SVG, paramètres accessibles au clavier.
- Masse de 50 à 1 000 g, longueur de 0,20 à 2 m, angle de 5 à 70°.
- Modèle sans frottement : équation non linéaire du pendule avec Runge–Kutta 4 à pas fixe de 1/240 s. La masse modifie l’apparence de la boule et n’influence pas la période.
- Chronomètre indépendant avec démarrage, arrêt, reprise et remise à zéro.
- Calcul temps / nombre d’oscillations pour estimer la période, nombre choisi par l’élève (10 par défaut).
- Modifier un paramètre ou réinitialiser le pendule remet aussi le chrono à zéro. Mettre seulement le pendule en pause ne suspend pas le chrono.
- Masquer la page suspend le mouvement et le chrono pour garder les mesures cohérentes.
- Menu préparé pour de futures expériences ; conseils d’expérimentation et explication du modèle.
- README avec procédure de publication sur GitHub Pages.

## Vérification et suite

### Étape 3 : mesure automatique optionnelle

- Demande confirmée : choisir un nombre d’oscillations et arrêter automatiquement le chrono, avec possibilité de laisser tourner le pendule sans mesure automatique.
- Case « Mesurer automatiquement les oscillations », désactivée par défaut. Cible entière de 1 à 100 (10 par défaut), progression visible et indication de fin.
- Comptage par tours de phase de la simulation, indépendant du point de départ : un aller-retour complet vaut une oscillation. Interpolation dans le dernier pas pour arrêter le chrono à l’instant de fin.
- L’arrêt automatique suspend aussi le pendule si la synchronisation est cochée ; sinon le pendule continue.
- Période affichée à la fin de la mesure automatique. Le mode manuel conserve le calcul existant ; sans démarrer le chrono, le pendule peut tourner sans mesure.
- Changer le mode ou la cible automatique réinitialise l’expérience. Une mesure terminée peut être suivie d’une nouvelle mesure, avec chrono et comptage remis à zéro.
- Contrôles avec DOM simulé réussis : mouvement libre, arrêt à la cible, synchronisation activée/désactivée, démarrage au milieu d’une oscillation, pause/reprise, nouvelle mesure, désactivation du mode et cible invalide. Syntaxe JavaScript validée ; aucun test de navigateur effectué.

### Étape 2 : synchronisation optionnelle

- Ajout d’une case à cocher dans le panneau du chronomètre, désactivée par défaut.
- Si elle est cochée, démarrage, pause et reprise depuis l’un ou l’autre panneau pilotent le pendule et le chrono avec le même instant de référence.
- L’activation aligne immédiatement le chrono sur l’état du pendule sans effacer le temps mesuré ; la désactivation conserve les états courants et rend les commandes indépendantes.
- En mode synchronisé, la remise à zéro du chrono réinitialise également le pendule.
- La pause intègre aussi le temps écoulé depuis la dernière image pour aligner mouvement et chrono.
- Syntaxe JavaScript validée. Contrôles avec DOM simulé réussis : mode indépendant, activation à l’arrêt et en mouvement, démarrage/pause/reprise depuis les deux panneaux, conservation du temps, remise à zéro commune, onglet masqué et désactivation de l’option. Aucun navigateur lancé.

- Vérification `node --check app.js` réussie.
- Contrôle du code réel avec DOM simulé : identifiants HTML référencés présents, chronomètre de 20 s / 10 oscillations = 2,00 s, remise à zéro réussie.
- Modèle vérifié à L = 1 m : période de 2,008 s à 5° (proche de l’approximation de 2,006 s), 2,212 s à 70° ; même période pour 200 g et 1 000 g.
- L’affichage, les interactions réelles et l’adaptation mobile ne sont pas encore vérifiés dans un navigateur.
- Aucun test de navigateur, capture ou lecture d’image sans accord de l’utilisateur.
- À faire : essai manuel par l’utilisateur sur ordinateur et smartphone, retour sur ergonomie, pédagogie et commandes.
- Les expériences supplémentaires, le déploiement effectif et les éventuels commits restent pour les étapes suivantes, selon les retours de l’utilisateur.
