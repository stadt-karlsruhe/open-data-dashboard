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

export const jsonSkipPropertiesResource: JSONResource = {
    ...jsonResource,
    skipPropertiesRegEx: '^IntegerColumn|FloatColumn$',
};

export const geoJSONskipPropertyResource: GeoJSONResource = {
    ...geoJSONResource,
    skipPropertiesRegEx: '^UPDATED$',
};

export const jsonSkipPropertiesResourceNoMatch: JSONResource = {
    ...jsonResource,
    skipPropertiesRegEx: '^notMatchingColumn$',
};

export const geoJSONskipPropertiesResourceNoMatch: GeoJSONResource = {
    ...geoJSONResource,
    skipPropertiesRegEx: '^notMatchingColumn$',
};

export const jsonRenamePropertiesResource: JSONResource = {
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

export const jsonSkipAndRenamePropertiesResource: JSONResource = {
    ...jsonSkipPropertiesResource,
    renameProperties: {
        StringColumn: 'Name',
        BooleanColumn: 'Boolean',
    },
};

export const geoJSONskipAndRenamePropertiesResource: GeoJSONResource = {
    ...geoJSONskipPropertyResource,
    renameProperties: {
        NAME: 'Name',
        GRUPPENNAME_DE: 'Category',
    },
};

export const jsonGermanNumberFormatResource: JSONResource = {
    ...jsonResource,
    numberFormat: 'de',
    visualizations: {
        table: {},
    },
};

export const jsonGermanNumberFormatResourceChart: JSONResource = {
    ...jsonGermanNumberFormatResource,
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
