import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    /**
     * @param {import('webpack').Configuration} config
     * @returns {import('webpack').Configuration}
     */
    webpack(config) {
        config.module?.rules?.push({
            test: /\.svg$/u,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};

export default withNextIntl(nextConfig);
