import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { projects } from '@/data/projects'

function ProjectMockup({ gradientFrom, gradientTo, accentColor, title, features }: {
  gradientFrom: string
  gradientTo: string
  accentColor: string
  title: string
  features: { title: string; description: string }[]
}) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-dark-900/80 shadow-2xl">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-dark-800/50">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
      </div>
      <div className="p-5 sm:p-6">
        <div className="rounded-xl bg-gradient-to-br from-dark-800 to-dark-900 p-5 border border-white/5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm mb-4"
            style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
          >
            {title[0]}
          </div>
          <h4 className="font-heading text-lg font-bold text-dark-100 mb-1">{title}</h4>
          <div className="flex flex-wrap gap-4 mt-4">
            {features.slice(0, 4).map((f, i) => (
              <div key={i} className="flex items-start gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: accentColor }}
                />
                <div>
                  <div className="text-xs font-medium text-dark-200">{f.title}</div>
                  <div className="text-[10px] text-dark-500">{f.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <ScrollReveal delay={0.1}>
      <motion.div
        layout
        className="group rounded-3xl border border-white/5 bg-dark-900/40 overflow-hidden transition-colors hover:border-white/10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full border"
                style={{
                  color: project.accentColor,
                  borderColor: `${project.accentColor}30`,
                  backgroundColor: `${project.accentColor}10`,
                }}
              >
                {project.category}
              </span>
              <span className="text-[11px] text-dark-500">0{index + 1}</span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-dark-100 mb-1">
              {project.title}
            </h3>
            <p className="text-sm text-dark-400 mb-4">{project.subtitle}</p>

            <p className="text-sm text-dark-300 leading-relaxed mb-4">
              {project.solution}
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-light hover:text-primary transition-colors w-fit"
            >
              {isExpanded ? 'Menos detalles' : 'Ver detalles'}
              <motion.svg
                animate={{ rotate: isExpanded ? 180 : 0 }}
                width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              >
                <path d="M4 5l3 3 3-3" />
              </motion.svg>
            </motion.button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-5 space-y-5">
                    <p className="text-sm text-dark-400 leading-relaxed">
                      <span className="text-dark-500 font-semibold">Problema:</span> {project.problem}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="text-center rounded-xl border border-white/5 bg-dark-800/20 p-3">
                          <div className="font-heading text-lg font-bold" style={{ color: project.accentColor }}>
                            {m.value}
                          </div>
                          <div className="text-[10px] text-dark-500 mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-dark-400 border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative p-5 sm:p-6 lg:p-8 flex items-center order-1 lg:order-2 min-h-[220px] lg:min-h-[400px]">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                background: `radial-gradient(ellipse at center, ${project.gradientFrom} 0%, transparent 70%)`,
              }}
            />
            <ProjectMockup
              gradientFrom={project.gradientFrom}
              gradientTo={project.gradientTo}
              accentColor={project.accentColor}
              title={project.title}
              features={project.features}
            />
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

export function Projects() {
  return (
    <Section id="proyectos">
      <Container>
        <SectionTitle
          label="PROYECTOS"
          title="Sistemas que transforman industrias"
          description=""
        />
      </Container>

      <div className="space-y-10 md:space-y-14">
        {projects.map((project, index) => (
          <Container key={project.id}>
            <ProjectCard project={project} index={index} />
          </Container>
        ))}
      </div>
    </Section>
  )
}
