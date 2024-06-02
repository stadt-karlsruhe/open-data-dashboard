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

import { transformDataForType } from '@/transformations/transformFormat';

describe('transform CSV and JSON data', () => {
    it('should skip properties IntegerColumn and FloatColumn', () => {
        expect.hasAssertions();

        const result = transformDataForType(jsonSkipPropertiesResource, jsonStandard);
        expect(result).toStrictEqual(jsonSkipPropertiesResult);
    });

    it('should not do anything if records array is empty', () => {
        expect.hasAssertions();

        const result = transformDataForType(jsonSkipPropertiesResource, []);
        expect(result).toStrictEqual([]);
    });

    it('should not do anything if skipPropertiesRegex does not match any column names', () => {
        expect.hasAssertions();

        const result = transformDataForType(jsonSkipPropertiesResourceNoMatch, jsonStandard);
        expect(result).toStrictEqual(jsonStandard);
    });

    it('should rename properties StringColumn and BooleanColumn', () => {
        expect.hasAssertions();

        const result = transformDataForType(jsonRenamePropertiesResource, jsonStandard);
        expect(result).toStrictEqual(jsonRenamePropertiesResult);
    });

    it('should skip properties IntegerColumn and FloatColumn and rename properties StringColumn and BooleanColumn', () => {
        expect.hasAssertions();

        const result = transformDataForType(jsonSkipAndRenamePropertiesResource, jsonStandard);
        expect(result).toStrictEqual(jsonSkipAndRenamePropertiesResult);
    });

    it('should correctly transform number format for numbers', () => {
        expect.hasAssertions();

        const result = transformDataForType(jsonGermanNumberFormatResourceChart, jsonStandardGermanFormat);
        expect(result).toStrictEqual(jsonTransformNumbersResult);
    });
});

describe('transform GeoJSON data', () => {
    it('should skip property UPDATED', () => {
        expect.hasAssertions();

        const result = transformDataForType(geoJSONskipPropertyResource, geoJSON);
        expect(result).toStrictEqual(geoJSONSkipPropertyResult);
    });

    it('should not do anything if data contains no features', () => {
        expect.hasAssertions();

        const result = transformDataForType(geoJSONskipPropertyResource, geoJSONNoFeatures);
        expect(result).toStrictEqual(geoJSONNoFeatures);
    });

    it('should not do anything if data contains no properties', () => {
        expect.hasAssertions();

        const result = transformDataForType(geoJSONskipPropertyResource, geoJSONNoProperties);
        expect(result).toStrictEqual(geoJSONNoProperties);
    });

    it('should not do anything if skipPropertiesRegex does not match any property names', () => {
        expect.hasAssertions();

        const result = transformDataForType(geoJSONskipPropertiesResourceNoMatch, geoJSON);
        expect(result).toStrictEqual(geoJSON);
    });

    it('should rename properties NAME and GRUPPENNAME_DE', () => {
        expect.hasAssertions();

        const result = transformDataForType(geoJSONrenamePropertiesResource, geoJSON);
        expect(result).toStrictEqual(geoJSONRenamePropertiesResult);
    });

    it('should skip property UPDATED and rename properties NAME and GRUPPENNAME_DE', () => {
        expect.hasAssertions();

        const result = transformDataForType(geoJSONskipAndRenamePropertiesResource, geoJSON);
        expect(result).toStrictEqual(geoJSONSkipAndRenamePropertiesResult);
    });
});
