import Visualization from '@/components/visualization/Visualization';
import dynamic from 'next/dynamic';
import { mockData } from '@/data/mockData';

const EmbeddedViewer = dynamic(() => import('@/components/visualization/EmbeddedViewer'), { ssr: false });

export default function Page({ params: { resourceId } }: { params: { resourceId: string } }) {
  const resource = mockData.find((item) => item.id === resourceId);

  if (resource === undefined) {
    return <></>;
  }

  if (resource.type === 'PDF' || resource.type === 'Embedded') {
    return (
      <>
        <EmbeddedViewer source={resource.endpoint}></EmbeddedViewer>
      </>
    );
  }
  return (
    <>
      <Visualization resource={resource}></Visualization>
    </>
  );
}

export function generateStaticParams() {
  return mockData.map((data) => ({
    resourceId: data.id,
  }));
}
