import Reveal from "@/components/ui/Reveal";

type Tool = { brand: string; product: string };

type Props = {
  tools: Tool[];
};

/**
 * Outils logiciels en grille monochrome (noms, pas de logos de marque).
 * Présentés comme outils utilisés, sans mention de partenariat officiel.
 * Cascade rapide au scroll ; filet accent discret au survol.
 */
export default function TechLogos({ tools }: Props) {
  return (
    <Reveal
      as="ul"
      mode="group"
      className="grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3 min-[900px]:grid-cols-6"
    >
      {tools.map((t) => (
        <li
          key={`${t.brand}-${t.product}`}
          className="group flex flex-col items-center justify-center bg-ivory px-4 py-7 text-center"
        >
          <span className="relative text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-[var(--motion-fast)] after:ease-brand group-hover:after:scale-x-100">
            {t.product}
          </span>
          <span className="mt-1 text-eyebrow uppercase tracking-[0.12em] text-slate">{t.brand}</span>
        </li>
      ))}
    </Reveal>
  );
}
