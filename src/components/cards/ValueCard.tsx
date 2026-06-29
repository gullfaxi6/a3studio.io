import Icon from "@/components/ui/Icon";

type Props = {
  icon: string;
  title: string;
  text: string;
  /** Classes additionnelles (ex. interaction au survol), appliquées à la carte. */
  className?: string;
};

/** Carte de valeur ou de différenciateur : icône + titre + courte description. */
export default function ValueCard({ icon, title, text, className = "" }: Props) {
  return (
    <div className={`flex h-full flex-col border border-line bg-ivory p-6 ${className}`}>
      <Icon name={icon} size={26} className="text-ink" />
      <h3 className="mt-4 text-[0.8125rem] font-semibold uppercase tracking-[0.09em] text-ink">
        {title}
      </h3>
      <p className="mt-3 text-body-sm text-graphite">{text}</p>
    </div>
  );
}
