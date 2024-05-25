'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function Legend({ labels }: { labels: Map<string, string> }) {
  const t = useTranslations('Legend');
  return (
    <div className="bg-white card leaflet-bottom leaflet-left m-3" style={{ width: '200px', maxWidth: '50vw' }}>
      <h6 className="card-header text-center">{t('title')}</h6>
      <div className="card-body">
        {[...labels.entries()].map(([label, color]) => (
          <div className="row" key={label}>
            <div className="col-1 bi bi-circle-fill" style={{ color, fontSize: '16px' }} />
            <div className="col-10" style={{ fontSize: '16px' }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
