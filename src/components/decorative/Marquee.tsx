import { cn } from '@/lib/cn'

type MarqueeProps = {
  items: string[]
  className?: string
}

export function Marquee({ items, className }: MarqueeProps) {
  if (!items.length) return null

  // Render the items twice so the loop is seamless when translateX goes to -50%
  const looped = [...items, ...items]

  return (
    <div
      role="presentation"
      className={cn(
        'marquee border-y border-rule-soft py-5 font-mono text-xs uppercase tracking-widest text-cream-dim',
        className
      )}
    >
      <div className="marquee-track gap-12 px-6">
        {looped.map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className="flex shrink-0 items-center gap-12 whitespace-nowrap"
          >
            <span className="text-gold">·</span>
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
