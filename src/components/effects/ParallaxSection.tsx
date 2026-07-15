import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  speed?: number
  as?: 'section' | 'div'
}

export function ParallaxSection({
  children,
  className,
  speed = 0.15,
  as: Tag = 'section',
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100])

  return (
    <Tag ref={ref} className={`relative overflow-hidden ${className || ''}`}>
      <motion.div style={{ y }} className="relative z-10">
        {children}
      </motion.div>
    </Tag>
  )
}
