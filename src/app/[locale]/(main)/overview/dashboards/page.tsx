import ErrorComponent from '@/components/error-handling/ErrorComponent';
import Overview from '@/components/overview/Overview';
import { getConfiguration } from '@/configuration';
import { getTranslations } from 'next-intl/server';

export default async function Page({ params }: { params: { categories: string[] | undefined } }) {
  const configuration = await getConfiguration();
  const t = await getTranslations('Overview');
  if (!configuration.success || configuration.data?.resources === undefined) {
    return <ErrorComponent type="configurationNotLoaded" error={String(configuration.error)} />;
  }
  // TODO: Actually add dashboard content
  return (
    <Overview
      content={[]}
      header={{
        title: t('dashboardsTitle'),
        description: t('dashboardsDescription'),
      }}
    />
  );
}
