// Necessary as workaround for a known Next.js bug: https://github.com/vercel/next.js/discussions/50034
import { notFound } from 'next/navigation';

export default function NotFoundLocale() {
  notFound();
}
