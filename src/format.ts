import { useFormatter } from 'next-intl';

// TODO: Should this be configurable?
const yearColumnNames = new Set(['year', 'Jahr']);

export function formatNumber(
    value: string | number | boolean,
    columnName: string,
    format: ReturnType<typeof useFormatter>,
) {
    if (
        typeof value === 'number' &&
        ![...yearColumnNames].some((item) => item.toLowerCase() === columnName.toLowerCase())
    ) {
        return format.number(value);
    }
    return String(value);
}
