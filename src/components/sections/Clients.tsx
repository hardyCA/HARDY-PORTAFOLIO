import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { ParallaxSection } from '@/components/effects/ParallaxSection'

const clients = [
  { name: 'GACIA', from: '#2563eb', to: '#0891b2' },
  { name: 'RIBATEC', from: '#059669', to: '#0d9488' },
  { name: 'MAXGE BOLIVIA', from: '#d97706', to: '#ea580c' },
  { name: 'FERNANDEZ', from: '#7c3aed', to: '#a21caf' },
  { name: 'FUSION COMPANY', from: '#e11d48', to: '#db2777' },
  { name: 'AYLIN', from: '#0284c7', to: '#4f46e5' },
]

export function Clients() {
  return (
    <Section id="clientes" className="overflow-hidden py-20 md:py-24">
      <Container>
        <ParallaxSection speed={0.05} as="div">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10"
          >
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-dark-500 mb-3">
              EMPRESAS QUE CONFÍAN EN NOSOTROS
            </span>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {clients.map((client, i) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="group relative rounded-2xl border border-white/[0.06] bg-dark-900/40 p-5 sm:p-6 flex flex-col items-center justify-center gap-3 transition-colors hover:border-white/10 hover:bg-dark-800/40"
              >
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-white font-heading font-bold text-lg sm:text-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${client.from}, ${client.to})` }}
                >
                  {client.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-dark-400 text-center leading-tight">
                  {client.name}
                </span>
              </motion.div>
            ))}
          </div>
        </ParallaxSection>
      </Container>
    </Section>
  )
}
