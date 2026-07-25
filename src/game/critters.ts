import { PLAYER_HEIGHT, PLAYER_WIDTH, PLAYER_Y } from './constants'
import { ICE_WIND_START_STAGE, ICE_WIND_STAGE_COUNT } from './iceWinds'

export const CRITTER_START_STAGE = 5
export const CRITTER_RADIUS = 16

// From Hell onward (stage 81, 0-indexed 80 — matches fireZones.ts's
// FIRE_ZONE_START_STAGE, hardcoded here to avoid a circular import since
// fireZones.ts doesn't need to know about critters) every later stage
// block adds its own environmental hazard (fire zones, low gravity, acid
// rain, ice wind, solar flares, quantum jitter, Chaos Rift's replays of
// several at once) on top of the critter, which never stops recurring and
// never had an end stage. Thinning the critter from 1-in-3 to 1-in-4
// stages past this point trims one recurring source of "cornered with no
// safe response" without touching its established early/mid-game pacing.
const CRITTER_DENSE_HAZARD_STAGE = 80

// During Frozen Summit's icy floor (stage 111-120, 0-indexed 110-119,
// same range as iceWinds.ts's ICE_WIND_START_STAGE) the player's own
// movement is momentum-based rather than snap-to-stop (see `stepPlayerOnTerrain`
// in terrain.ts), so reaction distance is already worse than every other
// stage. Stacking the critter's fastest crawl speed on top of reduced
// steering was the single worst mechanic overlap found in balance
// review — flooring its period higher here keeps the crawl readable
// while the player is already fighting momentum.
const CRITTER_ICY_FLOOR_MIN_PERIOD_MS = 2800

export type Critter = {
  minX: number
  maxX: number
  periodMs: number
  phaseMs: number
}

const LAYOUTS: readonly (readonly Omit<Critter, 'periodMs' | 'phaseMs'>[])[] = [
  [{ minX: 80, maxX: 380 }],
  [{ minX: 500, maxX: 860 }],
  [
    { minX: 80, maxX: 300 },
    { minX: 600, maxX: 860 },
  ],
  [{ minX: 200, maxX: 700 }],
  [
    { minX: 80, maxX: 250 },
    { minX: 350, maxX: 550 },
    { minX: 650, maxX: 860 },
  ],
]

// A small crawling hazard that patrols the ground line, appearing roughly
// one stage in three from stage 6 (0-indexed 5) onward — a puzzle-lite
// timing element (dodge/wait/ladder-climb past it) rather than a new
// reflex test, distinct from every other hazard so far in that it's a
// visible, physically moving obstacle instead of a zone that flips on and
// off. Deterministic patrol (a fixed-period back-and-forth), not physics-
// simulated, so a stage's pattern is identical on every attempt. Thins to
// one-in-four from CRITTER_DENSE_HAZARD_STAGE on (see constant above).
export function getStageCritters(stageIndex: number): Critter[] | null {
  if (stageIndex < CRITTER_START_STAGE) return null
  const cadence = stageIndex < CRITTER_DENSE_HAZARD_STAGE ? 3 : 4
  if (stageIndex % cadence !== 2) return null

  const depth = stageIndex - CRITTER_START_STAGE
  const layout = LAYOUTS[depth % LAYOUTS.length]
  const isIcyFloorStage =
    stageIndex >= ICE_WIND_START_STAGE &&
    stageIndex < ICE_WIND_START_STAGE + ICE_WIND_STAGE_COUNT
  const minPeriodMs = isIcyFloorStage ? CRITTER_ICY_FLOOR_MIN_PERIOD_MS : 2200
  const periodMs = Math.max(minPeriodMs, 4200 - depth * 60)
  return layout.map((critter, index) => ({
    ...critter,
    periodMs,
    phaseMs: (index * periodMs) / layout.length,
  }))
}

function triangleWave(elapsedMs: number, periodMs: number): number {
  const half = periodMs / 2
  const phase = ((elapsedMs % periodMs) + periodMs) % periodMs
  return phase < half ? phase / half : 2 - phase / half
}

// 0 at minX, 1 at maxX, ping-ponging smoothly back and forth — purely a
// function of elapsed time, so no per-frame mutable state is needed.
export function getCritterX(critter: Critter, elapsedMs: number): number {
  const t = triangleWave(elapsedMs + critter.phaseMs, critter.periodMs)
  return critter.minX + t * (critter.maxX - critter.minX)
}

// How far to either side of the harpoon's launch column a ground-level
// critter is skewered. This MUST stay comfortably wider than the critter's
// own contact range (PLAYER_WIDTH / 2 + CRITTER_RADIUS = 36px) — the
// harpoon and the critter both sit on the floor, so a kill reach narrower
// than contact reach means the player has to already be taking damage
// before a shot can connect, which made "killable" true on paper and
// impossible in practice. At 60px the player gets a real window to shoot
// an approaching critter down from safety, which is the whole point of
// giving it a hitbox.
export const CRITTER_HARPOON_REACH = 60

// Segment check, same model as harpoonHitsBall in engine.ts — the harpoon
// is a vertical line from its base (normally the player, PLAYER_Y) up to
// its current tip, so a rising shot sweeps through the critter's
// ground-level hitbox instead of only counting a hit at the exact instant
// the tip passes through.
export function harpoonHitsCritter(
  harpoonX: number,
  harpoonTipY: number,
  critterX: number,
  harpoonBaseY = PLAYER_Y,
): boolean {
  const segmentTop = Math.min(harpoonTipY, harpoonBaseY)
  const segmentBottom = Math.max(harpoonTipY, harpoonBaseY)
  // The harpoon only threatens the critter while its shaft still spans the
  // floor the critter walks on; once the whole shot is overhead it's past.
  if (segmentTop > PLAYER_Y || segmentBottom < PLAYER_Y) return false
  return Math.abs(critterX - harpoonX) <= CRITTER_HARPOON_REACH
}

export function critterHitsPlayer(
  critterX: number,
  playerX: number,
  playerY = PLAYER_Y,
): boolean {
  const halfW = PLAYER_WIDTH / 2
  const halfH = PLAYER_HEIGHT / 2
  const closestX = Math.min(
    Math.max(critterX, playerX - halfW),
    playerX + halfW,
  )
  const closestY = Math.min(
    Math.max(PLAYER_Y, playerY - halfH),
    playerY + halfH,
  )
  const dx = critterX - closestX
  const dy = PLAYER_Y - closestY
  return dx * dx + dy * dy <= CRITTER_RADIUS * CRITTER_RADIUS
}
