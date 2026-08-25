import { site } from "./site";

/**
 * A3 Studio — Carte de visite numérique personnelle (/sebastien).
 *
 * Source unique de vérité pour la carte. Volontairement SÉPARÉE de `site.ts` :
 * `site.email` (contact@a3studio.io) reste l'adresse de la société, utilisée
 * partout ailleurs sur le site. La carte porte l'adresse nominative.
 *
 * ⚠️ INCOHÉRENCE DE DOMAINE À TRANCHER
 * L'email de la carte est sur `a3studio.fr` alors que le site est servi sur
 * `a3studio.io` (cf. `site.targetDomain`, arbitrage A2). Cette adresse est
 * gravée dans le carnet d'adresses de chaque personne rencontrée : vérifier
 * qu'elle reçoit bien du courrier AVANT toute diffusion du QR.
 */
export const carte = {
  // --- Identité -----------------------------------------------------------
  firstName: "Sébastien",
  lastName: "Bertucci",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  org: site.name,
  role: "Architecte DE HMONP · BIM Manager",
  /** Disciplines affichées séparées par la barre oblique (signature de marque). */
  expertise: ["Architecture", "BIM", "Scan-to-BIM"],

  // --- Coordonnées --------------------------------------------------------
  email: "s.bertucci@a3studio.fr",

  /**
   * Téléphone repris de `site.phone` (déjà public sur /contact et les mentions
   * légales). Format E.164 obligatoire : un « 06 … » ne se compose pas depuis
   * l'étranger. Mettre `null` pour retirer le mobile de la carte et de la vCard.
   */
  phone: "+33698466912" as string | null,

  website: site.url,
  linkedin: site.linkedin,

  /**
   * Zone affichee sur la carte. Volontairement distincte de
   * `site.location.zone` (« Île-de-France / France ») : la carte se presente
   * en main propre, ou « Paris » est plus direct. Le siege social reste
   * Saint-Cloud et n'apparait que dans les mentions legales (arbitrage A1).
   */
  zone: "Paris",

  /** Accroche courte, sous le filet terracotta. */
  strapline: "Architecture augmentée par la donnée.",

  // --- URLs ---------------------------------------------------------------
  /** URL canonique encodée dans le QR code. */
  get url() {
    return `${site.url}/sebastien`;
  },
  /** Forme affichée à l'écran, sans protocole (plus lisible, dictable). */
  displayUrl: "a3studio.io/sebastien",

  // --- Visuel -------------------------------------------------------------
  /**
   * Visuel identitaire de la carte.
   *
   * Généré depuis le PNG de référence (1672 × 941) par
   *   node scripts/prepare-carte-image.mjs <source>
   * qui redimensionne en 1600 px de large et compresse en WebP (202 Ko).
   *
   * Le PNG source n'est PAS conservé dans public/ : tout fichier placé là est
   * déployé et publiquement téléchargeable. Il vit hors du projet web, dans
   * « D:\A3 Studio\Carte de visite\sources-visuels\ ».
   */
  heroImage: "/images/carte/hero-carte-sebastien.webp",
  heroImageAlt:
    "Relevé en nuage de points d'une arcade classique ouvrant sur un hall contemporain, sous la signature lumineuse A3 Studio",

  /**
   * Le visuel porte-t-il déjà le logo A3 Studio ?
   *
   * `true`  → la page N'AJOUTE PAS le symbole A3 en surimpression, sinon le logo
   *           apparaîtrait deux fois. C'est le cas du visuel de référence, qui
   *           contient un panneau lumineux « A3 Studio » en son centre.
   * `false` → la page superpose le symbole A3 en haut à gauche.
   *
   * À passer à `true` en même temps que l'installation du visuel de référence.
   */
  heroHasLogo: true,

  /**
   * Date de dernière révision des données de la carte (propriété REV de la vCard).
   * À incrémenter manuellement à chaque modification des coordonnées ci-dessus.
   * Constante volontaire : un horodatage calculé rendrait la réponse non cachable.
   */
  revision: "2026-08-25T00:00:00Z",

  /** Nom du fichier .vcf — ASCII strict, certains clients gèrent mal les accents. */
  vcardFilename: "sebastien-bertucci-a3studio.vcf",
};
