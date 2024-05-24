'use client';

import GenericError from '@/components/error-handling/GenericError';
import { useEffect } from 'react';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <GenericError code="500" detail={error.message} />;
}
