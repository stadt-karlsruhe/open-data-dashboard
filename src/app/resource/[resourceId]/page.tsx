import { mockData } from '@/data/mockData';
import { redirect } from 'next/navigation';

export default function Page({ params: { resourceId } }: { params: { resourceId: string } }) {
  redirect(`/en/resource/${resourceId}`);
}

export function generateStaticParams() {
  return mockData.map((data) => ({
    resourceId: data.id,
  }));
}
