# Corrections retenues de l'analyse à froid, 02/11/2026 (page-app/a-froid-en/analyse.md).
# Seul le linguistique sûr : ce qui demande de connaître une fonction attend David.
import json
p='complet/en-4-final.json'; o=json.load(open(p,encoding='utf8'))
def rep(k,a,b):
    assert a in o[k],(k,a,o[k]); o[k]=o[k].replace(a,b)
o['L18']='Handpan Constellation Studio: the handpan app, free forever'
o['L54']='The piano has sheet music.'; o['L55']='The guitar has tab.'
o['L184']='Why this, and not something else?'
o['L133']='The same chord in the app: chord I (Balance) in G major.'
o['L156']='<figcaption>Feeling</figcaption>'
o['L86']='A handpan can carry a voice, just as a guitar or a piano can. Start with your voice.'
o['L135']=o['L135'].replace('A chord then becomes a blend, one colour per note.','A chord then becomes a mix of colours, one per note.')
rep('L152','you can read your playing straight off it','you can read what to play straight off it')
rep('L187','A tablature','A tab')
rep('L212','the tool we’d all have loved to have as children','the tool we all wish we’d had as children')
rep('L232','asked for your card','asked for your card details')
rep('L317','We’ll ask for your card at','We’ll ask for your card details at')
rep('L317','You add your card at','You add your card details at')
o['L254']='<li>Scroll the score in time with the music</li>'
o['L256']='<li>Export your scores as PDFs or images</li>'
o['L273']='<li>Play Logic mode on your digital pan</li>'
rep('L298','>Terms and conditions<','>terms and conditions<')
rep('L334','On a computer or tablet, in your browser.','A computer or tablet, in your browser.')
for k in ('L173','L175'): rep(k,'favourite, it','favourite, because it')
print(o['L173']); print(o['L176'])
json.dump(o,open(p,'w',encoding='utf8'),ensure_ascii=False,indent=1)
