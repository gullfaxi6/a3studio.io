import type { Metadata } from "next";
import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { pageMeta } from "@/lib/seo";
import { site } from "@/content/site";
import { legalIdentityFields, hostReady, legalIsProd } from "@/lib/legal";

export const metadata: Metadata = pageMeta({
  title: "Mentions légales",
  description: "Mentions légales du site A3 Studio.",
  path: "/mentions-legales",
});

const TODO = (
  <span className="font-medium text-accent-text">[à renseigner — non publiable]</span>
);

export default function MentionsLegalesPage() {
  const l = site.legal;
  const identity = legalIdentityFields();
  const hostOk = hostReady();

  return (
    <LegalPageLayout title="Mentions légales" updated="23 juin 2026">
      <h2>1. Éditeur du site</h2>
      <p>Le présent site est édité par :</p>
      <ul>
        <li><strong>Dénomination sociale :</strong> {site.name}</li>
        <li><strong>Forme juridique :</strong> Société par actions simplifiée unipersonnelle ({l.form})</li>
        <li><strong>Capital social :</strong> {l.capital}</li>
        <li><strong>Siège social :</strong> {l.siege}</li>
        <li><strong>SIRET :</strong> {l.siret}</li>
        <li><strong>SIREN :</strong> {l.siren}</li>
        {/* Champs susceptibles d'être incomplets : masqués en production, marqués en dev. */}
        {identity.map((f) =>
          f.ready ? (
            <li key={f.key}><strong>{f.label} :</strong> {f.value}</li>
          ) : !legalIsProd ? (
            <li key={f.key}><strong>{f.label} :</strong> {TODO}</li>
          ) : null,
        )}
        <li><strong>Adresse e-mail :</strong> <a href={`mailto:${site.email}`}>{site.email}</a></li>
        <li><strong>Téléphone :</strong> {site.phone}</li>
      </ul>

      <h2>2. Directeur de la publication</h2>
      <p>
        Le directeur de la publication est <strong>{site.founder.name}</strong>, en sa qualité de président
        de la {l.form} {site.name}.
      </p>

      <h2>3. Hébergement</h2>
      {hostOk ? (
        <>
          <p>Le site est hébergé par :</p>
          <ul>
            <li><strong>Hébergeur :</strong> {l.host.name}</li>
            <li><strong>Adresse :</strong> {l.host.address}</li>
          </ul>
        </>
      ) : !legalIsProd ? (
        <p>
          <strong>Hébergeur : {TODO}</strong> — information renseignée via{" "}
          <code>LEGAL_HOST_NAME</code>, <code>LEGAL_HOST_ADDRESS</code> et{" "}
          <code>LEGAL_HOST_CONFIRMED</code>. L'hébergeur réel du site ne doit pas être confondu avec le
          fournisseur du nom de domaine ou des DNS. Cette section ne doit pas être publiée en l'état.
        </p>
      ) : null}

      <h2>4. Accès au site</h2>
      <p>
        L'éditeur s'efforce d'assurer l'accessibilité du site, sans toutefois y être tenu. L'accès peut
        être interrompu, notamment pour maintenance, mise à jour ou pour toute autre raison technique.
      </p>

      <h2>5. Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus présents sur le site (textes, éléments graphiques, identité visuelle, mise
        en page, illustrations, images, structure) est la propriété d'{site.name} ou de ses éventuels
        ayants droit, sauf mention contraire.
      </p>
      <p>
        Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle,
        de ces éléments, par quelque procédé que ce soit, est interdite sans l'autorisation écrite préalable
        d'{site.name}.
      </p>
      <p>
        Les marques et logos de tiers éventuellement mentionnés (notamment les outils logiciels utilisés)
        demeurent la propriété de leurs détenteurs respectifs et sont cités à titre purement informatif.
      </p>

      <h2>6. Données personnelles</h2>
      <p>
        Le site met à disposition un formulaire de contact permettant à l'utilisateur de transmettre une
        demande. Les données collectées sont traitées conformément à la réglementation applicable, notamment
        au Règlement général sur la protection des données (RGPD) et à la loi « Informatique et Libertés ».
      </p>
      <p>
        Les modalités de traitement, les finalités, les durées de conservation et les droits des personnes
        sont détaillés dans la <a href="/confidentialite">politique de confidentialité</a>.
      </p>

      <h2>7. Cookies</h2>
      <p>
        Le site limite l'usage des cookies au strict nécessaire à son fonctionnement. En cas d'ajout
        ultérieur d'outils de mesure d'audience ou de services tiers, l'information et, le cas échéant, le
        recueil du consentement seront mis en place conformément à la réglementation. Voir la{" "}
        <a href="/confidentialite">politique de confidentialité</a>.
      </p>

      <h2>8. Responsabilité</h2>
      <p>
        Les informations diffusées sur le site sont fournies à titre indicatif. {site.name} s'efforce d'en
        assurer l'exactitude et la mise à jour, sans garantir qu'elles soient exemptes d'erreurs ou
        d'omissions.
      </p>
      <p>
        {site.name} ne saurait être tenu responsable des dommages directs ou indirects résultant de l'accès
        au site, de son utilisation, ou de l'impossibilité d'y accéder. Les liens éventuels vers des sites
        tiers n'engagent pas la responsabilité d'{site.name} quant à leur contenu.
      </p>

      <h2>9. Droit applicable</h2>
      <p>
        Les présentes mentions légales sont régies par le droit français. En cas de litige, et à défaut de
        résolution amiable, compétence est attribuée aux tribunaux français compétents.
      </p>

      <h2>10. Contact</h2>
      <p>
        Pour toute question relative au site ou aux présentes mentions légales :{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPageLayout>
  );
}
