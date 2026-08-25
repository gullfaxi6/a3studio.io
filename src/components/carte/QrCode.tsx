import { encode } from "uqr";

type Props = {
  /** Contenu encodé (ici l'URL canonique de la carte). */
  value: string;
  /** Description accessible. Le QR n'est pas décoratif : il porte une information. */
  title: string;
  className?: string;
};

/**
 * QR code rendu en SVG **côté serveur** — aucun JavaScript n'est envoyé au client.
 *
 * Choix :
 * - Correction d'erreur **M** (15 %) : pas de logo au centre, donc le niveau H
 *   serait du gaspillage de densité. Un QR moins dense se scanne mieux.
 * - Modules dessinés dans un unique `<path>` plutôt qu'en centaines de `<rect>` :
 *   markup nettement plus court et rendu sans liseré entre modules.
 * - `shape-rendering="crispEdges"` : évite l'anticrénelage qui brouille les
 *   arêtes des modules et fait échouer des scans à petite taille.
 * - Couleurs figées en dur (encre sur ivoire) : un QR doit rester sombre sur
 *   clair quel que soit le fond de la page, sinon il devient illisible.
 */
export default function QrCode({ value, title, className = "" }: Props) {
  const qr = encode(value, { ecc: "M", border: 0 });
  const size = qr.size;

  // Un module = 1 unité du viewBox. La zone de silence (4 modules, imposée par
  // la spec) est ajoutée ici en marge du viewBox plutôt que par uqr, pour la
  // peindre de la même couleur que le fond du panneau.
  const quiet = 4;
  const total = size + quiet * 2;

  let path = "";
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (qr.data[y][x]) path += `M${x + quiet} ${y + quiet}h1v1h-1z`;
    }
  }

  return (
    <svg
      viewBox={`0 0 ${total} ${total}`}
      role="img"
      aria-label={title}
      shapeRendering="crispEdges"
      className={className}
    >
      <rect width={total} height={total} fill="#fbfaf7" />
      <path d={path} fill="#111111" />
    </svg>
  );
}
