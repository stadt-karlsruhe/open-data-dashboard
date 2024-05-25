'use client';

import 'leaflet/dist/leaflet.css';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';
import L, { LatLngExpression, Layer } from 'leaflet';
import { GeoJSONResource } from '@/types/configuration';
import Legend from './Legend';
import React from 'react';
import ResetView from './ResetView';
import { getColor } from '@/colors';

const collectedLabels = new Map<string, string>();

const standardPos = {
  latLng: [49.013_677_698_392_264, 8.404_375_426_378_891] as LatLngExpression,
  zoom: 13.5,
};

export default function GeoMap({
  resource,
  geoJsonData,
}: {
  resource: GeoJSONResource;
  geoJsonData: GeoJSON.FeatureCollection;
}) {
  return (
    <MapContainer
      center={standardPos.latLng}
      zoom={standardPos.zoom}
      scrollWheelZoom={true}
      zoomControl={false}
      style={{ height: '100vh' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        geoJsonData && (
          <GeoJSON
            data={geoJsonData}
            pointToLayer={(feature, latLng) => pointToLayer(feature, latLng, resource.visualizations.map.labelKey)}
            onEachFeature={(feature, layer) => {
              onEach(feature, layer, resource.visualizations.map.tooltipFields);
            }}
          />
        )
      }
      <ResetView zoom={standardPos.zoom} latLng={standardPos.latLng} />
      <Legend labels={collectedLabels} />
    </MapContainer>
  );
}

function pointToLayer(feature: GeoJSON.Feature<GeoJSON.Point, unknown>, latlng: LatLngExpression, labelKey: string) {
  const geoJsonFeature = feature as GeoJSON.Feature;
  let colorCode = 'var(--bs-primary)';
  const label = getLabelForKey(geoJsonFeature.properties, labelKey);
  if (label !== '') {
    const mappedColor = collectedLabels.get(label);
    if (mappedColor === undefined) {
      colorCode = getColor(collectedLabels.size);
      collectedLabels.set(label, colorCode);
    } else {
      colorCode = mappedColor;
    }
  }
  const icon = getIcon(colorCode);
  return L.marker(latlng, { icon });
}

function getLabelForKey(properties: GeoJSON.GeoJsonProperties, keyLabel: string) {
  if (properties !== null && properties[keyLabel] !== undefined && typeof properties[keyLabel] === 'string') {
    return properties[keyLabel] as string;
  }
  return '';
}

function getIcon(color: string) {
  return L.divIcon({
    // eslint-disable-next-line unicorn/no-keyword-prefix
    className: 'custom-icon-div',
    html: `<div style='color:${color}; font-size: 30px' class='bi bi-geo-alt-fill'></div>`,
    iconAnchor: [15, 30],
  });
}

const onEach = (
  feature: GeoJSON.Feature<GeoJSON.Geometry, unknown>,
  layer: Layer,
  tooltipFields: Record<string, string>,
) => {
  const featureProperties = feature.properties as Record<string, string>;
  let content = '';
  Object.entries(featureProperties)
    .filter(([key]) => tooltipFields[key])
    .forEach(([key, value]) => {
      content += `<b>${tooltipFields[key]}:</b> ${value} <br/>`;
    });
  if (content !== '') {
    layer.on('mouseover', (e) => layer.bindTooltip(content).openTooltip());
  }
};
