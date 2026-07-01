/**
 * Contenu de la page Méthode — séparé du markup.
 * Aucun projet/client/référence fictifs. Les livrables sont présentés à titre
 * d'exemple (non contractuels). Le héros est défini dans pages.ts (heroes.methode).
 */

import { cta } from "./site";
import { frDeep } from "@/lib/typo";

export const methode = frDeep({
  // 4 principes (icône + titre + une ligne) — réutilise PillarsRow
  principles: [
    { icon: "grid", title: "Structurée", text: "Un cadre clair à chaque étape." },
    { icon: "compass", title: "Adaptée", text: "Une approche sur-mesure à chaque contexte." },
    { icon: "users", title: "Collaborative", text: "Une communication fluide et transparente." },
    { icon: "target", title: "Orientée vers les résultats", text: "Des décisions justes et des projets fiables." },
  ],

  // Démarche en 6 étapes (timeline verticale)
  process: {
    eyebrow: "Notre démarche en 6 étapes",
    title: "De l'analyse du réel à la maîtrise du projet.",
    scopeNote:
      "La démarche et les livrables sont adaptés au périmètre de chaque mission et présentés ici à titre indicatif.",
    deliverablesLabel: "Exemples de livrables",
    steps: [
      {
        number: "01",
        title: "Comprendre",
        objective: "Analyser le réel et le contexte.",
        text: "Nous recueillons et analysons les données disponibles pour comprendre les spécificités du site, du bâtiment et de son environnement.",
        objectives: ["Comprendre finement le contexte", "Identifier contraintes et opportunités", "Cadrer les enjeux du projet"],
        deliverables: ["Rapport d'analyse", "Relevés et nuages de points", "Diagnostic architectural et synthèse des contraintes"],
      },
      {
        number: "02",
        title: "Définir",
        objective: "Cadrer le projet et les objectifs.",
        text: "Nous définissons ensemble le cadre du projet : objectifs, usages, contraintes, budget et calendrier.",
        objectives: ["Définir le programme", "Valider les objectifs", "Planifier les prochaines étapes"],
        deliverables: ["Programme fonctionnel", "Planning prévisionnel", "Cadre budgétaire"],
      },
      {
        number: "03",
        title: "Concevoir",
        objective: "Imaginer des solutions justes et adaptées.",
        text: "Nous concevons des solutions architecturales pertinentes, en conciliant usages, esthétique, faisabilité technique et performance.",
        objectives: ["Explorer les scénarios", "Éclairer les arbitrages", "Optimiser les aspects techniques et réglementaires"],
        deliverables: ["Plans, esquisses, 3D", "Scénarios comparés", "Études de faisabilité"],
      },
      {
        number: "04",
        title: "Développer",
        objective: "Préciser et sécuriser le projet.",
        text: "Nous détaillons la solution retenue pour garantir sa faisabilité et préparer sa mise en œuvre.",
        objectives: ["Développer techniquement", "Coordonner les intervenants", "Anticiper les points critiques"],
        deliverables: ["Dossier technique", "Plans détaillés", "Modélisation BIM"],
      },
      {
        number: "05",
        title: "Consulter",
        objective: "Préparer la réalisation.",
        text: "Nous constituons les dossiers nécessaires à la consultation des entreprises et à la contractualisation.",
        objectives: ["Consulter les entreprises", "Comparer les offres", "Accompagner le maître d'ouvrage dans le choix des entreprises"],
        deliverables: ["Dossier de consultation (DCE)", "Bordereaux et estimatifs", "Planning prévisionnel de réalisation"],
      },
      {
        number: "06",
        title: "Réaliser & suivre",
        objective: "Accompagner jusqu'à la livraison.",
        text: "Selon la mission confiée, nous accompagnons la réalisation afin de suivre la qualité d'exécution et la conformité des travaux au projet.",
        objectives: ["Suivre le chantier", "Contrôler la qualité", "Assister le maître d'ouvrage lors des opérations de réception et suivre la levée des réserves"],
        deliverables: ["Comptes rendus de chantier", "Suivi des opérations de réception et des réserves", "Suivi du dossier des ouvrages exécutés (DOE), selon le périmètre"],
      },
    ],
  },

  // Bloc « Créer de la valeur à chaque étape »
  value: {
    eyebrow: "Notre engagement",
    title: "Une méthode pensée pour créer de la valeur à chaque étape.",
    body: "Plus qu'une succession d'étapes, notre méthode est un engagement pour des projets maîtrisés et durables.",
    items: [
      { icon: "ear", title: "Écoute active", text: "Vos besoins au cœur du projet." },
      { icon: "eye", title: "Transparence", text: "Une communication claire et continue." },
      { icon: "ruler", title: "Rigueur", text: "Des livrables fiables et documentés." },
      { icon: "handshake", title: "Engagement", text: "Un partenaire impliqué à vos côtés." },
    ],
  },

  // Bloc « Comprendre avant de concevoir » — valorise la double culture
  understand: {
    eyebrow: "Notre approche",
    title: "Comprendre avant de concevoir, analyser avant de décider.",
    body: "En plaçant la compréhension du réel au cœur de notre démarche — avec une double culture d'architecte DE HMONP et une expertise BIM développée depuis 2012 — nous transformons l'incertitude en décisions claires.",
    items: [
      { icon: "scan", title: "Analyse du réel", text: "Mesurer et comprendre l'existant pour poser des bases fiables." },
      { icon: "database", title: "Fiabilité des données", text: "Des données vérifiées sur le terrain, exploitables en confiance." },
      { icon: "gitMerge", title: "Coordination architecture + BIM", text: "La double culture au service de la cohérence du projet." },
      { icon: "shield", title: "Contrôle qualité des livrables", text: "Des livrables vérifiés, lisibles et prêts à l'usage." },
    ],
  },

  ctaBand: {
    title: "Un projet à structurer ?",
    text: "Échangeons sur votre contexte et voyons comment cette démarche s'applique à vos enjeux.",
    cta: cta.rdv, // Prendre rendez-vous → /contact#contact
  },
});
