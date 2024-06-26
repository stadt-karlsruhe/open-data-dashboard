import DashboardContents from '@/components/dashboard-resource/dashboard/DashboardContents';
import ErrorComponent from '@/components/error-handling/ErrorComponent';
import { getValidatedConfiguration } from '@/schemas/validate';
import { safeStringCompare } from '@/utils/stringUtils';

export default async function Page({ params: { dashboardId } }: { params: { dashboardId: string } }) {
  const { success, configuration, error } = await getValidatedConfiguration();
  if (!success) {
    return <ErrorComponent type="configurationError" error={error} />;
  }
  const dashboard = configuration.dashboards
    .filter((item) => item.id !== 'homepage')
    .find((item) => safeStringCompare(dashboardId, item.id));

  if (dashboard === undefined) {
    return <ErrorComponent type="notFound" />;
  }

  return <DashboardContents dashboard={dashboard} configuration={configuration} className="m-2" />;
}
