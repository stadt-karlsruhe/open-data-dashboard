import { z } from 'zod';

const BaseResourceSchema = z
    .object({
        id: z.string(),
        source: z.string(),
        name: z.string(),
        description: z.string().optional(),
    })
    .strict();

export const EmbeddedResourceSchema = BaseResourceSchema.extend({
    type: z.literal('Embedded'),
}).strict();

export const GeoJSONResourceSchema = BaseResourceSchema.extend({
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
}).strict();

const AxisPairSchema = z
    .object({
        xAxis: z.string(),
        yAxis: z.string(),
    })
    .strict();

const DefaultFilterSchema = z.union([
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

export const TransformableResourceSchema = BaseResourceSchema.extend({
    type: z.union([z.literal('JSON'), z.literal('CSV')]),
    skipFieldsRegEx: z.string().optional(),
    renameFields: z.record(z.string()).optional(),
    defaultFilters: z.record(z.string(), DefaultFilterSchema).optional(),
    dataFormat: z
        .union([z.literal('en'), z.literal('de')])
        .default('de')
        .optional(),
    visualizations: z
        .object({
            barChart: z
                .object({
                    axisPairs: z.array(AxisPairSchema),
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

export const ResourceSchema = z.union([GeoJSONResourceSchema, TransformableResourceSchema, EmbeddedResourceSchema]);

export const ConfigurationSchema = z
    .object({
        resources: z.array(ResourceSchema),
        appearance: z
            .object({
                theme: z.union([z.literal('bootstrap-light'), z.literal('karlsruhe')]).default('bootstrap-light'),
            })
            .strict()
            .default({}),
    })
    .strict();

export type EmbeddedResource = z.infer<typeof EmbeddedResourceSchema>;
export type GeoJSONResource = z.infer<typeof GeoJSONResourceSchema>;
export type AxisPair = z.infer<typeof AxisPairSchema>;
export type TransformableResource = z.infer<typeof TransformableResourceSchema>;
export type Resource = z.infer<typeof ResourceSchema>;
export type Configuration = z.infer<typeof ConfigurationSchema>;
export type Filter = z.infer<typeof DefaultFilterSchema>;
