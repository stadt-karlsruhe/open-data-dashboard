/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
    output: 'export',
    reactStrictMode: true,
    webpack: (config) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        config.resolve.alias.canvas = false;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return config;
    },
};

export default nextConfig;
