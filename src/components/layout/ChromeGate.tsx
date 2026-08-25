"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Routes servies SANS l'habillage du site (header, footer).
 * La carte de visite numérique doit se présenter comme une carte, pas comme une
 * page de site : afficher la navigation complète autour d'elle casserait l'effet
 * et proposerait des sorties là où on veut une seule action.
 */
const BARE_ROUTES = ["/sebastien"];

function isBareRoute(pathname: string): boolean {
  return BARE_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

/**
 * Masque son contenu sur les routes « nues ».
 *
 * Client component, mais les enfants (Header, Footer) restent rendus par le
 * serveur : ils sont passés en `children` depuis le layout, pas importés ici.
 * Aucun code supplémentaire ne part donc dans le bundle client.
 *
 * `usePathname` est disponible au rendu serveur dans l'App Router : pas de
 * clignotement du header au chargement.
 */
export default function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (isBareRoute(pathname ?? "")) return null;
  return <>{children}</>;
}
