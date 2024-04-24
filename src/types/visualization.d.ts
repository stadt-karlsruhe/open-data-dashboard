export interface JsonSourceObjects {
    result: {
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
    aspect: number;
}

export type ResourceType = 'JSON' | 'CSV' | 'PDF' | 'Embedded';

export type DiagramType = { type: 'TABLE' } | { type: 'CHART'; yAxis: string; xAxis: string };

export interface Resource {
    id: string;
    name: string;
    description?: string;
    endpoint: string;
    type: ResourceType;
    diagrams: DiagramType[];
    skipFields?: string;
    renameFields?: Record<string, string>;
}
