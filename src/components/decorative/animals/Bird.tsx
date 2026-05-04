'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

type BirdProps = {
  className?: string
  style?: React.CSSProperties
}

/**
 * Bird perched on a branch. Once the user scrolls past it, it takes
 * flight: translates up-right, rotates, scales down, fades out.
 * After flying, it stays gone (one-shot) until the page reloads.
 */
export function Bird({ className, style }: BirdProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [flying, setFlying] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') return

    const obs = new IntersectionObserver(
      ([entry]) => {
        // Trigger flight once the bird leaves the viewport while
        // scrolling down (boundingClientRect.top < 0)
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setFlying(true)
          obs.disconnect()
        }
      },
      { threshold: 0 }
    )

    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn('animal animal--bird', flying && 'animal--bird-flying', className)}
      style={style}
    >
      <svg width="34" height="28" viewBox="0 0 34 28" className="animal-svg">
        {/* Tail */}
        <path
          d="M 4 14 L 9 14 L 8 17 Z"
          fill="rgba(232, 226, 207, 0.7)"
        />
        {/* Body */}
        <ellipse cx="14" cy="14" rx="7" ry="5" fill="rgba(232, 226, 207, 0.85)" />
        {/* Wing — folded when perched, spread when flying */}
        <path
          className="bird-wing"
          d="M 11 11 Q 16 8, 19 13 Q 16 14, 11 13 Z"
          fill="rgba(212, 165, 95, 0.8)"
        />
        {/* Head */}
        <circle cx="21" cy="11" r="3" fill="rgba(232, 226, 207, 0.95)" />
        {/* Beak */}
        <path
          d="M 23 11 L 27 12 L 23 12 Z"
          fill="rgba(212, 165, 95, 0.95)"
        />
        {/* Eye */}
        <circle cx="22" cy="10" r="0.6" fill="#0A1410" />
        {/* Legs */}
        <line x1="13" y1="19" x2="13" y2="23" stroke="rgba(212, 165, 95, 0.7)" strokeWidth="0.8" />
        <line x1="16" y1="19" x2="16" y2="23" stroke="rgba(212, 165, 95, 0.7)" strokeWidth="0.8" />
      </svg>
    </div>
  )
}
