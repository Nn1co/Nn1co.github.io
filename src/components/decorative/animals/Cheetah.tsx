'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

type CheetahProps = {
  className?: string
  style?: React.CSSProperties
}

/**
 * Cheetah lying on the ground. Yawn-stretches when scrolled into view.
 * Single-colour silhouette to match the tree.
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
          window.setTimeout(() => setYawning(false), 3200)
        }
      },
      { threshold: 0.6 }
    )

    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  const fill = 'rgba(232, 226, 207, 0.22)'
  const fillStrong = 'rgba(232, 226, 207, 0.30)'

  return (
    <div
      ref={ref}
      className={cn('animal animal--cheetah', yawning && 'animal--cheetah-yawn', className)}
      style={style}
    >
      <svg width="86" height="50" viewBox="0 0 86 50" className="animal-svg">
        <path
          d="M 16 30 Q 4 28, 7 18"
          stroke={fill}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="42" cy="30" rx="22" ry="8" fill={fill} />
        <g className="cheetah-head">
          <circle cx="64" cy="24" r="6" fill={fill} />
          <path d="M 60 18 L 62 14 L 64 18 Z" fill={fillStrong} />
          <path d="M 65 18 L 67 14 L 69 18 Z" fill={fillStrong} />
          <ellipse cx="69" cy="25" rx="2.4" ry="1.6" fill={fillStrong} />
          <path d="M 62 23 L 65 23" stroke="rgba(0,0,0,0.6)" strokeWidth="0.8" strokeLinecap="round" />
          <ellipse
            className="cheetah-mouth"
            cx="69"
            cy="27"
            rx="2"
            ry="1"
            fill="rgba(0,0,0,0.55)"
          />
        </g>
        <g stroke={fill} strokeWidth="2" strokeLinecap="round">
          <line x1="28" y1="38" x2="28" y2="44" />
          <line x1="36" y1="38" x2="36" y2="44" />
          <line x1="48" y1="38" x2="48" y2="44" />
          <line x1="56" y1="38" x2="56" y2="44" />
        </g>
        <g fill="rgba(0,0,0,0.30)">
          <circle cx="34" cy="28" r="1" />
          <circle cx="42" cy="32" r="1" />
          <circle cx="50" cy="28" r="1" />
          <circle cx="58" cy="33" r="1" />
        </g>
      </svg>
    </div>
  )
}
