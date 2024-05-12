import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';
import L, { LatLngExpression, Layer } from 'leaflet';
import React, { useEffect } from 'react';
import Legend from './Legend';
import { MapPos } from '@/types/visualization';
import ResetView from './ResetView';

const collectedLabels: string[] = [];

export default function Map({ geoJsonData }: { geoJsonData: GeoJSON.FeatureCollection }) {
  return (
    <MapContainer
      center={[49.013_677_698_392_264, 8.404_375_426_378_891]}
      zoom={13.5}
      scrollWheelZoom={false}
      style={{ height: '100vh' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        geoJsonData && <GeoJSON data={geoJsonData} pointToLayer={pointToLayer} onEachFeature={onEach} />
      }
      <ResetView resetViewInput={{ title: 'Reset', pos: standardPos }} />
      <Legend legendInput={{ title: 'Legende', labels: collectedLabels }} />
    </MapContainer>
  );
}

function pointToLayer(feature: GeoJSON.Feature, latlng: LatLngExpression) {
  return L.marker(latlng, { icon });
}

// TODO: maybe custom colors?
const icon = L.divIcon({
  // eslint-disable-next-line unicorn/no-keyword-prefix
  className: 'custom-icon-div',
  html: "<div style='color:#c30b82; font-size: 30px' class='bi bi-geo-alt-fill'></div>",
  iconAnchor: [15, 30],
});

const standardPos: MapPos = {
  latLon: [49.013_677_698_392_264, 8.404_375_426_378_891],
  zoom: 13.5,
};

// TODO: this needs better typing
const onEach = (feature: GeoJSON.Feature, layer: Layer) => {
  let name = 'text';
  if (feature.properties?.NAME !== undefined && typeof feature.properties.NAME === 'string') {
    name = feature.properties.NAME;
  }
  if (
    feature.properties?.GRUPPENNAME_DE !== undefined &&
    typeof feature.properties.GRUPPENNAME_DE === 'string' &&
    !collectedLabels.includes(feature.properties.GRUPPENNAME_DE)
  ) {
    collectedLabels.push(feature.properties.GRUPPENNAME_DE);
  }
  layer.on('mouseover', (e) => layer.bindTooltip(name).openTooltip());
};
