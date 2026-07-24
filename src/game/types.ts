export type Ball = {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  level: number
  golden?: boolean
}

export type Harpoon = {
  x: number
  y: number
  baseY?: number
  kind?: 'normal' | 'powerWire' | 'vulcan' | 'pierce' | 'diagonal'
  expiresAt?: number
  // Horizontal speed — only 'diagonal' harpoons have this; every other
  // kind travels straight up at a fixed x.
  vx?: number
}

export type ItemType =
  | 'doubleWire'
  | 'powerWire'
  | 'vulcan'
  | 'clock'
  | 'hourglass'
  | 'barrier'
  | 'oneUp'
  | 'dynamite'
  | 'speedBoost'
  | 'invincible'
  | 'timePlus'
  | 'scoreBonus'
  | 'stabilizer'
  | 'novaSurge'
  | 'fireproof'
  | 'anchor'
  | 'magnet'
  | 'comboLock'
  | 'shockwave'
  | 'umbrella'
  | 'gripBoots'
  | 'visor'
  | 'lockOn'
  | 'overdrive'
  | 'pierce'
  | 'starBalloon'
  | 'diagonalWire'

export type Item = {
  id: number
  x: number
  y: number
  vy: number
  type: ItemType
}

export type StageResult = 'clear' | 'gameover'
