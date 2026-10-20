import localFont from 'next/font/local'

export const fontBody = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-body',
  display: 'swap',
  preload: true,
})

export const fontMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-mono',
  display: 'swap',
  preload: false,
})
