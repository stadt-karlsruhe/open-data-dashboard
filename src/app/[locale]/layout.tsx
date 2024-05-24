import '../../themes/globals.scss';
import '../../themes/theme.karlsruhe.scss';
import { getMessages, getTranslations } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getConfiguration } from '@/configuration';

export const dynamicParams = false;

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  const configuration = await getConfiguration();
  return (
    // By default, Bootstrap will ignore themes that are not defined
    <html lang={locale} data-bs-theme={configuration.appearance?.theme ?? ''}>
      <body className={inter.className}>
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
