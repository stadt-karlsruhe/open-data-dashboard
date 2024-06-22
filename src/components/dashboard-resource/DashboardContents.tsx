import { Configuration, Dashboard } from '@/schemas/configurationSchema';

import DashboardContent from './DashboardContent';

export default function DashboardContents({
  dashboard,
  configuration,
}: {
  dashboard: Dashboard;
  configuration: Configuration;
}) {
  return (
    <>
      {dashboard.contents?.map((rows, index) => (
        <div key={index} className="d-flex justify-content-center flex-wrap flex-lg-nowrap mt-3">
          {rows.map((row, index) => {
            if (Array.isArray(row)) {
              return (
                <div
                  key={index}
                  className={`d-flex flex-column flex-grow-1 ${row.length > 0 && index < row.length - 1 ? 'me-2' : ''}`}
                  style={{ minWidth: 300 }}
                >
                  {row.map((content, index) => {
                    return (
                      <div key={index}>
                        <DashboardContent
                          content={content}
                          configuration={configuration}
                          className={row.length > 0 && index < row.length - 1 ? 'mb-2' : ''}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            }
            return (
              <DashboardContent
                key={index}
                content={row}
                configuration={configuration}
                className={`flex-grow-1 ${rows.length > 0 && index < rows.length - 1 ? 'me-2' : ''}`}
                style={{ minWidth: 300 }}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}
