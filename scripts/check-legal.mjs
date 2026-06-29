#!/usr/bin/env node
/**
 * Contrôle prépublication des informations légales.
 *
 * - Vérifie que les champs légaux non confirmés sont renseignés (variables d'env).
 * - ÉCHOUE (exit 1) uniquement en production réelle (VERCEL_ENV=production)
 *   ou si REQUIRE_LEGAL=true. Sinon : avertissement NON bloquant (dev / preview).
 *
 * Usage : `npm run check:legal` (manuel) — aussi exécuté en `prebuild`.
 */
const env = process.env;
const missing = [];
const need = (k) => {
  if (!env[k] || String(env[k]).trim() === "") missing.push(k);
};

need("LEGAL_RCS");
need("LEGAL_APE");
need("LEGAL_TVA");
need("LEGAL_HOST_NAME");
need("LEGAL_HOST_ADDRESS");
if (env.LEGAL_HOST_CONFIRMED !== "true") missing.push('LEGAL_HOST_CONFIRMED="true"');

// Configuration d'envoi e-mail (avertissement séparé, non bloquant ici).
const emailMissing = ["RESEND_API_KEY", "CONTACT_FROM_EMAIL"].filter(
  (k) => !env[k] || String(env[k]).trim() === "",
);

const enforce = env.VERCEL_ENV === "production" || env.REQUIRE_LEGAL === "true";

if (missing.length === 0) {
  console.log("✓ Informations légales complètes.");
} else {
  const msg = `Informations légales incomplètes : ${missing.join(", ")}`;
  if (enforce) {
    console.error(`✗ ${msg}\n  Publication bloquée (production).`);
    process.exit(1);
  }
  console.warn(`⚠ ${msg}\n  (Non bloquant hors production. À renseigner avant publication.)`);
}

if (emailMissing.length > 0) {
  console.warn(`⚠ Envoi e-mail non configuré : ${emailMissing.join(", ")} (le formulaire renverra une erreur).`);
}

process.exit(0);
