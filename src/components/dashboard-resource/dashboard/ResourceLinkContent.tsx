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
      className={`btn btn-secondary d-flex flex-column ${className ?? ''}`}
      href={`/resource/${concatenateNameAndId(resource.name, resource.id)}`}
      style={{
        ...style,
        maxHeight: sizeClassToHeight(content.size),
        borderColor: 'var(--bs-border-color-translucent)',
      }}
    >
      <div className="d-flex align-items-center justify-content-center">
        <i className={`bi bi-${getIconForResource(resource)} me-1 fs-1`} />
        <h5>{displayName}</h5>
      </div>
      <div>{displayDescription}</div>
    </Link>
  );
}
