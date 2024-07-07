/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // authenticated with google users avatar
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/a/**',
            },
        ],
    },
};

export default nextConfig;
