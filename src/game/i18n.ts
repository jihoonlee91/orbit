// English is the fallback locale. Coverage is incremental — screens not
// yet wired to `t()` still render their original hardcoded English/Korean
// text regardless of this setting. Covered so far: main menu, in-game HUD
// and pause menu, Settings dialog, and item titles/descriptions. NOT yet
// covered: Stage Map, Glossary, What's New, the intro tutorial carousel,
// and touch-control aria-labels — those stay English-only until a follow-up
// pass translates them too.
export type Locale = 'en' | 'ko'

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
}

type Strings = {
  mainMenu: {
    kicker: string
    tagline: string
    unlockProgress: (current: number, total: number) => string
    startGame: string
    continueGame: (stage: number) => string
    watchAiPlay: string
    replayIntro: string
    stageMap: string
    glossary: string
    settings: string
    fullscreen: string
    exitFullscreen: string
    installApp: string
    spaceHint: string
    updating: string
  }
  settings: {
    title: string
    masterVolume: string
    musicVolume: string
    effectsVolume: string
    touchButtonSize: string
    touchOpacity: string
    screenShake: string
    reducedMotion: string
    vibration: string
    showFps: string
    aiCompanion: string
    language: string
    done: string
    replayTutorial: string
    whatsNew: string
    clearCache: string
    clearingCache: string
    cacheHint: string
    disclaimer: string
  }
  hud: {
    pause: string
    paused: string
    resume: string
    restartStage: string
    quitToMain: string
    gotIt: string
    newHazard: (name: string) => string
    stage: (n: number) => string
    getReady: string
    itemObtained: (title: string) => string
    time: (seconds: number) => string
    totalScore: (score: number) => string
    combo: (count: number) => string
    barrier: string
    none: string
  }
}

const en: Strings = {
  mainMenu: {
    kicker: 'Classic World Tour • 1 Player',
    tagline: 'Pop • Split • Clear the Stage',
    unlockProgress: (current, total) => `Unlocked: Stage ${current} / ${total}`,
    startGame: 'Start Game',
    continueGame: (stage) => `Continue (Stage ${stage})`,
    watchAiPlay: 'Watch AI Play',
    replayIntro: 'Replay Intro',
    stageMap: 'Stage Map',
    glossary: 'Glossary',
    settings: 'Settings',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit Fullscreen',
    installApp: 'Install App',
    spaceHint: '▼ Press Space to Start ▼',
    updating: 'Updating to the latest version…',
  },
  settings: {
    title: 'Settings',
    masterVolume: 'Master volume',
    musicVolume: 'Music volume',
    effectsVolume: 'Effects volume',
    touchButtonSize: 'Touch button size',
    touchOpacity: 'Touch opacity',
    screenShake: 'Screen shake',
    reducedMotion: 'Reduced motion',
    vibration: 'Vibration',
    showFps: 'Show FPS',
    aiCompanion: 'AI Companion (assist mode)',
    language: 'Language',
    done: 'Done',
    replayTutorial: 'Replay Tutorial',
    whatsNew: "What's New",
    clearCache: 'Clear Cache',
    clearingCache: 'Clearing Cache…',
    cacheHint:
      "This device caches the game for offline play. Clear it if you're stuck on an old version.",
    disclaimer:
      'This is an independent game and is not affiliated with or endorsed by the owners of Pang or Buster Bros.',
  },
  hud: {
    pause: 'Pause',
    paused: 'Paused',
    resume: 'Resume',
    restartStage: 'Restart Stage',
    quitToMain: 'Quit to Main',
    gotIt: 'Got It',
    newHazard: (name) => `New Hazard: ${name}`,
    stage: (n) => `Stage ${n}`,
    getReady: 'GET READY',
    itemObtained: (title) => `${title} obtained!`,
    time: (seconds) => `Time ${seconds}`,
    totalScore: (score) => `Total Score ${score}`,
    combo: (count) => `Combo ×${count}`,
    barrier: 'Barrier',
    none: 'None',
  },
}

const ko: Strings = {
  mainMenu: {
    kicker: '클래식 월드 투어 • 1인용',
    tagline: '터뜨리고 • 쪼개고 • 스테이지 클리어',
    unlockProgress: (current, total) => `해금: 스테이지 ${current} / ${total}`,
    startGame: '게임 시작',
    continueGame: (stage) => `이어하기 (스테이지 ${stage})`,
    watchAiPlay: 'AI 플레이 관전',
    replayIntro: '인트로 다시보기',
    stageMap: '스테이지 맵',
    glossary: '용어 사전',
    settings: '설정',
    fullscreen: '전체화면',
    exitFullscreen: '전체화면 종료',
    installApp: '앱 설치',
    spaceHint: '▼ 스페이스바를 눌러 시작 ▼',
    updating: '최신 버전으로 업데이트 중…',
  },
  settings: {
    title: '설정',
    masterVolume: '전체 음량',
    musicVolume: '음악 음량',
    effectsVolume: '효과음 음량',
    touchButtonSize: '터치 버튼 크기',
    touchOpacity: '터치 버튼 투명도',
    screenShake: '화면 흔들림',
    reducedMotion: '모션 줄이기',
    vibration: '진동',
    showFps: 'FPS 표시',
    aiCompanion: 'AI 도우미 (어시스트 모드)',
    language: '언어',
    done: '완료',
    replayTutorial: '튜토리얼 다시하기',
    whatsNew: '업데이트 소식',
    clearCache: '캐시 지우기',
    clearingCache: '캐시 지우는 중…',
    cacheHint:
      '이 기기는 오프라인 플레이를 위해 게임을 캐시합니다. 이전 버전에서 멈췄다면 캐시를 지워보세요.',
    disclaimer:
      '이 게임은 독립적으로 제작되었으며 Pang이나 Buster Bros 소유권자와 관련이 없습니다.',
  },
  hud: {
    pause: '일시정지',
    paused: '일시정지됨',
    resume: '계속하기',
    restartStage: '스테이지 재시작',
    quitToMain: '메인으로 나가기',
    gotIt: '확인',
    newHazard: (name) => `새로운 장애물: ${name}`,
    stage: (n) => `스테이지 ${n}`,
    getReady: '준비하세요',
    itemObtained: (title) => `${title} 획득!`,
    time: (seconds) => `시간 ${seconds}`,
    totalScore: (score) => `총점 ${score}`,
    combo: (count) => `콤보 ×${count}`,
    barrier: '배리어',
    none: '없음',
  },
}

const LOCALES: Record<Locale, Strings> = { en, ko }

export function getStrings(locale: Locale): Strings {
  return LOCALES[locale] ?? en
}
