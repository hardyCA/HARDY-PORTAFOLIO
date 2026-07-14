'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { projects } from '@/data/projects'
import { cn } from '@/utils/cn'

function MockupDisplay({ gradientFrom, gradientTo, accentColor, features }: {
  gradientFrom: string
  gradientTo: string
  accentColor: string
  features: { title: string; description: string }[]
}) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-dark-900/80 shadow-2xl">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5 bg-dark-800/50">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
        <div className="flex-1 flex justify-center">
          <div className="w-32 h-3 rounded-full bg-dark-700/50" />
        </div>
      </div>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-white/5">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
          >
            N
          </div>
          <div className="flex-1">
            <div className="h-3 w-28 rounded-full bg-dark-700/50" />
            <div className="h-2 w-20 rounded-full bg-dark-700/30 mt-1.5" />
          </div>
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-6 h-6 rounded-md bg-dark-700/40" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 sm:col-span-1">
            <div className="h-4 w-24 rounded bg-dark-700/40 mb-2" />
            <div className="space-y-1.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                  <div className="h-2 flex-1 rounded bg-dark-700/30" />
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="rounded-lg border border-white/5 bg-dark-800/30 p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="h-3 w-16 rounded bg-dark-700/40" />
                <div
                  className="text-xs font-semibold"
                  style={{ color: accentColor }}
                >
                  +45%
                </div>
              </div>
              <div className="flex items-end gap-1 h-12">
                {[40, 65, 35, 80, 55, 90, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm transition-all duration-300"
                    style={{
                      height: `${h}%`,
                      background: `linear-gradient(to top, ${gradientFrom}80, ${gradientTo}80)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2 border-t border-white/5">
          {features.slice(0, 3).map((f) => (
            <div
              key={f.title}
              className="flex-1 rounded-lg border border-white/5 bg-dark-800/20 p-2.5"
            >
              <div className="h-2 w-14 rounded bg-dark-700/40 mb-1" />
              <div className="h-1.5 w-full rounded bg-dark-700/20" />
            </div>
          ))}
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
          <div className="p-8 md:p-12 flex flex-col justify-center order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full border"
                style={{
                  color: project.accentColor,
                  borderColor: `${project.accentColor}30`,
                  backgroundColor: `${project.accentColor}10`,
                }}
              >
                {project.category}
              </span>
              <span className="text-xs text-dark-500">0{index + 1}</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-dark-100 mb-2">
              {project.title}
            </h3>
            <p className="text-dark-400 text-base mb-6">
              {project.subtitle}
            </p>

            <div className="space-y-4 mb-8">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-dark-500 mb-1.5">
                  Problema
                </h4>
                <p className="text-sm text-dark-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-dark-500 mb-1.5">
                  Solución
                </h4>
                <p className="text-sm text-dark-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-light hover:text-primary transition-colors"
            >
              {isExpanded ? 'Ver menos' : 'Ver más detalles'}
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
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 space-y-6">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-dark-500 mb-3">
                        Características
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {project.features.map((f) => (
                          <div key={f.title} className="rounded-xl border border-white/5 bg-dark-800/30 p-4">
                            <div
                              className="w-2 h-2 rounded-full mb-2"
                              style={{ backgroundColor: project.accentColor }}
                            />
                            <h5 className="text-sm font-semibold text-dark-200 mb-1">{f.title}</h5>
                            <p className="text-xs text-dark-400">{f.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="text-center rounded-xl border border-white/5 bg-dark-800/20 p-3">
                          <div
                            className="font-heading text-xl font-bold"
                            style={{ color: project.accentColor }}
                          >
                            {m.value}
                          </div>
                          <div className="text-xs text-dark-500 mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-dark-300 border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative p-6 sm:p-8 lg:p-10 flex items-center order-1 lg:order-2 min-h-[300px] lg:min-h-[500px]">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                background: `radial-gradient(ellipse at center, ${project.gradientFrom} 0%, transparent 70%)`,
              }}
            />
            <MockupDisplay
              gradientFrom={project.gradientFrom}
              gradientTo={project.gradientTo}
              accentColor={project.accentColor}
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
          description="Cada proyecto es una solución personalizada diseñada para resolver desafíos específicos de negocio."
        />
      </Container>

      <div className="space-y-12 md:space-y-16 lg:space-y-20">
        {projects.map((project, index) => (
          <Container key={project.id}>
            <ProjectCard project={project} index={index} />
          </Container>
        ))}
      </div>
    </Section>
  )
}
