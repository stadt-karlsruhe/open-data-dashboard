import { CSSProperties } from 'react';
import { DashboardExternalContent } from '@/schemas/configuration/configurationSchema';
import EmbeddedViewer from '@/components/visualization/EmbeddedViewer';
import { sizeClassToHeight } from '@/utils/mapUtils';

export default function ExternalContent({
  content,
  className,
  style,
}: {
  content: DashboardExternalContent;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <EmbeddedViewer
      className={className}
      style={style}
      height={sizeClassToHeight(content.size)}
      resource={{
        source: content.source,
        id: 'external',
        name: content.name,
        type: 'HTML',
      }}
    />
  );
}
