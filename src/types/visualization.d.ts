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

export interface Resource {
    id: string;
    name: string;
    description?: string;
    endpoint: string;
    type: 'JSON' | 'CSV';
    skipFields?: string;
    renameFields?: Record<string, string>;
}
