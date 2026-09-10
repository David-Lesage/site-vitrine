---
title: "The handpan's capo: the same shape in every key"
description: "On an electronic handpan in Logic mode, a degree's constellation keeps the same shape whatever the key. Same gestures, different pitch — like a capo on a guitar."
pubDate: 2026-10-01
cover: "/images/blog-capo-2026-01-mutant-logique.webp"
category: "methode"
tags: ["method", "electronic", "keys"]
lang: "en"
permalink: "le-capo-du-handpan"
draft: false
---

This article is about the **electronic handpan** — today, a 19-note Neotone Mutant. On an acoustic handpan the notes cannot move: what follows does not exist there in this form.

<figure>
  <img
    src="/images/blog-capo-2026-01-mutant-logique.webp"
    width="1600"
    height="1170"
    alt="Logic mode on a 19-note Neotone Mutant, anchor note D. Four tone fields are lit red — D2 at the centre, D4 at the top, A3 on the left, F#3 lower left — joined by a red path. The handpan screen, the small white panel sitting under the ding, reads « I Équilibre D ». Below, the seven chord cards of the key: I Équilibre D, II Élan Em, III Aventure F#m, IV Détente G, V Tension A, VI Nostalgie Bm, VII Mystère C#°, each in its degree colour. Only the first card's eye is switched on — that is what draws the constellation."
    data-lb="capo"
    data-lb-wide
    loading="lazy"
  />
  <figcaption>Degree <strong>I</strong> with the anchor note on <strong>D</strong>. Remember this drawing: we are about to find it again, untouched, in two other keys.</figcaption>
  <p class="figure-hint"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>Click the image to open it, then click again for full size.</p>
</figure>

## What a guitarist does with a capo

A guitarist clamps a bar onto the neck and then plays exactly the same shapes as before. The fingers don't change; the key does. Nothing has been relearned — only the starting point has moved.

The electronic handpan, in **Logic mode**, does the same thing. You change the anchor note, and everything you already knew how to play stays playable, in the same place, with the same gestures — in another key.

## The demonstration: degree I, in C, in D, in A

Take the constellation of **degree I** — the one the app calls **Balance**. Show it with an anchor note on **C**. Then on **D**. Then on **A**.

The drawing is the same. Exactly the same: same tone fields lit, same polygon, same path from one note to the next. Only the pitches played have changed.

<figure>
  <img
    src="/images/blog-capo-2026-02-ancrages-C-D-A.webp"
    width="2598"
    height="1002"
    alt="The same screen, anchor note C. The lit tone fields are C2 at the centre, C4 at the top, G3 on the left, E3 lower left, plus a small pale-red C3. The red path draws exactly the same figure as in the two images below. The handpan screen reads « I Équilibre C » and the chord cards show C, Dm, Em, F, G, Am, B°. Twin capture of the previous one, taken in the same window and the same frame, with only the anchor note changed to D. The same positions are lit; they now read D2, D4, A3 and F#3, with a small pale-red D3. The red path is superimposable on the previous one. The handpan screen reads « I Équilibre D ». A third twin capture, same window and same frame, anchor note A. The same positions are lit and read A2, A4, E4 and C#4, with a small pale-red A3. The red path occupies exactly the same place. The handpan screen reads « I Équilibre A »."
    data-lb="capo"
    data-lb-wide
    loading="lazy"
  />
  <figcaption>Anchored on <strong>C</strong>: C2 · E3 · G3 · C4. Anchored on <strong>D</strong>: D2 · F#3 · A3 · D4. Same tone fields, different pitches. Anchored on <strong>A</strong>: A2 · C#4 · E4 · A4. The drawing has not moved by a pixel — and it was measured: the three paths overlap by more than 99 %, with the same bounding box.</figcaption>
  <p class="figure-hint"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>Click the image to open it, then click again for full size.</p>
</figure>

### Why it holds

This is not a happy coincidence, it is how Logic mode is built.

A degree's shape is drawn on the pan's **positions** — the pads, identified by where they sit — and not on the notes. Degree I means "those tone fields, linked in that order". When you change key, the app recalculates **what each position plays**, without ever touching the drawing.

Put another way: the geometry is fixed on one side, the sounding content on the other. Transposing only moves the second. That is why the shape cannot deform — not because someone checked that it works, but because nothing in the mechanism could make it move.

<figure>
  <img
    src="/images/blog-capo-2026-03-degre-V.webp"
    width="1600"
    height="2368"
    alt="Two stacked captures of the same screen, this time with the eye open on degree V. Top, anchored on C: the tone fields G2, B2, D3 and G3 are lit sky blue and joined by a blue path; the handpan screen reads « V Tension G ». Bottom, anchored on A: the same positions are lit, reading E3, G#3, B3 and E4, the blue path follows exactly the same route, and the handpan screen reads « V Tension E »."
    data-lb="capo"
    data-lb-wide
    loading="lazy"
  />
  <figcaption>Degree <strong>V</strong>, in C then in A. The invariance is not a property of the I alone: every degree keeps its shape.</figcaption>
  <p class="figure-hint"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>Click the image to open it, then click again for full size.</p>
</figure>

## Two very concrete uses

### Accompanying a voice

A singer tells you your scale sits too high for her. On an acoustic instrument, the conversation stops there. On an electronic handpan, you drop the anchor by two tones and play **the same piece**, with the same gestures, in the range where her voice settles.

You haven't transposed a piece: you have transposed the instrument. What you rehearsed still holds.

<!-- 📷 CK2-04 NOT PRODUCED (08/09/2026) — the requested state does not exist in the app: Logic
     mode fills its 7 slots with the degrees of the key, it has no « load a song from the library
     into the progression » function. « Mes morceaux » opens the Visual Score Editor's repertoire,
     a different screen, where the handpan screen is not visible. Nothing was staged: the figure is
     left out rather than fabricated. Revisit if a « song → progression » entry is added. -->

### Joining other musicians

A session starts, someone calls the key. You set your anchor there and play. No "sorry, I'm in D", no second instrument to unpack: the repertoire you know follows you.

<figure>
  <img
    src="/images/blog-capo-2026-05-choisir-ancrage.webp"
    width="1600"
    height="975"
    alt="Close-up of the open anchor-note selector: a twelve-petal flower, one per semitone, each in its ChromaKeys colour — C red, D orange, E yellow, F green, G sky blue, A indigo, B magenta, and the accidentals in the matching lighter shades. The C petal carries a tick and the centre of the flower reads C. On the left, the end of the row of chord cards and the edge of the pan."
    data-lb="capo"
    data-lb-wide
    loading="lazy"
  />
  <figcaption>Changing key is one petal away. Each note keeps its ChromaKeys colour, the same one it has on the pan.</figcaption>
  <p class="figure-hint"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>Click the image to open it, then click again for full size.</p>
</figure>

## A clear frame, rather than cognitive chaos

This is where it becomes more than a trick. A Neotone can play just about anything; its possibilities are practically infinite. What reads as a beautiful promise on paper becomes, in practice, what David calls **cognitive chaos**: too many open doors, none of them a place to rest your hand.

Logic mode answers that with a frame. **The same placement of notes by degree in every key.** You learn once where the I, the IV and the V live — and that map stays true everywhere. What you gain isn't power, it's stability: a fixed point inside an instrument that could otherwise be everything at once.

This holds for **all major scales and for natural minor**: identical shape, different content.

For **harmonic minor** it is verified on screen, and the capture below shows it: in C minor, degree V, moving from natural to harmonic leaves the same four tone fields lit and the same path — only the leading tone rises a semitone, B♭ becomes B. The variant changes what you hear, not what you see.

For **melodic minor**, let's put it carefully: it alters 4 positions instead of 2 (the sixth on top of the leading tone), and nothing forces the shape to move for that — but we have not photographed it yet.

<!-- à confirmer par une capture : mineur mélodique (l'harmonique, lui, est mesuré — cf. CK2-06) -->

<!-- figure mineurs retirée : bug d'étiquettes app en harmonique, cf. APP/audits/captures-2026-09-10-capo-v2/BUG-etiquettes-mineur-harmonique.md ; remettre après correctif -->

## Mutant or Neotone 1: what differs

The **Mutant** plays every major and minor scale. It is what makes the reasoning above complete, with its seven degrees available.

On the **Neotone 1**, the notions of degree and chord apply too — but in a limited way: not all seven degrees are there. The logic is the same, the ground is narrower.

<!-- 📷 CK2-07 NOT PRODUCED (08/09/2026) — measured, not assumed: in Logic mode, flipping the
     MODÈLE pill from « Mutant » to « Neotone¹ » changes NOTHING on the displayed pan. The two
     captures taken back to back (audits/captures-2026-09-08-blog-lot-final-capo/CK2-07a and 07b)
     differ by 0.97 % of pixels in the pan area, and those 0.97 % are the MODÈLE pill itself: same
     19 tone fields, same polygon for the I. There is no « poorer polygon » to show, and a caption
     claiming one would be false. Revisit when the 10-note model is reflected on the pan in Logic. -->

## And on the acoustic side, honestly

There is indeed a **key wheel** in acoustic mode. It serves something else. It lets you **hear your scale in another key** — every note shifted by the same interval — so you can tell whether that pitch would suit your voice better. It's a preview, and it's reversible: you return to your real instrument as soon as you close it. Its main use is **choosing an instrument before buying it**.

It is not a capo. Your acoustic pan hasn't moved by a semitone — and it cannot. On an acoustic instrument, a chord's constellation is worked out from the notes actually present: it speaks about *your* instrument, and it changes from one scale to another. That's a quality, not a shortfall; it simply isn't the same promise.

<figure>
  <img
    src="/images/blog-capo-2026-08-roue-tonalite.webp"
    width="1600"
    height="1013"
    alt="Acoustic mode with a D Minor / Kurd 10 loaded. On the pan, the tone fields are coloured as pie slices — one slice per chord the note belongs to — and the handpan screen, centred under the D3 ding, reads « D Minor / Kurd 10 ». On the right, the card for the instrument being played reads « POUR D Minor / Kurd 10 · ACOUSTIQUE » with the buttons « Mes morceaux (156) » and « Tester une autre tonalité ». Below it, the open « Tester une autre tonalité » panel explains that you can hear your scale in another key, that it is useful for finding the one that suits your voice, and that it is only a preview: nothing is changed in « Mes handpans ». Twelve key buttons C to B follow, with D highlighted."
    data-lb="capo"
    data-lb-wide
    loading="lazy"
  />
  <figcaption>On the acoustic side, the key wheel lets you <strong>hear</strong> the scale elsewhere. It is a reversible preview, not a capo — the instrument itself has not moved.</figcaption>
  <p class="figure-hint"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>Click the image to open it, then click again for full size.</p>
</figure>

## Going further

Once the key no longer holds you back, the next question becomes: **at which height** to place the chords under a voice. That's the subject of the [vocal layouts](/en/blog/layouts-vocaux-handpan) — Deep, Wide, Bright — which move the octaves without touching the shapes.

And if reading the colours on the pan isn't clear yet, go back to [The two ChromaKeys readings](/en/blog/les-deux-visions-chromakeys): the colour that tells you the note, and the colour that tells you its place in the scale. Those two readings are what make the constellation legible.

Open [Handpan Constellation Studio](/en/handpan-app), switch to Logic mode, and change the anchor while keeping your eye on the shape. It will not move.
