import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Construit les métadonnées d'une page (title, description, canonical, OpenGraph).
 * `path` doit commencer par "/" (ex. "/studio").
 */
export function pageMeta({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: "fr_FR",
      type: "website",
    },
  };
}

/** Données structurées JSON-LD — aucune information fictive. */
export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.defaultDescription,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    founder: {
      "@type": "Person",
      name: site.founder.name,
      jobTitle: site.founder.title,
    },
    areaServed: site.location.zone,
    serviceType: ["Architecture", "BIM", "Scan-to-BIM", "Analyse de l'existant"],
  };
}
