import { cn } from '@/lib/cn'
import { ParticleField } from './ParticleField'
import { DriftingFog } from './DriftingFog'
import { TechGrid } from './TechGrid'

type AmbientLayerProps = {
  variant?: 'hero' | 'soft' | 'dense' | 'fog-only' | 'grid-only'
  className?: string
}

/**
 * Composes the ambient backdrop layers used to give every section
 * a sense of life even when the user is idle.
 */
export function AmbientLayer({ variant = 'soft', className }: AmbientLayerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      {variant !== 'fog-only' && <TechGrid />}
      {variant !== 'grid-only' && (
        <DriftingFog intensity={variant === 'dense' ? 'strong' : variant === 'hero' ? 'medium' : 'subtle'} />
      )}
      {variant === 'hero' && <ParticleField density="med" palette="mixed" />}
      {variant === 'dense' && <ParticleField density="high" palette="mixed" />}
      {variant === 'soft' && <ParticleField density="low" palette="gold" />}
    </div>
  )
}
