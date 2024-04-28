import { ChangeEvent, useEffect, useState } from 'react';
import { DataRecord, Resource } from '@/types/visualization';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
type Filter = Record<string, string>;

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
  const [filters, setFilters] = useState(Object.fromEntries(searchParams.entries()) as Filter);
  const pathname = usePathname();
  const router = useRouter();
  // check if any of the column-filters are set by query parameters and if yes, expand the filters
  const [isCollapsedInitial] = useState(
    !Object.keys(data[0]).some((key) => {
      const filterKeys = Object.fromEntries(searchParams.entries());
      return key in filterKeys || `${key}-max` in filterKeys || `${key}-min` in filterKeys;
    }),
  );
  const [isCollapsed, setIsCollapsed] = useState(isCollapsedInitial);

  useEffect(() => {
    // use query parameters on initial render
    filterData('', '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onChange(key: string, value: string) {
    const updatedFilter = { ...filters } as Filter;
    updatedFilter[key] = value;
    setFilters(updatedFilter);
    filterData(key, value);
    setParams(key, value);
  }
  function filterData(key: string, value: string) {
    const filterAll = key === allEntries ? value : searchParams.get(allEntries);
    const searchedData =
      filterAll === null || filterAll === ''
        ? data
        : data.filter((obj) => {
            return Object.values(obj).some((value) => String(value).toLowerCase().includes(filterAll.toLowerCase()));
          });
    // eslint-disable-next-line sonarjs/cognitive-complexity
    const filteredData = searchedData.filter((item) => {
      for (const objKey of Object.keys(item)) {
        const filter = key === objKey ? value : searchParams.get(objKey);
        if (filter !== null && !String(item[objKey]).toLowerCase().includes(filter.toLowerCase())) {
          return false;
        }
        const filterMin = key === `${objKey}-min` ? value : searchParams.get(`${objKey}-min`);
        const filterMax = key === `${objKey}-max` ? value : searchParams.get(`${objKey}-max`);
        if ((filterMin !== null && filterMin !== '') || (filterMax !== null && filterMax !== '')) {
          const value = Number(item[objKey]);
          const min = Number(filterMin);
          const max = Number(filterMax);
          if (!((Number.isNaN(min) || value >= min) && (Number.isNaN(max) || value <= max))) {
            return false;
          }
        }
      }
      return true;
    });
    onFilter(filteredData);
  }
  const setParams = useDebouncedCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  function onClear() {
    setFilters({} as Filter);
    onFilter(data);
    const params = new URLSearchParams(searchParams);
    Object.keys(filters).forEach((key) => {
      params.delete(key);
    });
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
        <button className="btn-primary px-2 rounded-0" onClick={onClear}>
          <i className="bi bi-x-lg"></i>
        </button>
        <button
          className="btn btn-primary rounded-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${resource.id}-filter`}
          aria-expanded="false"
          aria-controls={`${resource.id}-filter`}
          onClick={() => {
            setIsCollapsed(!isCollapsed);
          }}
        >
          {isCollapsed ? <i className="bi bi-caret-down-square"></i> : <i className="bi bi-caret-up-square"></i>}
        </button>
      </div>
      <div className={`collapse  mb-3 ${isCollapsedInitial ? '' : 'show'}`} id={`${resource.id}-filter`}>
        {Object.entries(data[0]).map(([key, value]) => (
          <div key={key} className="row my-3">
            <label id={`${resource.id}-${key}-input`} className="col-sm-2 col-form-label">
              {key}
            </label>
            <div className="col-md-10">
              {Number.isNaN(Number(value)) ? (
                <InputWithFloatingLabel
                  id={`${resource.id}-${key}-text-input`}
                  type="text"
                  value={filters[key] || ''}
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
                      value={filters[`${key}-min`] || ''}
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
                      value={filters[`${key}-max`] || ''}
                      label="Max"
                      onChange={(e) => {
                        onChange(`${key}-max`, e.target.value);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
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
