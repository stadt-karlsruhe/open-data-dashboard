import DashboardContent from '@/components/dashboard/DashboardContent';
import ErrorComponent from '@/components/error-handling/ErrorComponent';
import Image from 'next/image';
import Search from '@/components/search/Search';
import { getConfiguration } from '@/configuration';

export default async function Home() {
  const { success, configuration, error } = await getConfiguration();
  if (!success) {
    return <ErrorComponent type="configurationError" error={error} />;
  }
  const [homepage] = configuration.dashboards;

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
          configuration={configuration}
          id="homepage-search"
          className="position-absolute w-100 start-50 px-2"
          style={{ bottom: '20%', transform: 'translateX(-50%)', maxWidth: '600px' }}
        />
      </div>
      <DashboardContent dashboard={homepage} />
    </div>
  );
}
