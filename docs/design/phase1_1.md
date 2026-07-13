# Phase 1-1. Main Screen

## Goal

- Show the main screen when the game loads

## Design

- A simple layout: the title "PANG", a one-line controls summary, and a "Start" button inside a translucent white card (glassmorphism)
- The title is emphasized with a shimmer animation applied to a horizontal gradient that repeats several colors (pink/orange/sky blue)
- The controls summary (e.g. "Move: ←/→ or A/D  ·  Fire: Space  ·  Touch: on-screen buttons") is shown so first-time players aren't dropped into the game with zero information; the in-play hint panel (`phase2_3.md`) still covers the full detail
- The entire screen uses the Galmuri11 font (a pixel font with Korean support)
- Since there's currently only one mission, clicking the "Start" button transitions directly to gameplay (Mission 1) without a separate selection screen (see Phase 1-2)
