import DeliverableFamilyCard from "@/components/cards/DeliverableFamilyCard";

type Family = {
  number: string;
  title: string;
  intro: string;
  examples: string[];
  image?: { src: string; alt: string };
};

type Props = {
  families: Family[];
  examplesLabel: string;
};

/** Grille des familles de livrables : 1 colonne mobile, 2×2 dès la tablette (plus éditorial). */
export default function DeliverablesGrid({ families, examplesLabel }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {families.map((f) => (
        <DeliverableFamilyCard
          key={f.number}
          number={f.number}
          title={f.title}
          intro={f.intro}
          examples={f.examples}
          examplesLabel={examplesLabel}
          image={f.image}
        />
      ))}
    </div>
  );
}
