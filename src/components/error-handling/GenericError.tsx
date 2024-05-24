'use client';

import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

export default function GenericError({
  message,
  code,
  detail,
}: {
  message?: string;
  code?: string;
  detail: string | undefined;
}) {
  const t = useTranslations('Error');
  const [showDetail, setShowDetail] = useState(false);
  const errorMessage = message ?? t('genericMessage');
  const errorCode = code === undefined ? undefined : `: ${t('errorCode')}${code}`;

  function clickDetailButton() {
    setShowDetail(!showDetail);
  }

  return (
    <div className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h3 className="h2 mb-2">{t('title') + (errorCode ?? '')}</h3>
              <p className="mb-2">{errorMessage}</p>
              <Link className="btn bsb-btn-5xl btn-dark badge px-5 fs-6 m-0 mb-2" href="/">
                {t('returnBtn')}
              </Link>
              <br />
              <button className="btn bsb-btn-5xl btn-secondary badge px-5 fs-6 m-0" onClick={clickDetailButton}>
                {t('detailBtn')}
              </button>
              {showDetail && <p>{detail}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
