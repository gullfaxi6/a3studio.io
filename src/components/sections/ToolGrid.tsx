import ToolCard from "@/components/cards/ToolCard";

type Tool = { icon: string; title: string; subtitle: string };

type Props = {
  tools: Tool[];
  desktopCols?: 4 | 5 | 6 | 7;
  /**
   * - "grid" (défaut) : grille hairline à `desktopCols` colonnes.
   * - "centered" : flux centré (cf. `.tools-flow`) — 1 col < 768, 2 col 768–1099,
   *   4 par ligne ≥ 1100 avec dernière rangée centrée. Aucune cellule vide. (Studio, 7 outils.)
   * - "quad" : grille hairline (cf. `.tools-four`) — 1 col < 520, 2×2 entre 520–1099,
   *   4 colonnes sur une ligne ≥ 1100. Aucune cellule vide. (Livrables, 4 outils.)
   */
  layout?: "grid" | "centered" | "quad";
};

// Mapping statique (classes complètes pour la compilation Tailwind).
const lgColsMap: Record<number, string> = {
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
  7: "lg:grid-cols-7",
};

/**
 * Écosystème / méthodes & outils en grille monochrome (icône + titre + sous-titre).
 * Mobile : 2 colonnes ; tablette : 3 ; desktop : `desktopCols` (défaut 7), sauf layout "centered".
 */
export default function ToolGrid({ tools, desktopCols = 7, layout = "grid" }: Props) {
  if (layout === "centered") {
    return (
      <ul className="tools-flow">
        {tools.map((t) => (
          <ToolCard key={t.title} icon={t.icon} title={t.title} subtitle={t.subtitle} />
        ))}
      </ul>
    );
  }

  if (layout === "quad") {
    return (
      <ul className="tools-four">
        {tools.map((t) => (
          <ToolCard key={t.title} icon={t.icon} title={t.title} subtitle={t.subtitle} />
        ))}
      </ul>
    );
  }

  const lgCols = lgColsMap[desktopCols] ?? "lg:grid-cols-7";
  return (
    <ul className={`grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3 ${lgCols}`}>
      {tools.map((t) => (
        <ToolCard key={t.title} icon={t.icon} title={t.title} subtitle={t.subtitle} />
      ))}
    </ul>
  );
}
