import { GeoJSONResource, JSONResource } from '@/schemas/configuration-schema';

import EmbeddedViewer from '@/components/visualization/EmbeddedViewer';
import ErrorComponent from '@/components/error-handling/ErrorComponent';
import Visualization from '@/components/visualization/layout/Visualization';
import { getConfiguration } from '@/configuration';

export default async function Page({ params: { resourceId } }: { params: { resourceId: string } }) {
  const { success, configuration, error } = await getConfiguration();
  if (!success) {
    return <ErrorComponent type="configurationError" error={error} />;
  }
  const resource = configuration.resources.find((item) => item.id.toLowerCase() === resourceId.toLowerCase());

  if (resource === undefined) {
    return <ErrorComponent type="notFound" resource={resource} />;
  }

  return resource.type === 'HTML' || resource.type === 'PDF' ? (
    <EmbeddedViewer resource={resource} className="d-flex h-100" />
  ) : (
    <Visualization resource={resource as JSONResource | GeoJSONResource} />
  );
}
