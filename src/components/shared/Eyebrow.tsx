import { cn } from '@/lib/cn'

type EyebrowProps = {
  children: React.ReactNode
  className?: string
  as?: 'p' | 'span' | 'div'
}

export function Eyebrow({ children, className, as: Tag = 'p' }: EyebrowProps) {
  return (
    <Tag
      className={cn(
        'font-mono text-xs uppercase tracking-widest text-cream-dim',
        className
      )}
    >
      {children}
    </Tag>
  )
}
