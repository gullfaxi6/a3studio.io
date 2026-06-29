import Media from "@/components/ui/Media";

type Step = {
  number: string;
  title: string;
  objective: string;
  text: string;
  objectives: string[];
  deliverables: string[];
  image?: { src: string; alt: string };
};

type Props = {
  step: Step;
  deliverablesLabel: string;
  /** Variante compacte (Méthode) : voir StepTimeline. */
  compact?: boolean;
};

function MiniList({
  heading,
  items,
  headingClassName,
}: {
  heading: string;
  items: string[];
  headingClassName: string;
}) {
  return (
    <div>
      <h4 className={`text-eyebrow uppercase tracking-[0.12em] ${headingClassName}`}>{heading}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((it) => (
          <li key={it} className="flex gap-2.5 text-body-sm text-graphite">
            <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-accent" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Une étape de la timeline (verticale, éditoriale).
 * Desktop : identité (3/12) / corps (9/12, ou 6 si vignette). Tablette & mobile : empilé
 * (numéro, titre, texte, puis Objectifs et Livrables empilés). La vignette n'est rendue
 * que si une image existe. Variante `compact` : padding resserré, contraste des intitulés
 * renforcé, repère chronologique terracotta lié au numéro, listes en 2 colonnes ≥1024px.
 */
export default function TimelineStep({ step, deliverablesLabel, compact = false }: Props) {
  const hasImage = !!step.image;
  const py = compact ? "py-[2.15rem]" : "py-10";
  const bodyMt = compact ? "mt-5" : "mt-6";
  const listsCols = compact ? "lg:grid-cols-2" : "sm:grid-cols-2";
  const headingClassName = compact ? "text-graphite" : "text-slate";

  return (
    <li className={`grid gap-6 border-t border-line ${py} lg:grid-cols-12 lg:gap-8`}>
      {/* Identité */}
      <div className="lg:col-span-3">
        {compact && <span aria-hidden="true" className="mb-4 block h-px w-10 bg-accent" />}
        <span className="block font-serif text-num text-slate">{step.number}</span>
        <h3 className="mt-2 text-title-sub text-ink">{step.title}</h3>
        <p className="mt-1 text-body-sm text-slate">{step.objective}</p>
      </div>

      {/* Corps */}
      <div className={hasImage ? "lg:col-span-6" : "lg:col-span-9"}>
        <p className="max-w-prose text-body-sm text-graphite">{step.text}</p>
        <div className={`${bodyMt} grid gap-6 ${listsCols}`}>
          <MiniList heading="Objectifs" items={step.objectives} headingClassName={headingClassName} />
          <MiniList
            heading={deliverablesLabel}
            items={step.deliverables}
            headingClassName={headingClassName}
          />
        </div>
      </div>

      {/* Vignette (optionnelle) */}
      {hasImage && (
        <div className="lg:col-span-3">
          <Media image={step.image} ratio="aspect-[4/3]" sizes="(max-width: 1024px) 100vw, 25vw" />
        </div>
      )}
    </li>
  );
}
