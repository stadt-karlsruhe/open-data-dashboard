import { TransformedData } from './schemas/data-schema';

const allEntries = 'all-entries';

export function filterData(data: TransformedData[], filters: Record<string, string | { min?: string; max?: string }>) {
    const searchedData = filters[allEntries]
        ? data.filter((obj) =>
              Object.values(obj).some(
                  (value) =>
                      typeof filters[allEntries] === 'string' &&
                      String(value).toLowerCase().includes(filters[allEntries].toLowerCase()),
              ),
          )
        : data;
    return searchedData.filter((record) => {
        for (const objKey of Object.keys(record)) {
            const item = record[objKey];
            const filter = filters[objKey];
            if (
                filter &&
                typeof filter === 'string' &&
                !String(record[objKey]).toLowerCase().includes(filter.toLowerCase())
            ) {
                return false;
            }
            const filterObj = typeof filter === 'object' ? filter : ({} as { min: string; max: string });
            const filterMin = Number(filterObj.min);
            const filterMax = Number(filterObj.max);
            if (!Number.isNaN(filterMin) && typeof item === 'number' && item < filterMin) {
                return false;
            }
            if (!Number.isNaN(filterMax) && typeof item === 'number' && item > filterMax) {
                return false;
            }
        }
        return true;
    });
}
