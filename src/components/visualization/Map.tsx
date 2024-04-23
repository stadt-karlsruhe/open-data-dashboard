'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { TileLayer, MapContainer, GeoJSON } from 'react-leaflet';
// eslint-disable-next-line import/named
import useSWR, { Fetcher } from 'swr';
import { Resource } from '@/types/visualization';

const fetcher: Fetcher<unknown, string> = (url) => getData(url);

export default function Map({ resource }: { resource: Resource }) {
  const { data } = useSWR(resource.endpoint, fetcher);
  const dataAsFeatureCollection = data as GeoJSON.FeatureCollection<any>;
  console.log(dataAsFeatureCollection);
  if (resource.visType === 'MAP') {
    return (
      <MapContainer
        center={[49.013_677_698_392_264, 8.404_375_426_378_891]}
        zoom={13.5}
        scrollWheelZoom={false}
        style={{ height: '100vh' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {
          /* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */
          dataAsFeatureCollection && <GeoJSON data={dataAsFeatureCollection} />
        }
      </MapContainer>
    );
  }
}

async function getData(endpoint: string) {
  const response = await fetch(endpoint);
  return response.json();
}
