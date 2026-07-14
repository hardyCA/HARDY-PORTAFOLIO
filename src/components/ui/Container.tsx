import { cn } from '@/utils/cn'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12', className)}>
      {children}
    </div>
  )
}
