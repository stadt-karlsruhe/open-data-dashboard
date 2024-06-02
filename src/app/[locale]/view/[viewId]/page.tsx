import ErrorComponent from '@/components/error-handling/ErrorComponent';
import ResourceDetails from '@/components/resource-details/ResourceDetails';
import { getConfiguration } from '@/configuration';
import { resourceSchema } from '@/schemas/configuration-schema';

export default async function Page({ params: { viewId } }: { params: { viewId: string } }) {
  const configuration = await getConfiguration();
  if (!configuration.success) {
    return <ErrorComponent type="configurationNotLoaded" error={String(configuration.error)} />;
  }
  const resource = configuration.data?.resources.find(
    (item) =>
      `${item.name.trim().replaceAll(/\s+/gu, '-').toLowerCase()}-${item.id.toLowerCase()}` ===
      decodeURIComponent(viewId).toLowerCase(),
  );

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

  return <ResourceDetails resource={parsedResource.data} />;
}
