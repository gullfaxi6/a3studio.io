# A3 Studio — Design System

**Version 1.0 — 19 juin 2026**
Studio indépendant d'architecture augmentée · Architecture · BIM · Scan-to-BIM · Analyse de l'existant

> Référentiel de production. Toute valeur ici fait foi. Les choix de cadrage sont dans `DECISIONS_A3_STUDIO.md`. Cible technique : **Next.js (App Router) + TypeScript + Tailwind CSS v4**.

## Sommaire
1. Principes de design · 2. Palette couleur · 3. Typographies · 4. Échelle typographique (desktop/tablette/mobile) · 5. Grille · 6. Espacements · 7. Header · 8. Footer · 9. Boutons · 10. Cards · 11. Icônes · 12. Images · 13. Formulaire · 14. États hover/focus · 15. Règles responsive · 16. Accessibilité · 17. SEO utile au design · 18. Structure de composants · 19. Tokens Tailwind · 20. Recommandations de production

---

## 1. Principes de design

Six principes qui tranchent tout arbitrage visuel.

1. **Le réel comme matière première.** Le sujet visuel *est* le métier : nuage de points, maquette filaire BIM, maquette physique, carnet. On montre la donnée et l'existant — pas des rendus spectaculaires. C'est ce qui rend crédible un studio sans portfolio public.
2. **Respiration éditoriale.** Le vide est un matériau. Marges larges, sections aérées, peu d'éléments par écran. La densité vit dans le contenu (méthode, livrables), jamais dans l'encombrement.
3. **Hiérarchie par le contraste typographique.** Serif d'affichage à fort contraste (titres) contre grotesque neutre (UI/corps). Le titre est l'événement visuel ; la personnalité vient du duo, pas d'effets.
4. **Minéral et chaleureux, jamais froid.** Fonds os/ivoire, lumière naturelle. Refus du blanc pur dominant et du « tech froid » qui décrédibiliserait l'ancrage métier.
5. **Sobriété d'interaction = preuve de rigueur.** Icônes fines, pas d'ombres lourdes, transitions discrètes. La retenue reflète la rigueur promise.
6. **Crédibilité par la retenue.** Pas de survente, pas de superlatifs, pas de fausses preuves. La preuve, c'est la méthode et les livrables.

**Signature de marque** (l'élément mémorisable) : la **barre oblique `/`** entre label et texte + l'**imagerie data** (nuage de points / BIM filaire). À systématiser — c'est ce qui distingue A3 Studio d'un template sable-serif générique. On concentre l'audace ici ; tout le reste reste silencieux.

---

## 2. Palette couleur

Quasi monochrome minérale + **un seul accent terracotta chaud**, utilisé avec retenue. Aplat terracotta réservé au **bouton principal de l'Accueil** ; partout ailleurs en micro-touches (eyebrows, icônes, flèches, états actifs, courbes décoratives).

| Token | Hex | Rôle | Contraste |
|---|---|---|---|
| `--c-sand` | `#F7F5F0` | Fond principal | — |
| `--c-stone` | `#EEEAE2` | Fond secondaire, panneaux, bandes | — |
| `--c-ivory` | `#FBFAF7` | Blanc chaud (cards, champs) | — |
| `--c-ink` | `#111111` | Texte principal, titres | 16.9:1 / sand — AAA |
| `--c-graphite` | `#4B4B4B` | Texte secondaire | 8.4:1 / sand — AAA |
| `--c-slate` | `#777777` | Texte tertiaire, labels, légendes | 4.6:1 / sand — AA |
| `--c-line` | `#D9D4CA` | Lignes, bordures | — |
| `--c-near-black` | `#111318` | Boutons, bandes sombres, footer sombre | — |
| `--c-on-dark` | `#F4F2EC` | Texte sur fond sombre | 15.8:1 — AAA |
| `--c-on-dark-muted` | `#A7A39B` | Texte secondaire sur fond sombre | 5.1:1 — AA |
| `--color-accent` | `#B85C38` | Terracotta — eyebrows, icônes, flèches, état actif, bouton principal Accueil, courbes CTA | blanc/accent **4.54:1 AA** ; accent/sand 4.17:1 |
| `--color-accent-hover` | `#A94F2D` | Hover du bouton accent (aplat) | blanc 5.46:1 AA |
| `--color-accent-text` | `#A94F2D` | **Texte** terracotta sur fond clair (eyebrows, petits labels, CTA tertiaire, liens) — même famille | 4.55–5.23:1 / fonds clairs **AA** |

**Sémantique formulaire :** `--c-error` = `#8F1D1D` · `--c-error-bg` = `#F6ECEA` · `--c-success-bg` = `#EEEAE2` (stone) · `--c-focus` = `#111111` · `--c-focus-on-dark` = `#FBFAF7`.

**Discipline de l'accent.** Le terracotta s'emploie avec retenue : eyebrows et petits labels, icônes, flèches, soulignement actif de nav, états hover, **bouton principal de l'Accueil** (seul aplat terracotta, texte blanc, 4.54:1 AA), et **courbes décoratives** de la bande CTA. Ne pas multiplier d'autres oranges/rouges. **Erreur de formulaire** = rouge dédié `#8F1D1D` (`--color-error`), volontairement distinct du terracotta pour une sémantique d'erreur sans ambiguïté. **Succès** = panneau stone + check + texte ink (aucun vert). **Accessibilité (résolu).** Séparation sémantique : `--color-accent` `#B85C38` pour les **éléments graphiques** (bouton principal, icônes, flèches, filets, courbes — seuil 3:1, satisfait), et `--color-accent-text` `#A94F2D` pour les **petits textes** sur fond clair (eyebrows, petits labels, CTA tertiaire, liens terracotta) — **4.55–5.23:1, AA atteint**. Même famille terracotta, aucune palette parallèle.

---

## 3. Typographies

Deux familles uniquement, auto-hébergées (woff2), `font-display: swap`, sous-ensemble latin étendu (accents FR, œ, €).

**Cormorant Garamond** — titres & chiffres décoratifs. Serif à fort contraste fin/épais. Graisses : **400**, **500** (+ italique 400 pour citations). Fallback `Georgia, 'Times New Roman', serif`.

**Inter** — UI, corps, labels, boutons, formulaire. Grotesque neutre lisible. Graisses : **400**, **500**, **600**. Fallback `-apple-system, 'Helvetica Neue', Arial, sans-serif`.

```css
:root{
  --ff-serif:'Cormorant Garamond',Georgia,'Times New Roman',serif;
  --ff-sans:'Inter',-apple-system,'Helvetica Neue',Arial,sans-serif;
}
body{ font-feature-settings:'kern' 1,'liga' 1; -webkit-font-smoothing:antialiased; }
.tabular{ font-feature-settings:'tnum' 1,'lnum' 1; } /* chiffres alignés : métrés, prix */
```

Chargement (Next.js) : `next/font/local`, 5 fichiers woff2, `preload` sur Cormorant 400 (H1) et Inter 400 (corps).

---

## 4. Échelle typographique (desktop / tablette / mobile)

Tailles fluides `clamp()` (mobile → desktop). Root = 16px.

| Style | Famille | Taille (mobile→desktop) | Poids | Interligne | Tracking | Casse | Usage |
|---|---|---|---|---|---|---|---|
| **H1** | Serif | `clamp(2.375rem, 1.25rem + 5vw, 5.75rem)` · 38→92 | 400 | 1.05 | -0.01em | — | Titre de page unique |
| **H2** | Serif | `clamp(1.75rem, 1.1rem + 2.8vw, 3.625rem)` · 28→58 | 400 | 1.1 | -0.005em | — | Titres de section |
| **Title-sub** | Serif | `clamp(1.5rem, 1rem + 2vw, 2.75rem)` · 24→44 | 400 | 1.15 | 0 | — | Sous-titres serif (narratif) |
| **H3** | Sans | `0.8125rem` · 13 | 600 | 1.3 | 0.09em | UPPERCASE | Titres de card |
| **Num** | Serif | `clamp(1.75rem, 1.2rem + 1.5vw, 2.5rem)` · 28→40 | 400 | 1 | 0 | — | Numéros 01–06 |
| **Body** | Sans | `clamp(1rem, 0.96rem + 0.25vw, 1.0625rem)` · 16→17 | 400 | 1.65 | 0 | — | Paragraphes |
| **Body-sm** | Sans | `0.9375rem` · 15 | 400 | 1.6 | 0 | — | Descriptions, légendes |
| **Eyebrow** | Sans | `0.6875rem` · 11 | 500 | 1.4 | 0.12em | UPPERCASE | Labels, eyebrows |
| **Button** | Sans | `0.75rem` · 12 | 600 | 1 | 0.08em | UPPERCASE | Texte de bouton |
| **Quote** | Serif italic | `clamp(1.5rem, 1rem + 2vw, 2.5rem)` · 24→40 | 400 | 1.3 | 0 | — | Citation de marque |

**Règles** : H1 multi-ligne = **un seul `<h1>` avec `<br>`** (jamais 3 titres). UPPERCASE **toujours via CSS** (texte source lisible → SEO + lecteurs d'écran). Un H1/page, H2 sections, H3 cards, pas de saut. Le `/` est décoratif (`aria-hidden`), pas un titre.

---

## 5. Grille

**Conteneur :** max **1440px**. Padding latéral fluide `--gutter-x: clamp(1.25rem, 0.5rem + 3vw, 4.5rem)` (20→72px). Bandes CTA sombres et héros = **full-bleed**.

| Breakpoint | Colonnes | Marges | Gouttières |
|---|---|---|---|
| Desktop ≥1280 | 12 | 48–72 | 24 |
| Tablette 768–1279 | 8 | 32 | 20 |
| Mobile <768 | 4 | 20 | 16 |

**Deux logiques d'alignement :** sections **narratives** → eyebrow + titre alignés **à gauche**, visuel à droite ; sections **vitrine** → eyebrow + titre **centrés**, grille de cards dessous. **Héros (split)** : desktop ~45/55 (texte/visuel full-bleed à droite) ; mobile empilé (texte puis image).

---

## 6. Espacements

Échelle par paliers, exposée en tokens. Aucun espacement hors échelle.

```css
:root{
  --space-1:.25rem; --space-2:.5rem; --space-3:.75rem; --space-4:1rem;
  --space-5:1.5rem; --space-6:2rem; --space-7:3rem; --space-8:4rem;
  --space-9:6rem; --space-10:8rem;
  --section-y:clamp(4rem,2rem + 6vw,8.75rem); /* 64→140 */
  --gutter-x:clamp(1.25rem,.5rem + 3vw,4.5rem); /* 20→72 */
}
```

Padding vertical section = `--section-y`. Titre→contenu = `--space-7` (desktop) / `--space-5` (mobile). Eyebrow→titre = `--space-3`. Gouttière cards = `--space-5/6`. Padding interne card = `--space-6` / `--space-5` (mobile).

> Piège CSS : centraliser le rythme vertical sur un wrapper `.section` unique ; ne pas le redéfinir par composant (sélecteurs qui s'annulent).

---

## 7. Header

**Structure :** logo gauche (« A3 STUDIO » + tagline « ARCHITECTURE AUGMENTÉE ») · nav (Accueil · Studio · Expertise · Méthode · Livrables · Contact) · CTA droite « Démarrons » (primaire) → `/contact`.

| Propriété | Desktop ≥1280 | Mobile/Tablette <1280 |
|---|---|---|
| Hauteur | 80–88px | 64–72px |
| Affichage | Nav complète + CTA | **Burger uniquement** (logo + burger) |
| Sticky | Oui, discret | Oui |
| Fond | Sand transparent en haut → opaque au scroll | Sand opaque |
| Bordure basse | `1px solid --c-line` au scroll | Présente |
| État actif | Soulignement fin (ink ou accent) | Idem dans le menu |

**Décision 14 :** pas de burger desktop. **Menu mobile** : plein écran sobre, nav verticale (cibles ≥44px), CTA pleine largeur ; focus piégé, fermeture `Échap`, `aria-expanded` sur le burger.

---

## 8. Footer

**Un footer unique** sur toutes les pages (résout les deux footers des maquettes).

**4 colonnes (desktop → empilées) :**
1. **Marque** : logo + baseline (« Analyser le réel. Anticiper les usages. Architecturer avec clarté. »).
2. **Navigation** : Accueil · Studio · Expertise · Méthode · Livrables · Contact.
3. **Expertise** : Bâtiments existants · Scan-to-BIM · Modélisation BIM · Audits & diagnostics · AMO & Conseil. *(Pas d'Études de cas / Actualités / Ressources — masquées, décision 8.)*
4. **Contact** : `{{EMAIL_PRO}}` · `{{TEL}}` · « {{ZONE}} » · icône LinkedIn.

**Bas :** Mentions légales · Politique de confidentialité · « © 2026 A3 Studio ».

> Footer = **zone** (« {{ZONE}} »), jamais l'adresse postale. L'adresse complète vit en mentions légales uniquement (arbitrage A1).

---

## 9. Boutons

Trois niveaux figés. Coins nets (radius 0–2px), UPPERCASE, tracking large, flèche fine optionnelle.

**Primaire** — fond `--c-near-black`, texte ivory, padding 16/28px (desktop) 14/22px (mobile), flèche →. Usage : « Échanger avec A3 Studio », « Démarrons », submit. Hover : fond éclairci **OU** flèche +4px (un seul effet). Focus : anneau ink 2px, offset 2px.

**Secondaire** — transparent, bordure 1px ink/line, texte ink, flèche →. Usage : « Découvrir notre approche ». Hover : bordure → ink ou fond stone léger.

**Tertiaire (lien)** — sans fond ni bordure, texte ink, 12px, flèche →. Usage : liens de cards. Hover : flèche glisse + soulignement fin.

**Sur fond sombre** — variantes avec texte `--c-on-dark`, focus `--c-focus-on-dark`.

**Gouvernance des libellés (décision 7)** : 5 libellés uniques (voir §17 / journal). Aucun synonyme.

---

## 10. Cards

Base : fond ivory, bordure fine, **pas d'ombre forte**, icône linéaire, contenu court, respiration.

```css
.card{
  background:var(--c-ivory); border:1px solid var(--c-line);
  border-radius:0; padding:var(--space-6);
  transition:border-color var(--dur) var(--ease), transform var(--dur) var(--ease);
}
```

| Variante | Contenu | Pages |
|---|---|---|
| ServiceCard | Image + H3 + paragraphe + liste à puces | Expertise |
| PillarCard | Icône + H3 + 1 ligne | Accueil (4 piliers) |
| ValueCard | Icône + titre + desc courte | Studio (5 valeurs) |
| StepCard | Numéro serif + titre + desc (+ vignette/chevron) | Studio, Méthode |
| DeliverableCard | Numéro + titre + liste + image | Livrables (4 familles) |
| ToolCard | Icône + titre + sous-titre | Studio, Livrables |
| BenefitItem | Icône + titre uppercase + 1 ligne (souvent sans bordure) | Accueil, Expertise, Méthode, Livrables, Contact |

**Hover** : bordure plus sombre + `translateY(-2px)` léger (+ `--shadow-soft` optionnelle). Flèche qui glisse si cliquable.

---

## 11. Icônes

Line icons, trait **1.5px**, jamais de pictogrammes pleins « SaaS ». Taille 24px par défaut (20 en dense, 32 en accent). Couleur ink/slate ; l'accent rouge est réservé aux états. **Bibliothèque : Lucide React** (tree-shakeable, style linéaire), alternative set SVG custom (carnet, scan, BIM). Décorative → `aria-hidden="true"` ; porteuse de sens → `aria-label`.

```jsx
import { ScanLine } from 'lucide-react';
<ScanLine size={24} strokeWidth={1.5} aria-hidden="true" />
```

---

## 12. Images

**DA :** tons neutres, lumière naturelle, contraste doux, recadrage architectural, grain léger possible, N&B partiel possible, pas de saturation forte. Sujets : maquette physique, écran BIM, nuage de points, plans/coupes/esquisses, carnet A3 Studio, détails matières.

**Règle zéro projet (décision 5) :** aucun bâtiment « fini » présenté comme réalisation A3. Recadrer + **légender** « illustration / process », ou remplacer par maquette/scan/abstrait. Validation visuel par visuel.

**Technique :** `.webp/.avif` + fallback `.jpg` ; `next/image` ; `priority` **héros uniquement**, lazy ailleurs ; largeurs sources héros 2400 / card 1200 / mobile 900 ; compression forte sans perte visible.

**Alt text** descriptif (ex. « Nuage de points 3D d'un bâtiment existant utilisé pour une mission Scan-to-BIM »). Décorative → `alt=""`.

---

## 13. Formulaire

Page Contact. Labels réels au-dessus des champs (jamais placeholder seul).

| Champ | Type | Requis |
|---|---|---|
| Nom / Prénom | `text` | ✅ |
| Email | `email` | ✅ |
| Société / Organisme | `text` | — |
| Téléphone | `tel` | — |
| Quel est votre projet ? | `textarea` | ✅ |
| À quelle étape en êtes-vous ? | `select` (options réelles) | — |
| Budget prévisionnel | `select` (fourchettes réelles) | — |
| Comment avez-vous connu A3 Studio ? | `select` (options réelles) | — |
| Consentement RGPD | `checkbox` | ✅ |
| Honeypot | `text` masqué | — |

**Microcopy** — placeholder : `Décrivez votre projet, vos besoins ou vos interrogations…` · consentement : `J'accepte que mes données soient utilisées pour me recontacter dans le cadre de ma demande.` · succès : `Merci pour votre message. A3 Studio vous répondra dans les meilleurs délais.` · erreur : `Le message n'a pas pu être envoyé. Merci de vérifier les champs ou de nous contacter directement par email.` · bouton : `Envoyer ma demande →`

**Styles & règles :** fond ivory, bordure 1px line, radius 0–2px, padding 12–14px. **Selects à options réelles** (pas placeholder seul). Astérisque requis en `--c-accent` **+ `aria-required`** (couleur jamais seule porteuse). `label[for]`↔`input[id]` obligatoire. Erreur : bordure `--c-error`, fond `--c-error-bg`, message lié `aria-describedby`, `aria-invalid`. Succès : panneau stone + check + texte ink. Validation client **et** serveur.

---

## 14. États hover / focus

```css
:root{
  --ease:cubic-bezier(.22,1,.36,1);
  --dur-fast:150ms; --dur:220ms; --dur-slow:400ms;
  --shadow-soft:0 1px 2px rgba(17,19,24,.04),0 10px 28px rgba(17,19,24,.05);
}
```

| État | Règle |
|---|---|
| Hover lien nav | Soulignement fin qui apparaît |
| Hover bouton | Flèche +4px **OU** fond éclairci (un seul) |
| Hover card | `translateY(-2px)` + bordure plus sombre (+ ombre douce option.) |
| Hover image (card) | Contraste/échelle ≤1.02, jamais agressif |
| **Focus clavier** | Anneau **2px solid `--c-ink`**, `outline-offset:2px` ; sur fond sombre `--c-focus-on-dark` |
| Focus champ | Bordure → ink + anneau |
| Active | Opacité légère ou translation 1px |

**Mouvement autorisé** : fade-in doux, translation verticale légère, flèche qui glisse, soulignement nav, apparition progressive des cards au scroll. **Interdit** : parallaxe agressive, 3D, transitions « startup », tout ce qui gêne la lecture.

```css
@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{ animation-duration:.01ms!important; transition-duration:.01ms!important; }
}
```

---

## 15. Règles responsive

| Nom | Largeur | Grille |
|---|---|---|
| Mobile | <768 | 4 col |
| Tablette | 768–1023 (`md`) | 8 col |
| Laptop | 1024–1279 (`lg`) | 12 col |
| Desktop | ≥1280 (`xl`) | 12 col |
| Wide | ≥1440 (`2xl`) | conteneur max |

**Reflow des grilles de cards :**

| Items | Desktop | Tablette | Mobile |
|---|---|---|---|
| 3 cards | 3 | 3 ou 2 | 1 |
| 4 cards / 4 bénéfices | 4 | 2 | 1 |
| **5 items** (Vision, Différence) | 5 inline | **3 + 2** | 1 empilé |
| **6–7 items** (Outils/Techno) | 1 rangée compacte | 3 col | 2 col |

> Rangées de 5–7 = vrai piège des maquettes. Règle : **stack vertical** en mobile (plus accessible qu'un scroll), 3+2 en tablette pour les 5. Scroll-snap horizontal en dernier recours, navigable au clavier.

**Héros mobile** : texte puis image ; H1 38–46px bien interligné ; CTA pleine largeur. **Sections** empilées, **aucun débordement horizontal** (tester 390px et 768px).

---

## 16. Accessibilité

Cible **WCAG 2.1 AA**. Lighthouse visés : Accessibility 90+, SEO 95+, Performance 90+, Best Practices 90+.

- **Contraste** conforme (ratios §2) ; texte sur image → scrim/overlay garanti.
- **Focus visible** partout (§14) ; jamais `outline:none` sans remplacement.
- **Clavier** complet : header, menu mobile (focus piégé + `Échap`), formulaire ; ordre logique ; **lien d'évitement** « Aller au contenu » en tête.
- **Labels** réels (`for`/`id`), pas de placeholder seul porteur d'info.
- **Alt text** sur informatives, `alt=""` sur décoratives.
- **Hn** : un H1, H2/H3 sans saut ; uppercase via CSS.
- **Boutons vs liens** sémantiques (`<button>` action / `<a>` navigation).
- **Jamais d'info uniquement par image ou couleur** (requis = astérisque + `aria-required`).
- **CTA explicites** (« Découvrir notre méthode » plutôt que « En savoir plus » nu).
- **`prefers-reduced-motion`** respecté · cibles tactiles ≥44px · `<html lang="fr">`.

---

## 17. SEO utile au design

Parts du SEO que le design/intégration contrôle directement.

- **Un seul H1 par page**, hiérarchie H2/H3 propre et sémantique (pas de titres « faussés » par le style). Le visuel ne porte jamais un titre à la place du HTML.
- **HTML sémantique** : `<header> <nav> <main> <section> <article> <footer>`, listes réelles pour les listes.
- **Métadonnées par page** (titles/descriptions du brief SEO), `metadataBase` sur le domaine servi, `canonical` cohérent (cf. arbitrage A2 : aligner sur `{{DOMAINE_WEB_V1}}` puis bascule `{{DOMAINE_CIBLE}}`).
- **OpenGraph / Twitter cards** : image OG dédiée (1200×630), titre/description par page.
- **Alt text descriptif** = SEO image + accessibilité (double bénéfice).
- **CTA & libellés explicites** (gouvernance décision 7) : meilleurs pour l'intention et le maillage interne.
- **URLs propres** : `/studio`, `/expertise`, `/methode`, `/livrables`, `/contact`, `/mentions-legales`, `/confidentialite`.
- **Performance = SEO** : `next/font` (pas de FOIT/CLS), `next/image` avec dimensions (évite le layout shift), `priority` héros, lazy ailleurs.
- **Données structurées** JSON-LD `ProfessionalService` : `name: A3 Studio`, `founder: Sébastien Bertucci`, `serviceType: Architecture, BIM, Scan-to-BIM`, `areaServed: {{ZONE}}`, `url` + `email` = `{{EMAIL_PRO}}`. **Aucune fausse donnée.**
- **`sitemap.ts` + `robots.ts`** (ne pas lister les pages masquées, décision 8).
- **Mots-clés stratégiques** à incarner naturellement dans les titres/intros : architecte BIM, BIM Manager, Scan-to-BIM, relevé 3D bâtiment, modélisation BIM existant, nuage de points, audit bâtiment existant, faisabilité architecturale.

---

## 18. Structure de composants réutilisables

```
src/
├── app/
│   ├── layout.tsx            # <html lang="fr">, fonts, Header, Footer, skip-link
│   ├── globals.css           # tokens (@theme) + base
│   ├── page.tsx              # Accueil /
│   ├── studio/ expertise/ methode/ livrables/ contact/ page.tsx
│   ├── mentions-legales/ confidentialite/ page.tsx
│   ├── not-found.tsx · sitemap.ts · robots.ts
│   └── api/contact/route.ts  # réception + honeypot (+ Resend ensuite)
├── components/
│   ├── layout/  Header · Nav · MobileMenu · Footer
│   ├── ui/      Button · Eyebrow · SlashRule · SectionHeading · Section · Icon
│   ├── cards/   ServiceCard · PillarCard · ValueCard · StepCard · DeliverableCard · ToolCard · BenefitItem
│   ├── sections/ Hero · BenefitRow · PillarsRow · NarrativeSplit · ImageTriptych ·
│   │             ServiceGrid · ValueRow · StepTimeline · StepRow · ProcessColumns ·
│   │             TechLogos · ToolGrid · DeliverableGrid · CtaBand · QuoteBand ·
│   │             RdvBlock · LocationBlock
│   └── form/    ContactForm · Field · SelectField · Checkbox
└── lib/  seo.ts (métadonnées + JSON-LD) · content/ (contenus typés par page)
```

> **`LocationBlock` remplace toute carte** (arbitrage A1) : énoncé sobre « Saint-Cloud — sur rendez-vous » + « Zone d'intervention : {{ZONE}} » + visuel premium optionnel. Aucune dépendance carte/clé Maps en V1.

**Props clés (esquisses TS) :**

```ts
type ButtonProps = { variant?:'primary'|'secondary'|'tertiary'; href?:string; arrow?:boolean; onDark?:boolean; children:React.ReactNode };

type HeroProps = { label:string; title:React.ReactNode; intro:string;
  ctas?:{label:string;href:string;variant?:ButtonProps['variant']}[];
  image:{src:string;alt:string;priority?:boolean} };

type SectionHeadingProps = { eyebrow:string; title:React.ReactNode; align?:'left'|'center' };

type ServiceCardProps = { image?:{src:string;alt:string}; title:string; description:string; bullets?:string[]; href?:string };

type Step = { number:string; title:string; description:string; objectives:string[]; deliverables:string[]; thumb?:{src:string;alt:string} };
type StepTimelineProps = { steps:Step[] };

type CtaBandProps = { title:React.ReactNode; text:string; cta:{label:string;href:string}; image:{src:string;alt:string} };

type LocationBlockProps = { city:string; mode:string; zone:string; image?:{src:string;alt:string} };
```

---

## 19. Tokens Tailwind

Cible **Tailwind v4** (CSS-first via `@theme`) — colle à la logique « variables = source de vérité ». Bloc à placer dans `globals.css` :

```css
@import "tailwindcss";

@theme {
  /* Couleurs → génèrent bg-*, text-*, border-* */
  --color-sand:#F7F5F0; --color-stone:#EEEAE2; --color-ivory:#FBFAF7;
  --color-ink:#111111; --color-graphite:#4B4B4B; --color-slate:#777777;
  --color-line:#D9D4CA; --color-near-black:#111318;
  --color-on-dark:#F4F2EC; --color-on-dark-muted:#A7A39B;
  --color-accent:#B85C38; --color-accent-hover:#A94F2D; --color-accent-text:#A94F2D;
  --color-error:#8F1D1D; --color-error-bg:#F6ECEA; --color-success-bg:#EEEAE2;

  /* Typo */
  --font-serif:'Cormorant Garamond',Georgia,serif;
  --font-sans:'Inter',-apple-system,'Helvetica Neue',Arial,sans-serif;

  /* Tailles fluides → text-h1, text-h2, … */
  --text-h1:clamp(2.375rem,1.25rem + 5vw,5.75rem);   --text-h1--line-height:1.05;
  --text-h2:clamp(1.75rem,1.1rem + 2.8vw,3.625rem);  --text-h2--line-height:1.1;
  --text-title-sub:clamp(1.5rem,1rem + 2vw,2.75rem); --text-title-sub--line-height:1.15;
  --text-body:clamp(1rem,.96rem + .25vw,1.0625rem);  --text-body--line-height:1.65;
  --text-eyebrow:.6875rem; --text-eyebrow--line-height:1.4;
  --text-button:.75rem;

  /* Espacements (en plus de l'échelle Tailwind par défaut) */
  --spacing-section:clamp(4rem,2rem + 6vw,8.75rem);
  --spacing-gutter:clamp(1.25rem,.5rem + 3vw,4.5rem);

  /* Breakpoints, radius, easing, ombre */
  --breakpoint-md:768px; --breakpoint-lg:1024px; --breakpoint-xl:1280px; --breakpoint-2xl:1440px;
  --radius-sm:2px;
  --ease-brand:cubic-bezier(.22,1,.36,1);
  --shadow-soft:0 1px 2px rgba(17,19,24,.04),0 10px 28px rgba(17,19,24,.05);
}
```

Utilisation : `bg-sand`, `text-ink`, `border-line`, `font-serif`, `text-h1`, `tracking-[0.12em]`, `py-section`, `px-gutter`, `max-w-[1440px]`, `ease-brand`.

> **Alternative Tailwind v3** (si projet existant en v3) : reporter ces valeurs dans `tailwind.config.ts` → `theme.extend.colors / fontFamily / fontSize / spacing / screens / borderRadius / transitionTimingFunction`. Même palette, même nommage.

---

## 20. Recommandations de production

**Stack & setup**
- Next.js (App Router) + TypeScript + Tailwind **v4**. `globals.css` = source des tokens (`@theme`).
- `next/font/local` pour Cormorant + Inter (5 woff2, sous-ensemble FR, `preload` H1 + corps).
- ESLint + Prettier ; TypeScript strict ; build sans erreur (cf. checklist QA).

**Ordre de build conseillé** (socle d'abord, pages ensuite)
1. Tokens (`@theme`) + `layout.tsx` (lang, fonts, skip-link) + `Section`.
2. `Header` / `MobileMenu` / `Footer`.
3. `Button` · `Eyebrow` · `SlashRule` · `SectionHeading`.
4. `Hero` (patron unique) → décliner les pages depuis la trame *Hero → bénéfices → contenu → bande CTA → footer*.
5. Cards + sections de contenu.
6. `ContactForm` + `app/api/contact/route.ts` (honeypot, validation serveur, succès/erreur) ; envoi Resend branché ensuite (clé en env).
7. Pages légales (gabarits RGPD) **avant déploiement**.

**Contenus & intégrité**
- Contenus typés dans `lib/content/*` (séparés du markup) → relecture FR facilitée, réutilisation.
- Zéro fictif : aucun faux nom/client/projet, aucune auto-évaluation, coordonnées réelles uniquement.
- Imagerie validée visuel par visuel (règle zéro projet).

**Performance (budget)**
- Lighthouse : Perf 90+, SEO 95+, A11y 90+, BP 90+.
- `next/image` partout (dimensions explicites, `priority` héros, lazy ailleurs) ; formats webp/avif.
- 2 familles de fontes, graisses limitées, `swap` ; pas de bibliothèque UI lourde ; animations CSS, JS minimal.

**SEO technique**
- `metadataBase` + `canonical` sur le domaine servi ; bascule `{{DOMAINE_CIBLE}}` + **301** depuis `{{DOMAINE_WEB_V1}}` quand prêt.
- `sitemap.ts` + `robots.ts` (sans pages masquées) ; OpenGraph ; JSON-LD `ProfessionalService` sans fausse donnée.

**Déploiement & QA**
- HTTPS ; analytics si souhaité ; Search Console.
- Tester 1440 / 1280 / 768 / 390 ; menu mobile ; formulaire (réception réelle) ; 404 ; aucun débordement horizontal.
- Domaine email `{{DOMAINE_CIBLE}}` : vérifier MX/SPF/DKIM avant d'annoncer l'email en prod.

---

## Prochaines étapes
1. **Gabarits RGPD** (Mentions légales + Politique de confidentialité, placeholders + durée de conservation à valider) — seul bloquant à la publication.
2. **Socle Next.js** : tokens `@theme` + `layout` + `Header`/`Footer`/`Button`/`Section`/`Hero`/`SectionHeading`.

*Fin du design system v1.0. Toute évolution = nouvelle version + entrée dans `DECISIONS_A3_STUDIO.md`.*
