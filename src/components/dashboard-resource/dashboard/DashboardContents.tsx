import { Configuration } from '@/schemas/configuration/configurationSchema';
import { Dashboard } from '@/schemas/configuration/dashboardsSchema';
import DashboardContent from './DashboardContent';

export default function DashboardContents({
  dashboard,
  configuration,
  className,
}: {
  dashboard: Dashboard;
  configuration: Configuration;
  className?: string;
}) {
  return (
    <div className={className}>
      {dashboard.contents?.map((rows, index) => (
        <div key={index} className="row mb-2">
          {rows.map((row, index) => {
            if (Array.isArray(row)) {
              return (
                <div
                  key={index}
                  className={`col ${row.length > 0 && index < row.length - 1 ? 'me-2' : ''}`}
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
              <div key={index} className={`col ${rows.length > 0 && index < rows.length - 1 ? 'me-2' : ''}`}>
                <DashboardContent content={row} configuration={configuration} style={{ minWidth: 300 }} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
