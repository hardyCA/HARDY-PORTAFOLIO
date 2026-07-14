import { type ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 cursor-pointer',
        'hover:scale-[1.02] active:scale-[0.98]',
        size === 'sm' && 'px-4 py-2 text-sm gap-1.5',
        size === 'md' && 'px-6 py-3 text-base gap-2',
        size === 'lg' && 'px-8 py-4 text-lg gap-2.5',
        variant === 'primary' && 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:from-primary-light hover:to-accent-light',
        variant === 'secondary' && 'glass-strong text-dark-100 hover:bg-white/10 hover:border-white/10',
        variant === 'ghost' && 'text-dark-300 hover:text-dark-100 hover:bg-white/5',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
