import { InputWithFloatingLabel } from './InputWithFloatingLabel';

export function ChartTableFilterNumber({
  resourceId,
  filterKey,
  filters,
  onChange,
}: {
  resourceId: string;
  filterKey: string;
  filters: Record<string, string>;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className="row">
      <div className="col-md-6">
        <InputWithFloatingLabel
          id={`${resourceId}-${filterKey}-min`}
          type="number"
          value={filters[`${filterKey}-min`] ?? ''}
          label="Min"
          onChange={(e) => {
            onChange(`${filterKey}-min`, e.target.value);
          }}
        />
      </div>
      <div className="col-md-6">
        <InputWithFloatingLabel
          id={`${resourceId}-${filterKey}-max`}
          type="number"
          value={filters[`${filterKey}-max`] ?? ''}
          label="Max"
          onChange={(e) => {
            onChange(`${filterKey}-max`, e.target.value);
          }}
        />
      </div>
    </div>
  );
}
