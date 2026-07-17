import { describe, expect, it } from 'vitest'
import {
  GRAVITY_WELL_START_STAGE,
  GRAVITY_WELL_STAGE_COUNT,
  applyGravityWellPull,
  getStageGravityWell,
} from './gravityWells'

describe('getStageGravityWell', () => {
  it('returns null outside the stellar-forge stage range', () => {
    expect(getStageGravityWell(GRAVITY_WELL_START_STAGE - 1)).toBeNull()
    expect(
      getStageGravityWell(GRAVITY_WELL_START_STAGE + GRAVITY_WELL_STAGE_COUNT),
    ).toBeNull()
  })

  it('escalates strength with depth', () => {
    const first = getStageGravityWell(GRAVITY_WELL_START_STAGE)
    const last = getStageGravityWell(
      GRAVITY_WELL_START_STAGE + GRAVITY_WELL_STAGE_COUNT - 1,
    )
    expect(first).not.toBeNull()
    expect(last).not.toBeNull()
    expect(last!.strength).toBeGreaterThan(first!.strength)
  })
})

describe('applyGravityWellPull', () => {
  it('pulls toward the well', () => {
    const well = { x: 500, y: 300, strength: 4_000_000 }
    const { ax, ay } = applyGravityWellPull(well, 400, 300)
    expect(ax).toBeGreaterThan(0)
    expect(ay).toBeCloseTo(0)
  })

  it('clamps acceleration near the well instead of blowing up', () => {
    const well = { x: 400, y: 300, strength: 4_000_000 }
    const { ax, ay } = applyGravityWellPull(well, 400, 300)
    expect(Number.isFinite(ax)).toBe(true)
    expect(Number.isFinite(ay)).toBe(true)
  })
})
