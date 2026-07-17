# Phase 5-2. Stellar Forge (Stages 51-60)

> This is a draft. Details will be finalized after discussion.
>
> Renumbered from the original 41-50 when `phase5_4.md`'s World Tour II
> insertion pushed every later block down by 10 stages. The mechanic and
> backgrounds below are unchanged, only the stage numbers shifted.

## Goal

- Extend the game from 40 to 50 stages with a second new hazard,
  escalating past the trench's current into full gravitational chaos
  (later followed by `phase5_3.md`'s Cosmic Frontier and `phase5_5.md`'s
  Vortex Frontier, so this is no longer the finale, just the next rung
  up).

## Theme

- The trench opens into deep space — the player is flung out past the
  planet's crust into a forge of dying stars. Ten backdrops (nebulae,
  collapsing stars, forge-like structures) follow the same
  parametrized-generator pattern as the Dimension X backgrounds.

## New mechanic: Gravity Well

- Each stage has one fixed gravity well that pulls every ball toward it
  with inverse-square-law strength (stronger the closer a ball gets),
  layered on top of gravity/bounce/wall physics.
- Well position varies per stage and well strength escalates across the
  ten stages, so late stages have balls arcing unpredictably toward the
  well instead of falling straight down.
- Like currents, the well only affects balls (not the harpoon/player),
  keeping player control precise while balls behave more chaotically.

## Files

- `src/game/gravityWells.ts` — per-stage well lookup
- `src/game/engine.ts` — `stepBall` accepts an optional `well`
- `src/GamePlay.tsx` — wires the well into the ball step loop and
  renders the vortex visual
- `src/game/backgrounds.ts` — 10 new stellar-forge backgrounds + stage
  names
- `src/game/constants.ts` — `STAGE_COUNT` raised, 10 new
  `STAGE_OBSTACLES` entries
