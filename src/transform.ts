'use-client';

import { ChartData, ChartInput, DataRecord, JsonSourceArrays, JsonSourceObjects } from '@/types/visualization';

export function transformJson(json: unknown, skipFieldsRegex?: string, renameFieldsObj?: Record<string, string>) {
    const transformedJson = transformJsonData(json);
    if (skipFieldsRegex !== undefined) {
        const skippedFieldsJson = skipFields(transformedJson, skipFieldsRegex);
        if (renameFieldsObj !== undefined) {
            return renameFields(skippedFieldsJson, renameFieldsObj);
        }
        return skippedFieldsJson;
    }
    return transformedJson;
}

export function transformJsonForCharts(json: unknown, labelIndizes: number[], dataIndizes: number[]) {
    const transformedJson = transformJsonData(json);
    const labels = getLabelsForCharts(transformedJson, labelIndizes);
    const dataPoints = getDatapointsForCharts(transformedJson, dataIndizes);
    const chartData: ChartData[] = [
        {
            label: 'Data',
            data: dataPoints ?? [],
        },
    ];
    const chartInput: ChartInput = {
        name: 'Chart',
        labels: labels ?? [],
        datapoints: chartData,
    };
    return chartInput;
}

function getLabelsForCharts(records: DataRecord, labelIndizes: number[]) {
    let labels: string[];
    for (let entry of records) {
        let label = "";
        for(var index of labelIndizes) {
            // console.log(entry);
            const entryLabel = Object.entries(entry).at(index)?.[1];
            if (entryLabel !== undefined) {
                label += entryLabel as string;
            }
        }
        if(labels === undefined || labels.length === 0){
            labels = [label];
        } else {
            labels.push(label);
        }
    }
    if(labels !== undefined){
        console.log(labels);
        return labels;
    }
    return undefined;
 }

function getDatapointsForCharts(records: DataRecord, dataIndizes: number[]) {
    let dataPoints: string[];
    for (let entry of records) {
        let dataPoint = "";
        for(var index of dataIndizes) {
            const entryLabel = Object.entries(entry).at(index)?.[1];
            if (entryLabel !== undefined) {
                dataPoint += entryLabel as string;
            }
        }
        if (dataPoints === undefined || dataPoints.length === 0) {
            dataPoints = [dataPoint];
        } else {
            dataPoints.push(dataPoint);
        }
    }
    if (dataPoints !== undefined) {
        console.log(dataPoints);
        return dataPoints;
    }
    return undefined;
}

function transformJsonData(json: unknown) {
    if (isJsonSourceStandard(json)) {
        return json;
    }

    if (isJsonSourceObjects(json)) {
        const result = json.result.records as DataRecord;
        console.log(result);
        return result;
    }

    if (isJsonSourceArrays(json)) {
        const fields = json.fields.map((field) => field.id);
        const records = [] as DataRecord;
        json.records.forEach((record) => {
            const obj = Object.fromEntries(fields.map((_, i) => [fields[i], record[i]]));
            records.push(obj);
        });
        return records;
    }
    return [] as DataRecord;
}

function isJsonSourceStandard(json: unknown): json is DataRecord {
    return Array.isArray(json) && json.every((item) => typeof item === 'object');
}

function isJsonSourceObjects(json: unknown): json is JsonSourceObjects {
    return (
        json !== null &&
        typeof json === 'object' &&
        'result' in json &&
        json.result !== null &&
        typeof json.result === 'object' &&
        'records_format' in json.result &&
        json.result.records_format === 'objects' &&
        'fields' in json.result &&
        Array.isArray(json.result.fields) &&
        json.result.fields.every((field) => typeof field === 'object' && 'type' in field && 'id' in field) &&
        'records' in json.result &&
        Array.isArray(json.result.records)
    );
}

function isJsonSourceArrays(json: unknown): json is JsonSourceArrays {
    return (
        json !== null &&
        typeof json === 'object' &&
        'fields' in json &&
        Array.isArray(json.fields) &&
        json.fields.every((field) => typeof field === 'object' && 'type' in field && 'id' in field) &&
        'records' in json &&
        Array.isArray(json.records)
    );
}

function skipFields(records: DataRecord, skipFieldsRegex: string) {
    if (records.length === 0) {
        return records;
    }

    const regex = new RegExp(skipFieldsRegex, 'u');
    const fieldsToRemove = Object.keys(records[0]).filter((key) => regex.test(key));

    if (fieldsToRemove.length === 0) {
        return records;
    }

    const filteredRecords = records.map((record) => {
        const filteredFields = Object.entries(record).filter(([key, _]) => !fieldsToRemove.includes(key));
        return Object.fromEntries(filteredFields);
    });
    return filteredRecords as DataRecord;
}

function renameFields(records: DataRecord, renameFieldsObj: Record<string, string>) {
    const renamedRecords = records.map((record) => {
        const renamedObj = {} as Record<string, never>;
        Object.entries(record).forEach(([key, value]) => {
            const renamedKey = renameFieldsObj[key] ?? key;
            renamedObj[renamedKey] = value;
        });
        return renamedObj;
    });
    return renamedRecords as DataRecord;
}
