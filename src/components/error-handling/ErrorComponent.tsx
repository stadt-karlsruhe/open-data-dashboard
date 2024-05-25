'use client';

import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

export default function ErrorComponent({
  title,
  code,
  logMessage,
}: {
  title?: string;
  code: 404 | 500;
  logMessage?: string;
}) {
  const t = useTranslations('Error');
  useEffect(() => {
    if (logMessage) {
      console.error(logMessage);
    }
  }, [logMessage]);

  let errorTitle;
  let subTitle;
  if (code === 404) {
    errorTitle = t('notFoundTitle');
    subTitle = t('notFoundSubtitle');
  } else {
    errorTitle = title ?? t('unexpectedTitle');
    subTitle = t('genericSubtitle');
  }

  return (
    <div className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div>
              {code === 404 ? codeElement404 : codeElement500}
              <h5 className="mb-2">{errorTitle}</h5>
              <p className="mb-2">{subTitle}</p>
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
