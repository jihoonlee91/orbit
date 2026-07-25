import { describe, expect, it } from 'vitest'
import { getStrings, LOCALE_LABELS } from './i18n'

describe('getStrings', () => {
  it('returns matching-shaped dictionaries for both locales', () => {
    const en = getStrings('en')
    const ko = getStrings('ko')
    expect(Object.keys(en)).toEqual(Object.keys(ko))
    expect(Object.keys(en.mainMenu)).toEqual(Object.keys(ko.mainMenu))
    expect(Object.keys(en.settings)).toEqual(Object.keys(ko.settings))
    expect(Object.keys(en.hud)).toEqual(Object.keys(ko.hud))
  })

  it('interpolates values into templated strings', () => {
    expect(getStrings('en').hud.stage(3)).toBe('Stage 3')
    expect(getStrings('ko').hud.stage(3)).toBe('스테이지 3')
  })

  it('has a label for every locale', () => {
    expect(Object.keys(LOCALE_LABELS)).toEqual(['en', 'ko'])
  })
})
