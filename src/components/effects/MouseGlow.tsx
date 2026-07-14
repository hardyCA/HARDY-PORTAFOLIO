'use client'

import { useMousePosition } from '@/hooks/useMousePosition'

export function MouseGlow() {
  const { x, y } = useMousePosition()

  return (
    <div
      className="fixed pointer-events-none z-50 hidden lg:block"
      style={{
        left: x - 150,
        top: y - 150,
        width: 300,
        height: 300,
        background:
          'radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(6,182,212,0.04) 40%, transparent 70%)',
        transform: 'translate(0, 0)',
      }}
    />
  )
}
