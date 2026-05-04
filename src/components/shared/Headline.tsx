import { cn } from '@/lib/cn'

type HeadlineSize = 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
type HeadlineLevel = 'h1' | 'h2' | 'h3' | 'h4'

type HeadlineProps = {
  children: React.ReactNode
  className?: string
  size?: HeadlineSize
  as?: HeadlineLevel
  balance?: boolean
}

const sizeClass: Record<HeadlineSize, string> = {
  xl: 'text-xl',
  '2xl': 'text-2xl md:text-2xl',
  '3xl': 'text-2xl md:text-3xl',
  '4xl': 'text-3xl md:text-4xl',
  '5xl': 'text-4xl md:text-5xl',
}

export function Headline({
  children,
  className,
  size = '3xl',
  as: Tag = 'h2',
  balance = true,
}: HeadlineProps) {
  return (
    <Tag
      className={cn(
        'font-display font-normal text-cream',
        sizeClass[size],
        balance && 'text-balance',
        className
      )}
    >
      {children}
    </Tag>
  )
}
