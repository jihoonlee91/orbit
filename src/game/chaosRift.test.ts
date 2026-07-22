import { describe, expect, it } from 'vitest'
import {
  CHAOS_RIFT_START_STAGE,
  CHAOS_RIFT_STAGE_COUNT,
  getChaosRiftCurrent,
  getChaosRiftFireZones,
} from './chaosRift'

describe('getChaosRiftCurrent', () => {
  it('returns null outside the Chaos Rift stage range', () => {
    expect(getChaosRiftCurrent(CHAOS_RIFT_START_STAGE - 1)).toBeNull()
    expect(
      getChaosRiftCurrent(CHAOS_RIFT_START_STAGE + CHAOS_RIFT_STAGE_COUNT),
    ).toBeNull()
  })

  it('escalates strength and shortens the period with depth', () => {
    const first = getChaosRiftCurrent(CHAOS_RIFT_START_STAGE)
    const last = getChaosRiftCurrent(
      CHAOS_RIFT_START_STAGE + CHAOS_RIFT_STAGE_COUNT - 1,
    )
    expect(first).not.toBeNull()
    expect(last).not.toBeNull()
    expect(last!.strength).toBeGreaterThan(first!.strength)
    expect(last!.periodMs).toBeLessThan(first!.periodMs)
  })

  it('starts stronger than the Trench current ever gets', () => {
    const first = getChaosRiftCurrent(CHAOS_RIFT_START_STAGE)!
    expect(first.strength).toBeGreaterThan(90 + 9 * 14)
  })
})

describe('getChaosRiftFireZones', () => {
  it('returns null outside the Chaos Rift stage range', () => {
    expect(getChaosRiftFireZones(CHAOS_RIFT_START_STAGE - 1)).toBeNull()
    expect(
      getChaosRiftFireZones(CHAOS_RIFT_START_STAGE + CHAOS_RIFT_STAGE_COUNT),
    ).toBeNull()
  })

  it('returns a non-empty layout inside the range', () => {
    const zones = getChaosRiftFireZones(CHAOS_RIFT_START_STAGE)
    expect(zones).not.toBeNull()
    expect(zones!.length).toBeGreaterThan(0)
  })

  it('shortens the period with depth', () => {
    const first = getChaosRiftFireZones(CHAOS_RIFT_START_STAGE)![0]
    const last = getChaosRiftFireZones(
      CHAOS_RIFT_START_STAGE + CHAOS_RIFT_STAGE_COUNT - 1,
    )![0]
    expect(last.periodMs).toBeLessThan(first.periodMs)
  })
})
