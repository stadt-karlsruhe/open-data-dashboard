'use client';

import { useEffect, useState } from 'react';

const getWindowHeight = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    height,
  };
};
const useWindowHeight = () => {
  const [windowHeight, setWindowHeight] = useState(getWindowHeight());
  useEffect(() => {
    function handleResize() {
      setWindowHeight(getWindowHeight());
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return windowHeight;
};

export default function PDFViewer({ source }: { source: string }) {
  const { height } = useWindowHeight();
  return (
    <div className="d-flex">
      <iframe src={source} width="100%" height={height} />
    </div>
  );
}
