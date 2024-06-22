'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import BarChart from '@/components/visualization/bar-chart/BarChart';
import ChartTableFilter from '@/components/visualization/chart-table-filter/ChartTableFilter';
import { JSONResource } from '@/schemas/configurationSchema';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { TransformedData } from '@/schemas/dataSchema';
import dynamic from 'next/dynamic';
import { filterData } from '@/filter';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import useWindowDimensions from '@/components/helper/WindowDimensions';

// Avoid hydration error inside Table pagination https://stackoverflow.com/questions/77763766/next-js-hydration-error-with-shadcn-dialog-component
const Table = dynamic(() => import('@/components/visualization/Table'), { ssr: false });

// eslint-disable-next-line max-lines-per-function
export default function ChartTableWrapper({
  resource,
  transformedData,
  showFilter = true,
  useQueryParams = true,
  height: constantHeight,
}: {
  resource: JSONResource;
  transformedData: TransformedData[];
  showFilter?: boolean;
  useQueryParams?: boolean;
  height?: string | number;
}) {
  const t = useTranslations('ChartTableWrapper');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const [filteredData, setFilteredData] = useState(
    showFilter ? transformedData : filterData(transformedData, resource.defaultFilters ?? {}),
  );
  const { width, height } = useWindowDimensions();

  const setVisualizationParameter = useDebouncedCallback((eventKey: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('visualization', eventKey);
    router.replace(`${pathname}?${params.toString()}`);
  });
  const [activeVisualization, setActiveVisualization] = useState(getAndUpdateVisualizationParameter());
  function getAndUpdateVisualizationParameter() {
    if (useQueryParams) {
      const passedInitialParameter = searchParams.get('visualization');
      const resourceTypes = new Set(Object.entries(resource.visualizations).map(([diagramType]) => diagramType));
      if (!passedInitialParameter || !resourceTypes.has(passedInitialParameter)) {
        const initialParameter = resourceTypes.has('barChart') ? 'barChart' : 'table';
        setVisualizationParameter(initialParameter);
        return initialParameter;
      }
      return passedInitialParameter;
    }
  }

  return (
    <div className={pathname.startsWith(`/${locale}/embed`) ? 'm-2' : ''}>
      {showFilter && <ChartTableFilter resource={resource} data={transformedData} onFilter={setFilteredData} />}
      <Tabs
        defaultActiveKey={activeVisualization}
        onSelect={(eventKey) => {
          setActiveVisualization(eventKey ?? '');
          setVisualizationParameter(eventKey ?? '');
        }}
        className="mt-1 mt-md-3"
      >
        {Object.entries(resource.visualizations).map(([diagramType, diagramAttr], index) => (
          <Tab
            key={`${resource.id}-${diagramType}-${String(index)}}`}
            title={diagramType === 'barChart' || diagramType === 'table' ? t(diagramType) : ''}
            eventKey={diagramType}
            className="p-3"
            style={{ height: constantHeight && typeof constantHeight === 'number' ? constantHeight - 75 : undefined }}
          >
            {diagramType === 'barChart' ? (
              <BarChart
                data={filteredData}
                axisPairs={diagramAttr.axisPairs}
                aspect={constantHeight ? undefined : width / (height - 250)}
              />
            ) : (
              <Table key={resource.id} columnNames={Object.keys(transformedData[0])} records={filteredData} />
            )}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
