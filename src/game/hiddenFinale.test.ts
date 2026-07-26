import { describe, expect, it } from 'vitest'
import {
  HIDDEN_FINAL_STAGE_INDEX,
  HIDDEN_FINALE_PHASE_DURATION_MS,
  HIDDEN_FINALE_WARNING_MS,
  getHiddenFinalePhase,
  getVisibleStageCount,
} from './hiddenFinale'

describe('hidden finale Eclipse Protocol', () => {
  it('keeps stage 201 hidden until stage 200 has been cleared', () => {
    expect(getVisibleStageCount(HIDDEN_FINAL_STAGE_INDEX - 1)).toBe(200)
    expect(getVisibleStageCount(HIDDEN_FINAL_STAGE_INDEX)).toBe(201)
  })

  it('does not activate outside hidden stage 201', () => {
    expect(getHiddenFinalePhase(HIDDEN_FINAL_STAGE_INDEX - 1, 0)).toBeNull()
    expect(getHiddenFinalePhase(HIDDEN_FINAL_STAGE_INDEX + 1, 0)).toBeNull()
  })

  it('telegraphs every phase before enabling its hazard', () => {
    for (let phaseIndex = 0; phaseIndex < 5; phaseIndex += 1) {
      const phaseStart = phaseIndex * HIDDEN_FINALE_PHASE_DURATION_MS
      const warning = getHiddenFinalePhase(
        HIDDEN_FINAL_STAGE_INDEX,
        phaseStart + HIDDEN_FINALE_WARNING_MS - 1,
      )!
      expect(warning.warning).toBe(true)
      expect(warning.current).toBeNull()
      expect(warning.wells).toBeNull()
      expect(warning.fireZones).toBeNull()
      expect(warning.gravityScale).toBe(1)
      expect(warning.jitterStrength).toBeNull()
      expect(warning.swarmSpawn).toBeNull()
    }
  })

  it('cycles through five named phases, banner-wise', () => {
    const activeOffset = HIDDEN_FINALE_WARNING_MS + 1
    const phases = Array.from({ length: 5 }, (_, phaseIndex) =>
      getHiddenFinalePhase(
        HIDDEN_FINAL_STAGE_INDEX,
        phaseIndex * HIDDEN_FINALE_PHASE_DURATION_MS + activeOffset,
      ),
    )

    expect(phases.map((phase) => phase?.id)).toEqual([
      'riftGale',
      'twinSingularity',
      'solarCollapse',
      'zeroGFracture',
      'balloonSwarm',
    ])
  })

  it('stacks hazards cumulatively instead of swapping one out for the next', () => {
    // A boss-fight climax, not a rotation: each named phase should ADD its
    // hazard on top of everything unlocked earlier in the same 45s cycle,
    // so Balloon Swarm (the last phase) has all five active at once.
    const activeOffset = HIDDEN_FINALE_WARNING_MS + 1
    const phases = Array.from({ length: 5 }, (_, phaseIndex) =>
      getHiddenFinalePhase(
        HIDDEN_FINAL_STAGE_INDEX,
        phaseIndex * HIDDEN_FINALE_PHASE_DURATION_MS + activeOffset,
      )!,
    )

    // Rift Gale: only the wind so far.
    expect(phases[0].current).not.toBeNull()
    expect(phases[0].wells).toBeNull()
    expect(phases[0].fireZones).toBeNull()
    expect(phases[0].gravityScale).toBe(1)
    expect(phases[0].swarmSpawn).toBeNull()

    // Twin Singularity: wind persists, wells join.
    expect(phases[1].current).not.toBeNull()
    expect(phases[1].wells).toHaveLength(2)
    expect(phases[1].fireZones).toBeNull()

    // Solar Collapse: wind + wells persist, fire zones join.
    expect(phases[2].current).not.toBeNull()
    expect(phases[2].wells).toHaveLength(2)
    expect(phases[2].fireZones).toHaveLength(4)
    expect(phases[2].gravityScale).toBe(1)

    // Zero-G Fracture: everything so far persists, gravity/jitter join.
    expect(phases[3].current).not.toBeNull()
    expect(phases[3].wells).toHaveLength(2)
    expect(phases[3].fireZones).toHaveLength(4)
    expect(phases[3].gravityScale).toBeLessThan(0.4)
    expect(phases[3].jitterStrength).toBeGreaterThan(100)
    expect(phases[3].swarmSpawn).toBeNull()

    // Balloon Swarm: the full stack, all five at once.
    expect(phases[4].current).not.toBeNull()
    expect(phases[4].wells).toHaveLength(2)
    expect(phases[4].fireZones).toHaveLength(4)
    expect(phases[4].gravityScale).toBeLessThan(0.4)
    expect(phases[4].swarmSpawn).not.toBeNull()
    expect(phases[4].swarmSpawn?.count).toBeGreaterThanOrEqual(2)
  })

  it('raises intensity after one complete protocol cycle', () => {
    const activeOffset = HIDDEN_FINALE_WARNING_MS + 1
    const firstGale = getHiddenFinalePhase(
      HIDDEN_FINAL_STAGE_INDEX,
      activeOffset,
    )!
    const secondGale = getHiddenFinalePhase(
      HIDDEN_FINAL_STAGE_INDEX,
      5 * HIDDEN_FINALE_PHASE_DURATION_MS + activeOffset,
    )!

    expect(secondGale.current!.strength).toBeGreaterThan(
      firstGale.current!.strength,
    )
  })

  it('spawns more, faster balloon swarms with each protocol cycle', () => {
    const activeOffset = HIDDEN_FINALE_WARNING_MS + 1
    const firstSwarm = getHiddenFinalePhase(
      HIDDEN_FINAL_STAGE_INDEX,
      4 * HIDDEN_FINALE_PHASE_DURATION_MS + activeOffset,
    )!
    const secondSwarm = getHiddenFinalePhase(
      HIDDEN_FINAL_STAGE_INDEX,
      9 * HIDDEN_FINALE_PHASE_DURATION_MS + activeOffset,
    )!

    expect(secondSwarm.swarmSpawn!.count).toBeGreaterThanOrEqual(
      firstSwarm.swarmSpawn!.count,
    )
    expect(secondSwarm.swarmSpawn!.intervalMs).toBeLessThan(
      firstSwarm.swarmSpawn!.intervalMs,
    )
  })
})
