#!/usr/bin/env node
/**
 * Prépare la photo embarquée dans la vCard (/api/vcard).
 *
 *   node scripts/prepare-vcard-photo.mjs
 *
 * Lit public/images/studio-founder-sebastien.webp, produit un JPEG carré
 * optimisé et écrit sa version base64 dans src/content/carte-photo.ts.
 *
 * Pourquoi une constante générée plutôt qu'une lecture au moment de la requête :
 * sur Vercel, les fichiers de public/ sont servis comme actifs statiques et ne
 * sont pas garantis présents dans le système de fichiers de la fonction
 * serverless. Un `fs.readFile` marcherait en local et échouerait en production.
 * Un `fetch` HTTP ajouterait une latence et une dépendance réseau à chaque
 * téléchargement de contact. La constante est déterministe et sans I/O.
 *
 * Le module généré n'est importé que par la route d'API : il ne part jamais
 * dans le bundle client.
 */

import { writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const SOURCE = path.join("public", "images", "studio-founder-sebastien.webp");
const SORTIE = path.join("src", "content", "carte-photo.ts");

// 240 px : au-delà, le gain visuel est nul dans un carnet d'adresses et le
// poids de la vCard grimpe. Certains clients de messagerie refusent une fiche
// au-delà d'une cinquantaine de kilo-octets.
const COTE = 240;
const POIDS_MAX_KO = 40;
const QUALITES = [82, 74, 66, 58, 50];

async function main() {
  const meta = await sharp(SOURCE).metadata();
  console.log(`Source : ${meta.width} × ${meta.height} ${meta.format}`);

  let retenue = null;
  for (const quality of QUALITES) {
    const buffer = await sharp(SOURCE)
      // Recadrage carré : `attention` cible la zone saillante de l'image, ce qui
      // sur un portrait vertical cadre le visage plutôt que le centre
      // géométrique — lequel tomberait sur le buste.
      .resize(COTE, COTE, { fit: "cover", position: sharp.strategy.attention })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();

    const ko = buffer.length / 1024;
    console.log(`  qualité ${quality} → ${ko.toFixed(1)} Ko`);
    retenue = { buffer, ko, quality };
    if (ko <= POIDS_MAX_KO) break;
  }

  if (retenue.ko > POIDS_MAX_KO) {
    console.warn(`⚠ ${retenue.ko.toFixed(1)} Ko : au-dessus de la cible de ${POIDS_MAX_KO} Ko.`);
  }

  const base64 = retenue.buffer.toString("base64");

  const contenu = `// Fichier GÉNÉRÉ — ne pas modifier à la main.
// Régénérer : node scripts/prepare-vcard-photo.mjs
//
// Photo de ${COTE} × ${COTE} px encodée en base64, embarquée dans la vCard
// (propriété PHOTO). Source : ${SOURCE.replace(/\\\\/g, "/")}
// JPEG qualité ${retenue.quality} — ${retenue.ko.toFixed(1)} Ko binaires,
// ${(base64.length / 1024).toFixed(1)} Ko une fois encodés.
//
// Importé uniquement par la route /api/vcard : ne part jamais dans le bundle client.

export const cartePhotoJpegBase64 =
  "${base64}";
`;

  await writeFile(SORTIE, contenu, "utf8");
  console.log("");
  console.log(`✓ Écrit : ${SORTIE}`);
  console.log(`  ${COTE} × ${COTE} px · ${retenue.ko.toFixed(1)} Ko · base64 ${(base64.length / 1024).toFixed(1)} Ko`);
}

main().catch((error) => {
  console.error("✗ Échec :", error.message);
  process.exit(1);
});
