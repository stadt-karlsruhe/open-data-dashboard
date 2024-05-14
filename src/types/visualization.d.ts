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
