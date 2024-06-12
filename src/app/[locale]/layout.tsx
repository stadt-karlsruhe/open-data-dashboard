import '../../themes/globals.scss';
import '../../themes/theme.karlsruhe.scss';

import { getMessages, getTranslations } from 'next-intl/server';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { getConfiguration } from '@/configuration';

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: ReactNode;
  params: { locale: string };
}>) {
  const configuration = await getConfiguration();
  const messages = await getMessages();
  return (
    // By default, Bootstrap will ignore themes that are not defined
    <html lang={locale} data-bs-theme={String(configuration.appearance.theme)}>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}
