import { describe, expect, it } from '@jest/globals';
import { transformJsonData } from '@/transform';

describe('transformJson', () => {
    it('should transform an array of objects into Json format', () => {
        expect.hasAssertions();
        const inputData = [
            {
                StringColumn: 'Seal',
                IntegerColumn: 24,
                FloatColumn: 9.1,
                BooleanColumn: true,
            },
            {
                StringColumn: 'Bear',
                IntegerColumn: 2023,
                FloatColumn: 5.1,
                BooleanColumn: false,
            },
        ];

        const result = transformJsonData(inputData);
        expect(result).toBe(inputData);
    });
});
