import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import { site } from "@/content/site";

type Props = {
  className?: string;
};

/** Coordonnées directes : email, téléphone, LinkedIn. Données réelles (site.ts). */
export default function ContactDetails({ className = "" }: Props) {
  const items = [
    { icon: "mail", label: site.email, href: `mailto:${site.email}`, external: false },
    { icon: "phone", label: site.phone, href: site.phoneHref, external: false },
    { icon: "linkedin", label: "LinkedIn", href: site.linkedin, external: true },
  ];

  return (
    <div className={`border border-line bg-ivory p-8 ${className}`}>
      <Eyebrow>Coordonnées</Eyebrow>
      <ul className="mt-4 space-y-4">
        {items.map((it) => (
          <li key={it.href}>
            <a
              href={it.href}
              {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group inline-flex items-center gap-3 text-body text-ink transition-colors hover:text-accent-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Icon name={it.icon} size={18} className="shrink-0 text-slate transition-colors group-hover:text-accent" />
              <span>{it.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
