export interface Configuration {
    resources: Resource[];
}

interface BaseResource {
    id: string;
    source: string;
    name: string;
    description?: string;
}

export interface EmbeddedResource extends BaseResource {
    type: 'Embedded';
}

export interface GeoJSONResource extends BaseResource {
    type: 'GeoJSON';
    visualizations: {
        map: Record<string, never>;
    };
}

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

export type Resource = GeoJSONResource | TransformableResource | EmbeddedResource;
