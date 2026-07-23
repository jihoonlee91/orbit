import { beforeEach, describe, expect, it } from 'vitest'
import { getHighestUnlockedStage, unlockStage } from './progress'

const storage = new Map<string, string>()

beforeEach(() => {
  storage.clear()
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
    },
  })
})

describe('stage unlock progress', () => {
  it('starts with only stage 1 unlocked', () => {
    expect(getHighestUnlockedStage()).toBe(0)
  })

  it('never loses a previously unlocked stage', () => {
    expect(unlockStage(5)).toBe(5)
    expect(unlockStage(2)).toBe(5)
    expect(getHighestUnlockedStage()).toBe(5)
  })

  it('migrates the highest stage reached from local score history', () => {
    storage.set(
      'pang_scores',
      JSON.stringify([{ stageReached: 3 }, { stageReached: 8 }]),
    )
    expect(getHighestUnlockedStage()).toBe(7)
  })

  it('allows the secret stage only at the final index and clamps beyond it', () => {
    expect(unlockStage(200)).toBe(200)
    expect(unlockStage(999)).toBe(200)
  })
})
