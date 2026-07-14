'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ScrollReveal } from '@/components/effects/ScrollReveal'

const steps = [
  {
    number: '01',
    title: 'Descubrimiento',
    description: 'Analizamos tu negocio, identificamos puntos de dolor y definimos objetivos claros para tu sistema.',
    icon: 'M9 5l7 7-7 7',
  },
  {
    number: '02',
    title: 'Estrategia',
    description: 'Diseñamos la arquitectura, el flujo de trabajo y la experiencia de usuario pensando en cada detalle.',
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
  },
  {
    number: '03',
    title: 'Desarrollo Ágil',
    description: 'Construimos tu software en ciclos iterativos con entregas continuas y feedback constante.',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  },
  {
    number: '04',
    title: 'Calidad & Testing',
    description: 'Pruebas rigurosas de funcionalidad, rendimiento y seguridad para garantizar un producto impecable.',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  },
  {
    number: '05',
    title: 'Implementación',
    description: 'Desplegamos tu sistema, capacitamos a tu equipo y te acompañamos en cada paso de la transición.',
    icon: 'M5 13l4 4L19 7',
  },
  {
    number: '06',
    title: 'Soporte Continuo',
    description: 'Monitoreo constante, mejoras continuas y soporte técnico para mantener tu sistema siempre al máximo.',
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
  },
]

export function Process() {
  return (
    <Section id="proceso" className="overflow-hidden">
      <Container>
        <SectionTitle
          label="PROCESO"
          title="Cómo convertimos tu visión en realidad"
          description="Una metodología probada que garantiza resultados predecibles y de alta calidad."
        />

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent/20 to-transparent hidden md:block" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => (
              <ScrollReveal key={step.number} delay={index * 0.1} direction={index % 2 === 0 ? 'left' : 'right'}>
                <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
                  <div className="hidden md:flex md:col-span-1 justify-center">
                    <div className="w-16 h-16 rounded-full bg-dark-900 border border-white/10 flex items-center justify-center shadow-xl shadow-black/20 z-10">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          className="text-primary-light"
                        >
                          <path d={step.icon} />
                        </svg>
                      </motion.div>
                    </div>
                  </div>

                  <div className="md:col-span-5 md:text-right">
                    <span
                      className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold"
                      style={{
                        background: `linear-gradient(135deg, rgba(59,130,246,0.15), rgba(6,182,212,0.08))`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <div className="md:col-span-6">
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="rounded-2xl border border-white/5 bg-dark-900/40 p-6 md:p-8 transition-colors hover:border-white/10 hover:bg-dark-800/40"
                    >
                      <h3 className="font-heading text-xl md:text-2xl font-bold text-dark-100 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-dark-400 leading-relaxed text-sm md:text-base">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
