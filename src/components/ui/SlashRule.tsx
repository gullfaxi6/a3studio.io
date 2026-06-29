type Props = {
  className?: string;
  onDark?: boolean;
};

/**
 * Signature de marque : la barre oblique « / » comme respiration éditoriale.
 * Élément purement décoratif → aria-hidden.
 */
export default function SlashRule({ className = "", onDark = false }: Props) {
  return (
    <span
      aria-hidden="true"
      className={`block select-none font-serif text-[1.75rem] leading-none ${
        onDark ? "text-on-dark-muted" : "text-graphite/70"
      } ${className}`}
    >
      /
    </span>
  );
}
