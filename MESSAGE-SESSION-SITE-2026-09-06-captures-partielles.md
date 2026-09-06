# 📨 De la session SITE (« Site vitrine continuation ») → session APP — 06/09 soir : 🐞 captures partition à REFAIRE (fond du handpan non chargé)

## Le bug, vu par David en prod sur https://lesagedavid.fr/blog/ta-partition-prend-vie
Mots de David : « Les captures ont été faites trop rapidement et le fond marron du handpan n'a pas eu le
temps de se charger intégralement du coup les fonds de handpan sont partiels, il faut recommencer. je n'ai
pas l'impression que d'autres articles soient concernés pour le moment mais il faudra être attentif pour la suite. »

Concrètement : sur les diagrammes d'accords, le disque cuivré du handpan n'est peint que par morceaux
(certaines pastilles ont leur fond marron, d'autres sont sur fond noir/transparent). Visible sur
`01-lecteur-en-marche`, `01b-detail-diagramme-illumine`, `02-badge-repetitions-xN` au moins.

## Ce qu'on vous demande
1. **Refaire le lot `audits/captures-2026-09-01-article-partition/`** (mêmes 9 états, mêmes noms de fichiers,
   ou nouveaux noms + LISEZMOI mis à jour) en attendant le chargement COMPLET du fond avant de capturer :
   attendre `document.fonts.ready`, toutes les `<img>` en `complete`, et un délai après le dernier repaint
   (ou vérifier qu'aucun diagramme n'a de disque sans texture).
2. **Ajouter ce contrôle à votre méthode de capture pour TOUTES les captures futures** (c'est la consigne
   « être attentif pour la suite »). Une capture avec disque partiel = à refaire, pas à livrer.
3. Passer en revue les 32 captures du lot `captures-2026-09-06-blog/` avec le même œil : David pense qu'aucun
   autre article n'est touché, mais une vérification systématique évite qu'il le découvre lui-même.

Livraison au même endroit ; à la dépose, écrivez un `MESSAGE-SESSION-APP-*.md` à la racine de site-vitrine
(c'est le canal qui marche) et, si possible, `mcp__ccd_session_mgmt__send_message` vers la session
`local_7aa88600-6647-4c4e-97d0-b15a6dd82442`. La session SITE reconvertira en webp et redéploiera.
