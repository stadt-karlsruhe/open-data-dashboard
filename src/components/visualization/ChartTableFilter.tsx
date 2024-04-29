import { ChangeEvent, useEffect, useState } from 'react';
import { DataRecord, Resource } from '@/types/visualization';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const allEntries = 'all-entries';
// eslint-disable-next-line max-lines-per-function
export default function ChartTableFilter({
  resource,
  data,
  onFilter,
}: {
  resource: Resource;
  data: DataRecord;
  onFilter: (filteredData: DataRecord) => void;
}) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState(JSON.parse(searchParams.get('search') ?? '{}') as Record<string, string>);
  // check if any of the column-filters are set by query parameters and if yes, expand the filters
  const [isCollapsedInitial] = useState(
    !Object.keys(data[0]).some((key) => {
      const filterObj = JSON.parse(searchParams.get('search') ?? '{}') as Record<string, string>;
      return filterObj[key] || filterObj[`${key}-max`] || filterObj[`${key}-min`];
    }),
  );
  const [isCollapsed, setIsCollapsed] = useState(isCollapsedInitial);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // use query parameters on initial render
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onChange(key: string, value: string) {
    const updatedFilters = { ...filters } as Record<string, string>;
    updatedFilters[key] = value;
    setFilters(updatedFilters);
    filterData(updatedFilters);
    setParams(updatedFilters);
  }
  function filterData(updatedFilters: Record<string, string> = filters) {
    const searchedData = updatedFilters[allEntries]
      ? data.filter((obj) => {
          return Object.values(obj).some((value) =>
            String(value).toLowerCase().includes(updatedFilters[allEntries].toLowerCase()),
          );
        })
      : data;
    const filteredData = searchedData.filter((item) => {
      for (const objKey of Object.keys(item)) {
        const filter = updatedFilters[objKey];
        if (filter && !String(item[objKey]).toLowerCase().includes(filter.toLowerCase())) {
          return false;
        }
        const filterMin = Number.parseFloat(updatedFilters[`${objKey}-min`]);
        const filterMax = Number.parseFloat(updatedFilters[`${objKey}-max`]);
        if (!Number.isNaN(filterMin) && Number.parseFloat(item[objKey]) < filterMin) {
          return false;
        }
        if (!Number.isNaN(filterMax) && Number.parseFloat(item[objKey]) > filterMax) {
          return false;
        }
      }
      return true;
    });
    onFilter(filteredData);
  }
  const setParams = useDebouncedCallback((updatedFilters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    params.set('search', JSON.stringify(updatedFilters));
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  function onClear() {
    setFilters({} as Record<string, string>);
    onFilter(data);
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    router.replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="container-sm">
      <div className="input-group mb-3">
        <InputWithFloatingLabel
          id={`${resource.id}-search`}
          type="text"
          value={filters[allEntries] ?? ''}
          label="Search all entries"
          onChange={(e) => {
            onChange(allEntries, e.target.value);
          }}
        />
        <button className="btn-primary px-2 rounded-0" title="Clear" onClick={onClear}>
          <i className="bi bi-x-lg"></i>
        </button>
        <button
          className="btn btn-primary rounded-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${resource.id}-filter`}
          aria-expanded="false"
          aria-controls={`${resource.id}-filter`}
          title={isCollapsed ? 'Expand filters' : 'Collapse filters'}
          onClick={() => {
            setIsCollapsed(!isCollapsed);
          }}
        >
          {isCollapsed ? <i className="bi bi-caret-down-square"></i> : <i className="bi bi-caret-up-square"></i>}
        </button>
      </div>
      <div className={`collapse  mb-3 ${isCollapsedInitial ? '' : 'show'}`} id={`${resource.id}-filter`}>
        {Object.entries(data[0]).map(([key, value]) => (
          <fieldset key={key} className="row my-3">
            <legend id={`${resource.id}-${key}-input`} className="col-sm-2 col-form-label">
              {key}
            </legend>
            <div className="col-md-10">
              {Number.isNaN(Number.parseFloat(value)) ? (
                <InputWithFloatingLabel
                  id={`${resource.id}-${key}-text-input`}
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
                    <InputWithFloatingLabel
                      id={`${resource.id}-${key}-min`}
                      type="number"
                      value={filters[`${key}-min`] ?? ''}
                      label="Min"
                      onChange={(e) => {
                        onChange(`${key}-min`, e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputWithFloatingLabel
                      id={`${resource.id}-${key}-max`}
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
    </div>
  );
}

function InputWithFloatingLabel({
  id,
  type,
  value,
  label,
  onChange,
}: {
  id: string;
  type: string;
  value: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="form-floating">
      <input type={type} id={id} className="form-control rounded-0" value={value} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
