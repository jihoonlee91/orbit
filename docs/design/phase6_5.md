# Phase 6-5. Chaos Rift Finale & Golden Ball (Stages 151-200)

## Goal

- Extend the game from 150 to 200 stages (`STAGE_COUNT`) with a new
  finale block, Chaos Rift, rather than ending progression at Overdrive
  Nexus.
- Add one universal "fun" mechanic (Golden Ball) that isn't tied to any
  stage range, giving every stage a small chance at a bonus moment.

## New mechanic: Chaos Rift (stages 151-200, 0-indexed 150-199)

- Rather than inventing a brand-new physics mechanic, Chaos Rift replays
  the game's two most established hazards simultaneously, at higher
  intensity than either has ever run alone:
  - The lateral current (The Trench, `currents.ts`) — Chaos Rift's
    version (`chaosRift.ts`, `getChaosRiftCurrent`) starts at strength
    220, already above the Trench's own peak of 216 (`90 + 9*14`), and
    keeps climbing with depth.
  - The lava-burst fire zones (Hell, `fireZones.ts`) — Chaos Rift's
    version (`getChaosRiftFireZones`) cycles through 4 escalating
    layouts with a shorter period than Hell's ever got.
- Both data generators return the exact same `StageCurrent`/`FireZone[]`
  shapes as the originals, so `GamePlay.tsx` feeds them straight into the
  existing `getCurrentWindAx`/`getFireZoneState`/
  `getFireZoneWarningProgress`/`drawFireZones`/`drawCurrentFlow`
  functions — no new physics or rendering code needed.
- Counters: rather than a new item, **Stabilizer** and **Fireproof** each
  get a second active window in `getItemWeights` (stage 150 onward, in
  addition to their original 40-79 / 80-89 windows) since they already do
  exactly what's needed here. **Overdrive**'s existing full-hit-immunity
  (stages 141+) also happens to block Chaos Rift's fire damage, with no
  changes required.
- Legacy background behavior before the illustrated finale: stages 151-200 reused existing
  content via the pre-existing modulo wraparound in `drawBackground`,
  `getStageObstacle`, and the `STAGE_NAMES[i % STAGE_NAMES.length]` call
  sites — no new chapter art was authored for this pass (out of scope;
  see `phase6_4.md`'s illustrated-background system). In practice stage
  151 lands on Overdrive Nexus's illustrated art (red/blue energy
  streams), which reads reasonably well for a "chaos" finale even though
  it's a reused plate. 50 new procedurally-generated `STAGE_OBSTACLES`
  entries were added (matching the existing random-looking style) so
  Chaos Rift at least has its own platform layouts.

### Illustrated Chaos Rift revision

- Stages 151-200 extend the illustrated-background system from
  `phase6_4.md`. Five 16:9 Chaos Rift chapter plates establish a distinct
  art direction for each ten-stage batch, and every individual stage is
  exported as its own optimized 960x540 WebP.
- The final image composites its chapter plate with that stage's Canvas
  silhouette, seeded details, and hazard-safe open play area. No stage
  relies on modulo-reused art at runtime; missing or loading images retain
  a synchronous Canvas fallback.
- Batch identities are 151-160 fractured crimson/cobalt gateway, 161-170
  storm-torn floating citadel, 171-180 molten cosmic maelstrom, 181-190
  prismatic reality collapse, and 191-200 white-hot final singularity.

## New mechanic: Golden Ball (all stages)

- A stage's starting balls (not split children) each have a
  `GOLDEN_BALL_CHANCE` (12%) chance of spawning golden
  (`ball.golden = true` in `types.ts`), independent of stage or hazard.
- A golden ball renders with a gold gradient, a stronger glow, and a
  slowly rotating dashed ring (`drawBall` in `GamePlay.tsx`) so it reads
  as a bonus target at a glance.
- Popping one (harpoon hit or Shockwave) multiplies that hit's score by
  `GOLDEN_BALL_SCORE_MULTIPLIER` (3x, stacking with Nova Surge/Overdrive
  like every other multiplier) and pays out a gold-colored particle burst
  and a "GOLDEN +N" popup instead of the usual "+N".
- Split children never inherit the golden flag (`splitBall` builds plain
  new balls) — the bonus is a one-shot moment, not a stacking chain.

## Files

- `src/game/chaosRift.ts` (new) — `getChaosRiftCurrent`,
  `getChaosRiftFireZones`, tested in `chaosRift.test.ts`
- `src/game/constants.ts` — `STAGE_COUNT` 150 → 200, 50 new
  `STAGE_OBSTACLES` entries, `STABILIZER_CHAOS_RIFT_START_STAGE`/
  `FIREPROOF_CHAOS_RIFT_START_STAGE` second windows in `getItemWeights`,
  `GOLDEN_BALL_CHANCE`/`GOLDEN_BALL_SCORE_MULTIPLIER`
- `src/game/types.ts` — `Ball.golden?: boolean`
- `src/game/hazardCatalog.ts` — `chaosRift` entry
- `src/GamePlay.tsx` — wires Chaos Rift's current/fire zones into the
  existing physics/rendering/damage/AI-dodge paths; rolls and renders
  Golden Ball; multiplies score and swaps particle color/popup text on a
  golden hit (both the normal harpoon-hit path and Shockwave)
- `src/game/terrain.test.ts`, `src/game/constants.test.ts` — updated
  expectations for the new stage count and item-pool windows

## Verification

Illustrated-background files:

- `src/assets/backgrounds/`: five Chaos Rift chapter plates
- `src/assets/backgrounds/illustrated/`: dedicated `stage151.webp`
  through `stage200.webp` runtime backgrounds
- `src/game/backgrounds.ts`: chapter fallbacks and dedicated image
  resolution without modulo reuse

- `tsc -b`, `oxlint`, `vitest run` (188 tests), and `prettier --check`
  all pass.
- Manually verified in-browser: Stage 151 shows the "Chaos Rift" HUD tag
  and fires the new-hazard intro popup with the correct description;
  Glossary lists Piercer/Chaos Rift correctly; no console errors.
