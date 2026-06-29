import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import ArchitecturalFlowLines from "@/components/sections/ArchitecturalFlowLines";

type Cta = { label: string; href: string };

/** Intensité du motif décoratif. Classes complètes (statiques) → compilées de façon sûre. */
const FLOW_STRENGTH_CLASS: Record<"strong" | "standard" | "subtle", string> = {
  strong: "absolute inset-y-0 right-0 hidden w-[46%] opacity-70 xl:block",
  standard: "absolute inset-y-0 right-0 hidden w-[44%] opacity-60 xl:block",
  subtle: "absolute inset-y-0 right-0 hidden w-[42%] opacity-45 xl:block",
};

type Props = {
  title: ReactNode;
  text: string;
  cta: Cta;
  secondaryCta?: Cta;
  /**
   * - "none" (défaut) : bande sobre.
   * - "flow" : motif ArchitecturalFlowLines dans la moitié droite, derrière le contenu
   *   (tracé révélé une seule fois, ~1500 ms, statique sous prefers-reduced-motion).
   *   Affiché ≥1280px uniquement, à l'écart du texte (aucun tracé sous le texte),
   *   contenu dans le conteneur (aucun scroll horizontal), hauteur de bande inchangée.
   */
  decoration?: "none" | "flow";
  /** Intensité du motif (si decoration="flow"). Défaut "standard". */
  flowStrength?: "strong" | "standard" | "subtle";
};

/**
 * Contenu de la bande CTA finale. À placer dans <Section background="dark">.
 * Bouton primaire en variante onDark, CTA secondaire optionnel (outline onDark).
 */
export default function CtaBand({
  title,
  text,
  cta,
  secondaryCta,
  decoration = "none",
  flowStrength = "standard",
}: Props) {
  const content = (
    <div className="relative z-10 max-w-3xl">
      <h2 className="text-balance text-h2 text-on-dark">{title}</h2>
      <p className="mt-6 max-w-2xl text-on-dark-muted">{text}</p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button href={cta.href} variant="primary" onDark arrow>
          {cta.label}
        </Button>
        {secondaryCta && (
          <Button href={secondaryCta.href} variant="secondary" onDark arrow>
            {secondaryCta.label}
          </Button>
        )}
      </div>
    </div>
  );

  if (decoration === "flow") {
    return (
      <div className="relative">
        <ArchitecturalFlowLines className={FLOW_STRENGTH_CLASS[flowStrength]} />
        {content}
      </div>
    );
  }

  return content;
}
