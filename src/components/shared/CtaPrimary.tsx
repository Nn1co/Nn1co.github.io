import Link from 'next/link'
import { cn } from '@/lib/cn'

type CtaPrimaryProps = {
  href: string
  children: React.ReactNode
  className?: string
  external?: boolean
}

export function CtaPrimary({ href, children, className, external = false }: CtaPrimaryProps) {
  const isExternal = external || href.startsWith('http') || href.startsWith('mailto:')
  const classes = cn(
    'group relative inline-flex items-center gap-2 overflow-hidden rounded-full',
    'bg-gold px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink',
    'transition-colors duration-300 ease-out',
    'hover:bg-gold-dim',
    'focus-visible:outline-2 focus-visible:outline-cream',
    className
  )

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 z-0',
          'bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.18),transparent_60%)]',
          'opacity-0 transition-opacity duration-500 ease-out',
          'group-hover:opacity-100'
        )}
      />
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
