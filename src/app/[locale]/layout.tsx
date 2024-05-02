import '../globals.css';
import '../globals.scss';
import BootstrapJS from '@/components/helper/BootstrapJS';
import { Inter } from 'next/font/google';
import { type Metadata } from 'next';
import { locales } from '@/locales';
import { unstable_setRequestLocale as setRequestLocale } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  setRequestLocale(locale);
  return (
    <html lang={locale}>
      <BootstrapJS />
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export function generateStaticParams() {
  return [...locales.values()].map((locale) => ({ locale }));
}
