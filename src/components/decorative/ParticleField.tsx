import { cn } from '@/lib/cn'

type ParticleFieldProps = {
  count?: number
  density?: 'low' | 'med' | 'high'
  palette?: 'gold' | 'jade' | 'cyan' | 'mixed'
  className?: string
}

// Deterministic pseudo-random (seeded by index) so SSR and CSR match exactly.
function rand(i: number, salt = 1) {
  const x = Math.sin((i + 1) * salt * 928.371) * 43758.5453
  return x - Math.floor(x)
}

const HUES = ['gold', 'jade', 'cyan'] as const

export function ParticleField({
  count,
  density = 'med',
  palette = 'mixed',
  className,
}: ParticleFieldProps) {
  const total = count ?? (density === 'low' ? 14 : density === 'high' ? 38 : 24)

  return (
    <div aria-hidden="true" className={cn('particle-field', className)}>
      {Array.from({ length: total }).map((_, i) => {
        const left = rand(i, 1) * 100
        const top = rand(i, 2) * 100
        const duration = 14 + rand(i, 3) * 22
        const delay = -rand(i, 4) * duration
        const opacity = 0.25 + rand(i, 5) * 0.55
        const driftX = (rand(i, 6) - 0.5) * 160
        const driftY = -(120 + rand(i, 7) * 240)
        const big = rand(i, 8) > 0.78
        const hue =
          palette === 'mixed'
            ? HUES[Math.floor(rand(i, 9) * 3) % 3]
            : palette

        return (
          <span
            key={i}
            className={cn(
              'particle',
              hue === 'jade' && 'particle--jade',
              hue === 'cyan' && 'particle--cyan',
              big && 'particle--big'
            )}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              ['--p-x' as string]: `${driftX}px`,
              ['--p-y' as string]: `${driftY}px`,
              ['--p-opacity' as string]: opacity,
            }}
          />
        )
      })}
    </div>
  )
}
