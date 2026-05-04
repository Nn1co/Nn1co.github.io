import { cn } from '@/lib/cn'

type EyebrowProps = {
  children: React.ReactNode
  className?: string
  as?: 'p' | 'span' | 'div'
  dot?: boolean
}

export function Eyebrow({ children, className, as: Tag = 'p', dot = true }: EyebrowProps) {
  return (
    <Tag
      className={cn(
        'flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-cream-dim',
        className
      )}
    >
      {dot && <span aria-hidden="true" className="pulse-dot shrink-0" />}
      <span>{children}</span>
    </Tag>
  )
}
