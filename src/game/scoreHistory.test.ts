import { beforeEach, describe, expect, it } from 'vitest'
import { getBestScore, getMilestoneEncouragement } from './scoreHistory'

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

describe('getBestScore', () => {
  it('returns 0 with no history', () => {
    expect(getBestScore()).toBe(0)
  })

  it('returns the highest score across all entries', () => {
    storage.set(
      'pang_scores',
      JSON.stringify([{ score: 120 }, { score: 480 }, { score: 300 }]),
    )
    expect(getBestScore()).toBe(480)
  })
})

describe('getMilestoneEncouragement', () => {
  it('gives a first-record framing with no history', () => {
    expect(getMilestoneEncouragement(100, 0)).toMatch(/first record/i)
  })

  it('celebrates already beating the best score', () => {
    expect(getMilestoneEncouragement(500, 400)).toMatch(/ahead of your best/i)
    expect(getMilestoneEncouragement(400, 400)).toMatch(/ahead of your best/i)
  })

  it('names the exact point gap when close to the best', () => {
    expect(getMilestoneEncouragement(380, 400)).toBe(
      'Only 20 points behind your best — you can catch it!',
    )
  })

  it('falls back to a generic nudge when far behind', () => {
    expect(getMilestoneEncouragement(50, 400)).toBe(
      'Best score to beat: 400. Keep pushing!',
    )
  })
})
