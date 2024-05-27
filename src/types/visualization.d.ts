export interface TabularJsonResponse {
    result: {
        fields: [{ type: string; id: string }];
        records: Record<string, never>[];
    };
}

export interface TabularJson {
    fields: [{ type: string; id: string }];
    records: never[][];
}

export type DataRecord = Record<string, never>[];
