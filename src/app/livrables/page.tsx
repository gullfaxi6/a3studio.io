import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import PillarsRow from "@/components/sections/PillarsRow";
import DeliverablesGrid from "@/components/sections/DeliverablesGrid";
import NarrativeSplit from "@/components/sections/NarrativeSplit";
import ToolGrid from "@/components/sections/ToolGrid";
import ValueRow from "@/components/sections/ValueRow";
import CtaBand from "@/components/sections/CtaBand";
import ArchitecturalFlowLines from "@/components/sections/ArchitecturalFlowLines";
import Container from "@/components/ui/Container";
import { heroes } from "@/content/pages";
import { livrables } from "@/content/livrables";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Livrables — Plans, maquettes BIM, relevés et dossiers techniques",
  description:
    "Des livrables précis pour comprendre l'existant, modéliser, décider et transmettre des informations fiables tout au long du projet.",
  path: "/livrables",
});

export default function LivrablesPage() {
  const h = heroes.livrables;

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
        <h2 className="sr-only">Bénéfices des livrables</h2>
        <PillarsRow pillars={livrables.benefits} />
      </Section>

      {/* 3. Familles de livrables */}
      <Section background="sand" className="lg:py-[var(--section-y-soft)]">
        <SectionHeading
          eyebrow={livrables.families.eyebrow}
          title={livrables.families.title}
          align="center"
        />
        <p className="mx-auto mt-3 max-w-2xl text-center text-body-sm text-slate">
          {livrables.families.scopeNote}
        </p>
        <div className="mt-10">
          <DeliverablesGrid
            families={livrables.families.items}
            examplesLabel={livrables.families.examplesLabel}
          />
        </div>
      </Section>

      {/* 4. Méthodes & outils */}
      <Section background="stone">
        <NarrativeSplit
          eyebrow={livrables.tools.eyebrow}
          title={livrables.tools.title}
          body={livrables.tools.body}
          cta={livrables.tools.cta}
        />
        <div className="mt-12">
          <ToolGrid tools={livrables.tools.items} layout="quad" />
        </div>
      </Section>

      {/* 5. Cadrage : ce qui définit un livrable */}
      <Section background="ivory" className="lg:py-[var(--section-y-soft)]">
        <SectionHeading
          eyebrow={livrables.scoping.eyebrow}
          title={livrables.scoping.title}
          align="center"
        />
        <div className="mt-10">
          <ValueRow values={livrables.scoping.criteria} variant="five" />
        </div>
        <p className="mx-auto mt-8 max-w-3xl border-t border-line pt-6 text-center text-body-sm text-slate">
          {livrables.scoping.notice}
        </p>
      </Section>

      {/* 6. Bande CTA finale (motif full-bleed, intensité Accueil, courbes inversées) */}
      <Section background="dark" container={false} className="relative overflow-hidden">
        <ArchitecturalFlowLines
          className="absolute inset-y-0 right-0 w-[72%] opacity-35 sm:w-[60%] sm:opacity-65 lg:w-[55%] lg:opacity-75"
          direction="reverse"
        />
        <Container className="relative z-10">
          <CtaBand title={livrables.ctaBand.title} text={livrables.ctaBand.text} cta={livrables.ctaBand.cta} />
        </Container>
      </Section>
    </>
  );
}
