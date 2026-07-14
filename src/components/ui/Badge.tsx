import { cn } from '@/utils/cn'

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10',
        'px-3 py-1 text-xs font-medium text-dark-300',
        className
      )}
    >
      {children}
    </span>
  )
}
