'use-client';

import customChart from '@/components/visualization/DataChart';
import DataTable from '@/components/visualization/DataTable';
import { mockData } from '@/data/mockData';
import { transformJson, transformJsonForCharts } from '@/transform';

export default async function Page({ params: { resourceId } }: { params: { resourceId: string } }) {
  const resource = mockData.find((item) => item.id === resourceId);
  if (resourceId === '3' && resource?.labelIndizes !== undefined && resource.dataIndizes !== undefined) {
    const data = await getJsonDataChart(resource?.endpoint ?? '', resource?.labelIndizes, resource?.dataIndizes);
    let Chart = customChart(data);
    return <Chart />;
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

async function getJsonDataChart(endpoint: string, labelIndizes: number[], dataIndizes: number[]) {
    const res = await fetch(endpoint);
    const json = (await res.json()) as unknown;
    return transformJsonForCharts(json, labelIndizes, dataIndizes);
  }

export function generateStaticParams() {
  return mockData.map((data) => ({
    resourceId: data.id,
  }));
}
