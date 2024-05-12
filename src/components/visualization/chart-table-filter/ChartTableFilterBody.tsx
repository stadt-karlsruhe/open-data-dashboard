import Accordion from 'react-bootstrap/Accordion';
import { ClearableInputGroup } from './ClearableInputGroup';
import { useTranslations } from 'next-intl';

// eslint-disable-next-line max-lines-per-function
export function ChartTableFilterBody({
  resourceId,
  filters,
  record,
  eventKey,
  onChange,
  onClearAll,
}: {
  resourceId: string;
  filters: Record<string, string>;
  record: Record<string, never>;
  eventKey: string;
  onChange: (key: string, value: string) => void;
  onClearAll: () => void;
}) {
  const t = useTranslations('ChartTableFilterBody');
  return (
    <Accordion.Collapse eventKey={eventKey}>
      <div>
        {Object.entries(record).map(([key, value]) => (
          <fieldset key={key} className="row my-3">
            <legend id={`${resourceId}-${key}-input`} className="col-sm-2 col-form-label">
              {key}
            </legend>
            <div className="col-md-10">
              {Number.isNaN(Number.parseFloat(String(value))) ? (
                <ClearableInputGroup
                  id={`${resourceId}-${key}-text-input`}
                  type="search"
                  value={filters[key] ?? ''}
                  label={t('search')}
                  onChange={(e) => {
                    onChange(key, e.target.value);
                  }}
                  onClear={() => {
                    onChange(key, '');
                  }}
                />
              ) : (
                <div className="row">
                  <div className="col-md-6">
                    <ClearableInputGroup
                      id={`${resourceId}-${key}-min`}
                      type="number"
                      value={filters[`${key}-min`] ?? ''}
                      label="Min"
                      onChange={(e) => {
                        onChange(`${key}-min`, e.target.value);
                      }}
                      onClear={() => {
                        onChange(`${key}-min`, '');
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <ClearableInputGroup
                      id={`${resourceId}-${key}-max`}
                      type="number"
                      value={filters[`${key}-max`] ?? ''}
                      label="Max"
                      onChange={(e) => {
                        onChange(`${key}-max`, e.target.value);
                      }}
                      onClear={() => {
                        onChange(`${key}-max`, '');
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </fieldset>
        ))}
        <div className="d-flex justify-content-end">
          <button title={t('clearAllTooltip')} className="btn btn-secondary rounded-0 px-5" onClick={onClearAll}>
            {t('clearAll')}
          </button>
        </div>
      </div>
    </Accordion.Collapse>
  );
}
