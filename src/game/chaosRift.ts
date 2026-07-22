import type { StageCurrent } from './currents'
import type { FireZone } from './fireZones'

export const CHAOS_RIFT_START_STAGE = 150
export const CHAOS_RIFT_STAGE_COUNT = 50

// Chaos Rift (stages 151-200, 0-indexed 150-199) is the post-Overdrive
// finale gauntlet: instead of introducing a brand new physics mechanic, it
// replays the game's two most established hazards — the lateral current
// (The Trench, `currents.ts`) and the lava-burst fire zones (Hell,
// `fireZones.ts`) — simultaneously, escalating past either one's original
// cap. Returning the exact same `StageCurrent`/`FireZone` shapes lets
// GamePlay.tsx feed the result straight into the existing
// `getCurrentWindAx`/`getFireZoneState`/`getFireZoneWarningProgress`
// functions with no new physics or rendering code.

export function getChaosRiftCurrent(stageIndex: number): StageCurrent | null {
  if (
    stageIndex < CHAOS_RIFT_START_STAGE ||
    stageIndex >= CHAOS_RIFT_START_STAGE + CHAOS_RIFT_STAGE_COUNT
  ) {
    return null
  }

  const depth = stageIndex - CHAOS_RIFT_START_STAGE
  return {
    // The Trench's current tops out at 90 + 9*14 = 216 (`currents.ts`) —
    // Chaos Rift starts above that ceiling from its very first stage.
    strength: 220 + depth * 3,
    periodMs: Math.max(1800, 3000 - depth * 24),
  }
}

const ZONE_LAYOUTS: readonly (readonly Omit<
  FireZone,
  'periodMs' | 'phaseMs'
>[])[] = [
  [
    { x: 130, width: 150 },
    { x: 400, width: 150 },
    { x: 660, width: 150 },
  ],
  [
    { x: 90, width: 140 },
    { x: 310, width: 140 },
    { x: 530, width: 140 },
    { x: 720, width: 140 },
  ],
  [
    { x: 110, width: 150 },
    { x: 380, width: 150 },
    { x: 620, width: 150 },
  ],
  [
    { x: 70, width: 130 },
    { x: 260, width: 130 },
    { x: 460, width: 130 },
    { x: 660, width: 130 },
  ],
]

export function getChaosRiftFireZones(stageIndex: number): FireZone[] | null {
  if (
    stageIndex < CHAOS_RIFT_START_STAGE ||
    stageIndex >= CHAOS_RIFT_START_STAGE + CHAOS_RIFT_STAGE_COUNT
  ) {
    return null
  }

  const depth = stageIndex - CHAOS_RIFT_START_STAGE
  const layout = ZONE_LAYOUTS[depth % ZONE_LAYOUTS.length]
  const periodMs = Math.max(1700, 2600 - depth * 18)
  return layout.map((zone, index) => ({
    ...zone,
    periodMs,
    phaseMs: (index * periodMs) / layout.length,
  }))
}
