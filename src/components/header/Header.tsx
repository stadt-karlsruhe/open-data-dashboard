'use client';

import { Configuration } from '@/schemas/configurationSchema';
import Image from 'next/image';
import LocaleSwitcher from './LocaleSwitcher';
import LogoKarlsruhe from '../../public/Logo_Digital_Karlsruhe-rechts_rgb.svg';
import LogoKarlsruheSmall from '../../public/Logo_Digital_Karlsruhe-rechts_rgb_small.svg';
import Search from '../search/Search';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';
import { useShowNavigation } from '../navigation/NavigationProvider';
import { useTranslations } from 'next-intl';

const { Link, usePathname } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

// eslint-disable-next-line max-lines-per-function
export default function Header({ configuration }: { configuration: Configuration }) {
  const { show, setShow } = useShowNavigation();
  const t = useTranslations('Header');
  const showSearchbar = !usePathname().endsWith('/home');
  return (
    <div className="bg-white py-1 py-lg-3">
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
          <Link
            href="/home"
            className="link link-secondary link-underline-opacity-0 text-black fs-5 fs-lg-2 text-nowrap"
          >
            {t('title')}
          </Link>
          <div className="d-flex flex-fill mx-lg-3 mx-xl-5">
            {showSearchbar && (
              <Search
                configuration={configuration}
                id="desktop-search"
                className="d-none d-md-block flex-fill p-2 m-auto"
              />
            )}
            <LocaleSwitcher className="d-none d-md-block p-2" />
          </div>
          <Image
            className="d-block d-lg-none"
            src={LogoKarlsruheSmall as StaticImport}
            alt={'LogoKarlsruheSmall'}
            height={50}
          />
          <Image
            className="d-none d-lg-block"
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
            id="mobile-search"
            className="d-block d-md-none flex-fill m-0"
            style={{ maxWidth: '70vw' }}
          />
        )}
      </div>
    </div>
  );
}
