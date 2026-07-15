import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { scrollToSection } from '@/hooks/useSmoothScroll'
import { Button } from '@/components/ui/Button'
import { useCountUp } from '@/hooks/useCountUp'
import { HeroGrid } from '@/components/effects/HeroGrid'

const stats = [
  { label: 'Proyectos', end: 120, suffix: '+' },
  { label: 'Clientes', end: 85, suffix: '+' },
  { label: 'Años', end: 8, suffix: '+' },
]

const titleWords = 'Software que transforma tu negocio'.split(' ')

export function Hero() {
  const [countersReady, setCountersReady] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setCountersReady(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-900" />

      <HeroGrid />

      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-transparent to-dark-900 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              animate={mounted ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{
                duration: 0.5,
                delay: 0.15 + i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block mr-[0.3em]"
            >
              {word === 'transforma' ? (
                <span className="text-gradient">{word}</span>
              ) : (
                <span className="text-dark-100">{word}</span>
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={mounted ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 sm:mt-6 text-base sm:text-lg text-dark-400 max-w-xl mx-auto leading-relaxed"
        >
          Sistemas POS, inventario, CRM y ERP a medida para empresas bolivianas.
          Tecnología de clase mundial, hecha en Bolivia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Button size="lg" onClick={() => scrollToSection('demo')}>
            Solicitar Demo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Button>
          <Button variant="secondary" size="lg" onClick={() => scrollToSection('proyectos')}>
            Ver Proyectos
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16 sm:mt-20 flex items-center justify-center gap-8 sm:gap-14 md:gap-20"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-dark-100 tabular-nums">
                <CountUp end={stat.end} suffix={stat.suffix} enabled={countersReady} />
              </div>
              <div className="text-[11px] text-dark-500 mt-1 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
        onClick={() => scrollToSection('servicios')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-dark-500 hover:text-dark-300 transition-colors"
        aria-label="Scroll down"
      >
        <motion.svg
          width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          animate={mounted ? { y: [0, 6, 0] } : { y: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
        >
          <path d="M6 9L12 15L18 9" />
        </motion.svg>
      </motion.button>
    </section>
  )
}

function CountUp({ end, suffix, enabled }: { end: number; suffix: string; enabled: boolean }) {
  const value = useCountUp({ end, duration: 2.5, suffix, enabled })
  return <>{value}</>
}
