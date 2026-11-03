# Arbitrage de l'espagnol, 02/11/2026 : part du rédacteur, applique les choix ligne par ligne.
import json
r=json.load(open('complet-es/es-1-redacteur.json',encoding='utf8'))
l=json.load(open('complet-es/es-2-lecteur.json',encoding='utf8'))['rows']
f=json.load(open('complet-es/es-3-fidelite.json',encoding='utf8'))['rows']
o={k:v['es'] for k,v in r.items()}
for k in 'L46 L50 L51 L60 L61 L63 L64 L66 L73 L79 L103 L105 L134 L149 L161 L162 L163 L168 L187 L189 L196 L202 L208 L211 L212 L217 L218 L222 L234 L250 L252 L265 L281 L283 L288 L312 L317'.split(): o[k]=l[k]['proposal']
for k in 'L254 L270 L273 L285 L290'.split(): o[k]=f[k]['proposal']
def rep(k,a,b):
    assert a in o[k],(k,a,o[k]); o[k]=o[k].replace(a,b)
rep('L90','su nota cómoda','su nota de confort')
rep('L157','Progresión de grados','Secuencia de grados')
rep('L162','progresión de grados','secuencia de grados')
rep('L177','¡Todo lo necesario','¡Lo necesario')
rep('L179','atento y que sabe escuchar','amable y que sabe escuchar')
rep('L334','reciban un instrumento','reciban la señal de un instrumento')
t=json.load(open('table.json',encoding='utf8'))
for k in open('complet/ids-techniques-gardes.txt').read().split(): o[k]=t[k]['es']
assert set(o)==set(t)
json.dump(o,open('complet-es/es-4-final.json','w',encoding='utf8'),ensure_ascii=False,indent=1)
print(len(o))
