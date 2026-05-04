import { cn } from '@/lib/cn'
import { Bird } from './animals/Bird'
import { Butterfly } from './animals/Butterfly'
import { Snake } from './animals/Snake'
import { Cheetah } from './animals/Cheetah'

type TreeOfLifeProps = {
  className?: string
}

/**
 * Detailed botanical-silhouette tree spanning the home page top to
 * bottom. Single-colour monochrome (cream at low alpha) so the tree
 * and the animals living on it read as one continuous silhouette.
 *
 * Geometry is hand-drawn from a few principles:
 *   - one sinuous trunk with light tapering by overlapping strokes
 *   - 6 main branches alternating sides
 *   - each main branch carries 2-3 sub-branches
 *   - sub-branches end in a few twigs, capped by leaf clusters
 *   - small surface roots at the very bottom
 *
 * The pulsing veins re-trace the trunk + main branches on top with a
 * slightly brighter stroke, animated on a real heart rhythm.
 */
export function TreeOfLife({ className }: TreeOfLifeProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[300px] max-w-[28vw] md:block',
        className
      )}
    >
      <svg
        viewBox="0 0 280 1000"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        {/* ── Branches & trunk silhouette (line-art, monochrome) ── */}
        <g
          stroke="rgba(232, 226, 207, 0.18)"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Trunk — sinuous, top to bottom */}
          <path
            d="M 80 1000
               C 70 880, 92 760, 80 640
               C 68 520, 96 400, 84 280
               C 76 180, 92 90, 88 0"
            strokeWidth="13"
          />

          {/* ─── Right branch · upper (≈ y=200) ────────────────── */}
          <path
            d="M 86 200 C 116 188, 156 168, 192 148"
            strokeWidth="6"
          />
          <path d="M 152 168 C 162 154, 168 138, 172 120" strokeWidth="3" />
          <path d="M 168 130 C 174 120, 178 108, 182 96" strokeWidth="1.6" />
          <path d="M 176 142 C 182 132, 186 120, 188 108" strokeWidth="1.6" />
          <path d="M 188 152 C 198 142, 206 130, 212 118" strokeWidth="3" />
          <path d="M 206 128 C 212 120, 216 110, 220 100" strokeWidth="1.6" />
          <path d="M 218 130 L 222 118" strokeWidth="0.9" />

          {/* ─── Left branch · upper-mid (≈ y=340) ──────────────── */}
          <path
            d="M 80 340 C 56 326, 32 308, 8 290"
            strokeWidth="6"
          />
          <path d="M 50 318 C 42 304, 34 290, 28 274" strokeWidth="3" />
          <path d="M 36 296 C 32 286, 28 274, 26 262" strokeWidth="1.6" />
          <path d="M 22 282 L 18 266" strokeWidth="0.9" />
          <path d="M 24 296 C 16 288, 8 280, 2 270" strokeWidth="3" />
          <path d="M 12 280 L 6 268" strokeWidth="0.9" />

          {/* ─── Right branch · mid (≈ y=480) ──────────────────── */}
          <path
            d="M 86 480 C 122 484, 162 484, 200 472"
            strokeWidth="6"
          />
          <path d="M 158 478 C 168 466, 178 452, 184 438" strokeWidth="3" />
          <path d="M 178 448 C 184 438, 190 426, 194 414" strokeWidth="1.6" />
          <path d="M 188 426 L 192 412" strokeWidth="0.9" />
          <path d="M 192 470 C 206 458, 220 442, 232 426" strokeWidth="3" />
          <path d="M 224 436 C 230 428, 236 416, 242 406" strokeWidth="1.6" />
          <path d="M 240 414 L 246 400" strokeWidth="0.9" />

          {/* ─── Left branch · lower-mid (≈ y=620) ──────────────── */}
          <path
            d="M 78 620 C 54 634, 28 644, 4 654"
            strokeWidth="6"
          />
          <path d="M 44 642 C 36 632, 28 622, 22 610" strokeWidth="3" />
          <path d="M 28 624 C 22 614, 16 604, 12 594" strokeWidth="1.6" />
          <path d="M 18 618 C 12 612, 6 604, 2 596" strokeWidth="3" />
          <path d="M 6 604 L 0 596" strokeWidth="0.9" />

          {/* ─── Right branch · lower (≈ y=780) ─────────────────── */}
          <path
            d="M 86 780 C 116 794, 154 802, 188 802"
            strokeWidth="6"
          />
          <path d="M 158 798 C 168 786, 178 772, 184 758" strokeWidth="3" />
          <path d="M 180 768 L 188 752" strokeWidth="0.9" />
          <path d="M 184 802 C 196 792, 208 778, 218 764" strokeWidth="3" />
          <path d="M 214 770 L 222 756" strokeWidth="0.9" />

          {/* ─── Left low branch (≈ y=900) ───────────────────────── */}
          <path
            d="M 78 900 C 60 906, 38 910, 18 908"
            strokeWidth="5"
          />
          <path d="M 44 906 C 36 898, 28 890, 20 882" strokeWidth="2.4" />

          {/* ─── Roots at the base (y≈990–1000) ─────────────────── */}
          <path d="M 78 990 C 60 994, 36 992, 14 988" strokeWidth="3" />
          <path d="M 88 990 C 110 994, 138 994, 168 992" strokeWidth="3" />
          <path d="M 80 998 L 60 1004" strokeWidth="2" />
          <path d="M 90 998 L 112 1004" strokeWidth="2" />
        </g>

        {/* ── Leaf clusters at branch tips (filled, monochrome) ── */}
        <g fill="rgba(232, 226, 207, 0.20)" className="tree-leaf-cluster">
          {/* Right upper */}
          <circle cx="184" cy="92" r="5" />
          <circle cx="220" cy="100" r="5" />
          <circle cx="190" cy="106" r="4" />
          <circle cx="222" cy="118" r="3.5" />
          {/* Left upper */}
          <circle cx="6" cy="262" r="5" />
          <circle cx="20" cy="266" r="4" />
          <circle cx="26" cy="262" r="3.5" />
          {/* Right mid */}
          <circle cx="192" cy="412" r="5" />
          <circle cx="246" cy="400" r="5" />
          <circle cx="222" cy="406" r="4" />
          {/* Left mid */}
          <circle cx="0" cy="596" r="5" />
          <circle cx="14" cy="592" r="4" />
          {/* Right lower */}
          <circle cx="188" cy="752" r="5" />
          <circle cx="222" cy="756" r="5" />
          <circle cx="206" cy="760" r="4" />
          {/* Left base */}
          <circle cx="20" cy="882" r="4" />
        </g>

        {/* ── Heartbeat veins overlay ─────────────────────────── */}
        <g
          fill="none"
          stroke="rgba(232, 226, 207, 0.10)"
          strokeWidth="1.4"
          strokeLinecap="round"
        >
          <path
            className="tree-vein"
            d="M 80 1000
               C 70 880, 92 760, 80 640
               C 68 520, 96 400, 84 280
               C 76 180, 92 90, 88 0"
          />
          <path
            className="tree-vein tree-vein--branch"
            d="M 86 200 C 116 188, 156 168, 192 148"
            style={{ animationDelay: '0.12s' }}
          />
          <path
            className="tree-vein tree-vein--branch"
            d="M 80 340 C 56 326, 32 308, 8 290"
            style={{ animationDelay: '0.24s' }}
          />
          <path
            className="tree-vein tree-vein--branch"
            d="M 86 480 C 122 484, 162 484, 200 472"
            style={{ animationDelay: '0.36s' }}
          />
          <path
            className="tree-vein tree-vein--branch"
            d="M 78 620 C 54 634, 28 644, 4 654"
            style={{ animationDelay: '0.48s' }}
          />
          <path
            className="tree-vein tree-vein--branch"
            d="M 86 780 C 116 794, 154 802, 188 802"
            style={{ animationDelay: '0.60s' }}
          />
        </g>
      </svg>

      {/* ── Animal overlays ──────────────────────────────────── */}
      <Bird className="absolute" style={{ top: '7.5%', left: '180px' }} />
      <Butterfly className="absolute" style={{ top: '32%', left: '210px' }} />
      <Snake className="absolute" style={{ top: '52%', left: '60px' }} />
      <Cheetah className="absolute" style={{ top: '76%', left: '160px' }} />
    </div>
  )
}
