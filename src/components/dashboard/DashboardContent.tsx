import { Dashboard } from '@/schemas/configuration-schema';
import EmbeddedViewer from '../visualization/EmbeddedViewer';

export default function DashboardContent({ dashboard }: { dashboard: Dashboard }) {
  return (
    <div className="d-flex flex-wrap justify-content-center mt-3">
      {dashboard.contents?.map((content, index) => {
        if (content.kind === 'EXTERNAL') {
          return (
            <EmbeddedViewer
              key={index}
              // TODO: Properly handle height
              height={260}
              resource={{
                source: content.source,
                id: 'external',
                name: 'external',
                type: 'HTML',
              }}
            />
          );
        }
        //   TODO: Handle internal content
      })}
    </div>
  );
}
