import { getRequestConfig } from 'next-intl/server';
import { locales } from './locales';
import { merge } from 'ts-deepmerge';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ locale }: { locale: string }) => {
    if (!locales.has(locale)) {
        notFound();
    }
    const defaultMessages = (await import(`./messages/en.json`)) as IntlMessages;
    const userMessages = (await import(`./messages/${locale}.json`)) as IntlMessages;
    return {
        messages: merge(defaultMessages, userMessages),
    };
});
