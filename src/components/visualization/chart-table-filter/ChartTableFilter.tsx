import { Filter, JSONResource } from '@/schemas/configuration/configurationSchema';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Accordion from 'react-bootstrap/Accordion';
import ChartTableFilterBody from './ChartTableFilterBody';
import ChartTableFilterHeader from './ChartTableFilterHeader';
import CurrentFilters from './CurrentFilters';
import { TransformedData } from '@/schemas/dataSchema';
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
    searchParams.get('filter')
      ? (JSON.parse(searchParams.get('filter') ?? '{}') as Record<string, Filter>)
      : resource.defaultFilters ?? {},
  );
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // use query parameters or default filter on initial render
    filter();
    // if query parameters are not set, set them to the value of defaultFilters
    if (!searchParams.get('filter') && resource.defaultFilters) {
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
      params.delete('filter');
    } else {
      params.set('filter', JSON.stringify(updatedFilters));
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
  );
}
