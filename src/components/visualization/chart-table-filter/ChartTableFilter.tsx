import { Filter, JSONResource } from '@/schemas/configuration-schema';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Accordion from 'react-bootstrap/Accordion';
import { ChartTableFilterBody } from './ChartTableFilterBody';
import { ChartTableFilterHeader } from './ChartTableFilterHeader';
import CurrentFilters from './CurrentFilters';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { TransformedData } from '@/schemas/data-schema';
import { filterData } from '@/filter';
import { useDebouncedCallback } from 'use-debounce';

// eslint-disable-next-line max-lines-per-function
export default function ChartTableFilter({
  resource,
  data,
  onFilter,
}: {
  resource: JSONResource;
  data: TransformedData[];
  onFilter: (filteredData: TransformedData[]) => void;
}) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState(
    searchParams.get('search')
      ? (JSON.parse(searchParams.get('search') ?? '{}') as Record<string, Filter>)
      : resource.defaultFilters ?? {},
  );
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // use query parameters or default filter on initial render
    filter();
    // if query parameters are not set, set them to the value of defaultFilters
    if (!searchParams.get('search') && resource.defaultFilters) {
      setParams(resource.defaultFilters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onChange(key: string, value: Filter) {
    let updatedFilters;
    if (value) {
      updatedFilters = { ...filters } as Record<string, Filter>;
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

  function filter(updatedFilters: Record<string, Filter> = filters) {
    onFilter(filterData(data, updatedFilters));
  }

  const setParams = useDebouncedCallback((updatedFilters: Record<string, Filter>) => {
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
          <CurrentFilters filters={filters} onClear={onChange} />
          <ChartTableFilterBody
            resourceId={resource.id}
            filters={filters}
            records={data[0]}
            eventKey="0"
            onChange={onChange}
            onClearAll={onClearAll}
          />
        </Accordion>
      </div>
    </div>
  );
}
