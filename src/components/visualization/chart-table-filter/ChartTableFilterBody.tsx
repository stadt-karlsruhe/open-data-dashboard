import Accordion from 'react-bootstrap/Accordion';
import { ClearableInputGroup } from './ClearableInputGroup';
import { Filter } from '@/schemas/configuration-schema';
import { TransformedData } from '@/schemas/data-schema';
import { useTranslations } from 'next-intl';

// eslint-disable-next-line max-lines-per-function
export function ChartTableFilterBody({
  resourceId,
  filters,
  records,
  eventKey,
  onChange,
  onClearAll,
}: {
  resourceId: string;
  filters: Record<string, Filter>;
  records: TransformedData;
  eventKey: string;
  onChange: (key: string, value: string | { min?: string; max?: string }) => void;
  onClearAll: () => void;
}) {
  const t = useTranslations('ChartTableFilterBody');
  return (
    <Accordion.Collapse eventKey={eventKey}>
      <div>
        {Object.entries(records).map(([key, value]) => {
          const filter = filters[key];
          const filterObj = typeof filter === 'object' ? filter : undefined;
          return (
            <fieldset key={key} className="row my-3">
              <legend id={`${resourceId}-${key}-input`} className="col-sm-2 col-form-label">
                {key}
              </legend>
              <div className="col-md-10">
                {typeof value === 'number' ? (
                  <div className="row">
                    <div className="col-md-6">
                      <ClearableInputGroup
                        id={`${resourceId}-${key}-min`}
                        type="number"
                        value={filterObj?.min ?? ''}
                        label="Min"
                        onChange={(e) => {
                          onChange(key, { min: e.target.value, max: filterObj?.max });
                        }}
                        onClear={() => {
                          onChange(key, { max: filterObj?.max });
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <ClearableInputGroup
                        id={`${resourceId}-${key}-max`}
                        type="number"
                        value={filterObj?.max ?? ''}
                        label="Max"
                        onChange={(e) => {
                          onChange(key, { min: filterObj?.min, max: e.target.value });
                        }}
                        onClear={() => {
                          onChange(key, { min: filterObj?.min });
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <ClearableInputGroup
                    id={`${resourceId}-${key}-text-input`}
                    type="text"
                    value={filter && typeof filter === 'string' ? filter : ''}
                    label={t('search')}
                    onChange={(e) => {
                      onChange(key, e.target.value);
                    }}
                    onClear={() => {
                      onChange(key, '');
                    }}
                  />
                )}
              </div>
            </fieldset>
          );
        })}
        <div className="d-flex justify-content-end">
          <button title={t('clearAllTooltip')} className="btn btn-secondary px-5" onClick={onClearAll}>
            {t('clearAll')}
          </button>
        </div>
      </div>
    </Accordion.Collapse>
  );
}
