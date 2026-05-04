import { cn } from '@/lib/cn'

type DriftingFogProps = {
  className?: string
  intensity?: 'subtle' | 'medium' | 'strong'
}

export function DriftingFog({ className, intensity = 'medium' }: DriftingFogProps) {
  const opacity = intensity === 'subtle' ? 0.5 : intensity === 'strong' ? 1 : 0.75
  return (
    <div
      aria-hidden="true"
      className={cn('drifting-fog', className)}
      style={{ opacity }}
    />
  )
}
