# Phase 2-1. Player Controls & Harpoon

> This is a draft. Details will be finalized after discussion.

## Goal

- Implement left/right movement
- Handle fire input
- Implement the harpoon traveling in a straight line up to the ceiling
- Implement despawning on ball/ceiling contact and firing restrictions

## Design

- Canvas size: 960x540 (widescreen aspect ratio)
- Player: fixed y at the bottom, a rectangle that can move left/right, movement speed 300px/s (keyboard ←/→ or A/D)
- Fire: Space key, only 1 harpoon can exist at a time by default (the existing harpoon must disappear before firing again; the double-wire power-up raises this to 2)
- The harpoon moves upward from the player's x position at 700px/s, and despawns on reaching the ceiling or colliding with a ball
- Touch/mobile controls: direct touch on the canvas, no on-screen buttons
  - Drag (touch + move): moves the player by the same horizontal delta the finger moved, relative to where the ship was when the touch started (not "jump to finger position") — feels like sliding the ship, not teleporting it
  - Tap (touch down and up without dragging past a small threshold): fires once, equivalent to a single Space press
  - Implemented as pointer events on the canvas itself (`touch-action: none` to prevent page scroll while dragging)
