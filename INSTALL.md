# FitTrack — Guide d'installation

Ton prototype est devenu une PWA installable. Pour l'utiliser sur ton iPhone comme une vraie app, deux étapes : (1) héberger les fichiers en ligne sur une URL HTTPS, (2) ajouter à l'écran d'accueil depuis Safari.

## 1. Hébergement gratuit (GitHub Pages — recommandé, 5 min)

GitHub Pages publie un dossier statique sur une URL HTTPS sans aucun coût. C'est l'option la plus simple, et obligatoire car les PWA exigent HTTPS pour s'installer.

1. Crée un compte sur [github.com](https://github.com) (gratuit).
2. Crée un nouveau repo public, par exemple `fittrack`. Décoche "Initialize with README".
3. Sur la page du repo vide, clique "uploading an existing file". Glisse-dépose ces 7 fichiers depuis ton dossier `APP FITNESS` :
   - `03_PROTOTYPE.html`
   - `manifest.json`
   - `sw.js`
   - `icon-180.png`
   - `icon-192.png`
   - `icon-512.png`
4. Renomme `03_PROTOTYPE.html` en `index.html` directement dans GitHub (clique sur le fichier → icône crayon "Edit" → en haut, change le nom). Ça permet à l'URL d'être propre.
5. Onglet **Settings** → menu de gauche **Pages** → sous "Branch" choisis `main`, dossier `/ (root)`, clique **Save**.
6. Au bout de 1-2 min, GitHub affiche : **"Your site is live at `https://TON-USERNAME.github.io/fittrack/`"**.

Ouvre cette URL sur ton iPhone dans Safari, c'est prêt.

### Alternatives à GitHub Pages

- **Netlify Drop** ([app.netlify.com/drop](https://app.netlify.com/drop)) : tu glisses ton dossier, ça te donne une URL HTTPS instantanément, sans compte. Pour des changements ultérieurs il faudra créer un compte gratuit.
- **Cloudflare Pages**, **Vercel** : autres alternatives gratuites, plus complètes mais aussi plus complexes.

## 2. Installer sur iPhone

1. Ouvre l'URL sur Safari (pas Chrome — Chrome iOS ne supporte pas l'install).
2. Tape sur le bouton **Partager** (carré avec flèche vers le haut, en bas de Safari).
3. Fais défiler les options et tape **Sur l'écran d'accueil**.
4. Confirme avec **Ajouter** en haut à droite.

L'icône violette FitTrack apparaît sur ton écran d'accueil. Tape dessus → l'app s'ouvre en plein écran, sans barre Safari, exactement comme une app native. Les données sont stockées en local sur ton téléphone, jamais envoyées en ligne.

## 3. Installer sur Android

1. Ouvre l'URL dans Chrome.
2. Une bannière "Ajouter FitTrack à l'écran d'accueil" apparaît automatiquement, ou bien menu ⋮ → **Installer l'application**.
3. Confirme.

## Mise à jour de l'app

Si tu modifies les fichiers (ajout d'une feature par exemple), réuploade-les sur GitHub. Le service worker détecte la nouvelle version automatiquement au prochain lancement de l'app, et la prend en compte dans les ~10 secondes. Tu peux forcer la mise à jour en fermant complètement l'app et en la rouvrant.

## Données et confidentialité

Toutes tes séances sont stockées dans le `localStorage` de ton iPhone. Rien n'est envoyé sur GitHub, sur Anthropic, ni nulle part. Si tu désinstalles l'app de l'écran d'accueil ou si tu changes de téléphone, **tu perdras tes données** (à moins d'avoir exporté un backup JSON — feature à ajouter ultérieurement).

## Mode hors-ligne

Le service worker met en cache toute l'app au premier lancement. Tu peux donc l'utiliser en salle même sans réseau, l'app continue de fonctionner et tes saisies sont sauvegardées localement.

## Coûts

- GitHub : gratuit, illimité pour les repos publics.
- Bande passante GitHub Pages : 100 GB/mois gratuits, largement suffisant pour un usage perso.
- Pas de compte développeur Apple, pas de Play Store, pas de Supabase. Total : **0 €**.

## Si quelque chose ne marche pas

- L'install ne se déclenche pas → vérifie que tu es bien sur Safari (iOS) ou Chrome (Android), pas un autre navigateur.
- L'app ne s'affiche pas en plein écran après install → Settings iOS → Safari → vide le cache, retry.
- Service worker pas chargé → ouvre la console (Safari Mac → Inspect web view) et vérifie qu'il n'y a pas d'erreur de chargement de `sw.js`. Le SW exige HTTPS, ne fonctionnera pas sur `file://` ni `http://localhost` (sauf cas spéciaux).
