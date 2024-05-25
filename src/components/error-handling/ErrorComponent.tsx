'use client';

import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';
import { useTranslations } from 'next-intl';

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

export default function ErrorComponent({ title, code }: { title?: string; code?: number }) {
  const t = useTranslations('Error');
  let errorTitle;
  let subTitle;
  let codeElement;
  if (code === 404) {
    errorTitle = t('notFoundTitle');
    subTitle = t('notFoundSubtitle');
    codeElement = (
      <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
        <span className="display-1 fw-bold">4</span>
        <i className="bi bi-exclamation-circle-fill text-danger display-4"></i>
        <span className="display-1 fw-bold bsb-flip-h">4</span>
      </h2>
    );
  } else {
    errorTitle = title ?? t('unexpectedTitle');
    subTitle = t('genericSubtitle');
    codeElement = code ? <span className="display-1 fw-bold">{code}</span> : <div />;
  }

  return (
    <div className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div>
              {codeElement}
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
