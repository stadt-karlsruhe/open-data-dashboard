'use client';

import ErrorComponent from '@/components/error-handling/ErrorComponent';

export default function LocaleError({ error }: { error: Error & { digest?: string } }) {
  return <ErrorComponent type="unexpected" error={String(error)} />;
}
