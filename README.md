# Site David Lesage

Site vitrine multi-pages de **David Lesage** — musicien, pédagogue et inventeur.
Construit avec [Astro](https://astro.build/) + Tailwind CSS v4, dans l'esprit
technique du repo [Cap-go/website](https://github.com/Cap-go/website).

> **Principe fondateur** : David Lesage est la marque-mère. Neotone, Handpan
> Studio, les Cours et les micros sont ses univers — pas l'inverse.

## Stack

- **Astro 6** (output statique)
- **Tailwind CSS v4** (via `@tailwindcss/vite`, config CSS-first dans `src/styles/global.css`)
- **astro-icon** + icônes `lucide`
- **@astrojs/sitemap** (sitemap automatique)
- **Snipcart** (panier e-commerce, optionnel — voir ci-dessous)
- Polices : **Fraunces** (display) + **Manrope** (body)

## Démarrer

```bash
bun install
bun run dev        # http://localhost:4321
bun run build      # build statique dans dist/
bun run preview    # prévisualiser le build
bun run check      # vérification de types Astro
```

## Pages (menu principal)

| Page | Route | Contenu |
|---|---|---|
| Accueil | `/` | David héros, 3 univers, showroom, communauté, preuve sociale |
| Le Neotone | `/le-neotone` | Modèles, bois, specs, comparatif, **calculateur de prix**, procédure, FAQ |
| Boutique | `/boutique` | Catégories WooCommerce-like : handpans (devis) + micros (panier Snipcart) |
| Cours | `/cours` | Méthode visuelle, formules & tarifs, workshops |
| Handpan Studio | `/handpan-studio` | ChromaKeys, Constellations, émotions, 4 modes, liste d'attente |
| Showroom | `/showroom` | Paris 20ᵉ, exclusivité jour-même, agenda, accès |
| À propos | `/a-propos` | Histoire, vision, preuves, collaborations |
| Contact | `/contact` | Coordonnées + formulaire (Netlify Forms compatible) |

Plus `/mentions-legales`.

## Configuration (.env)

Copier `.env.example` en `.env` :

```
PUBLIC_SNIPCART_KEY=   # clé publique Snipcart (vide = panier désactivé)
SITE_URL=https://www.lesagedavid.fr
```

- **Sans `PUBLIC_SNIPCART_KEY`** : les boutons « Ajouter au panier » deviennent
  « Commander par email ». Le site reste 100 % fonctionnel.
- **Avec la clé** : le panier Snipcart s'active (script + CSS chargés dans le
  `<Layout>`, bouton panier dans le header). Le Neotone reste en demande de code
  de remise (acompte + code nominatif), pas en achat direct.

## Données & contenu

Tout le contenu éditable est centralisé :

- `src/data/site.ts` — marque, contact, navigation, réseaux, ChromaKeys
- `src/data/neotone.ts` — modèles, prix, bois, specs, TVA par pays, comparatif, FAQ, procédure
- `src/data/shop.ts` — catalogue boutique (catégories + produits)

Le **calculateur de prix** (`src/components/Calculator.astro`) applique la remise
(−5 % en ligne / −7 % showroom), la TVA 2026 par pays, et l'autoliquidation B2B.

## SEO

Outillage repris de la stack Cap-go, en version épurée :

- **`SEO.astro`** : title/description uniques, canonical, OpenGraph + Twitter (avec `image:alt`), geo tags. La description est automatiquement clampée à ≤ 160 caractères.
- **JSON-LD** (`src/lib/ldJson.ts`) : `Person`, `FAQPage`, `Product`/`Offer`, `MusicStore` (showroom, données locales), `ItemList` (boutique), `BreadcrumbList`.
- **`@astrojs/sitemap`** + `robots.txt`.
- **`@capgo/seo-checker`** : validateur SEO statique post-build.

```bash
bun run build:seo        # build + audit SEO (échoue si erreur)
bun run seo:check        # audit seul sur dist/
bun run seo:check:report # rapport dans seo-report.txt
```

Config : `seo-checker.config.json` (strict, `failOn: ["error"]`). Deux règles
désactivées volontairement :
- `SEO00223` — faux positif (tous les liens ont un texte ou un `aria-label`, vérifié).
- `SEO01174` — le checker ne reconnaît pas certains types schema.org pourtant valides (FAQPage, BreadcrumbList…).

État actuel : **0 erreur, 0 avertissement** (les ~80 « notices » restantes sont
informatives : contenu mince sur pages courtes, etc.).

## Déploiement

Build statique → déployable sur n'importe quel hébergeur statique
(Vercel, Netlify, Cloudflare Pages…). Penser à définir `SITE_URL` et
`PUBLIC_SNIPCART_KEY` dans les variables d'environnement de l'hébergeur.

## À produire ensuite (cf. document directeur)

- Calendrier réel d'événements / showcases (point faible actuel : « À venir »)
- Témoignages clients & élèves (preuve sociale)
- Contenu blog/SEO
- Fiches micros Hisong détaillées
- Multilingue (FR/EN/DE/ES/IT/PT) — architecture i18n à ajouter
