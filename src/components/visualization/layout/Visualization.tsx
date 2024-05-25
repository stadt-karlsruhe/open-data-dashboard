import ChartTableWrapper from './ChartTableWrapper';
import ErrorComponent from '@/components/error-handling/ErrorComponent';
import { Resource } from '@/types/configuration';
import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';
import { transformData } from '@/transform';

export default async function Visualization({ resource }: { resource: Resource }) {
  const t = await getTranslations('Visualization');
  let data;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data = await fetchData(resource);
  } catch (err) {
    console.error(
      t('endpointErrorMessage', {
        source: resource.source,
        name: resource.name,
        id: resource.id,
      }),
    );
    console.error(err);
    return <ErrorComponent title={t('endpointErrorTitle')} />;
  }
  if (resource.type === 'JSON' || resource.type === 'CSV') {
    const transformedData = transformData(resource, data);

    if (transformedData.length === 0) {
      console.error(
        t('dataEmptyMessage', {
          source: resource.source,
          name: resource.name,
          id: resource.id,
        }),
      );
      return <ErrorComponent title={t('dataEmptyTitle')} />;
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
