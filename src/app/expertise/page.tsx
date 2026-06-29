import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import PillarsRow from "@/components/sections/PillarsRow";
import ExpertiseDomainsGrid from "@/components/sections/ExpertiseDomainsGrid";
import NarrativeSplit from "@/components/sections/NarrativeSplit";
import ThreePartProcess from "@/components/sections/ThreePartProcess";
import CtaBand from "@/components/sections/CtaBand";
import { heroes } from "@/content/pages";
import { expertise } from "@/content/expertise";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Expertise — Architecture, BIM et Scan-to-BIM",
  description:
    "A3 Studio mobilise le BIM, le Scan-to-BIM et la conception architecturale pour comprendre l'existant, éclairer les décisions et sécuriser les projets.",
  path: "/expertise",
});

export default function ExpertisePage() {
  const h = heroes.expertise;

  return (
    <>
      {/* 1. Hero */}
      <Hero
        label={h.label}
        titleLines={h.titleLines}
        intro={h.intro}
        ctas={h.ctas}
        image={h.image}
        mediaForward
      />

      {/* 2. Bénéfices */}
      <Section background="ivory" className="lg:py-[var(--section-y-soft)]">
        <h2 className="sr-only">Bénéfices</h2>
        <PillarsRow pillars={expertise.benefits} />
      </Section>

      {/* 3. Domaines d'expertise */}
      <Section background="sand" className="lg:py-[var(--section-y-soft)]">
        <SectionHeading
          eyebrow={expertise.domains.eyebrow}
          title={expertise.domains.title}
          align="center"
        />
        <div className="mt-12 lg:mt-[2.7rem]">
          <ExpertiseDomainsGrid domains={expertise.domains.items} />
        </div>
      </Section>

      {/* 4. Approche globale */}
      <Section background="stone" className="lg:py-[var(--section-y-soft)]">
        <NarrativeSplit
          eyebrow={expertise.approach.eyebrow}
          title={expertise.approach.title}
          body={expertise.approach.body}
          cta={expertise.approach.cta}
        />
        <div className="mt-14 lg:mt-[3.2rem]">
          <ThreePartProcess steps={expertise.approach.steps} />
        </div>
      </Section>

      {/* 5. Bande CTA finale */}
      <Section background="dark">
        <CtaBand
          title={expertise.ctaBand.title}
          text={expertise.ctaBand.text}
          cta={expertise.ctaBand.cta}
          decoration="flow"
        />
      </Section>
    </>
  );
}
