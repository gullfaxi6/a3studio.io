import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";

type Props = {
  eyebrow: string;
  title: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * En-tête de section : eyebrow + titre H2.
 * align="left" pour les sections narratives, "center" pour les sections vitrine.
 */
export default function SectionHeading({ eyebrow, title, align = "left", className = "" }: Props) {
  const isCenter = align === "center";
  return (
    <div className={`${isCenter ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-balance text-h2 text-ink">{title}</h2>
    </div>
  );
}
