import Reveal from "@/components/ui/Reveal";

type Props = {
  className?: string;
  /**
   * - "forward" (défaut) : orientation de l'Accueil.
   * - "reverse" : motif retourné horizontalement (mouvement opposé, pour éviter la
   *   répétition exacte). Transformation appliquée au groupe SVG (aucun path dupliqué) ;
   *   animation de tracé, points, aria-hidden et pointer-events conservés.
   */
  direction?: "forward" | "reverse";
  /**
   * Ancrage vertical du motif (slice). "right" (défaut) = centré ; "upper-right" = ancré
   * en haut, pour les bandes basses où le motif doit occuper la moitié supérieure droite.
   */
  placement?: "right" | "upper-right";
};

/**
 * Motif décoratif original (non figuratif) pour la bande CTA sombre.
 * Évoque des lignes topographiques / flux de données / nuage de points /
 * tracés de conception. Courbes fines terracotta, tracé révélé une seule fois
 * (stroke-dasharray/offset, cf. globals.css). Purement décoratif → aria-hidden,
 * pointer-events désactivés, aucun contenu essentiel. Ne reproduit pas l'image
 * de référence : en reprend seulement l'esprit graphique.
 */
const COUNT = 16;

// Courbes s'évasant à gauche et convergeant vers la droite (effet de flux),
// désormais ancrées plus à droite pour concentrer le motif dans la moitié droite
// et préserver une zone calme à gauche (texte + CTA).
const lines = Array.from({ length: COUNT }, (_, i) => {
  const t = i / (COUNT - 1); // 0 → 1
  const yL = 48 + t * 436; // étalement gauche (resserré, démarre plus bas)
  const yR = 196 + t * 128; // resserrement à droite (convergence)
  const wob = Math.sin(t * Math.PI) * 22; // ondulation douce
  const c1y = yL - 26 + wob;
  const c2y = yR + 30 - wob;
  const d = `M 32 ${yL.toFixed(1)} C 230 ${c1y.toFixed(1)} 515 ${c2y.toFixed(1)} 720 ${yR.toFixed(1)}`;
  const opacity = 0.16 + (i % 5) * 0.07; // densité variable
  return { d, opacity };
});

// Petits points épars (évocation nuage de points) près de la zone de convergence.
const dots = [
  [636, 244],
  [664, 268],
  [612, 226],
  [690, 300],
  [624, 312],
  [676, 208],
  [600, 286],
];

export default function ArchitecturalFlowLines({
  className = "",
  direction = "forward",
  placement = "right",
}: Props) {
  // Retournement horizontal autour du centre du viewBox (largeur 720), sans dupliquer
  // les tracés : une simple transformation sur le groupe englobant.
  const groupTransform = direction === "reverse" ? "translate(720 0) scale(-1 1)" : undefined;
  // Ancrage du slice : centré (YMid) ou haut (YMin).
  const preserve = placement === "upper-right" ? "xMaxYMin slice" : "xMaxYMid slice";
  return (
    <Reveal as="div" mode="bare" className={`flow-lines pointer-events-none text-accent ${className}`}>
      <svg
        viewBox="0 0 720 520"
        fill="none"
        preserveAspectRatio={preserve}
        aria-hidden="true"
        focusable="false"
        className="h-full w-full"
      >
        <g transform={groupTransform}>
          <g>
            {lines.map((l, i) => (
              <path
                key={i}
                d={l.d}
                pathLength={1}
                stroke="currentColor"
                strokeWidth={1}
                strokeOpacity={l.opacity}
                className="flow-line"
              />
            ))}
          </g>
          <g>
            {dots.map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={1.6} fill="currentColor" className="flow-dot" />
            ))}
          </g>
        </g>
      </svg>
    </Reveal>
  );
}
