import type { ItemType } from './types'

export const CANVAS_WIDTH = 960
export const CANVAS_HEIGHT = 540

export const PLAYER_WIDTH = 40
export const PLAYER_HEIGHT = 16
export const PLAYER_Y = CANVAS_HEIGHT - 30
export const PLAYER_SPEED = 300

export const HARPOON_SPEED = 700

export const GRAVITY = 900
export const RESTITUTION = 0.995
export const MIN_BOUNCE_SPEED = 220
export const SPLIT_VY_BASE = 250
export const SPLIT_VY_PER_LEVEL = 150

export const MAX_HP = 3
export const INVULN_MS = 1200

export const LEVEL_RADIUS = [14, 20, 28]
export const SCORE_BY_LEVEL = [300, 150, 100]

export const COMBO_WINDOW_MS = 1500

export const STAGE_COUNT = 5

export const OBSTACLE_WIDTH = 160
export const OBSTACLE_HEIGHT = 18
export const OBSTACLE_X = CANVAS_WIDTH / 2 - OBSTACLE_WIDTH / 2
export const OBSTACLE_Y = CANVAS_HEIGHT / 2 - OBSTACLE_HEIGHT / 2

// --- Power-up items ---
export const ITEM_RADIUS = 12
export const ITEM_GRAVITY = 260
export const ITEM_DROP_CHANCE = 0.14
// Relative weights within a drop: double wire/clock/hourglass/barrier are common,
// 1UP and dynamite are intentionally rare (dynamite is a risk item, 1UP is a reward item).
export const ITEM_WEIGHTS: [ItemType, number][] = [
  ['doubleWire', 22],
  ['clock', 20],
  ['hourglass', 20],
  ['barrier', 20],
  ['oneUp', 9],
  ['dynamite', 9],
]

export const MAX_HARPOONS_DEFAULT = 1
export const MAX_HARPOONS_DOUBLE_WIRE = 2

export const DOUBLE_WIRE_DURATION_MS = 12000
export const CLOCK_DURATION_MS = 6000
export const HOURGLASS_DURATION_MS = 8000
export const HOURGLASS_SLOW_FACTOR = 0.4
