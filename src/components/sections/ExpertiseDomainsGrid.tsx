import DomainExpertiseCard from "@/components/cards/DomainExpertiseCard";

type Domain = {
  title: string;
  description: string;
  deliverables: string[];
  image?: { src: string; alt: string };
};

type Props = {
  domains: Domain[];
};

/** Grille des domaines d'expertise : 3 colonnes desktop/tablette, 1 colonne mobile. */
export default function ExpertiseDomainsGrid({ domains }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {domains.map((d) => (
        <DomainExpertiseCard
          key={d.title}
          title={d.title}
          description={d.description}
          deliverables={d.deliverables}
          image={d.image}
        />
      ))}
    </div>
  );
}
