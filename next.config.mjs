/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // start URL query for movies posters
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                port: '',
                pathname: '/t/p/original/**',
            },
            // two Netflix logo 
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                port: '',
                pathname: '/wikipedia/commons/**',
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                port: '',
                pathname: '/wikipedia/commons/thumb/**',
            },
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
