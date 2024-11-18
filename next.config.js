/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/**',
            }
        ],
    },
    headers: async () => {
        return [
            {
                source: '/experience',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store, must-revalidate',
                    },
                ],
            },
        ]
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.topojson$/,
            use: 'json-loader',
        })
        return config
    },
}

module.exports = nextConfig 