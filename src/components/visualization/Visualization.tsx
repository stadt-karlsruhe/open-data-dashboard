'use client';

import BarChart from './BarChart';
import { Resource } from '@/types/visualization';
import Table from './Table';
import { transformData } from '@/transform';
import useSWR from 'swr';

// eslint-disable-next-line max-lines-per-function
export default function Visualization({ resource }: { resource: Resource }) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error } = useSWR(resource, async (resource) => {
    const response = await fetch(resource.endpoint);
    return resource.type === 'CSV' ? response.text() : response.json();
  });
  if (resource.type === 'JSON' || resource.type === 'CSV') {
    const transformedData = transformData(resource, data);

    if (transformedData === undefined) {
      return <></>;
    }

    return (
      <div>
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
                  <div className="d-flex">
                    <div className="overflow-hidden" style={{ flexBasis: '90%' }}>
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
      </div>
    );
  }
}
