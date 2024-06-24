import { Configuration, GeoJSONResource, JSONResource, configurationSchema } from './configuration/configurationSchema';
import { geoJSONSchema, transformedDataArraySchema } from './dataSchema';

import { fromError } from 'zod-validation-error';
import { getConfiguration } from '@/configuration';
import { transformDataForType } from '@/transformations/transformFormat';

type ParsedConfiguration =
    | { success: true; configuration: Configuration; error: undefined }
    | { success: false; configuration: undefined; error: string };

export async function getValidatedConfiguration(): Promise<ParsedConfiguration> {
    const configuration = await getConfiguration();
    const parsedConfiguration = configurationSchema.safeParse(configuration);
    return parsedConfiguration.success
        ? { success: true, configuration: parsedConfiguration.data, error: undefined }
        : { success: false, configuration: undefined, error: fromError(parsedConfiguration.error).toString() };
}

export function getValidatedData(resource: JSONResource | GeoJSONResource, data: unknown) {
    const validatedData =
        resource.type === 'GeoJSON'
            ? geoJSONSchema.safeParse(transformDataForType(resource, data))
            : transformedDataArraySchema.safeParse(transformDataForType(resource, data));
    return validatedData.success
        ? { success: true, validatedData: validatedData.data, error: undefined }
        : { success: false, validatedData: undefined, error: fromError(validatedData.error).toString() };
}
