'use client'

import { useEffect, useRef } from 'react'

type CursorSpotlightProps = {
  className?: string
}

export function CursorSpotlight({ className }: CursorSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const node = ref.current
    if (!node) return

    let frame: number | null = null
    let pendingX = 50
    let pendingY = 50

    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect()
      pendingX = ((e.clientX - rect.left) / rect.width) * 100
      pendingY = ((e.clientY - rect.top) / rect.height) * 100
      if (frame === null) {
        frame = requestAnimationFrame(() => {
          node.style.setProperty('--mouse-x', `${pendingX}%`)
          node.style.setProperty('--mouse-y', `${pendingY}%`)
          frame = null
        })
      }
    }

    const onEnter = () => node.classList.add('cursor-spotlight--active')
    const onLeave = () => node.classList.remove('cursor-spotlight--active')

    const parent = node.parentElement
    if (!parent) return

    parent.addEventListener('mousemove', onMove)
    parent.addEventListener('mouseenter', onEnter)
    parent.addEventListener('mouseleave', onLeave)

    return () => {
      parent.removeEventListener('mousemove', onMove)
      parent.removeEventListener('mouseenter', onEnter)
      parent.removeEventListener('mouseleave', onLeave)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  return <div ref={ref} aria-hidden="true" className={className ?? 'cursor-spotlight'} />
}
