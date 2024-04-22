'use client';

import { ChartInput, Resource } from '@/types/visualization';
// eslint-disable-next-line import/named
import useSWR, { Fetcher } from 'swr';
import BarChart from './BarChart';
import Table from './Table';
import { transformJson } from '@/transform';

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
          <BarChart key={resource.id} chartInput={chartInput} />
        </div>
      );
    }
    const transformedData = transformJson(data, resource.skipFields, resource.renameFields);
    return (
      <>
        <Table key={resource.id} record={transformedData}></Table>
      </>
    );
  }
}

async function getData(endpoint: string) {
  const response = await fetch(endpoint);
  return response.json();
}
