'use client';

import 'leaflet/dist/leaflet.css';

import { FeatureGroup, MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import { colorPrimary, getColor } from '@/utils/colors';

import { GeoJSONResource } from '@/schemas/configurationSchema';
import Legend from './Legend';
import ReactDOMServer from 'react-dom/server';
import ResetView from './ResetView';

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
      style={{ height: '100dvh', width: '100%' }}
      center={standardPos.latLng}
      zoom={standardPos.zoom}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
      />
      {geoJsonData.features.map((feature, index) => {
        let colorCode = colorPrimary;
        const label = getLabelForKey(feature.properties, resource.visualizations.map.groupKey);
        if (label) {
          const mappedColor = collectedLabels.get(label);
          if (mappedColor === undefined) {
            colorCode = getColor(collectedLabels.size);
            collectedLabels.set(label, colorCode);
          } else {
            colorCode = mappedColor;
          }
        }
        if (feature.geometry.type !== 'Point') {
          return;
        }
        return (
          <FeatureGroup key={index}>
            <Tooltip>
              {Object.entries(feature.properties as Record<string, string>).map(([key, value], index) => (
                <div key={index}>
                  <b>{key}: </b>
                  {value} <br />
                </div>
              ))}
            </Tooltip>
            <Marker
              position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
              icon={getIcon(colorCode)}
            />
          </FeatureGroup>
        );
      })}
      <ResetView zoom={standardPos.zoom} latLng={standardPos.latLng} />
      {collectedLabels.size > 0 ? <Legend labels={collectedLabels} /> : <></>}
    </MapContainer>
  );
}

function getLabelForKey(properties: GeoJSON.GeoJsonProperties, groupLabel: string | undefined) {
  if (
    groupLabel &&
    properties !== null &&
    properties[groupLabel] !== undefined &&
    typeof properties[groupLabel] === 'string'
  ) {
    return properties[groupLabel] as string;
  }
}

function getIcon(color: string) {
  return L.divIcon({
    className: 'custom-icon-div',
    html: ReactDOMServer.renderToString(
      <i role="button" aria-label="map-marker" style={{ color }} className="bi bi-geo-alt-fill fs-2" />,
    ),
    iconAnchor: [15, 30],
  });
}
