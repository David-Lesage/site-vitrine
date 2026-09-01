// ============================================================
// Modèles d'email de réservation (RDV individuels & événements).
// Génère des liens mailto: pré-remplis (sujet + corps) vers David,
// repris de l'ancien site. Bilingue FR / EN.
// ============================================================
import { site } from '@/data/site'
import type { Lang } from '@/i18n/config'

function mailto(subject: string, lines: (string | null)[], to: string = site.email): string {
  const body = lines.filter((l): l is string => l !== null).join('\n')
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

// ⚠️ N'EST PLUS LE CHEMIN PRINCIPAL — REPLI SANS JAVASCRIPT (16/08/2026).
// C'était l'inscription à la liste des showcases par email pré-rempli. Problème :
// ça ouvre le logiciel de mail du visiteur, donc la demande n'existe QUE dans la
// boîte de David et n'est enregistrée NULLE PART. Une personne réelle a écrit le
// 16/08/2026 avec l'objet ci-dessous, au mot près, sans jamais apparaître dans
// `site_leads`.
// Le bouton de la page d'accueil porte désormais `data-booking="showcase-waitlist"` :
// avec JS, `BookingForm` intercepte le clic → Edge Function `site-lead` → base.
// Ce `mailto:` reste le `href` de repli si le JS ne s'exécute pas — donc AUCUNE
// régression pour le visiteur. Ne le remettre comme chemin principal nulle part.
export function newsletterMailto(lang: Lang): string {
  if (lang === 'en') {
    return mailto(
      'Keep me posted about the next gatherings',
      [
        'Hi David,',
        '',
        'I’d like to be kept posted about your next gatherings in Paris and about Handpan Constellation Studio.',
        '',
        'My details:',
        '• Full name: ',
        '• City / country: ',
        '',
        'Thanks!',
      ],
      site.email,
    )
  }
  return mailto(
    'Je veux être tenu au courant des prochaines rencontres',
    [
      'Bonjour David,',
      '',
      'Je souhaite être tenu·e au courant de tes prochaines rencontres à Paris et des nouveautés de Handpan Constellation Studio.',
      '',
      'Mes coordonnées :',
      '• Nom et prénom : ',
      '• Ville / pays : ',
      '',
      'Merci !',
    ],
    site.email,
  )
}

// Réservation d'une venue au showroom (Paris 20ᵉ)
export function showroomVisitMailto(lang: Lang): string {
  if (lang === 'en') {
    return mailto('Booking — showroom visit (Paris 20th)', [
      'Hi David,',
      '',
      'I’d like to book a visit to your Paris showroom to discover and try the Neotone instruments.',
      '',
      'My details:',
      '• Full name: ',
      '• Phone: ',
      '• City / country: ',
      '',
      'My preferred availabilities: ',
      '',
      'Thank you, see you soon!',
    ])
  }
  return mailto('Réservation — venue au showroom (Paris 20ᵉ)', [
    'Bonjour David,',
    '',
    'Je souhaite réserver une venue à ton showroom de Paris 20ᵉ pour découvrir et essayer les Neotone.',
    '',
    'Mes coordonnées :',
    '• Nom et prénom : ',
    '• Téléphone : ',
    '• Ville / pays : ',
    '',
    'Mes disponibilités souhaitées : ',
    '',
    'Merci, à bientôt !',
  ])
}

// Réservation d'un rendez-vous individuel (cours ou démonstration privée)
export function privateSessionMailto(lang: Lang): string {
  if (lang === 'en') {
    return mailto('Booking — private session (lesson / demo)', [
      'Hi David,',
      '',
      'I’d like to book an individual appointment with you:',
      '• Type (lesson / private demo): ',
      '• In person (Paris) or online: ',
      '',
      'My details:',
      '• Full name: ',
      '• Phone: ',
      '• Level / goals: ',
      '',
      'My preferred availabilities: ',
      '',
      'Thank you!',
    ])
  }
  return mailto('Réservation — rendez-vous individuel (cours / démonstration)', [
    'Bonjour David,',
    '',
    'Je souhaite réserver un rendez-vous individuel avec toi :',
    '• Type (cours / démonstration privée) : ',
    '• En présentiel (Paris) ou en visio : ',
    '',
    'Mes coordonnées :',
    '• Nom et prénom : ',
    '• Téléphone : ',
    '• Niveau / objectifs : ',
    '',
    'Mes disponibilités souhaitées : ',
    '',
    'Merci !',
  ])
}

// Réservation d'une place à un showcase public gratuit (avec date)
export function eventMailto(lang: Lang, dateLabel: string): string {
  if (lang === 'en') {
    return mailto(`Booking — free gathering on ${dateLabel}`, [
      'Hi David,',
      '',
      `I’d like to reserve a spot for the free public gathering on ${dateLabel} at the Paris showroom.`,
      '',
      'My details:',
      '• Full name: ',
      '• Phone: ',
      '• Number of people: ',
      '',
      'See you there!',
    ])
  }
  return mailto(`Réservation — rencontre gratuite du ${dateLabel}`, [
    'Bonjour David,',
    '',
    `Je souhaite réserver une place pour la rencontre publique gratuite du ${dateLabel} au showroom de Paris 20ᵉ.`,
    '',
    'Mes coordonnées :',
    '• Nom et prénom : ',
    '• Téléphone : ',
    '• Nombre de personnes : ',
    '',
    'À bientôt !',
  ])
}
