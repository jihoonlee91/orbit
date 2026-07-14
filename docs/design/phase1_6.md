# Phase 1-6. Attract/AI Mode

## Goal

- A "Watch AI Play" option on the main screen that runs an AI-controlled playthrough (godmode, so it always looks like a flawless clear), with an on-screen indicator of which inputs the AI is "pressing"

## Design

- Main screen gets a second button, "Watch AI Play", alongside "Start". Clicking it goes straight into gameplay (skipping the countdown) with `demo` mode active
- In AI mode:
  - The AI has full knowledge of the game's physics: for each ball, it forward-simulates the exact same `stepBall` physics function used by real gameplay (not an approximation) to find the ball's next low point — the x position it will be at when it's closest to the player's row — and picks the ball whose low point arrives soonest as its target. This is why it looks like it "knows" the trajectories rather than reactively chasing balls (`predictLandingSpot` in `src/game/engine.ts`)
    - Actively seeks any falling power-up item on screen (items fall straight down, so no prediction needed beyond their current x), prioritizing item pickup over ball-popping since it's free value in godmode
    - Fires only when roughly aligned with the ball target and a harpoon slot is actually free (so the on-screen SPACE indicator doesn't flash as if firing when no shot would actually happen)
  - The player is invulnerable to ball damage (HP never decreases) so the run always looks like a clean, flawless clear — this is a deliberate "attract mode" trick (real arcade cabinets do the same), not meant to represent normal difficulty
  - When a stage clears, it loops to the next stage; after the last stage, it loops back to stage 1 and keeps playing indefinitely until the player exits
  - AI runs are never recorded to the local score history (`phase4_2.md`) — it isn't a real play session
  - A small on-screen "AI" badge is shown, plus a row of key indicators (←, →, Space) that light up in sync with whatever the AI is currently "pressing", so viewers can see the input driving the play
  - An "Exit AI Mode" control returns to the main screen at any time
