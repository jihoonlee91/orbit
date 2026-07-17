# Phase 5-4. World Tour II (Stages 21-30)

## Goal

- Insert 10 more stages between the original World Tour (1-20) and
  Dimension X, extending the real-world landmark theme before the game
  turns abstract/sci-fi. Every block from the old stage 21 onward
  (Dimension X, The Trench, Stellar Forge, Cosmic Frontier) shifts down
  by 10 stages to make room — see the renumbering notes at the top of
  `phase5_1.md`/`phase5_2.md`/`phase5_3.md`.
- No new hazard mechanic ships with this block, matching how the
  original World Tour (1-20) also has no unique hazard beyond the
  stages 6-10 ladder section.

## Theme

- Ten more real-world landmarks, each hand-drawn as a genuinely distinct
  bespoke Canvas 2D illustration (not a parametrized color-swap
  template) — matching the quality bar of the original stage 1-10
  functions (`drawTajMahalBackground`, `drawEiffelTowerBackground`,
  etc.) rather than the photo-with-tinted-fallback approach used for
  stages 11-20:
  1. Great Wall of China (China) — undulating wall with battlements
     riding a rolling hill ridge.
  2. Petra (Jordan) — The Treasury facade carved into canyon walls.
  3. Sydney Opera House (Australia) — white sail-shaped shells on the
     harbour.
  4. Statue of Liberty (USA) — green statue with a raised torch on a
     small island.
  5. Niagara Falls (Canada) — cascading water sheet with mist at the
     base.
  6. Chichen Itza (Mexico) — El Castillo's stepped pyramid over jungle
     canopy.
  7. Venice Canals (Italy) — gondola on a canal beneath an arched
     bridge, colorful facades.
  8. Table Mountain (South Africa) — flat-topped mountain over a city
     skyline, ocean in the foreground.
  9. Geysir (Iceland) — an eruption plume with drifting steam clouds.
  10. Milford Sound (New Zealand) — fjord cliffs with a waterfall and a
      misty peak.

## Files

- `src/game/backgrounds.ts` — 10 new bespoke landmark draw functions,
  a `WORLD_TOUR_2_BACKGROUNDS` array spliced into `RAW_BACKGROUNDS`
  between `ILLUSTRATED_BACKGROUNDS` and `DIMENSION_BACKGROUNDS`, plus
  10 new `STAGE_NAMES` entries inserted at the same position
- `src/game/constants.ts` — `STAGE_COUNT` raised, `STAGE_OBSTACLES`
  re-sequenced with 10 new entries inserted after the original 20
  (`STAGE_TERRAINS` in `terrain.ts` derives from this automatically)
- `src/game/portals.ts` — `PORTAL_START_STAGE` shifted 20 → 30
- `src/game/currents.ts` — `CURRENT_START_STAGE` shifted 30 → 40
- `src/game/gravityWells.ts` — `GRAVITY_WELL_START_STAGE` shifted 40 → 50
- Docs/README stage-count and stage-range references updated to 80 /
  the renumbered blocks
