---
title: "The players' map: a constellation where nothing is switched on by default"
description: "Handpan Constellation Studio now has its world map. Every player is a star on it — but yours stays dark until you light it, field by field, and the app never knows where you are."
pubDate: 2026-09-01
cover: "/images/blog-carte-joueurs-maquette.webp"
category: "communaute"
tags: ["community", "public profile", "map"]
lang: "en"
permalink: "la-carte-des-joueurs"
draft: false
---

The handpan is a small world, scattered very thin. People playing three streets apart have no idea. Someone goes looking for a teacher with no way of knowing there's one in their own town. That has always been true, and it has nothing to do with technology: there simply is no place where we can see each other.

Since the end of August, the app has one. **A world map, where every player who wants to be there is a star.** Country, town if you like, "I teach", "I make instruments", your Spotify and YouTube links, and even your instruments.

The map draws no line between players: **acoustic or electronic**, it's the same sky, the same star, the same settings. What places you somewhere isn't your instrument, it's what you chose to switch on.

But that isn't what this article is about. Community maps are everywhere. What's different here is **which way round the switch is set.**

## The reversal: you're not on it, and you never were

Try the thought experiment with the other services you use. You sign up, and you **are** on the map, in the directory, in the member list. Then, if that doesn't suit you, you go hunting for the setting that takes you off. Visibility is the default; opting out is the effort.

Here it's the other way round, and it's the one design decision that really matters:

> **You don't appear.** You use the app normally, nobody sees you. One day, if you feel like it, you flip a switch — and not before.

That switch has a name nobody can misread, **"Appear on the map"**, it lives in "🌍 My public profile" in your account menu, and it stays **off until you turn it on**. It is the only condition for appearing: there is no other route that puts you on the map.

And once it's on, it isn't a bundle. It's **field by field**. You can give your country and nothing else. You can wear the teacher hat without giving your town. You can add your links without saying what you build. Whatever is empty simply doesn't show — there's no orphan line on your card, no "not specified" pointing at the gap.

And the default isn't reversed once: **it's reversed at every level.** Your instruments show it best. You could reasonably assume that lighting your star publishes the list of your pans — it's exactly the sort of thing a players' map would want to show, and I find it valuable. It doesn't: **sharing your instruments is a second, separate box, and it's off by default too.** You can be on the map, with your town and your teacher hat, having said nothing about what you play. Turning something on here never drags anything else on with it.

Worth saying plainly: this isn't a compliance checkbox added at the end. It's the starting point everything else was drawn from.

## The app does not know where you are

That's the second point, and it's as technical as it is ethical.

**No geolocation. No address.** The app never asks the browser where you are, and never asks you for an address — it has no field for one.

So how does a star find its place? **It's derived from the name of the town you typed yourself.** That's all. What the app knows about your position is a word you wrote. And if you'd rather not type a town, your star sits on the country instead.

And I can be more precise than "we only store the town", because the difference is enormous. **There are only two place boxes in the whole system: a two-letter country code, and a town name of sixty characters at most.** That is all that exists. There is **no box for a latitude, no box for a longitude** — they aren't left empty, they were never created. A star's coordinates are worked out **at the moment of display**, by looking your town name up in a list of towns shipped with the app; and if you gave no town, the star sits at the centre of the country.

The consequence to remember: **never more precise than your town.** That isn't a promise of good behaviour, nor a setting someone could change their mind about one day. **Even someone who wanted to be more precise couldn't be** — there is nowhere to put the information. You can stay broader than a town, too: a region is enough, if that's what makes you comfortable.

## The preview isn't a promise, it's the same screen

Here's the detail I find most satisfying, and it's almost invisible.

While you fill in your profile, there's a panel beside it headed **"here's exactly what others will see"**. In a lot of apps, a panel like that is a *summary*: someone wrote it by hand, once, and it drifts quietly as the rest of the product moves on. You think you're showing one thing, you're showing another.

Here, that preview **is the map card**. The same component, to the pixel. It's not a faithful reproduction: it is literally the object that will appear when someone clicks your star, lifted out of its context and set next to the form, updating with every box you tick.

The difference is enormous and fits in one sentence: **there is no code capable of making the two diverge.** It isn't a guarantee I'm giving you, it's a guarantee I have no means of breaking.

## A map that owns up to being nearly empty

There's an awkward moment in the life of every community map: the beginning. Twelve dots on a world map look like a failure. The usual reaction is to hide the map until it's "presentable", or to pad it out.

I chose something else: **it has to be beautiful from the first few sign-ups, not only at a thousand.** When the stars are few, they grow larger, they carry a name, they link up to one another — scarcity becomes a drawing instead of a void. Which is exactly what the sky does, incidentally: twelve stars is plenty for a constellation.

And the corollary I care about most is a matter of honesty towards whoever is looking. A map that lets you believe it surveys the world is lying about its own sample — and given which way the switch is set, it would be lying a lot. So the map says it itself, on screen, in all seven of the app's languages:

> **A country with no dot isn't a country without players, it's a country where nobody has said yes yet.**

It can count to zero without flinching, too — "0 of you have lit your star" — and over an empty region it simply offers: "be the first dot in this area".

So what you see on that map is **who said yes**. Nothing else. It is not a census of handpan players in the world, and it never will be.

I may as well finish the demonstration, since it's true as I write this. **Tonight, 1 September 2026, the constellation holds one star.** Just one. A teacher, golden halo; no makers yet. That isn't an embarrassed confession, it's a date: the map has existed for a few days, and this is exactly where it stands. If you're reading this now, you can be the second.

### What that sky looks like once it fills up

Here's the one thing this page cannot honestly show you: a full sky. So let me show you the **design mockup** instead — the drawing the map was built from, with twelve stars instead of one.

> ⚠️ **What follows is a mockup, not the application.** The twelve players — Lena in Berlin, Kenji in Kyoto, Aïcha in Marrakech, Bruno in Curitiba… — and the "12 stars lit" counter are **entirely fictional**: those people don't exist, those numbers don't exist. It's a studio sketch. The real, verified number is the one in the paragraph above: **one star**.

<figure>
  <img
    src="/images/blog-carte-joueurs-maquette.webp"
    width="2000"
    height="1425"
    alt="Design mockup of the players' map in Handpan Constellation Studio. Top left, the screen labels itself: « MAQUETTE · CARTE DU MONDE » (mockup · world map), then the title « La constellation des joueurs ». The map is a night-blue sky, continents barely sketched in lighter slate blue over a faint grid. Twelve named stars sit on it, joined by dotted cyan lines: Nadia in Montreal, Sam in Bristol, Ingrid in Gothenburg, Lena in Berlin, Tomás in Lisbon, D. in Alsace, Marisol in Valencia, Elif in Izmir, Aïcha in Marrakech, Kenji in Kyoto, Bruno in Curitiba, Ari in Wellington — all twelve people are FICTIONAL, invented for the mockup. Some stars carry a golden halo, some a copper halo, some are plain cyan; the legend at the bottom of the map tells them apart: player, teaches, makes instruments. Above the map: filters All / Teachers / Makers, a « search a country or a city » field, a headcount switch « Lancement (12) » / « Plus tard (59) », and a counter reading « 12 stars lit · 5 teachers · 3 makers ». A card on the map reads « you are 12 who have lit your star ». On the right, a « click a star » panel, the results list with each star's name and city, and a « why this country is empty » card: a country with no dot is not a country with no players — it's a country where nobody has said yes yet."
    data-lb="carte-joueurs-maquette"
    data-lb-wide
    loading="lazy"
  />
  <figcaption><strong>Design mockup — fictional people.</strong> The sky, the sketched continents, the golden halos for teachers and copper ones for makers, the sentence about empty countries: all of that is what the application really does. The twelve names are made up.</figcaption>
  <p class="figure-hint"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>Click the image to open it, then click again for full size.</p>
</figure>

<p class="embed-maquette-intro">And you can handle it yourself, below: filter the teachers, search for a city, switch between "Lancement (12)" and "Plus tard (59)" to see how the drawing holds up as the sky fills.</p>

<div class="embed-maquette">
  <p class="embed-maquette-bandeau"><strong>⚠️ Design mockup — not the application</strong><br />The eleven other players and the counter shown below are fictional. <strong>One star is real: mine</strong>, in Paris — click it and you'll see my actual public profile, the very one the application publishes. On 1 September 2026 the application holds that star, and only that one. (The mockup's own interface is in French.)</p>
  <iframe
    src="/prototypes/constellation-joueurs-carte.html"
    title="Interactive mockup of the players' map (fictional data)"
    loading="lazy"
    referrerpolicy="no-referrer"
  ></iframe>
  <p class="embed-maquette-pied">Interactive frame — <a href="/prototypes/constellation-joueurs-carte.html">open the mockup full screen</a>.</p>
</div>

<p class="embed-maquette-mobile"><strong>⚠️ Design mockup — not the application.</strong> The handleable version is a wide-screen layout; on a phone it would be unreadable, so I'd rather give you the image above and the link than a frame you can't use. <a href="/prototypes/constellation-joueurs-carte.html">Open the map full screen</a> (eleven fictional players, plus my one real star). And to see the screen you light your star from — prefilled with my real profile, editable, with nothing saved: <a href="/prototypes/constellation-joueurs-profil.html">open the public-profile sandbox</a>.</p>

### The screen you light your star from

There's one question everybody asks before ticking anything: *what exactly gets published?* So rather than promise you an answer, I'll show you — using **my own data**, from my real public profile, and let you poke at it.

<p class="embed-maquette-intro">Below is the "🌍 My public profile" panel as it exists in the application, <strong>prefilled with my real profile</strong>. Flip the master switch off: my star goes dark in front of you. Untick "share my instruments": my four handpans vanish from the card. Rewrite the name: the card follows. The right-hand column isn't an illustration, it's the map's own card component — what you see there is literally what others would see. <strong>Nothing is saved</strong>: reload the page and my profile comes back. (The sandbox's own interface is in French.)</p>

<div class="embed-maquette embed-maquette-haute">
  <p class="embed-maquette-bandeau"><strong>🧪 Sandbox — nothing is saved</strong><br />This screen is prefilled with my real public profile and is fully editable: no data is sent or stored, reloading brings my profile back. The other players on the map are invented examples — except me, who is real. (Interface in French.)</p>
  <iframe
    src="/prototypes/constellation-joueurs-profil.html"
    title="Public-profile sandbox for the players' map, prefilled with David Lesage's real profile"
    loading="lazy"
    referrerpolicy="no-referrer"
  ></iframe>
  <p class="embed-maquette-pied">Interactive frame — <a href="/prototypes/constellation-joueurs-profil.html">open the sandbox full screen</a>.</p>
</div>

<p class="embed-maquette-mobile"><strong>🧪 Public-profile sandbox — nothing is saved.</strong> This is the screen you light your star from, prefilled with my real profile and fully editable; but it's a two-column desktop layout, and inside a phone-sized frame it would be unreadable. <a href="/prototypes/constellation-joueurs-profil.html">Open the sandbox full screen</a> (no data sent or stored).</p>

## Why "constellation", and not "member map"

It isn't a mood word. It's already **the app's word**, and it names something precise.

In Handpan Constellation Studio, [a chord is a Constellation](/en/blog/les-constellations-du-handpan): notes that look like nothing on their own, joined by lines, forming a shape the eye takes in at once. The gesture is always the same — take isolated points and make visible what connects them.

The map does exactly that, one level up. The isolated points are no longer notes, they're **people**. They already existed, scattered, unaware of each other. The map doesn't create them: it draws the lines.

What makes the word right rather than merely pretty is that the rendering follows: it isn't a road-map background with red pins. It's a sky, continents barely sketched in, and points of light. A **golden** halo for those who teach, a **copper** one for those who make instruments — with filters and a search, so you can find a teacher or a maker without scrolling through the whole world.

## And if you change your mind

One gesture. **You turn the master switch off, your star leaves the map, immediately.**

No fields to empty one by one, no form, no request to send me, no waiting period. And it isn't cosmetic hiding: the map simply only ever reads profiles whose switch is on, and there's no route around that filter.

That's the logical counterpart to the rest. A switch that's hard to turn on and easy to turn off isn't clumsy design — it's the right direction of travel.

## How to get there

In the app: your account menu, then **"🌍 My public profile"**. It's all on one screen — the switch, the fields, and the preview beside them. The map itself only opens to signed-in accounts: it shows people, it isn't a public page for a search engine to index.

Take your time filling it in without switching it on, if you want to see what it looks like. The preview updates as you type, and while the switch is off you're the only one looking at it.

And as always: if something's missing, or something bothers you, [tell me from inside the app](/en/blog/feedback-ameliorer-handpan-studio). A map of people is the kind of feature nobody can design alone in a corner — the questions it raises are raised for the people on it.
