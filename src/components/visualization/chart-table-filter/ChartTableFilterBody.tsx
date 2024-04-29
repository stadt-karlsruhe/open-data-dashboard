import { FloatingLabelInput } from './FloatingLabelInput';

// eslint-disable-next-line max-lines-per-function
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
              <FloatingLabelInput
                id={`${resourceId}-${key}-text-input`}
                type="text"
                value={filters[key] ?? ''}
                label="Search"
                onChange={(e) => {
                  onChange(key, e.target.value);
                }}
              />
            ) : (
              <div className="row">
                <div className="col-md-6">
                  <FloatingLabelInput
                    id={`${resourceId}-${key}-min`}
                    type="number"
                    value={filters[`${key}-min`] ?? ''}
                    label="Min"
                    onChange={(e) => {
                      onChange(`${key}-min`, e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <FloatingLabelInput
                    id={`${resourceId}-${key}-max`}
                    type="number"
                    value={filters[`${key}-max`] ?? ''}
                    label="Max"
                    onChange={(e) => {
                      onChange(`${key}-max`, e.target.value);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
