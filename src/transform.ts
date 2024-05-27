import { DataRecord, TabularJson, TabularJsonResponse } from '@/types/visualization';

import { TransformableResource } from '@/schema';
import { csv2json } from 'json-2-csv';

export function transformData(resource: TransformableResource, data: unknown) {
    let transformedData = transformType(resource, data);
    if (resource.skipFieldsRegEx !== undefined) {
        transformedData = skipFields(transformedData, resource.skipFieldsRegEx);
    }
    if (resource.renameFields !== undefined) {
        transformedData = renameFields(transformedData, resource.renameFields);
    }
    if (resource.dataFormat === 'de') {
        transformedData = mapData(transformedData, resource);
    }
    return transformedData;
}

function transformType(resource: TransformableResource, data: unknown) {
    if (resource.type === 'JSON') {
        return transformJsonData(data);
    }
    return transformCsvData(data);
}

function transformJsonData(json: unknown) {
    if (isStandardJson(json)) {
        return json;
    }

    if (isTabularResponseJson(json)) {
        return json.result.records as DataRecord;
    }

    if (isTabularJson(json)) {
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

function isStandardJson(json: unknown): json is DataRecord {
    return Array.isArray(json) && json.every((item) => typeof item === 'object');
}

function isTabularResponseJson(json: unknown): json is TabularJsonResponse {
    return (
        json !== null &&
        typeof json === 'object' &&
        'result' in json &&
        json.result !== null &&
        typeof json.result === 'object' &&
        'fields' in json.result &&
        Array.isArray(json.result.fields) &&
        json.result.fields.every((field) => typeof field === 'object' && 'type' in field && 'id' in field) &&
        'records' in json.result &&
        Array.isArray(json.result.records)
    );
}

function isTabularJson(json: unknown): json is TabularJson {
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

function transformCsvData(csv: unknown) {
    return csv2json(String(csv)) as DataRecord;
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

function mapData(records: DataRecord, resource: TransformableResource) {
    if (resource.visualizations.barChart?.axisPairs === undefined) {
        return records;
    }
    const yAxes = resource.visualizations.barChart.axisPairs.map((value) => value.yAxis);
    const mappedRecords = [] as DataRecord;
    records.forEach((record) => {
        const obj = Object.fromEntries(Object.entries(record).map((entry) => parseEntry(entry, yAxes)));
        mappedRecords.push(obj);
    });
    return mappedRecords;
}

function parseEntry(entry: [string, never], yAxes: string[]) {
    if (!yAxes.includes(entry[0])) {
        return entry;
    }
    return [entry[0], parseNumberToInternationalFormat(entry[1])] as [string, never];
}

function parseNumberToInternationalFormat(value: never) {
    return (value as string).toString().replace('.', '').replace(',', '.') as never;
}
