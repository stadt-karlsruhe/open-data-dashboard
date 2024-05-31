'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import BarChart from '../bar-chart/BarChart';
import ChartTableFilter from '../chart-table-filter/ChartTableFilter';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { TransformableResource } from '@/schemas/configuration-schema';
import { TransformedData } from '@/schemas/data-schema';
import dynamic from 'next/dynamic';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import useWindowDimensions from '../../helper/WindowDimensions';

// Avoid hydration error inside Table pagination https://stackoverflow.com/questions/77763766/next-js-hydration-error-with-shadcn-dialog-component
const Table = dynamic(() => import('@/components/visualization/Table'), { ssr: false });

// eslint-disable-next-line max-lines-per-function
export default function ChartTableWrapper({
  resource,
  transformedData,
}: {
  resource: TransformableResource;
  transformedData: TransformedData[];
}) {
  const t = useTranslations('ChartTableWrapper');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [filteredData, setFilteredData] = useState(transformedData);
  const { width, height } = useWindowDimensions();

  const setVisualizationParameter = useDebouncedCallback((eventKey: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('visualization', eventKey);
    router.replace(`${pathname}?${params.toString()}`);
  });
  const [activeVisualization, setActiveVisualization] = useState(getAndUpdateVisualizationParameter());
  function getAndUpdateVisualizationParameter() {
    const passedInitialParameter = searchParams.get('visualization');
    const resourceTypes = new Set(Object.entries(resource.visualizations).map(([diagramType]) => diagramType));
    if (!passedInitialParameter || !resourceTypes.has(passedInitialParameter)) {
      const initialParameter = resourceTypes.has('barChart') ? 'barChart' : 'table';
      setVisualizationParameter(initialParameter);
      return initialParameter;
    }
    return passedInitialParameter;
  }

  return (
    <>
      <ChartTableFilter resource={resource} data={transformedData} onFilter={setFilteredData} />
      <Tabs
        defaultActiveKey={activeVisualization}
        onSelect={(eventKey) => {
          setActiveVisualization(eventKey ?? '');
          setVisualizationParameter(eventKey ?? '');
        }}
      >
        {Object.entries(resource.visualizations).map(([diagramType, diagramAttr], index) => (
          <Tab
            key={`${resource.id}-${diagramType}-${String(index)}}`}
            title={diagramType === 'barChart' || diagramType === 'table' ? t(diagramType) : ''}
            eventKey={diagramType}
            className="m-3"
          >
            {diagramType === 'barChart' ? (
              <div className="d-flex flex-column">
                <BarChart
                  data={filteredData}
                  axisPairs={diagramAttr.axisPairs}
                  aspect={width / (height - 250)}
                ></BarChart>
              </div>
            ) : (
              <Table key={resource.id} columnNames={Object.keys(transformedData[0])} records={filteredData} />
            )}
          </Tab>
        ))}
      </Tabs>
    </>
  );
}
