'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function Legend({ labels }: { labels: Map<string, string> }) {
  const t = useTranslations('Legend');
  return (
    <div className="bg-white card leaflet-bottom leaflet-left m-3 fs-6" style={{ width: '200px', maxWidth: '50vw' }}>
      <div className="card-header text-center">{t('title')}</div>
      <div className="card-body">
        {[...labels.entries()].map(([label, color]) => (
          <div className="row" key={label}>
            <div className="col-1 bi bi-circle-fill" style={{ color }} />
            <div className="col-10">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
