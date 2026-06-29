import Reveal from "@/components/ui/Reveal";

type Step = { number: string; title: string; text: string };

type Props = {
  steps: Step[];
};

/**
 * Timeline éditoriale des étapes : numéro serif + titre + description, sans carte flottante.
 * Disposition (cf. `.steps-timeline`) : 1 col < 640px, 2 col 640–899, 3 col 900–1279,
 * 5 colonnes sur une ligne ≥ 1280, avec une fine ligne terracotta reliant les étapes
 * (horizontale ≥ 1280, verticale < 640). Révélation en cascade (stagger léger) via
 * Reveal mode="group". Liste ordonnée (sémantique préservée).
 */
export default function StepRow({ steps }: Props) {
  return (
    <Reveal as="ol" mode="group" className="steps-timeline">
      {steps.map((s) => (
        <li key={s.number}>
          <span className="block font-serif text-num text-slate">{s.number}</span>
          <h3 className="mt-2 text-[0.8125rem] font-semibold uppercase tracking-[0.09em] text-ink">
            {s.title}
          </h3>
          <p className="mt-3 text-body-sm text-graphite">{s.text}</p>
        </li>
      ))}
    </Reveal>
  );
}
