import { GeoJSONResource, JSONResource } from './configurationSchema';
import { fromError } from 'zod-validation-error';
import { transformDataForType } from '@/transformations/transformFormat';
import { z } from 'zod';

const transformedDataSchema = z
    .record(z.union([z.string(), z.number(), z.boolean()]))
    .refine((data) => Object.keys(data).length > 0, {
        message:
            'At least one entry must be contained in a data object. The endpoint probably returned empty or malformed data.',
    });

const transformedDataArraySchema = z.array(transformedDataSchema).min(1, {
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

const geoJSONSchema = z.object({
    type: z.literal('FeatureCollection'),
    features: z.array(featureSchema),
});

export type TransformedData = z.infer<typeof transformedDataSchema>;

export function transform(resource: JSONResource | GeoJSONResource, data: unknown) {
    const transformedData =
        resource.type === 'GeoJSON'
            ? geoJSONSchema.safeParse(transformDataForType(resource, data))
            : transformedDataArraySchema.safeParse(transformDataForType(resource, data));
    return transformedData.success
        ? { success: true, transformedData: transformedData.data, error: undefined }
        : { success: false, transformedData: undefined, error: fromError(transformedData.error).toString() };
}
