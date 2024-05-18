import createMiddleware from 'next-intl/middleware';
import { locales } from './locales';

export default createMiddleware({
    locales: [...locales],

    defaultLocale: [...locales][0],
});

export const config = {
    // https://github.com/vercel/next.js/issues/56398
    // matcher: ['/', `/(${[...locales].join('|')})/:path*`],
    matcher: ['/', '/(de|en)/:path*'],
};
