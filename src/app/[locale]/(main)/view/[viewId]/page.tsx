import ErrorComponent from '@/components/error-handling/ErrorComponent';
import ResourceDetails from '@/components/resource-details/ResourceDetails';
import { getConfiguration } from '@/configuration';

export default async function Page({ params: { viewId } }: { params: { viewId: string } }) {
  const { success, configuration, error } = await getConfiguration();
  if (!success) {
    return <ErrorComponent type="configurationError" error={error} />;
  }

  const resource = configuration.resources.find(
    (item) =>
      `${item.name.trim().replaceAll(/\s+/gu, '-').toLowerCase()}-${item.id.toLowerCase()}` ===
      decodeURIComponent(viewId).toLowerCase(),
  );

  if (resource === undefined) {
    return <ErrorComponent type="notFound" resource={resource} />;
  }

  return <ResourceDetails resource={resource} />;
}
