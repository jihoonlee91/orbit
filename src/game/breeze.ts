export const BREEZE_START_STAGE = 20
export const BREEZE_STAGE_COUNT = 10

export type StageBreeze = {
  strength: number
  periodMs: number
}

// A gentle lateral "breeze" for World Tour II (stages 21-30, 0-indexed
// 20-29) — the first hint of a push hazard, well before the deep-sea
// current (stage 41+) that plays the same idea much stronger. Strength
// stays roughly a third of the current's opening strength even at its
// peak, and the period stays long/lazy rather than choppy.
export function getStageBreeze(stageIndex: number): StageBreeze | null {
  if (
    stageIndex < BREEZE_START_STAGE ||
    stageIndex >= BREEZE_START_STAGE + BREEZE_STAGE_COUNT
  ) {
    return null
  }

  const depth = stageIndex - BREEZE_START_STAGE
  return {
    strength: 25 + depth * 3,
    periodMs: Math.max(4400, 5400 - depth * 100),
  }
}

// Sine-wave lateral acceleration for the given breeze at a point in time —
// same shape as currents.ts's getCurrentWindAx, kept as a separate function
// (rather than reusing it) so the two hazards can escalate independently
// without one's tuning constants leaking into the other.
export function getBreezeWindAx(
  breeze: StageBreeze | null,
  elapsedMs: number,
): number {
  if (!breeze) return 0
  return Math.sin((elapsedMs / breeze.periodMs) * Math.PI * 2) * breeze.strength
}
