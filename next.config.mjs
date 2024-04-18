/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
    output: 'export',
    reactStrictMode: true,
    webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        config.module.rules.push({
            test: /\.ya?ml$/u,
            use: 'yaml-loader',
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return config;
    },
};

export default nextConfig;
