'use client';

import LocaleSwitcher from './LocaleSwitcher';
import LogoKarlsruhe from '../../public/Logo_Digital_Karlsruhe-rechts_rgb.svg';
import LogoKarlsruheSmall from '../../public/Logo_Digital_Karlsruhe-rechts_rgb_small.svg';
import { useShowNavigation } from '../navigation/NavigationProvider';
import { useTranslations } from 'next-intl';

const title = 'Open Data Dashboard';

export default function Header() {
  const { show, setShow } = useShowNavigation();
  const t = useTranslations('Header');
  return (
    <div className="bg-white pb-3">
      <div className="container-md">
        <div className="d-flex flex-row fs-5 d-md-none m-2">
          <button
            className="d-block btn btn-secondary d-block"
            onClick={(e) => {
              setShow(!show);
            }}
          >
            <i className="bi bi-list" />
          </button>
          <div className="d-block flex-fill align-content-center p-2 ps-4">{t('title')}</div>
          <div className="d-block justify-content-end" style={{ height: '2.5em' }}>
            <LogoKarlsruheSmall />
          </div>
        </div>
        <div className="flex-row flex-wrap fs-2 d-none d-md-flex">
          <div className="d-block flex-fill align-content-center p-2 ps-4">{t('title')}</div>
          <div className="d-block flex-fill fs-5 align-content-center p-2 item-wrap">
            <input placeholder={t('search')} className="form-control" style={{ maxWidth: '50vw', margin: 'auto' }} />
          </div>
          <div className="d-block flex-fill align-content-center p-2">
            <LocaleSwitcher />
          </div>
          <div className="d-block justify-content-end" style={{ height: '2em' }}>
            <LogoKarlsruhe />
          </div>
        </div>
      </div>
    </div>
  );
}
