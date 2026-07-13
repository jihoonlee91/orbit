import type { StageResult } from './types'

const KEY = 'pang_scores'
const MAX_ENTRIES = 50

export type ScoreEntry = {
  score: number
  stageReached: number
  result: StageResult
  playedAt: string
}

export function loadScoreHistory(): ScoreEntry[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function recordScore(entry: ScoreEntry): {
  history: ScoreEntry[]
  rank: number
} {
  const combined = [...loadScoreHistory(), entry].sort(
    (a, b) => b.score - a.score,
  )
  const rank = combined.indexOf(entry) + 1
  const trimmed = combined.slice(0, MAX_ENTRIES)
  localStorage.setItem(KEY, JSON.stringify(trimmed))
  return { history: trimmed, rank }
}
