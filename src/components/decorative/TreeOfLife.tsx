import { cn } from '@/lib/cn'
import { Bird } from './animals/Bird'
import { Butterfly } from './animals/Butterfly'
import { Snake } from './animals/Snake'
import { Cheetah } from './animals/Cheetah'

type TreeOfLifeProps = {
  className?: string
}

/**
 * Big organic tree spanning the home page top-to-bottom.
 *
 * Layered SVG:
 *   - branches/trunk in a soft cream tone (almost background)
 *   - heartbeat veins in jade glow that pulses very subtly
 *
 * Animals are absolutely-positioned overlays (HTML <-> SVG) so they
 * can carry their own client-side intersection observers without
 * forcing the whole tree to be a client component.
 */
export function TreeOfLife({ className }: TreeOfLifeProps) {
  // Primary trunk path — sinuous, top to bottom of the canvas
  const trunk =
    'M 70 0 ' +
    'C 90 80, 50 160, 80 240 ' +
    'S 110 400, 80 500 ' +
    'S 50 660, 90 760 ' +
    'S 110 880, 80 980'

  // Branches reach out to the right at the heights where animals live
  const branches = [
    'M 78 80 C 110 70, 160 65, 220 80', // bird perch
    'M 82 320 C 140 305, 220 320, 260 295', // butterfly area
    'M 80 540 C 120 545, 160 530, 210 555', // snake area
    'M 88 760 C 140 745, 200 760, 250 780', // upper cheetah branch
    'M 80 920 C 120 935, 180 925, 230 940', // lower
  ]

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[280px] max-w-[28vw] md:block',
        className
      )}
    >
      <svg
        viewBox="0 0 280 1000"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        {/* Trunk and branches — wide cream stroke */}
        <path d={trunk} className="tree-trunk" />
        {branches.map((d, i) => (
          <path key={`b-${i}`} d={d} className="tree-branch" />
        ))}

        {/* Heartbeat veins — narrow jade stroke with pulsing animation */}
        <path d={trunk} className="tree-vein" />
        {branches.map((d, i) => (
          <path
            key={`v-${i}`}
            d={d}
            className="tree-vein tree-vein--branch"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}

        {/* Tiny leaf clusters at branch tips */}
        <g className="tree-leaf-cluster">
          <circle cx="220" cy="80" r="5" />
          <circle cx="260" cy="295" r="4" />
          <circle cx="210" cy="555" r="4" />
          <circle cx="250" cy="780" r="5" />
          <circle cx="230" cy="940" r="4" />
        </g>
      </svg>

      {/* Animal overlays — positioned in % of the wrapper height */}
      <Bird className="absolute" style={{ top: '6.5%', left: '170px' }} />
      <Butterfly className="absolute" style={{ top: '30%', left: '210px' }} />
      <Snake className="absolute" style={{ top: '52%', left: '60px' }} />
      <Cheetah className="absolute" style={{ top: '74%', left: '155px' }} />
    </div>
  )
}
