'use client';

import ErrorWrapper from '@/components/error-handling/ErrorWrapper';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return <ErrorWrapper code="500" detail={error.message} originalError={error} />;
}
