import Media from "@/components/ui/Media";

type Props = {
  number: string;
  title: string;
  intro: string;
  examples: string[];
  examplesLabel: string;
  image?: { src: string; alt: string };
};

/** Famille de livrables (numérotée) : numéro + titre + intro + liste d'exemples + visuel. */
export default function DeliverableFamilyCard({
  number,
  title,
  intro,
  examples,
  examplesLabel,
  image,
}: Props) {
  return (
    <article className="flex h-full flex-col border border-line bg-ivory p-6">
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-num text-slate">{number}</span>
        <h3 className="text-[0.9rem] font-semibold uppercase tracking-[0.09em] text-ink">{title}</h3>
      </div>
      <p className="mt-3 text-body-sm text-graphite">{intro}</p>

      <div className="mt-5">
        <h4 className="text-eyebrow uppercase tracking-[0.12em] text-slate">{examplesLabel}</h4>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {examples.map((ex) => (
            <li key={ex} className="flex gap-2.5 text-body-sm text-graphite">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-accent" />
              <span>{ex}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-6">
        <Media image={image} ratio="aspect-[16/10]" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
    </article>
  );
}
