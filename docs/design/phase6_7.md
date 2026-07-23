# Phase 6-7 — Cinematic Game Intro

## Goal

Give visitors an immediate, trailer-like introduction to ORBIT that can be
watched directly on the deployed site and replayed later from the main menu.

## Experience

- The intro is the first screen of each newly loaded app session.
- Eight selected stage illustrations form a short visual journey from the
  classic world tour through later hazards and the final cosmic stages.
- Each shot has its own chapter label, headline, and supporting line.
- Slow push/pan motion, crossfades, light sweeps, film grain, and letterboxing
  make the sequence feel like a produced game trailer rather than a slideshow.
- The final title card presents ORBIT and a direct `Enter Orbit` action.
- A persistent `Skip Intro` action exits immediately, and the main menu exposes
  `Replay Intro`.

## Interaction and accessibility

- The sequence advances automatically and displays shot markers plus a progress
  bar so its remaining length is understandable.
- Pointer, keyboard, and browser-back behavior remain safe: Escape skips to the
  main menu, while the final action also returns there.
- Images include meaningful alternative text; decorative overlays stay hidden
  from assistive technology.
- `prefers-reduced-motion` and the game's reduced-motion root class disable
  camera movement and shorten visual transitions without removing content.
- The layout uses safe-area insets and scales down typography/actions for
  portrait mobile screens.

## Technical design

- `Intro.tsx` owns the timed shot index and resets cleanly whenever it is
  remounted for replay.
- `Intro.css` owns the cinematic presentation and remains isolated from the
  shared menu/map styles.
- The component imports existing final WebP stage art directly. No additional
  Canvas compositing or duplicate encoded video asset is introduced.
- `App.tsx` adds an `intro` screen, makes it the initial screen, routes
  completion/skip to `main`, and adds the replay button.

## Verification

- Confirm automatic shot progression, final-card transition, Skip Intro, Enter
  Orbit, Replay Intro, Escape, and responsive portrait behavior in a browser.
- Run TypeScript, Vitest, Oxlint, and the production build before deployment.
