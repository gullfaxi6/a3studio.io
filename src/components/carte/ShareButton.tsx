"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

type Props = {
  url: string;
  title: string;
  text: string;
  className?: string;
};

/**
 * Partage natif avec repli sur le presse-papiers.
 *
 * `navigator.share` n'est pas « Baseline » : disponible sur Safari iOS, Chrome
 * Android, Edge et Safari, mais sur poste de travail Chrome ne l'expose que sous
 * Windows et ChromeOS, et Firefox ne l'implémente pas. On teste donc la
 * fonctionnalité à l'appel plutôt qu'au rendu — tester au rendu provoquerait une
 * différence entre le HTML serveur et le HTML client (erreur d'hydratation).
 */
export default function ShareButton({ url, title, text, className = "" }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (error) {
        // AbortError = l'utilisateur a fermé la feuille de partage : ce n'est pas
        // une erreur, on ne bascule pas sur le presse-papiers.
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // Presse-papiers refusé (contexte non sécurisé, permission) : dernier
      // recours, on invite à copier l'URL affichée à l'écran.
      window.prompt("Copiez le lien de la carte :", url);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-live="polite"
      className={`group inline-flex items-center justify-center gap-2 border border-on-dark/25 px-5 py-3.5 text-button font-semibold uppercase tracking-[0.08em] text-on-dark transition-colors duration-200 ease-brand hover:border-on-dark/60 ${className}`}
    >
      {copied ? (
        <Check size={16} strokeWidth={1.75} aria-hidden="true" className="text-accent" />
      ) : (
        <Share2 size={16} strokeWidth={1.75} aria-hidden="true" className="text-accent" />
      )}
      <span>{copied ? "Lien copié" : "Partager"}</span>
    </button>
  );
}
