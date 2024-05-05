'use client';

import { redirect, usePathname } from 'next/navigation';
import { locales } from '@/locales';

const localeRegex = /^\/([A-Za-z]{2})/u;

export default function NotFound() {
  const pathname = usePathname();
  redirect(`/${pathname.replace(localeRegex, [...locales.values()][0])}`);
}
