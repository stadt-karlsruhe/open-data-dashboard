'use client';

import { redirect, usePathname } from 'next/navigation';

import { locales } from '@/locales';

const pathRegex = /^\/([A-Za-z]{2})(\/.*)?$/u;

export default function NotFound() {
  const pathname = usePathname();
  const [, locale, path] = pathRegex.exec(pathname) ?? [];

  if (!locale) {
    redirect(`/${[...locales.values()][0]}${pathname}`);
  }
  if (![...locales.values()].includes(locale)) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    redirect(`/${[...locales.values()][0]}${path ?? ''}`);
  }
  redirect('/');
}
