import type { Metadata } from "next";
import Logo from "@/components/ui/Logo";
import QrCode from "@/components/carte/QrCode";
import ShareButton from "@/components/carte/ShareButton";
import { carte } from "@/content/carte";

/**
 * Écran de partage — /sebastien/share
 *
 * Destiné à MON téléphone, pas à celui de l'interlocuteur : je l'ouvre et je
 * tends l'appareil. D'où les contraintes :
 * - une seule vue, aucun défilement (100dvh, pas 100vh : sur iOS, 100vh ignore
 *   la barre d'adresse et pousse le contenu hors de l'écran) ;
 * - aucune action superflue qui risquerait d'être touchée par accident ;
 * - QR sombre sur panneau clair, quelle que soit la couleur de la page — c'est
 *   la condition d'un scan fiable ;
 * - installable en raccourci sur l'écran d'accueil.
 *
 * Dimensionnement : les tailles combinent vw ET dvh via min(). Un simple clamp
 * sur la largeur suffirait à un téléphone large mais déborderait en hauteur sur
 * un écran court (iPhone SE) ; borner aussi par la hauteur fait rentrer la
 * composition sans jamais rogner le QR au point de gêner le scan.
 */
export const metadata: Metadata = {
  title: `Partager ma carte — ${carte.fullName}`,
  description: `QR code de la carte de visite numérique de ${carte.fullName}.`,
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: "/sebastien/share" },
};

/** Filet terracotta de structure. Décoratif : retiré de l'arbre d'accessibilité. */
function Filet() {
  return <div aria-hidden="true" className="h-px w-12 bg-accent sm:w-14" />;
}

export default function SharePage() {
  // L'URL est affichée en deux teintes : hôte en ivoire, chemin en terracotta.
  const [hote, ...segments] = carte.displayUrl.split("/");
  const chemin = segments.join("/");

  return (
    <div className="on-dark flex min-h-[100dvh] flex-col items-center justify-center bg-near-black px-6 py-8 text-on-dark">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        {/* ---------- Logo officiel, lockup vertical complet ---------- */}
        <Logo
          variant="footer"
          onDark
          priority
          className="h-[min(18vw,10dvh,5.75rem)] w-auto"
        />

        {/* ---------- Identité ---------- */}
        <h1 className="mt-[min(4dvh,1.75rem)] font-serif text-[min(7vw,2.35rem)] leading-tight tracking-[-0.01em] text-on-dark">
          {carte.fullName}
        </h1>
        <p className="mt-2 text-[min(3.8vw,1rem)] font-normal leading-snug text-on-dark-muted">
          {carte.role}
        </p>

        <div className="mt-[min(3.2dvh,1.5rem)]">
          <Filet />
        </div>

        {/* ---------- QR ----------
            Panneau ivoire obligatoire : un QR clair sur fond sombre n'est pas
            lu de façon fiable par les appareils photo natifs. */}
        <div className="mt-[min(3.2dvh,1.5rem)] w-[min(72vw,34dvh,19rem)] bg-ivory p-[min(3.5vw,1rem)]">
          <QrCode
            value={carte.url}
            title={`QR code vers la carte de visite de ${carte.fullName}`}
            className="block h-auto w-full"
          />
        </div>

        <p className="mt-[min(2.8dvh,1.35rem)] font-serif text-[min(4.6vw,1.3rem)] leading-snug text-on-dark">
          Scannez pour enregistrer mon contact
        </p>

        <div className="mt-[min(2.8dvh,1.35rem)]">
          <Filet />
        </div>

        {/* ---------- Repli quand le QR ne passe pas ----------
            Lumière difficile, appareil récalcitrant : cette URL se dicte à voix
            haute et se saisit à la main. */}
        <p className="mt-[min(2.6dvh,1.25rem)] text-[min(4vw,1.05rem)] tracking-[0.01em]">
          <span className="text-on-dark-muted">{hote}/</span>
          <span className="text-accent">{chemin}</span>
        </p>

        <ShareButton
          variant="icon"
          url={carte.url}
          title={`${carte.fullName} — ${carte.org}`}
          text={`${carte.role} · ${carte.org}`}
          className="mt-[min(2.6dvh,1.25rem)]"
        />
      </div>
    </div>
  );
}
