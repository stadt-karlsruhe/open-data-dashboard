export default function CurrentFilters({
  filters,
  onClear,
}: {
  filters: Record<string, string | { min?: string; max?: string }>;
  onClear: (key: string, value: string | { min?: string; max?: string }) => void;
}) {
  return (
    <>
      {Object.entries(filters).map(([key, value]) => {
        let badgeContent;
        if (value && typeof value === 'string') {
          badgeContent = `${key} =~ ${value}`;
        } else if (value && typeof value === 'object') {
          const filterMin = Number.parseFloat(value.min ?? '');
          const filterMax = Number.parseFloat(value.max ?? '');

          if (!Number.isNaN(filterMin) || !Number.isNaN(filterMax)) {
            if (filterMin === filterMax) {
              badgeContent = `${key} = ${String(filterMin)}`;
            } else {
              const start = Number.isNaN(filterMin) ? '' : `${String(filterMin)} ≤ `;
              const end = Number.isNaN(filterMax) ? '' : ` ≥ ${String(filterMax)}`;
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
