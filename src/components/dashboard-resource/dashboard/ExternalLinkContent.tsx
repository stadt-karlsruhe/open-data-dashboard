import { CSSProperties } from 'react';
import { DashboardExternalLinkContent } from '@/schemas/configuration/configurationSchema';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

export default function ExternalLinkContent({
  content,
  className,
  style,
}: {
  content: DashboardExternalLinkContent;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Link
      className={`btn btn-primary d-flex align-content-center justify-content-center custom-opacity ${className ?? ''}`}
      href={content.target}
      target="_blank"
      title={content.text}
      style={{
        ...style,
        color: content.color,
        backgroundColor: content.backgroundColor,
        borderColor: content.backgroundColor,
      }}
    >
      {content.icon && <i className={`bi bi-${content.icon} me-1`} />}
      <span className="text-wrap">{content.text}</span>
    </Link>
  );
}
