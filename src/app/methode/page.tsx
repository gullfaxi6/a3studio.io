import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import PillarsRow from "@/components/sections/PillarsRow";
import NarrativeSplit from "@/components/sections/NarrativeSplit";
import StepTimeline from "@/components/sections/StepTimeline";
import CtaBand from "@/components/sections/CtaBand";
import { heroes } from "@/content/pages";
import { methode } from "@/content/methode";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Méthode — De l'analyse du réel à la réalisation",
  description:
    "Une méthode claire en six étapes pour comprendre, définir, concevoir, développer, consulter et accompagner vos projets jusqu'à la livraison.",
  path: "/methode",
});

export default function MethodePage() {
  const h = heroes.methode;

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

      {/* 2. Principes */}
      <Section background="ivory" className="lg:py-[var(--section-y-soft)]">
        <h2 className="sr-only">Les principes de notre méthode</h2>
        <PillarsRow pillars={methode.principles} />
      </Section>

      {/* 3. Démarche en 6 étapes */}
      <Section background="sand" className="lg:pt-[var(--section-y-soft)]">
        <SectionHeading eyebrow={methode.process.eyebrow} title={methode.process.title} align="center" />
        <p className="mx-auto mt-3 max-w-2xl text-center text-body-sm text-graphite">
          {methode.process.scopeNote}
        </p>
        <div className="mt-10">
          <StepTimeline
            steps={methode.process.steps}
            deliverablesLabel={methode.process.deliverablesLabel}
            variant="compactEditorial"
          />
        </div>
      </Section>

      {/* 4. Créer de la valeur à chaque étape */}
      <Section background="stone" className="lg:py-[var(--section-y-soft)]">
        <NarrativeSplit eyebrow={methode.value.eyebrow} title={methode.value.title} body={methode.value.body} />
        <div className="mt-14">
          <PillarsRow pillars={methode.value.items} />
        </div>
      </Section>

      {/* 5. Comprendre avant de concevoir */}
      <Section background="ivory" className="lg:py-[var(--section-y-soft)]">
        <SectionHeading eyebrow={methode.understand.eyebrow} title={methode.understand.title} align="center" />
        <p className="mx-auto mt-4 max-w-2xl text-center text-graphite">{methode.understand.body}</p>
        <div className="mt-12">
          <PillarsRow pillars={methode.understand.items} />
        </div>
      </Section>

      {/* 6. Bande CTA finale */}
      <Section background="dark">
        <CtaBand
          title={methode.ctaBand.title}
          text={methode.ctaBand.text}
          cta={methode.ctaBand.cta}
          decoration="flow"
        />
      </Section>
    </>
  );
}
