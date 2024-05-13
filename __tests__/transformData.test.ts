import { describe, expect, it } from '@jest/globals';
import { transformData } from '@/transform';
import { jsonStandard } from './data/dataFormats';
import { TransformableResource } from '@/types/configuration';
import { jsonRenameFields, jsonSkipAndRenameFields, jsonSkipFields } from './data/dataTransformations';

const skipFieldsResource: TransformableResource = {
    id: '',
    source: '',
    name: '',
    type: 'JSON',
    skipFieldsRegEx: '^IntegerColumn|FloatColumn$',
    visualizations: {
        table: {},
    },
};

const renameFieldsResource: TransformableResource = {
    id: '',
    source: '',
    name: '',
    type: 'JSON',
    renameFields: {
        StringColumn: 'Name',
        BooleanColumn: 'Boolean',
    },
    visualizations: {
        table: {},
    },
};

const skipAndRenameFieldsResource: TransformableResource = {
    ...skipFieldsResource,
    renameFields: {
        StringColumn: 'Name',
        BooleanColumn: 'Boolean',
    },
};

describe('transform data', () => {
    it('should skip fields IntegerColumn and FloatColumn', () => {
        expect.hasAssertions();

        const result = transformData(skipFieldsResource, jsonStandard);
        expect(result).toStrictEqual(jsonSkipFields);
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
});
