'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

type DataTickerProps = {
  prefix?: string
  className?: string
  intervalMs?: number
}

const HEX = '0123456789ABCDEF'.split('')

function generate(seed: number) {
  let s = seed
  let out = ''
  for (let i = 0; i < 6; i++) {
    s = (s * 9301 + 49297) % 233280
    out += HEX[Math.floor((s / 233280) * 16)]
  }
  return `0x${out}`
}

export function DataTicker({
  prefix = 'SYS',
  className,
  intervalMs = 1800,
}: DataTickerProps) {
  const [code, setCode] = useState(() => generate(42))

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let seed = Date.now() % 9999
    const id = window.setInterval(() => {
      seed = (seed + 137) % 99999
      setCode(generate(seed))
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs])

  return (
    <span aria-hidden="true" className={cn('data-ticker', className)}>
      <span className="text-jade">{prefix}</span> · <span className="text-cream-muted">{code}</span>
    </span>
  )
}
