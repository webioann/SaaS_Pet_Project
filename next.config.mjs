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
            // default image for credentials user avatar
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
                port: '',
                pathname: '/images/M/**',
            },
        ],
    },
};

export default nextConfig;
