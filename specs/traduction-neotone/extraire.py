"""Extrait les textes propres a la page Neotone en fragments exacts : >texte< ou attribut="texte".
Ecrit source-fr.md (rédacteur a l'aveugle) et table.json. Identifiant = N001... Usage : python extraire.py <page FR>"""
import json, re, sys
t = open(sys.argv[1], encoding='utf-8').read()
main = t[t.index('<main>') + 6:t.index('</main>')]
BLOC = r'h1|h2|h3|h4|p|li|figcaption|summary|button|span|b|strong|label|div|a'
rows, vus = [], set()
def ajoute(sec, f):
    if f not in vus:
        vus.add(f); rows.append((sec, f))
for sm in re.finditer(r'<section id="([^"]+)".*?</section>', main, re.S):
    sec, s = sm.group(1), sm.group(0)
    s = re.sub(r'<svg.*?</svg>', '', s, flags=re.S)
    for a in re.findall(r'\b(?:alt|aria-label|title)="[^"]*[A-Za-zÀ-ÿ][^"]*"', s):
        ajoute(sec, a)
    # blocs feuilles : le contenu sans autre bloc de structure dedans, balises en ligne gardees
    for m in re.finditer(r'<(h1|h2|h3|h4|p|li|figcaption|summary|button)\b[^>]*>(.*?)</\1>', s, re.S):
        c = m.group(2).strip()
        if re.search(r'[A-Za-zÀ-ÿ]', re.sub(r'<[^>]+>', '', c)) and not re.search(r'<(p|li|ul|div|h\d)\b', c):
            ajoute(sec, '>' + m.group(2) + '<')
    for m in re.finditer(r'<(a|span|b|strong|div)\b[^>]*>([^<>]*[A-Za-zÀ-ÿ][^<>]*)</\1>', s):
        ajoute(sec, '>' + m.group(2) + '<')
b = re.search(r'<div class="barre-appel".*?</div>', t, re.S).group(0)
for m in re.finditer(r'>([^<>]*[A-Za-zÀ-ÿ][^<>]*)<', b):
    ajoute('barre', '>' + m.group(1) + '<')
for a in re.findall(r'<title>(.*?)</title>', t): ajoute('balises', a)
ajoute('balises', re.search(r'<meta name="description" content="([^"]*)"', t).group(1))
ajoute('fenetre', 'Continuer : enregistrer ma carte')
# un fragment inclus dans un autre deja couvert : garder les deux, le plus long s'applique d'abord
T = {f'N{i+1:03d}': {'section': s, 'fr': f} for i, (s, f) in enumerate(rows)}
json.dump(T, open('specs/traduction-neotone/table.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
md = ['# Page de vente Neotone : le francais, ligne par ligne', '']; sec = None
for k, v in T.items():
    if v['section'] != sec:
        sec = v['section']; md += ['', f'## {sec}', '']
    md.append(f"- **{k}** : `{v['fr']}`")
open('specs/traduction-neotone/source-fr.md', 'w', encoding='utf-8').write('\n'.join(md) + '\n')
print(len(T), 'fragments', sum(len(re.sub(r'<[^>]+>', ' ', v['fr']).split()) for v in T.values()), 'mots')
