import { cn } from '@/lib/cn'

type SectionWatermarkProps = {
  children: React.ReactNode
  align?: 'left' | 'right' | 'center'
  className?: string
}

export function SectionWatermark({
  children,
  align = 'left',
  className,
}: SectionWatermarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'section-watermark',
        align === 'right' && 'section-watermark--right',
        align === 'center' && 'section-watermark--center',
        className
      )}
    >
      {children}
    </span>
  )
}
