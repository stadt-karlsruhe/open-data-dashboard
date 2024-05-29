import ChartTableWrapper from './ChartTableWrapper';
import ErrorComponent from '@/components/error-handling/ErrorComponent';
import { Resource } from '@/schemas/configuration-schema';
import dynamic from 'next/dynamic';
import { transform } from '@/schemas/data-schema';

export default async function Visualization({ resource }: { resource: Resource }) {
  let data;
  try {
    data = (await fetchData(resource)) as never;
  } catch (err) {
    return <ErrorComponent type="dataNotLoaded" resource={resource} error={String(err)} />;
  }
  if (resource.type === 'JSON' || resource.type === 'CSV') {
    const transformedData = transform(resource, data);

    if (!transformedData.success) {
      return <ErrorComponent type="dataEmpty" resource={resource} error={JSON.stringify(transformedData.error)} />;
    }

    return <ChartTableWrapper resource={resource} transformedData={transformedData.data} />;
  } else if (resource.type === 'GeoJSON') {
    const geoJsonData = data as GeoJSON.FeatureCollection;
    const GeoMap = dynamic(() => import('@/components/visualization/map/GeoMap'), {
      ssr: false,
    });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return geoJsonData ? (
      <GeoMap resource={resource} geoJsonData={geoJsonData} />
    ) : (
      <ErrorComponent type="dataEmpty" resource={resource} />
    );
  }
}

async function fetchData(resource: Resource) {
  const response = await fetch(resource.source);
  return resource.type === 'CSV' ? response.text() : response.json();
}
