// DÉTECTION DU DÉMARCHAGE — règles explicables (03/11/2026).
//
// Demande de David (ses mots) : « placer un système de vérification de spam quand
// quelqu'un essaye de me démarcher via mon site au lieu de me faire une vraie
// demande intéressée […] être en capacité de les identifier et de les trier au
// fur et à mesure avec un warning ».
//
// UNE SEULE SOURCE pour les règles de contenu :
//   · le NAVIGATEUR les applique (formulaire de contact) pour AVERTIR avant envoi
//     — indicatif, jamais bloquant ;
//   · la BASE les applique à son tour (fonction SQL `site_lead_demarchage`,
//     déclencheur sur `site_leads`, migration 0320 du dépôt de l'app) — c'est
//     elle qui FAIT FOI. La fonction SQL est GÉNÉRÉE depuis ce fichier :
//     `node scripts/generer-sql-demarchage.mjs`, et la parité se vérifie avec
//     `node scripts/test-demarchage.mjs` (corpus commun, JS et SQL).
//   ⚠️ Toute retouche d'une règle ici = régénérer la fonction SQL (nouvelle
//   migration) et relancer le test de parité. Sinon le navigateur et la base
//   ne jugent plus pareil.
//
// Les pièges anti-robot (pot de miel, envoi trop rapide) ne sont PAS ici : ils
// se jugent au moment de l'envoi, par le relais `api/subscribe.js`.
//
// Écriture des motifs : sous-ensemble commun aux expressions régulières
// JavaScript et PostgreSQL (ARE). `\b` est traduit en `\y` pour PostgreSQL ;
// pas de lookbehind, pas de classes Unicode. Insensible à la casse des deux côtés.

export const VERSION_DEMARCHAGE = 1
/** À partir de ce score, la demande est « probable » (avertissement + tri). */
export const SEUIL_PROBABLE = 3

/** Règles de vocabulaire : chacune compte UNE fois, quel que soit le nombre de mots trouvés. */
export const REGLES = [
  {
    id: 'agenda',
    poids: 3,
    raison: 'lien ou invitation à réserver un appel (Calendly, « book a call »…)',
    motif: "calendly|cal\\.com/|tidycal|youcanbook|zcal\\.co|hubspot\\.com/meetings|book (a |an |your )?(quick |short |free |15 ?min |30 ?min )?(call|meeting|demo|chat)|schedule (a |an )?(quick |short |free )?(call|meeting|demo)|hop on a (quick )?call|r[ée]server un (cr[ée]neau|appel)|agendar una (llamada|reuni[oó]n)",
  },
  {
    id: 'seo',
    poids: 2,
    raison: 'référencement / SEO / backlinks',
    motif: "\\bseo\\b|backlinks?|link ?building|guest ?posts?|r[ée]f[ée]rencement|posicionamiento|first page (of|on) google|premi[eè]re page (de|sur) google|primera p[aá]gina de google|domain authority",
  },
  {
    id: 'redaction',
    poids: 2,
    raison: 'offre de rédaction (freelance, copywriting…)',
    motif: "freelance|copywrit|content writ|ghostwrit|r[ée]dacteur|r[ée]dactrice|redactor|redactora|blog posts? for you|articles? pour (votre|ton) (site|blog)",
  },
  {
    id: 'marketing',
    poids: 2,
    raison: 'marketing / génération de prospects',
    motif: "lead ?gen|generate (more )?leads|more leads|qualified leads|digital marketing|marketing digital|social media (manager|management|marketing|growth)|community manager|growth hack|email marketing|(increase|boost|double|grow) (your )?(sales|traffic|revenue|conversions|visibility|bookings|followers)|grow your (business|audience|brand)|augmenter (vos|tes|votre|ton) (ventes|visites|revenus|chiffre|visibilit[ée])|aumentar (tus|sus) (ventas|visitas|ingresos)",
  },
  {
    id: 'web',
    poids: 2,
    raison: 'offre de création ou refonte de site / d’application',
    motif: "web ?design|website (design|redesign|development|audit)|redesign (your|of your) (website|site)|refonte (de (votre|ton) )?site|cr[ée]ation de site|dise[nñ]o web|desarrollo web|(mobile )?app development|wordpress (developer|expert)|shopify (expert|developer|store)",
  },
  {
    id: 'offre',
    poids: 1,
    raison: 'formule de prospection (« our services », « free audit »…)',
    motif: "our services|my services|nos services|mes services|nuestros servicios|mis servicios|affordable (price|rate|package)|reasonable (price|rate)|free (audit|consultation|trial|quote)|audit gratuit|devis gratuit|auditor[ií]a gratuita|special offer|limited offer|offre sp[ée]ciale|proposal for you|i (can|could) help you|je (peux|pourrais) vous aider [aà]|puedo ayudarte a|we (help|work with) (businesses|brands|companies|artists)|marketing agency|digital agency|agence (web|digitale|marketing)|agencia (digital|de marketing)",
  },
  {
    id: 'partenariat',
    poids: 1,
    raison: 'partenariat ou sponsoring non sollicité',
    motif: "partnership opportunity|collaboration opportunity|business opportunity|sponsored (post|article|content)|article sponsoris[ée]|contenu sponsoris[ée]|opportunit[ée] de partenariat|oportunidad de (colaboraci[oó]n|negocio)|affiliate program|programme d'affiliation",
  },
]

/** Liens : adresses complètes, « www. » et domaines nus courants. */
export const MOTIF_LIEN =
  "https?://[^\\s<>\"')]+|www\\.[^\\s<>\"')]+|\\b[a-z0-9][a-z0-9-]*\\.(com|net|org|io|co|fr|de|es|me|link|ly|app|site|online|xyz|info|biz|pro|agency|studio|page|bio)(/[^\\s<>\"')]*)?"
/** Domaines qui ne comptent PAS comme liens externes (ceux de David et ceux qu'un vrai client partage). */
export const MOTIF_LIEN_CONNU =
  "lesagedavid\\.fr|handpanstudio\\.app|handpan-studio\\.app|neotone|yishama\\.com|youtube\\.com|youtu\\.be"
/** Un lien vers un site inconnu qui porte le nom de David : signature d'hameçonnage. */
export const MOTIF_LIEN_PERSO = "lesage-?david|david-?lesage"
/** Flatterie d'ouverture — ne compte qu'accompagnée d'un lien externe. */
export const MOTIF_FLATTERIE =
  "(love|admire|adore|enjoy|enjoyed) (your|the)|(impressed|amazed|fascinated|inspired) by|(amazing|impressive|fascinating|beautiful|great|incredible) (work|method|approach|website|site|content|videos?)|came across (your|the)|stumbled (upon|across)|j['’]?(ai )?(adore|admire)|je suis tomb[ée]e? sur|j['’]ai d[ée]couvert (votre|ton)|me encanta|me encant[oó]|he descubierto"
/** Mots du métier de David : leur ABSENCE, sous un motif « achat » ou « cours », rend le motif incohérent. */
export const MOTIF_METIER =
  "handpan|hang ?drum|neotone|instrument|cours|le[cç]on|lesson|class|clase|curso|showroom|gamme|scale|escala|musi[cq]|m[uú]sica|jouer|play|tocar|app\\b|studio|tambour|drum"
/** Motifs du formulaire de contact qui annoncent une vraie demande d'achat ou de cours (FR, EN, ES). */
export const MOTIF_SUJET_ACHAT_COURS =
  "achat|buying|compra|cours|lessons|cursos"

/** Le message enregistré commence par « [Sujet] » (voir ContactPage.astro). */
export function separerSujet(message) {
  const m = String(message || '').match(/^\s*\[([^\]]{1,80})\]\s*/)
  return m ? { sujet: m[1], corps: String(message).slice(m[0].length) } : { sujet: '', corps: String(message || '') }
}

function re(motif, drapeaux = 'i') {
  return new RegExp(motif, drapeaux)
}

/**
 * Évalue un texte. Renvoie `{ score, raisons, statut, version }`.
 * `statut` vaut 'probable' au-delà du seuil, 'non' sinon. 'certain' n'est
 * jamais rendu ici : il est réservé aux pièges anti-robot.
 * @param {string} message  texte complet, éventuellement préfixé « [Sujet] »
 * @param {string} [autres] autres champs libres (motivation…)
 */
export function evaluerDemarchage(message, autres = '') {
  const { sujet, corps } = separerSujet(message)
  // Les adresses e-mail ne sont pas des liens (« prenom@gmail.com » contient « gmail.com »).
  const texte = `${corps} ${autres || ''}`.replace(/\S+@\S+/g, ' ')
  let score = 0
  const raisons = []

  const liens = texte.match(re(MOTIF_LIEN, 'gi')) || []
  const externes = liens.filter((l) => !re(MOTIF_LIEN_CONNU).test(l))
  if (externes.length) {
    score += externes.length >= 3 ? 3 : 2
    raisons.push(externes.length >= 3 ? `${externes.length} liens externes` : 'lien vers un site externe')
  }
  if (externes.some((l) => re(MOTIF_LIEN_PERSO).test(l))) {
    score += 3
    raisons.push('lien « personnalisé » à ton nom sur un site inconnu (hameçonnage)')
  }

  let vocabulaire = 0
  for (const r of REGLES) {
    if (re(r.motif).test(texte)) {
      score += r.poids
      vocabulaire += r.poids
      raisons.push(r.raison)
    }
  }

  if (externes.length && re(MOTIF_FLATTERIE).test(texte)) {
    score += 2
    raisons.push('compliments + lien externe')
  }

  if (sujet && re(MOTIF_SUJET_ACHAT_COURS).test(sujet) && vocabulaire > 0 && !re(MOTIF_METIER).test(texte)) {
    score += 1
    raisons.push(`motif « ${sujet} » sans rapport avec le message`)
  }

  return { score, raisons, statut: score >= SEUIL_PROBABLE ? 'probable' : 'non', version: VERSION_DEMARCHAGE }
}
