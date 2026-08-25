#!/usr/bin/env node
/**
 * Prépare le visuel de la carte de visite numérique (/sebastien).
 *
 * Prend n'importe quelle image source (PNG, JPEG, WebP, quelle que soit sa
 * taille) et produit le WebP optimisé attendu par src/content/carte.ts.
 *
 *   node scripts/prepare-carte-image.mjs "C:\\chemin\\vers\\image.png"
 *
 * Sortie : public/images/carte/hero-carte-sebastien.webp
 *
 * Utilise `sharp`, déjà présent (dépendance de Next.js pour l'optimisation
 * d'images) : aucune installation supplémentaire.
 *
 * Note : on ne recadre PAS ici. La page affiche le visuel via next/image en
 * `object-cover`, donc le cadrage est fait en CSS et reste ajustable sans
 * retoucher le fichier. Le script ne fait que redimensionner et compresser.
 */

import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const LARGEUR_CIBLE = 1600; // suffisant pour un affichage plein écran en 2x
const POIDS_MAX_KO = 250;
const QUALITES = [82, 74, 66, 58]; // dégressif jusqu'à tenir sous la limite

const SORTIE = path.join("public", "images", "carte", "hero-carte-sebastien.webp");

async function main() {
  const source = process.argv[2];

  if (!source) {
    console.error("Usage : node scripts/prepare-carte-image.mjs <chemin-de-l-image>");
    console.error('Exemple : node scripts/prepare-carte-image.mjs "C:\\Users\\sebas\\Downloads\\a3.png"');
    process.exit(1);
  }

  try {
    await stat(source);
  } catch {
    console.error(`✗ Fichier introuvable : ${source}`);
    process.exit(1);
  }

  const entree = sharp(source);
  const meta = await entree.metadata();
  console.log(`Source  : ${meta.width} × ${meta.height} px, ${meta.format}`);

  if (meta.width < 1200) {
    console.warn(
      `⚠ Source étroite (${meta.width} px). En dessous de 1200 px le visuel sera flou\n` +
        "  sur un écran haute densité. Reprenez si possible une version plus large.",
    );
  }

  await mkdir(path.dirname(SORTIE), { recursive: true });

  let retenue = null;
  for (const quality of QUALITES) {
    const buffer = await sharp(source)
      // withoutEnlargement : ne jamais agrandir une source trop petite,
      // cela ne ferait qu'ajouter du poids sans ajouter de détail.
      .resize({ width: LARGEUR_CIBLE, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toBuffer();

    const ko = Math.round(buffer.length / 1024);
    console.log(`  qualité ${quality} → ${ko} Ko`);
    retenue = { buffer, ko, quality };
    if (ko <= POIDS_MAX_KO) break;
  }

  await sharp(retenue.buffer).toFile(SORTIE);
  const finale = await sharp(SORTIE).metadata();

  console.log("");
  console.log(`✓ Écrit  : ${SORTIE}`);
  console.log(`  ${finale.width} × ${finale.height} px · ${retenue.ko} Ko · qualité ${retenue.quality}`);

  if (retenue.ko > POIDS_MAX_KO) {
    console.warn(
      `⚠ ${retenue.ko} Ko, au-dessus de la cible de ${POIDS_MAX_KO} Ko même à la qualité\n` +
        "  la plus basse testée. Le visuel reste utilisable mais chargera plus lentement\n" +
        "  en 4G. Envisagez une source moins bruitée ou un recadrage plus serré.",
    );
  }

  console.log("");
  console.log("Dernière étape — dans src/content/carte.ts, remplacer heroImage par :");
  console.log('  heroImage: "/images/carte/hero-carte-sebastien.webp",');
}

main().catch((error) => {
  console.error("✗ Échec :", error.message);
  process.exit(1);
});
