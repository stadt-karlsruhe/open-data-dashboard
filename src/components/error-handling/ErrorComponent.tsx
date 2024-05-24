'use client';

import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

export default function ErrorComponent({
  title,
  message,
  code,
  detail,
}: {
  title?: string;
  message: string;
  code?: string;
  detail?: string;
}) {
  const t = useTranslations('Error');
  const [showDetail, setShowDetail] = useState(false);
  const errorTitle = title ?? t('genericTitle');
  const statusCode = code === undefined ? undefined : `${t('code')}${code}`;

  function clickDetailButton() {
    setShowDetail(!showDetail);
  }

  return (
    <div className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div>
              <p className="h5 mb-2">{errorTitle}</p>
              <br />
              <p className="mb-2">{message}</p>
              <Link className="btn bsb-btn-5xl btn-dark badge px-5 fs-6 m-0 mb-2" href="/">
                {t('returnBtn')}
              </Link>
              <br />
              {detail && (
                <div>
                  <button className="btn bsb-btn-5xl btn-secondary badge px-5 fs-6 m-0" onClick={clickDetailButton}>
                    {showDetail ? t('lessDetail') : t('moreDetail')}
                  </button>
                  {showDetail && (
                    <p>
                      {statusCode} <br />
                      {detail}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
