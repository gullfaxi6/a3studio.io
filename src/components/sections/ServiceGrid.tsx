import ServiceCard from "@/components/cards/ServiceCard";
import Reveal from "@/components/ui/Reveal";

type Service = {
  title: string;
  text: string;
  href: string;
  image?: { src: string; alt: string };
};

type Props = {
  services: Service[];
};

/** Grille d'expertises : 3 colonnes desktop/tablette, 1 colonne mobile. Cascade au scroll. */
export default function ServiceGrid({ services }: Props) {
  return (
    <Reveal mode="group" className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {services.map((s) => (
        <ServiceCard key={s.title} title={s.title} text={s.text} href={s.href} image={s.image} />
      ))}
    </Reveal>
  );
}
