import { getRequestConfig } from 'next-intl/server';
import { locales } from './locales';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ locale }: { locale: string }) => {
    if (!locales.has(locale)) {
        notFound();
    }
    const t = (await import(`../messages/${locale}.json`)) as Record<string, never>;
    return {
        messages: t.default,
    };
});
