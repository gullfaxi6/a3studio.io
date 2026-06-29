import Icon from "@/components/ui/Icon";

type Step = {
  icon: string;
  label: string;
  sub: string;
  number: string;
  caption: string;
};

type Props = {
  steps: Step[];
};

/** Approche en trois temps (Le réel / Le projet / L'usage) : label + sous-titre + numéro + légende. */
export default function ThreePartProcess({ steps }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
      {steps.map((s) => (
        <div key={s.number} className="border-t border-line pt-5">
          <div className="flex items-center gap-2">
            <Icon name={s.icon} size={20} className="text-ink" />
            <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.09em] text-ink">
              {s.label}
            </span>
          </div>
          <span className="mt-1 block text-body-sm text-slate">{s.sub}</span>
          <span className="mt-5 block font-serif text-num text-slate">{s.number}</span>
          <p className="mt-2 text-body-sm text-graphite">{s.caption}</p>
        </div>
      ))}
    </div>
  );
}
