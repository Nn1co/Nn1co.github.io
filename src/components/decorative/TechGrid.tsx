import { cn } from '@/lib/cn'

type TechGridProps = {
  className?: string
}

export function TechGrid({ className }: TechGridProps) {
  return <div aria-hidden="true" className={cn('tech-grid', className)} />
}
