import { CSSProperties } from 'react';
import { DashboardTextContent } from '@/schemas/configuration/configurationSchema';
import { sizeClassToHeight } from '@/utils/mapUtils';

export default function TextContent({
  content,
  className,
  style,
}: {
  content: DashboardTextContent;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`card d-flex flex-column ${className ?? ''}`}
      style={{ ...style, maxHeight: sizeClassToHeight(content.size) }}
    >
      <h5 className="card-header text-center">{content.header}</h5>
      {content.body && (
        <div className="card-body overflow-y-auto text-center">
          <p>{content.body}</p>
        </div>
      )}
    </div>
  );
}
