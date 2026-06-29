import Hero from "@/components/sections/Hero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import PillarsRow from "@/components/sections/PillarsRow";
import NarrativeSplit from "@/components/sections/NarrativeSplit";
import ImageTriptych from "@/components/sections/ImageTriptych";
import ServiceGrid from "@/components/sections/ServiceGrid";
import TechLogos from "@/components/sections/TechLogos";
import CtaBand from "@/components/sections/CtaBand";
import ArchitecturalFlowLines from "@/components/sections/ArchitecturalFlowLines";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { heroes } from "@/content/pages";
import { home } from "@/content/home";

// Métadonnées : l'Accueil hérite du title/description par défaut (layout.tsx).
export default function HomePage() {
  const h = heroes.home;

  return (
    <>
      {/* 1. Hero (apparition séquencée intégrée) */}
      <Hero label={h.label} titleLines={h.titleLines} intro={h.intro} ctas={h.ctas} image={h.image} balanced tightH1 />

      {/* 2. Piliers (cascade au scroll via PillarsRow) */}
      <Section background="sand">
        <h2 className="sr-only">Nos domaines d'intervention</h2>
        <PillarsRow pillars={home.pillars} />
      </Section>

      {/* 3 & 4. Notre approche + Triptyque process */}
      <Section background="stone" className="lg:pt-[var(--section-y-tight)]">
        <Reveal>
          <NarrativeSplit
            eyebrow={home.approche.eyebrow}
            title={home.approche.title}
            body={home.approche.body}
            cta={home.approche.cta}
          />
        </Reveal>
        <div className="mt-10">
          <ImageTriptych items={home.triptych} />
        </div>
      </Section>

      {/* 5. Expertises */}
      <Section background="sand" className="lg:pt-[var(--section-y-tight)]">
        <Reveal>
          <SectionHeading eyebrow={home.expertises.eyebrow} title={home.expertises.title} align="center" />
        </Reveal>
        <div className="mt-12">
          <ServiceGrid services={home.expertises.items} />
        </div>
      </Section>

      {/* 6. Technologies */}
      <Section background="stone" className="lg:pt-[var(--section-y-tight)]">
        <Reveal>
          <SectionHeading eyebrow={home.technologies.eyebrow} title={home.technologies.title} align="center" />
          <div className="mt-4 flex justify-center">
            <p className="max-w-xl text-center text-body-sm text-slate">{home.technologies.note}</p>
          </div>
        </Reveal>
        <div className="mt-12">
          <TechLogos tools={home.technologies.tools} />
        </div>
      </Section>

      {/* 7. Bande CTA finale (motif décoratif terracotta à droite) */}
      <Section background="dark" container={false} className="relative overflow-hidden">
        <ArchitecturalFlowLines className="absolute inset-y-0 right-0 w-[72%] opacity-35 sm:w-[60%] sm:opacity-65 lg:w-[55%] lg:opacity-75" />
        <Container className="relative z-10">
          <Reveal>
            <CtaBand title={home.ctaBand.title} text={home.ctaBand.text} cta={home.ctaBand.cta} />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
