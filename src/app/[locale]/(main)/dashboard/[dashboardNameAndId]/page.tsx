import { concatenateNameAndId, safeStringCompare } from '@/utils/stringUtils';

import DashboardContents from '@/components/dashboard-resource/dashboard/DashboardContents';
import ErrorComponent from '@/components/error-handling/ErrorComponent';
import PageWrapper from '@/components/layout/PageWrapper';
import dynamic from 'next/dynamic';
import { getValidatedConfiguration } from '@/schemas/validate';

const DashboardResourceControls = dynamic(() => import('@/components/dashboard-resource/DashboardResourceControls'), {
  ssr: false,
});

export default async function DashboardPage({
  params: { dashboardNameAndId },
}: {
  params: { dashboardNameAndId: string };
}) {
  const { success, configuration, error } = await getValidatedConfiguration();
  if (!success) {
    return <ErrorComponent type="configurationError" error={error} />;
  }
  const dashboard = configuration.dashboards
    .filter((item) => item.id !== 'homepage')
    .find((item) => safeStringCompare(dashboardNameAndId, concatenateNameAndId(item.name, item.id)));

  if (dashboard === undefined) {
    return <ErrorComponent type="notFound" />;
  }

  return (
    <PageWrapper title={dashboard.name} description={dashboard.description}>
      <DashboardResourceControls type="dashboard" element={dashboard} />
      <DashboardContents dashboard={dashboard} configuration={configuration} />
    </PageWrapper>
  );
}
