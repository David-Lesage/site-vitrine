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

// Inscription à la liste des showcases — solution simple : email pré-rempli
// vers David (en attendant un vrai outil de collecte type Brevo).
export function newsletterMailto(lang: Lang): string {
  if (lang === 'en') {
    return mailto(
      'Keep me posted about the next showcases',
      [
        'Hi David,',
        '',
        'I’d like to be kept posted about your next showcases in Paris and about Handpan Studio.',
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
    'Je veux être tenu au courant des prochains showcases',
    [
      'Bonjour David,',
      '',
      'Je souhaite être tenu·e au courant de tes prochains showcases à Paris et des nouveautés de Handpan Studio.',
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
    return mailto(`Booking — free showcase on ${dateLabel}`, [
      'Hi David,',
      '',
      `I’d like to reserve a spot for the free public showcase on ${dateLabel} at the Paris showroom.`,
      '',
      'My details:',
      '• Full name: ',
      '• Phone: ',
      '• Number of people: ',
      '',
      'See you there!',
    ])
  }
  return mailto(`Réservation — showcase gratuit du ${dateLabel}`, [
    'Bonjour David,',
    '',
    `Je souhaite réserver une place pour le showcase public gratuit du ${dateLabel} au showroom de Paris 20ᵉ.`,
    '',
    'Mes coordonnées :',
    '• Nom et prénom : ',
    '• Téléphone : ',
    '• Nombre de personnes : ',
    '',
    'À bientôt !',
  ])
}
