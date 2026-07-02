/**
 * A3 Studio — Configuration centrale du site.
 * Source unique de vérité pour les variables (domaine, email, téléphone, légal),
 * la navigation et les libellés de CTA.
 * Aucune donnée fictive : voir DECISIONS_A3_STUDIO.md.
 */

export const site = {
  name: "A3 Studio",
  tagline: "Architecture augmentée",
  baseline: "Analyser le réel. Anticiper les usages. Architecturer avec clarté.",
  baselineLines: ["Analyser le réel.", "Anticiper les usages.", "Architecturer avec clarté."],

  // Domaine : V1 servi sur a3studio.io — cible a3studio.fr (cf. arbitrage A2)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.a3studio.io",
  targetDomain: "a3studio.fr",

  // Coordonnées (source unique)
  email: "contact@a3studio.io",
  phone: "+33 6 98 46 69 12",
  phoneNational: "06 98 46 69 12",
  phoneHref: "tel:+33698466912",
  linkedin: "https://www.linkedin.com/in/sébastien-bertucci-77523326",

  // Présence géographique (arbitrage A1 : pas d'adresse frontale ni de carte en V1)
  location: {
    city: "Saint-Cloud",
    mode: "sur rendez-vous",
    zone: "Île-de-France / France",
  },

  founder: {
    name: "Sébastien Bertucci",
    title: "Architecte DE HMONP — BIM Manager",
    since: "depuis 2012",
  },

  // Données légales. Les champs CONFIRMÉS sont en dur ; les champs NON confirmés
  // proviennent exclusivement de variables d'environnement (aucune valeur par défaut
  // trompeuse). Un champ vide = non publiable (cf. lib/legal + script check:legal).
  legal: {
    form: "SASU",
    capital: "1 000 €",
    siret: "99139939500011",
    siren: "991 399 395",
    siege: "21 Parc de la Bérengère, 92210 Saint-Cloud, France",
    rcs: process.env.LEGAL_RCS ?? "",
    ape: process.env.LEGAL_APE ?? "",
    tva: process.env.LEGAL_TVA ?? "",
    // Hébergeur RÉEL du site ≠ fournisseur DNS/domaine. Source de vérité = env.
    host: {
      name: process.env.LEGAL_HOST_NAME ?? "",
      address: process.env.LEGAL_HOST_ADDRESS ?? "",
      confirmed: process.env.LEGAL_HOST_CONFIRMED === "true",
    },
  },

  // SEO global (cf. fichier brief SEO)
  defaultTitle: "A3 Studio — Architecture augmentée, BIM & Scan-to-BIM",
  defaultDescription:
    "A3 Studio accompagne les porteurs de projets dans la compréhension de l'existant, la modélisation BIM, le Scan-to-BIM et la conception architecturale.",
} as const;

/** Navigation principale (pages futures masquées tant que vides — décision 8). */
export const nav = [
  { label: "Accueil", href: "/" },
  { label: "Studio", href: "/studio" },
  { label: "Expertise", href: "/expertise" },
  { label: "Méthode", href: "/methode" },
  { label: "Livrables", href: "/livrables" },
  { label: "Contact", href: "/contact" },
] as const;

/** Liens d'expertise affichés en footer (mappés sur les services réels). */
export const footerExpertise = [
  "Bâtiments existants",
  "Scan-to-BIM",
  "Modélisation BIM",
  "Analyse & diagnostic architectural",
  "Accompagnement & conseil",
] as const;

/** CTA figés (gouvernance décision 7). Aucun synonyme toléré. */
export const cta = {
  primary: { label: "Échanger avec A3 Studio", href: "/contact#contact" },
  secondary: { label: "Découvrir notre approche", href: "/studio" },
  technical: { label: "Demander un audit", href: "/contact?objet=audit#contact" },
  rdv: { label: "Prendre rendez-vous", href: "/contact#contact" },
  header: { label: "Démarrons", href: "/contact" },
} as const;
