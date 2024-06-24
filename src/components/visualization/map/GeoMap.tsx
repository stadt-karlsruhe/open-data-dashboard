'use client';

import 'leaflet/dist/leaflet.css';

import { FeatureGroup, MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import { colorDark, colorPrimary, getColor } from '@/utils/colors';

import { GeoJSON as GeoJSONLeaflet } from 'react-leaflet/GeoJSON';
import { GeoJSONResource } from '@/schemas/configuration/configurationSchema';
import Legend from './Legend';
import Link from 'next/link';
import ReactDOMServer from 'react-dom/server';
import ResetView from './ResetView';
import { TransformedData } from '@/schemas/dataSchema';
import proj4 from 'proj4';

const standardPos = {
  latLng: [49.013_677_698_392_264, 8.404_375_426_378_891] as LatLngExpression,
  zoom: 13.5,
};
const utm = '+proj=utm +zone=32';
const latLng = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';

// eslint-disable-next-line max-lines-per-function
export default function GeoMap({
  resource,
  geoJsonData,
  height = '100dvh',
}: {
  resource: GeoJSONResource;
  geoJsonData: GeoJSON.FeatureCollection;
  height?: string | number;
}) {
  const collectedLabels = new Map<string, string>();
  return (
    <MapContainer
      style={{ height, width: '100%' }}
      center={standardPos.latLng}
      zoom={standardPos.zoom}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution={ReactDOMServer.renderToString(
          <>
            &copy;{' '}
            <Link href="https://osm.org/copyright" target="_blank">
              OpenStreetMap
            </Link>
          </>,
        )}
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
        } else if (!label && resource.visualizations.map.groupKey) {
          colorCode = colorDark;
        }
        return (
          <FeatureGroup key={index}>
            <Tooltip>
              {Object.entries(feature.properties as TransformedData).map(([key, value], index) => (
                <div key={index}>
                  <b>{key}: </b>
                  {value} <br />
                </div>
              ))}
            </Tooltip>
            {feature.geometry.type !== 'Point' && (
              <GeoJSONLeaflet
                data={feature}
                coordsToLatLng={(coords) => utmToLatLng(coords, resource.coordinateFormat)}
                style={{ color: colorCode }}
              />
            )}
            {feature.geometry.type === 'Point' && (
              <Marker
                position={utmToLatLng(
                  [feature.geometry.coordinates[0], feature.geometry.coordinates[1]],
                  resource.coordinateFormat,
                )}
                icon={getIcon(colorCode)}
              />
            )}
          </FeatureGroup>
        );
      })}
      <ResetView zoom={standardPos.zoom} latLng={standardPos.latLng} />
      {collectedLabels.size > 0 && <Legend labels={collectedLabels} />}
    </MapContainer>
  );
}

function getLabelForKey(properties: GeoJSON.GeoJsonProperties, groupKey: string | undefined) {
  if (groupKey && properties !== null) {
    const groupKeyString = String(groupKey);
    if (properties[groupKeyString] !== undefined) {
      return String(properties[groupKey]);
    }
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

function utmToLatLng(coords: [number, number] | [number, number, number], format: 'LatLng' | 'UTM') {
  const [longitude, latitude] = coords;
  if (format === 'LatLng') {
    return L.latLng([latitude, longitude]);
  }
  const [transformedLongitude, transformedLatitude] = proj4(utm, latLng, [longitude, latitude]);
  return L.latLng([transformedLatitude, transformedLongitude]);
}
