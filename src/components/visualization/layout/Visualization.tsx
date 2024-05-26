import ChartTableWrapper from './ChartTableWrapper';
import { Resource } from '@/schema';
import dynamic from 'next/dynamic';
import { transformData } from '@/transform';

export default async function Visualization({ resource }: { resource: Resource }) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await fetchData(resource);
  if (resource.type === 'JSON' || resource.type === 'CSV') {
    const transformedData = transformData(resource, data);

    if (transformedData.length === 0) {
      return <></>;
    }

    return <ChartTableWrapper resource={resource} transformedData={transformedData} />;
  } else if (resource.type === 'GeoJSON') {
    const geoJsonData = data as GeoJSON.FeatureCollection;
    const GeoMap = dynamic(() => import('@/components/visualization/map/GeoMap'), {
      ssr: false,
    });
    return <GeoMap geoJsonData={geoJsonData} />;
  }
}

async function fetchData(resource: Resource) {
  const response = await fetch(resource.source);
  return resource.type === 'CSV' ? response.text() : response.json();
}
