/**
 * Contenu de la page Expertise — séparé du markup.
 * Aucun projet, client ou référence fictifs. Visuels en placeholders.
 * Le héros est défini dans pages.ts (heroes.expertise).
 */

import { cta } from "./site";
import { frDeep } from "@/lib/typo";

export const expertise = frDeep({
  // 4 bénéfices (icône + titre + une ligne) — réutilise PillarsRow
  benefits: [
    { icon: "scan", title: "Compréhension fine", text: "du réel et de son contexte." },
    { icon: "box", title: "Modélisation intelligente", text: "pour décider avec précision." },
    { icon: "target", title: "Décisions éclairées", text: "grâce à des données fiables." },
    { icon: "shield", title: "Projets sécurisés", text: "de la conception à la réalisation." },
  ],

  // 3 domaines détaillés (média + titre + description + livrables)
  domains: {
    eyebrow: "Nos domaines d'expertise",
    title: "Des expertises complémentaires pour comprendre, concevoir et transmettre.",
    items: [
      {
        title: "Scan-to-BIM",
        description:
          "Relevés 3D haute précision et modélisation de l'existant pour obtenir une base fiable et exploitable.",
        deliverables: [
          "Relevés laser 3D",
          "Nuages de points colorisés",
          "Modélisation BIM de l'existant",
          "Plans, coupes, élévations fiables",
        ],
        image: {
          src: "/images/expertise/domaine-scan-to-bim.webp",
          alt: "Salon classique relevé au scanner laser, nuage de points dense des boiseries, de la cheminée et du miroir.",
        },
      },
      {
        title: "BIM & données",
        description:
          "Maquettes BIM intelligentes et structurées pour analyser, coordonner et anticiper les contraintes.",
        deliverables: [
          "Modélisation BIM adaptée au niveau de détail",
          "Coordination technique",
          "Détection des conflits",
          "Extraction et structuration des données",
        ],
        image: {
          src: "/images/expertise/domaine-bim-donnees.webp",
          alt: "Maquette BIM en coupe d'un immeuble haussmannien montrant les réseaux fluides et la donnée technique.",
        },
      },
      {
        title: "Conception architecturale",
        description:
          "Conception juste et contextualisée, de l'étude de faisabilité à la réalisation.",
        deliverables: [
          "Études de faisabilité",
          "Conception architecturale",
          "Documentation technique",
          "Suivi et accompagnement de projet",
        ],
        image: {
          src: "/images/expertise/domaine-conception-architecturale.webp",
          alt: "Illustration conceptuelle d'une démarche de conception architecturale : intérieur lumineux en pierre et bois, avec planches d'esquisses au premier plan.",
        },
      },
    ],
  },

  // Approche globale : Le réel / Le projet / L'usage
  approach: {
    eyebrow: "Une approche globale",
    title: "Relier le réel, la conception et l'usage.",
    body:
      "Notre approche relie trois dimensions essentielles pour garantir des projets pertinents, durables et maîtrisés.",
    cta: { label: "Découvrir notre méthode", href: "/methode" },
    steps: [
      {
        icon: "scan",
        label: "Le réel",
        sub: "Comprendre",
        number: "01",
        caption: "Analyser l'existant avec précision pour révéler le potentiel et les contraintes.",
      },
      {
        icon: "pen",
        label: "Le projet",
        sub: "Concevoir",
        number: "02",
        caption: "Concevoir des solutions justes, adaptées au contexte et aux usages.",
      },
      {
        icon: "handshake",
        label: "L'usage",
        sub: "Transmettre",
        number: "03",
        caption: "Transmettre une information claire pour construire, exploiter et faire vivre le projet.",
      },
    ],
  },

  ctaBand: {
    title: "Un projet à clarifier ?",
    text: "Échangeons sur vos enjeux. Nous vous aidons à y voir clair et à avancer avec confiance.",
    cta: cta.rdv, // Prendre rendez-vous → /contact#contact
  },
});
