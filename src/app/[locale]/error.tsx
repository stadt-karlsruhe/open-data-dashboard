'use client';

import ErrorComponent from '@/components/error-handling/ErrorComponent';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return <ErrorComponent code={500} logMessage={String(error)} />;
}
