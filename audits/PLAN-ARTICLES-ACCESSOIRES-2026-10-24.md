# Plan — articles « Accessoires et micros handpan » (24/10/2026)

Demande de David (24/10) : « Sur mon blog crée des articles sur tous les accessoires que je vends et crée une rubrique Accessoires et micros Handpan ».

## 1. La rubrique (faite dans ce lot)

- Slug `accessoires` (paramètre `?c=accessoires`). Libellés : « Accessoires et micros handpan » / « Handpan accessories & microphones » / « Accesorios y micrófonos de handpan ». Défini dans `src/lib/blogCategories.ts` (le schéma `src/content.config.ts` lit cette liste).
- **Un article = une seule catégorie** (choix existant du blog : le filtre compare `data-category` à une seule valeur). Je propose de le garder : un article multi-catégorie compterait deux fois dans les puces et brouillerait le filtre. Les articles « matériel autour du Neotone » passent donc de `neotone` à `accessoires` ; ceux qui parlent du Neotone lui-même restent dans `neotone`.
- Rangés dans la rubrique (FR + EN, catégorie seule changée) :
  - `setup-nomade-neotone-bose-s1` (Bose S1 Pro+)
  - `quel-casque-choisir-neotone` (DT-990 Pro, KZ ZS12 Pro X, X-vive U4)
  - `jouer-et-chanter-au-casque-neotone`
- Restent en `neotone` : `pourquoi-handpan-electronique`, `completer-son-handpan-acoustique-avec-un-neotone`, `etre-bien-dans-le-son-neotone` (à revoir si David le considère comme un article matériel). `neotone-10-ou-19-notes` non touché.
- Effet : la puce « Neotone & matériel » passe à 3 articles. Si David le souhaite, la renommer « Neotone » (libellé seul).

## 2. Inventaire des accessoires vendus (`src/data/shop.ts`)

| Produit | Catégorie boutique | Article de blog | Page dédiée | Médias | Lien / code |
|---|---|---|---|---|---|
| Micro Hisong AirStudio S1 | micros | aucun | `/micro-hisong/` | `prod-micro-hisong.webp`, `prod-hisong-2…7.jpg`, `showroom-gonilele-micro-hisong.webp`, `showroom-yishama-micros-hisong.webp` ; YouTube `B_7ZvlpHUsE`, `rx8ZZcL7Nog` | via la page (hisong.io), code `DAVID-LESAGE-SAVE-5` (−5 %) |
| Micro Muling (MP1 + préampli HMP-2) | micros | aucun | `/micro-muling/` | `prod-muling-1…10.jpg`, ~20 `muling-*.webp` (boîte, préampli, capsules, schéma FR/EN, `muling-sur-handpan.webp`, `muling-setup.webp`) ; YouTube `ENArz99dyTQ` | via la page ; « −5 % via moi » (pas de `discountCode`) |
| Casque Forbrain | micros | aucun | non (fiche boutique) | `prod-forbrain-1.webp` seulement | `shop.soundforlife.com/?affiliate=3A9907007`, code `3A9907007` (−10 %) |
| Pieds Atlas Pro / Atlas All | accessoires | aucun | `/pieds-atlas/` | `prod-atlas-pro-1…8`, `prod-atlas-all-1…9`, `prod-atlas-body-1…3`, vidéo `sa-atlas.mp4` | via la page (`atlasBuyUrl()`), code `DAVID-ATLAS` (−10 %, interrupteur `ATLAS_PROMO_ACTIVE`) |
| Gourde ÖKO | outils | aucun | non | `prod-oko-1…6` ; YouTube `yHKnJPz9TkQ` | `okoeurope.com/...?ref=DAVIDOKO`, code `DAVIDOKO` (−10 %) |
| Housse de calebasse Now Groove | créations | aucun | non | `prod-housse-1…4.jpg` | HelloAsso (prévente), sans code |
| Kit calebasse signature | créations | aucun | non | `prod-calebasse*.jpg` | HelloAsso, sans code — instrument plutôt qu'accessoire |
| Cœur de Son (tambour en toile) | instruments | aucun | non | `prod-coeur-de-son-1.webp` (crédit Cœur de Son) | coeurdeson.com, code `DAVID-COEUR-DE-SON` — **instrument, pas accessoire** : hors rubrique |
| one sec, Structured | outils | — | — | — | applis, **hors rubrique** (pas des accessoires handpan) |
| Bose S1 Pro+, casques DT-990 / KZ / X-vive | pas dans `shop.ts` | déjà couverts (3 articles rangés) | — | `prod-bose-s1pro.webp`, `prod-casque-dt990.webp`, `blog-casque-neotone.webp` | — |

## 3. Articles à écrire — ordre proposé (matière × demande)

1. **Micro Muling** — FR « Micro pour handpan acoustique : mon set Muling MP1 + HMP-2 » / EN « Handpan microphone: my Muling MP1 + HMP-2 set ». Requête : « micro handpan ». Angle : capter un handpan acoustique sans Larsen (mots de la page : « captation claire et précise, sans Larsen »), installation pas à pas avec les photos du préampli et des capsules. Médias : le plus riche du site (schéma FR/EN, vidéo de test). Liens : `/micro-muling/`, boutique. Manque : une photo de David en concert avec le set.
2. **Pieds Atlas** — FR « Quel pied pour son handpan ? Atlas Pro ou Atlas All » / EN « Which handpan stand? Atlas Pro vs Atlas All ». Requête : « pied handpan », « support handpan ». Angle : aluminium replié vs bois, à quelle hauteur on joue debout/assis ; partenaire italien (affiliation validée 20/08). Médias : nombreuses photos + `sa-atlas.mp4`. Prix : ne citer que les prix publics de `src/data/atlas.ts`, code `DAVID-ATLAS` tant que la promo est active. Manque : photo de David jouant sur un Atlas en showcase.
3. **Micro Hisong AirStudio S1** — FR « Hisong AirStudio S1 : un micro sans fil pour chanter et jouer du handpan » / EN « Hisong AirStudio S1: a wireless mic for voice and handpan ». Requête : « micro sans fil handpan », « micro voix handpan ». Angle : studio mobile (micro, retours, interface) pour la voix + l'instrument ; comparer avec Muling (acoustique pur) sans dénigrer. Médias : photos showroom, 2 vidéos YouTube. Code `DAVID-LESAGE-SAVE-5`. ⚠️ Ne pas toucher `HisongDirectForm.astro` ni `supabase/functions/hisong-direct/` (autre agent). Manque : capture audio/vidéo de David.
4. **Casque Forbrain** — FR « Forbrain : un casque pour entendre sa voix et chanter plus juste » / EN « Forbrain: a headset to hear your own voice and sing in tune ». Requête : « casque pour chanter juste », « entendre sa voix ». Angle : outil d'entraînement voix + handpan, « l'expérience est bluffante » (fiche boutique), **aucune promesse médicale**. Lien vers `jouer-et-chanter-au-casque-neotone`. Manque : photos de David avec le casque (une seule image produit), vidéo.
5. **Housse de calebasse Now Groove** — FR « Une housse-sac à dos pour transporter sa calebasse » / EN équivalent. Requête : « housse calebasse ». Angle : conçue par David (fonction tapis, sangles détachables, velours). Faible demande de recherche, statut prévente à vérifier avec David avant d'écrire.
6. **Gourde ÖKO** (optionnel) — rattachement discutable à « handpan » : à valider avec David (« la gourde que j'emmène partout… en tant que musicien en déplacement »). Si oui, angle « mon sac de musicien nomade », relié au setup Bose S1.

Exclus de la rubrique sauf avis contraire de David : Cœur de Son, kit calebasse (instruments), one sec, Structured (applis).

## 4. Règles pour chaque article

- Lire `specs/CHARTE-ARTICLES.md` avant d'écrire ; FR puis EN.
- **Aucun prix ni fait inventé** : prix et codes tirés de `shop.ts` / `atlas.ts` au moment d'écrire (ils changent), sinon ne pas les citer.
- **Affiliation et codes dits honnêtement** (« lien d'affiliation », « code partenaire »), sans parler de commission chiffrée.
- Mots de David cités tels quels quand ils existent ; ce qui manque est demandé, pas comblé.
- **Un relecteur distinct** remplit la grille de la charte avant publication ; parcours complet du rendu.
- Catégorie `accessoires`, liens vers la page dédiée et la boutique.
