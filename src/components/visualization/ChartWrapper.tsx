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
  const { height } = useWindowDimensions();

  return (
    <div className="card rounded-0">
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs" data-bs-tabs="tabs">
          {resource.diagrams.map((diagram, index) => (
            <li className="nav-item" key={diagram.type}>
              <a
                data-bs-toggle="tab"
                aria-current="true"
                href={`#${diagram.type}-${resource.id}`}
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
            key={diagram.type}
            id={`${diagram.type}-${resource.id}`}
            className={`tab-pane ${index === 0 ? 'active' : ''}`}
          >
            {diagram.type === 'CHART' ? (
              <div className="d-flex overflow-hidden">
                <div style={{ flexBasis: '90%', maxHeight: height - 100 }}>
                  <BarChart
                    chartInput={{
                      data: transformedData,
                      xAxis: diagram.xAxis,
                      yAxis: diagram.yAxis,
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
