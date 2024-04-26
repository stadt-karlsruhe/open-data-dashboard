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
  function filterData(search: string = searchText, filter: Filter = filterValues) {
    const searchedData =
      searchText === ''
        ? data
        : data.filter((obj) => {
            return Object.values(obj).some((value) => String(value).toLowerCase().includes(search.toLowerCase()));
          });
    const filteredData = searchedData.filter((item) => {
      for (const key of Object.keys(item)) {
        if (key in filter && !String(item[key]).toLowerCase().includes(String(filter[key]).toLowerCase())) {
          return false;
        }
        if (
          (`${key}-min` in filter && filter[`${key}-min`] !== '') ||
          (`${key}-max` in filter && filter[`${key}-max`] !== '')
        ) {
          const value = Number(item[key]);
          const min = Number(filter[`${key}-min`]);
          const max = Number(filter[`${key}-max`]);
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
      <div className="input-group mb-3">
        <input
          type="text"
          id={`${resource.id}-search`}
          placeholder="Search"
          className="form-control rounded-0"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            filterData(e.target.value);
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
      <div className="collapse mb-3" id={`${resource.id}-filter`}>
        {/* eslint-disable-next-line max-lines-per-function */}
        {Object.entries(data[0]).map(([key, value]) => (
          <div key={key} className="row my-3">
            <label id={`${resource.id}-${key}-input`} className="col-sm-2 col-form-label">
              {key}
            </label>
            <div className="col-md-10">
              {Number.isNaN(Number(value)) ? (
                <div className="form-floating">
                  <input
                    type="text"
                    value={filterValues[key] || ''}
                    className="form-control rounded-0"
                    id={`${resource.id}-${key}-text-input`}
                    onChange={(e) => {
                      setFilter(key, e.target.value);
                      const filter = { ...filterValues };
                      filter[key] = e.target.value;
                      filterData(undefined, filter);
                    }}
                  />
                  <label htmlFor={`${resource.id}-${key}-text-input`}>Search</label>
                </div>
              ) : (
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="number"
                        id={`${resource.id}-${key}-min`}
                        value={filterValues[`${key}-min`] || ''}
                        aria-labelledby={`${resource.id}-${key}-input`}
                        className="form-control rounded-0"
                        onChange={(e) => {
                          setFilter(`${key}-min`, e.target.value);
                          const filter = { ...filterValues };
                          filter[`${key}-min`] = e.target.value;
                          filterData(undefined, filter);
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
                        aria-labelledby={`${resource.id}-${key}-input`}
                        className="form-control rounded-0"
                        onChange={(e) => {
                          setFilter(`${key}-max`, e.target.value);
                          const filter = { ...filterValues };
                          filter[`${key}-max`] = e.target.value;
                          filterData(undefined, filter);
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
      </div>
    </div>
  );
}
