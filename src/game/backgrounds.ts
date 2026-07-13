import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants'

export const GROUND_Y = CANVAS_HEIGHT - 90

export const STAGE_NAMES = [
  'Mt. Fuji (Japan)',
  'Guilin (China)',
  'Emerald Temple (Thailand)',
  'Angkor Wat (Cambodia)',
  'Ayers Rock (Australia)',
]

function drawSky(ctx: CanvasRenderingContext2D, top: string, bottom: string) {
  const sky = ctx.createLinearGradient(0, 0, 0, GROUND_Y)
  sky.addColorStop(0, top)
  sky.addColorStop(1, bottom)
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, CANVAS_WIDTH, GROUND_Y)
}

function drawGround(
  ctx: CanvasRenderingContext2D,
  top: string,
  bottom: string,
) {
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

function drawKarstPeak(
  ctx: CanvasRenderingContext2D,
  cx: number,
  baseY: number,
  width: number,
  height: number,
  color: string,
) {
  const top = baseY - height
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(cx - width / 2, baseY)
  ctx.bezierCurveTo(
    cx - width / 2,
    top + height * 0.5,
    cx - width * 0.22,
    top + height * 0.1,
    cx,
    top,
  )
  ctx.bezierCurveTo(
    cx + width * 0.22,
    top + height * 0.1,
    cx + width / 2,
    top + height * 0.5,
    cx + width / 2,
    baseY,
  )
  ctx.closePath()
  ctx.fill()
}

function drawGuilinBackground(ctx: CanvasRenderingContext2D) {
  drawSky(ctx, '#bfe3e0', '#eaf6f2')

  ctx.fillStyle = '#ffffff88'
  ctx.beginPath()
  ctx.ellipse(700, 110, 60, 14, 0, 0, Math.PI * 2)
  ctx.ellipse(150, 160, 70, 16, 0, 0, Math.PI * 2)
  ctx.fill()

  const baseY = GROUND_Y
  const farPeaks = [
    { cx: 120, w: 160, h: 150 },
    { cx: 320, w: 200, h: 190 },
    { cx: 560, w: 170, h: 160 },
    { cx: 800, w: 210, h: 200 },
  ]
  for (const p of farPeaks) {
    drawKarstPeak(ctx, p.cx, baseY - 20, p.w, p.h, '#9db8ae')
  }

  const nearPeaks = [
    { cx: 220, w: 190, h: 230 },
    { cx: 480, w: 230, h: 260 },
    { cx: 720, w: 200, h: 240 },
  ]
  for (const p of nearPeaks) {
    drawKarstPeak(ctx, p.cx, baseY, p.w, p.h, '#5f8a76')
  }

  const river = ctx.createLinearGradient(0, baseY - 10, 0, baseY + 20)
  river.addColorStop(0, '#cdeee6')
  river.addColorStop(1, '#a9d8cd')
  ctx.fillStyle = river
  ctx.fillRect(0, baseY - 10, CANVAS_WIDTH, 30)

  drawGround(ctx, '#8fbf9a', '#5c9468')
}

function drawEmeraldTempleBackground(ctx: CanvasRenderingContext2D) {
  drawSky(ctx, '#ffd97a', '#ffe9c2')

  ctx.fillStyle = '#fff3d1'
  ctx.beginPath()
  ctx.arc(CANVAS_WIDTH - 130, 90, 44, 0, Math.PI * 2)
  ctx.fill()

  const baseY = GROUND_Y
  const cx = CANVAS_WIDTH / 2

  const tiers = [
    { w: 340, h: 26, y: 0 },
    { w: 280, h: 24, y: -60 },
    { w: 220, h: 22, y: -114 },
    { w: 150, h: 20, y: -160 },
  ]
  for (const t of tiers) {
    const y = baseY - 90 + t.y
    ctx.fillStyle = '#c23b3b'
    ctx.beginPath()
    ctx.moveTo(cx - t.w / 2, y + t.h)
    ctx.lineTo(cx, y - t.h * 1.4)
    ctx.lineTo(cx + t.w / 2, y + t.h)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = '#f2b73a'
    ctx.fillRect(cx - t.w / 2, y + t.h - 6, t.w, 6)
  }

  ctx.fillStyle = '#f2b73a'
  ctx.beginPath()
  ctx.moveTo(cx - 8, baseY - 250)
  ctx.lineTo(cx, baseY - 300)
  ctx.lineTo(cx + 8, baseY - 250)
  ctx.closePath()
  ctx.fill()

  drawGround(ctx, '#e8c98a', '#c9a35f')
}

function drawAngkorWatBackground(ctx: CanvasRenderingContext2D) {
  drawSky(ctx, '#f6b98a', '#ffe3c4')

  const baseY = GROUND_Y
  const cx = CANVAS_WIDTH / 2

  ctx.fillStyle = '#8a7156'
  ctx.fillRect(cx - 260, baseY - 70, 520, 70)

  function tower(x: number, height: number, width: number) {
    const y = baseY - 70 - height
    ctx.beginPath()
    ctx.moveTo(x - width / 2, baseY - 70)
    ctx.lineTo(x - width / 2, y + height * 0.35)
    ctx.lineTo(x, y)
    ctx.lineTo(x + width / 2, y + height * 0.35)
    ctx.lineTo(x + width / 2, baseY - 70)
    ctx.closePath()
    ctx.fill()
  }

  ctx.fillStyle = '#6b5842'
  tower(cx - 200, 90, 55)
  tower(cx + 200, 90, 55)
  ctx.fillStyle = '#7a6449'
  tower(cx - 100, 140, 65)
  tower(cx + 100, 140, 65)
  ctx.fillStyle = '#8a7150'
  tower(cx, 210, 80)

  drawGround(ctx, '#d9be93', '#b3946a')
}

function drawAyersRockBackground(ctx: CanvasRenderingContext2D) {
  drawSky(ctx, '#ff9d6c', '#ffd9a8')

  ctx.fillStyle = '#ffffffcc'
  ctx.beginPath()
  ctx.arc(CANVAS_WIDTH / 2, 100, 46, 0, Math.PI * 2)
  ctx.fill()

  const baseY = GROUND_Y
  const rockGradient = ctx.createLinearGradient(0, baseY - 160, 0, baseY)
  rockGradient.addColorStop(0, '#b5522f')
  rockGradient.addColorStop(1, '#7a3420')
  ctx.fillStyle = rockGradient
  ctx.beginPath()
  ctx.moveTo(CANVAS_WIDTH / 2 - 260, baseY)
  ctx.bezierCurveTo(
    CANVAS_WIDTH / 2 - 200,
    baseY - 150,
    CANVAS_WIDTH / 2 - 80,
    baseY - 170,
    CANVAS_WIDTH / 2,
    baseY - 160,
  )
  ctx.bezierCurveTo(
    CANVAS_WIDTH / 2 + 90,
    baseY - 150,
    CANVAS_WIDTH / 2 + 200,
    baseY - 110,
    CANVAS_WIDTH / 2 + 260,
    baseY,
  )
  ctx.closePath()
  ctx.fill()

  ctx.strokeStyle = '#5c2717aa'
  ctx.lineWidth = 3
  for (let i = 0; i < 4; i++) {
    ctx.beginPath()
    ctx.moveTo(CANVAS_WIDTH / 2 - 150 + i * 90, baseY - 20 - i * 4)
    ctx.lineTo(CANVAS_WIDTH / 2 - 90 + i * 90, baseY - 90 - i * 6)
    ctx.stroke()
  }

  drawGround(ctx, '#e0925c', '#b56a3c')
}

export const BACKGROUNDS = [
  drawJapanBackground,
  drawGuilinBackground,
  drawEmeraldTempleBackground,
  drawAngkorWatBackground,
  drawAyersRockBackground,
]

export function drawBackground(
  ctx: CanvasRenderingContext2D,
  stageIndex: number,
) {
  const draw = BACKGROUNDS[stageIndex % BACKGROUNDS.length]
  draw(ctx)

  ctx.strokeStyle = '#00000022'
  ctx.beginPath()
  ctx.moveTo(0, CANVAS_HEIGHT - 4)
  ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT - 4)
  ctx.stroke()
}
