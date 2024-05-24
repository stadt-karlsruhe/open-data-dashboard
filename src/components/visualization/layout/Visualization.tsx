import ChartTableWrapper from './ChartTableWrapper';
import GenericError from '@/components/error-handling/GenericError';
import { Resource } from '@/types/configuration';
import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';
import { transformData } from '@/transform';

export default async function Visualization({ resource }: { resource: Resource }) {
  const t = await getTranslations('Visualization');
  let data;
  let payload;
  try {
    data = await fetchData(resource);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    payload = await data.payload;
  } catch (err) {
    console.error(err);
    return (
      <GenericError
        message={t('endpointError')}
        detail={t('endpointErrorDetail', {
          source: resource.source,
          name: resource.name,
          id: resource.id,
          code: data?.statusCode,
        })}
      />
    );
  }
  if (resource.type === 'JSON' || resource.type === 'CSV') {
    const transformedData = transformData(resource, payload);

    if (transformedData.length === 0) {
      return (
        <GenericError
          message={t('dataEmpty')}
          detail={t('dataEmptyDetail', {
            source: resource.source,
            name: resource.name,
            id: resource.id,
          })}
        />
      );
    }

    return <ChartTableWrapper resource={resource} transformedData={transformedData} />;
  } else if (resource.type === 'GeoJSON') {
    const geoJsonData = payload as GeoJSON.FeatureCollection;
    const GeoMap = dynamic(() => import('@/components/visualization/map/GeoMap'), {
      ssr: false,
    });
    return <GeoMap geoJsonData={geoJsonData} />;
  }
}

async function fetchData(resource: Resource) {
  const response = await fetch(resource.source);
  return { payload: resource.type === 'CSV' ? response.text() : response.json(), statusCode: response.status };
}
