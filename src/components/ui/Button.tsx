import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary" | "accent";

type Props = {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  arrow?: boolean;
  onDark?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

const base =
  "group inline-flex items-center justify-center gap-2 text-button font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ease-brand disabled:opacity-50 disabled:pointer-events-none";

function variantClasses(variant: Variant, onDark: boolean): string {
  switch (variant) {
    case "accent":
      // Bouton principal terracotta (Accueil). Texte blanc → contraste AA vérifié (~4.5:1).
      return "bg-accent text-white px-7 py-4 hover:bg-accent-hover";
    case "primary":
      return onDark
        ? "bg-ivory text-ink px-7 py-4 hover:bg-on-dark"
        : "bg-near-black text-on-dark px-7 py-4 hover:bg-ink";
    case "secondary":
      return onDark
        ? "border border-on-dark/40 text-on-dark px-7 py-4 hover:border-on-dark"
        : "border border-line text-ink px-7 py-4 hover:border-ink";
    case "tertiary":
      return onDark ? "text-on-dark hover:text-ivory" : "text-accent-text";
  }
}

/** Couleur de la flèche : terracotta pour les boutons secondaires ; sinon héritée du texte. */
function arrowColor(variant: Variant): string {
  return variant === "secondary" ? "text-accent" : "";
}

function Arrow({ colorClass = "" }: { colorClass?: string }) {
  return (
    <ArrowRight
      size={16}
      strokeWidth={1.75}
      aria-hidden="true"
      className={`transition-transform duration-200 ease-brand group-hover:translate-x-1 ${colorClass}`}
    />
  );
}

/**
 * Bouton A3 Studio. Rend un <Link> si `href`, sinon un <button>.
 * Coins nets (radius 0), uppercase, flèche optionnelle qui glisse au survol.
 */
export default function Button({
  children,
  variant = "primary",
  href,
  arrow = false,
  onDark = false,
  type = "button",
  disabled,
  className = "",
  onClick,
}: Props) {
  const classes = `${base} ${variantClasses(variant, onDark)} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {arrow && <Arrow colorClass={arrowColor(variant)} />}
    </>
  );

  if (href) {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
