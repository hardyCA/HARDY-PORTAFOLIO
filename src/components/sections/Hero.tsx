'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { scrollToSection } from '@/hooks/useSmoothScroll'
import { Button } from '@/components/ui/Button'

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const draw = () => {
      time += 0.002
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5 + Math.sin(time * 0.3) * 200,
        canvas.height * 0.4 + Math.cos(time * 0.2) * 150,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.7,
      )
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.06)')
      gradient.addColorStop(0.3, 'rgba(6, 182, 212, 0.03)')
      gradient.addColorStop(0.6, 'rgba(139, 92, 246, 0.02)')
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const count = 8
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + time * 0.1
        const radius = canvas.width * 0.25 + Math.sin(time * 0.15 + i) * 50
        const x = canvas.width * 0.5 + Math.cos(angle) * radius
        const y = canvas.height * 0.45 + Math.sin(angle) * radius * 0.5

        const g = ctx.createRadialGradient(x, y, 0, x, y, 200)
        g.addColorStop(0, `rgba(59, 130, 246, ${0.02 + Math.sin(time + i) * 0.01})`)
        g.addColorStop(0.5, `rgba(6, 182, 212, ${0.01 + Math.cos(time * 0.5 + i) * 0.005})`)
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.fillRect(x - 200, y - 200, 400, 400)
      }

      const gridSize = 40
      ctx.strokeStyle = 'rgba(255,255,255,0.015)'
      ctx.lineWidth = 0.5
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const dx = canvas.width * 0.5 - x
          const dy = canvas.height * 0.45 - y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const warp = Math.sin(dist * 0.003 - time) * 3
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x + gridSize, y)
          ctx.lineTo(x + gridSize, y + gridSize)
          ctx.lineTo(x, y + gridSize)
          ctx.closePath()
          ctx.stroke()
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-transparent to-dark-900 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-dark-300 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Desarrollo de Software a Medida
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight"
        >
          <span className="text-dark-100">Transformamos tu idea en</span>
          <br />
          <span className="text-gradient">software de clase mundial</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-lg sm:text-xl text-dark-400 max-w-2xl mx-auto leading-relaxed"
        >
          Creamos sistemas empresariales personalizados — POS, inventario, CRM, ERP y más — 
          que impulsan el crecimiento de tu negocio con tecnología de vanguardia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" onClick={() => scrollToSection('proyectos')}>
            Ver Proyectos
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="ml-1">
              <path d="M4 12L12 4M12 4H6M12 4V10" />
            </svg>
          </Button>
          <Button variant="secondary" size="lg" onClick={() => scrollToSection('contacto')}>
            Solicitar Cotización
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 flex items-center justify-center gap-10 md:gap-16 flex-wrap"
        >
          {[
            { label: 'Proyectos Entregados', value: '120+' },
            { label: 'Clientes Activos', value: '85+' },
            { label: 'Años de Experiencia', value: '8+' },
            { label: 'Equipo', value: '40+' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-2xl md:text-3xl font-bold text-dark-100">
                {stat.value}
              </div>
              <div className="text-xs text-dark-500 mt-1 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => scrollToSection('servicios')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-dark-500 hover:text-dark-300 transition-colors"
      >
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
        >
          <path d="M6 9L12 15L18 9" />
        </motion.svg>
      </motion.button>
    </section>
  )
}
