import { useTranslations } from 'next-intl';

export default function CurrentFilters({
  filters,
  onClear,
}: {
  filters: Record<string, string | { min?: string; max?: string }>;
  onClear: (key: string, value: string | { min?: string; max?: string }) => void;
}) {
  const t = useTranslations('CurrentFilters');
  return (
    <>
      {Object.entries(filters)
        .sort(([key]) => {
          return key === 'all-entries' ? -1 : 0;
        })
        .map(([key, value]) => {
          let badgeContent;
          if (value && typeof value === 'string') {
            badgeContent =
              key === 'all-entries'
                ? `${t('allEntriesLabel')} ${t('contains')} "${value}"`
                : `${key} ${t('contains')} "${value}"`;
          } else if (value && typeof value === 'object') {
            const filterMin = Number(value.min);
            const filterMax = Number(value.max);

            if (!Number.isNaN(filterMin) || !Number.isNaN(filterMax)) {
              if (filterMin === filterMax) {
                badgeContent = `${key} = ${String(filterMin)}`;
              } else {
                const start = Number.isNaN(filterMin) ? '' : `${String(filterMin)} ≤ `;
                const end = Number.isNaN(filterMax) ? '' : ` ≤ ${String(filterMax)}`;
                badgeContent = start + key + end;
              }
            }
          }
          if (badgeContent) {
            return (
              <button
                key={key}
                className="btn btn-secondary badge me-1 my-1 my-md-3"
                onClick={() => {
                  onClear(key, '');
                }}
              >
                {badgeContent} <i className="bi bi-x-lg"></i>
              </button>
            );
          }
        })}
    </>
  );
}
