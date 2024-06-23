import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { CSSProperties } from 'react';
import { DashboardResourceLinkContent } from '@/schemas/configuration/dashboardsSchema';
import { DataElement } from '@/types/data';
import { concatenateNameAndId } from '@/utils/stringUtils';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';
import { sizeClassToHeight } from '@/utils/mapUtils';

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

export default function InternalLinkContent({
  content,
  element,
  className,
  style,
}: {
  content: DashboardResourceLinkContent;
  element: DataElement;
  className?: string;
  style?: CSSProperties;
}) {
  const displayName = content.overrides?.name ?? element.name;
  const displayDescription = content.overrides?.description ?? element.description;

  return (
    <Link
      href={`/resource/${concatenateNameAndId(element.name, element.id)}`}
      className={`btn btn-secondary d-flex flex-column ${className ?? ''}`}
      style={{
        ...style,
        maxHeight: sizeClassToHeight(content.size),
      }}
    >
      <div className="d-flex align-items-baseline">
        <h5 className="flex-fill text-center">
          <i className={`bi bi-${element.icon} me-1 fs-5`} />
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
  );
}
