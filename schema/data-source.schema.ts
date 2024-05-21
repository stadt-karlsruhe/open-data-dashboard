import { JTDDataType } from 'ajv/dist/jtd';

export interface TransformableResource extends BaseResource {
    type: 'JSON' | 'CSV';
    skipFieldsRegEx?: string;
    renameFields?: Record<string, string>;
    visualizations: {
        barChart?: {
            axisPairs: AxisPair[];
        };
        table: Record<string, never>;
    };
}

interface AxisPair {
    xAxis: string;
    yAxis: string;
}

const BaseResourceSchema = {
    properties: {
        id: { type: 'string' },
        source: { type: 'string', format: 'uri' },
        name: { type: 'string' },
    },
    optionalProperties: {
        description: { type: 'string' },
    },
} as const;

type BaseResource = JTDDataType<typeof BaseResourceSchema>;

const EmbeddedResourceSchema = {
    properties: {
        type: { type: 'string' },
        ...BaseResourceSchema.properties,
    },
    optionalProperties: {
        ...BaseResourceSchema.optionalProperties,
    },
} as const;

export type EmbeddedResource = JTDDataType<typeof EmbeddedResourceSchema>;

const GeoJSONResourceSchema = {
    properties: {
        type: { type: 'string' },
        visualizations: {
            properties: {
                map: { type: 'string' },
            },
            required: ['map'],
            additionalProperties: false,
            propertyNames: { type: 'string' },
        },
        ...BaseResourceSchema.properties,
    },
    required: ['type', 'visualizations'],
    additionalProperties: false,
    optionalProperties: {
        ...BaseResourceSchema.optionalProperties,
    },
} as const;

export type GeoJSONResource = JTDDataType<typeof GeoJSONResourceSchema>;
