import EmbeddedViewer from '@/components/visualization/EmbeddedViewer';
import NotFound from '@/components/NotFound';
import Visualization from '@/components/visualization/layout/Visualization';
import { getConfiguration } from '@/configuration';

export default async function Page({ params: { resourceId } }: { params: { resourceId: string } }) {
  const configuration = await getConfiguration();
  const resource = configuration.resources.find((item) => item.id === resourceId);

  if (resource === undefined) {
    return <NotFound />;
  }

  if (resource.type === 'Embedded') {
    return <EmbeddedViewer source={resource.source} />;
  }
  return <Visualization resource={resource} />;
}
