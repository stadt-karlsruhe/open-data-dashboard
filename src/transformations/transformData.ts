export function skipProperties(
    records: Record<string, never>[] | GeoJSON.FeatureCollection,
    skipPropertiesRegex: string,
) {
    const regex = new RegExp(skipPropertiesRegex, 'u');
    if ('features' in records) {
        if (records.features.length === 0 || !records.features[0].properties) {
            return records;
        }
        const propertiesToRemove = Object.keys(records.features[0].properties).filter((key) => regex.test(key));

        if (propertiesToRemove.length === 0) {
            return records;
        }

        return {
            ...records,
            features: records.features.map((feature) => {
                return {
                    ...feature,
                    properties: skipObjectProperties(feature.properties, propertiesToRemove),
                };
            }),
        } as GeoJSON.FeatureCollection;
    }

    if (records.length === 0) {
        return records;
    }
    const propertiesToRemove = Object.keys(records[0]).filter((key) => regex.test(key));
    return records.map((record) => skipObjectProperties(record, propertiesToRemove)) as Record<string, never>[];
}

export function renameProperties(
    records: Record<string, never>[] | GeoJSON.FeatureCollection,
    renamePropertiesObj: Record<string, string>,
) {
    if ('features' in records) {
        return {
            ...records,
            features: records.features.map((feature) => {
                return {
                    ...feature,
                    properties: renameObjectProperties(feature.properties, renamePropertiesObj),
                };
            }),
        } as GeoJSON.FeatureCollection;
    }
    return records.map((record) => renameObjectProperties(record, renamePropertiesObj)) as Record<string, never>[];
}

function skipObjectProperties(record: Record<string, never> | GeoJSON.GeoJsonProperties, propertiesToRemove: string[]) {
    if (!record) {
        return record;
    }

    const filteredProperties = Object.entries(record).filter(([key, _]) => !propertiesToRemove.includes(key));
    return Object.fromEntries(filteredProperties);
}

function renameObjectProperties(
    record: Record<string, never> | GeoJSON.GeoJsonProperties,
    renamePropertiesObj: Record<string, string>,
) {
    if (!record) {
        return record as GeoJSON.GeoJsonProperties;
    }
    return Object.fromEntries(
        Object.entries(record).map(([key, value]) => {
            return [renamePropertiesObj[key] ?? key, value];
        }),
    );
}
