"""Page Yishama en anglais britannique, 03/11/2026. Redaction Opus en session, sur la consigne
specs/traduction-neotone/CONSIGNE-EN.md. Les fragments deja traduits (page Neotone, page de vente) sont
repris tels quels (en-0-repris.json). Noms d'ecrans verifies dans translations.ts de l'app : My duo,
Play the duo, only together, harmonic star, What you can do with these two handpans.
Ecrit en-4-final.json, controle balises, nombres, cadratin, bords. Usage : python -X utf8 traduire.py"""
import json, re
T = json.load(open('table.json', encoding='utf8'))
o = json.load(open('en-0-repris.json', encoding='utf8'))
EN = {
 'Y001': 'Yishama',
 'Y002': 'David Lesage sitting between his two Yishama handpans, against a black background.',
 'Y003': 'Handpan Constellation Studio · for Yishama duos',
 'Y004': 'Two Yishamas. <em>One instrument.</em>',
 'Y005': 'You have two handpans, and you play them one after the other? Put them side by side in the app: it shows you the chords that only exist with both, and the path of your hands from one shell to the other.',
 'Y008': 'Reveal my duo',
 'Y009': 'Or start with a single handpan, free and no card needed',
 'Y010': 'The D Kurd 18 and E18 David Lesage Signature duo in the app: the two shells side by side, every note in colour, and the hands resting on the first.',
 'Y011': 'The chords of my D Kurd 18 alone, then with my E18',
 'Y012': 'How many chords do you really play?',
 'Y013': 'Two handpans. But played one after the other?',
 'Y014': 'Most players who own two handpans play them as two separate instruments: this one for one piece, that one for another. And the note that would make the chord you’re after playable is always missing. Often, it’s on the other shell.',
 'Y015': 'Two acoustics side by side: the app does the counting.',
 'Y016': 'First month free. Starting with a single handpan stays free.',
 'Y017': 'Just one',
 'Y018': 'The duo',
 'Y019': 'The app with the D Kurd 18 and E18 David Lesage Signature acoustic duo side by side: a chord lit up from one shell to the other, numbered in playing order, and the harmonic star showing 24 chords out of 24.',
 'Y020': 'My duo, as the app sees it',
 'Y021': 'A D Kurd 18 and an E18. Twenty-four chords.',
 'Y022': 'On its own, each of my two Yishamas plays 6 chords. Together they play 24, 12 of which neither plays alone.',
 'Y023': 'My duo in the app: the chord lights up on both shells, and the harmonic star counts 24 out of 24.',
 'Y024': 'The twelve chords that only exist with both',
 'Y025': 'chords, 12 of which you only play with both',
 'Y026': 'playable keys, out of 24',
 'Y027': 'pieces, on top of the 157 on my D Kurd',
 'Y040': 'Reveal the chords of my duo',
 'Y041': 'A chord as a closed constellation on a D Kurd 18',
 'Y042': 'The same chord as an open constellation, D Kurd 18',
 'Y043': 'The same chord, showing the path of the hands, D Kurd 18',
 'Y045': 'Each chord is drawn as a constellation.',
 'Y046': 'You see the shape, then the path, then the hands. In a duo, the line crosses the space from one shell to the other, and the playing order follows it.',
 'Y053': 'The My handpans panel in the app: the Yishama David Lesage Signature duo in place, the D Kurd 18 as the main pan and the E18 beside it, with the “Play the duo” button.',
 'Y054': 'In the app',
 'Y055': 'My duo',
 'Y056': 'Set out your two Yishamas. The app does the rest.',
 'Y057': 'Two slots, one button. Your two handpans appear side by side, each with its own notes.',
 'Y058': 'My duo: two slots, then “Play the duo”.',
 'Y059': '<b>Two rows of chords.</b> First the 7 chords of your key. Then the ones only your two handpans together can play, marked “only together”.',
 'Y060': '<b>One click on the eye.</b> The chord lights up on both shells, numbered in the order you play it, with a line from one shell to the other.',
 'Y061': '<b>What you can do with these two handpans.</b> The new chords, the playable keys, the pieces the duo adds.',
 'Y062': '<b>The harmonic star.</b> It shows you where to go from the chord you’re playing.',
 'Y063': '<b>Your duos go with you.</b> Saved to your account, they’re waiting for you on your tablet just as on your computer.',
 'Y064': 'Two rows of chords.',
 'Y065': 'One click on the eye.',
 'Y066': 'What you can do with these two handpans.',
 'Y067': 'The harmonic star.',
 'Y068': 'Your duos go with you.',
 'Y069': 'Open my duo',
 'Y070': 'Completing a D Kurd: the notes it’s missing, and the second handpan that completes it best',
 'Y071': 'Only have one Yishama?',
 'Y072': 'Hear your second one before you order it.',
 'Y073': 'The app tells you which notes your handpan is missing, ranks the scales that complete it best, and sets the suggested handpan beside yours, without saving anything.',
 'Y074': 'Falling for a sound often means picking a scale too close to the first. The app shows you what the second one really adds.',
 'Y075': 'All your handpans',
 'Y076': 'All your Yishamas in one account.',
 'Y077': 'Each with its own scale and its own shell. And when they play together, the app sees them as one instrument.',
 'Y078': 'The chords of each, and the ones you only play with both, drawn from one shell to the other.',
 'Y080': 'Your sets ready, a clean display for playing live.',
 'Y081': 'Your duo',
 'Y083': 'On stage',
 'Y084': 'Yishama emblem, David Lesage, artist collaboration.',
 'Y085': 'Why this duo',
 'Y086': 'Designed by a singer who plays two Yishamas.',
 'Y087': 'David Lesage wanted to sing in any key, with the lowest note of every chord under his hand. Yonathan, at Yishama, designed two 18-note instruments with him that, together, give him every sharp and every flat.',
 'Y088': 'They’ve just been retuned. This duo is the one you see on this page.',
 'Y089': 'The Yishama offer',
 'Y090': 'Buying a duo from Yishama? You get a year of Studio, free.',
 'Y091': 'Your two instruments arrive, and the app is already set to show you everything they can do together.',
 'Y093': 'One handpan is free. The duo is Studio.',
 'Y096': 'Recognise your scale through the mic',
 'Y097': 'Every chord on your instrument, in colour and as constellations',
 'Y098': 'The songs your handpan can play tonight',
 'Y099': 'Find your voice, practise, save what you create',
 'Y100': 'Know which handpan to choose next',
 'Y104': 'Play with two handpans',
 'Y105': 'Reveal the chords of your duo',
 'Y106': 'Play several handpans around you',
 'Y107': 'Your voice, your stage',
 'Y108': 'Work on your pitch with the singing exercises',
 'Y109': 'Hear yourself in your headphones',
 'Y110': 'Go on stage with your sets',
 'Y111': 'Your work',
 'Y112': 'All of Essential: transpose, play offline, the scrolling score, loop a passage, play along with a drummer',
 'Y113': 'Export to MIDI and MusicXML, keep your compositions private',
 'Y114': 'The app on several devices at once',
 'Y115': 'Or €89 a year. We take your card details when you sign up, and you’re not charged if you cancel before the free month ends.',
 'Y116': 'Start for free',
 'Y119': 'Is my Yishama in the app?',
 'Y120': 'The app knows 74 shells and 541 makers. And if you don’t know the name of your scale, play it into the mic: the app finds it.',
 'Y121': 'Do I need Studio for the duo?',
 'Y122': 'Yes. Your first handpan gets everything that’s free in the app. Playing with two handpans and revealing the chords of your duo is Studio.',
 'Y123': 'And if I only have one Yishama?',
 'Y124': 'Everything that’s free is there for it. And the app tells you which second handpan would complete it best, before you order it.',
 'Y126': 'On a computer or tablet, in your browser. Your duos go with you from one to the other.',
 'Y131': 'Your two Yishamas<br>have things to say to each other.',
 'Y132': '€9.99 a month, first month free. Starting with a single handpan stays free.',
 'Y134': 'Two Yishamas, one instrument | Handpan Constellation Studio',
 'Y137': '“A scale is a choice. Which means giving something up.”',
 'Y138': '6 chords with my D Kurd 18',
 'Y139': '24 chords with my E18',
 'Y135': 'Two Yishamas, one instrument: Handpan Constellation Studio reveals the chords that only exist with both, and the path of the hands from one shell to the other.',
}
for k in ['Y%03d' % i for i in range(28, 40)]:   # noms d'accords, identiques
    EN[k] = T[k]['fr'][1:-1]
for k, v in EN.items():
    fr = T[k]['fr']
    a = re.match(r'(alt|aria-label|title)="', fr)
    o[k] = f'{a.group(0)}{v}"' if a else (f'>{v}<' if fr.startswith('>') else v)
balises = lambda s: '|'.join(re.findall(r'<[a-z/][^>]*>', s))
nombres = lambda s: sorted(re.findall(r'\d+(?:[.,]\d+)?', re.sub(r'<[^>]+>', ' ', s).replace(',', '.')))
pb = []
if set(o) != set(T):
    pb.append(f'cles manquantes {sorted(set(T) - set(o))} en trop {sorted(set(o) - set(T))}')
for k, v in o.items():
    fr = T[k]['fr']
    if '—' in v: pb.append(f'{k} cadratin')
    if balises(fr) != balises(v): pb.append(f'{k} balises {balises(fr)} / {balises(v)}')
    if nombres(fr) != nombres(v): pb.append(f'{k} nombres {nombres(fr)} / {nombres(v)}')
    if fr[0] == '>' and (v[0] != '>' or v[-1] != '<'): pb.append(f'{k} bords')
json.dump(o, open('en-4-final.json', 'w', encoding='utf8'), ensure_ascii=False, indent=1)
print('\n'.join(pb) or 'controle OK', len(o))
