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

export interface ResetViewProps {
    resetViewInput: ResetViewInput;
    map?: Map;
}

export interface ResetViewInput {
    title: string;
    pos: MapPos;
}

export interface MapPos {
    latLng: L.LatLngExpression;
    zoom: number;
}

export interface LegendProps {
    legendInput: LegendInput;
    map?: Map;
}

export interface LegendInput {
    title: string;
    labels: Map<string, string>;
}
