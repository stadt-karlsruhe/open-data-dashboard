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
        <div className="d-flex justify-content-center m-2">
          <button
            className="d-block d-lg-none btn btn-secondary"
            onClick={() => {
              setShow(!show);
            }}
          >
            <i className="bi bi-list" />
          </button>
          <div className="flex-fill align-content-center p-2 ps-4 fs-5 fs-lg-2 text-nowrap">{t('title')}</div>
          {showSearchbar && <Search configuration={configuration} className="d-none d-md-block flex-fill p-2 m-auto" />}
          <div className="d-none d-md-block flex-fill align-content-center p-2">
            <LocaleSwitcher />
          </div>
          <Image
            className="d-block d-lg-none justify-content-end"
            src={LogoKarlsruheSmall as StaticImport}
            alt={'LogoKarlsruheSmall'}
            height={50}
          />
          <Image
            className="d-none d-lg-block justify-content-end"
            src={LogoKarlsruhe as StaticImport}
            alt={'LogoKarlsruhe'}
            height={60}
            priority={true}
          />
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
