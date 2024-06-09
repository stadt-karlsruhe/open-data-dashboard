import { GeoJSONResource, JSONResource, Resource } from '@/schemas/configuration-schema';

import EmbeddedViewer from '../visualization/EmbeddedViewer';
import Visualization from '../visualization/layout/Visualization';
import dynamic from 'next/dynamic';

const ResourceDetailsControls = dynamic(() => import('./ResourceDetailsControls'), { ssr: false });

export default function ResourceDetails({ resource }: { resource: Resource }) {
  return (
    <div
      className="flex-grow-1 p-2"
      style={{ height: resource.type === 'HTML' || resource.type === 'PDF' ? '100dvh' : undefined }}
    >
      <h1 className="h1 text-center">{resource.name}</h1>
      <p className="lead text-center">{resource.description}</p>
      <ResourceDetailsControls resource={resource} />
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
    </div>
  );
}
