import { Dashboard, configurationSchema } from '@/schemas/configuration-schema';
import Overview, { OverviewRow } from '@/components/overview/Overview';

import ErrorComponent from '@/components/error-handling/ErrorComponent';
import { getConfiguration } from '@/configuration';
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const configuration = await getConfiguration();
  const t = await getTranslations('Overview');
  if (!configuration.success || configuration.data?.resources === undefined) {
    return <ErrorComponent type="configurationNotLoaded" error={String(configuration.error)} />;
  }
  const parsedConfiguration = configurationSchema.safeParse(configuration.data);
  if (!parsedConfiguration.success) {
    return <ErrorComponent type="configurationInvalid" error={JSON.stringify(parsedConfiguration.error)} />;
  }

  return (
    <Overview
      content={getContent(parsedConfiguration.data.dashboards)}
      header={{
        name: t('dashboardsTitle'),
        description: t('dashboardsDescription'),
      }}
    />
  );
}

// TODO: Implement proper dashboard link
function getContent(dashboards: Dashboard[]) {
  return dashboards
    .filter((dashboard) => dashboard.id !== 'homepage')
    .map(
      (dashboard) =>
        ({
          title: dashboard.name,
          description: dashboard.description,
          href: `#`,
          isCategory: false,
          icon: dashboard.icon,
        }) as OverviewRow,
    );
}
