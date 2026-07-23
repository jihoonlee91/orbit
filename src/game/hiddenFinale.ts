import type { StageCurrent } from './currents'
import type { FireZone } from './fireZones'
import type { GravityWell } from './gravityWells'

export const HIDDEN_FINAL_STAGE_INDEX = 200
export const HIDDEN_FINALE_TIME_SECONDS = 75
export const HIDDEN_FINALE_PHASE_DURATION_MS = 9000
export const HIDDEN_FINALE_WARNING_MS = 1350

export type HiddenFinalePhaseId =
  'riftGale' | 'twinSingularity' | 'solarCollapse' | 'zeroGFracture'

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
  const phase = PHASES[phaseNumber % PHASES.length]
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
  }

  if (warning) return result

  switch (phase.id) {
    case 'riftGale':
      result.current = {
        strength: 330 + cycle * 22,
        periodMs: Math.max(1700, 2300 - cycle * 120),
      }
      break
    case 'twinSingularity':
      result.wells = [
        {
          x: 285,
          y: 205,
          strength: 3_400_000 + cycle * 250_000,
          spin: 2_200_000 + cycle * 180_000,
        },
        {
          x: 675,
          y: 235,
          strength: 3_400_000 + cycle * 250_000,
          spin: -(2_200_000 + cycle * 180_000),
        },
      ]
      break
    case 'solarCollapse': {
      const periodMs = Math.max(2400, 3200 - cycle * 150)
      result.fireZones = SOLAR_COLLAPSE_ZONES.map((zone, index) => ({
        ...zone,
        periodMs,
        phaseMs: (index * periodMs) / SOLAR_COLLAPSE_ZONES.length,
      }))
      break
    }
    case 'zeroGFracture':
      result.gravityScale = Math.max(0.12, 0.24 - cycle * 0.025)
      result.jitterStrength = 155 + cycle * 18
      break
  }

  return result
}
