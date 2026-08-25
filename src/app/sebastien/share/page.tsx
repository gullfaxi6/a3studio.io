import type { Metadata } from "next";
import Logo from "@/components/ui/Logo";
import QrCode from "@/components/carte/QrCode";
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
 */
export const metadata: Metadata = {
  title: `Partager ma carte — ${carte.fullName}`,
  description: `QR code de la carte de visite numérique de ${carte.fullName}.`,
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: "/sebastien/share" },
};

export default function SharePage() {
  return (
    <div className="on-dark flex min-h-[100dvh] flex-col items-center justify-between bg-near-black px-7 py-9 text-on-dark">
      {/* ---------- Identité ---------- */}
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <Logo variant="compact" onDark symbolHeight="h-9" />
        <h1 className="mt-6 font-serif text-[1.9rem] leading-tight tracking-[-0.01em] text-on-dark">
          {carte.fullName}
        </h1>
        <p className="mt-2 text-eyebrow uppercase tracking-[0.12em] text-on-dark-muted">
          {carte.org} <span className="text-accent">/</span> {carte.expertise[0]}
        </p>
      </div>

      {/* ---------- QR ---------- */}
      <div className="flex w-full max-w-sm flex-col items-center">
        <div className="w-full max-w-[17rem] bg-ivory p-4">
          <QrCode
            value={carte.url}
            title={`QR code vers la carte de visite de ${carte.fullName}`}
            className="block h-auto w-full"
          />
        </div>
        <p className="mt-6 text-center font-serif text-[1.35rem] leading-snug text-on-dark">
          Scannez pour enregistrer
          <br />
          mon contact
        </p>
      </div>

      {/* ---------- URL de repli ---------- */}
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <div aria-hidden="true" className="h-px w-11 bg-accent" />
        {/* Repli quand le QR ne passe pas (lumière difficile, appareil récalcitrant) :
            cette URL se dicte à voix haute. */}
        <p className="mt-5 text-body-sm tracking-[0.02em] text-on-dark-muted">
          {carte.displayUrl}
        </p>
      </div>
    </div>
  );
}
