import Link from 'next/link'
import { cn } from '@/lib/cn'

type CtaSecondaryProps = {
  href: string
  children: React.ReactNode
  className?: string
  external?: boolean
}

export function CtaSecondary({ href, children, className, external = false }: CtaSecondaryProps) {
  const isExternal = external || href.startsWith('http') || href.startsWith('mailto:')
  const classes = cn(
    'group inline-flex items-center gap-2',
    'font-mono text-xs uppercase tracking-widest text-cream',
    'border-b border-dotted border-rule-dotted pb-1',
    'transition-[color,border-color] duration-200 ease-out',
    'hover:border-solid hover:border-gold hover:text-gold',
    className
  )

  const content = (
    <>
      <span>{children}</span>
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
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
