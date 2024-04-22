'use client';

import useSWR, { Fetcher } from 'swr';
import { transformJson } from '@/transform';
import DataTable from './DataTable';
import { ChartInput, DataRecord, Resource } from '@/types/visualization';
import CustomChart from './DataChart';

const fetcher: Fetcher<unknown, string> = (url) => getData(url);

export default function Visualization({ resource }: { resource: Resource }) {
  const { data } = useSWR(resource.endpoint, fetcher);
  if (resource.type === 'JSON' || resource.type === 'CSV') {
    if (resource.visType === 'CHART' && resource.yAxis !== undefined && resource.xAxis !== undefined) {
      const chartInput: ChartInput = {
        data: transformJson(data),
        yAxis: resource.yAxis,
        xAxis: resource.xAxis,
      };
      return (
        <div style={{ height: '100vh' }}>
          <CustomChart key={resource.id} chartInput={chartInput} />
        </div>
      );
    }
    const transformedData = transformJson(data, resource.skipFields, resource.renameFields);
    return (
      <>
        <DataTable key={resource.id} record={transformedData}></DataTable>
      </>
    );
  }
}

async function getData(endpoint: string) {
  const response = await fetch(endpoint);
  return response.json();
}
