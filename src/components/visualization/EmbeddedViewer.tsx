'use client';

import { Resource } from '@/schema';
import useWindowDimensions from '../helper/WindowDimensions';

export default function EmbeddedViewer({ resource }: { resource: Resource }) {
  const { height } = useWindowDimensions();

  return (
    <div className="d-flex">
      <iframe title={resource.name} src={resource.source} width="100%" height={height} />
    </div>
  );
}
