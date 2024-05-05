import EmbeddedViewer from '@/components/visualization/EmbeddedViewer';
import Visualization from '@/components/visualization/layout/Visualization';
import { mockData } from '@/data/mockData';

// Comment out `output: export` in next.config.mjs and uncomment the following line to work on not-found.tsx.
// See https://github.com/vercel/next.js/issues/56253
// export const dynamicParams = false;

export default function Page({ params: { resourceId } }: { params: { resourceId: string } }) {
  const resource = mockData.find((item) => item.id === resourceId);

  if (resource === undefined) {
    return <></>;
  }

  if (resource.type === 'PDF' || resource.type === 'Embedded') {
    return <EmbeddedViewer source={resource.endpoint} />;
  }
  return <Visualization resource={resource} />;
}

export function generateStaticParams() {
  return mockData.map((data) => ({
    resourceId: data.id,
  }));
}
