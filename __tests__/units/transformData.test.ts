import { describe, expect, it } from '@jest/globals';
import {
    germanNumberFormatResource,
    germanNumberFormatResourceChart,
    renameFieldsResource,
    skipAndRenameFieldsResource,
    skipFieldsResource,
    skipFieldsResourceNoMatch,
} from '../data/resources';
import {
    jsonRenameFields,
    jsonSkipAndRenameFields,
    jsonSkipFields,
    jsonTransformedNumbers,
} from '../data/dataTransformations';
import { jsonStandard, jsonStandardGermanFormat } from '../data/dataFormats';

import { transformData } from '@/transform';

describe('transform data', () => {
    it('should skip fields IntegerColumn and FloatColumn', () => {
        expect.hasAssertions();

        const result = transformData(skipFieldsResource, jsonStandard);
        expect(result).toStrictEqual(jsonSkipFields);
    });

    it('should not do anything if records array is empty', () => {
        expect.hasAssertions();

        const result = transformData(skipFieldsResource, []);
        expect(result).toStrictEqual([]);
    });

    it('should not do anything if skipFieldsRegex does not match any column names', () => {
        expect.hasAssertions();

        const result = transformData(skipFieldsResourceNoMatch, jsonStandard);
        expect(result).toStrictEqual(jsonStandard);
    });

    it('should rename fields StringColumn and BooleanColumn', () => {
        expect.hasAssertions();

        const result = transformData(renameFieldsResource, jsonStandard);
        expect(result).toStrictEqual(jsonRenameFields);
    });

    it('should skip fields IntegerColumn and FloatColumn and rename fields StringColumn and BooleanColumn', () => {
        expect.hasAssertions();

        const result = transformData(skipAndRenameFieldsResource, jsonStandard);
        expect(result).toStrictEqual(jsonSkipAndRenameFields);
    });

    it('should correctly transform number format for numbers in yAxes', () => {
        expect.hasAssertions();

        const result = transformData(germanNumberFormatResourceChart, jsonStandardGermanFormat);
        expect(result).toStrictEqual(jsonTransformedNumbers);
    });

    it('should not transform number format for numbers in resource without chart', () => {
        expect.hasAssertions();

        const result = transformData(germanNumberFormatResource, jsonStandardGermanFormat);
        expect(result).toStrictEqual(jsonStandardGermanFormat);
    });
});
