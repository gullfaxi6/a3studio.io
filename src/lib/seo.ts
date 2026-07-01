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
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** Données structurées JSON-LD — aucune information fictive. */
export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: `${site.name} — ${site.tagline}`,
    description: site.defaultDescription,
    url: site.url,
    logo: `${site.url}/logo-a3studio.png`,
    image: `${site.url}/opengraph-image`,
    email: site.email,
    telephone: site.phone,
    sameAs: [site.linkedin],
    founder: {
      "@type": "Person",
      name: site.founder.name,
      jobTitle: site.founder.title,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
    areaServed: site.location.zone,
    knowsAbout: [
      "Scan-to-BIM",
      "Modélisation BIM",
      "IFC",
      "Relevé 3D",
      "Architecture de l'existant",
      "ISO 19650",
    ],
    serviceType: ["Architecture", "BIM", "Scan-to-BIM", "Analyse de l'existant"],
  };
}
