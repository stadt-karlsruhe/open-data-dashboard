import { DataRecord, Resource } from '@/types/visualization';
import { useState } from 'react';

type Filter = Record<string, string>;

// eslint-disable-next-line max-lines-per-function
export default function ChartTableFilter({
  resource,
  data,
  onFilter,
}: {
  resource: Resource;
  data: DataRecord;
  onFilter: (filteredDate: DataRecord) => void;
}) {
  const [searchText, setSearchText] = useState('');
  const [filterValues, setFilterValues] = useState({} as Filter);
  const [isCollapsed, setIsCollapsed] = useState(true);
  function setFilter(key: string, value: string) {
    const updatedFilter = { ...filterValues } as Filter;
    updatedFilter[key] = value;
    setFilterValues(updatedFilter);
  }
  function filterData(search?: string) {
    const searchedData =
      searchText === ''
        ? data
        : data.filter((obj) => {
            return Object.values(obj).some((value) =>
              String(value)
                .toLowerCase()
                .includes(search ?? searchText.toLowerCase()),
            );
          });
    const filteredData = searchedData.filter((item) => {
      for (const key of Object.keys(item)) {
        if (key in filterValues && !String(item[key]).toLowerCase().includes(String(filterValues[key]).toLowerCase())) {
          return false;
        }
        if (
          (`${key}-min` in filterValues && filterValues[`${key}-min`] !== '') ||
          (`${key}-max` in filterValues && filterValues[`${key}-max`] !== '')
        ) {
          const value = Number(item[key]);
          const min = Number(filterValues[`${key}-min`]);
          const max = Number(filterValues[`${key}-max`]);
          if (!((Number.isNaN(min) || value >= min) && (Number.isNaN(max) || value <= max))) {
            return false;
          }
        }
      }
      return true;
    });
    onFilter(filteredData);
  }
  function onClear() {
    setSearchText('');
    setFilterValues({} as Filter);
    onFilter(data);
  }
  return (
    <div className="container-sm">
      <div className="input-group">
        <input
          type="text"
          id={`${resource.id}-search`}
          placeholder="Search"
          className="form-control rounded-0"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            if (isCollapsed) {
              filterData(e.target.value);
            }
          }}
        />
        <button
          className="btn-primary px-2 rounded-0"
          onClick={(e) => {
            onClear();
          }}
        >
          <i className="bi bi-x-lg"></i>
        </button>
        <button
          className="btn btn-primary rounded-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${resource.id}-filter`}
          aria-expanded="false"
          aria-controls={`${resource.id}-filter`}
          onClick={(e) => {
            setIsCollapsed(!isCollapsed);
          }}
        >
          {isCollapsed ? <i className="bi bi-caret-down-square"></i> : <i className="bi bi-caret-up-square"></i>}
        </button>
      </div>
      <div className="collapse" id={`${resource.id}-filter`}>
        {Object.entries(data[0]).map(([key, value]) => (
          <div key={key} className="row my-3">
            <label id={`${resource.id}-${key}-input`} className="col-sm-2 col-form-label">
              {key}
            </label>
            <div className="col-md-10">
              {Number.isNaN(Number(value)) ? (
                <input
                  type="text"
                  value={filterValues[key]}
                  className="form-control rounded-0"
                  aria-labelledby={`${resource.id}-${key}-input`}
                  id={`${resource.id}-${key}-text-input`}
                  onChange={(e) => {
                    setFilter(key, e.target.value);
                  }}
                />
              ) : (
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="number"
                        id={`${resource.id}-${key}-min`}
                        value={filterValues[`${key}-min`] || ''}
                        placeholder="Min"
                        aria-labelledby={`${resource.id}-${key}-input`}
                        className="form-control rounded-0"
                        onChange={(e) => {
                          setFilter(`${key}-min`, e.target.value);
                        }}
                      />
                      <label htmlFor={`${resource.id}-${key}-min`}>Min</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="number"
                        id={`${resource.id}-${key}-max`}
                        value={filterValues[`${key}-max`] || ''}
                        placeholder="Max"
                        aria-labelledby={`${resource.id}-${key}-input`}
                        className="form-control rounded-0"
                        onChange={(e) => {
                          setFilter(`${key}-max`, e.target.value);
                        }}
                      />
                      <label htmlFor={`${resource.id}-${key}-max`}>Max</label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <button
          className="btn btn-primary rounded-0"
          onClick={(e) => {
            filterData();
          }}
        >
          Search
        </button>
        <button
          className="btn btn-secondary rounded-0 mx-2"
          onClick={(e) => {
            onClear();
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
