'use client';

import { Dashboard, Resource } from '@/schemas/configuration/configurationSchema';

import EmbedModal from './EmbedModal';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

type DashboardResourceControlsProps =
  | {
      type: 'dashboard';
      element: Dashboard;
    }
  | { type: 'resource'; element: Resource };

export default function DashboardResourceControls({ type, element }: DashboardResourceControlsProps) {
  const [show, setShow] = useState(false);
  const searchParams = useSearchParams();
  const t = useTranslations('DashboardResourceControls');

  return (
    <div className="d-flex flex-row justify-content-center justify-content-md-between mb-3">
      <Link
        className="btn btn-primary"
        href={`/embed/${type}/${element.id}${getParams()}`}
        title={t('fullscreen')}
        data-cy="control-fullscreen"
      >
        <i className="bi bi-arrows-fullscreen" /> <span className="d-none d-md-inline">{t('fullscreen')}</span>
      </Link>
      <div className="d-flex flex-row">
        <button
          className="btn btn-primary ms-1 ms-md-0"
          onClick={() => {
            setShow(true);
          }}
          title={t('embed')}
          data-cy="control-embed"
        >
          <i className="bi bi-code-slash" /> <span className="d-none d-md-inline">{t('embed')}</span>
        </button>
        {type === 'resource' && (
          <Link
            className="btn btn-primary ms-1 ms-md-3"
            href={element.source}
            target="_blank"
            title={t('download')}
            data-cy="control-download"
          >
            <i className="bi bi-download" /> <span className="d-none d-md-inline">{t('download')}</span>
          </Link>
        )}
      </div>
      {type === 'dashboard' ? (
        <EmbedModal show={show} type="dashboard" element={element} setShow={setShow} />
      ) : (
        <EmbedModal show={show} type="resource" element={element} setShow={setShow} />
      )}
    </div>
  );

  function getParams() {
    if (type === 'resource' && (element.type === 'JSON' || element.type === 'CSV')) {
      const params = Object.fromEntries(
        Object.entries(searchParams).filter(([key]) => key === 'filter' || key === 'visualization'),
      );
      return Object.keys(params).length === 0 ? '' : `?${new URLSearchParams(params).toString()}`;
    }
    return '';
  }
}
