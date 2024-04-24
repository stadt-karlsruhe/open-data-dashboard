import { DataRecord, Resource } from '@/types/visualization';
import BarChart from './BarChart';
import Table from './Table';
import useWindowDimensions from '../WindowDimensions';

export default function ChartWrapper({
  resource,
  transformedData,
}: {
  resource: Resource;
  transformedData: DataRecord;
}) {
  const { width, height } = useWindowDimensions();

  return (
    <div className="card rounded-0">
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs" data-bs-tabs="tabs">
          {resource.diagrams.map((diagram, index) => (
            <li className="nav-item" key={`${diagram.type}-${String(index)}`}>
              <a
                data-bs-toggle="tab"
                aria-current="true"
                href={`#${diagram.type}-${resource.id}-${String(index)}`}
                className={`nav-link ${index === 0 ? 'active' : ''}`}
              >
                {diagram.type}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="card-body tab-content diagram-card">
        {resource.diagrams.map((diagram, index) => (
          <div
            key={`${diagram.type}-${String(index)}`}
            id={`${diagram.type}-${resource.id}-${String(index)}`}
            className={`tab-pane ${index === 0 ? 'active' : ''}`}
          >
            {diagram.type === 'CHART' ? (
              <div className="d-flex flex-column">
                <div style={{ flexBasis: '100%' }}>
                  <BarChart
                    chartInput={{
                      data: transformedData,
                      xAxis: diagram.xAxis,
                      yAxis: diagram.yAxis,
                      aspect: width / (height - 100),
                    }}
                  ></BarChart>
                </div>
              </div>
            ) : (
              <>
                <Table key={resource.id} record={transformedData}></Table>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
