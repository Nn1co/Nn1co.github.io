'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/cn'

type RevealProps = {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'aside'
  id?: string
  'aria-label'?: string
}

export function Reveal({
  children,
  className,
  as: Tag = 'div',
  id,
  'aria-label': ariaLabel,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('reveal--visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('reveal--visible')
          observer.disconnect()
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      id={id}
      aria-label={ariaLabel}
      className={cn('reveal', className)}
    >
      {children}
    </Tag>
  )
}
