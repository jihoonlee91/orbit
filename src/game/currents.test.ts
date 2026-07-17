import { describe, expect, it } from 'vitest'
import {
  CURRENT_START_STAGE,
  CURRENT_STAGE_COUNT,
  getCurrentWindAx,
  getStageCurrent,
} from './currents'

describe('getStageCurrent', () => {
  it('returns null outside the trench stage range', () => {
    expect(getStageCurrent(CURRENT_START_STAGE - 1)).toBeNull()
    expect(
      getStageCurrent(CURRENT_START_STAGE + CURRENT_STAGE_COUNT),
    ).toBeNull()
  })

  it('escalates strength and shortens the period with depth', () => {
    const first = getStageCurrent(CURRENT_START_STAGE)
    const last = getStageCurrent(CURRENT_START_STAGE + CURRENT_STAGE_COUNT - 1)
    expect(first).not.toBeNull()
    expect(last).not.toBeNull()
    expect(last!.strength).toBeGreaterThan(first!.strength)
    expect(last!.periodMs).toBeLessThan(first!.periodMs)
  })
})

describe('getCurrentWindAx', () => {
  it('returns 0 when there is no current', () => {
    expect(getCurrentWindAx(null, 1000)).toBe(0)
  })

  it('oscillates between -strength and +strength over one period', () => {
    const current = { strength: 100, periodMs: 4000 }
    expect(getCurrentWindAx(current, 0)).toBeCloseTo(0)
    expect(getCurrentWindAx(current, 1000)).toBeCloseTo(100)
    expect(getCurrentWindAx(current, 3000)).toBeCloseTo(-100)
  })
})
