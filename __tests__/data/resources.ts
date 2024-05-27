import { EmbeddedResource, TransformableResource } from '@/schema';

import { mock } from 'node:test';

const mockSource = 'https://example.com/';

export const embeddedResource: EmbeddedResource = {
    id: '1',
    source: mockSource,
    name: 'Embedded Resource',
    type: 'Embedded',
};

export const jsonResource: TransformableResource = {
    id: '2',
    source: mockSource,
    name: 'JSON Resource',
    type: 'JSON',
    visualizations: {
        table: {},
    },
};

export const skipFieldsResource: TransformableResource = {
    ...jsonResource,
    skipFieldsRegEx: '^IntegerColumn|FloatColumn$',
};

export const skipFieldsResourceNoMatch: TransformableResource = {
    ...jsonResource,
    skipFieldsRegEx: '^notMatchingColumn$',
};

export const renameFieldsResource: TransformableResource = {
    ...jsonResource,
    renameFields: {
        StringColumn: 'Name',
        BooleanColumn: 'Boolean',
    },
};

export const skipAndRenameFieldsResource: TransformableResource = {
    ...skipFieldsResource,
    renameFields: {
        StringColumn: 'Name',
        BooleanColumn: 'Boolean',
    },
};

export const transformNumberFormatResource: TransformableResource = {
    id: '3',
    source: mockSource,
    name: 'JSON Resource',
    type: 'JSON',
    numberFormat: 'de',
    visualizations: {
        table: {},
        barChart: {
            axisPairs: [
                {
                    xAxis: 'StringColumn',
                    yAxis: 'NumberWithDotColumn',
                },
                {
                    xAxis: 'StringColumn',
                    yAxis: 'NumberWithCommaColumn',
                },
            ],
        },
    },
};
