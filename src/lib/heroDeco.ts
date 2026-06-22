// ============================================================
// Décorations typographiques du hero d'accueil :
//   « Visible » en arc-en-ciel, points des i en notes de musique,
//   « couleurs » multicolore, « géométrie » (o = handpan-triangle),
//   « émotions » (o = smileys). Renvoie des fragments HTML (set:html).
// ============================================================

const CHROMA = [
  'var(--color-chroma-1)',
  'var(--color-chroma-2)',
  'var(--color-chroma-3)',
  'var(--color-chroma-4)',
  'var(--color-chroma-5)',
  'var(--color-chroma-6)',
  'var(--color-chroma-7)',
]

function noteSvg(color: string): string {
  // Petite note de musique (croche) posée à l'emplacement du point du i
  return `<svg class="i-note-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3.6 19 1.5v3.4L11 7v9.3a3.4 3.4 0 1 1-2-3.1V3.6Z" fill="${color}"/></svg>`
}

// « o » dessiné en handpan avec 3 notes reliées en triangle
const HANDPAN_O =
  '<svg class="glyph-o" viewBox="0 0 24 24" aria-hidden="true">' +
  '<circle cx="12" cy="12" r="10.6" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.55"/>' +
  '<polygon points="12,5.4 6.4,15.6 17.6,15.6" fill="none" stroke="var(--color-gold)" stroke-width="1.2"/>' +
  '<circle cx="12" cy="5.4" r="2.1" fill="var(--color-chroma-1)"/>' +
  '<circle cx="6.4" cy="15.6" r="2.1" fill="var(--color-chroma-4)"/>' +
  '<circle cx="17.6" cy="15.6" r="2.1" fill="var(--color-chroma-5)"/>' +
  '</svg>'

// « o » dessiné en émoticône (sourire ou triste)
function faceSvg(happy: boolean): string {
  const mouth = happy ? 'M8 14.4 Q12 18 16 14.4' : 'M8 16.6 Q12 13.2 16 16.6'
  return (
    '<svg class="glyph-o" viewBox="0 0 24 24" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="10.6" fill="none" stroke="var(--color-gold)" stroke-width="1.5"/>' +
    '<circle cx="8.6" cy="10" r="1.25" fill="var(--color-gold)"/>' +
    '<circle cx="15.4" cy="10" r="1.25" fill="var(--color-gold)"/>' +
    `<path d="${mouth}" fill="none" stroke="var(--color-gold)" stroke-width="1.6" stroke-linecap="round"/>` +
    '</svg>'
  )
}

interface DecoOpts {
  rainbow?: boolean
  noteOnI?: boolean
  oGlyph?: 'handpan' | 'faces' | null
  bold?: boolean
}

// Décore un mot caractère par caractère
export function decorateWord(word: string, opts: DecoOpts = {}): string {
  const { rainbow = false, noteOnI = false, oGlyph = null, bold = false } = opts
  let oSeen = 0
  const parts = [...word].map((ch, i) => {
    const lower = ch.toLowerCase()
    const color = rainbow ? CHROMA[i % CHROMA.length] : null
    if (lower === 'i' && noteOnI) {
      const c = color || 'var(--color-gold)'
      const style = color ? ` style="color:${color}"` : ''
      return `<span class="i-note"${style}>ı${noteSvg(c)}</span>`
    }
    if (lower === 'o' && oGlyph === 'handpan') return HANDPAN_O
    if (lower === 'o' && oGlyph === 'faces') {
      oSeen++
      return faceSvg(oSeen === 1)
    }
    return color ? `<span style="color:${color}">${ch}</span>` : ch
  })
  return `<span class="deco-word${bold ? ' font-700' : ''}">${parts.join('')}</span>`
}

// Remplace la première occurrence d'un mot par sa version décorée
function replaceOnce(text: string, word: string, opts: DecoOpts): string {
  const idx = text.indexOf(word)
  if (idx === -1) return text
  return text.slice(0, idx) + decorateWord(word, opts) + text.slice(idx + word.length)
}

// Décore une phrase selon une liste de règles { word, opts }
export function decorateSentence(text: string, rules: { word: string; opts: DecoOpts }[]): string {
  return rules.reduce((acc, r) => replaceOnce(acc, r.word, r.opts), text)
}
