import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';
import { Layer } from 'leaflet';
import { Tooltip } from 'recharts';

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
        geoJsonData && <GeoJSON data={geoJsonData} onEachFeature={onEach} />
      }
    </MapContainer>
  );
}

const onEach = (feature: GeoJSON.Feature, layer: Layer) => {
  let name = 'text';
  if (feature.properties?.NAME !== undefined && typeof feature.properties.NAME === 'string') {
    name = feature.properties.NAME;
  }
  layer.on('mouseover', (e) => layer.bindPopup(name).openPopup());
};
