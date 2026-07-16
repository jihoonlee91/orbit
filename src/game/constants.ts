import type { ItemType } from './types'

export const CANVAS_WIDTH = 960
export const CANVAS_HEIGHT = 540

export const PLAYER_WIDTH = 40
export const PLAYER_HEIGHT = 16
export const PLAYER_Y = CANVAS_HEIGHT - 30
export const PLAYER_SPEED = 300

export const HARPOON_SPEED = 700
export const VULCAN_SPEED = 1050

export const GRAVITY = 900
export const RESTITUTION = 0.995
export const MIN_BOUNCE_SPEED = 220
// Vertical bounce must remain visibly larger than each balloon's diameter.
// A single global minimum made late-stage large balloons settle into tiny hops.
export const LEVEL_BOUNCE_SPEED = [320, 390, 460]
export const SPLIT_VY_BASE = 250
export const SPLIT_VY_PER_LEVEL = 150

export const MAX_HP = 3
export const INVULN_MS = 1200

export const LEVEL_RADIUS = [14, 20, 28]
export const SCORE_BY_LEVEL = [300, 150, 100]

export const COMBO_WINDOW_MS = 1500

export const STAGE_COUNT = 10
export const STAGE_TIME_SECONDS = 90
export const TIME_BONUS_PER_SECOND = 10

export type Obstacle = {
  x: number
  y: number
  width: number
  height: number
}

export const STAGE_OBSTACLES: readonly Obstacle[] = [
  { x: 400, y: 261, width: 160, height: 18 },
  { x: 150, y: 210, width: 180, height: 18 },
  { x: 630, y: 330, width: 180, height: 18 },
  { x: 80, y: 300, width: 200, height: 18 },
  { x: 680, y: 180, width: 170, height: 18 },
  { x: 320, y: 360, width: 220, height: 18 },
  { x: 520, y: 230, width: 190, height: 18 },
  { x: 180, y: 350, width: 160, height: 18 },
  { x: 700, y: 310, width: 150, height: 18 },
  { x: 380, y: 170, width: 200, height: 18 },
]

export function getStageObstacle(stageIndex: number): Obstacle {
  const normalizedIndex =
    ((stageIndex % STAGE_OBSTACLES.length) + STAGE_OBSTACLES.length) %
    STAGE_OBSTACLES.length
  return STAGE_OBSTACLES[normalizedIndex]
}

const DEFAULT_OBSTACLE = STAGE_OBSTACLES[0]
export const OBSTACLE_WIDTH = DEFAULT_OBSTACLE.width
export const OBSTACLE_HEIGHT = DEFAULT_OBSTACLE.height
export const OBSTACLE_X = DEFAULT_OBSTACLE.x
export const OBSTACLE_Y = DEFAULT_OBSTACLE.y

// --- Power-up items ---
export const ITEM_RADIUS = 12
export const ITEM_GRAVITY = 260
export const ITEM_DROP_CHANCE = 0.14
// Relative weights within a drop: double wire/clock/hourglass/barrier are common,
// 1UP and dynamite are intentionally rare (dynamite is a risk item, 1UP is a reward item).
export const ITEM_WEIGHTS: [ItemType, number][] = [
  ['doubleWire', 14],
  ['powerWire', 10],
  ['vulcan', 10],
  ['clock', 12],
  ['hourglass', 12],
  ['barrier', 10],
  ['oneUp', 5],
  ['dynamite', 5],
  ['speedBoost', 10],
  ['invincible', 6],
  ['timePlus', 8],
  ['scoreBonus', 8],
]

export const MAX_HARPOONS_DEFAULT = 1
export const MAX_HARPOONS_DOUBLE_WIRE = 2
export const MAX_VULCAN_SHOTS = 5

export const DOUBLE_WIRE_DURATION_MS = 12000
export const POWER_WIRE_DURATION_MS = 12000
export const POWER_WIRE_STAY_MS = 5000
export const VULCAN_DURATION_MS = 12000
export const VULCAN_FIRE_INTERVAL_MS = 120
export const CLOCK_DURATION_MS = 6000
export const HOURGLASS_DURATION_MS = 8000
export const HOURGLASS_SLOW_FACTOR = 0.4
export const SPEED_BOOST_DURATION_MS = 10000
export const SPEED_BOOST_MULTIPLIER = 1.6
export const INVINCIBLE_DURATION_MS = 8000
export const TIME_PLUS_SECONDS = 15
export const SCORE_BONUS_POINTS = 1000
