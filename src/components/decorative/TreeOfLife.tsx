import { cn } from '@/lib/cn'
import { Bird } from './animals/Bird'
import { Butterfly } from './animals/Butterfly'
import { Snake } from './animals/Snake'
import { Cheetah } from './animals/Cheetah'

type TreeOfLifeProps = {
  className?: string
}

const TONE = 'rgba(232, 226, 207, 0.20)'
const TONE_SOFT = 'rgba(232, 226, 207, 0.14)'

/**
 * Tree silhouette: trunk + branches built from filled paths and stacked
 * stroke layers that genuinely taper from base to tip; leaves drawn as
 * rotated ellipses in clusters so they read as real foliage rather than
 * plain dots. All in a single low-alpha cream — silhouette only.
 *
 * Heartbeat veins re-trace the trunk + main branches on top of the
 * silhouette.
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
        {/* ── Trunk silhouette: closed filled path with sinuous taper ── */}
        <path
          fill={TONE}
          d="M 84 0
             C 80 60, 92 130, 84 200
             C 76 280, 96 360, 86 440
             C 76 520, 100 600, 88 680
             C 76 760, 102 840, 92 920
             C 90 950, 98 980, 110 1000
             L 60 1000
             C 70 980, 76 950, 76 920
             C 64 840, 90 760, 76 680
             C 62 600, 88 520, 76 440
             C 64 360, 86 280, 78 200
             C 70 130, 86 60, 80 0
             Z"
        />

        {/* ── Surface roots at the base ── */}
        <g
          fill="none"
          stroke={TONE}
          strokeLinecap="round"
        >
          <path d="M 70 988 C 50 994, 30 996, 10 994" strokeWidth="5" />
          <path d="M 100 988 C 130 994, 160 996, 188 994" strokeWidth="5" />
          <path d="M 64 996 C 50 1002, 36 1006, 22 1010" strokeWidth="3" />
          <path d="M 110 996 C 130 1002, 152 1006, 174 1008" strokeWidth="3" />
          <path d="M 60 1000 L 40 1010" strokeWidth="2" />
          <path d="M 116 1000 L 138 1012" strokeWidth="2" />
        </g>

        {/* ──────────────────────────────────────────────────────────
            BRANCHES — each is built from 3 stacked stroke paths of
            decreasing width so the visual silhouette tapers from base
            to tip. The first stroke (widest) covers the whole length
            up to the tip; following strokes are slightly shorter so
            the wider stroke stays visible at the joint.
            ────────────────────────────────────────────────────────── */}
        <g fill="none" stroke={TONE} strokeLinecap="round" strokeLinejoin="round">
          {/* ─── Right branch · upper (around y=200) ─────────────── */}
          <path d="M 86 198 C 116 192, 152 176, 184 158 S 220 138, 232 130" strokeWidth="9" />
          <path d="M 92 198 C 116 192, 152 176, 184 158 S 218 140, 226 134" strokeWidth="6" />
          <path d="M 98 198 C 116 192, 152 178, 184 162 S 212 146, 218 140" strokeWidth="3" />
          {/* sub-branches */}
          <path d="M 168 168 C 178 152, 188 134, 196 116" strokeWidth="3.5" />
          <path d="M 172 168 C 180 154, 190 138, 198 122" strokeWidth="2" />
          <path d="M 200 146 C 212 132, 222 116, 230 102" strokeWidth="3" />
          <path d="M 204 148 C 214 134, 224 120, 232 110" strokeWidth="1.6" />
          {/* twigs */}
          <path d="M 196 116 L 200 100" strokeWidth="1" />
          <path d="M 230 102 L 236 90" strokeWidth="1" />
          <path d="M 220 116 L 224 104" strokeWidth="1" />

          {/* ─── Left branch · upper-mid (around y=340) ──────────── */}
          <path d="M 78 342 C 58 332, 36 320, 18 304 S -6 290, -10 286" strokeWidth="9" />
          <path d="M 76 342 C 58 332, 36 320, 18 304 S -2 292, -8 290" strokeWidth="6" />
          <path d="M 74 344 C 58 334, 36 322, 18 308 S 2 296, -2 294" strokeWidth="3" />
          {/* sub-branches */}
          <path d="M 50 322 C 42 308, 34 290, 28 270" strokeWidth="3.5" />
          <path d="M 48 322 C 40 308, 32 290, 26 274" strokeWidth="2" />
          <path d="M 22 304 C 12 290, 4 274, -4 260" strokeWidth="3" />
          <path d="M 20 306 C 10 292, 2 278, -6 266" strokeWidth="1.6" />
          {/* twigs */}
          <path d="M 28 270 L 26 256" strokeWidth="1" />
          <path d="M -4 260 L -10 250" strokeWidth="1" />

          {/* ─── Right branch · mid (around y=480) ───────────────── */}
          <path d="M 88 480 C 124 482, 162 480, 198 472 S 232 462, 246 458" strokeWidth="9" />
          <path d="M 94 480 C 124 482, 162 480, 198 472 S 228 464, 240 460" strokeWidth="6" />
          <path d="M 100 480 C 124 482, 160 481, 196 474 S 222 466, 234 462" strokeWidth="3" />
          {/* sub-branches */}
          <path d="M 178 478 C 188 464, 198 448, 206 432" strokeWidth="3.5" />
          <path d="M 180 478 C 190 466, 200 452, 208 436" strokeWidth="2" />
          <path d="M 220 466 C 232 452, 244 436, 254 420" strokeWidth="3" />
          <path d="M 224 466 C 236 454, 246 438, 256 424" strokeWidth="1.6" />
          {/* twigs */}
          <path d="M 206 432 L 208 416" strokeWidth="1" />
          <path d="M 254 420 L 260 408" strokeWidth="1" />
          <path d="M 230 446 L 232 432" strokeWidth="1" />

          {/* ─── Left branch · lower-mid (around y=620) ──────────── */}
          <path d="M 76 620 C 56 632, 32 644, 12 654 S -6 660, -10 660" strokeWidth="9" />
          <path d="M 76 622 C 56 634, 32 646, 12 656 S -4 662, -8 662" strokeWidth="6" />
          <path d="M 76 624 C 58 634, 36 644, 18 652 S 4 658, 0 658" strokeWidth="3" />
          {/* sub-branches */}
          <path d="M 46 642 C 38 632, 30 622, 24 612" strokeWidth="3.5" />
          <path d="M 30 650 C 22 644, 12 638, 4 632" strokeWidth="3" />
          <path d="M 24 612 C 18 602, 12 594, 6 588" strokeWidth="1.6" />
          {/* twigs */}
          <path d="M 4 632 L -2 626" strokeWidth="1" />

          {/* ─── Right branch · lower (around y=780) ─────────────── */}
          <path d="M 88 780 C 120 790, 156 800, 188 802 S 220 802, 230 800" strokeWidth="9" />
          <path d="M 94 780 C 120 790, 156 800, 188 802 S 218 803, 226 802" strokeWidth="6" />
          <path d="M 100 782 C 122 791, 156 800, 188 803 S 214 804, 222 803" strokeWidth="3" />
          {/* sub-branches */}
          <path d="M 162 796 C 172 786, 182 774, 188 760" strokeWidth="3.5" />
          <path d="M 200 802 C 212 794, 222 782, 230 770" strokeWidth="3" />
          <path d="M 188 760 L 192 746" strokeWidth="1.5" />
          <path d="M 230 770 L 238 756" strokeWidth="1.5" />

          {/* ─── Left low branch (around y=900) ──────────────────── */}
          <path d="M 76 902 C 60 906, 40 910, 22 912" strokeWidth="6" />
          <path d="M 76 904 C 60 908, 40 912, 22 914" strokeWidth="3" />
          <path d="M 38 910 C 30 902, 22 894, 14 886" strokeWidth="2" />
        </g>

        {/* ──────────────────────────────────────────────────────────
            LEAVES — clusters of rotated ellipses give organic foliage
            shapes (almond-like) rather than plain dots. Each cluster
            sits at a branch tip and combines 4-7 leaves at varied
            angles + sizes.
            ────────────────────────────────────────────────────────── */}
        <g fill={TONE} className="tree-leaf-cluster">
          {/* Right upper cluster (around 200, 100) */}
          <ellipse cx="200" cy="100" rx="3" ry="6" transform="rotate(-30 200 100)" />
          <ellipse cx="206" cy="106" rx="2.6" ry="5" transform="rotate(20 206 106)" />
          <ellipse cx="194" cy="108" rx="2.4" ry="4.6" transform="rotate(-50 194 108)" />
          <ellipse cx="208" cy="96" rx="2.2" ry="4.2" transform="rotate(45 208 96)" />
          <ellipse cx="198" cy="92" rx="2.4" ry="4.4" transform="rotate(0 198 92)" />

          <ellipse cx="236" cy="90" rx="3" ry="5.4" transform="rotate(35 236 90)" />
          <ellipse cx="240" cy="96" rx="2.6" ry="4.6" transform="rotate(-30 240 96)" />
          <ellipse cx="244" cy="84" rx="2.4" ry="4.2" transform="rotate(60 244 84)" />
          <ellipse cx="232" cy="98" rx="2.2" ry="4" transform="rotate(-60 232 98)" />

          <ellipse cx="226" cy="120" rx="2.4" ry="4.4" transform="rotate(-20 226 120)" />
          <ellipse cx="222" cy="112" rx="2.6" ry="4.6" transform="rotate(15 222 112)" />

          {/* Left upper cluster (around -10, 250) */}
          <ellipse cx="-4" cy="252" rx="3" ry="5.6" transform="rotate(40 -4 252)" />
          <ellipse cx="2" cy="246" rx="2.6" ry="4.8" transform="rotate(-20 2 246)" />
          <ellipse cx="6" cy="258" rx="2.4" ry="4.4" transform="rotate(60 6 258)" />
          <ellipse cx="-10" cy="248" rx="2.4" ry="4.2" transform="rotate(-50 -10 248)" />

          <ellipse cx="26" cy="256" rx="2.6" ry="4.8" transform="rotate(-10 26 256)" />
          <ellipse cx="22" cy="250" rx="2.4" ry="4.4" transform="rotate(40 22 250)" />
          <ellipse cx="30" cy="262" rx="2.2" ry="4" transform="rotate(-40 30 262)" />

          {/* Right mid cluster (around 254, 420) */}
          <ellipse cx="254" cy="420" rx="3" ry="5.6" transform="rotate(-30 254 420)" />
          <ellipse cx="260" cy="414" rx="2.6" ry="4.8" transform="rotate(20 260 414)" />
          <ellipse cx="262" cy="426" rx="2.4" ry="4.4" transform="rotate(50 262 426)" />
          <ellipse cx="248" cy="416" rx="2.4" ry="4.2" transform="rotate(-50 248 416)" />
          <ellipse cx="252" cy="430" rx="2.2" ry="4" transform="rotate(0 252 430)" />

          <ellipse cx="208" cy="416" rx="2.6" ry="4.6" transform="rotate(-30 208 416)" />
          <ellipse cx="212" cy="412" rx="2.4" ry="4.2" transform="rotate(20 212 412)" />

          {/* Left low-mid cluster (around -2, 626) */}
          <ellipse cx="-2" cy="628" rx="3" ry="5.6" transform="rotate(40 -2 628)" />
          <ellipse cx="4" cy="622" rx="2.6" ry="4.8" transform="rotate(-20 4 622)" />
          <ellipse cx="-8" cy="624" rx="2.4" ry="4.2" transform="rotate(-60 -8 624)" />
          <ellipse cx="6" cy="588" rx="2.6" ry="4.4" transform="rotate(0 6 588)" />
          <ellipse cx="0" cy="592" rx="2.4" ry="4" transform="rotate(40 0 592)" />

          {/* Right low cluster (around 190, 760) */}
          <ellipse cx="192" cy="746" rx="3" ry="5.4" transform="rotate(-20 192 746)" />
          <ellipse cx="196" cy="740" rx="2.6" ry="4.6" transform="rotate(30 196 740)" />
          <ellipse cx="186" cy="744" rx="2.4" ry="4.2" transform="rotate(-50 186 744)" />

          <ellipse cx="238" cy="756" rx="3" ry="5.4" transform="rotate(45 238 756)" />
          <ellipse cx="244" cy="752" rx="2.6" ry="4.6" transform="rotate(-15 244 752)" />
          <ellipse cx="234" cy="748" rx="2.4" ry="4.2" transform="rotate(-50 234 748)" />

          {/* Left base cluster (around 14, 886) */}
          <ellipse cx="14" cy="886" rx="2.6" ry="4.6" transform="rotate(30 14 886)" />
          <ellipse cx="20" cy="880" rx="2.4" ry="4.2" transform="rotate(-20 20 880)" />
          <ellipse cx="8" cy="892" rx="2.2" ry="4" transform="rotate(-50 8 892)" />
        </g>

        {/* ──────────────────────────────────────────────────────────
            HEARTBEAT VEINS — re-trace trunk + main branches with their
            own stroke. The CSS class `tree-vein` carries the heart-
            rhythm animation; same monochrome cream, no glow.
            ────────────────────────────────────────────────────────── */}
        <g fill="none" stroke={TONE_SOFT} strokeLinecap="round" strokeWidth="1.4">
          <path
            className="tree-vein"
            d="M 82 0 C 78 100, 90 200, 82 300 C 74 400, 96 500, 84 600 C 72 700, 100 800, 88 900 L 86 1000"
          />
          <path
            className="tree-vein tree-vein--branch"
            d="M 86 198 C 116 192, 152 176, 184 158 S 220 138, 232 130"
            style={{ animationDelay: '0.10s' }}
          />
          <path
            className="tree-vein tree-vein--branch"
            d="M 78 342 C 58 332, 36 320, 18 304 S -6 290, -10 286"
            style={{ animationDelay: '0.22s' }}
          />
          <path
            className="tree-vein tree-vein--branch"
            d="M 88 480 C 124 482, 162 480, 198 472 S 232 462, 246 458"
            style={{ animationDelay: '0.34s' }}
          />
          <path
            className="tree-vein tree-vein--branch"
            d="M 76 620 C 56 632, 32 644, 12 654 S -6 660, -10 660"
            style={{ animationDelay: '0.46s' }}
          />
          <path
            className="tree-vein tree-vein--branch"
            d="M 88 780 C 120 790, 156 800, 188 802 S 220 802, 230 800"
            style={{ animationDelay: '0.58s' }}
          />
        </g>
      </svg>

      {/* ── Animal overlays (positioned in % of the wrapper height) ── */}
      <Bird className="absolute" style={{ top: '7.5%', left: '180px' }} />
      <Butterfly className="absolute" style={{ top: '32%', left: '210px' }} />
      <Snake className="absolute" style={{ top: '52%', left: '60px' }} />
      <Cheetah className="absolute" style={{ top: '76%', left: '160px' }} />
    </div>
  )
}
