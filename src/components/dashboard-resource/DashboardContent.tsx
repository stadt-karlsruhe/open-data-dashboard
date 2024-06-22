import {
  Configuration,
  DashboardContent as Content,
  GeoJSONResource,
  JSONResource,
} from '@/schemas/configurationSchema';

import { CSSProperties } from 'react';
import EmbeddedViewer from '../visualization/EmbeddedViewer';
import ErrorComponent from '../error-handling/ErrorComponent';
import Visualization from '../visualization/Visualization';
import { concatenateNameAndId } from '@/utils/stringUtils';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

// eslint-disable-next-line max-lines-per-function
export default function DashboardContent({
  content,
  configuration,
  className,
  style,
}: {
  content: Content;
  configuration: Configuration;
  className?: string;
  style?: CSSProperties;
}) {
  if (content.type === 'EXTERNAL') {
    return (
      <EmbeddedViewer
        // TODO: Properly handle height
        height={260}
        resource={{
          source: content.source,
          id: 'external',
          name: content.name,
          type: 'HTML',
        }}
      />
    );
  }
  const resource = configuration.resources.find((resource) => resource.id === content.id);
  if (!resource) {
    return <ErrorComponent type="configurationError" error={'Dashboard resource not found in configuration!'} />;
  }
  return (
    <div className={`card d-flex flex-column ${className ?? ''}`} style={{ ...style, height: getSize(content.size) }}>
      <div className="card-header">
        <div className="d-flex justify-content-between">
          <div>Featured</div>
          <Link href={`/resource/${concatenateNameAndId(resource.name, resource.id)}`} className="nav-link">
            <i className="bi bi-box-arrow-up-right" />
          </Link>
        </div>
      </div>
      <div className="card-body overflow-y-auto">
        <div
        //   className="d-flex flex-column flex-grow-1"
        //   style={{
        //     maxHeight:
        //       resource.type === 'GeoJSON' || resource.type === 'HTML' || resource.type === 'PDF'
        //         ? getSize(content.size)
        //         : undefined,
        //   }}
        >
          {resource.type === 'HTML' || resource.type === 'PDF' ? (
            <EmbeddedViewer resource={resource} height="100%" className="d-flex h-100" />
          ) : (
            <Visualization
              resource={resource as JSONResource | GeoJSONResource}
              showFilters={false}
              useQueryParams={false}
              height={getSize(content.size) - 75}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function getSize(size: 'L' | 'M' | 'S') {
  switch (size) {
    case 'L': {
      return 800;
    }
    case 'M': {
      return 400;
    }
    case 'S': {
      return 200;
    }
    default: {
      return 600;
    }
  }
}
