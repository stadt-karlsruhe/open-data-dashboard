export function skipFields(records: Record<string, never>[], skipFieldsRegex: string) {
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

export function renameFields(records: Record<string, never>[], renameFieldsObj: Record<string, string>) {
    return records.map((record) => {
        const renamedObj = {} as Record<string, never>;
        Object.entries(record).forEach(([key, value]) => {
            const renamedKey = renameFieldsObj[key] ?? key;
            renamedObj[renamedKey] = value;
        });
        return renamedObj;
    });
}
