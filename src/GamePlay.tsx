import { useEffect, useRef, useState } from 'react'
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_Y,
  PLAYER_SPEED,
  HARPOON_SPEED,
  MAX_HP,
  INVULN_MS,
  LEVEL_RADIUS,
  SCORE_BY_LEVEL,
  COMBO_WINDOW_MS,
  STAGE_COUNT,
  OBSTACLE_X,
  OBSTACLE_Y,
  OBSTACLE_WIDTH,
  OBSTACLE_HEIGHT,
} from './game/constants'
import {
  createStage,
  stepBall,
  splitBall,
  harpoonHitsBall,
  harpoonHitsObstacle,
  ballHitsPlayer,
} from './game/engine'
import type { Ball, Harpoon } from './game/types'
import {
  playHitSound,
  playPlayerHitSound,
  playClearSound,
  playGameOverSound,
  startBgm,
  stopBgm,
} from './game/audio'

const BALL_COLORS = ['#fb7185', '#facc15', '#38bdf8']
const GROUND_Y = CANVAS_HEIGHT - 90
const STAGE_NAMES = ['일본', '이집트', '바르셀로나', '그리스', '로마']

const HINTS = [
  '← → 또는 A / D : 이동',
  'Space : 발사 (발사체는 하나만 유지)',
  '공을 맞히면 작아지며 둘로 분열, 가장 작을 때 맞히면 제거',
  '줄무늬 발판은 발사체를 막고 공을 튕겨냅니다',
  '짧은 시간 안에 연속으로 맞히면 콤보 점수 배율 증가',
  '공에 닿으면 HP 1 감소, 이후 잠깐 무적 시간이 주어집니다',
]

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
}

type Popup = {
  x: number
  y: number
  text: string
  life: number
  maxLife: number
}

function drawSky(ctx: CanvasRenderingContext2D, top: string, bottom: string) {
  const sky = ctx.createLinearGradient(0, 0, 0, GROUND_Y)
  sky.addColorStop(0, top)
  sky.addColorStop(1, bottom)
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, CANVAS_WIDTH, GROUND_Y)
}

function drawGround(ctx: CanvasRenderingContext2D, top: string, bottom: string) {
  const ground = ctx.createLinearGradient(0, GROUND_Y, 0, CANVAS_HEIGHT)
  ground.addColorStop(0, top)
  ground.addColorStop(1, bottom)
  ctx.fillStyle = ground
  ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y)
}

function drawJapanBackground(ctx: CanvasRenderingContext2D) {
  drawSky(ctx, '#7dc8f0', '#cdeafd')

  ctx.fillStyle = '#ffffffaa'
  ctx.beginPath()
  ctx.ellipse(120, 90, 34, 16, 0, 0, Math.PI * 2)
  ctx.ellipse(160, 80, 26, 14, 0, 0, Math.PI * 2)
  ctx.ellipse(740, 130, 30, 15, 0, 0, Math.PI * 2)
  ctx.fill()

  const baseY = GROUND_Y
  const topY = baseY - 220
  const cx = CANVAS_WIDTH / 2

  ctx.fillStyle = '#7a86a8'
  ctx.beginPath()
  ctx.moveTo(cx - 220, baseY)
  ctx.lineTo(cx, topY)
  ctx.lineTo(cx + 220, baseY)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.moveTo(cx, topY)
  ctx.lineTo(cx + 38, topY + 60)
  ctx.lineTo(cx + 14, topY + 50)
  ctx.lineTo(cx - 2, topY + 70)
  ctx.lineTo(cx - 22, topY + 46)
  ctx.lineTo(cx - 40, topY + 58)
  ctx.closePath()
  ctx.fill()

  drawGround(ctx, '#7cc86e', '#4f9b45')
}

function drawEgyptBackground(ctx: CanvasRenderingContext2D) {
  drawSky(ctx, '#ffd394', '#ffe9c7')

  ctx.fillStyle = '#fff4d6'
  ctx.beginPath()
  ctx.arc(CANVAS_WIDTH - 120, 90, 40, 0, Math.PI * 2)
  ctx.fill()

  const baseY = GROUND_Y
  const pyramids = [
    { cx: CANVAS_WIDTH / 2 - 160, height: 170, width: 200, color: '#d9a86a' },
    { cx: CANVAS_WIDTH / 2 + 120, height: 130, width: 160, color: '#c9925a' },
    { cx: CANVAS_WIDTH / 2 - 20, height: 210, width: 240, color: '#e0b57a' },
  ]
  for (const p of pyramids) {
    ctx.fillStyle = p.color
    ctx.beginPath()
    ctx.moveTo(p.cx - p.width / 2, baseY)
    ctx.lineTo(p.cx, baseY - p.height)
    ctx.lineTo(p.cx + p.width / 2, baseY)
    ctx.closePath()
    ctx.fill()
  }

  drawGround(ctx, '#e6c58a', '#c9a35f')
}

function drawBarcelonaBackground(ctx: CanvasRenderingContext2D) {
  drawSky(ctx, '#8fd3f4', '#e0f7fa')

  const baseY = GROUND_Y
  ctx.fillStyle = '#e0a58c'
  const buildingWidths = [70, 90, 60, 80, 70]
  let x = 40
  buildingWidths.forEach((w, i) => {
    const h = 80 + (i % 3) * 30
    ctx.fillRect(x, baseY - h, w, h)
    x += w + 16
  })

  const spireX = CANVAS_WIDTH / 2 + 40
  const spireBase = baseY - 60
  const spireTop = baseY - 240
  ctx.fillStyle = '#caa06b'
  ctx.beginPath()
  ctx.moveTo(spireX - 22, spireBase)
  ctx.lineTo(spireX, spireTop)
  ctx.lineTo(spireX + 22, spireBase)
  ctx.closePath()
  ctx.fill()
  ctx.beginPath()
  ctx.arc(spireX, spireTop - 8, 6, 0, Math.PI * 2)
  ctx.fill()

  drawGround(ctx, '#c9c9d1', '#9a9aa5')
}

function drawGreeceBackground(ctx: CanvasRenderingContext2D) {
  drawSky(ctx, '#8fd3f4', '#eaf6ff')

  const baseY = GROUND_Y
  const templeWidth = 320
  const templeX = CANVAS_WIDTH / 2 - templeWidth / 2
  const columnTop = baseY - 130

  ctx.fillStyle = '#f5f0e6'
  ctx.beginPath()
  ctx.moveTo(templeX - 20, columnTop)
  ctx.lineTo(CANVAS_WIDTH / 2, columnTop - 60)
  ctx.lineTo(templeX + templeWidth + 20, columnTop)
  ctx.closePath()
  ctx.fill()

  ctx.fillRect(templeX - 20, columnTop, templeWidth + 40, 12)

  const columnCount = 7
  const columnWidth = 18
  const gap = (templeWidth - columnCount * columnWidth) / (columnCount - 1)
  for (let i = 0; i < columnCount; i++) {
    const cx = templeX + i * (columnWidth + gap)
    ctx.fillRect(cx, columnTop + 12, columnWidth, baseY - columnTop - 12)
  }

  drawGround(ctx, '#e6ddc8', '#c9bd9f')
}

function drawRomeBackground(ctx: CanvasRenderingContext2D) {
  drawSky(ctx, '#f6b394', '#ffe0c2')

  const baseY = GROUND_Y
  const width = 380
  const height = 140
  const x = CANVAS_WIDTH / 2 - width / 2
  const y = baseY - height

  ctx.fillStyle = '#e3c9a8'
  ctx.beginPath()
  ctx.moveTo(x, baseY)
  ctx.lineTo(x, y + 20)
  ctx.quadraticCurveTo(x, y, x + 20, y)
  ctx.lineTo(x + width - 20, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + 20)
  ctx.lineTo(x + width, baseY)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = '#c9a97f'
  const archCount = 8
  const archWidth = width / archCount
  for (let i = 0; i < archCount; i++) {
    const ax = x + i * archWidth + archWidth * 0.25
    ctx.beginPath()
    ctx.arc(ax + archWidth * 0.1, y + 40, archWidth * 0.28, Math.PI, 0)
    ctx.fill()
  }

  drawGround(ctx, '#d8b98f', '#b3946a')
}

const BACKGROUNDS = [
  drawJapanBackground,
  drawEgyptBackground,
  drawBarcelonaBackground,
  drawGreeceBackground,
  drawRomeBackground,
]

function drawBackground(ctx: CanvasRenderingContext2D, stageIndex: number) {
  const draw = BACKGROUNDS[stageIndex % BACKGROUNDS.length]
  draw(ctx)

  ctx.strokeStyle = '#00000022'
  ctx.beginPath()
  ctx.moveTo(0, CANVAS_HEIGHT - 4)
  ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT - 4)
  ctx.stroke()
}

function drawObstacle(ctx: CanvasRenderingContext2D) {
  ctx.save()
  ctx.shadowColor = '#00000066'
  ctx.shadowBlur = 6
  ctx.shadowOffsetY = 3

  const bodyGradient = ctx.createLinearGradient(
    0,
    OBSTACLE_Y,
    0,
    OBSTACLE_Y + OBSTACLE_HEIGHT,
  )
  bodyGradient.addColorStop(0, '#d4d4d8')
  bodyGradient.addColorStop(1, '#71717a')
  ctx.fillStyle = bodyGradient
  ctx.fillRect(OBSTACLE_X, OBSTACLE_Y, OBSTACLE_WIDTH, OBSTACLE_HEIGHT)
  ctx.restore()

  ctx.save()
  ctx.beginPath()
  ctx.rect(OBSTACLE_X, OBSTACLE_Y, OBSTACLE_WIDTH, OBSTACLE_HEIGHT)
  ctx.clip()
  ctx.fillStyle = '#facc15'
  const stripeWidth = 14
  for (
    let sx = OBSTACLE_X - OBSTACLE_HEIGHT;
    sx < OBSTACLE_X + OBSTACLE_WIDTH;
    sx += stripeWidth * 2
  ) {
    ctx.beginPath()
    ctx.moveTo(sx, OBSTACLE_Y + OBSTACLE_HEIGHT)
    ctx.lineTo(sx + OBSTACLE_HEIGHT, OBSTACLE_Y)
    ctx.lineTo(sx + OBSTACLE_HEIGHT + stripeWidth, OBSTACLE_Y)
    ctx.lineTo(sx + stripeWidth, OBSTACLE_Y + OBSTACLE_HEIGHT)
    ctx.closePath()
    ctx.fill()
  }
  ctx.restore()

  ctx.strokeStyle = '#27272a'
  ctx.lineWidth = 2
  ctx.strokeRect(OBSTACLE_X, OBSTACLE_Y, OBSTACLE_WIDTH, OBSTACLE_HEIGHT)
}

function drawBall(ctx: CanvasRenderingContext2D, ball: Ball) {
  const r = LEVEL_RADIUS[ball.level]
  const color = BALL_COLORS[ball.level]

  const gradient = ctx.createRadialGradient(
    ball.x - r * 0.35,
    ball.y - r * 0.35,
    r * 0.1,
    ball.x,
    ball.y,
    r,
  )
  gradient.addColorStop(0, '#ffffff')
  gradient.addColorStop(0.25, color)
  gradient.addColorStop(1, '#00000055')

  ctx.beginPath()
  ctx.arc(ball.x, ball.y, r, 0, Math.PI * 2)
  ctx.fillStyle = gradient
  ctx.fill()
  ctx.lineWidth = 1
  ctx.strokeStyle = '#00000033'
  ctx.stroke()
}

function spawnBurst(particles: Particle[], x: number, y: number, color: string) {
  const count = 10
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count
    const speed = 90 + (i % 3) * 40
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 400,
      maxLife: 400,
      color,
    })
  }
}

type Props = {
  stageIndex: number
  onClear: (score: number) => void
  onGameOver: (score: number) => void
}

function GamePlay({ stageIndex, onClear, onGameOver }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const playerXRef = useRef(CANVAS_WIDTH / 2)
  const ballsRef = useRef<Ball[]>(createStage(stageIndex))
  const harpoonRef = useRef<Harpoon>(null)
  const hpRef = useRef(MAX_HP)
  const invulnUntilRef = useRef(0)
  const comboRef = useRef(0)
  const lastHitAtRef = useRef(0)
  const scoreRef = useRef(0)
  const nextIdRef = useRef(1000 * (stageIndex + 1))
  const keysRef = useRef<Record<string, boolean>>({})
  const endedRef = useRef(false)
  const particlesRef = useRef<Particle[]>([])
  const popupsRef = useRef<Popup[]>([])

  const [hp, setHp] = useState(MAX_HP)
  const [score, setScore] = useState(0)

  useEffect(() => {
    ballsRef.current = createStage(stageIndex)
    harpoonRef.current = null
    hpRef.current = MAX_HP
    invulnUntilRef.current = 0
    comboRef.current = 0
    lastHitAtRef.current = 0
    endedRef.current = false
    particlesRef.current = []
    popupsRef.current = []
    setHp(MAX_HP)
  }, [stageIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true
      if (e.key === ' ') e.preventDefault()
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useEffect(() => {
    startBgm()
    return () => stopBgm()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number
    let lastTime: number | null = null

    const nextId = () => {
      nextIdRef.current += 1
      return nextIdRef.current
    }

    const loop = (time: number) => {
      if (lastTime === null) lastTime = time
      const dtSec = Math.min((time - lastTime) / 1000, 0.05)
      const dtMs = dtSec * 1000
      lastTime = time

      if (!endedRef.current) {
        const keys = keysRef.current
        let vx = 0
        if (keys.ArrowLeft || keys.a || keys.A) vx -= PLAYER_SPEED
        if (keys.ArrowRight || keys.d || keys.D) vx += PLAYER_SPEED
        playerXRef.current = Math.min(
          Math.max(playerXRef.current + vx * dtSec, PLAYER_WIDTH / 2),
          CANVAS_WIDTH - PLAYER_WIDTH / 2,
        )

        if (keys[' '] && !harpoonRef.current) {
          harpoonRef.current = { x: playerXRef.current, y: PLAYER_Y }
        }

        if (harpoonRef.current) {
          harpoonRef.current.y -= HARPOON_SPEED * dtSec
          if (
            harpoonRef.current.y <= 0 ||
            harpoonHitsObstacle(harpoonRef.current.x, harpoonRef.current.y)
          ) {
            harpoonRef.current = null
          }
        }

        ballsRef.current = ballsRef.current.map((b) => stepBall(b, dtSec))

        if (harpoonRef.current) {
          const h = harpoonRef.current
          const hitIndex = ballsRef.current.findIndex((b) =>
            harpoonHitsBall(h.x, h.y, b),
          )
          if (hitIndex !== -1) {
            const hitBall = ballsRef.current[hitIndex]
            const children = splitBall(hitBall, nextId)

            if (time - lastHitAtRef.current <= COMBO_WINDOW_MS) {
              comboRef.current += 1
            } else {
              comboRef.current = 0
            }
            lastHitAtRef.current = time

            const gained = Math.round(
              SCORE_BY_LEVEL[hitBall.level] * (1 + comboRef.current * 0.1),
            )
            scoreRef.current += gained
            setScore(scoreRef.current)

            spawnBurst(
              particlesRef.current,
              hitBall.x,
              hitBall.y,
              BALL_COLORS[hitBall.level],
            )
            playHitSound(hitBall.level)
            popupsRef.current.push({
              x: hitBall.x,
              y: hitBall.y,
              text: `+${gained}`,
              life: 700,
              maxLife: 700,
            })

            ballsRef.current = [
              ...ballsRef.current.slice(0, hitIndex),
              ...ballsRef.current.slice(hitIndex + 1),
              ...children,
            ]
            harpoonRef.current = null
          }
        }

        if (time >= invulnUntilRef.current) {
          const hit = ballsRef.current.some((b) =>
            ballHitsPlayer(b, playerXRef.current),
          )
          if (hit) {
            hpRef.current -= 1
            setHp(hpRef.current)
            invulnUntilRef.current = time + INVULN_MS
            playPlayerHitSound()
            if (hpRef.current <= 0) {
              endedRef.current = true
              playGameOverSound()
              stopBgm()
              onGameOver(scoreRef.current)
            }
          }
        }

        if (!endedRef.current && ballsRef.current.length === 0) {
          endedRef.current = true
          playClearSound()
          onClear(scoreRef.current)
        }
      }

      particlesRef.current = particlesRef.current
        .map((p) => ({
          ...p,
          x: p.x + p.vx * dtSec,
          y: p.y + p.vy * dtSec,
          life: p.life - dtMs,
        }))
        .filter((p) => p.life > 0)

      popupsRef.current = popupsRef.current
        .map((p) => ({ ...p, y: p.y - 30 * dtSec, life: p.life - dtMs }))
        .filter((p) => p.life > 0)

      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      drawBackground(ctx, stageIndex)
      drawObstacle(ctx)

      if (harpoonRef.current) {
        ctx.save()
        ctx.shadowColor = '#ffffff'
        ctx.shadowBlur = 8
        ctx.strokeStyle = '#374151'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(harpoonRef.current.x, PLAYER_Y)
        ctx.lineTo(harpoonRef.current.x, harpoonRef.current.y)
        ctx.stroke()
        ctx.restore()
      }

      for (const b of ballsRef.current) {
        drawBall(ctx, b)
      }

      for (const p of particlesRef.current) {
        const alpha = p.life / p.maxLife
        ctx.globalAlpha = alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }

      const isInvuln = time < invulnUntilRef.current
      const playerGradient = ctx.createLinearGradient(
        0,
        PLAYER_Y - PLAYER_HEIGHT / 2,
        0,
        PLAYER_Y + PLAYER_HEIGHT / 2,
      )
      playerGradient.addColorStop(0, isInvuln ? '#fef08a' : '#f87171')
      playerGradient.addColorStop(1, isInvuln ? '#fbbf24' : '#b91c1c')

      ctx.save()
      if (isInvuln) {
        ctx.shadowColor = '#fbbf24'
        ctx.shadowBlur = 12
      }

      const px = playerXRef.current - PLAYER_WIDTH / 2
      const py = PLAYER_Y - PLAYER_HEIGHT / 2

      ctx.fillStyle = '#374151'
      ctx.fillRect(playerXRef.current - 4, py - 16, 8, 16)

      ctx.fillStyle = playerGradient
      const radius = 4
      ctx.beginPath()
      ctx.moveTo(px + radius, py)
      ctx.arcTo(px + PLAYER_WIDTH, py, px + PLAYER_WIDTH, py + PLAYER_HEIGHT, radius)
      ctx.arcTo(px + PLAYER_WIDTH, py + PLAYER_HEIGHT, px, py + PLAYER_HEIGHT, radius)
      ctx.arcTo(px, py + PLAYER_HEIGHT, px, py, radius)
      ctx.arcTo(px, py, px + PLAYER_WIDTH, py, radius)
      ctx.closePath()
      ctx.fill()
      ctx.restore()

      ctx.font = "12px 'Galmuri11', monospace"
      ctx.textAlign = 'center'
      for (const p of popupsRef.current) {
        ctx.globalAlpha = p.life / p.maxLife
        ctx.fillStyle = '#b45309'
        ctx.fillText(p.text, p.x, p.y)
        ctx.globalAlpha = 1
      }

      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [stageIndex, onClear, onGameOver])

  return (
    <div className="gameplay">
      <div className="gameplay-hud">
        <span className="hud-stage">스테이지 {stageIndex + 1}</span>
        <div className="hp-bar">
          {Array.from({ length: MAX_HP }, (_, i) => (
            <span
              key={i}
              className={`hp-segment ${i < hp ? 'hp-filled' : ''}`}
            />
          ))}
        </div>
        <span className="hud-score">점수 {score}</span>
      </div>
      <div className="gameplay-body">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          style={{ border: '1px solid #2e303a' }}
        />
        <aside className="hint-panel">
          <div>
            <h3>진행 상황</h3>
            <ol className="stage-roster">
              {STAGE_NAMES.slice(0, STAGE_COUNT).map((name, i) => (
                <li
                  key={name}
                  className={
                    i === stageIndex
                      ? 'stage-current'
                      : i < stageIndex
                        ? 'stage-cleared'
                        : ''
                  }
                >
                  {i + 1}. {name}
                  {i < stageIndex ? ' ✓' : ''}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3>도움말</h3>
            <ul className="hint-list">
              {HINTS.map((hint) => (
                <li key={hint}>{hint}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default GamePlay
