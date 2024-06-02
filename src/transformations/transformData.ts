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
                    properties: skipObjectProperties(feature.properties as Record<string, never>, propertiesToRemove),
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
                    properties: renameObjectProperties(
                        feature.properties as Record<string, never>,
                        renamePropertiesObj,
                    ),
                };
            }),
        } as GeoJSON.FeatureCollection;
    }
    return records.map((record) => renameObjectProperties(record, renamePropertiesObj)) as Record<string, never>[];
}

function skipObjectProperties(record: Record<string, never>, propertiesToRemove: string[]) {
    const filteredProperties = Object.entries(record).filter(([key, _]) => !propertiesToRemove.includes(key));
    return Object.fromEntries(filteredProperties);
}

function renameObjectProperties(record: Record<string, never>, renamePropertiesObj: Record<string, string>) {
    return Object.fromEntries(
        Object.entries(record).map(([key, value]) => {
            return [renamePropertiesObj[key] ?? key, value];
        }),
    );
}
