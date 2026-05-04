import { cn } from '@/lib/cn'

type LeafFallProps = {
  count?: number
  className?: string
}

function rand(i: number, salt = 1) {
  const x = Math.sin((i + 1) * salt * 412.137) * 43758.5453
  return x - Math.floor(x)
}

const LEAF_PATHS = [
  // simple curved leaf
  'M 8 0 C 14 4 14 12 8 16 C 2 12 2 4 8 0 Z',
  // pointier leaf
  'M 8 0 C 12 5 12 11 8 16 C 4 11 4 5 8 0 Z',
  // rounder pollen blob
  'M 8 0 C 13 3 13 13 8 16 C 3 13 3 3 8 0 Z',
]

export function LeafFall({ count = 14, className }: LeafFallProps) {
  return (
    <div aria-hidden="true" className={cn('leaf-fall', className)}>
      {Array.from({ length: count }).map((_, i) => {
        const left = rand(i, 1) * 100
        const duration = 18 + rand(i, 2) * 22
        const delay = -rand(i, 3) * duration
        const drift = (rand(i, 4) - 0.5) * 220
        const spin = rand(i, 5) > 0.5 ? 1 : -1
        const path = LEAF_PATHS[i % LEAF_PATHS.length]
        const palette = i % 3
        const fill =
          palette === 0
            ? 'rgba(52,211,153,0.55)'
            : palette === 1
              ? 'rgba(212,165,95,0.6)'
              : 'rgba(103,232,249,0.45)'
        const size = 8 + rand(i, 6) * 10

        return (
          <svg
            key={i}
            className="leaf"
            viewBox="0 0 16 16"
            width={size}
            height={size}
            style={{
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              ['--leaf-x' as string]: `${drift}px`,
              ['--leaf-spin' as string]: `${spin * (180 + rand(i, 7) * 360)}deg`,
            }}
          >
            <path d={path} fill={fill} />
          </svg>
        )
      })}
    </div>
  )
}
