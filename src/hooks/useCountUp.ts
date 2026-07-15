import { useEffect, useRef, useState } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  suffix?: string
  enabled?: boolean
}

export function useCountUp({ end, duration = 2, suffix = '', enabled = true }: UseCountUpOptions) {
  const [value, setValue] = useState(0)
  const startTime = useRef<number | null>(null)
  const raf = useRef<number>(0)

  useEffect(() => {
    if (!enabled) {
      setValue(0)
      return
    }

    startTime.current = null

    const animate = (now: number) => {
      if (!startTime.current) startTime.current = now
      const elapsed = (now - startTime.current) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * end))
      if (progress < 1) {
        raf.current = requestAnimationFrame(animate)
      }
    }

    raf.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf.current)
  }, [end, duration, enabled])

  return `${value}${suffix}`
}
