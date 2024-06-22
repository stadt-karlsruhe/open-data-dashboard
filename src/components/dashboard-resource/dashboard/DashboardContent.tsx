import { CSSProperties } from 'react';
import { Configuration } from '@/schemas/configurationSchema';
import { DashboardContent as Content } from '@/schemas/configuration/dashboardsSchema';
import ErrorComponent from '../../error-handling/ErrorComponent';
import ExternalContent from './ExternalContent';
import ExternalLinkContent from './ExternalLinkContent';
import ResourceContent from './ResourceContent';
import ResourceLinkContent from './ResourceLinkContent';
import TextContent from './TextContent';

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
    return <ExternalContent content={content} className={className} style={style} />;
  }
  if (content.type === 'TEXT') {
    return <TextContent content={content} className={className} style={style} />;
  }
  if (content.type === 'RESOURCE' || content.type === 'LINK_RESOURCE') {
    const resource = configuration.resources.find((resource) => resource.id === content.resourceId);
    if (!resource) {
      return <ErrorComponent type="configurationError" error={'Dashboard resource not found in configuration!'} />;
    }

    return content.type === 'RESOURCE' ? (
      <ResourceContent content={content} resource={resource} className={className} style={style} />
    ) : (
      <ResourceLinkContent content={content} resource={resource} className={className} style={style} />
    );
  }
  return <ExternalLinkContent content={content} className={className} style={style} />;
}
