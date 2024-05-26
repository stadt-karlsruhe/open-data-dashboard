import EmbeddedViewer from '@/components/visualization/EmbeddedViewer';
import ErrorComponent from '@/components/error-handling/ErrorComponent';
import { ResourceSchema } from '@/schema';
import Visualization from '@/components/visualization/layout/Visualization';
import { getConfiguration } from '@/configuration';

export default async function Page({ params: { resourceId } }: { params: { resourceId: string } }) {
  const configuration = await getConfiguration();
  const resource = configuration.resources.find((item) => item.id === resourceId);

  if (resource === undefined) {
    return <ErrorComponent code={404} />;
  }

  const parsedResource = ResourceSchema.safeParse(resource);
  if (!parsedResource.success) {
    return <ErrorComponent code={500} />;
  }

  if (resource.type === 'Embedded') {
    return <EmbeddedViewer resource={parsedResource.data} />;
  }
  return <Visualization resource={parsedResource.data} />;
}
