'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'

const testimonials = [
  {
    quote: 'Transformaron completamente nuestra operación. El sistema POS que desarrollaron nos ayudó a reducir tiempos de atención en un 60% y aumentar nuestras ventas en un 35%.',
    author: 'Carlos Mendoza',
    role: 'CEO, Grupo Restaurantero El Faro',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    quote: 'Necesitábamos un sistema de inventario para nuestras 15 sucursales farmacéuticas. Nos entregaron una solución robusta que redujo nuestras pérdidas por vencimiento en un 85%.',
    author: 'María Fernanda López',
    role: 'Directora de Operaciones, FarmaRed',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    quote: 'El ERP hotelero que desarrollaron nos dio control total sobre reservas, housekeeping y canales OTA. La ocupación aumentó 20% en los primeros 3 meses.',
    author: 'Andrés Castillo',
    role: 'Gerente General, Hoteles del Pacífico',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    quote: 'Nuestra plataforma educativa ahora conecta a más de 8,500 estudiantes, padres y docentes. El aula virtual y los reportes de rendimiento son increíbles.',
    author: 'Patricia Vega',
    role: 'Directora Académica, Colegio San Gabriel',
    gradient: 'from-sky-500/20 to-indigo-500/20',
  },
]

export function Testimonials() {
  const [active, setActive] = useState(0)

  const testimonial = testimonials[active]

  return (
    <Section id="testimonios" className="overflow-hidden">
      <Container>
        <SectionTitle
          label="TESTIMONIOS"
          title="Lo que dicen nuestros clientes"
          description="La satisfacción de nuestros clientes es el reflejo de nuestro compromiso con la excelencia."
        />

        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl border border-white/5 bg-dark-900/40 p-8 md:p-12 lg:p-16 overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{ background: `radial-gradient(ellipse at center, ${testimonial.gradient})` }}
            />

            <div className="relative z-10">
              <svg
                className="w-10 h-10 md:w-12 md:h-12 text-primary/30 mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
              </svg>

              <AnimatePresence mode="wait">
                <motion.p
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-lg md:text-xl lg:text-2xl text-dark-200 leading-relaxed font-medium"
                >
                  "{testimonial.quote}"
                </motion.p>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="mt-8 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-dark-100">{testimonial.author}</div>
                    <div className="text-sm text-dark-400">{testimonial.role}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative z-10 flex items-center justify-center gap-2 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === active
                      ? 'w-8 bg-gradient-to-r from-primary to-accent'
                      : 'w-1.5 bg-dark-600 hover:bg-dark-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
