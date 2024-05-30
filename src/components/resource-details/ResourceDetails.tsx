import EmbeddedViewer from '../visualization/EmbeddedViewer';
import { Resource } from '@/schemas/configuration-schema';
import ResourceDetailsControls from './ResourceDetailsControls';
import Visualization from '../visualization/layout/Visualization';

export default function ResourceDetails({ resource }: { resource: Resource }) {
  return (
    <div className="container-xl" style={{ maxWidth: '1500px' }}>
      <h1 className="h1 text-center">{resource.name}</h1>
      <p className="lead text-center">{resource.description}</p>
      <ResourceDetailsControls resource={resource} />
      <div
        className={`d-flex flex-column ${resource.type === 'GeoJSON' ? 'border border-secondary' : ''}`}
        style={{ maxHeight: '800px' }}
      >
        {resource.type === 'Embedded' ? (
          <EmbeddedViewer resource={resource} height={800} />
        ) : (
          <Visualization resource={resource} />
        )}
      </div>
    </div>
  );
}
