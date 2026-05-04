'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/cn'

type MagneticCtaProps = {
  children: React.ReactNode
  className?: string
  strength?: number
}

/**
 * Wraps any CTA in a div whose contents subtly track the cursor on hover.
 * No animation libraries; pure rAF transforms. Disabled on touch and
 * with prefers-reduced-motion.
 */
export function MagneticCta({ children, className, strength = 0.25 }: MagneticCtaProps) {
  const wrapper = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const w = wrapper.current
    const i = inner.current
    if (!w || !i) return

    let frame: number | null = null
    let dx = 0
    let dy = 0

    const onMove = (e: MouseEvent) => {
      const rect = w.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      dx = (e.clientX - cx) * strength
      dy = (e.clientY - cy) * strength
      if (frame === null) {
        frame = requestAnimationFrame(() => {
          i.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
          frame = null
        })
      }
    }

    const onLeave = () => {
      dx = 0
      dy = 0
      i.style.transform = 'translate3d(0, 0, 0)'
    }

    w.addEventListener('mousemove', onMove)
    w.addEventListener('mouseleave', onLeave)
    return () => {
      w.removeEventListener('mousemove', onMove)
      w.removeEventListener('mouseleave', onLeave)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [strength])

  return (
    <div ref={wrapper} className={cn('inline-block', className)}>
      <div
        ref={inner}
        className="will-change-transform transition-transform duration-300 ease-out"
      >
        {children}
      </div>
    </div>
  )
}
