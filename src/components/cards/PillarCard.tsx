import Icon from "@/components/ui/Icon";

type Props = {
  icon: string;
  title: string;
  text: string;
};

/** Pilier : icône centrée + titre court + une ligne. Sans bordure (séparation par filets en row). */
export default function PillarCard({ icon, title, text }: Props) {
  return (
    <div className="group flex flex-col items-center text-center">
      <Icon
        name={icon}
        size={28}
        className="text-ink transition-[color,transform] duration-[var(--motion-fast)] ease-brand group-hover:-translate-y-0.5 group-hover:text-accent"
      />
      <h3 className="mt-4 text-[0.8125rem] font-semibold uppercase tracking-[0.09em] text-ink">
        {title}
      </h3>
      <p className="mt-3 max-w-[24ch] text-body-sm text-graphite">{text}</p>
    </div>
  );
}
