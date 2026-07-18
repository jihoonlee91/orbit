# Phase 5-3. Cosmic Frontier (Stages 61-70)

> Renumbered from the original 51-60 when `phase5_4.md`'s World Tour II
> insertion pushed every later block down by 10 stages. Later followed
> by `phase5_5.md`'s Vortex Frontier (71-80), so this is no longer the
> final block either.
>
> **Superseded by `phase5_6.md`**: this block originally shipped as
> four disconnected sub-arcs (Solar System / Galaxy / Deep Space /
> Hellfire) with no hazard of its own, described below for history. It
> was reworked into one unified "flight into a nebula" theme with its
> own hazard (Nebula Field) and item (Nova Surge) — see `phase5_6.md`
> for the current design.

## Goal (original)

- Extend the game from 50 to 60 stages (now 61-70 after renumbering),
  and give the "space" theming already used for Dimension X (31-40) and
  Stellar Forge (51-60) a clearer sense of escalation rather than
  repeating the same idea a third time: this block travels outward in
  real astronomical scale — solar system, then galaxy, then deep space
  — and ends on a deliberately different, more intense finale rather
  than more of the same starfield.

## Theme (original)

Four sub-arcs across the ten stages, each with its own backdrop
variants (same parametrized-generator pattern as the Dimension
X/Trench/Stellar Forge backgrounds):

- **Solar System (61-63)** — planets, rings, an asteroid belt, a sun
  glow in the distance. The most "grounded" of the four, closest in
  feel to Stellar Forge but with recognizable planetary bodies instead
  of abstract nebulae.
- **Galaxy (64-66)** — a spiral galaxy silhouette, denser starfields,
  colorful nebula clouds. Busier and more chaotic-looking than the
  solar system stages.
- **Deep Space (67-69)** — sparse, cold, near-black voids with faint
  pinpoint stars. The visual pace deliberately slows down and empties
  out before the finale, for contrast.
- **Hellfire (70)** — a sharp tonal break from the cold blues of Deep
  Space into a molten red/orange lavascape with rising embers.

No new environmental hazard mechanic shipped with this block originally
— see `phase5_6.md` for the Nebula Field hazard added later.

## Files (original)

- `src/game/backgrounds.ts` — 10 new backgrounds (`drawSolarSystemBackground`,
  `drawGalaxyBackground`, `drawDeepSpaceBackground`, `drawHellfireBackground`)
  - 10 new `STAGE_NAMES` entries
- `src/game/constants.ts` — `STAGE_COUNT` raised to 60 (later 80, see
  `phase5_4.md`/`phase5_5.md`), 10 new `STAGE_OBSTACLES` entries
  (`STAGE_TERRAINS` in `terrain.ts` derives from this array
  automatically, no separate change needed)
- Docs/README stage-count references updated to 60 (later 80)
