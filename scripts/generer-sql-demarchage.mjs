// Génère la fonction SQL `public.site_lead_demarchage(message, autres)` depuis
// les règles de `src/lib/demarchage.js` (source unique). Sortie sur stdout :
//   node scripts/generer-sql-demarchage.mjs > /chemin/vers/migration.sql
// puis vérifier la parité : node scripts/test-demarchage.mjs --sql
import {
  REGLES, MOTIF_LIEN, MOTIF_LIEN_CONNU, MOTIF_LIEN_PERSO, MOTIF_FLATTERIE,
  MOTIF_METIER, MOTIF_SUJET_ACHAT_COURS, SEUIL_PROBABLE, VERSION_DEMARCHAGE,
} from '../src/lib/demarchage.js'

// JavaScript → PostgreSQL (ARE) : seule différence utilisée, la limite de mot.
const pg = (motif) => {
  const s = motif.replace(/\\b/g, '\\y')
  if (s.includes('$r$')) throw new Error('motif incompatible avec la citation $r$')
  return `$r$${s}$r$`
}
const txt = (s) => `'${String(s).replace(/'/g, "''")}'`

const regles = REGLES.map((r) => `
    if v_texte ~* ${pg(r.motif)} then
        v_score := v_score + ${r.poids}; v_vocab := v_vocab + ${r.poids};
        v_raisons := v_raisons || ${txt(r.raison)}::text;
    end if;`).join('')

process.stdout.write(`-- Fonction GÉNÉRÉE par site-vitrine/scripts/generer-sql-demarchage.mjs
-- depuis site-vitrine/src/lib/demarchage.js (version ${VERSION_DEMARCHAGE}). Ne pas éditer à la main.
create or replace function public.site_lead_demarchage(p_message text, p_autres text default null)
returns jsonb
language plpgsql
immutable
set search_path = public
as $fn$
declare
    v_msg    text := coalesce(p_message, '');
    v_sujet  text := coalesce(substring(coalesce(p_message, '') from $r$^\\s*\\[([^\\]]{1,80})\\]$r$), '');
    v_corps  text;
    v_texte  text;
    v_score  int := 0;
    v_vocab  int := 0;
    v_raisons text[] := '{}';
    v_ext    text[] := '{}';
    v_l      text;
begin
    v_corps := case when v_sujet <> '' then regexp_replace(v_msg, $r$^\\s*\\[[^\\]]{1,80}\\]\\s*$r$, '') else v_msg end;
    -- Les adresses e-mail ne sont pas des liens.
    v_texte := regexp_replace(v_corps || ' ' || coalesce(p_autres, ''), $r$\\S+@\\S+$r$, ' ', 'g');

    for v_l in select m[1] from regexp_matches(v_texte, '(' || ${pg(MOTIF_LIEN)} || ')', 'gi') as m loop
        if v_l !~* ${pg(MOTIF_LIEN_CONNU)} then v_ext := v_ext || v_l; end if;
    end loop;
    if cardinality(v_ext) > 0 then
        if cardinality(v_ext) >= 3 then
            v_score := v_score + 3; v_raisons := v_raisons || (cardinality(v_ext) || ' liens externes');
        else
            v_score := v_score + 2; v_raisons := v_raisons || 'lien vers un site externe'::text;
        end if;
        if exists (select 1 from unnest(v_ext) e where e ~* ${pg(MOTIF_LIEN_PERSO)}) then
            v_score := v_score + 3;
            v_raisons := v_raisons || ${txt('lien « personnalisé » à ton nom sur un site inconnu (hameçonnage)')}::text;
        end if;
    end if;
${regles}

    if cardinality(v_ext) > 0 and v_texte ~* ${pg(MOTIF_FLATTERIE)} then
        v_score := v_score + 2; v_raisons := v_raisons || 'compliments + lien externe'::text;
    end if;

    if v_sujet <> '' and v_sujet ~* ${pg(MOTIF_SUJET_ACHAT_COURS)} and v_vocab > 0
       and v_texte !~* ${pg(MOTIF_METIER)} then
        v_score := v_score + 1;
        v_raisons := v_raisons || ('motif « ' || v_sujet || ' » sans rapport avec le message');
    end if;

    return jsonb_build_object(
        'score', v_score,
        'raisons', to_jsonb(v_raisons),
        'statut', case when v_score >= ${SEUIL_PROBABLE} then 'probable' else 'non' end,
        'version', ${VERSION_DEMARCHAGE});
end;
$fn$;
`)
