import Eyebrow from "@/components/ui/Eyebrow";
import { site } from "@/content/site";

type Props = {
  className?: string;
};

/**
 * Bloc géographique sobre (arbitrage A1) : pas de carte détaillée en V1,
 * pas d'effet « commerce de proximité ». L'adresse complète reste réservée
 * aux mentions légales.
 */
export default function LocationBlock({ className = "" }: Props) {
  const { city, mode } = site.location;
  const modeLabel = mode.charAt(0).toUpperCase() + mode.slice(1);
  return (
    <div className={`border border-line bg-ivory p-8 ${className}`}>
      <Eyebrow>Présence</Eyebrow>
      <p className="mt-3 font-serif text-[1.5rem] leading-tight text-ink">Île-de-France</p>
      <p className="mt-1 text-body-sm text-slate">{modeLabel}</p>
      <p className="mt-3 text-body-sm text-slate">Basé à {city}</p>
    </div>
  );
}
