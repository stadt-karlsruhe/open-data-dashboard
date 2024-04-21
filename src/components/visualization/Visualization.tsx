'use client';

// eslint-disable-next-line import/named
import useSWR, { Fetcher } from 'swr';
import { Resource } from '@/types/visualization';
import Table from './Table';
import { transformJson } from '@/transform';

const fetcher: Fetcher<unknown, string> = (url) => getData(url);

export default function Visualization({ resource }: { resource: Resource }) {
  const { data } = useSWR(resource.endpoint, fetcher);
  if (resource.type === 'JSON' || resource.type === 'CSV') {
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
