'use client';

import { useEffect } from 'react';
import { useShowSearchbar } from '@/components/header/HeaderProvider';

export default function Home() {
  const { setShowSearchbar } = useShowSearchbar();
  useEffect(() => {
    setShowSearchbar(false);
  });
  return <></>;
}
