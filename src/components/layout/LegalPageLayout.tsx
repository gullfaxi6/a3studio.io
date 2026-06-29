import type { ReactNode } from "react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";

type Props = {
  eyebrow?: string;
  title: string;
  updated: string;
  children: ReactNode;
};

/**
 * Gabarit des pages légales : titre H1, date de mise à jour, largeur de lecture confortable.
 * Le contenu (children) est du markup sémantique (h2 / p / ul / a) stylé via `.legal-content`.
 */
export default function LegalPageLayout({ eyebrow, title, updated, children }: Props) {
  return (
    <Section background="ivory">
      <div className="mx-auto max-w-3xl">
        {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
        <h1 className="text-h1 text-ink">{title}</h1>
        <p className="mt-3 text-body-sm text-slate">Dernière mise à jour : {updated}</p>
        <div className="legal-content mt-10">{children}</div>
      </div>
    </Section>
  );
}
