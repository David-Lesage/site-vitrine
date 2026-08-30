import type { Dict } from './dict'

// Traduction anglaise — même forme exacte que `fr` (typée Dict).
export const en: Dict = {
  common: {
    nav: {
      home: 'Home',
      neotone: 'The Neotone',
      yishama: 'Yishama',
      shop: 'Shop',
      lessons: 'Lessons',
      studio: 'Handpan Constellation Studio',
      blog: 'Blog',
      showroom: 'Showroom',
      about: 'About',
      contact: 'Contact',
    },
    brandSub: 'Visible music',
    tagline: 'Making music visible and accessible — through colours, geometry and emotions.',
    headerCta: 'Come try it in Paris',
    footer: {
      resources: 'Resources',
      navigation: 'Navigation',
      contact: 'Contact',
      learnHandpan: 'Learn the handpan',
      electricVsAcoustic: 'Electronic vs acoustic',
      chooseHandpan: 'Which handpan to choose',
      newsletter: 'Newsletter',
      faq: 'FAQ',
      legal: 'Legal notice',
      terms: 'Terms & conditions',
      rights: 'Independent Neotone ambassador · All prices are indicative and may change without notice.',
    },
    skip: 'Skip to content',
    // ── TERMS & CONDITIONS — mandatory checkbox on EVERY form (see dict.ts) ───
    // `check` must keep the `{link}` marker: TermsCheckbox.astro injects the
    // link to /en/conditions-generales there.
    terms: {
      check: 'I accept the {link}',
      link: 'terms and conditions',
      hint: 'They explain how I use your details, what you commit to when booking, and how to unsubscribe whenever you want.',
      required: 'To continue, you need to accept the terms and conditions.',
    },
    // ── NEWS OPT-IN — OPTIONAL checkbox on every form (see dict.ts) ───────────
    // Must stay separate from `terms`: accepting the terms is not consent to
    // receive news. Optional, never pre-ticked, never blocking.
    news: {
      check: 'I’d like to hear about upcoming dates and what’s new',
      optional: 'optional',
      hint: 'New showcase dates, the app opening up, new instruments. I write rarely, and you unsubscribe in one click. If you leave it unticked, I only write to you about your request.',
    },
    credentials: ['Conservatory award', 'The Voice · Season 11', 'Neotone · Yishama · Maison du Ngoni ambassador', 'Showroom Paris 20th'],
    beta: {
      badge: 'Limited access',
      title: 'The app is not open to the public yet',
      text: 'Handpan Constellation Studio is currently used by a small group of beta testers, while we fine-tune the experience. They get free access, in exchange for their feedback.',
      wish: 'Would you like to become a beta tester? Tick the box in the form and tell me in a few words why the app interests you and how you plan to use it — I read and answer personally.',
      more: 'Access to the app',
      ctaWaitlist: 'Join the waiting list',
      priceClosedNote:
        'These prices are indicative: they will be the ones at public launch. The whole app — including the free Discovery plan — isn’t open yet: no plan is accessible today. It is used by a small group of beta testers, who get free access in exchange for their feedback. The waiting list is the only way in for now, whichever plan you may want at launch. Would you like to be one of the beta testers? Tell me below why the app interests you — I read and answer personally.',
      formTitle: 'Get notified when it opens',
      formFirst: 'First name',
      formLast: 'Last name',
      formEmail: 'Email',
      formHandpan: 'Do you already own a handpan?',
      formHandpanYes: 'Yes',
      formHandpanNo: 'No',
      formHandpanPlanning: 'I’m planning to buy one',
      formHandpanType: 'Which type?',
      formHandpanTypeAcoustic: 'Acoustic',
      formHandpanTypeElectronic: 'Electronic',
      formHandpanTypeBoth: 'Both',
      formUsage: 'What will you use Handpan Constellation Studio for?',
      formUsageHint: 'Tick everything that applies. What you declare here decides your access — if several boxes apply, the most committing one counts.',
      formUsagePersonal: 'For myself — learning, playing, composing',
      formUsagePersonalDeal: 'Free. Your creations stay yours; exports carry a watermark.',
      formUsageTeacher: 'For teaching — I use it as a tool in lessons I charge for',
      formUsageTeacherDeal: 'Teacher Licence: student space, exercises, scores, watermark-free exports. Being built — the first teachers are shaping it with me.',
      formUsageMaker: 'For making — I design and tune handpans',
      formUsageMakerDeal: 'You’re a maker. Tell me what you can build and you join the app’s maker directory: people pick you right as they design the handpan of their dreams, based on where you are and what you can produce. I bring you clients, I take a percentage, and you give them an introduction price. I only work with makers who are genuine and do quality work.',
      formUsageOther: 'Something else / not sure yet',
      formUsageBoth: 'Both',
      formStudentCount: 'How many students do you currently teach?',
      formStudentCountNone: 'None right now',
      formStudentCount1: '1 to 5',
      formStudentCount6: '6 to 20',
      formStudentCount20: 'More than 20',
      formMakerLegend: 'Your maker profile',
      formMakerHint: 'This is what puts you in the directory, in front of the right people.',
      formMakerCountry: 'Where do you build?',
      formMakerCountryPlaceholder: 'Country, city',
      formMakerNotes: 'Up to how many notes per instrument?',
      formMakerNotes9: '9 or fewer',
      formMakerNotes10: '10 to 13',
      formMakerNotes14: '14 to 17',
      formMakerNotes18: '18 and above',
      formMakerNotesVaries: 'Depends on the scale',
      formMakerMetals: 'Which metals do you work with?',
      formMakerMetalNitrided: 'Nitrided steel',
      formMakerMetalStainless: 'Stainless',
      formMakerMetalEmber: 'Ember steel',
      formMakerMetalOther: 'Other',
      formMakerPricing: 'Your favourite scales, your prices, your lead times',
      formMakerPricingPlaceholder: 'E.g. D Kurd 9 notes, €1,400 — 3 months lead time.',
      formPledgeTitle: 'Are we clear?',
      formPledgeText: 'I build this tool on my own. What you declare here decides your access — it isn’t a check, it’s an agreement. If your use changes (you start teaching with it, say), tell me: we adjust, simply.',
      formPledgeCheck: 'I commit to the honesty of what I’ve declared.',
      formRolesRequired: 'Tick at least one box — that’s the heart of the request.',
      formPersonalGoal: 'What for?',
      formPersonalGoalLearn: 'Learn to play',
      formPersonalGoalCompose: 'Compose, create my own scales',
      formShowcase: 'I’d like to hear about the next free showcases in Paris',
      formBeta: 'I’d like to become a beta tester — early, free access to the app, in exchange for my regular feedback.',
      formMotivation: 'Why does the app interest you? (optional)',
      formMotivationBeta: 'Why would you like to become a beta tester?',
      formMotivationHint: 'Tell me in a few words why it interests you and how you plan to use it: your answer counts as an application to join the beta testers. I read everything, personally.',
      formMotivationPlaceholder: 'What I’m looking for, how I play, what I’d love to do with it…',
      formSubmit: 'I want access to the app as soon as it opens',
      formSending: 'Saving…',
      formError: 'We couldn’t save your sign-up. Please try again, or write to me directly.',
      formPrivacy: 'Your email is only used to notify you when the app opens. No spam, unsubscribe anytime.',
    },
    emotions: ['Balance', 'Momentum', 'Adventure', 'Calm', 'Tension', 'Nostalgia', 'Mystery'],
  },
  home: {
    title: 'Learn the Handpan Visually — David Lesage',
    description:
      'The Yishama acoustic handpan, the Neotone electronic handpan and my colour-based method: learn the handpan differently, with Handpan Constellation Studio. Come try them in Paris.',
    heroEyebrow: 'Musician · Teacher · Inventor',
    heroTitleA: 'I make music',
    heroTitleHighlight: 'visible',
    heroTitleB: 'and accessible to everyone',
    heroLead: 'Through colours, geometry and emotions. From the curious child to the seasoned musician — I guide you personally.',
    ctaShowroom: 'Come try it in Paris',
    ctaMethod: 'Discover my learning app',
    universHeading: 'The gear, the lessons and the app',
    universEyebrow: 'One vision, several paths',
    universIntro: 'It all starts from a single idea: make music understandable, memorable and playable by everyone.',
    univers: [
      { sub: 'Acoustic & electronic', title: 'Instruments & microphones', text: 'A Yishama acoustic handpan, a Neotone electronic handpan, microphones — two worlds I stand behind equally.', cta: 'See both worlds' },
      { sub: 'Online & in person', title: 'The lessons', text: 'Learn the handpan differently: through colours, shapes and emotions. Anywhere in the world, or in Paris.', cta: 'See the lessons' },
      // ⚖️ 22/08/2026 — see dict.ts: the card never said which instrument.
      { sub: 'Acoustic & Neotone', title: 'Handpan Constellation Studio', text: 'The app that makes music visible on your acoustic handpan as much as on the Neotone — colours, geometry and emotions.', cta: 'Discover the app' },
    ],

    // « Le monde du ET » — see the French dictionary for the editorial rule.
    // Strict symmetry between the two cards: no ranking, no bigger side.
    duoEyebrow: 'The world of AND',
    duoTitleA: 'Acoustic',
    duoTitleAnd: 'and',
    duoTitleB: 'electronic',
    duoIntro: 'Not competition: completion. Two worlds that coexist — I play both, and neither replaces the other.',
    duo: [
      {
        sub: 'Acoustic handpan · Yishama',
        title: 'Metal that breathes',
        text: 'Two 18-note instruments tuned to 432 Hz, designed with Yonathan so I could sing and accompany myself. The sound comes straight out of the steel — nothing between it and you.',
        points: ['The timbre and overtones of hammered steel', 'No cable, no battery: it plays anywhere, instantly', 'I am a Yishama ambassador and affiliate'],
        cta: 'My story with Yishama',
        alt: 'David Lesage holding one of his Yishama acoustic handpans',
      },
      {
        sub: 'Electronic handpan · Neotone',
        title: 'A keyboard of scales',
        text: 'The electronic handpan built by Soundventure, which I have beta-tested since 2023. Every scale in a single instrument, on headphones as well as on stage.',
        points: ['Every scale in a single instrument', 'Adjustable volume, headphone play, built-in recorder', 'I am an official Neotone ambassador'],
        cta: 'Discover the Neotone',
        alt: 'David Lesage with two Neotone electronic handpans',
      },
    ],
    duoBridgeEyebrow: 'The bridge',
    duoBridgeTitle: 'My app speaks both languages',
    duoBridgeText: 'Handpan Constellation Studio has an acoustic mode and an electronic mode. When your acoustic scale is no longer enough, the “🎯 Complete” feature tells you exactly which notes you are missing — and what a second acoustic handpan, or a Neotone, would bring. Hybrid mode then draws your chords across both shells. Completion, not competition.',
    duoBridgeCta: 'Discover Handpan Constellation Studio',

    whyEyebrow: 'Why me',
    whyTitle: 'The tool I wish I’d been taught as a child',
    whyP1: 'I started drums at age 4. From the very first lesson, sheet music was forced on me — a language disconnected from my desire to play. I quit everything to learn by ear, self-taught.',
    whyP2: 'At the Conservatory I left with a drums award, highest honours… yet discouraged by a theory of harmony that didn’t speak to me. So I built the tool I was missing: a visual approach to music.',
    whyCta: 'Read my story',
    showroomBadge: '★ World first',
    showroomTitle: 'The only place in the world to test and walk away with your Neotone',
    showroomText: 'In Paris (20th), come try the instruments, meet the community, and walk away the same day with your handpan — with no manufacturing wait, at the best price on the market (−7%).',
    showroomArgs: ['7% discount — the best price (vs. 5% online)', 'No manufacturing delay, no waiting', 'Very limited stock — only a few instruments available'],
    showroomCta1: 'Book my showroom visit',
    showroomCta2: 'See the next showcase',
    showroomDatesTitle: 'Next free showcases',
    showroomDatesNote: 'Free entry · booking recommended',
    showroomDatesEmpty: 'Next dates in preparation — write to me to be the first to know.',
    showroomDatesAll: 'See the full agenda',
    communityEyebrow: 'The community',
    communityTitle: 'Join the visible-music movement',
    communityIntro: 'Be notified about upcoming showcases in Paris and the release of Handpan Constellation Studio. No spam — just the essentials.',
    communityPlaceholder: 'your@email.com',
    communityButton: 'Keep me posted about the next showcases',
    // 🚨 FIXED on 18/08/2026 — the previous sentence (“Your mail app opens…”)
    // had been FALSE since 16/08: the button opens the `BookingForm` modal →
    // `site-lead` → `site_leads` (the `mailto:` is only a no-JavaScript fallback).
    communityNote: 'A short form opens: leave your name and email, and you get the next dates by email straight away.',
    proofEyebrow: 'Sound first',
    proofTitle: 'See and hear the instruments come alive',
    proofIntro: 'I play, I demonstrate, I teach — acoustic and electronic, on video. Both full playlists are right below.',
    proofVideos: ['Musical performance on the Neotone', 'Shape of My Heart — on my two Yishamas', 'Create your scale — tutorial'],
    proofCta: 'See the full Neotone playlist',
    proofCtaYishama: 'See the full Yishama playlist',
  },
  neotone: {
    title: 'Neotone — electronic & digital handpan | David Lesage',
    description:
      'The Neotone, with David Lesage: −5% online (−7% at the showroom), 6-year warranty, a price calculator by country and human support from trial to unboxing.',
    heroEyebrow: 'The gear · Digital handpan',
    heroTitle: 'The Neotone, the world’s best electronic handpan',
    heroLead:
      'Through me, official Neotone ambassador, you get <strong class="text-cream">−5% online</strong> (or <strong class="text-cream">−7% at the showroom</strong>), the <strong class="text-cream">6-year warranty</strong> and personal support — from the trial to unboxing.',
    ctaCalc: 'Calculate my price',
    ctaShowroom: 'Book my showroom visit',
    modelsEyebrow: 'The two models',
    modelsTitle: 'Choose the instrument that fits you',
    modelsIntro: 'All the scales. One single instrument.',
    fromPrice: 'From',
    woodsEyebrow: 'Premium woods',
    woodsTitle: 'Five woods, five characters',
    woodsIntro: 'Ash and oak are included in the base price. Three other noble woods are available as an option — each with its own hue and character.',
    woodCardCta: 'See details',
    woodModalEyebrow: 'Wood essence',
    woodModalViewTop: 'Top view',
    woodModalViewBottom: 'Underside view',
    techEyebrow: 'Under the hood',
    techTitle: 'Precision technology, assembled by hand',
    techText:
      'Every Neotone¹ is designed and assembled by hand in Budapest. Under the noble wood, millimetric sensors simultaneously detect strike, pressure and position to faithfully reproduce the dynamics of an acoustic handpan. Professional audio electronics — 24-bit / 384 kHz DAC, 5 ms latency, 112 dB signal-to-noise ratio — make it a digital instrument without compromise.',
    specsTitle: 'Official technical specifications',
    stageEyebrow: 'Stage & Studio',
    stageTitle: 'The reference digital handpan',
    stageIntro: 'One handpan, endless possibilities: the Neotone lifts the constraints of the acoustic instrument and opens a whole new playground.',
    stage: [
      { t: 'No more sound-system headaches', d: 'No more feedback or trouble hearing yourself. A single jack cable, a soundcheck done in seconds — and you can loop your playing and plug in your effects pedals.' },
      { t: 'A studio inside the instrument', d: 'Built-in recorder: hold the ding to start a recording. The sound is captured at the source, in studio quality, even in a noisy environment.' },
      { t: 'Your bubble, on headphones', d: 'Plug in headphones and play without disturbing anyone — at night, in an apartment, on tour. Exceptional sound purity.' },
    ],
    compEyebrow: 'Acoustic vs Neotone',
    compTitle: 'The acoustic handpan has limits —<br><span class="text-copper">the Neotone lifts them</span>',
    compIntro: 'What electronics change, concretely.',
    compLegendAco: 'Acoustic handpan',
    compLegendNeo: 'Electronic Neotone',
    calcEyebrow: 'Price calculator',
    calcTitle: 'How much will my Neotone really cost me?',
    calcIntro: 'Choose your purchase mode, model, wood and country — the calculator applies the right discount and 2026 VAT.',
    calcDisclaimer:
      'Listed public prices already include worldwide shipping. Standard 2026 VAT rates. Outside the EU: no EU VAT applied, but local customs fees may be added on delivery, at your expense.',
    procEyebrow: 'Purchase procedure',
    procTitle: 'From your first question to delivery',
    procIntro: 'A simple, transparent journey, with support from start to finish. Two ways to walk away with your Neotone:',
    procHighlight: 'By coming to the showroom in Paris, you walk away with your instrument the same day — with no manufacturing wait at all.',
    procOnlineTitle: 'Online — worldwide delivery',
    procShowroomTitle: 'In person — Paris (20th)',
    // 🎬 Showroom tour video (YouTube id lives in NeotonePage.astro).
    // ⚠️ The original audio is French; an English track exists on the same video.
    // Say so explicitly — YouTube does not always switch to it on its own.
    procShowroomVideoEyebrow: 'The tour, on video',
    procShowroomVideoTitle: 'A look around the place where you’d try it',
    procShowroomVideoText:
      'Before you travel, you can already see where you’re heading: I take you around my showroom in Paris, with the Neotone at the centre of it.',
    procShowroomVideoAudio:
      'It’s filmed in French, but there’s an English audio track: pick it in the player settings (⚙), under “Audio track”.',
    inclEyebrow: 'All included in the price',
    inclTitle: 'What you receive',
    extrasEyebrow: 'To budget on top',
    extrasTitle: 'What you’ll need to buy on top',
    extrasIntro: 'The Neotone is complete, but to hear it and get the most out of it, plan for this small extra gear depending on your use.',
    extrasSpeakerCta: 'Read: getting the sound right around you',
    extrasHeadphonesCta: 'Read: which headphones to choose',
    bridgeEyebrow: 'Your Neotone + the visual method',
    bridgeTitle: 'Learn through colours and shapes',
    bridgeText: 'With Handpan Constellation Studio, you learn through colours and shapes — on your Neotone just as on an acoustic handpan.',
    bridgeCta: 'Discover the method',
    trustEyebrow: 'A token of trust',
    trustTitle: 'I personally know the people who make your Neotone',
    trustP1: 'I’ve travelled several times to the workshops in Hungary. I personally know Csaba and Norbert — the two friends behind the Neotone — as well as the whole team: Gergely, Dániel and the craftsmen at MAG Instruments, and Yonathan from Yishama.',
    trustP2: 'I’ve been an official beta tester for the brand since 2023. Since the very first Neotone¹, I’ve reported and helped fix thousands of bugs and suggested countless improvements. Buying through me isn’t just buying from a reseller: it’s buying from someone who lives the instrument from the inside and helps it evolve.',
    trustCaption1: 'A testing and debugging session with the team, at the workshop.',
    trustYishamaLink: 'My story with Yonathan and my two Yishama handpans',
    trustCaption2: 'With the Neotone team during one of my visits to Hungary.',
    faqEyebrow: 'FAQ',
    faqTitle: 'Every answer before you take the plunge',
    faqOutro: 'Any other questions? Write to me at',
  },
  yishama: {
    title: 'My Yishama handpans — two instruments for one voice | David Lesage',
    description:
      'The story of how I met Yonathan and Yishama: two acoustic 18-note handpans tuned to 432 Hz, custom-designed to accompany my voice — and what they ended up producing.',
    heroEyebrow: 'My acoustic instruments',
    heroTitle: 'Yishama — two handpans born of a chance meeting',
    heroLead:
      'Two 18-note instruments, tuned to <strong class="text-cream">432 Hz</strong>, designed with <strong class="text-cream">Yonathan</strong> for one reason only: so that I could sing and accompany myself. Here is their story — and what they taught me.',
    heroCtaVideo: 'Listen to Shape of My Heart',
    heroCtaStory: 'Read the story',
    heroImgAlt: 'David Lesage holding one of his two Yishama handpans, bottom notes visible',

    metEyebrow: 'Naxos, Greece · 2022',
    metTitle: 'A man met by chance, the day after a concert',
    metP1:
      'I had played a handpan-and-voice concert the evening before. The next day I ran into a man at the festival’s outdoor bar. I had no idea who he was. Someone explained: one of the finest handpan makers in the world.',
    metP2:
      'I told him about the dream I had been carrying for years: “a handpan piano”. To sing, to play covers, to accompany my own voice — without going round in circles inside a single mode.',
    metP3:
      'He listened for a long time, calmly. He did not try to sell me anything. He even told me that, given how percussive my playing is, he was not sure his instruments would suit me.',
    metP4:
      'That day, on that small island, I discovered the international handpan world: instruments with notes on top and underneath, deep basses, a level of craft I had not even suspected existed.',
    metQuote:
      'When I met Yonathan, the CEO of Yishama, and Andréa his wife, I immediately felt the delicacy and the depth of the person in front of me.',
    metQuoteSource: 'What I wrote at the time, on my old website',
    metPhotoAlt: 'David Lesage with Yonathan and Andréa of Yishama',
    metPhotoCaption: 'With Yonathan and Andréa — the beginning of a long story.',

    roomEyebrow: 'HUG Festival, Hungary',
    roomTitle: 'He came up to my room with a pencil',
    roomP1:
      'A few months later, at the HUG festival in Hungary, Yonathan came up to my room with Andréa. He started asking me questions. And drawing.',
    roomP2:
      'I understood very little of it — I have no engineering background. I only knew what I wanted to <em>hear</em>. He translated that into dimples, thicknesses, octaves. Only one technical thing mattered to me: as many domed notes as possible underneath, like little dings — they speak far more easily than dimpled ones.',
    roomP3:
      'For everything else, I handed him my complete trust. That is when he decided to make me an ambassador for his brand. But before that, he had taken a genuine, sincere interest in me. Then he welcomed me into his home in Budapest before I caught my flight.',
    roomAside:
      'Months earlier he had already sent me the link to their <em>Virtual Pantam</em>: “build the instrument you dream of in the app, then send me the link to what you designed”. We passed those links back and forth for weeks.',

    whyEyebrow: 'The reason it exists',
    whyTitle: 'Why two handpans — and why these two',
    whyIntro: 'They are not two instruments side by side. They are one system in two pieces, built around a voice.',
    whyP1:
      'The handpan is a beautiful, stubborn instrument. A scale is a choice — and therefore a renunciation. Nine or ten notes, and there will always be that <strong>one</strong> missing note that would make the chord you dream of playable.',
    whyP2:
      'For a singer it is worse. Accompanying a voice needs <strong>root basses</strong>: without them you play inversions, and the voice loses the ground under its feet. I wanted to rest my singing on the lowest note of each chord, then climb the arpeggio — D3-F♯3-A3 sitting on a D2, B♭2-D3-F3-B♭3.',
    whyP3:
      'My request fitted into one sentence: two instruments that, together, give me every sharp and every flat. So I could sing in any key, with the root of every chord down in the bass.',
    whyQuote:
      'My dream is to be able to sing and accompany myself easily on the handpan in every key, across the widest possible range, without being limited by missing notes.',
    whyQuoteSource: 'Letter of intent — 22 November 2022',
    why432Title: 'And why 432 Hz',
    why432Text:
      'I am fascinated by the effect of vibration on water and on the body — cymatics. That is why I asked Yonathan for a tuning based on A = 432 Hz. He replied that it was possible, but that he had to be certain <em>before</em> starting to tune: on a handpan, that choice cannot be undone.',

    // ═══════════════════════════════════════════════════════════════════
    // 📦 THE DELIVERY — MAY 2023 (section added 27/08/2026)
    // ═══════════════════════════════════════════════════════════════════
    // Eight of David's own photographs, supplied by him for this page.
    // See the long note in dict.ts (key `recEyebrow`) for the full
    // reasoning. In short:
    //  · the page already ASSERTED the arrival without ever showing it
    //    (`insTitle`, `insIntro`) — the photographs turn the claim into a
    //    document;
    //  · section 4 is LOCKED (the Yishama credit must stay glued to the
    //    heading and be read BEFORE the scale cards) and is already the
    //    heaviest section of the page;
    //  · chronologically the arrival belongs after the brief (§ 3) and
    //    before the note-by-note anatomy (§ 4).
    // ⚠️ `insIntro` was NOT rewritten: “almost exactly on my birthday” was
    //    already there, and this section makes it precise rather than
    //    contradicting it (delivery the day before, birthday the day after).
    //
    // 🖋️ THE HANDWRITTEN SIGNATURE ON THE CERTIFICATE IS THE DOCUMENTARY
    // PROOF OF THE “Yhonatan Ale-Yahav” spelling (see the note on
    // `insCredit` below). It is no longer an internal convention: it is
    // what the maker writes by hand.
    //
    // 🚫 NO CROPPING, NO RETOUCHING. Photo 1 is blurred, dark and noisy:
    // it is a document, not a catalogue image. The caption owns that fact
    // rather than apologising for it. The certificate's identification
    // number 483 stays visible — David sent it knowingly for this page.
    //
    // ⚠️ NOTHING IS INVENTED ABOUT WHAT HE FELT. The only added facts (May
    // 2023, the delivery, the birthday the next day) are his own.
    recEyebrow: 'May 2023',
    recTitle: 'The day they arrived',
    recIntro:
      'I have no careful picture of that moment. I have the ones I took on my phone, in the order it happened: the van, the crate, the case, the instrument — then the letter, and the next day.',

    recCaption1:
      'May 2023, at dusk. The van is still outside the house and the two crates are already in. The photo is blurred and dark: I am keeping it exactly as it is — that was the face I had.',
    recCaption2:
      'Under the cardboard and the polystyrene packing, a plywood crate closed with screws. On the lid, an envelope sealed with red wax. Through the gap you can already make out the red trim of the case.',
    recCaption3:
      'The hard case set down on the floor: matt black camouflage, a quilted spiral, red trim along the edge, and the Yishama badge in the middle.',
    recCaption4:
      'The zip open, and the metal. The ding at the centre with its rings, the notes all around. The drawing Yonathan had started in my room had become an object.',

    recPapersLead: 'Inside the crate there were papers too.',
    recCaption5:
      'The same envelope as in the crate photo, this time opened — the wax seal beside the certificate.',
    recCaption6:
      'The certificate for the E 18, signed by hand by Yhonatan Ale-Yahav: the scale, the steel, the eighteen notes, the dimensions, the weight, the identification number. Yishama calls it “E Major 18”; on this page, E 18 is my own working label.',
    recCaption7: 'The back of the certificate: the Yishama logo, on the same textured paper.',

    recNextDayLead: 'And the next day was my birthday.',
    recCaption8:
      'The two pans set up on their stands, the tablet above them, the open upright piano frame behind. Twenty-four hours after the van.',

    recZoomHint:
      'Click any photo to open it full screen, then use ‹ › to move between the eight. The certificate can only be read enlarged.',

    // 🔤 `alt` — accessibility AND search. They describe what is actually
    // visible, including the word YISHAMA on the box and on the case badge.
    // The certificate is printed in English, so its wording is quoted as
    // printed: an `alt` describes, it does not translate.
    recAlt1:
      'A blurred photograph taken at dusk: David Lesage in extreme close-up, mouth wide open and eyes wide. Behind him, two large delivery boxes stacked up; the lower one carries the Yishama logo and the word YISHAMA in large letters, along with its shipping labels. Beyond the glass door, the white delivery van is still parked outside the house.',
    recAlt2:
      'Looking down into the opened box: white polystyrene packing and, inside it, a pale plywood crate closed with screws visible at the corners. On the lid, slipped into a protective plastic sleeve, a kraft envelope sealed with red wax. Through the gap under the lid, the black case and its red trim can be glimpsed.',
    recAlt3:
      'The handpan hard case seen from above on a pale wooden floor: matt black camouflage fabric, a wide raised quilted spiral, a rectangular badge reading YISHAMA at the centre, red trim along the edge and a zip running around the rim.',
    recAlt4:
      'The case open: inside, the handpan, its metal catching a warm golden and bronze light. At the centre, the ding and its concentric rings; all around, the note fields, both dimpled and domed.',
    recAlt5:
      'On a wooden work surface: the kraft envelope, now opened, with its red wax seal stamped with a monogram, lying beside the certificate of authenticity printed on textured paper.',
    recAlt6:
      'The Yishama certificate of authenticity, full page. It reads: Certificate of Authenticity, Owner David Lesage, Year 2023, Scale E Major 18, Steel Type Stainless Steel, Notes (A B C♯ D♯) E / (F♯) G♯ B C♯ D♯ E F♯ G♯ A B C♯ D♯ E, Dimensions 53 × 53 × 28 cm, Weight 4.4 kg, the line “designed and produced at YISHAMA Workshop, Isfiya / ISRAËL”, the handwritten signature of Yhonatan Ale-Yahav and identification number 483.',
    recAlt7:
      'The back of the certificate: the Yishama logo — a golden flourish — above the word YISHAMA in capitals, on textured paper, with the address WWW.YISHAMA.COM at the foot of the page.',
    recAlt8:
      'David Lesage smiling, head tilted, in full daylight. In front of him, his two Yishama handpans in dark grey metal, each on its stand; behind, a tablet on an articulated arm, the frame of an open upright piano showing its strings and action, a painting of an orange Flower of Life, electronic pads and a pedalboard.',

    insEyebrow: 'The two instruments',
    insTitle: 'Eighteen notes each, delivered in May 2023',
    insIntro:
      'They arrived in secured wooden crates, travel cases included — almost exactly on my birthday.',
    insDing: 'Ding',
    insTop: 'Top',
    insBottom: 'Bottom',
    insNotes: 'notes',
    insTuning: 'Tuned to 432 Hz',
    // 🖋️ AUTHORSHIP CREDIT (27/08/2026, David's request) — see the long note
    // in dict.ts (key `insCredit`). The credit must be readable EVERYWHERE the
    // scales appear, spelled out, never in small print. ⚠️ Never attach it to
    // the Now Groove creations (`shop.creationsBadge`, calabash kit): those are
    // hand-finished by Kamou (Djoliba Percussion).
    //
    // ⚠️ CORRECTED 27/08/2026 (same day, after David re-read it) — THE TRUTH
    // HAS TWO HALVES, NEVER COLLAPSE IT ONTO ONE NAME: David wrote the BRIEF
    // (every chord, in every key, the root of each chord as a bass note, and a
    // ding); Yhonatan found the solution. His words: “I did design it in part
    // but did not build it; I had no idea how it could be possible, it is
    // Yonathan's intelligence that made it happen.” The brief itself is PART of
    // the credit — do not shorten it away.
    //
    // 🧭 THE CREDIT READS IN THREE BEATS, IN THIS ORDER (David's addition,
    // 27/08/2026) — the first one is what gives the other two their meaning:
    //  ① WHY — “my brief is that of a singer who wants to accompany himself on
    //    handpan the way a guitarist or a pianist would. It all started there.”
    //  ② WHAT IT FORCES — every chord, every key, the root of each chord as a
    //    bass note, and a ding.
    //  ③ WHO MADE IT POSSIBLE — Yhonatan.
    //
    // 🔁 DELIBERATE ECHO WITH THE END OF THE PAGE, NOT A DUPLICATE —
    // `yishama.endText` closes the page on the same dream three years later.
    // The credit opens on the MUSICIAN'S GESTURE, `endText` closes on the
    // INSTRUMENT'S RANK. ⚠️ Do not rewrite or move `endText`, and do not align
    // the two wordings: identical, they would cancel each other out.
    //
    // Split across two keys so it is not a wall of text on mobile:
    //  · `insCredit`      = the credit line — the most visible part, and where
    //    Yhonatan's NAME must stay;
    //  · `insCreditBrief` = the three beats, in David's own words.
    // Both stay VISIBLE (no “read more”).
    //
    // ⚠️ SPELLING — BOTH FORMS ARE DELIBERATE, DO NOT UNIFY:
    //  · “Yonathan” = the familiar form David uses throughout his story.
    //  · “Yhonatan Ale-Yahav” = the full official name of Yishama's founder/CEO;
    //    this is the form that carries the credit, and only this one.
    insCredit:
      'Made by Yishama — designed by <strong>Yhonatan Ale-Yahav</strong>. These two scales are in no catalogue: they were made to measure.',
    insCreditBrief:
      'The brief was mine, and it was a singer’s brief: to accompany myself on handpan the way a guitarist or a pianist would. So: every chord, in every key, with the root of each chord available as a bass note — and a ding. I had no idea how that could be possible. Yonathan’s intelligence is what made it happen.',
    insFootnote:
      'These are one-off pieces: the names are my own working labels, not Yishama catalogue models. Each instrument on its own gives all seven degrees of its scale, with the root available in the bass.',

    // 📸 THE APP SCREENSHOT (added 27/08/2026) — see the long note in dict.ts
    // (keys `insAppAlt` / `insAppCaption`). The screenshot is of the FRENCH
    // interface, so the degree names stay in French in the alt text: an `alt`
    // describes what is actually on screen, it does not translate it.
    //
    // 🚨 KNOWN DEBT — SCREENSHOT TO BE REPLACED (noted 27/08/2026)
    // On this screenshot the two scale names read “David Lesage Signature”
    // five times over: the “Made by Yishama” credit was not yet displayed in
    // the app when it was taken. Replace the image once the app shows it.
    // Until then, neither the caption nor the alt may suggest the credit is
    // visible on screen — it is not.
    insAppAlt:
      'Screenshot of Handpan Constellation Studio, Logic tab in Hybrid mode: my two Yishama handpans drawn side by side, every note shown as a coloured pad — the E 18 on the left (ding E3), the D Kurd 18 on the right (ding D3), bottom notes included. The banner at the top reads 6 chords with the E 18, 6 with the D Kurd 18 and 24 with both together. Below, the seven degrees of the union (French interface): I Équilibre E, II Élan F♯m, III Aventure G♯m, IV Détente A, V Tension B, VI Nostalgie C♯m, VII Mystère D♯°.',
    insAppCaption:
      'My two scales brought together in my own app: six chords with one, six with the other — and twenty-four once they play together. That number is what says Yonathan did not build me two instruments, but one system.',
    // ⚠️ Help line kept SEPARATE from the caption, not folded into it: the
    // caption is David's voice, not a set of instructions. It is needed — this
    // is a 2000 px interface screenshot: even at full desktop width the note
    // names on the two shells cannot be read without enlarging, and on a phone
    // the image is only ~340 px wide.
    insAppZoomHint: 'Dense screen: open the screenshot, then click it again for full size — that is where the note names become readable.',
    // Lightbox labels: images open full screen.
    // ⚠️ `prev` / `next` added 27/08/2026: the page now carries a group of
    // EIGHT photographs (`yishama-reception`), so the ‹ › arrows are really
    // visible. Without these two keys their `aria-label` fell back to the
    // component's FRENCH defaults — on the English page too.
    lightbox: { close: 'Close', prev: 'Previous photo', next: 'Next photo', zoom: 'Enlarge photo' },

    pairEyebrow: 'Together',
    pairTitle: 'A chromatic handpan, in two pieces',
    pairIntro:
      'Separately, each covers its own scale. Together, their 36 notes cover all twelve semitones — without exception.',
    pairP1:
      'All 24 major and minor chords become playable, and <strong>every one of them has its root down in the bass</strong>. Which is exactly what I had asked for: never again being forced into an inversion for want of a bass note.',
    pairP2:
      'Yonathan built, without either of us ever calling it that, a chromatic handpan in two pieces. He designed them as one system: he removed a note from the first because I already had it on the second — to free up room for another.',
    pairHonest:
      'One honest caveat: this describes the <em>availability of the notes</em>, not yet the fluidity of the gesture. Moving from one pan to the other mid-chord is still gymnastics. That is precisely the problem that ended up producing my app.',
    pairFactLabels: { notes: 'notes in total', keys: 'keys', chords: 'major & minor chords', tuning: 'tuning' },
    pairPhotoAlt: 'David Lesage playing his two Yishama handpans side by side',
    pairPhotoCaption: 'The two instruments side by side — still from the Shape of My Heart cover.',

    metalEyebrow: 'The metal',
    metalTitle: 'Three steels, three voices',
    metalIntro:
      'At Yishama the metal is not a finishing detail: it is the first choice, the one that decides timbre, sustain and upkeep. Three families are offered — click for the detail.',
    metalCardCta: 'See the detail',
    metalModalEyebrow: 'Build steel',
    metalModalClose: 'Close',
    metalLabelSound: 'The sound',
    metalLabelCare: 'Upkeep',
    metalLabelBest: 'Best for',
    metalSource:
      'Source: Yishama’s own article “Nitrided handpan vs stainless handpan”, and their catalogue. The price of a Yishama varies with the scale, the number of notes, the bottom notes and the material type.',
    metalNote:
      'Since 2021, every Yishama carries a laser engraving inside: serial number, scale name, and material type with its thickness.',

    makerEyebrow: 'The maker',
    makerTitle: 'Who Yishama are',
    makerIntro:
      'An Israeli workshop, also present in Hungary, among the finest handpan makers in the world.',
    makerP1:
      '“Yishama” comes from the Hebrew (יִשָּׁמַע) and means <em>to be heard</em>. Their stated intention: to create a sound sculpture that offers the individual a unique experience of self-exploration through sound, beat and harmony. Their motto fits on one line: “At Yishama, we strive for quality and passion.”',
    makerP2:
      'Yonathan and his team build instruments with very deep basses and sparkling highs. When I heard Kabeção, Nadishana, David Kuckhermann, Alexandre Lora and Flavio Salvaje play on them, I understood that these were the instruments I wanted to work with.',
    makerFactsTitle: 'What they say themselves',
    makerFacts: [
      { t: 'Every instrument is signed', d: 'Since 2021, a laser engraving inside gives the serial number, the scale name and the material with its thickness.' },
      { t: 'The format', d: 'Around 55 cm across the outer rim, 28 cm from the port to the top of the ding, and 4.4 kg on most models.' },
      { t: 'The first retuning is free', d: 'With proper playing technique a Yishama stays in tune for years. The first retuning is free of charge — only shipping is at your expense.' },
      { t: 'Every piece is unique', d: 'No waiting time announced in advance: the work is handmade and made to measure. They do occasionally keep instruments available immediately.' },
    ],
    makerCta: 'Discover Yishama handpans',
    makerDisclosure:
      'Full disclosure: I am a Yishama ambassador and affiliate. If you go through my link I earn a commission — it changes nothing about your price. I only represent makers whose work I genuinely love.',

    videosEyebrow: 'In music',
    videosTitle: 'What I recorded with them',
    videosIntro:
      'A Sting cover, a prayer, a Hungarian folk song, some French rap. All played on the two Yishamas, at 432 Hz.',
    videosFeaturedLabel: 'The video that moved Yonathan',
    videosFeaturedTitle: 'Shape of My Heart — Sting',
    videosFeaturedText:
      'When I sent it to him he replied: “wow wow wow very very beautiful! […] your voice is incredible, touch my heart very much! I would love to share this with our Yishama audience.”',
    videosPlaylistCta: 'See the whole Yishama playlist',
    videosWatch: 'Watch',

    bridgeEyebrow: 'What those two pans produced',
    // ⚠️ Sensitive passage (11/08/2026) — see the French dictionary for the
    // reasoning: the cause is the nature of a young, still-evolving, mostly
    // modal instrument, never a maker's omission.
    bridgeTitle: 'Nobody could have handed me the method — it did not exist',
    bridgeP1:
      'I was happy and completely lost. Two magnificent, very complex instruments, delivered with no manual. As if I had been handed two spaceships — except the flight manual was written nowhere, for nobody.',
    bridgeP1b:
      'The handpan is a <strong>21st-century</strong> instrument, still evolving fast: it has neither the centuries of piano teaching behind it, nor those of the guitar. And it cannot even have <em>one</em> method — there are as many handpans as there are scales, note layouts and note counts. What holds true on one instrument no longer holds on the next. That is nobody’s oversight: it is the youth of a living instrument.',
    bridgeP1c:
      'On top of that comes the very thing that makes it magical: the handpan is most often a <strong>modal</strong> instrument. That is a strength, and a wonderful way in — especially if you have never played music, you get a beautiful result almost straight away, with no theory. But you also go round in circles very fast. And the moment you are a professional musician expecting chromatic freedom, or you want to sing real songs over it — my case — it becomes very complex, very quickly. I came from drums, a purely rhythmic instrument: I had no grounding in harmony to fall back on.',
    bridgeP2:
      'In August 2023 I started a document to work out, at last, how to build my chords across the two pans. Coloured cards, one colour per note. <strong>That document became Handpan Constellation Studio.</strong>',
    // 📄 PAGE 4 OF THE AUGUST 2023 DOCUMENT (added 27/08/2026) — see the long
    // note in dict.ts for the full reasoning. Two things must survive any
    // future rewrite of these three keys:
    //
    // 🚨 1. DO NOT FIX THE SPELLING OF THE TITLE QUOTED IN `bridgeDocAlt`.
    // “Complete handpan Maping of placment of notes on the handpans by type of
    // note” is what David wrote by hand in 2023. “Maping”, “placment” and the
    // singular “handpan” are the ORIGINAL mistakes: this is an archive piece,
    // its spelling is part of it. “(original spelling)” is there so readers do
    // not take them for a site typo — not as a licence to clean them up.
    //
    // 🎨 2. THE CHROMAKEYS CLAIM IS DELIBERATELY LIMITED TO THE *RULE*.
    // Verified 27/08/2026 against the app's own table
    // (`melody/melody-model.ts`, “colour = absolute note”): the rule is
    // identical — colour follows the note NAME, not the octave and not the
    // scale — and 5 of the 7 hues match (C red, D orange, E yellow, F green,
    // B magenta), sharps taking a lighter shade of their neighbour in both.
    // BUT two moved: G was cyan in 2023 and is blue today (#2563EB); A was
    // blue and is violet (#7C3AED). So the caption says “one colour per note,
    // whatever the octave”, which is exact — never “the same colours as
    // today”, which would be false.
    bridgeDocAlt:
      'A page from a document made by hand in August 2023, titled “Complete handpan Maping of placment of notes on the handpans by type of note” / “Cartographie complète du placement des notes sur les handpan par type de notes” (original spelling). On the left, the shell of the E 18 on an ochre background, its ding E3 at the centre and all its notes around it as coloured pads; on the right, the shell of the D Kurd 18 on a cream background, its ding D3 at the centre, its notes laid out the same way, the bottom notes included. Below, a four-octave chromatic grid from C2 to B5: the cells for the notes actually owned are filled in with colour, the rest left pale. Each note name has its own colour, the same in every octave: C red, D orange, E yellow, F green, G cyan, A blue, B magenta. On the right, a small “Reminder / Rappel” table gives the French note names: C = Do, D = Ré, E = Mi…',
    bridgeDocCaption:
      'August 2023, page 4 out of 21 in that document: my two pans drawn by hand with every one of their notes, and underneath the four octaves where I coloured in the ones I actually owned. One colour per note, whatever the octave — that is already the ChromaKeys rule of the app, three years before it. I never finished it: I stopped along the way because it was too complex for me to take in, my level of music theory was too weak to understand and model all of it properly.',
    // ⚠️ Help line kept separate from the caption, as with the app screenshot
    // in section 4: the caption is David's voice, not a set of instructions.
    // It is needed — this is the densest image on the site (a 48-cell grid plus
    // some thirty pads) and it is only ~343 px wide on a phone.
    bridgeDocZoomHint:
      'Dense image: open it, then click it again for full size — that is where the note names and the grid become readable.',

    bridgeP3:
      'The strangest part is that the original question came from him. Back in August 2022, Yonathan wrote to me about the “chromatic, singer-composer” instrument: “try to play some songs in the app on that scale, so we understand which notes you’re missing — and we can find a way to add them.” Three years later, the app answers that question, for everyone.',
    bridgeAppTitle: 'What the app does today for an acoustic handpan',
    bridgeAppIntro: 'Everything below is free, and needs no electronic instrument.',
    bridgeApp: [
      { t: 'Your scale, in colour', d: 'You pick your instrument: the app draws your shell with your real notes, each dressed in its colour. The screen becomes a mirror of your pan.' },
      { t: '440 / 432 Hz tuning', d: 'One setting tunes the app to your handpan — so that what you hear on screen rings true against what you have in your hands.' },
      { t: '🎯 Complete your scale', d: 'The app compares your real notes with what the chords require, and tells you exactly which ones are missing — then which second handpan would supply them, and how many songs that would unlock.' },
      { t: 'Hybrid mode', d: 'As soon as a second pan is there, both shells appear side by side and each chord is drawn straddling the two, with playing order and hands. Exactly my gymnastics problem — solved on screen.' },
    ],
    // 🖋️ The app badge carries MY name — the sentence has to say who designed
    // them. See the “AUTHORSHIP CREDIT” note above (key `insCredit`). Short
    // version of the same two-halves split: the brief is David's, the making is
    // Yhonatan's. It may stay short, but it must not contradict the long one.
    bridgeSignature:
      'My two custom scales are in the app, badged “✨ David Lesage Signature”. The badge carries my name: the brief was mine, but the scales are <strong>Made by Yishama — designed by Yhonatan Ale-Yahav</strong>. You can load them, listen to them and see what they allow, even without having them under your hands.',
    bridgeHonest:
      'To be honest about it: the app does not listen to you. It does not guess your scale through the microphone — you choose it, or you build your shell note by note. From there, it reasons about your real notes.',
    bridgeCta: 'Discover Handpan Constellation Studio',
    bridgeCtaBlog: 'Read: using the app on your acoustic handpan',

    endEyebrow: 'And now',
    endTitle: 'Making the handpan a real accompaniment instrument',
    endText:
      'My dream has not changed: to raise the handpan to the rank of the guitar or the piano for accompanying a voice. These two instruments showed me it was possible — and forced me to invent the method that was missing. That is the road I am still on, without setting acoustic and electronic against each other.',
    endCtaShowroom: 'Come and hear them at the showroom',
    endCtaYishama: 'Discover Yishama',
  },
  shop: {
    title: 'Handpan Shop — Neotone, mics & accessories',
    description:
      'A selection of exceptional instruments and accessories, tested and chosen by David Lesage: Neotone digital handpans and Hisong microphones.',
    eyebrow: 'Shop',
    title2: 'Ambassador of exceptional instruments & microphones',
    intro: 'Quality and refinement matter deeply to me.',
    ambassadorText: 'I work with makers of exceptional instruments and microphones, and I’m proud to showcase and represent their quality. Through me, you can get discount codes as well as demos and hands-on tests at my showcases in Paris (20th).',
    keyNotice: 'Online payment disabled: set PUBLIC_SNIPCART_KEY in .env to enable the cart.',
    from: 'from ',
    soon: 'Soon',
    soonLong: 'Coming soon',
    addCart: 'Add to cart',
    orderEmail: 'Order by email',
    creationsBadge: 'David Lesage signature',
    calcOrder: 'Calculate my price & order',
    linkTags: { helloasso: 'On HelloAsso', streaming: 'Streaming', hisong: '−5% Hisong', yishama: 'Yishama ambassador', nowgroove: 'Now Groove', ondemand: 'On request', maisongoni: 'La Maison du Ngoni', tambour: 'Code David-Tambour', spotify: 'On Spotify', limited: 'Limited edition', app: 'App', muling: '−5% through me', onesec: 'I actually use it', oko: '−10% with my code', structured: 'I actually use it', atlas: 'Atlas partner' },
    linkCtas: { buy: 'See offer →', listen: 'Listen →', discover: 'Discover →', order: 'Order →', interested: 'I’m interested →' },
    copyCode: 'Copy code',
    codeCopied: 'Copied!',
    priceNotes: {
      hisong:
        '<strong>⚠️ Heads-up:</strong> on Hisong’s site, prices are shown <strong>excluding tax</strong> (€265.95 to €354.95 excl.). <strong>20% VAT</strong> is added at checkout. The prices above are therefore the <strong>real incl.-VAT prices</strong> — so you get no bad surprise.<br><br><strong>The good news: discounts stack.</strong><br>— my code <strong>DAVID-LESAGE-SAVE-5</strong>: <strong>−5%</strong><br>— the <strong>VIP10</strong> code: −10% on your first order (applied automatically)<br>— sometimes exceptional promos of 15 to 20%<br><br><strong>My code:</strong> if you go through my link it should apply on its own. If you don’t see it at checkout, enter it by hand — the button just below copies it.<br><br><strong>Shipping:</strong> from <strong>€11.95</strong> in France — you choose the carrier at checkout.<br><br><strong>A concrete example:</strong><br>— Musician kit: ≈ <strong>€273 incl. VAT</strong> after both discounts, i.e. ≈ <strong>€285 shipping included</strong><br>— Master kit: ≈ <strong>€364 incl. VAT</strong>, i.e. ≈ <strong>€376 shipping included</strong>',
    },
    watchDemo: 'Watch my demo video',
    adviceTitle: 'Need advice before buying?',
    adviceText: 'I answer personally. Tell me your project, I’ll help you choose the right instrument.',
    adviceCta: 'Get my advice',
    categories: {
      handpans: { label: 'Handpan', blurb: 'Two worlds that complete each other.' },
      app: { label: 'App', blurb: 'Handpan Constellation Studio — the teaching app that makes music visible.' },
      creations: { label: 'My creations · Now Groove', blurb: 'Created by me: my Now Groove rhythm method, the signature calabash and its handmade cover.' },
      instruments: { label: 'Exceptional instruments', blurb: 'I work with outstanding makers whose quality I’m proud to represent. Through me, enjoy discount coupons and demos at my showcases.' },
      // Accessories (20/08/2026) — new category created for the Atlas stands.
      micros: { label: 'Microphones', blurb: 'Pickup for acoustic handpan, voice and gong.' },
      accessoires: { label: 'Accessories', blurb: 'What holds the instrument up, and what carries it. Tried at the showroom before it lands here.' },
      musique: { label: 'Music', blurb: 'My albums and covers, to stream on every platform.' },
      formations: { label: 'Lessons & workshops', blurb: 'Learn with me through private lessons and workshops, in person or online.' },
      outils: { label: 'My everyday tools', blurb: 'Beyond music: the tools I actually use to stay focused, present and creative.' },
    },
    subcategories: {
      acoustique: { label: 'Acoustic', blurb: 'The steel, the hand, the breath of the room.', more: 'All about Yishama handpans →' },
      electronique: { label: 'Electronic', blurb: 'Every scale, headphones, the stage.', more: 'All about the Neotone →' },
    },
    subNavLabel: 'Two worlds:',
    handpanNote: 'The one real difference: the <strong>Neotone</strong> (built by Soundventure) is ordered through my calculator, with a personal discount code and a 6-year warranty. For <strong>Yishama</strong>, I am an ambassador and affiliate — you order on their site and my link follows you. Two ways to buy, one standard of quality.',
    handpanBridge: 'What links the two: Handpan Constellation Studio →',
    products: {
      'handpan-studio': { name: 'Handpan Constellation Studio · the app', description: 'My teaching app, on acoustic handpan as much as on the Neotone: colours, geometry and emotions make music visible. Free to start in acoustic mode, then Studio from €9.90/month — unlock creation, saving and PDF/PNG export of your scores.' },
      'neotone-one': { name: 'Neotone¹', description: 'Digital handpan, 10 notes, all the scales, studio quality. Supported purchase: personal discount code + 6-year warranty.' },
      'neotone-mutant': { name: 'Neotone¹ Mutant', description: 'Digital handpan, 19 notes with LCD screen, maximum expression. Supported purchase: discount code + 6-year warranty.' },
      'yishama': { name: 'Yishama exceptional handpan', description: 'One of the best handpan makers in the world (Israel / Hungary). Artisan craftsmanship, instruments up to 19 notes with deep basses and bright highs. I proudly represent them as an ambassador.' },
      'gonilele': { name: 'Gonilélé harp · La Maison du Ngoni', description: 'A travel harp-lute created by Joris Feuillâtre. I’m an ambassador of La Maison du Ngoni. 10 strings (€440) or 12 strings with built-in pickup (€520). Photos, videos, unboxing and ordering on the dedicated page.' },
      'calebasse': { name: 'David Lesage Signature Calabash Kit', description: 'Complete kit: a calabash 45 to 50 cm (rare in Europe), hand-finished by Kamou (Djoliba Percussion) and laser-engraved with the Now Groove logo, with its mat and shakers. An organic drum with a natural sound.' },
      'housse': { name: 'Now Groove calabash cover by David Lesage', description: 'A premium backpack cover designed by David Lesage: integrated mat function, detachable straps, storage pocket (eggs, accessories & method), velvet lining. ✋ Special handmade edition, ultra-limited series.' },
      'tambour': { name: 'Shamanic frame drum · L’Âme du Tambour', description: 'A handcrafted frame drum by Julien (L’Âme du Tambour) — an aligned, passionate and honest maker. Enjoy −5% with the code David-Tambour.' },
      'micro-hisong': { name: 'Hisong AirStudio S1 microphone', description: 'The first all-in-one mobile studio (mic, wireless in-ears, audio interface, charging case). Perfect for voice, acoustic handpan and gonilélé — a true portable studio.<br><br><strong>Three kits to choose from</strong> (prices incl. 20% VAT):<br>1 — Musician 4-in-1 · <strong>€319 incl. VAT</strong> <span class="text-ink-soft/60">(€265.95 excl.)</span><br>2 — Creator 5-in-1 · <strong>€372 incl. VAT</strong> <span class="text-ink-soft/60">(€309.95 excl.)</span><br>3 — Master 6-in-1 · <strong>€426 incl. VAT</strong> <span class="text-ink-soft/60">(€354.95 excl.)</span><br><br><strong>My advice:</strong> if you want to use the mic to <strong>play live</strong>, you need the <strong>6-in-1 (Master) kit</strong>.<br><br>Live demos and on-the-spot purchase at my Paris showcases.' },
      'micro-muling': { name: 'Muling MP1 microphone + HMP-2 preamp', description: 'The MP1 is a contact-condenser microphone made for the acoustic handpan. It comes with the HMP-2 preamp, which hosts up to two MP1 mics — for a clear, precise stereo capture with no feedback. Perfect for stage and recording. (Partnership with the maker in progress — email me to be kept posted.)' },
      'atlas': { name: 'Atlas handpan stands — Pro & All', description: 'The magnetic tripods from the Italian maker Atlas. The handpan rests on a floating disc with eight covered magnets, with nothing screwed or strapped on. Two models: the <strong>Atlas Pro</strong> in aluminium, telescopic, 1.8 kg, carrying bag included (€215); the <strong>Atlas All</strong> in wood, whose head is held between your legs to play seated, before taking legs and extensions to play standing (€230). I am a partner of the brand — both will be at the showroom to try.' },
      'phoenix-opus1': { name: 'The Phoenix Alliance — Opus I', description: 'My original album, first opus — a journey blending handpan, voice and organic textures. Stream it on Spotify and every platform.' },
      'phoenix-opus2': { name: 'The Phoenix Alliance — Opus II', description: 'The second opus — the journey continues. Stream it on Spotify and every platform.' },
      'cover': { name: 'Covers — David Lesage', description: 'My covers reimagined on handpan and voice (Shape of My Heart, Imagine, Ave Maria…). Listen on Spotify.' },
      'now-groove': { name: 'Now Groove — rhythm method', description: 'My course to learn rhythm differently, through visual emoticons. For everyone, from beginner to seasoned musician.' },
      'cours-prives': { name: 'Private lessons & workshops', description: 'One-to-one lessons and workshops with me — handpan, rhythm and voice. In person in Paris or online.' },
      'streaming': { name: 'My music on streaming', description: 'Find my compositions and covers on Spotify, Apple Music, Deezer and all platforms.' },
      'onesec': { name: 'one sec — take back control of your screen time', description: 'The app that genuinely helps me not get lost in the scroll. Before you open a grabby app (social media…), one sec adds a short pause — the length of a breath — and the compulsive urge fades. It’s simple, and for me it’s one of the very few things that actually worked. A science-backed approach (studies with the Max Planck Institute). Free for the essentials; get −30% off Premium through my link.' },
      'oko': { name: 'ÖKO filtering bottle', description: 'The bottle I take everywhere, all the time, as a musician on the road — water is the single most important thing there is. Instant filtration with no wait and no electricity, tested by an independent COFRAC-accredited lab against 200+ contaminants. I’m glad to represent a product that’s perfect for every traveller. Enjoy −10% with my code.' },
      'structured': { name: 'Structured — daily planner', description: 'The app I use to organise my days as a musician-entrepreneur, between concerts, workshops and project development. A clear visual timeline instead of a to-do list that keeps piling up. No affiliate program with them yet — I just share it because I genuinely use it.' },
    },
  },
  booking: {
    defaultTitle: 'Book your visit',
    defaultIntro: 'Leave me your details and I’ll get back to you personally to sort out the specifics.',
    first: 'First name',
    last: 'Last name',
    email: 'Email',
    phone: 'Phone (optional)',
    people: 'How many of you?',
    message: 'Your message (optional)',
    messagePlaceholder: 'What interests you, your availability, your level…',
    submit: 'Send my request',
    sending: 'Sending…',
    error: 'We couldn’t send your request. Please try again, or write to me at contact@lesagedavid.fr.',
    privacy: 'Your details are only used to reply and keep you posted. No spam.',
    successTitle: 'Sent ✨',
    successText: 'You’ll receive a confirmation email. I’ll reply personally, very soon.',
    successClose: 'Close',
    close: 'Close',
    visitTitle: 'Book my showroom slot (paid)',
    visitIntro: 'Paris 20th, by appointment. This is a paid one-to-one slot — one single price, whatever you’re coming for. Tell me when you’re available and I’ll suggest a slot.',
    privateTitle: 'Book an individual appointment',
    privateIntro: 'One-to-one time, at the Paris 20th showroom or online: discover an instrument, get started with the one you’ve just bought, or move your playing forward — whatever your level.',
    // ── Reasons wired to THIS SAME form from other pages (16/08/2026).
    // They replace old `mailto:` links (a 19/07/2026 stop-gap) that opened the
    // visitor's mail client: the request then only existed in David's inbox and
    // left NO trace in the database. Real prospects were lost that way.
    newsTitle: 'Get notified about the next showcases',
    newsIntro: 'Leave me your email: I’ll let you know as soon as the dates of the next free showcases in Paris are set. No spam — unsubscribe whenever you like.',
    contactTitle: 'Write to me',
    contactIntro: 'Tell me what brings you here — I read and answer every message personally.',
    goniTitle: 'Order a Gonilélé harp',
    goniIntro: 'Tell me which version you’re interested in and your options: I’ll reply personally with the summary and the details.',
    goniPrefill: 'Version (10 strings / 12 strings + pickup):\nCover (+€40) / Tuner (+€10):\nPickup in Paris or shipping (+€25):',
    collabPrefill: 'My project in a few lines:',
    vipTitle: 'An appointment just for you',
    vipScope: 'You decide what we do with it: discover and try any instrument from the shop (Neotone, acoustic handpans, Gonilélé, calabash…), test a handpan microphone (Hisong, Muling set), or simply get one-to-one guidance — whether you’re a complete beginner, still working out what suits you, or want to dig into one specific thing. Whether you take 1h or 1h30, just tell me what you’re coming for: I’ll have everything ready.',
    vipPriceLabel: 'Price',
    vipPriceNote: 'One single price, whatever you’re coming for.',
    vipPolicyShort: 'Cancelling less than 24 h beforehand: the payment stays with me — that slot was held for you — but the appointment can be rescheduled within 3 months.',
    sessionType: 'Which appointment would you like?',
    sessionTypeChoose: 'Choose…',
    // ⚠️ TWO REASONS ONLY (18/08/2026) — see the comment in dict.ts. The
    // `onboarding` key is kept (older rows in the database carry
    // `onboarding-60/-90`) but is no longer offered: getting started with an
    // instrument is now part of the lessons.
    sessionTypeNames: { onboarding: 'Getting started with my instrument', demo: 'Private demo and trying an instrument', lesson: 'Take a lesson with David' },
    discountTitle: 'Get my Neotone discount code',
    // ⚠️ ALWAYS BOTH RATES (21/08/2026) — see the comment in dict.ts.
    discountIntro: 'A personal code that I request for you from Neotone: −5% online, −7% if you come and try it at the showroom. Personal reply within 24 to 48 h.',
    discountModel: 'Which model are you interested in?',
    discountModelChoose: 'Choose…',
    discountModelNames: {
      one: 'Neotone¹ — 10 notes',
      mutant: 'Neotone¹ Mutant — 19 notes',
      undecided: 'I don’t know yet — help me choose',
    },
    discountCountry: 'Delivery country',
    discountCountryPlaceholder: 'France, Belgium, Switzerland…',
    discountNote: 'I only use these details to request your code from Neotone.',
    phonePlain: 'Phone',
    // Showcase only (24/08/2026) — see the French dictionary for the reasoning.
    phoneWhyShowcase: 'Required for a showcase: it’s a fixed date, and if anything comes up at the last minute on either side, I need to be able to reach you straight away.',
    socialLabel: 'Your social media account',
    socialHint: 'Instagram preferred — otherwise Facebook, YouTube or your own website.',
    socialPlaceholder: '@yourhandle or a link',
    discountNextTitle: 'What happens next',
    discountNext1: 'I read your message personally — I reply to everyone.',
    discountNext2: 'Within 24 h of me reading it, <strong>Neotone contacts you directly</strong> and sends you your discount code.',
    discountNext3: 'From there Neotone takes over: order, payment, delivery. I stay available if you need me.',
    discoveryLabel: 'How did you find me as a Neotone ambassador?',
    discoveryChoose: 'Choose…',
    discoveryNames: {
      youtube: 'YouTube',
      instagram: 'Instagram',
      facebook: 'Facebook',
      showcase: 'A showcase or an event',
      'word-of-mouth': 'Word of mouth',
      search: 'A web search',
      'neotone-site': 'The Neotone website',
      other: 'Some other way',
    },
    curiousTitle: 'Two questions, just out of curiosity',
    curiousHint: 'No obligation to answer — it’s just to get to know you.',
    playingSinceLabel: 'How long have you and the handpan been together?',
    playingSinceChoose: 'Choose…',
    playingSinceNames: {
      none: 'I don’t play one yet',
      'under-1': 'Less than a year',
      '1-3': 'Between 1 and 3 years',
      'over-3': 'More than 3 years',
    },
    dreamLabel: 'What you dream of playing',
    dreamPlaceholder: 'A piece, a mood, a project…',
    freeMessageLabel: 'Your message',
    freeMessageHint: 'Take all the space you want — I read everything.',
    // Suffix of the 1h30 option in the DURATION menu (no longer the reason menu).
    sessionTypeRecommended: '★ recommended at the start',
    sessionTypeHint: 'Just received your instrument — Neotone, acoustic handpan, microphone — and feeling a bit lost? That’s a lesson: pick “Take a lesson with David”, we set everything up together and walk through the controls — without committing to anything long-term.',
    // ── DURATION (18/08/2026, David’s words): “1h or 1h30. For getting started
    // the recommended length is 1h30”, “I give you all the keys to be
    // autonomous”. Durations and prices come from `sessionTypes` (src/data/site.ts).
    durationLabel: 'How long would you like us to take?',
    durationHint: 'For getting started with an instrument, the recommended length is 1h30: I give you all the keys to be autonomous.',
    slotsTitle: 'Your availability',
    slotsHint: 'Suggest up to 3 slots that suit you — I’ll confirm the one I keep.',
    slotLabel: 'Slot {n}',
    slotDate: 'Date',
    slotTime: 'Time',
    slotsRequired: 'Please give me at least one slot (date and time) that would work for you.',
    termsTitle: 'How it works',
    terms1: 'You suggest your slots. I reply personally to confirm the one I keep.',
    terms2: 'I send you the payment link in my reply: payment is what reserves your slot and commits us both.',
    terms3: 'Something came up? Up to 24 h beforehand we move your appointment, no problem at all — just drop me a line.',
    terms4: 'Less than 24 h beforehand, the payment stays with me: I had set that slot aside just for you, and I can no longer offer it to anyone else. But you don’t lose your appointment — we reschedule it for another date, within 3 months. We all have things come up, that’s life: it’s simply about the value of the commitment we make to each other.',
    instrumentsLabel: 'Which instruments would you like to discover?',
    instrumentsHint: 'Tick what interests you — I’ll have them ready for your visit.',
    instrumentNames: {
      neotone: 'Neotone (electronic handpan)',
      calebasse: 'Calabash',
      gonilele: 'Gonilélé (African harp)',
      'mic-hisong': 'Hisong microphone',
      'mic-muling': 'Muling microphone',
    },
    formatLabel: 'In person or online?',
    formatInPerson: 'In person — Paris 20th showroom',
    formatRemote: 'Online',
    showcaseTitle: 'Reserve my spot at the showcase',
    showcaseIntro: 'Free public showcase at the Paris 20th showroom. Booking recommended — seats are limited.',
    // Showcase only — "which instrument(s) are you coming for?" (see dict.ts).
    // Optional on purpose. No "Other" option and no free-text field: the
    // existing message box already covers it (David, 17/08/2026).
    showcaseInterestsLabel: 'Which instrument(s) are you coming for?',
    showcaseInterestsHint: 'Tick everything you’re interested in — I’ll have them ready for the session. Something specific? Tell me in your message below.',
    showcaseInterestNames: {
      all: 'All of them',
      handpan: 'Handpan',
      mic: 'Microphone (Muling and/or Hisong)',
      calebasse: 'Calabash',
      gonilele: 'Gonilélé (African harp)',
      meet: 'Meeting you',
    },
  },
  muling: {
    title: 'Muling microphone for acoustic handpan | David Lesage',
    description:
      'The Muling microphone for acoustic handpan, tested and presented by David Lesage: clear, precise capture with no feedback. Full video review, photos and ordering.',
    back: '← Back to the shop',
    eyebrow: 'Microphone for acoustic handpan',
    heroTitle: 'The Muling microphone',
    heroLead:
      'A microphone designed specifically for the acoustic handpan: clear, precise and faithful capture, with no feedback — on stage as in recording. I tested it thoroughly, here is my full review.',
    ctaInterested: 'I’m interested in this mic',
    ctaVideo: 'Watch my full review',
    videoTitle: 'My full video review',
    videoIntro: 'I walk you through the mic in detail: setup, resulting sound, comparisons and use cases.',
    photosTitle: 'The mic in pictures',
    photosIntro: 'My own photos of the microphone and how it mounts on the instrument.',
    whyTitle: 'Why I recommend it',
    whyText:
      'Amplifying an acoustic handpan is a real challenge: general-purpose mics capture the harmonics poorly, and feedback lurks as soon as you turn up. The Muling is built for this specific instrument — it captures the sound at the source, keeps the richness of the harmonics and lets you push the level with no howl. That’s what convinced me to represent it.',
    whyPoints: [
      { t: 'Built for handpan', d: 'A contact microphone designed for the handpan’s shell and harmonics, not a general-purpose mic repurposed.' },
      { t: 'No feedback', d: 'Capture happens in contact with the instrument: you raise the volume on stage without fearing howl.' },
      { t: 'Stage and studio', d: 'Faithful enough for recording, sturdy and practical enough for live.' },
    ],
    priceTitle: 'Price and ordering',
    priceLabel: 'Maker’s price',
    priceNote:
      'Shipping and any customs fees on top.',
    priceDiscountLabel: 'Ordering through me',
    priceDiscountNote: 'Code {code} — {pct}% off the maker’s price, reserved for orders placed through this form.',
    orderTitle: 'Order my mic',
    orderText:
      'The maker doesn’t offer online payment for France yet: I put you in touch directly. Fill in the form and you get Muling’s payment details right away — they then take over directly until your mic arrives.',
    ctaContact: 'Order my mic',
    mulingOrderTitle: 'Order the Muling mic',
    mulingOrderIntro: 'Code {code} applied — {pct}% off the maker’s price. Here are the payment details; Muling then takes over directly with you for the rest.',
    mulingOrderPriceLine: 'Maker’s price {base} € − {pct}% = {final} €',
    mulingQuantity: 'How many mics?',
    mulingDeliveryNote: 'Special delivery instructions',
    mulingDeliveryNoteHint: 'Building access code, floor, drop-off notes… (optional)',
    mulingDeliveryNotePlaceholder: 'E.g.: gate code 1234B, 3rd floor no elevator…',
    mulingCountry: 'Delivery country',
    mulingAddress: 'Address',
    mulingCity: 'City',
    mulingPostalCode: 'Postal code',
    mulingConsent: 'I agree that my details be shared with Muling Musical Instruments Co., Ltd. (China) and Résonances Productions to process my order.',
    mulingConsentRequired: 'Sharing your details with Muling is needed to process the order — tick the box to continue.',
    mulingBankTitle: 'To pay for your order',
    mulingBankIntro: 'Wire the exact amount to Muling, with your reference in the transfer note. Payment in euros, SEPA transfer only.',
    mulingBankBeneficiary: 'Beneficiary',
    mulingBankIban: 'IBAN',
    mulingBankBic: 'BIC',
    mulingBankBank: 'Bank',
    mulingBankRef: 'Transfer reference',
    mulingBankAmountLabel: 'Amount to transfer',
    mulingBankAdvantagePrefix: 'Your saving: ',
    mulingCopyLine: 'Copy',
    mulingCopiedLine: 'Copied!',
    mulingDownloadPdf: '⬇️ Download these details as PDF',
    mulingBankSepaOnly: '⚠️ This account only accepts SEPA transfers in euros — no SWIFT / international wire.',
    mulingBankNotified: 'Muling has been notified of your order at their official address ({email}), with all the details — they handle shipping and tracking.',
    mulingBankNext: 'Once you’ve paid, keep proof of payment (screenshot or PDF) and upload it here. Muling will get back to you to confirm receipt and send you the shipping and tracking details.',
    mulingProofLabel: 'Upload your proof of payment',
    mulingProofHint: 'Screenshot or PDF of your transfer (5 MB max).',
    mulingProofButton: 'I’ve made the transfer',
    mulingProofSending: 'Sending…',
    mulingProofError: 'The upload failed — try again, or write to me directly at contact@lesagedavid.fr.',
    mulingProofMissing: 'Upload proof of your transfer (image or PDF) before continuing.',
    mulingProofInvalidType: 'Format not accepted — upload an image (JPG, PNG) or a PDF.',
    mulingProofTooLarge: 'The file is over 5 MB — reduce it and try again.',
    // Coming back from the email link (?commande=<id>) — see dict.ts for the
    // full rationale. Nothing personal is shown here: only the reference,
    // derived from the id already present in the URL.
    mulingResumeIntro: 'You’re back to report the transfer for order {ref}. Confirm the email address you used when ordering, then upload your proof of payment.',
    mulingResumeEmailLabel: 'Email used when ordering',
    mulingResumeEmailHint: 'It is what identifies your order — no personal information is shown on this page until it has been verified.',
    mulingResumeEmailMissing: 'Enter the email address you used when ordering.',
    mulingResumeAmountNote: 'The exact amount of your order is in your confirmation email ({unit} € per mic).',
    mulingResumeMismatch: 'This email address does not match this order. Use exactly the one you gave when ordering, or write to me at contact@lesagedavid.fr.',
    mulingThankYouTitle: 'Thank you, all noted ✨',
    mulingThankYouText: 'Your proof of payment has been received and sent to Muling with all your order details. You’ll get a confirmation email at this address to keep as proof — Muling will contact you directly for shipping and tracking.',
    mulingOrderSending: 'Sending…',
    mulingOrderSubmit: 'Send my order',
    mulingOrderError: 'The order failed to send — try again, or write to me directly at contact@lesagedavid.fr.',
    specsTitle: 'The MP-1 capsule in detail',
    specsIntro: 'The technical characteristics of the MP-1 contact capsule, as observed in real-world testing.',
    specs: [
      { t: 'Boundary condenser microphone', d: 'This isn’t an ambient mic: the capsule picks up vibrations in direct contact with the shell. That’s what gives a faithful sound even in a noisy venue.' },
      { t: 'Magnetic mount', d: 'The capsule attaches and detaches magnetically: instant setup, perfectly secure hold on the instrument.' },
      { t: 'Tiny', d: 'The size of a fingertip — you forget it’s there, visually and while playing.' },
      { t: 'ABS housing with metal hardware', d: 'An ABS body reinforced with metal parts: light on the instrument, yet sturdy on the road.' },
      { t: 'Output impedance: 600 Ω', d: 'A standard impedance, perfectly matched to the HMP-2 preamp and to classic line inputs.' },
      { t: 'Very high isolation', d: 'Capture happens by contact: outside noise and other instruments barely get through — invaluable in a jam and on stage.' },
    ],
    specsCaution: '⚠️ Worth knowing before you buy: the capsules are designed exclusively to work with the Muling preamp. They are not compatible with other brands’ gear — this is a complete system, not a capsule to add to an existing setup.',
    specsSource: 'Technical characteristics provided by the maker, cross-checked with my own use.',
    boxTitle: 'What the set contains',
    boxIntro: 'The HMP-2 set is complete: two capsules and the preamp, ready to play on one or two handpans.',
    boxItems: [
      '2 magnetic contact capsules (active mics)',
      '1 two-channel HMP-2 preamp',
      '2 gold-plated 6.35 mm jack cables',
      '1 hard carrying case',
      '2 fabric storage pouches',
      '1 screwdriver to open the preamp (battery access)',
      '4 adhesive mounting pads',
      'Cable clips (wire clips)',
      'The maker’s manual',
    ],
    boxNote: 'One set covers two handpans: one capsule per instrument, both mixed in the preamp. On a single handpan, you can fit both capsules for a more balanced capture.',
    preampTitle: 'The HMP-2 preamp in detail',
    preampIntro: 'The heart of the system: a two-channel preamp designed specifically for handpan, with built-in tone shaping.',
    preampFeatures: [
      { t: 'Two independent channels', d: 'CH1 and CH2 each have their own volume: you balance your two capsules (or two handpans) precisely before the output.' },
      { t: 'SHAPE control', d: 'The big knob sculpts the sound: at 0 you keep the original tone; turning clockwise boosts lows and highs while reducing mids — perfect to cut through a busy mix.' },
      { t: 'Mixed 6.35 mm jack output', d: 'A single cable runs to your speaker, mixer or audio interface.' },
      { t: 'CH2 switch', d: 'Channel 2 accepts an active capsule (switch ON) or a passive H1-type pickup (OFF). Channel 1 is reserved for active capsules.' },
      { t: 'Power indicator', d: 'An LED confirms at a glance that the preamp is powered.' },
      { t: 'Metal chassis', d: 'A compact, sturdy enclosure the size of an effects pedal — it takes stage and road abuse.' },
      { t: 'About 20 h of battery life', d: 'With a simple 9 V battery you get around twenty hours of playing: enough for several gigs without a second thought.' },
      { t: 'Impedances: 1 MΩ in, 600 Ω out', d: 'A high-impedance input that preserves the full richness of the capsules’ signal, and a standard output that plugs in anywhere — speaker, mixer or audio interface.' },
    ],
    preampWarnTitle: 'Two important precautions',
    preampWarns: [
      'Never plug a passive pickup into channel 1: this channel permanently supplies power and it would damage your gear.',
      'On channel 2, switch the power OFF if you plug in a passive H1 pickup.',
    ],
    preampDiagramTitle: 'Every control explained',
    preampDiagramAlt: 'Annotated diagram of the HMP-2 preamp: inputs, volumes, SHAPE control, power and output',
    dangerTitle: 'Read this before you first plug it in',
    dangers: [
      '<strong>Never</strong> connect a passive pickup to the CH1 input.',
      'To use a passive H1-type pickup, channel CH2 must be switched <strong>OFF</strong>.',
      'The mains adapter must be <strong>centre-negative</strong>. Reversed polarity destroys the unit irreversibly.',
    ],
    makerEyebrow: 'The maker',
    makerTitle: 'Muling Musical Instruments',
    makerIntro:
      '<strong>Muling Musical Instruments Co., Ltd.</strong> (惠州市沐铃乐器有限公司) is a Chinese maker of pickups for acoustic instruments, based in Huizhou, Guangdong province. The company was founded in 2016 by <strong>Mò Cè</strong> (莫测), who designs its products.',
    makerBlocks: [
      {
        t: 'Mò Cè (莫测), the designer',
        d: 'A guitarist since the 1980s and a guitar teacher in the 1990s, Mò Cè moved into pickup design in 1999. He first worked as a designer for a Korean manufacturer, then for LSM, before founding his own brand. The maker claims three firsts: the first pickup with a built-in screen, the first pickup combining piezo and microphone, and the OPUS series, produced according to him at more than 80,000 sets a year between 2001 and 2010.',
      },
      {
        t: 'The logo',
        d: 'The Muling logo is built on three symbols of classical Chinese thought: the <strong>yin-yang</strong>, the <strong>round sky and square earth</strong> (天圆地方), and the <strong>five elements</strong> (五行). A way of saying that the instrument, the pickup and the musician form a single whole.',
      },
      {
        t: 'The range',
        d: 'Muling develops three product families for string instruments, alongside a range dedicated to the handpan — including the HMP-2 set shown on this page — and custom signature pickups.',
      },
    ],
    makerLinksTitle: 'Follow Muling',
    makerZhNote: 'site in Chinese',
    powerTitle: 'Power: battery or mains',
    powerIntro: 'The preamp runs two ways — pick the one that fits your context.',
    powerBattery: {
      t: 'On a 9 V battery — total autonomy',
      d: 'A 9 V battery (6F22 type) sits inside the enclosure. Just open the base with the included screwdriver. This is the nomad solution par excellence: no power cable, you play anywhere. I personally use a rechargeable battery, cheaper and greener. Remember to remove it if you won’t use the preamp for a long time.',
    },
    powerMains: {
      t: 'On mains — for long sessions',
      d: 'The preamp also takes a 9 V 300 mA mains adapter, on a 5.5 × 2.1 mm DC socket with centre-negative polarity. Ideal in the studio, in rehearsal or for a long concert where you don’t want to depend on a battery.',
    },
    powerWarning: '⚠️ Important: the mains adapter is not included with the set. You need to buy it separately — check the specs carefully (9 V, 300 mA minimum, centre-negative polarity) so you don’t damage the preamp.',
    manualTitle: 'The maker’s manual',
    manualIntro: 'Both pages of the included manual, with the recommended capsule placement positions and the technical specifications.',
    relatedTitle: 'What if you play an electronic handpan?',
    relatedText:
      'The Neotone needs no microphone: it plugs straight in with a jack. If you’re hesitating between acoustic and electronic, my comparison will help you choose.',
    relatedCta: 'Discover the Neotone',
  },
  gonilele: {
    title: 'Gonilélé travel harp — La Maison du Ngoni | David Lesage',
    description:
      'The Gonilélé (NGoni lélé) travel harp-lute by La Maison du Ngoni, presented by David Lesage, ambassador. Photos, videos, unboxing, pricing and ordering.',
    back: '← Back to the shop',
    eyebrow: 'Ambassador · La Maison du Ngoni',
    heroTitle: 'The Gonilélé Harp',
    heroLead:
      'A travel harp-lute with a bewitching soul, handcrafted by Joris Feuillâtre. I’m proud to be its ambassador — discover the instrument, hear it, and take yours home.',
    ctaOrder: 'Order my Gonilélé',
    ctaVideos: 'Watch the videos',
    ctaLesson: 'Book a lesson',
    whatTitle: 'What is the Gonilélé?',
    whatText:
      'The Gonilélé (or NGoni lélé) is a West African harp-lute, reimagined as a travel version by Joris Feuillâtre of La Maison du Ngoni. A calabash body, a noble-wood neck, strings tuned to a pentatonic scale: it embodies the union of masculine and feminine, connected to the divine. An intuitive, meditative and deep instrument, for beginners and seasoned musicians alike.',
    ambassadorTitle: 'Ambassador of La Maison du Ngoni',
    ambassadorText:
      'I’ve worked with Joris Feuillâtre since 2023. The Gonilélé has accompanied me through major moments of my life — so it’s only natural that I now represent La Maison du Ngoni and pass this instrument on around me.',
    photosTitle: 'The instrument in pictures',
    unboxingTitle: 'Discovery & unboxing',
    unboxingText: 'I walk you through the Gonilélé in detail, from unboxing to first notes.',
    videosTitle: 'The Gonilélé played & presented',
    videosIntro: 'A selection of videos where I play and present the instrument — click to open on YouTube.',
    videoTitles: {
      extrait: 'Excerpt — the Gonilélé presented',
      uneAme: '“Une âme” — learning the Gonilélé',
      rappelle: '“Rappelle-moi la beauté” — on the Gonilélé',
      kothbiro: '“Kothbiro” — on the Gonilélé (432 Hz)',
      sonoriser: 'Easily mic your Gonilélé',
      amplifier: 'Amplify your Gonilélé',
    },
    tuningTitle: 'A tuning chart included',
    tuningText:
      'Every instrument comes with a tuning chart (pentatonic scale, 432 Hz) to help you tune your 10 or 12 strings easily. The full file is shared only with those who purchase the instrument.',
    pricesTitle: 'Pricing',
    priceRows: {
      cordes10: '10 strings — no pickup',
      cordes12: '12 strings — built-in pickup',
      housse: 'Cover (required for shipping)',
      accordeur: 'Tuner',
      envoi: 'Shipping (France)',
    },
    priceOption: 'option',
    orderTitle: 'Order & pickup',
    orderText:
      'To order, write or call me. Pickup in Paris 20th, or shipping within France (€25, cover required for shipping).',
    contactPhone: 'Phone',
    contactEmail: 'Email',
    contactPickup: 'Pickup',
    contactShipping: 'Shipping available — France · €25',
    paymentTitle: 'Payment',
    paymentText:
      'Payment is made to the account of the association Résonances Productions.',
    paymentIban: 'IBAN',
    paymentBic: 'BIC',
    coursesTitle: 'Want to learn with me?',
    coursesText:
      'I give private Gonilélé lessons (and more) online or in person in Paris: €50/h or €70/1h30.',
    coursesCta: 'Book a lesson',
  },
  // ============================================================
  // ATLAS STANDS (20/08/2026) — /en/pieds-atlas
  // Same rules as dict.ts: every figure comes from the official Atlas product
  // pages (see src/data/atlas.ts). David has NOT received the stands yet —
  // no hands-on opinion, no “I tested them”, and NO acoustic claim (Atlas
  // never makes one, and one of their own customer reviews denies it).
  // ============================================================
  atlas: {
    title: 'Atlas handpan stands — Atlas Pro & Atlas All | David Lesage',
    description:
      'The Atlas magnetic handpan stands, made in Italy: Atlas Pro in aluminium (€250) and Atlas All in wood (€270). Specifications, photos, and a chance to try them in Paris with David Lesage, a partner of the brand.',
    back: '← Back to the shop',
    eyebrow: 'Partner · Atlas Handpan',
    heroProCaption: 'Aluminium — the same stand, extended and folded',
    heroAllCaption: 'Wood — without then with its extensions',
    heightCm: '{n} cm',
    heroTitle: 'The Atlas stands',
    heroLead:
      'Atlas builds handpan tripods in Italy. The instrument is neither screwed down nor strapped in: it rests on a floating disc held by magnets. I have just become a partner of the brand, and two models are on their way to the showroom — the Atlas Pro and the Atlas All.',
    ctaModels: 'See both models',
    ctaSite: 'Atlas’s website',
    // 🎯 THE PRIMARY ACTION OF THE WHOLE PAGE (20/08/2026, David's call).
    //    Before: the main buttons sent people to Atlas's product pages.
    //    Now: trying them at the showroom is the solid button, buying online is
    //    the quiet link. Do not swap them back without David asking.
    ctaTry: 'Come and try them at the showroom',
    ctaTryModel: 'Try this one at the showroom',
    heroTryNote:
      'Both models will be at the showroom, in Paris 20ᵉ, alongside the handpans. You put an instrument on one, set the height, play — and you know.',

    whyTitle: 'What Atlas does differently',
    whyText:
      'What sets Atlas apart is the mount. The instrument is neither screwed down nor strapped in: it rests on a floating disc held by eight scratch-resistant magnets. At the showroom my handpans are already on tripods — that is what lets me pass them from hand to hand without setting them down every time.',
    whyPoints: [
      {
        t: 'On your lap, seated, standing',
        d: 'Atlas advertises three playing positions for its wooden range: the instrument on your lap, seated on a chair, or standing. The Atlas Pro is advertised for two — seated and standing.',
      },
      {
        t: 'A magnetic mount',
        d: 'The handpan rests on a floating disc with eight magnets. Atlas states that they are covered and placed under the spots where the instrument touches the stand: nothing pinches, clamps or rubs the metal.',
      },
      {
        t: 'Made in Italy',
        d: 'Atlas is a small Italian workshop based in Conegliano, in the Veneto. Both stands are designed and built there.',
      },
    ],

    // ── THE THREE QUESTIONS YOU ASK BEFORE ORDERING (20/08/2026) ────────────
    // 🚨 Every sentence is SOURCED and ATTRIBUTED (Atlas's official FAQ,
    //    /pages/discover-all-features, read on 20/08/2026). Nothing is endorsed
    //    by David: he has not received the stands yet. Keep the “Atlas states”.
    solutionFacts: [
      {
        t: 'It fits your handpan',
        d: 'Atlas states that the stand is designed for every handpan and tested with many makers, and that the magnets work with nitrided steel, stainless steel and Ember Steel.',
      },
      {
        t: 'It will not tip, and you can correct the ground',
        d: 'Atlas lists an anti-tip safety pin, a removable rubber centring collar, and legs adjustable by screwing — enough to make up for a floor that is not flat.',
      },
      {
        t: 'Fourteen days to change your mind',
        d: 'Atlas states free returns within fourteen days, with the return label supplied in the box. And if you can make it to the showroom, you will have decided before you even order.',
      },
    ],

    // ── 🎤 DAVID'S OWN STORY — « I play standing » (20/08/2026) ──────────────
    // ✅ The one section where David speaks fully in his own name: real, lived
    //    experience (years on stage standing, four different stands owned).
    //    Register: assumed conviction. Do NOT reintroduce defensive hedging.
    // 🚨 NEVER write or imply he has ALREADY USED the Atlas stands. He judges a
    //    DESIGN and announces he will verify. That is the only possible lie here.
    // 🚨 Competitors are named: everything stays PERSONAL TESTIMONY (« my S Pan »,
    //    « mine »), never a general verdict on the product — on a page where
    //    David earns a commission, a general verdict could be denigration.
    //    No price comparisons. Nothing negative invented about Jacomina Kistemaker.
    storyEyebrow: 'My own experience',
    storyTitle: 'Why I play standing up',
    storyIntro:
      'Ever since I started playing the handpan, I have played standing. First because I am a singer, and for me that is the best position to sing freely. Then because I am a multi-instrumentalist: I have an electronic kick pedal at my foot and several instruments around me. And because it is by far the most balancing posture for the body. A handpan stand is not an accessory in my line of work: it is what makes my way of playing possible.',
    storyVoiceTitle: 'Two handpans, a kick pedal, an N’Goni, a calabash — and I sing',
    storyVoiceText:
      'That is the setup I take on stage, and the one I used for my blind audition on The Voice. Everything stands, everything is within reach, and none of it holds together if the instruments are not at the right height. It is very concrete: a few centimetres too high and my singing goes off, a few too low and I can no longer reach my bass notes.',
    storyVoiceCta: 'See my background',
    storyStandsTitle: 'The stands I wore out before Atlas',
    storyStandsIntro:
      'I have tried several, and I ended up wearing them out for good. I am talking about MY units and MY use — the stage, the travelling, several dozen dates a year:',
    storyStands: [
      {
        t: 'Jacomina Kistemaker',
        d: 'I own two of her models. She is a maker I respect, and her stands served me for a long time.',
      },
      {
        t: 'Meinl',
        d: 'Mine is solid, genuinely so. But it is too heavy for me to carry around: when I leave to play, that is the criterion that decides everything.',
      },
      {
        t: 'S Pan',
        d: 'It has been my choice until today, and it has real qualities: light, easy to carry. On mine, it was the sliding systems and the 3D-printed parts that eventually gave up — one of them broke over time. I also wondered whether the suction-cup principle absorbed part of the vibration: that is a question I ask myself, not a measurement I made.',
      },
    ],
    // ── THE THREE STEPS OF THE STORY (20/08/2026) ───────────────────────────
    // The page is a funnel: my experience → the problem → the solution → come
    // and try them. These three eyebrows are what makes the step visible.
    problemEyebrow: 'The problem',
    solutionEyebrow: 'The solution',
    tryEyebrow: 'What happens next',
    storyConclusionTitle: 'Why Atlas, now',
    storyConclusion:
      'Given everything I have tried, this is the first design that answers every single problem I have run into: a magnetic mount instead of a suction cup, an Atlas Pro made entirely of aluminium — telescopic legs included — and 1.8 kg that go away in their bag. I am convinced, and I am looking forward to them.',
    storyBridge:
      'And there is an irony I rather like: the same stand opens up the posture opposite to mine. Its head lets you play seated, without resting the instrument on your legs — something I have never done, and am about to discover.',
    storyBridgeCta: 'The head of the stand',
    // 🖼️ Visible captions for the photos in the #debout section (not alt text).
    // 🚨 storyFestivalCaption never names the brand of the old stands.
    // 🔗 MESH: the {yishama} token becomes a link to /en/yishama — it is
    //    replaced by `mesh()` in AtlasPage.astro, so the caption is rendered
    //    with `set:html`. Never write a URL here. The handpans ARE Yishama
    //    instruments: naming them is a fact, not a sales addition.
    // 🖼️ Showroom photo in #debout (20/08/2026) — see dict.ts for why it sits
    //    here and not in #probleme or #solution. No stand brand is ever named,
    //    and nothing suggests the Atlas stands are in the picture.
    storyShowroomCaption:
      'Same thing at the showroom: my two Yishama acoustic handpans stay mounted on their stands, at playing height, ready to be played. A handpan stand isn’t an accessory you get out for concerts — it’s what the instrument lives on.',
    storyPlateauCaption:
      'My stage set up, before a concert in a hall in Switzerland. A handpan stand never lives on its own: it holds in the middle of everything else, and it is the thing that sets the height for all of it.',
    storyFestivalCaption:
      'Everness Festival, Hungary: standing behind my two {yishama} acoustic handpans — on the stands I was using then.',
    storyStandsPhotoCaption:
      'My stage setup close up: three instruments, three different stands, and just as many heights to set before playing.',

    partnerTitle: 'Why I am talking about them now',
    partnerText:
      'The partnership with Atlas has just been confirmed: I am now an affiliate of the brand, and they are sending me two demonstration stands for my showcases. As long as nothing was signed I preferred not to announce anything here — now it is done, so I am saying it.',
    // 🚧 This sentence disappears the day `ATLAS_AFFILIATE_URL` is filled in
    //    in src/data/atlas.ts (the page then switches to the tracking link).
    affiliateNote:
      'My tracking link is not in place yet: for now, the buttons take you straight to the official Atlas product page.',

    // ── 🗑️ REMOVED FROM THE PAGE ON 20/08/2026 — DAVID'S EXPLICIT DECISION ──
    //    These two keys are NO LONGER DISPLAYED: the "What I will check in
    //    front of you" card was deleted from AtlasPage.astro. His words (FR):
    //      « personne ne va vraiment aller sur mon site d'ici que j'aie reçu
    //        les pieds, donc supprime cette phrase, ça n'a aucun sens. Je
    //        prends cette responsabilité. »
    //    The keys are KEPT (no i18n key is ever dropped without approval) and
    //    the copy stays here, ready to be put back in one line.
    // 🚨 WHAT THIS DELETION DOES NOT ALLOW: it lifts nothing. Still forbidden
    //    everywhere on the page — "I tested them", "in use", "after several
    //    gigs with them", and any sensory detail David cannot know (felt
    //    weight, sound of the adjustment, real grip, lived stability
    //    comparison). His conviction and his analysis: yes. An experience he
    //    has not had yet: never.
    testTitle: 'What I will check in front of you',
    testText:
      'They arrive in a few days. What I claim on this page, I claim knowingly: I have worn out four different stands on stage, and I know exactly what I am looking for. What I do not have yet is the field test — so as soon as the two stands are at the showroom, I will film my own demonstration, put it here, and tell you how it goes.',
    // ✅ Since that deletion, this reserved frame carries the "the demo is
    //    coming" information on its own — without justifying it.
    // ⏳ `videoNote` no longer says "a matter of days": a dated promise turns
    //    false all by itself after a week.
    videoSectionTitle: 'The video demonstration',
    videoTitle: 'Demonstration by David Lesage',
    videoSoon: 'Coming soon',
    videoNote: 'I will film my own demonstration as soon as the two stands are at the showroom, and put it here.',

    modelsTitle: 'Two models',
    modelsIntro:
      'Both do the same job — holding the handpan on a floating magnetic disc. They do not do it with the same materials, nor over the same height range. Here is what the maker states, with nothing added.',
    specs: {
      price: 'Listed price',
      height: 'Height',
      weight: 'Weight',
      material: 'Materials',
      mount: 'Mount',
      positions: 'Playing positions',
      bag: 'Carrying',
      body: 'Atlas Body head',
      bodyOption: 'Atlas Body head',
    },
    heightValue: '{min} cm to {max} cm',
    weightValue: '{w} kg',
    priceNote: 'Prices read on Atlas’s website on {date}, during a sale. The price that counts is the one shown by Atlas when you order — shipping is extra.',
    priceRegular: 'usual price',
    pro: {
      name: 'Atlas Pro',
      tagline: 'Aluminium, telescopic, bag included',
      text:
        'The aluminium model. Its three telescopic legs adjust continuously and independently of one another, a quick-opening system lets you set it up and fold it away in a few seconds, and the structure closes in on itself for transport. Atlas states 1.8 kg, and the Atlas Bag is included.',
      material: 'Lightweight aluminium, telescopic legs',
      mount: 'Floating disc, 8 scratch-resistant magnets',
      positions: 'Seated or standing, continuous adjustment',
      bag: 'Atlas Bag carrying bag included',
      body: 'Wooden part not included',
      cta: 'See the Atlas Pro on Atlas’s website',
    },
    all: {
      name: 'Atlas All',
      tagline: 'Wood, modular with extensions',
      text:
        'The wooden model. Its main body is 3D-printed and sits on a wooden base fitted with an anti-tip pin. The legs are 41 cm long and extend by 10 cm; screwing on the three 41 cm extensions takes it from the seated position to the standing one.',
      material: '3D-printed body; wooden base, extensions and legs',
      mount: 'Floating disc, 8 scratch-resistant magnets',
      positions: 'On your lap, seated (without extensions) or standing (with extensions)',
      cta: 'See the Atlas All on Atlas’s website',
      body: 'Included — it is the core module of the range',
      // 🚧 No “Weight” or “Carrying” row for the Atlas All: Atlas gives neither
      //    its weight, nor the wood species, nor whether a bag exists for it.
    },


    // ── 🪑 THE HEAD OF THE STAND (20/08/2026) ───────────────────────────────
    // 🚨 Everything here is ATTRIBUTED TO ATLAS. David still has not received
    //    the stands and cannot confirm any sound impression.
    // 🚨 The Body is INCLUDED in the Atlas All, and Atlas claims NOTHING of the
    //    sort for the Atlas Pro. See `ATLAS_BODY_STATUS` in src/data/atlas.ts.
    headEyebrow: 'The head of the stand',
    headTitle: 'A stand — but not only a stand',
    headIntro:
      'The upper part of the support, the one Atlas calls the Atlas Body, is not just a piece to screw legs onto. Held between your thighs, it carries the handpan above you while you play seated on a chair or a sofa — no legs, no tripod, and without resting the instrument on your lap.',
    headPoints: [
      {
        t: 'The instrument no longer rests on you',
        d: 'The head carries the handpan, not your thighs. Atlas advertises three playing positions for its wooden range: on your lap, seated, standing.',
      },
      {
        t: 'The bottom notes stay reachable',
        d: 'The instrument is lifted off your body. Atlas emphasises that nothing gets in the way when you reach for the notes — which matters most if your handpan has bottom notes.',
      },
      {
        t: 'An open, hollow head',
        d: 'The crown is hollow and openwork. Atlas explains that this hollow shape lets the sound circulate without obstacles.',
      },
    ],
    headAcousticTitle: 'What Atlas says about the sound',
    headAcousticText:
      'Atlas writes that its stand “was born from the search for a better sound for your handpan”, that it “does not absorb vibrations and increases resonance”, and that “its hollow shape allows the sound to circulate without obstacles”. About the head alone, they add that it improves control of the instrument “without obstructing vibrations”.',
    // ⏳ "The stands arrive in a few days" removed on 20/08/2026: same reason
    //    as the deleted card above — a dated deadline turns false on its own.
    //    The SEPARATION OF VOICES does not move: Atlas talks about the sound,
    //    not David, and he announces that he will settle it himself.
    headAcousticNote:
      'Those are their words, not mine: when it comes to sound, I do not repeat anyone’s claim before hearing it myself. I will tell you what I hear.',
    headIncludedTitle: 'Included, or bought on top?',
    headIncluded: [
      {
        t: 'Atlas All — included',
        d: 'The wooden range is modular: the head is the core part, you screw the legs onto it to get the Atlas Short, then the extensions for the Atlas All. Buying the Atlas All does give you all three positions.',
      },
      {
        t: 'Atlas Pro — the wooden part is not included',
        d: 'Marco Agri, the creator of Atlas, confirmed it to me directly: “atlas pro doesn’t come with the wood part”. The Pro adjusts from the seated to the standing position, but it does not carry the wooden head, the one used for playing on your lap. Better to know before ordering than when opening the box.',
      },
      {
        t: 'Atlas Body — the head on its own',
        d: 'Atlas also lists it separately (€140, usually €165). It is what you look at if you only want lap playing, or if you want to grow a wooden set: the legs + extensions kit (€90) turns it into an Atlas Short, then an Atlas All.',
      },
    ],
    headCompatTitle: 'All the parts are fully compatible',
    headCompatText:
      'That is the other thing Marco Agri confirmed to me: “all parts are fully compatible with the others”. The most useful consequence: if you already own an Atlas All or an Atlas Short, you already have the wooden part — it fits straight onto an Atlas Pro, nothing is wasted. And if you are starting from scratch and want all three positions from the outset, the Atlas All is what gives them today.',
    headCompatSource: 'Marco Agri, creator of Atlas — message of 20 August 2026',
    headCta: 'See the Atlas Body on Atlas’s website',

    buyTitle: 'Where to order them',
    buyText:
      'Orders go through the Atlas website. They state around €12 shipping for Europe, and returns are free within 14 days, with the return label supplied in the box.',
    buyNote:
      'Delivery times and warranty length are not stated on their site: ask them before ordering, or write to me and I will ask on your behalf.',

    showroomTitle: 'Try them before you buy',
    showroomText:
      'Both stands will be at the showroom in Paris 20th, alongside the handpans. You can put an instrument on one, set the height, play standing, and see which of the two suits you — without buying anything.',
    // The three reasons to come, one line each. They must stay FACTS you can
    // check on the spot, never sales promises.
    showroomPoints: [
      'Both models side by side, not two photographs',
      'A handpan on top: you set the height yourself, seated then standing',
      'Without buying anything — you leave with your own opinion, not a box',
    ],
    showroomAgendaCta: 'See the next dates',

    // ── 📷 CAPTION OF THE SHOWROOM PHOTO (added 20/08/2026) ─────────────────
    // 🔗 {neotone} becomes a link to /en/le-neotone (replaced by `mesh()` in
    //    AtlasPage.astro). "Yishama" stays PLAIN TEXT here: it is already
    //    linked further up, in `storyFestivalCaption`. One link per target.
    // 🚨 THIS CAPTION DOES NOT SAY that the Atlas stands are in the photo —
    //    they have not arrived yet. It describes the CURRENT setup and says
    //    the Atlas stands will take their place there. Never rewrite it in the
    //    past tense. No stand brand is named in it.
    showroomPhotoCaption:
      'The showroom set up before a showcase: my two Yishama acoustic handpans and my two {neotone} electronic handpans, each on its own stand — four instruments, four different stands. This is where the two Atlas stands will take their place, and where you will be able to try them.',

    // ── 🎟️ THE DISCOUNT CODE — COPY READY, BLOCK SWITCHED OFF ──────────────
    // ⛔️ NONE of this is displayed while `ATLAS_PROMO_ACTIVE` is `false` in
    //    src/data/atlas.ts. As of 20/08/2026 the code DOES NOT EXIST yet at
    //    Atlas: showing it would have visitors type a code that gets refused.
    // ✅ These sentences are written to STAY TRUE on the day it is switched on:
    //    no amount and no percentage are announced, and David's commission is
    //    stated, not hidden.
    // 🏷️ The code itself (`DAVID-ATLAS`, src/data/atlas.ts) was chosen on
    //    20/08/2026 for the same reason: it announces no figure at all. Never
    //    write here an amount that the code would let the reader "guess".
    promoTitle: 'My code at Atlas',
    promoText:
      'Here is my code, to enter at checkout on the Atlas website — whether you order online or after coming to try them at the showroom.',
    promoDisclosure:
      'I am an Atlas affiliate: when an order goes through this code, I earn a commission. It adds nothing to what you pay, and it changes nothing about what I wrote above.',

    alt: {
      // 📷 Showroom photo (Le Nid, Paris 20th) — the SAME file as the one on
      //    /showroom (`showroomPhotos.instruments`, 1800×1012). Reused as is:
      //    no copy, no re-encoding.
      // 🚨 NO STAND BRAND IS NAMED HERE (same rule as `stageFestival`): we
      //    describe material and shape, never the maker. The INSTRUMENTS are
      //    named — they are David's, and that is what the photo proves.
      // 🚨 Do NOT list the Atlas stands: they are not in this photo.
      // 📷 /images/prod-muling-10.jpg — reused from /micro-muling, in #debout.
      showroomYishama:
        'David Lesage at the Le Nid showroom in Paris: behind him, two Yishama steel acoustic handpans, each mounted on its own black tripod on a woven mat, in a large white room with lit archways and a pale wooden floor.',
      showroomInstruments:
        'David Lesage’s showroom set up before a showcase: two Neotone electronic handpans with a lit rim, on black tripods next to an electronic drum kit, and two Yishama acoustic steel handpans, one on a wooden tripod, the other on a metal stand; a calabash half-sphere resting on a red mat in the foreground, old wooden floor, fairy lights and a rosette on the wall.',
      stageStanding:
        'David Lesage standing on stage under the spotlights, behind his two handpans mounted on stands, surrounded by his stands, his pedals and a calabash resting on the red carpet.',
      stageStands:
        'Close-up of David Lesage’s stage setup: three handpans resting on wooden and metal stands at hand height, a music stand and a laptop, cables and pedals on the floor.',
      // 🚨 NEVER name the brand of the stands in this caption or alt text — see
      //    the French file. Pointing at a competitor's product on a commission-
      //    paid page would be denigration. « the stands I was using then ».
      //    ⚠️ Source is only 900×600: never display it large.
      // ℹ️ Location given by David: Everness Festival, Hungary. That is ALL he
      //    gave — no year, no stage name, no audience size. Invent nothing.
      stageFestival:
        'David Lesage alone on the stage of the Everness Festival in Hungary: standing barefoot behind his two acoustic handpans mounted on black tripods, under green and red light beams, in front of a large multicoloured woven backdrop; a calabash half-sphere rests on the floor in front of him.',
      stagePlateau:
        'David Lesage’s stage set up and still empty before a concert, seen from his own position: a handpan resting on a black tripod at the centre of Persian rugs, a calabash, a djembe, a kick pedal on the floor, a control console, two open laptops and a monitor speaker, facing a large parquet hall with white columns.',
      allHeightLow:
        'The Atlas All tripod in light wood without its extensions, on a white background: the three short legs screwed under the black head, in the low position.',
      allHeightHigh:
        'The same Atlas All tripod fitted with its extensions, on a white background: the legs are twice as long, in the high position.',
      proTwoHeights:
        'Two Atlas Pro tripods side by side on a grey background: the left one extended to its high position carrying a steel handpan, the right one set low with its legs drawn in.',
      bodySeated:
        'A person seated on a sofa plays a handpan held by the Atlas Body gripped between their thighs: the instrument is lifted clear of their legs.',
      bodySide:
        'Side view of the same seated position: the handpan rests on the Atlas Body head, which holds it above the player’s legs.',
      bodyAlone:
        'The Atlas Body on its own against a grey background: the black openwork crown, its ring of round magnets and its wooden centring rod, on its turned wooden base.',
      proOpen:
        'The Atlas Pro tripod unfolded against a white background: a black openwork aluminium crown with a light wooden centring rod through it, and three splayed legs.',
      proHigh:
        'The Atlas Pro tripod set to its high position, its three telescopic legs fully extended.',
      proDisc:
        'Close-up of the Atlas Pro head: the black crown carries eight round metal magnets arranged in pairs, with the light wooden centring rod running through the middle.',
      proLock:
        'Close-up of the locking system on one of the Atlas Pro’s telescopic legs: the metal quick-clamp collar.',
      proClosed:
        'The Atlas Pro folded up: the three legs gathered along the body, ready to be put away.',
      proBag:
        'The folded Atlas Pro next to its Atlas Bag carrying case, in black fabric marked with the Atlas logo.',
      proParts:
        'The Atlas Pro separated into two parts: the magnetic head on one side, the block of three telescopic legs on the other.',
      allPlaying:
        'A musician plays standing at a handpan resting on the Atlas All tripod, in a living room: the three light wooden legs are extended to the high position.',
      allHigh:
        'The Atlas All tripod assembled with its extensions, in the standing position: long light wooden legs and a black head.',
      allLow:
        'The Atlas All tripod without its extensions, in the low position used for playing seated.',
      allBody:
        'The main body of the Atlas All: the black openwork crown and its wooden rod, resting on the turned wooden base.',
      allDisc:
        'The floating disc of the Atlas All seen from above: a black crown carrying eight round magnets arranged in pairs, with the light wooden centring rod in the middle.',
      allScrew:
        'Two hands screwing a wooden Atlas All extension onto a leg, with the metal threaded insert visible.',
      allWood:
        'The wooden parts of the Atlas All laid flat: the legs and the extensions with their black feet.',
    },
    // 🚧 KEY KEPT, NO LONGER DISPLAYED (20/08/2026). The “two heights” photo has
    //    moved INTO the Atlas Pro carousel (David: “put that photo in the
    //    carousel, save the space”), and a carousel has no per-slide caption.
    //    What the photo proves is already written twice elsewhere: in
    //    `heroProCaption` and in the “Height” row of the table. Do not delete
    //    the key — it comes straight back if David wants a visible caption.
    heightFigureCaption:
      'The same stand, photographed twice: on the left extended to its maximum with a handpan on it; on the right folded down to its minimum. The whole 51 → 109 cm range in a single picture.',
    photosPro: 'The Atlas Pro in pictures',
    photosAll: 'The Atlas All in pictures',
    carousel: { prev: 'Previous photo', next: 'Next photo', photo: 'Photo', photosOf: 'Photos of' },
    lightbox: { close: 'Close', zoom: 'Enlarge photo' },
  },
  lessons: {
    title: 'Handpan Lessons in Paris & Online | David Lesage',
    description:
      'Now Music Academy: learn the handpan, calabash rhythm (Now Groove) and the gonilélé harp — through colours, shapes and emotions. Online worldwide or in person in Paris, plus group workshops.',
    heroEyebrow: 'Now Music Academy',
    heroTitle: 'Learning through a holistic approach to music',
    heroLead: 'Handpan, calabash rhythm and gonilélé harp — through colours, shapes and emotions. Online anywhere in the world, or in person in Paris.',
    ctaBook: 'Book a lesson',
    ctaWorkshop: 'See the workshops',
    universesEyebrow: 'Three worlds',
    universesTitle: 'What you can learn with me',
    universes: [
      { t: 'Handpan', d: 'The visual method: colours, constellations and emotions make harmony clear and memorable — on acoustic handpan and on Neotone.', cta: 'Discover the app' },
      { t: 'Rhythm & Calabash', d: 'My Now Groove method: learn rhythm through visual emoticons, on the calabash. Playful, accessible to all and deep.', cta: 'The Now Groove method' },
      { t: 'Gonilélé harp', d: 'Discover the travel harp-lute: tuning, intuitive and meditative playing. Taught by me, ambassador of La Maison du Ngoni.', cta: 'Discover the Gonilélé' },
    ],
    workshopsEyebrow: 'Group workshops',
    workshopsTitle: 'Calendar of rhythm workshops · calabash',
    workshopsIntro: 'In-person Now Groove rhythm workshops on the calabash, in a friendly and joyful atmosphere.',
    workshopsEmpty: 'Upcoming dates in preparation — write to me to be notified first.',
    workshopsCta: 'See all the dates',
    workshopsContact: 'Questions & sign-ups:',
    promiseEyebrow: 'My teaching promise',
    promiseTitle: 'The visual method, in lessons',
    promiseIntro: 'I use Handpan Constellation Studio in lessons: colours, chord constellations and emotions make harmony clear and memorable — whatever your level, from curious child to seasoned musician.',
    pillars: [
      { t: 'Understand', d: 'See the structure of music instead of enduring it: each chord becomes a shape and a colour.' },
      { t: 'Memorise', d: 'You remember through shape and emotion, not by rote. The bearings stay stable from one scale to the next.' },
      { t: 'Play & accompany', d: 'The handpan becomes a true accompaniment instrument — sing over the songs you love.' },
    ],
    // 📷 27/08/2026 — the photo that proves `promiseIntro`. See the long note
    //    in dict.ts (FR). A real lesson: a STUDENT's hand (not David's), the
    //    app open in front of them in Logic mode. "Logic mode" is the app's own
    //    mode name (studio.modes[0]), not Logic Pro.
    methodPhotoAlt: 'During a lesson: a student’s hand playing a wooden Neotone, with the laptop right beside showing Handpan Constellation Studio in Logic mode — the circle of degrees in colour, one degree’s explanation bubble open on screen.',
    methodPhotoCaption: 'In a lesson, I keep Logic mode open in front of the student: one degree at a time, explained on screen while they play.',
    // Lightbox labels: the lesson photo opens full screen.
    lightbox: { close: 'Close', zoom: 'Enlarge photo' },
    formulasEyebrow: 'Formats & pricing',
    formulasTitle: 'Choose your format',
    formulas: [
      { title: 'Private lesson · 1h', price: '€50', text: 'Online or in person in Paris. Handpan, calabash rhythm or gonilélé: we work on what moves you.' },
      { title: 'Private lesson · 1h30', price: '€70', text: 'The ideal format to go further: harmony, rhythm, accompaniment, stage and studio tips.' },
      { title: 'Group workshop', price: 'On request', text: 'Group sessions in a small setting (calabash rhythm, handpan…), in a friendly atmosphere. Format and venue on request.' },
    ],
    footnote: 'Booking by email. In-person lessons in Paris are a natural bridge to the showroom and showcases.',
    faqEyebrow: 'FAQ',
    faqTitle: 'Frequently asked questions about the lessons',
    faq: [
      { q: 'Can you learn handpan without reading music?', a: 'Yes, that is the whole point of the method. The visual approach — the colours of the notes and the shapes of the chords — replaces music theory to help you progress fast.' },
      { q: 'How much does a handpan lesson cost?', a: 'A private lesson costs €50/hour or €70 for 1.5 hours, online or in person in Paris. Group workshops are available on request.' },
      { q: 'Do online handpan lessons actually work?', a: 'Yes, lessons are given online anywhere in the world, using the same visual method as in person. All you need is your instrument and a connection.' },
    ],
  },
  studio: {
    // 🚨 22/08/2026 — positioning fix, see the long note in dict.ts (FR).
    // An acoustic handpan teacher ruled himself out because the page read as
    // "an accessory of the Neotone". Acoustic is now in the SEO title, the
    // description, the hero badges and the second section — without demoting
    // the Neotone, which stays the flagship of the ecosystem.
    title: 'Handpan Constellation Studio — acoustic handpan & Neotone',
    description:
      'On any acoustic handpan — and on the Neotone. Learn through colours (ChromaKeys), chord Constellations and emotions, with no music theory.',
    heroEyebrow: 'The app — an original project by David Lesage',
    heroTitleA: 'Handpan Constellation Studio',
    heroTitleB: 'Music becomes visible',
    // ⚠️ 27/08/2026 — "first" removed here too: same hierarchy problem as the section title.
    //    Acoustic is still NAMED FIRST in the sentence (the 22/08 gain), but "as much as" puts
    //    both instruments on the same level.
    heroLead: 'On any handpan: your acoustic handpan as much as the electronic Neotone. A visual approach to music — through colours, emotions and geometry — to understand, memorise and play.',
    // Badges shown right under the title, before the lead: "which instrument
    // does this work on?" is answered without reading a sentence.
    heroBadges: ['Any acoustic handpan', 'Neotone electronic handpan'],
    ctaWait: 'Join the waiting list',
    ctaOpen: 'Open the app',
    problemEyebrow: 'The observation',
    problemTitle: 'The handpan has no visual notation',
    problem1Title: 'No notation shows the instrument',
    problem1Text: 'It’s a magnificent instrument — but how do you write it down? You learn by ear, by imitation, and past the first melodies you replay the same patterns: the instrument becomes a comfort zone you never leave.',
    problem2Title: 'On an electronic handpan, your bearings fade',
    problem2Text: 'The Neotone can switch scales endlessly — a strength, but a trap: the notes under your fingers are never the same twice. No fixed point — your brain overloads, as if you had to relearn the instrument with every scale.',
    chromaEyebrow: 'Colours & geometry',
    chromaTitle: 'What if we made the invisible visible?',
    chromaIntro:
      'Instead of note names — which change constantly — the app shows the <strong>structure</strong> of music. The 7 degrees each receive a fixed colour, from red to violet: this is the ChromaKeys system. And every chord draws a glowing geometric shape.',
    chromaPunch: 'What was invisible becomes visible.',
    constelEyebrow: 'The language of Constellations',
    constelTitle: 'The handpan’s new visual tablature',
    constelIntro: 'Beyond the ChromaKeys colours, the app links the notes of a chord: it draws a glowing figure — a <strong>chord constellation</strong>. Three ways to trace it.',
    constellations: [
      { t: 'Polygon', d: 'The closed shape of a chord: all its notes linked. You recognise the chord at a glance, by its shape.' },
      { t: 'Open', d: 'An open trace that follows the path of the notes — ideal for visualising a hand movement.' },
      { t: 'Hands', d: 'The trace designed for the gesture: which hand, which note. You read your playing directly.' },
    ],
    degEyebrow: 'Degrees & emotions',
    degTitle: 'Each degree becomes an emotion',
    degIntro: 'Playing a progression means telling a story: leaving home, setting off on an adventure, crossing a moment of tension, then coming back. You no longer memorise abstract rules — you feel, and you see.',
    modesEyebrow: 'The app, in four modes',
    modesTitle: 'The perfect companion for your instrument',
    modesIntro: 'The whole method fits into a single web app.',
    modes: [
      { t: 'Logic', d: 'The heart of the app. Play the 7 chords of any scale, build your progressions, follow the chords of the songs you love.' },
      { t: 'Sound Atlas', d: 'Explore scales from all over the world — Japan, the Orient, Africa, Celtic music… Listen to them, learn them, travel.' },
      { t: 'Creation', d: 'Compose your own custom scales, note by note and colour by colour, then keep them in your library.' },
      { t: 'MIDI Connect', d: 'The bridge between your Neotone and the app: your real playing appears live on the virtual handpan, and the app guides you through your chords and scales.' },
    ],
    versionAcoEyebrow: 'Which handpan does it work on?',
    // ⚠️ TWO SUCCESSIVE FIXES — see the French file for the full history.
    //    1. "No Neotone? Your acoustic handpan is enough" — phrased as a fallback for people
    //       who don't own "the real product".
    //    2. "Built first for your acoustic handpan" (22/08) — fixed that, but created the
    //       opposite hierarchy. David: "it sets up a dynamic of opposition from the start,
    //       whereas my whole message rests on the world of AND, not the world of OR".
    //    3. ✅ CURRENT (27/08): both worlds on strictly equal footing, naming what the app
    //       reveals in each. The word "acoustic" must stay in this title.
    versionAcoTitle: 'Built for your acoustic handpan <span class="text-copper">and</span> for the Neotone',
    versionAcoText: 'The app is exclusive to neither one nor the other: it is designed and built for both. But it doesn’t allow the same things on each — and that is exactly what makes both of them interesting. On an acoustic handpan, the frame is already there: the app makes it visible. On the Neotone, everything becomes possible: the app provides the frame. One app, two ways of revealing.',
    // 🗣️ PULL QUOTE — David's own words. Both sentences form the quotation: the first
    //    names the difference, the second resolves it without taking sides.
    duoQuote1: 'Electronics offers everything and reveals nothing; an acoustic imposes a frame — and a frame is something you explore.',
    duoQuote2: 'A frame you understand makes you freer than an infinite space where you lose yourself.',
    duoQuoteSource: 'David Lesage',
    duoAcoTitle: 'On an acoustic handpan',
    duoAcoText: 'Your instrument has its notes, its scale, its outlines: the frame is already there. The app makes it visible, and what looked like a constraint becomes ground to explore. The acoustic mode is free: you don’t need a Neotone to get started.',
    versionAcoBullets: [
      'Your scale appears in colour on a photo of your handpan.',
      'Learn new chords and progressions, guided step by step.',
      'Explore an atlas of scales by emotion — and imagine your own, custom-made.',
    ],
    versionAcoCaption: 'Acoustic mode: Handpan Constellation Studio’s visual approach, on your own handpan.',
    // 📷 THE TWO PHOTOS — THE PICTURE OF "AND". Same framing, same dimensions
    //    (1100×1955), same treatment: neither dominates. Real photos, not illustrations.
    //    `versionAcoPhotoCaption` / `versionNeoPhotoCaption` are the descriptive alts;
    //    `duoPhotoAco` / `duoPhotoNeo` are the short, symmetrical visible captions.
    versionAcoPhotoCaption: 'At the showroom: my acoustic Yishama handpan on its stand, the app above it, its chords drawn as constellations.',
    versionNeoPhotoCaption: 'My wooden Neotone, the tablet clamped on an arm just above it, a song’s score with its chords drawn as constellations.',
    duoPhotoAco: 'My acoustic Yishama handpan, and the app.',
    duoPhotoNeo: 'My Neotone, and the app.',
    versionAcoCta: 'Open the app',
    versionAcoYishamaLink: 'Where this approach came from: my two Yishama handpans',
    versionNeoTitle: 'On the Neotone',
    versionNeoText: 'Every scale in a single instrument: everything becomes possible. That is exactly where a frame becomes necessary — otherwise you get lost in the infinite. The app provides the frame the instrument no longer sets.',
    versionNeoBullets: [
      'Link your Neotone to the app via MIDI: your playing appears live on the virtual handpan.',
      'Change scale as often as you like: the colours of the 7 degrees never move.',
      'The app guides you through your chords and scales — on the one you have just loaded.',
    ],
    versionNeoCta: 'Discover the Neotone',
    // Lightbox labels: both photos of the pair open full screen.
    lightbox: { close: 'Close', prev: 'Previous photo', next: 'Next photo', zoom: 'Enlarge photo' },
    // 🎬 "Coming soon" video slot — same mechanism as /pieds-atlas.
    //    Driven by `studioAcousticDemoVideoId` (src/data/site.ts), set to null.
    demoVideoEyebrow: 'The video demonstration',
    demoVideoTitle: 'Demonstration on an acoustic handpan — by David Lesage',
    demoVideoSoon: 'Coming soon',
    demoVideoNote: 'I am filming the demonstration on my own acoustic handpan, and I will put it here.',
    storyEyebrow: 'The story — by David Lesage',
    storyTitle: 'The tool I wish I’d been taught as a child',
    storyP1: 'When I discovered the handpan, I hit the wall of my childhood again: no method, and the difficulty of visually organising the paths of notes. Then, with the Neotone, a new difficulty: the notes change place with every scale.',
    storyP2: 'So I built the tool I wish I’d been given: a visual approach to harmony, through colours, shapes and emotions — to understand, memorise, and finally sing while accompanying myself on the handpan.',
    storyP3: 'It’s the logical follow-up to <strong>Now Groove</strong>, my rhythm method (2021) that makes rhythm accessible through visual emoticons. Handpan Constellation Studio does the same for harmony: a tool designed by a musician, to raise the handpan to the rank of an accompaniment instrument — like the guitar or the piano.',
    waitTitle: 'The app is available',
    waitText: 'Create your free account (first name, last name, email) to get started, right in your browser. By continuing, you accept the Terms and the privacy policy. Choosing your plan and secure payment happen inside the app.',
    waitButton: 'Open the app',
    contribEyebrow: 'A living community',
    contribTitle: 'You’re not downloading an app — you’re joining a living project',
    contribIntro:
      'Handpan Constellation Studio evolves constantly, shaped by the people who use it. Your feedback, sent in one click from the app, is read and directly shapes what comes next.',
    contribCards: [
      { t: 'Constantly evolving', d: 'New features, scales and modes ship regularly, and they’re included. The app you use today will be even richer tomorrow.' },
      { t: 'Your feedback shapes the app', d: 'Straight from the app, you send your ideas and feedback in one click. Every message is read and steers the next updates.' },
      { t: 'A community, not a catalogue', d: 'You join a movement: making music visible and accessible. Together we build the tool we all wish we’d had as children.' },
    ],
    priceEyebrow: 'Pricing',
    priceTitle: 'Discovery, or Studio',
    priceIntro:
      'Start for free with Discovery. Upgrade to Studio to unlock the electronic Neotone mode (MIDI), advanced creation, saving and PDF/PNG export of your scores.',
    priceCta: 'Upgrade to Studio',
    priceFreeCta: 'Start for free',
    pricePopular: 'Most chosen',
    priceMax: 'Limited founder offer',
    priceOnce: 'one-time',
    pricePerMonth: '/ month',
    pricePerYear: '/ year',
    priceFree: {
      name: 'Discovery',
      price: 'Free',
      blurb: 'A free account to discover the visual approach: visualise, play and export your scores in acoustic mode, at no cost.',
    },
    priceTiers: {
      monthly: { name: 'Studio monthly', blurb: 'Unlock the electronic mode (Neotone/MIDI), advanced creation, saving and export — month by month, no commitment.' },
      annual: { name: 'Studio yearly', blurb: 'A full year of access: electronic mode (Neotone/MIDI), advanced creation, saving and export. About three months free compared to monthly.' },
      lifetime: { name: 'Studio for life', blurb: 'A single payment, lifetime access: electronic mode (Neotone/MIDI), advanced creation, saving and export. Founder offer, limited quantity.' },
    },
    priceNote: 'Amounts synced live with Stripe. Studio unlocks the entire creation workshop.',
    videosEyebrow: 'The app in motion',
    videosTitle: 'See Handpan Constellation Studio in action',
    videosIntro: 'Twelve video demos of the app — tap a thumbnail to play it full screen.',
    videos: [
      { t: 'Choose the key', d: 'Set an anchor note (here C) and the 7 coloured degrees appear.' },
      { t: 'Hear the scale', d: 'The app plays the scale note by note on the handpan.' },
      { t: 'The degree’s eye', d: 'Tap a degree’s eye (here the I) to isolate its chord.' },
      { t: 'Bonus notes', d: 'Beyond the 7 degrees, extra notes appear marked with a star.' },
      { t: 'Drawing styles', d: 'One Constellation, three ways to read it: Polygon, Open or Hands.' },
      { t: 'Transpose', d: 'Move the anchor note (C → F): the chord shape stays in place.' },
      { t: 'Colour ↔ chakra', d: 'Each degree carries the colour of its chakra.' },
      { t: 'Fingerings', d: 'The app suggests a left-hand / right-hand fingering.' },
      { t: 'Play the chords', d: 'Hit play: each degree lights up in turn and its chord blooms.' },
      { t: 'Interactive learning', d: 'The handpan becomes a guided surface: touch a coloured note.' },
      { t: 'Sound Atlas', d: 'Browse a library of scales from around the world.' },
      { t: 'Creation', d: 'Compose your own scale on the chromatic wheel.' },
    ],
    faqEyebrow: 'FAQ',
    faqTitle: 'The questions people ask me about Handpan Constellation Studio',
    faq: [
      { q: 'Do I need a Neotone to use Handpan Constellation Studio?', a: 'No. Handpan Constellation Studio works on any acoustic handpan, in the free acoustic mode, just as it does on the electronic Neotone handpan. You do not need the electronic instrument to get started.' },
      { q: 'Does Handpan Constellation Studio work on an acoustic handpan?', a: 'Yes, the acoustic mode is free. You visualise your scale in colours and learn your chords directly on your own acoustic instrument.' },
      { q: 'What are ChromaKeys?', a: 'They are the method’s colour system: each note is given a fixed colour. This lets you see the structure of the music at a glance, with no music theory required.' },
      { q: 'What is a chord Constellation?', a: 'It is the method’s visual tablature: each chord draws a geometric shape connecting its notes. You recognise and memorise your chords by their shape.' },
      { q: 'Is Handpan Constellation Studio free?', a: 'Handpan Constellation Studio bundles a lot of features, and it’s your use that decides what’s free and what isn’t. Learning the handpan on your own, on your own acoustic instrument, is free: seeing your scale in colour, recognising your chords, playing, creating and exporting your scores. What goes beyond your personal practice is paid: the electronic Neotone/MIDI mode, advanced creation, cloud saving. And if you use it as a working tool in lessons you charge for, that’s a Teacher Licence — with the student space, the exercises and watermark-free scores that come with it. Up-to-date prices are just below.' },
    ],
  },
  showroom: {
    title: 'Try a Handpan, a Gonilélé, a Mic in Paris — Showroom | David Lesage',
    description:
      'Try every instrument I play, in Paris: the Neotone electronic handpan, my Yishama acoustic handpans, the Gonilélé African harp, the calabash and the handpan microphones. David Lesage Showroom, 29 rue des Orteaux, Paris 20th: free showcases, private demonstrations and lessons.',
    heroEyebrow: 'Le Nid · Paris 20th',
    heroTitle: 'David Lesage Showroom',
    // 🚨 See dict.ts: opened up on 18/08/2026 at David's explicit request. The
    // Neotone stays the headline act — we WIDEN, we do not replace it with a
    // flat list where everything weighs the same.
    heroLead: 'The Neotone as the headline act — and with it everything else I play: my Yishama acoustic handpans, the Gonilélé African harp, the calabash and the handpan microphones. You hear them, you play them, the same day.',
    // See dict.ts: this CTA is the OPTION, shown BELOW the next free showcase.
    ctaBook: 'Book a private one-to-one slot (paid)',
    // "just sign up" played the booking down: it is required.
    ctaBookNote: 'Paid one-to-one slot: {grid}. Public showcases, on the other hand, are free — limited places · booking required.',
    // ⓘ No longer rendered since 17/08/2026 — see dict.ts.
    ctaNext: 'See the next showcase',
    exclBadge: '★ World first',
    exclTitle: 'Walk away with your Neotone¹, the same day',
    exclText: 'I’ll own this claim: as far as I know, Le Nid is the first place in the world where these instruments can be tried AND bought directly, on site. In practice, that means you can buy your Neotone¹ right here and take it home immediately — with no manufacturing wait. My Yishama handpans are not for sale: they are my personal instruments, there to be heard and played.',
    exclArgs: ['7% discount — the best price on the market (vs. 5% online)', 'No manufacturing delay, no waiting', 'Very limited stock — only a few instruments available'],
    // 🇫🇷 PENDING CLAIM — WRITTEN, PLACED, NOT PUBLISHED.
    // Only rendered when `FRANCE_EXCLUSIVITY_ACTIVE` is `true`
    // (src/data/showroom.ts) — today `false`. Full rationale, and the warning
    // that the page ALREADY claims « first place in the WORLD », live next to
    // that switch. Do not turn it on without David's explicit confirmation.
    franceClaim: 'The only place in France where these instruments can be tried and bought directly.',

    // ── 🧲 ONE SINGLE SECTION FOR THE INSTRUMENTS (21/08/2026) ──────────────
    // David: "they're all over the place, things need to be gathered
    // together". Three heading blocks of equal visual weight used to follow
    // one another on the same subject, plus a fourth for the Atlas stands.
    // Now: ONE section title (below), and the three former titles become its
    // three chapters (`duoTitle`, `alsoTitle`, `atlasTitle`, as <h3>). The
    // RUN OF THE SESSION stays a separate section: it tells what HAPPENS, not
    // what is there — the distinction the page had lost.
    // 🔤 No new fact: "All of it there to be tried" is already David's own
    //    wording in `agendaIntro`.
    // ➕ 21/08/2026 (evening) — the section gained a 4th chapter (the "In
    //    pictures" carousel, `galleryTitle` below). The title below was
    //    re-examined then and DELIBERATELY KEPT: the seven added photos show
    //    the instruments, the mics, the PA and the tablet — all of it playable
    //    on site. They do not widen the section's subject, they show it.
    onsiteEyebrow: 'On site',
    onsiteTitle: 'Everything you can try on site',

    // « The world of AND », showroom edition: here it is an EXPERIENCE, not a
    // purchase decision. Strict parity both ways — feature Yishama, but never
    // MORE than Neotone (David's explicit instruction, 11/08).
    // ⚠️ See dict.ts: this block is about the HANDPAN only. It is followed by
    // the `also*` block (Gonilélé, calabash, microphones) since 18/08/2026.
    // ✂️ "On site · " dropped (21/08/2026): it is now the eyebrow of the PARENT
    //    section (`onsiteEyebrow`), so repeating it in each of its three
    //    chapters wrote it three times in the same screen.
    duoEyebrow: 'Both handpan worlds',
    // 🚨 “the same AFTERNOON” → “the same DAY” on 21/08/2026 — see dict.ts.
    duoTitle: 'Acoustic and electronic handpan, the same day',
    duoIntro: 'The showroom is not here to make you pick a side. Both worlds live next to each other: you hear them, you play them, you feel the difference in your hands. Not competition — completion.',
    duo: [
      {
        sub: 'Acoustic · Yishama',
        title: 'My two Yishama handpans',
        text: 'My personal instruments are here. You play them, you compare them, and you hear what hammered steel does in a room — unamplified first, then miked.',
        points: ['Two 18-note instruments, tuned to 432 Hz', 'Miked with the Hisong and Muling microphones'],
        cta: 'My story with Yishama',
      },
      {
        sub: 'Electronic · Neotone',
        title: 'Both Neotone',
        text: 'One on a speaker, one on headphones. You move from one scale to the next, try the effects and the recorder — for as long as you need.',
        points: ['Every scale in a single instrument', 'One on a speaker, one on headphones, effects included'],
        cta: 'Discover the Neotone',
      },
    ],
    duoNote: 'To be clear: only the Neotone is in stock here — it is the only one you can take home the same day. The Yishamas are my personal instruments: they are here to be heard and played, and if you want your own, I point you to the workshop (I am an ambassador and affiliate).',

    // ── AND NOT ONLY THE HANDPAN (18/08/2026) ──────────────────────────────
    // Facts sourced strictly from elsewhere on the site — see dict.ts for the
    // list of sources. 🚧 NOT WRITTEN because unknown: how many Gonilélé /
    // calabashes are available to try on site. Do not invent a number.
    // ✂️ "On site · " dropped, same reason as `duoEyebrow` above.
    alsoEyebrow: 'And not only the handpan',
    alsoTitle: 'Everything else I play is here too',
    alsoIntro: 'The Neotone is the headline act of the showcase — but you don’t have to come for it. These instruments are out on the floor too, and you can pick them up just like the handpans.',
    also: [
      {
        title: 'The Gonilélé harp',
        text: 'The West African harp-lute from La Maison du Ngoni, in its travel version: a calabash body, a noble-wood neck, strings tuned to a pentatonic scale. Intuitive and meditative — you can approach it knowing nothing at all.',
        cta: 'Discover the Gonilélé',
      },
      {
        title: 'The calabash',
        text: 'I have played the calabash as a percussion instrument since 2012. It is also the heart of my Now Groove rhythm method: an organic drum kit with a natural sound, with its mat and its shakers.',
        cta: 'See the calabash kit',
      },
      {
        title: 'The handpan microphones',
        text: 'The Hisong AirStudio S1 and the Muling set (MP1 + HMP-2 preamp). We plug them into my acoustic handpans and you hear, live and one after the other, what each of them changes.',
        cta: 'See the microphones',
      },
    ],
    alsoNote: 'Coming for one of them in particular? Tick it when you book your spot: I’ll have it ready for the session.',

    // ── 🥁 “L'ÂME DU TAMBOUR”, THE PARTNER THAT WAS MISSING (30/08/2026).
    // David: “I forgot a partner: l'Âme du tambour. He is in my shop but he is
    // not mentioned on the showroom page.”
    // ⓘ He was not entirely absent: `programBonus` already names him at the very
    //   bottom. What was missing was his place among the PARTNER BRANDS.
    // 📐 A SEPARATE BOX, NOT A 4TH `also` CARD — same reason that moved the
    //   Atlas stands out of that block: `alsoNote` promises “tick it when you
    //   book”, and `showcaseInterests` / `demoInstruments` (src/data/site.ts)
    //   have NO `tambour` option. Adding one needs the three writes (form →
    //   api/subscribe.js → site-lead + column). Placed AFTER `alsoNote`, the
    //   promise stays true for the three instruments it targets.
    // 🚫 INVENT NOTHING: every fact here comes from `shop.products.tambour` and
    //   `programBonus`. “l'Âme du Tambour” is a proper name, the maker is
    //   Julien, the code is David-Tambour. No workshop, no town, no seniority.
    tambourEyebrow: 'Partner · L’Âme du Tambour',
    tambourTitle: 'The shamanic frame drum',
    tambourText: 'The handcrafted frame drums of Julien — “l’Âme du Tambour”, an aligned, passionate and honest maker. The drum is not out at every session: it comes out depending on who is there and what interests them. Tell me it draws you when you book, and I take it into account.',
    tambourCta: 'See the drum in the shop',

    // ── 🎠 “The rest of what I play” carousel (20/08/2026) — see dict.ts.
    //    Files are REUSED as-is from the dedicated pages; ids must match
    //    `showroomAlsoGallery` in src/data/showroom.ts.
    alsoAlt: {
      gonileleProduit:
        'The Gonilélé harp leaning against a tree trunk: a round calabash body covered with skin, a long carved light-wood neck and ten strings running up to the tuners.',
      calebasse:
        'The Now Groove calabash kit: a calabash half-sphere resting upside down on a wide skin mat, with two blue egg-shaped shakers.',
      hisong:
        'An acoustic handpan on a mat, next to the Hisong AirStudio S1 microphone on its stand, its earbuds, and the tablet showing the microphone settings app.',
      muling:
        'The underside of an acoustic handpan fitted with the Muling set: two red contact capsules stuck to the shell, cabled to the HMP-2 preamp lying on the floor.',
    },


    // ── 🦵 THE ATLAS STANDS (20/08/2026) ───────────────────────────────────
    // Affiliate partnership confirmed with Atlas (Italian maker): they are
    // sending TWO demonstration stands, so they will genuinely be on site.
    // ⚠️ Deliberately placed AFTER `alsoNote`: that note promises “tick it when
    //    you book”, which is only true for the three instruments above — the
    //    stands are NOT a checkbox on the booking form (no column expects them
    //    in the database; see the rule of three writes).
    // 🚨 Figures taken from the official Atlas pages (see src/data/atlas.ts).
    // ⚠️ David has not received them yet: no hands-on opinion here either.
    atlasEyebrow: 'New · Atlas partner',
    atlasTitle: 'And something to put your handpan on',
    atlasIntro: 'Atlas builds handpan tripods in Italy: the instrument rests on a floating disc held by eight scratch-resistant magnets, with nothing screwed or strapped onto the metal. I have just become a partner of the brand, and they are sending me both models as demonstration stands. They will be here alongside the handpans — you can set an instrument on one and adjust the height yourself.',
    atlasModels: [
      {
        name: 'Atlas Pro',
        text: 'Aluminium, 1.8 kg. Its telescopic legs adjust continuously from 51 to 109 cm, it folds away in seconds and travels in its bag, which is included.',
      },
      {
        name: 'Atlas All',
        text: 'Wood, from 50 to 96 cm. Its head is held between your legs to play seated without resting the instrument on your thighs; you then screw on the legs and extensions to play standing.',
      },
    ],
    atlasCta: 'Everything about the Atlas stands',

    // ── 📷 See dict.ts (19/08/2026): the page described the showroom without ever
    // SHOWING it. Alt texts describe what is actually VISIBLE (accessibility + SEO):
    // do not replace them with “showroom photo”.
    lieuEyebrow: 'The place · Le Nid',
    // 🚨 Fixed 21/08/2026 — see dict.ts: showcases can be held in the morning
    //    or the afternoon, so “evening” was simply wrong. No time of day in the
    //    page copy: the actual hour lives in the agenda, and nowhere else.
    lieuTitle: 'What a showcase at Le Nid looks like',
    lieuIntro: 'A workshop-flat in the 20th arrondissement: bare wood floors, fairy lights, and everyone sitting in a circle around the instruments. Fifteen of us, no more.',
    photoAlt: {
      // 🚧 Fallback photo — see dict.ts: the file is a VIDEO THUMBNAIL, the
      //    title “David Lesage Showroom” is burnt into the image and cannot be
      //    removed. It is therefore described in the alt text. Drop the last
      //    sentence once David supplies a clean photo.
      accueil:
        'David Lesage, arms open, welcoming you from the middle of the showroom’s main room: old wooden floor, white walls under the roof beams, a wall rosette, a handpan on its tripod behind him, cushions and a low sofa at the far end. (The words “David Lesage Showroom” are burnt into the image.)',
      vueEnsemble:
        'Wide view of a showcase at Le Nid: David Lesage sitting at the centre of the circle, handpans on stands behind him, the audience seated on the wooden floor, walls hung with fairy lights and a rosette above.',
      instruments:
        'The instruments set up at the showroom before the audience arrives: two Yishama acoustic handpans on tripods, two Neotone electronic handpans with their screen, a calabash resting on a red mat, all on an old wooden floor.',
      presentation:
        'David Lesage, microphone in hand, introduces the showroom instruments: the Neotone and the Yishama handpans lined up behind him, under the wall rosette.',
      gonilele:
        'David Lesage holding the Gonilélé, the African calabash harp, showing the Hisong AirStudio S1 microphone used to amplify it.',
      // 📷 Added 20/08/2026 — see dict.ts: the SAME room as `vueEnsemble`, but
      //    empty and in daylight. The two photos sit side by side on purpose.
      grandePiece:
        'The main room of the showroom in daylight, before the audience arrives: old wooden floor, a low sofa and cushions on the floor, an acoustic handpan on its tripod at the far end, a guitar hanging on the wall, plants and rolled-up floor mats in a basket.',
    },
    // 🚨 TWO CAPTIONS ARE NO LONGER RENDERED (21/08/2026) — keys KEPT:
    //    `grandePiece` and `presentation`. Their PHOTOS are still on screen —
    //    they are slides 3 and 4 of the opening carousel. They were being shown
    //    TWICE on the same page. `vueEnsemble` is kept as a figure: it is the
    //    page's only proof that the event exists and draws people.
    photoCaption: {
      vueEnsemble: 'A showcase at Le Nid — audience in a circle, instruments at the centre.',
      grandePiece: 'The same room in daylight, before everything is set up.',
      // 🗓️ 30/08/2026 (David): “complete it with all the other instruments and
      //    microphones”. This caption does NOT describe the photo (that is
      //    `photoAlt.instruments`, unchanged): since 21/08 it stands for the
      //    WHOLE section — hence the full inventory. Everything listed is
      //    really on site; add nothing that is not.
      instruments: 'What waits for you on arrival: the Neotones, my Yishama handpans, the Gonilélé, the calabash, the microphones and the shamanic drum — all ready to be played.',
      // 🚨 Fixed 20/08/2026 (David): the previous line said “before you pick
      //    up the mallets”. A handpan is played WITH THE HANDS, and no
      //    mallets are used at the showcases. Do not reintroduce them.
      presentation: 'The introduction, before you put your hands on the instruments.',
      gonilele: 'The Gonilélé, the African calabash harp — and the mic that amplifies it.',
    },
    // ── 🖼️ THE « In pictures » CAROUSEL — 21/08/2026 (evening). See dict.ts:
    // it is no longer a section of its own but the 4th chapter of "Everything
    // you can try on site" (`onsiteTitle`). Its former title announced photos
    // of the showroom — which the OPENING carousel already shows. The two
    // carousels share no photo: the opening one shows THE PLACE AND THE
    // PEOPLE, this one shows THE INSTRUMENTS AND THE GEAR. The title now says
    // what you actually see, and reads as the continuation of the section.
    galleryEyebrow: 'In pictures',
    galleryTitle: 'The instruments and the gear, up close',
    galleryIntro: 'Swipe with your finger, or click a photo to enlarge it.',
    galleryAltFallback: 'Photo of the David Lesage showroom — Le Nid, Paris 20th.',
    galleryAlt: {
      demoNeotone1:
        'David Lesage standing during a demonstration: he holds a Neotone electronic handpan facing the seated audience, in front of the wall of fairy lights.',
      demoNeotone2:
        'Wider view of the Neotone demonstration: David Lesage standing at the centre of the room, the audience seated in a circle on the wooden floor.',
      gonileleMicro:
        'The Gonilélé lying flat, strings up, next to the box of the Hisong AirStudio S1 microphone and its capsule on a stand.',
      yishamaMicros:
        'A Yishama handpan seen from above, two microphone capsules resting on the dome and four Hisong AirStudio S1 microphone boxes laid out around it.',
      tabletteAccords:
        'A tablet mounted above a handpan: the Handpan Constellation Studio app shows the seven chords of the D Kurd 18 scale as coloured constellations.',
      handpanTablette:
        'A Yishama handpan on its tripod with the tablet fixed on an arm just above it: the chord constellations appear in line with the instrument.',
      // 📷 Added 20/08/2026 — see dict.ts.
      salonInstruments:
        'The lounge corner of the showroom: an acoustic handpan on the floor beside the coffee table, a wooden Neotone electronic handpan with its headphones on the cushions, a large orange sofa, a bunch of flowers and the wall of fairy lights at the back.',
      // ⚠️ The exact Neotone model is deliberately NOT named — see dict.ts.
      sonoBose:
        'A wooden Neotone electronic handpan on its tripod, next to the showroom PA: a Bose L1 Model II tower with its T8S mixing console sitting on the bass modules.',
    },

    // ⓘ `eventsEyebrow` / `eventsTitle` ARE NO LONGER RENDERED (21/08/2026) —
    //    keys KEPT, nothing deleted. The bottom section only holds the PAID
    //    one-to-one option, so it now carries David's own words:
    //    `agendaMoreTitle` as its title, `agendaMoreText` as its intro, under
    //    the `individualEyebrow` eyebrow.
    eventsEyebrow: 'What you experience',
    eventsTitle: 'Test, meet, walk away with',
    // Eyebrow of the bottom section — says what it really is: the PAID,
    // one-to-one, by-appointment slot. The only one on the whole page.
    individualEyebrow: 'One-to-one · by appointment',
    eventsHighlight: 'Most asked for at the start',
    // 🚨 THE 1st ENTRY IS NO LONGER RENDERED (21/08/2026) — key KEPT.
    //    The page renders `events.slice(1)`, i.e. the three PAID formats only.
    //    It described the free public showcase in the middle of three paid
    //    cards, at the very bottom of a page that has been about that showcase
    //    since its first screen — and it was the page's 6th enumeration of the
    //    instruments. See the French dictionary for the full reasoning and for
    //    how to bring it back.
    events: [
      { t: 'Neotone showcase & instrument discovery', d: 'The free public gathering at Le Nid: David Lesage presents the Neotone — then everything is there to be tried, Yishama acoustic handpans, Gonilélé African harp, calabash and handpan microphones.', price: 'Public · Free' },
      { t: 'Getting started with your instrument', d: 'Just received your Neotone, your handpan or your microphone? We set everything up together and walk through the controls, step by step. In person or online.', price: '' },
      { t: 'Discovering the instruments', d: 'A private session at the showroom to try in depth whatever interests you: Yishama acoustic handpans, Neotone, calabash, Gonilélé, Hisong and Muling microphones.', price: '' },
      { t: 'Lesson or one-to-one guidance', d: 'With David Lesage, whatever your level: create your scales, play pieces and techniques, or simply get clear on what you’re looking for. In person or online.', price: '' },
    ],
    programEyebrow: 'How it unfolds',
    programTitle: 'What happens in a session',
    programIntro: 'Each session lasts about 2 hours: a time to listen, watch demos and talk — then the moment when you get to play.',
    // 🚫 See dict.ts: David's own words. Step 4 is an ADDITION (18/08/2026) and
    // the last step gained one sentence — nothing was rewritten. This run-through
    // must stay identical to the one in the confirmation email.
    program: [
      { t: 'The Neotone, live', d: 'I play for you: the raw sound, then with effects (octaver, reverb, looper) and singing along — the interface projected on screen.' },
      { t: 'Handpan Constellation Studio, the app that makes music visible', d: 'A live demo: the colours, the chord constellations, and how you learn by seeing music instead of decoding sheet music.' },
      { t: 'Acoustic sound & microphones', d: 'My two Yishama acoustic handpans, miked with the Hisong and Muling microphones — to compare and hear the difference.' },
      { t: 'The Gonilélé and the calabash', d: 'The Gonilélé African harp and the calabash are out on the floor too: I play them, I explain how you get started with them — and if that is what you came for, you are exactly in the right place.' },
      { t: 'Your questions', d: 'An open exchange: I answer everyone, from the curious beginner to the seasoned musician.' },
      { t: 'Your turn to play', d: 'Try both Neotone — one on a speaker, one on headphones — and my two Yishama acoustic handpans. Take your time to feel each instrument. The Gonilélé and the calabash are there too: pick them up.' },
    ],
    // ── DEMO IN A LIVE SETTING (18/08/2026, David’s words) — ⚠️ “DEPENDING ON
    // WHO IS INTERESTED”: this is NOT systematic and must never be promised as a
    // given. 🚫 INVENT NOTHING: “l’Âme du tambour” is a proper name given as is
    // (no origin, material or maker known); “professional Bose PA in concert
    // conditions” and “octaver pedal” are his terms, no specific model is known;
    // no number of available instruments is stated.
    // Must stay identical to the confirmation email (`showcase-email.ts`).
    programBonusTitle: 'And sometimes it goes further',
    programBonus: 'Depending on who is there and what they are interested in, the session can open up further: a demo of the Gonilélé in a live setting — with the effects and the octaver pedal, on a professional Bose PA in concert conditions —, the calabash, and even the shamanic drum “l’Âme du tambour”. It is not systematic: it depends on the people there that day and on what interests them. Tell me what draws you, I take it into account.',
    programNote: 'Children welcome, under their parents’ responsibility. The demonstration, talk and Q&A part can feel a little long for younger ones, so consider bringing a quiet activity, or a second adult to take over if needed.',
    // 🚨 NO EMAIL ADDRESS SHOWN HERE ANY MORE (18/08/2026) — see dict.ts.
    booking: 'Appointments are booked through the form only: you fill it in, your request reaches me, and I reply personally.',
    // ⚠️ `bookVisitCta` is no longer displayed (18/08/2026) — kept, not deleted.
    bookVisitCta: 'Book my showroom slot (paid)',
    bookPrivateCta: 'Book an individual appointment',
    agendaEyebrow: 'Agenda',
    agendaTitle: 'Calendar of free public showcases',
    // 🚨 See dict.ts: booking is MANDATORY (David, 17/08/2026). The showcase
    // stays FREE — it is the booking that becomes required, never the entry
    // that becomes paid. Do not reintroduce "free entry" / "booking recommended".
    agendaIntro: 'Neotone presentation by David Lesage — and a chance to discover everything else played at Le Nid: Yishama acoustic handpans, Gonilélé African harp, calabash, handpan microphones. All of it there to be tried. Free — limited places · booking required.',
    agendaEmpty: 'Upcoming dates in preparation',
    agendaEmptyText: 'The next dates are being finalised. Leave me your email and you’ll be the first to know, before the public announcement.',
    agendaEmptyCta: 'Notify me of the next date',
    agendaNextLabel: 'Next free showcase',
    agendaCount: '{n} upcoming date',
    agendaCountPlural: '{n} upcoming dates',
    agendaSeats: 'Free, booking required · limited places',
    agendaCta: 'Get notified about upcoming showcases',
    // 🚨 RENDERED ONCE ONLY SINCE 21/08/2026, ABOVE THE LIST.
    //    It used to be the <h3> of EACH of the five agenda rows: five rows,
    //    the same title five times, the same tag five times, the same address
    //    five times — and the only thing that actually differed, THE DATE, was
    //    small text underneath. Now each row's heading IS its date, and this
    //    shared label is written once, with the address, above the list.
    //    🚫 Do not put it back inside the loop.
    agendaEventTitle: 'Neotone showcase — and every instrument to try',
    // ⓘ `agendaEventTag` is no longer rendered per row — key kept. Free-ness is
    //    already stated three times around the list (`agendaTitle`,
    //    `agendaIntro`, `agendaSeats`).
    agendaEventTag: 'Public · Free',
    agendaEventTime: 'from {start} to {end}',
    // ── “Good to know before you come” (16/08/2026). Until now these three
    // rules only existed in the confirmation email — someone still hesitating
    // never saw them. They now sit on the page, before booking.
    agendaRulesTitle: 'Good to know before you come',
    agendaRuleTimeTitle: 'You choose the date — the start time is firm',
    agendaRuleTime: 'The session starts on time, with a presentation. Arriving late means missing information, and the whole group has to be brought back up to speed. If you arrive early, you can wait downstairs in the courtyard — no problem at all.',
    agendaRuleDurationTitle: 'Allow plenty of time',
    agendaRuleDuration: 'The programme runs about 2h — in practice it usually stretches closer to 3h, because the conversations keep going well past the end.',
    agendaRuleShareTitle: 'Bring something to share, if you feel like it',
    agendaRuleShare: 'A fruit juice, a cake, anything to pass around. Entirely optional, never a condition for coming — simply in a spirit of sharing, to make the moment warmer.',
    agendaBookCta: 'Reserve my spot',
    agendaMoreTitle: 'Can’t make these dates — or would you rather have a moment just for you?',
    agendaMoreText: 'Book an individual appointment with me, at another time that suits you.',
    accessEyebrow: 'How to get there',
    accessTitle: 'Showroom access',
    accessMaps: 'View on Google Maps →',
    access: [
      { icon: '🚌', t: 'Bus', d: 'Lines 26 and 64 — Orteaux stop, a 3-min walk (≈ 250 m). Line 76 — Bagnolet-Orteaux stop.' },
      { icon: '🚇', t: 'Metro', d: 'Line 9 — Maraîchers (5-7 min) or Buzenval (10 min). Line 2 — Alexandre Dumas (10 min).' },
      { icon: '🚊', t: 'Tram', d: 'Line T3b — Marie de Miribel stop (12 min walk).' },
    ],
  },
  // ⚠️ Voir le commentaire de `about` dans dict.ts : personne réelle,
  // chaque fait est sourcé, et rien de privé n'entre ici.
  about: {
    title: 'About — David Lesage, musician, teacher and inventor',
    description:
      'A trained drummer who became a handpan player and singer: the Conservatory, The Voice, Naxos and the international handpan scene, two custom instruments with no manual — and the tools I ended up building.',
    heroEyebrow: 'About',
    heroTitle: 'A trained drummer, handpan player, singer — and tool builder',
    heroLead:
      'I’m David Lesage: a trained drummer turned handpan player, singer, teacher — and tool builder. Here is my path, in order, with its dates.',
    heroImgAlt: 'David Lesage, musician',
    heroCtaStory: 'Read the story',
    heroCtaToday: 'What I do today',

    storyEyebrow: 'My story',
    storyTitle: 'From drums to handpan, by a long detour',
    storyIntro:
      'The steps, the encounters and the dates that lead to the instruments I play and the tools I build.',

    chapters: [
      {
        eyebrow: 'The beginning',
        title: 'Drums at 4, then music theory',
        paras: [
          'I started music at 4, on drums. From my very first lesson, reading sheet music was forced on me. I quit, and learned self-taught, by ear.',
          'I came back to it through school, in this order: first four years at the Marciac jazz college — the jazz section attached to the festival, sponsored by Wynton Marsalis — where I discovered vocal improvisation; then the lycée, with a <strong>TMD baccalaureate — Technique de Musique et de Danse</strong> — obtained in 2012 at Lycée Saint-Sernin in Toulouse. It is the equivalent of a sport-study programme, but music/study — also called adapted timetables. Then four years at the Toulouse Conservatory, which I left in 2013 with a drums award, highest honours.',
          'To “catch up”, I had 7.5 hours of music-theory class a week, across 4 different levels. I still can’t read music… that’s how disconnected the teaching was from sensation and from meaning, with an approach turned solely towards classical music.',
        ],
      },
      {
        eyebrow: 'The detours',
        title: 'Video, training, virtual reality',
        paras: [
          'I started bands, learned video shooting and editing, joined Thierry Vanoffe’s team in 2017 as a trainer and video creator for the Numéricoach channel, then from 2020 worked on Aora Mana — one of the first virtual-reality platforms for initiatory journeys — as camera operator, director, 360° virtual-reality editor and drone pilot.',
          'I sang in the blind auditions of The Voice on TF1, season 11, with an African song: <em>Koth Biro</em> — recorded on 21 December 2021, broadcast on 12 February 2022. After the show, I was invited for a solo concert in Côte d’Ivoire.',
          'Working as a Google trainer, I realised how good I am at finding technical and technological solutions to people’s problems. But well before that, I was already handling the sound for the conferences of the Salon Santé Nature, in Flourens — the fair moved venue several times —, and their IT equipment. I have always helped people find tricks and solutions to their computer problems.',
        ],
      },
      {
        eyebrow: 'Passing it on',
        title: 'The calabash, Now Groove and the ngoni',
        paras: [
          'I have played the calabash, as a percussion instrument, since 2012.',
          'On the calabash, I was missing the snare and the hi-hat. I solved it with plastic eggs — a workaround that became a way of playing, then a way of teaching.',
          'It became Now Groove (2021): a rhythm method built on call-and-response and visual emoticons, which holds up with fifty people in the same room.',
          'In 2018, while I was devastated by a break-up, my therapist Fred Hervaud placed his own N’Goni in my hands: that is how I met the instrument. In 2023 my collaboration with Joris Feuillâtre began, around the gonilélé harp, which I pass on today as an ambassador of La Maison du Ngoni. My lessons and workshops run under Now Music Academy, carried by the Résonances Productions association.',
        ],
      },
      {
        eyebrow: 'Singing',
        title: 'Marie-Christine Reculard and holistic singing',
        paras: [
          'Marie-Christine Reculard is my singing teacher. She created <em>Le Chant Holistique</em> (holistic singing), which she describes on her site as “une méthode unique de chant thérapeutique et énergétique par la voix, les couleurs, les voyelles sacrées, les mantras, le yoga et les techniques de respirations” — a singing method working through the voice, colours, sacred vowels, mantras, yoga and breathing techniques. Her site: <a href="https://www.mariechristinereculard.com/" target="_blank" rel="noopener" class="underline">mariechristinereculard.com</a>.',
          'Her method inspired me, notably for a “Sing &amp; Play” mode — singing while accompanying yourself on the handpan — that I am working on for Handpan Constellation Studio. It is still at lab stage: it is not available in the app today.',
        ],
      },
      {
        eyebrow: 'Naxos, Greece · June 2022',
        title: 'The concert that took me into the handpan world',
        paras: [
          'I play the HONA Festival, in Agia Anna. When I arrive I’m nobody: the stage is tiny, the sound system is bad, there’s no monitor. But I offer something people hadn’t seen — I sing, I play three handpans at once, and I handle percussion with both feet and hands.',
          'The next day I run into a man at the festival’s outdoor bar. I don’t know who he is; I’m told he’s one of the best handpan makers in the world. It’s Yonathan, from Yishama. He listens to me at length, calmly, and doesn’t try to sell me his instruments.',
          'That same summer, the very first beta Neotone is put in my hands. A month later I play the HUG festival in Hungary, stop by the workshop, and leave with a beta Neotone and a clear commitment: report the bugs and help the instrument evolve. I’ve done it ever since — thousands of reports later, I personally know Csaba, Norbert and the Soundventure team in Budapest.',
        ],
      },
      {
        eyebrow: 'May 2023 → August 2023',
        title: 'Two magnificent instruments, and no manual',
        paras: [
          'In May 2023 I receive the two handpans Yonathan designed for me: eighteen notes each, tuned to 432 Hz, built for one thing only — so I could sing while accompanying myself, in any key.',
          'There was no method. The handpan is a 21st-century instrument, still evolving, often modal, and there are almost as many note layouts as there are instruments.',
          'In August 2023 I opened a document — just to be able to see which chords I could play on my own instruments. A few months later, Yonathan suggested I turn it into a little chord booklet, for myself. I made the booklet. It became an application.',
        ],
      },
    ],

    quoteNaxos: 'At that moment, I had no idea I was walking into an extremely private circle of the international handpan world.',
    quoteNaxosSource: 'How I tell that concert',
    quoteShips: 'It was as if I had two spaceships, but didn’t know how to fly them.',
    quoteShipsSource: 'My two Yishamas, the first months',

    linkYishama: 'My story with Yonathan and my two Yishamas',
    linkApp: 'Discover Handpan Constellation Studio',

    todayEyebrow: 'Today · Paris 20th',
    todayTitle: 'Musician, teacher, and tool builder',
    todayIntro:
      'I’m a French performing-arts freelancer, based in Paris. Le Nid, at 29 rue des Orteaux in the 20th, is the place I run with Iris Chasles, opened on 13 March 2026: a human-sized venue in eastern Paris, where we welcome people in small numbers. Five strands meet there — concerts, a calabash rhythm workshop, individual lessons, a yoga class and psycho-corporeal support — plus the instrument presentations, free and by registration. You can touch, try, listen, and walk away with your Neotone the same day. My two Yishamas are there too, not for sale, just to be played. The full programme is published by the Résonances Productions association.',
    today: [
      { t: 'I play', d: 'Handpan, voice, calabash and ngoni on stage: 112 logged dates from 2009 to 2026, in 7 countries — including 21 at Jazz in Marciac, two editions of Sziget in Budapest, the Everness Festival in Hungary and a support slot for Amadou &amp; Mariam. Two recorded opuses under the title L’Alliance du Phoenix, and free showcases at Le Nid almost every month.' },
      { t: 'I teach', d: 'Now Music Academy: handpan, calabash rhythm and gonilélé harp, over video anywhere in the world or in person in Paris. I answer personally.' },
      { t: 'I build', d: 'Handpan Constellation Studio makes harmony visible through colours, shapes and emotions. Guso Facile does the same for the paperwork of freelance performers in France.' },
      { t: 'I bridge', d: 'Neotone beta-tester (Soundventure, Budapest), Yishama ambassador and affiliate, La Maison du Ngoni ambassador.' },
    ],

    milestonesEyebrow: 'Landmarks',
    milestonesTitle: 'A few dated landmarks',
    milestones: [
      { y: '2012', t: 'TMD baccalaureate — Technique de Musique et de Danse, Lycée Saint-Sernin, Toulouse.' },
      { y: '2012', t: 'I take up the calabash, as a percussion instrument.' },
      { y: '2013', t: 'Drums award, highest honours — Toulouse Conservatory.' },
      { y: '2018', t: 'I discover the ngoni — my therapist Fred Hervaud’s own instrument.' },
      { y: '2021', t: 'Now Groove — my visual rhythm method on the calabash.' },
      { y: 'Feb. 2022', t: 'The Voice season 11 (TF1): blind audition recorded 21/12/2021, broadcast 12/02/2022. Then a solo concert in Côte d’Ivoire.' },
      { y: 'June 2022', t: 'HONA Festival, Naxos. Meeting Yonathan (Yishama), first beta Neotone in hand.' },
      { y: 'July 2022', t: 'HUG Festival, Hungary. I leave the workshop with a beta Neotone.' },
      { y: '2023', t: 'My collaboration with Joris Feuillâtre begins (gonilélé harp).' },
      { y: 'May 2023', t: 'I receive my two Yishama handpans: 18 notes each, 432 Hz.' },
      { y: 'Aug. 2023', t: 'The document that would become Handpan Constellation Studio.' },
      { y: '13 March 2026', t: 'Le Nid opens, 29 rue des Orteaux, Paris 20th.' },
      { y: 'Today', t: 'Le Nid, Paris 20th — lessons, try-outs and showcases.' },
    ],

    visionEyebrow: 'My teaching vision',
    visionTitle: 'The handpan, a full-fledged accompaniment instrument',
    visionIntro:
      'With this approach, the handpan finally takes its place alongside the guitar and the piano. Thanks to the “4 Magic chords” (I-IV-V-VI), anyone can accompany the songs they love within minutes, while approaching theory as a game.',
    pillars: [
      { t: 'Visible', d: 'Colour, geometry and emotion replace jargon. You see music before naming it.' },
      { t: 'Accessible', d: 'Warmth, simplicity, a personal tone. From the curious child to the seasoned musician — I answer personally.' },
      { t: 'Checkable', d: 'Toulouse Conservatory, stage, years of Neotone beta-testing: dated landmarks anyone can verify.' },
    ],

    proofsEyebrow: 'My landmarks',
    proofsTitle: 'Credibility & background',
    proofsIntro: 'Dated, checkable landmarks.',
    proofs: [
      'Drums award, highest honours · Toulouse Conservatory (2013)',
      'Marciac jazz college · four years',
      'Five-octave vocal range',
      'The Voice season 11 · blind audition (TF1, 12/02/2022)',
      '112 logged stage dates · 2009–2026, 7 countries',
      'French performing-arts freelancer',
      'Neotone beta-tester (Soundventure, Budapest)',
      'Yishama ambassador and affiliate',
      'La Maison du Ngoni ambassador',
      'Le Nid · 29 rue des Orteaux, Paris 20th',
      'Résonances Productions · French non-profit association',
      'L’Alliance du Phoenix · Opus I & II',
    ],

    collabEyebrow: 'Collaborations',
    collabTitle: 'Got a project? Let’s talk.',
    collabIntro: 'Music education, handpan, my tools — or any other project, even beyond Neotone. Brands, organisers, media, collaborators: the door is open.',
    collabCta1: 'Let’s work together',
    collabCta2: 'Contact me',
  },
  contact: {
    title: 'Contact — David Lesage, musician & teacher',
    description:
      'I answer every message personally — a musician, not a customer-service desk. For your purchase, your lessons, the app or a collaboration: write to me.',
    eyebrow: 'Contact',
    title2: 'A question? Let’s talk.',
    intro: 'I answer every message personally — I’m not a customer-service desk, but a musician who plays the Neotone every day. To choose your model, your wood, or arrange your visit: write to me.',
    coords: { email: 'Email — quick reply', phone: 'Phone', showroom: 'Showroom · by appointment' },
    form: { name: 'Full name', email: 'Email', subject: 'Subject', message: 'Message', submit: 'Write to me', note: 'Or write to me directly at' },
    subjects: ['Buying a Neotone', 'Lessons', 'Handpan Constellation Studio', 'Collaboration', 'Press', 'Other'],
  },
  legal: {
    title: 'Legal notice & terms — David Lesage',
    description:
      'Legal notice and terms of the David Lesage website: publisher, hosting, intellectual property, prices and VAT. Showroom 29 rue des Orteaux, Paris 20th.',
    h1: 'Legal notice of the David Lesage website',
    blocks: [
      { h: 'Publisher', p: 'David Lesage — musician, teacher and inventor. Showroom: 29 rue des Orteaux, 75020 Paris. Email: contact@lesagedavid.fr · Phone: +33 6 10 73 31 52.' },
      { h: 'Hosting', p: 'Static site generated with Astro, hosted by Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, United States — vercel.com. Domain name managed by OVH SAS, 2 rue Kellermann, 59100 Roubaix, France.' },
      { h: 'Intellectual property', p: 'The content, texts, photographs and videos on this site are the property of their respective authors. The Neotone product photographs and specifications come from the official Soundventure Ltd documentation. David Lesage is an independent Neotone ambassador.' },
      { h: 'Prices & VAT', p: 'All displayed prices are indicative and may change without notice. The VAT rates applied by the calculator are the standard 2026 rates; customs fees outside the EU remain the buyer’s responsibility.' },
    ],
  },
  // ── TERMS & CONDITIONS (page /en/conditions-generales) ────────────────────
  // 🚨 Legal page published in a real person's name. Full translation of the FR
  // block — never a summary. Sources for every factual claim are listed in the
  // comment above the `terms` block in dict.ts. ⚠️ `version` must stay equal to
  // TERMS_VERSION in supabase/functions/site-lead/index.ts.
  terms: {
    title: 'Terms & conditions — David Lesage',
    description:
      'Terms and conditions of the David Lesage website: what the forms collect, why, with which tools, how long it is kept, and how to exercise your rights.',
    h1: 'Terms & conditions',
    versionLabel: 'Version',
    version: '2026-08-19',
    updatedLabel: 'Last updated',
    updated: '19 August 2026',
    lead: 'This page says plainly what happens when you fill in a form on this site: what I collect, why, with which tools, how long I keep it, and how you take back control whenever you want. No jargon. If anything is unclear, write to me — I’m the one reading.',
    inProgress:
      'This document accompanies an ecosystem still being built — the site, the app, the showroom and the partnerships with instrument makers are being set up step by step. It will therefore change as that setup progresses. The version in force is the one shown above, and that is the one you accept when you tick the box on a form.',
    sections: [
      {
        h: 'Who is responsible',
        p: 'David Lesage — musician, teacher and inventor. Showroom: 29 rue des Orteaux, 75020 Paris. Email: contact@lesagedavid.fr · Phone: +33 6 10 73 31 52. There is no marketing department behind this site: I decide what gets collected, I read it, and I answer you myself.',
        items: [] as string[],
      },
      {
        // Faithful translation of the FR block — David's own statement of
        // 17/08/2026. Do not add any legal relationship that isn't sourced.
        //
        // (17/08/2026) Association identification added. Single source:
        // https://www.resonancesproductions.org/association (the association's
        // own public page). Nothing else inferred: no VAT number, no officer
        // name, no other date. French identifiers (RNA, SIRET, APE) keep their
        // French labels — they have no English equivalent — with a short gloss.
        // 🚨 The site's publisher REMAINS David Lesage, as a natural person
        // (see "Who is responsible" above and the Legal notice page).
        h: 'My role, and who receives the money',
        p: 'Better said upfront, it avoids misunderstandings: this site presents instruments built by partners — Neotone, Yishama, the microphones, the Gonilélé harps. I act as a demonstrator, and I am not paid directly by those sales.',
        items: [
          'These are affiliate partnerships: they do generate a commission, and it is the association Résonances Productions (a French non-profit “association loi 1901”) that receives it, not me personally.',
          'So that you know exactly who that is, here is its official identification: Résonances Productions, a French non-profit association under the 1901 law, registered with the sub-prefecture of Pamiers and published in the Journal officiel des associations (the French official gazette) on 28 October 2017 — RNA no. W092002501 (national register of associations), SIRET 919 514 075 00010 (French business identification number), APE code 9001Z (performing arts). Registered office: 2 impasse des Bleuets, 09600 Aigues-Vives, France. Correspondence address: 29 rue des Orteaux, 75020 Paris, France. Email: contact@resonancesproductions.org.',
          'This identification says who receives that money, and nothing more: the publisher of this site is David Lesage, as a natural person — he is the one responsible for this page and for your data, as stated just above and on the Legal notice page.',
          'It changes nothing in what I tell you about an instrument: I answer as a musician who plays these instruments every day, and I would rather tell you an instrument isn’t right for you than sell it to you.',
          'No payment is taken on this site, nor by me. Purchases happen elsewhere: on the HelloAsso shop of Résonances Productions, inside the app for its subscription, or directly with the manufacturer for a Muling microphone.',
        ],
      },
      {
        h: 'What you give me, form by form',
        p: 'Nothing is collected behind your back: it all comes from what you type yourself. Optional fields stay empty if you leave them alone.',
        items: [
          'Booking (showroom visit, seat at a showcase, one-to-one appointment, Neotone discount code request): first name, last name, email, phone if you give it, number of people, target date, up to three time slots you propose, type and format of the session (in person or online), instruments you want to discover, Neotone model you have in mind, country, social media account, how you found me, how long you have been playing, what you would like to achieve, and your message.',
          'Contact: name, email, subject, message.',
          'App waiting list: first name, last name, email, whether you already own a handpan and which kind, the role or roles you declare (for yourself, to teach, to build), your goal, your number of students and — if you build handpans — your country, the number of notes you produce, the metals you work with and how you set your prices. Plus your motivation, if you apply as a beta tester.',
          'Muling microphone order: first name, last name, email, phone, quantity, full delivery address, instructions for the courier, message, and then the proof of payment you upload (image or PDF).',
          'In every case, a few things are added automatically: the site language, the page your request came from, the date and time you accepted these terms along with their version number, and — if you ticked the second, optional box — the date you agreed to receive my news.',
        ],
      },
      {
        h: 'What I do with it',
        // ⚠️ The count announced here must follow the number of items below.
        p: 'Three things, not one more.',
        items: [
          'Answer you. That is what every form exists for: I read and I reply personally.',
          'Organise what you asked for: confirming a slot, preparing the instruments for your visit, passing an order along. A one-to-one appointment request also creates a proposed lesson in my schedule, inside the app.',
          'Keep you posted about what’s new — but only if you ticked the second box on the form, the optional one, which is never pre-ticked: a new showcase date, the app opening up, a new instrument. If you leave it unticked, I only write to you about your request, and nothing else. If you tick it, I write rarely, and I target: depending on which door you came in through and what you said you were interested in, you don’t get the same thing as everyone else. You can stop it whenever you want, with no explanation needed.',
        ],
      },
      {
        // ── PHOTOS AND VIDEOS ON THE PREMISES (19/08/2026) — see dict.ts ───────
        // David's decision: add it to the terms, WITHOUT adding buttons to the
        // form. His intention, in his words, is the heart of it and must not be
        // buried in legalese: what matters to him is not any one person's face,
        // but showing the general atmosphere of the place and of what is shared
        // there, to make others want to come.
        // Blurring by default is what he actually does today — not a promise.
        h: 'Photos and videos taken on the premises',
        p: 'I photograph and film what happens here: the showcases, the appointments at the showroom, the instruments going from hand to hand. I publish some of it on this site and on my social media. What matters to me is not your face in particular: it is showing the general atmosphere of the place and of what is shared there, to make others want to come.',
        items: [
          'By default, I blur faces. That is what I do today: unless someone has told me they are fine with it, I do not publish them in a recognisable way.',
          'You can tell me no, and you owe me no explanation: a word on the spot is enough, or an email to contact@lesagedavid.fr. Before as well as after publication — if a photo or a video is already online, I take it down or blur you.',
          'You can also tell me yes, if you are happy to appear with your face visible: say so on the spot or by email. That is what lets me publish real group pictures rather than blurred-out faces.',
          'Either way, you can change your mind whenever you want, in one direction or the other.',
        ],
      },
      {
        h: 'On what basis',
        p: 'On your consent — and there are two boxes, because there are two different things. You can withdraw either one at any time: it does not undo what has already been done, but it stops everything from then on.',
        items: [
          'The “I accept the terms and conditions” box is mandatory: without it I cannot handle your request. The date you accepted is recorded together with the version number of this page — that is what makes it possible to know later exactly which text you had in front of you.',
          'The “I’d like to hear about upcoming dates and what’s new” box is optional, and it is never pre-ticked. It conditions nothing: your form goes through exactly the same if you leave it empty. Accepting the terms is not agreeing to receive my news — that is why there are two boxes and not one.',
          // Image rights (19/08/2026): David's decision — NO extra buttons in
          // the form. So never write here that a consent is collected at
          // sign-up: it is not. Point to the dedicated section instead.
          'Photos and videos taken on the premises go through no box on this form: the rule is blurring by default, and telling me is enough to object. The “Photos and videos taken on the premises” section describes it.',
          'For a microphone order, your delivery details are also quite simply necessary for the parcel to be shipped.',
        ],
      },
      {
        h: 'The tools your data passes through',
        p: 'I never sell or rent any data, to anyone. Here is the complete list of the services actually involved.',
        items: [
          'Supabase — the database where your answers are stored, and the storage space for payment proofs. The project is hosted in Ireland, inside the European Union.',
          'Vercel — the site’s host. The small server functions that relay the forms run in the United States.',
          'The contact@lesagedavid.fr mailbox — that is where notifications arrive and where I reply to you. It is hosted by Google.',
          'Google Fonts and YouTube thumbnails — the site loads its typefaces and the video thumbnails from Google’s servers. None of your answers are passed to them, but your browser’s IP address is.',
          'YouTube — a video only loads if you click on it, and it goes through youtube-nocookie.com. As long as you don’t click, nothing leaves.',
          'Muling Musical Instruments Co., Ltd. (China) — only if you order a microphone: the manufacturer ships it, so your order is emailed to it, at a Chinese address. That message contains your name, email, phone, the quantity ordered, your country, your full address, your delivery instructions, the amount and the order reference. A dedicated checkbox asks you explicitly before sending. The fact that the bank transfer goes to a German account changes nothing here: this information does travel to China.',
          'OVH — the lesagedavid.fr domain name.',
          'HelloAsso — some products, lessons and workshops are bought on the HelloAsso shop of Résonances Productions. By clicking, you leave this site: HelloAsso’s own policy then applies, and nothing you type over there goes through here.',
          'Stripe — the site reads the app’s displayed prices there, and nothing else: no personal data is sent to it from this site. The subscription and its payment happen inside the app, on its own site.',
        ],
      },
      {
        h: 'What leaves the European Union',
        p: 'Let’s be straight about it: part of the journey happens outside Europe. The database itself stays in Ireland.',
        items: [
          'The server functions that relay the forms run in the United States, at Vercel.',
          'My mailbox is hosted by Google, a US company — so are the emails we exchange.',
          'Typefaces and video thumbnails are loaded from Google servers.',
          // ⚠️ Verified in supabase/functions/muling-order/index.ts (MULING_EMAIL
          // = a QQ/Tencent address in China). The money and the data do NOT take
          // the same route — never imply nothing leaves Europe.
          'For a microphone order only, your order travels to China by email, to the manufacturer: name, email, phone, quantity, country, full address, delivery instructions, amount and reference. It is what makes shipping possible. Don’t confuse this with the payment, which stays in Europe: these are two different routes.',
        ],
      },
      {
        h: 'How long I keep all this',
        // ⚠️ Do NOT bring back “or you click in one of my emails”: there is no
        // click tracking at all (see the cookies section), and David wants none.
        p: 'Three years after our last exchange. And the clock resets to zero at every new exchange: you write to me, you reply to me, you book, you order, and the three years start again. If nothing happens for three years, your information is deleted. You can of course ask for it to be deleted long before that — see below.',
        items: [] as string[],
      },
      {
        h: 'Cookies and analytics',
        p: 'This site sets no cookies. It uses no analytics tool, no advertising pixel, no tracker — which is why there is no banner to accept when you arrive. The only thing your browser remembers locally is the language you chose: it never leaves your device.',
        items: [] as string[],
      },
      {
        h: 'Your rights, and how to use them',
        p: 'One move is enough: write to contact@lesagedavid.fr. No form to fill in, no proof to provide unless I have a serious doubt about your identity. I reply personally, within one month at most.',
        items: [
          'Access — know exactly what I hold about you; I can send you a copy.',
          'Rectification — correct anything wrong or out of date.',
          'Erasure — delete everything.',
          'Objection — refuse a use, in particular the news emails.',
          'Portability — get back what you gave me, in a file you can reuse elsewhere.',
          'Restriction — ask for your information to be set aside while we settle a disagreement.',
          'Withdrawal of consent — at any time, with no explanation needed.',
        ],
      },
      {
        h: 'Stopping my emails',
        p: 'Every news email contains an unsubscribe link: one click and it’s done. Otherwise, a single line to contact@lesagedavid.fr is enough — “stop” does the job perfectly, and you owe me no explanation. It cancels neither an appointment nor an order in progress: the messages needed to follow up your request keep coming.',
        items: [] as string[],
      },
      {
        h: 'If you disagree with me',
        p: 'You can lodge a complaint with the CNIL, the French data protection authority: CNIL, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — www.cnil.fr. But write to me first if you like: it’s faster, and I’d rather sort things out directly.',
        items: [] as string[],
      },
      {
        h: 'Security',
        p: 'The site is served over HTTPS end to end. The database can only be reached with dedicated credentials, and its access rules mean only my administrator account can read the requests. Payment proofs uploaded with an order go into a private storage space, never a public one. No banking details are ever entered on this site: no payment is taken here.',
        items: [] as string[],
      },
      {
        h: 'Appointments, showcases and orders',
        p: 'No payment happens on this site. A one-to-one appointment is paid through the link I send you in my reply: payment is what reserves your slot and commits us both. Up to 24 h beforehand we move it with no problem at all; less than 24 h beforehand the payment stays with me, but you don’t lose your appointment — we reschedule it within 3 months. Showcases are free, by reservation, with a limited number of seats. A Muling microphone order is paid by bank transfer, to an account located in Germany, directly to the manufacturer: you make the transfer yourself, and neither this site nor I take that payment. The manufacturer then handles shipping and tracking.',
        items: [] as string[],
      },
      {
        h: 'The site’s content',
        p: 'Texts, photographs and videos belong to their respective authors. The details — publisher, hosting, intellectual property, prices and VAT — are on the Legal notice page.',
        items: [] as string[],
      },
      {
        h: 'If these terms change',
        p: 'This page carries a version number and a date. When the text changes, the version changes with it, and the new one applies to forms sent afterwards. What you accepted stays recorded with its own number: we will always know which text you had in front of you that day.',
        items: [] as string[],
      },
    ],
    contactTitle: 'A question about this page?',
    contactText: 'Write to contact@lesagedavid.fr. I answer personally, and I much prefer a question asked too early to a doubt kept to yourself.',
    contactCta: 'Write to me',
    legalLink: 'See the legal notice',
  },
  data: {
    woodSupplements: {
      frene: 'Included in the base price',
      chene: 'Included in the base price',
      acajou: 'Option +€90 excl. VAT',
      cerisier: 'Option +€90 excl. VAT',
      noyer: 'Option +€190 excl. VAT',
    },
    woodEnNames: { frene: 'Ash', chene: 'Oak', acajou: 'Mahogany', cerisier: 'Cherry', noyer: 'Walnut' },
    woodDescriptions: {
      frene:
        'A light wood with marked longitudinal grain and a fine texture. Ash is the standard wood of the Neotone¹ — lightweight, balanced resonance, clean aesthetic. Chosen by musicians who want a neutral, versatile instrument that doesn’t draw too much attention while playing.',
      chene:
        'A sturdy wood with tighter grain than ash, in golden-honey tones. A noble character, visually warmer than ash. Included in the base price — the natural alternative for those who want a warmer look at no extra cost.',
      acajou:
        'A deep ochre-red wood, heavy and warm. Mahogany brings visual depth and vintage elegance — it instantly evokes classic, quality instruments. It develops a beautiful patina over the years.',
      cerisier:
        'A pinkish wood leaning toward orange, with fine, even grain. Cherry ages by gaining intensity, darkening slightly over time. A soft, distinctive character, between the lightness of oak and the depth of mahogany.',
      noyer:
        'A dark wood with deep chocolate nuances, sometimes marbled with lighter veins. Walnut is the most contrasted of the five, perfect for an unapologetically high-end look. Often requested for visual productions or stage setups where the instrument is in the spotlight.',
    },
    // ── Yishama steels (/yishama page). Taken from Yishama's own
    // article and catalogue. What Yishama does not say, we do not say.
    metalNames: { nitrure: 'Nitrided steel', inox: 'Stainless steel', ember: 'Ember Steel' },
    metalEnNames: { nitrure: 'Acier nitruré', inox: 'Inox', ember: 'Ember steel' },
    metalTags: { nitrure: 'Bright and powerful', inox: 'Warm, long sustain', ember: 'In the Yishama catalogue' },
    metalDescriptions: {
      nitrure:
        'It starts with cold-rolled steel with a low carbon content — usually DC04 — sent to a specialist facility for nitriding. The process hardens the steel and creates a protective layer on its surface. This is the historic handpan steel.',
      inox:
        'Stainless steel does not rust. That is its first quality, but not the most interesting one: above all it gives a very different timbre, rounder, with a far longer tail of sound than nitrided.',
      ember:
        'A stainless steel developed specifically for the handpan, which Yishama offers in its catalogue alongside nitrided and standard stainless. Yishama does not compare it to the other two in their article: rather than summarise what they do not write, the best thing is to hear it — ask them for a sound sample, or come and listen at the showroom.',
    },
    metalSound: {
      nitrure:
        'A more ceramic, almost clay-like sound. The high frequencies are amplified with great volume — Yishama write that it can be heard miles away.',
      inox:
        'A very warm and soft tone, with an abundance of sustain, longer than on nitrided. The amplified frequencies sit rather at the lower end of the spectrum.',
      ember: 'Not detailed by Yishama in their material comparison.',
    },
    metalCare: {
      nitrure:
        'Needs more care than stainless: regular cleaning and oiling. To be avoided at the beach, despite the nitriding layer.',
      inox:
        'Rust-resistant: cleaning and oiling can be less frequent, though still recommended. On the other hand it is very sensitive to heat — in direct sunlight it can temporarily go out of tune.',
      ember: 'A stainless steel: the same general precautions as standard stainless.',
    },
    metalBest: {
      nitrure: 'Outdoors, busking, anything that has to carry far without amplification.',
      inox: 'Indoors, concerts, the studio — rather than street playing.',
      ember: 'Worth hearing before deciding.',
    },
    // EN titles of the Yishama videos (same order as `videos` in data/yishama.ts)
    yishamaVideos: [
      'The very first meeting with the instrument',
      'What I love about my Yishama — the logic of the scale',
      'Fallin’ — Alicia Keys cover',
      'Copier-Coller — Bigflo & Oli cover',
      'Ave Maria, jazz style',
      'Rózsa — Hungarian traditional song',
    ],
    modelTaglines: { one: 'The essentials, no screen', mutant: 'Maximum expression, with LCD screen' },
    modelNotes: { one: '10 notes · no screen', mutant: '19 notes · LCD screen' },
    modelFeatures: {
      one: [
        '9 main notes + ding + dome (10 playing zones)',
        'Up to 9 scales loaded offline (dedicated keys) · unlimited when online',
        'Unlimited custom scale creation via web interface',
        'Multifunction ding: switch scale · built-in recorder',
        'Full MIDI control (in / out)',
        '1 pedal input (volume or expression)',
        'Mono audio output (1 jack) or stereo (2 jacks)',
        'Li-Ion 7800 mAh battery — 8 h runtime',
        '1,300 samples per scale · 48 kHz / 32 bit',
      ],
      mutant: [
        '9 note slots with extension zones = 19 notes per scale',
        'Up to 18 scales loaded offline (dedicated keys) · unlimited when online',
        'Unlimited custom scale creation via web interface',
        'Built-in backlit LCD screen',
        'Multifunction ding: switch scale · built-in recorder',
        'Full MIDI control (in / out)',
        '1 pedal input (volume or expression)',
        'Mono audio output (1 jack) or stereo (2 jacks)',
        'Li-Ion 7800 mAh battery — 8 h runtime',
        '1,300 samples per scale · 48 kHz / 32 bit',
      ],
    },
    specs: [
      { title: 'Studio audio quality', items: ['48 kHz / 32 bit · 24-bit / 384 kHz DAC', 'Signal-to-noise ratio: 112 dB', 'Audio latency: 5 ms', '1,300 studio samples per scale', 'Notes: 7 nuances × 10–15 velocities'] },
      { title: '7 official scales included (+ unlimited via the app)', items: ['Official scales from MAG Instruments & Yishama handpans', 'E.g. B-Amara · C-Aegean · C# Pygmy · D-Kurd · F#2 Pygmy · G-Romanian Hijaz…', 'Create your own scales, with no limit', 'Scales shared freely by the community'] },
      { title: '8-hour battery', items: ['Built-in Li-Ion 7.4 V · 7,800 mAh battery', '8 hours of continuous playing', 'Full charge: 4 hours', '12 V power adapter included'] },
      { title: 'Full MIDI in/out', items: ['MIDI controller (out) + MIDI sound module (in)', '6 body zones + 18 pads + Ding + Dome', 'MIDI notes assignable per zone', 'Compatible with MIDI standards'] },
      { title: 'Pro connectivity', items: ['Unbalanced line outputs (R/L)', 'Headphone output · MIDI in/out', '1 pedal input (volume or expression)', 'Mono (1 jack) or stereo (2 jacks)', 'WiFi · settings, scale creation'] },
      { title: 'Format, weight & sensors', items: ['47 cm diameter · 16 cm height', '3.5 kg (depending on wood)', 'Sensor precision: 0.5 cm', 'Sensitivity: 20 to 5,000 g', 'Detects strike, pressure and position'] },
    ],
    comparatif: [
      { aco: 'To play 10 scales, you need 10 handpans: hard to transport, bulky to store, rising budget.', neo: 'A single Neotone opens up endless scales — one instrument to carry, store and pay for. And you even create your own scales.' },
      { aco: 'Two players, two different scales: hard to play together or to share a scale.', neo: 'Everyone loads the same scale to play together — learning and sharing become simple, and you open up to the world to play with other instruments.' },
      { aco: 'In a jam with percussion, a saxophone or a bass, the acoustic handpan is quickly drowned out.', neo: 'The volume is adjustable: you stay audible among the other instruments, on stage or in a jam.' },
      { aco: 'Accompanying a singer is hard: a fixed acoustic scale adapts poorly to different voices.', neo: 'You accompany the voice in every range and play well-known songs like on a piano or guitar — the handpan finally steps out of its niche.' },
      { aco: 'Fragile and sensitive: you can’t play in full sun, and the tuning drifts over time and with knocks.', neo: 'Always perfectly in tune, unaffected by heat. Choose 440 Hz or 432 Hz and transpose a scale to play in the right key with other instruments.' },
      { aco: 'Very few notes. The physics of metal limits everything: size, dissonance, available space.', neo: 'Electronics free up note placement: far more notes and scales possible on a single instrument.' },
      { aco: 'Acoustic striking technique is demanding: it can be discouraging at first for some people, who give up for lack of immediate enjoyment.', neo: 'Adjustable-sensitivity sensors: a true sound from the first strike, the joy of playing right away.' },
      { aco: 'Bringing out the harmonics requires rare precision on acoustic.', neo: 'On the Neotone, harmonics come out easily — and the acoustic effects remain.' },
      { aco: 'On the acoustic Mutant, the mutant-note zones are small and precise.', neo: 'The striking-zone size is adjustable (up to 30% of the note): enlarge it to start, reduce it for precision.' },
    ],
    faq: [
      { q: 'What warranty comes with the Neotone?', a: 'Every Neotone comes with a 6-year warranty, a semi-rigid case and a charger.' },
      { q: 'Which company makes the Neotone?', a: 'The Neotone is made by Soundventure Ltd, in Budapest (Hungary). The instrument was born from the dream of two friends, Csaba and Norbert; the company was founded in 2021, with the support of MAG Instruments and Yishama Ltd. I’ve travelled to their workshops in Hungary several times: I personally know Csaba and Norbert as well as the whole team (Gergely, Dániel and the craftsmen at MAG Instruments, and Yonathan from Yishama). I’m also an official beta tester for the brand since 2023 — since the first Neotone¹, I’ve reported and helped fix thousands of bugs and suggested many improvements.' },
      { q: 'Who is the Neotone for?', a: 'For everyone: playing a digital handpan requires no prerequisites. It quickly becomes essential for stage musicians (looping, plugging in pedals), for studio recording, for night players (headphone play) and for digital nomads. And for players already won over, it opens up the infinite field of scale creation.' },
      { q: 'Does it feel the same as an acoustic handpan?', a: 'The experience differs from acoustic play: the sound doesn’t come directly from the instrument but from headphones or a speaker. Upsides: full immersion on headphones, adjustable volume, no more feedback on stage. Bose L1 systems are ideal; the Bose S1 Pro is an excellent portable option.' },
      { q: 'Is the Mutant identical to a real “mutant” handpan?', a: 'No. The extra notes are played via a distinct zone inside each tonefield, which requires soft, precise playing. You can enlarge this zone up to 30% of the note for more comfort.' },
      { q: 'I’m a beginner — do you recommend the Neotone?', a: 'Both models are perfectly suited to beginners. Playing the Neotone is even easier than playing an acoustic handpan: sensor sensitivity is adjustable, so you get a true sound from the very first strike. The Mutant requires slightly more precise playing for its extra notes, but lets you go much further in harmony.' },
      { q: 'Do I need extra gear to produce sound?', a: 'The Neotone is a self-contained digital instrument with its own sound engine: it doesn’t need a computer to work. It has no built-in speakers, so you need to connect it to a speaker (for example the standalone Bose S1 Pro+) or play with headphones to hear the sound.' },
      { q: 'Can you apply effects to the Neotone’s sound?', a: 'As with an electric guitar, you can connect any external gear: effects pedals (Boss OC-3), loop stations (Roland RC-505 MKII), reverbs (Strymon Nightsky, Hologram Microcosm).' },
      { q: 'Is the Neotone portable and battery-powered?', a: 'Yes. About 8 hours of continuous playing. It ships with a charger, usable whether the instrument is playing or not.' },
    ],
    procedure: [
      { title: 'Contact me to receive your discount code', text: 'Send an email with your first and last name, your delivery country, your email and your phone number.' },
      { title: 'Receive your unique discount code', text: 'You receive a personal discount code from Neotone (−5% online, −7% at the showroom).' },
      { title: 'Place your order with Neotone', text: 'Neotone gets back to you within two days with a personalised offer.' },
      { title: 'Pay the €1,000 excl. VAT deposit', text: 'On confirmation, you pay a deposit of €1,000 excl. VAT. This triggers the hand-crafting of your instrument.' },
      { title: 'Patience during manufacturing', text: 'The lead time varies between 2 and 5 months depending on the queue. You receive a personalised estimate.' },
      { title: 'Pay the balance and receive your Neotone', text: 'As soon as your instrument is ready, you’re notified by email. You pay the balance and the instrument is shipped with its invoice, worldwide.' },
    ],
    procedureShowroom: [
      { title: 'Book a session with me', text: 'Two options: come to one of my public showcase dates (one a month), or book an individual appointment just for you — 1h · €50 or 1h30 · €70.' },
      { title: 'Try both models for real', text: 'On the spot, you take your time to test the Neotone¹ and the Mutant, compare the woods, and ask me anything.' },
      { title: 'Walk away with your instrument the same day', text: 'You get the showroom discount (−7%) and walk away with your Neotone right away — no manufacturing wait.' },
    ],
    included: [
      { title: 'Carrying bag', text: 'Special black bag with shoulder strap and backpack straps · 520 × 220 mm.' },
      { title: 'Worldwide shipping', text: 'Shipping included in the price, anywhere in the world.' },
      { title: '6-year warranty', text: 'Repair + transport included.' },
      { title: 'Power charger included', text: 'Standard 12 V charger included (plug according to delivery country).' },
    ],
    extras: [
      { title: 'Headphones or earbuds', text: 'To play silently, at night or in a flat. Ideally headphones with a 6.35 mm jack (or an adapter).' },
      { title: 'An angled jack cable', text: 'A mono (1 output) or stereo (2 outputs) jack cable to connect the Neotone to your speaker. Important: choose an angled connector on the instrument side — that’s what lets you rest the handpan on the floor without damaging the connector.' },
      { title: 'A speaker', text: 'Essential to project the sound. My pick: the Bose S1 Pro+ (≈ €599), self-powered (8 h battery), superb in a jam or for small concerts — with more bass than the older S1 Pro, an optional wireless transmitter, and the Sub 1 subwoofer if you want real deep, warm bass.' },
      { title: 'A MIDI → USB cable', text: 'A MIDI-to-USB cable (or USB-A to USB-C) if you want to drive music software (DAW: Logic Pro, Ableton Live…).' },
    ],
    calc: {
      modeQuestion: 'How would you like to receive your Neotone?',
      modeOnline: '📦 Have it delivered',
      modeOnlineSub: 'Worldwide shipping included · 5% discount',
      modeShowroom: '🏠 Come to the showroom ★',
      modeShowroomSub: 'Paris 20th · 7% discount · no wait',
      step1: '1 · Choose your model',
      step2: '2 · Choose your wood',
      step3: '3 · Your delivery country',
      b2b: 'I have an intra-EU VAT number (B2B) — VAT is recoverable (reverse charge), you pay the price excl. VAT.',
      recap: 'Summary',
      basePrice: 'Public price excl. VAT (shipping included)',
      subtotal: 'Subtotal excl. VAT',
      savings: 'You save',
      // Intra-EU B2B case: the total shown is NOT a pure discount — it adds the
      // discount (a real gain) to the VAT that is not invoiced (cash flow, not a gain:
      // a VAT-registered buyer would reclaim it anyway). Hence the separate label + note.
      savingsB2B: 'You don’t pay upfront',
      savingsB2BNote:
        'That is {discountRate} discount + {vatRate} VAT on the base price — the gap with the catalogue price incl. VAT ({catalog}). Only the {discount} discount is a real gain: the VAT is simply never advanced (reverse charge), and you would reclaim it anyway.',
      getCode: 'Get my discount code',
      discountLabel: 'Ambassador discount',
      vat: 'VAT',
      finalTTC: 'Final price to pay (incl. VAT)',
      finalIncluded: 'Worldwide shipping included · 6-year warranty',
      finalShowroom: 'Pickup at the showroom · Paris 20th · no wait, no shipping fee',
      finalB2B: 'Price to pay excl. VAT (reverse charge)',
      finalB2BNote: 'VAT recoverable · intra-EU VAT number required',
      finalExtUE: 'Price to pay excl. VAT · outside the EU',
      finalExtUENote: 'No EU VAT · local customs fees at your expense',
      b2bNote: 'VAT reverse charge: you declare and recover the VAT in your country. A valid intra-EU VAT number is required.',
      vatStd: 'VAT',
      noVat: 'no EU VAT',
    },
  },
}
