//  "Hacky" workaround due to https://github.com/vercel/next.js/discussions/50034 and https://github.com/vercel/next.js/discussions/64660
'use client';

import { redirect, usePathname } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import NotFound from '@/components/NotFound';
import de from '../messages/de.json';
import en from '../messages/en.json';
import { locales } from '@/locales';
import { merge } from 'ts-deepmerge';

const pathRegex = /^\/([A-Za-z]{2})(\/.*)?$/u;

export default function NotFoundLocale() {
  const pathname = usePathname();
  const [, locale, path] = pathRegex.exec(pathname) ?? [];

  if (!locale) {
    redirect(`/${[...locales.values()][0]}${pathname}`);
  }
  if (![...locales.values()].includes(locale)) {
    redirect(`/${[...locales.values()][0]}${path}`);
  }

  const messages = locale === 'en' ? en : merge(en, de);
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <NotFound />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
