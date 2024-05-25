'use client';

import ErrorComponent from '@/components/error-handling/ErrorComponent';
import { useEffect } from 'react';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <ErrorComponent code={500} />;
}
