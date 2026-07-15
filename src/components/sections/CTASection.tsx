import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { ParallaxSection } from '@/components/effects/ParallaxSection'
import { scrollToSection } from '@/hooks/useSmoothScroll'

const ctaWords = '¿Listo para transformar tu negocio?'.split(' ')

export function CTASection() {
  return (
    <ParallaxSection speed={0.12}>
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
              {ctaWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block mr-[0.3em]"
                >
                  {word === 'transformar' ? (
                    <span className="text-gradient">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-gradient"
              >
                tecnología a medida
              </motion.span>
              <span>?</span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg text-dark-400 max-w-xl mx-auto mb-10"
            >
              Agenda una llamada sin compromiso y descubre cómo podemos ayudarte a crear el sistema que tu empresa necesita.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" onClick={() => scrollToSection('contacto')}>
                Solicitar Cotización
              </Button>
              <Button variant="secondary" size="lg" onClick={() => scrollToSection('proyectos')}>
                Ver Proyectos
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </ParallaxSection>
  )
}
