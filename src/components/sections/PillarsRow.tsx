import PillarCard from "@/components/cards/PillarCard";
import Reveal from "@/components/ui/Reveal";

type Pillar = { icon: string; title: string; text: string };

type Props = {
  pillars: Pillar[];
  columns?: 3 | 4;
};

/**
 * Rangée de piliers. `Reveal mode="group"` conserve la cascade d'apparition (P2).
 *
 * - columns=4 (défaut) : 1 colonne < 768px, 2×2 de 768 à 1099px, 4 colonnes ≥ 1100px.
 *   Mise en page pilotée par `.pillars-quad` (media-queries explicites, cf. globals.css)
 *   pour ne pas dépendre de la détection des variantes arbitraires Tailwind (`min-[...]`).
 *   Filets verticaux uniquement en disposition 4 colonnes.
 * - columns=3 : 1 colonne en mobile, 3 colonnes ≥ 768px (filets en desktop, breakpoint standard).
 */
const tripleConfig = {
  grid: "grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0",
  divider: "md:border-l md:border-line md:px-8",
  pad: "md:px-8",
};

export default function PillarsRow({ pillars, columns = 4 }: Props) {
  if (columns === 4) {
    return (
      <Reveal mode="group" className="pillars-quad">
        {pillars.map((p) => (
          <div key={p.title}>
            <PillarCard icon={p.icon} title={p.title} text={p.text} />
          </div>
        ))}
      </Reveal>
    );
  }

  return (
    <Reveal mode="group" className={tripleConfig.grid}>
      {pillars.map((p, i) => (
        <div key={p.title} className={i > 0 ? tripleConfig.divider : tripleConfig.pad}>
          <PillarCard icon={p.icon} title={p.title} text={p.text} />
        </div>
      ))}
    </Reveal>
  );
}
