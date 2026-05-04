'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

type CheetahProps = {
  className?: string
  style?: React.CSSProperties
}

/**
 * Cheetah lying on the ground. When scrolled into view it does a slow
 * yawn-stretch: scales up vertically, tilts the head back, then settles.
 * The animation re-triggers each time the cheetah re-enters the
 * viewport (so revisiting feels alive).
 */
export function Cheetah({ className, style }: CheetahProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [yawning, setYawning] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setYawning(true)
          // Reset after the keyframe finishes so the next visit replays
          window.setTimeout(() => setYawning(false), 3200)
        }
      },
      { threshold: 0.6 }
    )

    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn('animal animal--cheetah', yawning && 'animal--cheetah-yawn', className)}
      style={style}
    >
      <svg width="86" height="50" viewBox="0 0 86 50" className="animal-svg">
        {/* Tail */}
        <path
          d="M 16 30 Q 4 28, 7 18"
          stroke="rgba(212, 165, 95, 0.7)"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Body */}
        <ellipse cx="42" cy="30" rx="22" ry="8" fill="rgba(212, 165, 95, 0.8)" />
        {/* Head group — yawn animation pivots this */}
        <g className="cheetah-head">
          <circle cx="64" cy="24" r="6" fill="rgba(212, 165, 95, 0.9)" />
          {/* Ears */}
          <path d="M 60 18 L 62 14 L 64 18 Z" fill="rgba(212, 165, 95, 0.95)" />
          <path d="M 65 18 L 67 14 L 69 18 Z" fill="rgba(212, 165, 95, 0.95)" />
          {/* Snout */}
          <ellipse cx="69" cy="25" rx="2.4" ry="1.6" fill="rgba(232, 226, 207, 0.6)" />
          {/* Eye (closed lid) */}
          <path
            d="M 62 23 L 65 23"
            stroke="#0A1410"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          {/* Mouth — opens during yawn via scaleY on this element */}
          <ellipse
            className="cheetah-mouth"
            cx="69"
            cy="27"
            rx="2"
            ry="1"
            fill="#0A1410"
          />
        </g>
        {/* Legs */}
        <line x1="28" y1="38" x2="28" y2="44" stroke="rgba(212, 165, 95, 0.65)" strokeWidth="2" strokeLinecap="round" />
        <line x1="36" y1="38" x2="36" y2="44" stroke="rgba(212, 165, 95, 0.65)" strokeWidth="2" strokeLinecap="round" />
        <line x1="48" y1="38" x2="48" y2="44" stroke="rgba(212, 165, 95, 0.65)" strokeWidth="2" strokeLinecap="round" />
        <line x1="56" y1="38" x2="56" y2="44" stroke="rgba(212, 165, 95, 0.65)" strokeWidth="2" strokeLinecap="round" />
        {/* Spots */}
        <circle cx="34" cy="28" r="1" fill="#0A1410" opacity="0.4" />
        <circle cx="42" cy="32" r="1" fill="#0A1410" opacity="0.4" />
        <circle cx="50" cy="28" r="1" fill="#0A1410" opacity="0.4" />
        <circle cx="58" cy="33" r="1" fill="#0A1410" opacity="0.4" />
      </svg>
    </div>
  )
}
