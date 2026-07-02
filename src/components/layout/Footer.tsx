import Link from "next/link";
import { Linkedin } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import Reveal from "@/components/ui/Reveal";
import { nav, footerExpertise, site } from "@/content/site";

/** Footer unique réutilisé sur toutes les pages. Affiche la zone, jamais l'adresse postale. */
export default function Footer() {
  return (
    <footer className="on-dark border-t border-line bg-near-black text-on-dark">
      <Container>
        {/* lg : colonnes calées sur leur contenu + espace réparti également entre
            les 4 blocs (l'ancienne grille 4×1fr laissait des vides très inégaux
            entre les contenus, la colonne Navigation étant étroite). */}
        <Reveal className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[auto_auto_auto_auto] lg:justify-between">
          {/* Marque */}
          <div>
            <Logo variant="header" onDark symbolHeight="h-9" />
            <p className="mt-5 max-w-xs text-body-sm text-on-dark-muted">
              {site.baselineLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Navigation du pied de page">
            <h2 className="text-eyebrow uppercase tracking-[0.12em] text-on-dark-muted">Navigation</h2>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-body-sm text-on-dark transition-colors hover:text-on-dark-muted">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Expertise */}
          <div>
            <h2 className="text-eyebrow uppercase tracking-[0.12em] text-on-dark-muted">Expertise</h2>
            <ul className="mt-4 space-y-2">
              {footerExpertise.map((item) => (
                <li key={item} className="text-body-sm text-on-dark-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-eyebrow uppercase tracking-[0.12em] text-on-dark-muted">Contact</h2>
            <ul className="mt-4 space-y-2 text-body-sm text-on-dark">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-on-dark-muted">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="transition-colors hover:text-on-dark-muted">
                  {site.phone}
                </a>
              </li>
              <li className="text-on-dark-muted">{site.location.zone}</li>
            </ul>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Sébastien Bertucci"
              className="mt-5 inline-flex items-center justify-center border border-on-dark/30 p-2 transition-colors hover:border-accent hover:text-accent"
            >
              <Linkedin size={18} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        {/* Bas de footer */}
        <div className="flex flex-col gap-3 border-t border-on-dark/15 py-6 text-body-sm text-on-dark-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} A3 Studio</p>
          <nav aria-label="Liens légaux" className="flex gap-6">
            <Link href="/mentions-legales" className="transition-colors hover:text-on-dark">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="transition-colors hover:text-on-dark">
              Politique de confidentialité
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
