import { Dashboard } from '@/schemas/configuration-schema';
import EmbeddedViewer from '../visualization/EmbeddedViewer';

export default function DashboardContent({ dashboard }: { dashboard: Dashboard }) {
  return (
    <div className="d-flex flex-wrap justify-content-center mt-3">
      {dashboard.contents?.map((content, index) => {
        if (content.type === 'EXTERNAL') {
          return (
            <EmbeddedViewer
              key={index}
              // TODO: Properly handle height
              height={260}
              resource={{
                source: content.source,
                id: 'external',
                name: content.name,
                type: 'HTML',
                category: 'External-HTML',
              }}
            />
          );
        }
        //   TODO: Handle internal content
      })}
    </div>
  );
}
