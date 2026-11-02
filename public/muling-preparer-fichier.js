// Prépare la preuve de virement avant l'envoi. Une photo de téléphone dépasse souvent les 3 Mo
// admis par le relais : elle est réduite ici, dans le navigateur, en JPEG. Le serveur contrôle
// ensuite la signature du fichier reçu, comme pour tout dépôt.
(function () {
  function charger(fichier) {
    return new Promise(function (ok, ko) {
      var url = URL.createObjectURL(fichier)
      var img = new Image()
      img.onload = function () { ok({ img: img, fin: function () { URL.revokeObjectURL(url) } }) }
      img.onerror = function () { URL.revokeObjectURL(url); ko(new Error('illisible')) }
      img.src = url
    })
  }
  function versJpeg(img, cote, qualite) {
    var r = Math.min(1, cote / Math.max(img.naturalWidth, img.naturalHeight))
    var c = document.createElement('canvas')
    c.width = Math.max(1, Math.round(img.naturalWidth * r))
    c.height = Math.max(1, Math.round(img.naturalHeight * r))
    var x = c.getContext('2d')
    x.fillStyle = '#fff'
    x.fillRect(0, 0, c.width, c.height)
    x.drawImage(img, 0, 0, c.width, c.height)
    return new Promise(function (ok) { c.toBlob(ok, 'image/jpeg', qualite) })
  }
  var ESSAIS = [[2600, 0.85], [2200, 0.75], [1800, 0.7], [1400, 0.65], [1000, 0.6]]
  window.mulingPreparerFichier = function (fichier, max) {
    var dejaBon = fichier.type === 'application/pdf' || fichier.type === 'image/png' || fichier.type === 'image/jpeg'
    if (dejaBon && fichier.size <= max) return Promise.resolve(fichier)
    if (fichier.type === 'application/pdf') return Promise.reject(new Error('trop_lourd'))
    return charger(fichier).then(function (ch) {
      function essai(i) {
        if (i >= ESSAIS.length) { ch.fin(); throw new Error('trop_lourd') }
        return versJpeg(ch.img, ESSAIS[i][0], ESSAIS[i][1]).then(function (b) {
          if (b && b.size <= max) { ch.fin(); return b }
          return essai(i + 1)
        })
      }
      return essai(0)
    })
  }
})()
