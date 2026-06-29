"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import MobileMenu from "./MobileMenu";
import { nav, cta, site } from "@/content/site";

/** Header sticky. Nav complète en desktop (≥1024px), burger en deçà (décision 14). */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermeture du menu à tout changement de route.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Retour du focus au bouton menu après fermeture (transition ouvert → fermé).
  useEffect(() => {
    if (menuOpen) {
      wasOpen.current = true;
    } else if (wasOpen.current) {
      wasOpen.current = false;
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 bg-sand/95 backdrop-blur-sm transition-colors duration-200 ${
        scrolled ? "border-b border-line" : "border-b border-transparent"
      }`}
    >
      <Container>
        <div className="flex h-[72px] items-center justify-between lg:h-[84px]">
          {/* Logo */}
          <Link href="/" className="leading-none" aria-label={`${site.name} — accueil`}>
            <Logo variant="header" priority symbolHeight="h-10 lg:h-11" />
          </Link>

          {/* Navigation desktop */}
          <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`nav-underline text-eyebrow uppercase tracking-[0.12em] transition-colors hover:text-ink ${
                    active ? "is-active text-ink" : "text-slate"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Button href={cta.header.href} variant="primary">
              {cta.header.label}
            </Button>
          </nav>

          {/* Burger (mobile / tablette) */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex items-center justify-center p-2 text-ink lg:hidden"
          >
            <Menu size={24} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </Container>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </header>
  );
}
