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
  height: constantHeight,
  options = {
    showFilter: true,
    useQueryParams: true,
    showOnlyFirstVis: false,
  },
}: {
  resource: JSONResource;
  transformedData: TransformedData[];
  height?: string | number;
  options: {
    showFilter?: boolean;
    useQueryParams?: boolean;
    showOnlyFirstVis?: boolean;
  };
}) {
  const t = useTranslations('ChartTableWrapper');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const [filteredData, setFilteredData] = useState(
    options.showFilter ? transformedData : filterData(transformedData, resource.defaultFilters ?? {}),
  );
  const { width, height } = useWindowDimensions();

  const setVisualizationParameter = useDebouncedCallback((eventKey: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('visualization', eventKey);
    router.replace(`${pathname}?${params.toString()}`);
  });
  const [activeVisualization, setActiveVisualization] = useState(getAndUpdateVisualizationParameter());
  function getAndUpdateVisualizationParameter() {
    const resourceTypes = new Set(Object.entries(resource.visualizations).map(([diagramType]) => diagramType));
    const initialParameter = resourceTypes.has('barChart') ? 'barChart' : 'table';
    if (options.useQueryParams) {
      const passedInitialParameter = searchParams.get('visualization');
      if (!passedInitialParameter || !resourceTypes.has(passedInitialParameter)) {
        setVisualizationParameter(initialParameter);
        return initialParameter;
      }
      return passedInitialParameter;
    }
    return initialParameter;
  }

  if (options.showOnlyFirstVis) {
    return getAndUpdateVisualizationParameter() === 'barChart' ? (
      <div className="d-flex" style={{ height: constantHeight }}>
        <BarChart
          data={filteredData}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          axisPairs={resource.visualizations.barChart!.axisPairs}
          aspect={constantHeight ? undefined : width / (height - 250)}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          layout={resource.visualizations.barChart!.layout}
        />
      </div>
    ) : (
      <Table key={resource.id} columnNames={Object.keys(transformedData[0])} records={filteredData} />
    );
  }

  return (
    <div className={pathname.startsWith(`/${locale}/embed`) ? 'm-2' : ''}>
      {options.showFilter && <ChartTableFilter resource={resource} data={transformedData} onFilter={setFilteredData} />}
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
                layout={diagramAttr.layout}
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
