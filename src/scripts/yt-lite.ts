// Comportement de la façade YouTube légère (.yt-lite) : miniature de secours
// + chargement de l'iframe youtube-nocookie au clic. Extrait de YouTube.astro
// le 11/09/2026 pour servir AUSSI les façades écrites en HTML dans les
// articles Markdown (série vidéo de l'app) : le blog l'importe même quand
// l'article n'utilise pas le composant. Astro ne l'embarque qu'une fois.
  /* 🖼️ MINIATURE DE SECOURS — ajouté le 01/09/2026, constaté en direct.
     En intégrant la démo Atlas (`s1lFN3PDEnA`, publiée le jour même),
     `hqdefault.jpg` répondait encore 404 tout en servant quand même une image
     grise de 120×90 : YouTube n'avait pas fini de générer cette taille-là
     (`maxresdefault` et `sddefault` existaient déjà). Une demi-heure plus tard
     elle était là. Le piège : cette image bouche-trou se charge « avec
     succès », donc AUCUN événement `error` n'est émis et la façade affichait
     un rectangle noir vide.
     ⚠️ Ne pas remplacer ce test par un simple `onerror` : il ne se déclenche
     pas dans ce cas. Le seul signal fiable est la TAILLE RÉELLE de l'image
     (`naturalWidth <= 120` = bouche-trou). On bascule alors sur
     `maxresdefault.jpg`, puis `sddefault.jpg`. Coût nul quand tout va bien. */
  const YT_FALLBACKS = ['maxresdefault', 'sddefault']
  const ytFixThumb = (img: HTMLImageElement) => {
    if (!img.complete || img.naturalWidth > 120) return
    const step = Number(img.dataset.ytFb || 0)
    if (step >= YT_FALLBACKS.length) return
    img.dataset.ytFb = String(step + 1)
    const id = img.closest('.yt-lite')?.getAttribute('data-yt-id')
    if (id) img.src = `https://i.ytimg.com/vi/${id}/${YT_FALLBACKS[step]}.jpg`
  }
  document.querySelectorAll<HTMLImageElement>('.yt-lite img').forEach((img) => {
    ytFixThumb(img)
    img.addEventListener('load', () => ytFixThumb(img))
    img.addEventListener('error', () => ytFixThumb(img))
  })

  document.querySelectorAll('.yt-lite').forEach((el) => {
    el.addEventListener('click', () => {
      if (el.querySelector('iframe')) return
      const id = el.getAttribute('data-yt-id')
      const iframe = document.createElement('iframe')
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
      iframe.title = el.getAttribute('aria-label') || 'YouTube'
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      iframe.setAttribute('allowfullscreen', '')
      iframe.className = 'absolute inset-0 h-full w-full'
      el.replaceChildren(iframe)
    })
  })
