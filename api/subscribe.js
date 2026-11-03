// Fonction serverless Vercel (runtime Node) — relaie les inscriptions du site
// vers l'Edge Function `site-lead` de Supabase (enregistrement + email de
// confirmation). Appel serveur à serveur : pas de contrainte CORS, et la clé
// n'est jamais exposée au navigateur.
//
// Aucune dépendance npm (bun.lock gelé).

const SUPABASE_URL = 'https://zqcuhnjjrgmybftppkcl.supabase.co'
const ANON = 'sb_publishable_turahpl0xi-qKN6jmG3yBg_tqpVZbtx'

// PIÈGES ANTI-ROBOT (03/11/2026) — demande de David : trier le démarchage.
// Deux signaux « certains », invisibles pour un humain :
//   · le champ pot de miel `website` (hors écran, aria-hidden) est rempli ;
//   · le formulaire est envoyé moins de 4 s après son ouverture (`startedAt`,
//     posé par le navigateur ; absent d'une page en cache = pas de jugement).
// Le CONTENU (liens, vocabulaire de prospection…) est jugé ailleurs : par la
// base à l'écriture (migration 0320), et par le navigateur pour avertir.
const DUREE_MIN_MS = 4000
// Tant que l'Edge Function `site-lead` ne sait pas enregistrer un envoi
// « certain » SANS envoyer d'e-mail (version préparée, déploiement soumis au
// feu vert de David), le relais ne le transmet PAS : il répond « ok » au robot
// (aucun signal pour lui) et le journalise. Passer à true le jour où la
// nouvelle `site-lead` est déployée : l'envoi sera alors enregistré, marqué
// `spam_statut = 'certain'`, et ne déclenchera aucun e-mail.
// ⚠️ Même jour, même geste : EXERCICE_OBLIGATOIRE = true dans src/lib/antispamConfig.ts.
// 03/11/2026 : site-lead v54 déployée (feu vert de David) → activé.
const SITE_LEAD_SAIT_TRIER = true

// PETIT EXERCICE MUSICAL (03/11/2026) — c'est la BASE qui a tiré l'accord ; on lui
// fait vérifier l'ordre joué (ou l'addition de secours). Usage unique.
// Renvoie 'reussi' | 'reussi_secours' | 'echoue' | 'expire' | 'deja_utilise' | 'inconnu'
// | 'absent' (aucun défi envoyé) | 'injoignable' (base muette : on ne pénalise pas).
async function verifierDefi(defi) {
  if (!defi || typeof defi !== 'object' || !/^[0-9a-f-]{36}$/i.test(String(defi.id || ''))) return 'absent'
  const notes = Array.isArray(defi.notes) ? defi.notes.map((n) => String(n).slice(0, 4)).slice(0, 8) : []
  const secours = Number.isFinite(Number(defi.secours)) && defi.secours !== null ? Math.trunc(Number(defi.secours)) : null
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/defi_formulaire_verifier`, {
      method: 'POST',
      headers: { apikey: ANON, Authorization: `Bearer ${ANON}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_id: defi.id, p_notes: notes.length ? notes : null, p_secours: secours }),
    })
    if (!r.ok) return 'injoignable'
    const v = await r.json()
    return typeof v === 'string' ? v : 'injoignable'
  } catch { return 'injoignable' }
}

export function piegesAntiRobot(body, now = Date.now()) {
  const raisons = []
  if (String(body.website || '').trim() !== '') raisons.push('champ invisible rempli (pot de miel)')
  const started = Number(body.startedAt)
  if (Number.isFinite(started) && started > 0 && now - started >= 0 && now - started < DUREE_MIN_MS) {
    raisons.push(`envoyé ${((now - started) / 1000).toFixed(1)} s après l'ouverture du formulaire`)
  }
  return raisons
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' })
    return
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const email = String(body.email || '').trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      res.status(400).json({ error: 'invalid_email' })
      return
    }
    // Téléphone obligatoire pour le formulaire de CONTACT uniquement (11/09/2026).
    // Même règle que le navigateur et l'Edge Function : 8 à 15 chiffres (E.164),
    // formats internationaux acceptés (espaces, points, tirets, parenthèses, « + »).
    // 25/10/2026 : aussi pour `neotone-stock-request` (Neotone pas au showroom) :
    // David rappelle la personne avec les délais de fabrication et de livraison.
    if (body.source === 'contact' || body.source === 'neotone-stock-request') {
      const phone = String(body.phone || '').trim()
      const digits = phone.replace(/\D/g, '').length
      if (!/^\+?[\d\s().\-]+$/.test(phone) || digits < 8 || digits > 15) {
        res.status(400).json({ error: 'invalid_phone' })
        return
      }
    }

    const pieges = piegesAntiRobot(body)
    const exercice = await verifierDefi(body.defi)
    // Exercice raté ou absent = « certain »… seulement une fois site-lead capable
    // d'enregistrer sans e-mail (sinon : affiché, transmis, jamais bloquant).
    if (SITE_LEAD_SAIT_TRIER && !['reussi', 'reussi_secours', 'injoignable'].includes(exercice)) {
      pieges.push(`petit exercice musical non réussi (${exercice})`)
    }
    if (pieges.length && !SITE_LEAD_SAIT_TRIER) {
      // Aucune donnée personnelle dans le journal : la source et les raisons seules.
      console.warn('subscribe: robot probable écarté', body.source || '', pieges.join(' ; '))
      res.status(200).json({ ok: true, emailSent: false })
      return
    }

    const headers = {
      apikey: ANON,
      Authorization: `Bearer ${ANON}`,
      'Content-Type': 'application/json',
    }
    // Secret partagé optionnel : à définir dans Vercel ET dans Supabase
    // (SITE_LEAD_TOKEN) pour que seul le site puisse appeler la fonction.
    if (process.env.SITE_LEAD_TOKEN) headers['x-site-token'] = process.env.SITE_LEAD_TOKEN

    const r = await fetch(`${SUPABASE_URL}/functions/v1/site-lead`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email,
        firstName: body.firstName,
        lastName: body.lastName,
        hasHandpan: body.hasHandpan,
        // Sous-question : type de handpan possédé (si hasHandpan = 'yes')
        handpanType: body.handpanType,
        // Déclaration d'intention : casquettes multiples. `usage_type` en est
        // dérivé côté serveur ; `usageType` reste transmis pour les anciens appels.
        usageType: body.usageType,
        roles: body.roles,
        pledgeHonest: body.pledgeHonest === true,
        // Objectif personnel. Depuis le 30/08/2026 le formulaire ne le DEMANDE
        // plus : il est dérivé des casquettes et arrive sous forme de liste
        // (`personalGoals`). `personalGoal` (choix unique) reste transmis pour
        // les anciens appelants et les pages encore en cache.
        personalGoal: body.personalGoal,
        personalGoals: body.personalGoals,
        // Sous-question prof : dimensionne la Licence Enseignant
        studentCount: body.studentCount,
        // Fiche fabricant — alimente le catalogue de mise en relation
        makerCountry: body.makerCountry,
        makerMaxNotes: body.makerMaxNotes,
        makerMetals: body.makerMetals,
        makerPricing: body.makerPricing,
        motivation: body.motivation,
        // Candidature bêta-testeur explicite (motivation obligatoire côté site)
        wantsBeta: body.wantsBeta === true,
        wantsShowcase: body.wantsShowcase === true,
        // Demandes de réservation (showroom, showcase, rendez-vous privé)
        // ⚠️ Ce relais filtre par liste EXPLICITE : tout champ ajouté au formulaire
        // doit être ajouté ICI aussi, sinon il est jeté en silence (déjà arrivé).
        phone: body.phone,
        message: body.message,
        peopleCount: body.peopleCount,
        eventDate: body.eventDate,
        // Horaires de la séance de showcase réservée (issus de `agendaEvents`)
        // et grille tarifaire du RDV individuel (issue de `priceGrid()`) :
        // l'email de confirmation ne recopie aucun horaire ni aucun prix.
        eventStart: body.eventStart,
        eventEnd: body.eventEnd,
        priceGrid: body.priceGrid,
        // Dates de showcase à venir (issues d'`agendaEvents`) : l'email de la
        // LISTE D'ATTENTE les liste avec un lien d'inscription par date, plutôt
        // que d'obliger David à les recopier à la main dans une réponse.
        upcomingEvents: body.upcomingEvents,
        neotoneModel: body.neotoneModel,
        // Bois et mode d'achat (livraison / retrait showroom) choisis dans le
        // calculateur de /neotone (22/09/2026) : ils n'étaient relayés nulle
        // part, l'email de David ne pouvait donc pas les mentionner.
        neotoneWood: body.neotoneWood,
        neotonePurchaseMode: body.neotonePurchaseMode,
        // Facturation Neotone STRUCTURÉE (21/10/2026) : un objet { kind, name,
        // company, vatNumber, siret, address, postalCode, city, country,
        // shipping }. L'Edge Function le borne champ par champ ; avant ce
        // relais, la facturation n'arrivait que mélangée au message.
        billing: body.billing && typeof body.billing === 'object' ? body.billing : undefined,
        // Montants du calculateur Neotone (21/10/2026) : prix, remise, TVA,
        // total. L'Edge Function les borne et vérifie leur cohérence ; un objet
        // absent ou incohérent ⇒ aucun bloc chiffré dans les emails.
        neotonePrice: body.neotonePrice && typeof body.neotonePrice === 'object' ? body.neotonePrice : undefined,
        socialAccount: body.socialAccount,
        discoveryChannel: body.discoveryChannel,
        playingSince: body.playingSince,
        dream: body.dream,
        country: body.country,
        // `sessionType` = « <motif>-<durée> » (`lesson-90`, `demo-60`…).
        // Depuis le 18/08/2026, le formulaire pose DEUX questions (motif, puis
        // durée) et recompose cet identifiant avant l'envoi : la DURÉE voyage
        // donc dans ce champ-là, il n'y en a pas d'autre à relayer et rien à
        // ajouter en base (colonne `session_type`, déjà existante).
        sessionType: body.sessionType,
        sessionFormat: body.sessionFormat,
        instruments: body.instruments,
        // Showcase : « pour quel(s) instrument(s) viens-tu ? » (17/08/2026).
        // Champ DISTINCT d'`instruments` ci-dessus — voir src/data/site.ts.
        showcaseInterests: body.showcaseInterests,
        // Acceptation des conditions générales (case obligatoire de tous les
        // formulaires). L'horodatage est posé par l'Edge Function, pas ici.
        termsAccepted: body.termsAccepted === true,
        // Consentement FACULTATIF à recevoir les nouveautés (seconde case, jamais
        // pré-cochée). Séparé de `termsAccepted` : accepter les conditions
        // générales ne vaut pas accord pour recevoir de la prospection.
        // Relayé même à false — un refus est une réponse, pas une absence.
        newsOptIn: body.newsOptIn === true,
        preferredSlots: body.preferredSlots,
        // Pièges anti-robot (03/11/2026) : relayés seulement quand site-lead sait trier.
        spamCertain: pieges.length ? pieges : undefined,
        // La personne a vu l'avertissement « démarchage » et a envoyé quand même.
        avertiDemarchage: body.avertiDemarchage === true ? true : undefined,
        exercice,
        source: body.source || 'beta-waitlist',
        lang: body.lang || 'fr',
        page: body.page,
      }),
    })

    const data = await r.json().catch(() => ({}))
    if (!r.ok) {
      res.status(r.status === 400 ? 400 : 502).json({ error: data.error || 'upstream' })
      return
    }
    res.status(200).json({ ok: true, emailSent: data.emailSent === true })
  } catch (err) {
    res.status(500).json({ error: 'server_error' })
  }
}
