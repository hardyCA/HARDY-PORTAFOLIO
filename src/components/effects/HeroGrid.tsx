import { useEffect, useRef } from 'react'
import { useMousePosition } from '@/hooks/useMousePosition'

interface Point {
  x: number
  y: number
  ox: number
  oy: number
  vx: number
  vy: number
}

export function HeroGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useMousePosition()
  const timeRef = useRef(0)
  const pointsRef = useRef<Point[]>([])
  const startTimeRef = useRef<number | null>(null)
  const isMobile = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    isMobile.current = window.innerWidth < 768
    let animId: number
    let rows = 0
    let cols = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.scale(dpr, dpr)

      cols = isMobile.current ? 12 : 20
      rows = Math.ceil((window.innerHeight / window.innerWidth) * cols)
    }

    const init = () => {
      resize()
      const spacingX = window.innerWidth / (cols - 1)
      const spacingY = window.innerHeight / (rows - 1)
      const pts: Point[] = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacingX
          const y = r * spacingY
          pts.push({
            x, y, ox: x, oy: y,
            vx: 0, vy: 0,
          })
        }
      }
      pointsRef.current = pts
    }

    const draw = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now
      const elapsed = (now - startTimeRef.current) / 1000
      timeRef.current = elapsed

      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      const revealProgress = Math.min(elapsed / 1.2, 1)
      const easeReveal = 1 - Math.pow(1 - revealProgress, 3)

      const pts = pointsRef.current
      const mx = mouse.x
      const my = mouse.y
      const maxDist = 180

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < maxDist && !isMobile.current) {
          const force = (1 - dist / maxDist) * 12
          p.vx += (p.ox - p.x) * 0.01 - dx / dist * force * 0.02
          p.vy += (p.oy - p.y) * 0.01 - dy / dist * force * 0.02
        } else {
          p.vx += (p.ox - p.x) * 0.02
          p.vy += (p.oy - p.y) * 0.02
        }

        p.vx *= 0.85
        p.vy *= 0.85
        p.x += p.vx
        p.y += p.vy

        const revealDelay = (i / pts.length) * 0.4
      const pointProgress = Math.max(0, Math.min(1, (elapsed - revealDelay) / 0.3))
        const scale = easeReveal * pointProgress

        if (scale > 0.01) {
          const alpha = 0.15 * scale * (dist < maxDist && !isMobile.current ? 1 + (1 - dist / maxDist) * 0.5 : 1)
          ctx.beginPath()
          ctx.arc(p.x, p.y, 1.2 * scale, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`
          ctx.fill()
        }
      }

      // Lines
      if (!isMobile.current) {
        const lineProgress = Math.max(0, Math.min(1, (elapsed - 0.3) / 0.8))
        const lineReveal = 1 - Math.pow(1 - lineProgress, 2)
        if (lineReveal > 0.01) {
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const idx = r * cols + c
              const p = pts[idx]
              if (c < cols - 1) {
                const right = pts[idx + 1]
                const dx = p.x - right.x
                const dy = p.y - right.y
                const d = Math.sqrt(dx * dx + dy * dy)
                const mouseDist = Math.sqrt((mx - (p.x + right.x) / 2) ** 2 + (my - (p.y + right.y) / 2) ** 2)
                const intensity = mouseDist < 200 ? 1 + (1 - mouseDist / 200) * 2 : 1
                ctx.beginPath()
                ctx.moveTo(p.x, p.y)
                ctx.lineTo(right.x, right.y)
                ctx.strokeStyle = `rgba(59, 130, 246, ${0.04 * lineReveal * intensity})`
                ctx.lineWidth = 0.5
                ctx.stroke()
              }
              if (r < rows - 1) {
                const bottom = pts[idx + cols]
                const dx = p.x - bottom.x
                const dy = p.y - bottom.y
                const d = Math.sqrt(dx * dx + dy * dy)
                ctx.beginPath()
                ctx.moveTo(p.x, p.y)
                ctx.lineTo(bottom.x, bottom.y)
                ctx.strokeStyle = `rgba(59, 130, 246, ${0.04 * lineReveal})`
                ctx.lineWidth = 0.5
                ctx.stroke()
              }
            }
          }
        }
      }

      // Light sweep effect in first 1.5s
      if (elapsed < 1.5) {
        const sweepX = (elapsed / 1.5) * w * 2 - w * 0.5
        const gradient = ctx.createRadialGradient(sweepX, h * 0.4, 0, sweepX, h * 0.4, 300)
        gradient.addColorStop(0, `rgba(59, 130, 246, ${0.04 * (1 - elapsed / 1.5)})`)
        gradient.addColorStop(0.5, `rgba(6, 182, 212, ${0.02 * (1 - elapsed / 1.5)})`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, w, h)
      }

      animId = requestAnimationFrame(draw)
    }

    init()
    animId = requestAnimationFrame(draw)
    window.addEventListener('resize', init)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', init)
    }
  }, [mouse])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
    />
  )
}
