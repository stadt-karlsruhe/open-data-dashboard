import ErrorComponent from '@/components/error-handling/ErrorComponent';

export default function NotFoundLocale() {
  return <ErrorComponent code={404} />;
}
