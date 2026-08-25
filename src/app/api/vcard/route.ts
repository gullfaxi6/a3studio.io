import { carte } from "@/content/carte";
import { cartePhotoJpegBase64 } from "@/content/carte-photo";

/**
 * Génération de la vCard de Sébastien Bertucci (/api/vcard).
 *
 * Choix techniques :
 * - vCard **3.0** (RFC 2426) et non 4.0 : la 3.0 est le format d'interopérabilité
 *   maximale (iOS, macOS, Android, Google Contacts, Outlook, CRM). Le support
 *   grand public de la 4.0 reste inégal, Outlook en particulier. Rien dans une
 *   fiche professionnelle normale n'exige une propriété propre à la 4.0.
 * - **CRLF** obligatoire entre les lignes (la spec l'impose ; certains parseurs
 *   stricts, dont Outlook, rejettent un fichier en LF seul).
 * - **Pliage à 75 octets** : la spec limite la longueur de ligne. Une URL LinkedIn
 *   longue dépasse la limite et casse l'import chez les parseurs stricts.
 * - **Échappement** des `\ ; ,` et des retours à la ligne dans les valeurs texte.
 * - `Content-Disposition` conditionné à l'agent utilisateur (voir plus bas).
 */

/** Échappe une valeur texte vCard (RFC 2426 §5). Ordre important : backslash d'abord. */
function escapeValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/**
 * Plie une ligne à 75 octets UTF-8, continuation préfixée d'une espace.
 * Le découpage se fait sur les octets, jamais au milieu d'un caractère
 * multi-octets — sinon les accents sortent corrompus.
 */
function foldLine(line: string): string {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= 75) return line;

  const parts: string[] = [];
  let current = "";
  let currentBytes = 0;
  // Première ligne : 75 octets. Continuations : 74 (l'espace de tête compte).
  let limit = 75;

  for (const char of line) {
    const charBytes = encoder.encode(char).length;
    if (currentBytes + charBytes > limit) {
      parts.push(current);
      current = "";
      currentBytes = 0;
      limit = 74;
    }
    current += char;
    currentBytes += charBytes;
  }
  if (current) parts.push(current);

  return parts.map((part, i) => (i === 0 ? part : ` ${part}`)).join("\r\n");
}

function buildVCard(): string {
  const lines: string[] = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    // N : Nom;Prénom;Autres;Préfixe;Suffixe
    `N:${escapeValue(carte.lastName)};${escapeValue(carte.firstName)};;;`,
    `FN:${escapeValue(carte.fullName)}`,
    `ORG:${escapeValue(carte.org)}`,
    `TITLE:${escapeValue(carte.role)}`,
    `EMAIL;TYPE=INTERNET,PREF:${carte.email}`,
  ];

  if (carte.phone) {
    lines.push(`TEL;TYPE=CELL,VOICE:${carte.phone}`);
  }

  lines.push(`URL:${carte.website}`);

  if (carte.linkedin) {
    // Le groupe `item1.` + X-ABLabel produit un libellé « LinkedIn » propre sur iOS.
    // encodeURI : l'URL contient un accent (…sébastien-bertucci…) que certains
    // clients n'acceptent pas tel quel.
    lines.push(`item1.URL:${encodeURI(carte.linkedin)}`);
    lines.push("item1.X-ABLabel:LinkedIn");
  }

  lines.push(`NOTE:${escapeValue(`${carte.expertise.join(" / ")} — ${carte.zone}`)}`);

  // Photo embarquée plutôt que référencée par URI : la fiche reste complète
  // hors ligne et ne dépend pas de la disponibilité du site. Syntaxe vCard 3.0
  // (`ENCODING=b`) — la 4.0 utiliserait une data URI, que la 3.0 ne comprend pas.
  // La ligne est très longue : le pliage à 75 octets ci-dessous est obligatoire,
  // plusieurs clients rejettent un bloc base64 non plié.
  if (cartePhotoJpegBase64) {
    lines.push(`PHOTO;ENCODING=b;TYPE=JPEG:${cartePhotoJpegBase64}`);
  }

  lines.push(`REV:${carte.revision}`);
  lines.push("END:VCARD");

  return lines.map(foldLine).join("\r\n") + "\r\n";
}

/**
 * iOS affiche la fiche contact native quand le fichier est servi `inline`.
 * Un `attachment` peut au contraire l'envoyer dans l'app Fichiers et perdre
 * l'utilisateur. Android et le poste de travail veulent l'inverse : `attachment`
 * déclenche un vrai téléchargement exploitable.
 *
 * ⚠️ Ce comportement a changé plusieurs fois selon les versions d'iOS :
 * à revalider sur appareil réel après toute mise à jour majeure.
 */
function isAppleMobile(userAgent: string): boolean {
  return /iPad|iPhone|iPod/.test(userAgent) || (/Macintosh/.test(userAgent) && /Mobile/.test(userAgent));
}

export async function GET(request: Request) {
  const userAgent = request.headers.get("user-agent") ?? "";
  const disposition = isAppleMobile(userAgent) ? "inline" : "attachment";
  const body = buildVCard();

  return new Response(body, {
    status: 200,
    headers: {
      // text/x-vcard est déprécié depuis la spec 4 : ne pas l'utiliser.
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `${disposition}; filename="${carte.vcardFilename}"`,
      // La réponse varie selon l'agent : sans Vary, un CDN servirait le mauvais
      // en-tête de disposition à la moitié des visiteurs.
      Vary: "User-Agent",
      "Cache-Control": "public, max-age=3600, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
