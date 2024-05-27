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

export const jsonStandardNoBoolean = [
    {
        StringColumn: 'Seal',
        IntegerColumn: 24,
        FloatColumn: 9.1,
    },
    {
        StringColumn: 'Bear',
        IntegerColumn: 2023,
        FloatColumn: 5.1,
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
