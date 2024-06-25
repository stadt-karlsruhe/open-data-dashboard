import {
  DashboardResourceContent,
  GeoJSONResource,
  JSONResource,
  Resource,
} from '@/schemas/configuration/configurationSchema';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { CSSProperties } from 'react';
import EmbeddedViewer from '@/components/visualization/EmbeddedViewer';
import Visualization from '@/components/visualization/Visualization';
import { concatenateNameAndId } from '@/utils/stringUtils';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { getIconForResource } from '@/utils/icons';
import { locales } from '@/locales';
import { sizeClassToHeight } from '@/utils/mapUtils';

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

// eslint-disable-next-line max-lines-per-function
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
      <Link
        href={`/resource/${concatenateNameAndId(resource.name, resource.id)}`}
        className="card-header btn btn-secondary"
        style={{ borderWidth: 0, borderBottomWidth: 1 }}
      >
        <div className="d-flex align-items-baseline">
          <h5 className="flex-fill text-center">
            <i className={`bi bi-${getIconForResource(resource)} me-1 fs-5`} />
            {displayName}
          </h5>
          {displayDescription && (
            <OverlayTrigger
              overlay={
                <Tooltip>
                  <h6>{displayName}</h6>
                  <p>{displayDescription}</p>
                </Tooltip>
              }
              placement="bottom-end"
            >
              <button className="nav-link me-2 fs-5">
                <i className="bi bi-info-square-fill" />
              </button>
            </OverlayTrigger>
          )}
          <button className="nav-link fs-5">
            <i className="bi bi-box-arrow-up-right" />
          </button>
        </div>
      </Link>
      <div className="card-body overflow-auto">
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
