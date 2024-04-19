'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};
const resizeObserverOptions = {};
const maxWidth = 800;

export default function PDFViewer({ url }: { url: string }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [file] = useState({
    url,
  });

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;
    setContainerWidth(entry.contentRect.width);
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  return (
    <div className="bg-secondary d-flex p-4">
      <div className="container-sm d-flex align-items-center flex-column" ref={setContainerRef}>
        <Document file={file} onLoadError={console.error} onLoadSuccess={onDocumentLoadSuccess} options={options}>
          {Array.from(Array.from({ length: numPages }), (el, index) => (
            <Page
              renderTextLayer={false}
              renderAnnotationLayer={false}
              key={`page_${String(index + 1)}`}
              pageNumber={index + 1}
              width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
              className="mb-3"
            />
          ))}
        </Document>
      </div>
    </div>
  );
}
