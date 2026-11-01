// IndexNow : signale à Bing et aux moteurs partenaires les adresses du sitemap en ligne.
// Aucun compte : la clé est servie par le site (public/b8ad71382d8888d441f137e88571159a.txt).
// Usage, après une mise en ligne : node scripts/indexnow.mjs [adresse ...]
const key = 'b8ad71382d8888d441f137e88571159a'
const host = 'www.lesagedavid.fr'
let urlList = process.argv.slice(2)
if (!urlList.length) {
  const xml = await (await fetch(`https://${host}/sitemap-0.xml`)).text()
  urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
}
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
})
console.log(res.status, res.statusText, urlList.length, 'adresses')
