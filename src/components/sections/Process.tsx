import { useRef, useState, useEffect } from 'react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ParallaxSection } from '@/components/effects/ParallaxSection'

const steps = [
  {
    number: '01',
    title: 'Descubrimiento',
    description: 'Analizamos tu negocio y definimos objetivos claros para tu sistema.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    icon: 'M9 5l7 7-7 7',
  },
  {
    number: '02',
    title: 'Estrategia',
    description: 'Diseñamos la arquitectura y experiencia pensando en cada detalle.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
  },
  {
    number: '03',
    title: 'Desarrollo Ágil',
    description: 'Construimos en ciclos iterativos con entregas continuas.',
    gradient: 'from-amber-500/20 to-orange-500/20',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  },
  {
    number: '04',
    title: 'Calidad & Testing',
    description: 'Pruebas rigurosas para garantizar un producto impecable.',
    gradient: 'from-rose-500/20 to-pink-500/20',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  },
  {
    number: '05',
    title: 'Implementación',
    description: 'Desplegamos tu sistema y capacitamos a tu equipo.',
    gradient: 'from-violet-500/20 to-purple-500/20',
    icon: 'M5 13l4 4L19 7',
  },
  {
    number: '06',
    title: 'Soporte Continuo',
    description: 'Monitoreo constante y mejoras para mantener tu sistema al máximo.',
    gradient: 'from-sky-500/20 to-indigo-500/20',
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
  },
]

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const scroll = scrollRef.current
    if (!container || !scroll) return

    const handleScroll = () => {
      const maxScroll = scroll.scrollWidth - container.clientWidth
      const current = container.scrollLeft
      setProgress(maxScroll > 0 ? current / maxScroll : 0)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Section id="proceso" className="overflow-hidden">
      <Container>
        <SectionTitle
          label="PROCESO"
          title="De la idea al software funcionando"
          description=""
        />
      </Container>

      <ParallaxSection speed={0.06} as="div">
        <div
          ref={containerRef}
          className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 px-6 sm:px-10 lg:px-12"
          style={{ width: `${steps.length * 320 + (steps.length - 1) * 24 + 48}px` }}
        >
          {steps.map((step) => (
            <div
              key={step.number}
              className="snap-start shrink-0 w-[300px] sm:w-[320px]"
            >
              <div className="relative rounded-2xl border border-white/5 bg-dark-900/40 p-6 h-full transition-colors hover:border-white/10 hover:bg-dark-800/40">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} opacity-30`} />
                <div className="relative z-10">
                  <span
                    className="font-heading text-5xl font-bold"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(6,182,212,0.08))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {step.number}
                  </span>

                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mt-4 mb-3">
                    <svg
                      width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="1.5" strokeLinecap="round" className="text-primary-light"
                    >
                      <path d={step.icon} />
                    </svg>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-dark-100 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-dark-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </ParallaxSection>

      <Container className="mt-6">
        <div className="h-1 rounded-full bg-dark-800 max-w-md mx-auto overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <p className="text-center text-[11px] text-dark-500 mt-2">
          Desliza para ver el proceso completo
        </p>
      </Container>
    </Section>
  )
}
