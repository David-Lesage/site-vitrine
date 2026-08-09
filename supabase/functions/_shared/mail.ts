// Encodage de l'OBJET des emails — parade au bug d'en-tête de denomailer 1.6.0.
//
// ── LE BUG ───────────────────────────────────────────────────────────────────
// `resolveSendConfig()` (config/mail/mod.ts) passe l'objet du message dans
// `quotedPrintableEncodeInline()`, qui l'enveloppe dans `=?utf-8?Q?…?=` PUIS lui
// applique `quotedPrintableEncode()`. Or cet encodeur insère un saut de ligne
// SOUPLE (`=\r\n`) tous les 74 caractères — donc À L'INTÉRIEUR de l'en-tête
// `Subject:`, ce qui n'a aucun sens dans un en-tête.
//
// Un CRLF au milieu d'un en-tête dont la ligne suivante ne commence PAS par une
// espace TERMINE le bloc d'en-têtes (RFC 5322 §2.2.3). Tout ce qui suit —
// `MIME-Version`, `Content-Type: multipart/…`, les frontières, le HTML encodé —
// bascule alors dans le CORPS du message, corps qui n'a plus ni type ni
// encodage déclarés. Gmail affiche donc la source MIME BRUTE :
//
//   Subject: =?utf-8?Q?[Site] Rendez-vous individuel (cours / d=c3=a9monstration priv=c3=a9e) =e2=
//   =80=94 David Lesage?=
//   MIME-Version: 1.0
//   Content-Type: multipart/mixed; boundary=attachment100
//   …
//   <!doctype html><html lang=3d"fr">…
//
// Déclencheur DOUBLE : l'objet contient au moins un caractère non-ASCII (accent,
// tiret cadratin, emoji…) ET sa forme quoted-printable dépasse 74 caractères.
// D'où le symptôme trompeur : « Handpan Studio — tu es sur la liste ✨ » (53 car.
// encodés) arrivait très bien, alors que la notification de lead, qui embarque
// un nom saisi par le visiteur, cassait. Ce n'est donc PAS un problème de HTML
// sans partie texte : `muling-claim-payment` n'envoie que du texte brut et était
// touché de la même façon.
//
// denomailer 1.6.0 est la DERNIÈRE version publiée sur deno.land/x — il n'y a
// pas de mise à jour à attendre.
//
// ── LA PARADE ────────────────────────────────────────────────────────────────
// denomailer ne réécrit PAS un objet déjà purement ASCII qui ne commence pas par
// `=?` : il l'écrit tel quel, quelle que soit sa longueur. On encode donc
// nous-mêmes, correctement, en mots encodés RFC 2047 (base64), ce qui produit un
// objet 100 % ASCII et sans aucun CRLF.
//
// ⚠️ TOUT `subject:` passé à `SMTPClient.send()` doit traverser `mailSubject()`.

/** Replis ASCII des caractères typographiques que NFKD ne décompose pas. */
const ASCII_FOLD: Record<string, string> = {
    '—': '-', '–': '-', '−': '-', '‑': '-', '·': '-', '•': '-',
    '’': "'", '‘': "'", '“': '"', '”': '"', '«': '"', '»': '"',
    '…': '...', '€': 'EUR', '£': 'GBP', '×': 'x', '✨': '', '⚠': '!',
};

/** Dernier recours : un objet 100 % ASCII, toujours écrit tel quel par la lib. */
function asciiFold(s: string): string {
    const folded = s
        .normalize('NFKD')
        .replace(/[̀-ͯ]/g, '') // accents combinants : é → e, ç → c
        .replace(/[^\x20-\x7E]/g, (c) => ASCII_FOLD[c] ?? '')
        .replace(/ {2,}/g, ' ')
        .trim();
    return folded || 'Message';
}

/** base64 d'une suite d'octets. */
function b64(bytes: number[]): string {
    let bin = '';
    for (const b of bytes) bin += String.fromCharCode(b);
    return btoa(bin);
}

/**
 * Rend un objet d'email sûr pour denomailer 1.6.0.
 *
 * Garanties du résultat :
 *   • 100 % ASCII imprimable — aucun CRLF, donc aucun bloc d'en-têtes coupé ;
 *   • ne commence jamais par `=?` — donc denomailer l'écrit VERBATIM et ne peut
 *     plus y réinjecter de saut de ligne souple ;
 *   • accents et emoji préservés via des mots encodés RFC 2047 conformes
 *     (base64, ≤ 75 caractères par mot), décodés par tous les clients mail.
 */
export function mailSubject(raw: string): string {
    // Un CRLF déjà présent dans l'objet casserait l'en-tête de la même façon.
    const flat = String(raw ?? '').replace(/[\r\n\t]+/g, ' ').replace(/ {2,}/g, ' ').trim();
    if (!flat) return 'Message';

    // Cas le plus fréquent : déjà ASCII, la lib n'y touche pas.
    if (!/[^\x20-\x7E]/.test(flat)) return flat;

    // On garde en clair les mots de TÊTE purement ASCII : le résultat ne doit pas
    // commencer par `=?`, sans quoi denomailer le ré-encoderait (bug réintroduit).
    const words = flat.split(' ');
    const lead: string[] = [];
    let i = 0;
    while (i < words.length && !/[^\x20-\x7E]/.test(words[i])) lead.push(words[i++]);
    const tail = words.slice(i).join(' ');

    // 45 octets par mot encodé → 60 caractères base64, soit 72 avec l'enveloppe
    // `=?utf-8?B?…?=` : sous la limite de 75 de la RFC 2047. La coupe se fait sur
    // des frontières de CARACTÈRE, jamais au milieu d'une séquence UTF-8.
    // Deux mots encodés séparés par une espace sont recollés SANS cette espace à
    // la lecture (RFC 2047 §6.2) : les espaces réelles sont dans le base64.
    const enc = new TextEncoder();
    const chunks: string[] = [];
    let buf: number[] = [];
    for (const ch of tail) {
        const bytes = Array.from(enc.encode(ch));
        if (buf.length + bytes.length > 45) {
            chunks.push(b64(buf));
            buf = [];
        }
        for (const b of bytes) buf.push(b);
    }
    if (buf.length) chunks.push(b64(buf));

    const out = [...lead, ...chunks.map((c) => `=?utf-8?B?${c}?=`)].join(' ');

    // L'objet commençait par du non-ASCII → `out` commence par `=?` et la lib le
    // ré-encoderait : on replie alors tout l'objet en ASCII pur.
    return out.startsWith('=?') ? asciiFold(flat) : out;
}

// ─────────────────────────────────────────────────────────────────────────────
// Encodage du CORPS des emails — SECOND bug, indépendant, de denomailer 1.6.0.
//
// ── LE BUG ───────────────────────────────────────────────────────────────────
// `quotedPrintableEncode()` (config/mail/encoding.ts) construit ses octets
// échappés avec `i.toString(16)`, qui produit de l'hexadécimal MINUSCULE. Le
// caractère `=` (code 61) est explicitement exclu du passage en clair
// (`code !== 61`) : il ressort donc en `=3d`. Or la RFC 2045 §6.7 impose des
// hexadécimaux MAJUSCULES (« lowercase is not permitted »). Vérifié en local :
//
//   entrée : <meta name="viewport" content="width=device-width, initial-scale=1" />
//   sortie : <meta name=3d"viewport" content=3d"width=3ddevice-width, initial-scale=3d1=
//            " />
//
// (La même fonction contient aussi une ligne morte — `data.replaceAll("=", "=3D");`
// dont la valeur de retour est jetée. Inoffensive uniquement par coïncidence :
// la boucle par caractère échappe déjà `=`… en minuscule.)
//
// Conséquence RÉELLE, au-delà du cosmétique : tout `=` littéral d'un corps est
// concerné, y compris dans une CHAÎNE DE REQUÊTE d'URL. `order-documents` envoie
// une URL de téléchargement signée Supabase contenant `?token=…` :
//
//   …/a.pdf?token=eyJhbGciOiJIUzI1NiJ9&download=1
//   → …/a.pdf?token=3deyJhbGciOi=\r\nJIUzI1NiJ9&download=3d1
//
// Un décodeur strict laisse `=3d` tel quel → lien de téléchargement CASSÉ pour
// un vrai client. denomailer 1.6.0 est la dernière version publiée : aucun
// correctif à attendre en amont.
//
// ── LA PARADE ────────────────────────────────────────────────────────────────
// `resolveContent()` (config/mail/content.ts) n'applique `quotedPrintableEncode()`
// QU'AUX champs `html` et `content` ; les entrées de `mimeContent` sont reprises
// telles quelles (`[...mimeContent ?? []]`) et écrites VERBATIM sur le fil par
// `client/basic/client.ts`, avec l'en-tête `Content-Transfer-Encoding` demandé.
// On fournit donc nous-mêmes une partie MIME déjà encodée en base64 : plus de
// quoted-printable du tout, donc ni casse d'hexadécimal, ni saut de ligne
// souple, ni échappement de `=`. Bonus : l'alphabet base64 ne peut jamais
// produire une ligne commençant par « . » (protection naturelle contre le
// « dot-stuffing » SMTP).
//
// ⚠️ NE PLUS JAMAIS passer `html:` ni `content:` à `SMTPClient.send()` :
//    utiliser `mimeContent: [htmlPart(…)]` ou `mimeContent: [textPart(…)]`.

/** Une partie MIME prête à écrire — forme attendue par `SendConfig.mimeContent`. */
export interface MailPart {
    mimeType: string;
    content: string;
    transferEncoding: string;
}

/**
 * base64 des octets UTF-8 d'une chaîne, en lignes DURES de 76 caractères
 * (RFC 2045 §6.8 : 76 max, saut de ligne réel et non « souple »).
 */
function base64Body(s: string): string {
    const bytes = new TextEncoder().encode(String(s ?? ''));
    // Par blocs : `String.fromCharCode(...tableau)` explose la pile sur un
    // corps volumineux (limite d'arguments).
    let bin = '';
    const CHUNK = 0x8000;
    for (let i = 0; i < bytes.length; i += CHUNK) {
        bin += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
    }
    return (btoa(bin).match(/.{1,76}/g) ?? []).join('\r\n');
}

/** Partie `text/html` encodée en base64 — remplace tout `html:` passé à `send()`. */
export function htmlPart(html: string): MailPart {
    return {
        mimeType: 'text/html; charset="utf-8"',
        content: base64Body(html),
        transferEncoding: 'base64',
    };
}

/** Partie `text/plain` encodée en base64 — remplace tout `content:` passé à `send()`. */
export function textPart(text: string): MailPart {
    return {
        mimeType: 'text/plain; charset="utf-8"',
        content: base64Body(text),
        transferEncoding: 'base64',
    };
}
