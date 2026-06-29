"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  requestObjects,
  projectStages,
  budgetRanges,
  referralSources,
  formMicrocopy,
  fieldLimits,
} from "@/content/contact";
import { site } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<string, string>>;

const fieldBase =
  "mt-2 w-full border border-line bg-ivory px-4 py-3 text-body text-ink outline-none transition-colors rounded-[var(--radius-sm)] focus:border-accent focus:ring-2 focus:ring-accent/35 aria-[invalid=true]:border-error";
const labelBase = "block text-body-sm font-medium text-graphite";
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Mention « (facultatif) » discrète, en complément du label. */
function Optional() {
  return <span className="font-normal text-slate"> (facultatif)</span>;
}

/** Groupe visuel léger (fieldset/legend) : petit label terracotta + filet fin optionnel. */
function FieldGroup({
  legend,
  withRule = false,
  children,
}: {
  legend: string;
  withRule?: boolean;
  children: ReactNode;
}) {
  return (
    <fieldset className={`border-0 p-0 ${withRule ? "mt-10 border-t border-line pt-9" : ""}`}>
      <legend className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-accent-text">
        {legend}
      </legend>
      <div className="mt-5 space-y-6">{children}</div>
    </fieldset>
  );
}

/**
 * Formulaire de contact.
 * - Trois groupes visuels (coordonnées / projet / contexte), sans parcours multi-étapes.
 * - Labels réels associés (htmlFor / id) ; champs requis marqués (astérisque + aria-required),
 *   champs facultatifs explicitement signalés.
 * - Validation accessible : erreurs par champ (aria-invalid + aria-describedby), focus du 1er invalide.
 * - Limites de longueur (UX) cohérentes avec la validation serveur (fieldLimits partagé).
 * - Région aria-live pour les états ; succès intégré + focus déplacé vers la confirmation.
 * - Honeypot anti-spam (« website ») ; garde anti-double envoi ; autocomplete adaptés.
 * - Soumission vers /api/contact (l'API n'accuse JAMAIS un succès sans envoi réel de l'e-mail).
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [objet, setObjet] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [serverCode, setServerCode] = useState<string>("");
  const successRef = useRef<HTMLDivElement>(null);

  // Préremplit le motif depuis l'URL (ex. /contact?objet=audit) sans dépendance Suspense.
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("objet");
    if (value && requestObjects.some((o) => o.value === value)) {
      setObjet(value);
    }
  }, []);

  // Déplace le focus vers la confirmation de succès (annoncée par aria-live).
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function validate(data: Record<string, string>): Errors {
    const e: Errors = {};
    const name = (data.name ?? "").trim();
    const email = (data.email ?? "").trim();
    const message = (data.message ?? "").trim();

    if (!name) e.name = formMicrocopy.errors.name;
    else if (name.length > fieldLimits.name) e.name = formMicrocopy.errors.nameLong;

    if (!email) e.email = formMicrocopy.errors.email;
    else if (email.length > fieldLimits.email) e.email = formMicrocopy.errors.emailLong;
    else if (!emailRe.test(email)) e.email = formMicrocopy.errors.emailInvalid;

    if ((data.company ?? "").length > fieldLimits.company) e.company = formMicrocopy.errors.company;
    if ((data.phone ?? "").length > fieldLimits.phone) e.phone = formMicrocopy.errors.phone;

    if (!message) e.message = formMicrocopy.errors.message;
    else if (message.length > fieldLimits.message) e.message = formMicrocopy.errors.messageLong;

    if (data.consent !== "on") e.consent = formMicrocopy.errors.consent;
    return e;
  }

  function clearFieldError(e: React.ChangeEvent<HTMLFormElement>) {
    const name = (e.target as unknown as HTMLInputElement).name;
    if (name && errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return; // garde anti-double envoi
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const found = validate(data);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStatus("idle");
      const first = ["name", "email", "message", "consent"].find((k) => found[k]) ?? Object.keys(found)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setErrors({});
    setServerCode("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        let code = "";
        try {
          const json = (await res.json()) as { error?: string };
          code = json?.error ?? "";
        } catch {
          /* corps non JSON : message générique */
        }
        setServerCode(code);
        throw new Error("request_failed");
      }
      setStatus("success");
      form.reset();
      setObjet("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className="border border-line bg-success-bg p-8 outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <p className="text-body text-ink">{formMicrocopy.success}</p>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;
  const errId = (k: string) => (errors[k] ? `${k}-error` : undefined);

  return (
    <form onSubmit={handleSubmit} onChange={clearFieldError} noValidate className="space-y-8">
      {/* Honeypot (masqué visuellement et aux lecteurs d'écran) */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-body-sm text-slate">
        Les champs marqués d&apos;un astérisque (<span className="text-accent-text">*</span>) sont
        obligatoires.
      </p>

      {/* Groupe 1 — Vos coordonnées */}
      <FieldGroup legend="Vos coordonnées">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelBase}>
              Nom / Prénom <span className="text-accent-text">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errId("name")}
              maxLength={fieldLimits.name}
              autoComplete="name"
              className={fieldBase}
            />
            {errors.name && <p id="name-error" className="mt-1.5 text-body-sm text-error">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className={labelBase}>
              Email <span className="text-accent-text">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errId("email")}
              maxLength={fieldLimits.email}
              autoComplete="email"
              className={fieldBase}
            />
            {errors.email && <p id="email-error" className="mt-1.5 text-body-sm text-error">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="company" className={labelBase}>
              Société / Organisme
              <Optional />
            </label>
            <input
              id="company"
              name="company"
              type="text"
              aria-invalid={!!errors.company}
              aria-describedby={errId("company")}
              maxLength={fieldLimits.company}
              autoComplete="organization"
              className={fieldBase}
            />
            {errors.company && <p id="company-error" className="mt-1.5 text-body-sm text-error">{errors.company}</p>}
          </div>
          <div>
            <label htmlFor="phone" className={labelBase}>
              Téléphone
              <Optional />
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              aria-invalid={!!errors.phone}
              aria-describedby={errId("phone")}
              maxLength={fieldLimits.phone}
              autoComplete="tel"
              className={fieldBase}
            />
            {errors.phone && <p id="phone-error" className="mt-1.5 text-body-sm text-error">{errors.phone}</p>}
          </div>
        </div>
      </FieldGroup>

      {/* Groupe 2 — Votre projet */}
      <FieldGroup legend="Votre projet" withRule>
        <div>
          <label htmlFor="objet" className={labelBase}>
            Objet de la demande
            <Optional />
          </label>
          <select
            id="objet"
            name="objet"
            value={objet}
            onChange={(e) => setObjet(e.target.value)}
            className={fieldBase}
          >
            <option value="" disabled>
              Sélectionnez un objet
            </option>
            {requestObjects.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className={labelBase}>
            Quel est votre projet ? <span className="text-accent-text">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errId("message")}
            maxLength={fieldLimits.message}
            rows={5}
            placeholder={formMicrocopy.messagePlaceholder}
            className={`${fieldBase} resize-y`}
          />
          {errors.message && <p id="message-error" className="mt-1.5 text-body-sm text-error">{errors.message}</p>}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="stage" className={labelBase}>
              À quelle étape en êtes-vous ?
              <Optional />
            </label>
            <select id="stage" name="stage" defaultValue="" className={fieldBase}>
              <option value="" disabled>
                Sélectionnez une étape
              </option>
              {projectStages.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="budget" className={labelBase}>
              {formMicrocopy.budgetLabel}
              <Optional />
            </label>
            <select id="budget" name="budget" defaultValue="" className={fieldBase}>
              <option value="" disabled>
                Sélectionnez une fourchette
              </option>
              {budgetRanges.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>
      </FieldGroup>

      {/* Groupe 3 — Contexte de la demande */}
      <FieldGroup legend="Contexte de la demande" withRule>
        <div>
          <label htmlFor="source" className={labelBase}>
            Comment avez-vous connu A3 Studio ?
            <Optional />
          </label>
          <select id="source" name="source" defaultValue="" className={fieldBase}>
            <option value="" disabled>
              Sélectionnez une option
            </option>
            {referralSources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex max-w-prose items-start gap-3">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              required
              aria-required="true"
              aria-invalid={!!errors.consent}
              aria-describedby={errId("consent")}
              className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-near-black)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            />
            <label htmlFor="consent" className="text-body-sm text-graphite">
              {formMicrocopy.consentLead}{" "}
              {formMicrocopy.consentLinkPrefix}{" "}
              <Link
                href="/confidentialite"
                className="text-ink underline underline-offset-2 transition-colors hover:text-accent-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {formMicrocopy.consentLinkLabel}
              </Link>
              . <span className="text-accent-text">*</span>
            </label>
          </div>
          {errors.consent && <p id="consent-error" className="mt-1.5 text-body-sm text-error">{errors.consent}</p>}
        </div>

        {/* Région d'état accessible (annonce envoi / erreur / résumé de validation) */}
        <div aria-live="polite">
          {status === "error" && serverCode === "too_many_links" && (
            <p className="border border-error bg-error-bg px-4 py-3 text-body-sm text-error">
              {formMicrocopy.errors.tooManyLinks}
            </p>
          )}
          {status === "error" && serverCode !== "too_many_links" && (
            <p className="border border-error bg-error-bg px-4 py-3 text-body-sm text-error">
              {formMicrocopy.errorLead}{" "}
              <a href={`mailto:${site.email}`} className="underline">
                {site.email}
              </a>
              .
            </p>
          )}
          {hasErrors && status !== "error" && (
            <p className="text-body-sm text-error">{formMicrocopy.validationSummary}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center justify-center gap-2 bg-near-black px-7 py-4 text-button font-semibold uppercase tracking-[0.08em] text-on-dark transition-colors duration-200 ease-brand hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50"
        >
          <span>{status === "submitting" ? formMicrocopy.sending : formMicrocopy.submit}</span>
          <ArrowRight
            size={16}
            strokeWidth={1.75}
            aria-hidden="true"
            className="transition-transform duration-200 ease-brand group-hover:translate-x-1"
          />
        </button>
      </FieldGroup>
    </form>
  );
}
