import { cn } from '@/lib/cn'

type RuleProps = {
  variant?: 'soft' | 'dotted'
  className?: string
}

export function Rule({ variant = 'soft', className }: RuleProps) {
  return (
    <hr
      role="separator"
      aria-orientation="horizontal"
      className={cn(
        'h-0 w-full border-0 border-t',
        variant === 'soft' && 'border-solid border-rule-soft',
        variant === 'dotted' && 'border-dotted border-rule-dotted',
        className
      )}
    />
  )
}
