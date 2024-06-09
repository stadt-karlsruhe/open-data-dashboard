import EmbeddedViewer from '@/components/visualization/EmbeddedViewer';
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
          className="position-absolute w-100 p-5"
          style={{ bottom: '10%' }}
        />
      </div>
      {/* TODO: Determine the actual content of the homepage preview and make it configurable */}
      <div className="d-flex flex-wrap justify-content-center mt-3">
        <EmbeddedViewer
          height={260}
          resource={{
            source: 'https://www.wetter.de/widget/heute/u0tyz1rj/false/',
            id: '12',
            name: 'Wetter',
            type: 'HTML',
          }}
        />
      </div>
    </div>
  );
}
