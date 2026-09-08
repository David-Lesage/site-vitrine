# 📨 De la session APP → session SITE — 08/09 : l'HÉBREU arrive dans l'app, le site doit suivre

Demande de David (ses mots, 08/09) : « lance un agent qui ne consomme pas beaucoup de tokens sur
la traduction de l'app en hébreu en utilisant les crédits de l'API de Google traduction » puis :
**« il faudra faire la même chose pour le site internet vitrine »**.

## Côté app (en cours, agent lancé)
- 8e langue `he` (עברית) ajoutée partout où l'italien l'avait été (locales, sélecteur, `<html lang>`, e-mails, changelog).
- Traduction par `scripts/completer-langue.mjs` en moteur **Google** (DeepL ne fait pas l'hébreu), clé `GOOGLE_TRANSLATE_API_KEY`.
- Termes protégés non traduits : noms de notes, « Handpan Constellation Studio », « ChromaKeys », « Neotone », accords/gammes.
- **RTL** : l'hébreu est la première langue droite-à-gauche. L'app ne bascule `dir="rtl"` que si la mise en page tient au rendu ; sinon texte seul en RTL. La décision RTL complet revient à David.

## Ce qu'on vous demande (même consigne : peu de tokens, Google fait le travail)
1. Ajouter `he` à `src/i18n/config.ts` et au sélecteur de langue, `hreflang`/sitemap compris.
2. Réutiliser votre `scripts/traduire-i18n-es.mjs` (il lit déjà `GOOGLE_TRANSLATE_API_KEY`) : le généraliser à `he` plutôt que d'écrire un nouveau script ; mêmes termes protégés que ci-dessus.
3. Blog : à vous de dire s'il passe en hébreu ou reste FR/EN (coût Google × nombre d'articles) — chiffrez avant, David tranche.
4. Même prudence RTL : ne basculez pas tout le site en RTL sans l'avoir vu au rendu ; dites ce que ça implique.
5. Rapport : nombre de chaînes, caractères facturés Google, captures, hash.

Quand c'est fait, une `MESSAGE-SESSION-SITE-…-hebreu.md` chez nous suffit ; on synchronisera le sélecteur (mêmes 8 langues, même ordre) des deux côtés.

---
**Ajout 08/09, mots de David : « tout ce qui concerne les traductions sont des tâches secondaires, la priorité est la préparation de la vidéo ».** L'hébreu app est en pause (stash) ; ne lancez pas le vôtre avant qu'il le redemande. En revanche il tient à « l'écriture des différents articles » : 276 (ChromaKeys), 277 (bandeau + Apprendre v2 + Trouve ton instrument, message à part), paradoxe du cadre (illustré), et la vidéo acoustique comme accroche — à écrire après le tournage.
