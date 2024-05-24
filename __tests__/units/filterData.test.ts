import { describe, expect, it } from '@jest/globals';
import { filterAllEntries, filterFloat, filterInteger, filterString } from '../data/dataFilters';
import { DataRecord } from '@/types/visualization';
import { filterData } from '@/filter';
import { jsonStandard } from '../data/dataFormats';

describe('filter data', () => {
    it('should return only rows where any column contains the substring "sea" (ignoring case)', () => {
        expect.hasAssertions();

        const result = filterData(jsonStandard as unknown as DataRecord, filterAllEntries);
        expect(result).toStrictEqual([jsonStandard[0]]);
    });

    it('should return only rows where StringColumn contains "Seal"', () => {
        expect.hasAssertions();

        const result = filterData(jsonStandard as unknown as DataRecord, filterString);
        expect(result).toStrictEqual([jsonStandard[0]]);
    });

    it('should return only rows where IntegerColumn is less or equal 25', () => {
        expect.hasAssertions();

        const result = filterData(jsonStandard as unknown as DataRecord, filterInteger);
        expect(result).toStrictEqual([jsonStandard[0]]);
    });

    it('should return only rows where FloatColumn is greater or equal 6', () => {
        expect.hasAssertions();

        const result = filterData(jsonStandard as unknown as DataRecord, filterFloat);
        expect(result).toStrictEqual([jsonStandard[0]]);
    });
});
