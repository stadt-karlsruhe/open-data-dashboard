import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
    output: 'export',
    reactStrictMode: true,
};

export default withNextIntl(nextConfig);
