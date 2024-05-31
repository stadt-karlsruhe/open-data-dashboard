import { EmbeddedResource, TransformableResource } from '@/schemas/configuration-schema';

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
    numberFormat: 'en',
    visualizations: {
        table: {},
    },
};

export const csvResource: TransformableResource = {
    id: '3',
    source: mockSource,
    name: 'CSV Resource',
    type: 'CSV',
    numberFormat: 'en',
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

export const germanNumberFormatResource: TransformableResource = {
    id: '3',
    source: mockSource,
    name: 'JSON Resource',
    type: 'JSON',
    numberFormat: 'de',
    visualizations: {
        table: {},
    },
};

export const germanNumberFormatResourceChart: TransformableResource = {
    ...germanNumberFormatResource,
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
