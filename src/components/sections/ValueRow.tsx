import ValueCard from "@/components/cards/ValueCard";

type Value = { icon: string; title: string; text: string };

type Props = {
  values: Value[];
  /**
   * - "auto" (défaut) : grille existante (1 / md:3 / lg:5). Conservée pour Livrables.
   * - "five" : 1 col < 640, 2 col 640–899, 3 col 900–1279, 5 col ≥ 1280 (cf. `.values-five`),
   *   avec une légère interaction terracotta au survol. Utilisée sur Studio.
   */
  variant?: "auto" | "five";
};

/** Rangée de valeurs (ou différenciateurs). */
export default function ValueRow({ values, variant = "auto" }: Props) {
  if (variant === "five") {
    return (
      <div className="values-five">
        {values.map((v) => (
          <ValueCard
            key={v.title}
            icon={v.icon}
            title={v.title}
            text={v.text}
            className="transition-colors duration-[var(--motion-fast)] ease-brand hover:border-accent"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {values.map((v) => (
        <ValueCard key={v.title} icon={v.icon} title={v.title} text={v.text} />
      ))}
    </div>
  );
}
