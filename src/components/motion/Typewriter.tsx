'use client'

import { motion, useReducedMotion } from 'framer-motion'

type Segment = {
  text: string
  italic?: boolean
  gold?: boolean
}

type TypewriterProps = {
  segments: Segment[]
  charDelay?: number
  startDelay?: number
  className?: string
}

export function Typewriter({
  segments,
  charDelay = 0.022,
  startDelay = 0.1,
  className,
}: TypewriterProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <span className={className}>
        {segments.map((segment, i) => (
          <SegmentText key={i} segment={segment}>
            {segment.text}
          </SegmentText>
        ))}
      </span>
    )
  }

  let charIndex = 0
  return (
    <span className={className} aria-label={segments.map((s) => s.text).join('')}>
      {segments.map((segment, segIdx) => {
        const chars = Array.from(segment.text)
        return (
          <SegmentText key={segIdx} segment={segment}>
            {chars.map((char, ci) => {
              const delay = startDelay + charIndex * charDelay
              charIndex += 1
              return (
                <motion.span
                  key={ci}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.001, delay }}
                  aria-hidden="true"
                >
                  {char === ' ' ? ' ' : char}
                </motion.span>
              )
            })}
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
    return <em className="italic text-gold not-italic-quote">{children}</em>
  }
  if (segment.italic) {
    return <em className="italic">{children}</em>
  }
  if (segment.gold) {
    return <span className="text-gold">{children}</span>
  }
  return <span>{children}</span>
}
