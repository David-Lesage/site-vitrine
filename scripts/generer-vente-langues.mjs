#!/usr/bin/env node
/* Page de vente : /en/handpan-app/ et /es/handpan-app/ sont GÉNÉRÉES depuis la page française
   (public/handpan-app/index.html). Même CSS, mêmes scripts : seuls les textes changent, et les médias présents dans public/<langue>/handpan-app/img/ remplacent ceux du français.

   Après toute modification de la page française :
     node scripts/generer-vente-langues.mjs
   Le script s'arrête si un texte français de la table n'existe plus (il faut alors mettre à jour la
   table) : une phrase modifiée en français ne peut donc pas rester périmée sans qu'on le voie.
   Vocabulaire : scripts/LEXIQUE-MUSICAL.md du dépôt de l'app, anglais britannique. */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'

const FR = 'public/handpan-app/index.html'
const src = readFileSync(FR, 'utf8')

/* [français exact, anglais, espagnol]. Appliqué du plus long au plus court. */
const T = [
  // ===== Balises
  ["Handpan Constellation Studio : ton handpan, gratuit pour toujours", "Handpan Constellation Studio: the handpan app, free forever", "Handpan Constellation Studio: la app de handpan gratis para siempre"],
  ["Joue du handpan sans solfège : chaque note a sa couleur, chaque accord sa forme. Gratuit pour toujours, sur tout handpan acoustique comme sur le Neotone.", "Play the handpan without reading music: every note has its own colour, every chord its own shape. Free forever, on any acoustic handpan and on the Neotone.", "Toca el handpan sin solfeo: cada nota tiene su color, cada acorde su forma. La app es gratis para siempre, en cualquier handpan acústico y en el Neotone."],
  ["La constellation des accords de Handpan Constellation Studio", "The chord constellation of Handpan Constellation Studio", "La constelación de acordes de Handpan Constellation Studio"],

  // ===== Menu et pied de page
  ['aria-label="Menu du site"', 'aria-label="Site menu"', 'aria-label="Menú del sitio"'],
  ['aria-label="Liens du site"', 'aria-label="Site links"', 'aria-label="Enlaces del sitio"'],
  ['href="/">Accueil</a>', 'href="/en/">Home</a>', 'href="/es/">Inicio</a>'],
  ['href="/neotone/">Le Neotone</a>', 'href="/en/neotone/">The Neotone</a>', 'href="/es/neotone/">El Neotone</a>'],
  ['href="/yishama/">', 'href="/en/yishama/">', 'href="/es/yishama/">'],
  ['href="/boutique/">Boutique</a>', 'href="/en/boutique/">Shop</a>', 'href="/es/boutique/">Tienda</a>'],
  ['href="/cours/">Cours</a>', 'href="/en/cours/">Lessons</a>', 'href="/es/cours/">Cursos</a>'],
  ['href="/blog/">', 'href="/en/blog/">', 'href="/es/blog/">'],
  ["href=\"/showroom/\">Showroom</a>", "href=\"/en/showroom/\">Showroom</a>", "href=\"/es/showroom/\">Showroom</a>"],
  ['href="/a-propos/">À propos</a>', 'href="/en/a-propos/">About</a>', 'href="/es/a-propos/">Acerca de</a>'],
  ['href="/contact/">Contact</a>', 'href="/en/contact/">Contact</a>', 'href="/es/contact/">Contacto</a>'],
  ['class="site-nom" href="/"', 'class="site-nom" href="/en/"', 'class="site-nom" href="/es/"'],
  ["href=\"https://play.handpanstudio.app/\">Se connecter</a>", "href=\"https://play.handpanstudio.app/\">Sign in</a>", "href=\"https://play.handpanstudio.app/\">Iniciar sesión</a>"],
  ['href="/mentions-legales/">Mentions légales</a>', 'href="/en/mentions-legales/">Legal notice</a>', 'href="/es/mentions-legales/">Aviso legal</a>'],
  ["href=\"/conditions-generales/\">Conditions générales</a>", "href=\"/en/conditions-generales/\">Terms and conditions</a>", "href=\"/es/conditions-generales/\">Condiciones generales</a>"],
  ['href="/politique-de-confidentialite/">Confidentialité</a>', 'href="/en/politique-de-confidentialite/">Privacy</a>', 'href="/es/politique-de-confidentialite/">Privacidad</a>'],

  // ===== Ouverture et héros
  ["title=\"Handpan Constellation Studio : les étoiles deviennent des accords, puis un handpan\"", "title=\"Handpan Constellation Studio: the stars become chords, then a handpan\"", "title=\"Handpan Constellation Studio: las estrellas se convierten en acordes, y luego en un handpan\""],
  ["Passer l’intro", "Skip intro", "Saltar la intro"],
  ['<div class="defile">Défile</div>', '<div class="defile">Scroll</div>', '<div class="defile">Desliza</div>'],
  ["Handpan Constellation Studio · l’app des joueurs de handpan", "Handpan Constellation Studio · the app for handpan players", "Handpan Constellation Studio · la app de quienes tocan el handpan"],
  ["Ce soir, joue une chanson <em>sur ton handpan.</em>", "Play a song tonight, <em>on your handpan.</em>", "Esta noche, toca una canción <em>en tu handpan.</em>"],
  ["Tu joues quelques notes au micro : l’app reconnaît ta gamme et te montre ses accords en couleurs. Puis les chansons que ton handpan peut jouer, les paroles sous les yeux.", "Play a few notes into the mic and the app recognises your scale and shows you its chords in colour. Then come the songs your handpan can play, with the lyrics in front of you.", "Tocas unas notas frente al micro: la app reconoce tu escala y te muestra sus acordes de colores. Y luego, las canciones que puedes tocar en tu handpan, con la letra delante."],
  ["Créer mon compte gratuit", "Create my free account", "Crear mi cuenta gratuita"],
  ["Gratuit pour toujours, sans carte bancaire.", "Free forever, no card needed.", "Gratis para siempre, sin tarjeta."],
  ["74 coques connues, 541 ateliers recensés : <b>ton handpan est sans doute déjà dedans.</b>", "74 handpan models and 541 makers on record: <b>yours is probably already in there.</b>", "74 modelos de handpan conocidos, 541 talleres registrados: <b>lo más probable es que tu handpan ya esté aquí.</b>"],
  ["Un D Kurd 18 dans l’app : le handpan en haut, ses sept accords en couleurs en dessous, le premier allumé en constellation.", "A D Kurd 18 in the app: the handpan at the top, its seven chords in colour below, the first lit up as a constellation.", "Un D Kurd 18 en la app: el handpan arriba, sus siete acordes en colores debajo, el primero iluminado en forma de constelación."],
  ["Ton D Kurd dans l’app : ses 7 accords, et le premier allumé en constellation.", "Your D Kurd in the app: its 7 chords, with the first lit up as a constellation.", "Tu D Kurd en la app: sus 7 acordes, y el primero iluminado en forma de constelación."],

  // ===== Manifeste
  ["Le piano a la partition.", "The piano has sheet music.", "El piano tiene la partitura."],
  ["La guitare a la tablature.", "The guitar has tab.", "La guitarra tiene la tablatura."],
  ['Le handpan avait des chiffres et des lettres.', 'The handpan had numbers and letters.', 'El handpan tenía números y letras.'],
  ["Désormais, il a <em>sept couleurs</em>, et des accords qui se dessinent comme des constellations.", "Now it has <em>seven colours</em>, and chords that take shape like constellations.", "Ahora tiene <em>siete colores</em>, y acordes que se dibujan como constelaciones."],

  // ===== Trois gestes
  ["<p class=\"sur\">Trois gestes</p><h2>De ton instrument à ta première chanson.</h2>", "<p class=\"sur\">Three steps</p><h2>From your instrument to your first song.</h2>", "<p class=\"sur\">Tres pasos</p><h2>De tu instrumento a tu primera canción.</h2>"],
  ["Joue quelques notes au micro.", "Play a few notes into the mic.", "Toca unas notas frente al micro."],
  ["Tu ne connais pas le nom de ta gamme ? Aucune importance : l’app l’écoute, la reconnaît et retrouve ton instrument.", "Don’t know what your scale is called? It doesn’t matter. The app listens, recognises it and finds your instrument.", "¿No sabes cómo se llama tu escala? No importa: la app la escucha, la reconoce y encuentra tu instrumento."],
  ["Regarde-le s’allumer.", "Watch it light up.", "Mira cómo se ilumina."],
  ["Chaque degré prend sa couleur, chaque accord dessine sa figure : les sept accords que ton handpan sait jouer, et l’émotion de chacun.", "Each degree of the scale gets its own colour and each chord its own shape: the seven chords your handpan can play, and the emotion each one carries.", "Cada grado se ilumina con su color, cada acorde dibuja su figura: los siete acordes de tu handpan y la emoción de cada uno."],
  ['Joue ce soir.', 'Play tonight.', 'Toca esta noche.'],
  ["Les chansons du catalogue que ton handpan peut jouer sont déjà là. Tu en as une autre en tête ? Colle ses accords et ses paroles, ou dépose le fichier : l’app te la montre sur TON handpan.", "The catalogue songs your handpan can play are already there. Got another in mind? Paste its chords and lyrics, or drop in the file, and the app shows it on your own handpan.", "Las canciones del catálogo que puedes tocar en tu handpan ya están aquí. ¿Tienes otra en la cabeza? Pega sus acordes y su letra, o sube el archivo: la app te la muestra en tu propio handpan."],
  ['L’app écoute le handpan au micro et reconnaît sa gamme', 'The app listens to the handpan through the mic and recognises its scale', 'La app escucha el handpan por el micro y reconoce su escala'],
  ["Le mode Logique : chaque degré s’allume dans sa couleur", "Logic mode: each degree lights up in its colour", "El modo Lógico: cada grado se enciende en su color"],
  ["On colle les accords et les paroles de The Scientist : l’app montre la chanson sur un D Kurd 10", "The chords and lyrics of The Scientist are pasted in, and the app shows the song on a D Kurd 10", "Se pegan los acordes y la letra de The Scientist: la app muestra la canción en un D Kurd 10"],
  ['Tout ça, <span>c’est gratuit.</span>', 'All of this <span>is free.</span>', 'Todo esto <span>es gratis.</span>'],
  ["Sans carte bancaire, sans limite de temps, sur ton propre handpan.", "No card, no time limit, on your own handpan.", "Sin tarjeta, sin límite de tiempo, en tu propio handpan."],
  ["Je commence maintenant", "Start now", "Empezar ahora"],
  ["Ou je continue : voir une chanson ↓", "Or read on: see a song in the app ↓", "O sigue bajando: ver una canción ↓"],

  // ===== Une chanson
  ["The Scientist de Coldplay dans l’app, sur un D Kurd 10 : au-dessus des paroles, chaque accord dessiné sur le handpan, dans la couleur de son degré.", "The Scientist by Coldplay in the app, on a D Kurd 10: above the lyrics, each chord drawn on the handpan, in the colour of its degree.", "The Scientist de Coldplay en la app, en un D Kurd 10: encima de la letra, cada acorde dibujado sobre el handpan, en el color de su grado."],
  ["Une chanson, pour de vrai", "See it on a real song", "Una canción de verdad"],
  ["Les accords au-dessus des paroles, dessinés sur ton handpan.", "The chords above the lyrics, drawn on your handpan.", "Los acordes encima de la letra, dibujados sobre tu handpan."],
  ["Comme une grille de guitare, sauf que tu ne lis pas de noms d’accords : tu suis des formes et des couleurs. Le rouge revient, c’est la maison. Le bleu, c’est la tension qui appelle le retour.", "Like a guitar chord chart, except you’re not reading chord names: you follow shapes and colours. When red comes round again, you’re home. Blue is the tension that pulls you back.", "Como el cifrado de una canción de guitarra, solo que no lees nombres de acordes: sigues formas y colores. Cuando vuelve el rojo, estás en casa. El azul es la tensión que pide volver."],
  ["Les paroles devant toi, les accords au-dessus, sur ta gamme : tu joues, et tu chantes. Ce soir.", "The lyrics in front of you, the chords above them, all in your scale: you play and you sing. Tonight.", "La letra delante, los acordes encima, en tu escala: tocas y cantas. Esta noche."],
  ["Sur un D Kurd 18, 157 chansons du catalogue se jouent déjà telles quelles.", "On a D Kurd 18, 157 songs in the catalogue can be played just as they are.", "En un D Kurd 18, 157 canciones del catálogo ya se pueden tocar tal cual."],

  // ===== Chanter
  ['<p class="sur">Chanter</p>', '<p class="sur">Sing</p>', '<p class="sur">Cantar</p>'],
  ['Une app créée par un chanteur qui s’accompagne au handpan.', 'An app created by a singer who accompanies himself on the handpan.', 'Una app creada por un cantante que se acompaña con el handpan.'],
  ["Le handpan peut porter une voix, comme la guitare ou le piano. Commence par la tienne.", "A handpan can carry a voice, just as a guitar or a piano can. Start with your voice.", "El handpan puede sostener una voz, como la guitarra o el piano. Empieza por la tuya."],
  ['<span>Ta tessiture, mesurée</span><span>Le handpan fait pour ta voix</span><span>Une note guide et un bourdon</span>', '<span>Your vocal range, measured</span><span>The handpan made for your voice</span><span>A guide note and a drone</span>', '<span>Tu tesitura, medida</span><span>El handpan hecho para tu voz</span><span>Una nota guía y un bordón</span>'],
  ["David Lesage chante Shape of My Heart en s’accompagnant au handpan.", "David Lesage singing Shape of My Heart, accompanying himself on the handpan.", "David Lesage canta Shape of My Heart acompañándose con el handpan."],
  ['David Lesage chante <i>Shape of My Heart</i> en s’accompagnant.', 'David Lesage sings <i>Shape of My Heart</i>, accompanying himself.', 'David Lesage canta <i>Shape of My Heart</i> acompañándose.'],
  ["Le passeport vocal de David : sa voix va de F2 à C6, sa note la plus grave, sa note de confort et sa note la plus haute, et sa zone de confort, de E3 à C5, sur le clavier des couleurs.", "David’s voice passport: his range runs from F2 to C6. His lowest, comfort and highest notes, and his comfort zone from E3 to C5, are shown on the colour keyboard.", "El pasaporte vocal de David: su voz va de F2 a C6, su nota más grave, su nota de confort y su nota más aguda, y su zona de confort, de E3 a C5, en el teclado de colores."],
  ['Le passeport vocal', 'The voice passport', 'El pasaporte vocal'],
  ['Quel handpan est fait pour ta voix ?', 'Which handpan is made for your voice?', '¿Qué handpan está hecho para tu voz?'],
  ["Tu chantes quelques notes, l’app trouve les limites de ta voix, ta zone de confort, et la tonalité de handpan qui lui va.", "Sing a few notes and the app finds the limits of your voice, your comfort zone, and the handpan key that suits it.", "Cantas unas notas y la app encuentra los límites de tu voz, tu zona de confort y la tonalidad de handpan que le va bien."],
  ["Un passeport par personne : toute la famille peut avoir le sien, et un professeur en crée pour ses élèves.", "One passport per person: the whole family can have their own, and a teacher can create them for their students.", "Un pasaporte por persona: toda la familia puede tener el suyo, y quien da clases puede crearlos para sus alumnos."],
  ['Dans l’app, l’écran Chanter : « Je vois ma voix » et « Aide-moi à trouver ma voix ».', 'In the app, the Sing screen: “I see my voice” and “Help me find my voice”.', 'En la app, la pantalla Cantar: «Veo mi voz» y «Ayúdame a encontrar mi voz».'],
  ['Voir ta voix d’abord, puis la trouver.', 'See your voice first, then find it.', 'Primero ver tu voz, luego encontrarla.'],

  // ===== S'entraîner
  ['<p class="sur rv">S’entraîner</p>', '<p class="sur rv">Practise</p>', '<p class="sur rv">Practicar</p>'],
  ["Chaque jour, l’app joue avec toi.", "The app plays along with you, every day.", "Cada día, la app toca contigo."],
  ["Tout ce qu’il faut pour pratiquer est dans le compte gratuit.", "Everything you need to practise is in the free account.", "Todo lo que necesitas para practicar está en la cuenta gratuita."],
  ['<b>Ta technique</b><p>Des leçons guidées. L’app t’écoute au micro pendant que tu joues.</p>', '<b>Your technique</b><p>Guided lessons. The app listens through the mic while you play.</p>', '<b>Tu técnica</b><p>Lecciones guiadas. La app te escucha por el micro mientras tocas.</p>'],
  ["<b>Tes accords</b><p>Le tapis roulant fait défiler les enchaînements, à ton rythme.</p>", "<b>Your chords</b><p>A conveyor belt carries the chord progressions past you, at your pace.</p>", "<b>Tus acordes</b><p>Las progresiones de acordes desfilan en una cinta, a tu ritmo.</p>"],
  ["<b>Ton rythme</b><p>Un métronome, et l’app te dit si tu es en avance ou en retard.</p>", "<b>Your rhythm</b><p>A metronome, and the app tells you if you’re ahead of the beat or behind it.</p>", "<b>Tu ritmo</b><p>Un metrónomo, y la app te dice si te adelantas o te retrasas.</p>"],
  ["<b>Ton rituel</b><p>Un moment de pratique à toi, et ta progression, jour après jour.</p>", "<b>Your ritual</b><p>Your own practice time, and your progress, day by day.</p>", "<b>Tu ritual</b><p>Un momento de práctica solo para ti, y tu progreso, día a día.</p>"],
  ['Dans l’app : Mon rituel de pratique, les leçons de technique de jeu, et ta progression.', 'In the app: My practice ritual, the playing technique lessons, and your progress.', 'En la app: Mi ritual de práctica, las lecciones de técnica de interpretación y tu progreso.'],
  ['Ton rituel de pratique, les leçons de technique, ta progression.', 'Your practice ritual, the technique lessons, your progress.', 'Tu ritual de práctica, las lecciones de técnica, tu progreso.'],

  // ===== Le langage
  ['<p class="sur rv">Le langage</p>', '<p class="sur rv">The language</p>', '<p class="sur rv">El lenguaje</p>'],
  ['Lire la musique sans la déchiffrer.', 'Read music without decoding it.', 'Leer la música sin descifrarla.'],
  ["Plutôt que des noms de notes, l’app te montre la structure de la musique : des couleurs, et des formes.", "Instead of note names, the app shows you the structure of the music: colours and shapes.", "En lugar de nombres de notas, la app te muestra la estructura de la música: colores y formas."],
  ['aria-label="Le langage de l’app"', 'aria-label="The app’s language"', 'aria-label="El lenguaje de la app"'],
  ['data-o="0">Les couleurs</button>', 'data-o="0">Colours</button>', 'data-o="0">Los colores</button>'],
  ['data-o="1">Les constellations</button>', 'data-o="1">Constellations</button>', 'data-o="1">Las constelaciones</button>'],
  ['data-o="2">Émotion ou théorie</button>', 'data-o="2">Emotion or theory</button>', 'data-o="2">Emoción o teoría</button>'],
  ['data-o="3">Ton niveau</button>', 'data-o="3">Your level</button>', 'data-o="3">Tu nivel</button>'],
  ['Sept couleurs, et c’est toi qui choisis ce qu’elles disent.', 'Seven colours, and you choose what they say.', 'Siete colores, y tú eliges lo que dicen.'],
  ["Les ChromaKeys, le piano de couleurs de l’app, colorent ton handpan. La couleur dit la note elle-même, ou sa place dans la gamme.", "ChromaKeys, the app’s colour piano, paints your handpan. The colour tells you either the note itself or its place in the scale.", "Los ChromaKeys, el piano de colores de la app, colorean tu handpan. El color indica la nota en sí, o su lugar en la escala."],
  ["La couleur dit…", "The colour says…", "El color indica…"],
  ["aria-label=\"Ce que dit la couleur\"", "aria-label=\"What the colour says\"", "aria-label=\"Lo que indica el color\""],
  ['>la note<small>chakras</small>', '>the note<small>chakras</small>', '>la nota<small>chakras</small>'],
  ['>sa place dans la gamme<small>degrés</small>', '>its place in the scale<small>degrees</small>', '>su lugar en la escala<small>grados</small>'],
  ['Les notes s’écrivent…', 'Notes are written…', 'Las notas se escriben…'],
  ['aria-label="Noms des notes"', 'aria-label="Note names"', 'aria-label="Nombres de las notas"'],
  ['data-nom="fr" aria-pressed="true">Do Ré Mi</button>', 'data-nom="fr" aria-pressed="false">Do Re Mi</button>', 'data-nom="fr" aria-pressed="true">Do Re Mi</button>'],
  ['data-nom="en" aria-pressed="false">C D E</button>', 'data-nom="en" aria-pressed="true">C D E</button>', 'data-nom="en" aria-pressed="false">C D E</button>'],
  ['<div class="w" data-mode="degre" data-nom="fr">', '<div class="w" data-mode="degre" data-nom="en">', '<div class="w" data-mode="degre" data-nom="fr">'],
  ["L’accord I Équilibre en Sol majeur : ses trois notes en rouge, la couleur du premier degré.", "Chord I Balance in Sol major: its three notes in red, the colour of the first degree.", "El acorde I (Equilibrio) en Sol mayor: sus tres notas en rojo, el color del primer grado."],
  ["L’accord I Équilibre en Sol majeur (G) : ses trois notes en rouge, la couleur du premier degré.", "Chord I Balance in G major: its three notes in red, the colour of the first degree.", "El acorde I (Equilibrio) en Sol mayor (G): sus tres notas en rojo, el color del primer grado."],
  ['Le même accord, chaque note dans la couleur de son chakra : Sol bleu ciel, Si violet, Ré orange.', 'The same chord, each note in the colour of its chakra: Sol sky blue, Ti violet, Re orange.', 'El mismo acorde, cada nota en el color de su chakra: Sol azul cielo, Si violeta, Re naranja.'],
  ['Le même accord, chaque note dans la couleur de son chakra : G bleu ciel, B violet, D orange.', 'The same chord, each note in the colour of its chakra: G sky blue, B violet, D orange.', 'El mismo acorde, cada nota en el color de su chakra: G azul cielo, B violeta, D naranja.'],
  ["Le même accord, I Équilibre en Sol majeur, dans l’app.", "The same chord in the app: chord I (Balance) in G major.", "El mismo acorde, el I (Equilibrio) en Sol mayor, en la app."],
  ["Le premier degré est toujours rouge, quelle que soit la tonalité, et la forme de l’accord ne bouge pas : <b>c’est le capodastre de la guitare.</b>", "The first degree is always red, whatever the key, and the chord’s shape doesn’t move: <b>it’s like a capo on a guitar.</b>", "El primer grado siempre es rojo, sea cual sea la tonalidad, y la forma del acorde no se mueve: <b>es como la cejilla (el capo) en la guitarra.</b>"],
  ["Chaque note garde la couleur de son chakra, quelle que soit la gamme : <span data-n=\"Do\">Do</span> est toujours rouge, <span data-n=\"Sol\">Sol</span> bleu ciel. Un accord devient alors un mélange, une couleur par note.", "Each note keeps its chakra colour, whatever the scale: <span data-n=\"Do\">Do</span> is always red, <span data-n=\"Sol\">Sol</span> sky blue. A chord then becomes a mix of colours, one per note.", "Cada nota conserva el color de su chakra, sea cual sea la escala: <span data-n=\"Do\">Do</span> siempre es rojo, <span data-n=\"Sol\">Sol</span> azul cielo. Así, un acorde se vuelve una mezcla, un color por nota."],
  ["aria-label=\"Un accord dessiné de trois façons\"", "aria-label=\"One chord drawn three ways\"", "aria-label=\"Un acorde dibujado de tres maneras\""],
  ['Le langage des constellations', 'The language of constellations', 'El lenguaje de las constelaciones'],
  ['La nouvelle tablature visuelle du handpan.', 'The handpan’s new visual tablature.', 'La nueva tablatura visual del handpan.'],
  ["Au-delà des couleurs, l’app relie les notes d’un accord : elle dessine une figure lumineuse, une constellation d’accord. Trois façons de la tracer.", "On top of the colours, the app joins up the notes of a chord and draws a glowing figure, a chord constellation. There are three ways to trace it.", "Más allá de los colores, la app une las notas de un acorde y dibuja una figura luminosa, una constelación de acorde. Hay tres maneras de trazarla."],
  ['<span>Ton handpan…</span>', '<span>Your handpan…</span>', '<span>Tu handpan…</span>'],
  ["aria-label=\"Type de handpan\"", "aria-label=\"Handpan type\"", "aria-label=\"Tipo de handpan\""],
  ['aria-pressed="true">acoustique</button>', 'aria-pressed="true">acoustic</button>', 'aria-pressed="true">acústico</button>'],
  ['aria-pressed="false">numérique</button>', 'aria-pressed="false">digital</button>', 'aria-pressed="false">digital</button>'],
  ['Un accord en constellation fermée sur un handpan acoustique D Kurd 18', 'A chord as a closed constellation on an acoustic D Kurd 18 handpan', 'Un acorde en constelación cerrada en un handpan acústico D Kurd 18'],
  ["L’accord V Tension (La mineur) en constellation fermée sur un pan numérique", "Chord V Tension (A minor) as a closed constellation on a digital pan", "El acorde V Tensión (La menor) en constelación cerrada en un handpan digital"],
  ["<b>Fermée</b>La forme d’un accord, toutes ses notes reliées. Tu le reconnais d’un coup d’œil, à sa forme.", "<b>Closed</b>A chord as a shape, all its notes joined. You recognise it at a glance.", "<b>Cerrada</b>La forma de un acorde, con todas sus notas unidas. Lo reconoces de un vistazo, por su forma."],
  ['Le même accord en constellation ouverte, handpan acoustique', 'The same chord as an open constellation, acoustic handpan', 'El mismo acorde en constelación abierta, handpan acústico'],
  ["Le même accord en constellation ouverte, pan numérique", "The same chord as an open constellation, digital pan", "El mismo acorde en constelación abierta, handpan digital"],
  ["<b>Ouverte</b>Un tracé qui suit le chemin des notes, pour voir un déplacement de main.", "<b>Open</b>A path that follows the notes, so you can see how the hand travels.", "<b>Abierta</b>Un trazado que sigue el camino de las notas, para ver el movimiento de la mano."],
  ["Le même accord en tracé des mains, handpan acoustique", "The same chord with one path per hand, acoustic handpan", "El mismo acorde en trazado de manos, handpan acústico"],
  ["Le même accord en tracé des mains, pan numérique", "The same chord with one path per hand, digital pan", "El mismo acorde en trazado de manos, handpan digital"],
  ["<b>Mains</b>Le tracé pensé pour le geste. Quelle main, quelle note : tu lis directement ton jeu.", "<b>Hands</b>The path made for the movement. Which hand, which note: you can read what to play straight off it.", "<b>Manos</b>El trazado pensado para las manos. Qué mano, qué nota: lees directamente cómo tocar."],
  ["Le même accord dans les trois tracés, sur un handpan acoustique D Kurd 18.", "The same chord with all three paths, on an acoustic D Kurd 18 handpan.", "El mismo acorde en los tres trazados, en un handpan acústico D Kurd 18."],
  ["Le même accord, V Tension, dans les trois tracés, sur un Neotone.", "The same chord, V Tension, with all three paths, on a Neotone.", "El mismo acorde, V Tensión, en los tres trazados, en un Neotone."],
  ["Le mode Logique en langage émotionnel : Joyeux, Triste profond, Triste intense, Triste lumineux, Voyage des sensations.", "Logic mode in emotional language: Happy, Deep sadness, Intense sadness, Bright sadness, Journey of sensations.", "El modo Lógico en lenguaje emocional: Alegre, Tristeza profunda, Tristeza intensa, Tristeza luminosa, Viaje de las sensaciones."],
  ["<figcaption>Ressenti émotionnel</figcaption>", "<figcaption>Feeling</figcaption>", "<figcaption>Sensación emocional</figcaption>"],
  ["Le même panneau en théorie musicale : Majeur, Mineur naturel, harmonique, mélodique, Enchaînement des degrés.", "The same panel in music theory: Major, Natural minor, harmonic, melodic, Degree progression.", "El mismo panel en teoría musical: Mayor, Menor natural, armónica, melódica, Secuencia de grados."],
  ['<figcaption>Théorie musicale</figcaption>', '<figcaption>Music theory</figcaption>', '<figcaption>Teoría musical</figcaption>'],
  ["<p class=\"sur rv\">Le mode Logique</p>", "<p class=\"sur rv\">Logic mode</p>", "<p class=\"sur rv\">El modo Lógico</p>"],
  ['Deux langages pour la même musique.', 'Two languages for the same music.', 'Dos lenguajes para la misma música.'],
  ["En ressenti, une gamme est joyeuse ou triste, et sa tristesse peut être profonde, orientale ou jazz. Tu composes un voyage de sensations.", "By feel, a scale is happy or sad, and its sadness can be deep, Eastern or jazzy. You compose a journey of sensations.", "Si partes de la sensación, una escala es alegre o triste, y su tristeza puede ser profunda, oriental o de jazz. Compones un viaje de sensaciones."],
  ["En théorie, les mêmes réglages reprennent leurs noms : majeur, mineur naturel, harmonique, mélodique, enchaînement des degrés.", "In music theory, the same settings go by their proper names: major, natural minor, harmonic, melodic, degree progression.", "Si partes de la teoría, los mismos ajustes recuperan sus nombres: mayor, menor natural, armónica, melódica, secuencia de grados."],
  ["Tu entres par l’émotion. Le jour où tu veux le solfège, il est là, au même endroit.", "You start with emotion. When you want music theory, it’s there, in the same place.", "Entras por la emoción. El día que quieras el solfeo, está ahí, en el mismo lugar."],
  ["Tu commences sans solfège. Les noms viennent quand tu les demandes.", "You start with no theory. The names come when you ask for them.", "Empiezas sin solfeo. Los nombres llegan cuando los pides."],
  ['aria-label="Le même accord affiché aux trois niveaux"', 'aria-label="The same chord shown at all three levels"', 'aria-label="El mismo acorde mostrado en los tres niveles"'],
  ["<b>Découverte</b><p>Les couleurs et les numéros, sans solfège.</p>", "<b>Discovery</b><p>Colours and numbers, no theory.</p>", "<b>Descubrimiento</b><p>Los colores y los números, sin solfeo.</p>"],
  ["<b>Apprenti</b><p>Les noms des notes et des accords.</p>", "<b>Apprentice</b><p>The names of notes and chords.</p>", "<b>Aprendiz</b><p>Los nombres de las notas y de los acordes.</p>"],
  ["<b>Musicien</b><p>Tout débloqué : les 7 accords, les enrichissements +7, +9…</p>", "<b>Musician</b><p>Everything unlocked: all 7 chords, the 7th and 9th extensions…</p>", "<b>Músico</b><p>Todo desbloqueado: los 7 acordes, las extensiones +7, +9…</p>"],

  // ===== Témoignage de Marina Fortuna : traduit fidèlement, et signalé comme traduit
  ['Ce qu’en dit une élève', 'What a student says', 'Lo que dice una alumna'],
  ["Les outils interactifs permettent d’afficher son propre handpan à l’écran, de recevoir un retour immédiat sur les notes jouées […]</blockquote>", "The interactive tools let you display your own handpan on screen, get immediate feedback on the notes you play […]</blockquote>", "Las herramientas interactivas permiten mostrar el propio handpan en pantalla, recibir una respuesta inmediata sobre las notas tocadas […]</blockquote>"],
  ["« Ayant déjà utilisé une autre application, je peux dire que celle-ci est de loin ma préférée tant elle est complète ! »", "“Having already used another app, I can say that this one is by far my favourite, because it is so complete!”", "«Como ya he usado otra aplicación, puedo decir que esta es, con diferencia, mi preferida, ¡de lo completa que es!»"],
  ['Lire tout son message', 'Read her full message', 'Leer todo su mensaje'],
  ["« J’ai fait mes premiers pas au handpan avec David et je poursuis aujourd’hui mon apprentissage avec Constellations. Ayant déjà utilisé une autre application, je peux dire que celle-ci est de loin ma préférée tant elle est complète !", "“I took my first steps on the handpan with David and today I’m continuing my learning with Constellations. Having already used another app, I can say that this one is by far my favourite, because it is so complete!", "«Di mis primeros pasos con el handpan con David y hoy sigo aprendiendo con Constellations. Como ya he usado otra aplicación, puedo decir que esta es, con diferencia, mi preferida, ¡de lo completa que es!"],
  ["<p>Plus je l’utilise, plus je réalise à quel point elle porte bien son nom. Elle nous ouvre véritablement le champ de tous les possibles !</p>", "<p>The more I use it, the more I realise how well it lives up to its name. It truly opens up a world of possibilities!</p>", "<p>Cuanto más la uso, más me doy cuenta de lo mucho que hace honor a su nombre. ¡De verdad nos abre un sinfín de posibilidades!</p>"],
  ["Ce que j’apprécie particulièrement, c’est qu’elle va bien au-delà des cours en ligne. Les outils interactifs permettent d’afficher son propre handpan à l’écran, de recevoir un retour immédiat sur les notes jouées, de choisir un tempo ou encore de jouer avec un accompagnement à la batterie. On explore également le rythme, le chant, l’expression des émotions et une multitude de gammes. De quoi apprendre, expérimenter et progresser en autonomie !", "What I particularly appreciate is that it goes well beyond online lessons. The interactive tools let you display your own handpan on screen, get immediate feedback on the notes you play, choose a tempo or play along with a drum accompaniment. You also explore rhythm, singing, the expression of emotions and a multitude of scales. Everything you need to learn, experiment and progress on your own!", "Lo que más valoro es que va mucho más allá de las clases en línea. Las herramientas interactivas permiten mostrar el propio handpan en pantalla, recibir una respuesta inmediata sobre las notas tocadas, elegir un tempo o tocar con un acompañamiento de batería. También se exploran el ritmo, el canto, la expresión de las emociones y una multitud de escalas. ¡Lo necesario para aprender, experimentar y progresar con autonomía!"],
  ["La plateforme évolue aussi régulièrement grâce aux idées et aux besoins de ses utilisateurs, et chaque amélioration profite à tous.", "The platform also evolves regularly thanks to the ideas and needs of its users, and every improvement benefits everyone.", "La plataforma también evoluciona con regularidad gracias a las ideas y las necesidades de quienes la usan, y cada mejora beneficia a todos."],
  ["Et puis, il y a David ! Un professeur passionné, bienveillant et à l’écoute, qui sait adapter son enseignement à chacun. Il m’a notamment proposé différentes approches pour travailler mes difficultés avec le rythme et m’a accompagnée dans l’utilisation de mon handpan électronique avec l’application.", "And then there’s David! A passionate, kind teacher who listens, and who knows how to adapt his teaching to each person. In particular, he offered me different approaches to work on my difficulties with rhythm and supported me in using my electronic handpan with the app.", "¡Y además está David! Un profesor apasionado, amable y que sabe escuchar, capaz de adaptar su enseñanza a cada persona. En particular, me propuso distintos enfoques para trabajar mis dificultades con el ritmo y me acompañó en el uso de mi handpan electrónico con la aplicación."],
  ["Une plateforme que je recommande sans hésitation, aussi bien aux débutants qu’aux musiciens confirmés et professionnels souhaitant enrichir leur pratique et explorer de nouvelles possibilités musicales ! »", "A platform I recommend without hesitation, both to beginners and to experienced and professional musicians who want to enrich their practice and explore new musical possibilities!”", "Una plataforma que recomiendo sin dudarlo, ¡tanto a principiantes como a músicos con experiencia y profesionales que quieran enriquecer su práctica y explorar nuevas posibilidades musicales!»"],
  ['<b>Marina Fortuna</b> · élève de David, handpan électronique', '<b>Marina Fortuna</b> · David’s student, electronic handpan · translated from French', '<b>Marina Fortuna</b> · alumna de David, handpan electrónico · traducido del francés'],

  // ===== Pourquoi pas autre chose
  ["Pourquoi pas autre chose ?", "Why this, and not something else?", "¿Por qué esto y no otra cosa?"],
  ["Une étoile seule, on la trouve ailleurs.<br>La constellation, non.", "You can find a single star elsewhere.<br>Not the constellation.", "Una estrella sola la encuentras en cualquier parte.<br>La constelación, no."],
  ["<b>Une vidéo</b><p>te montre quelqu’un jouer sur son handpan. <em>L’app part du tien.</em></p>", "<b>A video</b><p>shows you someone playing their handpan. <em>The app starts with yours.</em></p>", "<b>Un vídeo</b><p>te muestra a alguien tocando su handpan. <em>La app parte del tuyo.</em></p>"],
  ["<b>Une tablature</b><p>est écrite pour une gamme. <em>L’app te montre ce que la tienne peut jouer.</em></p>", "<b>A tab</b><p>is written for one scale. <em>The app shows you what yours can play.</em></p>", "<b>Una tablatura</b><p>está escrita para una escala. <em>La app te muestra lo que puedes tocar en la tuya.</em></p>"],
  ["<b>Un professeur</b><p>te guide une heure par semaine. <em>L’app t’accompagne les autres jours, sur ton instrument.</em></p>", "<b>A teacher</b><p>guides you for an hour a week. <em>The app is with you the other days, on your instrument.</em></p>", "<b>Un profesor</b><p>te guía una hora a la semana. <em>La app te acompaña los demás días, en tu instrumento.</em></p>"],
  ["<b>Une autre app</b><p>accorde, bat la mesure ou fait chanter juste. <em>Ici, tout est relié autour d’un seul instrument, le tien.</em></p>", "<b>Another app</b><p>tunes, keeps time or helps you sing in tune. <em>Here, everything connects around one instrument, yours.</em></p>", "<b>Otra app</b><p>sirve de afinador, marca el compás o te ayuda a cantar afinado. <em>Aquí todo gira en torno a un solo instrumento, el tuyo.</em></p>"],

  // ===== Le gratuit (liste commune à la section et à la fenêtre)
  ['Gratuit, pour toujours', 'Free, forever', 'Gratis, para siempre'],
  ["Tout ça, sans carte bancaire.", "All of this, no card needed.", "Todo esto, sin tarjeta."],
  ['<li>Reconnaître ta gamme au micro</li>', '<li>Recognise your scale through the mic</li>', '<li>Reconocer tu escala por el micro</li>'],
  ["<li>Tous les accords de ton instrument, en couleurs et en constellations</li>", "<li>All your instrument’s chords, in colours and constellations</li>", "<li>Todos los acordes de tu instrumento, por colores y en constelaciones</li>"],
  ["<li>Les chansons que ton handpan peut jouer ce soir</li>", "<li>The songs your handpan can play tonight</li>", "<li>Las canciones que puedes tocar esta noche en tu handpan</li>"],
  ["<li>Coller les accords et les paroles d’une chanson : l’app te la montre sur ton handpan</li>", "<li>Paste a song’s chords and lyrics, and the app shows it on your handpan</li>", "<li>Pegar los acordes y la letra de una canción: la app te la muestra en tu handpan</li>"],
  ['<li>Trouver ta voix : ta tessiture, une note guide, un bourdon</li>', '<li>Find your voice: your vocal range, a guide note, a drone</li>', '<li>Encontrar tu voz: tu tesitura, una nota guía, un bordón</li>'],
  ['<li>T’entraîner : technique, accords, rythme, ton rituel</li>', '<li>Practise: technique, chords, rhythm, your ritual</li>', '<li>Practicar: técnica, acordes, ritmo, tu ritual</li>'],
  ["<li>Tout ce que tu crées est sauvegardé</li>", "<li>Everything you create is saved</li>", "<li>Todo lo que creas queda guardado</li>"],
  ["<li>Savoir quel handpan choisir ensuite</li>", "<li>Find out which handpan to choose next</li>", "<li>Saber qué handpan elegir después</li>"],
  ["<li>Brancher ton Neotone en MIDI par USB</li>", "<li>Connect your Neotone by USB MIDI</li>", "<li>Conectar tu Neotone por USB (MIDI)</li>"],

  // ===== Le mouvement
  ['<p class="sur rv">Le mouvement</p>', '<p class="sur rv">The movement</p>', '<p class="sur rv">El movimiento</p>'],
  ["Tu ne télécharges pas une app.<br>Tu rejoins une constellation.", "You don’t just get an app.<br>You join a constellation.", "No te descargas una app.<br>Te unes a una constelación."],
  ["ateliers de fabrication recensés sur la carte", "makers listed on the map", "talleres de fabricación registrados en el mapa"],
  ["langues, et un lexique que les joueurs écrivent ensemble", "languages, and a glossary the players write together", "idiomas, y un léxico escrito por quienes tocan"],
  ["étoile à ton nom, sur la carte des joueurs", "star in your name, on the players’ map", "estrella con tu nombre, en el mapa de intérpretes"],
  ["<b>En évolution permanente</b><p>De nouvelles fonctions, gammes et modes arrivent régulièrement, et ils sont inclus. L’app d’aujourd’hui sera plus riche demain.</p>", "<b>Always evolving</b><p>New features, scales and modes arrive regularly, and they’re included. The app you see today will do more tomorrow.</p>", "<b>En evolución constante</b><p>Llegan con regularidad nuevas funciones, escalas y modos, y están incluidos. La app de hoy será más rica mañana.</p>"],
  ["<b>Ton retour façonne l’app</b><p>Depuis l’application, tu envoies tes idées en un clic. Chaque message est lu et oriente la suite.</p>", "<b>Your feedback shapes the app</b><p>From inside the app, you send your ideas in one click. Every message is read and helps decide what comes next.</p>", "<b>Tu opinión da forma a la app</b><p>Desde la app, envías tus ideas con un clic. Cada mensaje se lee y orienta lo que viene.</p>"],
  ["<b>Une communauté, pas un catalogue</b><p>Ensemble, on construit l’outil qu’on aurait tous rêvé d’avoir, enfant.</p>", "<b>A community, not a catalogue</b><p>Together, we’re building the tool we all wish we’d had as children.</p>", "<b>Una comunidad, no un catálogo</b><p>Juntos construimos la herramienta con la que todos habríamos soñado de niños.</p>"],

  // ===== David
  ['alt="Portrait de David Lesage."', 'alt="Portrait of David Lesage."', 'alt="Retrato de David Lesage."'],
  ['Pourquoi cette app', 'Why this app', 'Por qué esta app'],
  ["« L’outil que j’aurais rêvé qu’on m’enseigne, enfant »", "“The tool I wish I’d been given as a child”", "«La herramienta con la que de niño habría soñado»"],
  ["J’ai commencé la batterie à 4 ans, et le solfège m’a coupé de mon envie de jouer : j’ai appris à l’oreille. À 12 ans, au piano, j’ai compris que ma mémoire n’était pas faite pour décoder des notes abstraites : elle est visuo-motrice et spatiale. Avec le handpan, j’ai retrouvé le même mur : des vaisseaux spatiaux sans notice de pilotage. Alors j’ai dessiné. De ces dessins est né l’outil que j’aurais rêvé qu’on me donne : la théorie musicale rendue visible, dans des langages qu’un enfant peut comprendre.", "I started the drums at 4, and music theory put me off playing, so I learned by ear. At 12, at the piano, I realised my memory wasn’t built to decode abstract notes: it’s visual-motor and spatial. With the handpan I hit the same wall: spaceships with no pilot’s manual. So I drew. From those drawings came the tool I wish I’d been given: music theory made visible, in languages a child can understand.", "Empecé con la batería a los 4 años, y el solfeo me quitó las ganas de tocar, así que aprendí de oído. A los 12 años, al piano, entendí que mi memoria no estaba hecha para descifrar notas abstractas: es visomotora y espacial. Con el handpan me encontré con el mismo muro: naves espaciales sin manual de pilotaje. Entonces dibujé. De esos dibujos nació la herramienta con la que habría soñado: la teoría musical hecha visible, en lenguajes que un niño puede entender."],

  // ===== FAQ
  ['<p class="sur rv">Questions</p>', '<p class="sur rv">Questions</p>', '<p class="sur rv">Preguntas</p>'],
  ["Ce qu’on me demande.", "What people ask me.", "Lo que me suelen preguntar."],
  ["Faut-il un pan numérique ?", "Do I need a digital pan?", "¿Hace falta un handpan digital?"],
  ["Non. L’app est pensée d’abord pour ton handpan acoustique, quel qu’il soit. Si tu as un pan numérique, tu peux aussi le relier.", "No. The app is designed first for your acoustic handpan, whatever it is. If you have a digital pan, you can connect that too.", "No. La app está pensada ante todo para tu handpan acústico, sea cual sea. Si tienes un handpan digital, también puedes conectarlo."],
  ["Qu’est-ce qui est vraiment gratuit ?", "What’s actually free?", "¿Qué es gratis de verdad?"],
  ['Tout ce qui sert à connaître ton instrument et à jouer : ta gamme, tes accords, le répertoire, le chant pour trouver ta voix, la technique de jeu, la sauvegarde de ce que tu crées.', 'Everything you need to get to know your instrument and play: your scale, your chords, the repertoire, singing to find your voice, playing technique, and saving what you create.', 'Todo lo que sirve para conocer tu instrumento y tocar: tu escala, tus acordes, el repertorio, el canto para encontrar tu voz, la técnica de interpretación y guardar lo que creas.'],
  ['Et si je ne connais pas ma gamme ?', 'What if I don’t know my scale?', '¿Y si no conozco mi escala?'],
  ["Tu la fais écouter au micro, l’app la retrouve.", "Play it into the mic and the app finds it.", "Toca unas notas frente al micro: la app la encuentra."],
  ["Je n’ai jamais fait de solfège. C’est pour moi ?", "I’ve never learned to read music. Is it for me?", "Nunca he estudiado solfeo. ¿Es para mí?"],
  ['Oui. Tu commences par les couleurs et les émotions. Les noms des notes et la théorie viennent quand tu les demandes.', 'Yes. You start with colours and emotions. Note names and theory come when you ask for them.', 'Sí. Empiezas por los colores y las emociones. Los nombres de las notas y la teoría llegan cuando los pides.'],
  ["On va me demander ma carte bancaire ?", "Will I be asked for my card details?", "¿Me van a pedir la tarjeta?"],
  ["Non. Le compte gratuit ne demande aucune carte, et il reste gratuit sans limite de temps. Ta carte ne te sera demandée que le jour où tu choisis une formule payante.", "No. The free account doesn’t ask for a card, and it stays free with no time limit. You’ll only be asked for your card details when you choose a paid plan.", "No. La cuenta gratuita no pide ninguna tarjeta y sigue siendo gratis sin límite de tiempo. Solo te pediremos la tarjeta el día que elijas un plan de pago."],
  ['Comment je commence ?', 'How do I start?', '¿Cómo empiezo?'],
  ["Tu t’inscris, tu poses ton handpan devant toi et tu le fais écouter à l’app. Elle s’occupe du reste.", "Sign up, put your handpan in front of you and let the app listen to it. It takes care of the rest.", "Te registras, pones tu handpan delante y dejas que la app lo escuche. Del resto se encarga ella."],

  // ===== Fin et barre d'appel
  ["Ton handpan t’attend.<br>Il a des choses à te montrer.", "Your handpan is waiting.<br>It has things to show you.", "Tu handpan te espera.<br>Tiene cosas que enseñarte."],
  ["<span>Gratuit, sans carte bancaire</span>", "<span>Free, no card needed</span>", "<span>Gratis, sin tarjeta</span>"],
  ["tabindex=\"-1\">Créer mon compte</a>", "tabindex=\"-1\">Create my account</a>", "tabindex=\"-1\">Crear mi cuenta</a>"],

  // ===== Fenêtre des formules
  ["Choisis ta formule", "Choose your plan", "Elige tu plan"],
  ['aria-label="Fermer"', 'aria-label="Close"', 'aria-label="Cerrar"'],
  [">Annuel <span class=\"m-pastille\">jusqu’à −28 %</span>", ">Annual <span class=\"m-pastille\">save up to 28%</span>", ">Anual <span class=\"m-pastille\">ahorra hasta un 28 %</span>"],
  ['data-m="m">Mensuel</button>', 'data-m="m">Monthly</button>', 'data-m="m">Mensual</button>'],
  ['<h3>Gratuit</h3><div class="prix">0 €</div><div class="sous">pour toujours, sans carte</div>', '<h3>Free</h3><div class="prix">€0</div><div class="sous">forever, no card</div>', '<h3>Gratis</h3><div class="prix">0 €</div><div class="sous">para siempre, sin tarjeta</div>'],
  ['Ce que ton handpan sait faire.', 'What your handpan can do.', 'Lo que tu handpan sabe hacer.'],
  ["Choisir ce palier", "Choose this plan", "Elegir este plan"],
  ["<h3>Essentiel</h3><div class=\"prix\" data-mens=\"3,49 €\" data-ann=\"29,99 €\">3,49 € <small>/ mois</small></div><div class=\"sous\" data-mens=\"premier mois offert\" data-ann=\"soit 2,50 € par mois, 11,89 € économisés\">premier mois offert</div>", "<h3>Essential</h3><div class=\"prix\" data-mens=\"€3.49\" data-ann=\"€29.99\">€3.49 <small>/ month</small></div><div class=\"sous\" data-mens=\"first month free\" data-ann=\"that’s €2.50 a month, saving €11.89\">first month free</div>", "<h3>Esencial</h3><div class=\"prix\" data-mens=\"3,49 €\" data-ann=\"29,99 €\">3,49 € <small>/ mes</small></div><div class=\"sous\" data-mens=\"primer mes gratis\" data-ann=\"es decir, 2,50 € al mes, 11,89 € de ahorro\">primer mes gratis</div>"],
  ["Ce que tu joues vraiment.", "What you actually play.", "Lo que tú tocas de verdad."],
  ['<li class="her">Tout le Gratuit</li>', '<li class="her">Everything in Free</li>', '<li class="her">Todo lo de Gratis</li>'],
  ["<li>Transposer tes morceaux</li>", "<li>Transpose your songs</li>", "<li>Transponer tus canciones</li>"],
  ['<li>Jouer hors ligne</li>', '<li>Play offline</li>', '<li>Tocar sin conexión</li>'],
  ["<li>Faire défiler la partition au tempo</li>", "<li>Scroll the score in time with the music</li>", "<li>Desplazar la partitura al tempo</li>"],
  ["<li>Boucler un passage pour le travailler</li>", "<li>Loop a passage to practise it</li>", "<li>Repetir un pasaje en bucle para trabajarlo</li>"],
  ["<li>Exporter tes partitions en PDF et en image</li>", "<li>Export your scores as PDFs or images</li>", "<li>Exportar tus partituras en PDF y en imagen</li>"],
  ['<li>Écouter ta gamme dans une autre tonalité</li>', '<li>Hear your scale in another key</li>', '<li>Escuchar tu escala en otra tonalidad</li>'],
  ["<li>Voir et écouter ta gamme ailleurs</li>", "<li>See and hear your scale transposed</li>", "<li>Ver y escuchar tu escala transpuesta</li>"],
  ['<li>Écrire tes mélodies</li>', '<li>Write your melodies</li>', '<li>Escribir tus melodías</li>'],
  ['<li>Jouer avec un batteur</li>', '<li>Play with a drummer</li>', '<li>Tocar con un baterista</li>'],
  ["<li>T’entraîner avec la pluie de notes</li>", "<li>Practise with Note rain</li>", "<li>Practicar con la Lluvia de notas</li>"],
  ["<li>Imprimer ton jeu de cartes d’accords</li>", "<li>Print your chord card deck</li>", "<li>Imprimir tu baraja de cartas de acordes</li>"],
  ["<li>Jouer aux cartes d’accords</li>", "<li>Play the chord card game</li>", "<li>Jugar a las cartas de acordes</li>"],
  ["Ou au mois : 3,49 €, premier mois offert", "Or by the month: €3.49, first month free", "O al mes: 3,49 €, primer mes gratis"],
  ["Ou à l’année : 29,99 € (−28 %), en une fois, sans mois d’essai", "Or by the year: €29.99 (save 28%), paid in one go, no free month", "O al año: 29,99 € (ahorra un 28 %), en un solo pago anual, sin mes gratis"],
  ["<div class=\"prix\" data-mens=\"9,99 €\" data-ann=\"89 €\">9,99 € <small>/ mois</small></div><div class=\"sous\" data-mens=\"premier mois offert\" data-ann=\"soit 7,42 € par mois, 30,88 € économisés\">premier mois offert</div>", "<div class=\"prix\" data-mens=\"€9.99\" data-ann=\"€89\">€9.99 <small>/ month</small></div><div class=\"sous\" data-mens=\"first month free\" data-ann=\"that’s €7.42 a month, saving €30.88\">first month free</div>", "<div class=\"prix\" data-mens=\"9,99 €\" data-ann=\"89 €\">9,99 € <small>/ mes</small></div><div class=\"sous\" data-mens=\"primer mes gratis\" data-ann=\"es decir, 7,42 € al mes, 30,88 € de ahorro\">primer mes gratis</div>"],
  ["Un studio autour de tes instruments.", "A studio built around your instruments.", "Un estudio en torno a tus instrumentos."],
  ['<li class="her">Tout Essentiel</li>', '<li class="her">Everything in Essential</li>', '<li class="her">Todo lo de Esencial</li>'],
  ['<li>Travailler ta justesse avec les exercices de chant</li>', '<li>Work on your pitch with the singing exercises</li>', '<li>Trabajar tu afinación con los ejercicios de canto</li>'],
  ["<li>T’entendre dans le casque</li>", "<li>Hear yourself in your headphones</li>", "<li>Escucharte a través de los auriculares</li>"],
  ['<li>Jouer avec deux handpans</li>', '<li>Play with two handpans</li>', '<li>Tocar con dos handpans</li>'],
  ["<li>Jouer sur plusieurs handpans autour de toi</li>", "<li>Play on several handpans around you</li>", "<li>Tocar varios handpans a tu alrededor</li>"],
  ["<li>Jouer la Logique sur ton handpan électronique</li>", "<li>Play Logic mode on your digital pan</li>", "<li>Tocar en modo Lógico en tu handpan digital</li>"],
  ["<li>Neotone Connexion : la synchro des gammes, la gestion des enregistrements et Neotone Drums</li>", "<li>Neotone Connection: scale sync, recording management and Neotone Drums</li>", "<li>Conexión Neotone: la sincronización de escalas, la gestión de grabaciones y Neotone Drums</li>"],
  ['<li>Monter sur scène avec tes sets</li>', '<li>Go on stage with your sets</li>', '<li>Subir al escenario con tus sets</li>'],
  ['<li>Révéler les accords de ton duo</li>', '<li>Reveal the chords of your duo</li>', '<li>Revelar los acordes de tu dúo</li>'],
  ["<li>Exporter en MIDI et en MusicXML</li>", "<li>Export to MIDI and MusicXML</li>", "<li>Exportar en MIDI y en MusicXML</li>"],
  ['<li>Garder tes compositions privées</li>', '<li>Keep your compositions private</li>', '<li>Mantener privadas tus composiciones</li>'],
  ['<li>Utiliser l’app sur plusieurs appareils en même temps</li>', '<li>Use the app on several devices at once</li>', '<li>Usar la app en varios dispositivos a la vez</li>'],
  ["Ou au mois : 9,99 €, premier mois offert", "Or by the month: €9.99, first month free", "O al mes: 9,99 €, primer mes gratis"],
  ["Ou à l’année : 89 € (−26 %), en une fois, sans mois d’essai", "Or by the year: €89 (save 26%), paid in one go, no free month", "O al año: 89 € (ahorra un 26 %), en un solo pago anual, sin mes gratis"],
  ['<h3>Transmettre</h3><div class="prix">À venir</div><div class="sous">pour les professeurs</div>', '<h3>Teach</h3><div class="prix">Coming soon</div><div class="sous">for teachers</div>', '<h3>Enseñar</h3><div class="prix">Próximamente</div><div class="sous">para profesores</div>'],
  ["Tes élèves, tes cours, leurs devoirs.", "Your students, your lessons, their homework.", "Tus alumnos, tus clases, sus tareas."],
  ["<li>Suivre tes élèves</li>", "<li>Keep track of your students</li>", "<li>Hacer el seguimiento de tus alumnos</li>"],
  ["<li>Donner des cours individuels et collectifs</li>", "<li>Give one-to-one and group lessons</li>", "<li>Dar clases individuales y en grupo</li>"],
  ["<li>Tenir l’agenda de tes cours</li>", "<li>Manage your lesson calendar</li>", "<li>Llevar la agenda de tus clases</li>"],
  ['<li>Enregistrer tes cours</li>', '<li>Record your lessons</li>', '<li>Grabar tus clases</li>'],
  ["<li>Donner des devoirs à tes élèves</li>", "<li>Set homework for your students</li>", "<li>Asignar tareas a tus alumnos</li>"],
  ["<li>Créer et partager tes cours</li>", "<li>Create and share your lessons</li>", "<li>Crear y compartir tus cursos</li>"],
  ["<li>Publier ta fiche de professeur</li>", "<li>Publish your teacher profile</li>", "<li>Publicar tu perfil de profesor</li>"],
  ['Être prévenu·e', 'Notify me', 'Avísame'],
  ["Premier mois offert sur les formules mensuelles. Gratuit : aucune carte. Les abonnements, mensuels comme annuels, se renouvellent par tacite reconduction. Tu changes de formule quand tu veux, dans l’app.", "First month free on monthly plans. Free plan: no card. Subscriptions, monthly and yearly, renew automatically. Change plan whenever you like, in the app.", "Primer mes gratis en los planes mensuales. Gratis: sin tarjeta. Las suscripciones, tanto mensuales como anuales, se renuevan automáticamente. Cambias de plan cuando quieras, en la app."],
  ["← Changer de formule", "← Change plan", "← Cambiar de plan"],
  ['<label>Prénom<input', '<label>First name<input', '<label>Nombre<input'],
  ["<label class=\"m-nom\">Nom<input", "<label class=\"m-nom\">Surname<input", "<label class=\"m-nom\">Apellidos<input"],
  ['<label>E-mail<input', '<label>Email<input', '<label>Correo electrónico<input'],
  ['<label class="m-mdp">Mot de passe<input', '<label class="m-mdp">Password<input', '<label class="m-mdp">Contraseña<input'],
  ["J’accepte les <a href=\"/conditions-generales/\" target=\"_blank\" rel=\"noopener\">Conditions Générales d’Utilisation</a> et la <a href=\"/politique-de-confidentialite/\" target=\"_blank\" rel=\"noopener\">politique de confidentialité</a>.", "I accept the <a href=\"/en/conditions-generales/\" target=\"_blank\" rel=\"noopener\">terms and conditions</a> and the <a href=\"/en/politique-de-confidentialite/\" target=\"_blank\" rel=\"noopener\">privacy policy</a>.", "Acepto las <a href=\"/es/conditions-generales/\" target=\"_blank\" rel=\"noopener\">Condiciones Generales de Uso</a> y la <a href=\"/es/politique-de-confidentialite/\" target=\"_blank\" rel=\"noopener\">política de privacidad</a>."],
  ['Déjà un compte ? <a class="btn-connexion"', 'Already have an account? <a class="btn-connexion"', '¿Ya tienes cuenta? <a class="btn-connexion"'],
  ["<strong>Bienvenue !</strong>", "<strong>Welcome!</strong>", "<strong>¡Te damos la bienvenida!</strong>"],

  // ===== Scripts
  [`#marina .grande:before{content:"« "}#marina .grande:after{content:" »"}`, `#marina .grande:before{content:"“"}#marina .grande:after{content:"”"}`, `#marina .grande:before{content:"«"}#marina .grande:after{content:"»"}`],
  ["['I','Équilibre','#EF4444'],['II','Élan','#F97316'],['III','Aventure','#EAB308'],['IV','Détente','#22C55E'],['V','Tension','#38BDF8'],['VI','Nostalgie','#5050FF'],['VII','Mystère','#EB00FF']", "['I','Balance','#EF4444'],['II','Momentum','#F97316'],['III','Adventure','#EAB308'],['IV','Relaxation','#22C55E'],['V','Tension','#38BDF8'],['VI','Nostalgia','#5050FF'],['VII','Mystery','#EB00FF']", "['I','Equilibrio','#EF4444'],['II','Impulso','#F97316'],['III','Aventura','#EAB308'],['IV','Relajación','#22C55E'],['V','Tensión','#38BDF8'],['VI','Nostalgia','#5050FF'],['VII','Misterio','#EB00FF']"],
  ["['Ré','#EA580C'],['Ré#','#F97316']", "['Re','#EA580C'],['Re#','#F97316']", "['Re','#EA580C'],['Re#','#F97316']"],
  ["['Si','#EB00FF']", "['Ti','#EB00FF']", "['Si','#EB00FF']"],
  ["'Ré':'D','Ré#':'D#'", "'Re':'D','Re#':'D#'", "'Re':'D','Re#':'D#'"],
  ["'La#':'A#','Si':'B'}", "'La#':'A#','Ti':'B'}", "'La#':'A#','Si':'B'}"],
  ["<small>/ ${a?'an':'mois'}</small>", "<small>/ ${a?'year':'month'}</small>", "<small>/ ${a?'año':'mes'}</small>"],
  ["NOM={g:'Gratuit',e:'Essentiel',s:'Studio',t:'Transmettre'},PRIX={e:['3,49 € par mois','29,99 € par an'],s:['9,99 € par mois','89 € par an']}", "NOM={g:'Free',e:'Essential',s:'Studio',t:'Teach'},PRIX={e:['€3.49 a month','€29.99 a year'],s:['€9.99 a month','€89 a year']}", "NOM={g:'Gratis',e:'Esencial',s:'Studio',t:'Enseñar'},PRIX={e:['3,49 € al mes','29,99 € al año'],s:['9,99 € al mes','89 € al año']}"],
  ["recap.innerHTML='Transmettre<small>La formule des professeurs arrive bientôt. On te prévient à l’ouverture.</small>'", "recap.innerHTML='Teach<small>The plan for teachers is coming soon. We’ll let you know when it opens.</small>'", "recap.innerHTML='Enseñar<small>El plan para profesores llega pronto. Te avisamos cuando abra.</small>'"],
  ["envoi.textContent='Me prévenir'", "envoi.textContent='Notify me'", "envoi.textContent='Avísame'"],
  ["recap.innerHTML='Gratuit<small>Pour toujours, sans carte bancaire.</small>'", "recap.innerHTML='Free<small>Forever, no card needed.</small>'", "recap.innerHTML='Gratis<small>Para siempre, sin tarjeta.</small>'"],
  ["aval.textContent='Ton instrument, tu le déclares ensuite, dans l’app.'", "aval.textContent='You can add your instrument afterwards, in the app.'", "aval.textContent='Tu instrumento lo indicas después, en la app.'"],
  ["envoi.textContent='Créer mon compte'", "envoi.textContent='Create my account'", "envoi.textContent='Crear mi cuenta'"],
  ["${an?'':', premier mois offert'}", "${an?'':', first month free'}", "${an?'':', primer mes gratis'}"],
  ["an?'Ta carte est demandée à l’étape suivante.':'Ta carte est enregistrée à l’étape suivante. Rien n’est prélevé pendant le mois offert ; tu arrêtes quand tu veux.'", "an?'We’ll ask for your card details at the next step.':'You add your card details at the next step. Nothing is charged during the free month, and you can cancel whenever you like.'", "an?'Tu tarjeta se pide en el paso siguiente.':'Tu tarjeta se registra en el paso siguiente. No se cobra nada durante el mes gratis y puedes cancelar cuando quieras.'"],
  ["envoi.textContent='Continuer vers le paiement'", "envoi.textContent='Continue to payment'", "envoi.textContent='Continuar al pago'"],
  ["const lien='<a href=\"'+APP+'\">Se connecter</a>'", "const lien='<a href=\"'+APP+'\">Sign in</a>'", "const lien='<a href=\"'+APP+'\">Iniciar sesión</a>'"],
  ["'Un compte existe déjà avec cet email. '", "'An account already exists with this email. '", "'Ya existe una cuenta con este correo. '"],
  ["'Mot de passe trop court (6 caractères minimum).'", "'Password too short (6 characters minimum).'", "'Contraseña demasiado corta (6 caracteres como mínimo).'"],
  ["'Cette adresse e-mail n’est pas valide.'", "'This email address isn’t valid.'", "'Esta dirección de correo no es válida.'"],
  ["'Trop de tentatives. Réessaie dans un instant.'", "'Too many attempts. Try again in a moment.'", "'Demasiados intentos. Vuelve a intentarlo en un momento.'"],
  ["'Ce nom est réservé. Choisis-en un autre.'", "'This name is reserved. Choose another.'", "'Este nombre está reservado. Elige otro.'"],
  ["'Une erreur est survenue. Réessaie.'", "'Something went wrong. Try again.'", "'Se ha producido un error. Vuelve a intentarlo.'"],
  ["c==='t'?'Indique ton prénom.':'Indique ton prénom et ton nom.'", "c==='t'?'Enter your first name.':'Enter your first name and surname.'", "c==='t'?'Indica tu nombre.':'Indica tu nombre y tus apellidos.'"],
  ["'Coche la case pour accepter les conditions et la politique de confidentialité.'", "'Tick the box to accept the terms and the privacy policy.'", "'Marca la casilla para aceptar las condiciones y la política de privacidad.'"],
  ["envoi.textContent='Un instant…'", "envoi.textContent='One moment…'", "envoi.textContent='Un momento…'"],
  ["source:'transmettre',lang:'fr',page:'/handpan-app/'", "source:'transmettre',lang:'en',page:'/en/handpan-app/'", "source:'transmettre',lang:'es',page:'/es/handpan-app/'"],
  ["'On te prévient à l’ouverture.'", "'We’ll let you know when it opens.'", "'Te avisamos cuando abra.'"],
  ["'Scènes d’ouverture'", "'Opening scenes'", "'Escenas de apertura'"],
  ["'Scène '+(i+1)", "'Scene '+(i+1)", "'Escena '+(i+1)"],
  // ===== V4.1 (02/11/2026)
  ["Sur ordinateur ou tablette, dans ton navigateur. Sur un téléphone, l’écran est trop petit pour bien voir ton handpan et ses accords. Sur iPhone et iPad, Apple empêche les navigateurs de recevoir un instrument branché en USB : pour relier un pan numérique, ouvre l’app dans Web MIDI Browser, gratuit sur l’App Store.", "A computer or tablet, in your browser. A phone screen is too small to show your handpan and its chords properly. On iPhone and iPad, Apple doesn’t let browsers pick up an instrument connected by USB: to connect a digital pan, open the app in Web MIDI Browser, free on the App Store.", "En ordenador o tableta, en tu navegador. En un teléfono, la pantalla es demasiado pequeña para ver bien tu handpan y sus acordes. En iPhone y iPad, Apple impide que los navegadores reciban la señal de un instrumento conectado por USB: para conectar un handpan digital, abre la app en Web MIDI Browser, gratis en la App Store."],
  ["Sur ordinateur ou tablette, dans ton navigateur.", "On a computer or tablet, in your browser.", "En ordenador o tableta, en tu navegador."],
  ["Sur quel appareil ?", "Which device do I need?", "¿En qué dispositivo?"],
  ["Deux formules t’attendent dans l’app. <b>Essentiel</b>, 3,49 € par mois : il transpose une chanson qui ne tombe pas sur ta gamme, et tu joues sur les grooves du catalogue, avec un batteur. <b>Studio</b>, 9,99 € par mois : des exercices de chant. Premier mois offert sur les formules mensuelles, et tu changes de formule quand tu veux.", "There are two paid plans in the app. <b>Essential</b>, €3.49 a month, transposes a song that doesn’t fit your scale and lets you play along to the catalogue’s grooves, with a drummer. <b>Studio</b>, €9.99 a month, adds singing exercises. First month free on monthly plans, and you can change plan whenever you like.", "Dos planes te esperan en la app. <b>Esencial</b>, 3,49 € al mes: transpones una canción que no encaja en tu escala, y tocas sobre los grooves del catálogo, con un baterista. <b>Studio</b>, 9,99 € al mes: todo lo de Esencial, más ejercicios de canto. Primer mes gratis en los planes mensuales, y cambias de plan cuando quieras."],
  ["Et si un jour je veux aller plus loin ?", "What if I want to go further one day?", "¿Y si un día quiero ir más lejos?"],
  ["Créer mon compte et voir mes chansons", "Create my account and see my songs", "Crear mi cuenta y ver mis canciones"],
]

/* Le contenu FR des balises canoniques et hreflang ne bouge pas : seules ces trois lignes changent. */
const META = {
  en: { dir: 'en', lang: 'en', locale: 'en_GB', home: 'Home', os: 'Web (browser)', sub: 'Music education', col: 1,
        offers: ['Free', 'Essential (monthly)', 'Essential (yearly)', 'Studio (monthly)', 'Studio (yearly)'], last: "document.querySelector('#couleurs button[data-nom=\"en\"]').click();" },
  es: { dir: 'es', lang: 'es', locale: 'es_ES', home: 'Inicio', os: 'Web (navegador)', sub: 'Educación musical', col: 2,
        offers: ['Gratis', 'Esencial (mes)', 'Esencial (año)', 'Studio (mes)', 'Studio (año)'], last: '' },
}

const esc = (v) => v.replace(/&amp;/g, '&')
const plain = (v) => esc(v.replace(/<[^>]+>/g, '')).trim()

for (const m of Object.values(META)) {
  let out = src
  // Les fragments les plus longs d'abord : un texte court ne peut pas entamer une phrase plus longue.
  for (const row of [...T].sort((a, b) => b[0].length - a[0].length)) {
    if (!out.includes(row[0])) {
      if (src.includes(row[0])) continue // déjà absorbé par un fragment plus long
      console.error(`Texte français introuvable, table à mettre à jour :\n  ${row[0].slice(0, 120)}`)
      process.exit(1)
    }
    out = out.split(row[0]).join(row[m.col])
  }

  // Structure : langue, adresse, médias partagés avec la page française.
  out = out.replace('<html lang="fr">', `<html lang="${m.lang}">`)
    .replace('<link rel="canonical" href="https://www.lesagedavid.fr/handpan-app/">', `<link rel="canonical" href="https://www.lesagedavid.fr/${m.dir}/handpan-app/">`)
    .replace('<meta property="og:url" content="https://www.lesagedavid.fr/handpan-app/">', `<meta property="og:url" content="https://www.lesagedavid.fr/${m.dir}/handpan-app/">`)
    .replace('<meta property="og:locale" content="fr_FR">', `<meta property="og:locale" content="${m.locale}">`)
    .replace(/(src|poster)="img\/([^"]+)"/g, (_, attr, f) =>
      `${attr}="${existsSync(`public/${m.dir}/handpan-app/img/${f}`) ? `/${m.dir}` : ''}/handpan-app/img/${f}"`)
    .replace('src="ouverture-b4.html?lang=fr"', `src="/handpan-app/ouverture-b4.html?lang=${m.lang}"`)
    .replace('<a href="/handpan-app/" aria-current="page">', `<a href="/${m.dir}/handpan-app/" aria-current="page">`)
    .replace(' aria-current="true">Français', '>Français')
    .replace(new RegExp(`(data-lang-pick="${m.lang}")>`), '$1 aria-current="true">')
    // drapeaux du haut (11/11/2026) : le drapeau actif suit la langue de la page
    .replace(/(data-lang-pick="fr" title="Français" aria-label="Français") aria-current="true"/, '$1')
    .replace(new RegExp(`(data-lang-pick="${m.lang}" title="[^"]+" aria-label="[^"]+")>`), '$1 aria-current="true">')
    .replace('class="drapeaux" role="navigation" aria-label="Langue"', `class="drapeaux" role="navigation" aria-label="${m.lang === 'es' ? 'Idioma' : 'Language'}"`)
    .replace(/<!--[\s\S]*?-->\n?/g, '')
    // Une page déjà localisée ne redirige jamais.
    .replace(/<script>\n;\(function\(\)\{try\{\n if\(\/bot[\s\S]*?<\/script>\n/, '')
  if (m.last) out = out.replace("document.querySelector('.periode button[data-m=\"a\"]').click();\n", `document.querySelector('.periode button[data-m="a"]').click();\n${m.last}\n`)

  // Données structurées : la FAQ est reprise de la FAQ visible, à l'identique.
  const faqZone = out.slice(out.indexOf('<section id="faq">'), out.indexOf('<section id="fin">'))
  const faq = [...faqZone.matchAll(/<details[^>]*><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p><\/details>/g)]
    .map(([, q, a]) => ({ '@type': 'Question', name: plain(q), acceptedAnswer: { '@type': 'Answer', text: plain(a) } }))
  if (faq.length !== 8) { console.error('FAQ : 8 questions attendues'); process.exit(1) }
  const description = out.match(/<meta name="description" content="([^"]*)"/)[1]
  const ld = [...out.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  for (const [bloc, json] of ld) {
    const d = JSON.parse(json)
    if (d['@type'] === 'FAQPage') d.mainEntity = faq
    if (d['@type'] === 'BreadcrumbList') {
      d.itemListElement[0].name = m.home
      d.itemListElement[0].item = `https://www.lesagedavid.fr/${m.dir}/`
      d.itemListElement[1].item = `https://www.lesagedavid.fr/${m.dir}/handpan-app/`
    }
    if (d['@type'] === 'SoftwareApplication') {
      Object.assign(d, { operatingSystem: m.os, applicationSubCategory: m.sub, inLanguage: m.lang, description })
      d.author.url = `https://www.lesagedavid.fr/${m.dir}/`
      d.offers.forEach((o, i) => { o.name = m.offers[i] })
    }
    out = out.replace(bloc, `<script type="application/ld+json">${JSON.stringify(d)}</script>`)
  }

  mkdirSync(`public/${m.dir}/handpan-app`, { recursive: true })
  writeFileSync(`public/${m.dir}/handpan-app/index.html`, out)
  console.log(`public/${m.dir}/handpan-app/index.html : ${out.length} caractères`)
}
