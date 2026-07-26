import type { StageCurrent } from './currents'
import type { FireZone } from './fireZones'
import type { GravityWell } from './gravityWells'

export const HIDDEN_FINAL_STAGE_INDEX = 200
// A real boss fight, not a quick skirmish — long enough that surviving to
// the end feels earned, and long enough for the cumulative stacking below
// to actually reach its "everything at once" climax more than once.
export const HIDDEN_FINALE_TIME_SECONDS = 150
export const HIDDEN_FINALE_PHASE_DURATION_MS = 9000
export const HIDDEN_FINALE_WARNING_MS = 1350
// A lucky Dynamite/Shockwave-style clear used to be able to end the whole
// fight in seconds (Dynamite/Shockwave are now excluded from this stage's
// item pool entirely — see getItemWeights — but the same could happen from
// just good aim on only 8 starting balls). GamePlay.tsx keeps topping the
// ball count back up whenever it runs low, as long as more than this many
// seconds remain — stops well before time runs out so the player still
// gets a genuine, guaranteed-clearable final stretch instead of the fight
// refilling forever.
export const HIDDEN_FINALE_REFILL_CUTOFF_SECONDS = 20

export type HiddenFinalePhaseId =
  | 'riftGale'
  | 'twinSingularity'
  | 'solarCollapse'
  | 'zeroGFracture'
  | 'balloonSwarm'

export type SwarmSpawn = {
  intervalMs: number
  count: number
  level: number
}

export type HiddenFinalePhase = {
  id: HiddenFinalePhaseId
  name: string
  color: string
  warning: boolean
  phaseElapsedMs: number
  current: StageCurrent | null
  wells: readonly GravityWell[] | null
  fireZones: readonly FireZone[] | null
  gravityScale: number
  jitterStrength: number | null
  // Set once Balloon Swarm has joined the stack — periodically injects
  // fresh balls into play on top of whatever else is active, so the
  // finale's climax is a raw "how many can you clear before the screen
  // floods" panic layered on every earlier hazard, not a clean swap.
  swarmSpawn: SwarmSpawn | null
}

const PHASES: readonly Pick<HiddenFinalePhase, 'id' | 'name' | 'color'>[] = [
  { id: 'riftGale', name: 'Rift Gale', color: '#38bdf8' },
  {
    id: 'twinSingularity',
    name: 'Twin Singularity',
    color: '#c084fc',
  },
  { id: 'solarCollapse', name: 'Solar Collapse', color: '#fb7185' },
  { id: 'zeroGFracture', name: 'Zero-G Fracture', color: '#facc15' },
  { id: 'balloonSwarm', name: 'Balloon Swarm', color: '#4ade80' },
]

const SOLAR_COLLAPSE_ZONES: readonly Omit<FireZone, 'periodMs' | 'phaseMs'>[] =
  [
    { x: 45, width: 150 },
    { x: 265, width: 150 },
    { x: 535, width: 150 },
    { x: 765, width: 150 },
  ]

export function isHiddenFinaleStage(stageIndex: number): boolean {
  return stageIndex === HIDDEN_FINAL_STAGE_INDEX
}

export function getVisibleStageCount(highestUnlockedStage: number): number {
  return highestUnlockedStage >= HIDDEN_FINAL_STAGE_INDEX
    ? HIDDEN_FINAL_STAGE_INDEX + 1
    : HIDDEN_FINAL_STAGE_INDEX
}

export function getHiddenFinalePhase(
  stageIndex: number,
  elapsedMs: number,
): HiddenFinalePhase | null {
  if (!isHiddenFinaleStage(stageIndex)) return null

  const safeElapsedMs = Math.max(0, elapsedMs)
  const phaseNumber = Math.floor(
    safeElapsedMs / HIDDEN_FINALE_PHASE_DURATION_MS,
  )
  // Position within the current 5-phase rotation (0-4) — this is what
  // actually gates which hazards are active, distinct from `phase` (used
  // only for the banner's name/color, always just "what just unlocked").
  const positionInCycle = phaseNumber % PHASES.length
  const phase = PHASES[positionInCycle]
  const cycle = Math.floor(phaseNumber / PHASES.length)
  const phaseElapsedMs = safeElapsedMs % HIDDEN_FINALE_PHASE_DURATION_MS
  const warning = phaseElapsedMs < HIDDEN_FINALE_WARNING_MS

  const result: HiddenFinalePhase = {
    ...phase,
    warning,
    phaseElapsedMs,
    current: null,
    wells: null,
    fireZones: null,
    gravityScale: 1,
    jitterStrength: null,
    swarmSpawn: null,
  }

  if (warning) return result

  // Cumulative, not exclusive: everything unlocked so far in this 45s
  // rotation STAYS active once Rift Gale (a mild permanent wind, since it
  // no longer has the stage to itself) opens the fight, right up through
  // Balloon Swarm layering a ball flood on top of all four. A genuine
  // "everything poured in" boss climax instead of one hazard swapped for
  // another, escalating further each time the rotation repeats.
  if (positionInCycle >= 0) {
    result.current = {
      strength: 230 + cycle * 16,
      periodMs: Math.max(1800, 2400 - cycle * 100),
    }
  }
  if (positionInCycle >= 1) {
    result.wells = [
      {
        x: 285,
        y: 205,
        strength: 2_800_000 + cycle * 220_000,
        spin: 1_900_000 + cycle * 160_000,
      },
      {
        x: 675,
        y: 235,
        strength: 2_800_000 + cycle * 220_000,
        spin: -(1_900_000 + cycle * 160_000),
      },
    ]
  }
  if (positionInCycle >= 2) {
    const periodMs = Math.max(2600, 3400 - cycle * 140)
    result.fireZones = SOLAR_COLLAPSE_ZONES.map((zone, index) => ({
      ...zone,
      periodMs,
      phaseMs: (index * periodMs) / SOLAR_COLLAPSE_ZONES.length,
    }))
  }
  if (positionInCycle >= 3) {
    result.gravityScale = Math.max(0.18, 0.32 - cycle * 0.02)
    result.jitterStrength = 130 + cycle * 16
  }
  if (positionInCycle >= 4) {
    // Raw panic layered on everything above instead of another physics
    // twist — the screen keeps refilling with fresh mid-size balls, faster
    // and in greater numbers each time the rotation comes back around.
    result.swarmSpawn = {
      intervalMs: Math.max(900, 1700 - cycle * 120),
      count: Math.min(4, 2 + cycle),
      level: 1,
    }
  }

  return result
}
