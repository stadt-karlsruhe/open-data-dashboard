'use client';

import 'leaflet/dist/leaflet.css';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';
import L, { LatLngExpression, Layer } from 'leaflet';
import Legend from './Legend';
import React from 'react';
import ResetView from './ResetView';
import { getColor } from '@/colors';

const collectedLabels = new Map<string, string>();

const standardPos = {
  latLng: [49.013_677_698_392_264, 8.404_375_426_378_891] as LatLngExpression,
  zoom: 13.5,
};

export default function GeoMap({ geoJsonData }: { geoJsonData: GeoJSON.FeatureCollection }) {
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
        geoJsonData && <GeoJSON data={geoJsonData} pointToLayer={pointToLayer} onEachFeature={onEach} />
      }
      <ResetView zoom={standardPos.zoom} latLng={standardPos.latLng} />
      <Legend labels={collectedLabels} />
    </MapContainer>
  );
}

// TODO: We need to somehow set the information which field of the properties holds the label for the legend.
// Might mean that we modify the config file.
// TODO2: We definitely need a better way to get our colors, randomly generated ones aren't always appropriate.
function pointToLayer(feature: GeoJSON.Feature, latlng: LatLngExpression) {
  let colorCode = '#c30b82';
  if (feature.properties?.GRUPPENNAME_DE !== undefined && typeof feature.properties.GRUPPENNAME_DE === 'string') {
    const mappedColor = collectedLabels.get(feature.properties.GRUPPENNAME_DE);
    if (mappedColor === undefined) {
      colorCode = getColor(collectedLabels.size);
      collectedLabels.set(feature.properties.GRUPPENNAME_DE, colorCode);
    } else {
      colorCode = mappedColor;
    }
  }
  const icon = getIcon(colorCode);
  return L.marker(latlng, { icon });
}

function getIcon(color: string) {
  return L.divIcon({
    // eslint-disable-next-line unicorn/no-keyword-prefix
    className: 'custom-icon-div',
    html: `<div style='color:${color}; font-size: 30px' class='bi bi-geo-alt-fill'></div>`,
    iconAnchor: [15, 30],
  });
}

const onEach = (feature: GeoJSON.Feature, layer: Layer) => {
  const featureProperties = feature.properties as Record<string, string>;
  let content = '';
  Object.entries(featureProperties).forEach(([key, value]) => {
    content += `<b>${key}:</b> ${value} <br/>`;
  });
  if (content !== '') {
    layer.on('mouseover', (e) => layer.bindTooltip(content).openTooltip());
  }
};
