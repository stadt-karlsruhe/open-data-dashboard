import ErrorComponent from '@/components/error-handling/ErrorComponent';
import Overview from '@/components/overview/Overview';
import PageWrapper from '@/components/layout/PageWrapper';
import { configurationToDashboards } from '@/utils/mapUtils';
import { getTranslations } from 'next-intl/server';
import { getValidatedConfiguration } from '@/schemas/validate';

export default async function Page() {
  const { success, configuration, error } = await getValidatedConfiguration();
  const t = await getTranslations('Overview');

  if (!success) {
    return <ErrorComponent type="configurationError" error={error} />;
  }

  return (
    <PageWrapper title={t('dashboardsTitle')} description={t('dashboardsDescription')}>
      <Overview content={configurationToDashboards(configuration)} />
    </PageWrapper>
  );
}
