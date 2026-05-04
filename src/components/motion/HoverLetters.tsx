import { cn } from '@/lib/cn'

type HoverLettersProps = {
  children: string
  className?: string
  intensity?: 'soft' | 'wave'
}

/**
 * Splits a text into per-character spans so a CSS hover cascade can ripple
 * across the letters with staggered timing — purely CSS, no JS at runtime.
 *
 * Two variants:
 *   - 'soft'  : letters lift slightly, keep their tint
 *   - 'wave'  : alternate up/down rotation for a leaf-rustle feel
 */
export function HoverLetters({
  children,
  className,
  intensity = 'wave',
}: HoverLettersProps) {
  const chars = Array.from(children)
  return (
    <span
      className={cn(
        'hover-letters inline-block',
        intensity === 'wave' ? 'hover-letters--wave' : 'hover-letters--soft',
        className
      )}
    >
      {chars.map((c, i) => (
        <span
          key={i}
          className="hover-letter inline-block"
          style={{ ['--i' as string]: i }}
          aria-hidden={c === ' '}
        >
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </span>
  )
}
