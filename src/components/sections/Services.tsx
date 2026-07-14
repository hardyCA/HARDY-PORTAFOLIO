'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { services } from '@/data/services'

const iconMap: Record<string, string> = {
  'shopping-cart': 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z',
  'building-store': 'M21 21V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14m18 0H3m18 0a2 2 0 002-2v-2H3v2a2 2 0 002 2m16 0a2 2 0 01-2 2H5a2 2 0 01-2-2',
  'heartbeat': 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z',
  'book': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  'chart-bar': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  'code': 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
}

export function Services() {
  return (
    <Section id="servicios" className="overflow-hidden">
      <Container>
        <SectionTitle
          label="SISTEMAS"
          title="Soluciones empresariales que transforman tu negocio"
          description="Desarrollamos software completamente a medida para cada industria, optimizando procesos y maximizando resultados."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                className="group relative rounded-2xl border border-white/5 bg-dark-900/50 p-8 transition-colors hover:border-white/10 hover:bg-dark-800/50"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-accent/5 to-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary-light"
                    >
                      <path d={iconMap[service.icon]} />
                    </svg>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-dark-100 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-dark-400 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.systems.map((sys) => (
                      <span
                        key={sys}
                        className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-dark-300 border border-white/5"
                      >
                        {sys}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
