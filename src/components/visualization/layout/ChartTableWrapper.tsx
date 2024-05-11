import BarChart from '../BarChart';
import ChartTableFilter from '../chart-table-filter/ChartTableFilter';
import { DataRecord } from '@/types/visualization';
import Table from '../Table';
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
    <div className="card rounded-0">
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs" data-bs-tabs="tabs">
          {resourceArr.map(([diagramType, _], index) => (
            <li className="nav-item" key={`${diagramType}}`}>
              <a
                data-bs-toggle="tab"
                aria-current="true"
                href={`#${diagramType}-${resource.id}}`}
                className={`nav-link ${index === 0 ? 'active' : ''}`}
              >
                {diagramType === 'barChart' || diagramType === 'table' ? t(diagramType) : ''}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="card-body tab-content diagram-card">
        <ChartTableFilter resource={resource} data={transformedData} onFilter={setFilteredData} />
        {resourceArr.map(([diagramType, diagramAttr], index) => (
          <div
            key={`${diagramType}-${String(index)}`}
            id={`${diagramType}-${resource.id}-${String(index)}`}
            className={`tab-pane ${index === 0 ? 'active' : ''}`}
          >
            {diagramType === 'barChart' ? (
              <div className="d-flex flex-column">
                <div>
                  <BarChart
                    chartInput={{
                      data: filteredData,
                      // TODO: Adapt to the implementation of https://h-ka-team-rdqzrlfpomci.atlassian.net/browse/ODDSK-87
                      xAxis: diagramAttr.axisPairs[0].xAxis,
                      yAxis: diagramAttr.axisPairs[0].yAxis,
                      aspect: width / (height - 200),
                    }}
                  ></BarChart>
                </div>
              </div>
            ) : (
              <Table key={resource.id} columnNames={Object.keys(transformedData[0])} records={filteredData} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
