# A3 Studio — Socle technique (noyau)

Site vitrine A3 Studio. **Next.js (App Router) + TypeScript + Tailwind CSS v4.**
Source de vérité du design : `A3_STUDIO_DESIGN_SYSTEM_v1.0.md`. Décisions : `DECISIONS_A3_STUDIO.md`.

> Base de production : tokens, layout, composants, contenus typés dans `/content`.

## État des pages

| Page | Route | État |
|---|---|---|
| Accueil | `/` | ✅ Complète |
| Studio | `/studio` | ✅ Complète |
| Expertise | `/expertise` | ✅ Complète |
| Méthode | `/methode` | ✅ Complète |
| Livrables | `/livrables` | ✅ Complète |
| Contact | `/contact` | ✅ Complète |
| Mentions légales / Confidentialité | `/mentions-legales`, `/confidentialite` | ✅ Intégrées (contenu réel) |

*Pages complètes sous réserve de vérification visuelle en local (1440 / 1280 / 768 / 390 px).*

## Démarrage

```bash
npm install
cp .env.example .env.local   # renseigner NEXT_PUBLIC_SITE_URL, etc.
npm run dev                  # http://localhost:3000
npm run lint                 # ESLint (Next + React + Hooks + TS)
npm run check:legal          # contrôle prépublication des infos légales
```

## Structure

```
src/
├── app/
│   ├── layout.tsx              # lang fr, fonts auto-hébergées, Header/Footer, skip-link, JSON-LD
│   ├── globals.css             # tokens @theme (Tailwind v4) + base + accessibilité
│   ├── page.tsx                # Accueil — complète
│   ├── studio/page.tsx         # Studio — complète
│   ├── expertise/page.tsx      # Expertise — complète
│   ├── methode/page.tsx        # Méthode — complète
│   ├── livrables/page.tsx      # Livrables — complète
│   ├── contact/page.tsx        # Contact — complète (bénéfices, RDV, formulaire, coordonnées, citation)
│   ├── mentions-legales|confidentialite/page.tsx     # pages légales intégrées (LegalPageLayout)
│   ├── not-found.tsx · sitemap.ts · robots.ts
│   └── api/contact/route.ts    # honeypot + validation + envoi réel Resend (zéro faux succès)
├── components/
│   ├── layout/  Header · MobileMenu · Footer
│   ├── ui/      Button · Container · Section · SectionHeading · SectionLabel · Eyebrow · SlashRule · Icon · Media
│   ├── cards/   PillarCard · ServiceCard · ValueCard · ToolCard · DomainExpertiseCard
│   ├── sections/ Hero · LocationBlock · PillarsRow · NarrativeSplit · ImageTriptych · ServiceGrid ·
│   │             TechLogos · CtaBand · FounderProfile · ValueRow · StepRow · ToolGrid ·
│   │             ExpertiseDomainsGrid · ThreePartProcess · StepTimeline · TimelineStep
│   └── form/    ContactForm (validation accessible, limites partagées, aria-live, ?objet= prérempli)
├── content/  site.ts · pages.ts (héros) · home.ts · studio.ts · expertise.ts · methode.ts · contact.ts
└── lib/      seo.ts (métadonnées + JSON-LD) · legal.ts (complétude légale : dev marque / prod masque)
eslint.config.mjs              # flat config (Next + React + Hooks + TS)
scripts/check-legal.mjs        # contrôle prépublication (bloquant en production)
```

## Variables (centralisées dans `src/content/site.ts` et `.env`)

- **Domaine** : `NEXT_PUBLIC_SITE_URL` (V1 `a3studio.io`, cible `a3studio.fr`).
- **Email** : `s.bertucci@a3studio.fr`. **Téléphone** : `+33 (0)6 98 46 69 12`.
- **Données légales confirmées** : SASU, SIRET, SIREN, siège (en dur dans `site.legal`).
- **Données légales NON confirmées** (env, aucun défaut) : `LEGAL_RCS`, `LEGAL_APE`, `LEGAL_TVA`, `LEGAL_HOST_NAME`, `LEGAL_HOST_ADDRESS`, `LEGAL_HOST_CONFIRMED`. Vides → « non publiable » en dev, masquées en prod, `check:legal` échoue en production.
- **Formulaire e-mail** : `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (= `s.bertucci@a3studio.fr`), `CONTACT_FROM_EMAIL` (domaine vérifié). Sans ces variables, l'API renvoie une erreur (jamais un faux succès).

## Principes respectés dès le socle

- **Design system = source de vérité** : toutes les valeurs viennent des tokens `@theme`.
- **Accessibilité** : `lang="fr"`, skip-link, focus visible, labels réels, `prefers-reduced-motion`, burger accessible (Échap, `aria-expanded`).
- **SEO** : métadonnées par page + `canonical`, `sitemap.ts`/`robots.ts`, JSON-LD `ProfessionalService` sans fausse donnée.
- **Responsive** : conteneur fluide, héros split → empilé, breakpoints du design system.
- **Zéro fictif** : aucun faux nom/projet, aucun visuel fictif (placeholder sobre quand l'image manque), coordonnées réelles.
- **Arbitrage A1** : `LocationBlock` (Saint-Cloud — sur rendez-vous + zone), **aucune carte / dépendance Maps** en V1. Adresse complète réservée au légal.

## Tailwind v4 / v3

Le projet utilise **Tailwind v4** (config CSS-first via `@theme` dans `globals.css`).
Pour un projet existant en **v3**, reporter les valeurs de `@theme` dans `tailwind.config.ts`
(`theme.extend.colors / fontFamily / fontSize / spacing / screens / borderRadius / transitionTimingFunction`),
même palette et même nommage (cf. design system §19).

## Documentation (à la racine)

- `DECISIONS_A3_STUDIO.md` — journal de décisions versionné (référentiel des choix).
- `A3_STUDIO_DESIGN_SYSTEM_v1.0.md` — design system (source de vérité visuelle).
- `MENTIONS_LEGALES.md` · `POLITIQUE_CONFIDENTIALITE.md` — gabarits légaux (à intégrer/valider avant publication).

## Statut des vérifications

- **Type-check** : ✅ `tsc --noEmit` 0 erreur.
- **Lint** : ✅ `eslint .` 0 erreur (68 fichiers).
- **Build de production** : ⚠️ non vérifiable hors-ligne — `next/font` télécharge les polices Google au build (réseau bloqué dans l'environnement de génération). **À confirmer en local ou sur Vercel Preview.**
- **Logo** : variantes `header` / `compact` / `footer` en place ; **tailles à valider visuellement** (pas d'asset horizontal officiel).
- **Validation visuelle globale** (1440 / 1280 / 768 / 390 px) : à effectuer.

## Prochaines étapes

1. **Six pages principales complètes** (Accueil, Studio, Expertise, Méthode, Livrables, Contact) + pages légales intégrées.
2. **Envoi e-mail** : code branché (Resend) — renseigner `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (domaine expéditeur vérifié) puis tester la réception réelle. **Bloquant** tant que non configuré.
3. **Compléter les données légales** (`LEGAL_RCS`, `LEGAL_APE`, `LEGAL_TVA`, `LEGAL_HOST_*`) — `npm run check:legal` doit passer avant publication.
4. Intégrer les **assets visuels réels** validés (règle zéro projet) + valider le rendu du logo.
