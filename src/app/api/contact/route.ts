import { NextResponse } from "next/server";
import {
  fieldLimits,
  requestObjects,
  projectStages,
  budgetRanges,
  referralSources,
} from "@/content/contact";

/**
 * Réception du formulaire de contact + envoi e-mail réel (Resend, API REST).
 *
 * Garanties :
 * - aucun « faux succès » pour une soumission réelle : 200 uniquement si l'e-mail est accepté par le service ;
 * - honeypot (champ « website ») : drop silencieux ASSUMÉ — un bot n'est pas informé (seule exception au principe ci-dessus) ;
 * - heuristique anti-spam (excès de liens) : renvoie une ERREUR (422), jamais un faux succès ;
 * - validation serveur : champs requis, format e-mail, longueurs, et valeurs autorisées (objet, étape, budget, source) ;
 * - config manquante → 500 (détail en dev, message générique en prod) ;
 * - aucune clé exposée côté client (lecture via process.env, jamais NEXT_PUBLIC_).
 *
 * Variables requises : RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL.
 */

const isProd = process.env.NODE_ENV === "production";
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // 1) Honeypot : rempli ⇒ bot. Drop silencieux (on simule un succès, rien n'est envoyé).
  if (str(data.website).trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 2) Validation serveur (autorité).
  const name = str(data.name).trim();
  const email = str(data.email).trim();
  const message = str(data.message).trim();
  const company = str(data.company);
  const phone = str(data.phone);

  const invalid =
    !name ||
    name.length > fieldLimits.name ||
    !email ||
    email.length > fieldLimits.email ||
    !emailRe.test(email) ||
    !message ||
    message.length > fieldLimits.message ||
    company.length > fieldLimits.company ||
    phone.length > fieldLimits.phone ||
    data.consent !== "on";

  if (invalid) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  // 2b) Valeurs autorisées pour les champs à liste (vide = accepté car facultatif).
  const inList = (v: string, allowed: readonly string[]) => v === "" || allowed.includes(v);
  const allowedObjet = requestObjects.map((o) => o.value);
  const validLists =
    inList(str(data.objet), allowedObjet) &&
    inList(str(data.stage), projectStages as readonly string[]) &&
    inList(str(data.budget), budgetRanges as readonly string[]) &&
    inList(str(data.source), referralSources as readonly string[]);
  if (!validLists) {
    return NextResponse.json({ ok: false, error: "invalid_choice" }, { status: 400 });
  }

  // 3) Anti-spam léger : nombre de liens anormalement élevé ⇒ ERREUR explicite
  // (un utilisateur réel est informé et invité à simplifier ; aucun faux succès).
  const linkCount = (message.match(/https?:\/\//gi) ?? []).length;
  if (linkCount > 6) {
    return NextResponse.json({ ok: false, error: "too_many_links" }, { status: 422 });
  }

  // 4) Configuration de l'envoi.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      {
        ok: false,
        error: "email_not_configured",
        ...(isProd
          ? {}
          : { detail: "Service d'envoi non configuré : RESEND_API_KEY, CONTACT_TO_EMAIL et CONTACT_FROM_EMAIL sont requis." }),
      },
      { status: 500 },
    );
  }

  // 5) Composition du message.
  const objetLabel =
    requestObjects.find((o) => o.value === str(data.objet))?.label ?? "Prise de contact";
  const lines = [
    `Objet : ${objetLabel}`,
    `Nom / Prénom : ${name}`,
    `Email : ${email}`,
    `Société : ${company || "—"}`,
    `Téléphone : ${phone || "—"}`,
    `Étape : ${str(data.stage) || "—"}`,
    `Budget : ${str(data.budget) || "—"}`,
    `Source : ${str(data.source) || "—"}`,
    "",
    "Message :",
    message,
  ];

  // 6) Envoi via Resend (API REST — pas de SDK requis).
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `A3 Studio — Nouvelle demande (${objetLabel})`,
        text: lines.join("\n"),
      }),
    });

    if (!res.ok) {
      // L'e-mail n'a PAS été accepté : on ne renvoie jamais un succès.
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
