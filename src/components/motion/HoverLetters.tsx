'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/cn'

type HoverLettersProps = {
  children: string
  className?: string
  /** Kept for backwards compat; ignored. */
  intensity?: 'soft' | 'wave'
}

// Scramble glyphs — chosen to feel "corrupted" without being too wide.
const SCRAMBLE_CHARS = '#%&@$XBNQDFRGHJKWZVY*+'

/**
 * Subtle terminal-style scramble on hover.
 *
 * Behaviour:
 *  - Each character is wrapped in its own span whose width is locked to
 *    its measured natural width on first mount. As the inner glyph
 *    swaps, the surrounding text never reflows.
 *  - At any given moment only 1-3 characters are scrambled (depending
 *    on word length). The other characters stay readable, so the word
 *    is always recognisable.
 *  - Total animation lasts ~700ms. Each scrambled position holds a
 *    glyph for ~70ms before either picking a new glyph or settling and
 *    letting another position take over.
 *
 * No colour or glow change — only the textContent corrupts.
 */
export function HoverLetters({ children, className }: HoverLettersProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const charRefs = useRef<Array<HTMLSpanElement | null>>([])
  const animatingRef = useRef(false)
  const chars = Array.from(children)

  // Lock each character's natural width once on mount + when the prop
  // changes (locale switch). Prevents layout shift during scramble.
  useEffect(() => {
    charRefs.current.forEach((el, i) => {
      if (!el) return
      // Reset before measuring in case content changed.
      el.style.width = ''
      el.textContent = chars[i] === ' ' ? ' ' : chars[i] ?? ''
      const w = el.getBoundingClientRect().width
      // Add a hair of breathing room so descenders/ascenders never clip.
      el.style.width = `${w}px`
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children])

  function start() {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (animatingRef.current) return

    const len = chars.length
    if (len === 0) return

    // Number of characters being scrambled at once. Keeps the word
    // mostly readable: never more than 3, and never more than half.
    const maxActive = Math.min(3, Math.max(1, Math.floor(len / 4)))

    const TOTAL_MS = 700
    const HOLD_MS = 70
    const ROTATE_PROB = 0.4

    animatingRef.current = true
    const startTime = performance.now()
    const positionNext: number[] = Array(len).fill(0)
    const activeSet = new Set<number>()

    const settle = (pos: number) => {
      const span = charRefs.current[pos]
      if (span) span.textContent = chars[pos] === ' ' ? ' ' : chars[pos]
    }

    const pickNew = (): number => {
      for (let i = 0; i < 25; i += 1) {
        const p = Math.floor(Math.random() * len)
        if (!activeSet.has(p) && chars[p] !== ' ') return p
      }
      return -1
    }

    while (activeSet.size < maxActive) {
      const p = pickNew()
      if (p === -1) break
      activeSet.add(p)
      positionNext[p] = startTime
    }

    const tick = () => {
      const now = performance.now()
      const elapsed = now - startTime

      if (elapsed >= TOTAL_MS) {
        for (let i = 0; i < len; i += 1) settle(i)
        animatingRef.current = false
        return
      }

      // Iterate over a snapshot — we may mutate the set inside the loop.
      const positions = Array.from(activeSet)
      for (const pos of positions) {
        if (now < positionNext[pos]) continue

        const remaining = TOTAL_MS - elapsed
        // Once we are close to the end, just settle.
        if (remaining < HOLD_MS * 1.5 || Math.random() < ROTATE_PROB) {
          settle(pos)
          activeSet.delete(pos)
          if (remaining > HOLD_MS) {
            const newP = pickNew()
            if (newP !== -1) {
              activeSet.add(newP)
              positionNext[newP] = now + HOLD_MS
              const span = charRefs.current[newP]
              if (span) {
                span.textContent =
                  SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
              }
            }
          }
        } else {
          const span = charRefs.current[pos]
          if (span) {
            span.textContent =
              SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          }
          positionNext[pos] = now + HOLD_MS
        }
      }

      requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
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
      {chars.map((c, i) => (
        <span
          key={i}
          ref={(el) => {
            charRefs.current[i] = el
          }}
          className="inline-block text-center"
          aria-hidden={c === ' '}
        >
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </span>
  )
}
