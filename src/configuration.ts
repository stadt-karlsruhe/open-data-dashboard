import { Configuration } from '@/schema';
import YAML from 'yaml';
import { promises as fs } from 'node:fs';

const DEFAULT_CONFIGURATION_PATH = `${process.cwd()}/data-source.config.yml`;

export async function getConfiguration() {
    //   TODO: Handle invalid path and parsing errors
    const configPath = process.env.CONFIGURATION_PATH ?? DEFAULT_CONFIGURATION_PATH;
    const fileBuffer = await fs.readFile(configPath);
    return YAML.parse(fileBuffer.toString('utf8')) as Configuration;
}
