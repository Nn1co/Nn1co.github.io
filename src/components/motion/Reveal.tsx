'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  amount?: number
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'aside'
}

export function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.25,
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as]

  return (
    <MotionTag
      className={cn(className)}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: reduced ? 0.4 : 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  )
}
