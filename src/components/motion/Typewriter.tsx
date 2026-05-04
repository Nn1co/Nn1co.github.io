'use client'

import { useEffect, useState } from 'react'

type Segment = {
  text: string
  italic?: boolean
  gold?: boolean
}

type TypewriterProps = {
  segments: Segment[]
  charDelayMs?: number
  startDelayMs?: number
  className?: string
}

const PREFERS_REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export function Typewriter({
  segments,
  charDelayMs = 22,
  startDelayMs = 100,
  className,
}: TypewriterProps) {
  const totalChars = segments.reduce((acc, s) => acc + Array.from(s.text).length, 0)
  const [revealed, setRevealed] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia?.(PREFERS_REDUCED_MOTION_QUERY).matches ?? false
    setReducedMotion(reduce)

    if (reduce) {
      setRevealed(totalChars)
      return
    }

    let frame: number | null = null
    const start = performance.now() + startDelayMs

    const tick = (now: number) => {
      const elapsed = Math.max(0, now - start)
      const next = Math.min(totalChars, Math.floor(elapsed / charDelayMs))
      setRevealed(next)
      if (next < totalChars) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [totalChars, charDelayMs, startDelayMs])

  const accessibleLabel = segments.map((s) => s.text).join('')

  let cursor = 0
  return (
    <span className={className} aria-label={accessibleLabel}>
      {segments.map((segment, segIdx) => {
        const chars = Array.from(segment.text)
        const visibleCount = reducedMotion ? chars.length : Math.max(0, Math.min(chars.length, revealed - cursor))
        cursor += chars.length
        const visibleText = chars.slice(0, visibleCount).join('')

        return (
          <SegmentText key={segIdx} segment={segment}>
            <span aria-hidden="true">{visibleText}</span>
          </SegmentText>
        )
      })}
    </span>
  )
}

function SegmentText({
  segment,
  children,
}: {
  segment: Segment
  children: React.ReactNode
}) {
  if (segment.italic && segment.gold) {
    return <em className="italic text-gold">{children}</em>
  }
  if (segment.italic) {
    return <em className="italic">{children}</em>
  }
  if (segment.gold) {
    return <span className="text-gold">{children}</span>
  }
  return <span>{children}</span>
}
