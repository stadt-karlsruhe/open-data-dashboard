'use client';

import { redirect, usePathname } from 'next/navigation';

export default function OverviewPage() {
  const pathname = usePathname();
  redirect(`${pathname}/resources`);
}
