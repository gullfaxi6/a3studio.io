import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Label / eyebrow : 11px, uppercase, tracking large, accent terracotta (design system). */
export default function Eyebrow({ children, className = "" }: Props) {
  return (
    <span className={`block text-eyebrow uppercase tracking-[0.12em] text-accent-text ${className}`}>
      {children}
    </span>
  );
}
