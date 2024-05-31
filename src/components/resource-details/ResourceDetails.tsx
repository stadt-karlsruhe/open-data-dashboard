import EmbeddedViewer from '../visualization/EmbeddedViewer';
import { Resource } from '@/schemas/configuration-schema';
import Visualization from '../visualization/layout/Visualization';
import dynamic from 'next/dynamic';

const ResourceDetailsControls = dynamic(() => import('./ResourceDetailsControls'), { ssr: false });

export default function ResourceDetails({ resource }: { resource: Resource }) {
  return (
    <div className="container-xl" style={{ maxWidth: '1500px', height: '100dvh' }}>
      <h1 className="h1 text-center">{resource.name}</h1>
      <p className="lead text-center">{resource.description}</p>
      <ResourceDetailsControls resource={resource} />
      <div
        className={`d-flex flex-column ${resource.type === 'GeoJSON' ? 'border border-secondary' : ''}`}
        style={{ height: '80%' }}
      >
        {resource.type === 'Embedded' ? (
          <EmbeddedViewer resource={resource} height="100%" />
        ) : (
          <Visualization resource={resource} />
        )}
      </div>
    </div>
  );
}
