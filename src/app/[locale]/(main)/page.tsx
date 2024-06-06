'use client';

import { redirect, usePathname } from 'next/navigation';

export default function Home() {
  const pathname = usePathname();
  redirect(`${pathname}/home`);
}
