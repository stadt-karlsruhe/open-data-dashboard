import { describe, expect, it } from '@jest/globals';
import { transformData } from '@/transform';
import {
    jsonFormatNotSupported,
    jsonStandard,
    jsonTabular,
    jsonTabularResponse,
} from './data/dataFormats';
import { TransformableResource } from '@/types/configuration';

const jsonResource: TransformableResource = {
    id: '',
    source: '',
    name: '',
    type: 'JSON',
    visualizations: {
        table: {},
    },
};

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
