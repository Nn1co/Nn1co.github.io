import { cn } from '@/lib/cn'

type SnakeProps = {
  className?: string
  style?: React.CSSProperties
}

/**
 * Snake coiled around the trunk. Continuously slithers — small lateral
 * sway with a head bob, all CSS-only (no IntersectionObserver needed,
 * it should always feel alive in the periphery).
 */
export function Snake({ className, style }: SnakeProps) {
  return (
    <div className={cn('animal animal--snake', className)} style={style}>
      <svg width="120" height="60" viewBox="0 0 120 60" className="animal-svg">
        {/* Body — S-curve looping around an imaginary branch */}
        <path
          className="snake-body"
          d="M 4 36 C 22 22, 38 50, 56 36 S 88 22, 104 36"
          stroke="rgba(52, 211, 153, 0.65)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Inner highlight — keeps the body alive */}
        <path
          d="M 4 36 C 22 22, 38 50, 56 36 S 88 22, 104 36"
          stroke="rgba(103, 232, 249, 0.35)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Head */}
        <g className="snake-head">
          <ellipse cx="106" cy="36" rx="6" ry="3.5" fill="rgba(52, 211, 153, 0.85)" />
          <circle cx="109" cy="35" r="0.8" fill="#0A1410" />
          {/* Tongue */}
          <path
            className="snake-tongue"
            d="M 112 36 L 116 35 M 112 36 L 116 37"
            stroke="rgba(212, 165, 95, 0.9)"
            strokeWidth="0.8"
          />
        </g>
      </svg>
    </div>
  )
}
