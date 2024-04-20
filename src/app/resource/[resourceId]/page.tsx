import PDFViewer from '@/components/visualization/PDFViewer';
import Visualization from '@/components/visualization/Visualization';
import { mockData } from '@/data/mockData';

export default function Page({ params: { resourceId } }: { params: { resourceId: string } }) {
  const resource = mockData.find((item) => item.id === resourceId);

  if (resource === undefined) {
    return <></>;
  }

  if (resource.type === 'PDF') {
    return (
      <>
        <PDFViewer url={resource.endpoint}></PDFViewer>
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
