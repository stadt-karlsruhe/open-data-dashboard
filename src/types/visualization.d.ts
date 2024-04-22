export interface JsonSourceObjects {
    result: {
        records_format: 'objects';
        fields: [{ type: string; id: string }];
        records: Record<string, never>[];
    };
}

export interface JsonSourceArrays {
    fields: [{ type: string; id: string }];
    records: never[][];
}

export type DataRecord = Record<string, never>[];

export interface ChartInput {
    data: DataRecord;
    yAxis: string;
    xAxis: string;
}

export type ResourceType = 'JSON' | 'CSV' | 'PDF' | 'Embedded';

export type VisualizationType = 'TABLE' | 'CHART' | 'PDF';

export interface Resource {
    id: string;
    name: string;
    description?: string;
    endpoint: string;
    type: ResourceType;
    visType?: VisualizationType;
    skipFields?: string;
    renameFields?: Record<string, string>;
    yAxis?: string;
    xAxis?: string;
}
