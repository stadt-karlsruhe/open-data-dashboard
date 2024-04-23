'use client';

import useWindowDimensions from '../WindowDimensions';

export default function EmbeddedViewer({ source }: { source: string }) {
  const { height } = useWindowDimensions();

  return (
    <div className="d-flex">
      <iframe src={source} width="100%" height={height} />
    </div>
  );
}
