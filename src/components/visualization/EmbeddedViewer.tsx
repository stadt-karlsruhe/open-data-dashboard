'use client';

import { Resource } from '@/schemas/configuration-schema';
import useWindowDimensions from '../helper/WindowDimensions';

export default function EmbeddedViewer({
  resource,
  height: constantHeight,
  className,
}: {
  resource: Resource;
  height?: string | number;
  className?: string;
}) {
  const { height } = useWindowDimensions();

  return (
    <div className={className}>
      <iframe title={resource.name} src={resource.source} width="100%" height={constantHeight ?? height} />
    </div>
  );
}
