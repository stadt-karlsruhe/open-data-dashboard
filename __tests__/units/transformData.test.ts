import { describe, expect, it } from '@jest/globals';
import {
    geoJSON,
    geoJSONNoFeatures,
    geoJSONNoProperties,
    jsonStandard,
    jsonStandardGermanFormat,
} from '../data/dataFormats';
import {
    geoJSONRenamePropertiesResult,
    geoJSONSkipAndRenamePropertiesResult,
    geoJSONSkipPropertyResult,
    jsonRenamePropertiesResult,
    jsonSkipAndRenamePropertiesResult,
    jsonSkipPropertiesResult,
    jsonTransformNumbersResult,
} from '../data/dataTransformations';
import {
    geoJSONrenamePropertiesResource,
    geoJSONskipAndRenamePropertiesResource,
    geoJSONskipPropertiesResourceNoMatch,
    geoJSONskipPropertyResource,
    jsonGermanNumberFormatResourceChart,
    jsonRenamePropertiesResource,
    jsonSkipAndRenamePropertiesResource,
    jsonSkipPropertiesResource,
    jsonSkipPropertiesResourceNoMatch,
} from '../data/resources';

import { transformData } from '@/transformations/transformFormat';

describe('transform CSV and JSON data', () => {
    it('should skip properties IntegerColumn and FloatColumn', () => {
        expect.hasAssertions();

        const result = transformData(jsonSkipPropertiesResource, jsonStandard);
        expect(result).toStrictEqual(jsonSkipPropertiesResult);
    });

    it('should not do anything if records array is empty', () => {
        expect.hasAssertions();

        const result = transformData(jsonSkipPropertiesResource, []);
        expect(result).toStrictEqual([]);
    });

    it('should not do anything if skipPropertiesRegex does not match any column names', () => {
        expect.hasAssertions();

        const result = transformData(jsonSkipPropertiesResourceNoMatch, jsonStandard);
        expect(result).toStrictEqual(jsonStandard);
    });

    it('should rename properties StringColumn and BooleanColumn', () => {
        expect.hasAssertions();

        const result = transformData(jsonRenamePropertiesResource, jsonStandard);
        expect(result).toStrictEqual(jsonRenamePropertiesResult);
    });

    it('should skip properties IntegerColumn and FloatColumn and rename properties StringColumn and BooleanColumn', () => {
        expect.hasAssertions();

        const result = transformData(jsonSkipAndRenamePropertiesResource, jsonStandard);
        expect(result).toStrictEqual(jsonSkipAndRenamePropertiesResult);
    });

    it('should correctly transform number format for numbers', () => {
        expect.hasAssertions();

        const result = transformData(jsonGermanNumberFormatResourceChart, jsonStandardGermanFormat);
        expect(result).toStrictEqual(jsonTransformNumbersResult);
    });
});

describe('transform GeoJSON data', () => {
    it('should skip property UPDATED', () => {
        expect.hasAssertions();

        const result = transformData(geoJSONskipPropertyResource, geoJSON);
        expect(result).toStrictEqual(geoJSONSkipPropertyResult);
    });

    it('should not do anything if data contains no features', () => {
        expect.hasAssertions();

        const result = transformData(geoJSONskipPropertyResource, geoJSONNoFeatures);
        expect(result).toStrictEqual(geoJSONNoFeatures);
    });

    it('should not do anything if data contains no properties', () => {
        expect.hasAssertions();

        const result = transformData(geoJSONskipPropertyResource, geoJSONNoProperties);
        expect(result).toStrictEqual(geoJSONNoProperties);
    });

    it('should not do anything if skipPropertiesRegex does not match any property names', () => {
        expect.hasAssertions();

        const result = transformData(geoJSONskipPropertiesResourceNoMatch, geoJSON);
        expect(result).toStrictEqual(geoJSON);
    });

    it('should rename properties NAME and GRUPPENNAME_DE', () => {
        expect.hasAssertions();

        const result = transformData(geoJSONrenamePropertiesResource, geoJSON);
        expect(result).toStrictEqual(geoJSONRenamePropertiesResult);
    });

    it('should skip property UPDATED and rename properties NAME and GRUPPENNAME_DE', () => {
        expect.hasAssertions();

        const result = transformData(geoJSONskipAndRenamePropertiesResource, geoJSON);
        expect(result).toStrictEqual(geoJSONSkipAndRenamePropertiesResult);
    });
});
