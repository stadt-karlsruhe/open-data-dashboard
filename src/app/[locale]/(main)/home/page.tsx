import DashboardContent from '@/components/dashboard/DashboardContent';
import ErrorComponent from '@/components/error-handling/ErrorComponent';
import Image from 'next/image';
import Search from '@/components/search/Search';
import { configurationSchema } from '@/schemas/configuration-schema';
import { getConfiguration } from '@/configuration';

export default async function Home() {
  const configuration = await getConfiguration();
  if (!configuration.success) {
    return <ErrorComponent type="configurationNotLoaded" error={String(configuration.error)} />;
  }
  const parsedConfiguration = configurationSchema.safeParse(configuration.data);
  if (!parsedConfiguration.success) {
    return <ErrorComponent type="configurationInvalid" error={JSON.stringify(parsedConfiguration.error)} />;
  }
  const [homepage] = parsedConfiguration.data.dashboards;

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="position-relative w-100" style={{ height: '500px' }}>
        {/* TODO: Acquire licensed picture or add attribution */}
        {/* Source: https://rp.baden-wuerttemberg.de/rps/presse/artikel/bau-und-kunstdenkmalpflege-schloesser-und-gaerten-in-baden-wuerttemberg/ */}
        <Image
          className="object-fit-cover"
          src="https://rp.baden-wuerttemberg.de/fileadmin/_processed_/8/0/csm_AdobeStock_516119904_Schloss_Karlsruhe_Markus_Mainka_7fd664f58b.jpeg"
          alt="Karlsruher Schloss"
          priority
          fill
          sizes="1700px"
        />
        <Search
          configuration={parsedConfiguration.data}
          id="homepage-search"
          className="position-absolute w-50 start-50"
          style={{ bottom: '20%', transform: 'translateX(-50%)' }}
        />
      </div>
      <DashboardContent dashboard={homepage} />
    </div>
  );
}
