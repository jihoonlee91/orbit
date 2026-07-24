export type PlayerTheme =
  | 'traveler'
  | 'tech'
  | 'diver'
  | 'astronaut'
  | 'fireguard'
  | 'hazmat'
  | 'alpine'
  | 'eclipse'

const TECH_CHAPTERS = [
  'Dimension X',
  'Quantum Rift',
  'Overdrive Nexus',
  'Fractured Gateway',
  'Prism Collapse',
  'Final Singularity',
]

/**
 * Selects equipment from the stage's actual chapter label. The first thirty
 * stages are world tours whose parenthesized suffix is a country, so they use
 * the shared traveler outfit.
 */
export function getPlayerTheme(
  stageIndex: number,
  stageName: string,
): PlayerTheme {
  if (stageIndex < 30) return 'traveler'
  if (stageName.includes('(The Trench)')) return 'diver'
  if (stageName.includes('(Toxic Marsh)')) return 'hazmat'
  if (stageName.includes('(Frozen Summit)')) return 'alpine'
  if (
    stageName.includes('(Hell)') ||
    stageName.includes('(Molten Maelstrom)')
  ) {
    return 'fireguard'
  }
  if (stageName.includes('(Hidden Finale)')) return 'eclipse'
  if (TECH_CHAPTERS.some((chapter) => stageName.includes(`(${chapter})`))) {
    return 'tech'
  }
  return 'astronaut'
}
