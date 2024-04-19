import DataTable from '@/components/visualization/DataTable';
import PDFViewer from '@/components/visualization/PDFViewer';
import { mockData } from '@/data/mockData';
import { transformJson } from '@/transform';

export default async function Page({ params: { resourceId } }: { params: { resourceId: string } }) {
  const resource = mockData.find((item) => item.id === resourceId);
  if (resource?.type === 'PDF') {
    return (
      <>
        <PDFViewer url={resource.endpoint}></PDFViewer>
      </>
    );
  }
  const data = await getJsonData(resource?.endpoint ?? '', resource?.skipFields, resource?.renameFields);
  return (
    <>
      <DataTable key={resourceId} data={data}></DataTable>
    </>
  );
}

async function getJsonData(endpoint: string, skipFields?: string, renameFields?: Record<string, string>) {
  const res = await fetch(endpoint);
  const json = (await res.json()) as unknown;
  return transformJson(json, skipFields, renameFields);
}

export function generateStaticParams() {
  return mockData.map((data) => ({
    resourceId: data.id,
  }));
}
