/**
 * Typographie française — insère les espaces insécables réglementaires.
 * - Espace fine insécable (U+202F) avant ; ! ?
 * - Espace insécable (U+00A0) avant : et à l'intérieur des guillemets « … »
 *
 * `frTypo` ignore les chaînes techniques (URLs, chemins, protocoles) et est
 * idempotente. `frDeep` applique la transformation en profondeur à tous les
 * champs textuels d'un contenu, en préservant les champs structurels
 * (href, src, icônes, valeurs de formulaire…) et les types TypeScript.
 */

const NNBSP = String.fromCharCode(0x202f); // espace fine insécable (avant ; ! ?)
const NBSP = String.fromCharCode(0x00a0); // espace insécable (avant :, guillemets)

// Chaînes à ne jamais transformer (liens, chemins, protocoles).
const SKIP = /(:\/\/|^\s*(https?:|tel:|mailto:|\/|#))/i;

export function frTypo(input: string): string {
  if (!input || SKIP.test(input)) return input;
  return input
    .replace(/([^\s])\s*([;!?])/g, `$1${NNBSP}$2`)
    .replace(/([^\s])\s+:(\s|$)/g, `$1${NBSP}:$2`)
    .replace(/«\s*/g, `«${NBSP}`)
    .replace(/\s*»/g, `${NBSP}»`);
}

// Champs structurels : jamais de transformation typographique.
const STRUCTURAL = new Set<string>([
  "href", "src", "icon", "variant", "value", "number", "objectPosition",
  "brand", "product", "id", "url", "email", "linkedin", "phoneHref",
  "phoneNational", "targetDomain", "siret", "siren", "rcs", "ape", "tva",
]);

export function frDeep<T>(value: T, key?: string): T {
  if (typeof value === "string") {
    return (key && STRUCTURAL.has(key) ? value : frTypo(value)) as unknown as T;
  }
  if (Array.isArray(value)) {
    return value.map((v) => frDeep(v, key)) as unknown as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = frDeep(v, k);
    }
    return out as unknown as T;
  }
  return value;
}
