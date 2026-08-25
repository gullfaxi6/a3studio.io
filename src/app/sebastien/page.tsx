import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, UserPlus } from "lucide-react";
import Logo from "@/components/ui/Logo";
import ShareButton from "@/components/carte/ShareButton";
import { carte } from "@/content/carte";
import { site } from "@/content/site";

/**
 * Carte de visite numérique — /sebastien
 *
 * Page volontairement HORS de la navigation du site : accessible par lien direct,
 * QR ou partage uniquement. Le Header et le Footer sont masqués par ChromeGate
 * (src/components/layout/ChromeGate.tsx) pour préserver l'effet « carte » plutôt
 * que « page de site ».
 *
 * `noindex` : la page ne doit pas concurrencer /contact dans les résultats de
 * recherche, ni faire indexer un numéro de mobile.
 * ⚠️ Ne PAS ajouter `/sebastien` en Disallow dans robots.txt : un robot bloqué
 * au crawl ne peut pas lire la balise noindex, et l'URL peut alors rester
 * indexée sans description. La balise seule est le bon mécanisme.
 */
export const metadata: Metadata = {
  // Le gabarit du layout racine ajoute déjà « — A3 Studio » : ne pas le répéter ici.
  title: carte.fullName,
  description: `Carte de visite numérique de ${carte.fullName}, ${carte.role} chez ${carte.org}.`,
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: "/sebastien" },
  openGraph: {
    title: `${carte.fullName} — ${carte.org}`,
    description: carte.role,
    url: "/sebastien",
    siteName: site.name,
    locale: "fr_FR",
    type: "profile",
  },
};

/** Données structurées Person, rattachées à l'organisation déjà déclarée en layout. */
function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: carte.fullName,
    givenName: carte.firstName,
    familyName: carte.lastName,
    jobTitle: carte.role,
    email: `mailto:${carte.email}`,
    url: carte.url,
    ...(carte.phone ? { telephone: carte.phone } : {}),
    sameAs: [carte.linkedin],
    worksFor: { "@type": "Organization", name: carte.org, url: site.url },
    knowsAbout: carte.expertise,
  };
}

export default function CartePage() {
  return (
    <div className="on-dark min-h-screen bg-near-black text-on-dark">
      <div className="mx-auto w-full max-w-[30rem] pb-14">
        {/* ---------- Visuel identitaire ---------- */}
        <div className="relative">
          {/* Rapport proche du 16/9 : le visuel de référence est panoramique, un
              cadrage 4/3 amputerait le nuage de points sur la gauche — c'est
              précisément la partie qui raconte le Scan-to-BIM. */}
          <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9]">
            <Image
              src={carte.heroImage}
              alt={carte.heroImageAlt}
              fill
              priority
              sizes="(max-width: 480px) 100vw, 480px"
              className="object-cover"
            />
            {/* Dégradé vers le fond de page : l'image se fond dans la carte au
                lieu de s'y coller comme une vignette, et le titre remonté de
                24 px reste lisible sur le bas assombri.

                L'assombrissement du HAUT ne sert qu'à rendre lisible le logo en
                surimpression. Quand le visuel porte déjà la marque, ce voile
                écraserait la signature lumineuse : on le retire. */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 bg-gradient-to-b to-near-black ${
                carte.heroHasLogo
                  ? "from-transparent via-transparent"
                  : "from-near-black/70 via-near-black/10"
              }`}
            />
          </div>

          {/* Logo en surimpression — omis si le visuel porte déjà la marque,
              pour ne pas afficher deux fois le logo A3 Studio. */}
          {!carte.heroHasLogo && (
            <div className="absolute inset-x-0 top-0 px-7 pt-7">
              <Logo variant="compact" onDark symbolHeight="h-8" />
            </div>
          )}
        </div>

        {/* ---------- Identité ----------
            `relative` indispensable : le bloc visuel au-dessus est positionné,
            donc il se peint APRÈS le contenu en flux normal. Sans cela le titre
            remonté par -mt-6 passe derrière l'image au lieu de reposer sur son
            dégradé. */}
        <div className="relative -mt-6 px-7">
          <h1 className="font-serif text-[2.35rem] leading-[1.05] tracking-[-0.01em] text-on-dark">
            {carte.fullName}
          </h1>

          {/* Les disciplines tiennent lieu de qualification affichée : la barre
              oblique terracotta est la signature de marque, et le titre complet
              (« Architecte DE HMONP · BIM Manager ») reste porté par la propriété
              TITLE de la vCard, donc il arrive bien dans le carnet d'adresses. */}
          <div aria-hidden="true" className="mt-5 h-px w-11 bg-accent" />

          <p className="mt-5 text-body-sm text-on-dark-muted">
            {carte.expertise.map((item, index) => (
              <span key={item}>
                {index > 0 && <span className="mx-1.5 text-accent">/</span>}
                {item}
              </span>
            ))}
          </p>

          <p className="mt-4 text-body-sm text-on-dark-muted">
            {site.tagline} — analyser le réel, modéliser, transmettre.
          </p>
        </div>

        {/* ---------- Action principale ---------- */}
        <div className="mt-9 px-7">
          {/* <a> natif et non <Link> : la vCard est une réponse de l'API, pas une
              route à naviguer côté client. Le routeur intercepterait la requête. */}
          <a
            href="/api/vcard"
            className="group flex w-full items-center justify-center gap-2.5 bg-ivory px-7 py-4.5 text-button font-semibold uppercase tracking-[0.08em] text-ink transition-colors duration-200 ease-brand hover:bg-on-dark"
          >
            <UserPlus size={17} strokeWidth={1.75} aria-hidden="true" />
            <span>Ajouter à mes contacts</span>
          </a>

          {/* ---------- Actions secondaires ---------- */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a
              href={`mailto:${carte.email}`}
              className="inline-flex items-center justify-center gap-2 border border-on-dark/25 px-5 py-3.5 text-button font-semibold uppercase tracking-[0.08em] text-on-dark transition-colors duration-200 ease-brand hover:border-on-dark/60"
            >
              <Mail size={16} strokeWidth={1.75} aria-hidden="true" className="text-accent" />
              <span>Email</span>
            </a>

            {carte.phone ? (
              <a
                href={`tel:${carte.phone}`}
                className="inline-flex items-center justify-center gap-2 border border-on-dark/25 px-5 py-3.5 text-button font-semibold uppercase tracking-[0.08em] text-on-dark transition-colors duration-200 ease-brand hover:border-on-dark/60"
              >
                <Phone size={16} strokeWidth={1.75} aria-hidden="true" className="text-accent" />
                <span>Appeler</span>
              </a>
            ) : null}

            <ShareButton
              url={carte.url}
              title={`${carte.fullName} — ${carte.org}`}
              text={`${carte.role} · ${carte.org}`}
              className={carte.phone ? "col-span-2" : ""}
            />
          </div>

          {/* ---------- Accès au site ---------- */}
          <Link
            href="/"
            className="group mt-3 flex w-full items-center justify-between border border-on-dark/25 px-5 py-4 transition-colors duration-200 ease-brand hover:border-on-dark/60"
          >
            <span className="text-left">
              <span className="block text-button font-semibold uppercase tracking-[0.08em] text-on-dark">
                Découvrir A3 Studio
              </span>
              <span className="mt-1 block text-[0.7rem] tracking-[0.04em] text-on-dark-muted">
                {carte.displayUrl.split("/")[0]}
              </span>
            </span>
            <ArrowUpRight
              size={18}
              strokeWidth={1.5}
              aria-hidden="true"
              className="text-accent transition-transform duration-200 ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* ---------- Pied ---------- */}
        <p className="mt-10 px-7 text-[0.7rem] uppercase tracking-[0.12em] text-on-dark-muted">
          {carte.org} <span className="text-accent">/</span> {carte.zone}
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />
    </div>
  );
}
