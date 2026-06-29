import Eyebrow from "./Eyebrow";

type Props = {
  children: string;
  className?: string;
};

/**
 * Pour les sections sans titre visible : rend un <h2> destiné aux lecteurs d'écran
 * (hiérarchie correcte) + l'eyebrow visible (masqué à l'AT pour éviter le doublon).
 */
export default function SectionLabel({ children, className = "" }: Props) {
  return (
    <div className={className}>
      <h2 className="sr-only">{children}</h2>
      <div aria-hidden="true">
        <Eyebrow>{children}</Eyebrow>
      </div>
    </div>
  );
}
