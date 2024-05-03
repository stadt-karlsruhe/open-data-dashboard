import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale as setRequestLocale } from 'next-intl/server';

export default function Layout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  setRequestLocale(locale);
  const messages = useMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
