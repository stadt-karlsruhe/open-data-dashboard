export default function PDFViewer({ url }: { url: string }) {
  return (
    <div className="bg-secondary">
      <div className="d-flex flex-column container-sm">
        <iframe src={url} width="100%" height="1500px"></iframe>
      </div>
    </div>
  );
}
