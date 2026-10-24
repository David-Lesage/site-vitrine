# Relecture article Hisong (24/10/2026)

**Verdict : publiable APRÈS CORRECTIONS** (pas de blocage dur ; 1 phrase inventée à retirer, 3 faits à faire confirmer par David).

Fichiers : `src/content/blog/chanter-et-jouer-handpan-hisong.md` (FR) et `-en.md` (EN), commit `34873e8`.
Relecture des sources, pas du rendu réel : aucun build n'a été lancé, comme demandé. La grille de la charte reste donc à repasser sur la page rendue.

## Vérifié conforme
- **Prix** : 270,95 €, 360,95 € (+90 €) et 342,91 € avec livraison offerte. Ils sont identiques dans `src/i18n/hisong.ts:30-34`, dans `dict.ts:827` (priceNotes.hisong) et dans `shop.ts:101`.
- **Code** : DAVID-LESAGE-SAVE-5, identique à `hisongAffiliateUrl` et à `shop.ts`.
- **Contenu du studio** (6 éléments, RX Mini, rôle du RX Plus) : repris de `hisong.ts:112-120`.
- **Usages** scène, cours et enregistrement, et la phrase « je l'utilise moi-même » : repris de `hisong.ts`.
- **Muling** : coque, contact et pièce bruyante, cohérent avec `hisong.ts` (compareRows) et l'article Muling.
- **Section Neotone** : cohérente avec `hisong.ts` (relatedText) et avec `setup-nomade-neotone-bose-s1.md:51`.
- **Vidéos** : les IDs et les titres correspondent à `hisongVideos`.
- **Slug** : `chanter-et-jouer-handpan-hisong` est bien le blogSlug attendu par la carte voice (`hisong.ts:82`).
- **Liens internes** : chemins valides (/micro-muling, /micro-hisong, /showroom, /boutique, /blog/setup-nomade-neotone-bose-s1/), avec le préfixe /en/ dans la version EN.
- **Promesse médicale** : aucune.
- **Affiliation** : elle est annoncée clairement, on précise qu'on paie Hisong, et aucun montant de commission n'est donné.
- **Images** : toutes regardées.
  - prod-hisong-7 : handpan, micro, 2 écouteurs, récepteur et tablette sur l'app. Conforme.
  - prod-micro-hisong : micro dans son étui de charge, écouteur et récepteur USB-C. Conforme.
  - gonilele : boîte, micro, écouteurs posés sur la caisse, récepteur pincé. Conforme.
  - showroom : 4 boîtes autour d'un handpan, micro, écouteurs et récepteur posés dessus. Conforme.
  - Le texte en anglais incrusté dans le visuel fabricant est celui du fabricant, toléré.

## À corriger
1. **Phrase inventée attribuée à David** (charte §4 : ne pas faire parler David).
   - FR, ligne 44 : remplacer « C'est l'usage qui m'a fait l'adopter : **chanter en jouant**. » par « **Chanter en jouant.** ».
   - EN, ligne 44 : même correction sur la phrase équivalente.
   - Aucune source dans le dépôt ne dit pourquoi David l'a adopté. Si David a une phrase à lui, on la cite telle quelle.
2. **Tableau Hisong/Muling** (FR et EN, ligne 92) : la source (`hisong.ts`, compareRows) dit « live (kit Master) » et l'article dit « live (avec le RX Plus) ».
   - Les deux ne sont peut-être pas la même chose : faire trancher par David, puis harmoniser la page /micro-hisong et l'article.
   - En attendant, l'article est cohérent avec boxNote et adviceText.
3. **Infobulles** (grille, point 8) : non conforme. Ajouter `<abbr title="…">` à la première occurrence de ces termes :
   - « retours » (= écouteurs où tu t'entends jouer) ;
   - « interface audio » (= boîtier qui fait passer le son du micro vers un téléphone ou un ordinateur) ;
   - « sono » / « table de mixage ».
   - Même chose en EN : in-ear monitoring, audio interface, PA.
4. **Lien gonilele** : la page `src/pages/gonilele.astro` existe. À la ligne 78, transformer **gonilele** en `[**gonilele**](/gonilele/)` (EN : `/en/gonilele/`), car tout renvoi doit être cliquable.

## À faire confirmer par David (ne pas publier sans réponse sur a et b)
a. **Commission Hisong** (ligne 114).
   - Le dépôt ne parle que d'une « URL d'affiliation » ; la commission n'est explicitement écrite que pour Yishama (`dict.ts:694`).
   - Si David ne touche pas de commission, remplacer par : « c'est mon lien partenaire, avec mon code ».
b. **« handpan Yishama »** (légende, ligne 118).
   - Rien de visible ne le prouve sur la photo (autocollant étoile, pas de marque lisible) : l'info ne vient que du nom de fichier.
   - Sinon, écrire « autour d'un handpan acoustique ».
c. **Gonilele avec le Hisong** : la photo le montre bien (récepteur pincé sur la caisse). Le texte prudent actuel est correct.
d. **Photo manquante** : le commentaire `<!-- PHOTO À VENIR -->` n'est pas rendu, il ne bloque pas.
e. **Storytelling** : à la demande de David (24/10), on peut ajouter un lien vers la housse de calebasse s'il veut un maillage entre accessoires. C'est optionnel.
