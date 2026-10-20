import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/about', destination: '/', permanent: true },
      { source: '/:locale(fr|en)/about', destination: '/:locale', permanent: true },
    ]
  },
}

export default withNextIntl(nextConfig)
