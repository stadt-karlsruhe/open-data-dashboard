import ErrorComponent from '@/components/error-handling/ErrorComponent';
import Overview from '@/components/overview/Overview';
import PageWrapper from '@/components/layout/PageWrapper';
import { configurationToCategories } from '@/utils/mapUtils';
import { getTranslations } from 'next-intl/server';
import { getValidatedConfiguration } from '@/schemas/validate';

export default async function ResourcesPage() {
  const { success, configuration, error } = await getValidatedConfiguration();
  const t = await getTranslations('Overview');

  if (!success) {
    return <ErrorComponent type="configurationError" error={error} />;
  }

  return (
    <PageWrapper title={t('dataTitle')} description={t('dataDescription')}>
      <Overview content={configurationToCategories(configuration)} />
    </PageWrapper>
  );
}
