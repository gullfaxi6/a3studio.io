/**
 * Contenu de la page Studio — séparé du markup.
 * Fondateur réel (Sébastien Bertucci), aucune référence/projet/client fictifs.
 * Le héros est défini dans pages.ts (heroes.studio).
 */

import { site, cta } from "./site";
import { frDeep } from "@/lib/typo";

export const studio = frDeep({
  founder: {
    eyebrow: "Fondateur",
    name: site.founder.name, // Sébastien Bertucci
    title: site.founder.title, // Architecte DE HMONP — BIM Manager
    bio:
      "Architecte DE HMONP, Sébastien Bertucci développe une expertise BIM depuis 2012. Il accompagne les maîtres d'ouvrage, architectes, entreprises et porteurs de projets dans la compréhension de l'existant, la coordination technique et la conception de projets maîtrisés.",
    complement:
      "A3 Studio est né de la conviction qu'une approche indépendante, rigoureuse et sur mesure permet de révéler le potentiel des bâtiments existants et de simplifier la transformation.",
    image: {
      src: "/images/studio-founder-sebastien.webp",
      alt: "Portrait de Sébastien Bertucci, architecte DE HMONP et BIM Manager, fondateur d'A3 Studio.",
    },
    // Cadrage ajustable après vérification visuelle (desktop / tablette / mobile).
    objectPosition: "center 15%",
    indicators: [
      { icon: "building", label: "Architecte DE HMONP" },
      { icon: "box", label: "BIM Manager" },
      { icon: "clock", label: "Expertise BIM depuis 2012" },
      { icon: "compass", label: "Approche sur mesure" },
    ],
  },

  vision: {
    eyebrow: "Notre vision",
    title: "Mettre la donnée, le réel et l'architecture au service de décisions plus justes.",
    values: [
      { icon: "target", title: "Précision", text: "Des relevés fiables et des modèles précis pour une lecture juste du réel." },
      { icon: "eye", title: "Clarté", text: "Des livrables lisibles et structurés pour faciliter les décisions." },
      { icon: "ruler", title: "Rigueur", text: "Une méthode exigeante à chaque étape du processus." },
      { icon: "sparkles", title: "Innovation", text: "Les technologies au service de l'architecture et de l'existant." },
      { icon: "users", title: "Humanité", text: "Une collaboration de confiance, à l'écoute des usages et des enjeux." },
    ],
  },

  steps: {
    eyebrow: "Notre approche en 5 étapes",
    items: [
      { number: "01", title: "Comprendre", text: "Analyser le contexte, les enjeux et vos objectifs pour poser les bonnes questions." },
      { number: "02", title: "Relever", text: "Scan 3D et relevés sur site pour capturer le réel avec précision." },
      { number: "03", title: "Modéliser", text: "Modélisation BIM fidèle et structurée pour une base de travail fiable." },
      { number: "04", title: "Analyser", text: "Analyses techniques, spatiales et réglementaires pour éclairer vos choix." },
      { number: "05", title: "Accompagner", text: "Un accompagnement jusqu'à la mise en œuvre et tout au long du projet." },
    ],
  },

  difference: {
    eyebrow: "Ce qui fait la différence",
    items: [
      { icon: "user", title: "Interlocuteur unique", text: "Un point de contact dédié du début à la fin, pour plus de fluidité et de réactivité." },
      { icon: "gitMerge", title: "Double culture architecture + BIM", text: "La compréhension architecturale alliée à la maîtrise de la donnée et des outils BIM." },
      { icon: "target", title: "Vision orientée décision", text: "Des analyses qui vont à l'essentiel pour sécuriser vos arbitrages et vos investissements." },
      { icon: "file", title: "Livrables clairs et exploitables", text: "Des documents et modèles pensés pour être utilisés concrètement sur le terrain." },
      { icon: "grid", title: "Méthode adaptée à l'existant", text: "Une expertise spécifique du bâti existant et de ses contraintes réelles." },
    ],
  },

  tools: {
    eyebrow: "Nos outils & écosystème",
    items: [
      { icon: "box", title: "Revit", subtitle: "Modélisation BIM" },
      { icon: "scan", title: "Scan 3D", subtitle: "Captation laser" },
      { icon: "layers", title: "Nuages de points", subtitle: "Traitement & gestion" },
      { icon: "search", title: "Audits & analyses", subtitle: "Techniques & réglementaires" },
      { icon: "network", title: "Coordination BIM", subtitle: "Clashs & collaboration" },
      { icon: "file", title: "Livrables", subtitle: "Plans, coupes, maquettes, DOE" },
      { icon: "cpu", title: "IA & automatisation", subtitle: "Optimisation des process" },
    ],
  },

  ctaBand: {
    title: "Discutons de vos enjeux.",
    text: "Un échange pour comprendre vos enjeux et voir comment A3 Studio peut vous accompagner.",
    cta: cta.primary, // Échanger avec A3 Studio → /contact#contact
    secondaryCta: cta.technical, // Demander un audit → /contact?objet=audit#contact
  },
});
