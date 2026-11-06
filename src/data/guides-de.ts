// Traduction allemande des guides (06/11/2026, chantier 44), faite à la main depuis le
// FRANÇAIS de `src/data/guides.ts`, avec la consigne du site et de l'app (tutoiement `du`,
// `der Handpan`, `der Ding`, `Ton` pour la note jouée, aucun tiret cadratin). Pas encore
// relue par un germanophone natif. Une correction se fait ici, à la main, comme dans `de.ts`.
// Les liens restent des chemins NEUTRES : GuidePage les localise (et renvoie un article de
// blog vers sa version anglaise, puis française, puisqu'il n'existe aucun article allemand).

import type { GuidesByLang } from './guides'

export const deGuides: GuidesByLang = {
  // ----------------------------------------------------------
  // 1) HANDPAN LERNEN
  // ----------------------------------------------------------
  learn: {
    slug: 'apprendre-le-handpan',
    title: 'Handpan lernen: der komplette Leitfaden für Einsteiger',
    description:
      'Wie du Handpan ohne Notenlesen und Musiktheorie lernst: die Methode mit Farben und Formen, wo du anfängst, welches Instrument und welches Werkzeug du wählst.',
    keywords:
      'Handpan lernen, Handpan für Anfänger, Handpan spielen lernen, Handpan ohne Noten, Handpan Methode, Handpan Unterricht',
    breadcrumbLabel: 'Handpan lernen',
    eyebrow: 'Leitfaden für Einsteiger',
    h1: 'Wie du Handpan lernst, wenn du gerade anfängst',
    leadAnswer:
      'Um Handpan zu lernen, brauchst du weder Noten noch Musiktheorie: Fang damit an, zuzuhören, deine Hände aufzulegen und ein paar Töne zu spielen. Wenn du jeden Ton an seiner Farbe und jeden Akkord an seiner Form erkennst, merkst du dir Melodien in wenigen Minuten. Danach kommst du voran, indem du regelmäßig spielst, nach Gehör.',
    sections: [
      {
        id: 'cest-quoi',
        icon: 'lucide:disc-3',
        heading: 'Was ist ein Handpan?',
        blocks: [
          {
            kind: 'p',
            html: 'Der Handpan ist ein melodisches Schlaginstrument aus Stahl in Form einer Untertasse. Auf seiner Oberseite ist ein zentraler Ton (der „Ding“) von mehreren Tönen umgeben, die aufeinander gestimmt und so gewählt sind, dass sie zusammen sauber klingen: Das nennt man eine <strong>Tonleiter</strong>. Du spielst ihn mit den Fingern und den Händen, ohne Schlägel. Das Ergebnis: Selbst ganz ohne Erfahrung klingt alles schön, was du spielst. Genau das macht den Handpan für den Einstieg so einladend.',
          },
        ],
      },
      {
        id: 'solfege',
        icon: 'lucide:eye-off',
        heading: 'Muss ich Noten lesen können? (Nein)',
        blocks: [
          {
            kind: 'p',
            html: 'Nein. Der Handpan eignet sich wunderbar zum Lernen nach Gehör. Die Töne sind bereits aufeinander gestimmt: Du kannst eigentlich nichts „falsch“ spielen. Ich selbst hatte siebeneinhalb Stunden Musiktheorie pro Woche, in vier verschiedenen Levels, um „meinen Rückstand aufzuholen“: Noten lesen kann ich bis heute nicht, und ich habe alles nach Gehör gelernt. Notenlesen und Musiktheorie können dich später interessieren, aus Neugier, aber sie sind nie eine Voraussetzung, um anzufangen.',
          },
        ],
      },
      {
        id: 'methode',
        icon: 'lucide:palette',
        heading: 'Mit Farben und Formen lernen',
        blocks: [
          {
            kind: 'p',
            html: 'Meine Methode beruht auf drei konkreten Orientierungspunkten, die Notenlinien und Notenköpfe ersetzen. Zuerst die <strong>Farbe</strong>: Jeder Ton bekommt seine Farbe (die ChromaKeys), sodass eine Melodie zu spielen heißt, einer Folge von Farben zu folgen. Dann die <strong>Form</strong>: Jeder Akkord zeichnet eine Geometrie auf das Instrument (die Konstellationen), eine visuelle Tabulatur, die viel mehr sagt als ein Akkordschema. Und schließlich die <strong>Emotion</strong>: Jede Stufe trägt eine Gefühlsfarbe (Schwung, Entspannung, Nostalgie …), damit du spielst, was du fühlst.',
          },
          {
            kind: 'ul',
            items: [
              'Farben (ChromaKeys): Jeder Ton hat seine Farbe → du liest die Musik auf einen Blick.',
              'Formen (Konstellationen): Jeder Akkord ist eine Zeichnung → du merkst dir die Akkordfolgen visuell.',
              'Emotionen: Jede Stufe hat eine Gefühlsfarbe → du spielst, was du ausdrücken willst.',
            ],
          },
        ],
      },
      {
        id: 'commencer',
        icon: 'lucide:footprints',
        heading: 'Wo du konkret anfängst',
        blocks: [
          {
            kind: 'ul',
            items: [
              'Mach es dir bequem, das Instrument auf den Knien oder auf einem Ständer, leicht zu dir geneigt.',
              'Spiel den Ding in der Mitte mit den Fingerspitzen, ganz locker: Hör zu, wie der Ton nachklingt, bevor du weiterspielst.',
              'Geh die Töne einen nach dem anderen durch, damit du dir ihre Lage und ihre Farbe zu eigen machst.',
              'Spiel eine kurze Melodie aus 3 oder 4 Tönen immer wieder, bis sie wie von selbst kommt.',
              'Füge einen Akkord (eine Form) hinzu und verbinde ihn mit der Melodie: Du improvisierst schon.',
            ],
          },
          {
            kind: 'p',
            html: 'Zehn Minuten am Tag bringen mehr als eine Stunde einmal pro Woche. Am Handpan kommst du durch Regelmäßigkeit voran, nicht durch die Dauer.',
          },
        ],
      },
      {
        id: 'acoustique-electronique',
        icon: 'lucide:git-compare',
        heading: 'Akustisch oder elektronisch für den Einstieg?',
        blocks: [
          {
            kind: 'p',
            html: 'Beide spielst du genau gleich, mit den Händen. Der akustische Handpan bietet eine Resonanz und einen körperlichen Kontakt, die sich nicht nachahmen lassen. Der <a href="/neotone">elektronische Handpan Neotone</a> dagegen lässt sich mit Kopfhörer spielen (ideal in der Wohnung, nachts) <em>oder</em> draußen mit einem Verstärker wie dem Bose S1: Er ist nicht nur ein Instrument für den Kopfhörer. Er wechselt außerdem mit einem Handgriff die Tonleiter und lässt sich an deinen Computer anschließen. Für Einsteiger räumt das elektronische Instrument zwei große Hürden aus dem Weg: die Lautstärke und das Budget für ein einziges Instrument, das auf eine einzige Tonleiter festgelegt ist. Ausführlich gehe ich dieser Wahl in meinem Leitfaden <a href="/handpan-electronique-vs-acoustique">elektronischer vs. akustischer Handpan</a> nach.',
          },
        ],
      },
      {
        id: 'outil',
        icon: 'lucide:sparkles',
        heading: 'Mit welchem Werkzeug lernen: Handpan Constellation Studio',
        blocks: [
          {
            kind: 'p',
            html: 'Um die Methode anzuwenden, habe ich <a href="/handpan-app">Handpan Constellation Studio</a> entwickelt, die App, die Musik sichtbar macht. Sie zeigt deine Töne in Farben, zeichnet die Akkorde als Formen, bietet einen Atlas mit Tonleitern aus aller Welt und lässt dich deine eigenen erstellen. Die Version <strong>Kostenlos</strong> bleibt für immer kostenlos; die Tarife <strong>Essenziell (3,49 € inkl. MwSt./Monat)</strong> und <strong>Studio (9,99 € inkl. MwSt./Monat)</strong> gehen weiter, mit 1 kostenlosen Testmonat. Der ideale Begleiter, um allein und in deinem Tempo zu üben.',
          },
        ],
      },
      {
        id: 'niveau-superieur',
        icon: 'lucide:graduation-cap',
        heading: 'Den nächsten Schritt machen: der Unterricht',
        blocks: [
          {
            kind: 'p',
            html: 'Irgendwann beschleunigt ein Blick von außen alles: Haltung, Hand, Rhythmus, Wahl der Tonleiter. Mein <a href="/cours">Handpan-Unterricht</a>, per Video überall auf der Welt oder vor Ort in Paris, passt sich deinem Level an, vom völligen Anfänger bis zum erfahrenen Musiker. Wir arbeiten mit der Methode der Farben und Formen, aber auch am Groove und am persönlichen Ausdruck. Wenn du tiefer in die Methode einsteigen willst, lies <a href="/blog/handpan-par-les-couleurs">Handpan mit Farben</a> und <a href="/blog/creer-sa-gamme-de-handpan">die eigene Handpan-Tonleiter erstellen</a>.',
          },
        ],
      },
    ],
    relatedHeading: 'Weiterlesen',
    related: [
      { href: '/handpan-app', label: 'Die App Handpan Constellation Studio entdecken' },
      { href: '/cours', label: 'Handpan-Unterricht nehmen' },
      { href: '/neotone', label: 'Der elektronische Handpan Neotone' },
      { href: '/blog/handpan-par-les-couleurs', label: 'Artikel: Handpan mit Farben' },
      { href: '/blog/creer-sa-gamme-de-handpan', label: 'Artikel: die eigene Handpan-Tonleiter erstellen' },
    ],
    faqHeading: 'Häufige Fragen',
    faq: [
      {
        q: 'Ist Handpan schwer zu lernen?',
        a: 'Nein, er gehört zu den zugänglichsten Instrumenten überhaupt. Die Töne sind aufeinander gestimmt, also klingt alles sauber, was du spielst. In wenigen Minuten kannst du eine kleine Melodie spielen; der Fortschritt kommt dann mit der Regelmäßigkeit.',
      },
      {
        q: 'Wie lange dauert es, bis ich Handpan spielen kann?',
        a: 'Schon in der ersten Übungseinheit spielst du einfache Melodien. Nach ein paar Wochen regelmäßigen Übens (10 Minuten am Tag) improvisierst du mit Freude. Die feine Beherrschung von Rhythmus und Nuancen baut sich über Monate auf, wie bei jedem Instrument.',
      },
      {
        q: 'Kann ich Handpan allein lernen, ohne Lehrkraft?',
        a: 'Ja. Viele fangen allein an, nach Gehör, mit einem visuellen Werkzeug wie Handpan Constellation Studio. Eine Lehrkraft bleibt wertvoll, um Haltung, Bewegung und Rhythmus zu korrigieren und schneller voranzukommen, aber für den Anfang ist sie nicht unverzichtbar.',
      },
      {
        q: 'Muss ich einen Handpan kaufen, um zu lernen?',
        a: 'Ganz am Anfang nicht unbedingt: Mit der kostenlosen Version von Handpan Constellation Studio kannst du im Akustikmodus üben. Um wirklich mit deinen Händen zu spielen, wird ein akustischer Handpan oder ein elektronischer Neotone aber schnell unverzichtbar.',
      },
    ],
    cta: {
      heading: 'Bereit für deine ersten Melodien?',
      text: 'Probier die Methode mit Farben direkt in der App aus: Der Einstieg ist kostenlos.',
      primary: { href: '/handpan-app#acces', label: 'Zugang zur App' },
      secondary: { href: '/cours', label: 'Zum Unterricht' },
    },
    datePublished: '2026-07-01',
    dateModified: '2026-07-01',
  },

  // ----------------------------------------------------------
  // 2) ELEKTRONISCHER VS. AKUSTISCHER HANDPAN
  // ----------------------------------------------------------
  vsAcoustic: {
    slug: 'handpan-electronique-vs-acoustique',
    title: 'Elektronischer vs. akustischer Handpan: der Vergleich',
    description:
      'Elektronischer oder akustischer Handpan? Klang, Spielen mit Kopfhörer, Tonleitern, Effekte, MIDI, Preis, Pflege: der komplette Vergleich für die richtige Wahl.',
    keywords:
      'elektronischer Handpan, akustischer Handpan, Neotone, elektronischer vs akustischer Handpan, Handpan Vergleich, Handpan Kopfhörer',
    breadcrumbLabel: 'Elektronisch vs. akustisch',
    eyebrow: 'Vergleich',
    h1: 'Elektronischer vs. akustischer Handpan: Welchen wählen?',
    leadAnswer:
      'Ein akustischer Handpan bietet eine organische Resonanz und einen einzigartigen körperlichen Kontakt, bleibt aber auf eine einzige Tonleiter festgelegt und klingt immer laut in den Raum. Ein elektronischer Handpan wie der Neotone lässt sich mit Kopfhörer oder verstärkt spielen (mit einem Verstärker wie dem Bose S1, auch draußen), wechselt sofort die Tonleiter, bringt Effekte mit und lässt sich per MIDI anschließen. Der Preis dafür: ein verstärkter statt eines natürlichen Klangs.',
    sections: [
      {
        id: 'differences',
        icon: 'lucide:git-compare',
        heading: 'Die wirklichen Unterschiede',
        blocks: [
          {
            kind: 'p',
            html: 'Der Unterschied liegt nicht in der Bewegung (in beiden Fällen spielst du mit den Händen), sondern darin, wie der Klang entsteht und was das Instrument dir drumherum ermöglicht.',
          },
          {
            kind: 'ul',
            items: [
              'Klang: Der akustische Handpan schwingt in der Luft, reich und lebendig; der elektronische erzeugt ein Signal, das du über Kopfhörer, über einen Lautsprecher oder draußen über einen Verstärker hörst, mit perfekter Intonation.',
              'Kopfhörer / nachts: Nur der elektronische lässt sich lautlos spielen, ein echter Vorteil in der Wohnung oder spät am Abend.',
              'Tonleitern: Der akustische ist auf eine Tonleiter festgelegt; der Neotone hat Dutzende an Bord und wechselt sie mit einem Handgriff.',
              'Effekte: Hall, Delay, andere Klänge … Der elektronische öffnet ein Klangfeld, das der akustische nicht kennt.',
              'MIDI: Der elektronische lässt sich an deinen Computer anschließen, um aufzunehmen, zu komponieren und andere Klänge zu steuern.',
              'Preis: Ein guter akustischer Handpan und ein Neotone liegen in vergleichbaren Größenordnungen, aber der elektronische ersetzt allein mehrere Instrumente mit unterschiedlichen Tonleitern.',
              'Pflege: Akustischer Stahl ist anfällig für Rost und Verstimmung; der elektronische verstimmt sich nie und rostet nicht.',
            ],
          },
        ],
      },
      {
        id: 'pour-qui',
        icon: 'lucide:users',
        heading: 'Für wen ist welches Instrument?',
        blocks: [
          {
            kind: 'p',
            html: 'Der <strong>akustische</strong> Handpan ist für dich gemacht, wenn du die körperliche Schwingung suchst, draußen oder im Kreis spielst und an einer bestimmten Tonleiter hängst, die du laut spielst. Der <strong>elektronische Handpan Neotone</strong> passt zu dir, wenn du in einer Wohnung lebst, oft mit Kopfhörer spielst, viele Tonleitern erkunden willst, ohne die Instrumente zu vervielfachen, deine Musik aufnimmst oder Effekte magst. Und draußen spielst du ihn ebenfalls, mit einem Verstärker wie dem Bose S1. Viele Spieler haben am Ende beide: Sie ergänzen sich, sie konkurrieren nicht.',
          },
        ],
      },
      {
        id: 'tableau',
        icon: 'lucide:table',
        heading: 'Vergleichstabelle',
        blocks: [
          {
            kind: 'table',
            head: ['Kriterium', 'Akustisch', 'Elektronisch (Neotone)'],
            rows: [
              ['Klang', 'Natürliche, organische Resonanz', 'Verstärkt, perfekte Intonation'],
              ['Spielen mit Kopfhörer / nachts', 'Nein', 'Ja'],
              ['Tonleitern', 'Eine einzige, festgelegt', 'Dutzende, austauschbar'],
              ['Effekte (Hall, Delay …)', 'Nein', 'Ja'],
              ['MIDI / Aufnahme', 'Mikrofon nötig', 'Eingebaut'],
              ['Verstimmung / Rost', 'Mit der Zeit möglich', 'Nie'],
              ['Spielen im Kreis, draußen', 'Ideal', 'Braucht Verstärker/Kopfhörer'],
            ],
          },
        ],
      },
      {
        id: 'conclusion',
        icon: 'lucide:scale',
        heading: 'Ein differenziertes Fazit',
        blocks: [
          {
            kind: 'p',
            html: 'Einen „besten“ Handpan an sich gibt es nicht: Es gibt das Instrument, das zu deinem Leben passt. Wenn Stille, vielseitige Tonleitern und digitales Gestalten zählen, ist der <a href="/neotone">Neotone</a> unschlagbar. Wenn die akustische Schwingung und das gemeinsame Spielen an erster Stelle stehen, wird dich ein traditioneller Handpan glücklich machen. Und um beide Welten zu üben, ohne gleich etwas zu kaufen, bietet die App <a href="/handpan-app">Handpan Constellation Studio</a> einen kostenlosen Akustikmodus und einen Elektronikmodus. Ich habe auch einen eigenen Artikel dazu geschrieben: <a href="/blog/pourquoi-handpan-electronique">warum ich mich für den elektronischen Handpan entschieden habe</a>.',
          },
        ],
      },
    ],
    relatedHeading: 'Weiterlesen',
    related: [
      { href: '/neotone', label: 'Den elektronischen Handpan Neotone entdecken' },
      { href: '/handpan-app', label: 'Die App Handpan Constellation Studio (akustisch + elektronisch)' },
      { href: '/blog/pourquoi-handpan-electronique', label: 'Artikel: warum der elektronische Handpan' },
    ],
    faqHeading: 'Häufige Fragen',
    faq: [
      {
        q: 'Klingt ein elektronischer Handpan wie ein echter Handpan?',
        a: 'Der Neotone gibt die Klangfarbe des Handpans originalgetreu wieder, dazu mit perfekter Intonation und mit Effekten. Das Spielgefühl ist identisch. Was sich ändert, ist die Resonanz eines akustischen Instruments in der Luft: Hier hörst du stattdessen über Kopfhörer, Lautsprecher oder Verstärker.',
      },
      {
        q: 'Kann ich einen elektronischen Handpan mit Kopfhörer spielen?',
        a: 'Ja, das ist einer seiner großen Vorteile. Der Neotone lässt sich vollständig mit Kopfhörer spielen, ohne jemanden zu stören: ideal in der Wohnung, nachts oder für saubere Aufnahmen. Er ist aber nicht nur ein Instrument für den Kopfhörer: Du kannst auch draußen spielen, mit einem Verstärker wie dem Bose S1.',
      },
      {
        q: 'Kann ein elektronischer Handpan die Tonleiter wechseln?',
        a: 'Ja. Während ein akustischer Handpan auf eine Tonleiter festgelegt ist, hat der Neotone Dutzende an Bord und wechselt sie sofort. Du kannst sogar deine eigenen in Handpan Constellation Studio erstellen.',
      },
      {
        q: 'Elektronisch oder akustisch: Welcher für den Einstieg?',
        a: 'Beide spielst du gleich. Für Einsteiger in einer Wohnung räumt der elektronische die Hürden Lautstärke und einzige Tonleiter aus dem Weg. Für die körperliche Schwingung und das Spielen in der Gruppe bleibt der akustische unschlagbar. Viele kombinieren am Ende beide.',
      },
    ],
    cta: {
      heading: 'Lust, den elektronischen Handpan auszuprobieren?',
      text: 'Entdecke den Neotone oder probier beide Modi in der App Handpan Constellation Studio aus.',
      primary: { href: '/neotone', label: 'Den Neotone entdecken' },
      secondary: { href: '/handpan-app#acces', label: 'Zugang zur App' },
    },
    datePublished: '2026-07-01',
    dateModified: '2026-07-01',
  },

  // ----------------------------------------------------------
  // 3) WELCHEN HANDPAN WÄHLEN
  // ----------------------------------------------------------
  chooseHandpan: {
    slug: 'quel-handpan-choisir',
    title: 'Welchen Handpan wählen? Kaufberatung für Einsteiger',
    description:
      'Welchen Handpan wählen, wenn du anfängst: Zahl der Töne, empfohlene Tonleiter (D Kurd), akustisch oder elektronisch, Budget und Fehler, die du vermeiden solltest.',
    keywords:
      'welchen Handpan wählen, Handpan kaufen, Handpan für Anfänger, Handpan Tonleiter D Kurd, Handpan Preis, Handpan Neotone',
    breadcrumbLabel: 'Welchen Handpan wählen',
    eyebrow: 'Kaufberatung',
    h1: 'Welchen Handpan wählen, wenn du anfängst?',
    leadAnswer:
      'Ein ordentlicher Handpan kostet meiner Meinung nach um die 1500 €. Der D Kurd (d-Moll) bleibt die zugänglichste Tonleiter für ein erstes akustisches Instrument. Aber schnell kaufst du einen zweiten, weil du dich mit einer einzigen Tonleiter im Kreis drehst, und genau dann kann sich die Frage nach einem Neotone stellen. Probier vor dem Kauf, wenn du kannst, und nimm lieber ein gut gestimmtes Instrument als das billigste.',
    sections: [
      {
        id: 'nombre-notes',
        icon: 'lucide:hash',
        heading: 'Wie viele Töne?',
        blocks: [
          {
            kind: 'p',
            html: 'Ein akustischer Handpan besteht aus einem Ding und den Tönen, die rundherum angeordnet sind: Die üblichen Modelle haben 8 bis 10 Töne, und manche fügen Töne auf der Unterseite des Korpus hinzu („Bottom Notes“). Auf der elektronischen Seite gibt es den <a href="/neotone">Neotone</a> mit 10 Tönen und den Mutant mit 19 Tönen.',
          },
        ],
      },
      {
        id: 'gamme',
        icon: 'lucide:music',
        heading: 'Welche Tonleiter? (Empfehlung: D Kurd)',
        blocks: [
          {
            kind: 'p',
            html: 'Die Tonleiter ist die wichtigste Entscheidung, und bei einem akustischen Instrument ist sie endgültig. Für ein erstes Instrument ist der <strong>D Kurd (d-Moll)</strong> die einhellige Empfehlung: warm, genau richtig melancholisch, vielseitig. Er ist die meistgespielte Tonleiter der Welt und die mit den meisten Tutorials. Es gibt Dur-Tonleitern für einen helleren Klang, aber der D Kurd bleibt der beste Ausgangspunkt. Bei einem Neotone ist diese Entscheidung nicht endgültig: Du wechselst die Tonleiter, wann du willst.',
          },
        ],
      },
      {
        id: 'acoustique-electronique',
        icon: 'lucide:git-compare',
        heading: 'Akustisch oder elektronisch?',
        blocks: [
          {
            kind: 'p',
            html: 'Die Schlüsselfrage, die ich in meinem Vergleich <a href="/handpan-electronique-vs-acoustique">elektronischer vs. akustischer Handpan</a> ausführlich behandle. Kurz gesagt: der akustische für die körperliche Schwingung und das Spielen draußen ohne Ausrüstung; der elektronische (Neotone) für Kopfhörer, viele Tonleitern, Effekte und Aufnahmen, und mit einem Verstärker wie dem Bose S1 auch für draußen. Wenn du in einer Wohnung lebst oder bei der Tonleiter noch zögerst, bewahrt dich der elektronische davor, dich zu vertun und neu zu kaufen.',
          },
        ],
      },
      {
        id: 'budget',
        icon: 'lucide:wallet',
        heading: 'Welches Budget?',
        blocks: [
          {
            kind: 'p',
            html: 'Ein ordentlicher Handpan kostet meiner Meinung nach um die <strong>1500 €</strong>. Sei vorsichtig bei sehr billigen Instrumenten: Unter einem gewissen Preis ist die Stimmung oft ungenau, und das Instrument klingt schief, der schlechteste Start, den es gibt. Denk aber auch an das, was danach kommt: Schnell kaufst du einen zweiten, weil du dich mit einer einzigen Tonleiter im Kreis drehst. Genau dann kann sich die Frage nach einem <a href="/neotone">Neotone</a> stellen. Alles hängt davon ab, was du suchst: Wenn du in allen Tonarten und Stimmlagen singen und dich dabei begleiten willst, ist er eindeutig am besten geeignet. Oder du lässt dir einen Handpan für deine Stimme individuell stimmen. Schau auch im <a href="/boutique">Shop</a> nach dem Zubehör (Tasche, Ständer), das dein Instrument schützt.',
          },
        ],
      },
      {
        id: 'essayer',
        icon: 'lucide:map-pin',
        heading: 'Wo du ihn vor dem Kauf ausprobierst',
        blocks: [
          {
            kind: 'p',
            html: 'Nichts ersetzt es, die Hände auf das Instrument zu legen. In Paris ist mein <a href="/showroom">Showroom</a> der einzige Ort der Welt, abgesehen von den Herstellern in Budapest, an dem du einen Neotone testen und noch am selben Tag mitnehmen kannst, ohne Fertigungszeit und zum besten Preis. Dort vergleichst du die Tonleitern, spürst die Ansprache unter den Fingern, und ich berate dich nach deinem Level und deinen Wünschen.',
          },
        ],
      },
      {
        id: 'erreurs',
        icon: 'lucide:alert-triangle',
        heading: 'Fehler, die du vermeiden solltest',
        blocks: [
          {
            kind: 'ul',
            items: [
              'Das billigste Instrument kaufen: Ein schlecht gestimmtes Instrument verdirbt dir die Lust, statt dich zu motivieren.',
              'Eine seltene Tonleiter wählen, „weil sie in einem Video schön klang“: Der D Kurd erschließt dir viel mehr Stücke und Tutorials.',
              'Tasche und Ständer vernachlässigen: Sie schützen ein teures Instrument und machen das Spielen bequemer.',
              'Kaufen, ohne ausprobiert zu haben, obwohl ein Showroom erreichbar ist: Das Gefühl unter den Fingern entscheidet.',
            ],
          },
        ],
      },
    ],
    relatedHeading: 'Weiterlesen',
    related: [
      { href: '/neotone', label: 'Der elektronische Handpan Neotone (10 & 19 Töne)' },
      { href: '/showroom', label: 'Einen Handpan im Showroom in Paris ausprobieren' },
      { href: '/boutique', label: 'Zubehör: Taschen, Ständer …' },
      { href: '/handpan-electronique-vs-acoustique', label: 'Vergleich elektronisch vs. akustisch' },
    ],
    faqHeading: 'Häufige Fragen',
    faq: [
      {
        q: 'Welche Handpan-Tonleiter für den Einstieg?',
        a: 'Der D Kurd (d-Moll) ist die beste Wahl für einen ersten Handpan: vielseitig, warm, die meistgespielte Tonleiter und die mit den meisten Tutorials. Bei einem elektronischen Neotone bist du ohnehin nicht auf eine einzige Tonleiter festgelegt.',
      },
      {
        q: 'Wie viele Töne für einen ersten Handpan?',
        a: 'Übliche akustische Handpans haben 8 bis 10 Töne, manchmal mehr mit Tönen auf der Unterseite des Korpus. Die Zahl der Töne zählt weniger als die Tonleiter: Bei einem akustischen Instrument ist sie endgültig, und sie entscheidet, was du spielen kannst.',
      },
      {
        q: 'Was kostet ein guter Handpan?',
        a: 'Ein ordentlicher Handpan kostet meiner Meinung nach um die 1500 €. Sei vorsichtig bei sehr niedrigen Preisen: Unter einer gewissen Schwelle ist die Stimmung oft schlecht. Rechne auch damit, dass schnell ein zweites Instrument dazukommt, weil man sich mit einer einzigen Tonleiter im Kreis dreht. Genau dann kann sich die Frage nach einem Neotone stellen.',
      },
      {
        q: 'Wo kann ich einen Handpan vor dem Kauf ausprobieren?',
        a: 'In Paris kannst du in meinem Showroom die Instrumente testen, die Tonleitern vergleichen und deinen Neotone noch am selben Tag mitnehmen, ohne Fertigungszeit. Vor dem Kauf auszuprobieren bleibt der beste Weg, sich nicht zu vertun.',
      },
    ],
    cta: {
      heading: 'Finde den Handpan, der zu dir passt',
      text: 'Komm zum Ausprobieren nach Paris oder entdecke den Neotone und seine austauschbaren Tonleitern.',
      primary: { href: '/showroom', label: 'Meinen Besuch im Showroom buchen' },
      secondary: { href: '/neotone', label: 'Den Neotone entdecken' },
    },
    datePublished: '2026-07-01',
    dateModified: '2026-07-01',
  },
}
