import { TransformableResource } from './configuration-schema';
import { transformData } from '@/transformations/transformFormat';
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

export type TransformedData = z.infer<typeof transformedDataSchema>;

export function transform(resource: TransformableResource, data: unknown) {
    const transformedData = transformData(resource, data);
    return transformedDataArraySchema.safeParse(transformedData);
}
