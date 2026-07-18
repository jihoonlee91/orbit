# Phase 5-6. Cosmic Frontier Rework: Nebula Field (Stages 61-70)

## Goal

- Reworks `phase5_3.md`'s Cosmic Frontier from four disconnected
  sub-arcs (Solar System / Galaxy / Deep Space / Hellfire, no hazard of
  its own) into one unified theme, matching how every other 10-stage
  block has a single visual identity and its own new hazard/item.

## Theme

- **"A flight into a colossal nebula, ending at its blazing stellar
  core."** All 10 backgrounds keep their individual focal compositions
  (a planet, a galaxy core, an empty void, a lavascape finale) but now
  share a drifting nebula-cloud-band layer (`drawNebulaVeil`) whose
  intensity climbs from stage 61 to 70 — thin wisps at the edge, dense
  haze approaching the core — so the block reads as one continuous
  journey instead of four unrelated ideas. `STAGE_NAMES` renamed to
  match (`Nebula's Edge` ... `The Core Ignites`), all suffixed
  `(Cosmic Frontier)`.

## New mechanic: Nebula Field

- Two simultaneous, weaker gravity wells per stage — the missing rung
  between Stellar Forge's single well and Vortex Frontier's single
  spinning well. Navigating between two pull points, rather than
  around one, is the new skill.
- Implemented as a pure reuse: `stepBall`/`predictLandingSpot`
  (`engine.ts`) already accepted a single `GravityWell`, generalized to
  accept `GravityWell | readonly GravityWell[]` (mirroring how
  `obstacles` already supports a single value or an array).
  `getStageNebulaWells` (`nebulae.ts`) returns the two-well array; this
  slots into `GamePlay.tsx`'s existing `gravityWell` variable
  alongside `getStageGravityWell`/`getStageVortex`, so AI danger-zone
  avoidance, rendering (`drawGravityWell` looped once per well), and
  Stabilizer neutralization all work for free.

## New item: Nova Surge

- A score multiplier (x2 for 10 seconds) introduced at stage 61 and
  staying in the item pool for every later stage, same pattern as
  Stabilizer (introduced at 41, stays forever after).
- Applies only to score gained from hitting balls (not scoreBonus/
  timePlus/other flat bonuses), kept simple and self-contained — no
  physics or engine changes, just a multiplier on the existing
  per-hit score calculation in `GamePlay.tsx`.

## Files

- `src/game/backgrounds.ts` — `drawNebulaVeil` helper + one call per
  Cosmic Frontier background (increasing intensity); renamed
  `STAGE_NAMES` entries 61-70
- `src/game/nebulae.ts` — new file: `NEBULA_START_STAGE`,
  `NEBULA_STAGE_COUNT`, `getStageNebulaWells`
- `src/game/gravityWells.ts`/`src/game/engine.ts` — `well` parameter
  generalized to accept a single well or a readonly array
- `src/GamePlay.tsx` — `gravityWell` useMemo now checks
  `getStageGravityWell ?? getStageNebulaWells ?? getStageVortex`;
  `isNebulaStage` HUD label ("Nebula Field"); Nova Surge item wiring
  (label/color/description/buff timer/score multiplier)
- `src/StageMap.tsx` — "NEBULA FIELD" stage-map badge
- `src/game/types.ts` — `'novaSurge'` added to `ItemType`
- `src/game/constants.ts` — `NOVA_SURGE_START_STAGE`,
  `NOVA_SURGE_DURATION_MS`, `NOVA_SURGE_MULTIPLIER`
