import { describe, expect, it } from 'vitest'
import {
  BREEZE_START_STAGE,
  BREEZE_STAGE_COUNT,
  getBreezeWindAx,
  getStageBreeze,
} from './breeze'

describe('getStageBreeze', () => {
  it('returns null outside the World Tour II stage range', () => {
    expect(getStageBreeze(BREEZE_START_STAGE - 1)).toBeNull()
    expect(getStageBreeze(BREEZE_START_STAGE + BREEZE_STAGE_COUNT)).toBeNull()
  })

  it('escalates strength gently with depth', () => {
    const first = getStageBreeze(BREEZE_START_STAGE)
    const last = getStageBreeze(BREEZE_START_STAGE + BREEZE_STAGE_COUNT - 1)
    expect(first).not.toBeNull()
    expect(last).not.toBeNull()
    expect(last!.strength).toBeGreaterThan(first!.strength)
    expect(last!.periodMs).toBeLessThan(first!.periodMs)
  })

  it('stays much weaker than the deep-sea current at its opening stage', () => {
    const last = getStageBreeze(BREEZE_START_STAGE + BREEZE_STAGE_COUNT - 1)!
    expect(last.strength).toBeLessThan(90)
  })
})

describe('getBreezeWindAx', () => {
  it('returns 0 when there is no breeze', () => {
    expect(getBreezeWindAx(null, 1000)).toBe(0)
  })

  it('oscillates between -strength and +strength over one period', () => {
    const breeze = { strength: 40, periodMs: 5000 }
    expect(getBreezeWindAx(breeze, 0)).toBeCloseTo(0)
    expect(getBreezeWindAx(breeze, 1250)).toBeCloseTo(40)
    expect(getBreezeWindAx(breeze, 3750)).toBeCloseTo(-40)
  })
})
