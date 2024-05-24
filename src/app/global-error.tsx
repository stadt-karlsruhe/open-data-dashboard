'use client';

import GenericError from '@/components/GenericError';
import { useEffect } from 'react';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <GenericError errorCode="500" />;
}
