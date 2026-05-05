# FitTrack

Carnet de salle web installable comme PWA. Suivi des séances de musculation, progression des charges, records personnels, calendrier d'assiduité, chronomètre de repos.

**Demo live** : https://wcd-aymane.github.io/FITRACK/

## Stack

Prototype 100 % statique (HTML + CSS + vanilla JS), stockage local via `localStorage`. Aucune dépendance build, aucun backend. Lucide chargé depuis CDN unpkg pour les icônes, react-native-body-highlighter (paths SVG) pour la heatmap musculaire.

## Installation sur iPhone / Android

Voir [INSTALL.md](./INSTALL.md). En résumé : ouvre l'URL ci-dessus dans Safari (iOS) ou Chrome (Android), puis "Ajouter à l'écran d'accueil". L'app fonctionne hors-ligne après le premier lancement grâce au service worker.

## Fonctionnalités

- Démarrage rapide d'une séance avec suggestion intelligente (Push / Pull / Jambes / Cardio / Personnalisé) ou reprise d'une séance précédente
- Bibliothèque d'exercices par groupe musculaire (~100 exos)
- Saisie ultra-rapide des séries via pavé numérique optimisé
- Détection automatique des records personnels (formule Epley)
- Édition rétroactive d'une série déjà saisie
- Calendrier mensuel coloré par type de séance
- Statistiques hebdo : volume, force moyenne, durée, records, avec tendance vs semaine précédente
- Streak et niveau de progression sur le profil
- Chronomètre de repos avec notification sonore
- Mode standalone iOS avec safe-areas

## Structure

- `index.html` : application principale
- `manifest.json` : déclaration PWA
- `sw.js` : service worker (cache-first)
- `icon-*.png` : icônes diverses tailles

## Confidentialité

Aucune donnée n'est envoyée vers un serveur. Toutes les séances sont stockées localement dans le `localStorage` du navigateur.
