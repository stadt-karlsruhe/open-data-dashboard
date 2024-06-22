'use client';

import { CSSProperties } from 'react';
import { Resource } from '@/schemas/configurationSchema';
import useWindowDimensions from '../helper/WindowDimensions';

export default function EmbeddedViewer({
  resource,
  height: constantHeight,
  className,
  style,
}: {
  resource: Resource;
  height?: string | number;
  className?: string;
  style?: CSSProperties;
}) {
  const { height } = useWindowDimensions();

  return (
    <div className={className} style={style}>
      <iframe title={resource.name} src={resource.source} width="100%" height={constantHeight ?? height} />
    </div>
  );
}
