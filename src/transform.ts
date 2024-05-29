import { TransformableResource } from '@/schemas/configuration-schema';
import { csv2json } from 'json-2-csv';

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

function skipFields(records: Record<string, never>[], skipFieldsRegex: string) {
    if (records.length === 0) {
        return records;
    }

    const regex = new RegExp(skipFieldsRegex, 'u');
    const fieldsToRemove = Object.keys(records[0]).filter((key) => regex.test(key));

    if (fieldsToRemove.length === 0) {
        return records;
    }

    return records.map((record) => {
        const filteredFields = Object.entries(record).filter(([key, _]) => !fieldsToRemove.includes(key));
        return Object.fromEntries(filteredFields);
    });
}

function renameFields(records: Record<string, never>[], renameFieldsObj: Record<string, string>) {
    return records.map((record) => {
        const renamedObj = {} as Record<string, never>;
        Object.entries(record).forEach(([key, value]) => {
            const renamedKey = renameFieldsObj[key] ?? key;
            renamedObj[renamedKey] = value;
        });
        return renamedObj;
    });
}

function narrowType(records: Record<string, never>[], resource: TransformableResource) {
    return records.map(
        (record) =>
            Object.fromEntries(
                Object.entries(record).map(([key, value]) => {
                    const stringValue = String(value).toLowerCase();
                    if (stringValue === 'true') {
                        return [key, true];
                    }
                    if (stringValue === 'false') {
                        return [key, false];
                    }
                    const parsedValue =
                        resource.numberFormat === 'en' ? Number(value) : parseGermanNumberToInternationalFormat(value);
                    if (!Number.isNaN(parsedValue)) {
                        return [key, parsedValue];
                    }
                    return [key, value];
                }),
            ) as Record<string, string | number | boolean>,
    );
}

function parseGermanNumberToInternationalFormat(value: string) {
    const parsedValue = value.replace('.', '').replace(',', '.');
    const isNumeric = !Number.isNaN(Number(parsedValue));
    return isNumeric ? Number(parsedValue) : Number.NaN;
}
