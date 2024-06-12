import { Configuration } from '@/schemas/configuration-schema';
import ErrorComponent from '@/components/error-handling/ErrorComponent';
import Overview from '@/components/overview/Overview';
import PageWrapper from '@/components/layout/PageWrapper';
import { getConfiguration } from '@/configuration';
import { getTranslations } from 'next-intl/server';
import { replaceWhitespaceInString } from '@/utils/stringUtils';

export default async function Page() {
  const { success, configuration, error } = await getConfiguration();
  const t = await getTranslations('Overview');

  if (!success) {
    return <ErrorComponent type="configurationError" error={error} />;
  }

  return (
    <PageWrapper title={t('dataTitle')} description={t('dataDescription')}>
      <Overview content={getCategories(configuration)} />
    </PageWrapper>
  );
}

function getCategories(configuration: Configuration) {
  return configuration.categories.map((category) => ({
    title: category.name,
    description: category.description,
    href: `/overview/resources/${replaceWhitespaceInString(category.name).toLowerCase()}`,
    isCategory: true,
    icon: category.icon,
  }));
}
