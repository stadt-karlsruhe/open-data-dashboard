import { GeoJSONResource, JSONResource, Resource } from '@/schemas/configurationSchema';

import ChartTableWrapper from '@/components/layout/ChartTableWrapper';
import ErrorComponent from '@/components/error-handling/ErrorComponent';
import { TransformedData } from '@/schemas/dataSchema';
import dynamic from 'next/dynamic';
import { getValidatedData } from '@/schemas/validate';

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

  const { success, validatedData, error } = getValidatedData(resource, data);
  if (!success) {
    return <ErrorComponent type="dataEmpty" resource={resource} error={error} />;
  }

  if (resource.type === 'GeoJSON') {
    return <GeoMap resource={resource} geoJsonData={validatedData as GeoJSON.FeatureCollection} />;
  }
  return <ChartTableWrapper resource={resource} transformedData={validatedData as TransformedData[]} />;
}

async function fetchData(resource: Resource) {
  const response = await fetch(resource.source);
  return resource.type === 'CSV' ? response.text() : response.json();
}
