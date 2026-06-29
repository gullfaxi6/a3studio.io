import Container from "@/components/ui/Container";
import Media from "@/components/ui/Media";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

type Cta = { label: string; href: string; variant?: "primary" | "secondary" | "tertiary" | "accent" };

type Props = {
  label: string;
  /** Lignes du H1 (un seul <h1>, retours à la ligne contrôlés + révélés un par un). */
  titleLines: string[];
  intro: string;
  ctas?: Cta[];
  image?: { src: string; alt: string; priority?: boolean };
  /**
   * Accueil uniquement : rééquilibre desktop (texte ~55 / image ~45),
   * H1 réduit de ~8 % et hauteur du héros resserrée (~8 %). N'affecte que ≥1024px ;
   * mobile/tablette strictement inchangés. Les 3 lignes du H1 sont préservées
   * (retours forcés), la réduction de corps diminue tout risque de retour à la ligne.
   */
  balanced?: boolean;
  /**
   * Variante « image en avant » (Expertise) : même rééquilibrage desktop que `balanced`
   * (texte ~55 / image ~45, hauteur du héros resserrée d'environ 8 %), mais **sans**
   * réduction du H1. N'affecte que ≥1024px ; mobile/tablette inchangés. Scopée par page.
   */
  mediaForward?: boolean;
  /**
   * Accueil uniquement : taille de H1 desktop spécifique (`--hero-h1-home`), calée sur la
   * largeur de la colonne 55 % pour que la ligne la plus longue (« Architecturer avec
   * clarté. ») tienne sur une seule ligne de 1024px à ultra-large. À utiliser avec
   * `balanced` (qui fournit la grille 55/45). N'affecte que ≥1024px ; mobile inchangé.
   */
  tightH1?: boolean;
};

/**
 * Héros éditorial : texte à gauche, visuel à droite (~60/40 desktop), empilé en mobile.
 * Apparition séquencée à l'entrée (label → lignes du titre → paragraphe → CTA → visuel),
 * pilotée par les data-attributes + globals.css (Reveal en mode « bare »).
 * Sans visuel fourni, un panneau sobre est rendu (règle zéro projet).
 */
export default function Hero({ label, titleLines, intro, ctas, image, balanced = false, mediaForward = false, tightH1 = false }: Props) {
  // Desktop uniquement (lg:) ; mobile/tablette identiques dans tous les cas.
  // `balanced` et `mediaForward` partagent le rééquilibrage 55/45 + hauteur resserrée ;
  // seul `balanced` (sans `mediaForward`) réduit aussi le H1.
  const balancedLayout = balanced || mediaForward;
  const gridCols = balancedLayout ? "lg:grid-cols-[55fr_45fr]" : "lg:grid-cols-[60fr_40fr]";
  const padY = balancedLayout
    ? "py-[clamp(2.5rem,1.5rem+2.6vw,4.6rem)]"
    : "py-[clamp(2.5rem,1.5rem+3vw,5rem)]";
  const h1Cls = tightH1
    ? "mt-4 text-h1 text-ink lg:[font-size:var(--hero-h1-home)]"
    : balanced && !mediaForward
      ? "mt-4 text-h1 text-ink lg:[font-size:var(--hero-h1-balanced)]"
      : "mt-4 text-h1 text-ink";

  return (
    <Reveal as="section" mode="bare" className="hero-reveal bg-sand">
      <Container>
        <div className={`grid items-center gap-10 ${padY} ${gridCols} lg:gap-14`}>
          {/* Texte */}
          <div className="order-2 lg:order-1">
            <div data-hero="label">
              <Eyebrow>{label}</Eyebrow>
            </div>
            <h1 className={h1Cls}>
              {titleLines.map((line, i) => (
                <span key={i} data-hero-line className="block">
                  {line}
                </span>
              ))}
            </h1>
            <div data-hero="body" className="mt-6">
              <p className="max-w-prose text-graphite">{intro}</p>
            </div>
            {ctas && ctas.length > 0 && (
              <div data-hero="cta" className="mt-8 flex flex-col gap-4 sm:flex-row">
                {ctas.map((c) => (
                  <Button key={c.href + c.label} href={c.href} variant={c.variant ?? "primary"} arrow>
                    {c.label}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Visuel */}
          <div className="order-1 lg:order-2" data-hero-visual>
            <Media image={image} ratio="aspect-[16/10]" sizes="(max-width: 1024px) 100vw, 40vw" />
          </div>
        </div>
      </Container>
    </Reveal>
  );
}
