import DashboardContents from '@/components/dashboard-resource/dashboard/DashboardContents';
import ErrorComponent from '@/components/error-handling/ErrorComponent';
import Image from 'next/image';
import KarlsruhePalace from '@/public/Karlsruhe_Palace.png';
import Link from 'next/link';
import Search from '@/components/search/Search';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { getTranslations } from 'next-intl/server';
import { getValidatedConfiguration } from '@/schemas/validate';

export default async function Home() {
  const { success, configuration, error } = await getValidatedConfiguration();
  const t = await getTranslations('Homepage');
  if (!success) {
    return <ErrorComponent type="configurationError" error={error} />;
  }
  const homepage = configuration.dashboards.find((dashboard) => dashboard.id === 'homepage');

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="position-relative w-100" style={{ height: '500px' }}>
        <Image
          className="object-fit-cover"
          src={KarlsruhePalace as StaticImport}
          alt={t('imageAlt')}
          priority
          fill
          sizes="1010px"
        />
        <Search
          configuration={configuration}
          id="homepage-search"
          className="position-absolute w-100 start-50 px-2"
          style={{ bottom: '35%', transform: 'translateX(-50%)', maxWidth: '600px' }}
        />
        <div
          className="position-absolute bottom-0 end-0 bg-white d-flex p-1"
          style={{ fontSize: '0.75rem', opacity: '80%' }}
        >
          &copy;
          <Link href="https://www.karlsruhe.de/" target="_blank" className="nav-link ms-1">
            Stadt Karlsruhe, Roland Fränkle
          </Link>
        </div>
      </div>
      {homepage && <DashboardContents dashboard={homepage} configuration={configuration} className="m-2" />}
    </div>
  );
}
