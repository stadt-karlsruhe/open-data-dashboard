export const jsonSkipFields = [
    {
        StringColumn: 'Seal',
        BooleanColumn: true,
    },
    {
        StringColumn: 'Bear',
        BooleanColumn: false,
    },
];

export const jsonRenameFields = [
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

export const jsonSkipAndRenameFields = [
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
        NumberWithDotColumn: '10000',
        NumberWithCommaColumn: '20.3334',
    },
    {
        StringColumn: 'StringWithDots...AndCommas,,,',
        NumberWithDotColumn: '20000',
        NumberWithCommaColumn: '30.4445',
    },
];
