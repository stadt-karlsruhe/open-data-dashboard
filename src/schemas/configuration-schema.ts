import { z } from 'zod';

const baseResourceSchema = z
    .object({
        id: z.string(),
        source: z.string(),
        name: z.string(),
        description: z.string().optional(),
    })
    .strict();

export const embeddedResourceSchema = baseResourceSchema
    .extend({
        type: z.literal('Embedded'),
    })
    .strict();

export const GeoJSONResourceSchema = baseResourceSchema
    .extend({
        type: z.literal('GeoJSON'),
        visualizations: z
            .object({
                map: z
                    .object({
                        labelKey: z.string(),
                        tooltipFields: z.record(z.string()),
                    })
                    .strict(),
            })
            .strict(),
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

export const transformableResourceSchema = baseResourceSchema
    .extend({
        type: z.union([z.literal('JSON'), z.literal('CSV')]),
        skipFieldsRegEx: z.string().optional(),
        renameFields: z.record(z.string()).optional(),
        defaultFilters: z.record(z.string(), defaultFilterSchema).optional(),
        numberFormat: z.union([z.literal('en'), z.literal('de')]).default('en'),
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
            .strict()
            .default({ table: {} }),
    })
    .strict()
    .refine(
        (data) => {
            if (data.skipFieldsRegEx && data.renameFields) {
                const regex = new RegExp(data.skipFieldsRegEx, 'u');
                return !Object.keys(data.renameFields).some((key) => regex.test(key));
            }
            return true;
        },
        {
            message: 'skipFieldsRegEx should not match any keys in renameFields',
            path: ['skipFieldsRegEx'],
        },
    );

export const resourceSchema = z.union([GeoJSONResourceSchema, transformableResourceSchema, embeddedResourceSchema]);

export const configurationSchema = z
    .object({
        resources: z.array(resourceSchema),
        appearance: z
            .object({
                theme: z.union([z.literal('bootstrap-light'), z.literal('karlsruhe')]).default('bootstrap-light'),
            })
            .strict()
            .default({}),
    })
    .strict();

export type EmbeddedResource = z.infer<typeof embeddedResourceSchema>;
export type GeoJSONResource = z.infer<typeof GeoJSONResourceSchema>;
export type AxisPair = z.infer<typeof axisPairSchema>;
export type TransformableResource = z.infer<typeof transformableResourceSchema>;
export type Resource = z.infer<typeof resourceSchema>;
export type Configuration = z.infer<typeof configurationSchema>;
export type Filter = z.infer<typeof defaultFilterSchema>;
