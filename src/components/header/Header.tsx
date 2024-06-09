'use client';

import { Configuration } from '@/schemas/configuration-schema';
import Image from 'next/image';
import LocaleSwitcher from './LocaleSwitcher';
import LogoKarlsruhe from '../../public/Logo_Digital_Karlsruhe-rechts_rgb.svg';
import LogoKarlsruheSmall from '../../public/Logo_Digital_Karlsruhe-rechts_rgb_small.svg';
import Search from '../search/Search';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { usePathname } from 'next/navigation';
import { useShowNavigation } from '../navigation/NavigationProvider';
import { useTranslations } from 'next-intl';

export default function Header({ configuration }: { configuration: Configuration }) {
  const { show, setShow } = useShowNavigation();
  const t = useTranslations('Header');
  const showSearchbar = !usePathname().endsWith('/home');
  return (
    <div className="bg-white py-3">
      <div className="container-lg">
        <div className="d-flex justify-content-between align-items-center m-2">
          <button
            className="d-block d-lg-none btn btn-secondary border-0 fs-2"
            onClick={() => {
              setShow(!show);
            }}
            name="Navigation"
          >
            <i className="bi bi-list" />
          </button>
          <div className="fs-5 fs-lg-2 text-nowrap">{t('title')}</div>
          <div className="d-flex flex-fill mx-lg-3 mx-xl-5">
            {showSearchbar && (
              <Search configuration={configuration} className="d-none d-md-block flex-fill p-2 m-auto" />
            )}
            <LocaleSwitcher className="d-none d-md-block p-2" />
          </div>
          <Image
            className="d-block d-lg-none"
            src={LogoKarlsruheSmall as StaticImport}
            alt={'LogoKarlsruheSmall'}
            height={50}
          />
          <Image className="d-none d-lg-block" src={LogoKarlsruhe as StaticImport} alt={'LogoKarlsruhe'} height={60} />
        </div>
      </div>
      <div className="container-lg justify-content-center d-flex">
        {showSearchbar && (
          <Search
            configuration={configuration}
            className="d-block d-md-none flex-fill m-2"
            style={{ maxWidth: '70vw' }}
          />
        )}
      </div>
    </div>
  );
}
