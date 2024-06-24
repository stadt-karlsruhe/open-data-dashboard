'use client';

import { Resource } from '@/schemas/configuration/configurationSchema';
import { colorRed } from '@/utils/colors';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

interface ApplicationError {
  type: 'notFound' | 'dataEmpty' | 'dataNotLoaded' | 'configurationError' | 'unexpected';
  resource?: Resource;
  error?: string;
}

export default function ErrorComponent({ type, resource, error }: ApplicationError) {
  const t = useTranslations('Error');
  useEffect(() => {
    if (type !== 'notFound') {
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
    <div className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center flex-fill">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div>
              <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
                <span style={{ color: colorRed }} className="display-1 fw-bold">
                  {type === 'notFound' ? 4 : 5}
                </span>
                {type === 'notFound' ? (
                  <i style={{ color: colorRed }} className="bi bi-exclamation-circle-fill display-4" />
                ) : (
                  <span style={{ color: colorRed }} className="display-1 fw-bold">
                    0
                  </span>
                )}
                <span style={{ color: colorRed }} className="display-1 fw-bold">
                  {type === 'notFound' ? 4 : 0}
                </span>
              </h2>
              <h5 className="mb-2">{t(`${type}Title`)}</h5>
              <p className="mb-2">{type === 'notFound' ? t('notFoundSubtitle') : t('genericSubtitle')}</p>
              <Link className="btn btn-primary mt-2" href="/">
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
