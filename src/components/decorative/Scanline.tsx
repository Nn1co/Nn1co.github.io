import { cn } from '@/lib/cn'

type ScanlineProps = {
  className?: string
  delaySeconds?: number
}

export function Scanline({ className, delaySeconds = 0 }: ScanlineProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('scanline', className)}
      style={{ animationDelay: `${delaySeconds}s` }}
    />
  )
}
