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
    <div className="on-dark flex min-h-screen flex-col bg-near-black text-on-dark">
      <div className="mx-auto flex w-full max-w-[30rem] flex-1 flex-col pb-10">
        {/* ---------- Visuel identitaire ---------- */}
        <div className="relative">
          {/* Rapport panoramique : un cadrage 4/3 amputerait le nuage de points
              sur la gauche — c'est précisément la partie qui raconte le Scan-to-BIM.
              Rapport élargi (20/11 au lieu de 16/10) pour abaisser la hauteur du
              hero d'environ 12 % sans recadrer ni déformer : le nom et le CTA
              remontent dans l'écran. */}
          <div className="relative aspect-[20/11] w-full overflow-hidden sm:aspect-[2/1]">
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
            Le bloc ne chevauche plus le visuel : le nom se lit sur le fond de
            page, jamais sur l'image. La continuité reste assurée par le dégradé
            du hero, qui se termine exactement sur la couleur de fond — aucune
            couture visible malgré la séparation.
            `relative` conservé : le bloc visuel au-dessus est positionné et se
            peindrait sinon par-dessus le contenu en flux normal. */}
        <div className="relative mt-6 px-7">
          <h1 className="font-serif text-[2.5rem] leading-[1.05] tracking-[-0.01em] text-on-dark">
            {carte.fullName}
          </h1>

          {/* Qualification formelle, en casse normale : c'est le titre porté
              aussi par la propriété TITLE de la vCard. */}
          <p className="mt-3 text-body text-on-dark-muted">
            Architecte DE HMONP <span className="text-on-dark-muted/60">•</span> BIM Manager
          </p>

          {/* Disciplines, puces terracotta. */}
          <p className="mt-3 text-[0.8125rem] uppercase leading-[1.6] tracking-[0.14em] text-on-dark-muted">
            {carte.expertise.map((item, index) => (
              <span key={item}>
                {index > 0 && <span className="mx-2 text-accent">•</span>}
                {item}
              </span>
            ))}
          </p>

          <div aria-hidden="true" className="mt-6 h-0.5 w-14 bg-accent" />

          {/* Signature de marque, pas un titre : italique serif (style « Quote »
              du design system) et teinte atténuée, pour qu'elle ne concurrence ni
              le nom ni le CTA. Contraste on-dark-muted / near-black = 5,1:1, AA. */}
          <p className="mt-6 font-serif text-[1.2rem] italic leading-snug text-on-dark-muted">
            {carte.strapline}
          </p>
        </div>

        {/* ---------- Action principale ---------- */}
        <div className="mt-9 px-7">
          {/* <a> natif et non <Link> : la vCard est une réponse de l'API, pas une
              route à naviguer côté client. Le routeur intercepterait la requête. */}
          {/* Coins arrondis : écart assumé avec le design system (radius 0–2 px,
              « coins nets ») — c'est la direction visuelle demandée. */}
          <a
            href="/api/vcard"
            className="group flex w-full items-center justify-center gap-3 rounded-[8px] bg-ivory px-5 py-[1.1rem] text-button font-semibold uppercase tracking-[0.08em] text-ink transition-colors duration-200 ease-brand hover:bg-on-dark"
          >
            <UserPlus size={19} strokeWidth={1.75} aria-hidden="true" className="shrink-0" />
            {/* shrink-0 : sans lui, l'algorithme flex comprime le libellé sous sa
                largeur naturelle sur les petits écrans (≤ 360 px) et le renvoie
                sur deux lignes, ce qui regonfle le bouton de 54 à 59 px. */}
            <span className="shrink-0">Ajouter à mes contacts</span>
          </a>

          {/* ---------- Actions secondaires ----------
              Rang tertiaire : ni fond ni bordure, séparées par de fins filets,
              pour qu'elles ne concurrencent pas l'action principale. */}
          <div className="mt-7 flex items-stretch">
            <a
              href={`mailto:${carte.email}`}
              className="flex flex-1 items-center justify-center gap-2.5 py-3 text-body-sm text-on-dark-muted transition-colors duration-200 ease-brand hover:text-on-dark"
            >
              <Mail size={18} strokeWidth={1.5} aria-hidden="true" className="text-accent" />
              <span>Email</span>
            </a>

            {carte.phone ? (
              <>
                <span aria-hidden="true" className="w-px self-stretch bg-on-dark/15" />
                <a
                  href={`tel:${carte.phone}`}
                  className="flex flex-1 items-center justify-center gap-2.5 py-3 text-body-sm text-on-dark-muted transition-colors duration-200 ease-brand hover:text-on-dark"
                >
                  <Phone size={18} strokeWidth={1.5} aria-hidden="true" className="text-accent" />
                  <span>Appeler</span>
                </a>
              </>
            ) : null}

            <span aria-hidden="true" className="w-px self-stretch bg-on-dark/15" />
            <ShareButton
              url={carte.url}
              title={`${carte.fullName} — ${carte.org}`}
              text={`${carte.role} · ${carte.org}`}
            />
          </div>

          {/* ---------- Accès au site ---------- */}
          <div className="mt-7 border-t border-on-dark/15 pt-7">
            <Link href="/" className="group block">
              <span className="flex items-center gap-2 font-serif text-[1.35rem] leading-none text-on-dark">
                Découvrir A3 Studio
                <ArrowUpRight
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="text-accent transition-transform duration-200 ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
              <span className="mt-2 block text-body-sm text-on-dark-muted">
                {carte.displayUrl.split("/")[0]}
              </span>
            </Link>
          </div>
        </div>

        {/* ---------- Pied ----------
            `mt-auto` : sur un grand écran, le pied descend au bas de la fenêtre
            au lieu de laisser une zone sombre vide en dessous. Sur un écran
            court, la marge automatique se résout à zéro et seul le `pt-8`
            sépare le pied du contenu. */}
        <div className="mx-7 mt-auto border-t border-on-dark/15 pt-8">
          <p className="text-[0.7rem] uppercase tracking-[0.14em] text-on-dark-muted">
            {carte.org} <span className="mx-1 text-accent">/</span> {carte.zone}
          </p>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />
    </div>
  );
}
