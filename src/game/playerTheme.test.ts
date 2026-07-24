import { describe, expect, it } from 'vitest'
import { getPlayerTheme } from './playerTheme'

describe('getPlayerTheme', () => {
  it.each([
    [0, 'Mt. Fuji (Japan)', 'traveler'],
    [29, 'Milford Sound (New Zealand)', 'traveler'],
    [30, 'Neon Megacity (Dimension X)', 'tech'],
    [40, 'Kelp Gate (The Trench)', 'diver'],
    [50, 'Ember Nebula (Stellar Forge)', 'astronaut'],
    [70, 'Inferno Gate (Hell)', 'fireguard'],
    [100, 'Poison Delta (Toxic Marsh)', 'hazmat'],
    [110, 'Ice Shelf (Frozen Summit)', 'alpine'],
    [120, 'Solar Crown (Solar Storm)', 'astronaut'],
    [150, 'Rift Gate (Quantum Rift)', 'tech'],
    [200, 'Eclipse Protocol (Hidden Finale)', 'eclipse'],
  ] as const)(
    'maps stage %i, %s to %s equipment',
    (stageIndex, stageName, expected) => {
      expect(getPlayerTheme(stageIndex, stageName)).toBe(expected)
    },
  )
})
