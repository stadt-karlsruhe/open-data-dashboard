import { describe, expect, it } from '@jest/globals';
import { geoJSON, geoJSONNoFeatures, jsonStandard, jsonStandardGermanFormat } from '../data/dataFormats';
import {
    geoJSONRenamedProperties,
    geoJSONSkipAndRenameProperties,
    geoJSONSkipProperty,
    jsonRenameProperties,
    jsonSkipAndRenameProperties,
    jsonSkipProperties,
    jsonTransformedNumbers,
} from '../data/dataTransformations';
import {
    geoJSONrenamePropertiesResource,
    geoJSONskipAndRenamePropertiesResource,
    geoJSONskipPropertiesResource,
    geoJSONskipPropertiesResourceNoMatch,
    germanNumberFormatResourceChart,
    renamePropertiesResource,
    skipAndRenamePropertiesResource,
    skipPropertiesResource,
    skipPropertiesResourceNoMatch,
} from '../data/resources';

import { transformData } from '@/transformations/transformFormat';

describe('transform CSV and JSON data', () => {
    it('should skip properties IntegerColumn and FloatColumn', () => {
        expect.hasAssertions();

        const result = transformData(skipPropertiesResource, jsonStandard);
        expect(result).toStrictEqual(jsonSkipProperties);
    });

    it('should not do anything if records array is empty', () => {
        expect.hasAssertions();

        const result = transformData(skipPropertiesResource, []);
        expect(result).toStrictEqual([]);
    });

    it('should not do anything if skipPropertiesRegex does not match any column names', () => {
        expect.hasAssertions();

        const result = transformData(skipPropertiesResourceNoMatch, jsonStandard);
        expect(result).toStrictEqual(jsonStandard);
    });

    it('should rename properties StringColumn and BooleanColumn', () => {
        expect.hasAssertions();

        const result = transformData(renamePropertiesResource, jsonStandard);
        expect(result).toStrictEqual(jsonRenameProperties);
    });

    it('should skip properties IntegerColumn and FloatColumn and rename properties StringColumn and BooleanColumn', () => {
        expect.hasAssertions();

        const result = transformData(skipAndRenamePropertiesResource, jsonStandard);
        expect(result).toStrictEqual(jsonSkipAndRenameProperties);
    });

    it('should correctly transform number format for numbers', () => {
        expect.hasAssertions();

        const result = transformData(germanNumberFormatResourceChart, jsonStandardGermanFormat);
        expect(result).toStrictEqual(jsonTransformedNumbers);
    });
});

describe('transform GeoJSON data', () => {
    it('should skip property UPDATED', () => {
        expect.hasAssertions();

        const result = transformData(geoJSONskipPropertiesResource, geoJSON);
        expect(result).toStrictEqual(geoJSONSkipProperty);
    });

    it('should not do anything if data contains no features', () => {
        expect.hasAssertions();

        const result = transformData(geoJSONskipPropertiesResource, geoJSONNoFeatures);
        expect(result).toStrictEqual(geoJSONNoFeatures);
    });

    it('should not do anything if skipPropertiesRegex does not match any property names', () => {
        expect.hasAssertions();

        const result = transformData(geoJSONskipPropertiesResourceNoMatch, geoJSON);
        expect(result).toStrictEqual(geoJSON);
    });

    it('should rename properties NAME and GRUPPENNAME_DE', () => {
        expect.hasAssertions();

        const result = transformData(geoJSONrenamePropertiesResource, geoJSON);
        expect(result).toStrictEqual(geoJSONRenamedProperties);
    });

    it('should skip property UPDATED and rename properties NAME and GRUPPENNAME_DE', () => {
        expect.hasAssertions();

        const result = transformData(geoJSONskipAndRenamePropertiesResource, geoJSON);
        expect(result).toStrictEqual(geoJSONSkipAndRenameProperties);
    });
});
