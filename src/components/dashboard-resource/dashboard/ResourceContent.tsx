import { GeoJSONResource, JSONResource, Resource } from '@/schemas/configurationSchema';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { CSSProperties } from 'react';
import { DashboardResourceContent } from '@/schemas/configuration/dashboardsSchema';
import EmbeddedViewer from '@/components/visualization/EmbeddedViewer';
import Visualization from '@/components/visualization/Visualization';
import { concatenateNameAndId } from '@/utils/stringUtils';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';
import { sizeClassToHeight } from '@/utils/mapUtils';

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

export default function ResourceContent({
  content,
  resource,
  className,
  style,
}: {
  content: DashboardResourceContent;
  resource: Resource;
  className?: string;
  style?: CSSProperties;
}) {
  const displayName = content.overrides?.name ?? resource.name;
  const displayDescription = content.overrides?.description ?? resource.description;
  return (
    <div className={`card d-flex flex-column ${className ?? ''}`} style={{ ...style }}>
      <div className="card-header" style={{ minHeight: 50 }}>
        <div className="d-flex align-items-center justify-content-center">
          <h5 className="flex-fill text-center">{displayName}</h5>
          {displayDescription && (
            <OverlayTrigger overlay={<Tooltip>{displayDescription}</Tooltip>} placement="bottom-end">
              <button className="nav-link me-2 fs-5">
                <i className="bi bi-info-square-fill" />
              </button>
            </OverlayTrigger>
          )}
          <Link href={`/resource/${concatenateNameAndId(resource.name, resource.id)}`} className="nav-link fs-5">
            <i className="bi bi-box-arrow-up-right" />
          </Link>
        </div>
      </div>
      <div className="card-body overflow-y-auto">
        {resource.type === 'HTML' || resource.type === 'PDF' ? (
          <EmbeddedViewer resource={resource} height={sizeClassToHeight(content.size)} />
        ) : (
          <Visualization
            resource={resource as JSONResource | GeoJSONResource}
            options={{
              showFilter: false,
              useQueryParams: false,
              showOnlyFirstVis: true,
            }}
            height={sizeClassToHeight(content.size)}
          />
        )}
      </div>
    </div>
  );
}
