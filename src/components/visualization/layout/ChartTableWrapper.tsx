import BarChart from '../BarChart';
import ChartTableFilter from '../chart-table-filter/ChartTableFilter';
import { DataRecord } from '@/types/visualization';
import Tab from 'react-bootstrap/Tab';
import Table from '../Table';
import Tabs from 'react-bootstrap/Tabs';
import { TransformableResource } from '@/types/configuration';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import useWindowDimensions from '../../helper/WindowDimensions';

export default function ChartTableWrapper({
  resource,
  transformedData,
}: {
  resource: TransformableResource;
  transformedData: DataRecord;
}) {
  const t = useTranslations('ChartTableWrapper');
  const [filteredData, setFilteredData] = useState(transformedData);
  const { width, height } = useWindowDimensions();
  const resourceArr = Object.entries(resource.visualizations);
  return (
    <>
      <ChartTableFilter resource={resource} data={transformedData} onFilter={setFilteredData} />
      <Tabs
        defaultActiveKey={resourceArr.map(([diagramType]) => diagramType).includes('barChart') ? 'barChart' : 'table'}
      >
        {resourceArr.map(([diagramType, diagramAttr], index) => (
          <Tab
            key={`${resource.id}-${diagramType}-${String(index)}}`}
            title={diagramType === 'barChart' || diagramType === 'table' ? t(diagramType) : ''}
            eventKey={diagramType}
            className="m-3"
          >
            {diagramType === 'barChart' ? (
              <div className="d-flex flex-column">
                <BarChart
                  chartInput={{
                    data: filteredData,
                    // TODO: Adapt to the implementation of https://h-ka-team-rdqzrlfpomci.atlassian.net/browse/ODDSK-87
                    xAxis: diagramAttr.axisPairs[0].xAxis,
                    yAxis: diagramAttr.axisPairs[0].yAxis,
                    aspect: width / (height - 250),
                  }}
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
