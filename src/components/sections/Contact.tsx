'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <Section id="contacto">
      <Container>
        <SectionTitle
          label="CONTACTO"
          title="Hablemos de tu proyecto"
          description="Cuéntanos sobre tu negocio y te mostraremos cómo podemos transformarlo con tecnología a medida."
        />

        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-dark-100 mb-2">
                ¡Mensaje enviado!
              </h3>
              <p className="text-dark-400">
                Gracias por contactarnos. Te responderemos en las próximas 24 horas.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre"
                    className="w-full rounded-xl border border-white/10 bg-dark-900/50 px-4 py-3 text-dark-100 placeholder-dark-500 outline-none transition-all duration-300 focus:border-primary/50 focus:bg-dark-800/50 focus:ring-1 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tu@email.com"
                    className="w-full rounded-xl border border-white/10 bg-dark-900/50 px-4 py-3 text-dark-100 placeholder-dark-500 outline-none transition-all duration-300 focus:border-primary/50 focus:bg-dark-800/50 focus:ring-1 focus:ring-primary/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  placeholder="Nombre de tu empresa"
                  className="w-full rounded-xl border border-white/10 bg-dark-900/50 px-4 py-3 text-dark-100 placeholder-dark-500 outline-none transition-all duration-300 focus:border-primary/50 focus:bg-dark-800/50 focus:ring-1 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  ¿Qué sistema necesitas?
                </label>
                <select
                  className="w-full rounded-xl border border-white/10 bg-dark-900/50 px-4 py-3 text-dark-100 outline-none transition-all duration-300 focus:border-primary/50 focus:bg-dark-800/50 focus:ring-1 focus:ring-primary/30"
                >
                  <option value="">Selecciona una opción</option>
                  <option>POS / Sistema de Ventas</option>
                  <option>Sistema de Inventario</option>
                  <option>CRM / ERP</option>
                  <option>Sistema para Restaurantes</option>
                  <option>Sistema para Farmacias</option>
                  <option>Sistema para Hoteles</option>
                  <option>Sistema para Colegios</option>
                  <option>Sistema para Clínicas</option>
                  <option>Aplicación Web / Móvil</option>
                  <option>Dashboard / Business Intelligence</option>
                  <option>Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Cuéntanos sobre tu proyecto..."
                  className="w-full rounded-xl border border-white/10 bg-dark-900/50 px-4 py-3 text-dark-100 placeholder-dark-500 outline-none transition-all duration-300 focus:border-primary/50 focus:bg-dark-800/50 focus:ring-1 focus:ring-primary/30 resize-none"
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Enviar Mensaje
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </Button>
            </motion.form>
          )}

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Email', value: 'hica.hardy.ivan@gmail.com' },
              { icon: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z', label: 'WhatsApp', value: '+591 78893619', href: 'https://wa.me/59178893619' },
              { icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z', label: 'Ubicación', value: 'Bolivia' },
            ].map((item) => (
              <a key={item.label} href={item.href || '#'} target={item.href ? '_blank' : undefined} rel={item.href ? 'noopener noreferrer' : undefined} className="block rounded-xl border border-white/5 bg-dark-900/30 p-6 transition-all duration-300 hover:border-white/10 hover:bg-dark-800/40 hover:-translate-y-0.5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="text-primary-light mb-3 mx-auto"
                >
                  <path d={item.icon} />
                </svg>
                <div className="text-xs font-medium text-dark-500 uppercase tracking-wider mb-1">
                  {item.label}
                </div>
                <div className="text-sm text-dark-200">{item.value}</div>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
