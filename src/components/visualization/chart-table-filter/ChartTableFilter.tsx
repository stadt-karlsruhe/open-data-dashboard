import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Accordion from 'react-bootstrap/Accordion';
import { ChartTableFilterBody } from './ChartTableFilterBody';
import { ChartTableFilterHeader } from './ChartTableFilterHeader';
import CurrentFilters from './CurrentFilters';
import { DataRecord } from '@/types/visualization';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { TransformableResource } from '@/types/configuration';
import { useDebouncedCallback } from 'use-debounce';

// eslint-disable-next-line max-lines-per-function
export default function ChartTableFilter({
  resource,
  data,
  onFilter,
}: {
  resource: TransformableResource;
  data: DataRecord;
  onFilter: (filteredData: DataRecord) => void;
}) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState(JSON.parse(searchParams.get('search') ?? '{}') as Record<string, string>);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // use query parameters on initial render
    filter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onChange(key: string, value: string) {
    let updatedFilters;
    if (value) {
      updatedFilters = { ...filters } as Record<string, string>;
      updatedFilters[key] = value;
    } else {
      updatedFilters = Object.assign(
        {},
        ...Object.keys(filters)
          .filter((k) => k !== key)
          .map((k) => ({ [k]: filters[k] })),
      ) as Record<string, string>;
    }
    setFilters(updatedFilters);
    filter(updatedFilters);
    setParams(updatedFilters);
  }

  function filter(updatedFilters: Record<string, string> = filters) {
    filterData(data, updatedFilters, onFilter);
  }

  const setParams = useDebouncedCallback((updatedFilters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    if (Object.keys(updatedFilters).length === 0) {
      params.delete('search');
    } else {
      params.set('search', JSON.stringify(updatedFilters));
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  function onClearAll() {
    setFilters({} as Record<string, string>);
    onFilter(data);
    setParams({});
  }

  return (
    <div>
      {/* TODO: Move LocaleSwitcher to header component when it is implemented */}
      <div className="m-3">
        <LocaleSwitcher />
      </div>
      <div className="container-sm">
        <Accordion flush>
          <ChartTableFilterHeader resourceId={resource.id} filters={filters} onChange={onChange} eventKey="0" />
          <CurrentFilters filters={filters} columnNames={Object.keys(data[0])} />
          <ChartTableFilterBody
            resourceId={resource.id}
            filters={filters}
            record={data[0]}
            eventKey="0"
            onChange={onChange}
            onClearAll={onClearAll}
          />
        </Accordion>
      </div>
    </div>
  );
}

function filterData(data: DataRecord, filters: Record<string, string>, onFilter: (filteredData: DataRecord) => void) {
  const searchedData = filters['all-entries']
    ? data.filter((obj) => {
        return Object.values(obj).some((value) =>
          String(value).toLowerCase().includes(filters['all-entries'].toLowerCase()),
        );
      })
    : data;
  const filteredData = searchedData.filter((item) => {
    for (const objKey of Object.keys(item)) {
      const filter = filters[objKey];
      if (filter && !String(item[objKey]).toLowerCase().includes(filter.toLowerCase())) {
        return false;
      }
      const filterMin = Number.parseFloat(filters[`${objKey}-min`]);
      const filterMax = Number.parseFloat(filters[`${objKey}-max`]);
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
