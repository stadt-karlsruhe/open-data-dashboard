import { Configuration, configurationSchema } from '@/schemas/configuration-schema';

import YAML from 'yaml';
import { fromError } from 'zod-validation-error';
import { promises as fs } from 'node:fs';
import { merge } from 'ts-deepmerge';
import path from 'node:path';

type ParsedConfiguration =
    | { success: true; configuration: Configuration; error: undefined }
    | { success: false; configuration: undefined; error: string };

const DEFAULT_CONFIGURATION_DIR = `${process.cwd()}/config`;

export async function getConfiguration(): Promise<ParsedConfiguration> {
    try {
        const configDir = process.env.CONFIGURATION_DIR ?? DEFAULT_CONFIGURATION_DIR;
        const yamlFiles = await getYamlFiles(configDir);

        if (yamlFiles.length === 0) {
            throw new Error('No configuration files found');
        }

        const configurations = await Promise.all(yamlFiles.map((element) => readYamlFile(element)));

        return validateConfiguration(
            merge.withOptions({ mergeArrays: false }, ...configurations) as unknown as Configuration,
        );
    } catch (err) {
        return { success: false, configuration: undefined, error: String(err) };
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

function validateConfiguration(configuration: Configuration): ParsedConfiguration {
    const parsedConfiguration = configurationSchema.safeParse(configuration);
    return parsedConfiguration.success
        ? { success: true, configuration: parsedConfiguration.data, error: undefined }
        : { success: false, configuration: undefined, error: fromError(parsedConfiguration.error).toString() };
}
