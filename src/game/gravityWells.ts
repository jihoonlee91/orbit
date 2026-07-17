import { CANVAS_WIDTH } from './constants'

export const GRAVITY_WELL_START_STAGE = 40
export const GRAVITY_WELL_STAGE_COUNT = 10

export type GravityWell = {
  x: number
  y: number
  strength: number
}

// Minimum distance-squared used when applying the pull, so a ball passing
// very close to the well doesn't get an unplayable/infinite acceleration.
const MIN_DISTANCE_SQUARED = 1600

const WELL_POSITIONS: readonly (readonly [number, number])[] = [
  [CANVAS_WIDTH / 2, 190],
  [260, 230],
  [700, 210],
  [CANVAS_WIDTH / 2, 260],
  [340, 170],
  [620, 280],
  [200, 300],
  [760, 200],
  [CANVAS_WIDTH / 2, 220],
  [480, 300],
]

// A fixed gravity well hazard for the stellar-forge stages (41-50, 0-indexed
// 40-49). Position varies per stage and pull strength escalates with depth.
export function getStageGravityWell(stageIndex: number): GravityWell | null {
  if (
    stageIndex < GRAVITY_WELL_START_STAGE ||
    stageIndex >= GRAVITY_WELL_START_STAGE + GRAVITY_WELL_STAGE_COUNT
  ) {
    return null
  }

  const depth = stageIndex - GRAVITY_WELL_START_STAGE
  const [x, y] = WELL_POSITIONS[depth % WELL_POSITIONS.length]
  return { x, y, strength: 4_000_000 + depth * 700_000 }
}

export function applyGravityWellPull(
  well: GravityWell,
  x: number,
  y: number,
): { ax: number; ay: number } {
  const dx = well.x - x
  const dy = well.y - y
  const distanceSquared = Math.max(dx * dx + dy * dy, MIN_DISTANCE_SQUARED)
  const distance = Math.sqrt(distanceSquared)
  const pull = well.strength / distanceSquared
  return { ax: (dx / distance) * pull, ay: (dy / distance) * pull }
}
