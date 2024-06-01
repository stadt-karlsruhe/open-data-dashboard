import { EmbeddedResource, GeoJSONResource, JSONResource } from '@/schemas/configuration-schema';

const mockSource = 'https://example.com/';

export const embeddedResource: EmbeddedResource = {
    id: '1',
    source: mockSource,
    name: 'Embedded Resource',
    type: 'Embedded',
};

export const jsonResource: JSONResource = {
    id: '2',
    source: mockSource,
    name: 'JSON Resource',
    type: 'JSON',
    numberFormat: 'en',
    visualizations: {
        table: {},
    },
};

export const csvResource: JSONResource = {
    id: '3',
    source: mockSource,
    name: 'CSV Resource',
    type: 'CSV',
    numberFormat: 'en',
    visualizations: {
        table: {},
    },
};

export const geoJSONResource: GeoJSONResource = {
    id: '3',
    source: mockSource,
    name: 'GeoJSON Resource',
    type: 'GeoJSON',
    numberFormat: 'en',
    visualizations: {
        map: {},
    },
};

export const skipPropertiesResource: JSONResource = {
    ...jsonResource,
    skipPropertiesRegEx: '^IntegerColumn|FloatColumn$',
};

export const geoJSONskipPropertiesResource: GeoJSONResource = {
    ...geoJSONResource,
    skipPropertiesRegEx: '^UPDATED$',
};

export const skipPropertiesResourceNoMatch: JSONResource = {
    ...jsonResource,
    skipPropertiesRegEx: '^notMatchingColumn$',
};

export const geoJSONskipPropertiesResourceNoMatch: GeoJSONResource = {
    ...geoJSONResource,
    skipPropertiesRegEx: '^notMatchingColumn$',
};

export const renamePropertiesResource: JSONResource = {
    ...jsonResource,
    renameProperties: {
        StringColumn: 'Name',
        BooleanColumn: 'Boolean',
    },
};

export const geoJSONrenamePropertiesResource: GeoJSONResource = {
    ...geoJSONResource,
    renameProperties: {
        NAME: 'Name',
        GRUPPENNAME_DE: 'Category',
    },
};

export const skipAndRenamePropertiesResource: JSONResource = {
    ...skipPropertiesResource,
    renameProperties: {
        StringColumn: 'Name',
        BooleanColumn: 'Boolean',
    },
};

export const geoJSONskipAndRenamePropertiesResource: GeoJSONResource = {
    ...geoJSONskipPropertiesResource,
    renameProperties: {
        NAME: 'Name',
        GRUPPENNAME_DE: 'Category',
    },
};

export const germanNumberFormatResource: JSONResource = {
    id: '3',
    source: mockSource,
    name: 'JSON Resource',
    type: 'JSON',
    numberFormat: 'de',
    visualizations: {
        table: {},
    },
};

export const germanNumberFormatResourceChart: JSONResource = {
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
