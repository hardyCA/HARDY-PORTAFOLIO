import { cn } from '@/utils/cn'

interface SectionProps {
  id?: string
  children: React.ReactNode
  className?: string
}

export function Section({ id, children, className }: SectionProps) {
  return (
    <section id={id} className={cn('relative py-24 md:py-32', className)}>
      {children}
    </section>
  )
}
