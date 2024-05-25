import { useTranslations } from 'next-intl';

export default function Legend({ labels }: { labels: Map<string, string> }) {
  const t = useTranslations('Legend');
  return (
    <div style={{ zIndex: 400, width: '200px' }} className="bg-white card position-absolute bottom-0 m-3 pe-none">
      <h6 className="card-header text-center">{t('title')}</h6>
      <div className="card-body">
        {[...labels.entries()].map(([label, color]) => (
          <div className="row" key={label}>
            <div className="col-1">
              <i className="bi bi-circle-fill" style={{ color, fontSize: '20px' }}></i>
            </div>
            <div className="col-10">
              <div className="ms-2" style={{ fontSize: '20px' }}>
                {label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
