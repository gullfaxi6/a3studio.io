import Media from "@/components/ui/Media";
import Icon from "@/components/ui/Icon";
import Eyebrow from "@/components/ui/Eyebrow";

type Indicator = { icon: string; label: string };

type Props = {
  eyebrow: string;
  name: string;
  title: string;
  bio: string;
  complement?: string;
  image?: { src: string; alt: string };
  objectPosition?: string;
  indicators: Indicator[];
};

/** Section fondateur : portrait à gauche, identité + bio + indicateurs à droite. Empilé en mobile. */
export default function FounderProfile({
  eyebrow,
  name,
  title,
  bio,
  complement,
  image,
  objectPosition,
  indicators,
}: Props) {
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[5fr_8fr] lg:gap-16">
      <Media
        image={image}
        ratio="aspect-[4/5]"
        sizes="(max-width: 1024px) 100vw, 40vw"
        objectPosition={objectPosition}
        placeholderLabel="Portrait — à intégrer"
      />

      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 text-h2 text-ink">{name}</h2>
        <p className="mt-1 text-body text-slate">{title}</p>

        <p className="mt-6 max-w-prose text-graphite">{bio}</p>
        {complement && <p className="mt-4 max-w-prose text-graphite">{complement}</p>}

        <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
          {indicators.map((ind) => (
            <li key={ind.label} className="flex flex-col gap-2">
              <Icon name={ind.icon} size={22} className="text-ink" />
              <span className="text-body-sm text-graphite">{ind.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
