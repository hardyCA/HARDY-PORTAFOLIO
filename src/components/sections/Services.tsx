import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ParallaxSection } from '@/components/effects/ParallaxSection'
import { services } from '@/data/services'

const gradients = [
  'from-blue-600/20 to-cyan-600/10',
  'from-emerald-600/20 to-teal-600/10',
  'from-amber-600/20 to-orange-600/10',
  'from-sky-600/20 to-indigo-600/10',
  'from-violet-600/20 to-purple-600/10',
  'from-rose-600/20 to-pink-600/10',
]

const borders = [
  'hover:border-blue-500/30',
  'hover:border-emerald-500/30',
  'hover:border-amber-500/30',
  'hover:border-sky-500/30',
  'hover:border-violet-500/30',
  'hover:border-rose-500/30',
]

export function Services() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <Section id="servicios" className="overflow-hidden">
      <Container>
        <SectionTitle
          label="SISTEMAS"
          title="Soluciones que impulsan tu negocio"
          description=""
        />
      </Container>
      <ParallaxSection speed={0.08}>
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {services.map((service, index) => {
              const isExpanded = expanded === index
              return (
                <motion.button
                  key={service.title}
                  layout
                  onClick={() => setExpanded(isExpanded ? null : index)}
                  className={`group relative rounded-2xl border border-white/[0.06] bg-dark-900/40 p-4 sm:p-5 text-left transition-all duration-300 ${borders[index]} hover:bg-dark-800/40`}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10">
                    <div className={`rounded-xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300 ${isExpanded ? 'w-10 h-10' : 'w-9 h-9 sm:w-10 sm:h-10'}`}>
                      <svg
                        width={isExpanded ? 20 : 18}
                        height={isExpanded ? 20 : 18}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <path d={service.icon} />
                      </svg>
                    </div>

                    <h3 className="font-heading text-xs sm:text-sm font-bold text-dark-100 leading-tight">
                      {service.title}
                    </h3>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-[11px] sm:text-xs text-dark-400 mt-2 leading-relaxed">
                            {service.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2.5">
                            {service.systems.map((sys) => (
                              <span
                                key={sys}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-dark-400 border border-white/[0.04]"
                              >
                                {sys}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isExpanded && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {service.systems.slice(0, 2).map((sys) => (
                          <span
                            key={sys}
                            className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-md bg-white/[0.03] text-dark-500"
                          >
                            {sys}
                          </span>
                        ))}
                        {service.systems.length > 2 && (
                          <span className="text-[9px] sm:text-[10px] text-dark-600">
                            +{service.systems.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </Container>
      </ParallaxSection>
    </Section>
  )
}
