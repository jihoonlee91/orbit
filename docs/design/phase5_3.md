# Phase 5-3. Cosmic Frontier (Stages 51-60)

## Goal

- Extend the game from 50 to 60 stages, and give the "space" theming
  already used for Dimension X (21-30) and Stellar Forge (41-50) a
  clearer sense of escalation rather than repeating the same idea a
  third time: this block travels outward in real astronomical scale —
  solar system, then galaxy, then deep space — and ends on a
  deliberately different, more intense finale rather than more of the
  same starfield.

## Theme

Four sub-arcs across the ten stages, each with its own backdrop
variants (same parametrized-generator pattern as the Dimension
X/Trench/Stellar Forge backgrounds):

- **Solar System (51-53)** — planets, rings, an asteroid belt, a sun
  glow in the distance. The most "grounded" of the four, closest in
  feel to Stellar Forge but with recognizable planetary bodies instead
  of abstract nebulae.
- **Galaxy (54-56)** — a spiral galaxy silhouette, denser starfields,
  colorful nebula clouds. Busier and more chaotic-looking than the
  solar system stages.
- **Deep Space (57-59)** — sparse, cold, near-black voids with faint
  pinpoint stars. The visual pace deliberately slows down and empties
  out before the finale, for contrast.
- **Hellfire (60, finale)** — a sharp tonal break from the cold blues of
  Deep Space into a molten red/orange lavascape with rising embers. The
  true final stage of the game; no gameplay hazard is unique to it, the
  intensity is carried entirely by the visual.

No new environmental hazard mechanic ships with this block — gravity
wells and currents are already scoped to their own stage ranges
(`currents.ts`, `gravityWells.ts`) and don't extend here, matching how
stages 1-30 also have no unique hazard. Ball count/speed continue
scaling automatically via the existing stage-index-driven formulas in
`engine.ts` (`createStage`) and `constants.ts`
(`getStageTimeSeconds`/`getStageItemDropChance`), so no changes are
needed there beyond raising `STAGE_COUNT`.

## Files

- `src/game/backgrounds.ts` — 10 new backgrounds (`drawSolarSystemBackground`,
  `drawGalaxyBackground`, `drawDeepSpaceBackground`, `drawHellfireBackground`)
  - 10 new `STAGE_NAMES` entries
- `src/game/constants.ts` — `STAGE_COUNT` raised to 60, 10 new
  `STAGE_OBSTACLES` entries (`STAGE_TERRAINS` in `terrain.ts` derives
  from this array automatically, no separate change needed)
- Docs/README stage-count references updated to 60
