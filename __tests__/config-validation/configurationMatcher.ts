import {
    Appearance,
    Category,
    Configuration,
    Resource,
    appearanceSchema,
    categoriesSchema,
    configurationSchema,
    embeddedResourceSchema,
    geoJSONResourceSchema,
    jsonResourceSchema,
    resourceSchema,
} from '@/schemas/configuration-schema';

import { expect } from '@jest/globals';
import { fromError } from 'zod-validation-error';

// eslint-disable-next-line max-lines-per-function
function toBeValidConfiguration(configuration: Configuration) {
    const parsedConfiguration = configurationSchema.safeParse(configuration);
    if (parsedConfiguration.success) {
        return {
            pass: true,
            message: () => 'The configuration is valid.',
            received: configuration,
        };
    }
    const appearanceError = parseConfigurationSection(configuration.appearance, appearanceSchema);
    const resourceErrors =
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        configuration.resources === undefined
            ? []
            : (configuration.resources
                  .map((resource) => {
                      let resourceError;
                      switch (resource.type) {
                          case 'JSON':
                          case 'CSV': {
                              resourceError = parseConfigurationSection(resource, jsonResourceSchema);
                              break;
                          }
                          case 'GeoJSON': {
                              resourceError = parseConfigurationSection(resource, geoJSONResourceSchema);
                              break;
                          }
                          case 'HTML':
                          case 'PDF': {
                              resourceError = parseConfigurationSection(resource, embeddedResourceSchema);
                              break;
                          }
                          default: {
                              resourceError = parseConfigurationSection(resource, resourceSchema);
                          }
                      }
                      return resourceError === undefined
                          ? undefined
                          : `Resource: ${resource.id}\n    Errors: ${resourceError}`;
                  })
                  .filter((error) => error !== undefined) as string[]);
    const categoriesError = parseConfigurationSection(configuration.categories, categoriesSchema);

    const errorMessages = ['The configuration contains errors.'];
    errorMessages.push(`Summary: ${fromError(parsedConfiguration.error).toString()}\n\nSee the details below:\n`);
    if (appearanceError) {
        errorMessages.push(`Appearance Error: ${appearanceError}`);
    }
    if (resourceErrors.length > 0) {
        errorMessages.push(`Resource Errors:`);
        resourceErrors.forEach((error) => errorMessages.push(`  - ${error}`));
    }
    if (categoriesError) {
        errorMessages.push(`Categories Error: ${categoriesError}`);
    }

    const message = errorMessages.join('\n');
    return {
        pass: false,
        message: () => message,
        received: configuration,
    };
}

function parseConfigurationSection(
    section: Resource | Appearance | Category[],
    schema:
        | typeof resourceSchema
        | typeof embeddedResourceSchema
        | typeof jsonResourceSchema
        | typeof geoJSONResourceSchema
        | typeof appearanceSchema
        | typeof categoriesSchema,
) {
    const parsedSection = schema.safeParse(section);
    return parsedSection.success ? undefined : fromError(parsedSection.error).toString();
}

expect.extend({ toBeValidConfiguration });
