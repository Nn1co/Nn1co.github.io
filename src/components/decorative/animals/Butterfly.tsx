import { cn } from '@/lib/cn'

type ButterflyProps = {
  className?: string
  style?: React.CSSProperties
}

/**
 * Butterfly fluttering around a branch. Two stacked CSS animations:
 *   - outer wrapper bobs along an organic figure-eight-ish path
 *   - inner svg flaps wings via scaleX cycling
 * Pure CSS, runs continuously.
 */
export function Butterfly({ className, style }: ButterflyProps) {
  return (
    <div className={cn('animal animal--butterfly butterfly-bob', className)} style={style}>
      <svg width="32" height="28" viewBox="0 0 32 28" className="animal-svg butterfly-flutter">
        {/* Body */}
        <line
          x1="16"
          y1="4"
          x2="16"
          y2="22"
          stroke="rgba(232, 226, 207, 0.85)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Antennae */}
        <path
          d="M 16 4 Q 13 2, 12 0"
          stroke="rgba(232, 226, 207, 0.7)"
          strokeWidth="0.7"
          fill="none"
        />
        <path
          d="M 16 4 Q 19 2, 20 0"
          stroke="rgba(232, 226, 207, 0.7)"
          strokeWidth="0.7"
          fill="none"
        />
        {/* Upper wings */}
        <ellipse cx="9" cy="9" rx="6" ry="5" fill="rgba(103, 232, 249, 0.7)" />
        <ellipse cx="23" cy="9" rx="6" ry="5" fill="rgba(103, 232, 249, 0.7)" />
        {/* Lower wings */}
        <ellipse cx="10" cy="17" rx="4" ry="3" fill="rgba(52, 211, 153, 0.65)" />
        <ellipse cx="22" cy="17" rx="4" ry="3" fill="rgba(52, 211, 153, 0.65)" />
        {/* Wing tips highlight */}
        <circle cx="6" cy="7" r="0.8" fill="rgba(212, 165, 95, 0.6)" />
        <circle cx="26" cy="7" r="0.8" fill="rgba(212, 165, 95, 0.6)" />
      </svg>
    </div>
  )
}
