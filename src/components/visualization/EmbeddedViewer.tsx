'use client';

import { Resource } from '@/schemas/configuration-schema';
import useWindowDimensions from '../helper/WindowDimensions';

export default function EmbeddedViewer({
  resource,
  height: constantHeight,
}: {
  resource: Resource;
  height?: string | number;
}) {
  const { height } = useWindowDimensions();

  return (
    <div className="d-flex h-100">
      <iframe title={resource.name} src={resource.source} width="100%" height={constantHeight ?? height} />
    </div>
  );
}
