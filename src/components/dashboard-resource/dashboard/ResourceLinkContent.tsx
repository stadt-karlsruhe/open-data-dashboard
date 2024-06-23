import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { CSSProperties } from 'react';
import { DashboardResourceLinkContent } from '@/schemas/configuration/dashboardsSchema';
import { Resource } from '@/schemas/configurationSchema';
import { concatenateNameAndId } from '@/utils/stringUtils';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { getIconForResource } from '@/utils/icons';
import { locales } from '@/locales';
import { sizeClassToHeight } from '@/utils/mapUtils';

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

export default function ResourceLinkContent({
  content,
  resource,
  className,
  style,
}: {
  content: DashboardResourceLinkContent;
  resource: Resource;
  className?: string;
  style?: CSSProperties;
}) {
  const displayName = content.overrides?.name ?? resource.name;
  const displayDescription = content.overrides?.description ?? resource.description;

  return (
    <Link
      href={`/resource/${concatenateNameAndId(resource.name, resource.id)}`}
      className={`btn btn-secondary d-flex flex-column ${className ?? ''}`}
      style={{
        ...style,
        maxHeight: sizeClassToHeight(content.size),
      }}
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
        <Link href={`/resource/${concatenateNameAndId(resource.name, resource.id)}`} className="nav-link fs-5">
          <i className="bi bi-box-arrow-up-right" />
        </Link>
      </div>
    </Link>
  );
}
