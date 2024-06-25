import { Category, Configuration, Dashboard, Resource } from '@/schemas/configurationSchema';

import YAML from 'yaml';
import { promises as fs } from 'node:fs';
import { merge } from 'ts-deepmerge';
import path from 'node:path';

const DEFAULT_CONFIGURATION_DIR = `${process.cwd()}/config`;

export async function getConfiguration() {
    try {
        const configDir = process.env.CONFIGURATION_DIR ?? DEFAULT_CONFIGURATION_DIR;
        const yamlFiles = await getYamlFiles(configDir);

        if (yamlFiles.length === 0) {
            throw new Error('No configuration files found');
        }

        const configurations = await Promise.all(yamlFiles.map((element) => readYamlFile(element)));
        return mergeConfigurations(configurations);
    } catch (err) {
        // Only log errors instead of erroring the application at this stage
        // Allows using the custom ErrorComponent in case of i.e. I/O errors
        console.error(err);
        return {} as Configuration;
    }
}

async function getYamlFiles(dir: string): Promise<string[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
        entries.map((entry) => {
            const res = path.resolve(dir, entry.name);
            return entry.isDirectory() ? getYamlFiles(res) : res;
        }),
    );
    return files.flat().filter((file: string) => file.endsWith('app.config.yaml') || file.endsWith('app.config.yml'));
}

async function readYamlFile(filePath: string) {
    const fileBuffer = await fs.readFile(filePath);
    return YAML.parse(fileBuffer.toString('utf8')) as Configuration;
}

function mergeConfigurations(configurations: Configuration[]): Configuration {
    const mergedConfigurations = merge(...configurations) as unknown as Configuration;
    return Object.fromEntries(
        Object.entries(mergedConfigurations).map(([key, value]) => {
            switch (key) {
                case 'resources':
                case 'dashboards': {
                    return [
                        key,
                        [...new Map((value as Resource[] | Dashboard[]).map((item) => [item.id, item])).values()],
                    ];
                }
                case 'categories': {
                    return [key, [...new Map((value as Category[]).map((item) => [item.name, item])).values()]];
                }
                default: {
                    return [key, value];
                }
            }
        }),
    ) as Configuration;
}
