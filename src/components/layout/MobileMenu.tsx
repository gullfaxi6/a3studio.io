"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { nav, cta, site } from "@/content/site";

type Props = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

/**
 * Menu mobile/tablette plein écran.
 *
 * Rendu via un PORTAL vers <body> : indispensable car le <header> applique
 * `backdrop-filter` (backdrop-blur), ce qui en fait le bloc conteneur des
 * descendants `position: fixed`. À l'intérieur du header, `inset: 0` se
 * résolvait donc sur la barre (~72px) et non sur le viewport, laissant le fond
 * opaque ne couvrir que le haut — le Hero transparaissait derrière les liens.
 * Hors du header, `fixed inset-0` couvre tout l'écran, fond totalement opaque.
 *
 * Inclut : verrouillage du scroll arrière avec restauration de position,
 * fermeture par croix / lien / Échap / changement de route (Header),
 * piège à focus, focus initial, animation sobre, respect de reduced-motion.
 */
export default function MobileMenu({ open, onClose, pathname }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false); // portail dispo (client uniquement)
  const [active, setActive] = useState(false); // déclencheur d'animation d'entrée

  useEffect(() => setMounted(true), []);

  // Verrouillage du scroll arrière + restauration exacte de la position (sans saut).
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // Échap + piège à focus (Tab confiné dans le panneau).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const focusables = panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Animation d'entrée (rAF) + focus initial dans le panneau.
  useEffect(() => {
    if (!open) {
      setActive(false);
      return;
    }
    const raf = requestAnimationFrame(() => setActive(true));
    closeRef.current?.focus();
    return () => cancelAnimationFrame(raf);
  }, [open]);

  // Panneau réservé au mobile/tablette : fermeture si l'on atteint la largeur desktop.
  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      if (window.innerWidth >= 1024) onClose();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation"
      data-open={active ? "true" : "false"}
      className="mobile-menu fixed inset-0 z-[100] flex h-[100dvh] w-full flex-col overflow-y-auto overflow-x-hidden bg-sand"
    >
      {/* Header du panneau — aligné au Header fermé (même hauteur mobile, logo à gauche) */}
      <div className="flex h-[72px] shrink-0 items-center justify-between px-[var(--gutter-x)]">
        <Link href="/" onClick={onClose} aria-label={`${site.name} — accueil`} className="leading-none">
          <Logo variant="header" symbolHeight="h-10" />
        </Link>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fermer le menu"
          className="-mr-1.5 inline-flex h-11 w-11 items-center justify-center text-ink"
        >
          <X size={24} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      {/* Navigation verticale */}
      <nav aria-label="Navigation principale" className="mobile-menu-nav flex flex-col px-[var(--gutter-x)] pt-2">
        {nav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center justify-between border-b border-line py-4 font-serif text-[2rem] leading-tight transition-colors ${
                isActive ? "text-accent-text" : "text-ink"
              }`}
            >
              {item.label}
              {isActive && <span aria-hidden="true" className="text-base text-accent">—</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bas du menu — secondaire et sobre */}
      <div className="mt-auto px-[var(--gutter-x)] pb-10 pt-8">
        <Button href={cta.header.href} variant="primary" className="w-full">
          {cta.header.label}
        </Button>
        <div className="mt-6 flex flex-col gap-3">
          <a
            href={`mailto:${site.email}`}
            className="text-eyebrow uppercase tracking-[0.12em] text-accent-text"
          >
            {site.email}
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-eyebrow uppercase tracking-[0.12em] text-slate transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
