import { describe, expect, it } from '@jest/globals';
import { jsonStandard } from './data/dataFormats';
import { filterData } from '@/filter';
import { DataRecord } from '@/types/visualization';
import {
    jsonFilteredFloat,
    jsonFilteredInteger,
    jsonFilteredString,
} from './data/dataFilters';

const filterString = {
    StringColumn: 'Seal',
};

const filterInteger = {
    IntegerColumn: {
        max: '25',
    },
};

const filterFloat = {
    FloatColumn: {
        min: '6',
    },
};

describe('filter data', () => {
    it('should return only rows where StringColumn contains "Seal"', () => {
        expect.hasAssertions();

        const result = filterData(
            jsonStandard as unknown as DataRecord,
            filterString,
        );
        expect(result).toStrictEqual(jsonFilteredString);
    });

    it('should return only rows where IntegerColumn is less or equal 25', () => {
        expect.hasAssertions();

        const result = filterData(
            jsonStandard as unknown as DataRecord,
            filterInteger,
        );
        expect(result).toStrictEqual(jsonFilteredInteger);
    });

    it('should return only rows where FloatColumn is greater or equal 6', () => {
        expect.hasAssertions();

        const result = filterData(
            jsonStandard as unknown as DataRecord,
            filterFloat,
        );
        expect(result).toStrictEqual(jsonFilteredFloat);
    });
});
