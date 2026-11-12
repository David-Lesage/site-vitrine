// Allemand du site, RELU (chantier 44, 05-06/11/2026) : 32 lots traduits un par un depuis le
// français de `dict.ts`, avec la consigne de l'app (même lexique, mêmes libellés que l'app),
// contrôlés par `traduction-site/scripts/site_lot.py`, harmonisés par `retouches_de_site_v1.py`.
// Ce fichier n'est pas généré. Une correction se fait ici, valeur par valeur, comme dans `es.ts`.
// Un texte français nouveau ou modifié se traduit ici à la main (ou par un lot de relecture).

import type { Dict } from './dict'

export const de: Dict = {
  "common": {
    "nav": {
      "home": "Start",
      "neotone": "Der Neotone",
      "yishama": "Yishama",
      "shop": "Shop",
      "lessons": "Unterricht",
      "studio": "Handpan Constellation Studio",
      "blog": "Blog",
      "showroom": "Showroom",
      "about": "Über mich",
      "contact": "Kontakt"
    },
    "brandSub": "Sichtbare Musik",
    "tagline": "Musik sichtbar und zugänglich machen: durch Farben, Geometrie und Emotionen.",
    "headerCta": "In Paris ausprobieren",
    "footer": {
      "resources": "Ressourcen",
      "navigation": "Navigation",
      "contact": "Kontakt",
      "learnHandpan": "Handpan lernen",
      "electricVsAcoustic": "Elektronisch vs. akustisch",
      "chooseHandpan": "Welchen Handpan wählen?",
      "newsletter": "Newsletter",
      "faq": "FAQ",
      "legal": "Impressum",
      "terms": "AGB",
      "privacy": "Datenschutzerklärung",
      "press": "Presse",
      "rights": "Unabhängiger Neotone-Botschafter · Alle Preise sind unverbindlich und können sich ohne Vorankündigung ändern."
    },
    "skip": "Zum Inhalt springen",
    "terms": {
      "check": "Ich akzeptiere die {link}",
      "link": "AGB",
      "hint": "Darin steht, wie ich deine Kontaktdaten verwende, wozu du dich mit einer Buchung verpflichtest und wie du dich jederzeit abmeldest.",
      "required": "Um fortzufahren, musst du die AGB akzeptieren."
    },
    "news": {
      "check": "Ich möchte über die nächsten Termine und Neuigkeiten informiert werden",
      "optional": "optional",
      "hint": "Neue Termine für Treffen, der Start der App, neue Instrumente. Ich schreibe selten, und du meldest dich mit einem Klick ab. Wenn du das Kästchen nicht ankreuzt, schreibe ich dir nur wegen deiner Anfrage."
    },
    "credentials": [
      "Konservatoriumspreis",
      "The Voice · Staffel 11",
      "Botschafter für Neotone · Yishama · Maison du Ngoni",
      "Showroom Paris (20. Arr.)"
    ],
    "beta": {
      "badge": "Begrenzter Zugang",
      "title": "Die App ist noch nicht für alle geöffnet",
      "text": "Handpan Constellation Studio wird derzeit von einer kleinen Gruppe von Betatestern genutzt, während ich das Erlebnis noch verfeinere. Sie haben kostenlos Zugang und geben mir dafür ihr Feedback.",
      "wish": "Du möchtest Betatester werden? Kreuz das Kästchen im Formular an und erzähl mir in ein paar Worten, warum dich die App interessiert und wie du sie nutzen willst. Ich lese alles und antworte dir persönlich.",
      "more": "Zugang zur App",
      "ctaWaitlist": "Auf die Warteliste",
      "priceClosedNote": "Diese Preise sind unverbindlich: Sie gelten ab der öffentlichen Öffnung. Die ganze App, der kostenlose Tarif eingeschlossen, ist noch nicht geöffnet: Heute ist noch kein Tarif zugänglich. Sie wird von einer kleinen Gruppe von Betatestern genutzt, die kostenlos Zugang haben und mir dafür ihr Feedback geben. Die Warteliste ist im Moment der einzige Weg hinein, ganz gleich, welcher Tarif dich zum Start interessiert. Lust, zu den Betatestern zu gehören? Erzähl mir unten, warum dich die App interessiert. Ich lese alles und antworte dir persönlich.",
      "formTitle": "Zum Start benachrichtigt werden",
      "formFirst": "Vorname",
      "formLast": "Nachname",
      "formEmail": "E-Mail",
      "formHandpan": "Hast du schon einen Handpan?",
      "formHandpanYes": "Ja",
      "formHandpanNo": "Nein",
      "formHandpanPlanning": "Ich habe vor, einen zu kaufen",
      "formHandpanType": "Welche Art?",
      "formHandpanTypeAcoustic": "Akustisch",
      "formHandpanTypeElectronic": "Elektronisch",
      "formHandpanTypeBoth": "Beides",
      "formUsage": "Wofür wirst du Handpan Constellation Studio nutzen?",
      "formUsageHint": "Kreuz alles an, was auf dich zutrifft. Was du angibst, bestimmt deinen Zugang. Treffen mehrere Kästchen zu, zählt das verbindlichste.",
      "formUsagePersonal": "Für mich: lernen, spielen, komponieren",
      "formUsagePersonalDeal": "Kostenlos. Deine Werke gehören dir; die Exporte tragen ein Wasserzeichen.",
      "formUsageTeacher": "Zum Unterrichten: Ich nutze sie als Werkzeug in bezahltem Unterricht",
      "formUsageTeacherDeal": "Lizenz „Unterrichten“: Bereich für Schüler, Übungen, Notenblätter, Exporte ohne Wasserzeichen. Im Aufbau: Die ersten Lehrenden entwickeln sie mit mir.",
      "formUsageMaker": "Zum Bauen: Ich entwerfe und stimme Handpans",
      "formUsageMakerDeal": "Du bist ein Erschaffer. Sag mir, was du herstellen kannst, und du kommst in den Herstellerkatalog der App: Die Leute wählen dich in dem Moment, in dem sie den Handpan ihrer Träume entwerfen, je nach deinem Standort und deinen Möglichkeiten. Ich bringe dir Kunden, nehme einen Prozentsatz, und du machst ihnen einen Vermittlungspreis. Ich arbeite nur mit Herstellern, die zu mir passen und gute Arbeit leisten.",
      "formUsageOther": "Anderes / weiß ich noch nicht",
      "formUsageBoth": "Beides",
      "formStudentCount": "Wie viele Schüler betreust du gerade?",
      "formStudentCountNone": "Noch keine",
      "formStudentCount1": "1 bis 5",
      "formStudentCount6": "6 bis 20",
      "formStudentCount20": "Mehr als 20",
      "formMakerLegend": "Dein Herstellerprofil",
      "formMakerHint": "Damit erscheinst du im Katalog, bei den richtigen Leuten.",
      "formMakerCountry": "Wo baust du?",
      "formMakerCountryPlaceholder": "Land, Stadt",
      "formMakerNotes": "Wie viele Töne pro Instrument höchstens?",
      "formMakerNotes9": "9 oder weniger",
      "formMakerNotes10": "10 bis 13",
      "formMakerNotes14": "14 bis 17",
      "formMakerNotes18": "18 und mehr",
      "formMakerNotesVaries": "Hängt von den Tonleitern ab",
      "formMakerMetals": "Welche Metalle verarbeitest du?",
      "formMakerMetalNitrided": "Nitrierstahl",
      "formMakerMetalStainless": "Edelstahl",
      "formMakerMetalEmber": "Ember steel",
      "formMakerMetalOther": "Anderes",
      "formMakerPricing": "Deine Lieblingstonleitern, deine Preise, deine Lieferzeiten",
      "formMakerPricingPlaceholder": "Z. B.: D Kurd 9 Töne, 1.400 € – Lieferzeit 3 Monate.",
      "formPledgeTitle": "Alles klar zwischen uns?",
      "formPledgeText": "Ich baue dieses Werkzeug allein. Was du hier angibst, bestimmt deinen Zugang: Das ist keine Kontrolle, sondern eine Vereinbarung. Wenn sich deine Nutzung ändert (du fängst zum Beispiel an, damit zu unterrichten), sag es mir: Dann passen wir es einfach an.",
      "formPledgeCheck": "Ich versichere, dass meine Angaben ehrlich sind.",
      "formRolesRequired": "Kreuz mindestens ein Kästchen an: Das ist der Kern deiner Anfrage.",
      "invitedTitle": "Du gehörst zu den Eingeladenen ✨",
      "invitedText": "Diese Adresse wurde zur Beta eingeladen. Du musst nur noch ein Passwort wählen, um hineinzukommen.",
      "invitedBtn": "Passwort erstellen und loslegen",
      "invitedNotMe": "Das bin nicht ich: auf die Warteliste",
      "formShowcase": "Ich möchte über die nächsten kostenlosen Treffen in Paris informiert werden",
      "formBeta": "Ich möchte Betatester werden: früher und kostenloser Zugang zur App, im Gegenzug für mein regelmäßiges Feedback.",
      "formMotivation": "Warum interessiert dich die App? (optional)",
      "formMotivationBeta": "Warum möchtest du Betatester werden?",
      "formMotivationHint": "Erzähl mir in ein paar Worten, warum sie dich interessiert und wie du sie nutzen willst: Deine Antwort gilt als Bewerbung für die Gruppe der Betatester. Ich lese alles, persönlich.",
      "formMotivationPlaceholder": "Was ich suche, wie ich spiele, was ich damit machen möchte…",
      "formSubmit": "Ich möchte die App nutzen, sobald sie öffentlich startet",
      "formSending": "Wird gespeichert…",
      "formError": "Deine Anmeldung konnte nicht gespeichert werden. Versuch es noch einmal oder schreib mir direkt.",
      "formPrivacy": "Deine E-Mail-Adresse dient nur dazu, dich über den Start zu informieren. Kein Spam, Abmeldung jederzeit möglich."
    },
    "emotions": [
      "Gleichgewicht",
      "Schwung",
      "Abenteuer",
      "Entspannung",
      "Spannung",
      "Nostalgie",
      "Geheimnis"
    ]
  },
  "home": {
    "title": "Handpan anders lernen – David Lesage",
    "description": "Akustischer Yishama-Handpan, elektronischer Neotone-Handpan und eine Methode mit Farben: Lerne Handpan anders mit Handpan Constellation Studio.",
    "heroEyebrow": "Musiker · Pädagoge · Erfinder",
    "heroTitleA": "Ich mache Musik",
    "heroTitleHighlight": "sichtbar",
    "heroTitleB": "und für alle zugänglich",
    "heroLead": "Mit Farben, Geometrie und Emotionen. Vom neugierigen Kind bis zum erfahrenen Musiker – ich begleite dich persönlich.",
    "ctaShowroom": "In Paris ausprobieren",
    "ctaMethod": "Meine Lern-App entdecken",
    "universHeading": "Ausrüstung, Unterricht und App",
    "universEyebrow": "Eine Vision, mehrere Wege",
    "universIntro": "Alles beginnt mit derselben Idee: Musik verständlich, einprägsam und für alle spielbar zu machen.",
    "univers": [
      {
        "sub": "Akustisch & elektronisch",
        "title": "Instrumente & Mikrofone",
        "text": "Ein akustischer Yishama-Handpan, ein elektronischer Neotone-Handpan, Mikrofone – zwei Welten, in denen ich dich gleichermaßen begleite.",
        "cta": "Beide Welten ansehen"
      },
      {
        "sub": "Online & vor Ort",
        "title": "Unterricht",
        "text": "Lerne Handpan anders: mit Farben, Formen und Emotionen. Überall auf der Welt oder in Paris.",
        "cta": "Zum Unterricht"
      },
      {
        "sub": "Akustisch & Neotone",
        "title": "Handpan Constellation Studio",
        "text": "Die App, die Musik sichtbar macht, auf deinem akustischen Handpan wie auf dem Neotone: Farben, Geometrie und Emotionen.",
        "cta": "App entdecken"
      }
    ],
    "duoEyebrow": "Die Welt des UND",
    "duoTitleA": "Akustisch",
    "duoTitleAnd": "und",
    "duoTitleB": "elektronisch",
    "duoIntro": "Keine Konkurrenz, sondern Ergänzung. Zwei Welten, die nebeneinander bestehen – ich spiele beide, und keine ersetzt die andere.",
    "duo": [
      {
        "sub": "Akustischer Handpan · Yishama",
        "title": "Metall, das atmet",
        "text": "Zwei Instrumente mit 18 Tönen, auf 432 Hz gestimmt und mit Yonathan so entworfen, dass ich mich beim Singen selbst begleiten kann. Der Klang kommt direkt aus dem Metall – nichts steht zwischen ihm und dir.",
        "points": [
          "Klangfarbe und Obertöne des gehämmerten Metalls",
          "Kein Kabel, kein Akku: überall und sofort spielbereit",
          "Ich bin Botschafter und Affiliate-Partner von Yishama"
        ],
        "cta": "Meine Geschichte mit Yishama",
        "alt": "David Lesage mit einem seiner akustischen Yishama-Handpans"
      },
      {
        "sub": "Elektronischer Handpan · Neotone",
        "title": "Die Klaviatur der Tonleitern",
        "text": "Der elektronische Handpan von Soundventure, für den ich seit 2021 Betatester bin. Alle Tonleitern in einem einzigen Instrument, mit Kopfhörer wie auf der Bühne.",
        "points": [
          "Alle Tonleitern in einem einzigen Instrument",
          "Regelbare Lautstärke, Spielen mit Kopfhörer, eingebaute Aufnahmefunktion",
          "Ich bin offizieller Neotone-Botschafter"
        ],
        "cta": "Neotone entdecken",
        "alt": "David Lesage mit zwei elektronischen Neotone-Handpans"
      }
    ],
    "duoBridgeEyebrow": "Das Bindeglied",
    "duoBridgeTitle": "Meine App spricht beide Sprachen",
    "duoBridgeText": "Handpan Constellation Studio hat einen akustischen und einen elektronischen Modus. Wenn deine akustische Tonleiter nicht mehr reicht, sagt dir die Funktion „🎯 Ergänzen“ genau, welche Töne dir fehlen – und was ein zweiter akustischer Handpan oder ein Neotone dazubringen würde. Deine beiden Handpans erscheinen dann nebeneinander, und jeder Akkord landet auf dem Handpan, der ihn spielen kann. Ergänzung statt Konkurrenz.",
    "duoBridgeCta": "Handpan Constellation Studio entdecken",
    "whyEyebrow": "Warum ich",
    "whyTitle": "Das Werkzeug, das ich mir als Kind im Unterricht gewünscht hätte",
    "whyP1": "Mit 4 Jahren habe ich mit dem Schlagzeug angefangen. Schon in der ersten Stunde musste ich Notenlesen und Musiktheorie lernen – eine Sprache, die nichts mit meiner Lust am Spielen zu tun hatte. Ich habe alles hingeworfen und mir das Spielen selbst beigebracht, nach Gehör.",
    "whyP2": "Das Konservatorium habe ich mit dem Ersten Preis im Fach Schlagzeug, mit Auszeichnung, verlassen … aber entmutigt von einer Harmonielehre, die mich nicht erreicht hat. Also habe ich das Werkzeug geschaffen, das mir gefehlt hat: einen visuellen Zugang zur Musik.",
    "whyCta": "Meine Geschichte lesen",
    "showroomBadge": "★ Weltpremiere",
    "showroomTitle": "Der einzige Ort der Welt außer bei den Herstellern in Budapest, an dem du deinen Neotone testen und gleich mitnehmen kannst",
    "showroomText": "In Paris (20. Arrondissement): Probier die Instrumente aus, lern die Community kennen und nimm deinen Handpan noch am selben Tag mit – ganz ohne Wartezeit auf die Fertigung, zum besten Preis auf dem Markt (−7 %).",
    "showroomArgs": [
      "7 % Rabatt – der beste Preis (gegenüber 5 % online)",
      "Keine Fertigungs- oder Wartezeit",
      "Extrem begrenzter Bestand – nur wenige Instrumente verfügbar"
    ],
    "showroomCta1": "Besuch im Showroom reservieren",
    "showroomCta2": "Nächstes Treffen ansehen",
    "showroomDatesTitle": "Nächste kostenlose Treffen",
    "showroomDatesNote": "Eintritt frei · Anmeldung empfohlen",
    "showroomDatesEmpty": "Die nächsten Termine sind in Vorbereitung – schreib mir, dann sage ich dir als Erstes Bescheid.",
    "showroomDatesAll": "Alle Termine ansehen",
    "communityEyebrow": "Die Community",
    "communityTitle": "Schließ dich der Bewegung für sichtbare Musik an",
    "communityIntro": "Erfahre von den nächsten Treffen in Paris und vom Start von Handpan Constellation Studio. Kein Spam – nur das Wichtigste.",
    "communityPlaceholder": "deine@email.de",
    "communityButton": "Über die nächsten Treffen informieren",
    "communityNote": "Ein kurzes Formular öffnet sich: Du gibst deinen Namen und deine E-Mail-Adresse an und bekommst die nächsten Termine sofort per E-Mail.",
    "proofEyebrow": "Zuerst der Klang",
    "proofTitle": "Die Instrumente lebendig sehen und hören",
    "proofIntro": "Ich spiele, ich zeige, ich gebe weiter – akustisch und elektronisch, im Video. Meine beiden vollständigen Playlists findest du direkt darunter.",
    "proofVideos": [
      "Musikalische Performance auf dem Neotone",
      "Shape of My Heart – auf meinen beiden Yishama",
      "Eigene Tonleiter erstellen – Tutorial"
    ],
    "proofCta": "Ganze Neotone-Playlist ansehen",
    "proofCtaYishama": "Ganze Yishama-Playlist ansehen"
  },
  "neotone": {
    "title": "Neotone: elektronischer Handpan, Preise und Probespielen in Paris | David Lesage",
    "description": "Der Neotone, elektronischer Handpan mit Begleitung durch David Lesage: −5 % online, −7 % im Showroom, 6 Jahre Garantie, Preisrechner nach Land.",
    "heroEyebrow": "Ausrüstung · Digitaler Handpan",
    "heroTitle": "Der Neotone, der beste elektronische Handpan der Welt",
    "heroLead": "Kaufst du über mich, den offiziellen Neotone-Botschafter, bekommst du <strong class=\"text-cream\">−5 % online</strong> (oder <strong class=\"text-cream\">−7 % im Showroom</strong>), <strong class=\"text-cream\">6 Jahre Garantie</strong> und eine persönliche Begleitung, vom Probespielen bis zum Auspacken.",
    "ctaCalc": "Preis berechnen",
    "ctaShowroom": "Besuch im Showroom buchen",
    "modelsEyebrow": "Die beiden Modelle",
    "modelsTitle": "Wähle das Instrument, das zu dir passt",
    "modelsIntro": "Alle Tonleitern. Ein einziges Instrument.",
    "fromPrice": "Ab",
    "woodsEyebrow": "Premium-Hölzer",
    "woodsTitle": "Fünf Holzarten, fünf Charaktere",
    "woodsIntro": "Esche und Eiche sind im Grundpreis enthalten. Drei weitere Edelhölzer gibt es als Option, jedes mit eigenem Farbton und eigenem Charakter.",
    "woodCardCta": "Details ansehen",
    "woodModalEyebrow": "Holzart",
    "woodModalViewTop": "Ansicht von oben",
    "woodModalViewBottom": "Ansicht von unten",
    "techEyebrow": "Unter der Haube",
    "techTitle": "Präzisionstechnik, von Hand montiert",
    "techText": "Jeder Neotone¹ wird in Budapest in Handarbeit entwickelt und gebaut. Unter dem Edelholz erfassen millimetergenaue Sensoren gleichzeitig Anschlag, Druck und Position und geben so die Dynamik eines akustischen Handpans originalgetreu wieder. Professionelle Audioelektronik (DAC 24 Bit / 384 kHz, Latenz 5 ms, Signal-Rausch-Abstand 112 dB) macht ihn zu einem digitalen Instrument ohne Kompromisse.",
    "specsTitle": "Offizielle technische Daten",
    "stageEyebrow": "Bühne & Studio",
    "stageTitle": "Der digitale Handpan schlechthin",
    "stageIntro": "Ein einziger Handpan, unendlich viele Möglichkeiten: Der Neotone hebt die Grenzen der Akustik auf und eröffnet ein ganz neues Spielfeld.",
    "stage": [
      {
        "t": "Nie wieder Ärger mit der Beschallung",
        "d": "Keine Rückkopplung mehr, keine Mühe mehr, dich selbst zu hören. Ein einziges Klinkenkabel, ein Soundcheck in wenigen Sekunden, und du kannst dein Spiel loopen und deine Pedale anschließen."
      },
      {
        "t": "Ein Studio im Instrument",
        "d": "Eingebauter Recorder: Halte den Ding gedrückt, um eine Aufnahme zu starten. Der Klang wird direkt an der Quelle abgenommen, in Studioqualität, selbst in lauter Umgebung."
      },
      {
        "t": "Deine Klangblase, mit Kopfhörern",
        "d": "Schließ Kopfhörer an und spiel, ohne jemanden zu stören: nachts, in der Wohnung, auf Tour. Eine außergewöhnliche Klangreinheit."
      }
    ],
    "compEyebrow": "Akustisch vs. Neotone",
    "compTitle": "Der akustische Handpan hat seine Grenzen –<br><span class=\"text-copper\">der Neotone hebt sie auf</span>",
    "compIntro": "Was die Elektronik konkret verändert.",
    "compLegendAco": "Akustischer Handpan",
    "compLegendNeo": "Elektronischer Neotone",
    "calcEyebrow": "Preisrechner",
    "calcTitle": "Was kostet mich mein Neotone wirklich?",
    "calcIntro": "Wähle deine Kaufart, dein Modell, dein Holz und dein Land: Der Rechner wendet den richtigen Rabatt und die MwSt. 2026 an.",
    "offreBadge": "Gratis",
    "offreTitre": "Ein Jahr App geschenkt für jeden Neotone, den du über mich kaufst",
    "offreTexte": "Der Tarif Studio von Handpan Constellation, also 89 € geschenkt, online wie im Showroom. Das Jahr beginnt mit deiner ersten Anmeldung, sobald dein Kauf registriert ist.",
    "offreListe": ["<b>Der Logik-Modus.</b> Du wechselst die Tonart, deine Akkorde bleiben unter denselben Fingern.", "<b>Neotone Connexion.</b> Du bereitest deine Tonleitern in der App vor, und sie landen auf deinem Neotone.", "<b>Die Duos.</b> Zusammen spielen zwei Instrumente Akkorde, die keines von beiden allein spielen kann."],
    "offreCta": "App entdecken",
    "bandeauBadge": "Neu",
    "bandeauTexte": "Dein Neotone kann alles spielen. Jetzt siehst du es auch. Entdecke die App",
    "calcDisclaimer": "Die angezeigten Listenpreise enthalten bereits den weltweiten Versand. MwSt.-Normalsätze 2026. Außerhalb der EU: keine EU-MwSt., aber bei der Lieferung können örtliche Zollgebühren anfallen, die du selbst trägst.",
    "stockPillIn": "Auf Lager in Paris",
    "stockPillSoon": "Kommt bald",
    "stockPillSoonDate": "Kommt am {period}",
    "stockPillSoonMonth": "Kommt im {period}",
    "stockPillOrder": "Auf Bestellung",
    "stockOnlineAlsoIn": "Dieses Modell steht auch im Showroom in Paris: Du kannst vorbeikommen, es ausprobieren und gleich mitnehmen (−7 %).",
    "stockOnlineSwitch": "Zum Kauf im Showroom wechseln",
    "whyEyebrow": "Zwei Modelle",
    "whyTitle": "Warum ein Instrument mit 10 oder mit 19 Tönen?",
    "whyP": ["Der <strong>Neotone¹ (10 Töne)</strong> eignet sich sehr gut, um den Handpan zu <strong>entdecken</strong>, zu <strong>meditieren</strong> und in einer Tonleiter zu <strong>improvisieren</strong>.", "Der <strong>Neotone¹ Mutant (19 Töne)</strong> ist dafür gemacht, dein <strong>Hauptinstrument</strong> zu werden oder bei bekannten Liedern <strong>den Gesang zu begleiten</strong>.", "Mit ihm spielst du alle <abbr title=\"Mindestens drei Töne, die zusammen erklingen, zum Beispiel C, E, G.\">Akkorde</abbr> (<abbr title=\"Der Platz eines Akkords in einer Tonart, nummeriert von I bis VII.\">Stufen</abbr>) der <abbr title=\"Die Bezugstonleiter eines Stücks, zum Beispiel C-Dur oder a-Moll.\">Tonarten</abbr> in Dur und Moll auf ein und derselben Tonleiter: I Gleichgewicht, II Schwung, III Abenteuer, IV Entspannung, V Spannung, VI Nostalgie, VII Geheimnis."],
    "whyLinkIntro": "Mehr dazu:",
    "whyLinkCapo": "Der Kapodaster für den Handpan: dieselbe Form in allen Tonarten",
    "whyCap10": "Neotone¹ – 10 Töne",
    "whyCap19": "Neotone¹ Mutant – 19 Töne",
    "whySchema": "Vereinfachte Darstellung, Ansicht von oben: Jeder Punkt ist ein Ton.",
    "whyAlt10": "Darstellung eines Handpans von oben mit 10 Tönen: der Ding in der Mitte und 9 Töne ringsum.",
    "whyAlt19": "Darstellung eines Handpans von oben mit 19 Tönen: der Ding in der Mitte, 9 große Töne im Kreis und 9 kleine Töne direkt innerhalb davon.",
    "procEyebrow": "Kaufablauf",
    "procTitle": "Von deiner ersten Frage bis zur Lieferung",
    "procIntro": "Ein einfacher, transparenter Ablauf, mit Begleitung von Anfang bis Ende. Zwei Wege zu deinem Neotone:",
    "procHighlight": "Kommst du in den Showroom in Paris, nimmst du dein Instrument noch am selben Tag mit, ganz ohne Wartezeit für die Fertigung.",
    "procOnlineTitle": "Online – weltweiter Versand",
    "procShowroomTitle": "Vor Ort – Paris (20. Arr.)",
    "procShowroomVideoEyebrow": "Der Rundgang als Video",
    "procShowroomVideoTitle": "So sieht der Ort aus, an dem du ihn ausprobierst",
    "procShowroomVideoText": "Bevor du dich auf den Weg machst, kannst du dir schon ansehen, wohin du kommst: Ich nehme dich mit auf einen Rundgang durch meinen Showroom in Paris, mit dem Neotone im Mittelpunkt.",
    "procShowroomVideoAudio": "Das Video gibt es auch auf Englisch: Wenn dir das lieber ist, wähle in den Einstellungen (⚙) des Players in der Zeile „Audiotrack“ die englische Tonspur.",
    "inclEyebrow": "Alles im Preis inbegriffen",
    "inclTitle": "Was du bekommst",
    "extrasEyebrow": "Zusätzlich einplanen",
    "extrasTitle": "Was du noch dazukaufen musst",
    "extrasIntro": "Der Neotone ist komplett, aber um ihn zu hören und voll auszuschöpfen, plane je nach Einsatz dieses kleine Zubehör ein.",
    "extrasSpeakerCta": "Lesen: der richtige Platz im Klang",
    "extrasHeadphonesCta": "Lesen: Welcher Kopfhörer passt?",
    "bridgeEyebrow": "Dein Neotone + die visuelle Methode",
    "bridgeTitle": "Lerne mit Farben und Formen",
    "bridgeText": "Mit Handpan Constellation Studio lernst du mit Farben und Formen, auf deinem Neotone genauso wie auf einem akustischen Handpan.",
    "bridgeCta": "Methode entdecken",
    "trustEyebrow": "Vertrauensbeweis",
    "trustTitle": "Ich kenne die Menschen persönlich, die deinen Neotone bauen",
    "trustP1": "Ich war mehrmals in den Werkstätten in Ungarn. Ich kenne Csaba und Norbert persönlich, die beiden Freunde, die den Neotone ins Leben gerufen haben, und ebenso das ganze Team: Gergely, Dániel und die Handwerker von MAG Instruments, und Yonathan von Yishama.",
    "trustP2": "Ich bin seit 2021 offizieller Beta-Tester der Marke. Seit dem allerersten Neotone¹ habe ich Tausende von Bugs gemeldet und beheben lassen und unzählige Verbesserungen vorgeschlagen. Kaufst du über mich, hast du keinen einfachen Händler vor dir, sondern jemanden, der das Instrument von innen heraus lebt und es weiterentwickelt.",
    "trustYishamaLink": "Meine Geschichte mit Yonathan und meinen zwei Yishama-Handpans",
    "trustCaption1": "Test- und Debugging-Session mit dem Team in der Werkstatt.",
    "trustCaption2": "Mit dem Neotone-Team bei einem meiner Besuche in Ungarn.",
    "faqEyebrow": "FAQ",
    "faqTitle": "Alle Antworten, bevor du loslegst",
    "faqOutro": "Hast du noch weitere Fragen? Schreib mir an",
    // chantier 44 : jamais traduit avant la relecture du 04/11/2026
    "stockTitle": "Was gerade verfügbar ist",
    "stockAvailTitle": "Sofort verfügbar",
    "stockSoonTitle": "Bald verfügbar",
    "stockArrivalPrefix": "erwartet am",
    "stockArrivalPeriod": "voraussichtliche Ankunft im Showroom: {period}",
    "stockNote": "Diese Instrumente stehen bei mir in Paris: Du kannst vorbeikommen und sie ausprobieren, bevor du dich entscheidest. Der Bestand ändert sich, und bestellt wird anschließend bei Neotone.",
    "stockNoteLink": "Zum Showroom",
    "stockModelBadge": "Auf Lager",
    "stockModelIn": "Auf Lager: {woods}",
    "stockModelInLink": "zum Ausprobieren im Showroom (−7 %)",
    "stockModelOut": "Derzeit nicht auf Lager",
    "stockModelOutLink": "online erhältlich (−5 %, Lieferung)",
    "stockModelSoon": "Bald auf Lager: {woods}",
    "stockModelSoonDate": "voraussichtliche Ankunft am {date}",
    "stockModelSoonPeriod": "voraussichtliche Ankunft: {period}",
  },
  "yishama": {
    "title": "Meine Yishama-Handpans: zwei Instrumente für eine Stimme | David Lesage",
    "description": "Die Geschichte meiner Begegnung mit Yonathan und Yishama: zwei akustische Handpans mit je 18 Tönen, gestimmt auf 432 Hz, maßgefertigt, um meine Stimme zu begleiten – und was am Ende daraus entstanden ist.",
    "heroEyebrow": "Meine akustischen Instrumente",
    "heroTitle": "Yishama: zwei Handpans, entstanden aus einer Begegnung",
    "heroLead": "Zwei Instrumente mit je 18 Tönen, gestimmt auf <strong class=\"text-cream\">432 Hz</strong>, entworfen mit <strong class=\"text-cream\">Yonathan</strong> aus einem einzigen Grund: damit ich singen und mich dabei selbst begleiten kann. Hier ist ihre Geschichte – und was sie mich gelehrt haben.",
    "heroCtaVideo": "Shape of My Heart anhören",
    "heroCtaStory": "Geschichte lesen",
    "heroImgAlt": "David Lesage hält einen seiner beiden Yishama-Handpans, die Töne auf der Unterseite sind zu sehen",
    "metEyebrow": "Naxos, Griechenland · 2022",
    "metTitle": "Ein Mann, dem ich zufällig begegnete, am Tag nach einem Konzert",
    "metP1": "Am Abend zuvor hatte ich ein Konzert mit Handpan und Gesang gegeben. Am nächsten Tag treffe ich an der Außenbar des Festivals einen Mann. Ich weiß nicht, wer er ist. Man erklärt mir, dass er einer der besten Handpan-Bauer der Welt ist.",
    "metP2": "Ich erzähle ihm von meinem Traum, den ich seit Jahren mit mir trage: „ein Handpan-Klavier“. Singen können, Coversongs spielen, meine Stimme begleiten – ohne mich in einem einzigen Modus im Kreis zu drehen.",
    "metP3": "Er hat mir lange und ruhig zugehört. Er hat nicht versucht, mir seine Instrumente zu verkaufen. Er hat sogar gesagt, bei meinem sehr perkussiven Spiel sei er nicht sicher, ob seine zu mir passen.",
    "metP4": "An diesem Tag, auf dieser kleinen Insel, habe ich die internationale Handpan-Welt entdeckt: Instrumente mit Tönen oben und unten, tiefe Bässe, eine Qualität, die ich nicht einmal geahnt hatte.",
    "metQuote": "Als ich Yonathan, den CEO von Yishama, und seine Frau Andréa kennenlernte, spürte ich sofort die Feinheit und die Tiefe des Menschen, der mir gegenüberstand.",
    "metQuoteSource": "Was ich damals auf meiner alten Website schrieb",
    "metPhotoAlt": "David Lesage mit Yonathan und Andréa von Yishama",
    "metPhotoCaption": "Mit Yonathan und Andréa: der Anfang einer langen Geschichte.",
    "roomEyebrow": "HUG-Festival, Ungarn",
    "roomTitle": "Er kam mit einem Bleistift auf mein Zimmer",
    "roomP1": "Ein paar Monate später, beim HUG-Festival in Ungarn, kam Yonathan mit Andréa auf mein Zimmer. Er fing an, mir Fragen zu stellen. Und zu zeichnen.",
    "roomP2": "Ich verstand nicht viel davon: Von Technik habe ich keine Ahnung. Ich wusste nur, was ich <em>hören</em> wollte. Er übersetzte das in Tonfelder, Materialstärken, Oktaven. Nur eine technische Sache war mir wichtig: möglichst viele nach außen gewölbte Töne auf der Unterseite, wie ein Ding – sie sprechen viel leichter an als die eingewölbten Tonfelder.",
    "roomP3": "Bei allem anderen habe ich ihm voll vertraut. Da hat er beschlossen, mich zum Botschafter seiner Marke zu machen. Aber vorher hatte er sich für mich interessiert – wirklich, aufrichtig. Dann hat er mich bei sich in Budapest aufgenommen, bevor ich wieder ins Flugzeug stieg.",
    "roomAside": "Schon ein paar Monate vorher hatte er mir den Link zu ihrem <em>Virtual Pantam</em> geschickt: „Bau in der App das Instrument, von dem du träumst, und schick mir dann den Link zu dem, was du entworfen hast.“ Wochenlang haben wir uns diese Links hin und her geschickt.",
    "whyEyebrow": "Der Grund dahinter",
    "whyTitle": "Warum zwei Handpans – und warum genau diese",
    "whyIntro": "Das sind nicht zwei Instrumente nebeneinander. Es ist ein einziges System in zwei Teilen, gedacht für eine Stimme.",
    "whyP1": "Der Handpan ist ein wunderschönes und eigensinniges Instrument. Eine Tonleiter ist eine Entscheidung – also ein Verzicht. Neun oder zehn Töne, und es wird immer <strong>der eine</strong> fehlen, mit dem der Akkord spielbar würde, von dem du träumst.",
    "whyP2": "Für einen Sänger ist es noch schlimmer. Eine Stimme zu begleiten braucht <strong>Grundtöne im Bass</strong>: Ohne sie spielt man Umkehrungen, und die Stimme hat keinen Boden mehr unter den Füßen. Ich wollte meinen Gesang auf den tiefsten Ton jedes Akkords setzen und dann das Arpeggio hinaufsteigen – D3-F♯3-A3 auf einem D2, B♭2-D3-F3-B♭3.",
    "whyP3": "Mein Wunsch passte in einen Satz: zwei Instrumente, die mir zusammen alle Kreuze und alle Bs geben. Damit ich in jeder Tonart singen kann, mit dem Grundton jedes Akkords im Bass.",
    "whyQuote": "Mein Traum ist, mich beim Singen in allen Tonarten mühelos am Handpan zu begleiten, mit dem größtmöglichen Tonumfang, ohne durch fehlende Töne eingeschränkt zu sein.",
    "whyQuoteSource": "Absichtserklärung, 22. November 2022",
    "why432Title": "Und warum 432 Hz",
    "why432Text": "Mich fasziniert, wie Schwingung auf Wasser und auf den Körper wirkt – die Kymatik. Deshalb habe ich Yonathan um eine Stimmung auf Basis des Kammertons A = 432 Hz gebeten. Er antwortete, das sei möglich, aber er müsse sich dessen sicher sein, <em>bevor</em> er mit dem Stimmen beginnt: Bei einem Handpan lässt sich diese Entscheidung nicht rückgängig machen.",
    "recEyebrow": "Mai 2023",
    "recTitle": "Der Tag, an dem sie ankamen",
    "recIntro": "Ich habe keine schönen Aufnahmen von diesem Moment. Ich habe die, die ich mit meinem Handy gemacht habe, in der Reihenfolge, in der alles passiert ist: der Lieferwagen, die Kiste, die Tasche, das Instrument – dann der Brief, und der Tag danach.",
    "recCaption1": "Mai 2023, bei Einbruch der Nacht. Der Lieferwagen steht noch vor dem Haus, und die beiden Kisten sind schon da. Das Foto ist unscharf und dunkel: Ich behalte es so, genau so habe ich geguckt.",
    "recCaption2": "Unter dem Karton und der Styropor-Polsterung eine zugeschraubte Sperrholzkiste. Auf dem Deckel ein Umschlag, mit rotem Wachs versiegelt. Durch den Spalt ahnt man schon den roten Rand der Tasche.",
    "recCaption3": "Die Hartschalentasche auf dem Parkett: mattschwarzes Camouflage, gesteppte Spirale, roter Rand an der Seite und in der Mitte das Yishama-Abzeichen.",
    "recCaption4": "Der Reißverschluss offen, und das Metall. Der Ding in der Mitte mit seinen Ringen, rundherum die Töne. Die Zeichnung, die Yonathan in meinem Zimmer begonnen hatte, war zu einem Gegenstand geworden.",
    "recPapersLead": "In der Kiste lagen auch die Papiere.",
    "recCaption5": "Derselbe Umschlag wie auf dem Foto der Kiste, diesmal geöffnet: das Wachssiegel neben dem Zertifikat.",
    "recCaption6": "Das Zertifikat des E 18, von Hand unterschrieben von Yhonatan Ale-Yahav: die Tonleiter, der Stahl, die achtzehn Töne, die Maße, das Gewicht, die Identifikationsnummer. Yishama nennt ihn „E Major 18“; auf dieser Seite ist E 18 mein Arbeitstitel.",
    "recCaption7": "Die Rückseite des Zertifikats: das Yishama-Logo, auf demselben strukturierten Papier.",
    "recNextDayLead": "Und am nächsten Tag hatte ich Geburtstag.",
    "recCaption8": "Die beiden Handpans auf ihren Ständern, das Tablet darüber, dahinter der offene Rahmen des Klaviers. Vierundzwanzig Stunden nach dem Lieferwagen.",
    "recZoomHint": "Klick auf ein Foto, um es groß zu öffnen, und blättere dann mit ‹ › durch alle acht. Das Zertifikat ist nur vergrößert lesbar.",
    "recAlt1": "Unscharfes Foto in der Dämmerung: David Lesage in Großaufnahme, mit weit offenem Mund und aufgerissenen Augen. Hinter ihm zwei große, gestapelte Versandkartons; auf dem unteren stehen das Logo und das Wort YISHAMA in großen Buchstaben, dazu die Versandetiketten. Im Hintergrund, hinter der Glastür, parkt der weiße Lieferwagen noch vor dem Haus.",
    "recAlt2": "Blick von oben in den geöffneten Karton: die weiße Styropor-Polsterung und darin eine helle Sperrholzkiste, an den Ecken mit sichtbaren Schrauben verschlossen. Auf dem Deckel, in einer Schutzhülle aus Plastik, ein Kraftpapier-Umschlag mit rotem Wachssiegel. Durch den Spalt unter dem Deckel sieht man die schwarze Tasche mit ihrem roten Rand.",
    "recAlt3": "Die Hartschalentasche des Handpans von oben, auf hellem Parkett: mattschwarzer Camouflage-Stoff, eine große, erhaben gesteppte Spirale, in der Mitte ein rechteckiges Abzeichen mit dem Wort YISHAMA, roter Rand an der Seite und ein umlaufender Reißverschluss.",
    "recAlt4": "Die geöffnete Tasche: darin der Handpan, dessen Metall ein warmes, goldenes und bronzefarbenes Licht zurückwirft. In der Mitte der Ding mit seinen konzentrischen Ringen; rundherum die Tonfelder, eingewölbt und gewölbt.",
    "recAlt5": "Auf einer Arbeitsplatte aus Holz: der Kraftpapier-Umschlag, jetzt geöffnet, mit seinem roten Wachssiegel und eingeprägtem Monogramm, neben dem Echtheitszertifikat auf strukturiertem Papier.",
    "recAlt6": "Das Echtheitszertifikat von Yishama, ganzseitig. Darauf steht: Certificate of Authenticity, Owner David Lesage, Year 2023, Scale E Major 18, Steel Type Stainless Steel, Notes (A B C♯ D♯) E / (F♯) G♯ B C♯ D♯ E F♯ G♯ A B C♯ D♯ E, Dimensions 53 × 53 × 28 cm, Weight 4,4 kg, der Vermerk „designed and produced at YISHAMA Workshop, Isfiya / Israel“, die handschriftliche Unterschrift von Yhonatan Ale-Yahav und die Identifikationsnummer 483.",
    "recAlt7": "Die Rückseite des Zertifikats: das Yishama-Logo, eine goldene Volute, über dem Wort YISHAMA in Großbuchstaben, auf strukturiertem Papier, unten auf der Seite die Adresse WWW.YISHAMA.COM.",
    "recAlt8": "David Lesage lächelt mit geneigtem Kopf im vollen Tageslicht. Vor ihm seine beiden Yishama-Handpans aus anthrazitgrauem Metall auf ihren Ständern; dahinter ein Tablet an einem Gelenkarm, der offene Rahmen eines Klaviers, in dem Saiten und Mechanik zu sehen sind, ein Bild mit einer orangefarbenen Blume des Lebens, elektronische Pads und eine Pedaleinheit.",
    "insEyebrow": "Die beiden Instrumente",
    "insTitle": "Je achtzehn Töne, angekommen im Mai 2023",
    "insIntro": "Sie kamen in gesicherten Holzkisten an, Hartschalentaschen inklusive – fast genau an meinem Geburtstag.",
    "insDing": "Ding",
    "insTop": "Oberseite",
    "insBottom": "Unterseite",
    "insNotes": "Töne",
    "insTuning": "Gestimmt auf 432 Hz",
    "insCredit": "Made by Yishama – entworfen von <strong>Yhonatan Ale-Yahav</strong>. Diese beiden Tonleitern stehen in keinem Katalog: Beide wurden maßgefertigt.",
    "insCreditBrief": "Das Lastenheft stammt von mir, und es ist das eines Sängers: mich am Handpan begleiten können, wie es ein Gitarrist oder ein Pianist tun würde. Also alle Akkorde spielen können, in allen Tonarten, mit dem Grundton jedes Akkords als Basston – und mit einem Ding. Ich wusste nicht, wie das gehen sollte. Yonathans Scharfsinn hat es möglich gemacht.",
    "insFootnote": "Es sind Einzelstücke. Die Namen sind meine Arbeitstitel, keine Modelle aus dem Yishama-Katalog. Jedes Instrument liefert für sich allein die sieben Stufen seiner Tonleiter, mit dem Grundton im Bass.",
    "insAppAlt": "Bildschirmfoto von Handpan Constellation Studio, Reiter Logik: meine beiden Yishama-Handpans nebeneinander gezeichnet, alle ihre Töne als farbige Punkte dargestellt – links der E 18 (Ding E3), rechts der D Kurd 18 (Ding D3), die Töne der Unterseite inbegriffen. Die Leiste oben zeigt 6 Akkorde mit dem E 18, 6 mit dem D Kurd 18 und 24 mit beiden zusammen. Darunter die sieben Stufen der beiden zusammen: I Gleichgewicht E, II Schwung F♯m, III Abenteuer G♯m, IV Entspannung A, V Spannung H, VI Nostalgie C♯m, VII Geheimnis D♯°.",
    "insAppCaption": "Meine beiden Tonleitern vereint in meiner App: sechs Akkorde mit der einen, sechs mit der anderen – und vierundzwanzig, wenn sie zusammen spielen. Genau diese Zahl zeigt, dass Yonathan mir nicht zwei Instrumente gebaut hat, sondern ein System.",
    "insAppZoomHint": "Dichtes Bild: öffne das Bildschirmfoto und klicke dann noch einmal darauf, um es in Originalgröße zu sehen – erst dann lassen sich die Notennamen lesen.",
    "lightbox": {
      "close": "Schließen",
      "prev": "Vorheriges Foto",
      "next": "Nächstes Foto",
      "zoom": "Foto vergrößern"
    },
    "pairEyebrow": "Zusammen",
    "pairTitle": "Ein chromatischer Handpan in zwei Teilen",
    "pairIntro": "Jeder für sich deckt seine Tonleiter ab. Zusammen decken ihre 36 Töne alle zwölf Halbtöne ab – ohne Ausnahme.",
    "pairP1": "Alle 24 Dur- und Mollakkorde werden spielbar, und <strong>jeder hat seinen Grundton im Bass</strong>. Also genau das, worum ich gebeten hatte: nie wieder eine Umkehrung spielen müssen, weil der Bass fehlt.",
    "pairP2": "Yonathan hat, ohne es je so zu nennen, einen chromatischen Handpan in zwei Teilen gebaut. Er hat die beiden übrigens als System gedacht: Beim ersten hat er einen Ton weggelassen, weil ich ihn schon auf dem zweiten hatte – um Platz für einen anderen zu schaffen.",
    "pairHonest": "Eine ehrliche Einschränkung: Das beschreibt die <em>Verfügbarkeit der Töne</em>, noch nicht den Fluss der Bewegung. Mitten im Akkord von einem Handpan zum anderen zu wechseln, bleibt eine Turnübung. Genau dieses Problem hat am Ende meine App hervorgebracht.",
    "bandeauBadge": "Neu",
    "bandeauTexte": "Dein Yishama spielt mehr, als du denkst. Jetzt siehst du es auch. Entdecke die kostenlose App",
    "pairAppCta": "Sieh, was die App auf deinem Handpan zeigt",
    "pairFactLabels": {
      "notes": "Töne insgesamt",
      "keys": "Tonarten",
      "chords": "Dur- & Mollakkorde",
      "tuning": "Kammerton"
    },
    "pairPhotoAlt": "David Lesage spielt seine beiden Yishama-Handpans, die nebeneinander stehen",
    "pairPhotoCaption": "Die beiden Instrumente nebeneinander – ein Bild aus meiner Coverversion von Shape of My Heart.",
    "metalEyebrow": "Das Metall",
    "metalTitle": "Drei Stähle, drei Stimmen",
    "metalIntro": "Bei Yishama ist das Metall kein Detail der Verarbeitung: Es ist die erste Entscheidung, und sie bestimmt Klangfarbe, Sustain und Pflege. Drei Familien stehen zur Wahl – klick für die Details.",
    "metalCardCta": "Details ansehen",
    "metalPhotoCredit": "© Yishama",
    "metalPhotoAlts": {
      "nitrure": "Handpan Yishama A Minor 17 von oben auf schwarzem Grund: blaugraue Oberfläche, gesprenkelt mit bronzefarbenen Reflexen, der Ding in der Mitte und rund fünfzehn Tonfelder ringsum.",
      "inox": "Handpan Yishama G2 Hijaz 18 von oben auf schwarzem Grund: seidenmatte, bronzebraune Oberfläche, der Ding in der Mitte und etwa ein Dutzend sichtbare Tonfelder.",
      "ember": "Handpan Yishama F2 Astronaut von oben auf schwarzem Grund: glänzend goldene Oberfläche, der Ding in der Mitte und etwa ein Dutzend sichtbare Tonfelder."
    },
    "metalOption": "Auf der Website von Yishama wählt man den Stahl bei der Bestellung, wie eine Option des Instruments. Bei den Modellen oben bietet die Auswahl Edelstahl oder Ember Steel an; nitrierter Stahl ist dort nicht dabei.",
    "metalModalEyebrow": "Stahlsorte",
    "metalModalClose": "Schließen",
    "metalLabelSound": "Der Klang",
    "metalLabelCare": "Die Pflege",
    "metalLabelBest": "Ideal für",
    "metalSource": "Quelle: der Artikel „Nitrided handpan vs stainless handpan“, veröffentlicht von Yishama, und ihr Online-Katalog (abgerufen am 9. September 2026). Der Preis eines Yishama hängt von der Tonleiter ab, von der Anzahl der Töne, den Tönen auf der Unterseite und der Art des Materials.",
    "metalNote": "Seit 2021 trägt jeder Yishama innen eine Lasergravur: Seriennummer, Name der Tonleiter und Materialart mit ihrer Stärke.",
    "makerEyebrow": "Der Hersteller",
    "makerTitle": "Wer ist Yishama",
    "makerIntro": "Eine israelische Manufaktur, die auch in Ungarn vertreten ist und zu den besten Handpan-Herstellern der Welt gehört.",
    "makerP1": "„Yishama“ kommt aus dem Hebräischen (יִשָּׁמַע) und bedeutet <em>gehört werden</em>. Die Absicht, wie sie sie selbst formulieren: eine Klangskulptur schaffen, die jedem eine einzigartige Erfahrung der Selbsterkundung schenkt, durch Klang, Rhythmus und Harmonie. Das Motto des Hauses passt in eine Zeile: „At Yishama, we strive for quality and passion.“",
    "makerP2": "Yonathan und sein Team bauen Instrumente mit sehr tiefen Bässen und funkelnden Höhen. Als ich Kabeção, Nadishana, David Kuckhermann, Alexandre Lora oder Flavio Salvaje auf diesen Instrumenten spielen hörte, wusste ich: Mit genau diesen wollte ich arbeiten.",
    "makerFactsTitle": "Was sie selbst sagen",
    "makerFacts": [
      {
        "t": "Jedes Instrument ist signiert",
        "d": "Seit 2021 nennt eine Lasergravur im Inneren die Seriennummer, den Namen der Tonleiter und das Material mit seiner Stärke."
      },
      {
        "t": "Die Maße",
        "d": "Etwa 55 cm Durchmesser am äußeren Rand, 28 cm Höhe vom Boden bis zur Oberseite des Dings und 4,4 kg bei den meisten Modellen."
      },
      {
        "t": "Das erste Nachstimmen ist kostenlos",
        "d": "Mit sauberer Spieltechnik bleibt ein Yishama jahrelang gut gestimmt. Das erste Nachstimmen ist kostenlos – nur die Versandkosten trägst du selbst."
      },
      {
        "t": "Jedes Stück ist ein Unikat",
        "d": "Keine im Voraus angekündigte Lieferzeit: Die Fertigung ist Handarbeit und nach Maß. Manchmal haben sie ein paar Instrumente sofort verfügbar."
      }
    ],
    "makerCta": "Die Handpans von Yishama entdecken",
    "makerDisclosure": "Transparenz: Ich bin Botschafter von Yishama und Teil ihres Partnerprogramms. Wenn du über meinen Link kaufst, bekomme ich eine Provision – an deinem Preis ändert das nichts. Ich vertrete nur Hersteller, deren Arbeit ich wirklich liebe.",
    "videosEyebrow": "Zum Anhören",
    "videosTitle": "Was ich mit ihnen aufgenommen habe",
    "videosIntro": "Ein Cover von Sting, ein Gebet, ein ungarisches Volkslied, französischer Rap. Alles gespielt auf den beiden Yishama-Handpans, in 432 Hz.",
    "videosFeaturedLabel": "Das Video, das Yonathan berührt hat",
    "videosFeaturedTitle": "Shape of My Heart – Sting",
    "videosFeaturedText": "Als ich es ihm geschickt habe, hat er mir geantwortet: „wow wow wow very very beautiful! […] your voice is incredible, touch my heart very much! I would love to share this with our Yishama audience.“",
    "videosPlaylistCta": "Die ganze Yishama-Playlist ansehen",
    "videosWatch": "Ansehen",
    "bridgeEyebrow": "Was diese beiden Handpans hervorgebracht haben",
    "bridgeTitle": "Die Methode konnte mir niemand geben – es gab sie nicht",
    "bridgeP1": "Ich war glücklich und völlig verloren. Zwei wunderschöne, sehr komplexe Instrumente, angekommen ohne Gebrauchsanleitung. Als hätte man mir zwei Raumschiffe anvertraut – nur dass das Flughandbuch nirgends geschrieben stand, für niemanden.",
    "bridgeP1b": "Der Handpan ist ein Instrument des <strong>21. Jahrhunderts</strong>, noch mitten in seiner Entwicklung: Hinter ihm stehen weder die Jahrhunderte Klavierpädagogik noch die der Gitarre. Und er kann nicht einmal <em>eine</em> Methode haben – es gibt so viele Handpans wie Tonleitern, Layouts und Tonanzahlen. Was auf einem Instrument stimmt, stimmt auf dem daneben schon nicht mehr. Das hat niemand versäumt: Es ist die Jugend eines lebendigen Instruments.",
    "bridgeP1c": "Dazu kommt, was seinen Zauber ausmacht: Der Handpan ist meistens ein <strong>modales</strong> Instrument. Das ist eine Stärke und ein wunderbarer Einstieg – gerade wenn man nie Musik gemacht hat, bekommt man fast sofort ein schönes Ergebnis, ohne Theorie. Aber man dreht sich auch sehr schnell im Kreis. Und sobald man Berufsmusiker ist, Chromatik erwartet oder echte Lieder dazu singen will – mein Fall –, wird es sehr komplex, und zwar sehr schnell. Ich kam vom Schlagzeug, einem rein rhythmischen Instrument: Ich hatte keinerlei Grundlagen in Harmonielehre, auf die ich mich stützen konnte.",
    "bridgeP2": "Im August 2023 habe ich ein Dokument angefangen, um endlich zu sehen, wie ich meine Akkorde auf meinen beiden Handpans zusammensetzen kann. Farbige Karten, eine Farbe pro Ton. <strong>Aus diesem Dokument wurde Handpan Constellation Studio.</strong>",
    "bridgeDocAlt": "Seite eines im August 2023 von Hand erstellten Dokuments mit dem Titel „Complete handpan Maping of placment of notes on the handpans by type of note“ / „Vollständige Übersicht über die Lage der Töne auf den Handpans, nach Notennamen geordnet“ (Originalschreibweise). Links der Korpus des E 18 auf ockerfarbenem Grund, sein Ding E3 in der Mitte und alle seine Töne ringsum als farbige Punkte; rechts der Korpus des D Kurd 18 auf cremefarbenem Grund, sein Ding D3 in der Mitte, seine Töne genauso angeordnet, die auf der Unterseite eingeschlossen. Unten ein chromatisches Raster über vier Oktaven, von C2 bis H5: Die Felder der tatsächlich vorhandenen Töne sind ausgemalt, die anderen bleiben blass. Jeder Notenname hat seine Farbe, in allen Oktaven dieselbe: C in Rot, D in Orange, E in Gelb, F in Grün, G in Cyan, A in Blau, H in Magenta. Rechts gibt eine kleine Tabelle „Reminder / Rappel“ die Entsprechung an: C = Do, D = Ré, E = Mi…",
    "bridgeDocCaption": "August 2023, Seite 4 von 21 dieses Dokuments: meine beiden Handpans von Hand gezeichnet, mit allen ihren Tönen, und darunter die vier Oktaven, in denen ich die Töne ausmalte, die ich wirklich besaß. Eine Farbe pro Notenname, egal in welcher Oktave – das ist schon die Regel der ChromaKeys in der App, drei Jahre bevor es sie gab. Fertig geworden bin ich nie: Ich habe unterwegs aufgehört, weil es für mich zu komplex war, um es zu erfassen. Meine Kenntnisse in Musiktheorie reichten nicht aus, um alles richtig zu verstehen und zu modellieren.",
    "bridgeDocZoomHint": "Dichtes Bild: Öffne es und klicke dann noch einmal darauf, um es in Originalgröße zu sehen – erst dann lassen sich die Notennamen und das Raster lesen.",
    "bridgeP3": "Das Verblüffendste ist, dass die Ausgangsfrage von ihm kam. Schon im August 2022 schrieb mir Yonathan über das Instrument „chromatisch, Sänger-Komponist“: „Versuch, in der App Stücke in dieser Tonleiter zu spielen, damit wir verstehen, welche Töne dir fehlen – und einen Weg finden, sie hinzuzufügen.“ Drei Jahre später beantwortet die App diese Frage, für alle.",
    "bridgeAppTitle": "Was die App heute für einen akustischen Handpan tut",
    "bridgeAppIntro": "Alles Folgende ist kostenlos und braucht kein elektronisches Instrument.",
    "bridgeApp": [
      {
        "t": "Deine Tonleiter in Farbe",
        "d": "Du wählst dein Instrument: Die App zeichnet deinen Korpus mit deinen tatsächlichen Tönen, jeder in seiner eigenen Farbe. Der Bildschirm wird zum Spiegel deines Handpans."
      },
      {
        "t": "Der Kammerton 440 / 432 Hz",
        "d": "Eine Einstellung stimmt die App auf deinen Handpan ein – damit das, was du in der App hörst, sauber zu dem klingt, was du in den Händen hast."
      },
      {
        "t": "🎯 Deine Tonleiter ergänzen",
        "d": "Die App vergleicht deine tatsächlichen Töne mit dem, was die Akkorde verlangen, und sagt dir genau, welche dir fehlen – dann, welcher zweite Handpan sie mitbringen würde und wie viele Stücke das freischalten würde."
      },
      {
        "t": "Deine 2 Handpans nebeneinander",
        "d": "Sobald ein zweiter Handpan dazukommt, werden beide Korpusse nebeneinander angezeigt, und jeder Akkord wird auf dem Handpan eingezeichnet, der ihn trägt, mit Spielreihenfolge und Händen. Genau mein Gymnastik-Problem – auf dem Bildschirm gelöst."
      }
    ],
    "bridgeSignature": "Meine beiden maßgeschneiderten Tonleitern sind in der App, mit dem Badge ✨ „Signature David Lesage“. Das Badge trägt meinen Namen: Das Lastenheft stammt von mir, aber die Tonleitern sind <strong>Made by Yishama – entworfen von Yhonatan Ale-Yahav</strong>. Du kannst sie laden, anhören und sehen, was sie ermöglichen, auch ohne sie unter den Händen zu haben.",
    "bridgeHonest": "Ehrlich gesagt: Die App hört dir nicht zu. Sie erkennt deine Tonleiter nicht über das Mikrofon – du wählst sie aus oder baust deinen Korpus Ton für Ton auf. Von da an rechnet sie mit deinen tatsächlichen Tönen.",
    "bridgeCta": "Handpan Constellation Studio entdecken",
    "bridgeCtaBlog": "Lesen: die App mit deinem akustischen Handpan nutzen",
    "endEyebrow": "Und jetzt",
    "endTitle": "Den Handpan zu einem echten Begleitinstrument machen",
    "endText": "Mein Traum hat sich nicht geändert: den Handpan auf Augenhöhe mit Gitarre oder Klavier zu bringen, um eine Stimme zu begleiten. Diese beiden Instrumente haben mir gezeigt, dass es möglich ist – und mich gezwungen, die fehlende Methode zu erfinden. Diesen Weg gehe ich weiter, ohne Akustik und Elektronik gegeneinander auszuspielen.",
    "endCtaShowroom": "Komm sie im Showroom hören",
    "endCtaYishama": "Yishama entdecken"
  },
  "shop": {
    "title": "Handpan-Shop: Neotone, Mikrofone & Zubehör",
    "description": "Eine Auswahl außergewöhnlicher Instrumente und Zubehörteile, getestet und ausgewählt von David Lesage: digitale Neotone-Handpans und Mikrofone von Hisong.",
    "eyebrow": "Shop",
    "title2": "Botschafter für außergewöhnliche Instrumente und Mikrofone",
    "intro": "Qualität und Feinheit bedeuten mir sehr viel.",
    "ambassadorText": "Ich arbeite mit Herstellern außergewöhnlicher Instrumente und Mikrofone zusammen, deren Qualität ich mit Stolz zeige und vertrete. Über mich bekommst du Rabattgutscheine, und bei meinen Treffen in Paris (20. Arrondissement) kannst du die Instrumente vorgeführt bekommen und selbst ausprobieren.",
    "keyNotice": "Online-Zahlung deaktiviert: Trag PUBLIC_SNIPCART_KEY in .env ein, um den Warenkorb zu aktivieren.",
    "from": "ab ",
    "soon": "Bald",
    "soonLong": "Bald erhältlich",
    "addCart": "In den Warenkorb",
    "orderEmail": "Per E-Mail bestellen",
    "creationsBadge": "Signature David Lesage",
    "calcOrder": "Meinen Preis berechnen & bestellen",
    "linkTags": {
      "helloasso": "Auf HelloAsso",
      "streaming": "Zum Streamen",
      "hisong": "−5 % bei Hisong",
      "yishama": "Yishama-Botschafter",
      "nowgroove": "Now Groove",
      "ondemand": "Auf Anfrage",
      "maisongoni": "La Maison du Ngoni",
      "tambour": "Rabattcode David-Tambour",
      "spotify": "Auf Spotify",
      "limited": "Limitierte Edition",
      "app": "App",
      "muling": "−5 % über mich",
      "onesec": "Nutze ich wirklich",
      "oko": "−10 % mit meinem Code",
      "structured": "Nutze ich wirklich",
      "atlas": "Atlas-Partner",
      "atlasCode": "−10 % mit meinem Code",
      "coeurdeson": "−10 % mit meinem Code",
      "forbrain": "−10 % mit meinem Code"
    },
    "linkCtas": {
      "buy": "Zum Angebot →",
      "listen": "Anhören →",
      "discover": "Entdecken →",
      "order": "Bestellen →",
      "interested": "Dieses Mikrofon interessiert mich →"
    },
    "copyCode": "Code kopieren",
    "codeCopied": "Kopiert!",
    "photoBy": "Foto:",
    "priceNotes": {
      "hisong": "<strong>Die Preise, ganz einfach</strong> (Lieferung innerhalb Frankreichs, inkl. MwSt.: beim Bezahlen kommt keine Steuer hinzu):<br>– Mikrofon <strong>AirStudio S1</strong> (Standard Pack): <strong>270,95 €</strong><br>– mit dem <strong>RX Plus</strong> (Universal Pack, +90 €): <strong>360,95 €</strong><br><br><strong>Mit meinem Code DAVID-LESAGE-SAVE-5 (−5 %)</strong> kostet das S1 + RX Plus <strong>342,91 €</strong>, <strong>versandkostenfrei</strong>.<br><br><strong>Mein Code:</strong> Über meinen Link sollte er automatisch angewendet werden. Wenn du ihn beim Bezahlen nicht siehst, gib ihn von Hand ein: Die Schaltfläche direkt darunter kopiert ihn."
    },
    "watchDemo": "Mein Demo-Video ansehen",
    "adviceTitle": "Brauchst du vor dem Kauf eine Beratung?",
    "adviceText": "Ich antworte persönlich. Erzähl mir von deinem Vorhaben, und ich helfe dir, das richtige Instrument zu finden.",
    "adviceCta": "Beraten lassen",
    "categories": {
      "handpans": {
        "label": "Handpan",
        "blurb": "Zwei Welten, die sich ergänzen."
      },
      "app": {
        "label": "App",
        "blurb": "Handpan Constellation Studio – die Lern-App, die Musik sichtbar macht."
      },
      "creations": {
        "label": "Meine Kreationen · Now Groove",
        "blurb": "Von mir entwickelt: meine Rhythmusmethode Now Groove, die Signature-Kalebasse und ihre handgefertigte Tasche."
      },
      "instruments": {
        "label": "Außergewöhnliche Instrumente",
        "blurb": "Ich arbeite mit außergewöhnlichen Herstellern zusammen, deren Qualität ich mit Stolz vertrete. Über mich bekommst du Rabattgutscheine und Vorführungen bei meinen Treffen."
      },
      "micros": {
        "label": "Mikrofone",
        "blurb": "Tonabnahme für akustischen Handpan, Stimme und Gong."
      },
      "accessoires": {
        "label": "Zubehör",
        "blurb": "Was das Instrument hält und was es transportiert. Im Showroom getestet, bevor es hier gelandet ist."
      },
      "musique": {
        "label": "Musik",
        "blurb": "Meine Alben und Coverversionen, zum Streamen auf allen Plattformen."
      },
      "formations": {
        "label": "Unterricht & Workshops",
        "blurb": "Lerne mit mir im Einzelunterricht und in Workshops, vor Ort oder online."
      },
      "outils": {
        "label": "Meine Werkzeuge für den Alltag",
        "blurb": "Über die Musik hinaus: die Werkzeuge, die ich wirklich nutze, um konzentriert, präsent und kreativ zu bleiben."
      }
    },
    "subcategories": {
      "acoustique": {
        "label": "Akustisch",
        "blurb": "Das Metall, die Hand, der Atem des Raums.",
        "more": "Alles über die Handpans von Yishama →"
      },
      "electronique": {
        "label": "Elektronisch",
        "blurb": "Alle Tonleitern, der Kopfhörer, die Bühne.",
        "more": "Alles über den Neotone →"
      }
    },
    "subNavLabel": "Zwei Welten:",
    "handpanNote": "Der einzige echte Unterschied: Den <strong>Neotone</strong> (hergestellt von Soundventure) bestellst du über meinen Rechner, mit persönlichem Rabattcode und 6 Jahren Garantie. Bei <strong>Yishama</strong> bin ich Botschafter und Mitglied ihres Partnerprogramms: Bestellt wird auf ihrer Website, mein Link begleitet dich. Zwei Wege zu kaufen, ein und derselbe Qualitätsanspruch.",
    "handpanBridge": "Das Bindeglied zwischen beiden: Handpan Constellation Studio →",
    "products": {
      "handpan-studio": {
        "name": "Handpan Constellation Studio · die App",
        "description": "Meine Lern-App, für den akustischen Handpan wie für den Neotone: Farben, Geometrie und Emotionen machen Musik sichtbar. Kostenlos für immer, Essenziell für 3,49 € inkl. MwSt./Monat und Studio für 9,99 € inkl. MwSt./Monat, mit 1 kostenlosen Testmonat."
      },
      "neotone-one": {
        "name": "Neotone¹",
        "description": "Digitaler Handpan mit 10 Tönen, alle Tonleitern, Studioqualität. Begleiteter Kauf: persönlicher Rabattcode + 6 Jahre Garantie."
      },
      "neotone-mutant": {
        "name": "Neotone¹ Mutant",
        "description": "Digitaler Handpan mit 19 Tönen und LCD-Display, maximale Ausdruckskraft. Begleiteter Kauf: Rabattcode + 6 Jahre Garantie."
      },
      "yishama": {
        "name": "Außergewöhnlicher Yishama-Handpan",
        "description": "Einer der besten Handpan-Hersteller der Welt (Israel / Ungarn). Handwerkliche Fertigung, Instrumente mit bis zu 19 Tönen, tiefen Bässen und strahlenden Höhen. Ich vertrete ihn mit Stolz als Botschafter."
      },
      "gonilele": {
        "name": "Gonilélé-Harfe · La Maison du Ngoni",
        "description": "Reise-Harfenlaute, entwickelt von Joris Feuillâtre. Ich bin Botschafter von La Maison du Ngoni. 10 Saiten (440 €) oder 12 Saiten mit eingebautem Mikrofon (520 €). Fotos, Videos, Auspacken und Bestellung auf der eigenen Produktseite."
      },
      "calebasse": {
        "name": "Kalebassen-Set David Lesage Signature",
        "description": "Komplettset: eine Kalebasse von 45 bis 50 cm (in Europa selten), von Kamou (Djoliba Percussion) von Hand veredelt und mit dem Now-Groove-Logo lasergraviert, dazu Matte und Shaker. Ein organisches Schlagzeug mit natürlichem Klang."
      },
      "housse": {
        "name": "Kalebassentasche Now Groove by David Lesage",
        "description": "Hochwertige Rucksacktasche, entworfen und gestaltet von David Lesage: integrierte Mattenfunktion, abnehmbare Gurte, Staufach (Egg-Shaker, Zubehör & Methode), Innenfutter aus Samt. ✋ Selten und einzigartig: von Hand gefertigt, in Kleinserie."
      },
      "coeur-de-son": {
        "name": "Trommel mit Gewebefell · Cœur de Son",
        "description": "Die Trommel von Florel Viardot, Manufaktur Cœur de Son in Thaon-les-Vosges: ein <strong>wasserdichtes Gewebefell</strong>, ohne tierisches Material, über einen Holzkessel gespannt und <strong>mit Luft gestimmt</strong>. Ein Luftschlauch, mit der Pumpe aufgeblasen, regelt die Spannung, von tiefen Bässen bis zu den Mitten; Feuchtigkeit lässt das Fell nicht erschlaffen, du kannst draußen spielen. Jede Trommel ist ein Einzelstück mit eigenem Namen, und das Motiv kann von Sandrine von Hand gemalt werden, auf Kostenvoranschlag. Etwa 3 Wochen Fertigung. Fünf Größen, von 40 cm (260 €) bis 65 cm (380 €); es gibt sie auch mit Ständer (65 cm, 520 €).<br><br>Ich spiele selbst eine, „Géode de feu“, und du kannst sie im Showroom ausprobieren (nur zur Vorführung: Bestellt wird bei Florel). Wenn dir Leder lieber ist, findest du die Felltrommel von L’Âme du Tambour gleich daneben: zwei Materialien, zwei Klänge. <strong>−10 % mit meinem Code</strong>, beim Bezahlen einzugeben."
      },
      "tambour": {
        "name": "Schamanentrommel · L’Âme du Tambour",
        "description": "Handgefertigte Rahmentrommel von Julien (L’Âme du Tambour), einem Trommelbauer mit klarer Haltung, leidenschaftlich und integer. Mit dem Code David-Tambour bekommst du −5 %."
      },
      "micro-hisong": {
        "name": "Hisong-Mikrofon AirStudio S1",
        "description": "Das erste mobile All-in-one-Studio: Mikrofon mit zwei Modi, kabelloses Kopfhörer-Monitoring, Audio-Interface, kabelloser Empfänger fürs Handy (RX Mini), Magnethalterung und Etui. Ideal für Stimme, akustischen Handpan und Gonilélé: ein echtes tragbares Studio.<br><br><strong>Preis (inkl. MwSt., Lieferung innerhalb Frankreichs):</strong> das S1 allein <strong>270,95 €</strong>; mit dem <strong>RX Plus</strong> (+90 €) <strong>360,95 €</strong>, also <strong>342,91 €</strong> mit meinem Code −5 % und versandkostenfrei.<br><br><strong>Mein Tipp:</strong> Wenn du das Mikrofon zum <strong>Live-Spielen</strong> nutzen willst, brauchst du den <strong>RX Plus</strong> (Universal Pack): Er schickt den Ton an die PA, das Mischpult oder eine Kamera.<br><br>Vorführungen und Direktkauf bei meinen Treffen in Paris."
      },
      "micro-muling": {
        "name": "Muling-Mikrofon MP1 + Vorverstärker HMP-2",
        "description": "Das MP1 ist ein Kontakt-Kondensatormikrofon, entwickelt für den akustischen Handpan. Geliefert mit dem Vorverstärker HMP-2, an den bis zu zwei MP1 passen: für eine klare, präzise Stereo-Abnahme ohne Rückkopplung. Ideal für Bühne und Aufnahme."
      },
      "atlas": {
        "name": "Handpan-Ständer Atlas: Pro & All",
        "description": "Die magnetischen Dreibeinständer des italienischen Herstellers Atlas. Der Handpan liegt auf einer schwebenden Scheibe mit acht geschützten Magneten, ohne Schrauben oder Gurt. Zwei Modelle: der <strong>Atlas Pro</strong> aus Aluminium, teleskopierbar, 1,8 kg, mit Transporttasche (250 €); der <strong>Atlas All</strong> aus Holz, dessen Kopf du im Sitzen zwischen die Beine klemmst und der mit Beinen und Verlängerungen auch zum Spielen im Stehen taugt (270 €). Ich bin Partner der Marke: Beide stehen im Showroom, du kannst sie vor Ort ausprobieren."
      },
      "phoenix-opus1": {
        "name": "L’Alliance du Phoenix – Opus I",
        "description": "Mein eigenes Album, das erste Opus: eine Reise zwischen Handpan, Stimme und organischen Texturen. Auf Spotify und allen Plattformen zu hören."
      },
      "phoenix-opus2": {
        "name": "L’Alliance du Phoenix – Opus II",
        "description": "Das zweite Opus: die Fortsetzung der musikalischen Reise. Auf Spotify und allen Plattformen zu hören."
      },
      "cover": {
        "name": "Coverversionen von David Lesage",
        "description": "Meine Coverversionen, neu interpretiert mit Handpan und Stimme (Shape of My Heart, Imagine, Ave Maria …). Auf Spotify zu hören."
      },
      "now-groove": {
        "name": "Now Groove: Rhythmusmethode",
        "description": "Mein Kurs, um Rhythmus anders zu lernen, mit visuellen Emojis. Für alle, von Einsteigern bis zu erfahrenen Musikern."
      },
      "cours-prives": {
        "name": "Einzelunterricht & Workshops",
        "description": "Einzelunterricht und Workshops mit mir: Handpan, Rhythmus und Stimme. Vor Ort in Paris oder online."
      },
      "streaming": {
        "name": "Meine Musik zum Streamen",
        "description": "Meine Kompositionen und Coverversionen findest du auf Spotify, Apple Music, Deezer und allen Plattformen."
      },
      "onesec": {
        "name": "one sec: die Kontrolle über deine Bildschirmzeit zurückgewinnen",
        "description": "Die App, die mir wirklich hilft, mich nicht im Scrollen zu verlieren. Bevor du eine App öffnest, die dich festhält (soziale Netzwerke …), legt one sec eine kurze Pause ein, so lang wie ein Atemzug, und der zwanghafte Drang lässt nach. Das ist einfach, und für mich ist es eines der wenigen Dinge, die wirklich funktioniert haben. Ein wissenschaftlich bestätigter Ansatz (Studien mit dem Max-Planck-Institut). In der Grundversion kostenlos; über meinen Link bekommst du −30 % auf Premium."
      },
      "oko": {
        "name": "Filter-Trinkflasche ÖKO",
        "description": "Die Trinkflasche, die ich als reisender Musiker immer und überall dabeihabe – Wasser ist das Wichtigste überhaupt. Sie filtert sofort, ohne Warten und ohne Strom, und wurde in einem unabhängigen, von COFRAC akkreditierten Labor auf über 200 Schadstoffe getestet. Ich freue mich, ein Produkt zu vertreten, das für alle Reisenden ideal ist. Mit meinem Code bekommst du −10 %."
      },
      "forbrain": {
        "name": "Forbrain-Kopfhörer · die eigene Stimme trainieren",
        "description": "Ein Kopfhörer mit <strong>Knochenleitung</strong> und Mikrofon, mit dem du deine Stimme live hörst – beim Singen, bei Stimme + Handpan. Du sprichst oder singst, und deine Stimme kommt sofort über die Knochen vor den Ohren zu dir zurück, durch einen <strong>dynamischen Filter</strong>, der die Höhen verstärkt und die Tiefen abmildert. Man hört sich anders, klarer. Ich habe ihn getestet: Die Erfahrung ist verblüffend. Es ist kein Bühnenmikrofon, sondern ein Trainingswerkzeug, für ein paar Minuten am Tag beim lauten Lesen oder Singen, um an Stimme, Aussprache, Intonation und Aufmerksamkeit zu arbeiten. Er funktioniert eigenständig, ohne Bildschirm und ohne App. Medizinisch erwarte ich davon nichts: Ich empfehle ihn für die Arbeit an der Stimme. Über meinen Link werden die <strong>−10 %</strong> automatisch abgezogen; sonst gib meinen Code im Warenkorb ein."
      },
      "structured": {
        "name": "Structured – Tagesplanung",
        "description": "Die App, mit der ich meine Tage als Musiker und Unternehmer organisiere, zwischen Konzerten, Workshops und der Entwicklung von Projekten. Eine klare, visuelle Zeitleiste statt einer Aufgabenliste, die immer länger wird. Ein Partnerprogramm mit ihnen gibt es noch nicht, ich teile sie einfach, weil ich sie wirklich nutze."
      }
    }
  },
  "booking": {
    "defaultTitle": "Besuch reservieren",
    "defaultIntro": "Hinterlass mir deine Kontaktdaten, ich antworte dir persönlich, um die Details abzustimmen.",
    "first": "Vorname",
    "last": "Nachname",
    "email": "E-Mail",
    "phone": "Telefon (optional)",
    "people": "Wie viele seid ihr?",
    "message": "Deine Nachricht (optional)",
    "messagePlaceholder": "Was dich interessiert, wann du Zeit hast, dein Level …",
    "submit": "Anfrage senden",
    "sending": "Wird gesendet …",
    "error": "Deine Anfrage konnte nicht gesendet werden. Versuch es noch einmal oder schreib mir direkt an contact@lesagedavid.fr.",
    "privacy": "Deine Kontaktdaten nutze ich nur, um dir zu antworten und dich auf dem Laufenden zu halten. Kein Spam.",
    "successTitle": "Abgeschickt ✨",
    "successText": "Du bekommst eine Bestätigungs-E-Mail. Ich antworte dir persönlich, und zwar sehr schnell.",
    "successClose": "Schließen",
    "close": "Schließen",
    "visitTitle": "Meinen Termin im Showroom reservieren (kostenpflichtig)",
    "visitIntro": "Paris (20. Arrondissement), nach Vereinbarung. Es ist ein kostenpflichtiger Einzeltermin – ein einziger Preis, egal, weshalb du kommst. Sag mir, wann du Zeit hast, und ich schlage dir einen Termin vor.",
    "privateTitle": "Einen Einzeltermin reservieren",
    "privateIntro": "Zeit unter vier Augen, im Showroom in Paris (20. Arrondissement) oder per Video: ein Instrument entdecken, dich mit dem vertraut machen, das du gerade gekauft hast, oder beim Spielen weiterkommen – egal, auf welchem Level du bist.",
    "newsTitle": "Über die nächsten Treffen informiert werden",
    "newsIntro": "Hinterlass mir deine E-Mail-Adresse: Ich sage dir Bescheid, sobald die Termine der nächsten kostenlosen Treffen in Paris feststehen. Kein Spam – du kannst dich jederzeit abmelden.",
    "contactTitle": "Schreib mir",
    "contactIntro": "Sag mir, was dich herführt – ich lese jede Nachricht und beantworte sie persönlich.",
    "goniTitle": "Eine Gonilélé-Harfe bestellen",
    "goniIntro": "Sag mir, welche Version dich interessiert und welche Optionen du möchtest: Ich antworte dir persönlich mit einer Zusammenfassung und allen Einzelheiten zum Ablauf.",
    "goniPrefill": "Version (10 Saiten / 12 Saiten + Mikrofon):\nTasche (+40 €) / Stimmgerät (+10 €):\nAbholung in Paris oder Versand (+25 €):",
    "collabPrefill": "Mein Projekt in ein paar Zeilen:",
    "vipTitle": "Ein Termin nur für dich",
    "vipScope": "Du entscheidest, was wir daraus machen: jedes Instrument aus dem Shop entdecken und ausprobieren (Neotone, akustische Handpans, Gonilélé, Kalebasse …), ein Handpan-Mikrofon testen (Hisong, Muling-Set) oder dich einfach unter vier Augen begleiten lassen – ob du ganz am Anfang stehst, noch suchst, was zu dir passt, oder einen bestimmten Punkt vertiefen möchtest. Ob du 1 Std. oder 1 Std. 30 Min. nimmst: Sag mir einfach, was dich herführt, ich bereite alles für dich vor.",
    "vipPriceLabel": "Preis",
    "vipPriceNote": "Einführung oder Demo. Für Unterricht: {lessonGrid} (Paket mit 4 Stunden über 2 Monate möglich).",
    "vipPolicyShort": "Bei Absage weniger als 24 Std. vorher wird die Zahlung nicht erstattet (der Termin war für dich reserviert), du kannst ihn aber innerhalb von 3 Monaten verschieben.",
    "sessionType": "Was für einen Termin möchtest du?",
    "sessionTypeChoose": "Auswählen …",
    "sessionTypeNames": {
      "onboarding": "Einführung in mein Instrument",
      "demo": "Private Demo und Instrument ausprobieren",
      "lesson": "Unterricht bei David nehmen"
    },
    "discountTitle": "Meinen Neotone-Rabattcode bekommen",
    "discountIntro": "Ein persönlicher Code, den ich für dich bei Neotone anfrage: −5 % online, −7 %, wenn du zum Ausprobieren in den Showroom kommst. Persönliche Antwort innerhalb von 24 bis 48 Stunden.",
    "discountModel": "Welches Modell interessiert dich?",
    "discountModelChoose": "Auswählen …",
    "discountModelNames": {
      "one": "Neotone¹ – 10 Töne",
      "mutant": "Neotone¹ Mutant – 19 Töne",
      "undecided": "Ich weiß es noch nicht – hilf mir bei der Wahl"
    },
    "discountCountry": "Lieferland",
    "discountCountryPlaceholder": "Frankreich, Belgien, Schweiz …",
    "discountNote": "Diese Angaben nutze ich nur, um deine Anfrage bei Neotone vorzubereiten.",
    "phonePlain": "Telefon",
    "phoneWhyShowcase": "Pflicht bei einem Treffen: Es ist ein fester Termin, und wenn auf einer der beiden Seiten kurzfristig etwas dazwischenkommt, muss ich dich sofort erreichen können.",
    "socialLabel": "Dein Social-Media-Profil",
    "socialHint": "Am liebsten Instagram – sonst Facebook, YouTube oder deine eigene Website.",
    "socialPlaceholder": "@deinprofil oder ein Link",
    "discountNextTitle": "Wie es weitergeht",
    "discountNext1": "Ich lese deine Nachricht persönlich – ich antworte allen.",
    "discountNext2": "Innerhalb von 24 Stunden, nachdem ich sie gelesen habe, <strong>meldet sich Neotone direkt bei dir</strong> und schickt dir deinen Rabattcode.",
    "discountNext3": "Danach übernimmt Neotone den Rest: Bestellung, Zahlung, Lieferung. Ich bin weiter für dich da, wenn du mich brauchst.",
    "purchase": {
      "showroomTitle": "Einen Neotone im Showroom kaufen (−7 %)",
      "showroomIntro": "Du nimmst dein Instrument direkt aus dem Showroom in Paris (20. Arrondissement) mit. Ich prüfe deine Anfrage und gebe sie an Neotone weiter. Neotone schickt dir dann die Rechnung und einen Link zur Kartenzahlung, montags bis freitags.",
      "showroomButton": "Im Showroom kaufen (−7 %)",
      "showroomHowTitle": "So läuft der Kauf im Showroom ab",
      "showroomHow": [
        "Du füllst dieses Formular aus.",
        "Ich prüfe deine Anfrage und gebe sie an Neotone weiter (Soundventure, in Budapest). Du bekommst die Mail in Kopie.",
        "Neotone schickt dir die Rechnung und einen Link zur Kartenzahlung, montags bis freitags von 9 bis 17 Uhr (Pariser Zeit, dieselbe wie in Budapest), innerhalb von 24 Stunden (an Werktagen).",
        "Du zahlst, und das Instrument gehört dir: Du nimmst es direkt im Showroom in Paris (20. Arrondissement) mit.",
        "Wenn du vor deinem Besuch zahlst, schick mir den Zahlungs- oder Überweisungsnachweis an <a href=\"mailto:contact@lesagedavid.fr\">contact@lesagedavid.fr</a>: Gegen Vorlage dieses Nachweises übergebe ich dir deinen Neotone."
      ],
      "showroomWeekend": "<strong>Du kommst am Wochenende in den Showroom?</strong> Füll dieses Formular vor Freitag aus: Dann ist der Zahlungslink fertig, du kannst vor Ort zahlen und dein Instrument gleich mitnehmen.",
      "onlineTitle": "Online-Kauf: Rabattcode anfragen (−5 %)",
      "onlineIntro": "Ein persönlicher Rabattcode, den ich für dich bei Neotone anfrage: −5 % auf deine Online-Bestellung, geliefert zu dir nach Hause.",
      "onlineButton": "Online-Kauf: meinen Code bekommen (−5 %)",
      "onlineHowTitle": "So bekommst du deinen Rabattcode",
      "onlineHow": [
        "Ich lese deine Anfrage persönlich – ich antworte allen.",
        "Ich frage für dich bei Neotone einen persönlichen Rabattcode an: <strong>Neotone meldet sich direkt bei dir</strong> und schickt ihn dir.",
        "Danach übernimmt Neotone den Rest: Bestellung, Zahlung, Lieferung. Ich bin weiter für dich da, wenn du mich brauchst."
      ],
      "priceVatNotCharged": "MwSt. {country} {rate} nicht berechnet",
      "priceHtNote": "Ohne MwSt.: Die MwSt. ({rate}) wird nicht berechnet (Steuerschuldnerschaft des Leistungsempfängers), vorausgesetzt, deine USt-IdNr. ist gültig.",
      "priceHtNeedVat": "Gib unten bei den Rechnungsdaten deine USt-IdNr. an.",
      "priceOnlineNote": "Du zahlst im Neotone-Shop, mit deinem Rabattcode."
    },
    "discoveryLabel": "Wie bist du auf mich als Neotone-Botschafter gestoßen?",
    "discoveryChoose": "Auswählen …",
    "discoveryNames": {
      "youtube": "YouTube",
      "instagram": "Instagram",
      "facebook": "Facebook",
      "showcase": "Ein Treffen oder eine Veranstaltung",
      "word-of-mouth": "Mundpropaganda",
      "search": "Eine Suche im Internet",
      "neotone-site": "Die Neotone-Website",
      "other": "Anders"
    },
    "curiousTitle": "Zwei Fragen, nur aus Neugier",
    "curiousHint": "Du musst nicht antworten – es geht nur darum, dich kennenzulernen.",
    "playingSinceLabel": "Der Handpan und du: Wie lange geht das schon?",
    "playingSinceChoose": "Auswählen …",
    "playingSinceNames": {
      "none": "Ich spiele noch nicht",
      "under-1": "Weniger als ein Jahr",
      "1-3": "Zwischen 1 und 3 Jahren",
      "over-3": "Mehr als 3 Jahre"
    },
    "dreamLabel": "Was du am liebsten einmal spielen würdest",
    "dreamPlaceholder": "Ein Stück, eine Stimmung, ein Projekt …",
    "freeMessageLabel": "Deine Nachricht",
    "freeMessageHint": "Schreib, so viel du willst – ich lese alles.",
    "sessionTypeRecommended": "★ empfohlen für den Einstieg",
    "sessionTypeHint": "Du hast gerade dein Instrument bekommen – Neotone, akustischer Handpan, Mikrofon – und fühlst dich ein bisschen verloren? Das läuft als Unterricht: Wähl „Unterricht bei David nehmen“, wir starten gemeinsam, stellen alles ein und du lernst, alles selbst zu bedienen – ohne dich langfristig zu binden.",
    "durationLabel": "Wie viel Zeit sollen wir uns nehmen?",
    "durationHint": "Für eine Einführung empfehle ich 1 Std. 30 Min.: Ich gebe dir alles mit, was du brauchst, um selbstständig zu spielen.",
    "slotsTitle": "Deine Wunschtermine",
    "slotsHint": "Schlag mir bis zu 3 Termine vor, die dir passen – ich bestätige dir den, den ich auswähle.",
    "slotLabel": "Termin {n}",
    "slotDate": "Datum",
    "slotTime": "Uhrzeit",
    "slotsRequired": "Gib mir mindestens einen Termin (Datum und Uhrzeit) an, der dir passen würde.",
    "termsTitle": "So läuft es ab",
    "terms1": "Du schlägst mir deine Termine vor. Ich antworte dir persönlich und bestätige den, den ich auswähle.",
    "terms2": "In meiner Antwort schicke ich dir den Zahlungslink: Erst die Zahlung reserviert deinen Termin und verpflichtet uns beide.",
    "terms3": "Dir kommt etwas dazwischen? Bis 24 Stunden vorher verschieben wir deinen Termin ganz problemlos – du schreibst mir, und das war’s.",
    "terms4": "Weniger als 24 Stunden vorher wird die Zahlung nicht erstattet: Ich hatte diesen Termin nur für dich freigehalten und kann ihn niemand anderem mehr anbieten. Deinen Termin verlierst du deshalb aber nicht – wir verschieben ihn auf ein anderes Datum, innerhalb von 3 Monaten. Jedem kommt mal etwas dazwischen, das gehört zum Leben: Es geht einfach um den Wert der Verpflichtung, die wir einander gegenüber eingehen.",
    "instrumentsLabel": "Welche Instrumente möchtest du entdecken?",
    "instrumentsHint": "Kreuz an, was dich interessiert – ich bereite alles für deinen Besuch vor.",
    "instrumentNames": {
      "neotone": "Neotone (elektronischer Handpan)",
      "calebasse": "Kalebasse",
      "gonilele": "Gonilélé (afrikanische Harfe)",
      "mic-hisong": "Hisong-Mikrofon",
      "mic-muling": "Muling-Mikrofon"
    },
    "formatLabel": "Vor Ort oder per Video?",
    "formatInPerson": "Vor Ort – Showroom in Paris (20. Arrondissement)",
    "formatRemote": "Per Video",
    "showcaseTitle": "Meinen Platz beim Treffen reservieren",
    "showcaseIntro": "Kostenloses öffentliches Treffen im Showroom in Paris (20. Arrondissement). Reservierung empfohlen, die Plätze sind begrenzt.",
    "showcaseInterestsLabel": "Für welche Instrumente kommst du?",
    "showcaseInterestsHint": "Kreuz alles an, was dich interessiert – ich bereite es für das Treffen vor. Gibt es etwas Bestimmtes? Sag es mir unten in deiner Nachricht.",
    "showcaseInterestNames": {
      "all": "Alle",
      "handpan": "Handpan",
      "mic": "Mikrofon (Muling und/oder Hisong)",
      "calebasse": "Kalebasse",
      "gonilele": "Gonilélé (afrikanische Harfe)",
      "meet": "Dich kennenlernen"
    },
    // chantier 44 : jamais traduit avant la relecture du 04/11/2026
    "calcRecapLabel": "Deine Auswahl",
    "calcRecapEdit": "Ändern",
    "billing": {
      "title": "Rechnungsdaten",
      "intro": "Neotone stellt die Rechnung aus: Ohne diese Angaben geht es nicht, und sie dienen nur diesem Zweck.",
      "kindLabel": "Du kaufst …",
      "kindPrivate": "Als Privatperson",
      "kindCompany": "Im Namen eines Unternehmens",
      "name": "Rechnungsname",
      "namePlaceholder": "Der Name, der auf der Rechnung stehen soll",
      "address": "Adresse",
      "addressPlaceholder": "Straße und Hausnummer",
      "postalCode": "Postleitzahl",
      "city": "Ort",
      "country": "Rechnungsland",
      "countryChoose": "Auswählen …",
      "company": "Firmenname",
      "companyPlaceholder": "Der rechtliche Name des Unternehmens",
      "vat": "USt-IdNr. (Umsatzsteuer-Identifikationsnummer)",
      "vatPlaceholder": "FR12345678901",
      "siret": "SIRET",
      "siretPlaceholder": "123 456 789 00010",
      "vatSiretHint": "Optional – mit einer gültigen USt-IdNr. kann Neotone dir ohne MwSt. in Rechnung stellen (die MwSt. wird dann in deinem Land abgerechnet); die SIRET-Nummer identifiziert das Unternehmen auf der französischen Rechnung.",
      "shippingTitle": "Lieferung",
      "shippingSame": "An die Rechnungsadresse liefern",
      "shippingName": "Name des Empfängers",
      "shippingAddress": "Lieferadresse",
      "shippingPostalCode": "Postleitzahl",
      "shippingCity": "Ort",
      "shippingCountry": "Lieferland",
      "orderRef": "Referenz deiner Anfrage: {ref}",
      "unavailable": "Für diese Auswahl ist gerade kein Exemplar verfügbar. Deine Anfrage ist trotzdem bei mir angekommen: Ich antworte dir persönlich mit den tatsächlichen Lieferzeiten.",
    },
  },
  "muling": {
    "title": "Muling-Mikrofon für akustischen Handpan | David Lesage",
    "description": "Das Muling-Mikrofon für akustischen Handpan, getestet von David Lesage: klare, präzise Abnahme ohne Rückkopplung. Ausführliches Testvideo und Fotos.",
    "back": "← Zurück zum Shop",
    "eyebrow": "Mikrofon für akustischen Handpan",
    "heroTitle": "Das Muling-Mikrofon",
    "heroLead": "Ein Mikrofon, das eigens für den akustischen Handpan entwickelt wurde: eine klare, präzise und originalgetreue Abnahme ohne Rückkopplung, auf der Bühne wie bei der Aufnahme. Ich habe es ausgiebig getestet, hier ist mein ausführlicher Bericht.",
    "ctaInterested": "Dieses Mikro interessiert mich",
    "ctaVideo": "Meinen ausführlichen Test ansehen",
    "videoTitle": "Mein ausführlicher Test im Video",
    "videoIntro": "Ich stelle dir das Mikrofon im Detail vor: Montage, Klang, Vergleiche und Einsatzbereiche.",
    "photosTitle": "Das Mikrofon in Bildern",
    "photosIntro": "Meine eigenen Fotos vom Mikrofon und von seiner Montage am Instrument.",
    "whyTitle": "Warum ich es empfehle",
    "whyText": "Einen akustischen Handpan zu verstärken ist eine echte Herausforderung: Allzweckmikrofone nehmen die Obertöne schlecht ab, und sobald man lauter dreht, droht Rückkopplung. Das Muling ist genau für dieses Instrument gedacht: Es nimmt den Klang direkt an der Quelle ab, bewahrt den Reichtum der Obertöne und lässt dich den Pegel hochziehen, ohne dass es pfeift. Das hat mich überzeugt, es zu vertreten.",
    "whyPoints": [
      {
        "t": "Für den Handpan entwickelt",
        "d": "Ein Kontaktmikrofon, das für den Korpus und die Obertöne des Handpans gedacht ist, kein zweckentfremdetes Allzweckmikrofon."
      },
      {
        "t": "Ohne Rückkopplung",
        "d": "Das Mikro nimmt direkt am Instrument ab: Du drehst auf der Bühne lauter, ohne Rückkopplung fürchten zu müssen."
      },
      {
        "t": "Bühne und Studio",
        "d": "Originalgetreu genug für die Aufnahme, robust und praktisch genug für den Live-Einsatz."
      }
    ],
    "priceTitle": "Preis und Bestellung",
    "priceLabel": "Herstellerpreis",
    "priceNote": "Zum Preis kommen keine Versandkosten hinzu. Mögliche Zollgebühren: noch zu bestätigen.",
    "priceDiscountLabel": "Wenn du über mich bestellst",
    "priceDiscountNote": "Code {code}: {pct} % Rabatt auf den Herstellerpreis, nur für Bestellungen über dieses Formular.",
    "orderTitle": "Mein Mikro bestellen",
    "orderText": "Der Hersteller bietet für Frankreich noch keine Online-Zahlung an: Ich stelle den Kontakt direkt her. Füll das Formular aus, dann bekommst du sofort die Zahlungsdaten für Muling, und Muling übernimmt anschließend alles bis zur Lieferung deines Mikros.",
    "ctaContact": "Mein Mikro bestellen",
    "mulingOrderTitle": "Das Muling-Mikrofon bestellen",
    "mulingOrderIntro": "Code {code} angewendet: {pct} % Rabatt auf den Herstellerpreis. Hier sind die Zahlungsdaten; danach kümmert sich Muling direkt mit dir um alles Weitere.",
    "mulingOrderPriceLine": "Herstellerpreis {base} € − {pct} % = {final} €",
    "mulingQuantity": "Wie viele Mikros?",
    "mulingDeliveryNote": "Besondere Hinweise für den Zusteller",
    "mulingDeliveryNoteHint": "Türcode, Stockwerk, Hinweise zur Ablage … (optional)",
    "mulingDeliveryNotePlaceholder": "z. B. Torcode 1234B, 3. Stock ohne Aufzug …",
    "mulingCountry": "Lieferland",
    "mulingAddress": "Adresse",
    "mulingCity": "Ort",
    "mulingPostalCode": "Postleitzahl",
    "mulingConsent": "Ich bin einverstanden, dass meine Daten zur Bearbeitung meiner Bestellung an Muling Musical Instruments Co., Ltd. (China) und an Résonances Productions übermittelt werden.",
    "mulingConsentRequired": "Damit die Bestellung bearbeitet werden kann, müssen deine Daten an Muling übermittelt werden. Setz das Häkchen, um fortzufahren.",
    "mulingBankTitle": "So bezahlst du deine Bestellung",
    "mulingBankIntro": "Überweise den genauen Betrag an Muling und gib deine Referenz als Verwendungszweck an. Bezahlt wird in Euro, ausschließlich per SEPA-Überweisung.",
    "mulingBankBeneficiary": "Empfänger",
    "mulingBankIban": "IBAN",
    "mulingBankBic": "BIC",
    "mulingBankBank": "Bank",
    "mulingBankRef": "Verwendungszweck",
    "mulingBankAmountLabel": "Überweisungsbetrag",
    "mulingBankAdvantagePrefix": "Dein Vorteil: ",
    "mulingCopyLine": "Kopieren",
    "mulingCopiedLine": "Kopiert!",
    "mulingDownloadPdf": "⬇️ Diese Angaben als PDF herunterladen",
    "mulingBankSepaOnly": "⚠️ Dieses Konto nimmt nur SEPA-Überweisungen in Euro an, keine SWIFT- oder Auslandsüberweisungen.",
    "mulingBankNotified": "Deine Bestellung wird bestätigt und an Muling ({email}) weitergeleitet, sobald du deinen Überweisungsnachweis hochgeladen hast. Versand und Sendungsverfolgung übernimmt danach Muling.",
    "mulingBankNext": "Bewahre nach der Überweisung einen Zahlungsnachweis auf (Screenshot oder PDF) und lade ihn hier hoch. Muling meldet sich dann bei dir, um den Zahlungseingang zu bestätigen, und schickt dir die Informationen zur Sendungsverfolgung.",
    "mulingProofLabel": "Lade deinen Überweisungsnachweis hoch",
    "mulingProofHint": "Screenshot oder PDF deiner Überweisung (max. 3 MB).",
    "mulingProofButton": "Ich habe überwiesen",
    "mulingProofSending": "Senden …",
    "mulingProofError": "Das Hochladen ist fehlgeschlagen. Versuch es noch einmal oder schreib mir direkt an contact@lesagedavid.fr.",
    "mulingProofMissing": "Lade einen Überweisungsnachweis (Bild oder PDF) hoch, bevor du fortfährst.",
    "mulingProofInvalidType": "Format nicht unterstützt: Lade ein Bild (JPG, PNG) oder ein PDF hoch.",
    "mulingProofTooLarge": "Die Datei ist größer als 3 MB. Verkleinere sie und versuch es noch einmal.",
    "mulingResumeIntro": "Du kommst zurück, um die Überweisung für deine Bestellung {ref} zu melden. Bestätige die E-Mail-Adresse, die du bei der Bestellung angegeben hast, und lade dann deinen Überweisungsnachweis hoch.",
    "mulingResumeEmailLabel": "Bei der Bestellung verwendete E-Mail-Adresse",
    "mulingResumeEmailHint": "Über diese Adresse wird deine Bestellung zugeordnet: Bis sie geprüft ist, werden auf dieser Seite keine persönlichen Daten angezeigt.",
    "mulingResumeEmailMissing": "Gib die E-Mail-Adresse an, die du bei der Bestellung verwendet hast.",
    "mulingResumeAmountNote": "Den genauen Betrag deiner Bestellung findest du in deiner Bestätigungs-E-Mail ({unit} € pro Mikro).",
    "mulingResumeMismatch": "Diese E-Mail-Adresse passt nicht zu dieser Bestellung. Verwende genau die Adresse, die du bei der Bestellung angegeben hast, oder schreib mir an contact@lesagedavid.fr.",
    "mulingThankYouTitle": "Danke, alles notiert ✨",
    "mulingThankYouText": "Dein Überweisungsnachweis ist angekommen und wurde mit allen Angaben zu deiner Bestellung an Muling weitergeleitet. Du bekommst an diese Adresse eine Bestätigungs-E-Mail, die du als Nachweis aufbewahren solltest. Muling meldet sich direkt bei dir wegen Versand und Sendungsverfolgung.",
    "mulingOrderSending": "Senden …",
    "mulingOrderSubmit": "Bestellung absenden",
    "mulingOrderError": "Das Senden ist fehlgeschlagen. Versuch es noch einmal oder schreib mir direkt an contact@lesagedavid.fr.",
    "specsTitle": "Die MP-1-Kapsel im Detail",
    "specsIntro": "Die technischen Daten der Kontaktkapsel MP-1, so wie sie sich im Praxistest gezeigt haben.",
    "specs": [
      {
        "t": "Oberflächen-Kondensatormikrofon",
        "d": "Kein Raummikrofon: Die Kapsel nimmt die Schwingungen direkt am Korpus ab. Deshalb klingt es selbst an einem lauten Ort originalgetreu."
      },
      {
        "t": "Magnetbefestigung",
        "d": "Die Kapsel wird per Magnet angesetzt und abgenommen: sofort montiert, und sie sitzt absolut sicher am Instrument."
      },
      {
        "t": "Winzig",
        "d": "So groß wie eine Fingerkuppe: Man vergisst sie völlig, beim Hinsehen wie beim Spielen."
      },
      {
        "t": "ABS-Gehäuse und Metallteile",
        "d": "Ein Gehäuse aus ABS, verstärkt mit Metallteilen: leicht am Instrument und trotzdem robust für den Transport."
      },
      {
        "t": "Ausgangsimpedanz: 600 Ω",
        "d": "Eine Standardimpedanz, bestens geeignet für den Vorverstärker HMP-2 und für übliche Line-Eingänge."
      },
      {
        "t": "Kaum Übersprechen",
        "d": "Das Mikro nimmt über Kontakt ab: Außengeräusche und andere Instrumente kommen praktisch nicht durch. Gold wert beim Jammen und auf der Bühne."
      }
    ],
    "specsCaution": "⚠️ Gut zu wissen vor dem Kauf: Die Kapseln funktionieren ausschließlich mit dem Muling-Vorverstärker. Mit Geräten anderer Marken sind sie nicht kompatibel. Es ist ein Komplettsystem, keine Kapsel zum Einbau in ein bestehendes Setup.",
    "specsSource": "Technische Daten laut Hersteller, abgeglichen mit meinem eigenen Einsatz.",
    "boxTitle": "Was im Set enthalten ist",
    "boxIntro": "Das HMP-2-Set ist komplett: zwei Kapseln und der Vorverstärker, startklar für einen oder zwei Handpans.",
    "boxItems": [
      "2 magnetische Kontaktkapseln (aktive Mikrofone)",
      "1 zweikanaliger Vorverstärker HMP-2",
      "2 vergoldete Klinkenkabel 6,35 mm",
      "1 Hartschalen-Transportkoffer",
      "2 Aufbewahrungsbeutel aus Stoff",
      "1 Schraubendreher zum Öffnen des Vorverstärkers (Zugang zur Batterie)",
      "4 Klebepads zur Befestigung",
      "Kabelclips (wire clips)",
      "Die Bedienungsanleitung des Herstellers"
    ],
    "boxNote": "Ein Set reicht für zwei Handpans: eine Kapsel pro Instrument, beide im Vorverstärker gemischt. Bei nur einem Handpan kannst du beide Kapseln anbringen, für eine ausgewogenere Abnahme.",
    "preampTitle": "Der Vorverstärker HMP-2 im Detail",
    "preampIntro": "Das Herzstück des Systems: ein zweikanaliger Vorverstärker, eigens für den Handpan entwickelt, mit eingebauter Klangregelung.",
    "preampFeatures": [
      {
        "t": "Zwei unabhängige Kanäle",
        "d": "CH1 und CH2 haben jeweils eine eigene Lautstärke: So gleichst du deine beiden Kapseln (oder deine beiden Handpans) vor dem Ausgang genau aus."
      },
      {
        "t": "SHAPE-Regler",
        "d": "Der große Regler formt den Klang: Auf 0 behältst du die ursprüngliche Klangfarbe; im Uhrzeigersinn betonst du Bässe und Höhen und nimmst die Mitten zurück. Ideal, um dich in einem dichten Mix durchzusetzen."
      },
      {
        "t": "Summenausgang Klinke 6,35 mm",
        "d": "Ein einziges Kabel geht zu deinem Lautsprecher, deinem Mischpult oder deinem Audio-Interface."
      },
      {
        "t": "CH2-Schalter",
        "d": "Kanal 2 nimmt eine aktive Kapsel (Schalter auf ON) oder einen passiven Tonabnehmer wie den H1 (auf OFF) auf. Kanal 1 ist nur für aktive Kapseln."
      },
      {
        "t": "Kontrollleuchte",
        "d": "Eine LED zeigt dir auf einen Blick, dass der Vorverstärker eingeschaltet ist."
      },
      {
        "t": "Metallgehäuse",
        "d": "Ein kompaktes, robustes Gehäuse im Format eines Effektpedals: Es steckt Bühne und Tour locker weg."
      },
      {
        "t": "Etwa 20 Stunden Laufzeit",
        "d": "Mit einer einfachen 9-V-Batterie spielst du rund zwanzig Stunden: genug für mehrere Konzerte hintereinander, ohne daran denken zu müssen."
      },
      {
        "t": "Impedanzen: 1 MΩ am Eingang, 600 Ω am Ausgang",
        "d": "Ein hochohmiger Eingang, der den ganzen Reichtum des Kapselsignals bewahrt, und ein Standardausgang, der überall passt: Lautsprecher, Mischpult oder Audio-Interface."
      }
    ],
    "preampWarnTitle": "Zwei wichtige Hinweise",
    "preampWarns": [
      "Schließ niemals einen passiven Tonabnehmer an Kanal 1 an: An diesem Kanal liegt ständig Spannung an, das würde die Geräte beschädigen.",
      "Schalte an Kanal 2 die Stromversorgung ab (Schalter auf OFF), wenn du dort einen passiven Tonabnehmer H1 anschließt."
    ],
    "preampDiagramTitle": "Alle Bedienelemente erklärt",
    "preampDiagramAlt": "Beschriftetes Schema des Vorverstärkers HMP-2: Eingänge, Lautstärkeregler, SHAPE-Regler, Stromversorgung und Ausgang",
    "dangerTitle": "Vor dem ersten Anschließen lesen",
    "dangers": [
      "Schließ <strong>niemals</strong> einen passiven Tonabnehmer an den Eingang CH1 an.",
      "Wenn du einen passiven Tonabnehmer wie den H1 verwendest, muss Kanal CH2 unbedingt auf <strong>OFF</strong> stehen.",
      "Das Netzteil muss <strong>Minus innen</strong> haben (Mittelpol negativ). Eine Verpolung zerstört das Gerät unwiderruflich."
    ],
    "makerEyebrow": "Der Hersteller",
    "makerTitle": "Muling Musical Instruments",
    "makerIntro": "<strong>Muling Musical Instruments Co., Ltd.</strong> (惠州市沐铃乐器有限公司) ist ein chinesischer Hersteller von Tonabnehmern für akustische Instrumente mit Sitz in Huizhou in der Provinz Guangdong. Gegründet wurde das Unternehmen 2016 von <strong>Mò Cè</strong> (莫测), der auch die Produkte entwirft.",
    "makerBlocks": [
      {
        "t": "Mò Cè (莫测), der Entwickler",
        "d": "Mò Cè spielt seit den 1980er-Jahren Gitarre und unterrichtete in den 1990er-Jahren als Gitarrenlehrer. 1999 wechselte er zur Entwicklung von Tonabnehmern. Zunächst arbeitete er als Designer für einen koreanischen Hersteller, dann für LSM, bevor er seine eigene Marke gründete. Der Hersteller nimmt drei Neuheiten für sich in Anspruch: den ersten Tonabnehmer mit eingebautem Display, den ersten Tonabnehmer, der Piezo und Mikrofon kombiniert, und die OPUS-Serie, von der nach eigenen Angaben zwischen 2001 und 2010 über 80.000 Sets pro Jahr produziert wurden."
      },
      {
        "t": "Das Logo",
        "d": "Das Muling-Logo beruht auf drei Symbolen des klassischen chinesischen Denkens: dem <strong>Yin und Yang</strong>, dem <strong>runden Himmel und der quadratischen Erde</strong> (天圆地方) und den <strong>fünf Elementen</strong> (五行). Damit will es sagen, dass Instrument, Tonabnehmer und Musiker eine Einheit bilden."
      },
      {
        "t": "Das Sortiment",
        "d": "Muling entwickelt drei Produktfamilien für Saiteninstrumente. Dazu kommen eine eigene Produktlinie für den Handpan – darunter das hier vorgestellte Set HMP-2 – und individuell gefertigte Signature-Tonabnehmer."
      }
    ],
    "makerLinksTitle": "Muling folgen",
    "makerZhNote": "Website auf Chinesisch",
    "powerTitle": "Die Stromversorgung: Batterie oder Netzteil",
    "powerIntro": "Der Vorverstärker lässt sich auf zwei Arten betreiben. Du wählst je nach Situation.",
    "powerBattery": {
      "t": "Mit 9-V-Batterie: völlig unabhängig",
      "d": "Eine 9-V-Batterie (Typ 6F22) sitzt im Inneren des Gehäuses. Du öffnest einfach den Boden mit dem mitgelieferten Schraubendreher. Unterwegs gibt es nichts Besseres: kein Netzkabel, du spielst, wo du willst. Ich selbst nehme einen Akku, das ist günstiger und umweltfreundlicher. Nimm ihn heraus, wenn du den Vorverstärker länger nicht benutzt."
    },
    "powerMains": {
      "t": "Mit Netzteil: für lange Sessions",
      "d": "Der Vorverstärker funktioniert auch mit einem Netzteil mit 9 V und 300 mA, an einer DC-Buchse 5,5 × 2,1 mm mit Minus innen. Ideal im Studio, bei der Probe oder bei einem langen Konzert, bei dem du nicht von einer Batterie abhängen willst."
    },
    "powerWarning": "⚠️ Wichtig: Das Netzteil ist nicht im Set enthalten. Du musst es separat kaufen. Prüf die Daten genau (9 V, mindestens 300 mA, Minus innen), damit du den Vorverstärker nicht beschädigst.",
    "manualTitle": "Die Anleitung des Herstellers",
    "manualIntro": "Die beiden Seiten der mitgelieferten Anleitung, mit den empfohlenen Positionen für die Tonabnehmer und den technischen Daten.",
    "relatedTitle": "Und wenn du auf einem elektronischen Handpan spielst?",
    "relatedText": "Der Neotone braucht kein Mikrofon: Er wird direkt per Klinke angeschlossen. Wenn du zwischen akustisch und elektronisch schwankst, hilft dir mein Vergleich bei der Wahl.",
    "relatedCta": "Den Neotone entdecken"
  },
  "gonilele": {
    "title": "Gonilélé-Harfe – La Maison du Ngoni | David Lesage",
    "description": "Die Gonilélé-Harfe (NGoni lélé), eine Reise-Harfenlaute von La Maison du Ngoni, vorgestellt von David Lesage, Botschafter der Marke. Fotos, Videos, Auspacken, Preise und Bestellung.",
    "back": "← Zurück zum Shop",
    "eyebrow": "Botschafter · La Maison du Ngoni",
    "heroTitle": "Die Gonilélé-Harfe",
    "heroLead": "Eine Reise-Harfenlaute mit betörender Seele, von Joris Feuillâtre von Hand gefertigt. Ich bin stolz, ihr Botschafter zu sein – entdecke das Instrument, hör es dir an und nimm dein eigenes mit nach Hause.",
    "ctaOrder": "Meinen Gonilélé bestellen",
    "ctaVideos": "Videos ansehen",
    "ctaLesson": "Unterricht nehmen",
    "whatTitle": "Was ist der Gonilélé?",
    "whatText": "Der Gonilélé (oder NGoni lélé) ist eine westafrikanische Harfenlaute, die Joris Feuillâtre von La Maison du Ngoni als Reiseinstrument neu gedacht hat. Ein Resonanzkörper aus Kalebasse, ein Hals aus Edelholz, Saiten in einer pentatonischen Tonleiter gestimmt: Er verkörpert die Vereinigung von Männlichem und Weiblichem, verbunden mit dem Göttlichen. Ein intuitives, meditatives und tiefgründiges Instrument, für Einsteiger ebenso zugänglich wie für erfahrene Musiker.",
    "ambassadorTitle": "Botschafter von La Maison du Ngoni",
    "ambassadorText": "Ich arbeite seit 2023 mit Joris Feuillâtre zusammen. Der Gonilélé hat mich durch die prägenden Momente meines Lebens begleitet: Ganz selbstverständlich vertrete ich heute La Maison du Ngoni und gebe dieses Instrument an die Menschen um mich herum weiter.",
    "photosTitle": "Das Instrument in Bildern",
    "unboxingTitle": "Entdeckung & Auspacken",
    "unboxingText": "Ich zeige dir den Gonilélé im Detail, vom Auspacken bis zu den ersten Schritten am Instrument.",
    "videosTitle": "Der Gonilélé, gespielt & vorgestellt",
    "videosIntro": "Eine Auswahl an Videos, in denen ich das Instrument spiele und vorstelle – klick, um sie auf YouTube zu öffnen.",
    "videoTitles": {
      "extrait": "Ausschnitt – der Gonilélé stellt sich vor",
      "uneAme": "„Une âme“ – Gonilélé lernen",
      "rappelle": "„Rappelle-moi la beauté“ – auf dem Gonilélé",
      "kothbiro": "„Kothbiro“ – auf dem Gonilélé (432 Hz)",
      "sonoriser": "Deinen Gonilélé ganz einfach abnehmen",
      "amplifier": "Deinen Gonilélé verstärken"
    },
    "tuningTitle": "Eine Stimmtabelle inklusive",
    "tuningText": "Zu jedem Instrument gehört eine Stimmtabelle (pentatonische Tonleiter, Kammerton 432 Hz), mit der du deine 10 oder 12 Saiten ganz einfach stimmst. Die vollständige Datei bekommen nur diejenigen, die das Instrument kaufen.",
    "pricesTitle": "Preise",
    "priceRows": {
      "cordes10": "10 Saiten – ohne Mikrofon",
      "cordes12": "12 Saiten – mit eingebautem Mikrofon",
      "housse": "Tasche (Pflicht bei Versand)",
      "accordeur": "Stimmgerät",
      "envoi": "Versand (Frankreich)"
    },
    "priceOption": "optional",
    "orderTitle": "Bestellen & Abholen",
    "orderText": "Wenn du bestellen möchtest, schreib mir oder ruf mich an. Abholung vor Ort in Paris (20. Arrondissement) oder Versand innerhalb Frankreichs (25 €, für den Versand ist die Tasche Pflicht).",
    "contactPhone": "Telefon",
    "contactEmail": "E-Mail",
    "contactPickup": "Abholung",
    "contactShipping": "Versand möglich – Frankreich · 25 €",
    "paymentTitle": "Bezahlung",
    "paymentText": "Bezahlt wird auf das Konto des Vereins Résonances Productions.",
    "paymentIban": "IBAN",
    "paymentBic": "BIC",
    "coursesTitle": "Lust, mit mir zu lernen?",
    "coursesText": "Ich gebe Einzelunterricht auf dem Gonilélé (und mehr), per Video oder vor Ort in Paris, zum freien Preis ab einem Mindestbetrag: ab {lesson60} € pro Stunde oder ab {lesson90} € für 1 Std. 30 Min. (Paket mit 4 Stunden über 2 Monate: ab {packLesson60} € pro Stunde oder {packLesson90} € für 1 Std. 30 Min.).",
    "coursesCta": "Unterricht buchen"
  },
  "atlas": {
    "title": "Atlas-Handpan-Ständer – Atlas Pro & Atlas All | David Lesage",
    "description": "Die magnetischen Dreibeinständer Atlas für den Handpan, hergestellt in Italien: Atlas Pro aus Aluminium (250 €) und Atlas All aus Holz (270 €), −10 % mit dem Code DAVID-ATLAS. Technische Daten, Fotos und Ausprobieren in Paris bei David Lesage, Partner der Marke.",
    "back": "← Zurück zum Shop",
    "eyebrow": "Partner · Atlas Handpan",
    "heroProCaption": "Aluminium: derselbe Ständer, aufgeklappt und zusammengeklappt",
    "heroAllCaption": "Holz: ohne und mit Verlängerungen",
    "heightCm": "{n} cm",
    "heroTitle": "Die Atlas-Ständer",
    "heroLead": "Atlas stellt in Italien Dreibeinständer für Handpans her. Das Instrument wird weder verschraubt noch festgegurtet: Es liegt auf einer schwebenden Scheibe, die von Magneten gehalten wird. Ich bin Partner der Marke, und beide Modelle stehen im Showroom: der Atlas Pro und der Atlas All.",
    "ctaModels": "Beide Modelle ansehen",
    "ctaTry": "Zum Ausprobieren in den Showroom kommen",
    "ctaTryModel": "Im Showroom ausprobieren",
    "heroTryNote": "Beide Modelle stehen im Showroom in Paris (20. Arrondissement), zusammen mit den Handpans. Du legst ein Instrument darauf, stellst die Höhe ein, spielst – und dann weißt du es.",
    "whyTitle": "Was Atlas anders macht",
    "whyText": "Was Atlas auszeichnet, ist die Halterung. Das Instrument wird weder verschraubt noch festgegurtet: Es liegt auf einer schwebenden Scheibe, die von acht kratzfesten Magneten gehalten wird. Im Showroom stehen meine Handpans schon auf Ständern – so können sie von Hand zu Hand gehen, ohne jedes Mal abgelegt zu werden.",
    "whyPoints": [
      {
        "t": "Auf den Knien, im Sitzen, im Stehen",
        "d": "Atlas gibt für seine Modelle aus Holz drei Spielhaltungen an: das Instrument auf den Knien, im Sitzen auf einem Stuhl oder im Stehen. Der Atlas Pro dagegen ist für zwei angegeben: im Sitzen und im Stehen."
      },
      {
        "t": "Magnetische Halterung",
        "d": "Der Handpan liegt auf einer schwebenden Scheibe mit acht Magneten. Laut Atlas sind sie geschützt und genau unter den Stellen angebracht, an denen das Instrument die Auflage berührt: Nichts klemmt, drückt oder reibt am Metall."
      },
      {
        "t": "Hergestellt in Italien",
        "d": "Atlas ist eine kleine italienische Firma mit Sitz in Conegliano in Venetien. Dort werden beide Ständer entworfen und hergestellt."
      }
    ],
    "solutionFacts": [
      {
        "t": "Passt zu deinem Handpan",
        "d": "Laut Atlas ist die Auflage für alle Handpans entwickelt und mit vielen Herstellern getestet, und die Magnete funktionieren mit nitriertem Stahl, Edelstahl und Ember Steel."
      },
      {
        "t": "Kippt nicht und gleicht Unebenheiten aus",
        "d": "Atlas nennt einen Sicherungsstift gegen das Umkippen, einen abnehmbaren Zentrierring aus Gummi und Füße, die sich per Schraube verstellen lassen – damit gleichst du einen unebenen Boden aus."
      },
      {
        "t": "Vierzehn Tage, um es dir anders zu überlegen",
        "d": "Atlas bietet eine kostenlose Rücksendung innerhalb von vierzehn Tagen an, das Rücksendeetikett liegt dem Karton bei. Und wenn du im Showroom vorbeikommen kannst, hast du dich schon vor der Bestellung entschieden."
      }
    ],
    "storyEyebrow": "Meine Erfahrung",
    "storyTitle": "Warum ich im Stehen spiele",
    "storyIntro": "Seit ich Handpan spiele, habe ich immer im Stehen gespielt. Erstens, weil ich Sänger bin, und das ist für mich die beste Haltung, um frei zu singen. Zweitens, weil ich Multiinstrumentalist bin: Ich habe ein elektronisches Kick-Pedal am Fuß und mehrere Instrumente um mich herum. Und weil es mit Abstand die ausgleichendste Haltung für den Körper ist. Ein Handpan-Ständer ist in meinem Beruf also kein Zubehör: Er macht meine Art zu spielen erst möglich.",
    "storyVoiceTitle": "Zwei Handpans, ein Kick, eine N’Goni, eine Kalebasse – und ich singe",
    "storyVoiceText": "Das ist der Aufbau, den ich mit auf die Bühne nehme, und es ist der meiner Blind Audition bei The Voice. Alles steht, alles ist in Reichweite, und nichts funktioniert, wenn die Instrumente nicht auf der richtigen Höhe sind. Das ist ganz konkret: ein paar Zentimeter zu viel, und ich singe nicht mehr sauber; ein paar Zentimeter zu wenig, und ich komme nicht mehr an meine Bässe.",
    "storyVoiceCta": "Werdegang ansehen",
    "storyStandsTitle": "Die Ständer, die ich vor Atlas verschlissen habe",
    "storyStandsIntro": "Ich habe mehrere ausprobiert und sie am Ende endgültig verschlissen. Ich spreche hier von MEINEN Exemplaren und MEINER Nutzung – die Bühne, die Reisen, mehrere Dutzend Auftritte im Jahr:",
    "storyStands": [
      {
        "t": "Jacomina Kistemaker",
        "d": "Ich habe zwei ihrer Modelle. Sie ist eine Herstellerin, die ich respektiere, und ihre Ständer haben mich lange begleitet."
      },
      {
        "t": "Meinl",
        "d": "Meiner ist stabil, wirklich. Aber er ist mir zu schwer zum Mitnehmen: Wenn ich zum Spielen losfahre, ist das ein Kriterium, das alles entscheidet."
      },
      {
        "t": "S Pan",
        "d": "Bis heute ist er meine Wahl, und er hat echte Qualitäten: leicht, einfach zu transportieren. Bei meinem haben am Ende die Gleitsysteme und die 3D-gedruckten Teile nachgegeben – eines davon ist mit der Zeit gebrochen. Ich habe mich auch gefragt, ob das Saugnapf-Prinzip nicht einen Teil der Schwingung schluckt: Das ist eine Frage, die ich mir stelle, keine Messung, die ich gemacht habe."
      }
    ],
    "problemEyebrow": "Das Problem",
    "solutionEyebrow": "Die Lösung",
    "tryEyebrow": "Als Nächstes",
    "storyConclusionTitle": "Warum Atlas, warum jetzt",
    "storyConclusion": "Nach allem, was ich ausprobiert habe, ist es das erste Konzept, das jedes einzelne Problem löst, auf das ich gestoßen bin: eine magnetische Halterung statt eines Saugnapfs, ein Atlas Pro komplett aus Aluminium – Teleskopbeine inklusive – und 1,8 kg, die in ihre Tasche wandern. Ich bin überzeugt. Beide Ständer sind am 26. August 2026 angekommen, und ich habe sie ausprobiert.",
    "storyBridge": "Und es gibt eine Ironie, die mir gefällt: Derselbe Ständer ermöglicht genau die umgekehrte Haltung zu meiner. Mit seinem Kopfteil kannst du im Sitzen spielen, ohne das Instrument auf die Oberschenkel zu legen – eine Haltung, in der ich nie gespielt habe.",
    "storyBridgeCta": "Das Kopfteil des Ständers",
    "storyShowroomCaption": "Im Showroom ist es genauso: Meine beiden akustischen Yishama-Handpans bleiben auf ihren Ständern montiert, auf Spielhöhe, bereit zum Spielen. Ein Handpan-Ständer ist kein Zubehör, das man für Konzerte hervorholt – auf ihm lebt das Instrument.",
    "storyPlateauCaption": "Mein Bühnenaufbau, vor einem Konzert in einem Saal in der Schweiz. Ein Handpan-Ständer steht nie allein: Er steht mitten in allem anderen, und er bestimmt die Höhe von allem.",
    "storyFestivalCaption": "Everness Festival, Ungarn: im Stehen hinter meinen beiden akustischen Handpans von {yishama}, auf den Ständern, die ich damals benutzte.",
    "storyStandsPhotoCaption": "Mein Bühnenaufbau aus der Nähe: drei Instrumente, drei verschiedene Ständer und ebenso viele Höhen, die vor dem Spielen eingestellt werden müssen.",
    "partnerTitle": "Warum ich jetzt darüber spreche",
    "partnerText": "Die Partnerschaft mit Atlas ist gerade bestätigt worden: Ich bin jetzt im Partnerprogramm der Marke, und sie haben mir zwei Vorführständer für meine Treffen geschickt. Solange nichts unterschrieben war, wollte ich hier lieber nichts ankündigen – jetzt ist es so weit, also spreche ich darüber.",
    "testTitle": "Was ich vor euren Augen prüfen werde",
    "testText": "Ich bekomme sie in ein paar Tagen. Was ich auf dieser Seite sage, sage ich mit Sachkenntnis: Ich habe auf der Bühne vier verschiedene Ständer verschlissen und weiß genau, was ich suche. Was mir noch fehlt, ist die Praxis – deshalb filme ich, sobald beide Ständer im Showroom sind, meine eigene Vorführung, stelle sie hier ein und sage euch, was dabei herauskommt.",
    "videoSectionTitle": "Die Vorführung im Video",
    "videoTitle": "Warum Handpan im Stehen spielen – mein Video, mit Atlas",
    "videoSoon": "Demnächst",
    "videoNote": "Mein eigenes Video, veröffentlicht auf meinem YouTube-Kanal.",
    "videoDavidQuote": "Ich habe in alle oder fast alle Handpan-Ständer investiert, und ich erkläre dir, warum ich heute mit Atlas voll auf meine Kosten komme.",
    "videoDavidSource": "David Lesage in seinem YouTube-Video",
    "modelsTitle": "Zwei Modelle",
    "modelsIntro": "Beide machen dieselbe Arbeit: den Handpan auf einer schwebenden Magnetscheibe halten. Sie tun es nicht mit denselben Materialien und nicht im selben Höhenbereich. Hier steht, was der Hersteller angibt, ohne etwas hinzuzufügen.",
    "modelsDavidLead": "Über das Pro-Modell, in seinem Video:",
    "modelsDavidQuote": "Also, ich weiß nicht, was an ihm so viel professioneller ist, außer dass er aus Aluminium total stylisch ist und dass er sich dreimal schneller aufbauen lässt. Also ja, er ist viel professioneller und viel leichter, mit hochwertigen Materialien, die lange halten. Ultraschnell, viel schlanker, leicht zu transportieren und zu verstauen. Das Konzept ist genau dasselbe wie beim ersten.",
    "modelsDavidSource": "David Lesage in seinem YouTube-Video",
    "modelsDavidTodayLead": "Und heute, schriftlich:",
    "modelsDavidTodayQuote": "Der Pro hat einen Nachteil: Das Kopfteil aus Holz wird nicht angeboten, weder als Option noch im Lieferumfang, und das ist sein einziger Nachteil, aber man muss es erwähnen. Trotzdem ist mir der Pro lieber. Deshalb kann man das Kopfteil nicht allein zum Spielen im Sitzen benutzen, bei der Holzversion dagegen schon, aber sie braucht länger zum Aufbauen, ist sperriger beim Transport und weniger verstellbar.",
    "modelsDavidTodaySource": "David Lesage, 6. September 2026",
    "specs": {
      "price": "Angegebener Preis",
      "height": "Höhe",
      "weight": "Gewicht",
      "material": "Materialien",
      "mount": "Halterung",
      "positions": "Spielhaltungen",
      "bag": "Transport",
      "body": "Kopfteil Atlas Body",
      "bodyOption": "Kopfteil Atlas Body"
    },
    "heightValue": "von {min} cm bis {max} cm",
    "weightValue": "{w} kg",
    "priceNote": "Listenpreise inkl. MwSt., abgelesen auf der Website von Atlas am {date}. Maßgeblich bleibt der Preis, den Atlas zum Zeitpunkt deiner Bestellung anzeigt – zuzüglich Versandkosten.",
    "priceRegular": "regulärer Preis",
    "publicPrice": "Listenpreis",
    "codeBadge": "{now} mit meinem Code",
    "heroCodeTitle": "Mein Code bei Atlas: −{pct} %",
    "heroCodePrices": "Mit dem Code: {pro} · {all}",
    "buyCta": "Bei Atlas mit −{pct} % kaufen →",
    "buyHint": "Die Schaltfläche kopiert den Code und öffnet dann die Website von Atlas in einem neuen Tab.",
    "buyCopied": "Code {code} kopiert ✓ – füge ihn beim Bezahlen bei Atlas ein.",
    "savingLine": "{name}: {was} → {now} mit dem Code ({save})",
    "heroCodeText": "Gilt für alle Atlas-Produkte, auch für den Atlas Body. Gib ihn beim Bezahlen auf der Website von Atlas ein.",
    "codeReminder": "Gib beim Bezahlen auf der Website von Atlas meinen Code {code} ein: −{pct} %.",
    "bodyCodeReminder": "Mein Code {code} gilt auch für den Atlas Body: −{pct} % beim Bezahlen auf der Website von Atlas.",
    "pro": {
      "name": "Atlas Pro",
      "tagline": "Aluminium, ausziehbar, mit Tasche",
      "text": "Das Modell aus Aluminium. Seine drei Teleskopbeine lassen sich stufenlos und unabhängig voneinander einstellen, dank Schnellverschluss ist es in wenigen Sekunden aufgebaut und wieder zusammengeklappt, und für den Transport legt sich das Gestell in sich zusammen. Atlas gibt 1,8 kg an, und die Tasche Atlas Bag ist dabei.",
      "material": "Leichtes Aluminium, Teleskopbeine",
      "mount": "Schwebende Scheibe, 8 Magnete mit Kratzschutz",
      "positions": "Im Sitzen oder Stehen, stufenlos einstellbar",
      "bag": "Transporttasche Atlas Bag inklusive",
      "body": "Holzteil nicht enthalten"
    },
    "all": {
      "name": "Atlas All",
      "tagline": "Holz, mit Verlängerungen erweiterbar",
      "text": "Das Modell aus Holz. Sein Hauptkörper kommt aus dem 3D-Drucker und sitzt auf einem Holzsockel mit einer Spitze, die das Kippen verhindert. Die Beine sind 41 cm lang, und jedes endet in einer Schraube, mit der du die Neigung um bis zu 10 cm einstellst. Schraubst du auf jedes der drei Beine eine Verlängerung von 41 cm, wechselst du vom Sitzen zum Stehen.",
      "material": "3D-gedruckter Körper; Sockel, Verlängerungen und Beine aus Holz",
      "mount": "Schwebende Scheibe, 8 Magnete mit Kratzschutz",
      "positions": "Auf den Knien, im Sitzen (ohne Verlängerungen) oder im Stehen (mit Verlängerungen)",
      "body": "Inklusive: Er ist das Grundteil der Holzreihe"
    },
    "headEyebrow": "Der Kopf des Ständers",
    "headTitle": "Ein Ständer – aber nicht nur ein Ständer",
    "headIntro": "Der obere Teil des Ständers, den Atlas selbst Atlas Body nennt, ist nicht nur ein Stück, das man auf Beine schraubt. Zwischen die Oberschenkel geklemmt, hält er den Handpan über deinem Schoß, während du auf einem Stuhl oder Sofa sitzt und spielst – ohne Standbeine, ohne Dreibein und ohne das Instrument auf deine Beine zu legen.",
    "headPoints": [
      {
        "t": "Das Instrument liegt nicht mehr auf dir",
        "d": "Der Kopf trägt den Handpan, nicht deine Oberschenkel. Atlas nennt für seine Holzreihe drei Spielpositionen: auf den Knien, im Sitzen, im Stehen."
      },
      {
        "t": "Die Töne auf der Unterseite bleiben erreichbar",
        "d": "Das Instrument liegt nicht mehr an deinem Körper an. Atlas hebt hervor, dass man die Töne ungehindert erreicht – was vor allem zählt, wenn dein Handpan auch Töne auf der Unterseite hat."
      },
      {
        "t": "Ein offener Kopf",
        "d": "Der Ring ist hohl und offen. Laut Atlas lässt diese hohle Form den Klang ungehindert zirkulieren."
      }
    ],
    "headAcousticTitle": "Was Atlas über den Klang sagt",
    "headAcousticText": "Atlas schreibt, sein Ständer sei „aus der Suche nach einem besseren Klang entstanden“, er „absorbiert keine Schwingungen und verstärkt die Resonanz“, und „seine hohle Form lässt den Klang ungehindert zirkulieren“. Über den Kopf allein heißt es, er verbessere die Kontrolle über das Instrument, „ohne die Schwingungen zu behindern“.",
    "headAcousticNote": "Das sind ihre Worte, nicht meine: Beim Klang übernehme ich keine Behauptung, ohne sie selbst gehört zu haben. Was ich dazu sage, steht in meinem Video – hier ist es.",
    "headAcousticDavidLead": "Über seinen alten Ständer mit Saugnäpfen, dann über den Atlas-Kopf:",
    "headAcousticDavidQuote1": "Dieses Saugsystem hat einen Nachteil: Es schluckt die Schwingungen des Handpans, und das ist nicht so toll, weil man dadurch den Klang des Handpans verliert, jedenfalls einen Teil davon.",
    "headAcousticDavidQuote2": "Dass er Löcher hat, na ja, das ist superwichtig, weil der Klang des Handpans dadurch entweichen kann.",
    "headAcousticDavidSource": "David Lesage in seinem YouTube-Video",
    "headIncludedTitle": "Inklusive oder extra zu kaufen?",
    "headIncluded": [
      {
        "t": "Atlas All – inklusive",
        "d": "Die Holzreihe ist modular: Der Kopf ist das Grundteil, daran schraubt man die Beine für den Atlas Short, dann die Verlängerungen für den Atlas All. Mit dem Atlas All hast du also alle drei Positionen."
      },
      {
        "t": "Atlas Pro – das Holzteil ist nicht dabei",
        "d": "Marco Agri, der Erfinder von Atlas, hat es mir direkt bestätigt: „atlas pro doesn’t come with the wood part“. Der Pro lässt sich vom Sitzen bis zum Stehen einstellen, aber der Holzkopf, mit dem du auf den Knien spielst, gehört nicht dazu. Besser, du weißt das vor der Bestellung als erst beim Öffnen des Kartons."
      },
      {
        "t": "Atlas Body – nur der Kopf",
        "d": "Atlas bietet ihn auch einzeln an (165 €). Den schaut man sich an, wenn man nur auf den Knien spielen will oder einen Ständer der Holzreihe ausbauen möchte: Das Paket aus Beinen und Verlängerungen (105 €) macht daraus einen Atlas Short, dann einen Atlas All."
      }
    ],
    "headCompatTitle": "Alle Teile passen zueinander",
    "headCompatText": "Das ist die zweite Sache, die Marco Agri mir bestätigt hat: „all parts are fully compatible with the others“. Die nützlichste Folge: Hast du schon einen Atlas All oder einen Atlas Short, besitzt du das Holzteil bereits – es lässt sich unverändert auf einen Atlas Pro setzen, nichts geht verloren. Und wenn du bei null anfängst und gleich alle drei Positionen willst, bekommst du sie heute mit dem Atlas All.",
    "headCompatSource": "Marco Agri, Erfinder von Atlas – Nachricht vom 20. August 2026",
    "buyTitle": "Wo bestellen",
    "buyText": "Bestellt wird auf der Website von Atlas. Atlas gibt etwa 12 € Versandkosten für Europa an, und die Rücksendung ist innerhalb von 14 Tagen kostenlos, das Rücksendeetikett liegt im Karton bei.",
    "buyNote": "Lieferzeit und Garantiedauer stehen nicht auf ihrer Website: Frag vor der Bestellung bei ihnen nach, oder schreib mir, und ich frage für dich nach.",
    "showroomTitle": "Vor dem Kauf ausprobieren",
    "showroomText": "Beide Ständer stehen im Showroom in Paris (20. Arrondissement), neben den Handpans. Du kannst ein Instrument daraufsetzen, die Höhe einstellen, im Stehen spielen und herausfinden, welcher der beiden zu dir passt – ohne etwas zu kaufen.",
    "showroomPoints": [
      "Beide Modelle nebeneinander, nicht zwei Fotos",
      "Ein Handpan liegt darauf: Du stellst die Höhe selbst ein, erst im Sitzen, dann im Stehen",
      "Ohne etwas zu kaufen – du gehst mit deiner Meinung nach Hause, nicht mit einem Karton"
    ],
    "showroomAgendaCta": "Nächste Termine ansehen",
    "showroomPhotoCaption": "Der Showroom, aufgebaut vor einem Treffen: meine zwei akustischen Handpans von Yishama und meine zwei elektronischen Handpans von {neotone}, jeder auf seinem eigenen Ständer – vier Instrumente, vier verschiedene Ständer. Die beiden Atlas haben dort inzwischen ihren Platz gefunden, und dort kannst du sie ausprobieren.",
    "promoTitle": "Mein Code bei Atlas",
    "promoText": "Hier ist mein Code: −{pct} % auf alle Atlas-Produkte, auch auf den Atlas Body. Du gibst ihn beim Bezahlen auf der Website von Atlas ein – ob du online bestellst oder nachdem du sie im Showroom ausprobiert hast.",
    "promoDisclosure": "Dieser Code ist mein Botschafter-Link bei Atlas: Du zahlst dadurch keinen Cent mehr, und an dem, was ich dir weiter oben geschrieben habe, ändert er nichts.",
    "alt": {
      "showroomYishama": "David Lesage im Showroom von Le Nid in Paris: hinter ihm zwei akustische Yishama-Handpans aus Stahl, jeder auf seinem schwarzen Dreibein auf einem geflochtenen Teppich, in einem großen weißen Raum mit beleuchteten Bögen und hellem Parkett.",
      "showroomInstruments": "Der Showroom von David Lesage, aufgebaut vor einem Treffen: zwei elektronische Neotone-Handpans mit leuchtendem Ring auf schwarzen Dreibeinen neben einem elektronischen Percussion-Kit, und zwei akustische Yishama-Handpans aus Stahl, einer auf einem Holzdreibein, der andere auf einem Metallständer; im Vordergrund eine Kalebassen-Halbkugel auf einem roten Teppich, altes Parkett, Lichterketten und eine Rosette an der Wand.",
      "stageStanding": "David Lesage steht im Scheinwerferlicht auf der Bühne hinter seinen zwei Handpans auf Ständern, umgeben von seinen Stativen, seinen Pedalen und einer Kalebasse auf dem roten Teppich.",
      "stageStands": "Nahaufnahme von David Lesages Bühnenaufbau: drei Handpans auf Ständern aus Holz und Metall in Handhöhe, ein Notenständer und ein Laptop, Kabel und Pedale am Boden.",
      "stageFestival": "David Lesage allein auf der Bühne des Everness Festival in Ungarn: Er steht barfuß hinter seinen zwei akustischen Handpans auf schwarzen Dreibeinen, unter grünen und roten Lichtstrahlen, vor einem großen bunten gewebten Tuch; vor ihm liegt eine Kalebassen-Halbkugel auf dem Boden.",
      "stagePlateau": "Die Bühne von David Lesage, aufgebaut und noch leer vor einem Konzert, von seinem Platz aus gesehen: ein Handpan auf einem schwarzen Dreibein in der Mitte auf Perserteppichen, eine Kalebasse, eine Djembe, ein Kick-Pedal am Boden, ein Steuerpult, zwei aufgeklappte Laptops und ein Monitorlautsprecher, gegenüber ein großer Saal mit Parkett und weißen Säulen.",
      "allHeightLow": "Der Ständer Atlas All aus hellem Holz ohne Verlängerungen, auf weißem Hintergrund: die drei kurzen Beine unter den schwarzen Kopf geschraubt, in niedriger Position.",
      "allHeightHigh": "Derselbe Ständer Atlas All aus hellem Holz mit seinen Verlängerungen, auf weißem Hintergrund: Die Beine sind doppelt so lang, in hoher Position.",
      "proTwoHeights": "Zwei Ständer Atlas Pro nebeneinander auf grauem Hintergrund: Der linke ist in hoher Position ausgefahren und trägt einen Handpan aus Stahl, der rechte ist auf niedrige Position eingestellt, mit eng zusammengestellten Beinen.",
      "bodySeated": "Eine Person sitzt auf einem Sofa und spielt einen Handpan, den der zwischen ihren Oberschenkeln eingeklemmte Atlas Body hält: Das Instrument berührt ihre Beine nicht.",
      "bodySide": "Seitenansicht derselben Spielhaltung im Sitzen: Der Handpan ruht auf dem Kopfteil Atlas Body, der ihn über den Beinen der spielenden Person hält.",
      "bodyAlone": "Der Atlas Body allein vor grauem Hintergrund: der durchbrochene schwarze Ring, seine ringförmig angeordneten runden Magnete und sein Zentrierstab aus Holz, auf einem gedrechselten Holzsockel.",
      "proOpen": "Der Dreibeinständer Atlas Pro aufgeklappt vor weißem Hintergrund: ein durchbrochener schwarzer Ring aus Aluminium, durch den ein Zentrierstab aus hellem Holz führt, und drei gespreizte Beine.",
      "proHigh": "Der Dreibeinständer Atlas Pro in hoher Position, seine drei Teleskopbeine ganz ausgezogen.",
      "proDisc": "Nahaufnahme des Kopfteils des Atlas Pro: Der schwarze Ring trägt acht runde Metallmagnete, paarweise angeordnet, und in der Mitte führt der Zentrierstab aus hellem Holz hindurch.",
      "proLock": "Nahaufnahme der Arretierung eines Teleskopbeins des Atlas Pro: der Schnellspannring aus Metall.",
      "proClosed": "Der Atlas Pro zusammengeklappt: Die drei Beine liegen eng am Körper an, bereit zum Verstauen.",
      "proBag": "Der zusammengeklappte Atlas Pro neben seiner Transporttasche Atlas Bag aus schwarzem Stoff mit dem Atlas-Logo.",
      "proParts": "Der Atlas Pro in zwei Teile zerlegt: auf der einen Seite das magnetische Kopfteil, auf der anderen der Block mit den drei Teleskopbeinen.",
      "allPlaying": "Ein Musiker spielt im Stehen auf einem Handpan, der in einem Wohnzimmer auf dem Dreibeinständer Atlas All steht: Die drei Beine aus hellem Holz sind in hoher Position ausgeklappt.",
      "allHigh": "Der Dreibeinständer Atlas All mit seinen Verlängerungen montiert, in Stehposition: lange Beine aus hellem Holz und ein schwarzes Kopfteil.",
      "allLow": "Der Dreibeinständer Atlas All ohne seine Verlängerungen, in niedriger Position, der zum Spielen im Sitzen.",
      "allBody": "Der Hauptkörper des Atlas All: der durchbrochene schwarze Ring und sein Holzstab, auf dem gedrechselten Holzsockel.",
      "allDisc": "Die schwebende Scheibe des Atlas All von oben: ein schwarzer Ring mit acht runden Magneten, paarweise angeordnet, und in der Mitte der Zentrierstab aus hellem Holz.",
      "allScrew": "Zwei Hände schrauben eine Holzverlängerung des Atlas All auf ein Bein, der metallene Gewindeeinsatz ist zu sehen.",
      "allWood": "Die Holzteile des Atlas All flach ausgelegt: die Beine und die Verlängerungen mit ihren schwarzen Endkappen."
    },
    "heightFigureCaption": "Derselbe Ständer, zweimal fotografiert: links ganz ausgefahren, mit einem Handpan darauf; rechts ganz eingefahren. Der gesamte Bereich von 51 → 109 cm auf einem einzigen Bild.",
    "photosPro": "Der Atlas Pro in Bildern",
    "photosAll": "Der Atlas All in Bildern",
    "carousel": {
      "prev": "Vorheriges Foto",
      "next": "Nächstes Foto",
      "photo": "Foto",
      "photosOf": "Fotos"
    },
    "lightbox": {
      "close": "Schließen",
      "zoom": "Foto vergrößern"
    }
  },
  "lessons": {
    "title": "Handpan-Unterricht in Paris & online | David Lesage",
    "description": "Now Music Academy: Lerne Handpan, Rhythmus auf der Kalebasse und die Gonilélé-Harfe über Farben, Formen und Emotionen.",
    "heroEyebrow": "Now Music Academy",
    "heroTitle": "Lernen mit einem ganzheitlichen Zugang zur Musik",
    "heroLead": "Handpan, Rhythmus auf der Kalebasse und Gonilélé-Harfe – über Farben, Formen und Emotionen. Per Video überall auf der Welt oder vor Ort in Paris.",
    "ctaBook": "Unterricht buchen",
    "ctaWorkshop": "Zu den Workshops",
    "universesEyebrow": "Drei Welten",
    "universesTitle": "Was du bei mir lernen kannst",
    "universes": [
      {
        "t": "Handpan",
        "d": "Die visuelle Methode: Farben, Konstellationen und Emotionen machen die Harmonik klar und leicht zu merken – auf dem akustischen Handpan genauso wie auf dem Neotone.",
        "cta": "App entdecken"
      },
      {
        "t": "Rhythmus & Kalebasse",
        "d": "Meine Methode Now Groove: Lerne Rhythmus mit visuellen Emojis, auf der Kalebasse. Spielerisch, für alle zugänglich und tiefgründig.",
        "cta": "Die Methode Now Groove"
      },
      {
        "t": "Gonilélé-Harfe",
        "d": "Entdecke die Reise-Harfenlaute: Stimmen, intuitives und meditatives Spiel. Weitergegeben von mir, Botschafter von La Maison du Ngoni.",
        "cta": "Gonilélé entdecken"
      }
    ],
    "workshopsEyebrow": "Gruppen-Workshops",
    "workshopsTitle": "Termine der Rhythmus-Workshops · Kalebasse",
    "workshopsIntro": "Rhythmus-Workshops mit Now Groove vor Ort, auf der Kalebasse, in geselliger und fröhlicher Atmosphäre.",
    "workshopsEmpty": "Die nächsten Termine sind in Vorbereitung. Schreib mir, dann sage ich dir als Erstes Bescheid.",
    "workshopsCta": "Alle Termine ansehen",
    "workshopsContact": "Fragen & Anmeldungen:",
    "promiseEyebrow": "Mein Lehrversprechen",
    "promiseTitle": "Die visuelle Methode im Unterricht",
    "promiseIntro": "Im Unterricht nutze ich Handpan Constellation Studio: Farben, Akkord-Konstellationen und Emotionen machen die Harmonik klar und leicht zu merken – egal auf welchem Level du bist, vom neugierigen Kind bis zum erfahrenen Musiker.",
    "pillars": [
      {
        "t": "Verstehen",
        "d": "Sieh die Struktur der Musik, statt sie nur über dich ergehen zu lassen: Jeder Akkord wird zu einer Form und einer Farbe."
      },
      {
        "t": "Merken",
        "d": "Du prägst dir alles über Form und Emotion ein, nicht durch Auswendiglernen. Die Orientierungspunkte bleiben von Tonleiter zu Tonleiter gleich."
      },
      {
        "t": "Spielen & begleiten",
        "d": "Der Handpan wird zu einem echten Instrument für die Begleitung – sing zu den Liedern, die du liebst."
      }
    ],
    "methodPhotoAlt": "Im Unterricht: Die Hand eines Schülers spielt auf einem Neotone aus Holz, direkt daneben zeigt der Computer Handpan Constellation Studio im Logik-Modus – den farbigen Kreis der Stufen, auf dem Bildschirm ist die Erklärblase zu einer Stufe geöffnet.",
    "methodPhotoCaption": "Im Unterricht lasse ich den Logik-Modus vor dem Schüler offen: eine Stufe nach der anderen, auf dem Bildschirm erklärt, während er spielt.",
    "lightbox": {
      "close": "Schließen",
      "zoom": "Foto vergrößern"
    },
    "formulasEyebrow": "Tarife & Preise",
    "formulasTitle": "Wähle dein Format",
    "formulas": [
      {
        "title": "Einzelunterricht · 1 Std.",
        "price": "ab {lesson60} €",
        "text": "Per Video oder vor Ort in Paris. Handpan, Rhythmus auf der Kalebasse oder Gonilélé: Wir arbeiten an dem, was dich begeistert."
      },
      {
        "title": "Einzelunterricht · 1 Std. 30 Min.",
        "price": "ab {lesson90} €",
        "text": "Das ideale Format, um tiefer einzusteigen: Harmonik, Rhythmus, Begleitung, Tipps für Bühne und Studio."
      },
      {
        "title": "Gruppen-Workshop",
        "price": "Auf Anfrage",
        "text": "Gruppenstunden in kleiner Runde (Rhythmus auf der Kalebasse, Handpan …) in geselliger Atmosphäre. Format und Ort auf Anfrage."
      }
    ],
    "footnote": "Freier Preis ab dem angegebenen Betrag. Termine per E-Mail. Der Unterricht vor Ort in Paris ist eine natürliche Brücke zum Showroom und zu Begegnungen.",
    "packageTitle": "Paket: 4 Stunden in 2 Monaten",
    "packageText": "4 × 1 Std.: ab {pack60} € (also {packLesson60} € pro Stunde) · 4 × 1 Std. 30 Min.: ab {pack90} € ({packLesson90} € pro Stunde). Freier Preis ab diesen Beträgen; die 4 Stunden nutzt du innerhalb von 2 Monaten.",
    "packageCta": "Mit HelloAsso zahlen",
    "faqEyebrow": "FAQ",
    "faqTitle": "Häufige Fragen zum Unterricht",
    "faq": [
      {
        "q": "Kann man Handpan ohne Notenlesen und Musiktheorie lernen?",
        "a": "Ja, genau darum geht es bei der Methode. Der visuelle Zugang – die Farben der Töne und die Formen der Akkorde – ersetzt Notenlesen und Musiktheorie, damit du schnell vorankommst."
      },
      {
        "q": "Was kostet eine Handpan-Stunde?",
        "a": "Für den Unterricht gilt ein freier Preis ab einem Mindestbetrag: ab {lesson60} € für 1 Std., ab {lesson90} € für 1 Std. 30 Min., per Video oder vor Ort in Paris. Mit dem Paket aus 4 Stunden (innerhalb von 2 Monaten zu nutzen) sind es ab {pack60} € (1 Std.) oder ab {pack90} € (1 Std. 30 Min.), also ab {packLesson60} € bzw. {packLesson90} € pro Stunde. Gruppen-Workshops gibt es auf Anfrage."
      },
      {
        "q": "Funktioniert Online-Unterricht beim Handpan?",
        "a": "Ja, der Unterricht läuft per Video überall auf der Welt, mit derselben visuellen Methode wie vor Ort. Du brauchst nur dein Instrument und eine Internetverbindung."
      }
    ]
  },
  "studio": {
    "title": "Handpan Constellation Studio – akustischer Handpan & Neotone",
    "description": "Auf jedem akustischen Handpan – und auf dem Neotone. Lerne über Farben (ChromaKeys), Akkord-Konstellationen und Emotionen, ohne Noten lesen oder Theorie lernen zu müssen.",
    "heroEyebrow": "Die App – ein eigenes Projekt von David Lesage",
    "heroTitleA": "Handpan Constellation Studio",
    "heroTitleB": "Musik wird sichtbar",
    "heroLead": "Auf jedem Handpan: auf deinem akustischen Handpan ebenso wie auf dem elektronischen Neotone. Ein visueller Zugang zur Musik – über Farben, Emotionen und Geometrie –, um zu verstehen, dir etwas einzuprägen und zu spielen.",
    "heroBadges": [
      "Jeder akustische Handpan",
      "Elektronischer Neotone-Handpan"
    ],
    "ctaWait": "Auf die Warteliste",
    "ctaOpen": "App öffnen",
    "problemEyebrow": "Der Befund",
    "problemTitle": "Der Handpan hat keine visuelle Notation",
    "problem1Title": "Keine Notation zeigt das Instrument",
    "problem1Text": "Es ist ein wunderschönes Instrument – aber wie schreibt man es auf? Man lernt nach Gehör, durch Nachahmen, und nach den ersten Melodien spielt man immer wieder dieselben Muster: Das Instrument wird zu einem Wohlfühlbereich, den man nicht mehr verlässt.",
    "problem2Title": "Auf einem elektronischen Handpan verschwinden die Orientierungspunkte",
    "problem2Text": "Der Neotone wechselt die Tonleiter ohne Ende – eine Stärke, aber auch eine Falle: Die Töne unter deinen Fingern sind nie zweimal dieselben. Kein fester Punkt – das Gehirn ist überfordert, als müsste man das Instrument mit jeder Tonleiter neu lernen.",
    "chromaEyebrow": "Farben & Geometrie",
    "chromaTitle": "Und wenn wir das Unsichtbare sichtbar machen?",
    "chromaIntro": "Statt der Notennamen – die sich ständig ändern – zeigt die App die <strong>Struktur</strong> der Musik. Die sieben Stufen bekommen jeweils eine Farbe und eine Emotion. Die ChromaKeys geben jedem Ton seine eigene Farbe. Und jeder Akkord zeichnet eine leuchtende geometrische Form.",
    "chromaPunch": "Was unsichtbar war, wird sichtbar.",
    "constelEyebrow": "Die Sprache der Konstellationen",
    "constelTitle": "Die neue visuelle Tabulatur für den Handpan",
    "constelIntro": "Über die ChromaKeys-Farben hinaus verbindet die App die Töne eines Akkords: Sie zeichnet eine leuchtende Figur – eine <strong>Akkord-Konstellation</strong>. Drei Arten, sie zu zeichnen.",
    "constellations": [
      {
        "t": "Polygon",
        "d": "Die geschlossene Form eines Akkords: alle seine Töne verbunden. Du erkennst den Akkord auf einen Blick, an seiner Form."
      },
      {
        "t": "Offen",
        "d": "Eine offene Linie, die dem Weg der Töne folgt – ideal, um eine Handbewegung sichtbar zu machen."
      },
      {
        "t": "Hände",
        "d": "Die Linie, gedacht für die Bewegung: welche Hand, welcher Ton. Du liest dein Spiel direkt ab."
      }
    ],
    "degEyebrow": "Stufen & Emotionen",
    "degTitle": "Jede Stufe wird zu einer Emotion",
    "degIntro": "Eine Akkordfolge zu spielen heißt, eine Geschichte zu erzählen: das Zuhause verlassen, ins Abenteuer aufbrechen, eine Spannung durchqueren und dann zurückkehren. Man lernt keine abstrakten Regeln mehr auswendig – man fühlt, und man sieht.",
    "modesEyebrow": "Die App in vier Modi",
    "modesTitle": "Der ideale Begleiter für dein Instrument",
    "modesIntro": "Die ganze Methode steckt in einer einzigen Web-App.",
    "modes": [
      {
        "t": "Logik",
        "d": "Das Herz der App. Spiel die 7 Akkorde jeder beliebigen Tonleiter, bau deine Akkordfolgen und folge den Akkorden der Stücke, die du magst."
      },
      {
        "t": "Klangatlas",
        "d": "Entdecke Tonleitern aus aller Welt – Japan, Orient, Afrika, keltische Musik … Hör sie dir an, lerne sie, geh auf Reisen."
      },
      {
        "t": "Erstellen",
        "d": "Erstelle deine eigenen, maßgeschneiderten Tonleitern, Ton für Ton und Farbe für Farbe, und bewahre sie in deiner Bibliothek auf."
      },
      {
        "t": "MIDI Connect",
        "d": "Die Brücke zwischen deinem Neotone und der App: Dein tatsächliches Spiel erscheint in Echtzeit auf dem virtuellen Handpan, und die App führt dich durch deine Akkorde und Tonleitern."
      }
    ],
    "versionAcoEyebrow": "Auf welchem Handpan funktioniert das?",
    "versionAcoTitle": "Gedacht für deinen akustischen Handpan <span class=\"text-copper\">und</span> für den Neotone",
    "versionAcoText": "Die App ist weder dem einen noch dem anderen vorbehalten: Sie ist für beide gedacht und entwickelt. Aber sie ermöglicht auf beiden nicht dasselbe – und genau das macht beide interessant. Auf einem akustischen Handpan ist der Rahmen schon da: Die App macht ihn sichtbar. Auf dem Neotone wird alles möglich: Die App setzt den Rahmen. Eine einzige App, zwei Arten, etwas sichtbar zu machen.",
    "duoQuote1": "Die Elektronik bietet alles und enthüllt nichts; die Akustik gibt einen Rahmen vor – und einen Rahmen kann man erkunden.",
    "duoQuote2": "Ein Rahmen, den man versteht, macht freier als ein unendlicher Raum, in dem man sich verliert.",
    "duoQuoteSource": "David Lesage",
    "duoAcoTitle": "Auf einem akustischen Handpan",
    "duoAcoText": "Dein Instrument hat seine Töne, seine Tonleiter, seine Grenzen: Der Rahmen ist schon da. Die App macht ihn sichtbar, und was wie eine Einschränkung aussah, wird zu einem Gelände, das du erkunden kannst. Der Akustikmodus ist kostenlos: Für den Einstieg brauchst du keinen Neotone.",
    "versionAcoBullets": [
      "Deine Tonleiter erscheint in Farben auf dem Foto deines Handpans.",
      "Lerne neue Akkorde und Akkordfolgen, Schritt für Schritt angeleitet.",
      "Erkunde einen Atlas der Tonleitern nach Emotion – und erfinde deine eigene, maßgeschneidert."
    ],
    "versionAcoCaption": "Der Akustikmodus: der visuelle Ansatz von Handpan Constellation Studio, auf deinem eigenen Handpan.",
    "versionAcoPhotoCaption": "Im Showroom: mein akustischer Yishama-Handpan auf seinem Ständer, die App darüber, seine Akkorde als Konstellationen.",
    "versionNeoPhotoCaption": "Mein Neotone aus Holz, darüber das Tablet an einem Arm befestigt, das Notenblatt eines Stücks und seine Akkorde als Konstellationen.",
    "duoPhotoAco": "Mein akustischer Yishama-Handpan und die App.",
    "duoPhotoNeo": "Mein Neotone und die App.",
    "versionAcoCta": "App öffnen",
    "versionAcoYishamaLink": "Woher dieser Ansatz kommt: meine zwei Yishama-Handpans",
    "versionNeoTitle": "Auf dem Neotone",
    "versionNeoText": "Alle Tonleitern in einem einzigen Instrument: Alles wird möglich. Genau hier wird ein Rahmen nötig – sonst verliert man sich im Unendlichen. Die App setzt den Rahmen, den das Instrument selbst nicht mehr setzt.",
    "versionNeoBullets": [
      "Verbinde deinen Neotone per MIDI mit der App: Dein Spiel erscheint in Echtzeit auf dem virtuellen Handpan.",
      "Wechsle die Tonleiter, so oft du willst: Die Farben der 7 Stufen bleiben immer gleich.",
      "Die App führt dich durch deine Akkorde und Tonleitern – auf der, die du gerade geladen hast."
    ],
    "versionNeoCta": "Den Neotone entdecken",
    "lightbox": {
      "close": "Schließen",
      "prev": "Vorheriges Foto",
      "next": "Nächstes Foto",
      "zoom": "Foto vergrößern"
    },
    "seriesTitle": "Entdecke die App im Video",
    "seriesIntro": "Eine Reihe kurzer Videos, eine Funktion nach der anderen. Hier ist das erste.",
    "seriesEyebrow": "Die Videoreihe",
    "storyEyebrow": "Die Geschichte – von David Lesage",
    "storyTitle": "Das Werkzeug, mit dem ich als Kind gern gelernt hätte",
    "storyP1": "Als ich den Handpan entdeckte, stand ich wieder vor der Mauer meiner Kindheit: keine Methode und die Schwierigkeit, die Wege der Töne visuell zu ordnen. Dann, mit dem Neotone, eine neue Schwierigkeit: Die Töne wechseln mit jeder Tonleiter ihren Platz.",
    "storyP2": "Also habe ich das Werkzeug geschaffen, das ich mir gewünscht hätte: einen visuellen Zugang zur Harmonie, über Farben, Formen und Emotionen – um zu verstehen, mir etwas einzuprägen und endlich zu singen und mich dabei selbst auf dem Handpan zu begleiten.",
    "storyP3": "Es ist die logische Fortsetzung von <strong>Now Groove</strong>, meiner Rhythmusmethode (2021), die den Rhythmus über visuelle Emoticons zugänglich macht. Handpan Constellation Studio macht dasselbe für die Harmonie: ein Werkzeug, von einem Musiker erdacht, um den Handpan zu einem Instrument der Begleitung zu machen – wie die Gitarre oder das Klavier.",
    "waitTitle": "Die App ist verfügbar",
    "waitText": "Erstelle dein kostenloses Konto (Name, Vorname, E-Mail) und leg direkt in deinem Browser los. Wenn du fortfährst, akzeptierst du die AGB und die Datenschutzerklärung. Tarif wählen und sicher bezahlen kannst du direkt in der App.",
    "waitButton": "App öffnen",
    "contribEyebrow": "Eine lebendige Community",
    "contribTitle": "Du lädst keine App herunter – du wirst Teil eines lebendigen Projekts",
    "contribIntro": "Handpan Constellation Studio entwickelt sich ständig weiter, getragen von allen, die es nutzen. Deine Rückmeldung, mit einem Klick aus der App geschickt, wird gelesen und bestimmt direkt, wie es weitergeht.",
    "contribCards": [
      {
        "t": "Ständig in Entwicklung",
        "d": "Neue Funktionen, Tonleitern und Modi kommen regelmäßig dazu und sind inklusive. Die App, die du heute nutzt, wird morgen noch reicher sein."
      },
      {
        "t": "Deine Rückmeldung formt die App",
        "d": "Direkt aus der App schickst du deine Ideen und Rückmeldungen mit einem Klick. Jede Nachricht wird gelesen und bestimmt die nächsten Schritte."
      },
      {
        "t": "Eine Community, kein Katalog",
        "d": "Du wirst Teil einer Bewegung: Musik sichtbar und zugänglich machen. Gemeinsam bauen wir das Werkzeug, das wir uns als Kinder alle gewünscht hätten."
      }
    ],
    "priceEyebrow": "Preise",
    "priceTitle": "Kostenlos, Essenziell, Studio",
    "priceIntro": "Starte kostenlos, für immer und ohne Karte. Wechsle zu Essenziell oder Studio, wenn du weitergehen willst: Bei den Monatstarifen ist der erste Monat geschenkt.",
    "priceCta": "Ich wechsle zu Essenziell",
    "priceStudioCta": "Ich wechsle zu Studio",
    "pricePerYear": "/ Jahr",
    "priceOrYear": "Oder jährlich: {price} ({saving}), in einer Zahlung, ohne Testmonat",
    "priceFreeForever": "für immer, ohne Karte",
    "priceStudioPromise": "Ein Studio rund um deine Instrumente: deine Intonation, das Kopfhörer-Monitoring, zwei Handpans, die Bühne, MIDI und der Neotone.",
    "priceEssentialPromise": "Was du wirklich spielst: transponieren, offline spielen, eine Stelle in Schleife spielen, deine Notenblätter exportieren.",
    "priceFreeCta": "Kostenlos starten",
    "pricePerMonth": "/ Monat",
    "priceTtc": "inkl. MwSt.",
    "priceTrial": "1 kostenloser Testmonat",
    "priceComing": "Demnächst",
    "priceFree": {
      "name": "Kostenlos",
      "price": "",
      "blurb": "Ein kostenloses Konto, um den visuellen Ansatz der App zu entdecken."
    },
    "priceTiers": {
      "essential": {
        "name": "Essenziell",
        "blurb": "Bankkarte bei der Anmeldung hinterlegt; das Abo startet automatisch nach dem Testmonat und verlängert sich jeden Monat, jeder angefangene Monat ist zu zahlen; jederzeit kündbar zum Folgemonat."
      },
      "studio": { "name": "Studio", "blurb": "" },
      "prof": { "name": "Unterrichten", "blurb": "" }
    },
    "priceNote": "Alle Preise inkl. MwSt. Das Abo schließt du in der App ab und verwaltest es dort.",
    "videosEyebrow": "Die App in Bewegung",
    "videosTitle": "Sieh Handpan Constellation Studio in Aktion",
    "videosIntro": "Zwölf Videodemos der App – klick auf ein Vorschaubild, um das Video im Vollbild abzuspielen.",
    "videos": [
      {
        "t": "Tonart wählen",
        "d": "Setz einen Ankerton (hier C), und die 7 farbigen Stufen erscheinen."
      },
      {
        "t": "Tonleiter anhören",
        "d": "Die App spielt die Tonleiter Ton für Ton auf dem Handpan ab."
      },
      {
        "t": "Das Auge der Stufe",
        "d": "Klick auf das Auge einer Stufe (hier die I), um ihren Akkord einzeln anzuzeigen."
      },
      {
        "t": "Bonustöne",
        "d": "Über die 7 Stufen hinaus erscheinen die zusätzlichen Töne mit einem Stern."
      },
      {
        "t": "Linienstile",
        "d": "Eine Konstellation, drei Arten, sie zu lesen: Polygon, Offen oder Hände."
      },
      {
        "t": "Transponieren",
        "d": "Verschieb den Ankerton (C → F): Die Form des Akkords bleibt an derselben Stelle."
      },
      {
        "t": "Farbe ↔ Chakra",
        "d": "Jede Stufe trägt die Farbe ihres Chakras."
      },
      {
        "t": "Fingersätze",
        "d": "Die App schlägt einen Fingersatz für linke / rechte Hand vor."
      },
      {
        "t": "Akkorde spielen",
        "d": "Starte die Wiedergabe: Jede Stufe leuchtet nacheinander auf, und ihr Akkord entfaltet sich."
      },
      {
        "t": "Interaktives Lernen",
        "d": "Der Handpan wird zur geführten Spielfläche: Tippe auf einen farbigen Ton."
      },
      {
        "t": "Klangatlas",
        "d": "Blättere in einer Bibliothek mit Tonleitern aus aller Welt."
      },
      {
        "t": "Kreation",
        "d": "Stell deine eigene Tonleiter auf dem chromatischen Kreis zusammen."
      }
    ],
    "faqEyebrow": "FAQ",
    "faqTitle": "Was ich zu Handpan Constellation Studio oft gefragt werde",
    "faq": [
      {
        "q": "Brauche ich einen Neotone, um Handpan Constellation Studio zu nutzen?",
        "a": "Nein. Handpan Constellation Studio funktioniert mit jedem akustischen Handpan, im kostenlosen Akustikmodus, genauso wie mit dem elektronischen Handpan Neotone. Für den Anfang brauchst du das elektronische Instrument nicht."
      },
      {
        "q": "Funktioniert Handpan Constellation Studio mit einem akustischen Handpan?",
        "a": "Ja, der Akustikmodus ist kostenlos. Du siehst deine Tonleiter in Farben und lernst deine Akkorde direkt auf deinem eigenen akustischen Instrument."
      },
      {
        "q": "Was sind ChromaKeys?",
        "a": "Das ist das Farbsystem der Methode: Jeder Ton bekommt eine feste Farbe. So siehst du die Struktur der Musik auf einen Blick, ohne Notenlesen und Musiktheorie."
      },
      {
        "q": "Was ist eine Akkord-Konstellation?",
        "a": "Das ist die visuelle Tabulatur der Methode: Jeder Akkord zeichnet eine geometrische Form, die seine Töne verbindet. So erkennst du deine Akkorde an ihrer Form und merkst sie dir."
      },
      {
        "q": "Ist Handpan Constellation Studio kostenlos?",
        "a": "Handpan Constellation Studio bietet viele Funktionen, und deine Nutzung entscheidet, was kostenlos ist und was nicht. Den Handpan selbstständig auf deinem eigenen akustischen Instrument zu lernen, ist kostenlos: deine Tonleiter in Farben sehen, deine Akkorde erkennen, spielen, deine Notenblätter erstellen und exportieren. Kostenpflichtig wird, was über dein persönliches Üben hinausgeht: der Elektronikmodus Neotone/MIDI, die erweiterte Kreation, die Speicherung in der Cloud. Und wenn du die App als Arbeitswerkzeug in Unterricht nutzt, den du dir bezahlen lässt, ist es die Lizenz „Unterrichten“, mit dem Bereich für Schüler, den Übungen und den Notenblättern ohne Wasserzeichen, die dazugehören. Die aktuellen Preise stehen direkt darunter."
      }
    ]
  },
  "showroom": {
    "title": "Einen Handpan in Paris ausprobieren: akustisch und elektronisch | David Lesage",
    "description": "Wo du in Paris einen Handpan ausprobieren kannst, akustisch und elektronisch am selben Tag: den Neotone, meine Yishama-Handpans und die Gonilélé-Harfe, in Paris (20. Arrondissement).",
    "heroEyebrow": "Showroom David Lesage · Le Nid, Paris (20. Arrondissement)",
    "heroTitle": "Einen Handpan in Paris ausprobieren – akustisch und elektronisch, am selben Tag",
    "heroLead": "Ein kostenloses Treffen, etwa fünfzehn Leute, und alles, was ich spiele, für dich ausgepackt: der Neotone als Hauptattraktion, meine akustischen Yishama-Handpans, die afrikanische Gonilélé-Harfe, die Kalebasse und die Handpan-Mikrofone. Du hörst sie, du spielst sie, am selben Tag.",
    "promiseEyebrow": "Was du hier erlebst",
    "promiseTitle": "Ein seltenes Erlebnis, alles an einem einzigen Ort",
    "promiseLead": "Einen Neotone kostenlos testen und mit ihm weitere seltene Instrumente und ihr Zubehör: Das alles an einem einzigen Ort, das ist einzigartig. Aber das Wertvolle ist das Erlebnis der Begegnung – mit mir, mit den Instrumenten, mit den anderen, mit dir selbst.",
    "promise": [
      {
        "t": "Mit mir",
        "d": "Du stellst deine Fragen und bekommst die Antworten direkt, im Gespräch. Kein Produktblatt, sondern jemand, der dir gegenübersitzt, diese Instrumente jeden Tag spielt und allen antwortet, vom neugierigen Anfänger bis zum erfahrenen Musiker."
      },
      {
        "t": "Mit den Instrumenten",
        "d": "Du machst deine eigene Erfahrung mit dem Instrument: Du spielst selbst. Der Neotone, meine akustischen Handpans, die Gonilélé-Harfe, die Kalebasse, die Mikrofone – seltene Instrumente, die du nirgendwo sonst an einem Ort versammelt findest und die du in die Hand nimmst, ohne etwas kaufen zu müssen."
      },
      {
        "t": "Mit den anderen",
        "d": "Du triffst andere Begeisterte. Wir sind etwa fünfzehn, nicht mehr: Genau deshalb redet man wirklich miteinander, und es entstehen Verbindungen – die Gespräche gehen noch lange nach dem Ende weiter."
      },
      {
        "t": "Mit dir selbst",
        "d": "Das ist am schwersten zu beschreiben und das Einzige, was niemand an deiner Stelle erleben kann: was es mit dir macht, die Hände auf diese Instrumente zu legen und dich selbst darauf spielen zu hören."
      }
    ],
    "promiseNote": "Du lernst auch Handpan Constellation Studio kennen, die App, die ich entwickelt habe, um Musik sichtbar zu machen. Und es ist kostenlos: Das öffentliche Treffen kostet nichts – du musst nur deinen Platz reservieren.",
    "shareTitle": "Zusammen erlebt man das besser",
    "shareText": "Du kannst gern jemanden mitbringen – oft ist es sogar besser: Dann hast du hinterher jemanden, mit dem du darüber reden kannst. Schick einfach diese Seite weiter, und jeder reserviert seinen Platz selbst (eine Anmeldung pro Person, damit ich weiß, wie viele wir sind).",
    "shareCta": "Diese Seite an jemanden schicken",
    "shareCopied": "Link kopiert – du musst ihn nur noch einfügen",
    "ctaBook": "Privaten Einzeltermin buchen (kostenpflichtig)",
    "ctaBookNote": "Kostenpflichtiger Einzeltermin: {grid}. Die öffentlichen Treffen dagegen sind kostenlos – etwa fünfzehn Personen, nicht mehr, damit alle Zeit zum Spielen haben · Reservierung erforderlich.",
    "ctaNext": "Nächstes Treffen ansehen",
    "exclBadge": "★ Weltpremiere",
    "exclTitle": "Nimm deinen Neotone¹ noch am selben Tag mit",
    "exclText": "Ich stehe dazu: Soweit ich weiß, ist Le Nid nach der Fertigungswerkstatt in Budapest der erste Ort der Welt, an dem man diese Instrumente ausprobieren UND direkt vor Ort kaufen kann. Konkret heißt das: Du kannst deinen Neotone¹ genau hier kaufen und sofort mitnehmen – ganz ohne Fertigungszeit. Meine Yishama-Handpans dagegen sind nicht zu verkaufen: Es sind meine persönlichen Instrumente, sie sind da, um gehört und gespielt zu werden.",
    "exclArgs": [
      "7 % Rabatt – der beste Preis auf dem Markt (gegenüber 5 % online)",
      "Keine Fertigungs- oder Wartezeit",
      "Stark begrenzter Bestand – nur wenige Instrumente verfügbar"
    ],
    "franceClaim": "Der einzige Ort in Frankreich, an dem man diese Instrumente direkt ausprobieren und kaufen kann.",
    "onsiteEyebrow": "Vor Ort",
    "onsiteTitle": "Alles, was du vor Ort ausprobieren kannst: akustische Handpans, Neotone, Mikrofone",
    "duoEyebrow": "Die zwei Welten des Handpans",
    "duoTitle": "Akustischer und elektronischer Handpan, am selben Tag",
    "duoIntro": "Der Showroom ist nicht dazu da, dass du dich für eine Seite entscheidest. Beide Welten leben hier nebeneinander: Du hörst sie, du spielst sie, du spürst den Unterschied in deinen Händen. Kein Wettbewerb, sondern Ergänzung.",
    "duo": [
      {
        "sub": "Akustisch · Yishama",
        "title": "Meine zwei Yishama-Handpans",
        "text": "Meine persönlichen Instrumente sind da. Du spielst sie, du vergleichst sie und hörst, was gehämmertes Metall in einem Raum macht – erst ohne Verstärkung, dann abgenommen und verstärkt.",
        "points": [
          "Zwei Instrumente mit 18 Tönen, gestimmt auf 432 Hz",
          "Abgenommen mit den Mikrofonen von Hisong und Muling"
        ],
        "cta": "Meine Geschichte mit Yishama"
      },
      {
        "sub": "Elektronisch · Neotone",
        "title": "Die beiden Neotone",
        "text": "Einer am Lautsprecher, der andere am Kopfhörer. Du wechselst von einer Tonleiter zur nächsten, probierst die Effekte und die Aufnahmefunktion aus – so lange, wie du brauchst.",
        "points": [
          "Alle Tonleitern in einem einzigen Instrument",
          "Einer am Lautsprecher, einer am Kopfhörer, Effekte inklusive"
        ],
        "cta": "Neotone entdecken"
      }
    ],
    "duoNote": "Um es klar zu sagen: Nur der Neotone ist hier auf Lager – er ist der Einzige, den du am selben Tag mitnehmen kannst. Die Yishama sind meine persönlichen Instrumente: Sie sind da, um gehört und gespielt zu werden, und wenn du deinen eigenen willst, verweise ich dich an die Werkstatt (ich bin Botschafter der Marke und Mitglied ihres Partnerprogramms).",
    "alsoEyebrow": "Und nicht nur der Handpan",
    "alsoTitle": "Alles andere, was ich spiele, ist auch da",
    "alsoIntro": "Der Neotone ist die Hauptattraktion des Treffens – aber du musst nicht seinetwegen kommen. Diese Instrumente sind ebenfalls ausgepackt, und du kannst sie genauso in die Hand nehmen wie die Handpans.",
    "also": [
      {
        "title": "Die Gonilélé-Harfe",
        "text": "Die westafrikanische Harfenlaute von La Maison du Ngoni, in der Reiseversion: Klangkörper aus Kalebasse, Hals aus Edelholz, Saiten auf eine pentatonische Tonleiter gestimmt. Intuitiv und meditativ – man findet ohne jede Vorkenntnis hinein.",
        "cta": "Gonilélé entdecken"
      },
      {
        "title": "Die Kalebasse",
        "text": "Ich spiele die Kalebasse seit 2012 als Perkussionsinstrument. Sie ist auch das Herzstück meiner Rhythmusmethode Now Groove: ein organisches Schlagzeug mit natürlichem Klang, samt Matte und Shakern.",
        "cta": "Kalebassen-Set ansehen"
      },
      {
        "title": "Die Handpan-Mikrofone",
        "text": "Das Hisong AirStudio S1 und das Muling-Set (MP1 + Vorverstärker HMP-2). Wir schließen sie an meine akustischen Handpans an, und du hörst live im direkten Vergleich, was jedes davon verändert.",
        "cta": "Mikrofone ansehen"
      }
    ],
    "alsoNote": "Du kommst wegen eines bestimmten Instruments? Kreuz es an, wenn du deinen Platz reservierst: Ich bereite es für das Treffen vor.",
    "tambourEyebrow": "Partner · L’Âme du Tambour",
    "tambourTitle": "Die Schamanentrommel",
    "tambourText": "Die handgefertigten Rahmentrommeln von Julien – „l’Âme du Tambour“, ein stimmiger, leidenschaftlicher und integrer Hersteller. Die Trommel ist nicht bei jedem Treffen dabei: Sie kommt je nach den Anwesenden und ihren Interessen hervor. Sag mir bei der Reservierung, dass sie dich reizt, dann berücksichtige ich das.",
    "tambourCta": "Trommel im Shop ansehen",
    "alsoAlt": {
      "gonileleProduit": "Die Gonilélé-Harfe, an einen Baumstamm gelehnt: runder Klangkörper aus Kalebasse mit Fellbespannung, langer geschnitzter Hals aus hellem Holz und zehn Saiten, die zu den Stimmmechaniken gespannt sind.",
      "calebasse": "Das Kalebassen-Set von Now Groove: eine halbe Kalebasse, umgedreht auf eine große Fellmatte gelegt, mit zwei blauen eiförmigen Shakern.",
      "hisong": "Ein akustischer Handpan auf einer Matte, neben dem Mikrofon Hisong AirStudio S1 auf seinem Sockel, seinen Ohrhörern und dem Tablet, das die Einstell-App des Mikrofons zeigt.",
      "muling": "Die Unterseite eines akustischen Handpans mit dem Muling-Set: zwei rote Kontaktabnehmer, auf den Korpus geklebt und über ihre Kabel mit dem Vorverstärker HMP-2 verbunden, der auf dem Boden steht."
    },
    "atlasEyebrow": "Neu · Atlas-Partner",
    "atlasTitle": "Und etwas, worauf du deinen Handpan stellen kannst",
    "atlasIntro": "Atlas stellt in Italien Handpan-Ständer her: Das Instrument liegt auf einer schwebenden Scheibe, die von acht kratzfesten Magneten gehalten wird, ohne Schrauben oder Gurte, die man am Metall festziehen muss. Ich bin Partner der Marke geworden, und sie hat mir ihre beiden Modelle zur Vorführung geschickt. Sie stehen bei den Handpans – du kannst ein Instrument darauflegen und die Höhe selbst einstellen.",
    "atlasModels": [
      {
        "name": "Atlas Pro",
        "text": "Aus Aluminium, 1,8 kg. Seine Teleskopbeine lassen sich stufenlos von 51 bis 109 cm verstellen, er ist in wenigen Sekunden zusammengeklappt und reist in seiner mitgelieferten Tasche."
      },
      {
        "name": "Atlas All",
        "text": "Aus Holz, von 50 bis 96 cm. Das Kopfteil klemmst du zwischen die Knie, um im Sitzen zu spielen, ohne das Instrument auf die Oberschenkel zu legen; danach schraubst du die Beine und die Verlängerungen an, um im Stehen zu spielen."
      }
    ],
    "atlasCta": "Alles über die Atlas-Ständer",
    "lieuEyebrow": "Der Ort · Le Nid",
    "lieuTitle": "So sieht ein Treffen in Le Nid aus – Paris (20. Arrondissement)",
    "lieuIntro": "Eine Atelierwohnung im 20. Arrondissement, Parkett, Lichterketten, und alle sitzen im Kreis um die Instrumente. Wir sind etwa fünfzehn, nicht mehr.",
    "photoAlt": {
      "accueil": "David Lesage steht mitten im großen Raum des Showrooms und empfängt mit offenen Armen: altes Parkett, weiße Wände unter dem Dachgebälk, eine Rosette an der Wand, hinter ihm ein Handpan auf seinem Ständer, im Hintergrund Kissen und ein niedriges Sofa. (Der Titel „David Lesage Showroom“ ist ins Bild eingeblendet.)",
      "vueEnsemble": "Gesamtansicht eines Treffens in Le Nid: David Lesage sitzt in der Mitte des Kreises, hinter ihm Handpans auf Ständern, das Publikum sitzt direkt auf dem Parkett, an den Wänden Lichterketten und eine hängende Rosette.",
      "instruments": "Die im Showroom aufgebauten Instrumente, bevor das Publikum kommt: zwei akustische Yishama-Handpans auf Ständern, zwei elektronische Neotone-Handpans mit ihrem Display, eine Kalebasse auf einem roten Teppich, alles auf altem Parkett.",
      "presentation": "David Lesage stellt mit dem Mikrofon in der Hand die Instrumente des Showrooms vor: Hinter ihm stehen die Neotone-Modelle und die Yishama-Handpans aufgereiht, unter der Rosette an der Wand.",
      "gonilele": "David Lesage hält den Gonilélé, die afrikanische Kalebassenharfe, und zeigt das Mikrofon Hisong AirStudio S1, mit dem er ihn verstärkt.",
      "grandePiece": "Der große Raum des Showrooms tagsüber, bevor das Publikum kommt: alter Parkettboden, ein niedriges Sofa und Kissen direkt auf dem Boden, hinten ein akustischer Handpan auf seinem Dreibeinständer, eine Gitarre an der Wand, Pflanzen und zusammengerollte Bodenmatten in einem Korb."
    },
    "photoCaption": {
      "vueEnsemble": "Ein Treffen im Le Nid: Das Publikum sitzt im Kreis, die Instrumente stehen in der Mitte.",
      "grandePiece": "Derselbe Raum tagsüber, bevor alles aufgebaut ist.",
      "instruments": "Das erwartet dich, wenn du ankommst: die Neotone-Modelle, meine Yishama-Handpans, der Gonilélé, die Kalebasse, die Mikrofone und die Schamanentrommel – bereit zum Spielen.",
      "presentation": "Die Vorstellung, bevor du die Hände auf die Instrumente legst.",
      "gonilele": "Der Gonilélé, die afrikanische Kalebassenharfe – und das Mikrofon, das ihn verstärkt."
    },
    "galleryEyebrow": "In Bildern",
    "galleryTitle": "Die Instrumente und die Ausrüstung aus der Nähe",
    "galleryIntro": "Wisch mit dem Finger oder klick auf ein Foto, um es zu vergrößern.",
    "galleryAltFallback": "Foto aus dem Showroom von David Lesage – Le Nid, Paris (20. Arrondissement).",
    "galleryAlt": {
      "demoNeotone1": "David Lesage steht bei einer Vorführung: Er hält einen Neotone, einen elektronischen Handpan, dem sitzenden Publikum entgegen, im Hintergrund die Wand mit den Lichterketten.",
      "demoNeotone2": "Weitere Ansicht der Neotone-Vorführung: David Lesage steht in der Mitte des Raums, die Zuschauer sitzen im Kreis auf dem Parkett.",
      "gonileleMicro": "Der Gonilélé liegt flach, die Saiten nach oben, neben der Schachtel des Mikrofons Hisong AirStudio S1 und seiner Kapsel auf dem Sockel.",
      "yishamaMicros": "Ein Yishama-Handpan von oben, zwei Mikrofonkapseln auf der Kuppel und ringsum vier Schachteln mit Mikrofonen Hisong AirStudio S1.",
      "tabletteAccords": "Ein Tablet über einem Handpan: Die App Handpan Constellation Studio zeigt die sieben Akkorde der Tonleiter D Kurd 18 als farbige Konstellationen.",
      "handpanTablette": "Ein Yishama-Handpan auf seinem Dreibeinständer, das Tablet an einem Arm direkt darüber: Die Konstellationen der Akkorde erscheinen genau über dem Instrument.",
      "salonInstruments": "Die Sitzecke des Showrooms: ein akustischer Handpan auf dem Boden neben dem Couchtisch, ein elektronischer Neotone aus Holz mit seinem Kopfhörer auf den Kissen, ein großes orangefarbenes Sofa, ein Blumenstrauß und hinten die Wand mit den Lichterketten.",
      "sonoBose": "Ein elektronischer Neotone aus Holz auf seinem Dreibeinständer, neben der Beschallung des Showrooms: ein Säulensystem Bose L1 Model II und sein Mischpult T8S, das auf den Bassmodulen steht."
    },
    "eventsEyebrow": "Was man hier erlebt",
    "eventsTitle": "Ausprobieren, kennenlernen, mitnehmen",
    "individualEyebrow": "Einzeln · nach Vereinbarung",
    "eventsHighlight": "Zum Einstieg am meisten gefragt",
    "events": [
      {
        "t": "Neotone-Treffen & Instrumente entdecken",
        "d": "Das öffentliche und kostenlose Treffen im Le Nid: David Lesage stellt die Neotone-Modelle vor, danach kannst du vor Ort alles ausprobieren – akustische Yishama-Handpans, die afrikanische Gonilélé-Harfe, die Kalebasse und Handpan-Mikrofone.",
        "price": "Öffentlich · Kostenlos"
      },
      {
        "t": "Erste Schritte mit deinem Instrument",
        "d": "Du hast gerade deinen Neotone, deinen Handpan oder dein Mikrofon bekommen? Wir stellen gemeinsam alles ein und gehen die Bedienung Schritt für Schritt durch. Vor Ort oder per Video.",
        "price": ""
      },
      {
        "t": "Instrumente entdecken",
        "d": "Eine private Session im Showroom, um alles, was dich interessiert, in Ruhe auszuprobieren: akustische Yishama-Handpans, Neotone, Kalebasse, Gonilélé, Mikrofone von Hisong und Muling.",
        "price": ""
      },
      {
        "t": "Einzelunterricht oder persönliche Begleitung",
        "d": "Mit David Lesage, egal auf welchem Level: deine eigenen Tonleitern erstellen, Stücke und Techniken spielen oder einfach klarer sehen, was du eigentlich suchst. Vor Ort oder per Video.",
        "price": ""
      }
    ],
    "programEyebrow": "Der Ablauf",
    "programTitle": "Das Programm einer Session",
    "programIntro": "Jede Session dauert etwa 2 Stunden: Zuhören, Vorführung und Austausch – und dann der Moment, in dem du selbst spielst.",
    "program": [
      {
        "t": "Der Neotone live",
        "d": "Ich spiele für euch: erst der pure Klang, dann mit Effekten (Oktaver, Hall, Looper) und mit Gesang, die Oberfläche dabei auf die Leinwand projiziert."
      },
      {
        "t": "Handpan Constellation Studio, die App, die Musik sichtbar macht",
        "d": "Vorführung live: die Farben, die Konstellationen der Akkorde und wie man lernt, indem man die Musik sieht, statt Notenblätter zu entziffern."
      },
      {
        "t": "Der akustische Klang & die Mikrofone",
        "d": "Meine beiden akustischen Yishama-Handpans, verstärkt mit den Mikrofonen von Hisong und Muling: zum Vergleichen und um den Unterschied zu hören."
      },
      {
        "t": "Der Gonilélé und die Kalebasse",
        "d": "Auch die afrikanische Gonilélé-Harfe und die Kalebasse sind dabei: Ich spiele sie, erkläre, wie man an sie herangeht – und wenn du ihretwegen gekommen bist, bist du hier genau richtig."
      },
      {
        "t": "Eure Fragen",
        "d": "Zeit für einen offenen Austausch: Ich antworte allen, vom neugierigen Anfänger bis zum erfahrenen Musiker."
      },
      {
        "t": "Jetzt seid ihr dran",
        "d": "Probiert die beiden Neotone aus, den einen über Lautsprecher, den anderen mit Kopfhörer, und meine beiden akustischen Yishama-Handpans. Nehmt euch Zeit, jedes Instrument zu spüren. Der Gonilélé und die Kalebasse sind auch da: Nehmt sie in die Hand."
      }
    ],
    "programBonusTitle": "Und manchmal geht es noch weiter",
    "programBonus": "Je nachdem, wofür sich das Publikum interessiert, kann sich die Session noch weiter öffnen: eine Vorführung des Gonilélé unter echten Bedingungen (mit den Effekten und dem Oktaver-Pedal, über eine professionelle Bose-Anlage wie im Konzert), die Kalebasse und sogar die Schamanentrommel „l’Âme du tambour“. Das ist nicht jedes Mal so: Es hängt davon ab, wer an dem Tag da ist und was die Leute interessiert. Sag mir, was dich reizt, ich berücksichtige es.",
    "programNote": "Kinder sind willkommen, unter der Aufsicht ihrer Eltern. Vorführung, Vortrag und Fragerunde können für die Jüngsten etwas lang werden: Plant bei Bedarf eine ruhige Beschäftigung ein, oder lasst einen anderen Erwachsenen übernehmen.",
    "booking": "Termine gibt es nur über das Formular: Du füllst es aus, deine Anfrage kommt bei mir an, und ich antworte dir persönlich.",
    "bookVisitCta": "Meinen Termin im Showroom buchen (kostenpflichtig)",
    "bookPrivateCta": "Einzeltermin buchen",
    "agendaEyebrow": "Kalender",
    "agendaTitle": "Handpan ausprobieren in Paris: die nächsten Termine, kostenlos",
    "agendaIntro": "Vorstellung der Neotone durch David Lesage – und dazu alles, was im Le Nid gespielt wird: akustische Yishama-Handpans, die afrikanische Gonilélé-Harfe, die Kalebasse, Handpan-Mikrofone. Alles kann vor Ort ausprobiert werden. Kostenlos, etwa fünfzehn Personen, nicht mehr, damit alle Zeit zum Spielen haben · Reservierung erforderlich.",
    "agendaEmpty": "Nächste Termine in Vorbereitung",
    "agendaEmptyText": "Die nächsten Termine werden gerade festgelegt. Hinterlass mir deine E-Mail-Adresse: Du erfährst sie als Erstes, noch vor der öffentlichen Ankündigung.",
    "agendaEmptyCta": "Über den nächsten Termin informieren",
    "agendaNextLabel": "Nächstes kostenloses Treffen",
    "agendaCount": "{n} kommender Termin",
    "agendaCountPlural": "{n} kommende Termine",
    "agendaSeats": "Kostenlos mit Reservierung · etwa fünfzehn Personen, nicht mehr",
    "agendaCta": "Über die nächsten Treffen informiert werden",
    "agendaEventTitle": "Neotone-Treffen – und alle Instrumente zum Ausprobieren",
    "agendaEventTag": "Öffentlich · Kostenlos",
    "agendaEventTime": "von {start} bis {end}",
    "agendaRulesTitle": "Gut zu wissen, bevor du kommst",
    "agendaRuleTimeTitle": "Den Tag wählst du, die Anfangszeit nicht",
    "agendaRuleTime": "Die Session beginnt pünktlich, mit einer Vorstellung. Kommst du zu spät, verpasst du Infos, und die ganze Gruppe muss noch einmal zurückgehen. Bist du früher da, kannst du unten im Hof warten, kein Problem.",
    "agendaRuleDurationTitle": "Plane großzügig Zeit ein",
    "agendaRuleDuration": "Das Programm dauert etwa 2 Stunden. In Wirklichkeit sind es eher 3, weil die Gespräche noch lange weitergehen.",
    "agendaRuleShareTitle": "Bring etwas zum Teilen mit, wenn du magst",
    "agendaRuleShare": "Einen Saft, einen Kuchen, etwas zum Herumreichen. Ganz freiwillig und nie eine Bedingung, um zu kommen: Es geht einfach ums Teilen, damit es ein geselliger Moment wird.",
    "agendaBookCta": "Platz reservieren",
    "agendaMoreTitle": "Du kannst nicht kommen, oder hättest du lieber einen Termin nur für dich?",
    "agendaMoreText": "Buch einen Einzeltermin bei mir, zu einer anderen Zeit, die dir passt.",
    "accessEyebrow": "Anfahrt",
    "accessTitle": "Der Weg zum Showroom in Paris (20. Arrondissement)",
    "accessMaps": "Auf Google Maps ansehen →",
    "access": [
      {
        "icon": "🚌",
        "t": "Bus",
        "d": "Linien 26 und 64: Haltestelle Orteaux, 3 Min. zu Fuß (≈ 250 m). Linie 76: Haltestelle Bagnolet-Orteaux."
      },
      {
        "icon": "🚇",
        "t": "Metro",
        "d": "Linie 9: Maraîchers (5–7 Min.) oder Buzenval (10 Min.). Linie 2: Alexandre Dumas (10 Min.)."
      },
      {
        "icon": "🚊",
        "t": "Straßenbahn",
        "d": "Linie T3b: Haltestelle Marie de Miribel (12 Min. zu Fuß)."
      }
    ]
  },
  "about": {
    "title": "Über mich: David Lesage, Musiker, Pädagoge und Erfinder",
    "description": "David Lesage, gelernter Schlagzeuger, heute Handpan-Spieler und Sänger: das Konservatorium, The Voice, Naxos und die internationale Handpan-Szene.",
    "heroEyebrow": "Über mich",
    "heroTitle": "Gelernter Schlagzeuger, Handpan-Spieler, Sänger – und Entwickler von Werkzeugen",
    "heroLead": "Ich bin David Lesage: gelernter Schlagzeuger, heute Handpan-Spieler, Sänger, Pädagoge – und Entwickler von Werkzeugen. Hier ist mein Weg, der Reihe nach und mit allen Daten.",
    "heroImgAlt": "David Lesage, Musiker",
    "heroCtaStory": "Geschichte lesen",
    "heroCtaToday": "Was ich heute mache",
    "storyEyebrow": "Meine Geschichte",
    "storyTitle": "Vom Schlagzeug zum Handpan, auf einem langen Umweg",
    "storyIntro": "Die Etappen, Begegnungen und Daten, die zu den Instrumenten führen, die ich spiele, und zu den Werkzeugen, die ich entwickle.",
    "chapters": [
      {
        "eyebrow": "Die Anfänge",
        "title": "Schlagzeug mit 4 Jahren, dann Notenlesen und Musiktheorie",
        "paras": [
          "Mit 4 Jahren habe ich mit der Musik angefangen, am Schlagzeug. Schon in meiner ersten Unterrichtsstunde musste ich Notenblätter lesen. Ich habe alles hingeworfen und mir das Spielen selbst beigebracht, nach Gehör.",
          "Zurückgefunden habe ich über die Schule, in dieser Reihenfolge: zuerst vier Jahre in der Jazzklasse des Collège von Marciac (Mittelstufe) – dem Jazzzweig, der an das Festival angebunden ist, mit Wynton Marsalis als Paten –, wo ich die Gesangsimprovisation entdecke; dann die Oberstufe (Lycée) mit einem Abitur (Bac) <strong>TMD – Technique de Musique et de Danse</strong>, das ich 2012 am Lycée Saint-Sernin in Toulouse ablege. Das ist wie eine Sportklasse, nur eben für Musik – man spricht auch von Klassen mit angepasstem Stundenplan. Danach vier Jahre am Konservatorium Toulouse, das ich 2013 mit dem Ersten Preis im Fach Schlagzeug, mit Auszeichnung, abschließe.",
          "Um meinen „Rückstand aufzuholen“, hatte ich jede Woche 7 Std. 30 Min. Unterricht in Notenlesen und Musiktheorie, auf 4 verschiedenen Levels. Noten lesen kann ich bis heute nicht … so sehr war der Unterricht vom Gefühl und vom Sinn abgekoppelt, ganz auf klassische Musik ausgerichtet."
        ]
      },
      {
        "eyebrow": "Die Umwege",
        "title": "Video, Schulungen, virtuelle Realität",
        "paras": [
          "Ich habe Bands gegründet, Videoaufnahme und Videoschnitt gelernt, bin 2017 zum Team von Thierry Vanoffe gestoßen, als Trainer und Macher der Videos des Kanals Numéricoach, und habe ab 2020 an Aora Mana gearbeitet – einer der ersten Plattformen für initiatische Reisen in virtueller Realität –, als Kameramann, Regisseur, Cutter für 360°-VR und Drohnenpilot.",
          "Ich trete bei den Blind Auditions von The Voice auf TF1 an, Staffel 11, mit einem afrikanischen Lied: <em>Koth Biro</em>, aufgezeichnet am 21. Dezember 2021, ausgestrahlt am 12. Februar 2022. Nach der Sendung werde ich zu einem Solokonzert an die Elfenbeinküste eingeladen.",
          "Als Google-Trainer merke ich, wie begabt ich darin bin, technische und technologische Lösungen für die Probleme anderer Menschen zu finden. Aber schon lange davor kümmerte ich mich um die Beschallung der Vorträge auf dem Salon Santé Nature in Flourens – die Messe ist mehrmals umgezogen – und um ihre Computer. Ich habe Menschen schon immer geholfen, Tricks und Lösungen für ihre Computerprobleme zu finden."
        ]
      },
      {
        "eyebrow": "Weitergeben",
        "title": "Die Kalebasse, Now Groove und die Ngoni",
        "paras": [
          "Ich spiele seit 2012 Kalebasse, als Perkussionsinstrument.",
          "An der Kalebasse fehlten mir Snare und Hi-Hat. Gelöst habe ich das mit Plastikeiern – eine Bastelei, aus der eine Spielweise wurde und dann eine Art zu unterrichten.",
          "Daraus wurde Now Groove (2021): eine Rhythmusmethode mit Ruf und Antwort und visuellen Emoticons, die auch mit fünfzig Leuten im selben Raum trägt.",
          "2018 bin ich nach einer Trennung am Boden zerstört. Da legt mir mein Therapeut Fred Hervaud seine eigene N’Goni in die Hände: meine erste Begegnung mit dem Instrument. 2023 beginnt meine Zusammenarbeit mit Joris Feuillâtre rund um die Gonilélé-Harfe, die ich heute als Botschafter von La Maison du Ngoni weitergebe. Mein Unterricht und meine Workshops laufen unter dem Dach der Now Music Academy, getragen vom Verein Résonances Productions."
        ]
      },
      {
        "eyebrow": "Gesang",
        "title": "Marie-Christine Reculard und der holistische Gesang",
        "paras": [
          "Marie-Christine Reculard ist meine Gesangslehrerin. Sie hat <em>Le Chant Holistique</em> entwickelt, das sie auf ihrer Website als „eine einzigartige Methode des therapeutischen und energetischen Gesangs durch die Stimme, die Farben, die heiligen Vokale, die Mantras, Yoga und Atemtechniken“ beschreibt. Ihre Website: <a href=\"https://www.mariechristinereculard.com/\" target=\"_blank\" rel=\"noopener\" class=\"underline\">mariechristinereculard.com</a>.",
          "Ihre Methode hat mich inspiriert, vor allem für einen Modus „Singen & Spielen“ – singen und sich dabei auf dem Handpan begleiten –, an dem ich für Handpan Constellation Studio arbeite. Er ist noch im Laborstadium: In der App ist er heute noch nicht verfügbar."
        ]
      },
      {
        "eyebrow": "Naxos, Griechenland · Juni 2022",
        "title": "Das Konzert, das mir die Tür zur Handpan-Welt geöffnet hat",
        "paras": [
          "Ich spiele auf dem HONA Festival in Agia Anna. Als ich ankomme, bin ich ein Niemand: Die Bühne ist winzig, die Anlage ist schlecht, es gibt keine Monitorboxen. Aber ich zeige etwas, das man so noch nicht gesehen hatte – ich singe, spiele drei Handpans gleichzeitig und mache die Perkussion mit Füßen und Händen.",
          "Am nächsten Tag treffe ich an der Außenbar des Festivals einen Mann. Ich weiß nicht, wer er ist; man erklärt mir, er sei einer der besten Handpan-Hersteller der Welt. Es ist Yonathan von Yishama. Er hört mir lange und ruhig zu und versucht nicht, mir seine Instrumente zu verkaufen.",
          "Im selben Sommer bekomme ich den allerersten Neotone als Beta-Version in die Hände. Einen Monat später spiele ich auf dem HUG-Festival in Ungarn, schaue in der Werkstatt vorbei und fahre mit einem Beta-Neotone und einer klaren Abmachung wieder ab: Fehler melden und helfen, das Instrument weiterzuentwickeln. Das mache ich seitdem – Tausende Rückmeldungen später kenne ich Csaba, Norbert und das Team von Soundventure in Budapest persönlich."
        ]
      },
      {
        "eyebrow": "Mai 2023 → August 2023",
        "title": "Zwei wunderbare Instrumente und keine Gebrauchsanweisung",
        "paras": [
          "Im Mai 2023 bekomme ich die beiden Handpans, die Yonathan für mich entworfen hat: je achtzehn Töne, auf 432 Hz gestimmt, gedacht für eine einzige Sache – dass ich mich beim Singen selbst begleiten kann, in jeder beliebigen Tonart.",
          "Es gab keine Methode. Der Handpan ist ein Instrument des 21. Jahrhunderts, noch mitten in der Entwicklung, oft modal, und es gibt fast so viele Layouts der Töne wie Instrumente.",
          "Im August 2023 öffne ich ein Dokument – nur um zu sehen, welche Akkorde ich auf meinen eigenen Instrumenten spielen kann. Ein paar Monate später schlägt mir Yonathan vor, daraus ein kleines Akkordheft zu machen, für mich. Ich habe das Heft gemacht. Daraus wurde eine App."
        ]
      }
    ],
    "quoteNaxos": "In diesem Moment ist mir nicht klar, dass ich gerade in einen ganz exklusiven Kreis der internationalen Handpan-Welt eintrete.",
    "quoteNaxosSource": "Was ich über dieses Konzert erzähle",
    "quoteShips": "Es ist, als hätte ich zwei Raumschiffe, wüsste aber nicht, wie man sie fliegt.",
    "quoteShipsSource": "Meine beiden Yishama, in den ersten Monaten",
    "linkYishama": "Meine Geschichte mit Yonathan und meinen beiden Yishama",
    "linkApp": "Handpan Constellation Studio entdecken",
    "todayEyebrow": "Heute · Paris (20. Arr.)",
    "todayTitle": "Musiker, Lehrer und Entwickler von Werkzeugen",
    "todayIntro": "Ich arbeite als freischaffender Bühnenkünstler mit dem französischen Sonderstatus „intermittent du spectacle“ und lebe in Paris. Le Nid in der Rue des Orteaux 29 im 20. Arrondissement ist der Ort, den ich gemeinsam mit Iris Chasles betreibe, eröffnet am 13. März 2026: ein überschaubarer Ort im Osten von Paris, an dem wir in kleiner Runde empfangen. Fünf Angebote kommen dort zusammen – Konzerte, Rhythmus-Workshop mit der Kalebasse, Einzelunterricht, Yoga-Workshop und körperorientierte psychologische Begleitung –, dazu Instrumentenvorstellungen, kostenlos und mit Anmeldung. Man kann dort anfassen, ausprobieren, zuhören und noch am selben Tag mit seinem Neotone nach Hause gehen. Meine beiden Yishama sind auch dort, nicht zum Verkauf, sondern einfach, um gespielt zu werden. Das vollständige Programm veröffentlicht der Verein Résonances Productions.",
    "today": [
      {
        "t": "Ich spiele",
        "d": "Handpan, Stimme, Kalebasse und Ngoni auf der Bühne: 112 erfasste Auftritte von 2009 bis 2026 in 7 Ländern – darunter 21 bei Jazz in Marciac, zwei Ausgaben des Sziget in Budapest, das Everness Festival in Ungarn und ein Vorprogramm für Amadou &amp; Mariam. Zwei Aufnahmen unter dem Titel L’Alliance du Phoenix und fast jeden Monat kostenlose Begegnungen im Le Nid."
      },
      {
        "t": "Ich unterrichte",
        "d": "Now Music Academy: Handpan, Rhythmus mit der Kalebasse und Gonilélé-Harfe, per Video überall auf der Welt oder vor Ort in Paris. Ich antworte persönlich."
      },
      {
        "t": "Ich entwickle",
        "d": "Handpan Constellation Studio macht Harmonie sichtbar, durch Farben, Formen und Emotionen. Guso Facile macht dasselbe für den Papierkram der Intermittents (Bühnenkünstler mit französischem Sonderstatus)."
      },
      {
        "t": "Ich schlage Brücken",
        "d": "Beta-Tester des Neotone (Soundventure, Budapest), Botschafter von Yishama und Teil seines Partnerprogramms, Botschafter von La Maison du Ngoni."
      }
    ],
    "milestonesEyebrow": "Eckdaten",
    "milestonesTitle": "Einige Meilensteine mit Datum",
    "milestones": [
      {
        "y": "2012",
        "t": "Abitur (Bac) TMD – Technique de Musique et de Danse, Lycée Saint-Sernin, Toulouse."
      },
      {
        "y": "2012",
        "t": "Ich fange mit der Kalebasse an, als Perkussionsinstrument."
      },
      {
        "y": "2013",
        "t": "Erster Preis im Fach Schlagzeug, mit Auszeichnung – Konservatorium Toulouse."
      },
      {
        "y": "2018",
        "t": "Ich entdecke die Ngoni – die meines Therapeuten Fred Hervaud."
      },
      {
        "y": "2021",
        "t": "Now Groove – meine visuelle Rhythmusmethode für die Kalebasse."
      },
      {
        "y": "Feb. 2022",
        "t": "The Voice, Staffel 11 (TF1): Blind Audition aufgezeichnet am 21.12.2021, ausgestrahlt am 12.02.2022. Danach ein Solokonzert an der Elfenbeinküste."
      },
      {
        "y": "Juni 2022",
        "t": "HONA Festival, Naxos. Begegnung mit Yonathan (Yishama), der erste Beta-Neotone in meinen Händen."
      },
      {
        "y": "Juli 2022",
        "t": "HUG-Festival, Ungarn. Ich verlasse die Werkstatt mit einem Beta-Neotone."
      },
      {
        "y": "2023",
        "t": "Beginn meiner Zusammenarbeit mit Joris Feuillâtre (Gonilélé-Harfe)."
      },
      {
        "y": "Mai 2023",
        "t": "Ich bekomme meine beiden Yishama-Handpans: je 18 Töne, 432 Hz."
      },
      {
        "y": "August 2023",
        "t": "Das Dokument, aus dem später Handpan Constellation Studio wird."
      },
      {
        "y": "13. März 2026",
        "t": "Eröffnung von Le Nid, 29 rue des Orteaux, Paris (20. Arrondissement)."
      },
      {
        "y": "Heute",
        "t": "Le Nid, Paris (20. Arrondissement): Unterricht, Anspielen und Begegnungen."
      }
    ],
    "visionEyebrow": "Meine pädagogische Vision",
    "visionTitle": "Der Handpan: ein vollwertiges Instrument für die Begleitung",
    "visionIntro": "Mit diesem Ansatz bekommt der Handpan endlich seinen Platz neben Gitarre und Klavier. Dank der „Magischen 4“ (I-IV-V-vi in Dur, i-VI-III-VII in Moll) kann jeder die Stücke, die er liebt, in wenigen Minuten begleiten und die Theorie dabei wie ein Spiel angehen.",
    "pillars": [
      {
        "t": "Sichtbar",
        "d": "Farbe, Geometrie und Emotion ersetzen den Fachjargon. Man sieht die Musik, bevor man sie benennt."
      },
      {
        "t": "Zugänglich",
        "d": "Duzen, Einfachheit, Herzlichkeit. Vom neugierigen Kind bis zum erfahrenen Musiker – ich antworte persönlich."
      },
      {
        "t": "Überprüfbar",
        "d": "Konservatorium Toulouse, Bühne, langjähriger Neotone-Betatest: Stationen mit Datum, die jeder nachprüfen kann."
      }
    ],
    "proofsEyebrow": "Meine Stationen",
    "proofsTitle": "Glaubwürdigkeit & Werdegang",
    "proofsIntro": "Datierte, nachprüfbare Stationen.",
    "proofs": [
      "Erster Preis im Fach Schlagzeug, mit Auszeichnung · Konservatorium Toulouse (2013)",
      "Jazz-Mittelschule Marciac (Collège de jazz) · vier Jahre",
      "Stimmumfang von fünf Oktaven",
      "The Voice, Staffel 11 · Blind Audition (TF1, 12.02.2022)",
      "112 erfasste Auftritte · 2009–2026, 7 Länder",
      "Bühnenkünstler (Intermittent du spectacle)",
      "Neotone-Betatester (Soundventure, Budapest)",
      "Botschafter und Affiliate-Partner von Yishama",
      "Botschafter von La Maison du Ngoni",
      "Le Nid · 29 rue des Orteaux, Paris (20. Arrondissement)",
      "Résonances Productions · Verein nach französischem Recht (association loi 1901)",
      "L’Alliance du Phoenix · Opus I & II"
    ],
    "collabEyebrow": "Zusammenarbeit",
    "collabTitle": "Du hast ein Projekt? Lass uns darüber reden.",
    "collabIntro": "Musikpädagogik, Handpan, meine Werkzeuge – oder jedes andere Projekt, auch außerhalb von Neotone. Marken, Veranstalter, Medien, Kooperationspartner: Die Tür steht offen.",
    "collabCta1": "Lass uns zusammenarbeiten",
    "collabCta2": "Kontakt aufnehmen"
  },
  "contact": {
    "title": "Kontakt – David Lesage, Musiker & Musikpädagoge",
    "description": "Ich beantworte jede Nachricht persönlich – ein Musiker, kein Kundenservice. Ob zu deinem Kauf, deinem Unterricht, der App oder einer Zusammenarbeit: Schreib mir.",
    "eyebrow": "Kontakt",
    "title2": "Eine Frage? Lass uns darüber reden.",
    "intro": "Ich beantworte jede Nachricht persönlich – ich bin kein Kundenservice, sondern ein Musiker, der jeden Tag Neotone spielt. Du willst dein Modell oder deine Holzart wählen oder deinen Besuch planen? Schreib mir. Einen Neotone kann man weder mieten noch leihen: Wenn du einen ausprobieren möchtest, komm in den Showroom.",
    "coords": {
      "email": "E-Mail – schnelle Antwort",
      "phone": "Telefon",
      "showroom": "Showroom · nach Terminvereinbarung"
    },
    "form": {
      "name": "Vor- und Nachname",
      "email": "E-Mail",
      "phone": "Telefon",
      "phoneHelp": "Damit ich dich schnell zurückrufen kann.",
      "phoneError": "Gib eine gültige Telefonnummer ein (8 bis 15 Ziffern, internationale Vorwahl möglich: +33, +1 …).",
      "subject": "Betreff",
      "message": "Nachricht",
      "submit": "Schreib mir",
      "note": "Oder schreib mir direkt an"
    },
    "subjects": [
      "Kauf eines Neotone",
      "Unterricht",
      "Handpan Constellation Studio",
      "Zusammenarbeit",
      "Presse",
      "Sonstiges"
    ]
  },
  "legal": {
    "title": "Impressum – David Lesage",
    "description": "Impressum und Bedingungen der Website von David Lesage: Herausgeber, Hosting, geistiges Eigentum, Preise und MwSt. Showroom: 29 rue des Orteaux, Paris (20. Arrondissement).",
    "h1": "Impressum der Website von David Lesage",
    "blocks": [
      {
        "h": "Herausgeber",
        "p": "David Lesage – Musiker, Pädagoge und Erfinder. Showroom: 29 rue des Orteaux, 75020 Paris. E-Mail: contact@lesagedavid.fr · Telefon: +33 6 10 73 31 52."
      },
      {
        "h": "Hosting",
        "p": "Statische Website, erstellt mit Astro und gehostet von Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, Vereinigte Staaten – vercel.com. Der Domainname wird von OVH SAS, 2 rue Kellermann, 59100 Roubaix, Frankreich, verwaltet."
      },
      {
        "h": "Geistiges Eigentum",
        "p": "Die Inhalte, Texte, Fotos und Videos dieser Website sind Eigentum ihrer jeweiligen Urheber. Die Fotos und Produktspezifikationen von Neotone stammen aus der offiziellen Dokumentation von Soundventure Ltd. David Lesage ist unabhängiger Neotone-Botschafter."
      },
      {
        "h": "Preise & MwSt.",
        "p": "Alle angezeigten Preise sind unverbindlich und können sich ohne Vorankündigung ändern. Die vom Rechner angewandten MwSt.-Sätze sind die 2026 geltenden Normalsätze; Zollgebühren außerhalb der EU trägt der Käufer."
      }
    ]
  },
  "terms": {
    "title": "AGB – David Lesage",
    "description": "AGB der Website von David Lesage: was ich über die Formulare erfasse, warum, mit welchen Tools, wie lange ich es aufbewahre und wie du deine Rechte ausübst.",
    "h1": "AGB",
    "versionLabel": "Version",
    "version": "2026-08-19",
    "updatedLabel": "Zuletzt aktualisiert",
    "updated": "19. August 2026",
    "lead": "Diese Seite sagt klar und deutlich, was passiert, wenn du auf dieser Website ein Formular ausfüllst: was ich erfasse, warum, mit welchen Tools, wie lange ich es aufbewahre und wie du die Kontrolle zurückholst, wann immer du willst. Kein Fachjargon. Wenn etwas unklar ist, schreib mir – ich lese selbst.",
    "inProgress": "Dieses Dokument begleitet den Aufbau eines Ökosystems, das noch im Entstehen ist: Die Website, die App, der Showroom und die Partnerschaften mit den Herstellern kommen nach und nach dazu. Es wird sich also im Lauf dieses Aufbaus weiterentwickeln. Es gilt die oben angegebene Version, und diese akzeptierst du, wenn du das Kästchen in einem Formular ankreuzt.",
    "sections": [
      {
        "h": "Wer verantwortlich ist",
        "p": "David Lesage: Musiker, Pädagoge und Erfinder. Showroom: 29 rue des Orteaux, 75020 Paris. E-Mail: contact@lesagedavid.fr · Telefon: +33 6 10 73 31 52. Hinter dieser Website steht keine Marketingabteilung: Ich entscheide, was erfasst wird, ich lese es, und ich antworte dir.",
        "items": []
      },
      {
        "h": "Meine Rolle und wer das Geld bekommt",
        "p": "Ich sage es lieber gleich, das vermeidet Missverständnisse: Ich stelle auf dieser Website Instrumente vor, die von Partnern hergestellt werden (Neotone, Yishama, die Mikrofone, die Gonilélé-Harfen). Ich trete als Vorführer auf und werde für diese Verkäufe nicht direkt vergütet.",
        "items": [
          "Diese Partnerschaften laufen über Partnerprogramme: Sie werden vergütet, und diese Vergütung erhält der Verein Résonances Productions (association loi 1901, also ein Verein nach dem französischen Vereinsgesetz von 1901, nicht gewinnorientiert), nicht ich persönlich.",
          "Damit du genau weißt, um wen es sich handelt, hier seine Angaben: Résonances Productions, association loi 1901 ohne Gewinnerzielungsabsicht, gemeldet bei der Unterpräfektur (sous-préfecture) Pamiers und veröffentlicht im Journal officiel des associations am 28. Oktober 2017; RNA-Nr. W092002501, SIRET 919 514 075 00010, APE-Code 9001Z (darstellende Kunst). Sitz: 2 impasse des Bleuets, 09600 Aigues-Vives. Postanschrift: 29 rue des Orteaux, 75020 Paris. E-Mail: contact@resonancesproductions.org.",
          "Diese Angaben sagen, wer diese Beträge erhält, und nicht mehr: Herausgeber dieser Website ist David Lesage als natürliche Person. Er ist für diese Seite und für deine Daten verantwortlich, wie direkt oben und im Impressum angegeben.",
          "Das ändert nichts an dem, was ich dir über ein Instrument sage: Ich antworte dir als Musiker, der diese Instrumente jeden Tag spielt, und ich sage dir lieber, dass ein Instrument nicht zu dir passt, als es dir zu verkaufen.",
          "Weder auf dieser Website noch von mir wird eine Zahlung entgegengenommen. Gekauft wird anderswo: im HelloAsso-Shop von Résonances Productions, in der App für ihr Abonnement oder direkt beim Hersteller für ein Muling-Mikrofon.",
          "Abonnement der App (Tarif Essenziell, 3,49 € inkl. MwSt. pro Monat): Es beginnt mit einem kostenlosen Testmonat, für den bei der Anmeldung eine Bankkarte hinterlegt wird. Kündigst du nicht vor Ende der Testphase, startet das Abonnement automatisch und verlängert sich dann stillschweigend jeden Monat. Jeder angefangene Monat ist zu zahlen und wird nicht erstattet; du kannst jederzeit kündigen, die Kündigung wird zum folgenden Monat wirksam."
        ]
      },
      {
        "h": "Was du mir gibst, Formular für Formular",
        "p": "Nichts wird ohne dein Wissen erfasst: Alles stammt aus dem, was du selbst schreibst. Optionale Felder bleiben leer, wenn du sie nicht anrührst.",
        "items": [
          "Reservierung (Besuch im Showroom, Platz bei einem Treffen, Einzeltermin, Anfrage eines Neotone-Rabattcodes): Vorname, Name, E-Mail, Telefonnummer, falls du sie angibst, Anzahl der Personen, gewünschtes Datum, bis zu drei Zeitfenster, die du vorschlägst, Art und Format des Termins (vor Ort oder per Video), Instrumente, die du entdecken möchtest, das Neotone-Modell, das du in Betracht ziehst, Land, Social-Media-Konto, wie du auf mich aufmerksam geworden bist, seit wann du spielst, was du gern schaffen möchtest, und deine Nachricht.",
          "Kontakt: Name und Vorname, E-Mail, Betreff, Nachricht.",
          "Warteliste der App: Vorname, Name, E-Mail, ob du schon einen Handpan hast und welchen, die Rolle oder Rollen, die du angibst (für dich, zum Unterrichten, zum Bauen), dein Ziel, die Zahl deiner Schüler und, falls du Handpans baust, dein Land, wie viele Töne du herstellst, die Metalle, die du verarbeitest, und wie du deine Preise festlegst. Dazu deine Motivation, falls du dich als Betatester bewirbst.",
          "Bestellung des Muling-Mikrofons: Vorname, Name, E-Mail, Telefon, Menge, vollständige Lieferadresse, Hinweise für den Zusteller, Nachricht und dann der Überweisungsnachweis, den du hochlädst (Bild oder PDF).",
          "In allen Fällen kommen automatisch hinzu: die Sprache der Website, die Seite, von der deine Anfrage ausgeht, Datum und Uhrzeit, zu denen du diese Bedingungen mit ihrer Versionsnummer akzeptiert hast, und, falls du das zweite Kästchen angekreuzt hast (das optionale), das Datum, an dem du zugestimmt hast, meine Neuigkeiten zu erhalten."
        ]
      },
      {
        "h": "Was ich damit mache",
        "p": "Drei Dinge, mehr nicht.",
        "items": [
          "Dir antworten. Dafür ist jedes Formular da: Ich lese und antworte persönlich.",
          "Organisieren, worum du gebeten hast: ein Zeitfenster bestätigen, die Instrumente für deinen Besuch vorbereiten, eine Bestellung weiterleiten. Eine Anfrage für einen Einzeltermin legt außerdem einen Vorschlag für eine Unterrichtsstunde in meinem Kalender in der App an.",
          "Dich über meine Neuigkeiten auf dem Laufenden halten, aber nur, wenn du das zweite Kästchen im Formular angekreuzt hast, das optionale, das nie vorab angekreuzt ist: ein neuer Termin für ein Treffen, der Start der App, ein neues Instrument. Kreuzt du es nicht an, schreibe ich dir nur wegen deiner Anfrage und sonst nichts. Kreuzt du es an, schreibe ich selten und gezielt: Je nachdem, durch welche Tür du gekommen bist und wofür du dich laut deinen Angaben interessierst, bekommst du nicht dasselbe wie jemand anderes. Du kannst jederzeit Stopp sagen, ohne dich rechtfertigen zu müssen."
        ]
      },
      {
        "h": "Fotos und Videos vor Ort",
        "p": "Ich fotografiere und filme, was hier passiert: die Treffen, die Termine im Showroom, die Instrumente, die von Hand zu Hand gehen. Einen Teil davon veröffentliche ich auf dieser Website und in meinen sozialen Netzwerken. Mir geht es nicht um dein Gesicht im Besonderen, sondern darum, die allgemeine Stimmung des Ortes zu zeigen und das, was hier geteilt wird, damit andere Lust bekommen, auch zu kommen.",
        "items": [
          "Standardmäßig mache ich Gesichter unkenntlich. So halte ich es heute: Solange mir jemand nicht gesagt hat, dass er einverstanden ist, veröffentliche ich ihn nicht erkennbar.",
          "Du kannst Nein sagen, und du musst nichts begründen: Ein Wort vor Ort genügt, oder eine E-Mail an contact@lesagedavid.fr. Vor wie nach der Veröffentlichung: Ist ein Foto oder ein Video schon online, nehme ich es herunter oder mache dich unkenntlich.",
          "Du kannst auch Ja sagen, wenn du gern mit erkennbarem Gesicht zu sehen sein möchtest: Sag es mir vor Ort oder per E-Mail. So kann ich echte Gruppenbilder veröffentlichen statt unkenntlich gemachter Gesichter.",
          "In beiden Fällen kannst du deine Meinung jederzeit ändern, in die eine wie in die andere Richtung."
        ]
      },
      {
        "h": "Auf welcher Grundlage",
        "p": "Auf Grundlage deiner Einwilligung, und es gibt zwei Kästchen, weil es um zwei verschiedene Dinge geht. Du kannst jede der beiden Einwilligungen jederzeit widerrufen: Das macht nicht rückgängig, was bereits geschehen ist, beendet aber alles für die Zukunft.",
        "items": [
          "Das Kästchen „Ich akzeptiere die AGB“ ist Pflicht: Ohne dieses Kästchen kann ich deine Anfrage nicht bearbeiten. Das Datum deiner Zustimmung wird mit der Versionsnummer dieser Seite gespeichert. So lässt sich später feststellen, welchen Text genau du vor Augen hattest.",
          "Das Kästchen „Ich möchte über die nächsten Termine und Neuigkeiten informiert werden“ ist optional und nie vorab angekreuzt. Von ihm hängt nichts ab: Dein Formular wird genauso abgeschickt, wenn du es leer lässt. Wer die AGB akzeptiert, willigt damit nicht ein, meine Neuigkeiten zu erhalten. Deshalb sind es zwei Kästchen und nicht eins.",
          "Die Fotos und Videos vor Ort laufen über kein Kästchen dieses Formulars: Die Regel ist, dass Gesichter standardmäßig unkenntlich gemacht werden, und es genügt, wenn du es mir sagst, um zu widersprechen. Beschrieben wird das im Abschnitt „Fotos und Videos vor Ort“.",
          "Bei einer Mikrofonbestellung sind deine Lieferdaten außerdem ganz einfach nötig, damit das Paket verschickt werden kann."
        ]
      },
      {
        "h": "Die Tools, über die deine Daten laufen",
        "p": "Ich verkaufe und vermiete keine Daten, an niemanden, niemals. Hier ist die vollständige Liste der Dienste, die tatsächlich beteiligt sind.",
        "items": [
          "Supabase: die Datenbank, in der deine Antworten gespeichert werden, und der Speicherort für die Überweisungsnachweise. Das Projekt wird in Irland gehostet, in der Europäischen Union.",
          "Vercel: der Hoster der Website. Die kleinen Serverfunktionen, die die Formulare weiterleiten, laufen in den USA.",
          "Das Postfach contact@lesagedavid.fr: Dort kommen die Benachrichtigungen an, und von dort antworte ich dir. Es wird bei Google gehostet.",
          "Google Fonts und die YouTube-Vorschaubilder: Die Website lädt ihre Schriftarten und die Vorschaubilder der Videos von den Servern von Google. Keine deiner Antworten wird an Google übermittelt, die IP-Adresse deines Browsers aber schon.",
          "YouTube: Ein Video lädt erst, wenn du darauf klickst, und es läuft über youtube-nocookie.com. Solange du nicht klickst, wird nichts übertragen.",
          "Muling Musical Instruments Co., Ltd. (China): nur, wenn du ein Mikrofon bestellst. Der Hersteller verschickt die Ware, deshalb wird ihm deine Bestellung per E-Mail an eine chinesische Adresse geschickt. Diese Nachricht enthält deinen Namen, deine E-Mail-Adresse, deine Telefonnummer, die bestellte Menge, dein Land, deine vollständige Adresse, deine Lieferhinweise, den Betrag und die Bestellnummer. Ein eigenes Kästchen fragt dich vor dem Absenden ausdrücklich danach. Dass die Überweisung selbst auf ein deutsches Konto geht, ändert daran nichts: Diese Angaben gehen tatsächlich nach China.",
          "OVH: der Domainname lesagedavid.fr.",
          "HelloAsso: Manche Produkte, Unterrichtsstunden und Workshops kaufst du im HelloAsso-Shop von Résonances Productions. Mit dem Klick verlässt du diese Website: Dann gilt die Datenschutzerklärung von HelloAsso, und nichts von dem, was du dort eingibst, läuft über diese Website.",
          "Stripe: Die Website liest dort die angezeigten Preise der App aus, sonst nichts. Von dieser Website werden keine personenbezogenen Daten an Stripe gesendet. Das Abo und seine Bezahlung laufen in der App, auf ihrer eigenen Website."
        ]
      },
      {
        "h": "Was die Europäische Union verlässt",
        "p": "Ich sage es ganz offen: Ein Teil des Wegs führt aus Europa hinaus. Die Datenbank dagegen bleibt in Irland.",
        "items": [
          "Die Serverfunktionen, die die Formulare weiterleiten, laufen in den USA, bei Vercel.",
          "Mein Postfach wird bei Google gehostet, einem US-amerikanischen Unternehmen, also auch die E-Mails, die wir uns schreiben.",
          "Die Schriftarten und die Video-Vorschaubilder werden von Servern von Google geladen.",
          "Nur bei einer Mikrofonbestellung geht deine Bestellung per E-Mail nach China, zum Hersteller: Name, E-Mail-Adresse, Telefonnummer, Menge, Land, vollständige Adresse, Lieferhinweise, Betrag und Bestellnummer. Das ist nötig, damit er dir das Paket schicken kann. Verwechsle das nicht mit der Bezahlung, die in Europa bleibt: Das sind zwei verschiedene Wege."
        ]
      },
      {
        "h": "Wie lange ich das alles aufbewahre",
        "p": "Drei Jahre nach unserem letzten Austausch. Und der Zähler springt bei jedem neuen Austausch wieder auf null: Du schreibst mir, du antwortest mir, du buchst, du bestellst, und die drei Jahre beginnen von vorn. Passiert drei Jahre lang nichts mehr, werden deine Daten gelöscht. Du kannst natürlich schon viel früher ihre Löschung verlangen – siehe weiter unten.",
        "items": []
      },
      {
        "h": "Cookies und Reichweitenmessung",
        "p": "Diese Website setzt keine Cookies und verwendet kein Tool zur Reichweitenmessung, kein Werbepixel, keinen Tracker – deshalb gibt es auch kein Banner, das du beim Aufrufen bestätigen musst. Das Einzige, was dein Browser lokal speichert, ist die Sprache, die du gewählt hast, und sie verlässt dein Gerät nie. Bei den E-Mails ist das anders: Ob sie geöffnet und ob ihre Links angeklickt werden, wird gemessen, über ein unsichtbares Bild und über Tracking-Links. Das gehört zu den AGB der App und wird in ihrer Datenschutzerklärung erklärt.",
        "items": []
      },
      {
        "h": "Deine Rechte und wie du sie ausübst",
        "p": "Ein einziger Schritt genügt: Schreib an contact@lesagedavid.fr. Kein Formular zum Ausfüllen, kein Nachweis, solange ich keine ernsthaften Zweifel an deiner Identität habe. Ich antworte dir persönlich, spätestens innerhalb eines Monats.",
        "items": [
          "Auskunft: genau wissen, was ich über dich gespeichert habe; ich kann dir eine Kopie davon schicken.",
          "Berichtigung: eine falsche oder veraltete Angabe korrigieren.",
          "Löschung: alles löschen.",
          "Widerspruch: eine Nutzung ablehnen, insbesondere die E-Mails mit Neuigkeiten.",
          "Datenübertragbarkeit: das, was du mir gegeben hast, in einer Datei erhalten, die du anderswo weiterverwenden kannst.",
          "Einschränkung: verlangen, dass deine Daten beiseitegelegt werden, solange wir eine Meinungsverschiedenheit klären.",
          "Widerruf der Einwilligung: jederzeit, ohne dass du das begründen musst."
        ]
      },
      {
        "h": "Keine E-Mails mehr von mir bekommen",
        "p": "Jede E-Mail mit Neuigkeiten enthält einen Abmeldelink: ein Klick, und die Sache ist erledigt. Sonst genügt eine Zeile an contact@lesagedavid.fr – „Stopp“ reicht völlig, und du musst nichts begründen. Das storniert weder einen Termin noch eine laufende Bestellung: Die Nachrichten, die für die Bearbeitung deiner Anfrage nötig sind, werden weiterhin verschickt.",
        "items": []
      },
      {
        "h": "Wenn du mit mir nicht einverstanden bist",
        "p": "Du kannst eine Beschwerde bei der CNIL einreichen, der französischen Datenschutzbehörde: CNIL, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 – www.cnil.fr. Aber schreib mir zuerst, wenn du magst: Das geht schneller, und ich kläre die Dinge lieber direkt.",
        "items": []
      },
      {
        "h": "Sicherheit",
        "p": "Die Website wird durchgehend über HTTPS ausgeliefert. Die Datenbank ist nur mit eigenen Zugangsdaten erreichbar, und ihre Zugriffsregeln sorgen dafür, dass nur mein Administratorkonto die Anfragen lesen kann. Überweisungsbelege, die bei einer Bestellung hochgeladen werden, landen in einem privaten Speicherbereich, nie in einem öffentlichen. Auf dieser Website werden keine Bankdaten eingegeben: Hier wird keine Zahlung eingezogen.",
        "items": []
      },
      {
        "h": "Termine, Treffen und Bestellungen",
        "p": "Auf dieser Website wird nichts bezahlt. Einen Einzeltermin bezahlst du über den Link, den ich dir in meiner Antwort schicke: Erst die Zahlung reserviert dein Zeitfenster, und sie verpflichtet uns beide. Bis 24 Stunden vorher verschieben wir ihn ganz problemlos; weniger als 24 Stunden vorher wird die Zahlung nicht erstattet, aber du verlierst deinen Termin nicht – wir verlegen ihn innerhalb von 3 Monaten. Die Treffen sind kostenlos, nach Anmeldung und mit begrenzter Platzzahl. Eine Bestellung eines Muling-Mikrofons bezahlst du per Banküberweisung auf ein Konto in Deutschland, direkt beim Hersteller: Du veranlasst sie selbst, aus eigener Initiative, und weder diese Website noch ich nehmen diese Zahlung entgegen. Der Hersteller übernimmt anschließend den Versand und die Sendungsverfolgung.",
        "items": []
      },
      {
        "h": "Die Inhalte der Website",
        "p": "Texte, Fotos und Videos gehören ihren jeweiligen Urhebern. Die Einzelheiten (Herausgeber, Hosting, geistiges Eigentum, Preise und MwSt.) stehen auf der Seite „Impressum“.",
        "items": []
      },
      {
        "h": "Wenn sich diese Bedingungen ändern",
        "p": "Diese Seite trägt eine Versionsnummer und ein Datum. Wenn sich der Text ändert, ändert sich auch die Version, und die neue gilt für alle danach abgeschickten Formulare. Was du akzeptiert hast, bleibt mit seiner eigenen Nummer gespeichert: So lässt sich immer nachvollziehen, welchen Text du an diesem Tag vor Augen hattest.",
        "items": []
      }
    ],
    "contactTitle": "Eine Frage zu dieser Seite?",
    "contactText": "Schreib mir an contact@lesagedavid.fr. Ich antworte persönlich, und mir ist eine zu früh gestellte Frage viel lieber als ein Zweifel, den man für sich behält.",
    "contactCta": "Schreib mir",
    "legalLink": "Impressum ansehen"
  },
  // RETOUCHE MANUELLE ASSUMÉE (09/09/2026) : bloc ajouté à la main, hors passe du
  // script de traduction, parce que la page était bloquante (validation OAuth
  // Google). Source = le bloc `privacy` du français dans src/i18n/dict.ts.
  // ⚠️ L'URL du scope Google est citée LITTÉRALEMENT et ne doit jamais être traduite.
  "privacy": {
    "title": "Datenschutzerklärung – David Lesage",
    "description": "Datenschutzerklärung der Website von David Lesage und der App Handpan Constellation Studio: erhobene Daten, Spielerkarte, Anmeldung mit Google, Terminbuchung, Google Kalender, Speicherdauer und Rechte nach der DSGVO.",
    "h1": "Datenschutzerklärung",
    "updatedLabel": "Letzte Aktualisierung",
    "updated": "3. November 2026",
    "lead": "Auf dieser Seite steht klar und deutlich, was ich mit deinen Daten mache: was ich erhebe, warum, mit welchen Werkzeugen, wie lange ich es aufbewahre und wie du jederzeit wieder selbst bestimmst. Sie gilt für diese Website und für die App Handpan Constellation Studio, einschließlich der Spielerkarte. Kein Fachchinesisch: Wenn etwas unklar ist, schreib mir – ich lese selbst.",
    "sections": [
      {
        "h": "Wer für deine Daten verantwortlich ist",
        "p": "David Lesage, Musiker, Pädagoge und Erfinder, Herausgeber dieser Website und der App Handpan Constellation Studio. Showroom: 29 rue des Orteaux, 75020 Paris. E-Mail: contact@lesagedavid.fr · Telefon: +33 6 10 73 31 52. Dahinter steht keine Marketingabteilung: Ich entscheide, was erhoben wird, ich lese es, und ich antworte dir.",
        "items": [] as string[]
      },
      {
        "h": "Wofür diese Seite gilt",
        "p": "Zwei Orte, zwei verschiedene Verwendungen, und man unterscheidet sie besser.",
        "items": [
          "Die Website lesagedavid.fr: was du in die Formulare schreibst (Buchung, Kontakt, Warteliste, Bestellung eines Mikrofons). Die Einzelheiten, Formular für Formular, stehen auf der Seite „AGB“, und sie gelten weiterhin.",
          "Das Kontaktformular fragt auch nach deiner Telefonnummer: Sie dient ausschließlich dazu, mich wieder bei dir zu melden. Sie wird so lange aufbewahrt wie deine E-Mail-Adresse und beruht auf derselben Rechtsgrundlage (deiner Einwilligung).",
          "Die App Handpan Constellation Studio: dein Konto, dein Abonnement, dein Platz auf der Spielerkarte und – wenn du unterrichtest oder Unterricht nimmst – der Unterrichtskalender."
        ]
      },
      {
        "h": "Was ich in der App erhebe, und warum",
        "p": "Bei der Erstellung deines Kontos: deine E-Mail-Adresse, dein Nachname und dein Vorname sowie eine Telefonnummer, wenn du sie angeben möchtest – diese Angabe ist freiwillig. Wenn du dein Konto über Google erstellst, übermittelt Google diese Angaben, zusammen mit deinem Profilfoto (siehe unten).",
        "items": [
          "Dein Konto erstellen und schützen und dir Zugang zur App geben.",
          "Dein Abonnement verwalten.",
          "Dich wegen deines Kontos kontaktieren.",
          "Deinen Stern auf der Spielerkarte setzen (siehe unten).",
          "Nur Gesamtauswertungen – Summen, in denen kein Konto erkennbar ist – können für Marktanalysen verwendet werden, um die Bedürfnisse von Handpan-Spielenden besser zu verstehen und die App zu verbessern."
        ]
      },
      {
        "h": "Wenn du dich mit Google anmeldest: dein Nachname, dein Vorname und dein Foto",
        "p": "Wenn du dein Konto mit Google erstellst oder dich mit Google anmeldest, übermittelt Google der App deine E-Mail-Adresse, deinen Nachnamen, deinen Vornamen und die Adresse deines Google-Profilfotos. Die E-Mail-Adresse wird zu der deines Kontos; Nachname und Vorname werden darin eingetragen.",
        "items": [
          "Wenn du beim ersten Öffnen der App noch kein Profilfoto hast, wird dein Google-Foto ein einziges Mal heruntergeladen, zugeschnitten und als Profilfoto im privaten Speicherbereich der App gespeichert. Es wird nicht veröffentlicht: Auf der Spielerkarte erscheint es nur, wenn du einen ausführlichen Steckbrief veröffentlichst und dabei das Kästchen „Mein Foto auf meinem Steckbrief zeigen“ angehakt ist (es ist standardmäßig angehakt, und du kannst den Haken entfernen).",
          "Ein Foto, das du selbst ausgewählt hast, wird nie ersetzt. Du kannst deines jederzeit unter „Mein Profil“ ändern oder löschen, und ein gelöschtes Foto wird nicht erneut importiert.",
          "Im Bereich für Lehrkräfte kann das Schülerprofil eines mit Google angemeldeten Schülers, solange dieser in der App kein Foto hat, sein Google-Foto anzeigen, das von den Servern von Google geladen wird."
        ]
      },
      {
        "h": "Die Spielerkarte (die Konstellation)",
        "p": "Die App zeigt eine Karte der Konstellation der Spieler. Sie ist nur für Personen sichtbar, die mit einem Konto angemeldet sind. Es gibt zwei Ebenen: deinen Standard-Stern und deinen ausführlichen Steckbrief, den du nur veröffentlichst, wenn du es willst.",
        "items": [
          "Dein Standard-Stern. Wie es die AGB der App vorsehen (§ 6 bis), sehen die anderen angemeldeten Personen deinen Vornamen, den Anfangsbuchstaben deines Nachnamens (oder deinen vollen Nachnamen, wenn du das unter „Mein öffentliches Profil“ wählst; du kannst jederzeit zum Anfangsbuchstaben zurückkehren) und dein Land; der Stern wird in die Mitte des Landes gesetzt. Er zeigt nie deine Adresse, deine Stadt oder deine E-Mail-Adresse. Das Land stammt aus deinem Profil oder aus der Frage bei der Begrüßung; ist kein Land bekannt, wirst du nicht auf der Karte platziert. Dein Konto zählt außerdem als eins im anonymen Zähler „🎵 Musizierende“ deines Landes (ein Land mit weniger als 3 Personen wird dort nicht genannt).",
          "Dein ausführlicher Steckbrief, wenn du ihn veröffentlichst. Er ist freiwillig und zeigt nur, was du selbst hineinschreibst oder ankreuzt: deine Rollen (Spieler, Lehrkraft, Hersteller, kombinierbar), eine Kontakt-E-Mail-Adresse nur, wenn du das dafür vorgesehene Kästchen anhakst (sie wird nie ohne deinen Klick aus deinem Konto übernommen), und deinen Ort in der Genauigkeit, die du wählst: das Land, die Stadt, ein Gebiet, das du beschreibst (sein Punkt wird auf etwa 11 km gerundet), oder eine genaue Adresse mit ihrem exakten Punkt, nach einem Warnhinweis.",
          "Eine veröffentlichte Adresse ist für alle angemeldeten Personen sichtbar, die sie sich notieren oder abschreiben können: Vermeide deine Wohnadresse, nimm lieber ein Gebiet oder die Adresse eines Unterrichtsorts.",
          "Dein Profilfoto. Wenn du deinen ausführlichen Steckbrief erstellst, ist das Kästchen „Mein Foto auf meinem Steckbrief zeigen“ standardmäßig angehakt: Wenn du ein Profilfoto hast, erscheint es dann in deinem Steckbrief und auf deinem Punkt der Spielerkarte, sichtbar für die angemeldeten Personen. Du kannst den Haken vor dem Veröffentlichen entfernen oder jederzeit danach; dein Foto wird dann sofort entfernt und durch deinen Stern ersetzt. Wenn dein Steckbrief schon bestand, bleibt deine frühere Wahl erhalten. Wird das Foto angezeigt, erfahren die angemeldeten Personen die technische Kennung deines Kontos, die keinen Zugriff auf deine Daten gibt.",
          "Du holst dir die Kontrolle zurück, wann du willst, direkt in deinem Steckbrief: Jede dieser Entscheidungen lässt sich jederzeit zurücknehmen. Das Entfernen der E-Mail-Adresse und der Position wirkt sofort. Wenn du den Haken beim Foto entfernst, deinen Steckbrief ausschaltest oder dein Foto löschst, wird der Zugriff auf dein Foto gesperrt; ein bereits geöffneter Link läuft spätestens nach einer Stunde ab.",
          "Ich kann einen Stern entfernen (Moderation), insbesondere auf schriftliche Anfrage an contact@lesagedavid.fr."
        ]
      },
      {
        "h": "Die Karte und die Adresssuche: wer was zu sehen bekommt",
        "p": "Zwei externe Dienste sind beteiligt, wenn du die Karte nutzt, und was sie erhalten, ist begrenzt.",
        "items": [
          "Die Basiskarte: Wenn sich eine Karte öffnet, ruft dein Browser sie bei OpenFreeMap ab (Hyperknot Software Kft., Ungarn), das über das Content-Delivery-Netzwerk von Cloudflare läuft. OpenFreeMap erhält deine IP-Adresse und den angezeigten Bereich, ohne Konto und ohne Cookie; deine eingegebene Adresse und dein Punkt werden nicht übermittelt. Laut der Datenschutzerklärung von OpenFreeMap enthalten seine Zugriffsprotokolle keine IP-Adresse, seine Fehlerprotokolle können die IP-Adresse und die angefragte Adresse enthalten, und diese Protokolle werden nach 7 Tagen gelöscht (bei einem Sicherheitsvorfall nach höchstens 30 Tagen).",
          "Die Adresssuche: Wenn du auf „Auf der Karte finden“ klickst, und nur dann, wird der Text der eingegebenen Adresse gesendet, bei einer Adresse in Frankreich an die Géoplateforme des IGN (Institut national de l’information géographique et forestière, Frankreich), sonst an Photon, einen Dienst von komoot (Deutschland). Photon erhält dazu die Sprache der Anzeige, und wie bei jeder Anfrage wird deine IP-Adresse mitübermittelt. Du wählst unter den Vorschlägen aus, und die Markierung bleibt verschiebbar.",
          "Weder dein Name noch deine E-Mail-Adresse noch der Standort deines Geräts werden ihnen übermittelt: Die Standortabfrage des Browsers wird nie aufgerufen. Ein Punkt existiert nur, wenn du ihn selbst setzt."
        ]
      },
      {
        "h": "Die Terminbuchung: Das geht nur die Lehrkraft und den Schüler etwas an",
        "p": "Wenn in der App eine Stunde gebucht wird, betreffen die Angaben zum Termin nur zwei Personen: die Lehrkraft und den Schüler dieser Stunde. Niemand sonst hat Zugriff darauf, weder andere Lehrkräfte noch andere Schüler noch irgendjemand von außen.",
        "items": [
          "Die Angaben zu einem Termin sind: Name und E-Mail-Adresse des Schülers, seine Telefonnummer, falls er sie angegeben hat, Datum und Uhrzeit, Dauer, Ort oder Link zur Videokonferenz, Art des Termins und die mit der Stunde verknüpften Notizen.",
          "Technisch ist der Zugriff direkt auf Ebene der Datenbank gesperrt: Ein Termin kann nur von der Lehrkraft gelesen werden, die ihn angelegt hat, und von dem betreffenden Schüler. Hinzu kommt der Administrator der App, also ich, David Lesage – ich sage es lieber, als es zu verschweigen.",
          "Diese Angaben dienen dazu, die Stunde zu organisieren, und zu nichts anderem. Sie werden weder weiterverkauft noch weitergegeben noch zu kommerziellen Zwecken geteilt."
        ]
      },
      {
        "h": "Wenn die Lehrkraft ihren Google Kalender verknüpft",
        "p": "Ob sie ihren Kalender verknüpft, entscheidet die Lehrkraft, und es bleibt eine reine Wahl: Die App funktioniert auch ohne sehr gut. Solange sie es nicht getan hat, fließen keine Daten zu Google.",
        "items": [
          "Wenn sie es tut, wird der Termin in IHREM eigenen Kalender angelegt, und der Schüler wird dazu eingeladen – das heißt, er erhält die Einladung und sieht den Termin auf seiner Seite. In den Kalender des Schülers wird nichts ohne seine eigene Zustimmung eingetragen.",
          "Die Berechtigung, die bei Google angefragt wird, ist genau diese: https://www.googleapis.com/auth/calendar.events – sie erlaubt, die Termine der Unterrichtsstunden zu erstellen, zu aktualisieren und zu löschen, und sonst nichts. Die App liest den Rest des Kalenders nicht, durchsucht ihn nicht und greift auf keinen anderen Google-Dienst zu.",
          "Kalenderdaten werden zu keinem anderen Zweck verwendet. Sie werden weder weitergegeben noch verkauft noch mit Dritten geteilt, wer auch immer sie sind.",
          "Die Lehrkraft kann die Verknüpfung ihres Kalenders jederzeit in der App aufheben. Die Verknüpfung wird dann gelöscht, und die App schreibt ab sofort nicht mehr in Google Kalender; die Stunden bleiben in der App, werden dort aber nicht mehr synchronisiert. Die bereits angelegten Termine dagegen gehören zu ihrem Google Kalender: Sie bleiben dort, und es liegt an ihr, sie dort zu löschen, wenn sie das möchte."
        ]
      },
      {
        "h": "Die Nutzungsmessung in der App",
        "p": "Die App wird von einer einzigen Person entwickelt – von mir. Damit sie gut funktioniert, um die Last auf den Servern zu messen, ihre Stabilität zu sichern und zu wissen, wo ich meine Energie einsetze, messe ich, wie sie genutzt wird: die Zeit, die in jedem Teil der App verbracht wird, die Aktionen in der Oberfläche, mit Zeitstempel und in ihrer Reihenfolge, die Anmeldungen und die Domain, über die zugegriffen wird. Wird ein Werkzeug viel genutzt, konzentriere ich mich darauf, es zu verbessern. Diese Messungen sind für die Administratoren der App zugänglich.",
        "items": [
          "Was nie erhoben wird: deine musikalischen Inhalte (weder deine Tonleitern noch deine Stücke noch das, was du spielst), der Text, den du eingibst, deine Tastenanschläge, deine Mausbewegungen. Kein Werbetracker, kein Analysetool von Drittanbietern: Nichts geht an Google, Meta oder ein Werbenetzwerk.",
          "Zwei genau umrissene Verwendungen: Die E-Mail zum Ende der Testphase wird anhand deiner Nutzung personalisiert; und wenn du ein Problem meldest, können deine Rückmeldung und der Verlauf deiner Aktionen von Claude, dem Assistenten von Anthropic, analysiert werden, um die Diagnose vorzubereiten.",
          "Diese Messungen werden 24 Monate aufbewahrt und dann automatisch gelöscht. Sie werden außerdem zusammen mit deinem Konto gelöscht.",
          "Du kannst diese Messung jederzeit in der App ablehnen, ohne es begründen zu müssen: Die Ablehnung wirkt sofort und löscht die bereits über dich gespeicherten Messungen. Bestehen bleibt nur das Fehlerprotokoll, ohne Verbindung zu deinem Konto.",
          "Das Fehlerprotokoll: Wenn die App abstürzt, wird der Fehler gespeichert, damit er behoben werden kann (bereinigte Meldung, Bildschirm, Version, Browser), auch bei Besuchern ohne Konto. Ein Einweg-Fingerabdruck des Kontos, also eine pseudonyme Angabe, ermöglicht es, die betroffenen Konten zu zählen; er wird nicht erstellt, wenn du die Messung abgelehnt hast.",
          "Das E-Mail-Tracking: Öffnungen und Klicks werden für deine Adresse gemessen, über ein unsichtbares Bild und über nachverfolgte Links, in den Kampagnen und in bestimmten automatischen E-Mails, auch ohne Konto. Das ist Teil der AGB der App. Du kannst dich von den E-Mails abmelden, die nicht unbedingt nötig sind; eine eigene Einstellung, um diese Messung abzuschalten, gibt es nicht.",
          "Der vollständige, maßgebliche Text ist der, der in der App angezeigt wird, jederzeit erreichbar über „Mein Konto“ → „📄 Datenschutz & Nutzungsbedingungen“."
        ]
      },
      {
        "h": "Auf welcher Rechtsgrundlage",
        "p": "Je nachdem, worum es geht, und das sagt man besser genau.",
        "items": [
          "Deine Einwilligung, für die Formulare der Website und für den Empfang meiner Neuigkeiten: zwei getrennte Kästchen, von denen nur eines Pflicht ist, und du kannst die eine wie die andere Einwilligung jederzeit widerrufen.",
          "Die AGB der App, zu denen die Messung der Öffnungen und Klicks bei E-Mails gehört.",
          "Die Erfüllung des Dienstes, für dein Konto, dein Abonnement und die Organisation der Unterrichtsstunden: Ohne diese Angaben kann die App schlicht nicht tun, worum du sie bittest.",
          "Die Erfüllung der AGB, die du akzeptiert hast, für deinen Standard-Stern auf der Spielerkarte (Vorname, Anfangsbuchstabe des Nachnamens, Land).",
          "Deine Einwilligung, für deinen ausführlichen Steckbrief auf der Karte und für die Anzeige deines Fotos: Ohne deinen Klick erscheint dort nichts, und du widerrufst sie jederzeit in deinem Steckbrief.",
          "Mein berechtigtes Interesse, die App zu betreiben und zu verbessern, für die Nutzungsmessung, die Teil der AGB ist – verbunden mit einem uneingeschränkten Widerspruchsrecht, das sich mit einem Handgriff in der App ausüben lässt."
        ]
      },
      {
        "h": "Wie lange ich das alles aufbewahre",
        "p": "So lange, wie es nützlich ist, nicht länger.",
        "items": [
          "Die Daten deines Kontos und der Unterrichtskalender: solange dein Konto aktiv ist. Du kannst jederzeit seine Löschung verlangen.",
          "Dein Platz auf der Spielerkarte, dein Steckbrief und dein Profilfoto: solange dein Konto besteht. Jedes Element deines Steckbriefs lässt sich jederzeit entfernen; das Entfernen der E-Mail-Adresse und der Position wirkt sofort, und der Zugriff auf dein Foto wird spätestens eine Stunde danach gesperrt.",
          "Die Nutzungsmessungen: 24 Monate, mit deinem Konto gelöscht, und sofort entfernt, wenn du der Messung widersprichst.",
          "Das Fehlerprotokoll: 90 Tage nach dem letzten Auftreten bei einem bearbeiteten Fehler, sonst 180 Tage; der Fingerabdruck des Kontos höchstens 12 Monate nach dem letzten Auftreten.",
          "Das E-Mail-Tracking (Klicks, Öffnungen, Versand, Versandfehler): 24 Monate, und bei der Löschung deines Kontos wird es gelöscht.",
          "Was du mir über die Formulare der Website schreibst: drei Jahre nach unserem letzten Austausch, und der Zähler springt bei jedem neuen Austausch wieder auf null."
        ]
      },
      {
        "h": "Die Dienstleister, über die deine Daten laufen",
        "p": "Ich verkaufe und vermiete keine Daten, an niemanden, niemals. Hier ist die Liste der Dienste, die tatsächlich beteiligt sind.",
        "items": [
          "Supabase: die Datenbank, in der die Konten, der Unterrichtskalender und die Antworten auf die Formulare gespeichert werden, sowie der Speicherbereich für hochgeladene Dateien. Das Projekt wird in Irland gehostet, in der Europäischen Union.",
          "Vercel: der Hoster dieser Website. Die kleinen Serverfunktionen, die die Formulare weiterleiten, laufen in den USA.",
          "Stripe: die Bezahlung des Abonnements der App. Die Website selbst liest dort nur die angezeigten Preise aus: Von dieser Website werden keine personenbezogenen Daten an Stripe gesendet.",
          "Google: Das Postfach contact@lesagedavid.fr wird bei Google gehostet, und von dort antworte ich dir. Die Website lädt außerdem ihre Schriftarten und die Vorschaubilder der Videos von den Servern von Google: Keine deiner Antworten wird an Google übermittelt, die IP-Adresse deines Browsers aber schon. Und Google Kalender ist nur beteiligt, wenn eine Lehrkraft sich entschieden hat, ihn zu verknüpfen, wie weiter oben beschrieben. Wenn du die Anmeldung mit Google wählst, übermittelt Google der App deine E-Mail-Adresse, deinen Nachnamen, deinen Vornamen und die Adresse deines Profilfotos. Die Audioaufnahmen der Unterrichtsstunden und die Sprachnotizen können in einem privaten, nicht öffentlichen Speicherbereich bei Google (Google Drive) aufbewahrt werden.",
          "Anthropic: Sein Assistent Claude kann eine Rückmeldung, die du mir aus der App schickst, zusammen mit dem Verlauf deiner Aktionen analysieren, um die Diagnose vorzubereiten. US-amerikanisches Unternehmen.",
          "DeepL (deutsches Unternehmen) und, ersatzweise, Google Translate: Sie übersetzen auf Anfrage eines Administrators den Text einer Rückmeldung, die du mir schickst, und den Text der E-Mails, die ich dir in deiner Sprache schreibe, einschließlich einer Passage, die dich persönlich betrifft.",
          "OpenFreeMap (Hyperknot Software Kft., Ungarn), über das Netzwerk von Cloudflare: die Basiskarte der Spielerkarte. Die Géoplateforme des IGN (Frankreich) und Photon, ein Dienst von komoot (Deutschland): die Adresssuche, nur auf deinen Klick. Was sie erhalten, ist weiter oben beschrieben.",
          "Supabase Inc., Vercel Inc., Google LLC, Anthropic PBC und Cloudflare Inc. sind US-amerikanische Unternehmen: Manche Daten können daher außerhalb der Europäischen Union verarbeitet werden. Diese Übermittlungen sind durch die in der DSGVO vorgesehenen Garantien abgesichert, die diese Dienstleister eingerichtet haben."
        ]
      },
      {
        "h": "Cookies und Reichweitenmessung auf dieser Website",
        "p": "Diese Website hier setzt keine Cookies. Sie verwendet kein Tool zur Reichweitenmessung, kein Werbepixel, keinen Tracker – deshalb gibt es auch kein Banner, das du beim Aufrufen bestätigen musst. Das Einzige, was dein Browser lokal speichert, ist die Sprache, die du gewählt hast: Sie verlässt nie dein Gerät. Nicht zu verwechseln mit der weiter oben beschriebenen Nutzungsmessung der App: Das ist etwas anderes, und sie lässt sich mit einem Klick ablehnen. Die E-Mails wiederum sind noch etwas anderes: Ihre Öffnung und die Klicks auf ihre Links werden gemessen, über ein unsichtbares Bild und über nachverfolgte Links. Das ist Teil der AGB der App und wird in ihrer Datenschutzerklärung erklärt.",
        "items": [] as string[]
      },
      {
        "h": "Deine Rechte und wie du sie ausübst",
        "p": "Ein einziger Schritt genügt: Schreib an contact@lesagedavid.fr. Kein Formular zum Ausfüllen, kein Nachweis, solange ich keine ernsthaften Zweifel an deiner Identität habe. Ich antworte dir persönlich, spätestens innerhalb eines Monats.",
        "items": [
          "Auskunft: genau wissen, was ich über dich gespeichert habe; ich kann dir eine Kopie davon schicken.",
          "Berichtigung: falsche oder veraltete Angaben korrigieren.",
          "Löschung: alles löschen, auch dein Konto.",
          "Widerspruch: einer Nutzung widersprechen, insbesondere der Nutzungsmessung und den E-Mails über Neuigkeiten.",
          "Datenübertragbarkeit: das, was du mir gegeben hast, in einer Datei erhalten, die du anderswo weiterverwenden kannst.",
          "Einschränkung: verlangen, dass deine Angaben beiseitegelegt werden, solange wir eine Meinungsverschiedenheit klären.",
          "Widerruf der Einwilligung: jederzeit, ohne dass du dich rechtfertigen musst.",
          "Und wenn du nicht mit mir einverstanden bist: Du kannst bei der CNIL, der französischen Datenschutzbehörde, Beschwerde einlegen (CNIL, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, www.cnil.fr). Aber wenn du magst, schreib mir zuerst: Das geht schneller."
        ]
      },
      {
        "h": "Sicherheit",
        "p": "Die Website und die App laufen durchgehend über HTTPS. Auf die Datenbank kann man nur mit eigens dafür vorgesehenen Zugangsdaten zugreifen, und ihre Zugriffsregeln sind auf der Ebene der Datenbank selbst festgelegt: Das stellt sicher, dass eine Unterrichtsstunde nur von der Lehrkraft und dem Schüler gelesen werden kann, die sie betrifft. Das Token, das den Zugriff auf Google Kalender erlaubt, wird in einer Tabelle aufbewahrt, auf die von einem Browser aus keinerlei Zugriff möglich ist, und es wird nie an den Client zurückgesendet. Dein Profilfoto liegt in einem privaten Speicherbereich: Für angemeldete Personen wird es nur sichtbar, wenn du „Mein Foto auf meinem Steckbrief zeigen“ angekreuzt hast. Auf dieser Website werden keine Bankdaten eingegeben oder gespeichert: Die Zahlungen laufen über Stripe.",
        "items": [] as string[]
      },
      {
        "h": "Wenn sich diese Seite ändert",
        "p": "Oben steht das Datum der letzten Aktualisierung. Wenn sich der Text ändert, ändert sich auch dieses Datum. Bei der App ist das Dokument, das vor dem Einstieg angezeigt wird, mit einer Versionsnummer versehen: An ihr lässt sich erkennen, welchen Text genau du vor Augen hattest, als du ihn akzeptiert hast.",
        "items": [] as string[]
      },
    ],
    "contactTitle": "Eine Frage zu dieser Seite?",
    "contactText": "Schreib mir an contact@lesagedavid.fr. Ich antworte persönlich, und mir ist eine zu früh gestellte Frage viel lieber als ein Zweifel, den man für sich behält.",
    "contactCta": "Schreib mir",
    "legalLink": "Impressum ansehen",
    "termsLink": "AGB ansehen"
  },
  "data": {
    "woodSupplements": {
      "frene": "Im Grundpreis enthalten",
      "chene": "Im Grundpreis enthalten",
      "acajou": "Aufpreis +90 € zzgl. MwSt.",
      "cerisier": "Aufpreis +90 € zzgl. MwSt.",
      "noyer": "Aufpreis +190 € zzgl. MwSt."
    },
    "woodEnNames": {
      "frene": "Ash",
      "chene": "Oak",
      "acajou": "Mahogany",
      "cerisier": "Cherry",
      "noyer": "Walnut"
    },
    "woodDescriptions": {
      "frene": "Helles Holz mit ausgeprägter Längsmaserung und feiner Struktur. Esche ist das Standardholz des Neotone¹: leicht, mit ausgewogener Resonanz und schlichter Optik. Die Wahl von Musikern, die ein neutrales, vielseitiges Instrument wollen, das beim Spielen nicht zu sehr die Blicke auf sich zieht.",
      "chene": "Robustes Holz mit dichterer Maserung als Esche, in goldenen Honigtönen. Ein edler Charakter, optisch wärmer als Esche. Im Grundpreis enthalten: die natürliche Alternative für alle, die ohne Aufpreis eine wärmere Optik möchten.",
      "acajou": "Tief ockerrotes Holz, schwer und warm. Mahagoni bringt optische Tiefe und eine Vintage-Eleganz – es erinnert sofort an hochwertige klassische Instrumente. Entwickelt über die Jahre eine sehr schöne Patina.",
      "cerisier": "Rosafarbenes Holz mit einem Stich ins Orange, mit feiner, gleichmäßiger Maserung. Kirschholz gewinnt mit der Zeit an Intensität und dunkelt leicht nach. Ein sanfter, unverwechselbarer Charakter, zwischen dem Hellen der Eiche und der Tiefe des Mahagonis.",
      "noyer": "Dunkles Holz mit tiefen Schokoladentönen, manchmal von helleren Adern marmoriert. Nussbaum ist das kontrastreichste der fünf Hölzer, perfekt für einen bewusst edlen Look. Oft gewünscht für visuelle Produktionen oder Bühnenaufbauten, bei denen das Instrument im Licht steht."
    },
    "metalNames": {
      "nitrure": "Nitrierter Stahl",
      "inox": "Edelstahl",
      "ember": "Ember Steel"
    },
    "metalEnNames": {
      "nitrure": "Nitrided steel",
      "inox": "Stainless steel",
      "ember": "Ember steel"
    },
    "metalTags": {
      "nitrure": "Klar und kraftvoll",
      "inox": "Warm, langes Sustain",
      "ember": "Im Yishama-Katalog"
    },
    "metalDescriptions": {
      "nitrure": "Ausgangsmaterial ist ein kaltgewalzter, kohlenstoffarmer Stahl, meist DC04, der in einer Spezialanlage nitriert wird. Das Verfahren härtet den Stahl und bildet an seiner Oberfläche eine Schutzschicht. Es ist der historische Stahl des Handpans.",
      "inox": "Edelstahl rostet nicht. Das ist seine erste Stärke, aber nicht die interessanteste: Vor allem klingt er ganz anders, runder, mit einem viel längeren Ausklang als nitrierter Stahl.",
      "ember": "Ein speziell für den Handpan entwickelter Edelstahl, den Yishama neben nitriertem Stahl und klassischem Edelstahl im Katalog führt. Yishama vergleicht ihn in seinem Artikel nicht mit den beiden anderen: Statt zusammenzufassen, was dort nicht steht, hörst du ihn dir am besten an – frag sie nach einer Hörprobe oder komm zum Anhören in den Showroom."
    },
    "metalSound": {
      "nitrure": "Ein eher keramischer Klang, fast wie Terrakotta. Die hohen Frequenzen werden mit viel Lautstärke verstärkt: Yishama schreibt, man höre ihn kilometerweit.",
      "inox": "Eine sehr warme, weiche Klangfarbe mit reichlich Sustain, länger als bei nitriertem Stahl. Die verstärkten Frequenzen liegen eher im unteren Spektrum.",
      "ember": "Von Yishama in seinem Materialvergleich nicht näher beschrieben."
    },
    "metalCare": {
      "nitrure": "Braucht mehr Pflege als Edelstahl: regelmäßig reinigen und ölen. Trotz der Nitrierschicht besser nicht mit an den Strand nehmen.",
      "inox": "Rostbeständig: seltener reinigen und ölen, aber trotzdem empfehlenswert. Dafür sehr hitzeempfindlich: In der prallen Sonne kann er sich vorübergehend verstimmen.",
      "ember": "Ein Edelstahl: dieselben allgemeinen Vorsichtsmaßnahmen wie bei klassischem Edelstahl."
    },
    "metalBest": {
      "nitrure": "Draußen, auf der Straße, überall, wo der Klang ohne Verstärkung weit tragen muss.",
      "inox": "Drinnen, im Konzert, im Studio – eher als auf der Straße.",
      "ember": "Erst anhören, dann entscheiden."
    },
    "yishamaVideos": [
      "Die allererste Begegnung mit dem Instrument",
      "Was ich an meinem Yishama mag: die Logik der Tonleiter",
      "Fallin’ – Cover von Alicia Keys",
      "Copier-Coller – Cover von Bigflo & Oli",
      "Ave Maria, Jazz-Version",
      "Rózsa – traditionelles ungarisches Lied"
    ],
    "modelTaglines": {
      "one": "Das Wesentliche, ohne Display",
      "mutant": "Maximaler Ausdruck, mit LCD-Display"
    },
    "modelNotes": {
      "one": "10 Töne · ohne Display",
      "mutant": "19 Töne · LCD-Display"
    },
    "modelFeatures": {
      "one": [
        "9 Haupttöne + Ding + Dome (10 Spielzonen)",
        "Bis zu 9 Tonleitern offline geladen (eigene Tasten) · unbegrenzt, sobald verbunden",
        "Unbegrenzt eigene Tonleitern über die Weboberfläche erstellen",
        "Multifunktions-Ding: Tonleiter wechseln · eingebaute Aufnahmefunktion",
        "Volle MIDI-Steuerung (In / Out)",
        "1 Pedaleingang (Lautstärke oder Expression)",
        "Audioausgang mono (1 Klinke) oder stereo (2 Klinken)",
        "Li-Ion-Akku 7800 mAh: 8 Std. Laufzeit",
        "1.300 Samples pro Tonleiter · 48 kHz / 32 Bit"
      ],
      "mutant": [
        "9 Tonplätze mit Erweiterungszonen = 19 Töne pro Tonleiter",
        "Bis zu 18 Tonleitern offline geladen (eigene Tasten) · unbegrenzt, sobald verbunden",
        "Unbegrenzt eigene Tonleitern über die Weboberfläche erstellen",
        "Integriertes LCD-Display mit Hintergrundbeleuchtung",
        "Multifunktions-Ding: Tonleiter wechseln · eingebaute Aufnahmefunktion",
        "Volle MIDI-Steuerung (In / Out)",
        "1 Pedaleingang (Lautstärke oder Expression)",
        "Audioausgang mono (1 Klinke) oder stereo (2 Klinken)",
        "Li-Ion-Akku 7800 mAh: 8 Std. Laufzeit",
        "1.300 Samples pro Tonleiter · 48 kHz / 32 Bit"
      ]
    },
    "specs": [
      {
        "title": "Studio-Klangqualität",
        "items": [
          "48 kHz / 32 Bit · DAC 24 Bit / 384 kHz",
          "Signal-Rausch-Abstand: 112 dB",
          "Audio-Latenz: 5 ms",
          "1.300 Studio-Samples pro Tonleiter",
          "Töne: 7 Nuancen × 10–15 Anschlagstärken"
        ]
      },
      {
        "title": "7 offizielle Tonleitern inklusive (+ unbegrenzt über die App)",
        "items": [
          "Offizielle Tonleitern aus Handpans von MAG Instruments & Yishama",
          "Z. B. B-Amara · C-Aegean · C# Pygmy · D-Kurd · F#2 Pygmy · G-Romanian Hijaz…",
          "Erstelle deine eigenen Tonleitern, ganz ohne Grenzen",
          "Tonleitern, kostenlos geteilt von der Community"
        ]
      },
      {
        "title": "8 Stunden Akku",
        "items": [
          "Integrierter Li-Ion-Akku 7,4 V · 7.800 mAh",
          "8 Stunden Laufzeit bei Dauerspiel",
          "Volle Ladung: 4 Stunden",
          "12-V-Netzteil im Lieferumfang"
        ]
      },
      {
        "title": "Volles MIDI In/Out",
        "items": [
          "MIDI-Controller (Out) + MIDI-Klangmodul (In)",
          "6 Korpuszonen + 18 Pads + Ding + Dome",
          "MIDI-Noten pro Zone zuweisbar",
          "MIDI-kompatibel"
        ]
      },
      {
        "title": "Profi-Anschlüsse",
        "items": [
          "Unsymmetrische Line-Ausgänge (R/L)",
          "Kopfhörerausgang · MIDI In/Out",
          "1 Pedaleingang (Lautstärke oder Expression)",
          "Mono (1 Klinke) oder Stereo (2 Klinken)",
          "WLAN · Einstellungen, Tonleitern erstellen"
        ]
      },
      {
        "title": "Format, Gewicht & Sensoren",
        "items": [
          "47 cm Durchmesser · 16 cm Höhe",
          "3,5 kg (je nach Holzart)",
          "Sensorgenauigkeit: 0,5 cm",
          "Empfindlichkeit: 20 bis 5.000 g",
          "Erkennt Anschlag, Druck und Position"
        ]
      }
    ],
    "comparatif": [
      {
        "aco": "Für 10 Tonleitern brauchst du 10 Handpans: mühsamer Transport, sperrige Aufbewahrung, ein Budget, das immer weiter steigt.",
        "neo": "Ein einziger Neotone öffnet dir unendlich viele Tonleitern: nur ein Instrument zum Transportieren, Verstauen und Bezahlen. Und du erstellst sogar deine eigenen, maßgeschneiderten Tonleitern."
      },
      {
        "aco": "Zwei Spieler, zwei verschiedene Tonleitern: Zusammen zu spielen oder eine Tonleiter zu teilen ist schwierig.",
        "neo": "Alle laden dieselbe Tonleiter, um zusammen zu spielen: Lernen und Teilen werden einfach, und dir steht die Welt offen, um mit anderen Instrumenten zu spielen."
      },
      {
        "aco": "Bei einer Jam mit Percussion, Saxofon oder Bass geht der akustische Handpan schnell unter.",
        "neo": "Die Lautstärke lässt sich regeln: Du bleibst inmitten der anderen Instrumente immer hörbar, auf der Bühne wie bei der Jam."
      },
      {
        "aco": "Einen Sänger zu begleiten ist schwierig: Eine feste akustische Tonleiter passt schlecht zu unterschiedlichen Stimmen.",
        "neo": "Du begleitest die Stimme in jeder Stimmlage und spielst bekannte Lieder wie am Klavier oder an der Gitarre: Der Handpan verlässt endlich seine Nische."
      },
      {
        "aco": "Zerbrechlich und empfindlich: In der prallen Sonne kann man nicht spielen, und die Stimmung verschiebt sich mit der Zeit und durch Stöße.",
        "neo": "Immer perfekt gestimmt, unempfindlich gegen Hitze. Wähle 440 Hz oder 432 Hz und transponiere eine Tonleiter, um mit den anderen Instrumenten in der richtigen Tonart zu spielen."
      },
      {
        "aco": "Sehr wenige Töne. Die Physik des Metalls begrenzt alles: Größe, Dissonanzen, verfügbarer Platz.",
        "neo": "Die Elektronik macht die Anordnung der Töne frei: viel mehr Töne und Tonleitern auf einem einzigen Instrument."
      },
      {
        "aco": "Die akustische Anschlagtechnik ist anspruchsvoll: Am Anfang kann das manche entmutigen, die dann aufgeben, weil die Freude nicht sofort kommt.",
        "neo": "Sensoren mit einstellbarer Empfindlichkeit: ein sauberer Ton ab dem ersten Anschlag, Spielfreude von Anfang an."
      },
      {
        "aco": "Obertöne zum Klingen zu bringen, erfordert auf einem akustischen Instrument eine seltene Präzision.",
        "neo": "Auf dem Neotone kommen die Obertöne leicht – und die akustischen Effekte bleiben erhalten."
      },
      {
        "aco": "Beim akustischen Mutant sind die Tonfelder der Mutant-Töne klein und verlangen Präzision.",
        "neo": "Die Größe der Anschlagzonen ist einstellbar (bis zu 30 % des Pads): Vergrößere sie für den Einstieg, verkleinere sie für mehr Präzision."
      }
    ],
    "faq": [
      {
        "q": "Welche Garantie gibt es auf den Neotone?",
        "a": "Jeder Neotone wird mit 6 Jahren Garantie, einem Semi-Hardcase und einem Ladegerät geliefert."
      },
      {
        "q": "Welches Unternehmen stellt den Neotone her?",
        "a": "Der Neotone wird von Soundventure Ltd in Budapest (Ungarn) hergestellt. Das Instrument entstand aus dem Traum zweier Freunde, Csaba und Norbert; die Firma wurde 2021 mit Unterstützung von MAG Instruments und Yishama Ltd gegründet. Ich war mehrmals in ihren Werkstätten in Ungarn: Ich kenne Csaba und Norbert persönlich, ebenso das ganze Team (Gergely, Dániel und die Handwerker von MAG Instruments sowie Yonathan von Yishama). Außerdem bin ich seit 2021 offizieller Betatester der Marke: Seit dem ersten Neotone¹ habe ich Tausende von Bugs gemeldet und beheben lassen und zahlreiche Verbesserungen vorgeschlagen."
      },
      {
        "q": "Für wen ist der Neotone gedacht?",
        "a": "Für alle: Einen digitalen Handpan zu spielen setzt keine Vorkenntnisse voraus. Schnell unverzichtbar wird er für Bühnenmusiker (Schleifen aufnehmen, Pedale anschließen), für Studioaufnahmen, für alle, die nachts spielen (mit Kopfhörer), und für digitale Nomaden. Und wer schon überzeugt ist, dem öffnet er das unendliche Feld der Kreation eigener Tonleitern."
      },
      {
        "q": "Fühlt er sich genauso an wie ein akustischer Handpan?",
        "a": "Das Spielgefühl ist ein anderes als beim akustischen Handpan: Der Klang kommt nicht direkt aus dem Instrument, sondern aus einem Kopfhörer oder einem Lautsprecher. Die Vorteile: völliges Eintauchen mit Kopfhörer, regelbare Lautstärke, keine Rückkopplung mehr auf der Bühne. Die Bose-L1-Systeme sind ideal; der Bose S1 Pro ist eine ausgezeichnete tragbare Lösung."
      },
      {
        "q": "Ist der Mutant dasselbe wie ein echter „Mutant“-Handpan?",
        "a": "Nein. Die zusätzlichen Töne spielst du über einen eigenen Bereich im Inneren jedes Pads, das verlangt ein sanftes und präzises Spiel. Für mehr Komfort kannst du diesen Bereich auf bis zu 30 % des Pads vergrößern."
      },
      {
        "q": "Ich fange gerade an – empfiehlst du mir den Neotone?",
        "a": "Beide Modelle eignen sich bestens für den Einstieg. Den Neotone zu spielen ist sogar leichter als einen akustischen Handpan: Die Empfindlichkeit der Sensoren ist einstellbar, und du bekommst vom ersten Anschlag an einen sauberen Ton. Der Mutant verlangt für seine zusätzlichen Töne ein etwas präziseres Spiel, lässt dich in der Harmonik aber viel weiter gehen."
      },
      {
        "q": "Brauche ich zusätzliches Zubehör, damit er klingt?",
        "a": "Der Neotone ist ein eigenständiges digitales Instrument mit eigener Klangerzeugung: Er braucht keinen Computer. Eingebaute Lautsprecher hat er nicht. Um den Klang zu hören, schließt du ihn also an einen Lautsprecher an (zum Beispiel den Akku-Lautsprecher Bose S1 Pro+) oder spielst mit Kopfhörer."
      },
      {
        "q": "Kann man den Klang des Neotone mit Effekten bearbeiten?",
        "a": "Wie bei einer E-Gitarre kannst du jedes externe Gerät anschließen: Effektpedale (Boss OC-3), Loopstations (Roland RC-505 MKII), Hallgeräte (Strymon Nightsky, Hologram Microcosm)."
      },
      {
        "q": "Kann man einen Neotone mieten oder ausleihen?",
        "a": "Nein. Den Neotone gibt es nicht zur Miete, und ich verleihe weder Instrumente noch Prototypen. Wenn du ihn vor dem Kauf ausprobieren willst, komm in den Showroom nach Paris: Dort spielst du die Modelle, die auf Lager sind, so lange du willst."
      },
      // chantier 44 : jamais traduit avant la relecture du 04/11/2026
      {
        "q": "Ist der Neotone tragbar und läuft er mit Akku?",
        "a": "Ja. Rund 8 Stunden Akkulaufzeit bei durchgehendem Spielen. Er wird mit einem Ladegerät geliefert, das du nutzen kannst, egal ob du gerade darauf spielst oder nicht.",
      },
    ],
    "procedure": [
      {
        "title": "Melde dich bei mir für deinen Rabattcode",
        "text": "Schick mir eine E-Mail mit deinem Vor- und Nachnamen, deinem Lieferland, deiner E-Mail-Adresse und deiner Telefonnummer."
      },
      {
        "title": "Erhalte deinen persönlichen Rabattcode",
        "text": "Du bekommst von Neotone einen Rabattcode auf deinen Namen (−5 % online, −7 % im Showroom)."
      },
      {
        "title": "Bestelle bei Neotone",
        "text": "Neotone meldet sich innerhalb von zwei Tagen mit einem persönlichen Angebot bei dir."
      },
      {
        "title": "Leiste die Anzahlung von 1.000 € netto",
        "text": "Sobald die Bestätigung da ist, zahlst du eine Anzahlung von 1.000 € netto. Damit beginnt die handwerkliche Fertigung deines Instruments."
      },
      {
        "title": "Geduld während der Fertigung",
        "text": "Die Fertigung dauert je nach Warteliste zwischen 2 und 5 Monaten. Du bekommst eine persönliche Schätzung der Wartezeit."
      },
      {
        "title": "Zahle den Restbetrag und erhalte deinen Neotone",
        "text": "Sobald dein Instrument fertig ist, bekommst du eine E-Mail. Du zahlst den Restbetrag, dann wird dir das Instrument mit seiner Rechnung zugeschickt, überallhin auf der Welt."
      }
    ],
    "procedureShowroom": [
      {
        "title": "Vereinbare einen Termin mit mir",
        "text": "Zwei Möglichkeiten: Komm zu einem meiner öffentlichen Treffen (eines pro Monat) oder buche einen Einzeltermin nur für dich – 1 Std. · 50 € oder 1 Std. 30 Min. · 70 €."
      },
      {
        "title": "Probier beide Modelle selbst aus",
        "text": "Vor Ort nimmst du dir Zeit, den Neotone¹ und den Mutant zu testen, die Hölzer zu vergleichen und mir all deine Fragen zu stellen."
      },
      {
        "title": "Nimm dein Instrument noch am selben Tag mit",
        "text": "Du bekommst den Showroom-Rabatt (−7 %) und nimmst deinen Neotone direkt mit, ganz ohne Fertigungszeit."
      }
    ],
    "included": [
      {
        "title": "Tragetasche",
        "text": "Spezielle schwarze Tasche mit Schultergurt und Rucksackgurten · 520 × 220 mm."
      },
      {
        "title": "Weltweiter Versand",
        "text": "Versandkosten im Preis enthalten, weltweit."
      },
      {
        "title": "6 Jahre Garantie",
        "text": "Reparatur + Transport inklusive."
      },
      {
        "title": "Ladegerät inklusive",
        "text": "Standard-Ladegerät 12 V im Lieferumfang (Stecker passend zum Lieferland)."
      },
      {
        "title": "1 Jahr Studio-Lizenz",
        "text": "Für die App Handpan Constellation Studio: 89 € geschenkt."
      }
    ],
    "extras": [
      {
        "title": "Ein Kopfhörer oder Ohrhörer",
        "text": "Um lautlos zu spielen, nachts oder in der Wohnung. Am besten ein Kopfhörer mit 6,35-mm-Klinkenstecker (oder ein Adapter)."
      },
      {
        "title": "Ein Klinkenkabel mit Winkelstecker",
        "text": "Ein Mono-Klinkenkabel (1 Ausgang) oder Stereo-Klinkenkabel (2 Ausgänge), um den Neotone mit deinem Lautsprecher zu verbinden. Wichtig: Nimm auf der Seite des Instruments einen Winkelstecker – nur so kannst du den Handpan auf den Boden legen, ohne die Buchse zu beschädigen."
      },
      {
        "title": "Ein Lautsprecher",
        "text": "Unverzichtbar, um den Klang hörbar zu machen. Mein Tipp: der Bose S1 Pro+ (≈ 599 €), mit Akku (8 Std. Laufzeit), stark bei Jams oder kleinen Konzerten – mit mehr Bass als der alte S1 Pro, einem optionalen Funksender und dem Subwoofer Sub 1, wenn du richtig tiefe, warme Bässe willst."
      },
      {
        "title": "Ein Kabel MIDI → USB",
        "text": "Ein Kabel von MIDI auf USB (oder von USB-A auf USB-C), wenn du eine Musiksoftware steuern willst (DAW: Logic Pro, Ableton Live…)."
      }
    ],
    "calc": {
      "modeQuestion": "Wie möchtest du deinen Neotone bekommen?",
      "modeOnline": "📦 Ich lasse ihn mir liefern",
      "modeOnlineSub": "Weltweiter Versand inklusive · 5 % Rabatt",
      "modeShowroom": "🏠 Ich komme in den Showroom ★",
      "modeShowroomSub": "Paris (20. Arr.) · 7 % Rabatt · ohne Wartezeit",
      "step1": "1 · Wähle dein Modell",
      "step2": "2 · Wähle dein Holz",
      "step3": "3 · Dein Lieferland",
      "b2b": "Ich habe eine USt-IdNr. (B2B) – die MwSt. ist erstattungsfähig (Steuerschuldnerschaft des Leistungsempfängers), du zahlst den Nettopreis.",
      "recap": "Übersicht",
      "basePrice": "Listenpreis netto (inkl. Versand)",
      "subtotal": "Zwischensumme netto",
      "savings": "Du sparst",
      "savingsB2B": "Du zahlst nicht",
      "savingsB2BNote": "Also {discountRate} Rabatt + {vatRate} MwSt. auf den Grundpreis – die Differenz zum Katalogpreis inkl. MwSt. ({catalog}). Echte Ersparnis ist nur der Rabatt von {discount}: Die MwSt. streckst du nicht vor (Steuerschuldnerschaft des Leistungsempfängers), und du würdest sie ohnehin zurückbekommen.",
      "getCode": "Meinen Rabattcode bekommen",
      "modeOnlineShort": "Online-Kauf mit Rabattcode (−5 %)",
      "modeShowroomShort": "Kauf im Showroom (−7 %)",
      "stockStateIn": "Im Showroom verfügbar",
      "stockStateInSub": "Du kannst ihn in Paris (20. Arrondissement) ausprobieren und gleich mitnehmen.",
      "stockStateTransit": "Ankunft im Showroom: {period}",
      "stockStateTransitSoon": "Bald im Showroom",
      "stockStateTransitSub": "Der Preis unten bleibt gültig. Stell deine Anfrage: Ich halte dich über seine Ankunft und die Lieferzeiten auf dem Laufenden.",
      "stockStateOut": "Nicht im Showroom auf Lager: auf Bestellung",
      "stockStateOutSub": "Der Preis unten bleibt gültig. Stell deine Anfrage: Ich frage bei Neotone die Fertigungs- und Lieferzeit für dieses Modell und dieses Holz an und melde mich dann bei dir.",
      "stockTagIn": "Im Showroom",
      "stockTagTransit": "Bald da",
      "stockTagOut": "Auf Bestellung",
      "stockRequestButton": "Anfrage stellen",
      "stockRequestTitle": "Anfrage für einen Neotone, der noch nicht im Showroom ist",
      "stockRequestIntro": "Hinterlass mir deine Kontaktdaten: Ich frage bei Neotone die Fertigungs- und Lieferzeit bis Paris für dieses Modell und dieses Holz an und melde mich mit der Antwort bei dir.",
      "discountLabel": "Botschafter-Rabatt",
      "vat": "MwSt.",
      "finalTTC": "Endpreis inkl. MwSt.",
      "finalIncluded": "Weltweiter Versand inklusive · 6 Jahre Garantie",
      "finalShowroom": "Abholung im Showroom · Paris (20. Arrondissement) · keine Wartezeit, keine Versandkosten",
      "finalB2B": "Zu zahlender Nettopreis (Steuerschuldnerschaft des Leistungsempfängers)",
      "finalB2BNote": "MwSt. erstattungsfähig · USt-IdNr. erforderlich",
      "finalExtUE": "Zu zahlender Nettopreis · außerhalb der EU",
      "finalExtUENote": "Ohne EU-MwSt. · lokale Zollgebühren trägst du",
      "b2bNote": "Steuerschuldnerschaft des Leistungsempfängers: Du führst die MwSt. in deinem Land ab und ziehst sie dort als Vorsteuer wieder ab. Gültige USt-IdNr. erforderlich.",
      "vatStd": "MwSt.",
      "noVat": "ohne EU-MwSt."
    }
  }
}
