import type { Metadata } from "next";
import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { pageMeta } from "@/lib/seo";
import { site } from "@/content/site";
import { hostReady } from "@/lib/legal";

export const metadata: Metadata = pageMeta({
  title: "Politique de confidentialité",
  description: "Politique de confidentialité du site A3 Studio.",
  path: "/confidentialite",
});

export default function ConfidentialitePage() {
  const l = site.legal;
  const hostOk = hostReady();
  return (
    <LegalPageLayout title="Politique de confidentialité" updated="23 juin 2026">
      <p>
        La présente politique décrit la manière dont {site.name} collecte, utilise et protège les données
        personnelles des utilisateurs du site, conformément au Règlement général sur la protection des
        données (RGPD) et à la loi « Informatique et Libertés ».
      </p>

      <h2>1. Responsable du traitement</h2>
      <ul>
        <li><strong>{site.name}</strong> ({l.form})</li>
        <li><strong>Siège social :</strong> {l.siege}</li>
        <li><strong>Responsable de traitement :</strong> {site.founder.name}</li>
        <li><strong>Contact :</strong> <a href={`mailto:${site.email}`}>{site.email}</a></li>
      </ul>

      <h2>2. Données collectées</h2>
      <p>
        {site.name} ne collecte que les données strictement nécessaires au traitement des demandes. Via le
        formulaire de contact, les données suivantes peuvent être collectées :
      </p>
      <ul>
        <li>nom / prénom ;</li>
        <li>adresse e-mail ;</li>
        <li>société / organisme (facultatif) ;</li>
        <li>numéro de téléphone (facultatif) ;</li>
        <li>objet et description de la demande ;</li>
        <li>étape du projet (facultatif) ;</li>
        <li>budget prévisionnel (facultatif) ;</li>
        <li>origine de la prise de contact (facultatif) ;</li>
        <li>consentement à être recontacté.</li>
      </ul>
      <p>
        Des données techniques minimales (par exemple journaux de connexion du serveur) peuvent être
        traitées par l'hébergeur aux fins de sécurité et de bon fonctionnement du site. {site.name} ne
        collecte aucune donnée dite « sensible » et ne procède à aucun profilage ni décision automatisée.
      </p>

      <h2>3. Finalités du traitement</h2>
      <p>Les données collectées via le formulaire sont utilisées exclusivement pour :</p>
      <ul>
        <li>répondre à la demande de contact ;</li>
        <li>échanger avec l'utilisateur dans le cadre de sa demande ;</li>
        <li>assurer le suivi d'un éventuel projet ou échange professionnel.</li>
      </ul>
      <p>
        Les données ne font l'objet d'aucune cession ni d'aucune utilisation à des fins de prospection non
        sollicitée.
      </p>

      <h2>4. Base légale</h2>
      <ul>
        <li>le <strong>consentement</strong> de l'utilisateur, recueilli lors de l'envoi du formulaire (case à cocher) ;</li>
        <li>l'<strong>intérêt légitime</strong> d'{site.name} à répondre aux demandes qui lui sont adressées et à gérer la relation qui en découle.</li>
      </ul>

      <h2>5. Durée de conservation</h2>
      <p>
        Les données transmises via le formulaire sont conservées pendant une durée de{" "}
        <strong>3 ans à compter du dernier contact</strong> avec l'utilisateur, conformément aux
        recommandations de la CNIL en matière de gestion des contacts professionnels.
      </p>
      <p>
        À l'issue de cette durée, les données sont supprimées ou anonymisées. Si une relation contractuelle
        est nouée, les données nécessaires sont conservées selon les durées légales applicables (obligations
        comptables et contractuelles).
      </p>

      <h2>6. Destinataires des données</h2>
      <p>
        Les données sont destinées exclusivement à {site.name}. Elles peuvent être traitées par des
        sous-traitants techniques agissant pour son compte, dans le cadre strict de la fourniture de leurs
        services :
      </p>
      <ul>
        <li>
          <strong>Hébergeur du site :</strong>{" "}
          {hostOk ? l.host.name : "prestataire d'hébergement à préciser selon la solution de déploiement retenue"}.
        </li>
        <li>
          <strong>Service d'acheminement des e-mails du formulaire :</strong> prestataire d'envoi
          transactionnel (par exemple Resend), sous réserve de sa configuration effective en production.
        </li>
      </ul>
      <p>
        Cette liste sera complétée et précisée selon les prestataires réellement retenus. {site.name}
        s'assure que ses sous-traitants présentent des garanties suffisantes en matière de protection des
        données et n'utilisent les données qu'aux seules fins définies ci-dessus.
      </p>

      <h2>7. Localisation et transferts hors EEE</h2>
      <p>
        La localisation des données dépend des prestataires retenus pour l'hébergement et l'envoi des
        e-mails. Selon ces prestataires, tout ou partie des traitements peut impliquer un transfert de
        données hors de l'Espace économique européen (EEE). Le cas échéant, ces transferts sont encadrés
        par les garanties prévues par le RGPD, notamment des clauses contractuelles types ou un mécanisme
        de transfert reconnu.
      </p>
      <p>
        Tant que les prestataires définitifs (hébergement et envoi d'e-mails) ne sont pas arrêtés et
        documentés, la localisation exacte des données ne peut être garantie. La présente section sera mise
        à jour en conséquence.
      </p>

      <h2>8. Sécurité</h2>
      <p>
        {site.name} met en œuvre des mesures techniques et organisationnelles raisonnables pour protéger les
        données contre tout accès, altération, divulgation ou destruction non autorisés (notamment connexion
        sécurisée HTTPS et limitation des accès).
      </p>

      <h2>9. Droits des utilisateurs</h2>
      <p>Conformément à la réglementation, l'utilisateur dispose des droits suivants sur ses données :</p>
      <ul>
        <li>droit d'<strong>accès</strong> ;</li>
        <li>droit de <strong>rectification</strong> ;</li>
        <li>droit à l'<strong>effacement</strong> ;</li>
        <li>droit à la <strong>limitation</strong> du traitement ;</li>
        <li>droit d'<strong>opposition</strong> ;</li>
        <li>droit à la <strong>portabilité</strong> ;</li>
        <li>droit de <strong>retirer son consentement</strong> à tout moment.</li>
      </ul>
      <p>
        Ces droits peuvent être exercés en écrivant à <a href={`mailto:${site.email}`}>{site.email}</a>.
        L'utilisateur dispose également du droit d'introduire une réclamation auprès de la{" "}
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">CNIL</a>.
      </p>

      <h2>10. Cookies</h2>
      <p>
        Le site limite l'usage des cookies au strict nécessaire à son fonctionnement. Aucun cookie de suivi
        publicitaire n'est utilisé. En cas d'ajout ultérieur d'un outil de mesure d'audience ou d'un service
        tiers déposant des cookies non essentiels, une information claire et, le cas échéant, un mécanisme de
        recueil du consentement seront mis en place.
      </p>

      <h2>11. Modifications</h2>
      <p>
        {site.name} se réserve le droit de modifier la présente politique afin de l'adapter aux évolutions
        légales, réglementaires ou techniques. La version applicable est celle publiée sur le site à la date
        de consultation.
      </p>

      <h2>12. Contact</h2>
      <p>
        Pour toute question relative à la présente politique ou au traitement de vos données :{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPageLayout>
  );
}
