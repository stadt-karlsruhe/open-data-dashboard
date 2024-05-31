import { Configuration } from '@/schema';
import YAML from 'yaml';
import { promises as fs } from 'node:fs';
import { merge } from 'ts-deepmerge';
import path from 'node:path';

const DEFAULT_CONFIGURATION_DIR = `${process.cwd()}/config`;

export async function getConfiguration() {
    //   TODO: Handle invalid path and parsing errors
    try {
        const configDir = process.env.CONFIGURATION_DIR ?? DEFAULT_CONFIGURATION_DIR;
        const yamlFiles = await getYamlFiles(configDir);

        if (yamlFiles.length === 0) {
            throw new Error('No configuration files found');
        }

        const configurations = await Promise.all(yamlFiles.map((element) => readYamlFile(element)));

        return {
            success: true,
            data: merge.withOptions({ mergeArrays: false }, ...configurations) as unknown as Configuration,
        };
    } catch (err) {
        return { success: false, error: err };
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
