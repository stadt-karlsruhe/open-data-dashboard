import { useFormatter, useTranslations } from 'next-intl';

import { formatNumber } from '@/format';

export default function CurrentFilters({
  filters,
  onClear,
}: {
  filters: Record<string, string | { min?: string; max?: string }>;
  onClear: (key: string, value: string | { min?: string; max?: string }) => void;
}) {
  const t = useTranslations('CurrentFilters');
  const format = useFormatter();
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
                badgeContent = `${key} = ${formatNumber(filterMin, key, format)}`;
              } else {
                const start = Number.isNaN(filterMin) ? '' : `${formatNumber(filterMin, key, format)} ≤ `;
                const end = Number.isNaN(filterMax) ? '' : ` ≤ ${formatNumber(filterMax, key, format)}`;
                badgeContent = start + key + end;
              }
            }
          }
          if (badgeContent) {
            return (
              <button
                key={key}
                className="btn btn-secondary badge me-1 mb-3"
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
