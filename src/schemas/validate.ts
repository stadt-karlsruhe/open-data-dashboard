import { Configuration, GeoJSONResource, JSONResource, configurationSchema } from './configuration/configurationSchema';
import { geoJSONSchema, transformedDataArraySchema } from './dataSchema';

import { LRUCache } from 'lru-cache';
import { computeIfUncached } from '@/utils/mapUtils';
import { fromError } from 'zod-validation-error';
import { getConfiguration } from '@/configuration';
import { transformDataForType } from '@/transformations/transformFormat';

const configurationCache = new LRUCache<string, Configuration>({ max: 100 });
const dataCache = new LRUCache<string, JSONResource | GeoJSONResource>({ max: 100 });

type ParsedConfiguration =
    | { success: true; configuration: Configuration; error: undefined }
    | { success: false; configuration: undefined; error: string };

export function getValidatedConfiguration(): Promise<ParsedConfiguration> {
    return computeIfUncached(configurationCache, 'configuration', () =>
        validateConfiguration(),
    ) as Promise<ParsedConfiguration>;
}

export function getValidatedData(resource: JSONResource | GeoJSONResource, data: unknown) {
    return computeIfUncached(dataCache, resource.id, () => validateData(resource, data));
}

async function validateConfiguration(): Promise<ParsedConfiguration> {
    const configuration = await getConfiguration();
    const parsedConfiguration = configurationSchema.safeParse(configuration);
    console.error('validating config');
    return parsedConfiguration.success
        ? { success: true, configuration: parsedConfiguration.data, error: undefined }
        : { success: false, configuration: undefined, error: fromError(parsedConfiguration.error).toString() };
}

export function validateData(resource: JSONResource | GeoJSONResource, data: unknown) {
    const validatedData =
        resource.type === 'GeoJSON'
            ? geoJSONSchema.safeParse(transformDataForType(resource, data))
            : transformedDataArraySchema.safeParse(transformDataForType(resource, data));
    return validatedData.success
        ? { success: true, validatedData: validatedData.data, error: undefined }
        : { success: false, validatedData: undefined, error: fromError(validatedData.error).toString() };
}
