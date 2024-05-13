import { DataRecord } from '@/types/visualization';

const allEntries = 'all-entries';

export function filterData(data: DataRecord, filters: Record<string, string | { min?: string; max?: string; }>) {
    const searchedData = filters[allEntries]
        ? data.filter((obj) => {
            return Object.values(obj).some(
                (value) => typeof filters[allEntries] === 'string' &&
                    String(value).toLowerCase().includes(filters[allEntries].toLowerCase())
            );
        })
        : data;
    return searchedData.filter((item) => {
        for (const objKey of Object.keys(item)) {
            const filter = filters[objKey];
            if (filter && typeof filter === 'string' && !String(item[objKey]).toLowerCase().includes(filter.toLowerCase())) {
                return false;
            }
            const filterObj = typeof filter === 'object' ? filter : ({} as { min: string; max: string; });
            const filterMin = Number.parseFloat(filterObj.min ?? '');
            const filterMax = Number.parseFloat(filterObj.max ?? '');
            if (!Number.isNaN(filterMin) && Number.parseFloat(item[objKey]) < filterMin) {
                return false;
            }
            if (!Number.isNaN(filterMax) && Number.parseFloat(item[objKey]) > filterMax) {
                return false;
            }
        }
        return true;
    });
}
