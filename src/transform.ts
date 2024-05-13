import { DataRecord, JsonSourceArrays, JsonSourceObjects } from '@/types/visualization';
import { TransformableResource } from '@/types/configuration';
import { csv2json } from 'json-2-csv';

export function transformData(resource: TransformableResource, data: unknown) {
    let transformedData = transformType(resource, data);
    if (resource.skipFieldsRegEx !== undefined) {
        transformedData = skipFields(transformedData, resource.skipFieldsRegEx);
    }
    if (resource.renameFields !== undefined) {
        transformedData = renameFields(transformedData, resource.renameFields);
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
    if (isJsonSourceStandard(json)) {
        return json;
    }

    if (isJsonSourceObjects(json)) {
        return json.result.records as DataRecord;
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
