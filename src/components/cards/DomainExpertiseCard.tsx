import Media from "@/components/ui/Media";

type Props = {
  title: string;
  description: string;
  deliverables: string[];
  image?: { src: string; alt: string };
};

/** Carte de domaine d'expertise : visuel (ou placeholder) + titre + description + livrables. */
export default function DomainExpertiseCard({ title, description, deliverables, image }: Props) {
  return (
    <article className="group flex h-full flex-col border border-line bg-ivory">
      <Media image={image} ratio="aspect-[4/3]" sizes="(max-width: 768px) 100vw, 33vw" zoom />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.09em] text-ink">{title}</h3>
        <p className="mt-3 text-body-sm text-graphite">{description}</p>
        <ul className="mt-5 space-y-2 border-t border-line pt-5">
          {deliverables.map((d) => (
            <li key={d} className="flex gap-2.5 text-body-sm text-graphite">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-accent" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
