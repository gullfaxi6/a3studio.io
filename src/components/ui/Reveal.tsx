"use client";

import { createElement, useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";

type Mode = "block" | "group" | "bare";

type Props = {
  children: ReactNode;
  /** Élément rendu (div par défaut, ul/section/… selon le contexte). */
  as?: ElementType;
  /**
   * - "block" : l'élément lui-même se révèle (fondu + translation).
   * - "group" : les enfants directs se révèlent en cascade (stagger CSS).
   * - "bare"  : aucun style de révélation propre ; bascule seulement `is-visible`
   *   (utilisé par le héros, qui pilote sa propre séquence via data-attributes).
   */
  mode?: Mode;
  className?: string;
  /** Marge de déclenchement : anticipe légèrement l'entrée dans le viewport. */
  rootMargin?: string;
  threshold?: number;
};

const baseClass: Record<Mode, string> = {
  block: "reveal",
  group: "reveal-group",
  bare: "",
};

/**
 * Révélation au défilement basée sur IntersectionObserver, déclenchée une seule fois.
 *
 * Garanties :
 * - Sans JavaScript (ou si l'observer échoue), AUCUN contenu n'est masqué :
 *   l'état initial caché n'est appliqué que lorsque <html class="js"> est présent
 *   (ajouté avant le premier rendu par un script en ligne) — voir globals.css.
 * - `prefers-reduced-motion: reduce` neutralise translations/cascade (CSS).
 * - L'observer est correctement déconnecté (nettoyage + une seule occurrence).
 */
export default function Reveal({
  children,
  as = "div",
  mode = "block",
  className = "",
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.15,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Signale que le système de révélation est actif (désamorce le filet de sécurité du layout).
    if (typeof window !== "undefined") {
      (window as unknown as { __a3RevealReady?: boolean }).__a3RevealReady = true;
    }
    const el = ref.current;
    if (!el || visible) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true); // jamais de contenu masqué si l'API manque
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin, threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, threshold, visible]);

  const cls = [baseClass[mode], className, visible ? "is-visible" : ""]
    .filter(Boolean)
    .join(" ");

  return createElement(as, { ref, className: cls }, children);
}
