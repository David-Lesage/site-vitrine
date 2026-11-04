// Espagnol du site, RELU (chantier 44, 04/11/2026) : 32 lots relus un par un contre le
// français de `dict.ts`, avec la consigne de l'app (même lexique, mêmes libellés que l'app).
// Ce fichier n'est plus généré : `scripts/traduire-i18n-es.mjs` (Google) l'écraserait, il ne
// doit plus être lancé. Une correction se fait ici, valeur par valeur, comme dans `en.ts`.
// Un texte français nouveau ou modifié se traduit ici à la main (ou par un lot de relecture).

import type { Dict } from './dict'

export const es: Dict = {
  "common": {
    "nav": {
      "home": "Inicio",
      "neotone": "El Neotone",
      "yishama": "Yishama",
      "shop": "Tienda",
      "lessons": "Clases",
      "studio": "Handpan Constellation Studio",
      "blog": "Blog",
      "showroom": "Showroom",
      "about": "Acerca de",
      "contact": "Contacto"
    },
    "brandSub": "Música visible",
    "tagline": "Hacer que la música sea visible y accesible, a través de los colores, la geometría y las emociones.",
    "headerCta": "Ven a probarlo en París",
    "footer": {
      "resources": "Recursos",
      "navigation": "Navegación",
      "contact": "Contacto",
      "learnHandpan": "Aprender el handpan",
      "electricVsAcoustic": "Electrónico vs. acústico",
      "chooseHandpan": "¿Qué handpan elegir?",
      "newsletter": "Boletín",
      "faq": "Preguntas frecuentes",
      "legal": "Aviso legal",
      "terms": "Condiciones generales",
      "privacy": "Política de privacidad",
      "rights": "Embajador independiente Neotone · Todos los precios son orientativos y están sujetos a cambios sin previo aviso."
    },
    "skip": "Saltar al contenido",
    "terms": {
      "check": "Acepto las {link}",
      "link": "condiciones generales",
      "hint": "Te explican cómo utilizo tus datos, a qué te comprometes al reservar y cómo darte de baja cuando quieras.",
      "required": "Para continuar, tienes que aceptar las condiciones generales."
    },
    "news": {
      "check": "Quiero recibir información sobre las próximas fechas y novedades",
      "optional": "opcional",
      "hint": "Nuevas fechas de encuentros, apertura de la aplicación, nuevos instrumentos. Escribo poco, y te das de baja con un clic. Si no marcas la casilla, solo te escribo para responder a tu solicitud."
    },
    "credentials": [
      "Premio del Conservatorio",
      "The Voice · Temporada 11",
      "Embajador Neotone · Yishama · Maison du Ngoni",
      "Showroom París 20"
    ],
    "beta": {
      "badge": "Acceso limitado",
      "title": "La aplicación todavía no está abierta al público",
      "text": "Por ahora, un pequeño grupo de probadores beta usa Handpan Constellation Studio, mientras se pule la experiencia. Tienen acceso gratuito a cambio de sus comentarios.",
      "wish": "¿Te gustaría ser probador beta? Marca la casilla en el formulario y cuéntame brevemente por qué te interesa la aplicación y cómo piensas usarla. Leo los mensajes y respondo personalmente.",
      "more": "Acceso a la aplicación",
      "ctaWaitlist": "Unirse a la lista de espera",
      "priceClosedNote": "Estos precios son orientativos: serán los de la apertura al público. La aplicación entera, plan Gratis incluido, todavía no está abierta: hoy no se puede acceder a ningún plan. La usa un pequeño grupo de probadores beta, que tienen acceso gratuito a cambio de sus comentarios. Por ahora, la lista de espera es la única puerta de entrada, sea cual sea el plan que te interese cuando abra. ¿Te gustaría ser probador beta? Cuéntame aquí abajo por qué te interesa la aplicación: leo y respondo personalmente.",
      "formTitle": "Recibir aviso de la apertura",
      "formFirst": "Nombre",
      "formLast": "Apellidos",
      "formEmail": "Correo electrónico",
      "formHandpan": "¿Ya tienes un handpan?",
      "formHandpanYes": "Sí",
      "formHandpanNo": "No",
      "formHandpanPlanning": "Planeo comprar uno",
      "formHandpanType": "¿Qué tipo?",
      "formHandpanTypeAcoustic": "Acústico",
      "formHandpanTypeElectronic": "Electrónico",
      "formHandpanTypeBoth": "Ambos",
      "formUsage": "¿Para qué utilizarás Handpan Constellation Studio?",
      "formUsageHint": "Marca todo lo que te corresponda. Lo que declares determina tu acceso: si se aplican varias casillas, cuenta la de mayor compromiso.",
      "formUsagePersonal": "Para mí: aprender, tocar, componer",
      "formUsagePersonalDeal": "Gratis. Tus creaciones siguen siendo tuyas; las exportaciones llevan marca de agua.",
      "formUsageTeacher": "Para enseñar: la uso como herramienta en clases que cobro",
      "formUsageTeacherDeal": "Licencia Docente: espacio de alumnos, ejercicios, partituras, exportaciones sin marca de agua. En construcción: los primeros profesores la están diseñando conmigo.",
      "formUsageMaker": "Para fabricar: diseño y afino handpans",
      "formUsageMakerDeal": "Eres creador. Dime qué sabes fabricar y entras en el catálogo de fabricantes de la aplicación: la gente te elige cuando diseña el handpan de sus sueños, según tu ubicación y tus capacidades. Yo te traigo clientes, me quedo con un porcentaje y tú les haces un precio por recomendación. Solo trabajo con fabricantes afines, que hacen un trabajo de calidad.",
      "formUsageOther": "Otro / todavía no lo sé",
      "formUsageBoth": "Ambos",
      "formStudentCount": "¿Cuántos alumnos tienes en este momento?",
      "formStudentCountNone": "Ninguno por el momento",
      "formStudentCount1": "1 a 5",
      "formStudentCount6": "6 a 20",
      "formStudentCount20": "Más de 20",
      "formMakerLegend": "Tu ficha de fabricante",
      "formMakerHint": "Eso es lo que hará que aparezcas en el catálogo, con las personas adecuadas frente a ti.",
      "formMakerCountry": "¿Dónde fabricas?",
      "formMakerCountryPlaceholder": "País, ciudad",
      "formMakerNotes": "¿Hasta cuántas notas por instrumento?",
      "formMakerNotes9": "9 o menos",
      "formMakerNotes10": "10 a 13",
      "formMakerNotes14": "14 a 17",
      "formMakerNotes18": "18 o más",
      "formMakerNotesVaries": "Depende de las escalas",
      "formMakerMetals": "¿Con qué metales trabajas?",
      "formMakerMetalNitrided": "Acero nitrurado",
      "formMakerMetalStainless": "Acero inoxidable",
      "formMakerMetalEmber": "Ember steel",
      "formMakerMetalOther": "Otro",
      "formMakerPricing": "Tus escalas preferidas, tus tarifas, tus plazos",
      "formMakerPricingPlaceholder": "Ej.: D Kurd de 9 notas, 1 400 €, plazo de 3 meses.",
      "formPledgeTitle": "¿Estamos de acuerdo?",
      "formPledgeText": "Construyo esta herramienta solo. Lo que declares aquí determina tu acceso: no es un control, es un acuerdo. Si tu uso cambia (por ejemplo, empiezas a enseñar con ella), dímelo: lo ajustamos, sin más.",
      "formPledgeCheck": "Me comprometo con la honestidad de lo que declaré.",
      "formRolesRequired": "Marca al menos una casilla: es lo esencial de la solicitud.",
      "invitedTitle": "Estás entre las personas invitadas ✨",
      "invitedText": "Esta dirección fue invitada a unirse a la beta. Solo te queda elegir una contraseña para entrar.",
      "invitedBtn": "Crear mi contraseña y entrar",
      "invitedNotMe": "No soy yo: unirme a la lista de espera",
      "formShowcase": "Me gustaría recibir aviso de los próximos encuentros gratuitos en París",
      "formBeta": "Me gustaría convertirme en probador beta: acceso anticipado y gratuito a la aplicación a cambio de mis comentarios periódicos.",
      "formMotivation": "¿Por qué te interesa la aplicación? (opcional)",
      "formMotivationBeta": "¿Por qué quieres convertirte en probador beta?",
      "formMotivationHint": "Cuéntame brevemente por qué te interesa y cómo piensas usarla: tu respuesta vale como candidatura para unirte a los probadores beta. Leo todo, personalmente.",
      "formMotivationPlaceholder": "Lo que busco, cómo toco, lo que me gustaría hacer con ella…",
      "formSubmit": "Me gustaría tener acceso a la aplicación en cuanto se abra al público",
      "formSending": "Guardando…",
      "formError": "No se pudo guardar tu inscripción. Vuelve a intentarlo o escríbeme directamente.",
      "formPrivacy": "Tu correo solo sirve para avisarte de la apertura. Sin spam, y puedes darte de baja en cualquier momento."
    },
    "emotions": [
      "Equilibrio",
      "Impulso",
      "Aventura",
      "Relajación",
      "Tensión",
      "Nostalgia",
      "Misterio"
    ]
  },
  "home": {
    "title": "Aprender a tocar el handpan de otra manera · David Lesage",
    "description": "Handpan acústico Yishama, handpan electrónico Neotone y un método basado en los colores: aprende a tocar el handpan de otra manera con Handpan Constellation Studio.",
    "heroEyebrow": "Músico · Educador · Inventor",
    "heroTitleA": "Hago que la música sea",
    "heroTitleHighlight": "visible",
    "heroTitleB": "y accesible para todos",
    "heroLead": "A través de los colores, la geometría y las emociones. Del niño curioso al músico experimentado, te acompaño personalmente.",
    "ctaShowroom": "Venir a probarlo en París",
    "ctaMethod": "Descubrir mi aplicación pedagógica",
    "universHeading": "El equipo, las clases y la aplicación",
    "universEyebrow": "Una sola visión, varios caminos",
    "universIntro": "Todo parte de una misma idea: que la música sea comprensible, fácil de memorizar y que todos puedan tocarla.",
    "univers": [
      {
        "sub": "Acústico y electrónico",
        "title": "Instrumentos y micrófonos",
        "text": "Un handpan acústico Yishama, un handpan electrónico Neotone, micrófonos: dos mundos que acompaño por igual.",
        "cta": "Ver ambos universos"
      },
      {
        "sub": "Video y presencial",
        "title": "Las clases",
        "text": "Aprende a tocar el handpan de otra manera: a través de los colores, las formas y las emociones. En cualquier parte del mundo, o en París.",
        "cta": "Ver las clases"
      },
      {
        "sub": "Acústico y Neotone",
        "title": "Handpan Constellation Studio",
        "text": "La aplicación que hace que la música sea visible tanto en tu handpan acústico como en el Neotone: colores, geometría y emociones.",
        "cta": "Descubrir la app"
      }
    ],
    "duoEyebrow": "El mundo del Y",
    "duoTitleA": "Acústico",
    "duoTitleAnd": "y",
    "duoTitleB": "electrónico",
    "duoIntro": "Nada de competir: se trata de completar. Dos universos que conviven. Toco los dos, y ninguno reemplaza al otro.",
    "duo": [
      {
        "sub": "Handpan acústico · Yishama",
        "title": "Metal que respira",
        "text": "Dos instrumentos de 18 notas afinados a 432 Hz, diseñados con Yonathan para poder cantar acompañándome. El sonido sale del metal: nada entre él y tú.",
        "points": [
          "El timbre y los armónicos del metal martillado",
          "Sin cables ni batería: suena en cualquier lugar, al instante",
          "Soy embajador y afiliado de Yishama"
        ],
        "cta": "Mi historia con Yishama",
        "alt": "David Lesage sosteniendo uno de sus handpans acústicos Yishama"
      },
      {
        "sub": "Handpan electrónico · Neotone",
        "title": "El teclado de las escalas",
        "text": "El handpan electrónico fabricado por Soundventure, del cual soy probador beta desde 2021. Todas las escalas en un solo instrumento, para usar con auriculares o en el escenario.",
        "points": [
          "Todas las escalas en un solo instrumento",
          "Volumen ajustable, toque con auriculares, grabadora integrada",
          "Soy embajador oficial de Neotone"
        ],
        "cta": "Descubrir el Neotone",
        "alt": "David Lesage con dos handpans electrónicos Neotone"
      }
    ],
    "duoBridgeEyebrow": "El vínculo",
    "duoBridgeTitle": "Mi aplicación habla los dos idiomas",
    "duoBridgeText": "Handpan Constellation Studio tiene un modo acústico y un modo electrónico. Cuando tu escala acústica ya no te basta, la función «🎯 Completar» te dice exactamente qué notas te faltan, y qué te aportaría un segundo handpan acústico o un Neotone. Después, tus dos handpans aparecen uno al lado del otro, y cada acorde se resuelve en el handpan que lo contiene. Completar, no competir.",
    "duoBridgeCta": "Descubrir Handpan Constellation Studio",
    "whyEyebrow": "¿Por qué yo?",
    "whyTitle": "La herramienta que me habría encantado que me enseñaran de niño",
    "whyP1": "Empecé a tocar la batería a los 4 años. Desde la primera clase me impusieron el solfeo, un lenguaje desconectado de mis ganas de tocar. Lo dejé todo para aprender de oído, como autodidacta.",
    "whyP2": "Del Conservatorio salí con un primer premio de batería, con mención sobresaliente… pero desanimado por una enseñanza de la armonía que no me decía nada. Así que creé la herramienta que me faltó: un enfoque visual de la música.",
    "whyCta": "Leer mi historia",
    "showroomBadge": "★ Estreno mundial",
    "showroomTitle": "El único lugar del mundo, fuera del taller de los fabricantes en Budapest, para probar tu Neotone y llevártelo",
    "showroomText": "En París (distrito 20), ven a probar los instrumentos, conoce a la comunidad y llévate tu handpan el mismo día, sin ningún plazo de fabricación y al mejor precio del mercado (−7 %).",
    "showroomArgs": [
      "7 % de descuento: el mejor precio (frente al 5 % en línea)",
      "Sin plazos de fabricación ni de espera",
      "Stock muy limitado: solo unos pocos instrumentos disponibles"
    ],
    "showroomCta1": "Reservar mi visita al showroom",
    "showroomCta2": "Ver el próximo encuentro",
    "showroomDatesTitle": "Próximos encuentros gratuitos",
    "showroomDatesNote": "Entrada gratuita · Se recomienda reservar",
    "showroomDatesEmpty": "Próximas fechas en preparación: escríbeme para enterarte antes que nadie.",
    "showroomDatesAll": "Ver el programa completo",
    "communityEyebrow": "La comunidad",
    "communityTitle": "Únete al movimiento de la música visible",
    "communityIntro": "Entérate de los próximos encuentros en París y del lanzamiento de Handpan Constellation Studio. Sin spam, solo lo esencial.",
    "communityPlaceholder": "tu@email.com",
    "communityButton": "Avísame de los próximos encuentros",
    "communityNote": "Se abre un formulario breve: dejas tu nombre y tu correo electrónico, y recibes enseguida las próximas fechas por correo.",
    "proofEyebrow": "Primero, el sonido",
    "proofTitle": "Ver y escuchar cómo viven los instrumentos",
    "proofIntro": "Toco, hago demostraciones, enseño: lo acústico y lo electrónico en video. Mis dos listas de reproducción completas, justo debajo.",
    "proofVideos": [
      "Actuación musical con el Neotone",
      "Shape of My Heart, en mis dos Yishama",
      "Crear tu escala: tutorial"
    ],
    "proofCta": "Ver toda la lista de reproducción de Neotone",
    "proofCtaYishama": "Ver toda la lista de reproducción de Yishama"
  },
  "neotone": {
    "title": "Neotone: handpan electrónico, precio y prueba en París | David Lesage",
    "description": "El Neotone, handpan electrónico con el acompañamiento de David Lesage: −5 % en línea, −7 % en el showroom, garantía de 6 años, calculadora de precios por país.",
    "heroEyebrow": "El equipo · Handpan digital",
    "heroTitle": "El Neotone, el mejor handpan electrónico del mundo",
    "heroLead": "Si compras a través de mí, embajador oficial de Neotone, obtienes <strong class=\"text-cream\">−5 % en línea</strong> (o <strong class=\"text-cream\">−7 % en el showroom</strong>), la <strong class=\"text-cream\">garantía de 6 años</strong> y un acompañamiento personal, desde la prueba hasta el desembalaje.",
    "ctaCalc": "Calcular mi precio",
    "ctaShowroom": "Reservar mi visita al showroom",
    "modelsEyebrow": "Los dos modelos",
    "modelsTitle": "Elige el instrumento que mejor se adapte a ti",
    "modelsIntro": "Todas las escalas. Un solo instrumento.",
    "fromPrice": "Desde",
    "woodsEyebrow": "Maderas de primera calidad",
    "woodsTitle": "Cinco maderas, cinco personalidades",
    "woodsIntro": "El fresno y el roble están incluidos en el precio base. Hay otras tres maderas nobles disponibles como opción, cada una con su propio tono y su carácter.",
    "woodCardCta": "Ver detalles",
    "woodModalEyebrow": "Tipo de madera",
    "woodModalViewTop": "Vista superior",
    "woodModalViewBottom": "Vista inferior",
    "techEyebrow": "Bajo el cuerpo",
    "techTitle": "Tecnología de precisión, ensamblada a mano",
    "techText": "Cada Neotone¹ se diseña y se ensambla artesanalmente en Budapest. Bajo la madera noble, sensores de precisión milimétrica detectan a la vez el golpe, la presión y la posición para reproducir fielmente la dinámica de un handpan acústico. Su electrónica de audio profesional (DAC de 24 bits / 384 kHz, latencia de 5 ms, relación señal/ruido de 112 dB) lo convierte en un instrumento digital sin concesiones.",
    "specsTitle": "Especificaciones técnicas oficiales",
    "stageEyebrow": "Escenario y estudio",
    "stageTitle": "El handpan digital de referencia",
    "stageIntro": "Un solo handpan, infinitas posibilidades: el Neotone supera los límites del acústico y abre un terreno de juego inédito.",
    "stage": [
      {
        "t": "Se acabaron los dolores de cabeza con el sonido",
        "d": "Sin retroalimentación ni problemas para oírte. Un solo cable jack, una prueba de sonido lista en segundos, y puedes hacer loops con lo que tocas y conectar tus pedales."
      },
      {
        "t": "Un estudio dentro del instrumento",
        "d": "Grabadora integrada: mantén presionado el ding para empezar a grabar. El sonido se capta en la fuente, con calidad de estudio, incluso en un entorno ruidoso."
      },
      {
        "t": "Tu burbuja, con auriculares",
        "d": "Conecta unos auriculares y toca sin molestar a nadie: de noche, en un apartamento, de gira. Una pureza de sonido excepcional."
      }
    ],
    "compEyebrow": "Acústico vs. Neotone",
    "compTitle": "El handpan acústico tiene sus límites:<br><span class=\"text-copper\">el Neotone los supera</span>",
    "compIntro": "Lo que cambia la electrónica, en concreto.",
    "compLegendAco": "Handpan acústico",
    "compLegendNeo": "Neotone electrónico",
    "calcEyebrow": "Calculadora de precios",
    "calcTitle": "¿Cuánto me costará realmente mi Neotone?",
    "calcIntro": "Elige tu modo de compra, tu modelo, tu madera y tu país: la calculadora aplica el descuento correcto y el IVA de 2026.",
    "offreBadge": "Regalo",
    "offreTitre": "Un año de la app de regalo con cada Neotone que compres a través de mí",
    "offreTexte": "El plan Studio de Handpan Constellation, 89 € de regalo, en línea o en el showroom. El año empieza la primera vez que te conectes, una vez registrada tu compra.",
    "offreListe": ["<b>El modo Lógica.</b> Cambias de tonalidad y tus acordes siguen bajo los mismos dedos.", "<b>Neotone Connexion.</b> Preparas tus escalas en la app y llegan a tu Neotone.", "<b>Los dúos.</b> Dos instrumentos juntos tocan acordes que ninguno de los dos toca por sí solo."],
    "offreCta": "Descubrir la app",
    "bandeauBadge": "Nuevo",
    "bandeauTexte": "Tu Neotone puede tocarlo todo. Ahora lo ves. Descubre la app",
    "calcDisclaimer": "Los precios públicos indicados ya incluyen el envío a todo el mundo. Tasas de IVA estándar de 2026. Fuera de la UE: no se aplica el IVA de la UE, pero pueden sumarse derechos de aduana locales en la entrega, a tu cargo.",
    "stockPillIn": "En stock en París",
    "stockPillSoon": "Llega pronto",
    "stockPillSoonDate": "Llega el {period}",
    "stockPillSoonMonth": "Llega en {period}",
    "stockPillOrder": "Por encargo",
    "stockOnlineAlsoIn": "Este también está en el showroom de París: puedes venir a probarlo y llevártelo (−7 %).",
    "stockOnlineSwitch": "Cambiar a compra en el showroom",
    "whyEyebrow": "Dos modelos",
    "whyTitle": "¿Por qué elegir un 10 notas o un 19 notas?",
    "whyP": ["El <strong>Neotone¹ (10 notas)</strong> es ideal para <strong>descubrir</strong> el handpan, <strong>meditar</strong> e <strong>improvisar</strong> dentro de una escala.", "El <strong>Neotone¹ Mutant (19 notas)</strong> está hecho para ser tu <strong>instrumento principal</strong>, o para <strong>acompañar la voz</strong> en canciones conocidas.", "Permite tocar todos los <abbr title=\"Al menos tres notas tocadas a la vez, por ejemplo do, mi, sol.\">acordes</abbr> (<abbr title=\"El lugar de un acorde dentro de una tonalidad, numerado del I al VII.\">grados</abbr>) de las <abbr title=\"La escala de referencia de un tema, por ejemplo do mayor o la menor.\">tonalidades</abbr> mayores y menores sobre una misma escala: I Equilibrio, II Impulso, III Aventura, IV Relajación, V Tensión, VI Nostalgia, VII Misterio."],
    "whyLinkIntro": "Para profundizar:",
    "whyLinkCapo": "El capo del handpan: la misma forma en todas las tonalidades",
    "whyCap10": "Neotone¹ (10 notas)",
    "whyCap19": "Neotone¹ Mutant (19 notas)",
    "whySchema": "Esquema simplificado, visto desde arriba: cada círculo es una nota.",
    "whyAlt10": "Esquema de un handpan visto desde arriba con 10 notas: el ding en el centro y 9 notas alrededor.",
    "whyAlt19": "Esquema de un handpan visto desde arriba con 19 notas: el ding en el centro, 9 notas grandes en corona y 9 notas pequeñas justo por dentro.",
    "procEyebrow": "Proceso de compra",
    "procTitle": "Desde tu primera pregunta hasta la recepción",
    "procIntro": "Un proceso sencillo y transparente, con acompañamiento de principio a fin. Dos maneras de llevarte tu Neotone:",
    "procHighlight": "Si vienes al showroom de París, te llevas tu instrumento el mismo día, sin ningún plazo de fabricación.",
    "procOnlineTitle": "En línea: envío a todo el mundo",
    "procShowroomTitle": "En persona: París 20",
    "procShowroomVideoEyebrow": "La visita en video",
    "procShowroomVideoTitle": "Así es el lugar donde vienes a probarlo",
    "procShowroomVideoText": "Antes de hacer el viaje, ya puedes ver adónde vas: te llevo a recorrer mi showroom, en París, con el Neotone en el centro.",
    "procShowroomVideoAudio": "También existe en inglés: si lo prefieres, elige la pista en inglés en la configuración (⚙) del reproductor, línea «Pista de audio».",
    "inclEyebrow": "Todo incluido en el precio",
    "inclTitle": "Lo que recibes",
    "extrasEyebrow": "Para comprar aparte",
    "extrasTitle": "Lo que tendrás que comprar aparte",
    "extrasIntro": "El Neotone viene completo, pero para escucharlo y sacarle todo el provecho, prevé este pequeño equipo según tu uso.",
    "extrasSpeakerCta": "Leer: cómo ubicarse bien en el sonido",
    "extrasHeadphonesCta": "Leer: qué auriculares elegir",
    "bridgeEyebrow": "Tu Neotone + el método visual",
    "bridgeTitle": "Aprende a través de los colores y las formas",
    "bridgeText": "Con Handpan Constellation Studio, aprenderás a través de colores y formas, tanto en tu Neotone como en un handpan acústico.",
    "bridgeCta": "Descubrir el método",
    "trustEyebrow": "Una señal de confianza",
    "trustTitle": "Conozco personalmente a las personas que fabrican tu Neotone",
    "trustP1": "Visité varias veces los talleres, en Hungría. Conozco personalmente a Csaba y Norbert, los dos amigos que dieron origen a Neotone, así como a todo el equipo: Gergely, Dániel y los artesanos de MAG Instruments, y Yonathan de Yishama.",
    "trustP2": "Soy probador beta oficial de la marca desde 2021. Desde el primer Neotone¹, reporté miles de errores, logré que se corrigieran y propuse innumerables mejoras. Si compras a través de mí, no tienes un simple revendedor: tienes a alguien que vive el instrumento desde dentro y lo hace evolucionar.",
    "trustYishamaLink": "Mi historia con Yonathan y mis dos handpans Yishama",
    "trustCaption1": "Sesión de pruebas y depuración con el equipo, en el taller.",
    "trustCaption2": "Con el equipo Neotone durante una de mis visitas a Hungría.",
    "faqEyebrow": "Preguntas frecuentes",
    "faqTitle": "Todas las respuestas antes de lanzarte",
    "faqOutro": "¿Tienes alguna otra pregunta? Escríbeme a",
    // chantier 44 : jamais traduit avant la relecture du 04/11/2026
    "stockTitle": "Lo que está disponible en este momento",
    "stockAvailTitle": "Disponible de inmediato",
    "stockSoonTitle": "Disponible pronto",
    "stockArrivalPrefix": "previsto el",
    "stockArrivalPeriod": "llegada prevista al showroom: {period}",
    "stockNote": "Estos instrumentos los tengo yo, en París: puedes venir a probarlos antes de decidirte. El stock cambia, y el pedido se hace después con Neotone.",
    "stockNoteLink": "Ver el showroom",
    "stockModelBadge": "En stock",
    "stockModelIn": "En stock: {woods}",
    "stockModelInLink": "para probar en el showroom (−7 %)",
    "stockModelOut": "Sin stock por ahora",
    "stockModelOutLink": "disponible para comprar en línea (−5 %, con envío)",
    "stockModelSoon": "Pronto en stock: {woods}",
    "stockModelSoonDate": "llegada prevista el {date}",
    "stockModelSoonPeriod": "llegada prevista: {period}",
  },
  "yishama": {
    "title": "Mis handpans Yishama: dos instrumentos para una sola voz | David Lesage",
    "description": "La historia de mi encuentro con Yonathan y Yishama: dos handpans acústicos de 18 notas afinados a 432 Hz, diseñados a medida para acompañar mi voz, y lo que terminaron por producir.",
    "heroEyebrow": "Mis instrumentos acústicos",
    "heroTitle": "Yishama: dos handpans nacidos de un encuentro",
    "heroLead": "Dos instrumentos de 18 notas, afinados a <strong class=\"text-cream\">432 Hz</strong>, diseñados junto con <strong class=\"text-cream\">Yonathan</strong> con un único propósito: que yo pudiera cantar acompañándome. Esta es su historia y lo que aprendí de ellos.",
    "heroCtaVideo": "Escuchar Shape of My Heart",
    "heroCtaStory": "Leer la historia",
    "heroImgAlt": "David Lesage sosteniendo uno de sus dos handpans Yishama, con las notas de la parte inferior a la vista",
    "metEyebrow": "Naxos, Grecia · 2022",
    "metTitle": "Un hombre con el que me crucé por casualidad, al día siguiente de un concierto",
    "metP1": "La noche anterior había dado un concierto de handpan y canto. Al día siguiente, me encontré con un hombre en el bar al aire libre del festival. No sabía quién era. Me dijeron que era uno de los mejores fabricantes de handpan del mundo.",
    "metP2": "Le cuento mi sueño, el que llevo dentro desde hace años: «un piano de handpan». Poder cantar, tocar versiones, acompañar mi voz, sin dar vueltas en círculo dentro de un solo modo.",
    "metP3": "Me escuchó largo rato, con calma. No intentó venderme sus instrumentos. Incluso me dijo que, con mi toque tan percusivo, no estaba seguro de que los suyos me convinieran.",
    "metP4": "Ese día, en esa pequeña isla, descubrí el mundo internacional del handpan: instrumentos con notas por encima y por debajo, graves profundos, una calidad que ni siquiera imaginaba.",
    "metQuote": "Cuando conocí a Yonathan, el CEO de Yishama, y a Andréa, su esposa, sentí enseguida la finura y la profundidad del ser que tenía frente a mí.",
    "metQuoteSource": "Lo que escribía en aquel entonces, en mi antiguo sitio web",
    "metPhotoAlt": "David Lesage con Yonathan y Andréa de Yishama",
    "metPhotoCaption": "Con Yonathan y Andréa: el comienzo de una larga historia.",
    "roomEyebrow": "Festival HUG, Hungría",
    "roomTitle": "Subió a mi habitación con un lápiz",
    "roomP1": "Unos meses después, en el festival HUG de Hungría, Yonathan subió a mi habitación con Andréa. Empezó a hacerme preguntas. Y a dibujar.",
    "roomP2": "No entendía gran cosa: no tengo ninguna formación en ingeniería. Solo sabía lo que quería <em>oír</em>. Él lo traducía en huecos, en grosores, en octavas. Solo una cosa técnica me importaba: el máximo de notas abombadas por debajo, como dings, porque suenan con mucha más facilidad que las notas en hueco.",
    "roomP3": "Para todo lo demás, deposité en él toda mi confianza. Fue entonces cuando decidió hacerme embajador de su marca. Pero antes de eso, se había interesado por mí, de verdad, sinceramente. Luego me recibió en su casa en Budapest antes de que yo volviera a tomar el avión.",
    "roomAside": "Unos meses antes ya me había enviado el enlace de su <em>Virtual Pantam</em>: «construye en la aplicación el instrumento de tus sueños y luego envíame el enlace de lo que dibujaste». Durante semanas nos intercambiamos esos enlaces en ambos sentidos.",
    "whyEyebrow": "La razón de ser",
    "whyTitle": "¿Por qué dos handpans, y por qué esos en concreto?",
    "whyIntro": "No se trata de dos instrumentos colocados uno al lado del otro. Es un sistema único en dos partes, diseñado para una voz.",
    "whyP1": "El handpan es un instrumento magnífico y obstinado. La escala es una elección, y por lo tanto, una renuncia. Nueve o diez notas, y siempre te faltará <strong>la</strong> que te permitiría tocar el acorde con el que sueñas.",
    "whyP2": "Para un cantante, es peor. Acompañar una voz exige <strong>bajos fundamentales</strong>: sin ellos, se tocan inversiones y la voz se queda sin suelo bajo los pies. Quería apoyar mi canto en la nota más grave de cada acorde y luego subir el arpegio: D3-F♯3-A3 sobre un D2, B♭2-D3-F3-B♭3.",
    "whyP3": "Mi petición cabía en una frase: dos instrumentos que, juntos, me dieran todos los sostenidos y todos los bemoles. Para cantar en cualquier tonalidad, con la fundamental de cada acorde en el grave.",
    "whyQuote": "Mi sueño es poder cantar y acompañarme fácilmente con el handpan en todas las tonalidades, con el mayor ámbito posible, sin verme limitado por la falta de notas.",
    "whyQuoteSource": "Carta de intención, 22 de noviembre de 2022",
    "why432Title": "¿Y por qué 432 Hz?",
    "why432Text": "Me apasiona el impacto de la vibración en el agua y en el cuerpo: la cimática. Por eso le pedí a Yonathan una afinación basada en el La a 432 Hz. Me respondió que era posible, pero que tenía que estar seguro <em>antes</em> de empezar a afinar: en un handpan, esa elección no tiene vuelta atrás.",
    "recEyebrow": "Mayo de 2023",
    "recTitle": "El día que llegaron",
    "recIntro": "No tengo ninguna imagen cuidada de ese momento. Tengo las que tomé con mi teléfono, en el orden en que sucedió: el camión, la caja, la funda, el instrumento, y luego la carta, y el día siguiente.",
    "recCaption1": "Mayo de 2023, al anochecer. El camión sigue frente a la casa y las dos cajas ya están allí. La foto está borrosa y oscura: la dejo así, es la cara que tenía.",
    "recCaption2": "Debajo del cartón y del relleno de poliestireno, una caja de contrachapado cerrada con tornillos. Sobre la tapa, un sobre sellado con cera roja. Por la rendija ya se adivina el ribete rojo de la funda.",
    "recCaption3": "La funda rígida apoyada sobre el parqué: camuflaje negro mate, espiral acolchada, ribete rojo en el canto y la insignia Yishama en el centro.",
    "recCaption4": "El cierre abierto, y el metal. El ding en el centro con sus anillos, las notas alrededor. El dibujo que Yonathan había empezado en mi habitación se había convertido en un objeto.",
    "recPapersLead": "Los papeles también estaban en la caja.",
    "recCaption5": "El mismo sobre que en la foto de la caja, esta vez abierto; el sello de cera está junto al certificado.",
    "recCaption6": "El certificado del E 18, firmado a mano por Yhonatan Ale-Yahav: la escala, el acero, las dieciocho notas, las dimensiones, el peso, el número de identificación. Yishama lo llama «E Major 18»; en esta página, E 18 es mi etiqueta de trabajo.",
    "recCaption7": "En el reverso del certificado: el logotipo Yishama, impreso en el mismo papel texturizado.",
    "recNextDayLead": "Y al día siguiente era mi cumpleaños.",
    "recCaption8": "Los dos handpans instalados sobre sus soportes, la tableta encima, el marco del piano vertical abierto detrás. Veinticuatro horas después del camión.",
    "recZoomHint": "Haz clic en una foto para abrirla a tamaño completo y luego navega entre las ocho con ‹ ›. El certificado solo se puede leer ampliado.",
    "recAlt1": "Una foto borrosa tomada al atardecer: David Lesage en primerísimo plano, con la boca y los ojos muy abiertos. Detrás de él, dos grandes cajas de envío apiladas; la de abajo lleva el logotipo y la palabra YISHAMA en letras grandes, con sus etiquetas de transporte. Al fondo, tras la puerta de vidrio, el camión de reparto blanco sigue estacionado frente a la casa.",
    "recAlt2": "Vista desde arriba de la caja de cartón abierta: el relleno de poliestireno blanco y, dentro, una caja de contrachapado claro cerrada con tornillos visibles en las esquinas. Sobre la tapa, dentro de una bolsita protectora de plástico, un sobre kraft cerrado con un sello de cera roja. Por la rendija bajo la tapa se ve la funda negra con su ribete rojo.",
    "recAlt3": "La funda rígida del handpan vista desde arriba, apoyada sobre un parqué claro: tela de camuflaje negro mate, ancha espiral acolchada en relieve, placa rectangular con la palabra YISHAMA en el centro, ribete rojo en el canto y cierre alrededor de todo el contorno.",
    "recAlt4": "La funda abierta: dentro, el handpan, cuyo metal refleja una luz cálida, dorada y broncínea. En el centro, el ding y sus anillos concéntricos; alrededor, las zonas de notas, en hueco y en domo.",
    "recAlt5": "Sobre una superficie de trabajo de madera: el sobre de papel kraft, ahora abierto, con su sello de cera roja que lleva un monograma, colocado junto al certificado de autenticidad impreso en papel texturizado.",
    "recAlt6": "El certificado de autenticidad Yishama a página completa. Se lee: Certificate of Authenticity, Owner David Lesage, Year 2023, Scale E Major 18, Steel Type Stainless Steel, Notes (A B C♯ D♯) E / (F♯) G♯ B C♯ D♯ E F♯ G♯ A B C♯ D♯ E, Dimensions 53 × 53 × 28 cm, Weight 4,4 kg, la mención «designed and produced at YISHAMA Workshop, Isfiya / Israel», la firma manuscrita de Yhonatan Ale-Yahav y el número de identificación 483.",
    "recAlt7": "El reverso del certificado: el logotipo de Yishama (una voluta dorada) sobre la palabra YISHAMA en mayúsculas, en papel texturizado, con la dirección WWW.YISHAMA.COM al pie de la página.",
    "recAlt8": "David Lesage sonriendo, con la cabeza inclinada, a plena luz del día. Delante de él, sus dos handpans Yishama de metal gris antracita apoyados sobre sus soportes; detrás, una tableta fijada a un brazo articulado, el marco de un piano vertical abierto que deja ver las cuerdas y la mecánica, un cuadro que representa una Flor de la Vida anaranjada, pads electrónicos y una pedalera.",
    "insEyebrow": "Los dos instrumentos",
    "insTitle": "Dieciocho notas cada uno, recibidos en mayo de 2023",
    "insIntro": "Llegaron en cajas de madera seguras, con sus estuches de transporte, casi el día de mi cumpleaños.",
    "insDing": "Ding",
    "insTop": "Arriba",
    "insBottom": "Abajo",
    "insNotes": "notas",
    "insTuning": "Afinados a 432 Hz",
    "insCredit": "Made by Yishama, diseño de <strong>Yhonatan Ale-Yahav</strong>. Estas dos escalas no figuran en ningún catálogo: se hicieron a medida.",
    "insCreditBrief": "El pliego de condiciones es mío, y es el de un cantante: poder acompañarme con el handpan como lo haría un guitarrista o un pianista. Es decir, poder tocar todos los acordes, en todas las tonalidades, con la fundamental de cada acorde como nota de bajo, y un ding. No sabía cómo podía ser posible. Fue el ingenio de Yonathan lo que lo hizo posible.",
    "insFootnote": "Son piezas únicas: sus nombres son mis etiquetas de trabajo, no modelos del catálogo Yishama. Cada instrumento, por sí solo, da los siete grados de su escala con la fundamental disponible en el grave.",
    "insAppAlt": "Captura de Handpan Constellation Studio, pestaña Lógica: mis dos handpans Yishama dibujados uno al lado del otro, con todas sus notas en círculos de colores. A la izquierda, el E 18 (ding E3); a la derecha, el D Kurd 18 (ding D3), notas de abajo incluidas. La barra superior indica 6 acordes con el E 18, 6 con el D Kurd 18 y 24 con los dos juntos. Debajo, los siete grados de la unión: I Equilibrio E, II Impulso F♯m, III Aventura G♯m, IV Distensión A, V Tensión B, VI Nostalgia C♯m, VII Misterio D♯°.",
    "insAppCaption": "Mis dos escalas reunidas en mi aplicación: seis acordes con una, seis con la otra, y veinticuatro cuando suenan juntas. Esa cifra es la que dice que Yonathan no me fabricó dos instrumentos, sino un sistema.",
    "insAppZoomHint": "Pantalla densa: abre la captura y vuelve a hacer clic en ella para ver el tamaño real; ahí es donde se leen los nombres de las notas.",
    "lightbox": {
      "close": "Cerrar",
      "prev": "Foto anterior",
      "next": "Siguiente foto",
      "zoom": "Ampliar la foto"
    },
    "pairEyebrow": "Juntos",
    "pairTitle": "Un handpan cromático, en dos piezas",
    "pairIntro": "Por separado, cada uno cubre su escala. Juntos, sus 36 notas cubren los doce semitonos, sin excepción.",
    "pairP1": "Los 24 acordes mayores y menores pasan a poder tocarse, y <strong>cada uno tiene su fundamental en el grave</strong>. Es decir, exactamente lo que había pedido: no verme obligado nunca más a tocar una inversión por falta de bajo.",
    "pairP2": "Yonathan construyó, sin que nadie lo llamara nunca así, un handpan cromático en dos piezas. De hecho, los pensó como un sistema: quitó una nota del primero porque yo ya la tenía en el segundo, para dejar lugar a otra.",
    "pairHonest": "Un matiz honesto: esto describe la <em>disponibilidad de las notas</em>, todavía no la fluidez del gesto. Pasar de un handpan al otro a mitad de un acorde sigue siendo una gimnasia. Fue justamente ese problema el que terminó dando origen a mi aplicación.",
    "pairFactLabels": {
      "notes": "notas en total",
      "keys": "tonalidades",
      "chords": "acordes mayores y menores",
      "tuning": "diapasón"
    },
    "pairPhotoAlt": "David Lesage tocando sus dos handpans Yishama uno al lado del otro",
    "pairPhotoCaption": "Los dos instrumentos uno al lado del otro: imagen de la versión de Shape of My Heart.",
    "metalEyebrow": "El metal",
    "metalTitle": "Tres aceros, tres voces",
    "metalIntro": "En Yishama, el metal no es un detalle de acabado: es la primera elección, la que decide el timbre, el sustain y el mantenimiento. Hay tres familias; haz clic para ver el detalle.",
    "metalCardCta": "Ver detalles",
    "metalPhotoCredit": "© Yishama",
    "metalPhotoAlts": {
      "nitrure": "Handpan Yishama A Minor 17 visto desde arriba sobre fondo negro: superficie gris azulada moteada con reflejos bronce, el ding en el centro y una quincena de zonas de notas alrededor.",
      "inox": "Handpan Yishama G2 Hijaz 18 visto desde arriba sobre fondo negro: superficie satinada de color bronce parduzco, el ding en el centro y una docena de zonas de notas visibles.",
      "ember": "Handpan Yishama F2 Astronaut visto desde arriba sobre fondo negro: superficie dorada brillante, el ding en el centro y una docena de zonas de notas visibles."
    },
    "metalOption": "En el sitio de Yishama, el acero se elige al hacer el pedido, como una opción del instrumento. En los modelos de arriba, el selector ofrece acero inoxidable o Ember Steel; el nitrurado no aparece.",
    "metalModalEyebrow": "Acero de fabricación",
    "metalModalClose": "Cerrar",
    "metalLabelSound": "El sonido",
    "metalLabelCare": "El mantenimiento",
    "metalLabelBest": "Ideal para",
    "metalSource": "Fuente: artículo «Nitrided handpan vs stainless handpan» publicado por Yishama, y su catálogo en línea (consultado el 9 de septiembre de 2026). El precio de un Yishama varía según la escala, el número de notas, las notas de abajo y el tipo de material.",
    "metalNote": "Desde 2021, cada Yishama lleva un grabado láser en el interior: número de serie, nombre de la escala y tipo de material con su grosor.",
    "makerEyebrow": "El fabricante",
    "makerTitle": "Quién es Yishama",
    "makerIntro": "Una casa israelí, también presente en Hungría, que está entre los mejores fabricantes de handpans del mundo.",
    "makerP1": "«Yishama» viene del hebreo (יִשָּׁמַע) y significa <em>ser escuchado</em>. Su intención, tal como la formulan: crear una escultura sonora que ofrezca a cada persona una experiencia única de exploración de sí misma, a través del sonido, el ritmo y la armonía. Su lema cabe en una línea: «At Yishama, we strive for quality and passion.»",
    "makerP2": "Yonathan y su equipo fabrican instrumentos con graves muy profundos y agudos brillantes. Cuando escuché a Kabeção, Nadishana, David Kuckhermann, Alexandre Lora o Flavio Salvaje tocar estos instrumentos, entendí que era con ellos con quienes quería trabajar.",
    "makerFactsTitle": "Lo que ellos mismos dicen",
    "makerFacts": [
      {
        "t": "Cada instrumento está firmado",
        "d": "Desde 2021, un grabado láser en el interior indica el número de serie, el nombre de la escala y el material con su grosor."
      },
      {
        "t": "El formato",
        "d": "Unos 55 cm de diámetro en el borde exterior, 28 cm de altura desde la base hasta lo alto del ding, y 4,4 kg en la mayoría de los modelos."
      },
      {
        "t": "La primera reafinación es gratis",
        "d": "Con una técnica de toque correcta, un Yishama se mantiene afinado durante años. La primera reafinación es gratuita: solo corren por tu cuenta los gastos de envío."
      },
      {
        "t": "Cada pieza es única",
        "d": "No anuncian plazos de antemano: la fabricación es artesanal y a medida. A veces tienen algunos instrumentos disponibles de inmediato."
      }
    ],
    "makerCta": "Descubrir los handpans Yishama",
    "makerDisclosure": "Transparencia: soy embajador y afiliado de Yishama. Si pasas por mi enlace, recibo una comisión; tu precio no cambia en nada. Solo represento a fabricantes cuyo trabajo me gusta de verdad.",
    "videosEyebrow": "En música",
    "videosTitle": "Lo que grabé con ellos",
    "videosIntro": "Una versión de Sting, una oración, una canción popular húngara, rap francés. Todo está tocado con los dos Yishama, a 432 Hz.",
    "videosFeaturedLabel": "El video que conmovió a Yonathan",
    "videosFeaturedTitle": "Shape of My Heart, de Sting",
    "videosFeaturedText": "Cuando se lo envié, me respondió: «wow wow wow very very beautiful! […] your voice is incredible, touch my heart very much! I would love to share this with our Yishama audience.»",
    "videosPlaylistCta": "Ver toda la lista de reproducción de Yishama",
    "videosWatch": "Ver",
    "bridgeEyebrow": "Lo que dieron estos dos handpans",
    "bridgeTitle": "El método, nadie podía dármelo: no existía",
    "bridgeP1": "Estaba feliz y completamente perdido. Dos instrumentos magníficos, muy complejos, que llegaron sin instrucciones. Era como si me hubieran confiado dos naves espaciales, solo que el manual de pilotaje no estaba escrito en ninguna parte, para nadie.",
    "bridgeP1b": "El handpan es un instrumento <strong>del siglo XXI</strong>, todavía en plena evolución: no tiene detrás ni los siglos de pedagogía del piano ni los de la guitarra. Y ni siquiera puede tener <em>un</em> método: hay tantos handpans como escalas, distribuciones de notas y números de notas. Lo que vale para un instrumento ya no vale para el de al lado. No es un olvido de nadie: es la juventud de un instrumento vivo.",
    "bridgeP1c": "A eso se suma lo que hace su magia: el handpan suele ser un instrumento <strong>modal</strong>. Es una fuerza, y una puerta de entrada maravillosa: sobre todo cuando nunca hiciste música, obtienes un resultado bello casi enseguida, sin teoría. Pero también uno se queda dando vueltas en círculo muy rápido. Y en cuanto eres músico profesional, esperas lo cromático o quieres cantar canciones de verdad encima (mi caso), se vuelve muy complejo, muy rápido. Yo venía de la batería, un instrumento puramente rítmico: no tenía ninguna base de armonía en la que apoyarme.",
    "bridgeP2": "En agosto de 2023 empecé un documento para ver, por fin, cómo componer mis acordes en mis dos handpans. Tarjetas de colores, una nota por color. <strong>Ese documento se convirtió en Handpan Constellation Studio.</strong>",
    "bridgeDocAlt": "Página de un documento hecho a mano en agosto de 2023, titulado «Complete handpan Maping of placment of notes on the handpans by type of note» / «Mapa completo de la ubicación de las notas en los handpans por tipo de nota» (ortografía original). A la izquierda, el cuerpo del E 18 sobre fondo ocre, su ding E3 en el centro y todas sus notas alrededor en círculos de color; a la derecha, el cuerpo del D Kurd 18 sobre fondo crema, su ding D3 en el centro y sus notas dispuestas de la misma manera, incluidas las de abajo. En la parte inferior, una cuadrícula cromática de cuatro octavas, de C2 a B5: las casillas de las notas que realmente tenía están coloreadas, las demás quedan pálidas. Cada nombre de nota tiene su color, el mismo en todas las octavas: do en rojo, re en naranja, mi en amarillo, fa en verde, sol en cian, la en azul, si en magenta. A la derecha, una pequeña tabla «Reminder / Recordatorio» da la equivalencia C = Do, D = Re, E = Mi…",
    "bridgeDocCaption": "Agosto de 2023, la página 4 de las 21 de este documento: mis dos handpans dibujados a mano con todas sus notas, y debajo las cuatro octavas donde coloreaba las que realmente tenía. Un color por nota, sea cual sea la octava: ya es la regla de ChromaKeys en la aplicación, tres años antes de que existiera. Nunca lo terminé: me detuve a mitad de camino porque era demasiado complejo de abarcar para mí; mi nivel de teoría musical era demasiado bajo para entenderlo y modelarlo todo bien.",
    "bridgeDocZoomHint": "Imagen densa: ábrela y vuelve a hacer clic en ella para verla a tamaño real; ahí se leen los nombres de las notas y la cuadrícula.",
    "bridgeP3": "Lo más desconcertante es que la pregunta inicial vino de él. Ya en agosto de 2022, Yonathan me escribía sobre el instrumento «cromático, cantautor»: «intenta tocar temas en la aplicación con esta escala, para que entendamos qué notas te faltan, y encontremos la manera de agregarlas». Tres años después, la aplicación responde a esa pregunta, para todos.",
    "bridgeAppTitle": "Lo que la aplicación hace hoy para un handpan acústico",
    "bridgeAppIntro": "Todo lo que sigue es gratuito y no requiere instrumentos electrónicos.",
    "bridgeApp": [
      {
        "t": "Tu escala, en color",
        "d": "Eliges tu instrumento: la aplicación dibuja el cuerpo de tu handpan con tus notas reales, cada una con su color. La pantalla se convierte en el espejo de tu instrumento."
      },
      {
        "t": "El diapasón 440 / 432 Hz",
        "d": "Un ajuste afina la aplicación con tu handpan, para que lo que oyes en la pantalla suene afinado con lo que tienes en las manos."
      },
      {
        "t": "🎯 Completar tu escala",
        "d": "La aplicación compara tus notas reales con lo que piden los acordes y te dice exactamente cuáles te faltan; luego, qué segundo handpan te las daría y cuántos temas desbloquearía."
      },
      {
        "t": "Tus 2 handpans, uno al lado del otro",
        "d": "En cuanto hay un segundo handpan, los dos cuerpos se muestran uno al lado del otro y cada acorde se traza sobre el handpan que lo tiene, con el orden de toque y las manos. Justo mi problema de gimnasia, resuelto en pantalla."
      }
    ],
    "bridgeSignature": "Mis dos escalas a medida están en la aplicación, con la etiqueta «✨ Signature David Lesage». La etiqueta lleva mi nombre: las especificaciones son mías, pero las escalas son <strong>Made by Yishama, diseñadas por Yhonatan Ale-Yahav</strong>. Puedes cargarlas, escucharlas y ver lo que permiten, incluso sin tenerlas en las manos.",
    "bridgeHonest": "Para ser honesto: la aplicación no te escucha. No adivina tu escala por el micrófono; la eliges tú, o construyes el cuerpo de tu handpan nota por nota. A partir de ahí, razona sobre tus notas reales.",
    "bridgeCta": "Descubrir Handpan Constellation Studio",
    "bridgeCtaBlog": "Leer: usar la aplicación con tu handpan acústico",
    "endEyebrow": "Y ahora",
    "endTitle": "Convertir el handpan en un verdadero instrumento de acompañamiento",
    "endText": "Mi sueño sigue intacto: elevar el handpan al nivel de la guitarra o el piano para acompañar la voz. Estos dos instrumentos me demostraron que era posible, y me obligaron a inventar el método que faltaba. Es el camino que sigo recorriendo, sin contraponer lo acústico a lo electrónico.",
    "endCtaShowroom": "Venir a escucharlos al showroom",
    "endCtaYishama": "Descubrir Yishama"
  },
  "shop": {
    "title": "Tienda de handpans: Neotone, micrófonos y accesorios",
    "description": "Una selección de instrumentos y accesorios excepcionales, probados y elegidos por David Lesage: handpans digitales Neotone y micrófonos Hisong.",
    "eyebrow": "Tienda",
    "title2": "Embajador de instrumentos y micrófonos excepcionales",
    "intro": "La calidad y el refinamiento me importan muchísimo.",
    "ambassadorText": "Colaboro con fabricantes de instrumentos y micrófonos excepcionales, y me enorgullece mostrar y representar su calidad. A través de mí, puedes acceder a cupones de descuento, además de demostraciones y pruebas en mis encuentros en París (distrito 20).",
    "keyNotice": "Pago en línea desactivado: escribe PUBLIC_SNIPCART_KEY en .env para activar el carrito.",
    "from": "desde ",
    "soon": "Pronto",
    "soonLong": "Disponible pronto",
    "addCart": "Agregar al carrito",
    "orderEmail": "Pedir por correo",
    "creationsBadge": "Signature David Lesage",
    "calcOrder": "Calcular mi precio y pedir",
    "linkTags": {
      "helloasso": "En HelloAsso",
      "streaming": "Streaming",
      "hisong": "−5% Hisong",
      "yishama": "Embajador Yishama",
      "nowgroove": "Now Groove",
      "ondemand": "A solicitud",
      "maisongoni": "La Maison du Ngoni",
      "tambour": "Código David-Tambour",
      "spotify": "En Spotify",
      "limited": "Edición limitada",
      "app": "Aplicación",
      "muling": "−5 % a través de mí",
      "onesec": "Lo uso de verdad",
      "oko": "−10 % con mi código",
      "structured": "Lo uso de verdad",
      "atlas": "Socio Atlas",
      "atlasCode": "−10 % con mi código",
      "coeurdeson": "−10 % con mi código",
      "forbrain": "−10 % con mi código"
    },
    "linkCtas": {
      "buy": "Ver la oferta →",
      "listen": "Escuchar →",
      "discover": "Descubrir →",
      "order": "Pedir →",
      "interested": "Este micrófono me interesa →"
    },
    "copyCode": "Copiar el código",
    "codeCopied": "¡Copiado!",
    "photoBy": "Foto:",
    "priceNotes": {
      "hisong": "<strong>Los precios, sin vueltas</strong> (envío a Francia, IVA incluido: no se suma ningún IVA al pagar):<br>• micrófono <strong>AirStudio S1</strong> (Standard Pack): <strong>270,95 €</strong><br>• con el <strong>RX Plus</strong> (Universal Pack, +90 €): <strong>360,95 €</strong><br><br><strong>Con mi código DAVID-LESAGE-SAVE-5 (−5 %)</strong>, el S1 + RX Plus queda en <strong>342,91 €</strong>, <strong>envío gratis</strong>.<br><br><strong>Mi código:</strong> si pasas por mi enlace, debería aplicarse solo. Si no lo ves al momento de pagar, escríbelo a mano: el botón justo debajo lo copia."
    },
    "watchDemo": "Ver mi demo en video",
    "adviceTitle": "¿Necesitas un consejo antes de comprar?",
    "adviceText": "Respondo personalmente. Cuéntame tu proyecto y te ayudo a elegir el instrumento adecuado.",
    "adviceCta": "Pedir consejo",
    "categories": {
      "handpans": {
        "label": "Handpan",
        "blurb": "Dos universos que se complementan."
      },
      "app": {
        "label": "Aplicación",
        "blurb": "Handpan Constellation Studio: la aplicación educativa que hace visible la música."
      },
      "creations": {
        "label": "Mis creaciones · Now Groove",
        "blurb": "Creadas por mí: mi método de ritmo Now Groove, la calabaza Signature y su funda hecha a mano."
      },
      "instruments": {
        "label": "Instrumentos excepcionales",
        "blurb": "Colaboro con fabricantes excepcionales cuya calidad represento con orgullo. A través de mí, aprovecha cupones de descuento y demostraciones en mis encuentros."
      },
      "micros": {
        "label": "Micrófonos",
        "blurb": "Captación de sonido para handpan acústico, voz y gong."
      },
      "accessoires": {
        "label": "Accesorios",
        "blurb": "Lo que sostiene el instrumento y lo que lo transporta. Probado en el showroom antes de llegar aquí."
      },
      "musique": {
        "label": "Música",
        "blurb": "Mis álbumes y mis versiones, para escuchar en streaming en todas las plataformas."
      },
      "formations": {
        "label": "Clases y talleres",
        "blurb": "Aprende conmigo a través de clases particulares y talleres, presenciales o a distancia."
      },
      "outils": {
        "label": "Mis herramientas de uso diario",
        "blurb": "Más allá de la música: las herramientas que realmente uso para mantenerme concentrado, presente y creativo."
      }
    },
    "subcategories": {
      "acoustique": {
        "label": "Acústico",
        "blurb": "El metal, la mano, la respiración de la sala.",
        "more": "Todo lo que necesitas saber sobre los handpans Yishama →"
      },
      "electronique": {
        "label": "Electrónico",
        "blurb": "Todas las escalas, los auriculares, el escenario.",
        "more": "Todo lo que necesitas saber sobre Neotone →"
      }
    },
    "subNavLabel": "Dos universos:",
    "handpanNote": "La única diferencia real: el <strong>Neotone</strong> (fabricado por Soundventure) se pide con mi calculadora, con un código de descuento personal y una garantía de 6 años. Con <strong>Yishama</strong>, soy embajador y afiliado: el pedido se hace en su sitio y mi enlace te acompaña. Dos formas de comprar, una sola exigencia de calidad.",
    "handpanBridge": "El vínculo entre ambos: Handpan Constellation Studio →",
    "products": {
      "handpan-studio": {
        "name": "Handpan Constellation Studio · la aplicación",
        "description": "Mi aplicación educativa, tanto para handpan acústico como para Neotone: colores, geometría y emociones hacen visible la música. Gratis para siempre, Esencial a 3,49 € IVA incl./mes y Studio a 9,99 € IVA incl./mes, con 1 mes de prueba gratis."
      },
      "neotone-one": {
        "name": "Neotone¹",
        "description": "Handpan digital de 10 notas, todas las escalas, calidad de estudio. Compra acompañada: código de descuento personal + garantía de 6 años."
      },
      "neotone-mutant": {
        "name": "Neotone¹ Mutant",
        "description": "Handpan digital de 19 notas con pantalla LCD, la máxima expresividad. Compra acompañada: código de descuento + garantía de 6 años."
      },
      "yishama": {
        "name": "Handpan Yishama excepcional",
        "description": "Uno de los mejores fabricantes de handpan del mundo (Israel/Hungría). Fabricación artesanal, instrumentos de hasta 19 notas con graves profundos y agudos brillantes. Lo represento con orgullo como embajador."
      },
      "gonilele": {
        "name": "Arpa Gonilélé · La Maison du Ngoni",
        "description": "Arpa-laúd de viaje creada por Joris Feuillâtre. Soy embajador de La Maison du Ngoni. 10 cuerdas (440 €) o 12 cuerdas con micrófono integrado (520 €). Fotos, videos, unboxing y pedido en su página."
      },
      "calebasse": {
        "name": "Kit de calabaza Signature David Lesage",
        "description": "Kit completo: calabaza (percusión africana) de 45-50 cm (poco común en Europa), acabada a mano por Kamou (Djoliba Percussion) y grabada con láser con el logotipo de Now Groove, con tapete y maracas. Una batería orgánica con un sonido natural."
      },
      "housse": {
        "name": "Funda de calabaza Now Groove de David Lesage",
        "description": "Funda mochila de alta gama ideada y diseñada por David Lesage: función de tapete integrada, correas desmontables, bolsillo de almacenamiento (shakers de huevo, accesorios y método), interior de terciopelo. ✋ Rara y única: hecha a mano, en pequeña serie."
      },
      "coeur-de-son": {
        "name": "Tambor de lona · Cœur de Son",
        "description": "El tambor de Florel Viardot, del taller Cœur de Son en Thaon-les-Vosges: una <strong>lona impermeable</strong>, sin materia animal, tensada sobre un cuerpo de madera y <strong>afinada con aire</strong>. Una cámara de aire, inflada con una bomba, regula la tensión, desde graves profundos hasta medios; la humedad no la destensa, así que se puede tocar al aire libre. Cada tambor es una pieza única con su propio nombre, y Sandrine puede pintar el motivo a mano, con presupuesto previo. Unas 3 semanas de fabricación. Cinco tamaños, de 40 cm (260 €) a 65 cm (380 €); también existe con soporte (65 cm, 520 €).<br><br>Yo mismo toco uno, «Géode de feu», y puedes probarlo en el showroom (solo demostración: el pedido se hace con Florel). Si prefieres el cuero, el tambor de piel de L’Âme du Tambour está justo al lado: dos materiales, dos sonidos. <strong>−10 % con mi código</strong>, al pagar."
      },
      "tambour": {
        "name": "Tambor chamánico · L’Âme du Tambour",
        "description": "Tambor de marco artesanal de Julien (L’Âme du Tambour), un artesano coherente, apasionado e íntegro. Disfruta de un 5 % de descuento con el código David-Tambour."
      },
      "micro-hisong": {
        "name": "Micrófono Hisong AirStudio S1",
        "description": "El primer estudio móvil todo en uno: micrófono de doble modo, monitoreo inalámbrico, interfaz de audio, receptor inalámbrico para el teléfono (RX Mini), soporte magnético y estuche. Ideal para la voz, el handpan acústico y el gonilélé: un auténtico estudio portátil.<br><br><strong>Precios (IVA incluido, envío a Francia):</strong> el S1 solo <strong>270,95 €</strong>; con el <strong>RX Plus</strong> (+90 €) <strong>360,95 €</strong>, es decir <strong>342,91 €</strong> con mi código −5 % y envío gratis.<br><br><strong>Mi consejo:</strong> si quieres usar el micrófono para <strong>tocar en vivo</strong>, necesitas el <strong>RX Plus</strong> (Universal Pack): es el que envía el sonido al equipo de sonido, a la mesa de mezclas o a una cámara.<br><br>Demostraciones y compra directa en mis encuentros en París."
      },
      "micro-muling": {
        "name": "Micrófono Muling MP1 + preamplificador HMP-2",
        "description": "El MP1 es un micrófono de contacto de condensador diseñado para el handpan acústico. Incluye el preamplificador HMP-2, que admite hasta dos micrófonos MP1, para una captación estéreo nítida y precisa, sin acople. Ideal para el escenario y la grabación."
      },
      "atlas": {
        "name": "Soportes de handpan Atlas: Pro y All",
        "description": "Los trípodes magnéticos del fabricante italiano Atlas. El handpan se apoya sobre un disco flotante con ocho imanes protegidos, sin tornillos ni correas. Dos modelos: el <strong>Atlas Pro</strong>, de aluminio, telescópico, de 1,8 kg, con bolsa de transporte incluida (250 €); y el <strong>Atlas All</strong>, de madera, cuya cabeza se sujeta entre las piernas para tocar sentado, antes de recibir patas y extensiones para tocar de pie (270 €). Soy socio de la marca: los dos están en el showroom, para probarlos ahí mismo."
      },
      "phoenix-opus1": {
        "name": "L’Alliance du Phoenix · Opus I",
        "description": "Mi álbum original, mi primer lanzamiento: un viaje a través del handpan, la voz y texturas orgánicas. Escúchalo en Spotify y en todas las plataformas."
      },
      "phoenix-opus2": {
        "name": "L’Alliance du Phoenix · Opus II",
        "description": "La segunda entrega: la continuación del viaje musical. Escúchala en Spotify y en todas las plataformas."
      },
      "cover": {
        "name": "Versiones · David Lesage",
        "description": "Mis versiones reinventadas con handpan y voz (Shape of My Heart, Imagine, Ave Maria…). Escúchalas en Spotify."
      },
      "now-groove": {
        "name": "Now Groove: método de ritmo",
        "description": "Mi curso para aprender el ritmo de otra manera, con emojis visuales. Accesible para todos, del principiante al músico avanzado."
      },
      "cours-prives": {
        "name": "Clases particulares y talleres",
        "description": "Clases particulares y talleres conmigo: handpan, ritmo y voz. Presenciales en París o a distancia."
      },
      "streaming": {
        "name": "Mi música en streaming",
        "description": "Encuentra mis composiciones originales y versiones en Spotify, Apple Music, Deezer y todas las plataformas."
      },
      "onesec": {
        "name": "one sec: recuperar el control de tu tiempo de pantalla",
        "description": "La app que de verdad me ayuda a no perderme en el scroll. Antes de abrir una app atrapante (redes sociales…), one sec impone una breve pausa, el tiempo de una respiración, y las ganas compulsivas se calman. Es simple, y para mí es una de las pocas cosas que realmente funcionaron. Un enfoque validado por la ciencia (estudios con el Instituto Max Planck). Gratis en lo esencial; aprovecha un 30 % de descuento en Premium con mi enlace."
      },
      "oko": {
        "name": "Botella de agua con filtro ÖKO",
        "description": "La botella que llevo conmigo a todas partes, siempre, como músico que viaja: el agua es lo más importante que hay. Filtración instantánea, sin esperar y sin electricidad, probada en un laboratorio independiente acreditado por el COFRAC frente a más de 200 contaminantes. Me alegra representar un producto ideal para todos los viajeros. Aprovecha un −10 % con mi código."
      },
      "forbrain": {
        "name": "Auriculares Forbrain · entrenar la voz",
        "description": "Unos auriculares de <strong>conducción ósea</strong> con micrófono, para oír tu voz en vivo: canto, voz + handpan. Hablas o cantas, y tu voz te vuelve al instante a través de los huesos, delante de las orejas, tras pasar por un <strong>filtro dinámico</strong> que refuerza los agudos y suaviza los graves. Te oyes de otra manera, con más nitidez. Los probé: la experiencia es asombrosa. No son un micrófono de escenario, son una herramienta de entrenamiento: unos minutos al día leyendo en voz alta o cantando, para trabajar la voz, la dicción, la afinación y la atención. Autónomos, sin pantalla ni aplicación. No espero de ellos nada médico: los recomiendo para el trabajo de la voz. Con mi enlace, el <strong>−10 %</strong> se aplica solo; si no, escribe mi código en el carrito."
      },
      "structured": {
        "name": "Structured: planificación diaria",
        "description": "La app que uso para organizar mi día a día como músico-emprendedor, entre conciertos, talleres y desarrollo de proyectos. Una línea de tiempo visual y clara en lugar de una lista de tareas interminable. Todavía no tengo un programa de afiliados con ellos; simplemente la comparto porque la uso de verdad."
      }
    }
  },
  "booking": {
    "defaultTitle": "Reservar tu visita",
    "defaultIntro": "Déjame tus datos de contacto y te responderé personalmente para concretar los detalles.",
    "first": "Nombre",
    "last": "Apellidos",
    "email": "Correo electrónico",
    "phone": "Teléfono (opcional)",
    "people": "¿Cuántas personas vienen?",
    "message": "Tu mensaje (opcional)",
    "messagePlaceholder": "Lo que te interesa, tu disponibilidad, tu nivel…",
    "submit": "Enviar mi solicitud",
    "sending": "Enviando…",
    "error": "No se pudo enviar tu solicitud. Vuelve a intentarlo o escríbeme directamente a contact@lesagedavid.fr.",
    "privacy": "Solo uso tus datos de contacto para responderte y mantenerte al tanto. Nada de spam.",
    "successTitle": "Se envió ✨",
    "successText": "Recibirás un correo electrónico de confirmación. Te responderé personalmente muy pronto.",
    "successClose": "Cerrar",
    "close": "Cerrar",
    "visitTitle": "Reservar mi horario en el showroom (de pago)",
    "visitIntro": "París (distrito 20), solo con cita previa. Es un horario individual de pago, con una sola tarifa, sea cual sea el motivo de tu visita. Dime cuándo puedes y te propongo un horario.",
    "privateTitle": "Reservar una cita individual",
    "privateIntro": "Un momento cara a cara, en el showroom de París (distrito 20) o por videollamada: descubrir un instrumento, dar los primeros pasos con el que acabas de comprar o avanzar en tu práctica, sea cual sea tu nivel.",
    "newsTitle": "Recibir aviso de los próximos encuentros",
    "newsIntro": "Déjame tu correo electrónico: te avisaré en cuanto se anuncien las fechas de los próximos encuentros gratuitos en París. Sin spam; puedes darte de baja cuando quieras.",
    "contactTitle": "Escríbeme",
    "contactIntro": "Cuéntame qué te trae por aquí; leo y respondo personalmente a todos los mensajes.",
    "goniTitle": "Pedir un arpa Gonilélé",
    "goniIntro": "Dime qué versión te interesa y qué opciones quieres: te respondo personalmente con el resumen y las condiciones.",
    "goniPrefill": "Versión (10 cuerdas / 12 cuerdas + pastilla):\nFunda (+40 €) / Afinador (+10 €):\nRetiro en París o envío (+25 €):",
    "collabPrefill": "Mi proyecto en pocas líneas:",
    "vipTitle": "Una cita solo para ti",
    "vipScope": "Tú decides qué hacemos: descubrir y probar cualquier instrumento de la tienda (Neotone, handpans acústicos, Gonilélé, calabaza…), probar un micrófono para handpan (Hisong, set Muling) o simplemente tener un acompañamiento cara a cara, ya sea que estés empezando desde cero, que todavía busques lo que va contigo o que quieras profundizar en un punto concreto. Ya sea 1h o 1h30, solo dime qué te trae: lo preparo todo para ti.",
    "vipPriceLabel": "Precio",
    "vipPriceNote": "Primeros pasos o demostración. Para una clase: {lessonGrid} (paquete de 4 clases en 2 meses posible).",
    "vipPolicyShort": "Cancelación con menos de 24 h de anticipación: el pago no se reembolsa (este horario estaba reservado para ti), pero puedes pasar la cita a otra fecha dentro de los 3 meses siguientes.",
    "sessionType": "¿Qué tipo de cita quieres?",
    "sessionTypeChoose": "Elegir…",
    "sessionTypeNames": {
      "onboarding": "Primeros pasos con mi instrumento",
      "demo": "Demostración privada y pruebas de instrumentos",
      "lesson": "Tomar una clase con David"
    },
    "discountTitle": "Obtener mi código de descuento Neotone",
    "discountIntro": "Un código a tu nombre que pido para ti a Neotone: −5 % en línea, −7 % si vienes a probarlo al showroom. Respuesta personal en un plazo de 24 a 48 h.",
    "discountModel": "¿Qué modelo te interesa?",
    "discountModelChoose": "Elegir…",
    "discountModelNames": {
      "one": "Neotone¹ (10 notas)",
      "mutant": "Neotone¹ Mutant (19 notas)",
      "undecided": "Todavía no lo sé, ayúdame a elegir"
    },
    "discountCountry": "País de entrega",
    "discountCountryPlaceholder": "Francia, Bélgica, Suiza…",
    "discountNote": "Esta información solo me sirve para preparar tu solicitud a Neotone.",
    "phonePlain": "Teléfono",
    "phoneWhyShowcase": "Obligatorio para un encuentro: es una fecha fija y, si surge un imprevisto de último momento de una parte o de la otra, tengo que poder contactarte enseguida.",
    "socialLabel": "Tu cuenta de redes sociales",
    "socialHint": "De preferencia Instagram; si no, Facebook, YouTube o tu sitio personal.",
    "socialPlaceholder": "@tucuenta o un enlace",
    "discountNextTitle": "¿Qué sucede después?",
    "discountNext1": "Leo tu mensaje personalmente; respondo a todo el mundo.",
    "discountNext2": "En un plazo de 24 horas tras mi lectura, <strong>Neotone se pondrá en contacto contigo directamente</strong> y te enviará tu código de descuento.",
    "discountNext3": "Neotone se encarga entonces de todo el proceso: pedido, pago y entrega. Sigo disponible si me necesitas.",
    "purchase": {
      "showroomTitle": "Comprar un Neotone en el showroom (−7 %)",
      "showroomIntro": "Te llevas tu instrumento en el showroom (París 20). Reviso tu solicitud y se la transmito a Neotone, que te envía la factura y un enlace de pago con tarjeta, de lunes a viernes.",
      "showroomButton": "Comprar en el showroom (−7 %)",
      "showroomHowTitle": "Cómo es la compra en el showroom",
      "showroomHow": [
        "Completas este formulario.",
        "Reviso tu solicitud y se la transmito a Neotone (Soundventure, en Budapest). Vas en copia.",
        "Neotone te envía la factura y un enlace de pago con tarjeta, de lunes a viernes de 9 h a 17 h (hora de París, la misma que en Budapest), en un plazo de 24 h (días hábiles).",
        "Pagas y el instrumento es tuyo: te lo llevas en el showroom (París 20).",
        "Si pagas antes de venir, envíame el comprobante de pago o de transferencia a <a href=\"mailto:contact@lesagedavid.fr\">contact@lesagedavid.fr</a>: te entrego tu Neotone al presentar este comprobante."
      ],
      "showroomWeekend": "<strong>¿Vienes al showroom un fin de semana?</strong> Completa este formulario antes del viernes: el enlace de pago estará listo, podrás pagar allí mismo y llevarte tu instrumento.",
      "onlineTitle": "Compra en línea: solicitud de código de descuento (−5 %)",
      "onlineIntro": "Un código de descuento personal que solicito para ti a Neotone: −5 % en tu pedido en línea, entregado en tu casa.",
      "onlineButton": "Compra en línea: obtener mi código (−5 %)",
      "onlineHowTitle": "Cómo recibes tu código de descuento",
      "onlineHow": [
        "Leo tu solicitud personalmente; respondo a todo el mundo.",
        "Solicito para ti un código de descuento personal a Neotone: <strong>Neotone se pone en contacto contigo directamente</strong> y te lo envía.",
        "Después, Neotone se encarga de todo el proceso: pedido, pago y entrega. Sigo disponible si me necesitas."
      ],
      "priceVatNotCharged": "IVA {country} {rate} no facturado",
      "priceHtNote": "Sin IVA: el IVA ({rate}) no se factura (inversión del sujeto pasivo), siempre que el número de IVA sea válido.",
      "priceHtNeedVat": "Indica tu número de IVA intracomunitario en los datos de facturación más abajo.",
      "priceOnlineNote": "El pago se realiza en la tienda de Neotone, con tu código de descuento."
    },
    "discoveryLabel": "¿Cómo me conociste como embajador de Neotone?",
    "discoveryChoose": "Elegir…",
    "discoveryNames": {
      "youtube": "YouTube",
      "instagram": "Instagram",
      "facebook": "Facebook",
      "showcase": "Un encuentro o un evento",
      "word-of-mouth": "Boca a boca",
      "search": "Una búsqueda en internet",
      "neotone-site": "El sitio de Neotone",
      "other": "Otro"
    },
    "curiousTitle": "Dos preguntas, solo por curiosidad",
    "curiousHint": "No hay obligación de responder; simplemente es para conocernos mejor.",
    "playingSinceLabel": "¿Cuánto tiempo llevas con el handpan?",
    "playingSinceChoose": "Elegir…",
    "playingSinceNames": {
      "none": "Todavía no lo toco",
      "under-1": "Menos de un año",
      "1-3": "Entre 1 y 3 años",
      "over-3": "Más de 3 años"
    },
    "dreamLabel": "Lo que sueñas con tocar",
    "dreamPlaceholder": "Un tema, un ambiente, un proyecto…",
    "freeMessageLabel": "Tu mensaje",
    "freeMessageHint": "Escribe todo lo que quieras; lo leo todo.",
    "sessionTypeRecommended": "★ recomendado para empezar",
    "sessionTypeHint": "¿Acabas de recibir tu instrumento (Neotone, handpan acústico, micrófono) y te sientes un poco perdido? Es una clase: elige «Tomar una clase con David», empezamos juntos, lo configuramos todo y tomamos el control, sin compromiso a largo plazo.",
    "durationLabel": "¿Cuánto tiempo quieres que dure?",
    "durationHint": "Para unos primeros pasos, la duración recomendada es de 1h30: te doy todas las claves para ser autónomo.",
    "slotsTitle": "Tu disponibilidad",
    "slotsHint": "Propónme hasta 3 horarios que te convengan; te confirmo el que elijo.",
    "slotLabel": "Horario {n}",
    "slotDate": "Fecha",
    "slotTime": "Hora",
    "slotsRequired": "Indícame al menos un horario (fecha y hora) que te convenga.",
    "termsTitle": "¿Cómo funciona?",
    "terms1": "Me propones tus horarios. Te respondo personalmente para confirmar el que elijo.",
    "terms2": "Te envío el enlace de pago en mi respuesta: el pago reserva tu horario y nos compromete a los dos.",
    "terms3": "¿Tienes un imprevisto? Hasta 24 h antes, cambiamos tu cita sin ningún problema: me escribes y listo.",
    "terms4": "Con menos de 24 h de anticipación, el pago no se reembolsa: había bloqueado este horario solo para ti y ya no puedo ofrecérselo a nadie más. Pero no pierdes tu cita: la pasamos a otra fecha, dentro de los 3 meses. Todos tenemos imprevistos, es parte de la vida: es simplemente el valor del compromiso que asumimos el uno con el otro.",
    "instrumentsLabel": "¿Qué instrumentos te gustaría descubrir?",
    "instrumentsHint": "Marca lo que te interesa; los preparo para tu visita.",
    "instrumentNames": {
      "neotone": "Neotone (handpan electrónico)",
      "calebasse": "Calabaza",
      "gonilele": "Gonilélé (arpa africana)",
      "mic-hisong": "Micro Hisong",
      "mic-muling": "Micro Muling"
    },
    "formatLabel": "¿En persona o por videoconferencia?",
    "formatInPerson": "En persona: showroom París 20",
    "formatRemote": "Por videollamada",
    "showcaseTitle": "Reservar mi plaza en el encuentro",
    "showcaseIntro": "Encuentro público gratuito en el showroom de París (distrito 20). Se recomienda reservar: las plazas son limitadas.",
    "showcaseInterestsLabel": "¿Para qué instrumento(s) vienes?",
    "showcaseInterestsHint": "Marca todo lo que te interesa; los preparo para la sesión. ¿Algún detalle que precisar? Dímelo en tu mensaje, más abajo.",
    "showcaseInterestNames": {
      "all": "Todos",
      "handpan": "Handpan",
      "mic": "Micrófono (Muling y/o Hisong)",
      "calebasse": "Calabaza",
      "gonilele": "Gonilélé (arpa africana)",
      "meet": "Conocerte"
    },
    // chantier 44 : jamais traduit avant la relecture du 04/11/2026
    "calcRecapLabel": "Tu elección",
    "calcRecapEdit": "Modificar",
    "billing": {
      "title": "Facturación",
      "intro": "Neotone emite la factura: necesita estos datos, y solo sirven para eso.",
      "kindLabel": "Compras…",
      "kindPrivate": "Como particular",
      "kindCompany": "A nombre de una empresa",
      "name": "Nombre de facturación",
      "namePlaceholder": "El nombre que debe aparecer en la factura",
      "address": "Dirección",
      "addressPlaceholder": "Calle y número",
      "postalCode": "Código postal",
      "city": "Ciudad",
      "country": "País de facturación",
      "countryChoose": "Elegir…",
      "company": "Razón social",
      "companyPlaceholder": "El nombre legal de la empresa",
      "vat": "N.º de IVA intracomunitario",
      "vatPlaceholder": "FR12345678901",
      "siret": "SIRET",
      "siretPlaceholder": "123 456 789 00010",
      "vatSiretHint": "Opcionales: con un n.º de IVA válido, Neotone puede facturarte sin IVA (recuperas el IVA en tu país); el SIRET identifica a la empresa en la factura francesa.",
      "shippingTitle": "Entrega",
      "shippingSame": "Entregar en la dirección de facturación",
      "shippingName": "Nombre del destinatario",
      "shippingAddress": "Dirección de entrega",
      "shippingPostalCode": "Código postal",
      "shippingCity": "Ciudad",
      "shippingCountry": "País de entrega",
      "orderRef": "Referencia de tu solicitud: {ref}",
      "unavailable": "En este momento no hay ningún ejemplar disponible para esta opción. Tu solicitud quedó registrada: te respondo personalmente con los plazos reales.",
    },
  },
  "muling": {
    "title": "Micro Muling para handpan acústico | David Lesage",
    "description": "El micrófono Muling para handpan acústico, probado por David Lesage: captación clara y precisa, sin acople. Video de la prueba completa y fotos.",
    "back": "← Volver a la tienda",
    "eyebrow": "Micrófono para handpan acústico",
    "heroTitle": "El micrófono Muling",
    "heroLead": "Un micrófono diseñado específicamente para el handpan acústico: una captación clara, precisa y fiel, sin acople, tanto en el escenario como en el estudio. Lo probé a fondo y aquí tienes mi opinión completa.",
    "ctaInterested": "Este micrófono me interesa",
    "ctaVideo": "Ver mi reseña completa",
    "videoTitle": "Mi reseña completa en video",
    "videoIntro": "Te presento el micrófono en detalle: instalación, sonido obtenido, comparaciones y casos de uso.",
    "photosTitle": "El micrófono en imágenes",
    "photosIntro": "Mis fotos personales del micrófono y su instalación en el instrumento.",
    "whyTitle": "Por qué lo recomiendo",
    "whyText": "Amplificar un handpan acústico es todo un reto: los micrófonos de uso general captan mal los armónicos, y el acople acecha en cuanto subes el volumen. El Muling está pensado para este instrumento en concreto: capta el sonido en su origen, conserva la riqueza de los armónicos y te deja subir el nivel sin acople. Eso fue lo que me convenció para representarlo.",
    "whyPoints": [
      {
        "t": "Diseñado para el handpan",
        "d": "Un micrófono de contacto pensado para el cuerpo y los armónicos del handpan, no un micrófono de uso general adaptado."
      },
      {
        "t": "Sin acople",
        "d": "La captación se hace en contacto con el instrumento: subes el volumen en el escenario sin miedo al acople."
      },
      {
        "t": "Escenario y estudio",
        "d": "Lo bastante fiel para grabar, y lo bastante robusto y práctico para tocar en vivo."
      }
    ],
    "priceTitle": "Precio y pedidos",
    "priceLabel": "Precio del fabricante",
    "priceNote": "No se añade ningún gasto de envío al precio. Posibles tasas aduaneras: por confirmar.",
    "priceDiscountLabel": "Comprando a través de mí",
    "priceDiscountNote": "Código {code}: {pct} % de descuento sobre el precio del fabricante, reservado a los pedidos hechos con este formulario.",
    "orderTitle": "Pedir mi micrófono",
    "orderText": "El fabricante todavía no ofrece pago en línea para Francia: te pongo en contacto directamente. Completa el formulario y recibirás al instante los datos para pagarle a Muling, que después se encarga de todo hasta que recibas tu micrófono.",
    "ctaContact": "Pedir mi micrófono",
    "mulingOrderTitle": "Pedir el micrófono Muling",
    "mulingOrderIntro": "Código {code} aplicado: {pct} % de descuento sobre el precio del fabricante. Aquí tienes los datos de pago; después, Muling se encarga directamente contigo del resto.",
    "mulingOrderPriceLine": "Precio del fabricante {base} € − {pct} % = {final} €",
    "mulingQuantity": "¿Cuántos micrófonos?",
    "mulingDeliveryNote": "Información especial para el repartidor",
    "mulingDeliveryNoteHint": "Código de acceso al edificio, piso, instrucciones de entrega… (opcional)",
    "mulingDeliveryNotePlaceholder": "Ej.: código de la puerta 1234B, 3.er piso sin ascensor…",
    "mulingCountry": "País de entrega",
    "mulingAddress": "Dirección",
    "mulingCity": "Ciudad",
    "mulingPostalCode": "Código postal",
    "mulingConsent": "Acepto que mis datos se transmitan a Muling Musical Instruments Co., Ltd. (China) y a Résonances Productions para gestionar mi pedido.",
    "mulingConsentRequired": "Para procesar el pedido es necesario transmitir tus datos a Muling: marca la casilla para continuar.",
    "mulingBankTitle": "Para pagar tu pedido",
    "mulingBankIntro": "Transfiere el importe exacto a Muling, incluyendo tu número de referencia en la descripción. El pago se realiza en euros, únicamente mediante transferencia SEPA.",
    "mulingBankBeneficiary": "Beneficiario",
    "mulingBankIban": "IBAN",
    "mulingBankBic": "BIC",
    "mulingBankBank": "Banco",
    "mulingBankRef": "Descripción de la transferencia",
    "mulingBankAmountLabel": "Cantidad a transferir",
    "mulingBankAdvantagePrefix": "Tu ventaja: ",
    "mulingCopyLine": "Copiar",
    "mulingCopiedLine": "¡Copiado!",
    "mulingDownloadPdf": "⬇️ Descargar esta información en PDF",
    "mulingBankSepaOnly": "⚠️ Esta cuenta solo acepta transferencias SEPA en euros; no se aceptan transferencias SWIFT ni internacionales.",
    "mulingBankNotified": "Tu pedido se validará y se enviará a Muling ({email}) en cuanto subas tu comprobante de transferencia; después, ellos se encargan del envío y el seguimiento.",
    "mulingBankNext": "Una vez completada la transferencia, guarda el comprobante de pago (captura de pantalla o PDF) y súbelo aquí. Muling se pondrá en contacto contigo para confirmar la recepción y proporcionarte la información de seguimiento.",
    "mulingProofLabel": "Sube tu comprobante de transferencia",
    "mulingProofHint": "Captura de pantalla o PDF de tu transferencia (máximo 3 MB).",
    "mulingProofButton": "Hice la transferencia",
    "mulingProofSending": "Enviando…",
    "mulingProofError": "No se pudo subir el archivo: vuelve a intentarlo o escríbeme directamente a contact@lesagedavid.fr.",
    "mulingProofMissing": "Sube un comprobante de transferencia (imagen o PDF) antes de continuar.",
    "mulingProofInvalidType": "Formato no aceptado: sube una imagen (JPG, PNG) o un PDF.",
    "mulingProofTooLarge": "El archivo pesa más de 3 MB: redúcelo y vuelve a intentarlo.",
    "mulingResumeIntro": "Vuelves para avisar de la transferencia de tu pedido {ref}. Confirma el correo electrónico que usaste al hacer el pedido y luego sube tu comprobante de transferencia.",
    "mulingResumeEmailLabel": "Correo electrónico usado en el pedido",
    "mulingResumeEmailHint": "Es lo que identifica tu pedido: no se muestra ningún dato personal en esta página hasta que se verifique.",
    "mulingResumeEmailMissing": "Indica la dirección de correo electrónico utilizada al realizar el pedido.",
    "mulingResumeAmountNote": "El importe exacto de tu pedido figura en tu correo electrónico de confirmación ({unit} € por micrófono).",
    "mulingResumeMismatch": "Esta dirección de correo no corresponde a este pedido. Usa exactamente la que indicaste al hacer el pedido, o escríbeme a contact@lesagedavid.fr.",
    "mulingThankYouTitle": "Gracias, anotado ✨",
    "mulingThankYouText": "Recibí tu comprobante de transferencia y se lo envié a Muling con toda la información de tu pedido. Vas a recibir un correo de confirmación en esta dirección: guárdalo como comprobante. Muling se pondrá en contacto contigo directamente para el envío y el seguimiento.",
    "mulingOrderSending": "Enviando…",
    "mulingOrderSubmit": "Enviar mi pedido",
    "mulingOrderError": "No se pudo enviar: vuelve a intentarlo o escríbeme directamente a contact@lesagedavid.fr.",
    "specsTitle": "La cápsula MP-1 en detalle",
    "specsIntro": "Características técnicas de la cápsula de contacto MP-1, observadas en pruebas reales.",
    "specs": [
      {
        "t": "Micrófono de condensador de superficie",
        "d": "No es un micrófono de ambiente: la cápsula capta las vibraciones en contacto directo con el cuerpo del handpan. Por eso da un sonido fiel incluso en un lugar ruidoso."
      },
      {
        "t": "Fijación magnética",
        "d": "La cápsula se acopla y desacopla magnéticamente: instalación inmediata, sujeción perfectamente segura al instrumento."
      },
      {
        "t": "Diminuto",
        "d": "Del tamaño de la yema de un dedo: pasa totalmente desapercibida, tanto a la vista como al tocar."
      },
      {
        "t": "Carcasa de ABS y piezas metálicas",
        "d": "Un cuerpo de ABS reforzado con piezas metálicas: ligero sobre el instrumento y, a la vez, robusto para el transporte."
      },
      {
        "t": "Impedancia de salida: 600 Ω",
        "d": "Una impedancia estándar, perfectamente adaptada al preamplificador HMP-2 y a las entradas de línea convencionales."
      },
      {
        "t": "Aislamiento muy alto",
        "d": "La captación se hace por contacto: los ruidos externos y los otros instrumentos casi no pasan, algo muy valioso en una jam y en el escenario."
      }
    ],
    "specsCaution": "⚠️ Importante antes de comprar: las cápsulas están diseñadas exclusivamente para funcionar con el preamplificador Muling. No son compatibles con equipos de otras marcas; se trata de un sistema completo, no de una cápsula para integrar en una configuración existente.",
    "specsSource": "Especificaciones técnicas proporcionadas por el fabricante, contrastadas con mi propia experiencia de uso.",
    "boxTitle": "Qué incluye el kit",
    "boxIntro": "El kit HMP-2 está completo: dos cápsulas y el preamplificador, listo para tocar en uno o dos handpans.",
    "boxItems": [
      "2 cápsulas de contacto magnéticas (micrófonos activos)",
      "1 preamplificador de dos canales HMP-2",
      "2 cables jack de 6,35 mm chapados en oro",
      "1 maletín rígido de transporte",
      "2 bolsas de tela para almacenamiento",
      "1 destornillador para abrir el preamplificador (acceso a la pila)",
      "4 discos adhesivos de fijación",
      "Sujetacables (wire clips)",
      "El manual del fabricante"
    ],
    "boxNote": "Un kit alcanza para dos handpans: una cápsula por instrumento, las dos mezcladas en el preamplificador. En un solo handpan, puedes colocar las dos cápsulas para una captación más equilibrada.",
    "preampTitle": "El preamplificador HMP-2 en detalle",
    "preampIntro": "El corazón del sistema: un preamplificador de dos canales diseñado específicamente para el handpan, con corrección de timbre integrada.",
    "preampFeatures": [
      {
        "t": "Dos canales independientes",
        "d": "CH1 y CH2 tienen cada uno su propio volumen: equilibras con precisión tus dos cápsulas (o tus dos handpans) antes de la salida."
      },
      {
        "t": "Control SHAPE",
        "d": "El mando grande esculpe el sonido: en 0 conservas el timbre original; al girarlo en sentido horario acentúas los graves y los agudos y reduces los medios, perfecto para destacar en una mezcla cargada."
      },
      {
        "t": "Salida de mezcla con jack de 6,35 mm",
        "d": "Un solo cable va a tu altavoz, tu mesa de mezclas o tu interfaz de audio."
      },
      {
        "t": "Interruptor CH2",
        "d": "El canal 2 admite una cápsula activa (interruptor en posición ON) o un sensor pasivo tipo H1 (interruptor en posición OFF). El canal 1 está reservado para cápsulas activas."
      },
      {
        "t": "Luz indicadora",
        "d": "Un LED permite comprobar de un vistazo que el preamplificador está encendido."
      },
      {
        "t": "Chasis metálico",
        "d": "Una unidad compacta y robusta, del tamaño de un pedal de efectos, capaz de soportar tanto el escenario como la carretera."
      },
      {
        "t": "Unas 20 h de autonomía",
        "d": "Con una simple pila de 9 V, tienes unas veinte horas para tocar: suficiente para encadenar varios conciertos sin pensar en ello."
      },
      {
        "t": "Impedancias: entrada de 1 MΩ, salida de 600 Ω",
        "d": "Una entrada de alta impedancia que conserva toda la riqueza de la señal de la cápsula y una salida estándar que se conecta en cualquier lugar: altavoz, mezclador o interfaz de audio."
      }
    ],
    "preampWarnTitle": "Dos precauciones importantes",
    "preampWarns": [
      "Nunca conectes un sensor pasivo al canal 1: este canal entrega alimentación de forma permanente y eso dañaría el equipo.",
      "En el canal 2, corta la alimentación (interruptor en OFF) si conectas un sensor pasivo H1."
    ],
    "preampDiagramTitle": "Todos los controles explicados",
    "preampDiagramAlt": "Esquema anotado del preamplificador HMP-2: entradas, volúmenes, control SHAPE, fuente de alimentación y salida.",
    "dangerTitle": "Léelo antes de la primera conexión",
    "dangers": [
      "<strong>Nunca</strong> conectes un sensor pasivo a la entrada CH1.",
      "Para usar un sensor pasivo tipo H1, el canal CH2 debe estar obligatoriamente en <strong>OFF</strong>.",
      "El adaptador de corriente debe tener <strong>polaridad negativa en el centro</strong>. Invertir la polaridad destruye el aparato de forma irreversible."
    ],
    "makerEyebrow": "El fabricante",
    "makerTitle": "Muling Musical Instruments",
    "makerIntro": "<strong>Muling Musical Instruments Co., Ltd.</strong> (惠州市沐铃乐器有限公司) es un fabricante chino de micrófonos para instrumentos acústicos, con sede en Huizhou, en la provincia de Guangdong. La empresa fue fundada en 2016 por <strong>Mò Cè</strong> (莫测), quien firma el diseño de sus productos.",
    "makerBlocks": [
      {
        "t": "Mò Cè (莫测), el diseñador",
        "d": "Guitarrista desde los años 80 y profesor de guitarra en los 90, Mò Cè se pasó al diseño de micrófonos en 1999. Primero trabajó como diseñador para un fabricante coreano, luego para LSM, antes de fundar su propia marca. El fabricante se atribuye tres primicias: el primer micrófono con pantalla integrada, el primero en combinar piezo y micrófono, y la serie OPUS, de la que afirma haber producido más de 80 000 unidades al año entre 2001 y 2010."
      },
      {
        "t": "El logotipo",
        "d": "El logotipo de Muling se basa en tres símbolos del pensamiento clásico chino: el <strong>yin y el yang</strong>, el <strong>cielo redondo y la tierra cuadrada</strong> (天圆地方) y los <strong>cinco elementos</strong> (五行). Una manera de decir que el instrumento, el captador y el músico forman un todo."
      },
      {
        "t": "La gama",
        "d": "Muling desarrolla tres familias de productos para instrumentos de cuerda, a las que se suman una gama dedicada al handpan (que incluye el set HMP-2 presentado en esta página) y micrófonos signature hechos a medida."
      }
    ],
    "makerLinksTitle": "Seguir a Muling",
    "makerZhNote": "sitio en chino",
    "powerTitle": "La alimentación: pila o corriente",
    "powerIntro": "El preamplificador funciona de dos maneras: tú eliges según el contexto.",
    "powerBattery": {
      "t": "Con pila de 9 V: autonomía total",
      "d": "Dentro de la caja cabe una pila de 9 V (tipo 6F22). Basta con abrir el fondo con el destornillador incluido. Es la solución nómada por excelencia: sin cable de alimentación, tocas donde quieras. Personalmente uso una pila recargable, más económica y más ecológica. Recuerda sacarla si no vas a usar el preamplificador durante mucho tiempo."
    },
    "powerMains": {
      "t": "Con corriente: para sesiones largas",
      "d": "El preamplificador también acepta un adaptador de corriente de 9 V y 300 mA, con conector CC de 5,5 × 2,1 mm y polaridad negativa en el centro. Ideal en estudio, en ensayo o para un concierto largo en el que no quieres depender de una pila."
    },
    "powerWarning": "⚠️ Importante: el adaptador de corriente no viene incluido en el set. Hay que comprarlo por separado; revisa bien las especificaciones (9 V, 300 mA como mínimo, polaridad negativa en el centro) para no dañar el preamplificador.",
    "manualTitle": "El manual del fabricante",
    "manualIntro": "Las dos páginas del manual incluido, con las posiciones recomendadas para colocar las cápsulas y las especificaciones técnicas.",
    "relatedTitle": "¿Y si tocas un handpan electrónico?",
    "relatedText": "El Neotone no necesita micrófono: se conecta directamente por jack. Si dudas entre acústico y electrónico, mi comparativa te ayudará a elegir.",
    "relatedCta": "Descubrir el Neotone"
  },
  "gonilele": {
    "title": "Arpa Gonilélé: La Maison du Ngoni | David Lesage",
    "description": "El arpa Gonilélé (NGoni lélé), arpa-laúd de viaje de La Maison du Ngoni, presentada por David Lesage, embajador. Fotos, videos, unboxing, precios y pedidos.",
    "back": "← Volver a la tienda",
    "eyebrow": "Embajador · La Maison du Ngoni",
    "heroTitle": "El arpa Gonilélé",
    "heroLead": "Un arpa-laúd de viaje de alma cautivadora, hecha a mano por Joris Feuillâtre. Estoy orgulloso de ser su embajador: descubre el instrumento, escúchalo y llévate el tuyo.",
    "ctaOrder": "Pedir mi Gonilélé",
    "ctaVideos": "Ver los videos",
    "ctaLesson": "Tomar una clase",
    "whatTitle": "¿Qué es el Gonilélé?",
    "whatText": "El Gonilélé (o NGoni lélé) es un arpa-laúd de África Occidental que Joris Feuillâtre, de La Maison du Ngoni, reinventó en versión de viaje. Caja de calabaza, mástil de madera noble, cuerdas afinadas en escala pentatónica: encarna la unión de lo masculino y lo femenino, conectada con lo divino. Un instrumento intuitivo, meditativo y profundo, accesible tanto para principiantes como para músicos experimentados.",
    "ambassadorTitle": "Embajador de La Maison du Ngoni",
    "ambassadorText": "Colaboro con Joris Feuillâtre desde 2023. El Gonilélé me ha acompañado en los momentos fuertes de mi vida: por eso hoy represento, con toda naturalidad, a La Maison du Ngoni y comparto este instrumento con quienes me rodean.",
    "photosTitle": "El instrumento en imágenes",
    "unboxingTitle": "Descubrimiento y desempaquetado",
    "unboxingText": "Te presento el Gonilélé en detalle, del desempaquetado a los primeros pasos con él.",
    "videosTitle": "El Gonilélé, tocado y presentado",
    "videosIntro": "Una selección de videos en los que toco y presento el instrumento: haz clic para abrirlos en YouTube.",
    "videoTitles": {
      "extrait": "Fragmento: el Gonilélé presentado",
      "uneAme": "«Un alma»: aprender el Gonilélé",
      "rappelle": "«Recuérdame la belleza»: en el Gonilélé",
      "kothbiro": "«Kothbiro»: en el Gonilélé (432 Hz)",
      "sonoriser": "Sonorizar tu Gonilélé fácilmente",
      "amplifier": "Amplificar tu Gonilélé"
    },
    "tuningTitle": "Tabla de afinación incluida",
    "tuningText": "Cada instrumento incluye una tabla de afinación (escala pentatónica, diapasón a 432 Hz) que te ayuda a afinar fácilmente tus 10 o 12 cuerdas. El archivo completo solo se entrega a quienes compran el instrumento.",
    "pricesTitle": "Precios",
    "priceRows": {
      "cordes10": "10 cuerdas: sin pastilla",
      "cordes12": "12 cuerdas: pastilla integrada",
      "housse": "Funda (obligatoria para envío)",
      "accordeur": "Afinador",
      "envoi": "Envío (Francia)"
    },
    "priceOption": "opcional",
    "orderTitle": "Pedido y retiro",
    "orderText": "Para hacer un pedido, escríbeme o llámame. Retiro en persona en París (distrito 20) o envío dentro de Francia (25 €, funda obligatoria para el envío).",
    "contactPhone": "Teléfono",
    "contactEmail": "Correo electrónico",
    "contactPickup": "Retiro",
    "contactShipping": "Envíos disponibles: Francia · 25 €",
    "paymentTitle": "Pago",
    "paymentText": "El pago se hace en la cuenta de la asociación Résonances Productions.",
    "paymentIban": "IBAN",
    "paymentBic": "BIC",
    "coursesTitle": "¿Quieres aprender conmigo?",
    "coursesText": "Doy clases particulares de Gonilélé (y más) por videollamada o en persona en París, a precio libre con un mínimo: desde {lesson60} €/h o desde {lesson90} €/1h30 (paquete de 4 clases en 2 meses: desde {packLesson60} €/h o {packLesson90} €/1h30).",
    "coursesCta": "Reservar una clase"
  },
  "atlas": {
    "title": "Soportes Atlas Handpan: Atlas Pro y Atlas All | David Lesage",
    "description": "Trípodes magnéticos Atlas para handpans, fabricados en Italia: Atlas Pro en aluminio (250 €) y Atlas All en madera (270 €), −10 % con el código DAVID-ATLAS. Características, fotos y prueba en París con David Lesage, socio de la marca.",
    "back": "← Volver a la tienda",
    "eyebrow": "Socio · Atlas Handpan",
    "heroProCaption": "Aluminio: el mismo soporte, extendido y plegado.",
    "heroAllCaption": "Madera: sin extensiones y luego con ellas",
    "heightCm": "{n} cm",
    "heroTitle": "Los soportes Atlas",
    "heroLead": "Atlas fabrica en Italia trípodes para handpan. El instrumento no se atornilla ni se sujeta con correas: descansa sobre un disco flotante sostenido por imanes. Soy socio de la marca, y los dos modelos están en el showroom: el Atlas Pro y el Atlas All.",
    "ctaModels": "Ver los dos modelos",
    "ctaTry": "Probarlos en el showroom",
    "ctaTryModel": "Probarlo en el showroom",
    "heroTryNote": "Los dos modelos están en el showroom, en París (distrito 20), junto a los handpans. Pones un instrumento encima, ajustas la altura, tocas, y ya lo sabes.",
    "whyTitle": "Lo que Atlas hace de manera diferente",
    "whyText": "Lo que distingue a Atlas es la fijación. El instrumento no se atornilla ni se sujeta con correas: descansa sobre un disco flotante sostenido por ocho imanes antirrayones. En el showroom, mis handpans ya están en sus trípodes, y eso me permite pasarlos de mano en mano sin tener que dejarlos cada vez.",
    "whyPoints": [
      {
        "t": "Sobre las piernas, sentado, de pie",
        "d": "Atlas anuncia tres posiciones para tocar con su gama de madera: el instrumento sobre las piernas, sentado en una silla o de pie. El Atlas Pro, en cambio, se anuncia para dos: sentado y de pie."
      },
      {
        "t": "Una fijación magnética",
        "d": "El handpan descansa sobre un disco flotante con ocho imanes. Atlas especifica que están protegidos y ubicados debajo de los puntos donde el instrumento toca el soporte: nada pellizca, aprieta ni roza el metal."
      },
      {
        "t": "Hecho en Italia",
        "d": "Atlas es una pequeña empresa italiana con sede en Conegliano, en el Véneto. Allí se diseñan y fabrican los dos soportes."
      }
    ],
    "solutionFacts": [
      {
        "t": "Compatible con tu handpan",
        "d": "Atlas anuncia un soporte diseñado para todos los handpans y probado con numerosos fabricantes, e imanes compatibles con acero nitrurado, acero inoxidable y Ember Steel."
      },
      {
        "t": "No se vuelca, y se ajusta al suelo",
        "d": "Atlas indica un pasador de seguridad antivuelco, un collarín de centrado de goma extraíble y patas regulables a rosca: lo necesario para compensar un suelo que no está plano."
      },
      {
        "t": "Catorce días para cambiar de opinión",
        "d": "Atlas anuncia la devolución gratuita en catorce días, con la etiqueta de envío incluida en la caja. Y si puedes pasar por el showroom, lo tendrás decidido antes incluso de hacer el pedido."
      }
    ],
    "storyEyebrow": "Mi experiencia",
    "storyTitle": "Por qué toco de pie",
    "storyIntro": "Desde que toco el handpan, siempre he tocado de pie. Primero porque soy cantante, y para mí es la mejor postura para cantar con libertad. Después porque soy multiinstrumentista: tengo un pedal de bombo electrónico en el pie y varios instrumentos a mi alrededor. Y porque es, con mucho, la postura que más equilibra el cuerpo. Así que un soporte de handpan no es un accesorio en mi oficio: es lo que hace posible mi manera de tocar.",
    "storyVoiceTitle": "Dos handpans, un bombo, un N’Goni, una calabaza, y canto",
    "storyVoiceText": "Es el montaje que llevo al escenario, y es el de mi audición a ciegas en The Voice. Todo se toca de pie, todo está al alcance de la mano, y nada funciona si los instrumentos no están a la altura correcta. Es muy concreto: unos centímetros de más y ya no canto afinado; unos centímetros de menos y ya no llego a mis graves.",
    "storyVoiceCta": "Ver mi trayectoria",
    "storyStandsTitle": "Los soportes que desgasté antes de Atlas",
    "storyStandsIntro": "Probé varios, y terminé por desgastarlos del todo. Hablo aquí de MIS ejemplares y de MI uso (el escenario, los viajes, varias decenas de conciertos al año):",
    "storyStands": [
      {
        "t": "Jacomina Kistemaker",
        "d": "Tengo dos de sus modelos. Es una fabricante a la que respeto, y sus soportes me acompañaron mucho tiempo."
      },
      {
        "t": "Meinl",
        "d": "El mío es sólido, de verdad. Pero es demasiado pesado para transportarlo: cuando salgo a tocar, ese criterio lo decide todo."
      },
      {
        "t": "S Pan",
        "d": "Ha sido mi elección hasta hoy, y tiene verdaderas cualidades: es ligero y fácil de transportar. En el mío, los sistemas de deslizamiento y las piezas impresas en 3D acabaron fallando: una de ellas se rompió con el tiempo. También me pregunté si el principio de la ventosa no absorbía parte de la vibración: es una pregunta que me hago, no una medición que haya hecho."
      }
    ],
    "problemEyebrow": "El problema",
    "solutionEyebrow": "La solución",
    "tryEyebrow": "Lo que sigue",
    "storyConclusionTitle": "¿Por qué Atlas ahora?",
    "storyConclusion": "Con todo lo que probé, es el primer concepto que responde a cada uno de los problemas que encontré: una fijación magnética en lugar de una ventosa, un Atlas Pro todo de aluminio (patas telescópicas incluidas) y 1,8 kg que se guardan en su bolsa. Estoy convencido. Los dos soportes llegaron el 26 de agosto de 2026, y los probé.",
    "storyBridge": "Y hay una ironía que me gusta: el mismo soporte abre la postura opuesta a la mía. Su cabezal permite tocar sentado, sin apoyar el instrumento en las piernas, una postura que nunca practiqué.",
    "storyBridgeCta": "El cabezal del soporte",
    "storyShowroomCaption": "En el showroom pasa lo mismo: mis dos handpans acústicos Yishama siguen montados en sus soportes, a la altura para tocar, listos para sonar. Un soporte de handpan no es un accesorio que se saca para los conciertos: es donde vive el instrumento.",
    "storyPlateauCaption": "Mi montaje instalado, antes de un concierto en una sala de Suiza. Un soporte de handpan nunca está solo: se sostiene en medio de todo lo demás, y es el que fija la altura de todo.",
    "storyFestivalCaption": "Everness Festival, Hungría: de pie detrás de mis dos handpans acústicos {yishama}, sobre los soportes que usaba entonces.",
    "storyStandsPhotoCaption": "Mi montaje de escenario visto de cerca: tres instrumentos, tres soportes distintos, y otras tantas alturas que ajustar antes de tocar.",
    "partnerTitle": "Por qué hablo de esto ahora",
    "partnerText": "La colaboración con Atlas acaba de confirmarse: ahora soy afiliado de la marca, y me enviaron dos soportes de demostración para mis encuentros. Mientras no hubiera nada firmado, preferí no anunciar nada aquí. Ya está hecho, así que lo cuento.",
    "testTitle": "Lo que comprobaré delante de ustedes",
    "testText": "Los recibo en unos días. Lo que afirmo en esta página lo afirmo con conocimiento de causa: desgasté cuatro soportes distintos en el escenario, y sé exactamente lo que busco. Lo que aún no tengo es la prueba en la práctica; así que, en cuanto los dos soportes estén en el showroom, grabo mi propia demostración, la publico aquí y les cuento qué tal.",
    "videoSectionTitle": "La demostración en video",
    "videoTitle": "Por qué tocar el handpan de pie: mi video, con Atlas",
    "videoSoon": "Próximamente",
    "videoNote": "Mi propio video, publicado en mi canal de YouTube.",
    "videoDavidQuote": "He invertido en todos los soportes de handpan, o casi todos, y te voy a explicar por qué hoy disfruto tanto con Atlas.",
    "videoDavidSource": "David Lesage, en su video de YouTube (traducido del francés)",
    "modelsTitle": "Dos modelos",
    "modelsIntro": "Los dos hacen el mismo trabajo: sostener el handpan sobre un disco magnético flotante. No lo hacen con los mismos materiales, ni en el mismo rango de altura. Esto es lo que anuncia el fabricante, sin añadir nada.",
    "modelsDavidLead": "Sobre el modelo Pro, en su video:",
    "modelsDavidQuote": "Pues no sé qué tiene de mucho más pro, salvo que es superbonito, de aluminio, y que se monta tres veces más rápido. Así que sí, es mucho más pro y mucho más ligero, con materiales de calidad que aguantan con el tiempo. Ultrarrápido, mucho más fino, fácil de transportar y de guardar. El concepto es exactamente el mismo que el del primero.",
    "modelsDavidSource": "David Lesage, en su video de YouTube (traducido del francés)",
    "modelsDavidTodayLead": "Y hoy, por escrito:",
    "modelsDavidTodayQuote": "El Pro tiene un defecto: el cabezal de madera no se ofrece, ni como opción ni incluido, y es su único defecto, pero hay que decirlo. Aun así, prefiero el Pro. Por eso no se puede usar el cabezal solo para tocar sentado, mientras que la versión de madera sí, pero tarda más en montarse, ocupa más al transportarla y es menos regulable.",
    "modelsDavidTodaySource": "David Lesage, 6 de septiembre de 2026 (traducido del francés)",
    "specs": {
      "price": "Precio anunciado",
      "height": "Altura",
      "weight": "Peso",
      "material": "Materiales",
      "mount": "Fijación",
      "positions": "Posiciones para tocar",
      "bag": "Transporte",
      "body": "Cabezal Atlas Body",
      "bodyOption": "Cabezal Atlas Body"
    },
    "heightValue": "de {min} cm a {max} cm",
    "weightValue": "{w} kg",
    "priceNote": "Precios públicos con IVA incluido, consultados en el sitio de Atlas el {date}. El precio que cuenta es el que muestra Atlas al hacer tu pedido; los gastos de envío son adicionales.",
    "priceRegular": "precio habitual",
    "publicPrice": "precio público",
    "codeBadge": "{now} con mi código",
    "heroCodeTitle": "Mi código en Atlas: −{pct} %",
    "heroCodePrices": "Con el código: {pro} · {all}",
    "buyCta": "Comprar en Atlas con −{pct} % →",
    "buyHint": "El botón copia el código y luego abre el sitio de Atlas en una pestaña nueva.",
    "buyCopied": "Código {code} copiado ✓. Pégalo al pagar en el sitio de Atlas.",
    "savingLine": "{name}: {was} → {now} con el código ({save})",
    "heroCodeText": "Válido en todos los productos Atlas, Atlas Body incluido. Escríbelo al pagar, en el sitio de Atlas.",
    "codeReminder": "Al pagar en el sitio de Atlas, escribe mi código {code}: −{pct} %.",
    "bodyCodeReminder": "Mi código {code} también funciona con el Atlas Body: −{pct} % al pagar en el sitio de Atlas.",
    "pro": {
      "name": "Atlas Pro",
      "tagline": "Aluminio, telescópico, bolsa incluida",
      "text": "El modelo de aluminio. Sus tres patas telescópicas se ajustan de forma continua e independiente entre sí, un sistema de apertura rápida permite montarlo y plegarlo en segundos, y la estructura se cierra sobre sí misma para el transporte. Atlas indica 1,8 kg, y la bolsa Atlas Bag viene incluida.",
      "material": "Patas telescópicas de aluminio ligero",
      "mount": "Disco flotante, 8 imanes antiarañazos",
      "positions": "Sentado o de pie, ajustable de forma continua",
      "bag": "Bolsa de transporte Atlas Bag incluida",
      "body": "Parte de madera no incluida"
    },
    "all": {
      "name": "Atlas All",
      "tagline": "De madera, ampliable con extensiones",
      "text": "El modelo de madera. Su cuerpo principal está impreso en 3D y descansa sobre una base de madera con una punta antivuelco. Las patas miden 41 cm y se alargan 10 cm; al atornillar las tres extensiones de 41 cm, se pasa de la posición sentada a la posición de pie.",
      "material": "Cuerpo impreso en 3D; base, extensiones y patas de madera",
      "mount": "Disco flotante, 8 imanes antiarañazos",
      "positions": "Sobre las rodillas, sentado (sin extensiones) o de pie (con extensiones)",
      "body": "Incluida: es la pieza base de la gama"
    },
    "headEyebrow": "El cabezal del soporte",
    "headTitle": "Un soporte, pero no solo un soporte",
    "headIntro": "La parte superior del soporte, la que Atlas llama Atlas Body, no es solo una pieza que se atornilla a unas patas. Sujeta entre los muslos, sostiene el handpan por encima de ti mientras tocas sentado en una silla o un sofá, sin patas, sin trípode y sin apoyar el instrumento sobre tus piernas.",
    "headPoints": [
      {
        "t": "El instrumento ya no descansa sobre ti",
        "d": "Es el cabezal el que sostiene el handpan, no tus muslos. Atlas anuncia tres posiciones para tocar con su gama de madera: sobre las rodillas, sentado y de pie."
      },
      {
        "t": "Las notas de abajo siguen al alcance",
        "d": "El instrumento queda separado de tu cuerpo. Atlas destaca que ya no cuesta alcanzar las notas, algo que importa sobre todo si tu handpan tiene notas en la parte de abajo."
      },
      {
        "t": "Un cabezal calado",
        "d": "La corona es hueca y abierta. Atlas explica que esta forma hueca permite que el sonido pase sin obstáculos."
      }
    ],
    "headAcousticTitle": "Lo que Atlas dice sobre el sonido",
    "headAcousticText": "Atlas escribe que su soporte «nació de la búsqueda de un mejor sonido», que «no absorbe las vibraciones y aumenta la resonancia» y que «su forma hueca permite que el sonido circule sin obstáculos». Sobre el cabezal solo, añaden que mejora el control del instrumento «sin obstaculizar las vibraciones».",
    "headAcousticNote": "Son sus palabras, no las mías: sobre el sonido, no repito la afirmación de nadie sin haberla escuchado. Lo que yo digo está en mi video: aquí lo tienes.",
    "headAcousticDavidLead": "Sobre su antiguo soporte de ventosas, y después sobre el cabezal Atlas:",
    "headAcousticDavidQuote1": "Este sistema de ventosas tiene un defecto: absorbe las vibraciones del handpan, y eso no es bueno, porque significa que vamos a perder el sonido del handpan, o al menos una parte del sonido.",
    "headAcousticDavidQuote2": "Que tenga aberturas es superimportante, porque significa que el sonido del handpan va a poder escaparse.",
    "headAcousticDavidSource": "David Lesage, en su video de YouTube (traducido del francés)",
    "headIncludedTitle": "¿Incluido o se compra aparte?",
    "headIncluded": [
      {
        "t": "Atlas All: incluido",
        "d": "La gama de madera es modular: el cabezal es la pieza base, se le atornillan las patas para obtener el Atlas Short y luego las extensiones para el Atlas All. Con el Atlas All tienes las tres posiciones."
      },
      {
        "t": "Atlas Pro: la parte de madera no está incluida",
        "d": "Marco Agri, el creador de Atlas, me lo confirmó directamente: «atlas pro doesn’t come with the wood part». El Pro se ajusta de la posición sentada a la de pie, pero no trae el cabezal de madera, el que sirve para tocar con el instrumento sobre las rodillas. Mejor saberlo antes de hacer el pedido que al abrir la caja."
      },
      {
        "t": "Atlas Body: solo el cabezal",
        "d": "Atlas también lo vende por separado (165 €). Es lo que conviene mirar si solo quieres tocar con el instrumento sobre las rodillas, o si quieres ampliar un modelo de la gama de madera: el kit de patas y extensiones (105 €) lo convierte en Atlas Short y luego en Atlas All."
      }
    ],
    "headCompatTitle": "Todas las piezas son compatibles entre sí",
    "headCompatText": "Es lo otro que Marco Agri me confirmó: «all parts are fully compatible with the others». La consecuencia más útil: si ya tienes un Atlas All o un Atlas Short, ya tienes la parte de madera; se monta tal cual en un Atlas Pro, no pierdes nada. Y si empiezas de cero y quieres las tres posiciones desde el principio, hoy es el Atlas All el que te las da.",
    "headCompatSource": "Marco Agri, creador de Atlas, mensaje del 20 de agosto de 2026",
    "buyTitle": "Dónde pedirlos",
    "buyText": "El pedido se hace en el sitio de Atlas. Indican unos 12 € de gastos de envío para Europa, y la devolución es gratuita durante 14 días, con la etiqueta de devolución incluida en la caja.",
    "buyNote": "En su sitio no se indican ni el plazo de entrega ni la duración de la garantía: pregúntaselos antes de hacer el pedido, o escríbeme y yo les hago la pregunta por ti.",
    "showroomTitle": "Probarlos antes de comprar",
    "showroomText": "Los dos soportes están en el showroom, en París (distrito 20), junto a los handpans. Podrás colocar un instrumento encima, ajustar la altura, tocar de pie y ver cuál de los dos te va mejor, sin comprar nada.",
    "showroomPoints": [
      "Los dos modelos lado a lado, no dos fotos",
      "Un handpan colocado encima: tú mismo ajustas la altura, sentado y luego de pie",
      "Sin comprar nada: te vas con tu opinión, no con una caja"
    ],
    "showroomAgendaCta": "Ver próximas fechas",
    "showroomPhotoCaption": "El showroom preparado antes de un encuentro: mis dos handpans acústicos Yishama y mis dos handpans electrónicos {neotone}, cada uno en su soporte; cuatro instrumentos, cuatro soportes diferentes. Los dos Atlas ocuparon después su lugar ahí, y es ahí donde podrás probarlos.",
    "promoTitle": "Mi código en Atlas",
    "promoText": "Aquí está mi código: −{pct} % en todos los productos Atlas, Atlas Body incluido. Se escribe al pagar en el sitio de Atlas, tanto si haces el pedido en línea como si vienes antes a probarlos al showroom.",
    "promoDisclosure": "Este código es mi enlace de embajador en Atlas: no te cuesta nada más y no cambia nada de lo que te escribí más arriba.",
    "alt": {
      "showroomYishama": "David Lesage en el showroom de Le Nid, en París: detrás de él, dos handpans acústicos Yishama de acero, cada uno montado sobre su trípode negro sobre una alfombra trenzada, en una gran sala blanca con arcos iluminados y suelo de parqué claro.",
      "showroomInstruments": "El showroom de David Lesage preparado antes de un encuentro: dos handpans electrónicos Neotone con corona luminosa montados sobre trípodes negros cerca de un kit de percusión electrónica, y dos handpans acústicos Yishama de acero, uno sobre un trípode de madera y el otro sobre un soporte de metal; una semiesfera de calabaza sobre una alfombra roja en primer plano, parqué antiguo, guirnaldas de luces y un rosetón en la pared.",
      "stageStanding": "David Lesage de pie en el escenario bajo los focos, detrás de sus dos handpans montados en soportes, rodeado de sus soportes, sus pedales y una calabaza colocada sobre la alfombra roja.",
      "stageStands": "Primer plano del montaje de escenario de David Lesage: tres handpans colocados sobre soportes de madera y de metal a la altura de las manos, un atril y una computadora portátil, cables y pedales en el suelo.",
      "stageFestival": "David Lesage solo en el escenario del Festival Everness, en Hungría: de pie, descalzo, detrás de sus dos handpans acústicos montados sobre trípodes negros, bajo haces de luz verde y roja, frente a una gran lona tejida multicolor; una semiesfera de calabaza está colocada en el suelo frente a él.",
      "stagePlateau": "El escenario de David Lesage montado y todavía vacío antes de un concierto, visto desde su lugar: un handpan sobre un trípode negro en el centro de unas alfombras persas, una calabaza, un djembé, un pedal de bombo en el suelo, una consola de control, dos computadoras portátiles abiertas y un monitor de escenario, frente a una gran sala con suelo de parqué y columnas blancas.",
      "allHeightLow": "El trípode Atlas All de madera clara sin sus extensiones, sobre fondo blanco: las tres patas cortas atornilladas bajo el cabezal negro, en posición baja.",
      "allHeightHigh": "El mismo trípode Atlas All de madera clara con sus extensiones, sobre fondo blanco: las patas son el doble de largas, en posición alta.",
      "proTwoHeights": "Dos trípodes Atlas Pro uno al lado del otro sobre fondo gris: el de la izquierda está desplegado en posición alta y sostiene un handpan de acero, el de la derecha está ajustado en posición baja, con las patas juntas.",
      "bodySeated": "Una persona sentada en un sofá toca un handpan sostenido por el Atlas Body encajado entre sus muslos: el instrumento está separado de sus piernas.",
      "bodySide": "Vista lateral de la misma forma de tocar sentado: el handpan descansa sobre el cabezal Atlas Body, que lo mantiene por encima de las piernas de la persona.",
      "bodyAlone": "El Atlas Body solo, sobre fondo gris: la corona negra calada, sus imanes redondos dispuestos en círculo y su varilla de centrado de madera, sobre su base de madera torneada.",
      "proOpen": "El trípode Atlas Pro desplegado sobre fondo blanco: corona negra calada de aluminio, atravesada por una varilla de centrado de madera clara, y tres patas abiertas.",
      "proHigh": "El trípode Atlas Pro ajustado en posición alta, con sus tres patas telescópicas completamente extendidas.",
      "proDisc": "Primer plano del cabezal del Atlas Pro: la corona negra lleva ocho imanes redondos de metal agrupados de dos en dos, y la varilla de centrado de madera clara pasa por el centro.",
      "proLock": "Primer plano del sistema de bloqueo de una pata telescópica del Atlas Pro: el anillo metálico de cierre rápido.",
      "proClosed": "El Atlas Pro plegado: las tres patas recogidas a lo largo del cuerpo, listo para guardar.",
      "proBag": "El Atlas Pro plegado, junto a su funda de transporte Atlas Bag, de lona negra con el logotipo Atlas.",
      "proParts": "El Atlas Pro separado en dos partes: el cabezal magnético de un lado y el bloque de las tres patas telescópicas del otro.",
      "allPlaying": "Un músico toca de pie un handpan colocado sobre el trípode Atlas All, en una sala de estar: las tres patas de madera clara están desplegadas en posición alta.",
      "allHigh": "El trípode Atlas All montado con sus extensiones, en posición para tocar de pie: patas largas de madera clara y cabezal negro.",
      "allLow": "El trípode Atlas All sin sus extensiones, en la posición baja, la que se usa para tocar sentado.",
      "allBody": "El cuerpo principal del Atlas All: la corona negra calada y su varilla de madera, sobre la base de madera torneada.",
      "allDisc": "El disco flotante del Atlas All visto desde arriba: una corona negra con ocho imanes redondos agrupados de dos en dos, y la varilla de centrado de madera clara en el centro.",
      "allScrew": "Dos manos atornillan una extensión de madera del Atlas All a una pata; se puede ver el inserto roscado de metal.",
      "allWood": "Las piezas de madera del Atlas All, apoyadas en plano: las patas y las extensiones con sus puntas negras."
    },
    "heightFigureCaption": "El mismo pie, fotografiado dos veces: a la izquierda, completamente extendido, con un handpan encima; a la derecha, plegado al mínimo. Todo el rango 51 → 109 cm en una sola imagen.",
    "photosPro": "El Atlas Pro en imágenes",
    "photosAll": "El Atlas All en imágenes",
    "carousel": {
      "prev": "Foto anterior",
      "next": "Siguiente foto",
      "photo": "Foto",
      "photosOf": "Fotos"
    },
    "lightbox": {
      "close": "Cerrar",
      "zoom": "Ampliar la foto"
    }
  },
  "lessons": {
    "title": "Clases de handpan en París y en línea | David Lesage",
    "description": "Now Music Academy: aprende el handpan, el ritmo con calabaza y el arpa gonilélé a través de los colores, las formas y las emociones.",
    "heroEyebrow": "Now Music Academy",
    "heroTitle": "Aprender a través de un enfoque holístico de la música",
    "heroLead": "Handpan, ritmo con calabaza y arpa gonilélé: a través de los colores, las formas y las emociones. Por videollamada en todo el mundo, o en persona en París.",
    "ctaBook": "Reservar una clase",
    "ctaWorkshop": "Ver los talleres",
    "universesEyebrow": "Tres universos",
    "universesTitle": "Lo que puedes aprender conmigo",
    "universes": [
      {
        "t": "Handpan",
        "d": "El método visual: los colores, las constelaciones y las emociones hacen que la armonía sea clara y fácil de memorizar, tanto en el handpan acústico como en el Neotone.",
        "cta": "Descubrir la aplicación"
      },
      {
        "t": "Ritmo y Calabaza",
        "d": "Mi método Now Groove: aprende el ritmo con emojis visuales, tocando la calabaza. Lúdico, accesible para todos y profundo.",
        "cta": "El método Now Groove"
      },
      {
        "t": "Arpa Gonilélé",
        "d": "Descubre el arpa-laúd de viaje: afinación, toque intuitivo y meditativo. Te lo transmito yo, embajador de La Maison du Ngoni.",
        "cta": "Descubrir el Gonilélé"
      }
    ],
    "workshopsEyebrow": "Talleres grupales",
    "workshopsTitle": "Calendario de los talleres de ritmo · calabaza",
    "workshopsIntro": "Talleres de ritmo Now Groove presenciales, con la calabaza, en un ambiente cálido y alegre.",
    "workshopsEmpty": "Próximas fechas en preparación: escríbeme para enterarte antes que nadie.",
    "workshopsCta": "Ver todas las fechas",
    "workshopsContact": "Preguntas e inscripciones:",
    "promiseEyebrow": "Mi promesa pedagógica",
    "promiseTitle": "El método visual, en clase",
    "promiseIntro": "En clase uso Handpan Constellation Studio: los colores, las constelaciones de acordes y las emociones hacen que la armonía sea clara y fácil de memorizar, sea cual sea tu nivel, desde el niño curioso hasta el músico experimentado.",
    "pillars": [
      {
        "t": "Comprender",
        "d": "Ve la estructura de la música en lugar de padecerla: cada acorde se vuelve una forma y un color."
      },
      {
        "t": "Memorizar",
        "d": "Retienes por la forma y la emoción, no de memoria. Los puntos de referencia se mantienen estables de una escala a otra."
      },
      {
        "t": "Tocar y acompañarse",
        "d": "El handpan se vuelve un verdadero instrumento de acompañamiento: canta sobre los temas que te gustan."
      }
    ],
    "methodPhotoAlt": "En clase: la mano de un alumno toca un Neotone de madera y, justo al lado, la computadora muestra Handpan Constellation Studio en modo Lógica: el círculo de los grados en colores, con la burbuja explicativa de un grado abierta en la pantalla.",
    "methodPhotoCaption": "En clase, dejo el modo Lógica abierto frente al alumno: un grado a la vez, explicado en la pantalla mientras toca.",
    "lightbox": {
      "close": "Cerrar",
      "zoom": "Ampliar la foto"
    },
    "formulasEyebrow": "Opciones y precios",
    "formulasTitle": "Elige tu formato",
    "formulas": [
      {
        "title": "Clase particular · 1 hora",
        "price": "desde {lesson60} €",
        "text": "Por videollamada o en persona en París. Handpan, ritmo con calabaza o gonilélé: trabajamos lo que te hace vibrar."
      },
      {
        "title": "Clase particular · 1,5 horas",
        "price": "desde {lesson90} €",
        "text": "El formato ideal para ir más allá: armonía, ritmo, acompañamiento, consejos de escenario y de estudio."
      },
      {
        "title": "Taller grupal",
        "price": "A pedido",
        "text": "Sesiones en grupos reducidos (ritmo con calabaza, handpan…), en un ambiente cálido. Formato y lugar a pedido."
      }
    ],
    "footnote": "Precio libre a partir del importe indicado. Las clases se reservan por correo electrónico. Las clases presenciales en París son un puente natural hacia el showroom y los encuentros.",
    "packageTitle": "Paquete de 4 clases en 2 meses",
    "packageText": "4 clases de 1 hora: desde {pack60} € ({packLesson60} € por clase) · 4 clases de 1,5 horas: desde {pack90} € ({packLesson90} € por clase). Precio libre a partir de estos importes; las 4 clases se usan en un plazo de 2 meses.",
    "packageCta": "Pagar en HelloAsso",
    "faqEyebrow": "Preguntas frecuentes",
    "faqTitle": "Preguntas frecuentes sobre las clases",
    "faq": [
      {
        "q": "¿Se puede aprender handpan sin solfeo?",
        "a": "Sí, ese es todo el principio del método. El enfoque visual (los colores de las notas y las formas de los acordes) reemplaza al solfeo para que progreses rápido."
      },
      {
        "q": "¿Cuánto cuesta una clase de handpan?",
        "a": "Las clases son a precio libre, a partir de un mínimo: desde {lesson60} € la hora, desde {lesson90} € la hora y media, por videollamada o en persona en París. Con el paquete de 4 clases (para usar en 2 meses), es desde {pack60} € (1 hora) o desde {pack90} € (1,5 horas), es decir, a partir de {packLesson60} € o {packLesson90} € por clase. Los talleres grupales se organizan a pedido."
      },
      {
        "q": "¿Las clases en línea funcionan para el handpan?",
        "a": "Sí, las clases se dan por videollamada en todo el mundo, con el mismo método visual que en persona. Solo necesitas tu instrumento y una conexión."
      }
    ]
  },
  "studio": {
    "title": "Handpan Constellation Studio: handpan acústico y Neotone",
    "description": "En cualquier handpan acústico, y también en el Neotone. Aprende con los colores (ChromaKeys), las Constelaciones de acordes y las emociones, sin solfeo.",
    "heroEyebrow": "La aplicación: un proyecto original de David Lesage",
    "heroTitleA": "Handpan Constellation Studio",
    "heroTitleB": "La música se hace visible",
    "heroLead": "En cualquier handpan: tanto tu handpan acústico como el Neotone electrónico. Un enfoque visual de la música (con los colores, las emociones y la geometría) para comprender, memorizar y tocar.",
    "heroBadges": [
      "Cualquier handpan acústico",
      "Handpan electrónico Neotone"
    ],
    "ctaWait": "Unirse a la lista de espera",
    "ctaOpen": "Abrir la aplicación",
    "problemEyebrow": "El diagnóstico",
    "problemTitle": "El handpan no tiene notación visual",
    "problem1Title": "Ninguna notación muestra el instrumento",
    "problem1Text": "Es un instrumento magnífico, pero ¿cómo escribirlo? Se aprende de oído, por imitación, y pasadas las primeras melodías se repiten los mismos patrones: el instrumento se vuelve una zona de confort de la que ya no se sale.",
    "problem2Title": "En un handpan electrónico, las referencias se desvanecen",
    "problem2Text": "El Neotone cambia de escala sin cesar, lo cual es una ventaja, pero también una trampa: las notas bajo tus dedos nunca son las mismas dos veces. No hay un punto fijo: el cerebro se satura, como si tuvieras que reaprender a tocar el instrumento con cada escala.",
    "chromaEyebrow": "Colores y geometría",
    "chromaTitle": "¿Y si hiciéramos visible lo invisible?",
    "chromaIntro": "En lugar de los nombres de las notas (que cambian todo el tiempo), la aplicación muestra la <strong>estructura</strong> de la música. Cada uno de los siete grados recibe un color y una emoción. Las ChromaKeys le dan el suyo a cada nota. Y cada acorde dibuja una figura geométrica luminosa.",
    "chromaPunch": "Lo que era invisible se vuelve visible.",
    "constelEyebrow": "El lenguaje de las Constelaciones",
    "constelTitle": "La nueva tablatura visual para handpan",
    "constelIntro": "Más allá de los colores ChromaKeys, la aplicación conecta las notas de un acorde: dibuja una figura luminosa, una <strong>constelación de acordes</strong>. Tres maneras de dibujarla.",
    "constellations": [
      {
        "t": "Polígono",
        "d": "La forma cerrada de un acorde: todas sus notas conectadas. Puedes reconocer el acorde a simple vista, por su forma."
      },
      {
        "t": "Abierto",
        "d": "Un trazo abierto que sigue el camino de las notas, ideal para visualizar un desplazamiento de la mano."
      },
      {
        "t": "Manos",
        "d": "El trazo pensado para el gesto: qué mano, qué nota. Lees directamente tu toque."
      }
    ],
    "degEyebrow": "Grados y emociones",
    "degTitle": "Cada grado se convierte en una emoción",
    "degIntro": "Tocar una progresión es contar una historia: salir de casa, partir a la aventura, atravesar una tensión y luego volver. Ya no se memorizan reglas abstractas: se siente, y se ve.",
    "modesEyebrow": "La aplicación, en cuatro modos",
    "modesTitle": "El compañero ideal de tu instrumento",
    "modesIntro": "Todo el método cabe en una sola aplicación web.",
    "modes": [
      {
        "t": "Lógica",
        "d": "El corazón de la aplicación. Toca los 7 acordes de cualquier escala, construye tus progresiones, sigue los acordes de los temas que te gustan."
      },
      {
        "t": "Atlas Sonoro",
        "d": "Explora las escalas del mundo entero: Japón, Oriente, África, músicas celtas… Escúchalas, apréndelas, viaja."
      },
      {
        "t": "Crear",
        "d": "Crea tus propias escalas personalizadas, nota por nota y color por color, y guárdalas en tu biblioteca."
      },
      {
        "t": "Conexión MIDI",
        "d": "El puente entre tu Neotone y la aplicación: lo que tocas aparece en tiempo real en el handpan virtual, y la aplicación te guía en tus acordes y tus escalas."
      }
    ],
    "versionAcoEyebrow": "¿En qué handpan funciona?",
    "versionAcoTitle": "Pensada para tu handpan acústico <span class=\"text-copper\">y</span> para el Neotone",
    "versionAcoText": "La aplicación no es exclusiva de ninguno de los dos: está pensada y diseñada para ambos. Pero no permite lo mismo en cada uno, y es justamente eso lo que hace interesantes a los dos. En un handpan acústico, el marco ya está ahí: la aplicación lo hace visible. En el Neotone, todo se vuelve posible: la aplicación pone el marco. Una sola aplicación, dos maneras de revelar.",
    "duoQuote1": "La electrónica lo ofrece todo y no revela nada; la acústica impone un marco, y un marco se explora.",
    "duoQuote2": "Un marco que se comprende da más libertad que un espacio infinito donde uno se pierde.",
    "duoQuoteSource": "David Lesage",
    "duoAcoTitle": "En un handpan acústico",
    "duoAcoText": "Tu instrumento tiene sus notas, su escala, sus contornos: el marco ya está ahí. La aplicación lo hace visible, y lo que parecía una limitación se vuelve un terreno por explorar. El modo acústico es gratuito: no necesitas el Neotone para empezar.",
    "versionAcoBullets": [
      "Tu escala se muestra a color en la foto de tu handpan.",
      "Aprende nuevos acordes y progresiones, con una guía paso a paso.",
      "Explora un atlas de escalas por emociones e imagina la tuya propia, hecha a medida."
    ],
    "versionAcoCaption": "El modo acústico: el enfoque visual de Handpan Constellation Studio, en tu propio handpan.",
    "versionAcoPhotoCaption": "En el showroom: mi handpan acústico Yishama sobre su trípode, la aplicación encima, sus acordes en constelaciones.",
    "versionNeoPhotoCaption": "Mi Neotone de madera, la tableta fijada en un brazo justo encima, la partitura de un tema y sus acordes en constelaciones.",
    "duoPhotoAco": "Mi handpan acústico Yishama y la aplicación.",
    "duoPhotoNeo": "Mi Neotone y la aplicación.",
    "versionAcoCta": "Abrir la aplicación",
    "versionAcoYishamaLink": "El origen de este enfoque: mis dos handpans Yishama",
    "versionNeoTitle": "En el Neotone",
    "versionNeoText": "Todas las escalas en un solo instrumento: todo se vuelve posible. Es justamente ahí donde un marco se vuelve necesario; si no, uno se pierde en el infinito. La aplicación pone el marco que el instrumento ya no pone.",
    "versionNeoBullets": [
      "Conecta tu Neotone a la aplicación por MIDI: lo que tocas aparece en tiempo real en el handpan virtual.",
      "Cambia de escala cuanto quieras: los colores de los 7 grados, en cambio, nunca se mueven.",
      "La aplicación te guía en tus acordes y tus escalas, en la escala que acabas de cargar."
    ],
    "versionNeoCta": "Descubrir el Neotone",
    "lightbox": {
      "close": "Cerrar",
      "prev": "Foto anterior",
      "next": "Siguiente foto",
      "zoom": "Ampliar la foto"
    },
    "seriesTitle": "Descubre la app en video",
    "seriesIntro": "Una serie de videos cortos, una función a la vez. Aquí está el primero.",
    "seriesEyebrow": "La serie en video",
    "storyEyebrow": "La historia, por David Lesage",
    "storyTitle": "La herramienta que habría soñado que me enseñaran de niño",
    "storyP1": "Al descubrir el handpan, me reencontré con el muro de mi infancia: ningún método, y la dificultad de organizar visualmente los caminos de las notas. Luego, con el Neotone, una nueva dificultad: las notas cambian de lugar con cada escala.",
    "storyP2": "Así que creé la herramienta que siempre había soñado tener: un enfoque visual de la armonía, a través de colores, formas y emociones, para comprender, memorizar y, finalmente, cantar mientras me acompaño con el handpan.",
    "storyP3": "Es la continuación lógica de <strong>Now Groove</strong>, mi método de ritmo (2021), que hace accesible el ritmo con emoticones visuales. Handpan Constellation Studio hace lo mismo con la armonía: una herramienta pensada por un músico para elevar el handpan al rango de instrumento de acompañamiento, como la guitarra o el piano.",
    "waitTitle": "La aplicación está disponible",
    "waitText": "Crea tu cuenta gratuita (nombre, apellido, correo electrónico) para empezar, directamente en tu navegador. Al continuar, aceptas las condiciones generales de uso y la política de privacidad. La elección del plan y el pago seguro se hacen en la aplicación.",
    "waitButton": "Abrir la aplicación",
    "contribEyebrow": "Una comunidad viva",
    "contribTitle": "No descargas una aplicación: te unes a un proyecto vivo",
    "contribIntro": "Handpan Constellation Studio evoluciona sin cesar, alimentado por quienes lo usan. Tus comentarios, enviados con un clic desde la aplicación, se leen y orientan directamente lo que sigue.",
    "contribCards": [
      {
        "t": "En constante evolución",
        "d": "Llegan con regularidad nuevas funciones, escalas y modos, y están incluidos. La aplicación que usas hoy será aún más completa mañana."
      },
      {
        "t": "Tus comentarios dan forma a la aplicación",
        "d": "Desde la misma aplicación, envías tus ideas y comentarios con un clic. Cada mensaje se lee y orienta las próximas novedades."
      },
      {
        "t": "Una comunidad, no un catálogo",
        "d": "Te unes a un movimiento: hacer que la música sea visible y accesible. Juntos, estamos construyendo la herramienta con la que todos soñábamos de niños."
      }
    ],
    "priceEyebrow": "Precios",
    "priceTitle": "Gratis, Esencial, Studio",
    "priceIntro": "Empieza gratis: para siempre y sin tarjeta. Pasa a Esencial o a Studio cuando quieras ir más lejos: el primer mes es gratis en los planes mensuales.",
    "priceCta": "Pasar a Esencial",
    "priceStudioCta": "Pasar a Studio",
    "pricePerYear": "/ año",
    "priceOrYear": "O al año: {price} ({saving}), en un solo pago, sin mes de prueba",
    "priceFreeForever": "para siempre, sin tarjeta",
    "priceStudioPromise": "Un estudio alrededor de tus instrumentos: tu afinación, los auriculares, dos handpans, el escenario, el MIDI y el Neotone.",
    "priceEssentialPromise": "Lo que de verdad tocas: transponer, tocar sin conexión, repetir un pasaje, exportar tus partituras.",
    "priceFreeCta": "Empezar gratis",
    "pricePerMonth": "/ mes",
    "priceTtc": "IVA incl.",
    "priceTrial": "1 mes de prueba gratuito",
    "priceComing": "Próximamente",
    "priceFree": {
      "name": "Gratis",
      "price": "",
      "blurb": "Una cuenta gratuita para descubrir el enfoque visual de la aplicación."
    },
    "priceTiers": {
      "essential": {
        "name": "Esencial",
        "blurb": "Tarjeta bancaria registrada al inscribirte; la suscripción empieza automáticamente tras el mes de prueba, se renueva cada mes y todo mes iniciado debe pagarse; puedes cancelarla en cualquier momento, con efecto el mes siguiente."
      },
      "studio": { "name": "Studio", "blurb": "" },
      "prof": { "name": "Profe", "blurb": "" }
    },
    "priceNote": "Precios con IVA incluido. La suscripción se contrata y se gestiona dentro de la aplicación.",
    "videosEyebrow": "La aplicación en movimiento",
    "videosTitle": "Mira Handpan Constellation Studio en acción",
    "videosIntro": "Doce videos de demostración de la aplicación: haz clic en una miniatura para verla en pantalla completa.",
    "videos": [
      {
        "t": "Elegir la tonalidad",
        "d": "Establece una nota de anclaje (en este caso, Do) y aparecerán los 7 grados de color."
      },
      {
        "t": "Escuchar la escala",
        "d": "La aplicación reproduce la escala nota por nota en el handpan."
      },
      {
        "t": "El ojo del grado",
        "d": "Haz clic en el ojo de un grado (aquí, el I) para aislar su acorde."
      },
      {
        "t": "Notas adicionales",
        "d": "Más allá de los 7 grados, se muestran notas adicionales con una estrella."
      },
      {
        "t": "Estilos de trazo",
        "d": "La misma Constelación, tres formas de leerla: Polígono, Abierto o Manos."
      },
      {
        "t": "Transponer",
        "d": "Mueve la nota de anclaje (Do → Fa): la forma del acorde se queda en el mismo lugar."
      },
      {
        "t": "Color ↔ chakra",
        "d": "Cada grado lleva el color de su chakra."
      },
      {
        "t": "Digitaciones",
        "d": "La aplicación propone una digitación sugerida, mano izquierda / mano derecha."
      },
      {
        "t": "Tocar los acordes",
        "d": "Inicia la reproducción: cada grado se ilumina a su turno y su acorde florece."
      },
      {
        "t": "Aprendizaje interactivo",
        "d": "El handpan se convierte en una superficie guiada: toca una nota de color."
      },
      {
        "t": "Atlas Sonoro",
        "d": "Explora una biblioteca de escalas de todo el mundo."
      },
      {
        "t": "Creación",
        "d": "Crea tu propia escala en la rueda cromática."
      }
    ],
    "faqEyebrow": "Preguntas frecuentes",
    "faqTitle": "Preguntas que me hacen sobre Handpan Constellation Studio",
    "faq": [
      {
        "q": "¿Necesitas un Neotone para usar Handpan Constellation Studio?",
        "a": "No. Handpan Constellation Studio funciona con cualquier handpan acústico, en el modo acústico gratuito, igual que con el handpan electrónico Neotone. No necesitas el instrumento electrónico para empezar."
      },
      {
        "q": "¿Handpan Constellation Studio funciona con un handpan acústico?",
        "a": "Sí, el modo acústico es gratuito. Puedes visualizar tu escala en color y aprender los acordes directamente en tu propio instrumento acústico."
      },
      {
        "q": "¿Qué son los ChromaKeys?",
        "a": "Es el sistema de colores del método: cada nota recibe un color fijo. Así ves la estructura de la música de un vistazo, sin solfeo."
      },
      {
        "q": "¿Qué es una Constelación de acordes?",
        "a": "Esta es la tablatura visual del método: cada acorde dibuja una figura geométrica que conecta sus notas. Reconoces y memorizas tus acordes por su forma."
      },
      {
        "q": "¿Handpan Constellation Studio es gratuito?",
        "a": "Handpan Constellation Studio reúne muchas funciones, y lo que es gratuito depende de cómo lo uses. Aprender handpan por tu cuenta, con tu propio instrumento acústico, es gratis: visualizar tu escala en colores, reconocer tus acordes, tocar, crear y exportar tus partituras. Es de pago lo que va más allá de tu práctica personal: el modo electrónico Neotone/MIDI, la creación avanzada, el guardado en la nube. Y si lo usas como herramienta de trabajo en clases que cobras, necesitas una Licencia Docente, con el espacio de alumnos, los ejercicios y las partituras sin marca de agua que la acompañan. Los precios actualizados están justo debajo."
      }
    ]
  },
  "showroom": {
    "title": "Probar un handpan en París: acústico y electrónico | David Lesage",
    "description": "Dónde probar un handpan en París, acústico y electrónico el mismo día: el Neotone, mis handpans Yishama y el arpa Gonilélé, en París (distrito 20).",
    "heroEyebrow": "Showroom David Lesage · Le Nid, París (distrito 20)",
    "heroTitle": "Probar un handpan en París: acústico y electrónico, el mismo día",
    "heroLead": "Un encuentro gratuito, unas quince personas, y todo lo que toco listo para ti: el Neotone como protagonista, mis handpans acústicos Yishama, el arpa africana Gonilélé, la calabaza y los micrófonos para handpan. Los escuchas, los tocas, el mismo día.",
    "promiseEyebrow": "Lo que vienes a vivir",
    "promiseTitle": "Una experiencia poco común, en un mismo lugar",
    "promiseLead": "Probar un Neotone gratis, y con él otros instrumentos poco comunes y sus accesorios: algo único en un mismo lugar. Pero lo valioso es la experiencia del encuentro: conmigo, con los instrumentos, con los demás, contigo mismo.",
    "promise": [
      {
        "t": "Conmigo",
        "d": "Haces tus preguntas y tienes las respuestas en vivo, de viva voz. No es una ficha de producto: es alguien frente a ti, que toca estos instrumentos todos los días y responde a todo el mundo, del principiante curioso al músico experimentado."
      },
      {
        "t": "Con los instrumentos",
        "d": "Vives tu propia experiencia del instrumento: tú eres quien toca. El Neotone, mis handpans acústicos, el arpa Gonilélé, la calabaza, los micrófonos: instrumentos poco comunes que no encontrarás reunidos en ningún otro lugar, y que tomas en tus manos sin tener que comprar nada."
      },
      {
        "t": "Con los demás",
        "d": "Conoces a otros apasionados. Somos unos quince, no más: por eso hablamos de verdad y se crean vínculos; las conversaciones siguen mucho después del final."
      },
      {
        "t": "Contigo mismo",
        "d": "Lo más difícil de contar, y lo único que nadie puede vivir por ti: lo que te provoca a ti poner las manos sobre estos instrumentos y oírte tocarlos."
      }
    ],
    "promiseNote": "También descubrirás Handpan Constellation Studio, la aplicación que creé para hacer visible la música. Y es gratis: el encuentro público no cuesta nada, solo tienes que reservar tu lugar.",
    "shareTitle": "Esto se vive mejor acompañado",
    "shareText": "Puedes venir con alguien; incluso suele ser mejor: te vas con alguien con quien comentarlo. Solo envíale esta página, y que cada quien reserve su lugar por su cuenta (una inscripción por persona, para que yo sepa cuántos seremos).",
    "shareCta": "Enviar esta página a alguien",
    "shareCopied": "Enlace copiado; ahora solo tienes que pegarlo.",
    "ctaBook": "Reservar una cita individual privada (de pago)",
    "ctaBookNote": "Cita individual de pago: {grid}. Los encuentros públicos, en cambio, son gratuitos: unas quince personas, no más, para que todos tengan tiempo de tocar · reserva necesaria.",
    "ctaNext": "Ver el próximo encuentro",
    "exclBadge": "★ Estreno mundial",
    "exclTitle": "Llévate tu Neotone¹ a casa el mismo día.",
    "exclText": "Lo asumo: que yo sepa, después del taller de fabricación en Budapest, Le Nid es el primer lugar del mundo donde estos instrumentos se prueban Y se compran directamente, ahí mismo. En concreto, significa que puedes comprar tu Neotone¹ aquí mismo y llevártelo de inmediato, sin ningún plazo de fabricación. Mis handpans Yishama, en cambio, no están a la venta: son mis instrumentos personales, están aquí para que se escuchen y se toquen.",
    "exclArgs": [
      "7 % de descuento: el mejor precio del mercado (frente al 5 % en línea)",
      "Sin plazo de fabricación ni espera",
      "Stock muy limitado: solo unos pocos instrumentos disponibles"
    ],
    "franceClaim": "El único lugar en Francia donde se pueden probar y comprar directamente estos instrumentos.",
    "onsiteEyebrow": "En el lugar",
    "onsiteTitle": "Todo lo que puedes probar allí: handpans acústicos, Neotone, micrófonos",
    "duoEyebrow": "Los dos mundos del handpan",
    "duoTitle": "Handpan acústico y electrónico, el mismo día.",
    "duoIntro": "El showroom no está para que elijas un bando. Los dos mundos conviven ahí: los escuchas, los tocas, sientes la diferencia en tus manos. No hay competencia, solo complementariedad.",
    "duo": [
      {
        "sub": "Acústico · Yishama",
        "title": "Mis dos handpans Yishama",
        "text": "Mis instrumentos personales están ahí. Los tocas, los comparas y escuchas lo que hace el metal martillado en una habitación, primero sin amplificar y luego amplificado.",
        "points": [
          "Dos instrumentos de 18 notas, afinados a 432 Hz.",
          "Amplificados con los micrófonos Hisong y Muling"
        ],
        "cta": "Mi historia con Yishama"
      },
      {
        "sub": "Electrónico · Neotone",
        "title": "Los dos Neotone",
        "text": "Uno con altavoz, el otro con auriculares. Pasas de una escala a otra, pruebas los efectos y la grabadora, el tiempo que necesites.",
        "points": [
          "Todas las escalas en un solo instrumento.",
          "Uno con altavoz, otro con auriculares, efectos incluidos"
        ],
        "cta": "Descubrir el Neotone"
      }
    ],
    "duoNote": "Para que quede claro: aquí solo el Neotone está en stock; es el único que puedes llevarte el mismo día. Los Yishama son mis instrumentos personales: están aquí para que los escuches y los toques, y si quieres el tuyo, te oriento hacia el taller (soy embajador y afiliado).",
    "alsoEyebrow": "Y no solo el handpan",
    "alsoTitle": "El resto de lo que toco también está ahí.",
    "alsoIntro": "El Neotone es el protagonista del encuentro, pero no tienes que venir por él. Estos instrumentos también están listos para ti, y puedes tomarlos en tus manos igual que los handpans.",
    "also": [
      {
        "title": "El arpa Gonilélé",
        "text": "El arpa-laúd de África Occidental de La Maison du Ngoni, en versión de viaje: caja de calabaza, mástil de madera noble, cuerdas afinadas en escala pentatónica. Intuitiva y meditativa: se toca sin saber nada.",
        "cta": "Descubrir el Gonilélé"
      },
      {
        "title": "La calabaza",
        "text": "Toco la calabaza como instrumento de percusión desde 2012. También es el corazón de mi método de ritmo Now Groove: una batería orgánica de sonido natural, con su tapete y sus shakers.",
        "cta": "Ver el kit de calabaza"
      },
      {
        "title": "Micrófonos para handpan",
        "text": "El Hisong AirStudio S1 y el set Muling (MP1 + preamplificador HMP-2). Los conectamos a mis handpans acústicos y escuchas en vivo, de un oído al otro, lo que cambia cada uno.",
        "cta": "Ver los micrófonos"
      }
    ],
    "alsoNote": "¿Vienes por uno en particular? Márcalo al reservar tu lugar: lo preparo para la sesión.",
    "tambourEyebrow": "Socio · L'Âme du Tambour",
    "tambourTitle": "El tambor chamánico",
    "tambourText": "Los tambores de marco artesanales de Julien, «L'Âme du Tambour», un fabricante coherente, apasionado e íntegro. El tambor no está en todas las sesiones: sale según las personas presentes y lo que les interesa. Dime si te atrae cuando reserves y lo tengo en cuenta.",
    "tambourCta": "Ver el tambor en la tienda",
    "alsoAlt": {
      "gonileleProduit": "El arpa Gonilélé colocada contra el tronco de un árbol: cuerpo redondo de calabaza cubierto de piel, mástil largo de madera clara tallada y diez cuerdas tensadas hacia el mecanismo.",
      "calebasse": "El kit de calabaza Now Groove: una media calabaza colocada boca abajo sobre un gran tapete de piel, con dos shakers azules en forma de huevo.",
      "hisong": "Un handpan acústico colocado sobre un tapete, junto al micrófono Hisong AirStudio S1 en su soporte, sus auriculares y la tableta que muestra la aplicación de ajuste del micrófono.",
      "muling": "La parte inferior de un handpan acústico equipado con el kit Muling: dos cápsulas de contacto rojas pegadas al cuerpo, conectadas mediante sus cables al preamplificador HMP-2 colocado en el suelo."
    },
    "atlasEyebrow": "Nuevo · Socio Atlas",
    "atlasTitle": "Y con qué apoyar tu handpan",
    "atlasIntro": "Atlas fabrica en Italia trípodes para handpan: el instrumento descansa sobre un disco flotante sujeto por ocho imanes antirrayones, sin tornillos ni correas que apretar sobre el metal. Me convertí en socio de la marca, que me envió sus dos modelos para demostración. Están aquí, junto a los handpans: podrás apoyar un instrumento encima y ajustar la altura tú mismo.",
    "atlasModels": [
      {
        "name": "Atlas Pro",
        "text": "De aluminio, 1,8 kg. Sus patas telescópicas se ajustan de forma continua de 51 a 109 cm, se pliega en segundos y viaja en su bolsa, incluida."
      },
      {
        "name": "Atlas All",
        "text": "De madera, de 50 a 96 cm. Su cabezal se encaja entre las piernas para tocar sentado sin apoyar el instrumento en los muslos; luego se le atornillan las patas y las extensiones para tocar de pie."
      }
    ],
    "atlasCta": "Todo sobre los soportes Atlas",
    "lieuEyebrow": "El lugar · Le Nid",
    "lieuTitle": "¿Cómo es un encuentro en Le Nid (París, distrito 20)?",
    "lieuIntro": "Un apartamento-taller del distrito 20, parqué, guirnaldas, y todos sentados en círculo alrededor de los instrumentos. Somos unos quince, no más.",
    "photoAlt": {
      "accueil": "David Lesage, con los brazos abiertos, recibe de pie en el centro de la gran sala del showroom: parqué antiguo, paredes blancas bajo vigas a la vista, una roseta en la pared, un handpan sobre su trípode detrás de él, cojines y un sofá bajo al fondo. (El título «David Lesage Showroom» aparece superpuesto en la imagen.)",
      "vueEnsemble": "Panorama general de una reunión en Le Nid: David Lesage sentado en el centro del círculo, con handpans sobre soportes detrás de él, el público sentado en el suelo, las paredes cubiertas de guirnaldas de luces y una roseta suspendida.",
      "instruments": "Los instrumentos instalados en el showroom antes de la llegada del público: dos handpans acústicos Yishama sobre trípodes, dos handpans electrónicos Neotone con su pantalla, una calabaza sobre una alfombra roja, todo sobre un parqué antiguo.",
      "presentation": "David Lesage, micrófono en mano, presenta los instrumentos del showroom: los Neotone y los handpans Yishama alineados detrás de él, bajo el rosetón de la pared.",
      "gonilele": "David Lesage sostiene el Gonilélé, el arpa africana hecha con una calabaza, y muestra el micrófono Hisong AirStudio S1 que se utiliza para amplificarlo.",
      "grandePiece": "La sala grande del showroom durante el día, antes de que llegue el público: suelo de parqué antiguo, sofá bajo y cojines directamente en el suelo, un handpan acústico sobre su trípode al fondo, una guitarra colgada en la pared, plantas y colchonetas enrolladas en una cesta."
    },
    "photoCaption": {
      "vueEnsemble": "Un encuentro en Le Nid: el público sentado en círculo, los instrumentos en el centro.",
      "grandePiece": "La misma sala durante el día, antes de que esté todo instalado.",
      "instruments": "Lo que te espera al llegar: los Neotone, mis handpans Yishama, el Gonilélé, la calabaza, los micrófonos y el tambor chamánico, listos para tocar.",
      "presentation": "El momento de la presentación, antes de que pongas las manos en los instrumentos.",
      "gonilele": "El Gonilélé, el arpa africana hecha con una calabaza, y el micrófono que la amplifica."
    },
    "galleryEyebrow": "En imágenes",
    "galleryTitle": "Los instrumentos y el equipo, de más cerca",
    "galleryIntro": "Desliza con el dedo o haz clic en una foto para ampliarla.",
    "galleryAltFallback": "Foto del showroom de David Lesage: Le Nid, París (distrito 20).",
    "galleryAlt": {
      "demoNeotone1": "David Lesage de pie, en plena demostración: sostiene un handpan electrónico Neotone frente al público sentado, delante de la pared de guirnaldas de luces.",
      "demoNeotone2": "Vista más amplia de la demostración del Neotone: David Lesage de pie en el centro de la sala, los espectadores sentados en círculo sobre el suelo de parqué.",
      "gonileleMicro": "El Gonilélé en horizontal, con las cuerdas hacia arriba, junto a la caja del micrófono Hisong AirStudio S1 y su cápsula sobre un soporte.",
      "yishamaMicros": "Un handpan Yishama visto desde arriba, dos cápsulas de micrófono colocadas en la cúpula y cuatro cajas de micrófono Hisong AirStudio S1 dispuestas a su alrededor.",
      "tabletteAccords": "Tableta montada sobre un handpan: la aplicación Handpan Constellation Studio muestra los siete acordes de la escala D Kurd 18 en constelaciones de colores.",
      "handpanTablette": "Un handpan Yishama sobre su trípode, con la tableta fijada en un brazo justo encima: las constelaciones de acordes se muestran alineadas con el instrumento.",
      "salonInstruments": "La zona de estar del showroom: un handpan acústico en el suelo junto a la mesa de centro, un handpan electrónico Neotone de madera con sus auriculares sobre los cojines, un gran sofá naranja, un ramo de flores y la pared de guirnaldas de luces al fondo.",
      "sonoBose": "Un handpan electrónico Neotone de madera sobre su trípode, junto al sistema de sonido del showroom: una columna Bose L1 Model II y su consola de mezcla T8S, apoyada sobre los subwoofers."
    },
    "eventsEyebrow": "Lo que vivimos allí",
    "eventsTitle": "Probar, conocerse, llevárselo",
    "individualEyebrow": "Sesión individual · con cita previa",
    "eventsHighlight": "Lo más solicitado para empezar",
    "events": [
      {
        "t": "Encuentro Neotone y descubrimiento de los instrumentos",
        "d": "El encuentro público y gratuito de Le Nid: David Lesage presenta los Neotone. Después puedes probarlo todo allí mismo: handpans acústicos Yishama, arpa africana Gonilélé, calabaza y micrófonos para handpan.",
        "price": "Público · Gratuito"
      },
      {
        "t": "Primeros pasos con tu instrumento",
        "d": "¿Acabas de recibir tu Neotone, tu handpan o tu micrófono? Lo configuramos todo juntos y aprendemos a manejarlo paso a paso. En persona o por videollamada.",
        "price": ""
      },
      {
        "t": "Descubrimiento de instrumentos",
        "d": "Una sesión privada en el showroom para probar a fondo todo lo que te interese: handpans acústicos Yishama, Neotone, calabaza, Gonilélé, micrófonos Hisong y Muling.",
        "price": ""
      },
      {
        "t": "Clases o acompañamiento individual",
        "d": "Con David Lesage, sea cual sea tu nivel: crear tus escalas, tocar temas y técnicas, o simplemente aclarar qué estás buscando. En persona o por videollamada.",
        "price": ""
      }
    ],
    "programEyebrow": "El desarrollo",
    "programTitle": "El programa de una sesión",
    "programIntro": "Cada sesión dura unas 2 horas: un tiempo para escuchar, ver demostraciones y conversar, y luego llega el momento en que tocas tú.",
    "program": [
      {
        "t": "Neotone en vivo",
        "d": "Toco delante de ustedes: primero el sonido en bruto, luego con efectos (octavador, reverberación, looper) y cantando; la interfaz se proyecta en la pantalla."
      },
      {
        "t": "Handpan Constellation Studio, la aplicación que hace visible la música",
        "d": "Demostración en vivo: colores, constelaciones de acordes y cómo aprendemos viendo la música en lugar de descifrar partituras."
      },
      {
        "t": "Sonido acústico y micrófonos",
        "d": "Mis dos handpans acústicos Yishama, amplificados con micrófonos Hisong y Muling, para compararlos y escuchar la diferencia."
      },
      {
        "t": "El Gonilélé y la calabaza",
        "d": "El arpa africana Gonilélé y la calabaza también salen: las toco, explico cómo acercarse a ellas, y si viniste por ellas, estás justo en el lugar indicado."
      },
      {
        "t": "Sus preguntas",
        "d": "Un espacio de intercambio abierto: respondo a todos, desde el principiante curioso hasta el músico experimentado."
      },
      {
        "t": "Su turno de tocar",
        "d": "Prueben los dos Neotone (uno con altavoz, el otro con auriculares) y mis dos handpans acústicos Yishama. Tómense el tiempo de sentir cada instrumento. El Gonilélé y la calabaza también están ahí: tómenlos en sus manos."
      }
    ],
    "programBonusTitle": "Y a veces, va más allá",
    "programBonus": "Según el público interesado, la sesión puede abrirse más: una demostración del Gonilélé en situación real (con los efectos y el pedal de octavador, en un sistema de sonido Bose profesional, en condiciones de concierto), la calabaza e incluso el tambor chamánico «El Alma del Tambor». No es sistemático: depende de las personas presentes ese día y de lo que les interese. Cuéntame qué te atrae y lo tendré en cuenta.",
    "programNote": "Los niños son bienvenidos, bajo la responsabilidad de sus padres. La parte de demostración, charla y preguntas puede resultar un poco larga para los más pequeños: si hace falta, prevean una actividad tranquila o el relevo de otro adulto.",
    "booking": "Las citas se reservan solo a través del formulario: lo completas, tu solicitud me llega y te respondo personalmente.",
    "bookVisitCta": "Reservar mi turno en el showroom (de pago)",
    "bookPrivateCta": "Reservar una cita individual",
    "agendaEyebrow": "Agenda",
    "agendaTitle": "Probar un handpan en París: las próximas fechas, gratuitas",
    "agendaIntro": "Presentación de los Neotone por David Lesage, y descubrimiento de todo lo que se toca en Le Nid: handpans acústicos Yishama, arpa africana Gonilélé, calabaza, micrófonos para handpan. Todo se puede probar allí mismo. Gratis: unas quince personas, no más, para que cada uno tenga tiempo de tocar · reserva necesaria.",
    "agendaEmpty": "Próximas fechas por anunciar",
    "agendaEmptyText": "Las próximas fechas se están definiendo. Déjame tu correo electrónico: te aviso primero, antes del anuncio público.",
    "agendaEmptyCta": "Avisarme de la próxima fecha",
    "agendaNextLabel": "Próximo encuentro gratuito",
    "agendaCount": "{n} próxima fecha",
    "agendaCountPlural": "{n} próximas fechas",
    "agendaSeats": "Gratis con reserva · unas quince personas, no más",
    "agendaCta": "Avisarme de los próximos encuentros",
    "agendaEventTitle": "Encuentro Neotone, y todos los instrumentos para probar",
    "agendaEventTag": "Público · Gratuito",
    "agendaEventTime": "de {start} a {end}",
    "agendaRulesTitle": "Cosas que debes saber antes de venir",
    "agendaRuleTimeTitle": "La fecha la eliges tú; la hora de inicio, no",
    "agendaRuleTime": "La sesión empieza a la hora, con una presentación. Llegar tarde es perderse información y obligar a todo el grupo a volver atrás. Si llegas antes, puedes esperar abajo en el patio, sin problema.",
    "agendaRuleDurationTitle": "Calcula tiempo de sobra",
    "agendaRuleDuration": "El programa dura unas 2 horas; en la práctica, suele rondar las 3 horas, porque las conversaciones siguen mucho después.",
    "agendaRuleShareTitle": "Trae algo para compartir, si tienes ganas",
    "agendaRuleShare": "Un jugo de frutas, un pastel, algo para ofrecer a los demás. Es totalmente opcional, nunca una condición para venir: simplemente es un espíritu de compartir, para que el momento sea acogedor.",
    "agendaBookCta": "Reservar mi lugar",
    "agendaMoreTitle": "¿No puedes venir, o prefieres un momento solo para ti?",
    "agendaMoreText": "Reserva una cita individual conmigo en otro momento que te convenga.",
    "accessEyebrow": "Cómo llegar",
    "accessTitle": "Venir al showroom, París (distrito 20)",
    "accessMaps": "Ver en Google Maps →",
    "access": [
      {
        "icon": "🚌",
        "t": "Autobús",
        "d": "Líneas 26 y 64: parada Orteaux, 3 min a pie (≈ 250 m). Línea 76: parada Bagnolet-Orteaux."
      },
      {
        "icon": "🚇",
        "t": "Metro",
        "d": "Línea 9: Maraîchers (5-7 min) o Buzenval (10 min). Línea 2: Alexandre Dumas (10 min)."
      },
      {
        "icon": "🚊",
        "t": "Tranvía",
        "d": "Línea T3b: estación Marie de Miribel (12 min a pie)."
      }
    ]
  },
  "about": {
    "title": "Acerca de: David Lesage, músico, educador e inventor",
    "description": "David Lesage, baterista de formación que se volvió handpanista y cantante: el Conservatorio, The Voice, Naxos y la escena internacional del handpan.",
    "heroEyebrow": "Acerca de",
    "heroTitle": "Baterista de formación, handpanista, cantante y creador de herramientas",
    "heroLead": "Soy David Lesage: baterista de formación, luego handpanista, cantante, pedagogo y creador de herramientas. Esta es mi trayectoria, en orden, con sus fechas.",
    "heroImgAlt": "David Lesage, músico",
    "heroCtaStory": "Leer la historia",
    "heroCtaToday": "Lo que hago hoy",
    "storyEyebrow": "Mi historia",
    "storyTitle": "De la batería al handpan, dando un largo rodeo",
    "storyIntro": "Los pasos, encuentros y fechas que me llevaron a los instrumentos que toco y a las herramientas que construyo.",
    "chapters": [
      {
        "eyebrow": "Los comienzos",
        "title": "La batería a los 4 años, luego el solfeo",
        "paras": [
          "Empecé la música a los 4 años, con la batería. Desde mi primera clase, me impusieron la lectura de partituras. Lo dejé todo y aprendí de forma autodidacta, de oído.",
          "Volví a ella por los estudios, en este orden: primero, cuatro años en el colegio de jazz de Marciac (la sección de jazz vinculada al festival, apadrinada por Wynton Marsalis), donde descubrí la improvisación vocal; luego el liceo, con un bachillerato <strong>TMD (Técnica de Música y Danza)</strong>, obtenido en 2012 en el liceo Saint-Sernin de Toulouse. Es el equivalente de un programa de deporte y estudios, pero de música y estudios; también se habla de horarios adaptados. Después, cuatro años en el Conservatorio de Toulouse, del que salí en 2013 con el primer premio de batería, con mención sobresaliente.",
          "Para «ponerme al día», tenía 7 h 30 de clases de solfeo por semana, en 4 niveles diferentes. Todavía no sé leer música… de tan desconectada que estaba la pedagogía de la sensación y del sentido, con un enfoque orientado únicamente a la música clásica."
        ]
      },
      {
        "eyebrow": "Los desvíos",
        "title": "Video, formación, realidad virtual",
        "paras": [
          "Formé bandas, aprendí la grabación y la edición de video, en 2017 me uní al equipo de Thierry Vanoffe como formador y creador de los videos del canal Numéricoach, y a partir de 2020 trabajé en Aora Mana (una de las primeras plataformas de viajes iniciáticos en realidad virtual) como camarógrafo, realizador, editor de realidad virtual 360° y piloto de dron.",
          "Me presenté a las audiciones a ciegas de The Voice en TF1, temporada 11, con un canto africano: <em>Koth Biro</em>, grabadas el 21 de diciembre de 2021 y transmitidas el 12 de febrero de 2022. Después del programa, me invitaron a dar un concierto como solista en Costa de Marfil.",
          "Trabajando como formador Google, me di cuenta de lo hábil que soy para encontrar soluciones técnicas y tecnológicas a los problemas de la gente. Pero ya mucho antes me ocupaba del sonido de las conferencias del Salon Santé Nature, en Flourens (el salón cambió varias veces de lugar), y de su parque informático. Siempre ayudé a la gente a encontrar trucos y soluciones a sus problemas informáticos."
        ]
      },
      {
        "eyebrow": "Transmitir",
        "title": "La calabaza, Now Groove y el ngoni",
        "paras": [
          "Llevo tocando la calabaza, como instrumento de percusión, desde 2012.",
          "En la calabaza me faltaban la caja y el hi-hat. Resolví esa falta con huevos de plástico: un invento casero que se convirtió en una forma de tocar y luego en una forma de enseñar.",
          "Así nació Now Groove (2021): un método de ritmo con llamada y respuesta y emojis visuales, que funciona con cincuenta personas en la misma sala.",
          "En 2018, cuando estaba devastado por una ruptura amorosa, mi terapeuta Fred Hervaud me puso en las manos su propio N’Goni: así conocí el instrumento. En 2023 comenzó mi colaboración con Joris Feuillâtre, en torno al arpa gonilélé, que hoy transmito como embajador de La Maison du Ngoni. Mis clases y mis talleres funcionan bajo Now Music Academy, con el respaldo de la asociación Résonances Productions."
        ]
      },
      {
        "eyebrow": "El canto",
        "title": "Marie-Christine Reculard y el canto holístico",
        "paras": [
          "Marie-Christine Reculard es mi profesora de canto. Creó <em>Le Chant Holistique</em>, que describe en su sitio como «un método único de canto terapéutico y energético por medio de la voz, los colores, las vocales sagradas, los mantras, el yoga y las técnicas de respiración». Su sitio: <a href=\"https://www.mariechristinereculard.com/\" target=\"_blank\" rel=\"noopener\" class=\"underline\">mariechristinereculard.com</a>.",
          "Su método me inspiró, sobre todo para un modo «Cantar y Tocar» (cantar acompañándose con el handpan) en el que trabajo para Handpan Constellation Studio. Todavía está en fase de laboratorio: hoy no está disponible en la aplicación."
        ]
      },
      {
        "eyebrow": "Naxos, Grecia · junio de 2022",
        "title": "El concierto que me introdujo en el mundo del handpan",
        "paras": [
          "Actúo en el Festival HONA de Agia Anna. Cuando llego, no soy nadie: el escenario es diminuto, el sistema de sonido es deficiente y no hay monitores. Pero ofrezco algo nunca antes visto: canto, toco tres handpans a la vez y hago percusión con los pies y las manos.",
          "Al día siguiente, me crucé con un hombre en el bar al aire libre del festival. No sabía quién era; me explicaron que era uno de los mejores fabricantes de handpans del mundo. Era Yonathan, de Yishama. Me escuchó largo rato, con calma, y no intentó venderme sus instrumentos.",
          "Ese mismo verano, me pusieron en las manos el primerísimo Neotone en versión beta. Un mes después toqué en el festival HUG, en Hungría, pasé por el taller y me fui con un Neotone beta y un compromiso claro: reportar los errores y ayudar a hacer evolucionar el instrumento. Lo hago desde entonces: miles de comentarios después, conozco personalmente a Csaba, Norbert y al equipo de Soundventure en Budapest."
        ]
      },
      {
        "eyebrow": "Mayo de 2023 → agosto de 2023",
        "title": "Dos instrumentos magníficos, y ningún manual de instrucciones",
        "paras": [
          "En mayo de 2023 recibí los dos handpans que Yonathan diseñó para mí: dieciocho notas cada uno, afinados en 432 Hz, pensados para una sola cosa: que yo pudiera cantar acompañándome, en cualquier tonalidad.",
          "No existía ningún método. El handpan es un instrumento del siglo XXI, todavía en plena evolución, a menudo modal, y hay casi tantas distribuciones de notas como instrumentos.",
          "En agosto de 2023 abrí un documento, solo para lograr ver qué acordes podía hacer en mis propios instrumentos. Unos meses después, Yonathan me sugirió convertirlo en un pequeño cuadernillo de acordes, para mí. Hice el cuadernillo. Se convirtió en una aplicación."
        ]
      }
    ],
    "quoteNaxos": "En ese momento, no me di cuenta de que estaba entrando en un círculo ultraprivado del mundo internacional del handpan.",
    "quoteNaxosSource": "Lo que cuento de este concierto",
    "quoteShips": "Es como si tuviera dos naves espaciales, pero no supiera pilotarlas.",
    "quoteShipsSource": "Mis dos Yishama, los primeros meses",
    "linkYishama": "Mi historia con Yonathan y mis dos Yishama",
    "linkApp": "Descubrir Handpan Constellation Studio",
    "todayEyebrow": "Hoy · París 20",
    "todayTitle": "Músico, profesor y creador de herramientas",
    "todayIntro": "Soy intermitente del espectáculo (Francia) y vivo en París. Le Nid, en el número 29 de la rue des Orteaux, en el distrito 20, es el lugar que llevo adelante con Iris Chasles, abierto el 13 de marzo de 2026: un lugar a escala humana, en el este de París, donde recibimos a grupos pequeños. Allí se cruzan cinco propuestas (conciertos, taller de ritmo con calabaza, clases individuales, taller de yoga y acompañamiento psicocorporal), a las que se suman las presentaciones de instrumentos, gratuitas y con inscripción. Puedes tocar, probar, escuchar y llevarte tu Neotone el mismo día. Mis dos Yishama también están allí, no a la venta, solo para que se toquen. El programa completo lo publica la asociación Résonances Productions.",
    "today": [
      {
        "t": "Toco",
        "d": "Handpan, voz, calabaza y ngoni en el escenario: 112 fechas registradas entre 2009 y 2026, en 7 países, entre ellas 21 en Jazz in Marciac, dos ediciones del Sziget en Budapest, el Everness Festival en Hungría y la apertura de un concierto de Amadou &amp; Mariam. Dos discos grabados bajo el título L’Alliance du Phoenix, y encuentros gratuitos en Le Nid casi todos los meses."
      },
      {
        "t": "Enseño",
        "d": "Now Music Academy: handpan, ritmo con calabaza y arpa gonilélé, por videollamada en todo el mundo o en persona en París. Respondo personalmente."
      },
      {
        "t": "Construyo",
        "d": "Handpan Constellation Studio hace visible la armonía a través de los colores, las formas y las emociones. Guso Facile hace lo mismo con los trámites administrativos de los intermitentes del espectáculo."
      },
      {
        "t": "Hago de puente",
        "d": "Probador beta de Neotone (Soundventure, Budapest), embajador y afiliado de Yishama, embajador de La Maison du Ngoni."
      }
    ],
    "milestonesEyebrow": "Referencias",
    "milestonesTitle": "Algunos hitos con fecha",
    "milestones": [
      {
        "y": "2012",
        "t": "Bachillerato TMD (Técnica de Música y Danza), liceo Saint-Sernin, Toulouse."
      },
      {
        "y": "2012",
        "t": "Empiezo a tocar la calabaza, como instrumento de percusión."
      },
      {
        "y": "2013",
        "t": "Primer premio de batería, con mención sobresaliente (Conservatorio de Toulouse)."
      },
      {
        "y": "2018",
        "t": "Descubro el ngoni, el de mi terapeuta, Fred Hervaud."
      },
      {
        "y": "2021",
        "t": "Now Groove: mi método visual de ritmo con calabaza."
      },
      {
        "y": "Febrero de 2022",
        "t": "The Voice, temporada 11 (TF1): audición a ciegas grabada el 21/12/2021, transmitida el 12/02/2022. Luego, un concierto como solista en Costa de Marfil."
      },
      {
        "y": "Junio de 2022",
        "t": "Festival HONA, Naxos. Encuentro con Yonathan (Yishama), primer Neotone beta en mano."
      },
      {
        "y": "Julio de 2022",
        "t": "Festival HUG, Hungría. Salgo del taller con un Neotone beta."
      },
      {
        "y": "2023",
        "t": "Comienzo de mi colaboración con Joris Feuillâtre (arpa gonilélé)."
      },
      {
        "y": "Mayo de 2023",
        "t": "Recibo mis dos handpans Yishama: 18 notas cada uno, 432 Hz."
      },
      {
        "y": "Agosto de 2023",
        "t": "El documento que se convertiría en Handpan Constellation Studio."
      },
      {
        "y": "13 de marzo de 2026",
        "t": "Inauguración de Le Nid, 29 rue des Orteaux, París (distrito 20)."
      },
      {
        "y": "Hoy",
        "t": "Le Nid, París (distrito 20): clases, pruebas de instrumentos y encuentros."
      }
    ],
    "visionEyebrow": "Mi visión pedagógica",
    "visionTitle": "El handpan, un instrumento de acompañamiento por derecho propio",
    "visionIntro": "Con este enfoque, el handpan por fin ocupa su lugar junto a la guitarra y el piano. Gracias a los « 4 Mágicos » (I-IV-V-VI), cualquiera puede acompañar los temas que le gustan en pocos minutos, y abordar la teoría como un juego.",
    "pillars": [
      {
        "t": "Visible",
        "d": "El color, la geometría y la emoción sustituyen a la jerga. Vemos la música antes de ponerle nombre."
      },
      {
        "t": "Accesible",
        "d": "Tuteo, sencillez, calidez. Del niño curioso al músico experimentado, respondo personalmente."
      },
      {
        "t": "Verificable",
        "d": "Conservatorio de Toulouse, escenario, prueba beta de Neotone de larga duración: referencias fechadas que cualquiera puede verificar."
      }
    ],
    "proofsEyebrow": "Mis referencias",
    "proofsTitle": "Credibilidad y trayectoria",
    "proofsIntro": "Referencias fechadas y verificables.",
    "proofs": [
      "Primer premio de batería, con mención sobresaliente · Conservatorio de Toulouse (2013)",
      "Escuela de jazz de Marciac · cuatro años",
      "Extensión vocal de cinco octavas",
      "The Voice, temporada 11 · audición a ciegas (TF1, 12/02/2022)",
      "112 actuaciones registradas · 2009–2026, 7 países",
      "Intermitente del espectáculo",
      "Probador beta de Neotone (Soundventure, Budapest)",
      "Embajador y afiliado de Yishama",
      "Embajador de La Maison du Ngoni",
      "Le Nid · 29 rue des Orteaux, París (distrito 20)",
      "Résonances Productions · asociación según la ley de 1901",
      "L’Alliance du Phoenix · Opus I y II"
    ],
    "collabEyebrow": "Colaboraciones",
    "collabTitle": "¿Tienes un proyecto? Hablemos.",
    "collabIntro": "Pedagogía musical, handpan, mis herramientas, o cualquier otro proyecto, incluso fuera de Neotone. Marcas, organizadores, medios, colaboradores: la puerta está abierta.",
    "collabCta1": "Trabajemos juntos",
    "collabCta2": "Contactarme"
  },
  "contact": {
    "title": "Contacto: David Lesage, músico y pedagogo",
    "description": "Respondo personalmente cada mensaje: soy músico, no un servicio de atención al cliente. Para tu compra, tus clases, la aplicación o una colaboración, escríbeme.",
    "eyebrow": "Contacto",
    "title2": "¿Tienes alguna pregunta? Hablemos.",
    "intro": "Respondo personalmente cada mensaje: no soy un servicio de atención al cliente, sino un músico que toca el Neotone a diario. Para elegir tu modelo, tu madera u organizar tu visita, escríbeme. Los Neotone no se alquilan ni se prestan: para probar uno, ven al showroom.",
    "coords": {
      "email": "Correo electrónico: respuesta rápida",
      "phone": "Teléfono",
      "showroom": "Showroom · con cita previa"
    },
    "form": {
      "name": "Nombre y apellido",
      "email": "Correo electrónico",
      "phone": "Teléfono",
      "phoneHelp": "Para que pueda devolverte la llamada rápidamente.",
      "phoneError": "Indica un número de teléfono válido (de 8 a 15 dígitos, se acepta el prefijo internacional: +33, +1…).",
      "subject": "Asunto",
      "message": "Mensaje",
      "submit": "Escribirme",
      "note": "Si no, escríbeme directamente a"
    },
    "subjects": [
      "Compra de un Neotone",
      "Clases",
      "Handpan Constellation Studio",
      "Colaboración",
      "Prensa",
      "Otro"
    ]
  },
  "legal": {
    "title": "Aviso legal | David Lesage",
    "description": "Aviso legal y condiciones del sitio de David Lesage: editor, alojamiento, propiedad intelectual, precios e IVA. Showroom en 29 rue des Orteaux, París (distrito 20).",
    "h1": "Aviso legal del sitio de David Lesage",
    "blocks": [
      {
        "h": "Editor",
        "p": "David Lesage, músico, pedagogo e inventor. Showroom: 29 rue des Orteaux, 75020 París. Correo electrónico: contact@lesagedavid.fr · Teléfono: +33 6 10 73 31 52."
      },
      {
        "h": "Alojamiento",
        "p": "Sitio estático generado con Astro, alojado por Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, Estados Unidos (vercel.com). Nombre de dominio gestionado por OVH SAS, 2 rue Kellermann, 59100 Roubaix, Francia."
      },
      {
        "h": "Propiedad intelectual",
        "p": "Los contenidos, textos, fotografías y videos de este sitio son propiedad de sus respectivos autores. Las fotografías y especificaciones de los productos Neotone provienen de la documentación oficial de Soundventure Ltd. David Lesage es embajador independiente de Neotone."
      },
      {
        "h": "Precios e IVA",
        "p": "Todos los precios mostrados son orientativos y pueden cambiar sin previo aviso. Las tasas de IVA que aplica la calculadora son las tasas estándar vigentes en 2026; los aranceles aduaneros fuera de la UE corren por cuenta del comprador."
      }
    ]
  },
  "terms": {
    "title": "Condiciones generales · David Lesage",
    "description": "Condiciones generales del sitio de David Lesage: qué datos recopilo en los formularios, por qué, con qué herramientas, cuánto tiempo los conservo y cómo ejercer tus derechos.",
    "h1": "Condiciones generales",
    "versionLabel": "Versión",
    "version": "2026-08-19",
    "updatedLabel": "Última actualización",
    "updated": "19 de agosto de 2026",
    "lead": "Esta página explica claramente qué sucede cuando completas un formulario en este sitio: qué información recopilo, por qué, con qué herramientas, cuánto tiempo la conservo y cómo puedes recuperar el control cuando quieras. Sin tecnicismos. Si algo no te queda claro, escríbeme; yo soy quien lee los mensajes.",
    "inProgress": "Este documento acompaña la puesta en marcha de un ecosistema todavía en construcción: el sitio, la aplicación, el showroom y las colaboraciones con los fabricantes se van instalando poco a poco. Por eso irá cambiando a medida que avance. La versión vigente es la indicada arriba, y es la que aceptas al marcar la casilla de un formulario.",
    "sections": [
      {
        "h": "¿Quién es el responsable?",
        "p": "David Lesage: músico, pedagogo e inventor. Showroom: 29 rue des Orteaux, 75020 París. Correo electrónico: contact@lesagedavid.fr · Teléfono: +33 6 10 73 31 52. Detrás de este sitio no hay ningún departamento de marketing: yo decido qué se recopila, yo lo leo y yo te respondo.",
        "items": []
      },
      {
        "h": "Mi papel y quién recibe el dinero",
        "p": "Mejor decirlo de entrada, así se evitan malentendidos: en este sitio presento instrumentos fabricados por socios (Neotone, Yishama, los micrófonos, las arpas Gonilélé). Intervengo como demostrador y no recibo ninguna remuneración directa por estas ventas.",
        "items": [
          "Estas colaboraciones son de afiliación: generan una remuneración, y quien la recibe es la asociación Résonances Productions (asociación sin fines de lucro regida por la ley francesa de 1901), no yo a título personal.",
          "Para que sepas exactamente de quién se trata, estos son sus datos de identificación: Résonances Productions, asociación sin fines de lucro regida por la ley francesa de 1901, declarada en la subprefectura de Pamiers y publicada en el Journal officiel des associations el 28 de octubre de 2017, con n.º RNA W092002501, SIRET 919 514 075 00010, código APE 9001Z (artes escénicas). Domicilio social: 2 impasse des Bleuets, 09600 Aigues-Vives. Dirección postal: 29 rue des Orteaux, 75020 París. Correo electrónico: contact@resonancesproductions.org.",
          "Esta identificación solo dice quién recibe esas sumas, y nada más: el editor de este sitio es David Lesage, persona física, y es él el responsable de esta página y de tus datos, como se indica justo arriba y en el aviso legal.",
          "Esto no cambia nada de lo que te digo sobre un instrumento: te respondo como músico que toca estos instrumentos a diario, y prefiero decirte que un instrumento no es para ti antes que vendértelo.",
          "En este sitio no se cobra ningún pago, ni lo cobro yo. Las compras se hacen en otro lugar: en la tienda HelloAsso de Résonances Productions, en la aplicación para su suscripción, o directamente con el fabricante en el caso de un micrófono Muling.",
          "Suscripción a la aplicación (plan Esencial, 3,49 € IVA incluido al mes): empieza con un mes de prueba gratuito, para el que se registra una tarjeta bancaria al inscribirte. Si no la cancelas antes del final de la prueba, la suscripción empieza automáticamente y se renueva cada mes por tácita reconducción. Todo mes iniciado debe pagarse y no se reembolsa; puedes cancelarla en cualquier momento, y la cancelación surte efecto a partir del mes siguiente."
        ]
      },
      {
        "h": "Lo que me das, formulario por formulario",
        "p": "No se recopila ninguna información sin tu conocimiento: todo proviene de lo que tú mismo escribes. Los campos opcionales permanecen vacíos si no los modificas.",
        "items": [
          "Reserva (visita al showroom, lugar en un encuentro, cita individual, solicitud de código de descuento Neotone): nombre, apellidos, correo electrónico, teléfono si lo das, número de personas, fecha deseada, hasta tres franjas horarias que propongas, tipo y formato de la sesión (presencial o por videollamada), instrumentos que quieres descubrir, modelo Neotone que te interesa, país, cuenta de red social, cómo me conociste, desde cuándo tocas, qué te gustaría lograr y tu mensaje.",
          "Contacto: nombre y apellidos, correo electrónico, asunto, mensaje.",
          "Lista de espera de la aplicación: nombre, apellidos, correo electrónico, si ya tienes un handpan y cuál, el rol o los roles que declaras (para ti, para enseñar, para fabricar), tu objetivo, tu número de alumnos y, si fabricas handpans, tu país, el número de notas que produces, los metales que trabajas y cómo fijas tus precios. Además, tu motivación, si te postulas como probador beta.",
          "Pedido del micrófono Muling: nombre, apellidos, correo electrónico, teléfono, cantidad, dirección de entrega completa, instrucciones para el repartidor, mensaje y, después, el comprobante de transferencia que subes (imagen o PDF).",
          "En todos los casos se añaden automáticamente: el idioma del sitio, la página desde la que envías tu solicitud, la fecha y la hora en que aceptaste estas condiciones con su número de versión y, si marcaste la segunda casilla, la opcional, la fecha en que aceptaste recibir mis novedades."
        ]
      },
      {
        "h": "Lo que hago con ello",
        "p": "Tres cosas, nada más.",
        "items": [
          "Responderte. Es la razón de ser de cada formulario: leo y respondo personalmente.",
          "Organizar lo que pediste: confirmar un horario, preparar los instrumentos para tu visita, tramitar un pedido. Una solicitud de cita individual también crea una propuesta de clase en mi agenda, dentro de la aplicación.",
          "Mantenerte al tanto de mis novedades, pero solo si marcaste la segunda casilla del formulario, la opcional, que nunca viene marcada de antemano: una nueva fecha de encuentro, la apertura de la aplicación, un nuevo instrumento. Si no la marcas, solo te escribo por tu solicitud, y por nada más. Si la marcas, escribo poco y de forma dirigida: según la puerta por la que entraste y lo que dijiste que te interesa, no recibes lo mismo que otra persona. Puedes decir basta cuando quieras, sin tener que dar explicaciones."
        ]
      },
      {
        "h": "Fotos y videos tomados en el lugar",
        "p": "Fotografío y filmo lo que sucede aquí: los encuentros, las citas en el showroom, los instrumentos que pasan de mano en mano. Publico una parte en este sitio y en mis redes sociales. Lo que me importa no es tu rostro en particular, sino mostrar el ambiente general del lugar y lo que aquí se comparte, para que a otros les den ganas de venir.",
        "items": [
          "Por defecto, difumino los rostros. Es lo que hago hoy: mientras alguien no me haya dicho que está de acuerdo, no lo publico de forma reconocible.",
          "Puedes decirme que no, y no tienes que justificar nada: basta con decírmelo ahí mismo o con un correo a contact@lesagedavid.fr. Antes o después de la publicación: si ya hay una foto o un video en línea, lo retiro o difumino tu rostro.",
          "También puedes decirme que sí, si quieres aparecer con el rostro descubierto: dímelo ahí mismo o por correo electrónico. Es lo que me permite publicar verdaderas fotos de grupo en lugar de rostros borrosos.",
          "En ambos casos, puedes cambiar de opinión cuando quieras, en cualquier sentido."
        ]
      },
      {
        "h": "¿Sobre qué base?",
        "p": "Se basa en tu consentimiento, y hay dos casillas porque son dos cosas distintas. Puedes retirar uno u otro en cualquier momento: eso no anula lo que ya se hizo, pero lo detiene todo de ahí en adelante.",
        "items": [
          "La casilla «Acepto las condiciones generales» es obligatoria: sin ella no puedo tramitar tu solicitud. La fecha de tu aceptación se registra con el número de versión de esta página: así se puede saber más adelante qué texto exacto tenías delante.",
          "La casilla «Quiero recibir información sobre las próximas fechas y las novedades» es opcional, y nunca viene marcada de antemano. No condiciona nada: tu formulario se envía exactamente igual si la dejas vacía. Aceptar las condiciones generales no equivale a aceptar recibir mis novedades; por eso son dos casillas y no una.",
          "Las fotos y los videos tomados en el lugar no pasan por ninguna casilla de este formulario: la regla es difuminar por defecto, y basta con que me lo digas para oponerte. Lo describe la sección «Fotos y videos tomados en el lugar».",
          "Para un pedido de micrófono, además, tus datos de entrega son sencillamente necesarios para que el paquete salga."
        ]
      },
      {
        "h": "Las herramientas por las que pasan tus datos",
        "p": "No vendo ni alquilo ningún dato, a nadie, nunca. Esta es la lista completa de los servicios que intervienen realmente.",
        "items": [
          "Supabase: la base de datos donde se guardan tus respuestas y el espacio de almacenamiento de los comprobantes de transferencia. El proyecto está alojado en Irlanda, en la Unión Europea.",
          "Vercel: el proveedor de alojamiento del sitio. Las pequeñas funciones de servidor que transmiten los formularios se ejecutan en Estados Unidos.",
          "El correo contact@lesagedavid.fr: ahí llegan las notificaciones y desde ahí te respondo. Lo aloja Google.",
          "Google Fonts y las miniaturas de YouTube: el sitio carga sus fuentes tipográficas y las miniaturas de los videos desde los servidores de Google. No se les transmite ninguna de tus respuestas, pero sí la dirección IP de tu navegador.",
          "YouTube: un video solo se carga si haces clic en él, y pasa por youtube-nocookie.com. Mientras no hagas clic, no se envía nada.",
          "Muling Musical Instruments Co., Ltd. (China): solo si pides un micrófono. Es el fabricante quien hace el envío, así que tu pedido se le manda por correo electrónico, a una dirección china. Ese mensaje contiene tu nombre, tu correo electrónico, tu teléfono, la cantidad pedida, tu país, tu dirección completa, tus instrucciones de entrega, el importe y la referencia del pedido. Una casilla específica te lo pide expresamente antes del envío. Que la transferencia, en cambio, vaya a una cuenta alemana no cambia nada: estos datos sí se envían a China.",
          "OVH: el nombre de dominio lesagedavid.fr.",
          "HelloAsso: algunos productos, clases y talleres se compran en la tienda HelloAsso de Résonances Productions. Al hacer clic, sales de este sitio: entonces se aplica la política de HelloAsso, y nada de lo que escribas allí pasa por aquí.",
          "Stripe: el sitio solo consulta allí los precios de la aplicación que muestra, y nada más: desde este sitio no se le envía ningún dato personal. La suscripción y su pago se hacen dentro de la aplicación, en su propio sitio."
        ]
      },
      {
        "h": "Lo que sale de la Unión Europea",
        "p": "Mejor decirlo con franqueza: parte del recorrido pasa fuera de Europa. La base de datos, en cambio, se queda en Irlanda.",
        "items": [
          "Las funciones del servidor que reenvían los formularios se ejecutan en Estados Unidos, en Vercel.",
          "Mi correo electrónico está alojado en Google, una empresa estadounidense, por lo que los correos electrónicos que intercambiamos también lo están.",
          "Las fuentes tipográficas y las miniaturas de video se cargan desde servidores de Google.",
          "Solo en el caso de un pedido de micrófono, tu pedido se envía a China, por correo electrónico, al fabricante: nombre, correo electrónico, teléfono, cantidad, país, dirección completa, instrucciones de entrega, importe y referencia. Es imprescindible para que pueda enviarte el paquete. Cuidado con no confundirlo con el pago, que sí se queda en Europa: son dos caminos distintos."
        ]
      },
      {
        "h": "Cuánto tiempo guardo todo esto",
        "p": "Tres años después de nuestro último intercambio. Y el contador vuelve a cero con cada nuevo intercambio: me escribes, me respondes, reservas, haces un pedido, y los tres años empiezan de nuevo. Si no pasa nada durante tres años, tu información se borra. Por supuesto, puedes pedir que se borre mucho antes: lo explico más abajo.",
        "items": []
      },
      {
        "h": "Cookies y medición de audiencia",
        "p": "Este sitio no instala ninguna cookie. No usa ninguna herramienta de medición de audiencia, ningún píxel publicitario, ningún rastreador: por eso no hay ningún banner que aceptar al llegar. Lo único que tu navegador guarda localmente es el idioma que elegiste: nunca sale de tu dispositivo. Los correos electrónicos, en cambio, son otra cosa: su apertura y los clics en sus enlaces se miden, mediante una imagen invisible y enlaces con seguimiento. Esto forma parte de las condiciones de uso de la aplicación, y se explica en su política.",
        "items": []
      },
      {
        "h": "Tus derechos y cómo ejercerlos",
        "p": "Basta con un solo paso: escribe a contact@lesagedavid.fr. No hay formulario que completar ni comprobante que presentar, salvo que tenga una duda seria sobre tu identidad. Te respondo personalmente, en un plazo máximo de un mes.",
        "items": [
          "Acceso: saber exactamente qué información tengo sobre ti; puedo enviarte una copia.",
          "Rectificación: corregir una información falsa o desactualizada.",
          "Supresión: borrarlo todo.",
          "Oposición: rechazar un uso, en particular los correos de novedades.",
          "Portabilidad: recuperar lo que me diste en un archivo reutilizable en otro lugar.",
          "Limitación: pedir que tu información quede en suspenso mientras se resuelve un desacuerdo.",
          "Retiro del consentimiento: en cualquier momento, sin tener que justificarte."
        ]
      },
      {
        "h": "Dejar de recibir mis correos",
        "p": "Cada correo de novedades incluye un enlace para darte de baja: un clic y listo. Si no, basta con una línea a contact@lesagedavid.fr («stop» sirve perfectamente), y no tienes nada que justificar. Esto no cancela ninguna cita ni ningún pedido en curso: los mensajes necesarios para el seguimiento de tu solicitud se siguen enviando.",
        "items": []
      },
      {
        "h": "Si no estás de acuerdo conmigo",
        "p": "Puedes presentar una reclamación ante la CNIL, la autoridad francesa de protección de datos: CNIL, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 (www.cnil.fr). Pero, si quieres, escríbeme primero: es más rápido, y prefiero resolver las cosas directamente.",
        "items": []
      },
      {
        "h": "Seguridad",
        "p": "El sitio se sirve en HTTPS de extremo a extremo. La base de datos solo es accesible con credenciales específicas, y sus reglas de acceso hacen que solo mi cuenta de administrador pueda leer las solicitudes. Los comprobantes de transferencia que se suben con un pedido van a un espacio de almacenamiento privado, nunca público. En este sitio no se escribe ningún dato bancario: aquí no se cobra ningún pago.",
        "items": []
      },
      {
        "h": "Citas, encuentros y pedidos",
        "p": "En este sitio no se hace ningún pago. Una cita individual se paga con el enlace que te envío en mi respuesta: es el pago lo que reserva tu horario y nos compromete a los dos. Hasta 24 h antes, la cambiamos de fecha sin ningún problema; con menos de 24 h, el pago se mantiene, pero no pierdes tu cita: la reprogramamos dentro de los 3 meses siguientes. Los encuentros son gratuitos, con reserva y con un número limitado de lugares. Un pedido de micrófono Muling se paga por transferencia bancaria, a una cuenta situada en Alemania, directamente al fabricante: eres tú quien hace el trámite, por iniciativa propia, y ni este sitio ni yo cobramos ese pago. Luego el fabricante se encarga del envío y del seguimiento.",
        "items": []
      },
      {
        "h": "El contenido del sitio",
        "p": "Los textos, las fotografías y los videos pertenecen a sus respectivos autores. El detalle (editor, alojamiento, propiedad intelectual, precios e IVA) está en la página Aviso legal.",
        "items": []
      },
      {
        "h": "Si estas condiciones cambian",
        "p": "Esta página lleva un número de versión y una fecha. Cuando el texto cambia, la versión cambia con él, y la nueva se aplica a los formularios enviados después. Lo que tú aceptaste queda registrado con su propio número: siempre sabremos qué texto tenías ante los ojos ese día.",
        "items": []
      }
    ],
    "contactTitle": "¿Tienes alguna pregunta sobre esta página?",
    "contactText": "Escríbeme a contact@lesagedavid.fr. Respondo personalmente, y prefiero, y por mucho, una pregunta hecha antes de tiempo a una duda que te guardas.",
    "contactCta": "Escribirme",
    "legalLink": "Ver el aviso legal"
  },
  // RETOUCHE MANUELLE ASSUMÉE (09/09/2026) : bloc ajouté à la main, hors passe du
  // script de traduction, parce que la page était bloquante (validation OAuth
  // Google). Source = le bloc `privacy` du français dans src/i18n/dict.ts.
  // ⚠️ L'URL du scope Google est citée LITTÉRALEMENT et ne doit jamais être traduite.
  "privacy": {
    "title": "Política de privacidad: David Lesage",
    "description": "Política de privacidad del sitio de David Lesage y de la aplicación Handpan Constellation Studio: datos recopilados, mapa de handpanistas, inicio de sesión con Google, reserva de clases, Google Calendar, plazos de conservación y derechos según el RGPD.",
    "h1": "Política de privacidad",
    "updatedLabel": "Última actualización",
    "updated": "3 de noviembre de 2026",
    "lead": "Esta página explica con claridad qué hago con tus datos: qué recopilo, por qué, con qué herramientas, cuánto tiempo los conservo y cómo recuperas el control cuando quieras. Cubre este sitio y la aplicación Handpan Constellation Studio, incluido el mapa de handpanistas. Sin jerga: si algo no queda claro, escríbeme. Soy yo quien lee los mensajes.",
    "sections": [
      {
        "h": "Quién es responsable de tus datos",
        "p": "David Lesage, músico, pedagogo e inventor, editor de este sitio y de la aplicación Handpan Constellation Studio. Showroom: 29 rue des Orteaux, 75020 París. Correo: contact@lesagedavid.fr · Teléfono: +33 6 10 73 31 52. No hay ningún departamento de marketing detrás de todo esto: soy yo quien decide qué se recopila, quien lo lee y quien te responde.",
        "items": [] as string[]
      },
      {
        "h": "Qué cubre esta página",
        "p": "Dos lugares, dos usos distintos, y conviene diferenciarlos.",
        "items": [
          "El sitio lesagedavid.fr: lo que escribes en los formularios (reserva, contacto, lista de espera, pedido de un micrófono). El detalle formulario por formulario está en la página de Términos y condiciones generales, y sigue siendo válido.",
          "El formulario de contacto también pide tu número de teléfono: sirve únicamente para volver a contactarte. Se conserva el mismo tiempo que tu correo electrónico y tiene la misma base legal (tu consentimiento).",
          "La aplicación Handpan Constellation Studio: tu cuenta, tu suscripción, tu lugar en el mapa de handpanistas y, si enseñas o eres alumno, la agenda de clases."
        ]
      },
      {
        "h": "Qué recojo en la aplicación, y por qué",
        "p": "Al crear tu cuenta: tu dirección de correo electrónico, tu apellido y tu nombre, y un número de teléfono si decides indicarlo (este último es opcional). Si creas tu cuenta a través de Google, es Google quien transmite esta información, junto con tu foto de perfil (ver más abajo).",
        "items": [
          "Crear y proteger tu cuenta, y darte acceso a la aplicación.",
          "Gestionar tu suscripción.",
          "Contactarte sobre tu cuenta.",
          "Colocar tu estrella en el mapa de handpanistas (ver más abajo).",
          "Solo síntesis globales (totales en los que no se puede identificar ninguna cuenta) pueden servir para análisis de mercado, para comprender mejor las necesidades de quienes tocan el handpan y mejorar la aplicación."
        ]
      },
      {
        "h": "Si inicias sesión con Google: tu apellido, tu nombre y tu foto",
        "p": "Si creas tu cuenta o inicias sesión con Google, Google transmite a la aplicación tu dirección de correo electrónico, tu apellido, tu nombre y la dirección de tu foto de perfil de Google. El correo pasa a ser el de tu cuenta; el apellido y el nombre la completan.",
        "items": [
          "La primera vez que abres la aplicación, si aún no tienes foto de perfil, tu foto de Google se descarga una sola vez, se recorta y se guarda como foto de perfil en el espacio de almacenamiento privado de la aplicación. No se publica: solo aparece en el mapa de handpanistas si publicas una ficha detallada con la casilla «Mostrar mi foto en mi ficha» marcada (lo está por defecto, y puedes desmarcarla).",
          "Una foto que hayas elegido nunca se sustituye. Puedes cambiar o eliminar la tuya en cualquier momento desde «Mi perfil», y una foto eliminada no se vuelve a importar.",
          "En el espacio docente, mientras un alumno conectado con Google no tenga foto en la aplicación, su ficha puede mostrar su foto de Google, cargada desde los servidores de Google."
        ]
      },
      {
        "h": "El mapa de handpanistas (la constelación)",
        "p": "La aplicación muestra un mapa de la constelación de handpanistas. Solo lo ven las personas conectadas a una cuenta. Hay dos niveles: tu estrella por defecto y tu ficha detallada, que solo publicas si quieres.",
        "items": [
          "Tu estrella por defecto. Tal como establecen las condiciones de uso de la aplicación (§ 6 bis), las demás personas conectadas ven tu nombre, la inicial de tu apellido (o tu apellido completo si lo eliges en «Mi perfil público», y puedes volver a la inicial en cualquier momento) y tu país; la estrella se coloca en el centro del país. Nunca muestra tu dirección, tu ciudad ni tu correo. El país viene de tu perfil o de la pregunta de la pantalla de bienvenida; sin país conocido, no apareces en el mapa. Tu cuenta también suma uno en el contador anónimo «Músicos» de tu país (un país con menos de 3 personas no se nombra en él).",
          "Tu ficha detallada, si la publicas. Es opcional y solo muestra lo que tú escribes o marcas: tus roles (handpanista, docente, fabricante, acumulables), un correo de contacto solo si marcas la casilla prevista (nunca se copia de tu cuenta sin tu clic) y tu lugar con la precisión que elijas: el país, la ciudad, una zona que describes (su punto se redondea a unos 11 km) o una dirección precisa y su punto exacto, tras una advertencia.",
          "Una dirección publicada es visible para todas las personas conectadas, que pueden anotarla o copiarla: evita tu domicilio y elige mejor una zona o la dirección de un lugar donde das clases.",
          "Tu foto de perfil. Cuando creas tu ficha detallada, la casilla «Mostrar mi foto en mi ficha» está marcada por defecto: si tienes foto de perfil, aparece entonces en tu ficha y en tu punto del mapa de handpanistas, visibles para las personas conectadas. Puedes desmarcarla antes de publicar, o en cualquier momento después; tu foto se retira entonces de inmediato y se sustituye por tu estrella. Si tu ficha ya existía, se conserva tu elección anterior. Mostrarla da a conocer a las personas conectadas el identificador técnico de tu cuenta, que no da acceso a ninguno de tus datos.",
          "Recuperas el control cuando quieras, desde tu ficha: cada una de estas opciones se retira en cualquier momento. El correo y la posición se retiran de inmediato. Desmarcar la casilla de la foto, desactivar tu ficha o eliminar tu foto cierra el acceso a tu foto; un enlace ya abierto caduca como máximo al cabo de una hora.",
          "Puedo retirar una estrella (moderación), en particular si me lo pides por escrito a contact@lesagedavid.fr."
        ]
      },
      {
        "h": "El mapa y la búsqueda de direcciones: quién ve qué",
        "p": "Dos servicios externos intervienen cuando usas el mapa, y lo que reciben es limitado.",
        "items": [
          "El fondo del mapa: cuando se abre un mapa, tu navegador lo pide a OpenFreeMap (Hyperknot Software Kft., Hungría), que pasa por la red de distribución Cloudflare. Recibe tu dirección IP y la zona mostrada, sin cuenta ni cookie; tu dirección escrita y tu punto no se le envían. Según su política de privacidad, sus registros de acceso no contienen direcciones IP, sus registros de errores pueden contener la dirección IP y la URL solicitada, y estos registros se borran al cabo de 7 días (30 días como máximo en caso de incidente de seguridad).",
          "La búsqueda de direcciones: cuando haces clic en «Encontrar en el mapa», y solo entonces, el texto de la dirección escrita se envía a la Géoplateforme del IGN (Institut national de l’information géographique et forestière, Francia) para una dirección en Francia, o a Photon, servicio de komoot (Alemania), para el resto del mundo. Se envía también, en el caso de Photon, el idioma de la pantalla y, como en cualquier petición, tu dirección IP. Eliges entre las propuestas, y el marcador se puede mover después.",
          "Ni tu nombre, ni tu correo, ni la posición de tu dispositivo se les transmiten: la geolocalización del navegador nunca se utiliza. Un punto solo existe si lo colocas tú mismo."
        ]
      },
      {
        "h": "La reserva de clases: solo concierne al profesor y al alumno",
        "p": "Cuando se reserva una clase en la aplicación, la información de esa sesión concierne únicamente a dos personas: el profesor y el alumno de esa clase. Nadie más tiene acceso: ni los demás profesores, ni los demás alumnos, ni ninguna persona externa.",
        "items": [
          "La información de una sesión es: el nombre y el correo del alumno, su teléfono si lo ha facilitado, la fecha y la hora, la duración, el lugar o el enlace de videollamada, el tipo de sesión y las notas asociadas a la clase.",
          "Técnicamente, el acceso está bloqueado en la propia base de datos: una sesión solo puede leerla el profesor que la creó y el alumno correspondiente. A ello se suma el administrador de la aplicación, es decir, yo, David Lesage. Prefiero decirlo a callarlo.",
          "Esta información sirve para organizar la clase, y para nada más. No se vende, ni se transmite, ni se comparte con fines comerciales."
        ]
      },
      {
        "h": "Si el profesor vincula su Google Calendar",
        "p": "Vincular su agenda es una opción que elige el profesor, nada más: la aplicación funciona muy bien sin ella. Mientras no lo haga, ningún dato viaja hacia Google.",
        "items": [
          "Cuando lo hace, el evento se crea en SU propia agenda y se invita al alumno; es decir, el alumno recibe la invitación y ve el evento por su parte. No se escribe nada en la agenda del alumno sin su propio consentimiento.",
          "El permiso solicitado a Google es exactamente este: https://www.googleapis.com/auth/calendar.events, que permite crear, actualizar y eliminar los eventos de las clases, y nada más. La aplicación no lee el resto de la agenda, no la recorre y no accede a ningún otro servicio de Google.",
          "Ningún dato de agenda se utiliza con otros fines. No se transmite, ni se vende, ni se comparte con ningún tercero.",
          "El profesor puede desvincular su agenda en cualquier momento, desde la aplicación. El vínculo se elimina y la aplicación deja inmediatamente de escribir en Google Calendar; las clases permanecen en la aplicación, pero ya no se sincronizan. Los eventos ya creados pertenecen a su agenda de Google: siguen ahí, y le corresponde a él eliminarlos si lo desea."
        ]
      },
      {
        "h": "La medición de uso en la aplicación",
        "p": "La aplicación la desarrolla una sola persona: yo. Para que funcione bien, para medir la carga de los servidores, garantizar su estabilidad y saber dónde poner mi energía, mido cómo se usa: el tiempo que se pasa en cada parte de la aplicación, las acciones de interfaz, con marca de tiempo y en su orden, las conexiones y el dominio de acceso. Si una herramienta se usa mucho, es en ella donde me concentro para mejorarla. Los administradores de la aplicación tienen acceso a estas mediciones.",
        "items": [
          "Lo que nunca se recopila: tu contenido musical (ni tus escalas, ni tus temas, ni lo que tocas), el texto que escribes, tus pulsaciones de teclado, los movimientos de tu ratón. Ningún rastreador publicitario, ninguna herramienta de análisis de terceros: nada se envía a Google, Meta ni a ninguna agencia publicitaria.",
          "Dos usos concretos: el correo de fin de prueba se personaliza según tu uso; y cuando reportas un problema, Claude, el asistente de Anthropic, puede analizar tu comentario y el hilo de tus acciones para preparar el diagnóstico.",
          "Estas mediciones se conservan 24 meses y después se borran automáticamente. También se eliminan con tu cuenta.",
          "Puedes rechazar esta medición en cualquier momento desde la aplicación, sin tener que justificarte: el rechazo es inmediato y borra las mediciones ya registradas sobre ti. Solo queda el registro de errores, sin vínculo con tu cuenta.",
          "El registro de errores: cuando la aplicación falla, el error se registra para corregirlo (mensaje depurado, pantalla, versión, navegador), incluso para los visitantes sin cuenta. Una huella unidireccional de la cuenta, un dato seudónimo, permite contar las cuentas afectadas; no se crea si has rechazado la medición.",
          "El seguimiento de los correos: la apertura y los clics se miden para tu dirección, mediante una imagen invisible y enlaces rastreados, en las campañas y en algunos correos automáticos, incluso sin cuenta. Forma parte de las condiciones de uso de la aplicación. Puedes darte de baja de los correos que no son indispensables; no existe un ajuste separado para desactivar esta medición.",
          "El texto completo, el que prevalece, es el que se muestra en la aplicación, accesible en todo momento desde «Mi cuenta» → «Privacidad y condiciones de uso»."
        ]
      },
      {
        "h": "Sobre qué base legal",
        "p": "Según de qué se trate, y conviene decirlo con precisión.",
        "items": [
          "Tu consentimiento, para los formularios del sitio y para recibir mis novedades: dos casillas distintas, de las cuales solo una es obligatoria, y puedes retirar uno u otro consentimiento en cualquier momento.",
          "Las condiciones de uso de la aplicación, de las que forma parte la medición de la apertura y de los clics de los correos.",
          "La ejecución del servicio, para tu cuenta, tu suscripción y la organización de las clases: sin esta información, la aplicación simplemente no puede hacer lo que le pides.",
          "La ejecución de las condiciones de uso que aceptaste, para tu estrella por defecto en el mapa de los handpanistas (nombre, inicial del apellido, país).",
          "Tu consentimiento, para tu ficha detallada en el mapa y para mostrar tu foto: nada aparece en ella sin tu clic, y lo retiras en cualquier momento desde tu ficha.",
          "Mi interés legítimo en hacer funcionar y mejorar la aplicación, para la medición de uso, que forma parte de las condiciones de uso, con un derecho de oposición pleno, que puedes ejercer con un solo gesto dentro de la aplicación."
        ]
      },
      {
        "h": "Cuánto tiempo conservo todo esto",
        "p": "Mientras sea útil, no más.",
        "items": [
          "Los datos de tu cuenta y la agenda de las clases: mientras tu cuenta esté activa. Puedes pedir su supresión en cualquier momento.",
          "Tu lugar en el mapa de los handpanistas, tu ficha y tu foto de perfil: mientras exista tu cuenta. Cada elemento de tu ficha se puede retirar en cualquier momento; el correo y la posición se retiran de inmediato, y el acceso a tu foto se cierra como máximo una hora después.",
          "Las mediciones de uso: 24 meses, eliminadas con tu cuenta, y borradas de inmediato si te opones a la medición.",
          "El registro de errores: 90 días después de la última aparición para un error resuelto, 180 días en caso contrario; la huella de la cuenta, 12 meses como máximo después de la última aparición.",
          "El seguimiento de los correos (clics, aperturas, envíos, errores de envío): 24 meses, y se borra al eliminar tu cuenta.",
          "Lo que me escribes desde los formularios del sitio: tres años después de nuestro último intercambio, y el contador vuelve a cero con cada nuevo intercambio."
        ]
      },
      {
        "h": "Los proveedores por los que pasan tus datos",
        "p": "No vendo ni alquilo ningún dato, a nadie, nunca. Esta es la lista de los servicios que intervienen realmente.",
        "items": [
          "Supabase: la base de datos donde se guardan las cuentas, la agenda de las clases y las respuestas de los formularios, así como el espacio de almacenamiento de los archivos subidos. El proyecto está alojado en Irlanda, en la Unión Europea.",
          "Vercel: el proveedor de alojamiento de este sitio. Las pequeñas funciones de servidor que retransmiten los formularios se ejecutan en Estados Unidos.",
          "Stripe: el pago de la suscripción a la aplicación. El sitio, por su parte, solo lee allí las tarifas mostradas: no se le envía ningún dato personal desde este sitio.",
          "Google: el buzón contact@lesagedavid.fr está alojado en Google, y es ahí donde te respondo. El sitio también carga sus tipografías y las miniaturas de los videos desde servidores de Google: ninguna de tus respuestas se les transmite, pero la dirección IP de tu navegador sí. Y Google Calendar interviene únicamente si un profesor ha decidido vincularlo, tal como se describe más arriba. Si eliges iniciar sesión con Google, Google transmite a la aplicación tu correo, tu apellido, tu nombre y la dirección de tu foto de perfil. Las grabaciones de audio de las clases y las notas de voz pueden conservarse en un espacio de almacenamiento privado en Google (Google Drive), no público.",
          "Anthropic: su asistente Claude puede analizar un comentario que me envíes desde la aplicación, con el hilo de tus acciones, para preparar el diagnóstico. Empresa estadounidense.",
          "DeepL (empresa alemana) y, como respaldo, Google Translate: traducen, a petición de un administrador, el texto de un comentario que me envíes y el texto de los correos que te escribo en tu idioma, incluido algún pasaje que te concierne personalmente.",
          "OpenFreeMap (Hyperknot Software Kft., Hungría), a través de la red Cloudflare: el fondo del mapa de los handpanistas. La Géoplateforme del IGN (Francia) y Photon, servicio de komoot (Alemania): la búsqueda de direcciones, solo cuando haces clic. Lo que reciben se detalla más arriba.",
          "Supabase Inc., Vercel Inc., Google LLC, Anthropic PBC y Cloudflare Inc. son empresas estadounidenses: algunos datos pueden, por tanto, tratarse fuera de la Unión Europea. Estas transferencias se rigen por las garantías previstas en el RGPD, que estos proveedores han establecido."
        ]
      },
      {
        "h": "Cookies y medición de audiencia en este sitio",
        "p": "Este sitio no instala ninguna cookie. No utiliza ninguna herramienta de medición de audiencia, ningún píxel publicitario ni ningún rastreador: por eso no hay ningún banner que aceptar al llegar. Lo único que tu navegador guarda localmente es el idioma que elegiste: nunca sale de tu dispositivo. No hay que confundirlo con la medición de uso de la aplicación, descrita más arriba, que es otra cosa y que, esa sí, se rechaza con un clic. Los correos, por su parte, son otro asunto: se miden su apertura y los clics en sus enlaces, mediante una imagen invisible y enlaces rastreados. Forma parte de las condiciones de uso de la aplicación, y se explica en su política.",
        "items": [] as string[]
      },
      {
        "h": "Tus derechos, y cómo ejercerlos",
        "p": "Basta con un gesto: escribe a contact@lesagedavid.fr. Ningún formulario que completar, ningún comprobante que presentar mientras no tenga una duda seria sobre tu identidad. Te respondo personalmente, en un plazo máximo de un mes.",
        "items": [
          "Acceso: saber exactamente qué datos tengo sobre ti; puedo enviarte una copia.",
          "Rectificación: corregir información falsa o desactualizada.",
          "Supresión: borrarlo todo, incluida tu cuenta.",
          "Oposición: rechazar un uso, en particular la medición de uso y los correos de novedades.",
          "Portabilidad: recuperar lo que me diste en un archivo que puedas reutilizar en otro lugar.",
          "Limitación: pedir que tu información quede en suspenso mientras resolvemos un desacuerdo.",
          "Retiro del consentimiento: en cualquier momento, sin tener que justificarte.",
          "Y si no estás de acuerdo conmigo, puedes presentar una reclamación ante la CNIL, la autoridad francesa de protección de datos (CNIL, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, www.cnil.fr). Pero, si quieres, escríbeme primero: es más rápido."
        ]
      },
      {
        "h": "Seguridad",
        "p": "El sitio y la aplicación se sirven en HTTPS de extremo a extremo. A la base de datos solo se accede con credenciales dedicadas, y sus reglas de acceso se aplican en la propia base: eso es lo que garantiza que una clase solo pueda ser leída por el profesor y el alumno correspondientes. El token que autoriza el acceso a Google Calendar se guarda en una tabla estrictamente inaccesible desde un navegador y nunca se devuelve al cliente. Tu foto de perfil se guarda en un espacio de almacenamiento privado: solo pasa a ser visible para las personas conectadas si marcaste «Mostrar mi foto en mi ficha». En este sitio no se escribe ni se conserva ningún dato bancario: los pagos pasan por Stripe.",
        "items": [] as string[]
      },
      {
        "h": "Si esta página cambia",
        "p": "Lleva arriba una fecha de última actualización. Cuando el texto cambia, esa fecha cambia con él. Para la aplicación, un número de versión acompaña al documento mostrado antes de entrar: es lo que permite saber exactamente qué texto tenías delante el día en que lo aceptaste.",
        "items": [] as string[]
      },
    ],
    "contactTitle": "¿Alguna pregunta sobre esta página?",
    "contactText": "Escríbeme a contact@lesagedavid.fr. Respondo personalmente, y prefiero por mucho una pregunta hecha demasiado temprano a una duda que uno se guarda.",
    "contactCta": "Escribirme",
    "legalLink": "Ver el aviso legal",
    "termsLink": "Ver los términos y condiciones generales"
  },
  "data": {
    "woodSupplements": {
      "frene": "Incluido en el precio base",
      "chene": "Incluido en el precio base",
      "acajou": "Cargo adicional de 90 € (sin IVA)",
      "cerisier": "Cargo adicional de 90 € (sin IVA)",
      "noyer": "Cargo adicional de 190 € (sin IVA)"
    },
    "woodEnNames": {
      "frene": "Ash",
      "chene": "Oak",
      "acajou": "Mahogany",
      "cerisier": "Cherry",
      "noyer": "Walnut"
    },
    "woodDescriptions": {
      "frene": "Madera clara de vetas longitudinales marcadas y grano fino. El fresno es la madera estándar del Neotone¹: ligereza, resonancia equilibrada, estética depurada. La eligen los músicos que quieren un instrumento neutro y versátil, que no acapare la mirada mientras tocan.",
      "chene": "Madera robusta de vetas más cerradas que el fresno, en tonos de miel dorada. Un carácter noble, visualmente más cálido que el fresno. Incluida en el precio base: la alternativa natural para quienes quieren un aspecto más cálido sin costo adicional.",
      "acajou": "Madera rojo ocre intenso, pesada y cálida. La caoba aporta profundidad visual y una elegancia vintage: evoca de inmediato los instrumentos clásicos de calidad. Con los años toma una pátina muy bella.",
      "cerisier": "Madera rosada que tira a anaranjado, de vetas finas y homogéneas. El cerezo gana intensidad al envejecer y se oscurece ligeramente con los años. Un carácter suave y distintivo, entre la claridad del roble y la profundidad de la caoba.",
      "noyer": "Madera oscura con matices de chocolate intenso, a veces jaspeada de vetas más claras. El nogal es el más contrastado de los cinco, perfecto para un look de alta gama sin complejos. Se pide a menudo para producciones visuales o montajes escénicos en los que el instrumento está bajo los focos."
    },
    "metalNames": {
      "nitrure": "Acero nitrurado",
      "inox": "Acero inoxidable",
      "ember": "Ember Steel"
    },
    "metalEnNames": {
      "nitrure": "Acero nitrurado",
      "inox": "Acero inoxidable",
      "ember": "Ember steel"
    },
    "metalTags": {
      "nitrure": "Claro y potente",
      "inox": "Cálido, sustain largo",
      "ember": "En el catálogo Yishama"
    },
    "metalDescriptions": {
      "nitrure": "Se parte de un acero laminado en frío con bajo contenido de carbono (casi siempre DC04), que se envía a una instalación especializada para la nitruración. El proceso endurece el acero y crea una capa protectora en su superficie. Es el acero histórico del handpan.",
      "inox": "El acero inoxidable no se oxida. Es su primera cualidad, pero no la más interesante: sobre todo da un timbre muy distinto, más redondo, con una cola de sonido mucho más larga que la del nitrurado.",
      "ember": "Un acero inoxidable desarrollado específicamente para el handpan, que Yishama ofrece en su catálogo junto al nitrurado y al inoxidable clásico. Yishama no lo compara con los otros dos en su artículo: en lugar de resumir lo que no escriben, lo mejor es escucharlo. Pídeles una muestra de sonido o ven a escucharlo al showroom."
    },
    "metalSound": {
      "nitrure": "Un sonido más cerámico, casi terracota. Las frecuencias altas se amplifican con mucho volumen; Yishama escribe que se puede oír a kilómetros de distancia.",
      "inox": "Un timbre muy cálido y suave, con abundante sustain, más largo que en el nitrurado. Las frecuencias amplificadas se sitúan más bien en la parte baja del espectro.",
      "ember": "Yishama no lo detalla en su comparación de materiales."
    },
    "metalCare": {
      "nitrure": "Pide más cuidado que el inoxidable: limpieza y aceitado regulares. Evítalo en la playa, a pesar de la capa de nitruración.",
      "inox": "Resistente al óxido: limpieza y aceitado más espaciados, pero siempre recomendados. En cambio, es muy sensible al calor: a pleno sol puede desafinarse temporalmente.",
      "ember": "Acero inoxidable: se aplican las mismas precauciones generales que para el acero inoxidable común."
    },
    "metalBest": {
      "nitrure": "Al aire libre, la calle, todo lo que tiene que llegar lejos sin amplificación.",
      "inox": "Interiores, conciertos, estudio, más que tocar en la calle.",
      "ember": "Escucha antes de tomar una decisión."
    },
    "yishamaVideos": [
      "El primer encuentro con el instrumento",
      "Lo que me encanta de mi Yishama: la lógica de la escala",
      "Fallin’, versión de Alicia Keys",
      "Copier-Coller, versión de Bigflo & Oli",
      "Ave María, versión jazz",
      "Rózsa, canción tradicional húngara"
    ],
    "modelTaglines": {
      "one": "Lo esencial, sin pantalla",
      "mutant": "Máxima expresión, con pantalla LCD"
    },
    "modelNotes": {
      "one": "10 notas · sin pantalla",
      "mutant": "19 notas · pantalla LCD"
    },
    "modelFeatures": {
      "one": [
        "9 notas principales + ding + domo (10 zonas de toque)",
        "Hasta 9 escalas cargadas sin conexión (teclas dedicadas) · ilimitadas una vez conectado",
        "Creación de escalas personalizadas ilimitadas desde una interfaz web",
        "Ding multifuncional: cambio de escala · grabadora integrada",
        "Control MIDI completo (entrada/salida)",
        "1 entrada para pedal (volumen o expresión)",
        "Salida de audio mono (1 jack) o estéreo (2 jacks)",
        "Batería Li-Ion de 7800 mAh: 8 h de autonomía",
        "1300 muestras por escala · 48 kHz / 32 bits"
      ],
      "mutant": [
        "9 posiciones de notas con zonas de extensión = 19 notas por escala",
        "Hasta 18 escalas cargadas sin conexión (teclas dedicadas) · ilimitadas una vez conectado",
        "Creación de escalas personalizadas ilimitadas desde una interfaz web",
        "Pantalla LCD retroiluminada integrada",
        "Ding multifuncional: cambio de escala · grabadora integrada",
        "Control MIDI completo (entrada/salida)",
        "1 entrada para pedal (volumen o expresión)",
        "Salida de audio mono (1 jack) o estéreo (2 jacks)",
        "Batería Li-Ion de 7800 mAh: 8 h de autonomía",
        "1300 muestras por escala · 48 kHz / 32 bits"
      ]
    },
    "specs": [
      {
        "title": "Audio con calidad de estudio",
        "items": [
          "48 kHz / 32 bits · DAC de 24 bits / 384 kHz",
          "Relación señal/ruido: 112 dB",
          "Latencia de audio: 5 ms",
          "1.300 muestras de estudio por escala",
          "Notas: 7 matices × 10–15 velocidades"
        ]
      },
      {
        "title": "7 escalas oficiales incluidas (+ ilimitadas desde la aplicación)",
        "items": [
          "Escalas oficiales tomadas de handpans de MAG Instruments y Yishama",
          "Ej.: B-Amara · C-Aegean · C# Pygmy · D-Kurd · F#2 Pygmy · G-Romanian Hijaz…",
          "Crea tus propias escalas, sin ningún límite",
          "Escalas compartidas gratuitamente por la comunidad"
        ]
      },
      {
        "title": "Batería de 8 horas",
        "items": [
          "Batería de iones de litio integrada de 7,4 V y 7800 mAh",
          "8 horas de autonomía tocando sin parar",
          "Carga completa: 4 horas",
          "Adaptador de corriente de 12 V incluido"
        ]
      },
      {
        "title": "Entrada/salida MIDI completa",
        "items": [
          "Controlador MIDI (salida) + módulo de sonido MIDI (entrada)",
          "6 zonas del cuerpo + 18 pads + Ding + Domo",
          "Notas MIDI asignables por zona",
          "Compatible con los estándares MIDI"
        ]
      },
      {
        "title": "Conectividad profesional",
        "items": [
          "Salidas de línea asimétricas (derecha/izquierda)",
          "Salida de auriculares · Entrada/salida MIDI",
          "1 entrada para pedal (volumen o expresión)",
          "Mono (1 jack) o estéreo (2 jacks)",
          "WiFi · ajustes, creación de escalas"
        ]
      },
      {
        "title": "Formato, peso y sensores",
        "items": [
          "47 cm de diámetro · 16 cm de altura",
          "3,5 kg (dependiendo del tipo de madera)",
          "Precisión del sensor: 0,5 cm",
          "Sensibilidad: de 20 a 5000 g",
          "Detecta golpe, presión y posición"
        ]
      }
    ],
    "comparatif": [
      {
        "aco": "Para tocar 10 escalas, necesitas 10 handpans: transporte complicado, almacenamiento voluminoso, presupuesto en aumento.",
        "neo": "Un solo Neotone te abre infinitas escalas: un solo instrumento que transportar, guardar y pagar. Y hasta creas tus escalas a medida."
      },
      {
        "aco": "Dos handpanistas, dos escalas distintas: es difícil tocar juntos o compartir una escala.",
        "neo": "Todos cargan la misma escala para tocar juntos: aprender y compartir se vuelve sencillo, y te abres al mundo para tocar con otros instrumentos."
      },
      {
        "aco": "En una jam con percusiones, un saxofón o un bajo, el handpan acústico queda tapado enseguida.",
        "neo": "El volumen se ajusta: siempre se te oye entre los demás instrumentos, en el escenario o en una jam."
      },
      {
        "aco": "Acompañar a un cantante es difícil: una escala acústica fija no se adapta bien a las diferentes voces.",
        "neo": "Acompañas la voz en todas las tesituras y tocas canciones conocidas como con el piano o la guitarra: el handpan por fin sale de su nicho."
      },
      {
        "aco": "Frágil y sensible: imposible de tocar a plena luz del sol, y la afinación cambia con el tiempo y con los golpes.",
        "neo": "Siempre perfectamente afinado, insensible al calor. Elige 440 Hz o 432 Hz y transpón una escala para tocar en la tonalidad correcta con los demás instrumentos."
      },
      {
        "aco": "Muy pocas notas. La física del metal lo limita todo: tamaño, disonancias, espacio disponible.",
        "neo": "La electrónica libera la ubicación de las notas: muchas más notas y escalas posibles en un solo instrumento."
      },
      {
        "aco": "La técnica de toque acústica es exigente: al principio puede desanimar a algunas personas, que abandonan por falta de placer inmediato.",
        "neo": "Sensores de sensibilidad ajustable: un sonido justo desde el primer golpe, el placer de tocar enseguida."
      },
      {
        "aco": "Sacar los armónicos exige una precisión poco común en acústico.",
        "neo": "En el Neotone, los armónicos salen con facilidad, y los efectos acústicos siguen ahí."
      },
      {
        "aco": "En el Mutant acústico, las zonas de las notas mutantes son pequeñas y precisas.",
        "neo": "El tamaño de las zonas de toque es ajustable (hasta el 30 % de la nota): agrándalas para empezar, redúcelas para ganar precisión."
      }
    ],
    "faq": [
      {
        "q": "¿Qué garantía acompaña al Neotone?",
        "a": "Cada Neotone se entrega con una garantía de 6 años, una funda semirrígida y un cargador."
      },
      {
        "q": "¿Qué empresa fabrica Neotone?",
        "a": "Soundventure Ltd fabrica el Neotone en Budapest (Hungría). El instrumento nació del sueño de dos amigos, Csaba y Norbert; la empresa se fundó en 2021, con el apoyo de MAG Instruments y Yishama Ltd. He visitado varias veces sus talleres en Hungría: conozco personalmente a Csaba y Norbert, así como a todo el equipo (Gergely, Dániel y los artesanos de MAG Instruments, y Yonathan de Yishama). También soy probador beta oficial de la marca desde 2021: desde el primer Neotone¹, reporté e hice corregir miles de errores y propuse numerosas mejoras."
      },
      {
        "q": "¿Para quién es Neotone?",
        "a": "Para todos: tocar el handpan digital no requiere experiencia previa. Pronto se vuelve indispensable para los músicos de escenario (crear bucles, conectar pedales), para grabar en estudio, para quienes tocan de noche (con auriculares) y para los nómadas digitales. Y a quienes ya están conquistados, les abre el campo infinito de la creación de escalas."
      },
      {
        "q": "¿Proporciona las mismas sensaciones que un handpan acústico?",
        "a": "La experiencia es distinta a la de tocar en acústico: el sonido no sale directamente del instrumento, sino de unos auriculares o de un altavoz. Ventajas: inmersión total con auriculares, volumen ajustable y nada de acople en el escenario. Los sistemas Bose L1 son ideales; el Bose S1 Pro es una excelente opción portátil."
      },
      {
        "q": "¿El Mutant es idéntico a un verdadero handpan «mutante»?",
        "a": "No. Las notas adicionales se tocan en una zona aparte dentro de cada campo tonal, lo que pide un toque suave y preciso. Puedes ampliar esta zona hasta el 30 % de la nota para tocar con más comodidad."
      },
      {
        "q": "Soy principiante, ¿me recomiendas el Neotone?",
        "a": "Los dos modelos son perfectos para principiantes. Tocar el Neotone es incluso más fácil que tocar un handpan acústico: la sensibilidad de los sensores se ajusta, así que obtienes un sonido limpio desde el primer golpe. El Mutant pide un toque un poco más preciso para sus notas adicionales, pero permite ir mucho más lejos en la armonía."
      },
      {
        "q": "¿Necesitas equipo adicional para producir sonido?",
        "a": "El Neotone es un instrumento digital autónomo con su propio motor de sonido: no necesita una computadora para funcionar. No tiene altavoces integrados, así que hay que conectarlo a un altavoz (por ejemplo, el altavoz autónomo Bose S1 Pro+) o tocar con auriculares para escuchar el sonido."
      },
      {
        "q": "¿Se pueden aplicar efectos al sonido del Neotone?",
        "a": "Al igual que con una guitarra eléctrica, puedes conectarle todo tipo de equipos externos: pedales de efectos (Boss OC-3), estaciones de bucle (Roland RC-505 MKII), reverberaciones (Strymon Nightsky, Hologram Microcosm)."
      },
      {
        "q": "¿Se puede alquilar un Neotone, o pedir uno prestado?",
        "a": "No. Los Neotone no se alquilan, y no presto ni instrumentos ni prototipos. Para probarlo antes de comprarlo, ven al showroom en París: puedes tocar los modelos en stock todo el tiempo que quieras."
      },
      // chantier 44 : jamais traduit avant la relecture du 04/11/2026
      {
        "q": "¿El Neotone es portátil y funciona con batería?",
        "a": "Sí. Unas 8 horas de autonomía tocando sin parar. Viene con un cargador, que puedes usar tanto si estás tocando como si no.",
      },
    ],
    "procedure": [
      {
        "title": "Contáctame para recibir tu código de descuento",
        "text": "Envía un correo electrónico con tu nombre y apellido, tu país de entrega, tu dirección de correo electrónico y tu número de teléfono."
      },
      {
        "title": "Recibe tu código de descuento único",
        "text": "Recibes de parte de Neotone un código de descuento a tu nombre (−5 % en línea, −7 % en el showroom)."
      },
      {
        "title": "Haz tu pedido a Neotone",
        "text": "Neotone vuelve a contactarte en un plazo de dos días con una oferta personalizada."
      },
      {
        "title": "Paga el anticipo de 1 000 € sin IVA",
        "text": "Al recibir la confirmación, pagas un anticipo de 1 000 € sin IVA. Con eso empieza la fabricación artesanal de tu instrumento."
      },
      {
        "title": "Paciencia durante la fabricación",
        "text": "El plazo varía entre 2 y 5 meses según la lista de espera. Recibes un plazo estimado personalizado."
      },
      {
        "title": "Paga el saldo y recibe tu Neotone",
        "text": "En cuanto tu instrumento está listo, recibes un aviso por correo electrónico. Pagas el saldo y te envían el instrumento con su factura, a cualquier parte del mundo."
      }
    ],
    "procedureShowroom": [
      {
        "title": "Pide cita conmigo",
        "text": "Dos opciones: ven a uno de mis encuentros abiertos al público (uno al mes) o reserva una cita individual solo para ti: 1 h · 50 € o 1 h 30 · 70 €."
      },
      {
        "title": "Prueba los dos modelos en persona",
        "text": "Una vez allí, puedes tomarte tu tiempo para probar el Neotone¹ y el Mutant, comparar las maderas y hacerme todas tus preguntas."
      },
      {
        "title": "Llévate tu instrumento el mismo día",
        "text": "Aprovechas el descuento del showroom (−7 %) y te llevas tu Neotone en el momento, sin esperar la fabricación."
      }
    ],
    "included": [
      {
        "title": "Bolsa de transporte",
        "text": "Bolsa negra especial con correa de hombro y correas de mochila · 520 × 220 mm."
      },
      {
        "title": "Envíos a todo el mundo",
        "text": "Gastos de envío incluidos en el precio, a cualquier parte del mundo."
      },
      {
        "title": "Garantía de 6 años",
        "text": "Reparación y transporte incluidos."
      },
      {
        "title": "Adaptador de corriente incluido",
        "text": "Se incluye un cargador estándar de 12 V (el enchufe corresponde al país de entrega)."
      },
      {
        "title": "1 año de licencia Studio",
        "text": "Para la app Handpan Constellation Studio: 89 € de regalo."
      }
    ],
    "extras": [
      {
        "title": "Auriculares de diadema o intraurales",
        "text": "Para tocar en silencio, de noche o en un apartamento. Lo ideal: unos auriculares con conector jack de 6,35 mm (o un adaptador)."
      },
      {
        "title": "Un cable con conector en ángulo",
        "text": "Un cable jack mono (1 salida) o estéreo (2 salidas) para conectar el Neotone a tu altavoz. Importante: elige un conector en ángulo del lado del instrumento; es lo que permite apoyar el handpan en el suelo sin dañar los conectores."
      },
      {
        "title": "Un altavoz",
        "text": "Indispensable para difundir el sonido. Mi consejo: el Bose S1 Pro+ (≈ 599 €), autónomo (8 h de batería), imbatible en una jam o en conciertos pequeños, con más graves que el antiguo S1 Pro, un transmisor inalámbrico opcional y el subwoofer Sub 1 si quieres graves de verdad, profundos y cálidos."
      },
      {
        "title": "Un cable MIDI a USB",
        "text": "Un cable MIDI a USB (o USB-A a USB-C) si quieres controlar software de música (DAW: Logic Pro, Ableton Live…)."
      }
    ],
    "calc": {
      "modeQuestion": "¿Cómo quieres recibir tu Neotone?",
      "modeOnline": "📦 Me lo envían a casa",
      "modeOnlineSub": "Envío internacional incluido · 5% de descuento",
      "modeShowroom": "🏠 Voy al showroom ★",
      "modeShowroomSub": "París 20 · 7% de descuento · sin demora",
      "step1": "1 · Elige tu modelo",
      "step2": "2 · Elige tu madera",
      "step3": "3 · Tu país de entrega",
      "b2b": "Tengo un número de IVA intracomunitario (B2B): el IVA es recuperable (inversión del sujeto pasivo), pagas el precio sin IVA.",
      "recap": "Resumen",
      "basePrice": "Precio de lista sin IVA (gastos de envío incluidos)",
      "subtotal": "Subtotal (sin IVA)",
      "savings": "Ahorras",
      "savingsB2B": "No pagas",
      "savingsB2BNote": "Es decir, {discountRate} de descuento + {vatRate} de IVA sobre el precio base: la diferencia con el precio de catálogo con IVA ({catalog}). Solo el descuento de {discount} es una ganancia real: el IVA no lo adelantas (inversión del sujeto pasivo), y de todos modos lo recuperarías.",
      "getCode": "Obtener mi código de descuento",
      "modeOnlineShort": "Compra en línea, código de descuento (−5 %)",
      "modeShowroomShort": "Compra en el showroom (−7 %)",
      "stockStateIn": "Disponible en el showroom",
      "stockStateInSub": "Puedes venir a probarlo a París (distrito 20) y llevártelo.",
      "stockStateTransit": "Llega al showroom: {period}",
      "stockStateTransitSoon": "Llega pronto al showroom",
      "stockStateTransitSub": "El precio de abajo sigue siendo válido. Haz la solicitud: te mantendré al tanto de su llegada y de los plazos.",
      "stockStateOut": "No disponible en el showroom: por encargo",
      "stockStateOutSub": "El precio de abajo sigue siendo válido. Haz la solicitud: pediré a Neotone el plazo de fabricación y de entrega para este modelo y esta madera, y te responderé.",
      "stockTagIn": "En el showroom",
      "stockTagTransit": "Llega pronto",
      "stockTagOut": "Por encargo",
      "stockRequestButton": "Hacer la solicitud",
      "stockRequestTitle": "Solicitud de un Neotone que aún no está en el showroom",
      "stockRequestIntro": "Déjame tus datos: pediré a Neotone el plazo de fabricación y de entrega hasta París para este modelo y esta madera, y volveré a contactarte con su respuesta.",
      "discountLabel": "Descuento de embajador",
      "vat": "IVA",
      "finalTTC": "Precio final con IVA incluido a pagar",
      "finalIncluded": "Envío internacional incluido · 6 años de garantía",
      "finalShowroom": "Retiro en el showroom · París (distrito 20) · sin espera, sin gastos de envío",
      "finalB2B": "Precio a pagar sin IVA (inversión del sujeto pasivo)",
      "finalB2BNote": "IVA recuperable · Se requiere número de IVA intracomunitario",
      "finalExtUE": "Precio a pagar sin IVA · fuera de la UE",
      "finalExtUENote": "Sin IVA de la UE · gastos de aduana locales por tu cuenta",
      "b2bNote": "Inversión del sujeto pasivo del IVA: declaras y recuperas el IVA en tu país. Se requiere un número de IVA intracomunitario válido.",
      "vatStd": "IVA",
      "noVat": "sin IVA de la UE"
    }
  }
}
