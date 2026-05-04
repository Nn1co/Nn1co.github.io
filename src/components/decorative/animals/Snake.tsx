import { cn } from '@/lib/cn'

type SnakeProps = {
  className?: string
  style?: React.CSSProperties
}

/**
 * Snake coiled around the trunk. Continuously slithers — small lateral
 * sway with a head bob and tongue flick. Single-colour silhouette to
 * match the tree.
 */
export function Snake({ className, style }: SnakeProps) {
  const fill = 'rgba(232, 226, 207, 0.22)'
  const fillStrong = 'rgba(232, 226, 207, 0.30)'

  return (
    <div className={cn('animal animal--snake', className)} style={style}>
      <svg width="120" height="60" viewBox="0 0 120 60" className="animal-svg">
        <path
          className="snake-body"
          d="M 4 36 C 22 22, 38 50, 56 36 S 88 22, 104 36"
          stroke={fill}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <g className="snake-head">
          <ellipse cx="106" cy="36" rx="6" ry="3.5" fill={fillStrong} />
          <circle cx="109" cy="35" r="0.8" fill="rgba(0,0,0,0.65)" />
          <path
            className="snake-tongue"
            d="M 112 36 L 116 35 M 112 36 L 116 37"
            stroke={fillStrong}
            strokeWidth="0.8"
          />
        </g>
      </svg>
    </div>
  )
}
