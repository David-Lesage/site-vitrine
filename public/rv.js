/* rv.js — relevé de visite maison (13/11/2026). Même fichier sur lesagedavid.fr et play.handpanstudio.app.
   Envoie UNE fois par page : page, langue, utm_*, domaine de provenance, type d'appareil.
   Aucun cookie, aucun identifiant, aucune IP gardée. Ne s'envoie qu'après 1,5 s : une page qui
   redirige aussitôt (choix de langue) n'est donc comptée qu'une fois, sur la page d'arrivée.
   Ne plus compter ses propres visites sur un navigateur : ouvrir une page avec ?releve=off (?releve=on pour rétablir). */
;(function () {
  try {
    var q = new URLSearchParams(location.search)
    var r = q.get('releve')
    if (r === 'off') localStorage.setItem('releve-off', '1')
    if (r === 'on') localStorage.removeItem('releve-off')
    if (localStorage.getItem('releve-off') === '1') return
  } catch (e) {}
  try {
    if (window.top !== window.self) return // une page intégrée (animation d'ouverture…) ne compte pas
    if (/bot|crawl|spider|slurp|google-|lighthouse|facebookexternalhit|headless/i.test(navigator.userAgent)) return
    var envoye = false
    function envoyer() {
      if (envoye) return
      envoye = true
      var q = new URLSearchParams(location.search)
      var ref = ''
      try { if (document.referrer) ref = new URL(document.referrer).origin } catch (e) {}
      var w = Math.min(screen.width || 0, screen.height || 0)
      var tactile = matchMedia('(pointer: coarse)').matches
      var d = {
        site: location.hostname,
        page: location.pathname,
        langue: (q.get('lang') || document.documentElement.lang || '').slice(0, 5),
        utm_source: q.get('utm_source'), utm_medium: q.get('utm_medium'),
        utm_campaign: q.get('utm_campaign'), utm_content: q.get('utm_content'), utm_term: q.get('utm_term'),
        ref: ref,
        appareil: tactile ? (w && w < 600 ? 'mobile' : 'tablette') : 'ordinateur'
      }
      var url = 'https://zqcuhnjjrgmybftppkcl.supabase.co/functions/v1/releve-visite'
      var corps = JSON.stringify(d)
      if (!(navigator.sendBeacon && navigator.sendBeacon(url, corps))) {
        fetch(url, { method: 'POST', body: corps, keepalive: true, mode: 'no-cors' }).catch(function () {})
      }
    }
    setTimeout(envoyer, 1500)
  } catch (e) {}
})()
