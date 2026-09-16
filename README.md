# Island Mada Travel

Site React pour un guide local dans le nord de Madagascar : Diégo-Suarez et Nosy Be. Sept pages principales, cinq langues, thèmes clair et sombre.

## Démarrer

```sh
npm install
npm run dev
```

Le serveur Vite utilise le port 5173. Pour consulter la version de production :

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

## Architecture

- `src/index.css` : variables des deux thèmes, composants visuels et règles responsive.
- `tailwind.config.js` : palette partagée et typographie.
- `src/components/Hero.jsx` : en-tête photographique, contrôles manuels, pause et préférence de mouvement réduit.
- `src/components/PlacesGrid.jsx` : grille des lieux et détails insérés après la rangée sélectionnée.
- `src/components/ResponsiveImage.jsx` : sélection des variantes d’image selon la largeur d’affichage.
- `src/context` : préférences de langue et de thème, avec stockage local facultatif.
- `src/locales` : français, anglais, allemand, italien et espagnol ; repli sur le français si une clé manque.
- `src/data` : contenus des lieux et métadonnées des images.

La taille racine reste à 16 px. Les titres, espacements et largeurs de contenu évoluent progressivement. La navigation compacte est utilisée sous 1180 px. La grille des lieux passe de 1 à 4 colonnes aux seuils 480, 768 et 1180 px.

## Images

Les originaux sont conservés dans `src/images`. Les versions WebP sont dans `src/images/optimized`, avec des variantes pour les petits écrans et le manifeste `src/data/imageManifest.json`.

Pour régénérer les images après ajout ou remplacement d’originaux, utiliser Python avec Pillow :

```sh
python scripts/optimize-images.py
```

Les versions principales sont limitées à 2400 × 1800 px, les petites versions à 768 × 768 px, en conservant les proportions et l’orientation EXIF. Le logo est limité à 160 × 160 px. Aucun original n’est écrasé. Les nouveaux imports de photos doivent viser le dossier `optimized` et utiliser `ResponsiveImage` lorsqu’une balise image est affichée.

## Contact

Le formulaire utilise l’intégration FormSubmit existante, destinée à `islandmadatravel@gmail.com`. Une réussite nécessite un statut HTTP valide et un champ `success` positif. Une réponse d’activation n’est pas traitée comme une demande envoyée. Délai maximum de 20 secondes, prévention des doubles envois et conservation des données en cas d’échec.

Les liens `/contact?destination=diego` et `/contact?destination=nosy` préremplissent la destination. WhatsApp reste accessible au +261 32 55 396 35. La carte Google Maps est chargée à la demande.

La réception effective des e-mails dépend du service externe et de l’activation du destinataire. Les tests automatisés interceptent les requêtes et n’envoient aucun message réel.

## Vérifications navigateur

Avec la version de production ouverte sur le port 4173 :

```sh
npm run test:ui
```

Le script utilise Playwright installé localement ou le runtime Codex sur Windows. `PLAYWRIGHT_MODULE` permet d’indiquer un autre chemin vers son module, `QA_URL` une autre URL et `QA_BROWSER_CHANNEL` un autre navigateur Chromium installé.

La suite couvre les sept pages en clair et sombre, aux largeurs 320, 360, 390, 768, 1024, 1366, 1440, 1920 et 2560 px. Elle vérifie les débordements, les titres, l’encodage, le menu clavier, les langues, le thème, les fiches de lieux et les états du formulaire. Captures et rapport JSON : `artifacts/qa`.

Les petits formats sont simulés dans Chromium ; un appareil Android physique n’est pas utilisé par cette suite.

## Déploiement

`npm run build` génère `dist`. Le fichier `vercel.json` existant assure la réécriture des routes de l’application. Aucun déploiement n’est lancé automatiquement.
