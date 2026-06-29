# DECISIONS_A3_STUDIO.md

> Journal de décisions versionnable du site A3 Studio.
> Référentiel unique des choix structurants. Toute valeur ici fait foi. Une décision n'est jamais effacée : on la barre et on ajoute la nouvelle ligne datée.

**Projet :** Site vitrine A3 Studio
**Responsable :** Sébastien Bertucci — Architecte DE HMONP — BIM Manager
**Version :** 0.7
**Date :** 23 juin 2026

**Variables de projet** (à substituer si évolution) :
- `{{DOMAINE_WEB_V1}}` = `a3studio.io`
- `{{DOMAINE_CIBLE}}` = `a3studio.fr`
- `{{EMAIL_PRO}}` = `s.bertucci@a3studio.fr`
- `{{TEL}}` = `+33 (0)6 98 46 69 12`
- `{{ADRESSE_SIEGE}}` = `21 Parc de la Bérengère, 92210 Saint-Cloud`
- `{{ZONE}}` = `Île-de-France / France`

**Légende statuts :** `✅ Validé` · `🟡 Repli` (défaut en attente d'info) · `🔴 Bloquant` (à lever avant publication)

---

## 1. Les 15 décisions verrouillées

| # | Sujet | Décision | Statut |
|---|---|---|---|
| 1 | Domaine & email | Domaine web V1 : `{{DOMAINE_WEB_V1}}`. Domaine cible : `{{DOMAINE_CIBLE}}` (→ redirection 301 quand opérationnel). Email : `{{EMAIL_PRO}}`. | ✅ Validé |
| 2 | Portrait fondateur | Aucun portrait fictif. **Photo réelle de Sébastien Bertucci fournie et intégrée** (`public/images/studio-founder-sebastien.webp`, page Studio). | ✅ Validé |
| 3 | Réseaux sociaux | LinkedIn uniquement : `linkedin.com/in/sébastien-bertucci-77523326`. Instagram retiré tant qu'inactif. | ✅ Validé |
| 4 | Titre fondateur | « **Sébastien Bertucci — Architecte DE HMONP — BIM Manager** ». Bio/indicateurs : « **BIM Manager depuis 2012** » / « expertise BIM depuis 2012 ». Pas de « Référent BIM Manager » en titre principal, pas de « 12+ ans ». | ✅ Validé |
| 5 | Politique zéro projet | Aucun visuel ne suggère une réalisation A3 si ce n'en est pas une. Bâtiments « finis » → recadrés + légendés « illustration/process » ou remplacés par maquette/scan/abstrait. Validation visuel par visuel. | ✅ Validé |
| 6 | Banque d'images | Assets à produire/sélectionner. Tout manque comblé par visuels neutres process/ambiance, jamais présentés comme projet A3. | 🟡 Repli |
| 7 | Gouvernance CTA | Libellés + destinations harmonisés : **Échanger avec A3 Studio** → `/contact#contact` · **Découvrir notre approche** → `/studio` · **Demander un audit** → `/contact?objet=audit#contact` · **Prendre rendez-vous** → `/contact#contact` · **Démarrons** → `/contact`. | ✅ Validé |
| 8 | Pages futures | Études de cas / Actualités / Ressources : **masquées et non liées** tant que vides. | ✅ Validé |
| 9 | RGPD / légal | Publication conditionnée aux Mentions légales + Politique de confidentialité finalisées. Données : voir §3. Gabarits à produire avec placeholders. | 🔴 Bloquant |
| 10 | Prise de RDV | V1 : pas d'outil externe. « Prendre rendez-vous » → ancre **`/contact#contact`** (fonctionne depuis toute page). Cal.com/Calendly branchable ensuite. | ✅ Validé |
| 11 | Réception formulaire | Email de réception : `{{EMAIL_PRO}}`. API route Next.js + honeypot anti-spam + messages succès/erreur. Service d'envoi (Resend) branché ensuite. | ✅ Validé (envoi à brancher) |
| 12 | Fontes | **Cormorant Garamond** (titres, 400/500) + **Inter** (UI/corps, 400/500/600), auto-hébergées, `font-display: swap`. | ✅ Validé |
| 13 | Relecture FR | Relecture intégrale. Corrections connues : PARIDE→RAPIDE, 18000→18h00, Detection→Détection, Reception→Réception. | ✅ Validé |
| 14 | Header desktop | Nav complète (6 liens + CTA) en desktop ; burger **uniquement** tablette/mobile. Burger desktop supprimé. | ✅ Validé |
| 15 | Technologies | V1 : **noms monochromes**, présentés comme outils utilisés (pas partenaires). **Pas de logos** tant que leur usage n'est pas validé. | ✅ Validé |

---

## 2. Arbitrages définitifs

### A1 — Adresse & page Contact *(arbitrage du 19/06/2026)*

L'adresse officielle existe (`{{ADRESSE_SIEGE}}`) mais **ne doit pas être affichée frontalement** sur la page Contact.

**Décidé :**
- Page Contact publique : afficher **« Saint-Cloud — sur rendez-vous »** + **« Zone d'intervention : {{ZONE}} »**.
- **Pas de carte détaillée en V1** (ni Google Maps, ni pin d'adresse).
- Un **bloc géographique sobre** est autorisé (énoncé textuel + éventuel visuel premium d'ambiance/matière), sans effet « commerce de proximité ».
- L'**adresse complète** est réservée aux **mentions légales** (siège social).
- Le **footer** affiche la zone, pas l'adresse postale.

**Intention :** préserver une image premium et professionnelle de studio sur rendez-vous, pas de vitrine locale.

### A2 — Domaine & email *(arbitrage du 19/06/2026)*

- Domaine web **V1 opérationnel** : `{{DOMAINE_WEB_V1}}`.
- Domaine **cible** si disponible/exploitable : `{{DOMAINE_CIBLE}}`.
- **Email pro** partout : `{{EMAIL_PRO}}`.
- Si le domaine final n'est pas figé : conserver cette logique via variables ; prévoir la **redirection 301** `{{DOMAINE_WEB_V1}}` → `{{DOMAINE_CIBLE}}` une fois le `.fr` actif, et l'alignement des `canonical`/OpenGraph sur le domaine servi.

### A3 — Implémentation & validations *(build, 19/06/2026)*

Validé lors de la construction du socle et de la page Accueil :
- **Page Accueil complète** validée (Hero, Piliers, Notre approche + Triptyque, Expertises, Technologies, bande CTA).
- **Composants Accueil** validés : `PillarsRow`, `PillarCard`, `NarrativeSplit`, `ImageTriptych`, `ServiceGrid`, `ServiceCard`, `TechLogos`, `CtaBand`.
- **Utilitaires** `Media` et `Icon` validés (mutualisation, anti-duplication).
- **CTA RDV** = `/contact#contact` (cohérent avec décision 10).
- **Technologies en noms monochromes** en V1 (pas de logos de marque) : plus sobre et plus sûr juridiquement.
- **Placeholders sobres** « Visuel — à intégrer » **maintenus** tant que les assets réels validés ne sont pas fournis.
- **Interdiction persistante** de tout visuel fictif assimilable à un projet, client ou référence A3 Studio.
- **Libellé** « Découvrir notre méthode » validé pour le lien contextuel de la section approche.
- **Wording** « projets cohérents et durables » (au lieu de « réalisations ») pour renforcer la politique zéro projet.
- **Type-check TypeScript** : 0 erreur. Build complet à vérifier en local (polices Google bloquées dans l'environnement de génération).

### A4 — Page Studio & arbitrages *(build, 19/06/2026 — v0.3)*

- **Page Studio** validée structurellement et techniquement (sous réserve de vérification visuelle en local).
- **Portrait fondateur** : cadrage 4:5 validé comme base ; `object-position` exposé et **ajustable** (`content/studio.ts` → `founder.objectPosition`, défaut `center 15%`). Alt : « Portrait de Sébastien Bertucci, architecte DE HMONP et BIM Manager, fondateur d'A3 Studio. »
- **Étapes sans chevrons** : validé (numéros 01–05, lisibilité par alignement/espacement, sans effets décoratifs).
- **Écosystème** : libellé **« IA & automatisation »** (et non « IA & workflows ») ; ne pas laisser entendre qu'A3 Studio commercialise une plateforme/des outils d'IA propriétaires.
- **Bande CTA Studio — destinations différenciées** :
  - « Échanger avec A3 Studio » → `/contact#contact` ;
  - « Demander un audit » → `/contact?objet=audit#contact` (présélectionne le motif **« Audit / analyse du projet »** dans le formulaire).
- **Formulaire** : ajout d'un champ **« Objet de la demande »** (select), prérempli via le paramètre `?objet=` (clé `audit`, `scan-to-bim`, `bim`, `conception`, `echange`, `autre`).
- **Icônes** : mapping validé à titre provisoire ; registre centralisé conservé pour remplacement facile.
- **Rythme des fonds Studio** : `ivory → sand → stone → sand → stone → dark`.

### A5 — Page Expertise & ajustements *(22/06/2026 — v0.4)*

- **Page Expertise** validée structurellement et techniquement (sous réserve de vérification visuelle en local).
- **Responsive des cartes domaines** : `ExpertiseDomainsGrid` en **1 / 2 / 3 colonnes** (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) pour ne pas tasser descriptions et livrables à 768 px.
- **Titre section Domaines** : « **Des expertises complémentaires pour comprendre, concevoir et transmettre.** » (plus spécifique, n'exclut pas les missions modestes).
- **Trois domaines** validés (Scan-to-BIM, BIM & données, Conception architecturale) avec leurs livrables.
- **Approche Le réel / Le projet / L'usage** validée (`ThreePartProcess`).
- **Placeholders Expertise** : 4 au total (1 héros + 3 cartes domaines).
- **Placeholders maintenus** sur l'ensemble du site jusqu'à intégration d'assets réels validés ; zéro visuel fictif.
- **Validation visuelle** encore à effectuer (1440 / 1280 / 768 / 390 px).
- **Documentation** : `README.md` mis à jour (Accueil/Studio/Expertise/Méthode complètes ; Livrables à produire ; Contact à finaliser).

### A6 — Page Méthode & ajustements professionnels *(22/06/2026 — v0.5)*

- **Page Méthode** validée structurellement et techniquement (sous réserve de vérification visuelle).
- **Timeline** validée : verticale, grands numéros serif, séparateurs horizontaux, **sans** ligne décorative, **sans** vignettes tant qu'aucun asset réel, **une colonne sur mobile**. Libellés « Notre engagement » / « Notre approche » validés.
- **Ajustements éditoriaux (responsabilité professionnelle)** :
  - étape 01 : « Diagnostic technique » → « **Diagnostic architectural et synthèse des contraintes** » (pas de diagnostic réglementaire présenté comme systématique) ;
  - étape 05 : « Choisir les partenaires » → « **Accompagner le maître d'ouvrage dans le choix des entreprises** » ; « Planning d'exécution » → « **Planning prévisionnel de réalisation** » ;
  - étape 06 : texte et objectif reformulés (assistance MOA à la réception, suivi de la levée des réserves, DOE **selon le périmètre**).
- **Note de périmètre** ajoutée près de la timeline : « La démarche s'adapte au périmètre de chaque mission ; toutes les étapes et tous les livrables présentés ne sont pas systématiquement inclus. » + note « Exemples de livrables » conservée.
- **CTA harmonisés** (cf. décision 7) appliqués dans le code.
- **Archive** : `DECISIONS_A3_STUDIO.md`, `A3_STUDIO_DESIGN_SYSTEM_v1.0.md`, `MENTIONS_LEGALES.md`, `POLITIQUE_CONFIDENTIALITE.md` désormais inclus à la racine du ZIP projet.
- **Validation visuelle** toujours à effectuer.

### A7 — Finalisation Contact, pages légales, envoi réel & logo *(23/06/2026 — v0.6)*

- **Page Livrables** validée structurellement et techniquement (grille 2×2 desktop / 1 colonne mobile, 4 familles, exemples non contractuels, 5 critères de cadrage, méthodes & outils via `ToolGrid`).
- **Page Contact** finalisée : Hero, 3 bénéfices (Écoute / Clarté / Orientation), bloc rendez-vous (échange d'une trentaine de minutes, **sans promesse automatique de disponibilité**), formulaire, bloc géographique + **coordonnées directes** (`ContactDetails`), bande **citation** (`QuoteBand`). Nouveaux composants : `ContactDetails`, `QuoteBand`. `PillarsRow` reçoit une prop `columns` (3/4).
- **Formulaire — UX & accessibilité** : champs requis = nom, email, message, consentement (autres facultatifs) ; **validation accessible** champ par champ (`aria-invalid` + `aria-describedby`, focus du 1er champ invalide), `noValidate` conservé ; **limites de longueur** partagées client/serveur (`fieldLimits`) ; zone **`aria-live`** ; **consentement** avec lien vers `/confidentialite` (case obligatoire, non précochée) ; budget renommé « Budget prévisionnel de l'opération ou de la mission » + option « Non concerné / mission d'étude ». Messages succès/erreur mis à jour.
- **API `/api/contact` — envoi réel (Resend, API REST)** : **aucun faux succès** (200 seulement si l'e-mail est accepté par le service) ; validation serveur (requis, format e-mail, longueurs) ; config manquante → 500 (détail en dev, générique en prod) ; honeypot conservé + heuristique anti-spam légère (liens) ; aucune clé exposée côté client. Variables : `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. `.env.example` mis à jour.
- **Pages légales intégrées** : `/mentions-legales` et `/confidentialite` ne sont plus des placeholders. Composant `LegalPageLayout` + styles `.legal-content` (H1/H2 sémantique, largeur de lecture, liens cliquables, **pas de markdown brut**, **pas de commentaires internes/checklists**). Placeholders conservés **uniquement** pour les données non confirmées (RCS, APE, TVA, domaine).
- **Hébergeur légal** : centralisé via `LEGAL_HOST_NAME` / `LEGAL_HOST_ADDRESS` (objet `site.legal.host`) + mention **« Hébergeur final à confirmer avant publication »**. Distinction explicite fournisseur DNS/domaine ≠ hébergeur réel (cf. C10).
- **Rétention RGPD** : **3 ans à compter du dernier contact** retenue définitivement (mention « proposition à valider » retirée de la version publique).
- **Footer — terminologie** : « Audits & diagnostics » → « Analyse & diagnostic architectural » ; « AMO & Conseil » → « Accompagnement & conseil ».
- **Logo** : **vrai logo A3 Studio intégré** (Header, MobileMenu, Footer) en deux variantes transparentes (sombre `#111` / claire `#F4F2EC`) via le composant `Logo`. Wordmarks texte remplacés.
- **Vérifications (v0.6)** : type-check **0 erreur**. **Build de production non finalisé en bac à sable** (fetch Google Fonts bloqué) ; lint non encore configuré.

### A8 — Passe pré-audit *(23/06/2026 — v0.7)*

- **ESLint configuré** : `eslint.config.mjs` (flat config) — Next (recommended + core-web-vitals), React, React Hooks, TypeScript. Script `"lint": "eslint ."`. Lint **0 erreur** sur 68 fichiers. Seule règle stylistique désactivée : `react/no-unescaped-entities` (contenu FR, apostrophes ; aucune valeur de correction), justifiée en tête de config.
- **Logo en variantes** : `header` (signature horizontale = symbole « A3 » **détouré** du gabarit + wordmark/baseline CSS, le symbole n'étant pas redessiné), `compact` (mobile), `footer` (lockup vertical clair). **Tailles à valider visuellement** (aucun asset horizontal officiel à ce jour).
- **Hébergeur légal — aucune valeur par défaut** : `LEGAL_HOST_NAME` / `LEGAL_HOST_ADDRESS` + drapeau `LEGAL_HOST_CONFIRMED` comme seules sources de vérité. Plus aucune mention « OVHcloud » par défaut. Section non affichée si non confirmée (dev : marqueur « non publiable » ; prod : masquée).
- **Champs légaux centralisés** (`lib/legal.ts`) : RCS / APE / TVA pilotés par env. Lignes incomplètes **masquées en production**, **marquées « non publiable » en développement**. Script **`check:legal`** (aussi en `prebuild`) : **échoue en production** (`VERCEL_ENV=production`) tant que tout n'est pas renseigné ; non bloquant en dev/preview. → Aucune donnée légale incomplète n'est publiable.
- **Politique de confidentialité — formulation conditionnelle** : suppression de l'affirmation « données hébergées au sein de l'UE ». La localisation et les transferts hors EEE dépendent **des prestataires réellement retenus** (hébergeur réel, service d'envoi d'e-mails type Resend) ; tant que Vercel/Resend ne sont pas configurés, aucune localisation exclusive n'est affirmée.
- **API — anti-spam documenté & faux succès corrigés** : honeypot = **drop silencieux assumé** (bots non informés) ; filtre « excès de liens » = **erreur 422** (plus de 200) avec message utilisateur « simplifier le message » ; **validation serveur des valeurs autorisées** pour objet / étape / budget / source (rejet si hors liste). Un utilisateur réel ne reçoit jamais de confirmation sans envoi effectif.
- **Statut du build (honnête)** : type-check ✅ ; lint ✅ ; **build de production non vérifiable en bac à sable** (fetch Google Fonts bloqué par le réseau) → **à confirmer en local / Vercel Preview**. (Un contrôle de compilation avec polices temporairement neutralisées avait compilé toutes les routes — indicatif uniquement, ce n'est pas le build de production.)
- **Audit global** : encore à effectuer après visualisation locale.

### Coordonnées (source unique de vérité)
- **Nom commercial :** A3 Studio
- **Email :** `{{EMAIL_PRO}}`
- **Téléphone :** `{{TEL}}`
- **Présence Contact :** Saint-Cloud — sur rendez-vous
- **Zone d'intervention :** {{ZONE}}
- **LinkedIn :** https://www.linkedin.com/in/sébastien-bertucci-77523326
- **Domaine V1 :** `{{DOMAINE_WEB_V1}}` · **Cible :** `{{DOMAINE_CIBLE}}`

### Données légales (mentions légales + JSON-LD)
| Champ | Valeur |
|---|---|
| Forme juridique | SASU |
| Société | A3 Studio |
| Président / responsable de traitement | Sébastien Bertucci |
| SIRET | `99139939500011` *(confirmé)* |
| Capital social | 1 000 € |
| Siège social | {{ADRESSE_SIEGE}} |
| Hébergeur | OVHcloud *(adresse hébergeur à compléter dans le gabarit)* |

*Le SIRET est une donnée légalement publiable, destinée aux mentions légales du site.*

### CTA figés
| Niveau | Libellé | Destination |
|---|---|---|
| Principal | Échanger avec A3 Studio | `/contact#contact` |
| Secondaire | Découvrir notre approche | `/studio` |
| Technique | Demander un audit | `/contact?objet=audit#contact` |
| RDV | Prendre rendez-vous | `/contact#contact` |
| Header | Démarrons | `/contact` |

---

## 4. Points restant à confirmer

| # | Point | Statut | Impact si non levé |
|---|---|---|---|
| C1 | `{{DOMAINE_CIBLE}}` détenu + configuré (MX/SPF/DKIM) ? | 🔴 | Email `@a3studio.fr` non délivrable ; redirection impossible |
| C2 | Mentions légales : **page intégrée** ✅ ; reste validation juridique + données manquantes (RCS, APE, TVA, hébergeur) | 🔴 | Publication interdite tant que données non confirmées |
| C3 | Politique de confidentialité : **page intégrée** ✅ ; rétention 3 ans validée ; reste prestataire e-mail réel + transferts hors UE | 🔴 | Publication interdite tant que prestataire non confirmé |
| C4 | Envoi e-mail : **code branché (Resend, envoi réel)** ✅ ; reste variables d'env + domaine expéditeur vérifié + test réel | 🔴 | Formulaire non fonctionnel tant que non configuré |
| C5 | ~~Photo réelle du fondateur~~ | ✅ Résolu | Photo fournie et intégrée (`studio-founder-sebastien.webp`) |
| C6 | Validation visuel par visuel (aucun ne suggère un projet A3) | 🟡 | Risque de crédibilité |
| C7 | ~~SIRET vérifié~~ | ✅ Résolu | SIRET `99139939500011` confirmé |
| C8 | URL LinkedIn testée (caractères accentués → encodage) | 🟡 | Lien cassé |
| C9 | Affichage de logos d'outils (Autodesk/Leica) : **non prévu en V1** (noms uniquement) | 🟢 | Sans objet tant que pas de logos |
| C10 | **Hébergeur légal** à confirmer selon le déploiement final (Vercel ≠ OVH/DNS). `LEGAL_HOST_*` + mention « à confirmer » affichée | 🔴 | Mentions légales inexactes si publié en l'état |

---

## 5. Impacts sur le design

| Décision / arbitrage | Conséquence design |
|---|---|
| A1 — Contact sans carte | Page Contact rééquilibrée : suppression du module carte → **bloc géographique sobre** (énoncé + visuel premium optionnel). Pas de pin, pas d'esthétique locale. |
| D5 — Zéro projet | Aucune galerie « réalisations ». Imagerie = process/maquette/scan/abstrait. **Système de légende** obligatoire sur tout visuel ambigu. |
| D2 — Portrait réel | Section Fondateur avec **portrait réel** de Sébastien Bertucci (`object-position` ajustable). Plus aucune variante « sans visage ». |
| D7 — CTA figés | 5 libellés → mappés sur les variantes de bouton. Aucun synonyme toléré (« Planifier un échange », etc. supprimés). |
| D14 — Header | Deux états distincts : **nav complète desktop** / **burger plein écran** mobile-tablette. |
| D15 — Logos grayscale | Traitement `filter: grayscale` + opacité ; rangée monochrome cohérente avec la DA minérale. |
| D12 — Fontes limitées | Échelle typo contrainte aux graisses disponibles (Cormorant 400/500, Inter 400/500/600). Pas de poids hors liste. |
| D8 — Pages futures masquées | Nav et footer **n'affichent pas** Études de cas / Actualités / Ressources. |
| D3 — LinkedIn seul | Footer : une seule icône sociale. Pas de rangée d'icônes. |

---

## 6. Impacts sur le code

| Décision / arbitrage | Conséquence code |
|---|---|
| A1 — Contact sans carte | **Aucune dépendance carte** en V1 (pas de clé Google Maps, gain perf + RGPD). Composant `LocationBlock` statique. |
| A2 — Domaine variables | Constantes/env (`SITE_URL`, `CONTACT_EMAIL`) ; `metadataBase` sur domaine servi ; `canonical` + OpenGraph alignés ; redirection 301 `.io`→`.fr` à activer plus tard (config Next/host). |
| D11 — Formulaire | `app/api/contact/route.ts` : validation serveur + **honeypot** + réponses succès/erreur. Clé d'envoi (Resend) en **variable d'environnement**, branchée ensuite. Email réception = `{{EMAIL_PRO}}`. |
| D10 — RDV | « Prendre rendez-vous » = lien ancre `#contact`. Pas d'intégration tierce en V1. |
| D9 — RGPD | Deux pages statiques (`/mentions-legales`, `/confidentialite`) **requises avant déploiement**. Checkbox consentement = champ requis validé. |
| D12 — Fontes | `next/font/local`, 5 fichiers woff2, sous-ensemble latin étendu, `preload` H1 + corps, `swap`. |
| D6/D5 — Images | `next/image`, `.webp/.avif` + fallback, `priority` héros uniquement, lazy ailleurs. |
| D8 — Pages futures | Routes non créées / non liées ; `sitemap.ts` ne les liste pas. |
| Général a11y/SEO | `<html lang="fr">`, métadonnées par page, `sitemap.ts` + `robots.ts`, HTML sémantique, JSON-LD `ProfessionalService` (sans fausse donnée). |

---

## 7. Risques associés

| Risque | Gravité | Mitigation |
|---|---|---|
| **Incohérence domaine** (`.io` servi, email `@.fr`) : délivrabilité, `canonical`, liens | Élevée | Confirmer C1 ; SPF/DKIM sur `.fr` ; variables + redirection 301 dès que prêt |
| **Non-publication RGPD** (mentions/politique absentes) | Élevée (bloquant) | Produire gabarits, valider durée de conservation (C2/C3) |
| **Crédibilité** : un visuel pris pour un projet A3, ou portrait/coordonnées fictifs résiduels | Élevée | Politique zéro projet + relecture visuelle (C6), zéro fictif |
| **Spam formulaire** sans envoi robuste | Moyenne | Honeypot + validation serveur ; rate-limit ; Resend (C4) |
| **Marques tierces** (logos Autodesk/Leica) | Moyenne | Mention factuelle, grayscale, sans logo déformé (C9) |
| **Lien LinkedIn accentué** cassé | Faible | Tester/encoder l'URL (C8) |
| **Perf** si fontes/images mal optimisées | Moyenne | Budget perf (Lighthouse 90+), `next/font`, `next/image` |
| **SIRET erroné** en mentions légales | Faible | Vérifier (C7) |

---

## Changelog

| Date | Version | Modification |
|---|---|---|
| 19/06/2026 | 0.1 | Création. 15 décisions verrouillées. Arbitrages A1 (Contact sans carte) et A2 (domaine en variables). Rubriques impacts design/code + risques. |
| 19/06/2026 | 0.2 | Photo réelle du fondateur intégrée (décision 2 → validée). RDV → `/contact#contact` (décision 10). Arbitrage A3 : validation Accueil + composants + utilitaires + technologies en noms + maintien placeholders + zéro visuel fictif. |
| 19/06/2026 | 0.3 | Arbitrage A4 : validation structurelle Studio. `object-position` portrait ajustable. Étapes sans chevrons. « IA & automatisation ». CTA différenciés (audit → `/contact?objet=audit#contact` + champ « Objet de la demande » prérempli). |
| 22/06/2026 | 0.4 | Arbitrage A5 : validation structurelle Expertise. Cartes domaines en 1/2/3 colonnes. Nouveau titre section Domaines. Validation approche Le réel/Le projet/L'usage. README mis à jour (statuts de pages). |
| 22/06/2026 | 0.5 | Arbitrage A6 : validation Méthode + ajustements professionnels (étapes 01/05/06, note de périmètre). CTA harmonisés. Incohérences corrigées (C5 photo, C7 SIRET, D2 portrait, décision 15 logos). Archive autonome (docs à la racine). |
| 23/06/2026 | 0.6 | Arbitrage A7 : Livrables validée. Contact finalisée (+ `ContactDetails`, `QuoteBand`, `PillarsRow` columns). Formulaire : validation accessible, limites partagées, `aria-live`, consentement + lien confidentialité, budget renommé. API : envoi réel Resend (zéro faux succès). Pages légales intégrées (`LegalPageLayout`). Hébergeur légal centralisé. Rétention 3 ans définitive. Footer terminologie. **Logo réel intégré**. |
| 23/06/2026 | 0.7 | Passe pré-audit (A8) : **ESLint configuré** (flat, lint 0 erreur). **Logo en variantes** (header/compact/footer, à valider visuellement). Hébergeur **sans défaut** (`LEGAL_HOST_*` + `LEGAL_HOST_CONFIRMED`). Champs légaux centralisés (`lib/legal`) + **`check:legal`** bloquant en prod. Confidentialité **conditionnelle** (pas d'« UE par défaut »). API : filtre liens → **422** (plus de faux succès) + validation des **valeurs autorisées**. Statut build clarifié (non vérifiable hors-ligne). |

---

## v0.7.1 — Passe de corrections visuelles Accueil (revue locale desktop)

Corrections appliquées suite à la 1re revue visuelle réelle (captures localhost, Accueil desktop). Périmètre strict : Accueil + composants globaux concernés. Audit global toujours différé. Aucune image intégrée.

**Diagnostics (vérifiés par compilation CSS) :**
- **Boutons illisibles (cause racine)** : les resets de base (`a { color: inherit }`) étaient écrits **hors `@layer`** → en CSS cascade layers, une règle non-layered l'emporte sur toute règle layered, donc elle battait les utilitaires `.text-on-dark` / `.text-ink` (les boutons sont des `<a>`). Résultat : texte héritant d'une couleur sombre (noir sur noir au header ; clair sur ivoire dans la bande sombre). **Correctif : resets enveloppés dans `@layer base`** → `.text-*` (layer utilities) priment. Confirmé : reset `a` en base (l.~97), `.text-on-dark` en utilities (l.772).
- **Piliers 2×2 / Technos 3×2 en « desktop »** : `lg:grid-cols-4/6` sont bien générés ; symptôme dû à une **largeur CSS effective < 1024px** (mise à l'échelle d'affichage, ex. 1440 à 150% = 960px). Les variantes `lg:` ne se déclenchaient pas. **Correctif : seuil desktop abaissé à `min-[900px]`** pour piliers et technos (robuste à la mise à l'échelle ; tablette 768 conserve 2/3 colonnes).

**Changements :**
1. `globals.css` — resets dans `@layer base` ; `--text-h1` max 5.75rem → **4.75rem** (~76px, cible 72–88) ; `--section-y` 140 → **96px** max (moins de vides) ; ajout token `--color-placeholder`.
2. `Media` — placeholder désormais perceptible : `border border-line bg-placeholder` (corrige le triptyque stone-sur-stone invisible).
3. `Hero` — grille **60/40** (colonne texte élargie) ; padding réduit (contenu visible en 1440×900) ; visuel **16:10** ; `text-balance` retiré (sauts imposés par les `<span>`).
4. `PillarsRow` — mobile 1 / tablette 2 / **desktop 4 dès 900px** ; filets verticaux en ligne unique uniquement.
5. `TechLogos` — **6 colonnes dès 900px** ; 3 tablette ; 2 mobile.
6. `page.tsx` (Accueil) — écart intro→triptyque `mt-14` → `mt-10` ; note Technologies recentrée (wrapper `flex justify-center`).
7. `CtaBand` — bloc texte élargi (`max-w-3xl` / `max-w-2xl`), moins de vide à droite.
8. `home.ts` — trait d'union **insécable** dans « Discutons‑en » (plus de coupure).
9. `site.ts` — téléphone **`+33 6 98 46 69 12`** (suppression du `(0)`).
10. `Footer` — signature de marque **cohérente avec le header** (variante claire) au lieu du lockup vertical « symbole + Studio ».
11. `Logo` / `Header` — signature légèrement plus présente (symbole `h-10 lg:h-11`, wordmark `1.2rem`, baseline `0.64rem`/`0.18em`) ; réglages exposés.

**Vérifs :** `tsc --noEmit` ✅ · `eslint .` ✅ (0 erreur) · CSS recompilé : `min-[900px]:grid-cols-4/6` + `bg-placeholder` générés ✅ · correctif boutons confirmé par l'ordre des layers ✅.

**Contraste des 3 variantes (corrigé) :** primaire = `#f4f2ec` sur `#111318` (~16:1) ; primaire onDark = `#111` sur `#fbfaf7` (~19:1) ; outline = `#111` sur fond clair. Tous AA/AAA.

**Reste :** validation visuelle locale par Sébastien (autres breakpoints/pages) avant audit global.

---

## v0.8 — Système d'animations premium (Priorités 1 & 2)

Langage de mouvement sobre/architectural ajouté sur l'ensemble du site. Propriétés animées : **opacity / transform uniquement** (aucun recalcul de mise en page). **Aucune dépendance ajoutée** (pas de Framer Motion) — CSS pour les micro-interactions, `IntersectionObserver` pour les révélations au scroll.

### Quatre conflits signalés (non tranchés silencieusement)
1. **Ordre des lignes du H1 (§6.1)** : le brief liste « Analyser / Anticiper / Architecturer », mais le H1 validé est « Comprendre le réel / Concevoir juste / Construire avec clarté ». Le texte n'a **pas** été altéré ; la révélation s'applique aux 3 lignes réelles.
2. **« Terracotta »** : aucun orange nouveau introduit. L'accent existant (rouge profond `#8F1D1D`), que le design system réserve aux micro-repères et à l'**état actif**, est utilisé pour les survols/états — usage conforme.
3. **« Bouton principal terracotta » (§6.7)** : contredit le primaire noir validé → **conservé noir**.
4. **Courbes terracotta de la bande CTA (§6.6)** : motif **inexistant** (moitié droite volontairement vide) → **non inventé, animation différée** jusqu'à décision sur l'asset.

### Tokens (`globals.css :root`)
`--motion-fast: 180ms` · `--motion-medium: 420ms` · `--motion-slow: 700ms` · `--motion-ease: cubic-bezier(0.22, 1, 0.36, 1)`.

### Mécanique — révélations sans-JS sûres
- Composant **`Reveal`** (`ui/Reveal.tsx`, client) : polymorphe (`as`), modes `block` / `group` (cascade) / `bare` (héros). `IntersectionObserver` déclenché **une seule fois**, déconnecté proprement. Si l'API manque → révélation immédiate.
- État caché initial appliqué **uniquement sous `<html class="js">`** (classe posée avant le 1er rendu par un script en ligne). Sans JS → contenu pleinement visible.
- **Filet de sécurité** : si le système ne s'initialise pas (échec d'hydratation) sous 2,6 s, la classe `reveal-failsafe` force la visibilité de tout le contenu. → *aucun contenu invisible si l'animation échoue.*
- **`prefers-reduced-motion: reduce`** neutralise translations, cascade et tracés (`!important`) — seuls subsistent les changements d'état immédiats.

### Composants animés
| Composant | Animation | Type |
|---|---|---|
| `Hero` | Séquence label → 3 lignes H1 → paragraphe → CTA → visuel (fondu + translation ; visuel fondu + échelle 1.02→1) | JS (déclencheur) + CSS (séquence) |
| `PillarsRow` | Cascade gauche→droite ; survol icône → accent + translation −2px | JS + CSS |
| `ImageTriptych` | Cascade ; zoom image ≤1.02 au survol (cadre `overflow-hidden`) | JS + CSS |
| `ServiceGrid` / `ServiceCard` | Cascade ; bordure accent + zoom image + flèche au survol | JS + CSS |
| `TechLogos` | Cascade rapide cellule par cellule ; filet accent au survol | JS + CSS |
| `Header` (nav) | Soulignement gauche→droite ; accent pour l'état actif | CSS |
| `Button` | Flèche +4px + transition fond/couleur au survol ; `focus-visible` | CSS |
| `Footer` | Fondu à l'entrée ; soulignement progressif des liens ; icône sociale → accent | JS + CSS |
| Sections Accueil (titres, narratif, bande CTA) | Fondu + translation à l'entrée | JS + CSS |

### Distinction CSS / JS
- **CSS pur** : tous les survols (boutons, cartes, icônes, nav, liens, zoom image), le soulignement de nav, les séquences de délais, `prefers-reduced-motion`.
- **JavaScript** (`Reveal` + `IntersectionObserver`) : uniquement le **déclenchement** des révélations au scroll (bascule de la classe `is-visible`). Aucune animation pilotée image par image en JS.

### Hors périmètre (Priorité 3 — non implémentée, en attente de validation)
Réaction du Header au scroll (au-delà de la fine bordure déjà présente), transitions entre pages, micro-parallaxe.

### Vérifs
`tsc` ✅ · `eslint .` ✅ (0 erreur) · CSS recompilé (classes custom + utilitaires animés générés) ✅ · **aucune dépendance ajoutée** (deps inchangées : lucide-react, next, react, react-dom) ✅. Poids JS : un seul petit composant client (`Reveal`) mutualisé.

---

## v0.9 — Arbitrages définitifs (image de référence validée)

Décisions **définitives** prises sur image de référence validée. Elles **remplacent** les arbitrages antérieurs en contradiction. Le système d'animations P1 + P2 (v0.8) est intégralement conservé ; P3 reste différée.

### Décisions actées
1. **Nouveau H1** : « Comprendre le réel / Concevoir juste / Construire avec clarté » → **« Analyser le réel. / Anticiper les usages. / Architecturer avec clarté. »** Modifié dans la source de contenu (`pages.ts`, `heroes.home.titleLines`), un seul `<h1>`, révélation ligne par ligne conservée. Baseline (`site.ts`) alignée sur le nouveau slogan. *(L'image de référence affichait encore l'ancien slogan ; les instructions écrites priment, conformément à la demande.)*
2. **Accent terracotta** : `--color-accent` `#8F1D1D` (rouge profond) → **`#B85C38`** ; ajout `--color-accent-hover: #A94F2D`. Le token unique fait basculer automatiquement tout l'UI déjà thématisé (nav active, survols icônes/cartes, filet techno, flèches…). L'ancien `--color-accent-ink` (inutilisé) est supprimé. Emploi avec retenue : eyebrows, petits labels, icônes, flèches, soulignements actifs, états hover, courbes CTA, **bouton principal Accueil**.
3. **Eyebrows terracotta par défaut** : `Eyebrow` rend désormais `text-accent` (conforme à l'image) ; prop `accent` retirée (FounderProfile aligné).
4. **Bouton principal Accueil** : nouvelle variante `accent` du `Button` — fond terracotta, **texte blanc**, flèche blanche, hover `#A94F2D`. Appliquée au CTA « Échanger avec A3 Studio » de l'Accueil. **« Démarrons » (Header) reste noir** (hiérarchie distincte). Boutons **secondaires** : flèche terracotta. CTA **tertiaire** : texte terracotta par défaut.
5. **Motif SVG validé** : composant décoratif original **`ArchitecturalFlowLines`** (lignes topographiques / flux / nuage de points), intégré dans la bande CTA « Un projet commence par une conversation. » — courbes fines terracotta, moitié droite, `aria-hidden`, `pointer-events:none`, full-bleed dans une section `overflow-hidden` (aucun scroll horizontal). N'imite pas l'image, en reprend l'esprit. Placeholders des autres visuels **conservés** (aucun asset fictif).
6. **Animation des courbes** : tracé progressif `stroke-dasharray`/`stroke-dashoffset` (normalisation `pathLength=1`), déclenché **une seule fois** à l'entrée (≈1500 ms), fixe ensuite, sans boucle. `prefers-reduced-motion` → motif statique immédiat. Couvert par le filet de sécurité d'hydratation.
7. **P1 + P2 conservés** ; **P3 différée** (pas de parallaxe, pas de transition de pages, pas de transformation forte du Header au scroll).

### Couleur d'erreur (clarification)
`--color-error` reste un **rouge dédié `#8F1D1D`**, désormais distinct du terracotta : sémantique d'erreur sans ambiguïté, ce n'est pas « un orange de plus ».

### Contraste WCAG (mesuré)
| Élément | Ratio | Seuil | Verdict |
|---|---|---|---|
| Bouton accent : blanc / `#B85C38` | **4.54:1** | 4.5 (texte) | ✅ AA |
| Bouton accent hover : blanc / `#A94F2D` | 5.46:1 | 4.5 | ✅ AA |
| Flèche/objet graphique terracotta / clair | 4.17:1 | 3.0 (graphique) | ✅ |
| Courbes terracotta / noir profond (décoratif) | 4.09:1 | 3.0 | ✅ |
| Texte clair / noir profond (bande CTA) | 16.6:1 | 4.5 | ✅ |
| **Eyebrows terracotta / fonds clairs** | 3.78–4.35:1 | 4.5 (petit texte) | ⚠️ sous AA petit texte |
| **CTA tertiaire terracotta / pierre** | 3.78:1 | 4.5 | ⚠️ sous AA |

⚠️ Le terracotta en **texte** sur fonds clairs (eyebrows, CTA tertiaire) est sous le seuil AA petit texte (mais au-dessus de 3:1). Implémenté conformément à la décision ; **arbitrage ouvert** : accepter en l'état, ou réserver la nuance `#A94F2D` au texte terracotta sur fond clair pour atteindre AA. Le bouton principal (exigé AA) **passe**.

---

## v1.0 — Accessibilité du terracotta : token sémantique de texte (AA atteint)

Arbitrage d'accessibilité tranché. Séparation sémantique au sein de la **même famille terracotta**, sans palette parallèle.

- **`--color-accent` `#B85C38`** (inchangé) — **éléments graphiques** : bouton principal Accueil, icônes, flèches, filets, courbes SVG, états (seuil objet graphique 3:1, satisfait).
- **`--color-accent-text` `#A94F2D`** (nouveau token sémantique) — **petits textes sur fond clair** : eyebrows, petits labels, CTA tertiaires, liens textuels terracotta, astérisques requis du formulaire, marqueur légal dev.

`--color-accent-hover` (`#A94F2D`) conserve sa sémantique propre (hover de l'aplat du bouton accent) ; même valeur que `accent-text` mais usage distinct.

### Application
`Eyebrow` (texte), `Button` variante `tertiary` (non-onDark), astérisques `*` requis du `ContactForm` (×4), marqueur `[à renseigner — non publiable]` des mentions légales → `text-accent-text`. Les **flèches** (Button secondaire, ServiceCard), **icônes** (PillarCard, LinkedIn footer) et **courbes** (`ArchitecturalFlowLines`) restent en `text-accent` `#B85C38` (graphique).

### Contraste mesuré (AA atteint)
| `accent-text` `#A94F2D` sur | Ratio | Verdict |
|---|---|---|
| sable `#F7F5F0` | 5.01:1 | ✅ AA |
| pierre `#EEEAE2` | 4.55:1 | ✅ AA |
| ivoire `#FBFAF7` | 5.23:1 | ✅ AA |

Rappel : bouton principal (blanc / `#B85C38`) 4.54:1 ✅ ; objets graphiques terracotta ≥ 4:1 (> 3:1) ✅. **Plus aucun texte terracotta sous le seuil AA.**

`tsc` ✅ · `eslint` ✅ · `text-accent-text` généré ✅. Identité visuelle inchangée (même teinte perçue, nuance de texte légèrement plus dense pour la lisibilité).

---

## v1.1 — Intégration de la banque de visuels validée

19 visuels validés intégrés dans `public/images/<section>/` (arborescence conservée), sans modifier structure, textes, design system ni animations. Portrait réel du fondateur conservé (`studio-founder-sebastien.webp`).

### Images intégrées (19)
- **Accueil (7)** : héros (`hero-architecture-augmentee`), triptyque process (`process-scan-3d`, `process-modelisation-bim`, `process-conception`), cartes expertises (`expertise-architecture`, `expertise-bim-coordination`, `expertise-scan-to-bim`).
- **Studio (1)** : héros (`hero-studio-independant`). Portrait fondateur inchangé.
- **Expertise (4)** : héros (`hero-architecture-donnee`), domaines (`domaine-scan-to-bim`, `domaine-bim-donnees`, `domaine-conception-architecturale`).
- **Méthode (1)** : héros (`hero-methode-projet`).
- **Livrables (5)** : héros (`hero-livrables-bim`), familles (`livrable-comprendre`, `livrable-modeliser`, `livrable-decider`, `livrable-transmettre`).
- **Contact (1)** : héros (`hero-contact-studio`).

### Mise en œuvre
`image.src` + `alt` descriptifs renseignés dans `pages.ts` (héros, `priority: true`), `home.ts` (triptyque + cartes expertises), `expertise.ts` (domaines), `livrables.ts` (familles). `image={h.image}` câblé sur les 6 appels `Hero`. Ratios `Media` existants conservés ; zoom léger conservé (ServiceCard, ImageTriptych). `objectPosition` laissé par défaut (centré) — à ajuster ponctuellement si un cadrage le nécessite à la revue visuelle. Alt non promotionnels : aucun visuel présenté comme une réalisation d'A3 Studio.

### Placeholders restants (1 série)
- **Méthode — 6 visuels d'étapes** (`TimelineStep` : Comprendre, Définir, Concevoir, Développer, Consulter, Réaliser & suivre) : non fournis dans la banque → restent des placeholders sobres jusqu'à intégration d'assets dédiés.

Vérifs : 20 chemins d'images résolvent (0 manquant) · `tsc` ✅ · `eslint` ✅.

---

## v1.2 — Correctif du menu mobile (chevauchement / fond non opaque)

Correction ciblée du menu mobile/tablette, sans toucher au desktop, aux contenus, aux visuels ni au design system.

### Cause technique du chevauchement
Le `<header>` applique `backdrop-blur-sm` (un `backdrop-filter`). Par spécification CSS, un `backdrop-filter` ≠ `none` (comme `filter`/`transform`) fait de l'élément le **bloc conteneur des descendants `position: fixed`**. Le `MobileMenu` (`fixed inset-0`) étant rendu **à l'intérieur** du header, son `inset: 0` se résolvait sur la barre (~72 px) au lieu du viewport : le fond opaque `bg-sand` ne couvrait que le haut, et le reste des liens débordait sans fond — laissant le Hero transparaître derrière la navigation.

### Correctif
Rendu du menu via un **portail React vers `document.body`** (hors du header) : `fixed inset-0` couvre alors tout le viewport, fond **totalement opaque** (`bg-sand`, `#F7F5F0`). Panneau : `position: fixed; inset: 0; width: 100%; height: 100dvh; z-index: 100; overflow-y: auto; overflow-x: hidden`.

### Fonctionnalités
- **Header du panneau** aligné au Header fermé (hauteur 72 px, logo à gauche) ; bouton de fermeture **44 × 44 px**, `aria-label`, focus visible, icône centrée.
- **Navigation** en colonne (6 liens), 32 px serif, pleine largeur, séparateurs fins, lien actif en **terracotta texte** (`accent-text`, AA) + petit repère « — ». Aucun contenu du Hero dans le panneau.
- **Bas** sobre : CTA « Démarrons », e-mail, LinkedIn (secondaires).
- **Scroll arrière verrouillé** (technique `body { position: fixed; top: -scrollY }` + `overflow: hidden`), **position restaurée** à la fermeture (aucun saut), pas de scroll horizontal.
- **Fermeture** : croix, clic sur un lien, `Échap`, **changement de route** (Header), et passage en largeur desktop (≥ 1024 px).
- **Focus** : placé sur la croix à l'ouverture ; **piège à focus** (Tab confiné) ; **rendu au bouton burger** après fermeture.
- **Accessibilité** : `role="dialog"`, `aria-modal`, `aria-label` ouvrir/fermer, `aria-expanded` + `aria-controls` sur le burger, contraste conforme.
- **Animation** sobre : fondu + légère translation (300 ms) + léger stagger des liens ; **`prefers-reduced-motion`** → ouverture immédiate, sans translation.

### Fichiers modifiés
`src/components/layout/MobileMenu.tsx` (réécrit), `src/components/layout/Header.tsx` (refs + fermeture au changement de route + retour focus), `src/app/globals.css` (styles d'animation du menu). Desktop et navigation desktop inchangés.

Vérifs : `tsc` ✅ · `eslint` ✅.

---

## v1.3 — Raffinages desktop de l'Accueil (piliers, Hero, rythme vertical, motif)

Ajustements ciblés sur l'Accueil, sans reconstruire la page ni modifier les textes, CTA, palette, Header desktop, footer, images ou animations P1+P2.

### 1. Piliers sur une ligne en desktop — fiabilisé
Cause du 2×2 persistant : la variante **arbitraire** `min-[900px]:grid-cols-4` n'était pas captée par le scan de contenu du build Next (les variantes standard `lg:`/`md:` le sont, d'où le bon rendu de `lg:grid-cols-[60fr_40fr]`). Remplacement par une classe `.pillars-quad` à **media-queries explicites** (globals.css), indépendante de cette détection :
- < 768px : 1 colonne ; 768–1099px : 2×2 ; ≥ 1100px : 4 colonnes sur une ligne.
- Filets verticaux **uniquement** en version 4 colonnes (`> * + *` border-left) ; aucun filet en 2×2/mobile.
- `minmax(0, 1fr)` → aucun débordement horizontal ; pas de hauteur minimale imposée.
S'applique aussi aux rangées de 4 bénéfices d'Expertise/Livrables/Méthode (même composant `columns={4}`) — comportement attendu et cohérent. `columns={3}` (Contact) inchangé.

### 2–3. Rééquilibrage et hauteur du Hero (desktop, prop `balanced`)
Nouvelle prop optionnelle `balanced` sur `Hero`, activée **uniquement** sur l'Accueil (les 5 autres héros restent en 60/40, H1 et hauteur d'origine) :
- grille desktop **55 / 45** (`lg:grid-cols-[55fr_45fr]`) → image plus présente ;
- H1 réduit de **8 %** en desktop via `--hero-h1-balanced` (`lg:[font-size:var(--hero-h1-balanced)]`) ; les **3 lignes** sont préservées (retours forcés en `<span>`), et la réduction de corps écarte le risque de retour à la ligne au rééquilibrage ;
- hauteur du héros resserrée d'environ **8 %** en desktop (clamp max 5rem → 4.6rem) ; mobile/tablette strictement inchangés ; séquence d'animation conservée.

### 4. Rythme vertical
Haut des sections « Notre approche », « Ce que nous faisons » et « Nos technologies » resserré d'environ **20 %** en desktop (`lg:pt-[var(--section-y-tight)]`, soit `--section-y * 0.8`) → chaque inter-section visée réduite d'environ **10 %**. Espacements internes (triptyque, cartes Expertises, bande CTA, footer) intacts.

### 5. Visuels — deux points documentés (à revoir avant publication)
Images conservées pour cette livraison. Deux visuels à **revoir avant mise en ligne**, à garder décrits comme **illustrations conceptuelles** (jamais comme réalisations construites d'A3 Studio) :
- triptyque « Conception » (`process-conception.webp`) ;
- carte Expertises « Architecture » (`expertise-architecture.webp`).
Textes alternatifs reformulés en conséquence (« Illustration conceptuelle … »).

### 6. Motif ArchitecturalFlowLines
Ajustement léger : courbes ancrées plus à droite (ancrage x −48 → 32, étalement gauche resserré) pour concentrer le motif dans la moitié droite et préserver une zone calme derrière texte/CTA ; visibilité très légèrement relevée (opacité de trait 0.14 → 0.16 ; conteneur lg 0.70 → 0.75). Animation de tracé, état statique final et `prefers-reduced-motion` inchangés ; bande CTA non agrandie.

### Fichiers modifiés
`src/app/globals.css` (variables `--hero-h1-balanced`/`--section-y-tight` + `.pillars-quad`), `src/components/sections/PillarsRow.tsx`, `src/components/sections/Hero.tsx`, `src/app/page.tsx`, `src/components/sections/ArchitecturalFlowLines.tsx`, `src/content/home.ts` (2 alts).

Vérifs : `tsc` ✅ · `eslint` ✅ · CSS : `grid-template-columns: 55fr 45fr`, `repeat(4)`+`border-left` @1100, `repeat(2)` @768, override H1 sous `@media (width >= 1024px)`, override `padding-top` de section — tous générés.

---

## v1.4 — Raffinages ciblés de la page Studio

Ajustements scopés à Studio. Composants partagés modifiés uniquement via prop/variante/classe dédiée ; Accueil, autres pages, Header desktop, footer, palette, portrait, visuels, destinations CTA et animations P1+P2 inchangés.

### 1. Hero Studio
H1 passé en **3 lignes contrôlées** (`pages.ts`) : « Un studio indépendant » / « pour comprendre le réel » / « et concevoir juste. » → « pour » n'est plus jamais isolé (début de la 2ᵉ ligne ; retours forcés en `<span>`). Traitement desktop via la prop **`balanced`** existante (déjà utilisée par l'Accueil, donc strictement scopée par page) : grille 55/45, H1 −8 %, hauteur du héros −8 %, sur ≥1024px uniquement ; CTA et séquence d'animation conservés.

### 2. Section Fondateur
Grille rééquilibrée **40/60 → ~38,5/61,5** (`lg:grid-cols-[5fr_8fr]`) : portrait moins dominant mais présent, alignement supérieur conservé (`items-start`), aucun recadrage du visage (ratio 4/5 inchangé), empilement mobile inchangé. Image **non** modifiée.

### 3. Texte fondateur
1ᵉʳ paragraphe reformulé : « Architecte DE HMONP, Sébastien Bertucci développe une expertise BIM depuis 2012. Il accompagne… » (2ᵉ paragraphe conservé). Repère « Expertise depuis 2012 » → « **Expertise BIM depuis 2012** ». Titre conservé « Architecte DE HMONP — BIM Manager » (pas de « Référent BIM Manager »).

### 4. Grille des 5 valeurs
Nouvelle variante `ValueRow variant="five"` → classe `.values-five` (media-queries explicites) : **1 col < 640px, 2 col 640–899, 3 col 900–1279, 5 col ≥ 1280**. Cartes à hauteur égale (ValueCard `h-full`), icônes alignées, `minmax(0,1fr)` (aucun débordement), légère interaction terracotta au survol (bord → accent, scopée). Espacements de section resserrés (~10 %, `lg:pt`). Textes inchangés.

### 5. Timeline des 5 étapes
`StepRow` réécrit en timeline éditoriale (classe `.steps-timeline`, plus de présentation 2 colonnes ni d'étape isolée) : **1 col < 640, 2 col 640–899, 3 col 900–1279, 5 colonnes sur une ligne ≥ 1280**. Fine **ligne terracotta** reliant les étapes (horizontale ≥ 1280, verticale < 640), aucune carte flottante. Révélation en cascade (stagger léger) via `Reveal mode="group"`. Étapes et descriptions inchangées.

### 6. Grille « Nos outils & écosystème »
Cause des 2 cellules grises : `lg:grid-cols-7` ne s'appliquait pas dans le build (repli `sm:grid-cols-3` → 7 items sur 3 colonnes = 2 cellules vides). Nouvelle variante `ToolGrid layout="centered"` → classe `.tools-flow` (flux centré) : **1 col < 768, 2 col 768–1099, 4 par ligne ≥ 1100 avec dernière rangée de 3 centrée**. Aucune cellule factice ni zone grise. 7 contenus, icônes et sous-titres conservés.

### 7. Espacements verticaux
Resserrement desktop (~10 %, `lg:pt-[var(--section-y-tight)]`) après le Hero (section Fondateur), avant la Vision, en tête de la timeline et avant la section Outils. Espacements internes (profil, cartes, CTA final) intacts.

### 8. « Ce qui fait la différence »
Texte et structure inchangés. Passé en `variant="five"` pour la cohérence : cartes de même hauteur (`h-full`), aucune cellule fantôme (bordures par carte, les cellules vides de grille n'affichent rien), responsive cohérent.

### Fichiers modifiés (9)
`globals.css` (`.values-five`, `.steps-timeline`, `.tools-flow`), `cards/ValueCard.tsx` (prop `className`), `sections/ValueRow.tsx` (variante `five`), `sections/ToolGrid.tsx` (layout `centered`), `sections/StepRow.tsx` (timeline), `sections/FounderProfile.tsx` (grille), `content/pages.ts` (héros), `content/studio.ts` (bio + repère), `app/studio/page.tsx`.

Vérifs : `tsc` ✅ · `eslint` ✅ · CSS : valeurs/timeline `repeat(5)`@1280, paliers 640/900, outils `calc(25%-1px)`@1100 & `calc(50%-1px)`@768, ligne terracotta @1280 + verticale <640 — tous générés.

---

## v1.5 — Raffinages ciblés de la page Expertise

Ajustements scopés à Expertise. Composants partagés modifiés uniquement via prop/variante/classe dédiée ; Accueil, Studio, menu mobile, Header desktop, footer, palette, images, destinations CTA et animations P1+P2 inchangés (hors intégration du SVG décoratif).

### 1. Hero Expertise
Nouvelle prop **`mediaForward`** sur `Hero` (distincte de `balanced`) : même rééquilibrage desktop (texte ~55 / image ~45 via `lg:grid-cols-[55fr_45fr]`, hauteur du héros resserrée ~8 % via le `padY` réduit), mais **sans** réduction du H1 (le H1 conserve `text-h1`). N'affecte que ≥1024px ; mobile/tablette inchangés ; alignement vertical (`items-center`) et animations conservés. Texte et 2 lignes du H1 inchangés. `balanced` (Accueil/Studio) strictement intact : la réduction du H1 ne s'applique que si `balanced && !mediaForward`.

### 2. Bénéfices (4)
Responsive déjà conforme (`PillarsRow columns={4}` → `.pillars-quad` : 4 col ≥1100, 2×2 768–1099, 1 col <768). Padding vertical de section resserré ~10 % en desktop via `lg:py-[var(--section-y-soft)]` (nouvelle variable `--section-y-soft = calc(var(--section-y) * 0.9)`). Icônes/titres/descriptions déjà alignés (PillarCard `items-center text-center`), séparateurs réguliers (filets verticaux `.pillars-quad`), aucune hauteur minimale forcée, aucun débordement (`max-w-[24ch]`). Textes et icônes inchangés.

### 3. Introduction des domaines
Section resserrée (~10 %) : `lg:py-[var(--section-y-soft)]` (espace au-dessus du label + padding inférieur) ; écart titre → cartes réduit ~10 % en desktop (`mt-12 lg:mt-[2.7rem]`). Label « Nos domaines d'expertise » et titre centré (traitement éditorial) conservés.

### 4. Trois cartes d'expertise
`DomainExpertiseCard` : ajout de `h-full` (hauteurs de cartes égales garanties, en complément du `stretch` de la grille) et du **zoom léger au survol** (`group` sur l'article + `zoom` sur `Media` → `group-hover:scale-[1.02]`, ≤1.02, sans ombre). Bas des cartes alignés (grille `stretch` + `h-full`) ; descriptions à 2 lignes en desktop → départs et séparateurs alignés ; ratio/hauteur d'image identiques (`aspect-[4/3]`). Textes, titres, listes et visuels inchangés (aucun texte raccourci).

### 5. Approche globale
Section resserrée (~8–10 %) : `lg:py-[var(--section-y-soft)]` (haut + bas) ; écart intro → colonnes réduit (`mt-14 lg:mt-[3.2rem]`). Responsive déjà conforme (`ThreePartProcess` : 3 col ≥640, 1 col mobile ; tablette 3 col, contenu court, sans chevauchement). Titre, paragraphe, CTA, dimensions, numéros et descriptions inchangés.

### 6. Bande CTA — ArchitecturalFlowLines
Nouvelle prop **`decoration="flow"`** sur `CtaBand` (activée uniquement sur Expertise) réutilisant `ArchitecturalFlowLines` : motif `absolute inset-y-0 right-0 w-[44%] opacity-60`, affiché `xl:block` (≥1280) — à l'écart du texte (le motif démarre après `max-w-2xl`, **aucun tracé sous le texte**) ; contenu `relative z-10` (texte/bouton au premier plan), motif derrière. Famille terracotta identique à l'Accueil, **plus discret** (opacity-60 vs 75). Tracé révélé **une seule fois** (Reveal bare), animation **1500 ms** (déjà en place, dans la plage 1200–1800), courbes fixes ensuite (transition, pas d'animation permanente). Contenu dans le conteneur → **aucun scroll horizontal**, hauteur de bande inchangée. `prefers-reduced-motion: reduce` → motif statique immédiat, sans dessin (géré dans globals.css). Texte et CTA inchangés.

Note : le contenu de `CtaBand` porte désormais `relative z-10` dans tous les cas (sans effet visuel hors variante flow) ; l'intégration du motif sur l'Accueil (au niveau de sa page) reste inchangée.

### 7. Visuel « Conception architecturale »
Visuel conservé. Texte alternatif recadré : « Illustration conceptuelle d'une démarche de conception architecturale : intérieur lumineux en pierre et bois, avec planches d'esquisses au premier plan. » → ajouté à la liste des images à revoir avant publication (voir ci-dessous).

### Fichiers modifiés (6)
`src/app/globals.css` (variable `--section-y-soft`), `src/components/sections/Hero.tsx` (prop `mediaForward`), `src/components/cards/DomainExpertiseCard.tsx` (`h-full` + `group`/`zoom`), `src/components/sections/CtaBand.tsx` (variante `decoration="flow"`), `src/content/expertise.ts` (alt Conception), `src/app/expertise/page.tsx` (héros `mediaForward`, resserrements de sections, bande CTA `decoration="flow"`).

Vérifs : `tsc` ✅ · `eslint` ✅ · CSS : `--section-y-soft` généré, `padding-block: var(--section-y-soft)` et `margin-top: 2.7rem/3.2rem` sous `@media (width >= 1024px)`, motif `width: 44%` + `display:block` @1280 + `opacity: 60%`, Hero `55fr 45fr` préservé, zoom `scale(1.02)` généré.

### Images à revoir avant publication (récapitulatif)
- Accueil : triptyque « Conception » et carte « Architecture » (alt recadrés « illustration conceptuelle »).
- Expertise : domaine « Conception architecturale » (alt recadré « illustration conceptuelle »).
- Méthode : 6 visuels d'étapes encore en placeholder (non fournis).

---

## v1.6 — Raffinages page Méthode + généralisation du motif aux bandes sombres

Ajustements scopés à Méthode + activation du décor `ArchitecturalFlowLines` sur les bandes finales sombres (composant partagé réutilisé, aucune duplication du SVG). Accueil, Studio, Expertise inchangés hors activation du décor final ; menu mobile, Header, footers, destinations CTA, images, palette et animations P1+P2 inchangés.

### 1. Hero Méthode
Héros en **3 lignes contrôlées** (`pages.ts` : « Une méthode claire » / « pour des projets » / « maîtrisés. ») + prop **`mediaForward`** (déjà introduite pour Expertise) : rééquilibrage desktop 55/45, hauteur du héros resserrée ~8 %, **H1 conservé**. N'affecte que ≥1024px ; séquence d'animation conservée ; autres héros inchangés.

### 2. Quatre principes
Renommage « Orientée résultats » → « **Orientée vers les résultats** ». Padding vertical de section resserré ~10 % en desktop (`lg:py-[var(--section-y-soft)]`). Responsive déjà conforme (`PillarsRow columns={4}` → `.pillars-quad` : 4 col ≥1100, 2×2 768–1099, 1 col <768). Icônes, textes et séparateurs conservés.

### 3. Introduction des six étapes
Titre « De l'analyse du réel à la **maîtrise** du projet. ». Les **deux mentions fusionnées en une seule phrase** secondaire (et non une alerte) : « La démarche et les livrables sont adaptés au périmètre de chaque mission et présentés ici à titre indicatif. » (paragraphe `text-body-sm text-graphite`, lisible/accessible). Espacements resserrés : `lg:pt-[var(--section-y-soft)]` (au-dessus du label), `mt-3` (titre → mention), `mt-10` (avant la première étape).

### 4. StepTimeline — variante compactEditorial
Nouvelle variante `StepTimeline variant="compactEditorial"` (scopée Méthode ; comportement par défaut inchangé). Six étapes/objectifs/livrables conservés. Desktop : grille **3/9** conservée (identité gauche / corps droit), padding vertical par étape réduit ~14 % (`py-[2.15rem]` vs `py-10`), paragraphe rapproché des listes (`mt-5`), **deux colonnes** Objectifs/Livrables conservées (`lg:grid-cols-2`), **contraste renforcé** des deux intitulés (`text-graphite` au lieu de `text-slate`), débuts de listes alignés (grille), séparateurs horizontaux conservés, largeur de lecture confortable (`max-w-prose`). **Repère chronologique** discret : court trait terracotta (`h-px w-10 bg-accent`) lié à chaque numéro 01–06. Tablette/mobile : empilement complet (identité, texte, **Objectifs et Livrables empilés** sous 1024px), aucune grille horizontale forcée, aucun scroll horizontal, contenu intégralement accessible (aucune section repliée). Aucune image ajoutée aux étapes.

### 5. Formulation expertise BIM
Section « Notre approche » : « avec une double culture d'architecte DE HMONP et une expertise BIM développée depuis 2012 » (phrase complète mise à jour). Quatre bénéfices conservés.

### 6. Deux sections de conclusion
« Créer de la valeur à chaque étape » (stone) et « Comprendre avant de concevoir » (ivory) resserrées ~10 % (`lg:py-[var(--section-y-soft)]`). Titres, paragraphes, quatre bénéfices, icônes, grilles 4 colonnes desktop et animations conservés ; sections non fusionnées.

### 7. Généralisation d'ArchitecturalFlowLines aux bandes sombres
Composant partagé réutilisé (aucune duplication). Système d'intensité **statique** (classes complètes, aucune classe Tailwind construite dynamiquement) :
```
FLOW_STRENGTH_CLASS = {
  strong:   "absolute inset-y-0 right-0 hidden w-[46%] opacity-70 xl:block",
  standard: "absolute inset-y-0 right-0 hidden w-[44%] opacity-60 xl:block",
  subtle:   "absolute inset-y-0 right-0 hidden w-[42%] opacity-45 xl:block",
}
```
- **CtaBand** : nouvelle prop `flowStrength` (défaut `standard`). **Expertise inchangé** (decoration="flow" → standard = opacity-60, identique à v1.5). **Studio, Méthode, Livrables** : `decoration="flow"` activée (standard, intensité intermédiaire cohérente).
- **QuoteBand (Contact)** : nouvelle prop `decoration="flow"` — motif **très discret en marge droite** (`w-[18%] opacity-40 xl:block`), derrière la citation centrée, à l'écart du texte (aucun tracé sous la citation).
- **Accueil** : intégration page-level conservée à l'identique (intensité forte, opacity-35/65/75 responsive).
- **Footers** : aucun motif (composant importé uniquement dans CtaBand, QuoteBand et la page Accueil).
Règles communes (héritées du composant) : motif moitié droite, texte/boutons au premier plan (`z-10`), aucune courbe sous les textes, hauteur de bande inchangée, même terracotta, `aria-hidden`, `pointer-events:none`, tracé révélé **une seule fois** (~1500 ms) puis statique, aucune animation permanente, `prefers-reduced-motion` respecté, aucun scroll horizontal (motif `absolute` dans le conteneur).

### Fichiers modifiés (10)
`src/content/pages.ts` (héros Méthode), `src/content/methode.ts` (principe, titre, mention fusionnée, BIM), `src/app/methode/page.tsx` (héros, resserrements, fusion, timeline compacte, CtaBand flow), `src/components/sections/StepTimeline.tsx` (variant), `src/components/sections/TimelineStep.tsx` (compact), `src/components/sections/CtaBand.tsx` (flowStrength), `src/components/sections/QuoteBand.tsx` (decoration flow), `src/app/studio/page.tsx` (CtaBand flow), `src/app/livrables/page.tsx` (CtaBand flow), `src/app/contact/page.tsx` (QuoteBand flow).

Vérifs : `tsc` ✅ · `eslint` ✅ · CSS : opacités 70/60/45/40 %, largeurs 46/44/42/18 %, timeline `padding-block: 2.15rem` + marqueur `mb-4`/`w-10`/`h-px`, listes `repeat(2)` @1024, héros `55fr 45fr` ; motif `ArchitecturalFlowLines` importé uniquement dans CtaBand/QuoteBand/Accueil (absent des footers). globals.css inchangé (réutilisation de `--section-y-soft` introduite en v1.5).

---

## v1.7 — Raffinages page Livrables + prop `direction` du motif partagé

Ajustements scopés à Livrables + évolution du composant partagé `ArchitecturalFlowLines` (prop `direction`, rétro-compatible). Accueil, Studio, Expertise, Méthode inchangés ; menu mobile, Header, footer, contenus des cartes, images, destinations CTA, palette et animations P1+P2 inchangés.

### 1. Hero Livrables
Héros en **3 lignes contrôlées** (`pages.ts` : « Transformer l'incertitude » / « du réel en décisions » / « claires. ») + prop **`mediaForward`** : rééquilibrage desktop 55/45, hauteur du héros resserrée ~8 %, **H1 conservé**. ≥1024px uniquement ; animation conservée ; autres héros inchangés.

### 2. Quatre bénéfices
Padding vertical de section resserré ~10 % (`lg:py-[var(--section-y-soft)]`). Responsive déjà conforme (`.pillars-quad` : 4 col ≥1100, 2×2 768–1099, 1 col <768). Textes/icônes/séparateurs conservés.

### 3. Alignement des images des 4 familles
`DeliverableFamilyCard` : ajout de `h-full` (hauteurs égales) + **bloc média repoussé en bas** (`mt-auto pt-6` au lieu de `mt-6`). Conséquence : dans chaque rangée (grille `md:grid-cols-2`, `stretch`), cartes de même hauteur, **images alignées** (même ratio `aspect-[16/10]`, même hauteur, même point de départ, bas alignés). `Comprendre`↔`Modéliser` et `Décider`↔`Transmettre` alignés. Aucun texte raccourci, aucune hauteur fixée en pixels ; titres, intros, listes, images et alts conservés. `DeliverablesGrid` inchangé (`stretch`, 2 col desktop, 1 col mobile).

### 4. Section des familles
Resserrée ~8–10 % : `lg:py-[var(--section-y-soft)]` (au-dessus du label + sous la grille), `mt-3` (titre → note), `mt-10` (note → cartes). Titre et note conservés.

### 5. Grille « Notre boîte à outils »
Cause des 2 cellules grises : `lg:grid-cols-4` non appliqué dans le build → repli `sm:grid-cols-3` (3+1). Nouvelle classe explicite **`.tools-four`** (media queries fiables, aucune classe dynamique) + `ToolGrid layout="quad"` : **1 col < 520, 2×2 entre 520–1099, 4 colonnes ≥ 1100**. Aucune cellule factice ni fond gris (4 outils remplissent exactement chaque disposition). Icônes et sous-titres conservés.

### 6. Section de cadrage
Resserrée ~8–10 % : `lg:py-[var(--section-y-soft)]` (haut + bas), `mt-10` (titre → cartes), `mt-8` (cartes → note). Cinq critères en `ValueRow variant="five"` → 1 col <640, 2 col 640–899, 3 col 900–1279, 5 col ≥1280 : cartes de même hauteur (`h-full`), icônes alignées, aucun texte coupé, 1 colonne sur mobile. Titre, critères et note conservés.

### 7. Bande CTA full-bleed (signature Accueil)
Section CTA passée en composition **full-bleed de l'Accueil** : `<Section background="dark" container={false} className="relative overflow-hidden">` + `ArchitecturalFlowLines` (motif `absolute inset-y-0 right-0 w-[72%] opacity-35 sm:w-[60%] sm:opacity-65 lg:w-[55%] lg:opacity-75`, **intensité identique à l'Accueil**, ~55 % desktop / ~60 % tablette, toute la hauteur) + `<Container className="relative z-10">` + `CtaBand` (sans `decoration` : le motif est au niveau section). Motif moitié droite, texte/CTA au premier plan, aucune courbe sous le texte, aucun scroll horizontal, hauteur de bande inchangée. La variante `CtaBand decoration="flow"` n'est plus utilisée sur Livrables (remplacée par le full-bleed).

### 8. Prop `direction` du motif partagé
`ArchitecturalFlowLines` : nouvelle prop **`direction?: "forward" | "reverse"`** (défaut `forward`). `reverse` retourne le motif horizontalement via une transformation sur le groupe SVG (`transform="translate(720 0) scale(-1 1)"`, **aucun path dupliqué**) ; tracés, points, animation de tracé, `aria-hidden`, `pointer-events:none`, `prefers-reduced-motion` et état final statique conservés. **Livrables : `direction="reverse"`** (mouvement opposé à l'Accueil, évite la répétition exacte). **Accueil : `forward`** (inchangé, ne passe pas la prop). Autres pages inchangées. Prop disponible pour les futures validations.

### Fichiers modifiés (6)
`src/app/globals.css` (`.tools-four`), `src/components/sections/ArchitecturalFlowLines.tsx` (prop `direction`), `src/components/sections/ToolGrid.tsx` (layout `quad`), `src/components/cards/DeliverableFamilyCard.tsx` (`h-full` + média `mt-auto`), `src/content/pages.ts` (héros Livrables), `src/app/livrables/page.tsx` (héros, resserrements, outils `quad`, cadrage `five`, CTA full-bleed `reverse`, imports `Container`/`ArchitecturalFlowLines`).

Vérifs : `tsc` ✅ · `eslint` ✅ · CSS : `.tools-four` (1 / repeat(2) @520 / repeat(4) @1100), `margin-top: auto` (média), `padding-block: var(--section-y-soft)` @1024 ; reverse via `transform={groupTransform}` ; Accueil `ArchitecturalFlowLines` sans `direction` (forward, inchangé).

---

## v1.8 — Raffinages page Contact + props `placement` (motif) et `align` (citation)

Ajustements scopés à Contact + évolutions rétro-compatibles de composants partagés (`ArchitecturalFlowLines` : prop `placement` ; `QuoteBand` : prop `align`). Accueil, Studio, Expertise, Méthode, Livrables inchangés ; menu mobile, Header, footer, visuel du héros, destinations CTA, palette, animations P1+P2 inchangés. Logique serveur du formulaire inchangée.

### 1. Hero Contact
Prop **`mediaForward`** : rééquilibrage desktop 55/45, hauteur du héros resserrée ~8 %, **H1 conservé** (« Parlons de votre projet. »), alignement vertical conservé. ≥1024px uniquement ; animation conservée ; autres héros inchangés.

### 2. Trois engagements
Padding vertical de section resserré ~10 % (`lg:py-[var(--section-y-soft)]`). `PillarsRow columns={3}` déjà responsive : 1 col <768, 3 col ≥768 (filets verticaux en desktop, supprimés en mobile). Icônes/titres/descriptions centrés et alignés ; aucun débordement.

### 3. Section formulaire — rééquilibrage
Grille `1fr_1.4fr` remplacée par classe explicite **`.contact-split`** : empilée <900px (largeurs auto, intro au-dessus du formulaire), **38 / 62 ≥900px** avec `align-items:start` (le haut du titre s'aligne sur le haut du formulaire). En-tête rendu **en ligne** (scopé Contact, sans modifier `SectionHeading`) : titre réduit ~6 % en desktop (`lg:[font-size:var(--text-h2-contact)]`, nouvelle variable `--text-h2-contact = calc(var(--text-h2) * 0.94)`), largeur limitée (`max-w-md`, retours élégants), espaces titre→trait→paragraphe resserrés (`mt-3`). Paragraphe conservé.

### 4. Structure visuelle du formulaire
Trois groupes légers (`fieldset`/`legend`), sans parcours multi-étapes : **Vos coordonnées** (nom, email, société, téléphone), **Votre projet** (objet, message, étape, budget), **Contexte de la demande** (source, consentement, bouton). Traitement sobre : petit label terracotta (`legend` en `text-accent-text`), filet horizontal fin entre les groupes (`border-t border-line`), espacement vertical légèrement supérieur entre groupes (`mt-10 pt-9`). Aucune carte/ombre, aucune étape cachée. Tous les champs et leur logique conservés.

### 5. Champs facultatifs identifiés
Mention discrète au-dessus du formulaire : « Les champs marqués d'un astérisque (*) sont obligatoires. ». Ajout de « (facultatif) » (en `text-slate`, plus discret) sur : Société/Organisme, Téléphone, À quelle étape, Budget prévisionnel, Comment connu A3 Studio. Champs obligatoires (nom, email, message, consentement) et astérisques conservés ; aucun nouveau champ rendu obligatoire.

### 6. Uniformité des champs
Inputs/selects/textarea partagent `fieldBase` : même hauteur (`py-3`), même bordure (`border-line`), même fond (`bg-ivory`), mêmes paddings, focus **terracotta** (`focus:border-accent` + `focus:ring-2 focus:ring-accent/35`, en remplacement du focus sombre). Textarea `rows=5` (haute sans excès). Labels associés (`htmlFor`/`id`). Mobile : champs en 1 colonne (grilles `sm:grid-cols-2` empilées <640px), aucune largeur > viewport.

### 7. Validation et états
Déjà en place et conservés : erreurs par champ (`aria-invalid` + `aria-describedby`), messages compréhensibles, conservation des données saisies en cas d'erreur, état `loading` (bouton désactivé pendant l'envoi uniquement), région `aria-live`, honeypot, autocomplete (`name`/`email`/`organization`/`tel`), aucun rechargement. **Ajouts** : garde anti-double envoi (`if (status === "submitting") return;`), confirmation de succès intégrée avec `role="status"` + `aria-live` + **focus déplacé** vers la confirmation (`tabIndex={-1}` + `useRef`). Logique serveur inchangée.

### 8. Consentement et bouton
Checkbox agrandie à **20×20px** (`h-5 w-5`), alignée en haut du texte (`items-start` + `mt-0.5`), espace `gap-3`, largeur de lecture maîtrisée (`max-w-prose`), lien politique de confidentialité visible (souligné) avec hover terracotta et focus visible (`outline-accent`). Bouton « Envoyer ma demande » conservé : fond noir, flèche, hover discret (`hover:bg-ink`), focus visible (`outline-accent`), état de chargement explicite.

### 9. Harmonisation du téléphone
`ContactDetails` affiche désormais `site.phone` = « +33 6 98 46 69 12 » (au lieu du format national), avec `href="tel:+33698466912"` (`site.phoneHref`). Email `mailto:s.bertucci@a3studio.fr`, LinkedIn en nouvel onglet sécurisé (`target="_blank" rel="noopener noreferrer"`), hover terracotta (`hover:text-accent-text` + icône `group-hover:text-accent`) et focus visible. Adresse email inchangée.

### 10. Cartes Présence / Coordonnées
`LocationBlock` : titre « Saint-Cloud » sur une ligne (`text-title-sub`), « Sur rendez-vous » en dessous, plus discret (`text-body-sm text-slate`) — fini le retour maladroit. « Zone d'intervention : Île-de-France / France » conservé. Les deux cartes en `h-full` (hauteurs égales via grille `stretch`), même padding (`p-8`), alignement supérieur identique, 2 colonnes desktop / 1 colonne mobile (`md:grid-cols-2`). Aucune carte géographique ajoutée.

### 11. Citation finale — motif full-bleed
Section passée en composition **full-bleed** (comme Accueil/Livrables) : `container={false}` + `overflow-hidden` + `ArchitecturalFlowLines` absolu (`direction="reverse"` + nouvelle prop `placement="upper-right"`, motif `w-[68%] sm:w-[58%] lg:w-[52%]`, opacités `30/55/65` — **plus visible que l'état précédent, légèrement sous l'Accueil**) + `Container` au premier plan. `QuoteBand` reçoit la prop **`align="start"`** : citation alignée à gauche, largeur limitée (`max-w-xl`) → à l'écart du motif (aucune courbe sous le texte). Texte et signature conservés. Points, animation de tracé, état statique final, `aria-hidden`, `pointer-events:none`, `prefers-reduced-motion` conservés ; aucun scroll horizontal ; hauteur de bande quasi inchangée.

### Props partagées ajoutées (rétro-compatibles)
- `ArchitecturalFlowLines` : **`placement?: "right" | "upper-right"`** (défaut `"right"` → `xMaxYMid slice`, comportement identique). `"upper-right"` → `xMaxYMin slice`. Accueil/Livrables ne passent pas `placement` → **inchangés**.
- `QuoteBand` : **`align?: "center" | "start"`** (défaut `"center"`, inchangé). `"start"` = citation à gauche, largeur limitée.

### Fichiers modifiés (7)
`src/app/globals.css` (`--text-h2-contact`, `.contact-split`), `src/components/sections/ArchitecturalFlowLines.tsx` (prop `placement`), `src/components/sections/QuoteBand.tsx` (prop `align`), `src/components/form/ContactForm.tsx` (3 groupes, facultatifs, focus terracotta, focus succès, anti-double envoi, checkbox 20px, focus bouton/lien), `src/components/sections/ContactDetails.tsx` (téléphone international, hover terracotta, focus), `src/components/sections/LocationBlock.tsx` (titre restructuré), `src/app/contact/page.tsx` (héros, resserrement, `.contact-split` + en-tête inline, cartes `h-full`, citation full-bleed).

Vérifs : `tsc` ✅ · `eslint` ✅ · CSS : `.contact-split` (38fr/62fr @900), `--text-h2-contact`, `h-5` (checkbox 20px), focus `ring-accent` + `outline-accent` (visibles), `(facultatif)` en `text-slate` ; motif Accueil/Livrables inchangé (`placement` défaut = ancien `xMaxYMid`). Téléphone : `site.phone` (+33…) + `tel:+33698466912`.

---

## v1.9 — Retrait du « / », baseline footer sur 3 lignes, carte Présence, signature Logo en mobile

Ajustements transversaux demandés (toutes pages). Header desktop, menu mobile, destinations CTA, palette, animations P1+P2 inchangés.

### 1. Suppression de la barre oblique « / » (toutes pages)
L'élément décoratif `SlashRule` est retiré de tous ses points d'usage : héros (toutes pages), bandes CTA (`CtaBand`), `NarrativeSplit`, `SectionHeading` (prop `slash` supprimée — aucun appelant ne l'utilisait), page 404 et en-tête de la section formulaire (Contact). Espacements reportés pour conserver le rythme : héros → bloc intro `mt-6` ; `CtaBand` → paragraphe `mt-6` ; 404 → paragraphe `mt-6` ; Contact → paragraphe `mt-5`. Le composant `SlashRule.tsx` est conservé mais n'est plus importé (réversible).

### 2. Baseline du footer sur trois lignes
Ajout de `site.baselineLines = ["Analyser le réel.", "Anticiper les usages.", "Architecturer avec clarté."]`. Le footer rend désormais chaque phrase sur sa propre ligne (`<span class="block">`), au lieu d'une phrase unique qui repliait librement. `site.baseline` (chaîne) conservé.

### 3 & 4. Carte « Présence » (Contact)
Reformulée pour refléter une présence régionale (et non une réception au domicile de Saint-Cloud) :
- Eyebrow « Présence ».
- Tête : **« Île-de-France »** en serif réduit (`text-[1.5rem]`, plus petit que l'ancien `text-title-sub`).
- « Sur rendez-vous » (discret).
- Mention secondaire plus petite : **« Basé à Saint-Cloud »** (Saint-Cloud conservé mais nettement réduit).
- Ligne « Zone d'intervention : Île-de-France / France » supprimée (redondante avec la tête). `site.location` inchangé (city/mode/zone toujours disponibles, ex. JSON-LD).
> À valider : wording proposé. Alternatives possibles si Sébastien préfère (a) garder « Saint-Cloud » en tête mais plus petit, ou (b) ne pas afficher Saint-Cloud du tout.

### 5. Signature « A3 Studio / Architecture augmentée » en version mobile
Dans `Logo` (variante `header`), la baseline « Architecture augmentée » était masquée sous 640px (`hidden sm:block`). Elle est désormais **toujours visible** (`block`), en mobile comme en desktop. S'applique au header **et** au footer (qui réutilisent la variante `header`). Aucune autre modification du Header/Footer.

### Fichiers modifiés (10)
`Hero.tsx`, `CtaBand.tsx`, `NarrativeSplit.tsx`, `SectionHeading.tsx`, `app/not-found.tsx`, `app/contact/page.tsx` (retrait « / » + espacements), `content/site.ts` (`baselineLines`), `layout/Footer.tsx` (3 lignes), `sections/LocationBlock.tsx` (Présence reformulée), `ui/Logo.tsx` (baseline visible en mobile). `ui/SlashRule.tsx` conservé mais inutilisé.

Vérifs : `tsc` ✅ · `eslint` ✅ (aucun import orphelin) · plus aucun usage/import de `SlashRule` hors composant ; Logo baseline en `block` ; footer `baselineLines.map` ; CSS recompilé (serif OK).

---

## v2.0 — Accueil : H1 desktop « Architecturer avec clarté. » sur une ligne + label « Accueil »

Deux ajustements strictement scopés à l'Accueil. Aucune autre page, ni le mobile, ni le reste de l'Accueil ne sont modifiés.

### 1. H1 desktop sur trois lignes (3ᵉ ligne non coupée)
La 3ᵉ ligne « Architecturer avec clarté. » repliait en desktop (colonne 55 % trop étroite pour le corps du H1). Le texte et les 3 lignes contrôlées sont conservés. Correctif **propre à l'Accueil** : nouvelle taille H1 desktop fluide `--hero-h1-home: clamp(2.5rem, 4.6vw - 0.25rem, 4rem)`, calée sur la largeur réelle de la colonne (police Cormorant Garamond, advance ≈ 0,40, gouttières `clamp(20→72px)`). Elle garantit une seule ligne **de 1024px à ultra-large** (au cas contraignant ~1024px la colonne ≈ 490px ; au-delà la taille croît jusqu'au plafond 4rem ≈ ce qui tient à 1440). Appliquée via une nouvelle prop `Hero tightH1` (utilisée avec `balanced`, qui fournit la grille 55/45). **N'affecte que ≥1024px** : le mobile garde `text-h1`. **Studio inchangé** (toujours `--hero-h1-balanced` = 92 %, car il ne passe pas `tightH1`). Grille 55/45, visuel, sections et animations de l'Accueil inchangés.

### 2. Label du héros : « Accueil »
`heroes.home.label` passe de « Architecture augmentée » à **« Accueil »** (eyebrow terracotta du héros). Cohérent avec les autres pages (dont l'eyebrow porte le nom de la page). « Architecture augmentée » reste la signature/baseline ailleurs (logo, footer, SEO).

### Fichiers modifiés (4)
`src/app/globals.css` (`--hero-h1-home`), `src/components/sections/Hero.tsx` (prop `tightH1`), `src/app/page.tsx` (`tightH1` sur le héros Accueil), `src/content/pages.ts` (`heroes.home.label` = « Accueil »).

Vérifs : `tsc` ✅ · `eslint` ✅ · CSS : `--hero-h1-home` (clamp) présent, `font-size: var(--hero-h1-home)` appliqué @1024, `--hero-h1-balanced` toujours présent (Studio). `tightH1` présent uniquement sur l'Accueil (Studio = 0). Label = « Accueil ».
