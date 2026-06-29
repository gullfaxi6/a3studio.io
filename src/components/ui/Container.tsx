import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Conteneur centré, largeur max 1440px, padding latéral fluide (20 → 72px). */
export default function Container({ children, className = "" }: Props) {
  return (
    <div className={`mx-auto w-full max-w-[var(--container-max)] px-[var(--gutter-x)] ${className}`}>
      {children}
    </div>
  );
}
