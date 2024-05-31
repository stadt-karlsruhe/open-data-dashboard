import { csvResource, jsonResource } from '../data/resources';
import { csvValid, jsonFormatNotSupported, jsonStandard, jsonTabular, jsonTabularResponse } from '../data/dataFormats';
import { describe, expect, it } from '@jest/globals';

import { transformData } from '@/transformations/transformFormat';

describe('transform JSON formats', () => {
    it('should not transform JSON if it is in standard format', () => {
        expect.hasAssertions();

        const result = transformData(jsonResource, jsonStandard);
        expect(result).toStrictEqual(jsonStandard);
    });

    it('should transform TabularJson into standard format', () => {
        expect.hasAssertions();

        const result = transformData(jsonResource, jsonTabular);
        expect(result).toStrictEqual(jsonStandard);
    });

    it('should transform TabularJsonResponse into standard format', () => {
        expect.hasAssertions();

        const result = transformData(jsonResource, jsonTabularResponse);
        expect(result).toStrictEqual(jsonStandard);
    });

    it('should return an empty array for not supported JSON format', () => {
        expect.hasAssertions();

        const result = transformData(jsonResource, jsonFormatNotSupported);
        expect(result).toStrictEqual([]);
    });
});

describe('transform CSV to JSON', () => {
    it('should transform valid CSV to JSON standard format', () => {
        expect.hasAssertions();

        const result = transformData(csvResource, csvValid);
        expect(result).toStrictEqual(jsonStandard);
    });
});
