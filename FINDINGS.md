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
- Aucun service d’hébergement créé ni déploiement effectué. Le dossier initialement vide dispose désormais d’un dépôt Git ; les étapes précédentes figurent dans son historique.

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

### Commit de l’étape 4

- Commit demandé par l’utilisateur : choix des onze astres, gravités, palettes et dessins SVG, adaptation du temps pour l’étoile à neutrons et documentation.
- Historique constaté avant commit : `c08c3ad` (mesure automatique et synchronisation), après `01ea6a0` (version initiale).
- Contrôle des espaces du diff réussi ; vérifications numériques de l’étape 4 déjà réussies. Aucun déploiement ni push demandé.

### Étape 4 : choix de l’astre

- Sélecteur de lieu : les huit planètes, la Lune, le Soleil et une étoile à neutrons (11 choix). Terre par défaut.
- `bodies.js` centralise noms, gravités, couleurs et textes pédagogiques. Gravités arrondies NASA/JPL, Lune et Soleil des fiches NASA ; Terre conservée à 9,81 m/s². Sources consultées en ligne et liées dans l’app et le README.
- Gravité illustrative de l’étoile à neutrons : 10¹² m/s², cohérente avec l’ordre de grandeur présenté par la NASA. Pas d’étoile précise ni de correction relativiste.
- Palette adaptée (fond, scène, boutons, éléments du pendule, accents) ; dessin SVG en regard du titre, avec nom et texte alternatif. Onze dessins vectoriels locaux dans `astres.svg`, sélectionnés par fragment ; aucune image générée, téléchargée ou lue.
- Changer d’astre remet mouvement, chrono et comptage à zéro, en conservant les paramètres et les cases à cocher.
- Intégration : pas choisi à chaque remise à zéro, min(1/240 s, 0,02/√(g/L)), pour maintenir la stabilité aux fortes gravités.
- Étoile à neutrons au ralenti × 1 000 000, annoncé explicitement ; chrono et période en microsecondes physiques. Même échelle de temps pour le mouvement, le chrono, les pauses et l’arrêt automatique. Autres astres en temps réel.
- Aide contextuelle sur les expériences imaginaires pour les géantes et étoiles, et sur les limites du modèle classique.
- Publication GitHub Pages : inclure aussi `bodies.js` et `astres.svg` ; README mis à jour.
- Syntaxe des deux fichiers JavaScript validée. XML du SVG valide, 11 fragments présents.
- 33 mesures automatiques du code réel avec DOM simulé (11 astres × 3 couples angle/longueur) comparées à une période non linéaire de référence calculée indépendamment par quadrature : erreur relative inférieure à 0,1 %. Changement d’astre, palette/source du dessin, microsecondes, pause/reprise et arrêt avec/sans synchronisation vérifiés.
- Aucun navigateur, conteneur ni lecture d’image utilisé. Affichage réel des SVG, palettes et mise en page mobile à tester par l’utilisateur.

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
