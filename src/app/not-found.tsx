import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section>
      <div className="max-w-2xl">
        <span className="block text-eyebrow uppercase tracking-[0.12em] text-slate">Erreur 404</span>
        <h1 className="mt-4 text-h1 text-ink">Cette page n'existe pas.</h1>
        <p className="mt-6 max-w-prose text-graphite">
          La page recherchée est introuvable ou a été déplacée. Revenez à l'accueil pour poursuivre
          votre navigation.
        </p>
        <div className="mt-8">
          <Button href="/" variant="primary" arrow>
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </Section>
  );
}
