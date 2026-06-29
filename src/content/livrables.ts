/**
 * Contenu de la page Livrables — séparé du markup.
 * Les livrables sont présentés comme des EXEMPLES (non contractuels).
 * Aucun projet/client/référence fictifs. Le héros est dans pages.ts (heroes.livrables).
 */

import { cta } from "./site";

export const livrables = {
  // 4 bénéfices (icône + titre + une ligne) — réutilise PillarsRow
  benefits: [
    { icon: "eye", title: "Clarté", text: "Des informations lisibles pour comprendre l'essentiel." },
    { icon: "shield", title: "Fiabilité", text: "Des données précises et vérifiées sur le terrain." },
    { icon: "target", title: "Décision", text: "Des livrables qui éclairent vos choix stratégiques." },
    { icon: "file", title: "Transmission", text: "Une communication claire à chaque étape du projet." },
  ],

  // 4 familles de livrables (numérotées) — grille 2×2
  families: {
    eyebrow: "Nos livrables, à chaque étape",
    title: "Des livrables utiles, précis et adaptés à vos enjeux.",
    scopeNote:
      "La nature et le périmètre des livrables dépendent de chaque mission ; les éléments ci-dessous sont des exemples, non une liste systématiquement incluse.",
    examplesLabel: "Exemples",
    items: [
      {
        number: "01",
        title: "Comprendre",
        intro: "Saisir le réel et son contexte pour poser des bases fiables.",
        examples: [
          "Relevé sur site",
          "Reportage photographique",
          "Nuage de points",
          "Plans de l'existant",
          "Synthèse architecturale et technique",
          "Analyse des contraintes",
          "Synthèse des enjeux",
        ],
        image: {
          src: "/images/livrables/livrable-comprendre.webp",
          alt: "Relevé au scanner laser d'un intérieur patrimonial, nuage de points, carnet d'esquisses et plan sur tablette.",
        },
      },
      {
        number: "02",
        title: "Modéliser",
        intro: "Structurer la donnée du bâti en une maquette exploitable.",
        examples: [
          "Maquette BIM de l'existant",
          "Plans, coupes et façades",
          "Nomenclatures et quantitatifs",
          "Contrôle de cohérence",
          "Modèle fédéré selon la mission",
          "Exports IFC, DWG ou PDF",
        ],
        image: {
          src: "/images/livrables/livrable-modeliser.webp",
          alt: "Maquette d'un bâtiment classique avec couches BIM éclatées en superposition et plan technique.",
        },
      },
      {
        number: "03",
        title: "Décider",
        intro: "Comparer les options et éclairer les choix stratégiques.",
        examples: [
          "Scénarios d'aménagement",
          "Études de faisabilité",
          "Comparaisons de variantes",
          "Estimations prévisionnelles",
          "Matrices avantages / contraintes",
          "Visualisations 3D",
        ],
        image: {
          src: "/images/livrables/livrable-decider.webp",
          alt: "Planches comparant des scénarios d'aménagement par esquisses successives, avec maquette et tablette.",
        },
      },
      {
        number: "04",
        title: "Transmettre",
        intro: "Communiquer une information claire pour agir et coordonner.",
        examples: [
          "Dossiers d'autorisation",
          "Dossier de consultation des entreprises",
          "Plans techniques",
          "Pièces écrites selon la mission",
          "Documents de coordination",
          "Documents de fin de mission ou suivi du DOE selon le périmètre",
        ],
        image: {
          src: "/images/livrables/livrable-transmettre.webp",
          alt: "Plan de travail de transmission : classeur ouvert de plans et photos, dossiers techniques et tablette affichant un projet.",
        },
      },
    ],
  },

  // Méthodes & outils (4) — réutilise ToolGrid (desktopCols 4)
  tools: {
    eyebrow: "Notre boîte à outils",
    title: "Des technologies et méthodes au service de la précision.",
    body: "Nous combinons relevés terrain, modélisation BIM et gestion des données pour produire des livrables fiables, cohérents et exploitables à chaque étape.",
    cta: { label: "Découvrir notre méthode", href: "/methode" },
    items: [
      { icon: "scan", title: "Scan 3D", subtitle: "Relevé laser 3D" },
      { icon: "box", title: "BIM", subtitle: "Modélisation structurée" },
      { icon: "network", title: "Coordination", subtitle: "Contrôle d'interférences" },
      { icon: "database", title: "Données", subtitle: "Structuration & traçabilité" },
    ],
  },

  // Bloc de cadrage : ce qui définit un livrable (5 critères) — réutilise ValueRow
  scoping: {
    eyebrow: "Comment se définit un livrable",
    title: "Un livrable se définit pour chaque mission.",
    criteria: [
      { icon: "compass", title: "Usage", text: "À quoi il sert et pour quelle décision." },
      { icon: "ruler", title: "Niveau de précision", text: "Le degré de détail attendu selon la mission." },
      { icon: "file", title: "Format", text: "Les formats d'échange (IFC, DWG, PDF…)." },
      { icon: "users", title: "Destinataires", text: "Les interlocuteurs à qui il s'adresse." },
      { icon: "shield", title: "Processus de validation", text: "Les étapes de revue et de validation." },
    ],
    notice:
      "Les livrables présentés constituent des exemples. Leur contenu, leur niveau de précision, leurs formats et leurs usages sont définis pour chaque mission dans la proposition d'honoraires.",
  },

  ctaBand: {
    title: "Un projet commence par les bonnes questions.",
    text: "Vous n'avez pas encore de projet défini ? Échangeons sur vos intentions, vos contraintes et vos objectifs.",
    cta: cta.primary, // Échanger avec A3 Studio → /contact#contact
  },
};
