import { TransformableResource } from '@/schemas/configuration-schema';

export function narrowType(records: Record<string, never>[], resource: TransformableResource) {
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
                        resource.numberFormat === 'en'
                            ? Number(stringValue)
                            : parseGermanNumberToInternationalFormat(stringValue);
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
