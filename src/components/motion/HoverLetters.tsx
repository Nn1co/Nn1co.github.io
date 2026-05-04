'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/cn'

type HoverLettersProps = {
  children: string
  className?: string
  /** Kept for backwards compat; ignored. */
  intensity?: 'soft' | 'wave'
}

const SCRAMBLE_CHARS = '!<>-_\\/[]{}=+*^?#§◊•◦∞±¥¢×§ø'

/**
 * Terminal-style text scramble effect on hover.
 * Each character cycles through random glyphs before resolving back
 * to its original letter, with a per-char start/end offset so the
 * resolution sweeps across the word like decoded data.
 *
 * Implementation writes directly to textContent inside a rAF loop —
 * zero React re-renders during the animation.
 *
 * The exported name is kept as `HoverLetters` to avoid churning every
 * import site; behaviour now matches a `TextScramble` component.
 */
export function HoverLetters({ children, className }: HoverLettersProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const animatingRef = useRef(false)

  // Re-sync displayed text when the prop changes (e.g. locale switch)
  useEffect(() => {
    if (ref.current) ref.current.textContent = children
  }, [children])

  function start() {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!ref.current || animatingRef.current) return

    animatingRef.current = true
    ref.current.classList.add('text-scramble--active')

    const chars = Array.from(children)
    const queue = chars.map((c) => ({
      from: c,
      to: c,
      start: Math.floor(Math.random() * 18),
      end: 18 + Math.floor(Math.random() * 22),
    }))

    let frame = 0
    let id: number | null = null

    const tick = () => {
      if (!ref.current) {
        animatingRef.current = false
        return
      }
      let output = ''
      let complete = 0
      for (const q of queue) {
        if (q.to === ' ') {
          output += ' '
          complete += 1
          continue
        }
        if (frame >= q.end) {
          output += q.to
          complete += 1
        } else if (frame >= q.start) {
          output += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        } else {
          output += q.from
        }
      }
      ref.current.textContent = output
      frame += 1
      if (complete < queue.length) {
        id = requestAnimationFrame(tick)
      } else {
        animatingRef.current = false
        ref.current.classList.remove('text-scramble--active')
      }
    }

    id = requestAnimationFrame(tick)
    return () => {
      if (id !== null) cancelAnimationFrame(id)
    }
  }

  return (
    <span
      ref={ref}
      onMouseEnter={start}
      onFocus={start}
      tabIndex={-1}
      aria-label={children}
      className={cn('text-scramble inline-block', className)}
    >
      {children}
    </span>
  )
}
