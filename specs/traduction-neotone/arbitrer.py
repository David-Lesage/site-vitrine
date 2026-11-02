# Arbitrage de la page Neotone, 02/11/2026 : part du redacteur, applique les choix ligne par ligne.
# Decisions de fond : chaos cognitif = cognitive overload / caos mental (les deux lecteurs natifs) ;
# noms affiches par l'app gardes (Sound Atlas, Atlas sonoro, Joker, modo Logico) ;
# N067 : le Neotone rejoue le fichier MIDI, confirme dans l'app (Play a MIDI file) ;
# N040 : titre de Yannick garde ; N022 : paroles de David, premiere personne gardee.
import json, re
def charge(n): return json.load(open(n, encoding='utf8'))
T = charge('table.json')

def fin(lg, lect, fide, mien):
    R = charge(f'{lg}-1-redacteur.json'); L = charge(f'{lg}-2-lecteur.json')['rows']; F = charge(f'{lg}-3-fidelite.json')['rows']
    o = {k: v[lg] for k, v in R.items()}
    for k in lect.split(): o[k] = L[k]['proposal']
    for k in fide.split(): o[k] = F[k]['proposal']
    o.update(mien)
    return o

en = fin('en',
    'N004 N005 N006 N010 N013 N014 N016 N025 N038 N049 N064 N093 N098 N099 N106 N107 N113 N116 N125 N128 N129 N135 N136 N137', '',
    {'N007': '>See all your Neotone can do<',
     'N022': '>Here’s what I suggest<',
     'N032': '>Shades of sadness: deep, Eastern, jazzy<',
     'N033': '>The +7, +9, +11 extensions laid out on the instrument<',
     'N067': '>What your Neotone has recorded: listen, download, sort into folders. And play a MIDI file on your Neotone.<',
     'N084': '>The app writes the scale your acoustic is missing to the Neotone, which becomes its joker.<',
     'N095': '>Getting started is free. Studio opens up your whole Neotone.<'})

es = fin('es',
    'N004 N005 N006 N007 N013 N014 N015 N025 N026 N032 N033 N044 N064 N066 N075 N078 N093 N094 N095 N099 N101 N102 N105 N112 N113 N116 N120 N123 N124 N125 N127 N129 N132 N133 N136 N137', 'N068 N069 N070 N072',
    {'N067': '>Lo que ha grabado tu Neotone: escuchar, descargar, ordenar en carpetas. Y un archivo MIDI que reproduce tu Neotone.<',
     'N083': '>Las mismas posiciones, a medio tono o a la tercera. Y tus memorias de dúo, guardadas.<'})
es = {k: v.replace('Atlas Sonoro', 'Atlas sonoro') for k, v in es.items()}
# Fragments que l'extraction avait manques (blockquote, small), traduits a l'arbitrage
en['N138'] = '>“The notes under your fingers are never the same twice.”<'; es['N138'] = '>«Las notas bajo tus dedos nunca son las mismas dos veces.»<'
en['N139'] = '>the scales you already know<'; es['N139'] = '>las escalas que ya conoces<'
en['N140'] = '>the whole instrument, made readable<'; es['N140'] = '>todo el instrumento, legible<'
en['N141'] = '>forever, no card needed<'; es['N141'] = '>para siempre, sin tarjeta<'

balises = lambda s: '|'.join(re.findall(r'<[a-z/][^>]*>', s))
nombres = lambda s: sorted(re.findall(r'\d+(?:[.,]\d+)?', re.sub(r'<[^>]+>', ' ', s).replace(',', '.')))
pb = []
for lg, o in (('en', en), ('es', es)):
    if set(o) != set(T): pb.append(f'{lg} cles')
    for k, v in o.items():
        fr = T[k]['fr']
        if '—' in v: pb.append(f'{lg} {k} cadratin')
        if balises(fr) != balises(v): pb.append(f'{lg} {k} balises {balises(fr)} / {balises(v)}')
        if nombres(fr) != nombres(v): pb.append(f'{lg} {k} nombres {nombres(fr)} / {nombres(v)}')
        if fr[0] == '>' and (v[0] != '>' or v[-1] != '<'): pb.append(f'{lg} {k} bords')
        a = re.match(r'(alt|aria-label|title)="', fr)
        if a and not v.startswith(a.group(0)): pb.append(f'{lg} {k} attribut')
    json.dump(o, open(f'{lg}-4-final.json', 'w', encoding='utf8'), ensure_ascii=False, indent=1)
print('\n'.join(pb) or 'controle OK', len(en), len(es))
