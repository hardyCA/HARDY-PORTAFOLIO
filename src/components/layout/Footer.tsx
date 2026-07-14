'use client'

import { motion } from 'framer-motion'
import { scrollToSection } from '@/hooks/useSmoothScroll'
import { Container } from '@/components/ui/Container'

const footerLinks = [
  { label: 'Sistemas', href: 'servicios' },
  { label: 'Proyectos', href: 'proyectos' },
  { label: 'Proceso', href: 'proceso' },
  { label: 'Contacto', href: 'contacto' },
]

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-dark-950/80">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-heading font-bold text-lg text-dark-100">
                Nexo<span className="text-primary">Dev</span>
              </span>
            </div>
            <p className="text-sm text-dark-400 leading-relaxed max-w-xs">
              Transformamos negocios con software empresarial a medida. 
              Tecnología de clase mundial para empresas que buscan excellence.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm text-dark-200 mb-4 uppercase tracking-wider">
              Navegación
            </h4>
            <div className="flex flex-col gap-2.5">
              {footerLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-dark-400 hover:text-dark-100 transition-colors text-left w-fit"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm text-dark-200 mb-4 uppercase tracking-wider">
              Contacto
            </h4>
            <div className="flex flex-col gap-2 text-sm text-dark-400">
              <span>hica.hardy.ivan@gmail.com</span>
<a href="https://wa.me/59178893619" target="_blank" rel="noopener noreferrer" className="hover:text-dark-100 transition-colors">+591 78893619</a>
          <span>Bolivia</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dark-500">
            © {new Date().getFullYear()} NexoDev. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-dark-500 hover:text-dark-300 transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
