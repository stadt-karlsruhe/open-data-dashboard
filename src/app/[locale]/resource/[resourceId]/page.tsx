import { Configuration } from '@/types/configuration';
import EmbeddedViewer from '@/components/visualization/EmbeddedViewer';
import NotFound from '@/components/NotFound';
import Visualization from '@/components/visualization/layout/Visualization';
import YAML from 'yaml';
import { promises as fs } from 'node:fs';

const DEFAULT_CONFIGURATION_PATH = `${process.cwd()}/data-source.config.yml`;

export default async function Page({ params: { resourceId } }: { params: { resourceId: string } }) {
  const config = await getConfiguration();
  const resource = config.resources.find((item) => item.id === resourceId);

  if (resource === undefined) {
    return <NotFound />;
  }

  if (resource.type === 'Embedded') {
    return <EmbeddedViewer resource={resource} />;
  }
  return <Visualization resource={resource} />;
}

async function getConfiguration() {
  //   TODO: Handle invalid path and parsing errors
  const configPath = process.env.CONFIGURATION_PATH ?? DEFAULT_CONFIGURATION_PATH;
  const fileBuffer = await fs.readFile(configPath);
  return YAML.parse(fileBuffer.toString('utf8')) as Configuration;
}
