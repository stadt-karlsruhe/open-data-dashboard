'use client';

import ChartTableWrapper from './ChartTableWrapper';
import { Resource } from '@/types/visualization';
import dynamic from 'next/dynamic';
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

    if (transformedData === undefined || transformedData.length === 0) {
      return <></>;
    }

    return <ChartTableWrapper resource={resource} transformedData={transformedData} />;
  } else if (resource.type === 'GeoJSON') {
    const geoJsonData = data as GeoJSON.FeatureCollection;
    const Map = dynamic(() => import('@/components/visualization/map/Map'), {
      ssr: false,
    });
    return (
      <>
        <Map geoJsonData={geoJsonData} />
      </>
    );
  }
}
