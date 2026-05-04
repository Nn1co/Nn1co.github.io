'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/cn'

type InkButtonProps = {
  href: string
  children: React.ReactNode
  className?: string
  external?: boolean
}

export function InkButton({ href, children, className, external = false }: InkButtonProps) {
  const reduced = useReducedMotion()
  const isExternal = external || href.startsWith('http') || href.startsWith('mailto:')

  const classes = cn(
    'group relative inline-flex items-center gap-3 overflow-hidden rounded-full',
    'bg-gold px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink',
    'transition-[background-color] duration-300 ease-out',
    className
  )

  const content = (
    <>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        initial={{ backgroundPosition: '0% 50%' }}
        whileHover={reduced ? undefined : { backgroundPosition: '100% 50%' }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        style={{
          background:
            'linear-gradient(110deg, #D4A55F 0%, #E5BE7E 45%, #D4A55F 100%)',
          backgroundSize: '220% 100%',
        }}
      />
      <span className="relative z-10">{children}</span>
      <span aria-hidden="true" className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
        →
      </span>
    </>
  )

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}
