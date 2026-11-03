# Corrections retenues de l'analyse à froid espagnole, 02/11/2026 (page-app/a-froid-es/analyse.md).
import json
p='complet-es/es-4-final.json'; o=json.load(open(p,encoding='utf8'))
def rep(k,a,b):
    assert a in o[k],(k,a,o[k]); o[k]=o[k].replace(a,b)
rep('L244','ahorra hasta 28','ahorra hasta un 28')
rep('L265','(ahorra 28 %)','(ahorra un 28 %)'); rep('L281','(ahorra 26 %)','(ahorra un 26 %)')
rep('L265','sin mes de prueba','sin mes gratis'); rep('L281','sin mes de prueba','sin mes gratis')
o['L228']='Toca unas notas frente al micro: la app la encuentra.'
rep('L189','afina, marca','sirve de afinador, marca')
o['L103']='<b>Tus acordes</b><p>Las progresiones de acordes desfilan en una cinta, a tu ritmo.</p>'
rep('L46','sus acordes en colores','sus acordes de colores')
rep('L195','en colores y en constelaciones','por colores y en constelaciones')
rep('L152','pensado para el gesto','pensado para las manos')
rep('L176','lo bien que lleva su nombre','lo mucho que hace honor a su nombre')
rep('L176','el campo de todas las posibilidades','un sinfín de posibilidades')
rep('L49','seguramente el tuyo ya está aquí','lo más probable es que tu handpan ya esté aquí')
rep('L337','transpone una canción','transpones una canción')
rep('L337',': ejercicios de canto',': todo lo de Esencial, más ejercicios de canto')
json.dump(o,open(p,'w',encoding='utf8'),ensure_ascii=False,indent=1)
print('ok')
