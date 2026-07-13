let audioCtx: AudioContext | null = null
let bgmTimer: ReturnType<typeof setInterval> | null = null

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    audioCtx = new AudioCtor()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

function playTone(
  freq: number,
  durationSec: number,
  type: OscillatorType,
  volume: number,
  delaySec = 0,
) {
  const ctx = getContext()
  if (!ctx) return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq

  const startTime = ctx.currentTime + delaySec
  gain.gain.setValueAtTime(volume, startTime)
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + durationSec)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(startTime)
  osc.stop(startTime + durationSec)
}

export function playHitSound(level: number) {
  const freq = 440 + (2 - level) * 220
  playTone(freq, 0.15, 'square', 0.06)
}

export function playPlayerHitSound() {
  playTone(180, 0.3, 'sawtooth', 0.08)
}

export function playClearSound() {
  ;[523, 659, 784, 1047].forEach((freq, i) => {
    playTone(freq, 0.2, 'triangle', 0.07, i * 0.12)
  })
}

export function playGameOverSound() {
  ;[392, 330, 262, 196].forEach((freq, i) => {
    playTone(freq, 0.3, 'sawtooth', 0.07, i * 0.15)
  })
}

export function playItemSound() {
  playTone(880, 0.12, 'sine', 0.07)
  playTone(1320, 0.12, 'sine', 0.06, 0.08)
}

const BGM_PATTERN = [262, 330, 392, 330, 294, 330, 392, 494]

export function startBgm() {
  const ctx = getContext()
  if (!ctx || bgmTimer) return

  let i = 0
  bgmTimer = setInterval(() => {
    playTone(BGM_PATTERN[i % BGM_PATTERN.length], 0.35, 'sine', 0.025)
    i += 1
  }, 400)
}

export function stopBgm() {
  if (bgmTimer) {
    clearInterval(bgmTimer)
    bgmTimer = null
  }
}
