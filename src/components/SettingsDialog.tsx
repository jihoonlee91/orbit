import { useState } from 'react'
import type { GameSettings } from '../game/settings'
import { clearAppCache } from '../game/updateCheck'
import { getStrings, LOCALE_LABELS, type Locale } from '../game/i18n'

type Props = {
  settings: GameSettings
  onChange: (settings: GameSettings) => void
  onClose: () => void
  onReplayTutorial: () => void
  onShowWhatsNew: () => void
  manualInstallHint: string | null
}

export default function SettingsDialog({
  settings,
  onChange,
  onClose,
  onReplayTutorial,
  onShowWhatsNew,
  manualInstallHint,
}: Props) {
  const update = <K extends keyof GameSettings>(
    key: K,
    value: GameSettings[K],
  ) => onChange({ ...settings, [key]: value })

  const t = getStrings(settings.language)
  const [clearingCache, setClearingCache] = useState(false)

  const handleClearCache = async () => {
    setClearingCache(true)
    await clearAppCache()
    window.location.reload()
  }

  return (
    <div
      className="screen settings-screen"
      role="dialog"
      aria-labelledby="settings-title"
    >
      <h1 id="settings-title">{t.settings.title}</h1>
      {(
        [
          ['masterVolume', t.settings.masterVolume],
          ['musicVolume', t.settings.musicVolume],
          ['effectsVolume', t.settings.effectsVolume],
        ] as const
      ).map(([key, label]) => (
        <label className="setting-row" key={key}>
          {label}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={settings[key]}
            onChange={(event) => update(key, Number(event.target.value))}
          />
        </label>
      ))}
      <label className="setting-row">
        {t.settings.touchButtonSize}
        <input
          type="range"
          min="72"
          max="104"
          step="4"
          value={settings.touchButtonSize}
          onChange={(event) =>
            update('touchButtonSize', Number(event.target.value))
          }
        />
      </label>
      <label className="setting-row">
        {t.settings.touchOpacity}
        <input
          type="range"
          min="0.4"
          max="1"
          step="0.05"
          value={settings.touchButtonOpacity}
          onChange={(event) =>
            update('touchButtonOpacity', Number(event.target.value))
          }
        />
      </label>
      <label className="setting-row">
        {t.settings.language}
        <select
          value={settings.language}
          onChange={(event) => update('language', event.target.value as Locale)}
        >
          {(Object.keys(LOCALE_LABELS) as Locale[]).map((locale) => (
            <option key={locale} value={locale}>
              {LOCALE_LABELS[locale]}
            </option>
          ))}
        </select>
      </label>
      {(
        [
          ['screenShake', t.settings.screenShake],
          ['reducedMotion', t.settings.reducedMotion],
          ['vibration', t.settings.vibration],
          ['showFps', t.settings.showFps],
          ['aiCompanion', t.settings.aiCompanion],
        ] as const
      ).map(([key, label]) => (
        <label className="setting-check" key={key}>
          <input
            type="checkbox"
            checked={settings[key]}
            onChange={(event) => update(key, event.target.checked)}
          />
          {label}
        </label>
      ))}
      <div className="settings-actions">
        <button type="button" className="screen-button" onClick={onClose}>
          {t.settings.done}
        </button>
        <button
          type="button"
          className="screen-button screen-button-secondary"
          onClick={onReplayTutorial}
        >
          {t.settings.replayTutorial}
        </button>
      </div>
      <button
        type="button"
        className="screen-button screen-button-secondary"
        onClick={onShowWhatsNew}
      >
        {t.settings.whatsNew}
      </button>
      <button
        type="button"
        className="screen-button screen-button-secondary"
        disabled={clearingCache}
        onClick={() => void handleClearCache()}
      >
        {clearingCache ? t.settings.clearingCache : t.settings.clearCache}
      </button>
      <p className="setting-hint">{t.settings.cacheHint}</p>
      {manualInstallHint && <p className="setting-hint">{manualInstallHint}</p>}
      <p className="disclaimer">{t.settings.disclaimer}</p>
    </div>
  )
}
