import { site } from "@/content/site";

/**
 * État de complétude des informations légales.
 * Règle : un champ vide est NON publiable.
 * - En développement : on affiche un marqueur explicite « non publiable ».
 * - En production : les lignes incomplètes sont masquées (et `check:legal` doit échouer).
 */

export const legalIsProd = process.env.NODE_ENV === "production";

export type LegalField = {
  key: string;
  label: string;
  value: string;
  ready: boolean;
};

/** Champs d'identité optionnels susceptibles d'être incomplets. */
export function legalIdentityFields(): LegalField[] {
  const l = site.legal;
  return [
    { key: "rcs", label: "RCS", value: l.rcs, ready: l.rcs.trim() !== "" },
    { key: "ape", label: "Code APE / NAF", value: l.ape, ready: l.ape.trim() !== "" },
    { key: "tva", label: "N° de TVA intracommunautaire", value: l.tva, ready: l.tva.trim() !== "" },
  ];
}

/** L'hébergeur n'est « prêt » que si nom + adresse sont fournis ET confirmés. */
export function hostReady(): boolean {
  const h = site.legal.host;
  return h.name.trim() !== "" && h.address.trim() !== "" && h.confirmed === true;
}

/** Vrai uniquement si toutes les informations légales requises sont renseignées. */
export function legalPublishable(): boolean {
  return legalIdentityFields().every((f) => f.ready) && hostReady();
}

/** Liste lisible des éléments manquants (pour messages dev / script de contrôle). */
export function missingLegal(): string[] {
  const out = legalIdentityFields().filter((f) => !f.ready).map((f) => f.label);
  if (!hostReady()) out.push("Hébergeur (nom + adresse + confirmation)");
  return out;
}
