'use client';

import { Resource } from '@/schema';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

interface ApplicationError {
  type: 'notFound' | 'dataEmpty' | 'dataNotLoaded' | 'resourceConfigurationInvalid' | 'unexpected';
  resource?: Resource;
  error?: string;
}

export default function ErrorComponent({ type, resource, error }: ApplicationError) {
  const t = useTranslations('Error');
  useEffect(() => {
    if (type === 'dataNotLoaded' || type === 'resourceConfigurationInvalid' || type === 'unexpected') {
      console.error(
        t(`${type}Message`, {
          source: resource?.source,
          name: resource?.name,
          id: resource?.id,
          error,
        }),
      );
    }
  });

  return (
    <div className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div>
              {type === 'notFound' ? codeElement404 : codeElement500}
              <h5 className="mb-2">{t(`${type}Title`)}</h5>
              <p className="mb-2">{type === 'notFound' ? t('notFoundSubtitle') : t('genericSubtitle')}</p>
              <Link className="btn bsb-btn-5xl btn-dark badge px-5 fs-6 m-0 mb-2" href="/">
                {t('returnBtn')}
              </Link>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const codeElement404 = (
  <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
    <span className="display-1 fw-bold">4</span>
    <i className="bi bi-exclamation-circle-fill text-danger display-4"></i>
    <span className="display-1 fw-bold bsb-flip-h">4</span>
  </h2>
);

const codeElement500 = (
  <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
    <span className="display-1 fw-bold">5</span>
    <span className="display-1 fw-bold bsb-flip-h">0</span>
    <span className="display-1 fw-bold bsb-flip-h">0</span>
  </h2>
);
