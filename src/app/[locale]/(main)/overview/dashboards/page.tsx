import Overview, { OverviewRow } from '@/components/overview/Overview';

import { Dashboard } from '@/schemas/configuration-schema';
import ErrorComponent from '@/components/error-handling/ErrorComponent';
import PageWrapper from '@/components/PageWrapper';
import { getConfiguration } from '@/configuration';
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const { success, configuration, error } = await getConfiguration();
  const t = await getTranslations('Overview');

  if (!success) {
    return <ErrorComponent type="configurationError" error={error} />;
  }

  return (
    <PageWrapper title={t('dashboardsTitle')} description={t('dashboardsDescription')}>
      <Overview content={getContent(configuration.dashboards)} />
    </PageWrapper>
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
