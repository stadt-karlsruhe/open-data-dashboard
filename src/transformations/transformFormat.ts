import { renameFields, skipFields } from './transformData';

import { TransformableResource } from '@/schemas/configuration-schema';
import { csv2json } from 'json-2-csv';
import { narrowType } from './transformType';

export function transformData(resource: TransformableResource, data: unknown) {
    let transformedData = transformType(resource, data);
    if (resource.skipFieldsRegEx !== undefined) {
        transformedData = skipFields(transformedData, resource.skipFieldsRegEx);
    }
    if (resource.renameFields !== undefined) {
        transformedData = renameFields(transformedData, resource.renameFields);
    }
    return narrowType(transformedData, resource);
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
        return json.result.records;
    }

    if (isTabularJson(json)) {
        const fields = json.fields.map((field) => field.id);
        const records = [] as Record<string, never>[];
        json.records.forEach((record) => {
            const obj = Object.fromEntries(fields.map((_, i) => [fields[i], record[i]]));
            records.push(obj);
        });
        return records;
    }
    return [];
}

function isStandardJson(json: unknown): json is Record<string, never>[] {
    return Array.isArray(json) && json.every((item) => typeof item === 'object');
}

interface TabularJsonResponse {
    result: {
        fields: [{ type: string; id: string }];
        records: Record<string, never>[];
    };
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

interface TabularJson {
    fields: [{ type: string; id: string }];
    records: never[][];
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
    return csv2json(String(csv)) as Record<string, never>[];
}
