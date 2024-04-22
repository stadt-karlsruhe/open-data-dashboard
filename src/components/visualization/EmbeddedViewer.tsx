'use client';

import { useEffect, useState } from 'react';

export default function PDFViewer({ source }: { source: string }) {
  const [height, setHeight] = useState(window.innerHeight);
  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="d-flex">
      <iframe src={source} width="100%" height={height} />
    </div>
  );
}
