import { LatLngExpression } from 'leaflet';
import React from 'react';
import { useMap } from 'react-leaflet';
import { useTranslations } from 'next-intl';

export default function ResetView({ latLng, zoom }: { latLng: LatLngExpression; zoom: number }) {
  const map = useMap();
  const t = useTranslations('ResetView');
  return (
    <button
      style={{ zIndex: 400 }}
      className="btn btn-secondary m-3 position-absolute fs-5"
      onClick={() => {
        map.setView(latLng, zoom);
      }}
      title={t('resetTooltip')}
      data-cy="map-reset-button"
    >
      <i className="bi bi-crosshair" />
    </button>
  );
}
