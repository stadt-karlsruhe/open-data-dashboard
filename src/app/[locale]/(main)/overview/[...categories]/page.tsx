import ErrorComponent from '@/components/error-handling/ErrorComponent';
import Overview from '@/components/overview/Overview';
import { getConfiguration } from '@/configuration';

export default async function Page() {
  const configuration = await getConfiguration();
  if (!configuration.success || configuration.data?.resources === undefined) {
    return <ErrorComponent type="configurationNotLoaded" error={String(configuration.error)} />;
  }

  return <Overview resources={configuration.data.resources} />;
}
