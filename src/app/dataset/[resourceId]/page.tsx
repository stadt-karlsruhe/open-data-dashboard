import DataTable from '@/components/visualization/DataTable';
import { Resource } from '@/types/visualization';
import { transformJson } from '@/transform';

const mockData = [
  {
    id: '1',
    name: 'Bevölkerung mit Hauptwohnung',
    endpoint: 'https://transparenz.karlsruhe.de/datastore/dump/d8be5f4a-0788-4ee3-abe5-b36313ce3799?format=json',
    skipFields: '^_id$',
    renameFields: {
      'mannlich (%)': 'Männlich (%)',
      'weiblich (%)': 'Weiblich (%)',
    },
  },
  {
    id: '2',
    name: 'Bevölkerung mit Hauptwohnung',
    endpoint:
      'https://transparenz.karlsruhe.de/api/3/action/datastore_search?resource_id=d8be5f4a-0788-4ee3-abe5-b36313ce3799&limit=450',
  },
] as Resource[];

export default async function Page({ params: { resourceId } }: { params: { resourceId: string } }) {
  const resource = mockData.find((item) => item.id === resourceId);
  const data = await getData(resource?.endpoint ?? '', resource?.skipFields, resource?.renameFields);
  if (data === undefined) {
    return <></>;
  }
  return (
    <>
      <DataTable key={resourceId} data={data}></DataTable>
    </>
  );
}

async function getData(endpoint: string, skipFields?: string, renameFields?: Record<string, string>) {
  const res = await fetch(endpoint);
  const json = (await res.json()) as unknown;
  return transformJson(json, skipFields, renameFields);
}

export function generateStaticParams() {
  return mockData.map((data) => ({
    resourceId: data.id,
  }));
}
