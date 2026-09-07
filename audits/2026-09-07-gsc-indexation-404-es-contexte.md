# Contexte pour Claude Code — Bug d'indexation Google Search Console sur lesagedavid.fr

## Résumé du problème

Google Search Console a envoyé une alerte le 5-6 septembre 2026 signalant un nouveau motif empêchant l'indexation de pages sur `lesagedavid.fr` : **"Introuvable (404)"**.

Le rapport "Indexation des pages" de GSC montre au total **195 pages non indexées**, réparties en 6 motifs :

| Motif | Pages | Type |
|---|---|---|
| Autre page avec balise canonique correcte | 61 | Site Web |
| Page en double : Google n'a pas choisi la même URL canonique | 46 | Systèmes Google |
| Détectée, actuellement non indexée | 35 | Systèmes Google |
| Page avec redirection | 33 | Site Web |
| Explorée, actuellement non indexée | 19 | Systèmes Google |
| **Introuvable (404)** | **1 (nouveau, en croissance probable)** | **Site Web** |

Les 5 premiers motifs sont globalement normaux pour un site multilingue récent (contenu dupliqué entre locales, exploration progressive, etc.) et ne sont **pas** la cause de l'alerte. Le motif qui a déclenché l'email d'alerte est bien **"Introuvable (404)"**, et c'est celui-ci qu'il faut corriger en priorité — j'ai identifié la cause exacte ci-dessous.

## Cause racine identifiée (confirmée par tests HTTP directs)

Le site est un **Astro v6.4.8** déployé sur **Vercel**, multilingue (au moins `fr` par défaut, `en`, `es` actifs ; `de`, `it`, `pt` visibles dans le sélecteur de langue de l'UI mais non câblés dans les balises hreflang).

- Les routes locales globales `/es/` et `/es/blog/` répondent correctement (200) — le "shell" espagnol du site existe.
- **Mais aucun des 32 articles de blog n'a de traduction en espagnol.** Chaque URL `https://www.lesagedavid.fr/es/blog/<slug>/` renvoie une **404**.
- Le bug : chaque page d'article en français génère quand même, dans son `<head>`, une balise :
  ```html
  <link rel="alternate" hreflang="es" href="https://www.lesagedavid.fr/es/blog/<slug>" />
  ```
  ...alors que cette URL n'existe pas. Google suit ces balises hreflang (auto-déclarées par le site lui-même), tente de les crawler/indexer, et tombe sur des 404. C'est exactement le mécanisme "Introuvable (404)" remonté par Search Console.

### Exemple vérifié

- URL fautive : `https://www.lesagedavid.fr/es/blog/accompagner-des-chansons-au-handpan` → 404 (confirmé par fetch direct, page Vercel `404: NOT_FOUND`)
- Cette URL apparaît telle quelle dans la balise `<link rel="alternate" hreflang="es" ...>` de la page FR correspondante : `https://www.lesagedavid.fr/blog/accompagner-des-chansons-au-handpan/`
- Première détection par Google : 5 septembre 2026. Un seul exemple remonte pour l'instant dans GSC, mais Google explore progressivement — **il est très probable que les 31 autres articles génèrent la même alerte dans les jours/semaines qui viennent**, car j'ai testé les 32 slugs et **tous** ont leur version `/es/blog/<slug>/` en 404.

### Liste complète des 32 slugs de blog concernés (tous testés en 404 côté `/es/blog/...`)

```
accompagner-des-chansons-au-handpan
apprendre-les-accords-handpan
atlas-des-gammes-de-handpan
bibliotheque-musicale-handpan
completer-son-handpan-acoustique-avec-un-neotone
creer-sa-gamme-de-handpan
deux-handpans-mode-hybride
diagrammes-accords-handpan-pdf
editeur-de-melodies-handpan
editeur-de-partition-handpan
etre-bien-dans-le-son-neotone
exporter-ses-partitions-handpan
feedback-ameliorer-handpan-studio
handpan-emotions-degres
handpan-par-les-couleurs
handpan-studio-mode-acoustique
jam-rapide-accompagner-un-musicien
jouer-avec-un-batteur-handpan
jouer-et-chanter-au-casque-neotone
la-carte-des-joueurs
layouts-vocaux-handpan
les-4-accords-magiques-handpan
les-constellations-du-handpan
les-deux-visions-chromakeys
les-trois-mineurs-handpan
mes-handpans-une-seule-porte
pourquoi-handpan-electronique
quel-casque-choisir-neotone
reveler-les-accords-de-ton-handpan
setup-nomade-neotone-bose-s1
ta-partition-prend-vie
transposer-pour-chanter-handpan
```

(Liste extraite de `https://www.lesagedavid.fr/sitemap-0.xml`, référencé depuis `sitemap-index.xml`, lui-même déclaré dans `robots.txt`.)

**Important : je n'ai testé que la collection `/blog/`.** Il faudrait aussi vérifier les autres types de pages du sitemap (`/apprendre-le-handpan/`, `/a-propos/`, pages produits Yishama/Neotone, etc.) pour voir si elles ont le même défaut de balise hreflang `es` pointant vers du contenu espagnol inexistant.

## Ce qu'il faut faire

1. **Localiser dans le code Astro** la logique qui génère les balises `<link rel="alternate" hreflang="...">` (probablement dans un layout partagé ou un composant SEO/Head) et celle du sélecteur de langue dans la nav.
2. **Corriger pour ne déclarer une alternate `es` que si le contenu existe réellement** pour ce slug dans la collection de contenu espagnole (ex: vérifier l'existence du fichier/entrée `es` correspondant avant de générer le lien, plutôt que de construire l'URL par simple concaténation de préfixe de locale).
3. **Alternative/complément** : si certaines pages `/es/...` doivent rester accessibles en attendant leur traduction, mettre en place une redirection 301 `/es/blog/<slug>/` → `/blog/<slug>/` (fallback vers le FR) plutôt que de laisser un 404 sec — évite de casser un lien déjà partagé ou indexé, tout en n'exposant plus de 404 à Google.
4. Étendre la vérification à toutes les collections de contenu du site (pas seulement `/blog/`), pour s'assurer qu'aucune autre balise hreflang ne pointe vers une page espagnole (ou allemande/italienne/portugaise si elles venaient à être ajoutées) qui n'existe pas.
5. Déployer sur Vercel, puis retester en direct quelques URLs `/es/blog/<slug>/` corrigées pour confirmer qu'elles ne renvoient plus 404 (soit elles servent un contenu réel, soit elles redirigent proprement).
6. Une fois le correctif en production, retourner dans Search Console → Indexation → Pages → "Introuvable (404)" et cliquer sur **"Valider la correction"** pour déclencher la re-vérification par Google. Le processus de validation prend généralement plusieurs jours à ~2 semaines côté Google.

## Point annexe (mineur, sans lien avec l'alerte 404, déjà identifié — pas la peine d'investiguer)

Dans Search Console → Sitemaps, un deuxième sitemap a été soumis par erreur à un moment donné : `https://www.lesagedavid.fr/` (la page d'accueil elle-même, enregistrée comme si c'était un fichier sitemap). Erreur GSC : "Le sitemap est un fichier HTML", 0 page découverte. Le vrai sitemap (`sitemap-index.xml`) fonctionne bien et est correctement déclaré dans `robots.txt`. Cette entrée erronée peut être supprimée directement depuis l'interface Search Console (Sitemaps → menu ⋮ → Supprimer le sitemap) — ce n'est pas un problème de code.
