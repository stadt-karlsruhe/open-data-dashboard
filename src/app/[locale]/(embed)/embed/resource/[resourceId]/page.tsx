import { GeoJSONResource, JSONResource } from '@/schemas/configurationSchema';

import EmbeddedViewer from '@/components/visualization/EmbeddedViewer';
import ErrorComponent from '@/components/error-handling/ErrorComponent';
import Visualization from '@/components/visualization/Visualization';
import { getValidatedConfiguration } from '@/schemas/validate';
import { safeStringCompare } from '@/utils/stringUtils';

export default async function Page({ params: { resourceId } }: { params: { resourceId: string } }) {
  const { success, configuration, error } = await getValidatedConfiguration();
  if (!success) {
    return <ErrorComponent type="configurationError" error={error} />;
  }
  const resource = configuration.resources.find((item) => safeStringCompare(resourceId, item.id));

  if (resource === undefined) {
    return <ErrorComponent type="notFound" resource={resource} />;
  }

  return resource.type === 'HTML' || resource.type === 'PDF' ? (
    <EmbeddedViewer resource={resource} className="d-flex h-100" />
  ) : (
    <Visualization resource={resource as JSONResource | GeoJSONResource} />
  );
}
