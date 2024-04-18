import { DataRecord, JsonSourceArrays, JsonSourceObjects, JsonSourceStandard } from '@/types/visualization';

export function transformJson(json: unknown, skipFieldsRegex?: string, renameFieldsObj?: Record<string, string>) {
    const transformedJson = transformJsonData(json);
    if (transformedJson !== undefined && skipFieldsRegex !== undefined) {
        const skippedFieldsJson = skipFields(transformedJson, skipFieldsRegex);
        if (renameFieldsObj !== undefined) {
            renameFields(skippedFieldsJson, renameFieldsObj);
        }
        return skippedFieldsJson;
    }
    return transformedJson;
}

function transformJsonData(json: unknown) {
    if (isJsonSourceStandard(json)) {
        if (json.length === 0) {
            return;
        }
        const objectsArray = json as Record<string, never>[];
        return {
            fields: Object.keys(objectsArray[0]),
            records: objectsArray.map((obj) => Object.values(obj)),
        } as DataRecord;
    }

    if (isJsonSourceObjects(json)) {
        if (json.result.records.length === 0) {
            return;
        }
        return {
            fields: Object.keys(json.result.records[0]),
            records: json.result.records.map((obj) => Object.values(obj)),
        } as DataRecord;
    }

    if (isJsonSourceArrays(json)) {
        if (json.records.length === 0) {
            return;
        }
        return {
            fields: json.fields.map((field) => field.id),
            records: json.records.map((obj) => Object.values(obj)),
        } as DataRecord;
    }
}

function isJsonSourceStandard(json: unknown): json is JsonSourceStandard {
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

function skipFields(record: DataRecord, skipFieldsRegex: string) {
    const regex = new RegExp(skipFieldsRegex, 'u');
    const indicesToRemove: number[] = [];
    const remainingFields: string[] = [];
    const recordsWithoutSkippedFields = record.records.map((arr) => [...arr]);

    record.fields.forEach((field, index) => {
        if (regex.test(field)) {
            indicesToRemove.push(index);
        } else {
            remainingFields.push(field);
        }
    });

    indicesToRemove.sort((a, b) => b - a);
    recordsWithoutSkippedFields.forEach((records) => {
        indicesToRemove.forEach((index) => {
            if (index >= 0 && index < records.length) {
                records.splice(index, 1);
            }
        });
    });
    return {
        fields: remainingFields,
        records: recordsWithoutSkippedFields,
    };
}

function renameFields(record: DataRecord, renameFieldsObj: Record<string, string>) {
    record.fields.forEach((fieldName, index) => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (renameFieldsObj[fieldName] !== undefined) {
            record.fields[index] = renameFieldsObj[fieldName];
        }
    });
}
