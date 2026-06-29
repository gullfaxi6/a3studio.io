import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Pages futures (Études de cas / Actualités / Ressources) exclues tant que vides (décision 8).
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/studio",
    "/expertise",
    "/methode",
    "/livrables",
    "/contact",
    "/mentions-legales",
    "/confidentialite",
  ];
  const now = new Date();
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
