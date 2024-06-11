import ErrorComponent from '@/components/error-handling/ErrorComponent';
import { getConfiguration } from '@/configuration';
import { safeStringCompare } from '@/utils/stringUtils';

export default async function Page({ params: { resourceId: dashboardId } }: { params: { resourceId: string } }) {
  const { success, configuration, error } = await getConfiguration();
  if (!success) {
    return <ErrorComponent type="configurationError" error={error} />;
  }
  const dashboard = configuration.dashboards.find((item) => safeStringCompare(dashboardId, item.id));

  if (dashboard === undefined) {
    return <ErrorComponent type="notFound" />;
  }

  return <>Dashboard {dashboard.name}</>;
}
