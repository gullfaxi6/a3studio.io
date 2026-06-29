import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionLabel from "@/components/ui/SectionLabel";
import FounderProfile from "@/components/sections/FounderProfile";
import ValueRow from "@/components/sections/ValueRow";
import StepRow from "@/components/sections/StepRow";
import ToolGrid from "@/components/sections/ToolGrid";
import CtaBand from "@/components/sections/CtaBand";
import { heroes } from "@/content/pages";
import { studio } from "@/content/studio";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Studio",
  description:
    "Studio indépendant fondé par Sébastien Bertucci, architecte DE HMONP et BIM Manager, dédié à l'architecture augmentée.",
  path: "/studio",
});

export default function StudioPage() {
  const h = heroes.studio;

  return (
    <>
      {/* 1. Hero */}
      <Hero
        label={h.label}
        titleLines={h.titleLines}
        intro={h.intro}
        ctas={h.ctas}
        image={h.image}
        balanced
      />

      {/* 2. Fondateur */}
      <Section background="ivory" className="lg:pt-[var(--section-y-tight)]">
        <FounderProfile
          eyebrow={studio.founder.eyebrow}
          name={studio.founder.name}
          title={studio.founder.title}
          bio={studio.founder.bio}
          complement={studio.founder.complement}
          image={studio.founder.image}
          objectPosition={studio.founder.objectPosition}
          indicators={studio.founder.indicators}
        />
      </Section>

      {/* 3. Vision / valeurs */}
      <Section background="sand" className="lg:pt-[var(--section-y-tight)]">
        <SectionHeading eyebrow={studio.vision.eyebrow} title={studio.vision.title} />
        <div className="mt-12">
          <ValueRow values={studio.vision.values} variant="five" />
        </div>
      </Section>

      {/* 4. Approche en 5 étapes */}
      <Section background="stone" className="lg:pt-[var(--section-y-tight)]">
        <SectionLabel>{studio.steps.eyebrow}</SectionLabel>
        <div className="mt-10">
          <StepRow steps={studio.steps.items} />
        </div>
      </Section>

      {/* 5. Ce qui fait la différence */}
      <Section background="sand">
        <SectionLabel>{studio.difference.eyebrow}</SectionLabel>
        <div className="mt-10">
          <ValueRow values={studio.difference.items} variant="five" />
        </div>
      </Section>

      {/* 6. Outils & écosystème */}
      <Section background="stone" className="lg:pt-[var(--section-y-tight)]">
        <SectionLabel>{studio.tools.eyebrow}</SectionLabel>
        <div className="mt-10">
          <ToolGrid tools={studio.tools.items} layout="centered" />
        </div>
      </Section>

      {/* 7. Bande CTA finale */}
      <Section background="dark">
        <CtaBand
          title={studio.ctaBand.title}
          text={studio.ctaBand.text}
          cta={studio.ctaBand.cta}
          secondaryCta={studio.ctaBand.secondaryCta}
          decoration="flow"
        />
      </Section>
    </>
  );
}
