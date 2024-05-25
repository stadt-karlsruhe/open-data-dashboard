import EmbeddedViewer from '@/components/visualization/EmbeddedViewer';
import ErrorComponent from '@/components/error-handling/ErrorComponent';
import Visualization from '@/components/visualization/layout/Visualization';
import { getConfiguration } from '@/configuration';

export default async function Page({ params: { resourceId } }: { params: { resourceId: string } }) {
  const configuration = await getConfiguration();
  const resource = configuration.resources.find((item) => item.id === resourceId);

  if (resource === undefined) {
    return <ErrorComponent code={404} />;
  }

  if (resource.type === 'Embedded') {
    return <EmbeddedViewer resource={resource} />;
  }
  return <Visualization resource={resource} />;
}
