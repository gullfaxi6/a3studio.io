import type { ReactNode } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";

type Cta = { label: string; href: string };

type Props = {
  eyebrow: string;
  title: ReactNode;
  body: string;
  cta?: Cta;
  children?: ReactNode;
};

/**
 * Section narrative : eyebrow + titre H2 à gauche, texte (+ CTA) à droite.
 * Empilé en mobile.
 */
export default function NarrativeSplit({ eyebrow, title, body, cta, children }: Props) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 text-balance text-h2 text-ink">{title}</h2>
      </div>
      <div className="lg:pt-2">
        <p className="max-w-prose text-graphite">{body}</p>
        {cta && (
          <div className="mt-6">
            <Button href={cta.href} variant="tertiary" arrow>
              {cta.label}
            </Button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
