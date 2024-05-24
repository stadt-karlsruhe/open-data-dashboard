'use client';

import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';
import { useTranslations } from 'next-intl';

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

export default function GenericError({ detailMessage, errorCode }: { detailMessage?: string; errorCode?: string }) {
  const t = useTranslations('Error');
  const message = detailMessage ?? t('genericMessage');

  return (
    <div className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h3 className="h2 mb-2">{t('title')}</h3>
              <p>
                {t('errorCode')}
                {errorCode}
              </p>
              <p className="mb-5">{message}</p>
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
