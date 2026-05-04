import Link from 'next/link'
import { cn } from '@/lib/cn'

type InkButtonProps = {
  href: string
  children: React.ReactNode
  className?: string
  external?: boolean
}

export function InkButton({ href, children, className, external = false }: InkButtonProps) {
  const isExternal = external || href.startsWith('http') || href.startsWith('mailto:')

  const classes = cn(
    'group relative inline-flex items-center gap-3 overflow-hidden rounded-full',
    'ink-button px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink',
    className
  )

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5"
      >
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
