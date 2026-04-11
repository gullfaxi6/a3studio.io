# A3 Studio — Guide d'intégration v3

## Images à remplacer

Placer les images dans ce dossier `/images/` et décommenter les balises `<img>` dans chaque HTML.

| Fichier           | Usage                           | Dimensions recommandées | Alt text suggéré |
|-------------------|---------------------------------|-------------------------|------------------|
| `hero.jpg`        | Visualisation hero accueil      | 900×660px               | Maquette BIM A3 Studio — relevé laser |
| `projet-1.jpg`    | Réhabilitation industrielle     | 600×400px               | Réhabilitation bâtiment industriel — maquette Revit LOD 300 |
| `projet-2.jpg`    | Usine industrielle              | 600×400px               | Relevé 3D usine industrielle — nuage de points 45M |
| `projet-3.jpg`    | Patrimoine historique           | 600×400px               | Modélisation monument historique — Scan to BIM LOD 350 |
| `fondateur.jpg`   | Portrait fondateur              | 600×600px               | [Prénom Nom] — Architecte HMONP, fondateur A3 Studio |

## À personnaliser obligatoirement

Rechercher et remplacer dans tous les fichiers HTML :

| Placeholder       | Valeur à insérer |
|-------------------|-----------------|
| `[Prénom Nom]`    | Votre nom réel  |
| `[LINKEDIN URL]`  | URL de votre profil LinkedIn |
| `[TALLY FORM ID]` | ID de votre formulaire Tally.so |
| `contact@a3studio.fr` | Votre email réel si différent |
| `https://a3studio.fr` | Votre domaine réel |
| `[SIREN]`         | Votre numéro SIREN |

## Structure des fichiers

```
a3studio/
├── index.html          ← Homepage
├── offres.html         ← Page offres détaillées
├── realisations.html   ← Études de cas
├── apropos.html        ← À propos / fondateur
├── contact.html        ← Formulaire Tally.so
├── mentions.html       ← Mentions légales
├── sitemap.xml
├── robots.txt
├── css/
│   └── style.css       ← Design system complet v3
├── js/
│   ├── main.js         ← Nav scroll, hamburger, onglets
│   └── partials.js     ← Nav + Footer partagés (auto-inject)
└── images/
    └── README.md       ← Ce fichier
```

## Déploiement

### Framer
1. Exporter en "Custom Code" ou utiliser l'intégration HTML
2. Uploader `css/style.css` et `js/main.js` + `js/partials.js` en assets
3. Ajuster les chemins si nécessaire

### Hébergement statique (Netlify / Vercel / OVH)
1. Zipper le dossier `a3studio/`
2. Drag & drop sur Netlify ou `vercel deploy`
3. Pointer le domaine `a3studio.fr`

### Points de contrôle avant mise en ligne
- [ ] Remplacer tous les [placeholders]
- [ ] Ajouter les images dans /images/
- [ ] Décommenter les balises <img> dans chaque HTML
- [ ] Configurer le formulaire Tally.so avec l'ID réel
- [ ] Vérifier les liens LinkedIn
- [ ] Tester responsive sur mobile
- [ ] Vérifier le contraste (WCAG AA minimum)
- [ ] Soumettre sitemap.xml à Google Search Console
