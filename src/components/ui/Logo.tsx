import Image from "next/image";

type Variant = "header" | "compact" | "footer";

type Props = {
  variant?: Variant;
  /** Contexte sombre (footer) → symbole + texte en version claire. */
  onDark?: boolean;
  /** Classe du conteneur (ex. marges). */
  className?: string;
  /** Hauteur du symbole — AJUSTABLE (ex. "h-9 lg:h-10"). Validation visuelle requise. */
  symbolHeight?: string;
  priority?: boolean;
};

// Dimensions intrinsèques (px) des fichiers générés.
const SYMBOL = { w: 264, h: 173 }; // symbole « A3 » détouré, recadré à ras du cadre (aligné à gauche)
const FULL = { w: 400, h: 422 }; // lockup vertical complet fourni

/**
 * Logo A3 Studio — variantes.
 *
 * ⚠️ TAILLES À VALIDER VISUELLEMENT : aucun asset horizontal officiel n'est disponible.
 * En attendant, la signature horizontale du header combine le symbole « A3 » détouré
 * du gabarit fourni (NON redessiné) + le wordmark « A3 STUDIO » et la baseline en CSS.
 *
 * - "header"  : signature horizontale (symbole + wordmark + baseline).
 * - "compact" : symbole « A3 » seul (mobile / espaces réduits).
 * - "footer"  : lockup vertical complet (variante claire sur fond sombre).
 */
export default function Logo({
  variant = "header",
  onDark = false,
  className = "",
  symbolHeight,
  priority = false,
}: Props) {
  if (variant === "footer") {
    const src = onDark ? "/logo-a3studio-light.png" : "/logo-a3studio.png";
    return (
      <Image
        src={src}
        alt="A3 Studio"
        width={FULL.w}
        height={FULL.h}
        priority={priority}
        className={className || "h-16 w-auto"}
      />
    );
  }

  const symbolSrc = onDark ? "/logo-symbol-a3-light.png" : "/logo-symbol-a3.png";
  const h = symbolHeight ?? (variant === "compact" ? "h-9" : "h-9 lg:h-10");

  if (variant === "compact") {
    return (
      <Image
        src={symbolSrc}
        alt="A3 Studio"
        width={SYMBOL.w}
        height={SYMBOL.h}
        priority={priority}
        className={`${h} w-auto ${className}`}
      />
    );
  }

  // header : symbole décoratif (alt vide) + wordmark texte porteur du nom accessible
  const textColor = onDark ? "text-on-dark" : "text-ink";
  const subColor = onDark ? "text-on-dark-muted" : "text-slate";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src={symbolSrc}
        alt=""
        aria-hidden="true"
        width={SYMBOL.w}
        height={SYMBOL.h}
        priority={priority}
        className={`${h} w-auto`}
      />
      <span className="leading-none">
        <span className={`block font-serif text-[1.2rem] leading-none tracking-[0.1em] ${textColor}`}>
          A3 STUDIO
        </span>
        <span className={`mt-1 block whitespace-nowrap text-[0.64rem] uppercase leading-none tracking-[0.18em] ${subColor}`}>
          Architecture augmentée
        </span>
      </span>
    </span>
  );
}
