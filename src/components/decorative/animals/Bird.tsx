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
 * Single-colour silhouette to match the tree.
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

  const fill = 'rgba(232, 226, 207, 0.22)'
  const fillStrong = 'rgba(232, 226, 207, 0.32)'

  return (
    <div
      ref={ref}
      className={cn('animal animal--bird', flying && 'animal--bird-flying', className)}
      style={style}
    >
      <svg width="36" height="30" viewBox="0 0 36 30" className="animal-svg">
        {/* Tail */}
        <path d="M 4 14 L 9 14 L 8 17 Z" fill={fill} />
        {/* Body */}
        <ellipse cx="14" cy="14" rx="7" ry="5" fill={fill} />
        {/* Wing */}
        <path
          className="bird-wing"
          d="M 11 11 Q 16 7, 19 13 Q 16 14, 11 13 Z"
          fill={fillStrong}
        />
        {/* Head */}
        <circle cx="21" cy="11" r="3" fill={fill} />
        {/* Beak */}
        <path d="M 23 11 L 27 12 L 23 12 Z" fill={fillStrong} />
        {/* Eye */}
        <circle cx="22" cy="10" r="0.7" fill="rgba(0,0,0,0.65)" />
        {/* Legs */}
        <line x1="13" y1="19" x2="13" y2="23" stroke={fill} strokeWidth="0.9" strokeLinecap="round" />
        <line x1="16" y1="19" x2="16" y2="23" stroke={fill} strokeWidth="0.9" strokeLinecap="round" />
      </svg>
    </div>
  )
}
