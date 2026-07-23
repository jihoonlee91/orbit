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
    for (let phaseIndex = 0; phaseIndex < 4; phaseIndex += 1) {
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
    }
  })

  it('cycles through four exclusive mastered-hazard remixes', () => {
    const activeOffset = HIDDEN_FINALE_WARNING_MS + 1
    const phases = Array.from({ length: 4 }, (_, phaseIndex) =>
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
    ])
    expect(phases[0]?.current).not.toBeNull()
    expect(phases[1]?.wells).toHaveLength(2)
    expect(phases[2]?.fireZones).toHaveLength(4)
    expect(phases[3]?.gravityScale).toBeLessThan(0.3)
    expect(phases[3]?.jitterStrength).toBeGreaterThan(140)
  })

  it('raises intensity after one complete protocol cycle', () => {
    const activeOffset = HIDDEN_FINALE_WARNING_MS + 1
    const firstGale = getHiddenFinalePhase(
      HIDDEN_FINAL_STAGE_INDEX,
      activeOffset,
    )!
    const secondGale = getHiddenFinalePhase(
      HIDDEN_FINAL_STAGE_INDEX,
      4 * HIDDEN_FINALE_PHASE_DURATION_MS + activeOffset,
    )!

    expect(secondGale.current!.strength).toBeGreaterThan(
      firstGale.current!.strength,
    )
  })
})
