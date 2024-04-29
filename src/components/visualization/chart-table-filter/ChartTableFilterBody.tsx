import { ChartTableFilterNumber } from './ChartTableFilterNumber';
import { InputWithFloatingLabel } from './InputWithFloatingLabel';

export function ChartTableFilterBody({
  resourceId,
  filters,
  isCollapsedInitial,
  record,
  onChange,
}: {
  resourceId: string;
  filters: Record<string, string>;
  isCollapsedInitial: boolean;
  record: Record<string, never>;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className={`collapse  mb-3 ${isCollapsedInitial ? '' : 'show'}`} id={`${resourceId}-filter`}>
      {Object.entries(record).map(([key, value]) => (
        <fieldset key={key} className="row my-3">
          <legend id={`${resourceId}-${key}-input`} className="col-sm-2 col-form-label">
            {key}
          </legend>
          <div className="col-md-10">
            {Number.isNaN(Number.parseFloat(String(value))) ? (
              <InputWithFloatingLabel
                id={`${resourceId}-${key}-text-input`}
                type="text"
                value={filters[key] ?? ''}
                label="Search"
                onChange={(e) => {
                  onChange(key, e.target.value);
                }}
              />
            ) : (
              <ChartTableFilterNumber resourceId={resourceId} filterKey={key} filters={filters} onChange={onChange} />
            )}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
