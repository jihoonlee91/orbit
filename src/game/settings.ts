import type { Locale } from './i18n'

export type GameSettings = {
  masterVolume: number
  musicVolume: number
  effectsVolume: number
  touchButtonSize: number
  touchButtonOpacity: number
  reducedMotion: boolean
  screenShake: boolean
  vibration: boolean
  showFps: boolean
  aiCompanion: boolean
  language: Locale
}

export const DEFAULT_SETTINGS: GameSettings = {
  masterVolume: 0.8,
  musicVolume: 0.45,
  effectsVolume: 0.8,
  touchButtonSize: 84,
  touchButtonOpacity: 0.82,
  reducedMotion: false,
  screenShake: true,
  vibration: true,
  showFps: false,
  aiCompanion: false,
  // English is the fallback while Korean coverage is still being filled
  // in screen by screen — see i18n.ts for which screens are translated.
  language: 'en',
}

const KEY = 'pang.settings.v1'

export function loadSettings(): GameSettings {
  try {
    const stored = JSON.parse(
      localStorage.getItem(KEY) ?? '{}',
    ) as Partial<GameSettings>
    return {
      ...DEFAULT_SETTINGS,
      ...stored,
      touchButtonSize: Math.max(
        80,
        stored.touchButtonSize ?? DEFAULT_SETTINGS.touchButtonSize,
      ),
    }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function saveSettings(settings: GameSettings) {
  localStorage.setItem(KEY, JSON.stringify(settings))
}
