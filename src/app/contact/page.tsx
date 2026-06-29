import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import PillarsRow from "@/components/sections/PillarsRow";
import LocationBlock from "@/components/sections/LocationBlock";
import ContactDetails from "@/components/sections/ContactDetails";
import QuoteBand from "@/components/sections/QuoteBand";
import ArchitecturalFlowLines from "@/components/sections/ArchitecturalFlowLines";
import ContactForm from "@/components/form/ContactForm";
import { heroes } from "@/content/pages";
import { contactPage } from "@/content/contact";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact — Échanger avec A3 Studio",
  description:
    "Contactez A3 Studio pour parler de votre projet d'architecture, de BIM, de Scan-to-BIM ou d'analyse de l'existant.",
  path: "/contact",
});

export default function ContactPage() {
  const h = heroes.contact;

  return (
    <>
      {/* 1. Hero */}
      <Hero label={h.label} titleLines={h.titleLines} intro={h.intro} image={h.image} mediaForward />

      {/* 2. Bénéfices */}
      <Section background="ivory" className="lg:py-[var(--section-y-soft)]">
        <h2 className="sr-only">Ce que vous trouverez dans l'échange</h2>
        <PillarsRow pillars={contactPage.benefits} columns={3} />
      </Section>

      {/* 3. Rendez-vous + formulaire */}
      <Section id="contact" background="stone">
        <div className="contact-split">
          <div className="max-w-md">
            <Eyebrow>{contactPage.rendezvous.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-balance text-h2 text-ink lg:[font-size:var(--text-h2-contact)]">
              {contactPage.rendezvous.title}
            </h2>
            <p className="mt-5 max-w-prose text-graphite">{contactPage.rendezvous.text}</p>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </Section>

      {/* 4. Bloc géographique + coordonnées directes */}
      <Section background="sand">
        <div className="grid gap-6 md:grid-cols-2">
          <LocationBlock className="h-full" />
          <ContactDetails className="h-full" />
        </div>
      </Section>

      {/* 5. Citation finale (motif full-bleed, intensité légèrement sous l'Accueil, courbes inversées) */}
      <Section background="dark" container={false} className="relative overflow-hidden">
        <ArchitecturalFlowLines
          className="absolute inset-y-0 right-0 w-[68%] opacity-30 sm:w-[58%] sm:opacity-55 lg:w-[52%] lg:opacity-65"
          direction="reverse"
          placement="upper-right"
        />
        <Container className="relative z-10">
          <QuoteBand quote={contactPage.quote.text} attribution={contactPage.quote.attribution} align="start" />
        </Container>
      </Section>
    </>
  );
}
