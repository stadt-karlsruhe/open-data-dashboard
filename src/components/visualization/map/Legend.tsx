import { useEffect, useRef } from 'react';

import L from 'leaflet';
import { useTranslations } from 'next-intl';

export default function Legend({ labels }: { labels: Map<string, string> }) {
  const t = useTranslations('Legend');
  const legendRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (legendRef.current !== null) {
      L.DomEvent.disableScrollPropagation(legendRef.current);
    }
  });
  return (
    <div
      ref={legendRef}
      className="bg-white card position-absolute m-3 fs-6"
      style={{ width: '200px', maxWidth: '50vw', maxHeight: '200px', zIndex: 400, bottom: '6px', left: '6px' }}
      data-cy="map-legend"
    >
      <div className="card-header text-center">{t('title')}</div>
      <div className="card-body overflow-y-auto">
        {[...labels.entries()]
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([label, color]) => (
            <div className="row" key={label}>
              <div className="col-1 bi bi-circle-fill" style={{ color }} />
              <div className="col-10">{label}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
