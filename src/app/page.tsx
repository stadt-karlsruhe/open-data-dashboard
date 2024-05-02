import { locales } from '@/locales';
import { redirect } from 'next/navigation';

export default function Page() {
  redirect(`/${[...locales.values()][0]}`);
}
