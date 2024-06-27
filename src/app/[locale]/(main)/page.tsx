'use client';

import { redirect, usePathname } from 'next/navigation';

export default function RootPage() {
  const pathname = usePathname();
  redirect(`${pathname}/home`);
}
