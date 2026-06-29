import Image from "next/image";

type Props = {
  image?: { src: string; alt: string; priority?: boolean };
  ratio?: string; // classe d'aspect-ratio Tailwind, ex. "aspect-[4/3]"
  sizes?: string;
  objectPosition?: string; // ex. "center 15%" — cadrage ajustable
  placeholderLabel?: string;
  className?: string;
  /** Léger zoom au survol (≤1.02) lorsque Media est dans un ancêtre `group`. */
  zoom?: boolean;
};

/**
 * Rend une image (next/image, object-cover) ou, à défaut, le placeholder sobre
 * prévu par le design system (« Visuel — à intégrer »). Aucun visuel fictif.
 * `objectPosition` permet d'ajuster finement le cadrage (ex. portrait).
 */
export default function Media({
  image,
  ratio = "aspect-[4/3]",
  sizes,
  objectPosition,
  placeholderLabel = "Visuel — à intégrer",
  className = "",
  zoom = false,
}: Props) {
  return (
    <div className={`relative w-full overflow-hidden ${ratio} ${className}`}>
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={image.priority}
          sizes={sizes}
          style={objectPosition ? { objectPosition } : undefined}
          className={`object-cover transition-transform duration-[var(--motion-medium)] ease-brand ${
            zoom ? "group-hover:scale-[1.02]" : ""
          }`}
        />
      ) : (
        <div
          role="img"
          aria-label="Emplacement de visuel à intégrer"
          className="flex h-full w-full items-center justify-center border border-line bg-placeholder"
        >
          <span className="px-4 text-center text-eyebrow uppercase tracking-[0.12em] text-slate">
            {placeholderLabel}
          </span>
        </div>
      )}
    </div>
  );
}
