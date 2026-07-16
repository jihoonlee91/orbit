import { describe, expect, it } from 'vitest'
import { addToTotalScore } from './scoring'

describe('addToTotalScore', () => {
  it('keeps every previous stage score when later stages award points', () => {
    const stageOneTotal = addToTotalScore(0, 1250)
    const stageTwoTotal = addToTotalScore(stageOneTotal, 850)
    const stageThreeTotal = addToTotalScore(stageTwoTotal, 400)

    expect(stageOneTotal).toBe(1250)
    expect(stageTwoTotal).toBe(2100)
    expect(stageThreeTotal).toBe(2500)
  })
})
