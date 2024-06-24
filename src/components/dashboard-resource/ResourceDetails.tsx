import { GeoJSONResource, JSONResource, Resource } from '@/schemas/configuration/configurationSchema';

import EmbeddedViewer from '../visualization/EmbeddedViewer';
import Visualization from '../visualization/Visualization';
import dynamic from 'next/dynamic';

const DashboardResourceControls = dynamic(() => import('./DashboardResourceControls'), {
  ssr: false,
});

export default function ResourceDetails({ resource }: { resource: Resource }) {
  return (
    <>
      <DashboardResourceControls type="resource" element={resource} />
      <div
        className={`d-flex flex-column flex-grow-1 ${resource.type === 'GeoJSON' ? 'border border-secondary' : ''}`}
        style={{
          height:
            resource.type === 'GeoJSON' || resource.type === 'HTML' || resource.type === 'PDF' ? '75dvh' : undefined,
        }}
      >
        {resource.type === 'HTML' || resource.type === 'PDF' ? (
          <EmbeddedViewer resource={resource} height="100%" className="d-flex h-100" />
        ) : (
          <Visualization resource={resource as JSONResource | GeoJSONResource} />
        )}
      </div>
    </>
  );
}
