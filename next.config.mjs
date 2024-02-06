/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    compiler: {
        styledComponents: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'minio-server.dipsapp.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
