import { z } from 'zod';

const transformedDataSchema = z
    .record(z.union([z.string(), z.number(), z.boolean()]))
    .refine((data) => Object.keys(data).length > 0, {
        message:
            'At least one entry must be contained in a data object. The endpoint probably returned empty or malformed data.',
    });

export const transformedDataArraySchema = z.array(transformedDataSchema).min(1, {
    message: 'At least one data object must be contained. The endpoint probably returned empty or malformed data.',
});

type AllowedGeometry = GeoJSON.Feature<GeoJSON.Point>;

const featureSchema = z.object({
    type: z.literal('Feature'),
    properties: transformedDataSchema,
    geometry: z.object({
        coordinates: z.number().array(),
        type: z.literal('Point'),
    }),
}) satisfies z.ZodType<AllowedGeometry>;

export const geoJSONSchema = z.object({
    type: z.literal('FeatureCollection'),
    features: z.array(featureSchema),
});

export type TransformedData = z.infer<typeof transformedDataSchema>;
