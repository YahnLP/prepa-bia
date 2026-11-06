# Cap BIA

Application web pour préparer le **Brevet d'Initiation Aéronautique (BIA)** : leçons illustrées et animées, 18 simulateurs interactifs, quiz corrigés, révision espacée, fiches, glossaire et examens blancs chronométrés.

Aucun serveur ni dépendance : c'est un site statique (HTML, CSS et JavaScript). La progression est enregistrée dans le navigateur de l'élève (localStorage).

## Publier sur GitHub Pages

1. Crée un dépôt GitHub (par exemple `cap-bia`) et envoie-y tout le contenu de ce dossier.
2. Dans le dépôt : **Settings → Pages**.
3. Source : **Deploy from a branch**, branche `main`, dossier `/ (root)`, puis **Save**.
4. Après une minute, le site est en ligne à l'adresse `https://<ton-compte>.github.io/cap-bia/`.

Le fichier `.nojekyll` est déjà présent. Toutes les adresses sont relatives : le site fonctionne dans un sous-dossier de GitHub Pages.

## Modifier le contenu

Les sources sont dans `src/` :

- `content-1.js` à `content-6.js` : les leçons et les questions (un fichier par thème) ;
- `figs1.js` à `figs4.js` : les illustrations animées (SVG) ;
- `intros.js` : le résumé « L'idée en 20 secondes » de chaque chapitre ;
- `sims1.js` à `sims4.js` : les simulateurs ;
- `app.js` et `style.css` : l'application et le style.

Après une modification, régénère `index.html` avec :

```
python3 build.py
```

## Remarques

- Le programme et le format de l'épreuve (5 thèmes, 100 QCM, 2 h 30) sont ceux publiés par le ministère. Vérifie chaque année la note de service et les dates d'examen : le seuil d'admission n'est pas intégré à l'application.
- Polices : Barlow, Barlow Condensed et IBM Plex Mono (licence SIL Open Font), fournies dans `fonts/`.
