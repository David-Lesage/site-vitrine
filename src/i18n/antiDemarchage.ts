// Textes anti-démarchage des formulaires (03/11/2026), FR / EN / ES.
// Hors de dict.ts exprès : es.ts est GÉNÉRÉ par traduction automatique, et ces
// phrases-là doivent dire exactement ce que David a demandé, dans chaque langue.
import type { Lang } from './config'

export const antiDemarchage: Record<Lang, {
  mention: string
  pieges: string
  avertissement: string
  envoyerQuandMeme: string
  modifier: string
  exercice: Record<
    'intro' | 'consigne' | 'bravo' | 'erreur' | 'secoursLien' | 'secoursQuestion' | 'valider'
    | 'secoursOk' | 'secoursFaux' | 'son' | 'sonCoupe' | 'indisponible' | 'requis' | 'note',
    string
  >
}> = {
  fr: {
    mention: 'Ce formulaire est réservé aux demandes sur mes cours, l’app et les instruments. Je ne réponds pas aux propositions commerciales (services, SEO, rédaction, partenariats non sollicités).',
    pieges: 'Laisse ce champ vide',
    avertissement: 'Ton message ressemble à une proposition commerciale : ce formulaire n’est pas fait pour ça. Si c’est une vraie demande, tu peux l’envoyer quand même.',
    envoyerQuandMeme: 'Envoyer quand même',
    modifier: 'Modifier mon message',
    exercice: {
      intro: "Je vérifie que tu es un humain… et que tu aimes la musique 🎶 Petit exercice de mon app :",
      consigne: "Touche les notes dans l’ordre {ordre}.",
      bravo: "✓ Bravo, tu es bien un humain musicien",
      erreur: "Pas tout à fait : recommence à la note 1.",
      secoursLien: "Je n’y arrive pas",
      secoursQuestion: "Pas de souci : combien font {a} + {b} ?",
      valider: "Valider",
      secoursOk: "✓ Merci, c’est bon",
      secoursFaux: "Ce n’est pas ça, réessaie.",
      son: "🔊 Son",
      sonCoupe: "🔇 Son coupé",
      indisponible: "L’exercice n’a pas pu se charger : tu peux envoyer ton message quand même.",
      requis: "Fais d’abord le petit exercice juste au-dessus 🎶",
      note: "Note {n}",
    },
  },
  en: {
    mention: 'This form is for questions about my lessons, the app and the instruments. I don’t reply to sales pitches (services, SEO, copywriting, unsolicited partnerships).',
    pieges: 'Leave this field empty',
    avertissement: 'Your message looks like a sales pitch: this form isn’t meant for that. If it’s a genuine request, you can still send it.',
    envoyerQuandMeme: 'Send anyway',
    modifier: 'Edit my message',
    exercice: {
      intro: "Just checking you’re human… and that you love music 🎶 A little exercise from my app:",
      consigne: "Tap the notes in order {ordre}.",
      bravo: "✓ Well done, you’re a human musician",
      erreur: "Not quite: start again from note 1.",
      secoursLien: "I can’t do it",
      secoursQuestion: "No problem: what is {a} + {b}?",
      valider: "Check",
      secoursOk: "✓ Thanks, all good",
      secoursFaux: "That’s not it, try again.",
      son: "🔊 Sound",
      sonCoupe: "🔇 Sound off",
      indisponible: "The exercise couldn’t load: you can still send your message.",
      requis: "Please do the little exercise above first 🎶",
      note: "Note {n}",
    },
  },
  es: {
    mention: 'Este formulario está reservado a consultas sobre mis clases, la app y los instrumentos. No respondo a propuestas comerciales (servicios, SEO, redacción, colaboraciones no solicitadas).',
    pieges: 'Deja este campo vacío',
    avertissement: 'Tu mensaje parece una propuesta comercial: este formulario no está pensado para eso. Si es una consulta real, puedes enviarlo de todos modos.',
    envoyerQuandMeme: 'Enviar de todos modos',
    modifier: 'Modificar mi mensaje',
    exercice: {
      intro: "Compruebo que eres humano… y que te gusta la música 🎶 Un pequeño ejercicio de mi app:",
      consigne: "Toca las notas en orden {ordre}.",
      bravo: "✓ ¡Bravo, eres un humano músico!",
      erreur: "Casi: vuelve a empezar desde la nota 1.",
      secoursLien: "No lo consigo",
      secoursQuestion: "No pasa nada: ¿cuánto es {a} + {b}?",
      valider: "Validar",
      secoursOk: "✓ Gracias, todo bien",
      secoursFaux: "No es eso, inténtalo de nuevo.",
      son: "🔊 Sonido",
      sonCoupe: "🔇 Sin sonido",
      indisponible: "El ejercicio no se ha podido cargar: puedes enviar tu mensaje de todos modos.",
      requis: "Haz primero el pequeño ejercicio de arriba 🎶",
      note: "Nota {n}",
    },
  },
}
