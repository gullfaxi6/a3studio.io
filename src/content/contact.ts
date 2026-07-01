/**
 * Page Contact — options du formulaire, limites de champs (partagées client/serveur),
 * microcopy et contenus de page. Aucune donnée fictive.
 */

// Objet de la demande. La clé `value` correspond au paramètre d'URL ?objet=…
// (ex. /contact?objet=audit présélectionne « Audit / analyse du projet »).
import { frDeep } from "@/lib/typo";

export const requestObjects = [
  { value: "echange", label: "Échange / prise de contact" },
  { value: "audit", label: "Audit / analyse du projet" },
  { value: "scan-to-bim", label: "Scan-to-BIM / relevé 3D" },
  { value: "bim", label: "Modélisation BIM" },
  { value: "conception", label: "Conception architecturale" },
  { value: "autre", label: "Autre" },
] as const;

export const projectStages = [
  "Idée / réflexion",
  "Faisabilité",
  "Conception",
  "Avant réalisation",
  "Projet en cours",
] as const;

// Fourchettes indicatives — non contractuelles. Champ facultatif.
export const budgetRanges = [
  "Non concerné / mission d'étude",
  "Non défini",
  "Moins de 50 k€",
  "50 – 150 k€",
  "150 – 500 k€",
  "Plus de 500 k€",
] as const;

export const referralSources = [
  "Recherche web",
  "LinkedIn",
  "Recommandation",
  "Autre",
] as const;

/**
 * Limites de longueur — source unique partagée par le formulaire (UX) et l'API (autorité).
 * Toute modification doit rester cohérente des deux côtés.
 */
export const fieldLimits = {
  name: 100,
  email: 150,
  company: 120,
  phone: 30,
  message: 2000,
} as const;

export const formMicrocopy = {
  messagePlaceholder: "Décrivez votre projet, vos besoins ou vos interrogations…",
  budgetLabel: "Budget prévisionnel de l'opération ou de la mission",
  // Consentement : le lien vers /confidentialite est rendu dans le composant.
  consentLead:
    "J'accepte que mes données soient utilisées par A3 Studio pour répondre à ma demande.",
  consentLinkPrefix: "Pour en savoir plus, consulter la",
  consentLinkLabel: "politique de confidentialité",
  submit: "Envoyer ma demande",
  sending: "Envoi…",
  success:
    "Merci pour votre message. Votre demande a bien été transmise à A3 Studio. Nous vous répondrons dans les meilleurs délais.",
  // La partie « email » est rendue en lien mailto dans le composant.
  errorLead:
    "Votre message n'a pas pu être transmis. Merci de réessayer ou de nous contacter directement à",
  validationSummary: "Certains champs nécessitent votre attention.",
  errors: {
    name: "Merci d'indiquer votre nom.",
    nameLong: `Le nom ne doit pas dépasser ${fieldLimits.name} caractères.`,
    email: "Merci d'indiquer une adresse email.",
    emailInvalid: "Merci d'indiquer une adresse email valide.",
    emailLong: `L'email ne doit pas dépasser ${fieldLimits.email} caractères.`,
    company: `La société ne doit pas dépasser ${fieldLimits.company} caractères.`,
    phone: `Le téléphone ne doit pas dépasser ${fieldLimits.phone} caractères.`,
    message: "Merci de décrire votre projet ou votre demande.",
    messageLong: `Le message ne doit pas dépasser ${fieldLimits.message} caractères.`,
    consent: "Merci d'accepter l'utilisation de vos données pour vous répondre.",
    tooManyLinks:
      "Votre message contient trop de liens. Merci de le simplifier pour que nous puissions le recevoir.",
  },
} as const;

/** Contenus éditoriaux de la page Contact (hors formulaire). */
export const contactPage = frDeep({
  benefits: [
    { icon: "ear", title: "Écoute", text: "Vos besoins et vos contraintes." },
    { icon: "eye", title: "Clarté", text: "Des réponses simples et utiles." },
    { icon: "compass", title: "Orientation", text: "Des conseils pour avancer sereinement." },
  ],
  rendezvous: {
    eyebrow: "Prenons rendez-vous",
    title: "Un échange pour comprendre votre contexte et vos objectifs.",
    // Pas de promesse automatique de disponibilité : « prévoyons », « une trentaine ».
    text: "Prévoyons un échange d'une trentaine de minutes pour faire le point sur vos questions et voir comment A3 Studio peut vous accompagner.",
  },
  quote: {
    text: "La justesse d'un projet commence par une compréhension précise de l'existant.",
    attribution: "A3 Studio",
  },
});
