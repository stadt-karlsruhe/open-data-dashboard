declare module '*.yml' {
    export const resources: Resource[];
}

interface BaseResource {
    id: string;
    source: string;
    name: string;
    description?: string;
}

interface EmbeddedResource extends BaseResource {
    type: 'Embedded';
}

interface GeoJSONResource extends BaseResource {
    type: 'GeoJSON';
    visualizations: {
        map: Record<string, never>;
    };
}

interface TransformableResource extends BaseResource {
    type: 'JSON' | 'CSV';
    skipFieldsRegEx?: string;
    renameFields?: Record<string, string>[];
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

type Resource = GeoJSONResource | TransformableResource | EmbeddedResource;
