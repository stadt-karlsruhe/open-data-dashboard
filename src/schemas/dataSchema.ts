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

type AllowedGeometry =
    | GeoJSON.Point
    | GeoJSON.MultiPoint
    | GeoJSON.LineString
    | GeoJSON.MultiLineString
    | GeoJSON.Polygon
    | GeoJSON.MultiPolygon;

const pointGeometrySchema = z.object({
    coordinates: z.number().array(),
    type: z.literal('Point'),
});

const multiPointGeometrySchema = z.object({
    coordinates: z.number().array().array(),
    type: z.literal('MultiPoint'),
});

const lineGeometrySchema = z.object({
    coordinates: z.number().array().array(),
    type: z.literal('LineString'),
});

const multiLineGeometrySchema = z.object({
    coordinates: z.number().array().array().array(),
    type: z.literal('MultiLineString'),
});

const polygonGeometrySchema = z.object({
    coordinates: z.number().array().array().array(),
    type: z.literal('Polygon'),
});

const multiPolygonGeometrySchema = z.object({
    coordinates: z.number().array().array().array().array(),
    type: z.literal('MultiPolygon'),
});

const featureSchema = z.object({
    type: z.literal('Feature'),
    properties: transformedDataSchema,
    geometry: z.union([
        pointGeometrySchema,
        multiPointGeometrySchema,
        lineGeometrySchema,
        multiLineGeometrySchema,
        polygonGeometrySchema,
        multiPolygonGeometrySchema,
    ]),
}) satisfies z.ZodType<GeoJSON.Feature<AllowedGeometry>>;

export const geoJSONSchema = z.object({
    type: z.literal('FeatureCollection'),
    features: z.array(featureSchema),
});

export type TransformedData = z.infer<typeof transformedDataSchema>;
