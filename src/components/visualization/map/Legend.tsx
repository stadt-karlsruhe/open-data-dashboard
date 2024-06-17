import { useEffect, useRef } from 'react';

import L from 'leaflet';
import { useTranslations } from 'next-intl';

export default function Legend({ labels }: { labels: Map<string, string> }) {
  const t = useTranslations('Legend');
  const divLegend = useRef(null);
  useEffect(() => {
    if(divLegend.current !== null){
        L.DomEvent.disableScrollPropagation(divLegend.current);
    }
  })
  return (
    <div ref={divLegend}
      className="bg-white card position-absolute m-3 fs-6"
      style={{ width: '200px', maxWidth: '50vw', maxHeight: '200px', zIndex: 400, bottom: '6px', left: '6px' }}
    >
      <div className="card-header text-center">{t('title')}</div>
      <div className="card-body overflow-y-auto">
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
