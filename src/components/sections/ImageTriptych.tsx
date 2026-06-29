import Media from "@/components/ui/Media";
import Reveal from "@/components/ui/Reveal";

type Item = {
  title: string;
  caption?: string;
  image?: { src: string; alt: string };
};

type Props = {
  items: Item[];
};

/** Triptyque process (Scan 3D / Modélisation BIM / Conception). Cascade au scroll, zoom léger au survol. */
export default function ImageTriptych({ items }: Props) {
  return (
    <Reveal mode="group" className="grid grid-cols-1 gap-8 sm:grid-cols-3">
      {items.map((it) => (
        <figure key={it.title} className="group">
          <Media image={it.image} ratio="aspect-[4/3]" sizes="(max-width: 640px) 100vw, 33vw" zoom />
          <figcaption className="mt-3">
            <span className="block text-[0.8125rem] font-semibold uppercase tracking-[0.09em] text-ink">
              {it.title}
            </span>
            {it.caption && <span className="mt-1 block text-body-sm text-graphite">{it.caption}</span>}
          </figcaption>
        </figure>
      ))}
    </Reveal>
  );
}
