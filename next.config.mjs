import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const config = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(
      new URL(import.meta.url).pathname,
      'src'
    )
    // NOTE: https://github.com/prisma/prisma/issues/6564 の対応
    config.externals = ['_http_common']
    return config
  },
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
      'pbs.twimg.com',
      'avatars.githubusercontent.com',
    ],
  },
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/today',
        permanent: true,
      },
    ]
  },
}

export default config
