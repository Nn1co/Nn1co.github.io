import { cn } from '@/lib/cn'

type FrameProps = {
  children: React.ReactNode
  className?: string
  inner?: boolean
  glow?: boolean
}

export function Frame({ children, className, inner = true, glow = false }: FrameProps) {
  return (
    <div
      className={cn(
        'relative border border-rule-soft bg-ink-soft/40 p-6 md:p-8',
        glow && 'shadow-inset-glow',
        className
      )}
    >
      {inner && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-2 border border-rule-soft"
        />
      )}
      <div className="relative">{children}</div>
    </div>
  )
}
