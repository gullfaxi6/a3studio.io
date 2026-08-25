"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

type Props = {
  url: string;
  title: string;
  text: string;
  className?: string;
  /**
   * "inline" (défaut) : icône + libellé, rang tertiaire de la carte /sebastien.
   * "icon" : pastille cerclée sans libellé, pour l'écran de partage.
   * Le défaut préserve l'usage existant sur /sebastien.
   */
  variant?: "inline" | "icon";
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
export default function ShareButton({
  url,
  title,
  text,
  className = "",
  variant = "inline",
}: Props) {
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

  const Icone = copied ? Check : Share2;

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleShare}
        // Sans libellé visible : le nom accessible passe par aria-label.
        aria-label={copied ? "Lien copié" : "Partager ma carte"}
        className={`flex h-12 w-12 items-center justify-center rounded-full border border-accent/50 text-accent transition-colors duration-200 ease-brand hover:border-accent ${className}`}
      >
        <Icone size={18} strokeWidth={1.5} aria-hidden="true" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-live="polite"
      className={`flex flex-1 items-center justify-center gap-2.5 py-3 text-body-sm text-on-dark-muted transition-colors duration-200 ease-brand hover:text-on-dark ${className}`}
    >
      <Icone size={18} strokeWidth={1.5} aria-hidden="true" className="text-accent" />
      <span>{copied ? "Lien copié" : "Partager"}</span>
    </button>
  );
}
