import { z } from 'zod';

const baseResourceSchema = z
    .object({
        id: z.string(),
        source: z.string().url(),
        name: z.string(),
        description: z.string().optional(),
    })
    .strict();

const embeddedResourceSchema = baseResourceSchema
    .extend({
        type: z.literal('Embedded'),
    })
    .strict();

const axisPairSchema = z
    .object({
        xAxis: z.string(),
        yAxis: z.string(),
    })
    .strict();

const defaultFilterSchema = z.union([
    z.string(),
    z
        .object({
            min: z.number().transform(String).optional(),
            max: z.number().transform(String).optional(),
        })
        .strict()
        .refine((data) => data.min !== undefined || data.max !== undefined, {
            message: "At least one of 'min' or 'max' must be defined",
        }),
]);

const transformableResourceSchema = baseResourceSchema
    .extend({
        skipPropertiesRegEx: z.string().optional(),
        renameProperties: z.record(z.string()).optional(),
        numberFormat: z.union([z.literal('en'), z.literal('de')]).default('en'),
    })
    .strict();

const jsonResourceSchema = transformableResourceSchema
    .extend({
        type: z.union([z.literal('JSON'), z.literal('CSV')]),
        defaultFilters: z.record(z.string(), defaultFilterSchema).optional(),
        visualizations: z
            .object({
                barChart: z
                    .object({
                        axisPairs: z.array(axisPairSchema),
                    })
                    .strict()
                    .optional(),
                table: z.record(z.never()).default({}),
            })
            .strict(),
    })
    .strict()
    .refine(
        (data) => {
            if (data.skipPropertiesRegEx && data.renameProperties) {
                const regex = new RegExp(data.skipPropertiesRegEx, 'u');
                return !Object.keys(data.renameProperties).some((key) => regex.test(key));
            }
            return true;
        },
        {
            message: 'skipPropertiesRegEx should not match any keys in renameProperties',
            path: ['skipPropertiesRegEx'],
        },
    );

const geoJSONResourceSchema = transformableResourceSchema
    .extend({
        type: z.literal('GeoJSON'),
        visualizations: z
            .object({
                map: z
                    .object({
                        groupKey: z.string().optional(),
                    })
                    .strict()
                    .default({}),
            })
            .strict(),
    })
    .strict()
    .refine(
        (data) => {
            if (data.skipPropertiesRegEx && data.renameProperties) {
                const regex = new RegExp(data.skipPropertiesRegEx, 'u');
                return !Object.keys(data.renameProperties).some((key) => regex.test(key));
            }
            return true;
        },
        {
            message: 'skipPropertiesRegEx should not match any keys in renameProperties',
            path: ['skipPropertiesRegEx'],
        },
    );

export const resourceSchema = z.union([jsonResourceSchema, geoJSONResourceSchema, embeddedResourceSchema]);

const categoryBaseSchema = z
    .object({
        name: z.string(),
        description: z.string().optional(),
        icon: z.string().default('file-earmark'),
    })
    .strict();

const categorySchema = categoryBaseSchema
    .extend({
        subCategories: z.array(categoryBaseSchema).optional(),
    })
    .strict();

export const categoriesSchema = z.array(categorySchema);

export const configurationSchema = z
    .object({
        resources: z.array(resourceSchema),
        appearance: z
            .object({
                theme: z.union([z.literal('bootstrap-light'), z.literal('karlsruhe')]).default('bootstrap-light'),
            })
            .strict(),
        categories: categoriesSchema,
    })
    .strict();

export type EmbeddedResource = z.infer<typeof embeddedResourceSchema>;
export type JSONResource = z.infer<typeof jsonResourceSchema>;
export type GeoJSONResource = z.infer<typeof geoJSONResourceSchema>;
export type AxisPair = z.infer<typeof axisPairSchema>;
export type Resource = z.infer<typeof resourceSchema>;
export type Configuration = z.infer<typeof configurationSchema>;
export type Filter = z.infer<typeof defaultFilterSchema>;
export type Category = z.infer<typeof categorySchema>;
