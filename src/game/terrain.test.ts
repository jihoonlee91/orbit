import { describe, expect, it } from 'vitest'
import { PLAYER_Y, PUBLIC_STAGE_COUNT, STAGE_COUNT } from './constants'
import { ICE_WIND_START_STAGE } from './iceWinds'
import {
  getStageTerrain,
  isDestructiblePlatform,
  STAGE_TERRAINS,
  stepPlayerOnTerrain,
} from './terrain'

describe('stage terrain', () => {
  it('starts with open arenas and introduces terrain gradually', () => {
    expect(STAGE_TERRAINS).toHaveLength(STAGE_COUNT)
    expect(STAGE_TERRAINS[0]).toEqual({ platforms: [] })
    expect(STAGE_TERRAINS[1]).toEqual({ platforms: [] })
    expect(STAGE_TERRAINS[2].platforms).toHaveLength(1)
    expect(STAGE_TERRAINS[3].platforms).toHaveLength(1)

    const platformCounts = STAGE_TERRAINS.slice(0, PUBLIC_STAGE_COUNT).map(
      (terrain) => terrain.platforms.length,
    )
    for (let stage = 1; stage < platformCounts.length; stage += 1) {
      expect(platformCounts[stage]).toBeGreaterThanOrEqual(
        platformCounts[stage - 1],
      )
    }
    expect(platformCounts[5]).toBe(2)
    expect(platformCounts[10]).toBe(3)
    expect(platformCounts[15]).toBe(4)
  })

  it('uses a unique broken-crown arena for the hidden finale', () => {
    const hiddenTerrain = getStageTerrain(STAGE_COUNT - 1)

    expect(hiddenTerrain.platforms).toHaveLength(4)
    expect(hiddenTerrain).not.toEqual(getStageTerrain(PUBLIC_STAGE_COUNT - 1))
  })

  it('keeps the player on the ground while moving horizontally', () => {
    const terrain = getStageTerrain(2)
    const next = stepPlayerOnTerrain(
      480,
      PLAYER_Y,
      { left: false, right: true },
      0.1,
      300,
      terrain,
    )

    expect(next.x).toBe(510)
    expect(next.y).toBe(PLAYER_Y)
  })

  it('clamps horizontal movement to the arena bounds', () => {
    const terrain = getStageTerrain(2)
    const next = stepPlayerOnTerrain(
      30,
      PLAYER_Y,
      { left: true, right: false },
      2,
      300,
      terrain,
    )

    expect(next.x).toBe(20)
    expect(next.y).toBe(PLAYER_Y)
  })

  it('varies platform layouts across the 8 layout families from stage 21 onward', () => {
    // Stage 20 (0-indexed) is the first stage past the hand-placed
    // EXTRA_PLATFORMS range, where LAYOUT_FAMILIES takes over.
    const layouts = Array.from({ length: 8 }, (_, i) =>
      getStageTerrain(20 + i)
        .platforms.map((p) => `${p.x},${p.y}`)
        .join('|'),
    )
    const distinctLayouts = new Set(layouts)
    expect(distinctLayouts.size).toBe(8)
  })

  it('jitters the same layout family differently one cycle apart', () => {
    // Stages 20 and 28 both land on family index 4 (20 % 8 === 28 % 8),
    // but per-stage jitter should still make their exact platforms differ.
    const first = getStageTerrain(20).platforms
    const second = getStageTerrain(28).platforms
    expect(first).not.toEqual(second)
  })
})

describe('isDestructiblePlatform', () => {
  it('has no destructible platforms before stage 21 (0-indexed 20)', () => {
    expect(isDestructiblePlatform(19, 0)).toBe(false)
    expect(isDestructiblePlatform(0, 0)).toBe(false)
  })

  it('marks roughly one in three platforms from stage 21 onward', () => {
    // (stageIndex + platformIndex) % 3 === 0
    expect(isDestructiblePlatform(20, 1)).toBe(true)
    expect(isDestructiblePlatform(20, 0)).toBe(false)
    expect(isDestructiblePlatform(20, 2)).toBe(false)
    expect(isDestructiblePlatform(20, 4)).toBe(true)
  })

  it('is deterministic for the same stage and platform index', () => {
    expect(isDestructiblePlatform(45, 2)).toBe(isDestructiblePlatform(45, 2))
  })
})

describe('icy floor momentum (Frozen Summit)', () => {
  it('marks Frozen Summit stages icy and every other stage not icy', () => {
    expect(getStageTerrain(ICE_WIND_START_STAGE).icy).toBe(true)
    expect(getStageTerrain(ICE_WIND_START_STAGE + 9).icy).toBe(true)
    expect(getStageTerrain(ICE_WIND_START_STAGE - 1).icy).toBeFalsy()
    expect(getStageTerrain(0).icy).toBeFalsy()
  })

  it('snaps instantly to input speed on a normal (non-icy) stage', () => {
    const terrain = getStageTerrain(0)
    const next = stepPlayerOnTerrain(
      400,
      PLAYER_Y,
      { left: false, right: true },
      0.1,
      300,
      terrain,
      0,
    )
    expect(next.x).toBe(430)
    expect(next.vx).toBe(300)
  })

  it('accelerates gradually toward input speed on an icy stage', () => {
    const terrain = getStageTerrain(ICE_WIND_START_STAGE)
    const next = stepPlayerOnTerrain(
      400,
      PLAYER_Y,
      { left: false, right: true },
      0.1,
      300,
      terrain,
      0,
    )
    // Same input as the non-icy case above, but starting from 0 velocity
    // on ice can't instantly reach 300px/s — it should end up short of
    // both the non-icy distance and the non-icy final speed.
    expect(next.vx).toBeGreaterThan(0)
    expect(next.vx).toBeLessThan(300)
    expect(next.x).toBeGreaterThan(400)
    expect(next.x).toBeLessThan(430)
  })

  it('keeps sliding (does not stop dead) once input releases on ice', () => {
    const terrain = getStageTerrain(ICE_WIND_START_STAGE)
    const next = stepPlayerOnTerrain(
      400,
      PLAYER_Y,
      { left: false, right: false },
      0.1,
      300,
      terrain,
      300,
    )
    expect(next.vx).toBeGreaterThan(0)
    expect(next.vx).toBeLessThan(300)
    expect(next.x).toBeGreaterThan(400)
  })

  it('zeroes momentum instead of pinning it when sliding into a wall', () => {
    const terrain = getStageTerrain(ICE_WIND_START_STAGE)
    const next = stepPlayerOnTerrain(
      15,
      PLAYER_Y,
      { left: true, right: false },
      1,
      300,
      terrain,
      -300,
    )
    expect(next.x).toBe(20)
    expect(next.vx).toBe(0)
  })
})
