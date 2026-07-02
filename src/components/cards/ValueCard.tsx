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
      {/* min-height ≈ 2 lignes dès que les cartes sont côte à côte (sm+) :
          les descriptions démarrent à la même hauteur quel que soit le
          nombre de lignes du titre. */}
      <h3 className="mt-4 text-[0.8125rem] font-semibold uppercase leading-[1.45] tracking-[0.09em] text-ink sm:min-h-[2.9em]">
        {title}
      </h3>
      <p className="mt-3 text-body-sm text-graphite">{text}</p>
    </div>
  );
}
