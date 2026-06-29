import TimelineStep from "@/components/sections/TimelineStep";

type Step = {
  number: string;
  title: string;
  objective: string;
  text: string;
  objectives: string[];
  deliverables: string[];
  image?: { src: string; alt: string };
};

type Props = {
  steps: Step[];
  deliverablesLabel?: string;
  /**
   * - "default" : timeline standard.
   * - "compactEditorial" (Méthode) : padding vertical réduit (~14 %), intitulés Objectifs/
   *   Livrables au contraste renforcé, repère chronologique terracotta par étape, listes
   *   Objectifs/Livrables empilées sous 1024px. Aucune autre régression.
   */
  variant?: "default" | "compactEditorial";
};

/** Timeline verticale de la démarche. Pas de scroll horizontal : empilement éditorial. */
export default function StepTimeline({
  steps,
  deliverablesLabel = "Exemples de livrables",
  variant = "default",
}: Props) {
  const compact = variant === "compactEditorial";
  return (
    <ol className="border-b border-line">
      {steps.map((step) => (
        <TimelineStep
          key={step.number}
          step={step}
          deliverablesLabel={deliverablesLabel}
          compact={compact}
        />
      ))}
    </ol>
  );
}
