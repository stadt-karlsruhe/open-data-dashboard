import { concatenateNameAndId, safeStringCompare } from '@/utils/stringUtils';

import ErrorComponent from '@/components/error-handling/ErrorComponent';
import PageWrapper from '@/components/layout/PageWrapper';
import { getValidatedConfiguration } from '@/schemas/validate';

export default async function Page({ params: { dashboardNameAndId } }: { params: { dashboardNameAndId: string } }) {
  const { success, configuration, error } = await getValidatedConfiguration();
  if (!success) {
    return <ErrorComponent type="configurationError" error={error} />;
  }
  const dashboard = configuration.dashboards.find((item) =>
    safeStringCompare(dashboardNameAndId, concatenateNameAndId(item.name, item.id)),
  );

  if (dashboard === undefined) {
    return <ErrorComponent type="notFound" />;
  }

  return (
    <PageWrapper title={dashboard.name} description={dashboard.description}>
      <>Some dashboard content</>
    </PageWrapper>
  );
}
