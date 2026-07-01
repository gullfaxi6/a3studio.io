/**
 * Contenu des sections de la page Accueil — séparé du markup.
 * Textes issus du brief approuvé. Aucun projet, client ou référence fictifs.
 * Le héros est défini dans pages.ts (heroes.home).
 */

import { cta } from "./site";
import { frDeep } from "@/lib/typo";

export const home = frDeep({
  // 4 piliers (icône + titre + une ligne)
  pillars: [
    { icon: "scan", title: "Existant", text: "Relevés 3D et analyse fine du bâti et de son contexte." },
    { icon: "box", title: "BIM & données", text: "Maquettes intelligentes pour comprendre, décider et transmettre." },
    { icon: "pen", title: "Conception", text: "Solutions architecturales justes, adaptées et durables." },
    { icon: "handshake", title: "Accompagnement", text: "De l'idée à la réalisation, un partenaire engagé à vos côtés." },
  ],

  // Section narrative « Notre approche »
  approche: {
    eyebrow: "Notre approche",
    title: "Transformer la complexité du réel en décisions claires.",
    body:
      "A3 Studio place la donnée et la compréhension de l'existant au cœur de chaque projet. Grâce au BIM, au Scan-to-BIM et à une approche collaborative, nous sécurisons vos choix et optimisons chaque étape.",
    cta: { label: "Découvrir notre méthode", href: "/methode" },
  },

  // Triptyque process (Scan 3D / Modélisation BIM / Conception)
  triptych: [
    {
      title: "Scan 3D",
      caption: "Capter le réel avec précision.",
      image: {
        src: "/images/accueil/process-scan-3d.webp",
        alt: "Scanner laser 3D relevant un grand escalier classique, nuage de points superposé à l'espace réel.",
      },
    },
    {
      title: "Modélisation BIM",
      caption: "Structurer la donnée du bâti.",
      image: {
        src: "/images/accueil/process-modelisation-bim.webp",
        alt: "Maquette BIM filaire d'un bâtiment montrant la structure et les réseaux techniques.",
      },
    },
    {
      title: "Conception",
      caption: "Concevoir des solutions justes.",
      image: {
        src: "/images/accueil/process-conception.webp",
        alt: "Illustration conceptuelle mêlant esquisse architecturale et intérieur minéral baigné de lumière.",
      },
    },
  ],

  // Expertises (3 cartes)
  expertises: {
    eyebrow: "Ce que nous faisons",
    title: "Des expertises complémentaires au service de vos projets.",
    items: [
      {
        title: "Architecture",
        text: "Conception architecturale et suivi de chantier, pour des réalisations cohérentes et durables.",
        href: "/expertise",
        image: {
          src: "/images/accueil/expertise-architecture.webp",
          alt: "Illustration conceptuelle d'un patio intérieur en bois et pierre, baigné de lumière naturelle.",
        },
      },
      {
        title: "BIM & coordination",
        text: "Maquettes BIM, coordination technique et gestion des données, pour plus de fiabilité et d'efficacité.",
        href: "/expertise",
        image: {
          src: "/images/accueil/expertise-bim-coordination.webp",
          alt: "Dessin axonométrique d'un bâtiment révélant la structure et les réseaux techniques coordonnés.",
        },
      },
      {
        title: "Scan-to-BIM",
        text: "Relevés 3D et modélisation de l'existant, pour une base fiable et exploitable.",
        href: "/expertise",
        image: {
          src: "/images/accueil/expertise-scan-to-bim.webp",
          alt: "Bâtiment patrimonial relevé au scanner laser, nuage de points superposé à la façade au lever du jour.",
        },
      },
    ],
  },

  // Technologies (outils utilisés, présentés à titre indicatif)
  technologies: {
    eyebrow: "Nos technologies",
    title: "Des outils de pointe pour des résultats précis.",
    note: "Outils utilisés au quotidien, présentés à titre indicatif.",
    tools: [
      { brand: "Autodesk", product: "Revit" },
      { brand: "Autodesk", product: "Navisworks" },
      { brand: "Autodesk", product: "Recap" },
      { brand: "Autodesk", product: "Construction Cloud" },
      { brand: "Leica", product: "Cyclone" },
      { brand: "Autodesk", product: "AutoCAD" },
    ],
  },

  // Bande CTA finale
  ctaBand: {
    title: "Faisons connaissance autour de votre projet.",
    text: "Vous avez une idée, une problématique ou un bâtiment à comprendre ? Discutons‑en.",
    cta: cta.rdv,
  },
});
