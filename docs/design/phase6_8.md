# Phase 6-8 — Hidden True Finale (Stage 201)

## Goal

Add a secret true-final stage that feels substantially harder than stage 200
while remaining readable, fair, and fun to replay.

## Discovery and progression

- The normal route still presents itself as a 200-stage game.
- Stage 201 is absent from the player stage map, progress totals, and jump
  controls until stage 200 has been cleared.
- Clearing stage 200 unlocks index 200, reveals the hidden map card, and starts
  a dedicated transition into the secret finale instead of ending the run.
- Stage 201 is named **Eclipse Zero (Hidden Finale)**.
- Clearing it produces a distinct **True Final Clear** completion message.

## Arena and workload

- The stage uses one newly generated `stage201.webp` illustration. It is a
  complete 960×540 frame, not a recolor or composite of stage 200.
- A broken-crown platform layout leaves multiple viable movement lanes while
  forcing the player to reposition between shots.
- Six large balls start in a symmetric eclipse formation with alternating
  velocities. This is 42 required pops before power-ups, deliberately below the
  56-pop late-stage maximum because the phase mechanics provide the difficulty.
- The clock is 75 seconds. Raw speed remains at the established late-game cap.

## Eclipse Protocol

The stage cycles every nine seconds. The first 1.35 seconds of each phase are a
safe telegraph window with a clear HUD/canvas warning before the full effect
starts.

1. **Rift Gale** — a fast alternating lateral current tests movement and shot
   alignment.
2. **Twin Singularity** — two counter-spinning gravity wells bend ball paths
   away from simple vertical reads.
3. **Solar Collapse** — four staggered floor zones force deliberate lane
   changes.
4. **Zero-G Fracture** — gravity drops and quantum jitter changes trajectories,
   rewarding short reaction loops over long prediction.

The cycle then repeats at a slightly higher intensity. No phase stacks its main
hazard with the next phase; difficulty comes from adaptation, not visual noise.

## Counterplay and rewards

- Stage 201 restores the full relevant counter set: Stabilizer, Fireproof,
  Anchor, Lock-On, and Overdrive.
- Item drops rise above the late-stage floor so a strong route can create a
  comeback without making success automatic.
- Weapon, Barrier, and Time+ drops remain useful offensive/defensive choices.
- The existing three-second opening invulnerability prevents an immediate
  phase or ball collision.

## Presentation

- The HUD names the active protocol phase and marks its warning window.
- A brief central phase banner appears on each switch without pausing play.
- The stage map card uses a distinct hidden-final styling once revealed.
- Stage 200's clear transition announces that a hidden signal has been found.

## Verification

- Unit-test hidden visibility, unlock clamping, stage time, ball formation,
  phase timing, hazard exclusivity, and item counter availability.
- Verify stage 200 → hidden reveal → stage 201 → true ending in the browser.
- Run TypeScript, Vitest, Oxlint, formatting checks, and the production build
  before deploying to `master`.
