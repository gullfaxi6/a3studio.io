import Icon from "@/components/ui/Icon";

type Props = {
  icon: string;
  title: string;
  subtitle: string;
};

/** Cellule d'outil pour l'écosystème (icône + titre + sous-titre). Rendue dans une grille <ul>. */
export default function ToolCard({ icon, title, subtitle }: Props) {
  return (
    <li className="flex flex-col items-center gap-2 bg-ivory px-3 py-7 text-center grayscale">
      <Icon name={icon} size={24} className="text-ink" />
      <span className="text-[0.8125rem] font-semibold uppercase leading-tight tracking-[0.07em] text-ink">
        {title}
      </span>
      <span className="text-eyebrow uppercase leading-tight tracking-[0.1em] text-slate">
        {subtitle}
      </span>
    </li>
  );
}
