import { cn } from '@/lib/cn'

type Node = { x: number; y: number }

type DataNodesProps = {
  className?: string
  nodes?: Node[]
  /**
   * Connections by index pairs.
   */
  links?: Array<[number, number]>
  width?: number
  height?: number
}

const DEFAULT_NODES: Node[] = [
  { x: 40, y: 60 },
  { x: 180, y: 30 },
  { x: 320, y: 110 },
  { x: 480, y: 60 },
  { x: 620, y: 150 },
  { x: 760, y: 80 },
  { x: 900, y: 130 },
  { x: 1080, y: 50 },
]

const DEFAULT_LINKS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [1, 4],
  [3, 6],
]

export function DataNodes({
  className,
  nodes = DEFAULT_NODES,
  links = DEFAULT_LINKS,
  width = 1200,
  height = 200,
}: DataNodesProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={cn('absolute inset-0 h-full w-full pointer-events-none', className)}
    >
      {links.map(([a, b], idx) => {
        const A = nodes[a]
        const B = nodes[b]
        if (!A || !B) return null
        return (
          <line
            key={idx}
            className="data-line"
            x1={A.x}
            y1={A.y}
            x2={B.x}
            y2={B.y}
            style={{ animationDelay: `${(idx % 4) * 0.7}s` }}
          />
        )
      })}
      {nodes.map((node, idx) => (
        <circle key={idx} className="data-node" cx={node.x} cy={node.y} r={3} />
      ))}
    </svg>
  )
}
