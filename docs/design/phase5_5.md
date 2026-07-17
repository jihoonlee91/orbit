# Phase 5-5. Vortex Frontier (Stages 71-80)

## Goal

- Add a final 10-stage block after Cosmic Frontier, with a genuinely new
  hazard mechanic (not just a visual reskin) as the game's closing arc.

## New mechanic: Vortex

- A spinning gravity well: same radial pull as the Stellar Forge gravity
  well, plus a tangential force component perpendicular to the radius
  vector, so balls curve into a swirling orbit instead of falling
  straight toward the well.
- Implemented as a reuse of the existing gravity-well pipeline rather
  than a parallel system: `GravityWell` (`gravityWells.ts`) gained an
  optional `spin?: number` field, and `applyGravityWellPull` adds the
  tangential term only when `spin` is set. This means physics, AI
  danger-zone avoidance, and Stabilizer-item neutralization all work
  for free — every one of those already operates generically against
  the `GravityWell`-shaped value.
- Both pull strength and spin escalate across the ten stages, so late
  vortex stages spiral noticeably faster and tighter than stage 71.

## Theme

- Ten distinct space-vortex compositions — each with its own focal
  shape rather than one template varied only by palette, per player
  feedback on the earlier Dimension X/Trench/Stellar Forge blocks
  reading as "samey":
  1. Event Horizon Prime — a black hole with a glowing accretion disk.
  2. Wormhole Threshold — concentric rings collapsing into a bright core.
  3. Shattered Moon — a fractured moon with orbiting debris fragments.
  4. Ion Storm — lightning arcs through drifting storm clouds.
  5. Binary Collapse — two stars spiraling together, streaming material
     between them.
  6. Comet Maelstrom — five comet trails swirling around a center point.
  7. Graviton Well — a visibly warped starfield grid bending into a
     dark well.
  8. Pulsar Vortex — sweeping cross-beams from a rotating pulsar core.
  9. Nebula Funnel — nested nebula bands funneling down to a point.
  10. The Singularity — four spiral arms winding into a stark black/white
      core; the game's final stage, deliberately the most graphically
      intense of the set.

## Files

- `src/game/vortices.ts` — new file: `VORTEX_START_STAGE`,
  `VORTEX_STAGE_COUNT`, `getStageVortex(stageIndex): GravityWell | null`
- `src/game/gravityWells.ts` — `GravityWell.spin` field,
  `applyGravityWellPull` tangential-force term
- `src/GamePlay.tsx` — `gravityWell` useMemo now checks
  `getStageGravityWell(stageIndex) ?? getStageVortex(stageIndex)` (the
  two ranges never overlap); HUD hazard badge shows "Vortex" vs.
  "Gravity Well"
- `src/StageMap.tsx` — a "VORTEX" stage-map badge
- `src/game/backgrounds.ts` — 10 new draw functions + a
  `VORTEX_FRONTIER_BACKGROUNDS` array appended to `RAW_BACKGROUNDS`,
  plus 10 new `STAGE_NAMES` entries appended at the end
- `src/game/constants.ts` — `STAGE_COUNT` raised to 80, 10 new
  `STAGE_OBSTACLES` entries appended
- `src/game/vortices.test.ts` — range-boundary and spin-escalation tests
