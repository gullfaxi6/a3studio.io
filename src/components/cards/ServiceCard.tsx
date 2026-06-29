import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Media from "@/components/ui/Media";

type Props = {
  title: string;
  text: string;
  href: string;
  image?: { src: string; alt: string };
};

/** Carte d'expertise : visuel (ou placeholder) + titre + description + flèche. Carte entière cliquable. */
export default function ServiceCard({ title, text, href, image }: Props) {
  return (
    <Link
      href={href}
      aria-label={`${title} — découvrir`}
      className="group flex flex-col border border-line bg-ivory transition-colors hover:border-accent"
    >
      <Media image={image} ratio="aspect-[4/3]" sizes="(max-width: 768px) 100vw, 33vw" zoom />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.09em] text-ink">{title}</h3>
        <p className="mt-3 flex-1 text-body-sm text-graphite">{text}</p>
        <ArrowRight
          size={18}
          strokeWidth={1.5}
          aria-hidden="true"
          className="mt-5 text-accent transition-transform duration-200 ease-brand group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
