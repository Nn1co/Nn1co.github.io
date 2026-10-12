export function Chevron({ direction = 'right' }: { direction?: 'right' | 'down' }) {
  return (
    <svg className="arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={direction === 'down' ? 'm5 9 7 7 7-7' : 'm9 5 7 7-7 7'} />
    </svg>
  )
}
