import { cn } from '@/lib/cn'

type OrganicVineProps = {
  className?: string
  variant?: 'left' | 'right'
}

/**
 * A hand-drawn-feeling SVG vine with three small leaves.
 * Sways gently after it draws itself in.
 */
export function OrganicVine({ className, variant = 'left' }: OrganicVineProps) {
  const flip = variant === 'right' ? 'scale(-1,1)' : undefined
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 600"
      preserveAspectRatio="xMidYMin meet"
      className={cn('vine-svg', className)}
      style={{ transform: flip }}
    >
      <g className="vine-sway">
        <path
          className="vine-path organic-vine"
          d="M 100 0
             C 60 80, 140 160, 80 240
             S 40 380, 110 460
             S 60 560, 100 600"
          style={{ animationDuration: '6s' }}
        />
        {/* leaves grafted onto the curve */}
        <g className="vine-leaf" style={{ transformOrigin: '85px 200px' }}>
          <path
            d="M 85 200 q 20 -10 30 -28 q -22 4 -30 28 z"
            fill="rgba(52,211,153,0.7)"
          />
        </g>
        <g
          className="vine-leaf vine-leaf--alt"
          style={{ transformOrigin: '95px 360px' }}
        >
          <path
            d="M 95 360 q -22 -8 -32 -28 q 24 6 32 28 z"
            fill="rgba(52,211,153,0.6)"
          />
        </g>
        <g className="vine-leaf" style={{ transformOrigin: '105px 520px' }}>
          <path
            d="M 105 520 q 18 -10 28 -26 q -22 6 -28 26 z"
            fill="rgba(103,232,249,0.55)"
          />
        </g>
      </g>
    </svg>
  )
}
