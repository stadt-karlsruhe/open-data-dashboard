import EmbeddedViewer from '@/components/visualization/EmbeddedViewer';
import NotFound from '@/components/NotFound';
import Visualization from '@/components/visualization/layout/Visualization';
import config from '../../../../../data-source.config.yml';

export default function Page({ params: { resourceId } }: { params: { resourceId: string } }) {
  const resource = config.resources.find((item) => item.id === resourceId);

  if (resource === undefined) {
    return <NotFound />;
  }

  if (resource.type === 'Embedded') {
    return <EmbeddedViewer source={resource.source} />;
  }
  return <Visualization resource={resource} />;
}
