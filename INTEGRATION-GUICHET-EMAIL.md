# Guichet « cet email est-il déjà pré-autorisé ? » — contrat d'intégration site vitrine

> Écrit le **30/08/2026** par la session APP (projet `NEOTONE STUDIO/NEOTONE 1er mai 2026`).
> Ce fichier est le **contrat** entre les deux projets. Côté app, l'Edge Function
> `beta-door-check` a été ouverte aux origines du site vitrine et **déployée** le
> 30/08/2026. Elle est opérationnelle : il n'y a rien à déployer côté backend.
>
> Le code source de référence :
> `~/CLAUDE/NEOTONE STUDIO/NEOTONE 1er mai 2026/supabase/functions/beta-door-check/index.ts`

---

## 1. À quoi ça sert (le besoin de David)

Un **ambassadeur pré-autorisé** qui arrive par `lesagedavid.fr/handpan-app` et saisit son
email dans le formulaire ne doit **pas** remplir une liste d'attente : il est déjà invité.
Le site doit le reconnaître et l'envoyer directement **créer son mot de passe** dans l'app.

L'écran d'entrée de l'app fait exactement ça depuis le 28/08. Le site utilise **le même
guichet**, avec **la même réponse**.

---

## 2. L'endpoint

```
POST https://zqcuhnjjrgmybftppkcl.supabase.co/functions/v1/beta-door-check
```

Pas d'authentification utilisateur (`verify_jwt = false`) — l'écran est **pré-connexion**.
Mais la passerelle Supabase exige quand même la **clé publique (anon / publishable)** :

```
SUPABASE_URL      = https://zqcuhnjjrgmybftppkcl.supabase.co
SUPABASE_ANON_KEY = sb_publishable_turahpl0xi-qKN6jmG3yBg_tqpVZbtx
```

Cette clé est **publique par conception** (elle est déjà dans le bundle de l'app). Elle
n'ouvre rien : la table `beta_door` est en RLS admin-only, cette fonction est le seul
guichet et elle ne répond qu'un booléen.

### Requête

```http
POST /functions/v1/beta-door-check
Origin: https://www.lesagedavid.fr
apikey: sb_publishable_turahpl0xi-qKN6jmG3yBg_tqpVZbtx
Authorization: Bearer sb_publishable_turahpl0xi-qKN6jmG3yBg_tqpVZbtx
Content-Type: application/json

{ "email": "quelquun@example.com" }
```

- **Un seul champ** : `email` (chaîne). Il est normalisé côté serveur (trim + minuscules),
  mais autant le faire aussi côté site.
- Aucun autre champ n'est lu. N'envoie **rien d'autre** (pas de nom, pas de page d'origine).
- L'en-tête `Origin` est posé automatiquement par le navigateur — ne pas le forger.

### Réponse (toujours ce corps, quel que soit le code HTTP)

```json
{ "ok": true, "preauthorized": false }
```

| champ | sens |
|---|---|
| `ok` | la requête a été **traitée** (`false` = refusée, bloquée, ou panne serveur) |
| `preauthorized` | **la seule information utile** : `true` ⇒ envoyer vers « crée ton mot de passe » |

⚠️ **La forme de la réponse est figée.** L'app en dépend. Ne demande pas de champ
supplémentaire (prénom, groupe, vague…) : c'est volontairement impossible — voir §5.

### Codes de retour

| code | quand | ce que fait le site |
|---|---|---|
| **200** `{ok:true, preauthorized:true}` | email pré-autorisé | parcours « crée ton mot de passe » |
| **200** `{ok:true, preauthorized:false}` | email inconnu **ou** connu mais pas pré-autorisé (indistinguable, exprès) | parcours liste d'attente habituel |
| **400** | corps JSON illisible | traiter comme `preauthorized:false` |
| **403** | `Origin` non autorisée (§3) | **bug d'intégration** — le domaine n'est pas dans la liste blanche |
| **405** | méthode ≠ POST | bug d'intégration |
| **429** | limite de débit atteinte (§4) | traiter comme `preauthorized:false`, **sans message d'erreur alarmant** |
| **500** | secret manquant / base injoignable | traiter comme `preauthorized:false` (dégradation sûre) |

**Règle d'or côté site : tout ce qui n'est pas `preauthorized === true` ⇒ parcours normal
de liste d'attente.** Jamais de blocage, jamais d'écran d'erreur. Un ambassadeur mal
reconnu remplit le formulaire habituel — c'est une gêne, pas une porte fermée. Et mentir
ne donne aucun accès : l'ouverture réelle se fait à l'inscription, côté base.

---

## 3. Origines autorisées (CORS)

Vérifiées en réel le 30/08/2026 :

**Site vitrine**
- `https://lesagedavid.fr` · `https://www.lesagedavid.fr`
- les apex des domaines app, qui servent aussi le site (redirigés vers `/handpan-app` par
  `vercel.json`) : `handpanstudio.app`, `handpan-studio.app`, `neotone-studio.app`,
  `neotonestudio.app` — **avec et sans `www.`**, en `https`.

**Dev local du site** : `http://localhost:4321` et `http://127.0.0.1:4321` (`astro dev`).

**App** (inchangé) : `https://play.handpanstudio.app` + ses 3 alias `play.*`,
`http://localhost:3000`, `http://localhost:4319` (+ `127.0.0.1`).

🚫 **Les URL de preview ne sont PAS ouvertes** — ni Vercel (`*-xxxx.vercel.app`) ni Netlify
(`deploy-preview-N--*.netlify.app`) : elles sont aléatoires, donc impossibles à lister sans
joker, et un joker sur `*.vercel.app` ouvrirait le guichet à n'importe qui. **Pour tester,
utiliser `astro dev` sur le port 4321.** Sur une preview, le fetch renverra 403 → le site
doit se comporter normalement (liste d'attente), pas afficher une erreur.

Si un nouveau domaine doit être servi, il faut l'ajouter dans `ALLOWED_ORIGINS` de
`beta-door-check/index.ts` **et redéployer la fonction** — ce n'est pas configurable
depuis le site.

---

## 4. Limite de débit — à intégrer dans l'UX, pas à subir

Le guichet permet, par construction, de **tester si une adresse est invitée**. Il est donc
volontairement lent et avare. Plafonds (durcis le 30/08 précisément pour cette ouverture) :

- **par IP** : 4 requêtes / minute **et** 8 / 10 minutes ;
- **par adresse testée** : 3 / 10 minutes.

Conséquences concrètes pour le site :

1. **Ne pas appeler à chaque frappe.** Appeler **au `blur` du champ ou à la soumission**,
   jamais en `keyup`/`input`. Un debounce de frappe brûlerait le quota d'un vrai visiteur.
2. **Ne pas rappeler pour le même email** : mémoriser la réponse dans la page (une `Map`
   en mémoire suffit) et ne pas relancer si l'email est inchangé.
3. **Un seul appel en vol** à la fois (annuler/ignorer les réponses obsolètes).
4. **429 = silence.** Afficher le formulaire de liste d'attente comme si de rien n'était.
   Surtout pas « trop de tentatives » : ce message dirait à un curieux qu'il a trouvé le
   bon endroit pour balayer une liste.

---

## 5. Ce que le guichet ne dira jamais (et pourquoi ne pas le demander)

- **Aucun nom, prénom, groupe, vague, note ou date.** La fonction ne charge même pas ces
  colonnes en mémoire (requête `count`/`head: true`).
- **« Inconnu » et « connu mais pas pré-autorisé » sont indistinguables** — même code, même
  corps. Ne pas essayer de les différencier côté site.
- **429 et « pas pré-autorisé » renvoient le même corps** : un balayeur ne sait pas s'il
  est bloqué.
- Aucune réponse n'est mise en cache (`Cache-Control: no-store`).

Donc : le site **ne doit jamais** afficher un message qui distingue ces cas, ni écrire
quoi que ce soit qui laisse deviner que l'adresse figure dans une liste. Le seul effet
visible autorisé est le **branchement de parcours** (mot de passe vs liste d'attente).

---

## 6. Exemple d'appel (à adapter, zéro dépendance)

```js
const DOOR_URL = 'https://zqcuhnjjrgmybftppkcl.supabase.co/functions/v1/beta-door-check'
const ANON = 'sb_publishable_turahpl0xi-qKN6jmG3yBg_tqpVZbtx'

const cache = new Map() // email -> booléen, pour ne pas rappeler deux fois

/** True SEULEMENT si l'email est pré-autorisé. Tout le reste = false. */
export async function estPreAutorise(emailBrut) {
  const email = String(emailBrut ?? '').trim().toLowerCase()
  if (!email) return false
  if (cache.has(email)) return cache.get(email)
  try {
    const r = await fetch(DOOR_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: ANON,
        Authorization: `Bearer ${ANON}`,
      },
      body: JSON.stringify({ email }),
    })
    const data = await r.json().catch(() => ({}))
    const oui = r.ok && data?.preauthorized === true
    cache.set(email, oui)
    return oui
  } catch {
    // Réseau coupé, 403, 429, 500 : on ne bloque JAMAIS le visiteur.
    return false
  }
}
```

---

## 7. UX attendue côté site

Sur `/handpan-app` (et sa version `/en/`), au moment où le visiteur a saisi son email :

- **`preauthorized === true`** → basculer sur le message « **tu es déjà invité** » et un
  bouton unique vers l'app pour **créer son mot de passe**, en pointant l'URL canonique de
  l'app : **`https://play.handpanstudio.app`**. Ne pas lui redemander ses coordonnées : il
  est déjà dans la liste, le formulaire de liste d'attente n'a plus de sens pour lui.
- **tout le reste** → formulaire de liste d'attente **inchangé**, sans aucun signal que
  quelque chose a été vérifié.

Le texte du cas « déjà invité » est à écrire par la session qui tient le site (et doit
exister en FR **et** EN, i18n du site). Rappel du cadre produit : ce guichet **n'ouvre
aucun accès** — il ne fait qu'aiguiller vers le bon parcours.

---

## 8. Vérification faite (30/08/2026, en réel après déploiement)

| test | résultat |
|---|---|
| `OPTIONS` depuis `https://lesagedavid.fr` | **200**, `access-control-allow-origin: https://lesagedavid.fr` |
| `POST` depuis `https://lesagedavid.fr` (email bidon) | **200** `{ok:true,preauthorized:false}` |
| `POST` depuis `https://www.lesagedavid.fr` | **200** |
| `POST` depuis `http://localhost:4321` | **200** |
| `POST` depuis `https://evil.example.com` | **403**, `allow-origin: null`, corps identique |
| `POST` depuis `https://play.handpanstudio.app` (non-régression app) | **200**, origine reflétée |
| rafale > 4/min depuis la même IP | **429**, corps identique `{ok:false,preauthorized:false}` |
| corps JSON illisible | **400**, corps identique |

Emails de test utilisés : `test-cors-2026-08-30*@example.invalid` — **jamais** l'adresse
d'un vrai ambassadeur. Aucune donnée Supabase modifiée (la table `beta_door` est lue, pas
écrite).
