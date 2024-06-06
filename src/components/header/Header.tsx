'use client';

import Image from 'next/image';
import LocaleSwitcher from './LocaleSwitcher';
import LogoKarlsruhe from '../../public/Logo_Digital_Karlsruhe-rechts_rgb.svg';
import LogoKarlsruheSmall from '../../public/Logo_Digital_Karlsruhe-rechts_rgb_small.svg';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { usePathname } from 'next/navigation';
import { useShowNavigation } from '../navigation/NavigationProvider';
import { useTranslations } from 'next-intl';

export default function Header() {
  const { show, setShow } = useShowNavigation();
  const t = useTranslations('Header');
  const showSearchbar = !usePathname().endsWith('/home');
  return (
    <div className="bg-white pb-3">
      <div className="container-md">
        <div className="d-flex flex-row d-md-none fs-5 m-2">
          <button
            className="d-block btn btn-secondary"
            onClick={(e) => {
              setShow(!show);
            }}
          >
            <i className="bi bi-list" />
          </button>
          <div className="d-block flex-fill align-content-center p-2 ps-4">{t('title')}</div>
          <Image
            className="d-block justify-content-end"
            src={LogoKarlsruheSmall as StaticImport}
            alt={'LogoKarlsruheSmall'}
            height={50}
          />
        </div>
        <div className="flex-row flex-wrap flex-xl-nowrap d-none d-md-flex fs-2">
          <div className="d-block flex-fill align-content-center p-2 ps-4">{t('title')}</div>
          {showSearchbar && (
            <div className="d-block flex-fill item-wrap align-content-center fs-5 p-2">
              <input placeholder={t('search')} className="form-control m-auto" style={{ maxWidth: '50vw' }} />
            </div>
          )}
          <div className="d-block flex-fill align-content-center p-2">
            <LocaleSwitcher />
          </div>
          <Image
            className="d-block justify-content-end"
            src={LogoKarlsruhe as StaticImport}
            alt={'LogoKarlsruhe'}
            height={60}
          />
        </div>
      </div>
    </div>
  );
}
