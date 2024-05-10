import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChartTableFilterBody } from './ChartTableFilterBody';
import { ChartTableFilterHead } from './ChartTableFilterHead';
import { DataRecord } from '@/types/visualization';
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
    filter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onChange(key: string, value: string) {
    const updatedFilters = { ...filters } as Record<string, string>;
    updatedFilters[key] = value;
    setFilters(updatedFilters);
    filter(updatedFilters);
    setParams(updatedFilters);
  }

  function filter(updatedFilters: Record<string, string> = filters) {
    filterData(data, updatedFilters, onFilter);
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
      <ChartTableFilterHead
        resourceId={resource.id}
        filters={filters}
        isCollapsed={isCollapsed}
        onChange={onChange}
        onCollapse={() => {
          setIsCollapsed(!isCollapsed);
        }}
        onClear={onClear}
      />
      <ChartTableFilterBody
        resourceId={resource.id}
        filters={filters}
        isCollapsedInitial={isCollapsedInitial}
        record={data[0]}
        onChange={onChange}
      />
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
