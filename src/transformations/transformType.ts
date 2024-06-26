import { GeoJSONResource, JSONResource } from '@/schemas/configuration/configurationSchema';

import { object } from 'zod';

export function narrowType(
    records: Record<string, never>[] | GeoJSON.FeatureCollection,
    resource: JSONResource | GeoJSONResource,
) {
    if ('features' in records) {
        if (resource.type === 'GeoJSON' && resource.visualizations.map.groupKey) {
            const { groupKey } = resource.visualizations.map;
            return {
                ...records,
                features: mapGeoJSONFeatures(records.features, resource.numberFormat).sort((a, b) => {
                    const aValue = a.properties ? String(a.properties[groupKey]) : '';
                    const bValue = b.properties ? String(b.properties[groupKey]) : '';
                    return aValue.localeCompare(bValue);
                }),
            } as GeoJSON.FeatureCollection;
        }
        return {
            ...records,
            features: mapGeoJSONFeatures(records.features, resource.numberFormat),
        } as GeoJSON.FeatureCollection;
    }
    return records.map((record) => narrowObjectType(record, resource.numberFormat));
}

function mapGeoJSONFeatures(features: GeoJSON.Feature[], numberFormat: string) {
    return features.map((feature) => {
        return {
            ...feature,
            properties: narrowObjectType(feature.properties, numberFormat),
        };
    });
}

function narrowObjectType(record: Record<string, never> | GeoJSON.GeoJsonProperties, numberFormat: string) {
    if (!record) {
        return record;
    }
    return Object.fromEntries(
        Object.entries(record).map(([key, value]) => {
            if (value === null) {
                return [key, ''];
            }
            if (Array.isArray(value) || typeof value === 'object') {
                return [key, JSON.stringify(value)];
            }
            const stringValue = String(value).toLowerCase();
            if (stringValue === 'true') {
                return [key, true];
            }
            if (stringValue === 'false') {
                return [key, false];
            }
            const parsedValue =
                numberFormat === 'en' ? Number(stringValue) : parseGermanNumberToInternationalFormat(stringValue);
            if (!Number.isNaN(parsedValue)) {
                return [key, parsedValue];
            }
            return [key, value];
        }),
    );
}

function parseGermanNumberToInternationalFormat(value: string) {
    const parsedValue = value.replace('.', '').replace(',', '.');
    return Number.isNaN(Number(parsedValue)) ? Number.NaN : Number(parsedValue);
}
