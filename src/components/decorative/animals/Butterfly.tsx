import { cn } from '@/lib/cn'

type ButterflyProps = {
  className?: string
  style?: React.CSSProperties
}

/**
 * Butterfly fluttering around a branch. Two stacked CSS animations:
 * outer wrapper bobs, inner svg flaps wings via scaleX cycling.
 * Single-colour silhouette to match the tree.
 */
export function Butterfly({ className, style }: ButterflyProps) {
  const fill = 'rgba(232, 226, 207, 0.20)'
  const fillStrong = 'rgba(232, 226, 207, 0.30)'

  return (
    <div className={cn('animal animal--butterfly butterfly-bob', className)} style={style}>
      <svg width="32" height="28" viewBox="0 0 32 28" className="animal-svg butterfly-flutter">
        <line
          x1="16"
          y1="4"
          x2="16"
          y2="22"
          stroke={fillStrong}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M 16 4 Q 13 2, 12 0"
          stroke={fill}
          strokeWidth="0.7"
          fill="none"
        />
        <path
          d="M 16 4 Q 19 2, 20 0"
          stroke={fill}
          strokeWidth="0.7"
          fill="none"
        />
        <ellipse cx="9" cy="9" rx="6" ry="5" fill={fill} />
        <ellipse cx="23" cy="9" rx="6" ry="5" fill={fill} />
        <ellipse cx="10" cy="17" rx="4" ry="3" fill={fill} />
        <ellipse cx="22" cy="17" rx="4" ry="3" fill={fill} />
        <circle cx="6" cy="7" r="0.8" fill="rgba(0,0,0,0.30)" />
        <circle cx="26" cy="7" r="0.8" fill="rgba(0,0,0,0.30)" />
      </svg>
    </div>
  )
}
