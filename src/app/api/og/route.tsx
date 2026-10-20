import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = (searchParams.get('title') ?? 'Easier NetSuite.').slice(0, 120)
  const subtitle = (
    searchParams.get('subtitle') ?? 'Custom applications and connected AI assistants'
  ).slice(0, 140)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          color: '#17283F',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            color: '#17283F',
            textTransform: 'uppercase',
            letterSpacing: 4,
            fontFamily: 'monospace',
          }}
        >
          <span>TG TECH · CONSULTING</span>
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
              color: '#275BE8',
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div
            style={{
              width: 60,
              height: 1,
              background: '#E5EAF1',
            }}
          />
          <div
            style={{
              fontSize: 26,
              color: '#5F6B7C',
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
