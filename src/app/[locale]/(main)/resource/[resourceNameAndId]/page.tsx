import { concatenateNameAndId, safeStringCompare } from '@/utils/stringUtils';

import ErrorComponent from '@/components/error-handling/ErrorComponent';
import PageWrapper from '@/components/layout/PageWrapper';
import ResourceDetails from '@/components/resource-details/ResourceDetails';
import { getConfiguration } from '@/configuration';

export default async function Page({ params: { resourceNameAndId } }: { params: { resourceNameAndId: string } }) {
  const { success, configuration, error } = await getConfiguration();
  if (!success) {
    return <ErrorComponent type="configurationError" error={error} />;
  }

  const resource = configuration.resources.find((item) =>
    safeStringCompare(resourceNameAndId, concatenateNameAndId(item.name, item.id)),
  );

  if (resource === undefined) {
    return <ErrorComponent type="notFound" resource={resource} />;
  }

  return (
    <PageWrapper
      title={resource.name}
      description={resource.description}
      style={{ height: resource.type === 'HTML' || resource.type === 'PDF' ? '100dvh' : undefined }}
    >
      <ResourceDetails resource={resource} />
    </PageWrapper>
  );
}
