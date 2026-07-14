'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { scrollToSection } from '@/hooks/useSmoothScroll'

export function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: 'radial-gradient(ellipse at center, #3b82f6 0%, transparent 70%)',
        }}
      />
      <Container className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-dark-100 leading-tight mb-6">
            ¿Listo para transformar tu negocio con{' '}
            <span className="text-gradient">tecnología a medida</span>?
          </h2>
          <p className="text-lg text-dark-400 max-w-xl mx-auto mb-10">
            Agenda una llamada sin compromiso y descubre cómo podemos ayudarte a crear el sistema que tu empresa necesita.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={() => scrollToSection('contacto')}>
              Solicitar Cotización
            </Button>
            <Button variant="secondary" size="lg" onClick={() => scrollToSection('proyectos')}>
              Ver Proyectos
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
