'use client'

import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  distance?: number
  once?: boolean
}

const directionVariants: Record<string, { x?: number; y?: number }> = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: 60 },
  right: { x: -60 },
  none: { x: 0, y: 0 },
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  distance = 60,
  once = true,
}: ScrollRevealProps) {
  const baseInitial = directionVariants[direction]
  const offsetInitial = { ...baseInitial }
  if (direction !== 'none') {
    if (direction === 'up' || direction === 'down') {
      offsetInitial.y = distance * (direction === 'up' ? 1 : -1)
    } else {
      offsetInitial.x = distance * (direction === 'left' ? 1 : -1)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...offsetInitial }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
