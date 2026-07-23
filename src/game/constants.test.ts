import { describe, expect, it } from 'vitest'
import { ITEM_WEIGHTS, getItemWeights } from './constants'

describe('getItemWeights', () => {
  it('includes vulcan through stage 30 (0-indexed 29)', () => {
    expect(getItemWeights(0).some(([type]) => type === 'vulcan')).toBe(true)
    expect(getItemWeights(29).some(([type]) => type === 'vulcan')).toBe(true)
  })

  it('excludes vulcan from stage 31 (0-indexed 30) onward', () => {
    expect(getItemWeights(30).some(([type]) => type === 'vulcan')).toBe(false)
    expect(getItemWeights(99).some(([type]) => type === 'vulcan')).toBe(false)
  })

  it('excludes stabilizer before the current/gravity-well stages start', () => {
    expect(getItemWeights(39)).toEqual(ITEM_WEIGHTS)
  })

  it('includes stabilizer from stage 41 (0-indexed 40) onward', () => {
    const weights = getItemWeights(40)
    expect(weights).toEqual([...ITEM_WEIGHTS, ['stabilizer', 12]])
  })

  it('keeps stabilizer in the pool through the last hazard it counters (vortex, ending stage 80)', () => {
    const weights = getItemWeights(79)
    expect(weights.some(([type]) => type === 'stabilizer')).toBe(true)
  })

  it('drops stabilizer once Hell (stage 81, 0-indexed 80) starts', () => {
    const weights = getItemWeights(80)
    expect(weights.some(([type]) => type === 'stabilizer')).toBe(false)
  })

  it('excludes novaSurge before Cosmic Frontier starts', () => {
    const weights = getItemWeights(59)
    expect(weights.some(([type]) => type === 'novaSurge')).toBe(false)
  })

  it('includes novaSurge from stage 61 (0-indexed 60) onward, forever after', () => {
    const weights = getItemWeights(60)
    expect(weights.some(([type]) => type === 'novaSurge')).toBe(true)
    expect(weights.some(([type]) => type === 'stabilizer')).toBe(true)
    expect(getItemWeights(149).some(([type]) => type === 'novaSurge')).toBe(
      true,
    )
  })

  it('excludes fireproof before Hell starts', () => {
    const weights = getItemWeights(79)
    expect(weights.some(([type]) => type === 'fireproof')).toBe(false)
  })

  it('includes fireproof only within Hell (stages 81-90, 0-indexed 80-89)', () => {
    expect(getItemWeights(80).some(([type]) => type === 'fireproof')).toBe(true)
    expect(getItemWeights(89).some(([type]) => type === 'fireproof')).toBe(true)
  })

  it('drops fireproof once Void (stage 91, 0-indexed 90) starts', () => {
    expect(getItemWeights(90).some(([type]) => type === 'fireproof')).toBe(
      false,
    )
  })

  it('excludes anchor before Void starts', () => {
    const weights = getItemWeights(89)
    expect(weights.some(([type]) => type === 'anchor')).toBe(false)
  })

  it('includes anchor only within Void (stages 91-100, 0-indexed 90-99)', () => {
    const weights = getItemWeights(90)
    expect(weights.some(([type]) => type === 'anchor')).toBe(true)
    expect(weights.some(([type]) => type === 'fireproof')).toBe(false)
    expect(getItemWeights(99).some(([type]) => type === 'anchor')).toBe(true)
  })

  it('drops anchor once Toxic Marsh (stage 101, 0-indexed 100) starts', () => {
    expect(getItemWeights(100).some(([type]) => type === 'anchor')).toBe(false)
  })

  it('includes magnet, comboLock, and shockwave from stage 1 onward', () => {
    const weights = getItemWeights(0)
    expect(weights.some(([type]) => type === 'magnet')).toBe(true)
    expect(weights.some(([type]) => type === 'comboLock')).toBe(true)
    expect(weights.some(([type]) => type === 'shockwave')).toBe(true)
  })

  it('excludes umbrella before Toxic Marsh starts', () => {
    expect(getItemWeights(99).some(([type]) => type === 'umbrella')).toBe(false)
  })

  it('includes umbrella only within Toxic Marsh (stages 101-110, 0-indexed 100-109)', () => {
    const weights = getItemWeights(100)
    expect(weights.some(([type]) => type === 'umbrella')).toBe(true)
    expect(weights.some(([type]) => type === 'anchor')).toBe(false)
    expect(getItemWeights(109).some(([type]) => type === 'umbrella')).toBe(true)
  })

  it('drops umbrella once Frozen Summit (stage 111, 0-indexed 110) starts', () => {
    expect(getItemWeights(110).some(([type]) => type === 'umbrella')).toBe(
      false,
    )
  })

  it('excludes gripBoots before Frozen Summit starts', () => {
    expect(getItemWeights(109).some(([type]) => type === 'gripBoots')).toBe(
      false,
    )
  })

  it('includes gripBoots only within Frozen Summit (stages 111-120, 0-indexed 110-119)', () => {
    const weights = getItemWeights(110)
    expect(weights.some(([type]) => type === 'gripBoots')).toBe(true)
    expect(weights.some(([type]) => type === 'umbrella')).toBe(false)
    expect(getItemWeights(119).some(([type]) => type === 'gripBoots')).toBe(
      true,
    )
  })

  it('drops gripBoots once Solar Storm (stage 121, 0-indexed 120) starts', () => {
    expect(getItemWeights(120).some(([type]) => type === 'gripBoots')).toBe(
      false,
    )
  })

  it('excludes visor before Solar Storm starts', () => {
    expect(getItemWeights(119).some(([type]) => type === 'visor')).toBe(false)
  })

  it('includes visor only within Solar Storm (stages 121-130, 0-indexed 120-129)', () => {
    const weights = getItemWeights(120)
    expect(weights.some(([type]) => type === 'visor')).toBe(true)
    expect(weights.some(([type]) => type === 'gripBoots')).toBe(false)
    expect(getItemWeights(129).some(([type]) => type === 'visor')).toBe(true)
  })

  it('drops visor once Quantum Rift (stage 131, 0-indexed 130) starts', () => {
    expect(getItemWeights(130).some(([type]) => type === 'visor')).toBe(false)
  })

  it('excludes lockOn before Quantum Rift starts', () => {
    expect(getItemWeights(129).some(([type]) => type === 'lockOn')).toBe(false)
  })

  it('includes lockOn only within Quantum Rift (stages 131-140, 0-indexed 130-139)', () => {
    const weights = getItemWeights(130)
    expect(weights.some(([type]) => type === 'lockOn')).toBe(true)
    expect(weights.some(([type]) => type === 'visor')).toBe(false)
    expect(getItemWeights(139).some(([type]) => type === 'lockOn')).toBe(true)
  })

  it('drops lockOn once Overdrive Nexus (stage 141, 0-indexed 140) starts', () => {
    expect(getItemWeights(140).some(([type]) => type === 'lockOn')).toBe(false)
  })

  it('excludes overdrive before Overdrive Nexus starts', () => {
    expect(getItemWeights(139).some(([type]) => type === 'overdrive')).toBe(
      false,
    )
  })

  it('includes overdrive from stage 141 (0-indexed 140) onward, forever after', () => {
    const weights = getItemWeights(140)
    expect(weights.some(([type]) => type === 'overdrive')).toBe(true)
    expect(getItemWeights(149).some(([type]) => type === 'overdrive')).toBe(
      true,
    )
  })

  it('drops stabilizer and fireproof between Overdrive Nexus and Chaos Rift', () => {
    const weights = getItemWeights(149)
    expect(weights.some(([type]) => type === 'stabilizer')).toBe(false)
    expect(weights.some(([type]) => type === 'fireproof')).toBe(false)
  })

  it('reintroduces stabilizer and fireproof for Chaos Rift (stage 151, 0-indexed 150) onward', () => {
    const weights = getItemWeights(150)
    expect(weights.some(([type]) => type === 'stabilizer')).toBe(true)
    expect(weights.some(([type]) => type === 'fireproof')).toBe(true)
    expect(getItemWeights(199).some(([type]) => type === 'stabilizer')).toBe(
      true,
    )
    expect(getItemWeights(199).some(([type]) => type === 'fireproof')).toBe(
      true,
    )
  })

  it('restores every Eclipse Protocol counter in hidden stage 201', () => {
    const types = getItemWeights(200).map(([type]) => type)
    expect(types).toContain('stabilizer')
    expect(types).toContain('fireproof')
    expect(types).toContain('anchor')
    expect(types).toContain('lockOn')
    expect(types).toContain('overdrive')
  })
})
