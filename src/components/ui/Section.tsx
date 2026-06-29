import type { ReactNode } from "react";
import Container from "./Container";

type Background = "sand" | "stone" | "ivory" | "dark";

type Props = {
  children: ReactNode;
  background?: Background;
  container?: boolean;
  id?: string;
  className?: string;
};

const backgrounds: Record<Background, string> = {
  sand: "bg-sand",
  stone: "bg-stone",
  ivory: "bg-ivory",
  dark: "on-dark bg-near-black text-on-dark",
};

/**
 * Section au rythme vertical homogène (64 → 140px).
 * Le rythme est centralisé ici : ne pas le redéfinir par composant.
 */
export default function Section({
  children,
  background = "sand",
  container = true,
  id,
  className = "",
}: Props) {
  return (
    <section id={id} className={`py-[var(--section-y)] ${backgrounds[background]} ${className}`}>
      {container ? <Container>{children}</Container> : children}
    </section>
  );
}
