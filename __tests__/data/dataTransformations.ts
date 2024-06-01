/* eslint-disable sonarjs/no-duplicate-string */
export const jsonSkipProperties = [
    {
        StringColumn: 'Seal',
        BooleanColumn: true,
    },
    {
        StringColumn: 'Bear',
        BooleanColumn: false,
    },
];

export const jsonRenameProperties = [
    {
        Name: 'Seal',
        IntegerColumn: 24,
        FloatColumn: 9.1,
        Boolean: true,
    },
    {
        Name: 'Bear',
        IntegerColumn: 2023,
        FloatColumn: 5.1,
        Boolean: false,
    },
];

export const jsonSkipAndRenameProperties = [
    {
        Name: 'Seal',
        Boolean: true,
    },
    {
        Name: 'Bear',
        Boolean: false,
    },
];

export const jsonTransformedNumbers = [
    {
        StringColumn: 'StringWithCommas,,,AndDots...',
        NumberWithDotColumn: 10_000,
        NumberWithCommaColumn: 20.3334,
    },
    {
        StringColumn: 'StringWithDots...AndCommas,,,',
        NumberWithDotColumn: 20_000,
        NumberWithCommaColumn: 30.4445,
    },
];

export const geoJSONRenamedProperties = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [8.413_375_367_834_44, 49.009_543_061_308_4],
            },
            properties: {
                Name: 'Akademischer Filmclub - Das Kino an der Uni',
                Category: 'Kinos',
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
                Name: 'Filmpalast am ZKM',
                Category: 'Kinos',
                UPDATED: 1_693_958_400_000,
            },
        },
    ],
};

export const geoJSONSkipProperty = {
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
            },
        },
    ],
};

export const geoJSONSkipAndRenameProperties = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [8.413_375_367_834_44, 49.009_543_061_308_4],
            },
            properties: {
                Name: 'Akademischer Filmclub - Das Kino an der Uni',
                Category: 'Kinos',
            },
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [8.385_310_004_996_92, 49.000_467_301_111_3],
            },
            properties: {
                Name: 'Filmpalast am ZKM',
                Category: 'Kinos',
            },
        },
    ],
};
/* eslint-enable sonarjs/no-duplicate-string */
