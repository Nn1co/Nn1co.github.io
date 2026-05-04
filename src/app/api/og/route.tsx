import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = (searchParams.get('title') ?? 'TG TECH · CONSULTING').slice(0, 120)
  const subtitle = (
    searchParams.get('subtitle') ?? 'NetSuite consulting & AI integration · Benelux'
  ).slice(0, 140)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0E1410',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          color: '#E8E2CF',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            color: '#D4A55F',
            textTransform: 'uppercase',
            letterSpacing: 4,
            fontFamily: 'monospace',
          }}
        >
          <span>№ TG TECH · CONSULTING</span>
          <span>BENELUX</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            position: 'relative',
          }}
        >
          <div
            style={{
              fontSize: 80,
              lineHeight: 1.05,
              letterSpacing: -1,
              color: '#E8E2CF',
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div
            style={{
              width: 60,
              height: 1,
              background: 'rgba(232,226,207,0.25)',
            }}
          />
          <div
            style={{
              fontSize: 26,
              color: 'rgba(232,226,207,0.72)',
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
