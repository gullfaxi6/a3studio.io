/**
 * Contenu éditorial par page — séparé du markup.
 * Héros : label, titre, intro, CTA et visuel (priority pour le LCP du héros).
 * Les alt décrivent le contenu visuel sans présenter les images comme des
 * réalisations d'A3 Studio (visuels d'ambiance / process).
 */

export type HeroContent = {
  label: string;
  titleLines: string[]; // rendu en un seul <h1> avec <br>
  intro: string;
  ctas?: { label: string; href: string; variant?: "primary" | "secondary" | "tertiary" | "accent" }[];
  image?: { src: string; alt: string; priority?: boolean };
};

export const heroes: Record<string, HeroContent> = {
  home: {
    label: "Accueil",
    titleLines: ["Analyser le réel.", "Anticiper les usages.", "Architecturer avec clarté."],
    intro:
      "A3 Studio accompagne les porteurs de projets dans la compréhension de l'existant, la modélisation BIM et la conception architecturale pour des décisions éclairées et des réalisations maîtrisées.",
    ctas: [
      { label: "Échanger avec A3 Studio", href: "/contact#contact", variant: "accent" },
      { label: "Découvrir notre approche", href: "/studio", variant: "secondary" },
    ],
    image: {
      src: "/images/accueil/hero-architecture-augmentee.webp",
      alt: "Bureau d'architecte lumineux : maquette physique, tablette affichant une maquette BIM et silhouette d'un bâtiment en nuage de points.",
      priority: true,
    },
  },

  studio: {
    label: "Studio",
    titleLines: ["Un studio indépendant", "pour comprendre le réel", "et concevoir juste."],
    intro:
      "A3 Studio réunit architecture, BIM, Scan-to-BIM et analyse stratégique pour transformer la complexité de l'existant en décisions claires et en projets fiables.",
    ctas: [
      { label: "Découvrir notre approche", href: "/methode", variant: "primary" },
      { label: "Échanger avec A3 Studio", href: "/contact#contact", variant: "secondary" },
    ],
    image: {
      src: "/images/studio/hero-studio-independant.webp",
      alt: "Plan de travail d'architecte dans une lumière chaude : ordinateur portable affichant une maquette BIM, maquette physique et bâtiment en nuage de points.",
      priority: true,
    },
  },

  expertise: {
    label: "Expertise",
    titleLines: ["L'architecture augmentée", "par la donnée."],
    intro:
      "Nous mobilisons le BIM, le Scan-to-BIM et une approche architecturale rigoureuse pour comprendre l'existant, éclairer les décisions et sécuriser chaque étape de votre projet.",
    image: {
      src: "/images/expertise/hero-architecture-donnee.webp",
      alt: "Bureau d'architecte : maquette BIM à l'écran, maquette physique et structure d'un bâtiment en nuage de points lumineux.",
      priority: true,
    },
  },

  methode: {
    label: "Méthode",
    titleLines: ["Une méthode claire", "pour des projets", "maîtrisés."],
    intro:
      "Notre méthode structurée s'adapte à la réalité de chaque projet. Elle garantit une compréhension fine du réel, des décisions éclairées et une exécution sereine, de la première analyse à la livraison.",
    image: {
      src: "/images/methode/hero-methode-projet.webp",
      alt: "Progression du relevé à la conception : nuage de points, maquette de l'existant, maquette filaire, plans et échantillons de matériaux.",
      priority: true,
    },
  },

  livrables: {
    label: "Livrables",
    titleLines: ["Transformer l'incertitude", "du réel en décisions", "claires."],
    intro:
      "Nos livrables structurent chaque étape du projet : comprendre l'existant, modéliser avec précision, évaluer les scénarios et transmettre des informations fiables pour agir avec confiance.",
    image: {
      src: "/images/livrables/hero-livrables-bim.webp",
      alt: "Vue d'ensemble de livrables : nuage de points, maquette en coupe, plans imprimés et dossier relié, avec échantillons de matériaux.",
      priority: true,
    },
  },

  contact: {
    label: "Contact",
    titleLines: ["Parlons de votre projet."],
    intro:
      "Chaque projet commence par une conversation. Vous avez une idée, un bâtiment à comprendre, des décisions à prendre ? Échangeons ensemble pour y voir plus clair.",
    image: {
      src: "/images/contact/hero-contact-studio.webp",
      alt: "Bureau d'atelier calme et minéral : maquette blanche, tablette affichant une élévation et échantillons de matériaux dans une lumière douce.",
      priority: true,
    },
  },
};
