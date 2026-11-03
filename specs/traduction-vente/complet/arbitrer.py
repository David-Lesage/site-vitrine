# Arbitrage de l'anglais complet, 02/11/2026 : part du rédacteur, applique les choix ligne par ligne.
import json
r=json.load(open('complet/en-1-redacteur.json',encoding='utf8'))
l=json.load(open('complet/en-2-lecteur.json',encoding='utf8'))['rows']
f=json.load(open('complet/en-3-fidelite.json',encoding='utf8'))['rows']
o={k:v['en'] for k,v in r.items()}
for k in 'L64 L90 L100 L103 L104 L119 L135 L139 L145 L146 L163 L186 L201 L202 L206 L210 L211 L217 L218 L232 L286 L298 L317 L334 L336'.split(): o[k]=l[k]['proposal']
for k in 'L150 L151 L153 L154 L226'.split(): o[k]=f[k]['proposal']
o.update({
'L66':'The catalogue songs your handpan can play are already there. Got another in mind? Paste its chords and lyrics, or drop in the file, and the app shows it on your own handpan.',
'L86':'A handpan can carry a voice, just as a guitar or a piano can. Start with your own.',
'L105':'<b>Your ritual</b><p>Your own practice time, and your progress, day by day.</p>',
'L149':'<b>Open</b>A path that follows the notes, so you can see how the hand travels.',
'L152':'<b>Hands</b>The path made for the movement. Which hand, which note: you can read your playing straight off it.',
'L156':'<figcaption>Emotional feeling</figcaption>',
'L161':'By feel, a scale is joyful or sad, and its sadness can be deep, Eastern or jazzy. You compose a journey of sensations.',
'L162':'In music theory, the same settings go by their proper names: major, natural minor, harmonic, melodic, degree progression.',
'L168':'<b>Musician</b><p>Everything unlocked: all 7 chords, the 7th and 9th extensions…</p>',
'L177':o['L177'].replace('Plenty to learn, experiment and progress on your own!','Everything you need to learn, experiment and progress on your own!'),
'L207':'makers listed on the map',
'L212':'<b>A community, not a catalogue</b><p>Together, we’re building the tool we’d all have loved to have as children.</p>',
'L258':'<li>See and hear your scale transposed</li>',
'L284':'<li>Keep track of your students</li>',
})
assert 'Everything you need to learn' in o['L177']
a=json.load(open('pilote/en-4-arbitrage.json',encoding='utf8'))
o.update(a)
t=json.load(open('table.json',encoding='utf8'))
for k in open('complet/ids-techniques-gardes.txt').read().split(): o[k]=t[k]['en']
assert set(o)==set(t),set(t)^set(o)
json.dump(o,open('complet/en-4-final.json','w',encoding='utf8'),ensure_ascii=False,indent=1)
print(len(o))
