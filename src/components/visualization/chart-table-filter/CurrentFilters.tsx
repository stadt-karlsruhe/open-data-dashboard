export default function CurrentFilters({
  filters,
  columnNames,
}: {
  filters: Record<string, string>;
  columnNames: string[];
}) {
  return (
    <>
      {columnNames.map((key) => {
        const filter = filters[key];
        const filterMin = Number.parseFloat(filters[`${key}-min`]);
        const filterMax = Number.parseFloat(filters[`${key}-max`]);
        let badgeContent;
        if (filter) {
          badgeContent = `${key} =~ ${filter}`;
        } else if (!Number.isNaN(filterMin) || !Number.isNaN(filterMax)) {
          if (filterMin === filterMax) {
            badgeContent = `${key} = ${String(filterMin)}`;
          } else {
            const start = Number.isNaN(filterMin) ? '' : `${String(filterMin)} ≤ `;
            const end = Number.isNaN(filterMax) ? '' : ` ≥ ${String(filterMax)}`;
            badgeContent = start + key + end;
          }
        }
        if (badgeContent) {
          return (
            <button key={key} className="btn btn-secondary badge me-1">
              {badgeContent} <i className="bi bi-x-lg"></i>
            </button>
          );
        }
      })}
    </>
  );
}
