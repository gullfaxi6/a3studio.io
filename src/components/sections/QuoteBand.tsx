import ArchitecturalFlowLines from "@/components/sections/ArchitecturalFlowLines";

type Props = {
  quote: string;
  attribution: string;
  /**
   * - "center" (défaut) : citation centrée.
   * - "start" : citation alignée à gauche, largeur limitée — pour une composition
   *   full-bleed où le motif occupe la moitié droite (la citation reste à l'écart).
   */
  align?: "center" | "start";
  /**
   * - "none" (défaut) : citation seule (le motif est géré au niveau de la section).
   * - "flow" : motif discret en marge droite, derrière la citation centrée (legacy).
   */
  decoration?: "none" | "flow";
};

/** Bande citation (sur fond sombre). Guillemets typographiques, attribution discrète. */
export default function QuoteBand({
  quote,
  attribution,
  align = "center",
  decoration = "none",
}: Props) {
  const isStart = align === "start";
  const figure = (
    <figure
      className={`relative z-10 ${isStart ? "mr-auto max-w-xl text-left" : "mx-auto max-w-3xl text-center"}`}
    >
      <blockquote className="font-serif text-title-sub italic leading-snug text-on-dark">
        «&nbsp;{quote}&nbsp;»
      </blockquote>
      <figcaption className="mt-6 text-eyebrow uppercase tracking-[0.12em] text-on-dark-muted">
        {attribution}
      </figcaption>
    </figure>
  );

  if (decoration === "flow") {
    return (
      <div className="relative">
        {/* Marge droite uniquement (citation centrée) : aucun tracé sous le texte. */}
        <ArchitecturalFlowLines className="absolute inset-y-0 right-0 hidden w-[18%] opacity-40 xl:block" />
        {figure}
      </div>
    );
  }

  return figure;
}
