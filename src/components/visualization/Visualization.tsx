import { GeoJSONResource, JSONResource, Resource } from '@/schemas/configuration-schema';
import { TransformedData, transform } from '@/schemas/data-schema';

import ChartTableWrapper from './layout/ChartTableWrapper';
import ErrorComponent from '@/components/error-handling/ErrorComponent';
import dynamic from 'next/dynamic';

const GeoMap = dynamic(() => import('@/components/visualization/map/GeoMap'), {
  ssr: false,
});

export default async function Visualization({ resource }: { resource: JSONResource | GeoJSONResource }) {
  let data;
  try {
    data = (await fetchData(resource)) as never;
  } catch (err) {
    return <ErrorComponent type="dataNotLoaded" resource={resource} error={String(err)} />;
  }

  const { success, transformedData, error } = transform(resource, data);
  if (!success) {
    return <ErrorComponent type="dataEmpty" resource={resource} error={error} />;
  }

  if (resource.type === 'GeoJSON') {
    return <GeoMap resource={resource} geoJsonData={transformedData as GeoJSON.FeatureCollection} />;
  }
  return <ChartTableWrapper resource={resource} transformedData={transformedData as TransformedData[]} />;
}

async function fetchData(resource: Resource) {
  const response = await fetch(resource.source);
  return resource.type === 'CSV' ? response.text() : response.json();
}
