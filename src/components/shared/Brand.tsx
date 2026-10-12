import { Link } from '@/i18n/navigation'

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="TG Tech Consulting">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
      <span className="brand-name">TG TECH<small>Consulting</small></span>
    </Link>
  )
}
