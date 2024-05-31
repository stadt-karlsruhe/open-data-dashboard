import EmbeddedViewer from '@/components/visualization/EmbeddedViewer';
import ErrorComponent from '@/components/error-handling/ErrorComponent';
import Visualization from '@/components/visualization/layout/Visualization';
import { getConfiguration } from '@/configuration';
import { resourceSchema } from '@/schemas/configuration-schema';

export default async function Page({ params: { resourceId } }: { params: { resourceId: string } }) {
  const configuration = await getConfiguration();
  if (!configuration.success) {
    return <ErrorComponent type="configurationNotLoaded" error={String(configuration.error)} />;
  }
  const resource = configuration.data?.resources.find((item) => item.id === resourceId);

  if (resource === undefined) {
    return <ErrorComponent type="notFound" resource={resource} />;
  }

  const parsedResource = resourceSchema.safeParse(resource);
  if (!parsedResource.success) {
    return (
      <ErrorComponent
        type="resourceConfigurationInvalid"
        resource={resource}
        error={JSON.stringify(parsedResource.error)}
      />
    );
  }

  if (resource.type === 'Embedded') {
    return <EmbeddedViewer resource={parsedResource.data} />;
  }
  return <Visualization resource={parsedResource.data} />;
}
