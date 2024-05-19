import { LatLngExpression } from 'leaflet';
import React from 'react';
import { useMap } from 'react-leaflet';
import { useTranslations } from 'next-intl';

export default function ResetView({ latLng, zoom }: { latLng: LatLngExpression; zoom: number }) {
  const map = useMap();
  const t = useTranslations('ResetView');
  return (
    <button
      style={{ zIndex: 400, fontSize: '20px' }}
      className="btn btn-secondary rounded-1 m-3 position-relative"
      onClick={() => {
        map.setView(latLng, zoom);
      }}
      title={t('resetTooltip')}
    >
      <i className="bi bi-crosshair" />
    </button>
  );
}
