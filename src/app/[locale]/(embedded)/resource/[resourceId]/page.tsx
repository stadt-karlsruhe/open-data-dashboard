import { GeoJSONResource, JSONResource, resourceSchema } from '@/schemas/configuration-schema';

import EmbeddedViewer from '@/components/visualization/EmbeddedViewer';
import ErrorComponent from '@/components/error-handling/ErrorComponent';
import Visualization from '@/components/visualization/layout/Visualization';
import { fromError } from 'zod-validation-error';
import { getConfiguration } from '@/configuration';

export default async function Page({ params: { resourceId } }: { params: { resourceId: string } }) {
  const configuration = await getConfiguration();
  if (!configuration.success) {
    return <ErrorComponent type="configurationNotLoaded" error={String(configuration.error)} />;
  }
  const resource = configuration.data?.resources.find((item) => item.id.toLowerCase() === resourceId.toLowerCase());

  if (resource === undefined) {
    return <ErrorComponent type="notFound" resource={resource} />;
  }

  const parsedResource = resourceSchema.safeParse(resource);
  if (!parsedResource.success) {
    return (
      <ErrorComponent
        type="resourceConfigurationInvalid"
        resource={resource}
        error={JSON.stringify(fromError(parsedResource.error).toString())}
      />
    );
  }

  if (resource.type === 'HTML' || resource.type === 'PDF') {
    return <EmbeddedViewer resource={parsedResource.data} className="d-flex h-100" />;
  }
  return <Visualization resource={parsedResource.data as JSONResource | GeoJSONResource} />;
}
