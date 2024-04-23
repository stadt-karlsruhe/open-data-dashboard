'use client';

import ChartWrapper from './ChartWrapper';
import { Resource } from '@/types/visualization';
import { transformData } from '@/transform';
import useSWR from 'swr';

export default function Visualization({ resource }: { resource: Resource }) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error } = useSWR(resource, async (resource) => {
    const response = await fetch(resource.endpoint);
    return resource.type === 'CSV' ? response.text() : response.json();
  });
  if (resource.type === 'JSON' || resource.type === 'CSV') {
    const transformedData = transformData(resource, data);

    if (transformedData === undefined) {
      return <></>;
    }

    return <ChartWrapper resource={resource} transformedData={transformedData} />;
  }
}
