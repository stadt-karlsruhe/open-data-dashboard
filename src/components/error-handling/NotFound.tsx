'use client';

import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';
import { useTranslations } from 'next-intl';

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
                <span className="display-1 fw-bold">4</span>
                <i className="bi bi-exclamation-circle-fill text-danger display-4"></i>
                <span className="display-1 fw-bold bsb-flip-h">4</span>
              </h2>
              <h3 className="h2 mb-2">{t('title')}</h3>
              <p className="mb-5">{t('subtitle')}</p>
              <Link className="btn bsb-btn-5xl btn-dark badge px-5 fs-6 m-0" href="/">
                {t('returnBtn')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
