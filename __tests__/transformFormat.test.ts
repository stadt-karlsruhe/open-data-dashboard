import { describe, expect, it } from '@jest/globals';
import { transformData } from '@/transform';
import { jsonStandard } from './data/dataFormats';
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
});
