/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'uploadthing.com',
            },
            {
                protocol: 'http',
                hostname: 'utfs.io',
            },
            {
                protocol: 'http',
                hostname: 'img.clerk.com',
            },
            {
                protocol: 'http',
                hostname: 'subdomain',
            },
            {
                protocol: 'http',
                hostname: 'files.stripe.com',
            },
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
