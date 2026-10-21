// Branchement navigateur de la capture du lien d'affiliation (21/10/2026).
// Chargé UNE fois par page, via src/components/AffiliationCapture.astro, que
// Layout.astro ne rend QUE si AFFILIATION_MODE !== 'off'. Spec et interrupteur :
// src/data/affiliation.ts. Logique pure : ./affiliation-core.mjs.
import { AFFILIATION_MODE } from '@/data/affiliation'
import { captureRef, decorateHref, isAppUrl, normalizeRef, readRef, stripRefParam } from './affiliation-core.mjs'

declare global {
  interface Window {
    hcsConsent?: boolean
  }
}

function getStorage(): Storage | null {
  try {
    return window.localStorage
  } catch {
    return null // stockage bloqué (navigation privée stricte, cookies désactivés…)
  }
}

let started = false
// Repli pour la page en cours seulement, quand le stockage est indisponible.
let pageOnlyCode: string | null = null

function start() {
  if (started) return
  started = true
  const storage = getStorage()

  // 1. Lecture du ?ref puis nettoyage de l'URL (seul `ref` est retiré).
  try {
    const { ref, href } = stripRefParam(location.href)
    if (href) {
      if (storage) captureRef(storage, ref, Date.now())
      else pageOnlyCode = normalizeRef(ref)
      history.replaceState(history.state, '', href)
    }
  } catch {}

  // 2. Décoration des liens vers l'application, au moment du clic.
  const decorate = (event: Event) => {
    const target = event.target as Element | null
    const a = target && typeof target.closest === 'function' ? target.closest('a[href]') : null
    if (!(a instanceof HTMLAnchorElement) || !isAppUrl(a.href)) return
    const entry = storage ? readRef(storage, Date.now()) : null
    const code = entry ? entry.code : pageOnlyCode
    if (!code) return
    const next = decorateHref(a.href, code)
    if (next) a.href = next
  }
  document.addEventListener('pointerdown', decorate, true)
  document.addEventListener('click', decorate, true) // clavier (Entrée) et clics synthétiques
}

if (AFFILIATION_MODE === 'immediate') {
  start()
} else if (AFFILIATION_MODE === 'consent') {
  if (window.hcsConsent === true) start()
  else window.addEventListener('hcs:consent', start, { once: true })
}
