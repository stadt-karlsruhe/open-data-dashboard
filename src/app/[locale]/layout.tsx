import { NextIntlClientProvider, useMessages } from 'next-intl';
import BootstrapJS from '@/components/helper/BootstrapJS';
import { Inter } from 'next/font/google';
import { locales } from '@/locales';
import { unstable_setRequestLocale as setRequestLocale } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

// Comment out `output: export` in next.config.mjs and uncomment the following line to work on not-found.tsx.
// See https://github.com/vercel/next.js/issues/56253
// export const dynamicParams = false;

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  setRequestLocale(locale);
  const messages = useMessages();
  return (
    <html lang={locale}>
      <BootstrapJS />
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return [...locales.values()].map((locale) => ({ locale }));
}
