export const jsonStandard = [
    {
        StringColumn: 'Seal',
        IntegerColumn: 24,
        FloatColumn: 9.1,
        BooleanColumn: true,
    },
    {
        StringColumn: 'Bear',
        IntegerColumn: 2023,
        FloatColumn: 5.1,
        BooleanColumn: false,
    },
];

export const jsonStandardFormatted = [
    {
        StringColumn: 'Seal',
        IntegerColumn: '24',
        FloatColumn: '9.1',
        BooleanColumn: 'true',
    },
    {
        StringColumn: 'Bear',
        IntegerColumn: '2023',
        FloatColumn: '5.1',
        BooleanColumn: 'false',
    },
];

export const jsonStandardGermanFormat = [
    {
        StringColumn: 'StringWithCommas,,,AndDots...',
        NumberWithDotColumn: '10.000',
        NumberWithCommaColumn: '20,3334',
    },
    {
        StringColumn: 'StringWithDots...AndCommas,,,',
        NumberWithDotColumn: '20.000',
        NumberWithCommaColumn: '30,4445',
    },
];

export const jsonTabular = {
    fields: [
        {
            type: 'text',
            id: 'StringColumn',
        },
        {
            type: 'int',
            id: 'IntegerColumn',
        },
        {
            type: 'float',
            id: 'FloatColumn',
        },
        {
            type: 'boolean',
            id: 'BooleanColumn',
        },
    ],
    records: [
        ['Seal', 24, 9.1, true],
        ['Bear', 2023, 5.1, false],
    ],
};

export const jsonTabularResponse = {
    success: true,
    result: {
        fields: [
            {
                type: 'text',
                id: 'StringColumn',
            },
            {
                type: 'int',
                id: 'IntegerColumn',
            },
            {
                type: 'float',
                id: 'FloatColumn',
            },
            {
                type: 'boolean',
                id: 'BooleanColumn',
            },
        ],
        records: [
            {
                StringColumn: 'Seal',
                IntegerColumn: 24,
                FloatColumn: 9.1,
                BooleanColumn: true,
            },
            {
                StringColumn: 'Bear',
                IntegerColumn: 2023,
                FloatColumn: 5.1,
                BooleanColumn: false,
            },
        ],
    },
};

export const jsonFormatNotSupported = {
    result: [
        {
            StringColumn: 'Seal',
            IntegerColumn: 24,
            FloatColumn: 9.1,
            BooleanColumn: true,
        },
        {
            StringColumn: 'Bear',
            IntegerColumn: 2023,
            FloatColumn: 5.1,
            BooleanColumn: false,
        },
    ],
};

export const csvValid = 'StringColumn,IntegerColumn,FloatColumn,BooleanColumn\nSeal,24,9.1,true\nBear,2023,5.1,false';

export const geoJSON = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [8.413_375_367_834_44, 49.009_543_061_308_4],
            },
            properties: {
                NAME: 'Akademischer Filmclub - Das Kino an der Uni',
                GRUPPENNAME_DE: 'Kinos',
                UPDATED: 1_693_958_400_000,
            },
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [8.385_310_004_996_92, 49.000_467_301_111_3],
            },
            properties: {
                NAME: 'Filmpalast am ZKM',
                GRUPPENNAME_DE: 'Kinos',
                UPDATED: 1_693_958_400_000,
            },
        },
    ],
};

export const geoJSONNoFeatures = {
    type: 'FeatureCollection',
    features: [],
};
